import type { Syncify } from 'types';
import { isNil } from 'rambdax';
import { readFile, writeFile } from 'fs-extra';
import parseJSON, { JSONError } from 'parse-json';
import { File, Type } from 'syncify:file';
import { timer } from 'syncify:timer';
import * as log from 'syncify:log';
import * as error from 'syncify:errors';
import {
  isBuffer,
  isArray,
  isObject,
  isUndefined,
  isString,
  isFunction,
  byteSize,
  byteConvert,
  fileSize,
  sanitize,
  isEmpty
} from 'syncify:utils';

import { find } from 'syncify:requests/assets';
import { $ } from 'syncify:state';

/**
 * Parse JSON
 *
 * Parses a string into valid JSON
 */
export function parse (file: File, data: string): any {

  try {

    return parseJSON(data);

  } catch (e) {

    log.error(file.relative, {
      notify: {
        title: 'JSON Error',
        message: `Error when parsing ${file.base}`
      }
    });

    if (e instanceof JSONError) {

      error.json(e, file);

    }

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
export async function jsonCompile (file: File, data: string, space = 0) {

  const minified = minifyJSON(data, space);

  if (isNil(minified)) {
    if ($.mode.watch) timer.stop();
    return data;
  }

  if (space === 0) {
    const size = fileSize(minified, file.size);
    log.minified('JSON', size.before, size.after, size.saved);
  } else {
    log.transform(file.namespace, byteConvert(file.size));
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

  if ($.mode.watch) timer.start();

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

    if (file.type === Type.Config && file.name === 'settings_data') {
      for (const theme of $.sync.themes) {

        const settings_data = await find('config/settings_data.json', theme);

        if (settings_data) {

          // JSON.parse(settings_data);
          // TODO

        }
      }

    }

    const data = parse(file, read);

    if (data === null) return null;

    if (isEmpty(data)) {
      log.skipped(file, 'empty file');
      return null;
    }

    let space: number = $.processor.json.indent;

    if ($.mode.terse) {
      if (file.type === Type.Asset) {
        if ($.terser.json.assets) space = 0;
      } else if (file.type === Type.Locale) {
        if ($.terser.json.locales) space = 0;
      } else if (file.type === Type.Template) {
        if ($.terser.json.templates) space = 0;
      } else if (file.type === Type.Metafield) {
        if ($.terser.json.metafields) space = 0;
      } else if (file.type === Type.Metaobject) {
        if ($.terser.json.metaobject) space = 0;
      } else if (file.type === Type.Section) {
        if ($.terser.json.groups) space = 0;
      } else if (file.type === Type.Config) {
        if ($.terser.json.config) space = 0;
      }
    }

    if (!isFunction(cb)) return jsonCompile(file, data, space);

    const update = cb.apply({ ...file }, data);

    if (isUndefined(update)) {
      return jsonCompile(file, data, space);
    } else if (isArray(update) || isObject(update)) {
      return jsonCompile(file, sanitize(update), space);
    } else if (isString(update)) {
      return jsonCompile(file, parse(file, update), space);
    } else if (isBuffer(update)) {
      return jsonCompile(file, parse(file, update.toString()), space);
    }

    await jsonCompile(file, data, space);

  }
};
