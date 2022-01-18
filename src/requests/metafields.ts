import axios from 'axios';
import { delay, has } from 'rambdax';
import Queue from 'p-queue';
import { IMetafield, IStores } from '../typings';
import { is } from '../config/utils';
import * as log from '../logs/console';
import { error } from '../logs/errors';

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

export async function list (store: IStores) {

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.get<{
    metafields: IMetafield[]
  }>(store.endpoints.metafields).then(({ status, data }) => {

    if (is(status, 200)) return data.metafields;

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      queue.add(() => list(store), { priority: 1000 });
      wait = !wait;
    } else {
      if (!queue.isPaused) {
        queue.pause();
        return error(store.store, e.response);
      }
    }

  });

}

export async function get (store: IStores, metafield: IMetafield) {

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.get<{
    metafields: IMetafield[]
  }>(store.endpoints.metafields).then(({ data }) => {

    if (has('namespace', metafield) && has('key', metafield)) {
      return data.metafields.find(({
        namespace,
        key
      }) => (metafield.namespace === namespace && metafield.key === key));
    }

    if (has('namespace', metafield)) {
      return data.metafields.filter(({ namespace }) => namespace === metafield.namespace);
    }

    if (has('key', metafield)) {
      return data.metafields.filter(({ key }) => key === metafield.namespace);
    }

    return data.metafields;

  }).catch(e => {

    if (!store.queue) return error(store.store, e.response);

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      queue.add(() => get(store, metafield), { priority: 1000 });
      wait = !wait;
    } else {
      if (!queue.isPaused) {
        queue.pause();
        return error(store.store, e.response);
      }
    }

  });

}

export async function create (url: string, metafield: IMetafield) {

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.post(url, { metafield }).then(({ status }) => {

    if (is(status, 200)) {
      log.creation(`${metafield.namespace}.${metafield.key} metafield`);
    }

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      wait = !wait;
      queue.add(async () => create(url, metafield), { priority: 1000 });
    } else {

      if (!queue.isPaused) {
        queue.pause();
        return error(metafield.namespace, e.response);
      }

    }

  });

}

export async function update (url: string, metafield: IMetafield) {

  console.log(url, metafield);

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.put(url, { metafield }, {
    responseType: 'json'
  }).then(({ status }) => {

    if (is(status, 200)) {
      log.creation(`${metafield.namespace}.${metafield.key} metafield`);
    }

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      wait = !wait;
      queue.add(async () => update(url, metafield), { priority: 1000 });
    } else {

      if (!queue.isPaused) {
        queue.pause();
        return error(metafield.namespace, e.response);
      }
    }

  });
}

export async function write (store: IStores, metafield: IMetafield) {

  const url = store.endpoints.metafields;

  return axios.get<{
    metafields: IMetafield[]
  }>(url).then(({ data }) => {

    if (is(data.metafields.length, 0)) {
      return create(url, metafield);
    }

    const record = data.metafields.find(({
      namespace,
      key
    }) => (metafield.namespace === namespace && metafield.key === key));

    if (!record) return create(url, metafield);

    metafield.id = record.id;
    metafield.type = 'json';

    return update(url.replace('.json', `/${record.id}.json`), metafield);

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      wait = !wait;
      queue.add(async () => write(store, metafield), { priority: 1000 });
    } else {
      if (!queue.isPaused) {
        queue.pause();
        return error(metafield.namespace, e.response);
      }
    }

  });

}
