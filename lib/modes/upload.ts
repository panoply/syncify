import type { File, Theme } from 'types';
import glob from 'fast-glob';
import { relative } from 'pathe';
import { readFile } from 'fs-extra';
import { Syncify } from 'types';
import { client } from '../requests/client';
import { Namespace, outputFile } from '~process/files';
import { error, log, tui } from '~log';
import { $ } from '~state';
import * as n from '~utils/native';
import * as timer from '~utils/timer';
import * as c from '~cli/ansi';
import { delay, has } from 'rambdax';
import { event } from '~utils/utils';
import { AxiosResponse } from 'axios';
import { hasSnippet, removeRender } from '~hot/inject';
import { throwError } from '~options/validate';

interface SyncModel {
  [store: string]: {
    [theme: string]: {
      theme: string;
      uploaded: number;
      failed: number;
      progress: ReturnType<typeof log['progress']>
      errors: string[]
    }
  }
}

type StoreError = Map<string, Array<{
  file: File;
  attempts: number;
  store: string;
  theme: string;
  response: AxiosResponse;
}>>

interface ErrorModel {
  local: Array<{
    file: File;
    attempts: number;
    response: string;
  }>;
  remote: {
    [store: string]: StoreError
  }
}

/**
 * Get Model
 *
 * Generates the upload model which will create a workable store reference
 * for the uploading process.
 */
function getModel (size: number) {

  if (size === 0) {
    throwError('Empty output directory', [
      `There are no files within ${c.blue(relative($.cwd, $.dirs.output) + '/**')}`,
      `You may need to run the ${c.blue('syncify build')} command and try again.`
    ]);
  }

  const errors: ErrorModel = {
    local: [],
    remote: {}
  };

  const sync: SyncModel = {};

  /**
   * Indentation Width used for CLI logging
   */
  let width: number = 0;

  for (const { store, target } of $.sync.themes) {

    if (target.length > width) width = target.length;

    if (!has(store, sync)) sync[store] = {};
    if (!has(store, errors.remote)) errors.remote[store] = new Map();

    sync[store][target] = {
      theme: target,
      uploaded: 0,
      failed: 0,
      progress: log.progress(size),
      errors: []
    };

  }

  return { sync, errors, size };

}

function hasErrors (sync: SyncModel, errors: ErrorModel) {

  let stores: number = 0;

  for (const store in sync) {
    if (errors.remote[store].size > 0) {
      stores = stores + 1;
    } else {
      delete errors.remote[store];
    }
  }

  return stores;
}

