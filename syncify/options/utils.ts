import type {
  Input,
  PKG,
  ScriptTransform,
  ScriptTransformer,
  StyleTransform,
  StyleTransformer,
  SVGTransform,
  SVGTransformer,
  Transform
} from 'types';

import { basename, extname } from 'node:path';

import anymatch from 'anymatch';
import glob from 'fast-glob';
import { pathExists } from 'fs-extra';

import { acquire } from '@syncify/acquire';
import { bold, Create, yellowBright } from '@syncify/ansi';

import { invalidError, typeError, warnOption } from '~cli/throws';
import { CONFIG_FILE_EXT } from '~const';
import { error } from '~errors';
import { parseProcessorConfigs } from '~process/files';
import { assign, has, isArray, isFunction, isObject, isString, isUndefined, merge } from '~utils';
import { globPath, lastPath, normalPath } from '~utils/paths';

import { $ } from '$';

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

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
export function getTransform <T extends (
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

    const { paths, match } = getResolvedPaths<Transform.Resolver>(transforms, watch => globPath(watch));

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

      const { paths, match } = getResolvedPaths<Transform.Resolver>(transforms, watch => globPath(watch));

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

        const { paths, match } = getResolvedPaths<Transform.Resolver>(option.input, watch => globPath(watch));

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
        // if (opts.addWatch) $.watch.add(watch);
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
            // if (opts.addWatch) $.watch.add(watch);
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
            // if (opts.addWatch) $.watch.add(watch);
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

            const { paths, match } = getResolvedPaths<Transform.Resolver>(option, watch => globPath(watch));

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
export async function readConfigFile <T> (
  path: string,
  namespace: string,
  onRebuild: (bundle: any) => void
): Promise<{ config: T; file: string; }> {

  try {

    const file = await getConfigFilePath(path);

    if (file !== null) {

      const config = await acquire({
        file,
        cwd: $.cwd,
        tsconfig: false,
        type: has('type', $.pkg) ? $.pkg.type : 'commonjs',
        onRebuild,
        onError: (errors) => {

          const p = parseProcessorConfigs(file, namespace);

          Create({ type: 'error' })
          .Append('BUILD ERROR', bold)
          .Wrap(`The ${yellowBright(p.base)} file could not be processed.`)
          .toLog({ clear: true });

          error.esbuild(p, errors);

        }
      });

      return { file, config };
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
