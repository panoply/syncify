import type { File, Requests, Theme } from 'types';
import glob from 'fast-glob';
import { relative } from 'pathe';
import { readFile } from 'fs-extra';
import { Syncify } from 'types';
import { client, queue } from '../requests/client';
import { outputFile } from '~process/files';
import { error, log, tui } from '~log';
import { $ } from '~state';
import * as n from '~utils/native';
import * as timer from '~utils/timer';
import * as c from '~cli/ansi';
import { delay } from 'rambdax';
import { event, getSizeInteger, getSizeStr, toUpcase } from '~utils/utils';
import { AxiosResponse } from 'axios';
import { hasSnippet, removeRender } from '~hot/inject';
import { throwError } from '~options/validate';
import { Progress } from '~cli/progress';
import { Events } from '~requests/assets';
import { NIL, NWL } from '~utils/chars';

interface EventParams {
  /**
   * The response status
   */
  status: Events;
  /**
   * The Theme request model
   */
  get theme (): Theme;
  /**
   * The File model
   */
  get file (): File;
  /**
   * The response data (only if successful)
   */
  get data (): Requests.Asset
  /**
   * The Axios Response Error (only if error)
   */
  get error (): AxiosResponse
}

interface SyncRecord {
  /**
   * Whether or not this record is syncing
   */
  active: boolean;
  /**
   * The theme request modal
   */
  theme: Theme;
  /**
   * The Completed or awaited log reference
   */
  log: string;
  /**
   * The number of files to transfer
   */
  size: number;
  /**
   * The previously proccessed file
   */
  processed: string;
  /**
   * The number of successful transfers
   */
  success: number;
  /**
   * The number of transfers that will retry
   */
  retry: number;
  /**
   * The number of failed transfers
   */
  failed: number;
  /**
   * Progress bar instance
   */
  progress: Progress;
  /**
   * Error Model
   *
   * This maintains a reference of all failures and retry transfer
   * attempts.
   */
  errors: {
    /**
     * Remote Errors
     *
     * Entries in this map are request failures incurred during transfer
     */
    remote: Map<string, EventParams>;
    /**
     * Retrying
     *
     * Entries in this map will retry and be re-queued
     */
    retry: Set<string>
  }
}

type SyncModel = Map<string, SyncRecord>

/**
 * Get Model
 *
 * Generates the upload model which will create a workable store reference
 * for the uploading process.
 */
function getModel (size: number) {

  if (size === 0) {
    throwError('Empty output directory', [
      `There are no files within ${c.neonCyan(relative($.cwd, $.dirs.output) + '/**')}`,
      `You may need to run the ${c.neonCyan.bold('syncify build')} command and try again.`
    ]);
  }

  const sync: SyncModel = new Map();

  /**
   * Indentation Width used for CLI logging
   */
  let width: number = 0;

  for (const theme of $.sync.themes) {

    if (theme.target.length > width) width = theme.target.length;

    const key: string = `${theme.store}:${theme.target}`;

    if (!sync.has(key)) {

      sync.set(key, {
        active: sync.size === 0,
        log: null,
        size,
        processed: NIL,
        failed: 0,
        success: 0,
        retry: 0,
        progress: log.progress(size),
        get theme () { return theme; },
        errors: {
          remote: new Map(),
          retry: new Set()
        }
      });

    }

  }

  return sync;

}

