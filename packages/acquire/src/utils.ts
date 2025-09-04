import type { GetOutputFile } from './types';
import type { Loader } from 'esbuild';

import { createRequire } from 'node:module';
import { extname } from 'node:path';
import { pathToFileURL } from 'node:url';

import { REGEX_EXTJS } from './const';

/**
 * Returns a UUID string
 */
export const uuid = () => Math.random().toString(36).slice(2);

// Use a random path to avoid import cache
export const outfile: GetOutputFile = (path, format: 'esm' | 'cjs') => {

  return path.replace(REGEX_EXTJS, `-${uuid()}.${format === 'esm' ? 'mjs' : 'cjs'}`);

};

export const match = (id: string, patterns?: (string | RegExp)[]) => {

  return !patterns
    ? false
    : patterns.some((p) => p instanceof RegExp ? p.test(id) : id === p || id.startsWith(p + '/'));

};

export function inferLoader (ext: string): Loader {

  if (ext === '.mjs' || ext === '.cjs') return 'js';
  if (ext === '.mts' || ext === '.cts') return 'ts';

  return ext.slice(1) as Loader;

}

export function jsonc (data: string) {

  try {

    return new Function('return ' + data.trim())(); // like not the best way, but is fastest.

  } catch (_) {

    // Silently ignore any errors as per tsc/jsonc-parser behaviour
    return {};

  }

}

/**
 * **CJSorESM**
 *
 * Returns a module format based on the the conditions of provided parameters.
 * The `type` parameter is optional and can be omitted.
 *
 * @param file
 * The filename path or basename
 *
 * @param type
 * The value of `type` in a `package.json` file.
 */
export function CJSorESM (file: string, type?: string): 'esm' | 'cjs' {

  const ext = extname(file);

  if (ext === '.js' || ext === '.ts') return type === 'module' ? 'esm' : 'cjs';
  if (ext === '.mts' || ext === '.mjs') return 'esm';
  if (ext === '.mjs') return 'esm';

  return 'cjs';

}

/**
 * **$import**
 *
 * Dynamically import files based on the `format` reference provided.
 * When format is `esm`, dynamic `import` is used, resolving to the default.
 * Passing `cjs` format applies `createRequire` import, whereas omitting or
 * format which is not `esm` or `cjs` will apply `require`.
 *
 * @param input
 * The file path to import
 *
 * @param format
 * The format which determines the import
 */
export async function $import <T = any> (input: string, format?: 'esm' | 'cjs'): Promise<T> {

  if (format === 'esm') {

    // For ES modules, use dynamic import which returns a promise
    return import(pathToFileURL(input).href);

  } else {

    const { href } = pathToFileURL(createRequire(import.meta.url).resolve(input));
    const $module = await import(href);

    return $module.default || $module;
  }

};
