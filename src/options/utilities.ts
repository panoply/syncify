/* eslint-disable no-unused-vars */

import type { AxiosRequestConfig } from 'axios';
import { basename, extname } from 'node:path';
import glob from 'fast-glob';
import anymatch, { Tester } from 'anymatch';
import { pathExists } from 'fs-extra';
import { anyTrue, has } from 'rambdax';
import { bundleRequire } from '~utils/require';
import { lastPath, normalPath, globPath } from '~utils/paths';
import { isArray, isObject, isString, isUndefined, assign, isFunction } from '~utils/native';
import { typeError, invalidError, unknownError, warnOption, throwError } from '~log/validate';
import { cyan } from '~cli/ansi';
import { CONFIG_FILE_EXT } from '~const';
import { bundle } from '~config';
import { hasRenamespace } from '~utils/utils';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

const enum EnvType {
  /**
   * Using `.env` file
   */
  DOTENV = 1,
  /**
   * Using `process.env` variables
   */
  VARENV
}

interface NormalizeTransform {
  /**
   * Whether or not to flatten inputs, when `true`a transform model will be created
   * for every resolved input. Also note that when `true`, then the `anymatch` tester
   * will not be assigned.
   *
   * @default false
   *
   * @example
   *
   * // syncify.config.ts
   * { input: ['dir/glob/*'], rename: 'foo-[file]' }
   *
   * // A model will be created for every glob:
   * return [
   *   { input: 'dir/glob/file-1', rename: 'foo-file-1' },
   *   { input: 'dir/glob/file-2', rename: 'foo-file-2' }
   * ]
   *
   */
  flatten?: boolean;
  /**
   * Whether or not the input should be added to the bundle _watch_ `Set<string>` reference.
   * When `true` the resolved globs are added to `bundle.watch` model.
   */
  addWatch?: boolean;
  /**
   * Whether or not snippet assertion should be applied. When `true`, the retuning value
   * will include a `snippet` boolean property to signal whether or not the transform output
   * should export as a snippet.
   *
   * @default true
   *
   * @example
   *
   * // syncify.config.ts
   * {
   *   'snippets/[file]-xxxx': 'dir/file-1.js',
   *   'assets/some-new-name': 'dir/file-2.js'
   * }
   *
   * // The return value will assert snippet boolean
   * return [
   *   { input: 'dir/file-1.js', rename: 'file-1-xxxx.js', snippet: true },
   *   { input: 'dir/file-2.js', rename: 'some-new-name.js', snippet: false }
   * ]
   *
   */
  assertSnippet?: boolean;
}

interface Resolver {
  paths: string[];
  match: Tester
}

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Store Authorization URL
 *
 * Generate the the authorization URL to
 * be used for requests.
 */
export function authURL (domain: string, env: object, type: EnvType): AxiosRequestConfig {

  let api_token = domain + '_api_token';

  if (!has(api_token, env)) api_token = api_token.toUpperCase();

  if (has(api_token, env)) {
    return {
      baseURL: `https://${domain}.myshopify.com/admin`,
      headers: { 'X-Shopify-Access-Token': env[api_token] }
    };
  }

  let api_key = domain + '_api_key';
  let api_secret = domain + '_api_secret';

  if (!has(api_key, env)) api_key = api_key.toUpperCase();
  if (!has(api_secret, env)) api_secret = api_secret.toUpperCase();
  if (has(api_key, env) && has(api_secret, env)) {
    return {
      baseURL: `https://${domain}.myshopify.com/admin`,
      auth: {
        username: env[api_key],
        password: env[api_secret]
      }
    };
  }

  if (type === EnvType.DOTENV) {
    throwError(`Invalid or missing ${cyan(domain + '.myshopify.com')} credentials`, [
      `Your shop credentials in the ${cyan.bold('.env')} file could`,
      'not be read correctly or are missing.'
    ]);
  } else if (type === EnvType.VARENV) {
    throwError(`Missing credentials for: ${cyan(domain + '.myshopify.com')}`, `
    You need to provide shop credentials within a ${cyan.bold('.env')} file.
    Please check you project setup and ensure you have correctly provided authorization.`);
  }

};

/**
 * Path Resovler
 *
 * Returns absolute paths and validates all provided URI path locations.
 * Before passing entries to this function, it is assumed existence was confirmed.
 *
 * The resolver also provides an optional hook function which will pass the resolved
 * input path as a parameter, when the hook exists and returns a `string[]` or `string`
 * value then the resolver will return an object type containing resolved inputs and an
 * anymatch tester containing the `filePath`
 *
 * @param filePath The path/s we need to resolve
 * @param hook An optional callback hook which passed resolved input
 */
