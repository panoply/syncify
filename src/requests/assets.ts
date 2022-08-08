import { Request, IThemes, IFile } from 'types';
import { queue, axios } from 'requests/queue';
import { is } from 'shared/native';
import { log, c, error } from '../logger';
import * as timer from 'process/timer';
import { AxiosError, AxiosRequestConfig } from 'axios';

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
export async function get <T> (url: string, config: AxiosRequestConfig<Request>): Promise<T> {

  return axios.get(url, config).then(({ data }) => {

    return data;

  }).catch((e: AxiosError) => {

    log.error(e.message);

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
export async function sync (theme: IThemes, file: IFile, config: Request) {

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
      // if (queue.size === 0) log.wait();
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
