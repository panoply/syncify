import axios from 'axios';
import { delay } from 'rambdax';
import Queue from 'p-queue';
import { IStore, IRedirect } from 'types';
import { assign, is } from 'shared/native';
import * as log from 'cli/logs';
import { error } from 'cli/errors';

/**
 * Wait Condition
 *
 * Used to throttle uploads when rate exceeds
 * are incurred. Delays execution by an additional
 * 500ms limiting requests to 2 per second.
 */
let wait: boolean = false;

/**
 * The Request Queue
 *
 * We exceed the rate limits set by Shitify.
 * This allows us to upload in bursts, when we hit
 * the rates we requeue the requests.
 */
export const queue = new Queue(
  {
    concurrency: 5,
    interval: 500,
    intervalCap: 4
  }
);

export async function list (
  store: IStore,
  current: {
    [store: string]: {
     [path: string]: string
    }
  },
  cache: {
   [store: string]: {
    [path: string]: string
   }
  }
) {

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.get<{
    redirects: IRedirect[]
  }>(store.endpoints.redirects).then(({ status, data }) => {

    if (is(status, 200)) {

      if (queue.size === 0) {
        log.redirect(data.redirects[0].path);
      }

      return data.redirects;

    }

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      queue.add(() => list(store, current, cache), { priority: 1000 });
      wait = !wait;
    } else {
      if (!queue.isPaused) {
        queue.pause();
        return error(store.store, e.response);
      }
    }

  });

}

export async function create (url: string, redirect: IRedirect) {

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.post(url, { redirect }).then(({ status }) => {

    if (is(status, 200)) {
      log.redirect(`${redirect.path} > ${redirect.target}`);
    }

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      wait = !wait;
      queue.add(async () => create(url, redirect), { priority: 1000 });
    } else {

      if (!queue.isPaused) {
        queue.pause();
        return error(redirect.path, e.response);
      }

    }

  });

}

export async function update (url: string, redirect: IRedirect) {

  console.log(url, redirect);

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.put(url, { redirect }, {
    responseType: 'json'
  }).then(({ status }) => {

    if (is(status, 200)) {
      log.creation(`${redirect.path} > ${redirect.target} redirect`);
    }

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      wait = !wait;
      queue.add(async () => update(url, redirect), { priority: 1000 });
    } else {

      if (!queue.isPaused) {
        queue.pause();
        return error(redirect.path, e.response);
      }
    }

  });
}

export async function write (store: IStore, redirect: IRedirect) {

  const url = store.endpoints.redirects;

  return axios.get<{
    redirects: IRedirect[]
  }>(url).then(({ data }) => {

    if (is(data.redirects.length, 0)) {
      return create(url, redirect);
    }

    const record = data.redirects.find(({
      path,
      target
    }) => (redirect.path === path && redirect.target === target));

    if (!record) return create(url, redirect);

    redirect.id = record.id;

    return update(url.replace('.json', `/${record.id}.json`), redirect);

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      wait = !wait;
      queue.add(async () => write(store, redirect), { priority: 1000 });
    } else {
      if (!queue.isPaused) {
        queue.pause();
        return error(redirect.path, e.response);
      }
    }

  });

}
