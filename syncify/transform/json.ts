import type { Syncify } from 'types';
import { isNil } from 'rambdax';
import { readFile, writeFile } from 'fs-extra';
import parseJSON, { JSONError } from 'parse-json';
import { File, Type } from 'syncify:file';
import { timer } from 'syncify:timer';
import { byteSize, byteConvert, sizeDiff } from 'syncify:sizes';
import { find } from 'syncify:requests/assets';
import * as log from 'syncify:log';
import * as error from 'syncify:errors';
import * as u from 'syncify:utils';
import { $ } from 'syncify:state';
import { queue } from 'syncify:requests/client';
import { tailwindParse } from 'syncify:style';

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
    const size = sizeDiff(minified, file.size);
    log.minified('JSON', size.before, size.after, size.saved);
  } else {
    log.transform('JSON', file.namespace, byteConvert(file.size), timer.now());
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
export async function compile (file: File, sync: any, cb: Syncify): Promise<string> {

  if ($.mode.watch) timer.start();

  const json = await readFile(file.input).catch(
    error.write('Error reading JSON file', {
      file: file.relative
    })
  );

  if (u.isBuffer(json)) {

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

    if (u.isEmpty(data)) {
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

    let content: string;

    if (u.isFunction(cb)) {

      const update = cb.apply({ ...file }, data);

      if (u.isUndefined(update)) {
        content = await jsonCompile(file, data, space);
      } else if (u.isArray(update) || u.isObject(update)) {
        content = await jsonCompile(file, u.sanitize(update), space);
      } else if (u.isString(update)) {
        content = await jsonCompile(file, parse(file, update), space);
      } else if (u.isBuffer(update)) {
        content = await jsonCompile(file, parse(file, update.toString()), space);
      }
    } else {

      content = await jsonCompile(file, data, space);
    }

    $.cache.checksum[file.input] = u.checksum(content);

    if ($.processor.tailwind.map !== null && file.type !== Type.Style) {

      const request = await tailwindParse(file, [ [ file, content ] ]);

      for (const req of request) {
        await sync('put', req[0], req[1]);
        log.syncing(req[0].key);
      }

    } else {

      log.syncing(file.key);
      await sync('put', file, content);
    }

    if ($.mode.hot) {
      await queue.onIdle().then(() => $.wss.replace());
    }

  }
};
