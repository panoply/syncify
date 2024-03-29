import type { Syncify, Requests, Theme, AssetResource, File, Request } from 'types';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { join, relative } from 'pathe';
import { delay, has } from 'rambdax';
import { writeFileSync } from 'fs-extra';
import * as request from 'syncify:requests/assets';
import { importFile } from 'syncify:process/files';
import { Progress } from 'syncify:cli/progress';
import { queue } from 'syncify:requests/queue';
import { timer } from 'syncify:utils/timer';
import { assign } from 'syncify:native';
import * as c from 'syncify:ansi';
import { log, tui } from 'syncify:log';
import { addSuffix, event, glue } from 'syncify:utils';
import { $ } from 'syncify:state';

interface EventParams {
  /**
   * The response status
   */
  status: request.Events;
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
   * The record number index (used for queues)
   */
  number: number;
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
   * The File keys for each store theme
   */
  files: AssetResource[];
  /**
   * The number of transfers executed
   */
  transfers: number;
  /**
   * The number of successful transfers
   */
  success: number;
  /**
   * The number of warning transfers
   */
  warning: number;
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
     * Local Errors
     *
     * Entries in this map are local failures, i.e: writing a file etc
     */
    local: Map<string, {
      /**
       * The File reference of failed transfer
       */
      file: File;
      /**
       * The number of re-sync attempts
       */
      attempts: number;
      /**
       * The error message
       */
      message: any;
    }>;
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
 * for the download transfer operation
 */
async function getModel () {

  const sync: SyncModel = new Map();

  /**
   * Indentation Width used for CLI logging
   */
  let width: number = 0;

  for (const theme of $.sync.themes) {

    if (theme.target.length > width) width = theme.target.length;

    const store = $.sync.stores[theme.sidx];
    const key: string = `${theme.store}:${theme.target}`;
    const { assets } = await request.get<Requests.Assets>(theme, store.client);

    if (!sync.has(key)) {

      sync.set(key, {
        active: sync.size === 0,
        log: null,
        number: sync.size + 1,
        size: assets.length,
        transfers: 0,
        warning: 0,
        failed: 0,
        success: 0,
        retry: 0,
        progress: log.progress(assets.length),
        get files () { return assets; },
        get theme () { return theme; },
        errors: {
          local: new Map(),
          remote: new Map(),
          retry: new Set()
        }
      });

    }

  }

  return sync;

}

function getDoneLog (record: SyncRecord, output: string, time: string) {

  const success = `  ${c.bold(`${record.success}`)} ${c.white('of')} ${c.bold(`${record.size}`)}`;
  const failed = `  ${c.bold(`${record.failed}`)}`;
  const target = c.bold(`${record.theme.target.toUpperCase()}`);

  return [
    tui.message('neonCyan', `${target}  ${c.ARR}  ${record.theme.store}`),
    c.newline,
    tui.message('gray', `completed in ${c.gray(time)}`),
    c.newline,
    tui.suffix('whiteBright', 'synced  ', success),
    NWL,
    tui.suffix(record.failed > 0 ? 'redBright' : 'white', 'errors', failed),
    NWL,
    tui.suffix('whiteBright', 'location ', `  ${c.gray.underline(output)}`),
    c.newline,
    record.progress.render(),
    c.newline
  ].join(NIL);

}

function getWaitLog (record: SyncRecord) {

  return [
    tui.message('neonCyan', `${c.bold(record.theme.target.toUpperCase())}  ${c.ARR}  ${record.theme.store}`),
    c.newline,
    tui.message('white', `${c.bold(addSuffix(record.number))} in queue`),
    c.newline,
    tui.suffix('gray', 'synced  ', `  ${c.bold('0')} ${c.white('of')} ${c.bold(`${record.size}`)}`),
    NWL,
    tui.suffix('gray', 'retry ', `  ${c.bold('0')}`),
    NWL,
    tui.suffix('gray', 'errors', `  ${c.bold('0')}`),
    c.newline,
    record.progress.render(),
    c.newline
  ].join(NIL);

}

export async function importing (cb?: Syncify): Promise<void> {

  $.cache.lastResource = 'import';

  let remaining: number = 0;
  let transfers: number = 0;

  timer.start('import');
  log.group('Import', true);
  log.spinner('Preparing');

  const sync = await getModel();

  // TODO
  // PLUGIN SUPPORT
  //
  // const hashook = isFunction(cb);

  await delay(500);

  /* -------------------------------------------- */
  /* EVENT CALLBACK                               */
  /* -------------------------------------------- */

  function callback (item: EventParams) {

    log.spinner.stop();

    const { theme, file } = item;
    const key = `${theme.store}:${theme.target}`;
    const record = sync.get(key);
    const preview = `https://${theme.store}?preview_theme_id=${theme.id}`;
    const prefix: string = [

      tui.suffix('gray', 'Duration', c.whiteBright(`  ${timer.now('import')}`)),
      NWL,
      tui.suffix('gray', 'Transfers', c.whiteBright.bold(`  ${transfers++}`)),
      NWL,
      tui.suffix('gray', 'Syncing', `  ${c.pink(`${c.bold(theme.target)}  ${c.ARR}  ${theme.store}`)}`),
      NWL,
      tui.suffix('gray', 'Preview', `  ${c.underline(preview)}`),
      c.newline,
      c.hrs(preview.length + 17),
      c.newline

    ].join(NIL);

    let processing: string = NIL;

    if (item.status === request.Events.Empty) {

      writeFileSync(file.output, '');

      record.warning += 1;
      record.transfers += 1;
      record.progress.increment(1);

      processing = tui.message('yellowBright', file.key);

    } else if (item.status === request.Events.Success) {

      if (record.errors.retry.has(file.output)) {
        record.retry -= 1;
        record.errors.retry.delete(file.output);
      }

      record.success += 1;
      record.transfers += 1;
      record.progress.increment(1);

      const buffer = has('attachment', item.data.asset)
        ? Buffer.from(item.data.asset.attachment, 'base64')
        : Buffer.from(item.data.asset.value || null, 'utf8');

      writeFileSync(file.output, buffer);

      processing = tui.message('neonGreen', file.key);

    } else if (item.status === request.Events.Retry) {

      if (!record.errors.retry.has(file.output)) {
        record.retry += 1;
        record.errors.retry.add(file.output);
      }

      processing = tui.message('orange', file.key);

    } else if (item.status === request.Events.Failed) {

      if (record.errors.retry.has(file.output)) {
        record.retry -= 1;
        record.errors.retry.delete(file.output);
      }

      if (!record.errors.remote.has(file.output)) {

        record.failed += 1;
        record.transfers += 1;
        record.progress.increment(1);
        record.errors.remote.set(file.output, item);

      }

      processing = tui.message('redBright', file.key);

    }

    const success = `  ${c.bold(`${record.success}`)} ${c.white('of')} ${c.bold(`${record.size}`)}`;
    const retried = `  ${c.bold(`${record.retry}`)}`;
    const failed = `  ${c.bold(`${record.failed}`)}`;
    const warnings = `  ${c.bold(`${record.warning}`)}`;

    const status = [
      tui.message('neonCyan', `${c.bold(record.theme.target.toUpperCase())}  ${c.ARR}  ${record.theme.store}`),
      c.newline,
      processing,
      c.newline,
      tui.suffix('whiteBright', 'synced   ', success),
      NWL,
      tui.suffix(record.retry > 0 ? 'orange' : 'whiteBright', 'retry ', retried),
      NWL,
      tui.suffix(record.warning > 0 ? 'yellowBright' : 'whiteBright', 'warning ', warnings),
      NWL,
      tui.suffix(record.failed > 0 ? 'redBright' : 'whiteBright', 'errors', failed),
      c.newline,
      record.progress.render(),
      c.newline

    ].join(NIL);

    const message: string[] = [ prefix ];

    let counter: number = 0;

    for (const stream of sync.values()) {
      if (stream.active) {
        message.push(status);
      } else {
        if (stream.log === null) {
          counter = counter + 1;
          stream.number = counter;
          message.push(getWaitLog(stream));
        } else {
          message.push(stream.log);
        }
      }
    }

    log.update(glue(message));

  }

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

  event.on('import', callback);

  remaining = sync.size - 1;

  for (const [ id, record ] of sync) {

    const [ store, target ] = id.split(':');
    const output = join($.dirs.import, store, target);

    timer.start(id);
    record.active = true;

    for (const { key } of record.files) {

      const file = importFile(key, output);
      const payload = assign<Request, AxiosRequestConfig>({
        url: record.theme.url,
        method: 'get',
        params: {
          'asset[key]': file.key
        }
      }, $.sync.stores[record.theme.sidx].client);

      await queue.add(() => request.sync(record.theme, file, payload));

    }

    await queue.onIdle();

    remaining = remaining - 1;

    record.active = false;
    record.log = getDoneLog(sync.get(id), relative($.cwd, output), timer.stop(id));

  }

  /* -------------------------------------------- */
  /* POST PROCESSING                              */
  /* -------------------------------------------- */

  for (const { errors } of sync.values()) {

    if (errors.remote.size > 0) {

      // TODO
      // POST DOWNLOAD ERRORS
      //

      // let errno: number = 0;

      // for (const [ path, ref ] of errors.remote) {

      //   log.nwl();
      //   log.write(c.redBright.bold(`ERROR ${errno++}`));

      // }

    }

  }
};
