import { allFalse, has, isNil } from 'rambdax';
import { IConfig, IMetafield, IStore, IPage } from 'types';
import { join } from 'path';
import prompts from 'prompts';
import Spinner from 'tiny-spinner';
import { stringify } from 'gray-matter';
import { error } from 'cli/errors';
import { pathExistsSync, stat, writeFile } from 'fs-extra';
import { assign, is } from 'shared/native';
import { queue, axios, requeue } from 'requests/queue';
import { AxiosError } from 'axios';
import * as c from 'cli/colors';
import Turndown from 'turndown';
import { gfm } from 'joplin-turndown-plugin-gfm';

function markdown (options: Turndown.Options = {}) {

  const md = new Turndown(options);

  md.use(gfm);
  md.addRule('codeblock', {
    filter: [
      'pre',
      'code'
    ],
    replacement (content, rule) {

      if (rule.nodeName === 'PRE') {

        const langName = rule.firstElementChild.className.match(/(?<=language-)(.*)/);
        const language = (isNil(langName) ? '' : langName[0]) + '\n';

        return '```' + language + content + '```' + '\n';

      }

      return content;

    }
  });

  return (content: string) => md.turndown(content);

}

/**
 * Merge Pages
 *
 * Merges remote pages with the local references.
 * Performs a last-updated check to determine which
 * metafield to be updated.
 */
export async function merge (store: IStore, config: IConfig): Promise<{
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
    const file = join(config.metafields, prop.handle);

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

      const string = isMD ? md(prop.body_html) : prop.body_html;
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

  if (is(choices.length, 0)) {
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
 * List Pages
 *
 * Pages listing request, typically called
 * from the prompt to query and explore pages.
 */
export async function list <T extends { pages: IPage[] }> (store: IStore) {

  return axios.get<T>('pages.json', store.client).then(({ data }) => {

    return data.pages;

  }).catch((e: AxiosError) => {

    if (requeue(e.response.status)) {
      queue.add(() => list(store));
    } else {
      return error(store.store, e.response);
    }

  });

};

/**
 * Get Page
 *
 * Returns a page by id reference. We keep a cache
 * map reference of page IDs in the `node_modules/.syncify/pages.map` file.
 */
export async function get <T extends { page: IPage[] }> (store: IStore, id?: number) {

  if (is(arguments.length, 1)) return (_id: number) => get(store, _id);

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
export async function remove <T extends { pages: IMetafield[] }> (store: IStore, id?: number) {

  if (is(arguments.length, 1)) return (_id: number) => remove(store, _id);

  return axios.delete<T>(`pages/${id}.json`, store.client).then(() => {

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
 * Find Page
 *
 * Finds a Page via handle, title or both.
 * Walks through fields returning either an object or array.
 * If no match is found then `undefined` is returned
 */
export async function find <T extends IPage> (store: IStore, page?: IPage) {

  if (is(arguments.length, 1)) return (_page: IPage) => find(store, _page);

  if (allFalse(has('handle', page), has('title', page))) {
    console.log('invalid fields');
    return undefined;
  }

  return axios.get<{ pages: T[] }>('pages.json', store.client).then(({ data }) => {

    return data.pages.find(p => (page.title === p.title && page.handle === p.handle));

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
export async function create <T extends IPage> (store: IStore, page?: T) {

  if (is(arguments.length, 1)) return (_page: IPage) => create(store, _page);

  return axios.post<{ page: T }>('pages.json', { page }).then(({ data }) => {

    console.log('created');

    return data.page;

  }).catch(e => {

    if (!store.queue) return error(page.title, e.response);

    if (requeue(e.response.status)) {
      queue.add(() => create(store, page));
      return undefined;
    } else {
      return error(store.store, e.response);
    }

  });

};

/**
 * Update Page
 *
 * Updates an existing page using its unique `id`.
 * This is applied only when a metafield reference exists.
 */
export async function update <T extends IPage> (store: IStore, id?: number, page?: T) {

  if (is(arguments.length, 1)) return (_id: number, _page: IPage) => update(store, _id, _page);

  return axios.put<{ page: T }>(`pages/${id}.json`, { page }, store.client).then(({ data }) => {

    console.log('created');
    return data.page;

  }).catch(e => {

    if (!store.queue) return error(store.store, e.response);

    if (requeue(e.response.status)) {
      queue.add(() => update(store, id, page));
    } else {
      return error(store.store, e.response);
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
export function client (store: IStore) {

  return {
    sync: sync.apply(null, store),
    list: list.apply(null, store),
    get: get.apply(null, store),
    find: find.apply(null, store),
    create: create.apply(null, store),
    update: update.apply(null, store),
    delete: remove.apply(null, store),
    merge: merge,
    pull: pull
  };

};

/**
 * Metafields
 *
 * Metafield handler function. This is used in the
 * resource modes and will query, create or update
 * metafields.
 */
export async function sync (store: IStore, field?: IMetafield) {

  if (is(arguments.length, 1)) return (_field: IMetafield) => sync(store, _field);

  const data = await find(store, field);

  if (!data) return create(store, field);

  return update(store, data.id, assign(field, { id: data.id, type: 'json' })).catch(e => {

    if (!store.queue) return error(field.namespace, e.response);

    if (requeue(e.response.status)) {
      queue.add(() => sync(store, field));
    } else {
      return error(store.store, e.response);
    }
  });

};
