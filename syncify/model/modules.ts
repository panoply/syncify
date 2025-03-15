/* eslint-disable quote-props */
import type { Dependencies, Import, ImportMap } from 'types';

import { throwError } from '~cli/throws';
import { o } from '~utils';

const IMPORT_MAP: ImportMap = o({
  'smol-toml': 'toml',
  'js-yaml': 'yaml',
  'svgo': 'svgo',
  'tailwindcss': 'tailwind',
  'postcss': 'postcss',
  'sass-embedded': 'sass',
  'clean-css': 'cleancss',
  'markdown-it': 'markdown',
  'adm-zip': 'admzip',
  'gray-matter': 'matter',
  'html-minifier-terser': 'terser'
});

/**
 * Module Imports
 *
 * Dynamically imports third-party dependencies, loads and caches them.
 * Repeating calls will use the cache.
 */
export const $import = Object.assign(async function <T extends Dependencies> (name: T) {

  const id = IMPORT_MAP[name];

  if ($import[id] !== null) return $import[id];

  try {

    const resolve = await import(name);

    $import[id] = resolve.default || resolve;

    return $import[id];

  } catch (e) {

    $import[id] = null;

    throwError(`Module import failed for ${name}`, [
      'Please ensure the module is installed correctly. If this error persists, try',
      'to reinstall Syncify or install the import in isolation.'
    ]);

  }
}, {
  toml: null,
  yaml: null,
  postcss: null,
  svgo: null,
  sass: null,
  markdown: null,
  cleancss: null,
  tailwind: null,
  terser: null,
  admzip: null,
  matter: null
}) as Import;
