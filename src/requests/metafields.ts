import { allFalse, has } from 'rambdax';
import { AxiosError } from 'axios';
import { stat, writeJson, mkdir, pathExists } from 'fs-extra';
import { Bundle, Config, Store, Requests } from '../../types';
import { join } from 'path';
import prompts from 'prompts';
import Spinner from 'tiny-spinner';
import { error } from '../logger/errors';
import { assign, is } from '../shared/native';
import { queue, axios, requeue } from '../requests/queue';
import { log, c } from '../logger';
import { bundle } from '../config';

/**
 * Write Metafields
 *
 * Creates JSON metafield fields and namespace directories.
 * Executed on `--pull` and `--merge`
 */
function write (config: Config) {

  const base = join(bundle.cwd, config.metafields);
  const { indent } = bundle.json;

  return async (field: { dir: string; key: string; data: object; name: string; }) => {

    const path = join(base, field.dir);
    const mdir = await pathExists(path);
    const file = join(path, field.name);

    if (!mdir) await mkdir(path);

    await writeJson(file, field.data, { spaces: indent });

    return join(config.metafields, field.dir, field.name);

  };
}

/**
 * Merge Metafields
 *
 * Merges remote metafields with the local references.
 * Performs a last-updated check to determine which
 * metafield to be updated.
 */
export async function merge (store: Store, config: Bundle): Promise<{
  title: string;
  data: object;
  path: string;
}[]> {

  const spins = new Spinner();
  spins.start(`Fetching metafields from ${store.domain}`);
  const fields = await list(store).catch(e => spins.error(e));

  if (!fields) return;

  const choices: prompts.Choice[] = [];
  const json = write(config);

  for (const prop of fields) {

    const name = prop.key.endsWith('.json') ? prop.key : `${prop.key}.json`;
    const path = join(config.dirs.metafields, prop.namespace, name);

    if (!config.paths.metafields(path)) continue;

    const local = join(config.cwd, path);
    const updated = new Date(prop.updated_at);
    const stats = await stat(local);

    if (Math.floor(updated.getTime()) > Math.ceil(stats.mtimeMs)) {

      const title = `${prop.namespace}/${name}`;

      choices.push(
        {
          title,
          description: `Remote version modified on ${prop.updated_at}`,
          value: {
            title,
            data: prop.value,
            path: local
          }
        }
      );
    }
  }

  if (is(choices.length, 0)) {
    spins.stop(c.gray(`${c.green.bold('✔')} Metafields are aligned, no merges required`));
    process.exit();
  }

  spins.stop(c.bold(`${c.green.bold('✔')} Found ${c.cyan(String(choices.length))} modified metafields`));

  const { update } = await prompts([
    {
      type: 'multiselect',
      name: 'update',
      message: 'The following metafields can be merged',
      instructions: false,
      initial: 0,
      choices
    }
  ]);

  for (const field of update) await json(field);

  return update;

};

/**
 * Pull Metafields
 *
 * Downloads metafields from a remote shop origin.
 * Presents a prompt list of shop global fields
 * to be written to source paths.
 */
export async function pull (store: Store, config: Config) {

  const spins = new Spinner();
  spins.start('Fetching Metafields from ' + store.domain);
  const choices = await list(store).catch(e => spins.error(e));
  const json = write(config);

  if (!choices) return;

  spins.stop(c.bold(`${c.green.bold('✔')} Returned ${c.cyan(String(choices.length))} metafields`));

  const { fields } = await prompts([
    {
      type: 'multiselect',
      name: 'fields',
      message: 'Choose Metafields',
      instructions: false,
      initial: 0,
      choices: choices.map(
        meta => ({
          title: `${meta.namespace}.${meta.key}`,
          description: `Metafield id is ${meta.id}`,
          value: {
            dir: meta.namespace,
            key: meta.key,
            data: JSON.parse(meta.value),
            name: meta.key.endsWith('.json') ? meta.key : `${meta.key}.json`
          }
        })
      )
    }
  ]);

  for (const field of fields) await json(field);

};

