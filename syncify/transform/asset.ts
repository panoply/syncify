import { readFile, writeFile } from 'fs-extra';

import { log } from '~cli/log';
import { error } from '~errors';
import { File, Kind } from '~file';
import { themeFilesUpsertMap } from '~http/theme';
import { isEmptyString, isString } from '~utils';

import { $ } from '$';

/* -------------------------------------------- */
/* EXPORTED FUNCTION                            */
/* -------------------------------------------- */

/**
 * Pass~through
 *
 * Catches spawned generated files and determines whether
 * the file should be written or just fall through.
 */
async function passthrough (file: File) {

  await writeFile(file.output, file.value).catch(
    error.write('Error writing asset to output directory', {
      input: file.input,
      output: file.output
    })
  );

  if ($.mode.hot) {

    log.syncing(file.key, { hot: $.mode.hot });

    if (file.kind === Kind.JavaScript) {
      $.wss.script(file.uuid, file.base);
    } else if (file.kind === Kind.CSS) {
      $.wss.stylesheet(file.uuid, file.base);
    }
  }

  if ($.mode.build === false) {

    await themeFilesUpsertMap(file);

  }

};

/**
 * Assets Pass Through
 *
 * Applies a copy operation for files marked as assets. No transformation will apply.
 */
export async function AssetTransform (file: File) {

  const value = await readFile(file.input, 'utf8').catch(
    error.write('Error reading asset file', {
      input: file.input,
      output: file.output
    })
  );

  if (isString(value)) {

    file.value = value;

    if (isEmptyString(value)) {
      if ($.mode.watch) log.skipped(file, 'empty file');
      return null;
    }

    await passthrough(file);

  }

  return null;

};
