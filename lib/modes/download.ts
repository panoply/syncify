import { Syncify, Requests, Theme, AssetResource } from 'types';
import { join } from 'path';
import { has, mapAsync } from 'rambdax';
import { writeFile, writeFileSync } from 'fs-extra';
import { isFunction, isUndefined, isString, isBuffer, nl, glue } from '../utils/native';
import { $ } from '~state';
import { log, c, tui } from '~log';
import { client } from '~requests/client';
import merge from 'mergerino';
import { Namespace, importFile } from '~process/files';
import { event, getSizeStr } from '~utils/utils';
import { AxiosResponse } from 'axios';
import { get } from '~requests/assets';
import * as timer from '~utils/timer';
import * as n from '~utils/native';

interface SyncModel {
  [store: string]: {
    [theme: string]: {
      files: AssetResource[]
      data: string[];
      theme: string;
      downloads: number;
      failed: number;
      previous: {
        key: string;
        size: string;
      };
      retry: number;
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

interface RetryModel {
  [store: string]: {
    [theme: string]: Map<string, {
      file: File;
      attempts: number;
    }>
  }
}

interface ErrorModel {
  local: Array<{
    file: File;
    attempts: number;
    response: string;
  }>;
  retry: RetryModel;
  remote: {
    [store: string]: {
      [theme: string]: StoreError
    }
  }
}

/**
 * Get Model
 *
 * Generates the upload model which will create a workable store reference
 * for the uploading process.
 */
async function getModel () {

  const errors: ErrorModel = {
    local: [],
    remote: {},
    retry: {}
  };

  const sync: SyncModel = {};

  /**
   * Indentation Width used for CLI logging
   */
  let width: number = 0;

  for (const theme of $.sync.themes) {

    const store = $.sync.stores[theme.sidx];
    const { assets } = await get<Requests.Assets>(theme, store.client);

    if (theme.target.length > width) width = theme.target.length;

    if (!has(theme.store, sync)) sync[theme.store] = {};
    if (!has(theme.store, errors.remote)) errors.remote[theme.store] = {};
    if (!has(theme.target, errors.remote[theme.store])) errors.remote[theme.store][theme.target] = new Map();
    if (!has(theme.store, errors.retry)) errors.retry[theme.store] = {};
    if (!has(theme.target, errors.retry[theme.store])) errors.retry[theme.store][theme.target] = new Map();

    sync[theme.store][theme.target] = {
      get files () { return assets; },
      theme: theme.target,
      data: [],
      downloads: 0,
      failed: 0,
      retry: 0,
      previous: {
        key: '',
        size: ''
      },
      progress: log.progress(assets.length),
      errors: []
    };

  }

  return { sync, errors };

}

export async function download (cb?: Syncify): Promise<void> {

  $.cache.lastResource = 'download';

  timer.start('download');
  log.newGroup('Download', true);

  const hashook = isFunction(cb);
  const request = client($.sync);
  const { sync, errors } = await getModel();

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

  event.on('download', function (type: 'downloads' | 'failed' | 'retry', { target, store }: Theme, item: {
    key: string;
    namespace: Namespace;
    data: {
      asset: {
        attachment: BufferEncoding;
        value: string;
      }
    };
    get file (): File,
    get error (): AxiosResponse
  }) {

    log.spinner.stop();

    const success = type !== 'failed' && type !== 'retry';
    const items = [
      tui.message('whiteBright', c.bold(item.namespace)),
      c.newline
    ];

    sync[store][target][type] += 1;
    sync[store][target].progress.increment(1);

    if (success) {

      const buffer = has('attachment', item.data.asset)
        ? Buffer.from(item.data.asset.attachment, 'base64')
        : Buffer.from(item.data.asset.value || null, 'utf8');

      if (errors.retry[store][target].has(item.key)) {
        errors.retry[store][target].delete(item.key);
        sync[store][target].retry = errors.retry[store][target].size;
      }

      items.push(
        tui.suffix('white', 'duration ', `  ${timer.stop()}`),
        n.nl,
        tui.suffix('white', 'elapsed ', `  ${timer.now('download')}`),
        c.newline
      );

      for (const storeName in sync) {
        for (const themeName in sync[storeName]) {

          const shop = sync[storeName][themeName];
          const download = `  ${c.bold(`${shop.downloads}`)} ${c.white('of')} ${c.bold(`${shop.files.length}`)}`;
          const failed = `  ${c.bold(`${shop.failed}`)}`;
          const retry = `  ${c.bold(`${shop.retry}`)} ${c.white('of')} ${c.bold(`${shop.files.length}`)}`;

          if (target === themeName && storeName === store) {

            shop.previous.key = item.key;
            shop.previous.size = getSizeStr(buffer.toString());

            items.push(
              tui.message('neonCyan', `${c.bold(themeName.toUpperCase())}  ${c.ARR}  ${storeName}`),
              c.newline,
              tui.message(success ? 'neonGreen' : 'redBright', item.key),
              n.nl,
              tui.message('whiteBright', shop.previous.size),
              c.newline,
              tui.suffix('whiteBright', 'download ', download),
              n.nl,
              tui.suffix(shop.retry > 0 ? 'orange' : 'white', 'retrying ', retry),
              n.nl,
              tui.suffix(shop.failed > 0 ? 'redBright' : 'white', 'failed ', failed),
              c.newline,
              shop.progress.render(),
              c.newline
            );
          } else {
            items.push(
              tui.message('neonCyan', `${c.bold(themeName.toUpperCase())}  ${c.ARR}  ${storeName}`),
              c.newline,
              tui.message(success ? 'neonGreen' : 'redBright', shop.previous.key),
              n.nl,
              tui.message('whiteBright', shop.previous.size),
              c.newline,
              tui.suffix('whiteBright', 'download ', download),
              n.nl,
              tui.suffix(shop.retry > 0 ? 'orange' : 'white', 'retrying ', retry),
              n.nl,
              tui.suffix(shop.failed > 0 ? 'redBright' : 'white', 'failed ', failed),
              c.newline,
              shop.progress.render(),
              c.newline
            );
          }

        }
      }

      writeFileSync(join($.dirs.import, store, target, item.key), buffer);

      log.update(n.glue(items));

    } else if (type === 'retry') {

      sync[store][target].previous.key = c.orange(item.key);
      sync[store][target].previous.size = '';
      sync[store][target].retry = sync[store][target].retry + 1;

      if (errors.retry[store][target].has(item.key)) {

        const retrying = errors.retry[store][target].get(item.key);

        errors.retry[store][target].set(item.key, {
          file: item.file,
          attempts: retrying.attempts + 1
        });

      } else {

        errors.retry[store][target].set(item.key, {
          file: item.file,
          attempts: 0
        });
      }

    } else {

      sync[store][target].errors.push(item.key);
      sync[store][target].previous.key = item.key;
      sync[store][target].previous.size = '';

      if (errors.remote[store][target].has(item.key)) {

        errors.remote[store][target].get(item.key).push({
          store,
          theme: target,
          file: item.file,
          attempts: 0,
          response: item.error
        });

      } else {

        errors.remote[store][target].set(item.key, [
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

  });

  for (const store in sync) {
    for (const theme in sync[store]) {
      for (const asset of sync[store][theme].files) {
        await request.assets('get', importFile(asset.key));
      }
    }
  }

  // for (const theme of sync) {

  //   const store = $.sync.stores[theme.sidx];
  //   const { assets } = await get<Requests.Assets>(theme, store.client);
  //   const { sync, errors, size } = getModel(assets.length);

  //   let n : number = 0;

  //   for (const { key } of assets) {

  //     if (!hashook) {

  //       await request.assets('put', file, input);

  //     } else {

  //       const update = cb.apply({ ...file }, input);

  //       if (n.isUndefined(update) || update === false) {
  //         await request.assets('put', file, input);
  //       } else if (n.isString(update)) {
  //         await request.assets('put', file, update);
  //       } else if (n.isBuffer(update)) {
  //         await request.assets('put', file, update.toString());
  //       } else {
  //         await request.assets('put', file, input);
  //       }
  //     }

  //     try {

  //       timer.start();

  //       const data = merge(store.client, { params: { 'asset[key]': key } });
  //       const { asset } = await request.get<Requests.Asset>(theme, data);
  //       const baseDir = join($.dirs.import, store.domain, theme.target);
  //       const output = join(baseDir, key);
  //       const buffer = has('attachment', asset)
  //         ? Buffer.from(asset.attachment, 'base64')
  //         : Buffer.from(asset.value || null, 'utf8');

  //       n = n + 1;

  //       const downloaded = `${n} of ${size}`;
  //       const namespace = importFile(key);
  //       const fileSize = getSizeStr(buffer.toString());

  //       progress.increment();

  //       if (hashook) {

  //         const update = cb.apply({ asset, output }, buffer);

  //         if (isUndefined(update) || update === false) {
  //           await writeFile(output, buffer);
  //         } else if (isString(update) || isBuffer(update)) {
  //           await writeFile(output, update);
  //         } else {
  //           await writeFile(output, buffer);
  //         }

  //       } else {

  //         await writeFile(output, buffer);

  //         const items = [
  //           tui.message('whiteBright', c.bold(namespace)),
  //           c.newline,
  //           tui.message('neonGreen', key),
  //           c.newline,
  //           tui.suffix('white', 'size ', `  ${fileSize}`),
  //           nl,
  //           tui.suffix('white', 'duration ', `  ${timer.stop()}`),
  //           nl,
  //           tui.suffix('white', 'elapsed ', `  ${timer.now('download')}`),
  //           c.newline,
  //           tui.message('neonCyan', `${c.bold(theme.target.toUpperCase())}  ${c.ARR}  ${store.domain}`),
  //           c.newline,
  //           tui.suffix('whiteBright', 'downloaded ', downloaded),
  //           c.newline,
  //           progress.render(),
  //           c.newline
  //         ];

  //         log.update(glue(items));

  //       }

  //     } catch (e) {

  //       console.log(e);

  //       log.failed(key);

  //     }

  //   }

  // }

};
