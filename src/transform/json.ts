import { isNil, isType } from 'rambdax';
import { File, Syncify } from 'types';
import { readFile, writeFile } from 'fs-extra';
import { is, isBuffer, isArray, isObject, isUndefined, isString } from '../shared/native';
import { Type } from '../process/files';
import { byteSize, byteConvert } from '../shared/utils';
import { log, c } from '../logger';
import { bundle } from '../config';
import * as timer from '../process/timer';

/**
 * Parse JSON
 *
 * Parses a string into valid JSON
 */
export function parse (data: string) {

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
export function minify (data: string, space = 0): any {

  try {

    return JSON.stringify(data, null, space);

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
export function jsonCompile (file: File, data: string, space = 0): any {

  const minified = minify(data, space);

  if (isNil(minified)) {
    timer.stop();
    return minified;
  }
  if (is(space, 0)) {
    const size = byteSize(minified);
    if (bundle.mode.watch) {
      log.info(`created ${c.bold(file.key)} ${c.gray(`µ${timer.stop()}`)}`);
    } else {
      log.info(`${c.cyan(file.key)} ${c.bold(byteConvert(size))} ${c.gray(`saved ${byteConvert(file.size - size)}`)}`);
    }
  }

  if (is(file.type, Type.Metafield)) {
    return minified;
  } else {
    writeFile(file.output, minified, (e) => e ? log.throws(e.message) : null);
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
export async function compile (file: File, cb: Syncify): Promise<string> {

  if (bundle.mode.watch) timer.start();

  const json = await readFile(file.input);

  file.size = byteSize(json);

  const data = parse(json.toString());
  const space = bundle.minify.json[file.namespace] ? 0 : bundle.json.indent;

  if (bundle.mode.watch) {
    log.info(`created ${c.bold(file.key)} ${c.gray(`µ${timer.stop()}`)}`);
  }
  if (!isType('Function', cb)) return jsonCompile(file, data, space);

  const update = cb.apply({ ...file }, data);

  if (isUndefined(update)) {
    return jsonCompile(file, data, space);
  } else if (isArray(update) || isObject(update)) {
    return jsonCompile(file, update, space);
  } else if (isString(update)) {
    return jsonCompile(file, parse(update), space);
  } else if (isBuffer(update)) {
    return jsonCompile(file, parse(update.toString()), space);
  }

  return jsonCompile(file, data, space);

};
