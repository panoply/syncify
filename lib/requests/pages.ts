import type { Store, Requests, File } from 'types';
import type { AxiosError } from 'axios';
import { allFalse, has, hasPath } from 'rambdax';
import { queue, axios, requeue } from '~requests/queue';
import { event, getSizeStr } from '~utils';
import { timer } from '~timer';
import { log, error } from '~log';
import { $ } from '~state';
import * as cache from '~process/caches';

/**
 * Get Page
 *
 * Returns a page by id reference. We keep a cache
 * map reference of page IDs in the `node_modules/.syncify/pages.map` file.
 */
export async function get <T extends { page: Requests.Page[] }> (store: Store, id?: number) {

  return axios.get<T>(`pages/${id}.json`, store.client).then(({ data }) => {

    return data.page;

  }).catch((e: AxiosError) => {

    if (!store.queue) return error.request(store.store, e.response);

    if (requeue(e.response.status)) {
      queue.add(() => get(store, id));
    } else {
      return error.request(store.store, e.response);
    }

  });
};

/**
 * Get Metafield
 *
 * Returns a metafield by id reference. We keep a cache
 * map reference of metafield IDs in the `node_modules/.syncify/metafields.map` file.
 */
export async function remove (store: Store, id?: number) {

  return axios.delete(`pages/${id}.json`, store.client).then(() => {

    return true;

  }).catch((e: AxiosError) => {

    if (!store.queue) return error.request(store.store, e.response);

    if (requeue(e.response.status)) {
      queue.add(() => remove(store, id));
    } else {
      return error.request(store.store, e.response);
    }

  });
};

/**
 * List Pages
 *
 * Pages listing request, typically called
 * from the prompt to query and explore pages.
 */
export async function list <T extends { pages: Requests.Page[] }> (store: Store) {

  return axios.get<T>('pages.json', store.client).then(({ data }) => {

    return data.pages;

  }).catch((e: AxiosError) => {

    if (requeue(e.response.status)) {
      queue.add(() => list(store));
    } else {
      console.error(e);
    }

  });

};

/**
 * Find Page
 *
 * Finds a Page via handle, title or both. Walks through fields returning either an
 * object or array. If no match is found then `undefined` is returned
 */
export async function find <T extends Requests.Page> (store: Store, page?: T): Promise<Requests.Page> {

  if (allFalse(has('handle', page), has('title', page))) {
    console.log('invalid fields');
    return undefined;
  }

  return axios.get<{ pages: T[] }>('pages.json', store.client).then(({ data }) => {

    if (has('handle', page) && has('title', page)) {

      return data.pages.find(p => (page.title === p.title && page.handle === p.handle));

    } else if (has('handle', page)) {

      return data.pages.find(p => (page.handle === p.handle));

    } else if (has('title', page)) {

      return data.pages.find(p => (page.title === p.title));

    } else {

      return undefined;

    }

  }).catch(e => {

    console.log(e);

    return undefined;

  });

};

/**
 * Create Page
 *
 * Creates a new page in the online store
 */
export async function create <T extends Requests.Page> (store: Store, page: T): Promise<T> {

  if (!$.mode.upload) timer.start();

  const promise = await axios.post<{ page: T }>('/pages.json', { page }, store.client).then(({ data }) => {

    log.resource('page', store);

    return data.page;

  }).catch(e => {

    // if (!store.queue) return log.err(page.title);

    if (requeue(e.response.status)) {

      queue.add(() => create(store, page));

    } else {

      if (hasPath('response.data', e.response)) {
        error.request(page.title, e.response);
      }
    }

  });

  if (!promise) return undefined;

  await cache.pages(store.domain, promise);

  return promise;

};

/**
 * Update Page
 *
 * Updates an existing page using its unique `id`.
 * This is applied only when a metafield reference exists.
 */
export async function sync <T extends Requests.Page> (store: Store, file: File, page?: T): Promise<T> {

  const { mode } = $;

  if (!mode.upload) timer.start();

  const url = `pages/${page.id}.json`;
  const promise = await axios.put<{ page: T}>(url, { page }, store.client).then(({ data }) => {

    if (mode.watch) {

      log.resource('page', store);

    } else if (mode.upload) {

      event.emit('upload', 'uploaded', page, {
        key: file.key,
        namespace: file.namespace,
        fileSize: getSizeStr(page.body_html)
      });

    }

    return data.page;

  }).catch(e => {

    // if (!store.queue) return error(store.store, e.response);

    if (requeue(e.response.status)) {

      queue.add(() => sync(store, file, page));

    } else {

      console.log(e);
    }

  });

  if (!promise) return undefined;

  return promise;

};
