import { has, isType } from 'rambdax';
import { IFile, Syncify, IJson } from 'types';
import * as log from 'cli/console';
import { readJson } from 'fs-extra';
import { is } from 'config/utils';

/**
 * Read JSON
 *
 * Handler function for a content modifier
 * callback that one can optionally execute
 * from within scripts.
 */
export async function compile (file: IFile, options: IJson, callback: typeof Syncify.hook): Promise<string> {

  let data = await readJson(file.path);

  if (options.minify.removeSchemaRefs) data = strip(file, data);

  if (!isType('Function', callback)) return minify(file, data, options.minify.apply ? 2 : 0);

  const update = callback.apply({ ...file }, data);

  if (isType('Undefined', update)) {

    return minify(file, data, options.minify.apply ? 2 : 0);

  } else if (isType('Array', update) || isType('Object', update)) {

    return minify(file, update, options.minify.apply ? 2 : 0);

  } else if (isType('String', update)) {

    return minify(file, parse(update), options.minify.apply ? 2 : 0);

  } else if (Buffer.isBuffer(update)) {

    return minify(file, parse(update.toString()), options.minify.apply ? 2 : 0);

  }

  return minify(file, data, options.minify.apply ? 2 : 0);

}

/**
 * Parse JSON
 *
 * Parses a string into valid JSON
 */
export function parse (data: string) {

  try {

    return JSON.parse(data);

  } catch (e) {

    return log.error(e);

  }

}

/**
 * Parse JSON
 *
 * Strips `$schema` spec field from JSON
 */
export function strip (file: IFile, data: { $schema?: string }) {

  if (!has('$schema', data)) return data;

  const json = { ...data };

  delete json.$schema;

  log.json('$schema field removed from ' + file.base);

  return json;

}

/**
 * Minify JSON
 *
 * Metafields are trimmed of whitespace
 * and comments. Syncify allows JSON with
 * comments be provided, this function strips
 * them and will push a minified to the store.
 */
export function minify (file: IFile, data: string, space = 0): any {

  try {

    const minified = JSON.stringify(data, null, space);

    if (is(space, 0)) log.json('minified ' + file.base);

    return minified;

  } catch (e) {

    return log.error(e);

  }

}
