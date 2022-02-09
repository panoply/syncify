import { has, isNil, isType } from 'rambdax';
import c from 'ansis';
import { IFile, Syncify, IJson } from 'types';
import * as log from 'cli/logs';
import { join } from 'path';
import { readJson, writeFile } from 'fs-extra';
import { is } from 'shared/native';
import { Type } from 'config/file';
import stringify from 'fast-safe-stringify';
import { byteSize } from 'shared/helpers';

/**
 * Parse JSON
 *
 * Strips `$schema` spec field from JSON
 */
export const $schema = (file: IFile, data: { $schema?: string }) => {

  if (!has('$schema', data)) return data;

  const json = { ...data };

  delete json.$schema;

  log.fileTask(file, `stripped ${c.bold.yellow('$schema')} field removed from JSON`);

  return json;

};

/**
 * Parse JSON
 *
 * Parses a string into valid JSON
 */
export const parse = (data: string) => {

  try {

    return JSON.parse(data);

  } catch (e) {

    log.throws(e);

    return null;

  }

};

/**
 * Minify JSON
 *
 * Metafields are trimmed of whitespace
 * and comments. Syncify allows JSON with
 * comments be provided, this function strips
 * them and will push a minified to the store.
 */
export const minify = (data: string, space = 0): any => {

  try {

    return stringify(data, null, space);

  } catch (e) {

    log.throws(e);

    return null;

  }

};

/**
 * Minify and Write JSON file
 *
 * Applies minification and publishment of
 * passed in file and contents. We do not publish
 * metafield file types to output directory.
 */
export const transform = (file: IFile, data: string, space = 0): any => {

  const minified = minify(data, space);

  if (isNil(minified)) return minified;

  if (is(space, 0)) {
    log.fileTask(file, 'minified json file');
    log.fileSize(file.size, byteSize(minified));
  }

  if (is(file.type, Type.Metafield)) {
    return minified;
  } else {
    writeFile(join(file.output, file.key), minified, (e) => e ? log.errors(e) : null);
    return minified;
  }

};

/**
 * Read JSON
 *
 * Handler function for a content modifier
 * cb that one can optionally execute
 * from within scripts.
 */
export const compile = async (file: IFile, options: IJson, cb: typeof Syncify.hook): Promise<string> => {

  const data = await readJson(file.path);

  file.size = byteSize(data);

  const space = options.minify.apply ? 0 : options.spaces;
  const refs = options.minify.removeSchemaRefs ? $schema(file, data) : data;

  if (!isType('Function', cb)) return transform(file, refs, space);

  const update = cb.apply({ ...file }, refs);

  if (isType('Undefined', update)) {

    return transform(file, refs, space);

  } else if (isType('Array', update) || isType('Object', update)) {

    return transform(file, update, space);

  } else if (isType('String', update)) {

    return transform(file, parse(update), space);

  } else if (Buffer.isBuffer(update)) {

    return transform(file, parse(update.toString()), space);

  }

  return transform(file, refs, space);

};
