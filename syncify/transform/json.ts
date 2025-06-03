import type { ArrayPromptOptions } from 'types';

import { join } from 'node:path';

import { readFile, writeFile } from 'fs-extra';

import { evaluate, ParseEvaluate, stringify } from '@syncify/json';
import { timer } from '@syncify/timer';

import { log } from '~cli/log';
import { error } from '~errors';
import { File, Type } from '~file';
import { themeFilesGet, themeFilesUpsertMap } from '~http/themeFiles';
import { runChecksum } from '~process/cache';
import { prompt } from '~prompt';
import { theme } from '~prompts/enquirer';
import { tailwindParse } from '~style';
import * as u from '~utils';

import { $, q } from '$';

/**
 * Parses a string into valid JSON
 */
export function parseJson (file: File, actual: string, expected?: string) {

  try {

    return expected
      ? evaluate(actual, expected, $.json.options)
      : evaluate(actual, $.json.options);

  } catch (e) {

    log.error(file.relative, {
      notify: {
        title: `Error in ${file.base}`,
        message: 'JSON Parse error occurred due to invalid syntax'
      }
    });

    error.json(e, file, 'JSON Parse Error');

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
export async function jsonCompile (file: File, json: string | ParseEvaluate) {

  const { parsed, string } = u.isString(json) ? parseJson(file, json) : json;
  const indent = $.json.terse.enabled ? indentSize(file.type) : $.json.indent;
  const output = indent === 0 ? stringify(parsed, {
    removeComments: true,
    indentSize: 0,
    arrays: $.json.options.arrays,
    objects: $.json.options.objects,
    exclude: $.json.options.exclude
  }) : string;

  if (u.isNil(output)) {
    if ($.mode.watch) timer.stop();
    return output;
  }

  if (indent === 0) {
    const { before, after, saved } = u.sizeDiff(output, file.size);
    log.minified('JSON', before, after, saved);
  } else {
    log.transform('JSON', file.namespace, u.byteConvert(file.size), timer.now());
  }

  if (file.type === Type.Metafield) return output;

  writeFile(file.output, output).catch(
    error.write('Error writing JSON', {
      file: file.input
    })
  );

  return output;

};

/**
 * Checks remote versions before carrying out sync operation.
 * Looks for a mismatch based on checksum hash.
 */
async function jsonCompare (file: File, local: string) {

  const json: ParseEvaluate[] = [];

  for (const theme of $.target) {

    const remote = await themeFilesGet(file.key, theme);

    if (remote.file !== null) {

      const data = parseJson(file, local, remote.file.body.content);

      if (data === null) return null;

      if (data && data.change === false) return data.actual.string;

      json.push(data);

    }
  }

  if (json.length > 0) {

    log.error(file.key, {
      suffix: 'version mismatch',
      notify: {
        title: 'Version Mismatch',
        message: `Local and remote versions do not align on ${file.key}`
      }
    });

    log.nl();

    const { action } = await prompt<{ action: string }>(<ArrayPromptOptions>{
      name: 'action',
      type: 'select',
      multiple: false,
      message: 'action',
      theme,
      choices: [
        {
          name: 'open',
          hint: 'View the remote version in your editor'
        },
        {
          name: 'push',
          hint: 'Replaces the remote version with local version'
        },
        {
          name: 'pull',
          hint: 'Replaces the local version with the remote version'
        },
        {
          name: 'stash',
          hint: 'Stash the remote version and push the local version'
        },
        {
          name: 'cancel',
          hint: 'Cancel the sync operation'
        }
      ]
    });

    switch (action) {

      case 'open':

        const uri = join($.dirs.temp, file.key);

        await writeFile(uri, json[0].string);

        u.openInEditor(uri);

        return null;

      case 'push':

        return json[0].actual.string;

      case 'pull':

        // TODO - Handle multiple-theme/store writes

        await writeFile(file.input, json[0].string);

        return null;

      case 'stash':

      case 'cancel':

        return null;

    }

  }

  return json[0].string;

}

function indentSize (type: Type) {

  const { options } = $.json.terse;

  switch (type) {
    case Type.Group:
      if (options.groups) return 0;
      break;
    case Type.Asset:
      if (options.assets) return 0;
      break;
    case Type.Locale:
      if (options.locales) return 0;
      break;
    case Type.Template:
      if (options.templates) return 0;
      break;
    case Type.Config:
      if (options.config) return 0;
      break;
    case Type.Metafield:
      if (options.metafields) return 0;
      break;
    case Type.Metaobject:
      if (options.metaobject) return 0;
      break;
  }

  return $.json.useTab
    ? '\t'.repeat(Math.floor($.json.indent / 2))
    : $.json.indent;

}

const isDiff = (type: Type) => (
  type === Type.Config ||
  type === Type.Template ||
  type === Type.Metaobject ||
  type === Type.Locale ||
  type === Type.Group
);

/**
 * Read JSON
 *
 * Handler function for a content modifier
 * cb that one can optionally execute
 * from within scripts.
 */
export async function JsonTransform (file: File): Promise<string> {

  $.mode.watch && timer.start();

  const read = await readFile(file.input, 'utf8').catch(
    error.write('Error reading JSON file', {
      input: file.input,
      output: file.output
    })
  );

  if (!u.isString(read)) return;

  const local = read.trim();

  file.size = u.byteSize(local);

  if (local.length === 0) {
    log.skipped(file, 'empty file');
    return;
  }

  if ($.mode.build === false && isDiff(file.type)) {
    file.value = await jsonCompare(file, local);
  } else {
    file.value = await jsonCompile(file, local);
  }

  if ($.mode.build) return file.value;

  if (file.value === null) {

    log.skipped(file.key, 'user cancelled');

    return;

  }

  if (runChecksum(file.input, file.value)) {

    log.skipped(file.key, 'no changes');

    await themeFilesUpsertMap(file);

  } else {

    if (file.type !== Type.Style && $.processor.tailwind.map !== null) {

      await tailwindParse(file).then(themeFilesUpsertMap);

    } else {

      log.syncing(file.key);

      await themeFilesUpsertMap(file);

    }

    if ($.mode.hot && $.mode.bulk === false) {

      await q.http.onIdle().then(() => $.wss.replace());

    }

    return file.value;

  }

};
