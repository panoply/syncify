import type { Syncify, Requests, Theme, Resource, File } from 'types';
import type { AxiosResponse } from 'axios';
import { join, relative } from 'pathe';
import { delay } from 'rambdax';
import { writeFileSync } from 'fs-extra';
import { importFile } from 'syncify:process/files';
import { Progress } from 'syncify:cli/progress';
import { queue } from 'syncify:requests/queue';
import { timer } from 'syncify:utils/timer';
import { assign } from 'syncify:native';
import { addSuffix, event, glue } from 'syncify:utils';
import { Create, Prefix } from 'syncify:ansi';
import { ARR } from 'syncify:symbol';

import * as request from 'syncify:requests/assets';
import * as c from 'syncify:colors';
import * as log from 'syncify:log';

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
  files: Resource.Asset[];
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
    const { assets } = await request.get<'LIST'>(theme, store.client);

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

  const success = `${c.bold(`${record.success}`)} ${c.white('of')} ${c.bold(`${record.size}`)}`;
  const failed = c.bold(`${record.failed}`);
  const target = c.bold(`${record.theme.target.toUpperCase()}`);

  return Create()
  .Line(Prefix(target, ARR), c.neonCyan)
  .NL
  .Line(`completed in ${c.gray(time)}`)
  .NL
  .Line(Prefix('synced', success), c.whiteBright)
  .Line(Prefix('errors', failed), record.failed > 0 ? c.redBright : c.whiteBright)
  .Line(Prefix('location', c.gray.underline(output)))
  .NL
  .Insert(record.progress.render())
  .Line
  .toString();

}

function getWaitLog (record: SyncRecord) {

  return Create()
  .Line(`${c.bold(record.theme.target.toUpperCase())}  ${ARR}  ${record.theme.store}`, c.gray.dim)
  .NL
  .Line(`${c.bold(addSuffix(record.number))} in queue`, c.magenta)
  .NL
  .Line(Prefix('synced', `${c.bold('0')} ${c.white('of')} ${c.bold(`${record.size}`)}`), c.gray.dim)
  .Line(Prefix('retry', c.bold('0')), c.gray.dim)
  .Line(Prefix('errors', c.bold('0')), c.gray.dim)
  .NL
  .Insert(record.progress.render(c.gray.dim))
  .NL
  .toString();

}

export async function importing (cb?: Syncify): Promise<void> {

  let remaining: number = 0;
  let transfers: number = 0;

  timer.start('import');

  log.group('Import');
  log.spinner('Preparing', { style: 'spinning' });

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

    const prefix = Create()
    .NL
    .Line(Prefix('Duration', c.whiteBright(timer.now('import'))), c.gray)
    .Line(Prefix('Transfers', c.whiteBright(`${transfers++}`)), c.gray)
    .Line(Prefix('Syncing', c.pink(`${c.bold(theme.target)}  ${ARR}  ${theme.store}`)), c.gray)
    .Line(Prefix('Preview', c.underline(preview)), c.gray)
    .Ruler();

    let processing: string = NIL;

    if (item.status === request.Events.Empty) {

      writeFileSync(file.output, '');

      record.warning += 1;
      record.transfers += 1;
      record.progress.increment(1);

      processing = c.yellowBright(file.key);

    } else if (item.status === request.Events.Success) {

      if (record.errors.retry.has(file.output)) {
        record.retry -= 1;
        record.errors.retry.delete(file.output);
      }

      record.success += 1;
      record.transfers += 1;
      record.progress.increment(1);

      const buffer = Buffer.from(item.data.value || null, 'utf8');

      writeFileSync(file.output, buffer);

      processing = c.neonGreen(file.key);

    } else if (item.status === request.Events.Retry) {

      if (!record.errors.retry.has(file.output)) {
        record.retry += 1;
        record.errors.retry.add(file.output);
      }

      processing = c.orange(file.key);

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

      processing = c.redBright(file.key);

    }

    const success = `${c.bold(`${record.success}`)} ${c.white('of')} ${c.bold(`${record.size}`)}`;
    const retried = c.bold(`${record.retry}`);
    const failed = c.bold(`${record.failed}`);
    const warnings = c.bold(`${record.warning}`);

    const status = Create()
    .NL
    .Line(`${c.bold(record.theme.target.toUpperCase())}  ${ARR}  ${record.theme.store}`, c.neonCyan)
    .NL
    .Line(processing)
    .NL
    .Line(Prefix('synced', success), c.whiteBright)
    .Line(Prefix('retry', retried), record.retry > 0 ? c.orange : c.whiteBright)
    .Line(Prefix('warning', warnings), record.warning > 0 ? c.yellowBright : c.whiteBright)
    .Line(Prefix('failed', failed), record.failed > 0 ? c.redBright : c.whiteBright)
    .NL
    .Insert(record.progress.render())
    .NL
    .Ruler();

    const message: string[] = [ prefix.toString() ];

    let counter: number = 0;

    for (const stream of sync.values()) {
      if (stream.active) {
        message.push(status.toString());
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
      const payload = assign<Requests.Asset<'GET'>, any>({
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
