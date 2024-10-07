import type { File, Resource, Theme } from 'types';
import glob from 'fast-glob';
import { relative } from 'node:path';
import { readFile } from 'fs-extra';
import { Syncify } from 'types';
import { client, queue } from '../requests/client';
import { outputFile } from 'syncify:process/files';
import { delay } from 'rambdax';
import { event } from 'syncify:native';
import { byteSize, stringSize } from 'syncify:sizes';
import { isFunction, toUpcase, glue } from 'syncify:utils';
import { AxiosResponse } from 'axios';
import { onAsset } from 'syncify:plugins/hooks';
import { throwError } from 'syncify:log/throws';
import { Events } from 'syncify:requests/assets';
import { timer } from 'syncify:timer';
import { Prefix, Create, CreateClosure, Line, Break } from 'syncify:cli/tree';
import { Progress, ARR } from '@syncify/ansi';
import * as log from 'syncify:log';
import * as error from 'syncify:errors';
import * as c from '@syncify/ansi';
import { $ } from 'syncify:state';

interface RequestParams {
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
  get data (): Resource.Asset
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
    remote: Map<string, RequestParams>;
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

  log.group('Upload');
  log.spinner('Preparing', { style: 'spinning' });
  timer.start('upload');

  const request = client($.sync);
  const hashook = isFunction(cb);
  const parse = outputFile($.dirs.output);
  const files = glob.sync(`${$.dirs.output}/**`).sort();
  const sync = getModel(files.length);

  let interval: NodeJS.Timeout = null;

  // DELAY
  // We apply a small delay to ensure all operations have completed before moving ahead.
  //
  await delay(500);

  /**
   * Logger
   *
   * Keeps the **duration** ticker running and prints
   * the log update to terminal.
   */
  function logger (message: CreateClosure) {

    const record = message.toRaw();

    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }

    log.update(message.toString());

    interval = setInterval(() => {

      record[3] = Line(
        c.gray(
          Prefix(
            'Elapsed',
            c.whiteBright.bold(timer.now('upload'))
          )
        )
      ) + NWL;

      log.update(glue(record));

    }, 100);

  }

  /* -------------------------------------------- */
  /* EVENT CALLBACK                               */
  /* -------------------------------------------- */

  function callback (item: RequestParams) {

    log.spinner.stop();

    const { file, theme } = item;
    const key = `${theme.store}:${theme.target}`;
    const record = sync.get(key);

    const message = Create()
    .NL
    .Line(toUpcase(file.namespace), c.bold.whiteBright)
    .NL
    .Line(Prefix('Elapsed', c.whiteBright.bold(timer.now('upload'))), c.gray)
    .Line(Prefix('Duration', c.whiteBright(timer.stop(file.uuid))), c.gray)
    .Line(Prefix('Size', c.whiteBright(stringSize(file.size))), c.gray)
    .Newline();

    if (item.status === Events.Success) {

      if (record.errors.retry.has(file.input)) {
        record.retry -= 1;
        record.errors.retry.delete(file.input);
      }

      record.success += 1;
      record.progress.increment(1);
      record.processed = c.neonCyan(file.key);

    } else if (item.status === Events.Retry) {

      if (!record.errors.retry.has(file.input)) {
        record.retry += 1;
        record.errors.retry.add(file.input);
      }

      record.processed = c.orange(file.key);

    } else if (item.status === Events.Failed) {

      if (record.errors.retry.has(file.output)) {
        record.retry -= 1;
        record.errors.retry.delete(file.output);
      }

      if (!record.errors.remote.has(file.output)) {
        record.failed += 1;
        record.progress.increment(1);
        record.errors.remote.set(file.output, item);
        record.processed = c.redBright(file.key);
      }

    }

    for (const [ id, { success, size, failed, retry, progress, processed } ] of sync) {

      const [ store, target ] = id.split(':');

      const uploaded = `${c.bold(`${success}`)} ${c.white('of')} ${c.bold(`${size}`)}`;
      const retrying = c.bold(`${retry}`);
      const failures = c.bold(`${failed}`);

      message
      .Line(`${c.bold(target.toUpperCase())}  ${ARR}  ${store}`, c.whiteBright)
      .NL
      .Line(processed)
      .NL
      .Line(Prefix('uploaded', uploaded), c.whiteBright)
      .Line(Prefix('retrying', retrying), retry > 0 ? c.orange : c.whiteBright)
      .Line(Prefix('failures', failures), failed > 0 ? c.redBright : c.whiteBright)
      .NL
      .Insert(progress.render())
      .Newline();

    }

    logger(message);

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

      file.size = byteSize(input);

      if (!hashook) {

        await request.assets('put', file, input);

      } else {

        const update = cb.apply({ ...file }, input);

        // @ts-ignore
        await onAsset(file, input, update, request.assets);

      }

    } catch (e) {

      error.write('Error reading output file', {
        file: file.key,
        source: file.relative
      })(e);

    }

  }

  await queue.onIdle();

  clearInterval(interval);

  /* -------------------------------------------- */
  /* POST PROCESSING                              */
  /* -------------------------------------------- */

  for (const {
    errors,
    theme,
    failed,
    success,
    size
  } of sync.values()) {

    if (errors.remote.size > 0) {

      log.update.clear();
      log.group('Errors');

      const name = c.bold(`${theme.target.toUpperCase()} THEME`);
      const failures = c.bold(`${failed}`);
      const uploaded = `${c.bold(`${success}`)} ${c.white('of')} ${c.bold(`${size}`)}`;

      log.out(
        Create()
        .NL
        .Line(`${name}  ${ARR}  ${theme.store}`)
        .NL
        .Line(Prefix('uploaded', uploaded), c.neonGreen)
        .Line(Prefix('failures', failures), c.redBright)
        .toString()
      );

      let number: number = 1;

      for (const record of errors.remote.values()) {

        const errno = `${(number < 10 ? '0' : '') + number++}`;

        log.nwl();
        log.write(c.bold(`ERROR ${errno}`), { type: 'error' });
        error.request(record.file.input, record.error);

      }

      log.nwl();
      log.hline();

    }

  }

  await delay(500);

  log.update(Break(c.neonGreen.bold('Uploaded Completed')));
  log.group(false);

  process.exit(0);

};
