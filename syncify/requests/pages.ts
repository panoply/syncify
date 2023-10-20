import type { Store, File, Resource } from 'types';
import type { AxiosError } from 'axios';
import { allFalse, has, hasPath } from 'rambdax';
import { queue, requeue } from 'syncify:requests/queue';
import axios from 'axios';
import { event, getSizeStr } from 'syncify:utils';
import { timer } from 'syncify:timer';
import { setPageCache } from 'syncify:process/cache';
import * as log from 'syncify:log';
import * as error from 'syncify:errors';
import { $ } from 'syncify:state';
/**
 * Get Page
 *
 * Returns a page by id reference. We keep a cache
 * map reference of page IDs in the `node_modules/.syncify/pages.map` file.
 */
export async function get (store: Store, id?: number): Promise<Resource.Page> {

  return axios.get(`pages/${id}.json`, store.client).then(({ data }) => {

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
 * Delete Page
 *
 * Deletes a page from store. Returns a boolean `true` if deletion was successful
 */
export async function remove (store: Store, id?: number): Promise<boolean> {

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
 * Pages listing request, typically called from the prompt to query and explore pages.
 */
export async function list <T extends Resource.Page[]> (store: Store): Promise<T> {

  return axios.get<{ pages: T }>('pages.json', store.client).then(({ data }) => {

    return data.pages;

  }).catch((e: AxiosError) => {

    return error.request(store.store, e.response);

  });

};

/**
 * Find Page
 *
 * Finds a Page via handle, title or both. Walks through fields returning either an
 * object or array. If no match is found then `undefined` is returned
 */
export async function find <T extends Resource.Page> (store: Store, page?: T): Promise<T> {

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
export async function create <T extends Resource.Page> (store: Store, page: T): Promise<T> {

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

  setPageCache(store.domain, promise);

  return promise;

};

/**
 * Update Page
 *
 * Updates an existing page using its unique `id`.
 * This is applied only when a metafield reference exists.
 */
export async function sync <T extends Resource.Page> (store: Store, file: File, page?: T): Promise<T> {

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
