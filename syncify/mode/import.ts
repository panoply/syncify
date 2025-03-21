import type { Requests, Resource, Theme } from 'types';
import type { XiorResponse } from 'xior';
import type { File } from '~file';

import { join, relative } from 'node:path';

import { writeFileSync } from 'fs-extra';

import { Progress } from '@syncify/ansi';
import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';
import { timer } from '@syncify/timer';

import { log } from '~cli/log';
import { event } from '~events';
import { http } from '~http/client';
import { importFile } from '~process/files';
import { addSuffix, assign, delay, m, s } from '~utils';

import { $ } from '$';

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
  get data (): Resource.Asset
  /**
   * The Axios Response Error (only if error)
   */
  get error (): XiorResponse
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

  const sync: SyncModel = m();

  /**
   * Indentation Width used for CLI logging
   */
  let width: number = 0;

  for (const theme of $.target) {

    if (theme.target.length > width) width = theme.target.length;

    const key: string = `${theme.store}:${theme.target}`;
    // const { assets } = await request.get<'LIST'>(theme, theme.store.client);

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
          local: m(),
          remote: m(),
          retry: s()
        }
      });

    }

  }

  return sync;

}

function getDoneLog (record: SyncRecord, output: string, time: string) {

  const success = `${_.bold(`${record.success}`)} ${_.white('of')} ${_.bold(`${record.size}`)}`;
  const failed = _.bold(`${record.failed}`);
  const target = _.bold(`${record.theme.target.toUpperCase()}`);

  return _.Create()
  .Line(_.Prefix(target, _.ARR), _.neonCyan)
  .NL
  .Line(`completed in ${_.gray(time)}`)
  .NL
  .Line(_.Prefix('synced', success), _.whiteBright)
  .Line(_.Prefix('errors', failed), record.failed > 0 ? _.redBright : _.whiteBright)
  .Line(_.Prefix('location', _.gray.underline(output)))
  .NL
  .Insert(record.progress.render())
  .Line
  .toString();

}

function getWaitLog (record: SyncRecord) {

  return _.Create()
  .Line(`${_.bold(record.theme.target.toUpperCase())}  ${_.ARR}  ${record.theme.store}`, _.gray.dim)
  .NL
  .Line(`${_.bold(addSuffix(record.number))} in queue`, _.magenta)
  .NL
  .Line(_.Prefix('synced', `${_.bold('0')} ${_.white('of')} ${_.bold(`${record.size}`)}`), _.gray.dim)
  .Line(_.Prefix('retry', _.bold('0')), _.gray.dim)
  .Line(_.Prefix('errors', _.bold('0')), _.gray.dim)
  .NL
  .Insert(record.progress.render(_.gray.dim))
  .NL
  .toString();

}

export async function Import (): Promise<void> {

  $.running = true;

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

    const prefix = _.Create()
    .NL
    .Line(_.Prefix('Duration', _.whiteBright(timer.now('import'))), _.gray)
    .Line(_.Prefix('Transfers', _.whiteBright(`${transfers++}`)), _.gray)
    .Line(_.Prefix('Syncing', _.pink(`${_.bold(theme.target)}  ${_.ARR}  ${theme.store}`)), _.gray)
    .Line(_.Prefix('Preview', _.underline(preview)), _.gray)
    .Ruler();

    let processing: string = NIL;

    if (item.status === Events.Empty) {

      writeFileSync(file.output, '');

      record.warning += 1;
      record.transfers += 1;
      record.progress.increment(1);

      processing = _.yellowBright(file.key);

    } else if (item.status === Events.Success) {

      if (record.errors.retry.has(file.output)) {
        record.retry -= 1;
        record.errors.retry.delete(file.output);
      }

      record.success += 1;
      record.transfers += 1;
      record.progress.increment(1);

      const buffer = Buffer.from(item.data.value || null, 'utf8');

      writeFileSync(file.output, buffer);

      processing = _.neonGreen(file.key);

    } else if (item.status === Events.Retry) {

      if (!record.errors.retry.has(file.output)) {
        record.retry += 1;
        record.errors.retry.add(file.output);
      }

      processing = _.orange(file.key);

    } else if (item.status === Events.Failed) {

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

      processing = _.redBright(file.key);

    }

    const success = `${_.bold(`${record.success}`)} ${_.white('of')} ${_.bold(`${record.size}`)}`;
    const retried = _.bold(`${record.retry}`);
    const failed = _.bold(`${record.failed}`);
    const warnings = _.bold(`${record.warning}`);

    const status = _.Create()
    .NL
    .Line(`${_.bold(record.theme.target.toUpperCase())}  ${_.ARR}  ${record.theme.store}`, _.neonCyan)
    .NL
    .Line(processing)
    .NL
    .Line(_.Prefix('synced', success), _.whiteBright)
    .Line(_.Prefix('retry', retried), record.retry > 0 ? _.orange : _.whiteBright)
    .Line(_.Prefix('warning', warnings), record.warning > 0 ? _.yellowBright : _.whiteBright)
    .Line(_.Prefix('failed', failed), record.failed > 0 ? _.redBright : _.whiteBright)
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

      await http.queue.add(() => request.sync(record.theme, file, payload));

    }

    await http.queue.onIdle();

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

      //   log.nl();
      //   log.write(_.redBright.bold(`ERROR ${errno++}`));

      // }

    }

  }
};
