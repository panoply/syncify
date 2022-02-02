import { delay } from 'rambdax';
import { IRequest, IThemes, IFile } from 'types';
import { queue, axios } from 'requests/queue';
import { is } from 'config/utils';
import * as log from 'cli/logs';
import { error } from 'cli/errors';

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
export async function assets (sync: IThemes, file: IFile, config: IRequest) {

  config.url = sync.url;

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios(config).then(({ status }) => {

    if (is(status, 200)) {
      if (config.method === 'put') {
        log.updated(file.key);
      } else if (config.method === 'delete') {
        log.deleted(file.key);
      } else if (config.method === 'post') {
        log.created(file.key);
      }
    }

  }).catch(e => {

    if (!sync.queue) return error(file.key, e.response);

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      queue.add(() => assets(sync, file, config), { priority: 1000 });
      wait = !wait;
    } else {
      error(file.key, e.response);
    }

  });

};
