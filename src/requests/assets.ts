import { isNil } from 'rambdax';
import { IRequest, IThemes, IFile } from 'types';
import { queue, axios } from 'requests/queue';
import { is } from 'shared/native';
import * as log from 'cli/logs';
import { error } from 'cli/errors';
import { AxiosError } from 'axios';

/* -------------------------------------------- */
/* PRIVATE                                      */
/* -------------------------------------------- */

/**
 * Request Handler
 *
 * Executes a request to a Shopify resource
 * REST endpoint. When request rates are exceeded
 * the handler will re-queue them.
 */
export async function get (url: string, config: IRequest) {

  return axios.get(url, config).then(({ data }) => {

    return data;

  }).catch((e: AxiosError) => {

  });

};

/**
 * Request Handler
 *
 * Executes a request to a Shopify resource
 * REST endpoint. When request rates are exceeded
 * the handler will re-queue them.
 */
export async function assets (sync: IThemes, file: IFile, config: IRequest) {

  config.url = sync.url;

  if (!isNil(sync.token)) config.headers['X-Shopify-Access-Token'] = sync.token;

  return axios(config).then(({ headers, data }) => {

    if (config.method === 'delete') {
      log.fileDelete(sync.store, sync.target);
    } else if (config.method === 'get') {
      return data;
    } else {
      log.fileSync(file, sync.store, sync.target);
    }

    const limit = Number(headers['x-shopify-shop-api-call-limit'].slice(0, 2));

    if (is(limit, 39)) queue.concurrency = 1;

  }).catch((e: AxiosError) => {

    // if (!sync.queue) return error(file.key, e.response);

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      queue.add(() => assets(sync, file, config), { priority: 1000 });
    } else {
      error(file.key, e.response);
    }

  });

};
