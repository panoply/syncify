/* eslint-disable no-unused-vars */

import type { AxiosError } from 'axios';
import type { Theme, File, FileKeys, Requests, Responses, RequestMethods } from 'types';
import merge from 'mergerino';
import { delay } from 'rambdax';
import { pMapSkip } from 'p-map';
import { Type } from 'syncify:file';
import { queue, axios } from 'syncify:requests/queue';
import { timer } from 'syncify:timer';
import { event } from 'syncify:utils';
import * as log from 'syncify:log';
import * as error from 'syncify:errors';
import { $ } from 'syncify:state';

export const enum Events {
  /**
   * Transfer Successful
   */
  Success,
  /**
   * Transfer Retry Queue
   */
  Retry,
  /**
   * Transfer Failed
   */
  Failed,
  /**
   * Transfer file is empty
   */
  Empty,
}

/**
 * Has Asset
 *
 * Checks for the existence of an asset
 */
export async function has (asset: FileKeys, theme: Theme): Promise<boolean> {

  const request = merge($.sync.stores[theme.sidx].client, {
    url: theme.url,
    params: {
      'asset[key]': asset
    }
  });

  return axios<Requests.Asset<'GET'>, Responses.Asset<'GET'>>(request)
  .then(() => true)
  .catch(() => false);

};

/**
 * Find Asset
 *
 * Same as `has` but returns the asset data
 */
export async function find (asset: FileKeys, theme: Theme) {

  const request = merge($.sync.stores[theme.sidx].client, {
    method: 'get',
    url: theme.url,
    params: {
      'asset[key]': asset
    }
  });

  return axios<Requests.Asset<'GET'>, Responses.Asset<'GET'>>(request)
  .then(({ data }) => data.asset.value)
  .catch(() => false);

};

/**
 * Upload Asset
 *
 * Uploads a single asset
 */
export async function upload (asset: string, config: {theme: Theme, key: FileKeys }): Promise<boolean> {

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

  return axios<Requests.Asset<'PUT'>, Responses.Asset<'PUT'>>(request)
  .then(() => true)
  .catch((e: AxiosError) => {

    log.error(config.key);
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
export async function get <T extends RequestMethods> (theme: Theme, config: Requests.Asset<T>) {

  const request = merge(config, {
    method: 'get',
    url: theme.url
  });

  try {

    const { data } = await axios<Requests.Asset<T>, Responses.Asset<T>>(request);

    return data;

  } catch (e) {

    if (e.response && (e.response.status === 429 || e.response.status === 500)) {

      if (config.params['asset[key]']) {
        log.retrying(config.params['asset[key]'], theme as Theme);
        queue.add(() => get(theme, config));
      }

    } else {

      if ($.mode.upload) {

        throw e.response;

      } else {

        if (config.params['asset[key]']) {

          log.error(config.params['asset[key]']);
          error.request(config.params['asset[key]'], e.response);

        }

      }
    }
  }

};

let limit: number;

/**
 * Request Handler
 *
 * Executes a request to a Shopify resource REST endpoint. When request rates are exceeded
 * the handler will re-queue them. This function supports various methods and is used for mode
 * execution in `download`, `upload` and `watch`.
 */
export async function sync <T extends RequestMethods> (theme: Theme, file: File, config: Requests.Asset<T>) {

  if (queue.isPaused) return;

  if (queue.concurrency > 2) {
    if (limit >= 20) queue.concurrency--;
    if (limit >= 32) queue.concurrency--;
    if (limit >= 39) await delay(500);
  } else if (queue.concurrency < 3 && limit < 30) {

    queue.concurrency++;

  }

  if ($.mode.upload === false && $.mode.import === false) timer.start();

  const promise = await axios<Requests.Asset<T>, Responses.Asset<T>>(config).then(({ headers, data }) => {

    if ($.mode.import === false && config.method === 'get') return data;

    if (config.method === 'delete') {

      log.deleted(file.relative, theme);

    } else {

      if ($.mode.watch) {

        if (
          $.mode.hot === true &&
          file.type !== Type.Script &&
          file.type !== Type.Style) log.hot();

        log.upload(theme);

      } else if ($.mode.upload) {

        event.emit('upload', {
          status: Events.Success,
          get theme () { return theme; },
          get file () { return file; }
        });

      } else if ($.mode.import) {

        event.emit('import', {
          status: Events.Success,
          get theme () { return theme; },
          get file () { return file; },
          get data () { return data; }
        });

      }

    }

    limit = parseInt(headers['x-shopify-shop-api-call-limit'].slice(0, 2), 10);

  }).catch((e: AxiosError) => {

    // if (!queue) return log.error(file.key, e.response);

    if (e.response && (e.response.status === 429 || e.response.status === 500)) {

      if (
        $.mode.upload === false &&
        $.mode.import === false) log.retrying(file.key, theme);

      queue.add(() => sync(theme, file, config));

      if ($.mode.upload) {

        event.emit('upload', {
          status: Events.Retry,
          get theme () { return theme; },
          get file () { return file; }
        });

      } else if ($.mode.import) {

        event.emit('import', {
          status: Events.Retry,
          get theme () { return theme; },
          get file () { return file; }
        });

      }

    } else {

      if ($.mode.upload) {

        return event.emit('upload', {
          status: Events.Failed,
          error: e.response,
          get theme () { return theme; },
          get file () { return file; }
        });

      } else if ($.mode.import) {

        if (e.response === undefined) {

          event.emit('import', {
            status: Events.Empty,
            get theme () { return theme; },
            get file () { return file; }
          });

        } else {

          return event.emit('import', {
            status: Events.Failed,
            error: e.response,
            get theme () { return theme; },
            get file () { return file; }
          });

        }

      } else {

        log.error(file.key, {
          suffix: 'shopify rejected the request',
          notify: {
            title: 'Request Error',
            message: `Failed to sync ${file.key}`
          }
        });

        if (e.isAxiosError) {

          error.request(file.relative, e.response);

        }

      }

    }

    return pMapSkip;

  });

  return promise;

};
