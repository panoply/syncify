import axios from 'axios';
import { delay, has } from 'rambdax';
import { IFile, IMetafield, IStore } from 'types';
import { is } from 'config/utils';
import * as log from 'cli/logs';
import { error } from 'cli/errors';
import { queue } from 'requests/queue';

/**
 * Wait Condition
 *
 * Used to throttle uploads when rate exceeds
 * are incurred. Delays execution by an additional
 * 500ms limiting requests to 2 per second.
 */
let wait: boolean = false;

/**
 * List Metafields
 *
 * Metafields listing request, typically called
 * from the prompt to query and explore metafields.
 */
export async function list (store: IStore) {

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.get<{
    metafields: IMetafield[]
  }>(store.url.metafields).then(({ status, data }) => {

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

/**
 * Get Metafield
 *
 * Returns a metafield by walking through
 * results to find relevant match.
 */
export async function get (store: IStore, metafield: IMetafield) {

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.get<{ metafields: IMetafield[] }>(store.url.metafields).then(({ data }) => {

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

/**
 * Create Metafield
 *
 * Creates a new metafield on the global
 * shop. This is called when a metafield does
 * not exists.
 */
export async function create (url: string, metafield: IMetafield) {

  metafield.type = 'json';
  metafield.value_type = 'json_string';

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.post(url, { metafield }).then(({ status }) => {

    if (is(status, 200)) {
      log.created(`${metafield.namespace}.${metafield.key} metafield`);
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

/**
 * Update Metafield
 *
 * Updates an existing metafield using its unique `id`.
 * This is applied only when a metafield reference exists.
 */
export async function update (url: string, metafield: IMetafield) {

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.put(url, { metafield }, { responseType: 'json' }).then(({ status }) => {

    if (is(status, 200)) {
      log.updated(`${metafield.namespace}.${metafield.key} metafield`);
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

/**
 * Metafields
 *
 * Metafield handler function. This is used in the
 * resource modes and will query, create or update
 * metafields.
 */
export async function metafields (url: string, file: IFile, metafield: IMetafield) {

  return axios.get<{ metafields: IMetafield[] }>(url).then(({ data }) => {

    if (is(data.metafields.length, 0)) return create(url, metafield);

    const record = data.metafields.find(({ namespace, key }) => (
      metafield.namespace === namespace &&
      metafield.key === key
    ));

    if (!record) return create(url, metafield);

    metafield.id = record.id;
    metafield.type = 'json';

    return update(url.replace('.json', `/${record.id}.json`), metafield);

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      wait = !wait;
      queue.add(async () => metafields(url, file, metafield), { priority: 1000 });
    } else {
      if (!queue.isPaused) {
        queue.pause();
        return error(metafield.namespace, e.response);
      }
    }

  });

}