export function getResolvedPaths<R extends string[] | Resolver> (
  filePath: string | string[],
  hook?: ((uri: string) => string | string[])
): R {

  const { cwd } = bundle;
  const match: string[] | false = isFunction(hook) ? [] : false;
  const warn = warnOption('Path Resolver');
  const path = normalPath(bundle.dirs.input); // Path normalizer

  if (isArray(filePath)) {

    const paths: string[] = [];

    for (const item of filePath) {

      const uri = path(item);
      const resolved = glob.sync(uri, {
        cwd,
        absolute: true
      });

      if (match) {
        const test = hook(uri);
        if (isString(test)) {
          match.push(test as string);
        } else if (isArray(test)) {
          match.push(...test);
        }
      }

      if (resolved.length === 0) {
        warn('No files can be resolved in', item);
      } else {
        paths.push(...resolved);
      }
    }

    return <R>(match ? { paths, match: anymatch(match) } : paths);

  }

  if (isString(filePath)) {

    const uri = path(filePath);
    const paths = glob.sync(uri, { cwd });

    if (paths.length === 0) {
      warn('No files can be resolved in', filePath);
    }

    if (match) {
      const test = hook(uri);
      if (isString(test)) {
        match.push(test as string);
      } else if (isArray(test)) {
        match.push(...test);
      }
    }

    return <R>(match ? { paths, match: anymatch(match) } : paths);

  }

  typeError({
    option: 'uri',
    name: 'uri/path',
    provided: filePath,
    expects: 'string | string[]'
  });

}

/**
 * Transform Schema
 *
 * Determines the transform schema which was provided and normalizes
 * it into a standardized model that we can work with. The function accepts
 * a couple of options which can be used to obtain additional context to the bundle
 * model for each transform to be applied.
 *
 * **Returning Value**
 *
 * The function will return the provided config options with the `input` property
 * adjusted to a full resolution uri. Depending on the options provided, the return
 * value type might differ. See the `NormalizeTransform` interface for more information.
 *
 * Transform options can be provided in a multitude of different
 * formats / structures, such as:
 *
 * **String Transform**
 *
 * ```ts
 * // syncify.config.ts
 * {
 *   svg: 'path/to/input' | ['path/to/input']
 * }
 * ```
 *
 * **Object Transfrom**
 *
 * ```ts
 * // syncify.config.ts
 * {
 *   style: {
 *     input: 'path/to/input' | ['path/to/input']
 *     // ....
 *   }
 * }
 * ```
 *
 * **Array Object Inputs**
 *
 * ```ts
 * // syncify.config.ts
 * {
 *   style: [
 *     {
 *       input: 'path/to/input' | ['path/to/input']
 *       // ....
 *     },
 *     {
 *       input: 'path/to/input' | ['path/to/input']
 *       // ....
 *     }
 *   ]
 * }
 * ```
 *
 * **Raname Transfrom**
 *
 * ```ts
 * // syncify.config.ts
 * {
 *   'snippets/rename': 'path/to/input' | ['path/to/input'],
 *   'assets/rename': {
 *     input: 'path/to/input' | ['path/to/input']
 *     // ....
 *   }
 * }
 * ```
 */
