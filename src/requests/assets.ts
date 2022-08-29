import { Request, Theme, File, FileKeys } from 'types';
import { queue, axios } from './queue';
import { assign, is } from '../shared/native';
import { log, c, error } from '../logger';
import * as timer from '../process/timer';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { bundle } from '../config';
/* -------------------------------------------- */
/* PRIVATE                                      */
/* -------------------------------------------- */

/**
 * Has Asset
 *
 * Checks for the existence of an asset
 */
export async function has (asset: FileKeys, theme: Theme): Promise<boolean> {

  return axios({
    ...bundle.sync.stores[theme.sidx].client,
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
    ...bundle.sync.stores[theme.sidx].client,
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

  const request = assign({}, bundle.sync.stores[config.theme.sidx].client, {
    method: 'put',
    url: config.theme.url,
    data: {
      asset: {
        key: config.key,
        value: asset
      }
    }
  });

  return axios(request).then(() => true).catch(() => false);

};

/**
 * Request Handler
 *
 * Executes a request to a Shopify resource
 * REST endpoint. When request rates are exceeded
 * the handler will re-queue them.
 */
export async function get <T> (url: string, config: AxiosRequestConfig<Request>): Promise<T> {

  return axios.get(url, config).then(({ data }) => {

    return data;

  }).catch((e: AxiosError) => {

    log.throws(e.message);

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

  if (queue.concurrency > 1) {
    if (limit >= 20) queue.concurrency--;
    if (limit >= 35) queue.concurrency--;
  } else if (queue.concurrency < 3 && limit < 30) {
    queue.concurrency++;
  }

  timer.start();

  return axios(config).then(({ headers, data }) => {

    if (config.method === 'get') return data;
    if (config.method === 'delete') {
      log.info(theme.store);
    } else {
      log.upload(theme);
      // if (queue.onIdle()) log.complete();
    }

    limit = parseInt(headers['x-shopify-shop-api-call-limit'].slice(0, 2), 10);

  }).catch((e: AxiosError) => {

    // if (!sync.queue) return error(file.key, e.response);
    if (is(e.response.status, 429) || is(e.response.status, 500)) {

      log.info(`${c.orange('↻')} ${c.orange(file.key)}`);
      queue.add(() => sync(theme, file, config));

    } else {
      log.info(`${c.redBright('invalid')} ${c.redBright.bold(file.key)}`);
      error(e.response);
    }

  });

};
