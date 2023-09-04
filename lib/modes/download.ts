import { Syncify, Requests, Theme, AssetResource, File } from 'types';
import { join } from 'path';
import { delay, has, mapAsync } from 'rambdax';
import { writeFile, writeFileSync } from 'fs-extra';
import { isFunction, isUndefined, isString, isBuffer, nl, glue } from '../utils/native';
import { $ } from '~state';
import { log, c, tui } from '~log';
import { client } from '~requests/client';
import merge from 'mergerino';
import { Namespace, importFile } from '~process/files';
import { event, getSizeStr, toUpcase } from '~utils/utils';
import { AxiosResponse } from 'axios';
import { Events, get } from '~requests/assets';
import * as timer from '~utils/timer';
import * as n from '~utils/native';
import { Progress } from '~cli/progress';
import { NIL } from '~utils/chars';

type SyncKey = [
  /**
   * The store name, eg: `shop.myshopify.com`
   */
  store: string,
  /**
   * The theme (target) name
   */
  theme: string
]

type SyncModel = Map<string, {
  /**
   * The number of files to transfer
   */
  size: number;
  /**
   * The File keys for each store theme
   */
  files: AssetResource[];
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
   * The previous transfer
   */
  history: {
    key: string;
    namespace: string;
  }
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
    remote: Map<string, {
      /**
       * The File reference of failed transfer
       */
      file: File;
      /**
       * The number of re-sync attempts
       */
      attempts: number;
      /**
       * Axios error Response
       */
      response: AxiosResponse;
    }>;
    /**
     * Retrying
     *
     * Entries in this map will retry and be re-queued
     */
    retry: Map<string, {
      /**
       * The File reference of failed transfer
       */
      file: File;
      /**
       * The number of re-sync attempts
       */
      attempts: number;
    }>
  }
}>

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
    const { assets } = await get<Requests.Assets>(theme, store.client);

    if (!sync.has(key)) {

      sync.set(key, {
        size: assets.length,
        failed: 0,
        success: 0,
        retry: 0,
        progress: log.progress(assets.length),
        history: {
          key: NIL,
          namespace: NIL
        },
        get files () { return assets; },
        errors: {
          local: new Map(),
          remote: new Map(),
          retry: new Map()
        }
      });

    }

  }

  return sync;

}

export async function download (cb?: Syncify): Promise<void> {

  $.cache.lastResource = 'download';

  let transfers: number = 0;

  timer.start('download');
  log.group('Download', true);
  log.spinner('Preparing');

  const hashook = isFunction(cb);
  const request = client($.sync);
  const sync = await getModel();

  await delay(500);

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

  event.on('download', function (item: EventParams) {

    log.spinner.stop();

    const { theme, file } = item;

    const key = `${theme.store}:${theme.target}`;
    const record = sync.get(key);
    const message: string[] = [
      tui.suffix('gray', 'Transfers  ', `  ${transfers++}`),
      nl,
      tui.suffix('gray', 'Duration   ', `  ${timer.now('download')}`),
      c.newline
    ];

    let status: string = NIL;

    record.history.namespace = `  ${c.whiteBright(file.namespace)}`;

    if (item.status === Events.Success) {

      if (record.errors.retry.has(file.output)) {
        record.retry -= 1;
        record.errors.retry.delete(file.output);
      }

      record.success += 1;
      record.progress.increment(1);

      const buffer = has('attachment', item.data.asset)
        ? Buffer.from(item.data.asset.attachment, 'base64')
        : Buffer.from(item.data.asset.value || null, 'utf8');

      writeFileSync(file.output, buffer);

      record.history.key = status = tui.message('neonGreen', file.key);

    } else if (item.status === Events.Retry) {

      if (!record.errors.retry.has(file.output)) {
        record.retry += 1;
        record.errors.retry.set(file.output, { file, attempts: 0 });
      }

      record.history.key = status = tui.message('orange', file.key);

    } else if (item.status === Events.Failed) {

      if (record.errors.retry.has(file.output)) {
        record.retry -= 1;
        record.errors.retry.delete(file.output);
      }

      if (!record.errors.remote.has(file.output)) {

        record.failed += 1;
        record.progress.increment(1);
        record.errors.remote.set(file.output, {
          file,
          attempts: 0,
          response: item.error
        });
      }

      record.history.key = status = tui.message('redBright', file.key);

    }

    for (const [ prop, ref ] of sync) {

      const [ store, target ] = prop.split(':');

      message.push(
        tui.message('neonCyan', `${c.bold(target.toUpperCase())}  ${c.ARR}  ${store}`),
        c.newline
      );

      if (store === theme.store && target === theme.target) {

        const success = `  ${c.bold(`${ref.success}`)} ${c.white('of')} ${c.bold(`${ref.size}`)}`;
        const retried = `  ${c.bold(`${ref.retry}`)}`;
        const failed = `  ${c.bold(`${ref.failed}`)}`;

        message.push(
          status,
          c.newline,
          tui.suffix('white', 'resource  ', record.history.namespace),
          n.nl,
          tui.suffix('whiteBright', 'success  ', success),
          n.nl,
          tui.suffix(ref.retry > 0 ? 'orange' : 'white', 'retrying ', retried),
          n.nl,
          tui.suffix(ref.failed > 0 ? 'redBright' : 'white', 'errors', failed),
          c.newline,
          ref.progress.render(),
          c.newline
        );

      } else {

        const success = `  ${c.bold(`${ref.success}`)} ${c.white('of')} ${c.bold(`${ref.size}`)}`;
        const retried = `  ${c.bold(`${ref.retry}`)}`;
        const failed = `  ${c.bold(`${ref.failed}`)}`;

        message.push(
          ref.history.key,
          c.newline,
          tui.suffix('white', 'resource  ', ref.history.namespace),
          n.nl,
          tui.suffix('whiteBright', 'success  ', success),
          n.nl,
          tui.suffix(ref.retry > 0 ? 'orange' : 'white', 'retrying ', retried),
          n.nl,
          tui.suffix(ref.failed > 0 ? 'redBright' : 'white', 'errors', failed),
          c.newline,
          ref.progress.render(),
          c.newline
        );

      }

    }

    log.update(n.glue(message));

  });

  for (const [ key, { files } ] of sync) {

    const [ store, theme ] = key.split(':');
    const output = join($.dirs.import, store, theme);

    for (const asset of files) {

      timer.start();

      await request.assets('get', importFile(asset.key, output));

    }
  }

};