export function getTransform<T> (transforms: any, opts: NormalizeTransform): T {

  if (!has('assertSnippet', opts)) opts.assertSnippet = true;

  if (isString(transforms)) {

    const { paths, match } = getResolvedPaths<Resolver>(transforms, (watch) => {
      if (opts.addWatch) bundle.watch.add(watch);
      return globPath(watch);
    });

    if (paths) {
      if (opts.flatten) {

        return <T>paths.map(input => (opts.assertSnippet ? {
          input,
          rename: basename(input),
          snippet: false
        } : {
          input,
          rename: basename(input)
        }));

      } else {

        const returnValue = <{
          input: string[];
          rename: string;
          match: Tester;
          snippet?: boolean
        }>{
          input: paths,
          rename: '[name].[ext]',
          match
        };

        if (opts.assertSnippet) returnValue.snippet = false;

        return <T>returnValue;

      }
    }

  } else if (isArray(transforms)) {

    if (transforms.every(isString)) {

      const { paths, match } = getResolvedPaths<Resolver>(transforms, watch => {
        if (opts.addWatch) bundle.watch.add(watch);
        return globPath(watch);
      });

      if (opts.flatten) {

        return <T>paths.map(input => (opts.assertSnippet ? {
          input,
          rename: basename(input),
          snippet: false
        } : {
          input,
          rename: basename(input)
        }));

      } else {

        const returnValue = <{
          input: string[];
          rename: string;
          match: Tester;
          snippet?: boolean
        }>{
          input: paths,
          rename: '[name].[ext]',
          match
        };

        if (opts.assertSnippet) returnValue.snippet = false;

        return <T>returnValue;

      }

    } else if (transforms.every(isObject)) {

      return <T>transforms.map(option => {

        if (!has('input', option)) {
          invalidError('tranform', 'input', option, '{ input: string | string[] }');
        }

        const { paths, match } = getResolvedPaths<Resolver>(transforms, watch => {
          if (opts.addWatch) bundle.watch.add(watch);
          return globPath(watch);
        });

        option.match = match;
        option.input = paths;

        // apply snippet default is not defined
        if (opts.assertSnippet && !has('snippet', option)) option.snippet = false;

        // apply namespaced rename if no rename is defined
        if (!has('rename', option)) {
          option.rename = option.snippet ? '[name].liquid' : '[name].[ext]';
        }

        return option;

      });

    }

  } else if (isObject(transforms)) {

    const config = [];

    // config based transfrom
    if (has('input', transforms)) {

      const { paths, match } = getResolvedPaths<Resolver>(transforms.input, watch => {
        if (opts.addWatch) bundle.watch.add(watch);
        return globPath(watch);
      });

      // apply snippet default if not defined
      if (opts.assertSnippet && !has('snippet', transforms)) {
        transforms.snippet = false;
      }

      // apply namespaced rename if no rename is defined
      if (!has('rename', transforms)) {
        transforms.rename = transforms.snippet ? '[name].liquid' : '[name].[ext]';
      }

      if (opts.flatten) {

        for (const input of paths) {
          config.push(assign(transforms, { input }));
        }

      } else {

        transforms.input = paths;
        transforms.match = match;

        config.push(transforms);
      }

    } else {

      // rename based config
      for (const prop in transforms) {

        const o: any = { snippet: prop.startsWith('snippets/') };
        const asset = prop.startsWith('assets/');
        const option = transforms[prop];
        const rename = asset || o.snippet;

        if (isString(option)) { // { 'assets/file': '...' }

          if (rename) o.rename = asset ? prop.slice(7) : prop.slice(9);

          const { paths, match } = getResolvedPaths<Resolver>(option, watch => {
            if (opts.addWatch) bundle.watch.add(watch);
            return globPath(watch);
          });

          if (paths) {
            if (opts.flatten) {
              for (const input of paths) config.push(assign({}, o, { input }));
            } else {
              config.push(assign({}, o, { input: paths, match }));
            }
          }

        } else if (isObject(option)) { // { 'assets/file': {} }

          if (!has('input', option)) {
            invalidError('tranform', prop, option, '{ input: string | string[] }');
          }

          const { paths, match } = getResolvedPaths<Resolver>(option.input, watch => {
            if (opts.addWatch) bundle.watch.add(watch);
            return globPath(watch);
          });

          if (paths) {

            const merge = rename
              ? assign({}, option, o, { rename: asset ? prop.slice(7) : prop.slice(9) })
              : assign({}, o, option);

            if (opts.flatten) {
              for (const input of paths) config.push(assign({}, merge, { input }));
            } else {
              config.push(assign(merge, { input: paths, match }));
            }
          }

        } else if (isArray(option)) { // { 'assets/file': [''] }

          if (option.every(isString)) {

            const { paths, match } = getResolvedPaths<Resolver>(option, watch => {
              if (opts.addWatch) bundle.watch.add(watch);
              return globPath(watch);
            });

            if (hasRenamespace(prop)) o.rename = basename(prop);

            if (paths) {
              if (opts.flatten) {
                for (const input of paths) {
                  config.push(assign({}, o, { input }));
                }
              } else {
                config.push(assign({}, o, { input: paths, match }));
              }
            }

          } else {

            typeError({
              option: 'transform',
              name: prop,
              provided: option,
              expects: 'string[]'
            });

          }

        }

      }
    }

    return <T>config;

  }

};

/**
 * Get Required modules
 *
 * Ensures that peer dependencies exists for
 * the transform processors.
 */
export function getModules (name: string) {

  const { pkg } = bundle;

  return anyTrue(
    (has('devDependencies', pkg) && has(name, pkg.devDependencies)),
    (has('dependencies', pkg) && has(name, pkg.dependencies)),
    (has('peerDependencies', pkg) && has(name, pkg.peerDependencies)),
    (has('optionalDependencies', pkg) && has(name, pkg.peerDependencies))
  );

};

export async function getConfigFilePath (filename: string): Promise<string> {

  for (const ext of CONFIG_FILE_EXT) {

    const filepath = `${filename}.${ext}`;
    const fileExists = await pathExists(filepath);

    if (fileExists) return filepath;

  }

  return null;

};

/**
 * Read Config File
 *
 * Load the syncify config file for node projects.
 * Supports loading config as es module or common js module,
 */
export async function readConfigFile <T> (filename: string): Promise<{ config: T; path: string; }> {

  try {

    const path = await getConfigFilePath(filename);

    if (path !== null) {

      const config = await bundleRequire({ filepath: path });

      return {
        path,
        config: config.mod.syncify || config.mod.default || config.mod
      };
    }

    return null;

  } catch (e) {

    return null;

  }

};

/**
 * Rename File
 *
 * String parser for file renaming. Uses the common braced
 * reference structures found in most bundlers.
 */
export function renameFile (src: string, rename?: string) {

  let name = rename;

  // Get the filename (remember we flattened this earlier)
  const dir = lastPath(src);

  // file input extension
  const ext = extname(src);

  // Get the filename (remember we flattened this earlier)
  const file = basename(src, ext);

  if (isUndefined(rename)) return { dir, ext, file, name: file };

  if (/(\[dir\])/.test(name)) name = name.replace('[dir]', dir);
  if (/(\[file\])/.test(name)) name = name.replace('[file]', file);
  if (/(\.?\[ext\])/.test(name)) name = name.replace(/\.?\[ext\]/, ext);

  return {
    ext,
    file,
    dir,
    name: rename.replace(rename, name)
  };
};