/**
 * List Metafields
 *
 * Metafields listing request, typically called
 * from the prompt to query and explore metafields.
 */
export async function list <T extends { metafields: Requests.Metafield[] }> (store: Store) {

  return axios.get<T>('metafields.json', store.client).then(({ data }) => {

    return data.metafields;

  }).catch((e: AxiosError) => {

    if (requeue(e.response.status)) {
      queue.add(() => list(store));
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
export async function get <T extends { metafields: Requests.Metafield[] }> (store: Store, id?: number) {

  if (is(arguments.length, 1)) return (_id: number) => get(store, _id);

  return axios.get<T>(`metafields/${id}.json`, store.client).then(({ data }) => {

    return data.metafields;

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
export async function remove <T extends { metafields: Requests.IMetafield[] }> (store: Store, id?: number) {

  if (is(arguments.length, 1)) return (_id: number) => remove(store, _id);

  return axios.delete<T>(`metafields/${id}.json`, store.client).then(() => {

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
 * Find Metafield
 *
 * Finds a metafield via namespace, key name or both.
 * Walks through fields returning either an object or array.
 * If no match is found then `undefined` is returned
 */
export async function find <T extends Requests.IMetafield> (store: Store, field?: Requests.IMetafield) {

  if (is(arguments.length, 1)) return (_field: Requests.IMetafield) => find(store, _field);

  if (allFalse(has('namespace', field), has('key', field))) {
    log.error('invalid fields');
    return undefined;
  }

  return axios.get<{ metafields: T[] }>('metafields.json', store.client).then(({ data }) => {

    return data.metafields.find(m => (field.namespace === m.namespace && field.key === m.key));

  }).catch(e => {

    console.log(e);

    return undefined;

  });

};

/**
 * Create Metafield
 *
 * Creates a new metafield on the global
 * shop. This is called when a metafield does
 * not exists.
 */
export async function create <T extends Requests.Metafield> (store: Store, metafield?: T) {

  if (is(arguments.length, 1)) return (_metafield: Requests.Metafield) => create(store, _metafield);

  metafield.type = 'json';
  metafield.namespace = 'email';
  metafield.value_type = 'json_string';
  metafield.key = 'eng';

  return axios.post<{ metafield: T }>('metafields.json', { metafield }, store.client).then(({ data }) => {

    console.log('created', data);

    return data.metafield;

  }).catch(e => {

    console.log(e);
    if (!store.queue) return error(metafield.namespace, e.response);

    if (requeue(e.response.status)) {
      queue.add(() => create(store, metafield));
      return undefined;
    } else {
      return error(store.store, e.response);
    }

  });

};

/**
 * Update Metafield
 *
 * Updates an existing metafield using its unique `id`.
 * This is applied only when a metafield reference exists.
 */
export async function update <T extends Requests.Metafield> (store: Store, id?: number, metafield?: T) {

  if (is(arguments.length, 1)) return (_id: number, _field: Requests.Metafield) => update(store, _id, _field);

  return axios.put<{ metafield: T }>(`metafields/${id}.json`, { metafield }, store.client).then(d => {

    console.log('created');
    return d.data.metafield;

  }).catch(e => {

    if (!store.queue) return error(metafield.namespace, e.response);

    if (requeue(e.response.status)) {
      queue.add(() => update(store, id, metafield));
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
export async function sync (store: Store, field?: Requests.Metafield) {

  if (is(arguments.length, 1)) return (_field: Requests.Metafield) => sync(store, _field);

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

/**
 * Metafields
 *
 * Metafield handler function. This is used in the
 * resource modes and will query, create or update
 * metafields.
 */
export function client (store: Store) {

  return {
    sync: sync.apply(null, store),
    list: list.apply(null, store),
    get: get.apply(null, store),
    find: find.apply(null, store),
    create: create.apply(null, store),
    update: update.apply(null, store),
    delete: remove.apply(null, store),
    pull,
    merge
  };

};
