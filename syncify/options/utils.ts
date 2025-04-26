import type { Input, PathConfig, PathsBundle, PKG, Transform } from 'types';

import { basename, dirname, extname, join } from 'node:path';

import anymatch from 'anymatch';
import glob from 'fast-glob';
import { pathExists } from 'fs-extra';

import { acquire } from '@syncify/acquire';
import { bold, Create, yellowBright } from '@syncify/ansi';

import { throws } from '~cli/throws';
import { warnOption } from '~cli/warnings';
import { CONFIG_FILE_EXT, PATH_KEYS } from '~const';
import { error } from '~errors';
import { parseProcessorConfigs } from '~process/files';
import { forEach, has, isArray, isFunction, isObject, isString, merge, o, s } from '~utils';
import { globPath, lastPath, normalPath } from '~utils/paths';

import { $ } from '$';

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Generates the {@link $.paths} store which will hold
 * location URI's, globs and various other information
 * which pertain to paths.
 */
export function createPathsState (): PathsBundle {

  const state: PathsBundle = o();

  for (const path of PATH_KEYS) {

    state[path] = o<PathConfig>({
      input: null,
      root: null,
      match: null,
      config: null,
      exclude: s(),
      rename: []
    });

  }

  return state;

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

  const match = isFunction(hook) ? [] : false;
  const warn = warnOption('Path Resolver');
  const getUri = normalPath($.dirs.input, $.cwd); // Path normalizer

  if (isArray(filePath)) {

    const paths: string[] = [];

    for (const item of filePath) {

      const uri = getUri<string>(item);
      const resolved = glob.sync(uri, {
        cwd: $.cwd,
        absolute: true
      });

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

    return <T>(match === false ? paths : {
      paths,
      match: anymatch(match)
    });

  }

  if (isString(filePath)) {

    const uri = getUri<string>(filePath);
    const paths = glob.sync(uri, { cwd: $.cwd });

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

    return <T>(match === false ? paths : {
      paths,
      match: anymatch(match)
    });

  }

  throws.typeError({
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
export function getTransform <T extends Transform.Resolved[] | Transform.Resolved> (
  transforms: Transform.Param,
  opts: Transform.Options
): T {

  if (!has('assertSnippet', opts)) opts.snippet = true;

  if (isString(transforms)) {

    const { paths, match } = getResolvedPaths<Transform.Resolver>(transforms, watch => globPath(watch));

    return opts.flatten
      ? <T>paths.map(input => ({ input, rename: basename(input), snippet: false }))
      : <T>{ input: paths, rename: '[name].[ext]', snippet: false, match };

  } else if (isArray(transforms)) {

    if (transforms.every<string>(isString)) {

      const { paths, match } = getResolvedPaths<Transform.Resolver>(transforms, globPath);

      opts.flatten
        ? <T>paths.map<Transform.Resolved>(input => ({ input, rename: basename(input), snippet: false }))
        : <T>{ input: paths, rename: '[name].[ext]', snippet: false, match };

    } else if (transforms.every<Input.SingleConfig>(isObject)) {

      return <T>transforms.map((option: Transform.Resolved) => {

        if (!has('input', option)) {
          throws.option({
            option: 'tranform',
            name: 'input',
            value: option,
            expects: '{ input: string | string[] }'
          });
        }

        const { paths, match } = getResolvedPaths<Transform.Resolver>(option.input, globPath);

        option.match = match;
        option.input = paths[0];
        option.snippet = has('snippet', option) ? option.snippet : false;

        // apply namespaced rename if no rename is defined
        if (!has('rename', option)) {
          option.rename = option.snippet ? '[name].liquid' : '[name].[ext]';
        }

        return option;

      });

    }

  } else if (isObject(transforms)) {

    const config: T[] = [];

    // config based transform
    if (has('input', transforms)) {

      const record = merge<Transform.Resolved>(transforms);
      const { paths, match } = getResolvedPaths<Transform.Resolver>(record.input, globPath);

      // apply snippet default if not defined
      if (!has('snippet', record)) {
        record.snippet = false;
      }

      // apply namespaced rename if no rename is defined
      if (!has('rename', record)) {
        record.rename = record.snippet ? '[name].liquid' : '[name].[ext]';
      }

      if (opts.flatten) {
        forEach(input => config.push({ ...<T>record, input }), paths);
      } else {
        record.input = paths;
        record.match = match;
        config.push(<T>record);
      }

    } else {

      // rename based config
      for (const prop in transforms) {

        const record: Transform.Resolved = { snippet: prop.startsWith('snippets/') };
        const asset = prop.startsWith('assets/');
        const option = transforms[prop];
        const rename = asset || record.snippet;

        if (isString(option)) { // { 'assets/file': '...' }

          if (rename) record.rename = asset ? prop.slice(7) : prop.slice(9);

          const { paths, match } = getResolvedPaths<Transform.Resolver>(option, globPath);

          if (opts.flatten) {
            for (const input of paths) {
              config.push({ ...<T>record, input });
            }
          } else {
            config.push({ ...<T>record, input: paths, match });
          }

        } else if (isObject<Input.SingleConfig>(option)) { // { 'assets/file': {} }

          if (!has('input', option)) {

            throws.option({
              option: 'transform',
              name: prop,
              value: option,
              expects: '{ input: string | string[] }'
            });

          }

          const { paths, match } = getResolvedPaths<Transform.Resolver>(option.input, globPath);

          if (paths.length > 0) {

            const merge = rename
              ? <T>{ ...option, ...<T>record, rename: asset ? prop.slice(7) : prop.slice(9) }
              : <T>{ ...record, ...option };

            if (opts.flatten) {
              forEach(input => config.push({ ...<T>merge, input }), paths);
            } else {
              config.push({ ...<T>merge, input: paths, match });
            }
          }

        } else if (isArray<string[]>(option)) { // { 'assets/file': [''] }

          if (option.every(isString)) {

            const { paths, match } = getResolvedPaths<Transform.Resolver>(option, globPath);

            if (hasRenameNamespace(prop)) record.rename = basename(prop);

            if (paths) {
              if (opts.flatten) {
                forEach(input => config.push({ ...<T>record, input }), paths);
              } else {
                config.push({ ...<T>record, input: paths, match });
              }
            }

          } else {

            throws.typeError({
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
  filename: string,
  namespace: string,
  onRebuild: (bundle: any) => void
): Promise<{
  config: T;
  file: string;
}> {

  try {

    const path = join($.dirs.config, filename);
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

    throw error.acquire(e);

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
 * Extracts the output directory names where files will be written
 */
export function extractKeyDirName (uri: string) {

  // Normalize the path to use forward slashes and get the directory
  const dir = dirname(uri).replace(/\\/g, '/');

  return dir.endsWith('templates/metaobject')
    ? 'templates/metaobject'
    : dir.endsWith('templates/customers')
      ? 'templates/customers'
      : lastPath(uri);
}

/**
 * Returns a `key` value from a resolved input and output URI, extracting the uri directory name and filename.
 *
 * @example
 *
 * // Before Correction
 * //
 * renameCorrect(
 *  '<uri>/source/sections/foo/file.liquid' // input
 *  '<uri>/theme/sections/foo/file.liquid', // current output
 *  '[dir]-[name]' // rename pattern
 * )
 *
 * // Returns
 * {
 *   output: '<uri>/theme/sections/foo-file.liquid',
 *   key: 'sections/foo-file.liquid'
 * }
 *
 */
export function renameCorrect (input: string, output: string, pattern: string) {

  const dir = extractKeyDirName(output);
  const { base } = renameFileParse(input, pattern);

  return {
    key: join(dir, base),
    output: join(dirname(output), base)
  };

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
   * ```js
   * '.ext'
   * ```
   */
  ext: string;
  /**
   * The {@link lastPath} parent directory name. This will be used for `[dir]` matches
   *
   * ```js
   * '/project/sections/foo/file.liquid' > 'foo'
   * ```
   */
  dir: string;
  /**
   * The filename without extension
   *
   * ```js
   * 'filename.ext' > 'filename'
   * ```
   */
  file: string;
  /**
   * The new name of the file (i.e, the rename result).
   *
   * ```js
   * // Say we have passed the following arguments:
   * renameFileParse('/project/sections/foo/file.liquid', '[dir]-[file]')
   *
   * // The value here will be the renamed filename, e.g:
   * 'foo-file.liquid'
   * ```
   */
  name: string;
  /**
   * The input base filename including file extension.
   *
   * ```js
   * 'filename.ext'
   * ```
   */
  base: string;
} {

  // Get the last directory name (e.g., `templates`)
  const dir = lastPath(src);
  const base = basename(src); // e.g., `cart.json`
  const ext = extname(base); // e.g., `.json`
  const file = basename(base, ext); // e.g., `cart`

  // If no pattern is provided, return basic components
  if (!pattern) {
    return {
      ext,
      file,
      dir,
      name: file,
      base: file + ext
    };
  }

  // Perform pattern replacement
  const name = pattern.replace(/\[dir\]|\[name\]|\[file\]|\.?\[ext\]/g, match => {
    switch (match) {
      case '[dir]':
        return dir;
      case '[name]':
        return file;
      case '[file]':
        return file;
      case '[ext]':
        return ext;
      case '.[ext]':
        return ext;
      default:
        return match;
    }
  });

  return {
    ext,
    file,
    dir,
    name,
    base: name + ext
  };
};
