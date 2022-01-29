import Queue from 'p-queue';
import axios from 'axios';
import { mapFastAsync, delay } from 'rambdax';
import { IRequest, IThemes, IStore } from 'types';
import { is, getAssetKey } from 'config/utils';
import * as log from 'cli/console';
import { error } from 'cli/errors';

/* -------------------------------------------- */
/* EXPORTED                                     */
/* -------------------------------------------- */

/**
 * The Request Queue
 *
 * We exceed the rate limits set by Shitify.
 * This allows us to upload in bursts, when we hit
 * the rates we requeue the requests.
 */
export const requests = new Queue(
  {
    concurrency: 5,
    interval: 500,
    intervalCap: 4
  }
);

/**
 * Request Queue
 *
 * Maps queued requests, returning an array of
 * promises used for multiple storefront execution.
 */
export function queue (list: any[], size?: number) {

  // const num = 0;

  return (config: IRequest) => {

    config.responseType = 'json';

    return requests.add(() => mapFastAsync(store => {

      config.url = store.url;

      // screen.percent(num++, size);

      return request(store, config as IRequest);

    }, list));

  };
}

/* -------------------------------------------- */
/* PRIVATE                                      */
/* -------------------------------------------- */

/**
 * Wait Condition
 *
 * Used to throttle uploads when rate exceeds
 * are incurred. Delays execution by an additional
 * 500ms limiting requests to 2 per second.
 */
let wait: boolean = false;

/**
 * Request Handler
 *
 * Executes a request to a Shopify resource
 * REST endpoint. When request rates are exceeded
 * the handler will re-queue them.
 */
async function request (sync: IThemes | IStore, config: IRequest) {

  const file = getAssetKey(config);

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios(config).then(({ status }) => {

    if (is(status, 200)) {

      switch (config.method) {
        case 'delete':
          log.deleted(file);
          break;
        case 'put':
          log.updated(file);
          break;
        case 'post':
          log.created(file);
          break;
      }

    }

  }).catch(e => {

    if (!sync.queue) return error(file, e.response);

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      requests.add(() => request(sync, config), { priority: 1000 });
      wait = !wait;
    } else {
      error(file, e.response);
    }

  });

}
