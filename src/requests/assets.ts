import { IRequest, IThemes, IFile } from 'types';
import { queue, axios } from 'requests/queue';
import { is } from 'shared/native';
import { log, print } from 'cli/stdout';
import * as tui from 'cli/tui';
import * as c from 'cli/ansi';
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
export async function assets (sync: IThemes, file: IFile, config: IRequest) {

  if (queue.concurrency > 1) {

    if (limit >= 20) queue.concurrency--;
    if (limit >= 35) queue.concurrency--;

  } else if (queue.concurrency < 3 && limit < 30) {

    queue.concurrency++;

  }

  return axios(config).then(({ headers, data }) => {

    if (config.method === 'get') return data;
    if (config.method === 'delete') {
      log.print(sync.store, sync.target);
    } else {
      print(tui.task(`${c.green('✓')} ${c.greenBright(file.key)}`));
    }

    limit = parseInt(headers['x-shopify-shop-api-call-limit'].slice(0, 2), 10);

  }).catch((e: AxiosError) => {

    // if (!sync.queue) return error(file.key, e.response);
    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      print(tui.task(`${c.orange('↻')} ${c.orange(file.key)}`));
      queue.add(() => assets(sync, file, config));
    } else {
      print(tui.task(`${c.red('𐄂')} ${c.redBright(file.key)}`));
    //  error(file.key, e.response);
    }

  });

};
