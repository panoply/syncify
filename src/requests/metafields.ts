import { delay, has } from 'rambdax';
import { IFile, IMetafield, IStore } from 'types';
import * as log from 'cli/logs';
import { error } from 'cli/errors';
import { is } from 'shared/native';
import { queue, axios } from 'requests/queue';

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
export const list = async (store: IStore) => {

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.get<{ metafields: IMetafield[] }>(store.url.metafields).then(({ data }) => {

    return data.metafields;

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

};

/**
 * Get Metafield
 *
 * Returns a metafield by walking through
 * results to find relevant match.
 */
export const get = async (store: IStore, field: IMetafield) => {

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.get<{ metafields: IMetafield[] }>(store.url.metafields).then(({ data }) => {

    if (has('namespace', field) && has('key', field)) {
      return data.metafields.find(m => (field.namespace === m.namespace && field.key === m.key));
    }

    if (has('namespace', field)) {
      return data.metafields.filter(({ namespace }) => namespace === field.namespace);
    }

    if (has('key', field)) {
      return data.metafields.filter(({ key }) => key === field.namespace);
    }

    return data.metafields;

  }).catch(e => {

    if (!queue) return error(store.store, e.response);

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      queue.add(() => get(store, field), { priority: 1000 });
      wait = !wait;
    } else {
      if (!queue.isPaused) {
        queue.pause();
        return error(store.store, e.response);
      }
    }

  });

};

/**
 * Create Metafield
 *
 * Creates a new metafield on the global
 * shop. This is called when a metafield does
 * not exists.
 */
export const create = async (url: string, file: IFile, metafield: IMetafield) => {

  metafield.type = 'json';
  metafield.value_type = 'json_string';

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.post(url, { metafield }).then(() => {

    log.fileSync(file, metafield.namespace, metafield.key);

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      wait = !wait;
      queue.add(async () => create(url, file, metafield), { priority: 1000 });
    } else {

      if (!queue.isPaused) {
        queue.pause();
        return error(metafield.namespace, e.response);
      }

    }

  });

};

/**
 * Update Metafield
 *
 * Updates an existing metafield using its unique `id`.
 * This is applied only when a metafield reference exists.
 */
export const update = async (url: string, file: IFile, metafield: IMetafield) => {

  if (wait) {
    await delay(500);
    wait = false;
  }

  return axios.put(url, { metafield }, { responseType: 'json' }).then(() => {

    log.fileSync(file, metafield.namespace, metafield.key);

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      wait = !wait;
      queue.add(async () => update(url, file, metafield), { priority: 1000 });
    } else {

      if (!queue.isPaused) {
        queue.pause();
        return error(metafield.namespace, e.response);
      }
    }

  });
};

/**
 * Metafields
 *
 * Metafield handler function. This is used in the
 * resource modes and will query, create or update
 * metafields.
 */
export const metafields = async (url: string, file: IFile, field: IMetafield) => {

  return axios.get<{ metafields: IMetafield[] }>(url).then(({ data }) => {

    if (is(data.metafields.length, 0)) return create(url, file, field);

    const record = data.metafields.find(m => (field.namespace === m.namespace && field.key === m.key));

    if (!record) return create(url, file, field);

    field.id = record.id;
    field.type = 'json';

    return update(url.replace('.json', `/${record.id}.json`), file, field);

  }).catch(e => {

    if (is(e.response.status, 429) || is(e.response.status, 500)) {
      wait = !wait;
      queue.add(async () => metafields(url, file, field), { priority: 1000 });
    } else {
      if (!queue.isPaused) {
        queue.pause();
        return error(field.namespace, e.response);
      }
    }

  });

};
