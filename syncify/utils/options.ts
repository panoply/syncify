/* eslint-disable no-unused-vars */

import type {
  PKG,
  SVGTransform,
  SVGTransformer,
  ScriptTransform,
  ScriptTransformer,
  Stores,
  StyleTransform,
  StyleTransformer
} from 'types';
import type { BundleRequire, Input, Transform } from 'types/internal';
import type { AxiosRequestConfig } from 'axios';
import { basename, extname } from 'node:path';
import glob from 'fast-glob';
import anymatch from 'anymatch';
import { pathExists } from 'fs-extra';
import { CONFIG_FILE_EXT } from 'syncify:const';
import { typeError, invalidError, warnOption, throwError, missingEnv } from 'syncify:log/throws';
import { bundleRequire } from 'syncify:requests/require';
import { lastPath, normalPath, globPath } from 'syncify:paths';
import { assign } from 'syncify:native';
import { isArray, isObject, isString, isUndefined, isFunction, has, merge } from 'syncify:utils';
import { cyan } from '@syncify/ansi';
import { $ } from 'syncify:state';

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

export function getStoresFromEnv () {

  const stores: Stores[] = [];
  const admin: Set<string> = new Set();

  const getStorefrontPassword = (domain: string) => {
    const lowercase = `${domain}_password`;
    const uppercase = lowercase.toUpperCase();
    return lowercase in $.env.vars
      ? $.env.vars[lowercase]
      : uppercase in $.env.vars ? $.env.vars[uppercase] : null;
  };

  for (const prop in $.env.vars) {

    const p = prop.toLowerCase();

    if (p.endsWith('_api_token')) {

      const domain = p.slice(0, p.indexOf('_api_token'));
      const password = getStorefrontPassword(domain);

      stores.push({
        domain,
        password,
        themes: {}
      });

    } else if (p.endsWith('_api_key')) {

      const domain = `${p.slice(0, p.indexOf('_api_key'))}`;

      if (!admin.has(domain)) {

        const password = getStorefrontPassword(domain);

        stores.push({ domain, password, themes: {} });
        admin.add(domain);

      }

    } else if (p.endsWith('_api_secret')) {

      const domain = `${p.slice(0, p.indexOf('_api_secret'))}`;

      if (!admin.has(domain)) {

        const password = getStorefrontPassword(domain);

        stores.push({ domain, password, themes: {} });
        admin.add(domain);

      }

    }
  }

  if (stores.length > 0) return stores;

  missingEnv($.cwd);

}

/**
 * Store Authorization URL
 *
 * Generate the the authorization URL to be used for requests.
 */
