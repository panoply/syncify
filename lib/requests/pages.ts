import { AxiosError } from 'axios';
import { allFalse, has, hasPath, isNil } from 'rambdax';
import { Pages, Store, Requests, File } from 'types';
import { join } from 'path';
import prompts from 'prompts';
import Spinner from 'tiny-spinner';
import Turndown from 'turndown';
import markdown from 'markdown-it';
import * as timer from '~utils/timer';
import * as cache from '~process/caches';
import mergerino from 'mergerino';
import { pathExistsSync, stat, writeFile } from 'fs-extra';
import { assign } from '../utils/native';
import { queue, axios, requeue } from '../requests/queue';
import { log, c, error, tui } from '~log';
import { $ } from '~state';
import { event, getSizeStr } from '~utils/utils';

/**
 * Merge Pages
 *
 * Merges remote pages with the local references.
 * Performs a last-updated check to determine which
 * metafield to be updated.
 */
export async function merge (store: Store): Promise<{
  title: string;
  data: object;
  path: string;
}[]> {

  const md = markdown();
  const spins = new Spinner();
  spins.start(`Fetching pages from ${store.domain}`);
  const fields = await list(store).catch(e => spins.error(e));

  if (!fields) return;

  const choices: prompts.Choice[] = [];

  for (const prop of fields) {

    const name = prop.handle;
    const file = join($.dirs.metafields.metafields, prop.handle);

    let isMD = true;
    let ext = '.md';
    let path = join(file, ext);

    if (!pathExistsSync(path)) {
      ext = '.html';
      path = join(file, ext);
      isMD = false;
    }

    if (!config.paths.pages(path)) continue;

    const local = join(config.cwd, path);
    const updated = new Date(prop.updated_at);
    const stats = await stat(local);

    if (Math.floor(updated.getTime()) > Math.ceil(stats.mtimeMs)) {

      const string = isMD ? md.render(prop.body_html) : prop.body_html;
      const title = name + ext;
      const data = stringify(string, {
        title: prop.title,
        template_suffix: prop.template_suffix,
        author: prop.author
      });

      choices.push(
        {
          title,
          description: `Remote version modified on ${prop.updated_at}`,
          value: {
            title,
            data,
            path: local
          }
        }
      );
    }
  }

  if (choices.length === 0) {
    spins.stop(c.gray(`${c.green.bold('✔')} Pages are aligned, no merges required`));
    process.exit();
  }

  spins.stop(c.bold(`${c.green.bold('✔')} Found ${c.cyan(String(choices.length))} modified pages`));

  const { update } = await prompts([
    {
      type: 'multiselect',
      name: 'update',
      message: 'The following pages can be merged',
      instructions: false,
      initial: 0,
      choices
    }
  ]);

  return update;

};

/**
 * Pull Pages
 *
 * Downloads pages from a remote shop origin.
 * Presents a prompt list of shop global fields
 * to be written to source paths.
 */
export async function pull (store: IStore, config: IConfig) {

  const md = markdown();
  const spins = new Spinner();
  spins.start('Fetching pages from ' + store.domain);
  const choices = await list(store).catch(e => spins.error(e));

  if (!choices) return;

  spins.stop(c.bold(`${c.green.bold('✔')} Returned ${c.cyan(String(choices.length))} pages`));

  const fetched = await prompts([
    {
      type: 'confirm',
      name: 'markdown',
      message: 'Convert to markdown?',
      initial: true
    },
    {
      type: 'multiselect',
      name: 'pages',
      message: 'Choose Pages',
      instructions: false,
      initial: 0,
      choices: choices.map(
        page => ({
          title: page.title,
          description: `Template suffix is ${page.template_suffix}`,
          value: page
        })
      )
    }
  ]);

  for (const page of fetched.pages) {

    const path = join(config.cwd, config.pages);

    let string = page.body_html;
    let title = page.handle + '.html';

    if (fetched.markdown) {
      string = md(page.body_html);
      title = page.handle + '.md';
    }

    const data = stringify(string, {
      title: page.title,
      handle: page.handle,
      template_suffix: page.template_suffix,
      author: page.author
    });

    await writeFile(join(path, title), data);

  }

};

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

    if (!store.queue) return error(store.store, e.response);

    if (requeue(e.response.status)) {
      queue.add(() => get(store, id));
    } else {
      return error(store.store, e.response);
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

    if (!store.queue) return error(store.store, e.response);

    if (requeue(e.response.status)) {
      queue.add(() => remove(store, id));
    } else {
      return error(store.store, e.response);
    }

  });
};

/**
 * List Pages
 *
 * Pages listing request, typically called
 * from the prompt to query and explore pages.
 */
export async function list <T extends { pages: Requests.Page<'get'>[] }> (store: Store) {

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
