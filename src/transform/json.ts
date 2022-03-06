import { has, isNil, isType } from 'rambdax';
import * as c from 'cli/ansi';
import { IFile, Syncify } from 'types';
import { readJson, writeFile } from 'fs-extra';
import { is } from 'shared/native';
import { Type } from 'process/files';
import { byteSize } from 'shared/shared';
import stringify from 'fast-safe-stringify';
import { log } from 'cli/stdout';
import { terser, transform } from 'options';

/**
 * Parse JSON
 *
 * Strips `$schema` spec field from JSON
 */
export function $schema (file: IFile, data: { $schema?: string }) {

  if (!has('$schema', data)) return data;

  const json = { ...data };

  delete json.$schema;

  log.print(`stripped ${c.bold.yellow('$schema')} field removed from JSON`);

  return json;

};

/**
 * Parse JSON
 *
 * Parses a string into valid JSON
 */
export function parse (data: string) {

  try {

    return JSON.parse(data);

  } catch (e) {

    log.throw(e);

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
export function minify (data: string, space = 0): any {

  try {

    return stringify(data, null, space);

  } catch (e) {

    log.throw(e);

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
export function jsonCompile (file: IFile, data: string, space = 0): any {

  const minified = minify(data, space);

  if (isNil(minified)) return minified;

  if (is(space, 0)) {
    log[file.namespace]('minified json file');
    // file.size,
    log.print(`${byteSize(minified)}`);

  } else {
    log[file.namespace](`${c.cyan(file.key)}`);
  }

  if (is(file.type, Type.Metafield)) {
    return minified;
  } else {
    writeFile(file.output, minified, (e) => e ? log.error(e.message) : null);
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
export async function compile (file: IFile, cb: typeof Syncify.hook): Promise<string> {

  const data = await readJson(file.input);

  file.size = byteSize(data);

  const space = terser.minify.json ? 0 : transform.json.indent;
  const refs = terser.liquid.removeSchemaRefs ? $schema(file, data) : data;

  if (!isType('Function', cb)) return jsonCompile(file, refs, space);

  const update = cb.apply({ ...file }, refs);

  if (isType('Undefined', update)) {

    return jsonCompile(file, refs, space);

  } else if (isType('Array', update) || isType('Object', update)) {

    return jsonCompile(file, update, space);

  } else if (isType('String', update)) {

    return jsonCompile(file, parse(update), space);

  } else if (Buffer.isBuffer(update)) {

    return jsonCompile(file, parse(update.toString()), space);

  }

  return jsonCompile(file, refs, space);

};