export function authURL (domain: string): AxiosRequestConfig {

  let api_token = domain + '_api_token';

  if (!has(api_token, $.env.vars)) {
    api_token = api_token.toUpperCase();
  }

  if (has(api_token, $.env.vars)) {
    return {
      baseURL: `https://${domain}.myshopify.com/admin`,
      headers: { 'X-Shopify-Access-Token': $.env.vars[api_token] }
    };
  }

  let api_key = domain + '_api_key';
  let api_secret = domain + '_api_secret';

  if (!has(api_key, $.env.vars)) {
    api_key = api_key.toUpperCase();
  }

  if (!has(api_secret, $.env.vars)) {
    api_secret = api_secret.toUpperCase();
  }

  if (has(api_key, $.env.vars) && has(api_secret, $.env.vars)) {

    return {
      baseURL: `https://${domain}.myshopify.com/admin`,
      auth: {
        username: $.env.vars[api_key],
        password: $.env.vars[api_secret]
      }
    };

  }

  throwError(
    `Invalid or missing ${cyan(domain + '.myshopify.com')} credentials`,
    [
      `Your shop credentials in the ${cyan.bold(basename($.env.file))} file could`,
      'not be read correctly or are missing. Please check your environment file and ensure',
      'you have provided valid authorization.'
    ]
  );

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
export function getResolvedPaths <T extends string[] | Transform.Resolver> (
  filePath: string | string[],
  hook?: ((uri: string) => string | string[])
): T {

  const { cwd } = $;
  const match = isFunction(hook) ? [] : false;
  const warn = warnOption('Path Resolver');
  const path = normalPath($.dirs.input, $.cwd); // Path normalizer

  if (isArray(filePath)) {

    const paths: string[] = [];

    for (const item of filePath) {

      const uri = path(item);
      const resolved = glob.sync(uri, { cwd, absolute: true });

      if (match !== false) {
        const test = hook(uri);
        if (isString(test)) {
          match.push(test);
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

    return <T>(match === false ? paths : { paths, match: anymatch(match) });

  }

  if (isString(filePath)) {

    const uri = path(filePath);
    const paths = glob.sync(uri, { cwd });

    if (paths.length === 0) {
      warn('No files can be resolved in', filePath);
    }

    if (match !== false) {
      const test = hook(uri);
      if (isString(test)) {
        match.push(test);
      } else if (isArray(test)) {
        match.push(...test);
      }
    }

    return <T>(match === false ? paths : { paths, match: anymatch(match) });

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
 * value type might differ. See the `Transform.Resolved` interface for more information.
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
export function getTransform <
  T extends (
    ScriptTransform |
    ScriptTransform[] |
    StyleTransform |
    StyleTransform[] |
    SVGTransform |
    SVGTransform[]
)> (
  transforms: ScriptTransformer | StyleTransformer | SVGTransformer,
  opts: Transform.Options
): T {

  if (!has('assertSnippet', opts)) opts.assertSnippet = true;

  if (isString(transforms)) {

    const { paths, match } = getResolvedPaths<Transform.Resolver>(transforms, (watch) => {
      if (opts.addWatch) $.watch.add(watch);
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

        return (opts.assertSnippet ? {
          input: paths,
          rename: '[name].[ext]',
          snippet: false,
          match
        } : {
          input: paths,
          rename: '[name].[ext]',
          match
        }) as unknown as T;

      }
    }

  } else if (isArray(transforms)) {

    if (transforms.every<string>(isString)) {

      const { paths, match } = getResolvedPaths<Transform.Resolver>(transforms, watch => {
        if (opts.addWatch) $.watch.add(watch);
        return globPath(watch);
      });

      if (opts.flatten) {

        return <T>paths.map<Transform.Resolved>(input => (opts.assertSnippet ? {
          input,
          rename: basename(input),
          snippet: false
        } : {
          input,
          rename: basename(input)
        }));

      } else {

        return (opts.assertSnippet ? {
          input: paths,
          rename: '[name].[ext]',
          snippet: false,
          match
        } : {
          input: paths,
          rename: '[name].[ext]',
          match
        }) as unknown as T;

      }

    } else if (transforms.every<Input.SingleConfig>(isObject)) {

      return <T>transforms.map((option: Transform.Resolved) => {

        if (!has('input', option)) {
          invalidError({
            option: 'tranform',
            name: 'input',
            value: option,
            expects: '{ input: string | string[] }'
          });
        }

        const { paths, match } = getResolvedPaths<Transform.Resolver>(option.input, watch => {
          if (opts.addWatch) $.watch.add(watch);
          return globPath(watch);
        });

        option.match = match;
        option.input = paths[0];

        // apply snippet default is not defined
        if (opts.assertSnippet && !has('snippet', option)) option.snippet = false;

        // apply namespaced rename if no rename is defined
        if (!has('rename', option)) {

          option.rename = option.snippet
            ? '[name].liquid'
            : '[name].[ext]';

        }

        return option;

      });

    }

  } else if (isObject(transforms)) {

    const config: T[] = [];

    // config based transfrom
    if (has('input', transforms)) {

      const record = merge<Transform.Resolved>(transforms);

      const { paths, match } = getResolvedPaths<Transform.Resolver>(record.input, watch => {
        if (opts.addWatch) $.watch.add(watch);
        return globPath(watch);
      });

      // apply snippet default if not defined
      if (opts.assertSnippet && !has('snippet', record)) {
        record.snippet = false;
      }

      // apply namespaced rename if no rename is defined
      if (!has('rename', record)) {
        record.rename = record.snippet ? '[name].liquid' : '[name].[ext]';
      }

      if (opts.flatten) {

        for (const input of paths) {
          config.push(assign({}, record as T, { input }));
        }

      } else {

        record.input = paths;
        record.match = match;

        config.push(record as T);

      }

    } else {

      // rename based config
      for (const prop in transforms) {

        const record: Transform.Resolved = { snippet: prop.startsWith('snippets/') };
        const asset = prop.startsWith('assets/');
        const option = transforms[prop];
        const rename = asset || record.snippet;

        if (isString(option)) { // { 'assets/file': '...' }

          if (rename) {
            record.rename = asset ? prop.slice(7) : prop.slice(9);
          }

          const { paths, match } = getResolvedPaths<Transform.Resolver>(option, watch => {
            if (opts.addWatch) $.watch.add(watch);
            return globPath(watch);
          });

          if (paths) {
            if (opts.flatten) {
              for (const input of paths) config.push(assign({}, record as T, { input }));
            } else {
              config.push(assign({}, record as T, { input: paths, match }));
            }
          }

        } else if (isObject<Input.SingleConfig>(option)) { // { 'assets/file': {} }

          if (!has('input', option)) {

            invalidError({
              option: 'transform',
              name: prop,
              value: option,
              expects: '{ input: string | string[] }'
            });

          }

          const { paths, match } = getResolvedPaths<Transform.Resolver>(option.input, watch => {
            if (opts.addWatch) $.watch.add(watch);
            return globPath(watch);
          });

          if (paths.length > 0) {

            const merge = rename
              ? assign({}, option, record as T, { rename: asset ? prop.slice(7) : prop.slice(9) })
              : assign({}, record, option);

            if (opts.flatten) {
              for (const input of paths) {
                config.push(assign(<T>{}, merge, { input }));
              }
            } else {
              config.push(assign(<T>merge, { input: paths, match }));
            }
          }

        } else if (isArray<string[]>(option)) { // { 'assets/file': [''] }

          if (option.every(isString)) {

            const { paths, match } = getResolvedPaths<Transform.Resolver>(option, watch => {
              if (opts.addWatch) $.watch.add(watch);
              return globPath(watch);
            });

            if (hasRenameNamespace(prop)) record.rename = basename(prop);

            if (paths) {
              if (opts.flatten) {
                for (const input of paths) {
                  config.push(assign(<T>{}, record, { input }));
                }
              } else {
                config.push(assign(<T>{}, record, { input: paths, match }));
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

    return config as unknown as T;

  }

};

/**
 * Get Required modules
 *
 * Ensures that peer dependencies exists for
 * the transform processors.
 */
export function getModules (pkg: PKG, name: string) {

  if (has('devDependencies', pkg)) {
    if (has(name, pkg.devDependencies)) return true;
  }

  if (has('dependencies', pkg)) {
    if (has(name, pkg.dependencies)) return true;
  }

  if (has('peerDependencies', pkg)) {
    if (has(name, pkg.peerDependencies)) return true;
  }

  if (has('optionalDependencies', pkg)) {
    if (has(name, pkg.peerDependencies)) return true;
  }

  return false;

};

/**
 * Get Config File
 *
 * Locates the `syncify.config` file by checking the extensions
 */
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
 * Loads config files for for node projects.
 * Supports loading config as es module or common js module,
 */
export async function readConfigFile <T> (filename: string, options?: Partial<BundleRequire>): Promise<{
  config: T;
  path: string;
}> {

  try {

    const path = await getConfigFilePath(filename);

    if (path !== null) {

      const config = await bundleRequire({
        cwd: $.cwd,
        filepath: path,
        ...(options || {})
      });

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
 * Check for the existence of a rename namespace
 *
 * @param rename The rename string value
 */
export function hasRenameNamespace (rename: string) {

  return /\[(?:file|name|dir|ext)\]/.test(rename);

}

/**
 * Rename File
 *
 * String parser for file renaming. Uses the common braced
 * reference structures found in most bundlers.
 */
export function renameFileParse (src: string, pattern?: string): {
 /**
   * The filename extension including the dot, eg: `.liquid`
   *
   * @example
   *
   * '.ext'
   */
  ext: string;
  /**
   * The {@link lastPath} parent directory name. This will be used for `[dir]` matches
   *
   * @example
   *
   * '/project/sections/foo/file.liquid' > 'foo'
   */
  dir: string;
  /**
   * The filename without extension
   *
   * @example
   *
   *  'filename.ext' > 'filename'
   */
  file: string;
  /**
   * The new name of the file (i.e, the rename result).
   *
   * @example
   * // Say we have passed the following arguments:
   * renameFileParse('/project/sections/foo/file.liquid', '[dir]-[file]')
   *
   * // The value here will be the renamed filename, e.g:
   * 'foo-file.liquid'
   */
  name: string;
  /**
   * The input base filename including file extension.
   * @example
   *
   * 'filename.ext'
   */
  base: string;
} {

  let rename = pattern;

  // Get the filename (remember we flattened this earlier)
  const dir = lastPath(src);

  // file input extension
  const ext = extname(src);

  // Get the filename (remember we flattened this earlier)
  const file = basename(src, ext);

  if (isUndefined(pattern)) return { dir, ext, file, name: file, base: file + ext };

  if (/(\[dir\])/.test(rename)) rename = rename.replace('[dir]', dir);
  if (/(\[name\])/.test(rename)) rename = rename.replace('[name]', file);
  if (/(\[file\])/.test(rename)) rename = rename.replace('[file]', file);
  if (/(\.?\[ext\])/.test(rename)) rename = rename.replace(/\.?\[ext\]/, ext);

  const name = pattern.replace(pattern, rename);

  return {
    ext,
    file,
    dir,
    name,
    base: name + ext
  };
};