export async function upload (cb?: Syncify): Promise<void> {

  $.cache.lastResource = 'upload';

  log.newGroup('Upload', true);
  log.spinner('Preparing');

  timer.start('upload');

  const request = client($.sync);
  const hashook = n.isFunction(cb);
  const parse = outputFile($.dirs.output);
  const files = glob.sync(`${$.dirs.output}/templates/*`).sort();
  const { sync, errors, size } = getModel(files.length);

  // DELAY
  // We apply a small delay to ensure all operations have completed before moving ahead.
  //
  await delay(250);

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

  event.on('upload', function (type: 'uploaded' | 'failed', { target, store }: Theme, item: {
    key: string;
    namespace: Namespace;
    fileSize: string;
    get file (): File,
    get error (): AxiosResponse
  }) {

    log.spinner.stop();

    const issue = type === 'failed';
    const items = [
      tui.message('whiteBright', c.bold(item.namespace)),
      c.newline,
      tui.message(issue ? 'redBright' : 'neonGreen', item.key),
      c.newline,
      tui.suffix('white', 'size ', `  ${item.fileSize}`),
      n.nl,
      tui.suffix('white', 'duration ', `  ${timer.stop()}`),
      n.nl,
      tui.suffix('white', 'elapsed ', `  ${timer.now('upload')}`),
      c.newline
    ];

    sync[store][target][type] += 1;
    sync[store][target].progress.increment(1);

    for (const storeName in sync) {
      for (const themeName in sync[storeName]) {

        const shop = sync[storeName][themeName];
        const uploaded = `  ${c.bold(`${shop.uploaded}`)} ${c.white('of')} ${c.bold(`${size}`)}`;
        const failed = `  ${c.bold(`${shop.failed}`)}`;

        items.push(
          tui.message('neonCyan', `${c.bold(themeName.toUpperCase())}  ${c.ARR}  ${storeName}`),
          c.newline,
          tui.suffix('whiteBright', 'uploaded ', uploaded),
          n.nl,
          tui.suffix(shop.failed > 0 ? 'redBright' : 'white', 'failed ', failed),
          c.newline,
          shop.progress.render(),
          c.newline
        );

      }
    }

    if (issue) {

      sync[store][target].errors.push(item.file.key);

      if (errors.remote[store].has(item.file.output)) {

        errors.remote[store].get(item.file.output).push({
          store,
          theme: target,
          file: item.file,
          attempts: 0,
          response: item.error
        });

      } else {
        errors.remote[store].set(item.file.output, [
          {
            store,
            theme: target,
            file: item.file,
            attempts: 0,
            response: item.error
          }
        ]);
      }
    }

    log.update(n.glue(items));

  });

  // DELAY
  // We apply a small delay to ensure all operations have completed before moving ahead.
  //
  await delay(500);

  for (const path of files) {

    const file = parse(path);

    let input: string;

    try {

      const read = await readFile(file.output);

      input = read.toString();

      // remove HOT snippet occurances
      if (file.namespace === 'layout') {
        if (hasSnippet(input)) {
          input = removeRender(input);
        }
      }

      if (!hashook) {

        await request.assets('put', file, input);

      } else {

        const update = cb.apply({ ...file }, input);

        if (n.isUndefined(update) || update === false) {
          await request.assets('put', file, input);
        } else if (n.isString(update)) {
          await request.assets('put', file, update);
        } else if (n.isBuffer(update)) {
          await request.assets('put', file, update.toString());
        } else {
          await request.assets('put', file, input);
        }
      }

    } catch (e) {

      errors.local.push({
        file,
        attempts: 0,
        response: e.message
      });

    }

  }

  log.update.clear();

  for (const storeName in sync) {
    for (const themeName in sync[storeName]) {

      const shop = sync[storeName][themeName];

      if (shop.failed === 0) continue;

      const name = c.bold(`${themeName.toUpperCase()} THEME`);
      const failed = `  ${c.bold(`${shop.failed}`)}`;
      const uploaded = `  ${c.bold(`${shop.uploaded}`)} ${c.white('of')} ${c.bold(`${size}`)}`;

      log.out(tui.message('whiteBright', `${c.bold(name)}  ${c.ARR}  ${storeName}`));
      log.nwl();
      log.out(tui.suffix('whiteBright', 'uploaded ', uploaded));
      log.out(tui.suffix('whiteBright', 'failed ', failed));
      log.nwl();
      log.write([
        c.gray('Syncify is now watching all rejected files. Changes will be resynced if successful.'),
        c.gray('In some cases, you may need to perform more detailed adjustments and then resync.')
      ]);

      let number: number = 1;

      for (const [ file, item ] of errors.remote[storeName].entries()) {

        const theme = item.find(({ theme }) => theme === themeName);

        if (theme) {
          const errno = `${(number < 10 ? '0' : '') + number++}`;
          log.nwl();
          log.write(c.redBright.bold(`ERROR ${errno}`));
          error.request(file, theme.response);
        }
      }

      log.out(c.hr(20));

    }
  }

  const issues = hasErrors(sync, errors);

  if (issues > 0) {

    log.write([
      c.white('Syncify is now watching file for changes.'),
      c.white(`The file failed to sync with ${2} on. Below are the errors:`)
    ]);

    log.nwl();
    log.write(c.magenta('Waiting for changes...'));

  }

  log.nwl();
  log.update(`${c.line.gray}Upload Completed`);
  log.nwl();

  process.exit(0);

};
