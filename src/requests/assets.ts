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

let limit: number;

/**
 * Request Handler
 *
 * Executes a request to a Shopify resource
 * REST endpoint. When request rates are exceeded
 * the handler will re-queue them.
 */
export async function assets (sync: IThemes, file: IFile, config: IRequest) {

  if (queue.concurrency > 1) {
    if (limit >= 20) queue.concurrency--;
    if (limit >= 35) queue.concurrency--;
  } else if (queue.concurrency < 3 && limit < 30) {
    queue.concurrency++;
  }

  return axios(config).then(({ headers, data }) => {

    if (config.method === 'delete') {
      log.fileDelete(sync.domain, sync.target);
    } else if (config.method === 'get') {
      return data;
    } else {
      log.fileSync(file, sync.domain, sync.target);
    }

    limit = parseInt(headers['x-shopify-shop-api-call-limit'].slice(0, 2), 10);

  }).catch((e: AxiosError) => {

    // if (!sync.queue) return error(file.key, e.response);

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      queue.add(() => assets(sync, file, config));
    } else {
      error(file.key, e.response);
    }

  });

};