export async function upload (cb?: Syncify): Promise<void> {

  $.cache.lastResource = 'upload';

  log.group('Upload', true);
  log.spinner('Preparing');
  timer.start('upload');

  const request = client($.sync);
  const hashook = n.isFunction(cb);
  const parse = outputFile($.dirs.output);
  const files = glob.sync(`${$.dirs.output}/**`).sort();
  const sync = getModel(files.length);

  // DELAY
  // We apply a small delay to ensure all operations have completed before moving ahead.
  //
  await delay(250);

  /* -------------------------------------------- */
  /* EVENT CALLBACK                               */
  /* -------------------------------------------- */

  function callback (item: EventParams) {

    log.spinner.stop();

    const { file, theme } = item;
    const key = `${theme.store}:${theme.target}`;
    const record = sync.get(key);
    const message: string[] = [
      tui.message('whiteBright', c.bold(toUpcase(file.namespace))),
      c.newline,
      tui.suffix('gray', 'Size       ', `  ${c.whiteBright(getSizeStr(file.size))}`),
      NWL,
      tui.suffix('gray', 'Elapsed    ', `  ${c.whiteBright(timer.now('upload'))}`),
      NWL,
      tui.suffix('gray', 'Duration   ', `  ${c.whiteBright(timer.stop(file.uuid))}`),
      c.newline,
      c.hrs(42),
      c.newline
    ];

    if (item.status === Events.Success) {

      if (record.errors.retry.has(file.input)) {
        record.retry -= 1;
        record.errors.retry.delete(file.input);
      }

      record.success += 1;
      record.progress.increment(1);
      record.processed = tui.message('neonGreen', file.key);

    } else if (item.status === Events.Retry) {

      if (!record.errors.retry.has(file.input)) {
        record.retry += 1;
        record.errors.retry.add(file.input);
      }

      record.processed = tui.message('orange', file.key);

    } else if (item.status === Events.Failed) {

      if (record.errors.retry.has(file.output)) {
        record.retry -= 1;
        record.errors.retry.delete(file.output);
      }

      if (!record.errors.remote.has(file.output)) {
        record.failed += 1;
        record.progress.increment(1);
        record.errors.remote.set(file.output, item);
        record.processed = tui.message('redBright', file.key);
      }

    }

    for (const [ id, { success, size, failed, retry, progress, processed } ] of sync) {

      const [ store, target ] = id.split(':');

      const uploaded = `  ${c.bold(`${success}`)} ${c.white('of')} ${c.bold(`${size}`)}`;
      const retrying = `  ${c.bold(`${retry}`)}`;
      const failures = `  ${c.bold(`${failed}`)}`;

      message.push(
        tui.message('neonCyan', `${c.bold(target.toUpperCase())}  ${c.ARR}  ${store}`),
        c.newline,
        processed,
        c.newline,
        tui.suffix('whiteBright', 'synced ', uploaded),
        n.nl,
        tui.suffix(retry > 0 ? 'orange' : 'whiteBright', 'retry ', retrying),
        n.nl,
        tui.suffix(failed > 0 ? 'redBright' : 'whiteBright', 'errors ', failures),
        c.newline,
        progress.render(),
        c.newline
      );

    }

    log.update(message.join(NIL));

  }

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

  event.on('upload', callback);

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

      // Remove HOT snippet occurances
      if (file.namespace === 'layout') {
        if (hasSnippet(input)) {
          input = removeRender(input);
        }
      }

      file.size = getSizeInteger(input);

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

      error.write('Error reading output file', {
        file: file.key,
        source: file.relative
      })(e);

    }

  }

  await queue.onIdle();

  log.update.clear();

  log.group('Errors', true);

  /* -------------------------------------------- */
  /* POST PROCESSING                              */
  /* -------------------------------------------- */

  let hasErrors = false;

  for (const { errors, theme, failed, success, size } of sync.values()) {

    if (errors.remote.size > 0) {

      const name = c.bold(`${theme.target.toUpperCase()} THEME`);
      const failures = `  ${c.bold(`${failed}`)}`;
      const uploaded = `  ${c.bold(`${success}`)} ${c.white('of')} ${c.bold(`${size}`)}`;

      log.out(tui.message('neonCyan', `${c.bold(name)}  ${c.ARR}  ${theme.store}`));
      log.nwl();
      log.out(tui.suffix('neonGreen', 'uploaded ', uploaded));
      log.out(tui.suffix('redBright', 'failures ', failures));
      log.nwl();

      let number: number = 1;

      for (const record of errors.remote.values()) {

        const errno = `${(number < 10 ? '0' : '') + number++}`;

        log.nwl();
        log.write(c.redBright.bold(`ERROR ${errno}`));
        error.request(record.file.input, record.error);

      }

      log.out(c.hr(20));
      hasErrors = true;

    }

  }

  await delay(500);

  if (!hasErrors) {

    log.nwl();
    log.out(tui.message('gray', 'No errors!'));
    log.nwl();

  }

  log.nwl();
  log.update(`${c.line.gray}Upload Completed`);
  log.nwl();

  process.exit(0);

};
