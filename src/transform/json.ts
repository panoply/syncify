import { isEmpty, isNil, isType } from 'rambdax';
import { File, Syncify } from 'types';
import { readFile, writeFile } from 'fs-extra';
import { isBuffer, isArray, isObject, isUndefined, isString, isFunction, toBuffer } from '~utils/native';
import { Type } from '~process/files';
import { byteSize, byteConvert, fileSize } from '~utils/utils';
import { bundle, minify } from '~config';
import * as timer from '~utils/timer';
import { log, error } from '~log';

/**
 * Parse JSON
 *
 * Parses a string into valid JSON
 */
export function parse (data: string) {

  try {

    return JSON.parse(data);

  } catch (e) {

    console.log(e);

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
export function minifyJSON (data: string, space = 0): any {

  try {

    return JSON.stringify(data, null, space);

  } catch (e) {

    console.log(e);

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
export async function jsonCompile (file: File, data: string, space = 0): any {

  const minified = minifyJSON(data, space);

  if (isNil(minified)) {
    timer.stop();
    return data;
  }

  if (!bundle.mode.build) {
    if (space === 0) {
      const size = fileSize(minified, file.size);
      log.minified('JSON', size.before, size.after, size.saved);
    } else {
      log.transform(`${file.namespace} → ${byteConvert(file.size)}`);
    }
  }

  if (file.type === Type.Metafield) return minified;

  writeFile(file.output, minified).catch(
    error.write('Error writing JSON', {
      file: file.relative
    })
  );

  return minified;

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

  const json = await readFile(file.input).catch(
    error.write('Error reading JSON file', {
      file: file.relative
    })
  );

  if (isBuffer(json)) {

    const read = json.toString();

    file.size = byteSize(read);

    if (read.trim().length === 0) {
      log.skipped(file, 'empty file');
      return null;
    }

    const data = parse(read);

    if (isEmpty(data)) {
      log.skipped(file, 'empty file');
      return null;
    }

    let space: number = bundle.processor.json.indent;

    if (bundle.mode.minify) {
      if (file.type === Type.Asset) {
        if (minify.json.assets) space = 0;
      } else if (file.type === Type.Locale) {
        if (minify.json.locales) space = 0;
      } else if (file.type === Type.Template) {
        if (minify.json.templates) space = 0;
      } else if (file.type === Type.Metafield) {
        if (minify.json.metafields) space = 0;
      } else if (file.type === Type.Config) {
        if (minify.json.config) space = 0;
      }
    }

    if (!isFunction(cb)) return jsonCompile(file, data, space);

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

  }
};
