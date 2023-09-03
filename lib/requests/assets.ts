import type { AxiosError, AxiosRequestConfig } from 'axios';
import type { Request, Theme, File, FileKeys } from 'types';
import { Type } from '~process/files';
import { pMapSkip } from 'p-map';
import { queue, axios } from '~requests/queue';
import * as timer from '~utils/timer';
import { log, error } from '~log';
import { $ } from '~state';
import merge from 'mergerino';
import { event, getSizeStr } from '~utils/utils';
import { hasPath } from 'rambdax';

/**
 * Has Asset
 *
 * Checks for the existence of an asset
 */
export async function has (asset: FileKeys, theme: Theme): Promise<boolean> {

  return axios({
    ...$.sync.stores[theme.sidx].client,
    method: 'get',
    url: theme.url,
    params: {
      'asset[key]': asset
    }
  }).then(() => true).catch(() => false);

};

/**
 * Find Asset
 *
 * Same as `has` but returns the asset data
 */
export async function find (asset: FileKeys, theme: Theme): Promise<string> {

  return axios({
    ...$.sync.stores[theme.sidx].client,
    method: 'get',
    url: theme.url,
    params: {
      'asset[key]': asset
    }
  }).then(({ data }) => data.asset).catch(() => false);

};

/**
 * Upload Asset
 *
 * Uploads a single asset
 */
export async function upload (asset: string, config: { theme: Theme, key: FileKeys }): Promise<boolean> {

  const request = merge($.sync.stores[config.theme.sidx].client, {
    method: 'put',
    url: config.theme.url,
    data: {
      asset: {
        key: config.key,
        value: asset
      }
    }
  });

  return axios(request).then(() => {

    return true;

  }).catch((e: AxiosError) => {

    log.failed(config.key);

    error.request(config.key, e.response);

    return false;

  });

};

/**
 * Request Handler
 *
 * Executes a request to a Shopify resource REST endpoint.
 * When request rates are exceeded the handler will re-queue them.
 */
export async function get <T> (url: string, config: AxiosRequestConfig<Request>): Promise<T> {

  return axios.get(url, config).then(({ data }) => {

    return data;

  }).catch((e: AxiosError) => {

    if (e.response && (e.response.status === 429 || e.response.status === 500)) {
      log.retrying(file.key, theme);
      queue.add(() => sync(theme, file, config));
    } else {

      if ($.mode.upload) {

        throw e.response;

      } else {

        log.failed(file.key);
        error.request(file.relative, e.response);
      }

    }

    log.failed(url);
    error.request(url, e.response);

  });

};

let limit: number;

/**
 * Request Handler
 *
 * Executes a request to a Shopify resource
 * REST endpoint. When request rates are exceeded
 * the handler will re-queue them.
 */
export async function sync (theme: Theme, file: File, config: Request) {

  if (queue.isPaused) return;

  const { mode } = $;

  if (queue.concurrency > 2) {
    if (limit >= 20) queue.concurrency--;
    if (limit >= 35) queue.concurrency--;
  } else if (queue.concurrency < 3 && limit < 30) {
    queue.concurrency++;
  }

  if (!mode.upload) timer.start();

  const promise = await axios(config).then(({ headers, data }) => {

    if (config.method === 'get') return data;
    if (config.method === 'delete') {

      log.deleted(file.relative, theme);

    } else {

      if (mode.watch) {

        if (file.type !== Type.Script && file.type !== Type.Style) log.hot();

        log.upload(theme);

      } else if (mode.upload) {

        let fileSize = '';

        if ('asset' in config.data) fileSize = getSizeStr(config.data.asset.value);

        event.emit('upload', 'uploaded', theme, {
          key: file.key,
          namespace: file.namespace,
          fileSize
        });

      }

    }

    limit = parseInt(headers['x-shopify-shop-api-call-limit'].slice(0, 2), 10);

  }).catch((e: AxiosError) => {

    // if (!queue) return log.error(file.key, e.response);

    if (e.response && (e.response.status === 429 || e.response.status === 500)) {

      if (!mode.upload) log.retrying(file.key, theme);

      queue.add(() => sync(theme, file, config));

    } else {

      if (mode.upload) {

        let fileSize = '';

        if ('asset' in config.data) fileSize = getSizeStr(config.data.asset.value);

        event.emit('upload', 'failed', theme, {
          key: file.key,
          namespace: file.namespace,
          fileSize,
          get file () {
            return file;
          },
          get error () {
            return e.response;
          }
        });

        //  throw e.response;

      } else {

        log.failed(file.key);

        if (e.isAxiosError) {
          error.request(file.relative, e.response);
        }

      }

    }

    return pMapSkip;

  });

  return promise;

};
