import { allFalse, mapFastAsync } from 'rambdax';
import { IStore, IConfig } from 'types';
import { join } from 'path';
import { is, isObject } from 'shared/native';
import prompts from 'prompts';
import { list } from 'requests/metafields';
import Spinner from 'tiny-spinner';
import { mkdir, pathExistsSync, readJson, stat, writeJson } from 'fs-extra';
import * as log from 'cli/logs';
import * as c from 'cli/colors';

const write = (config: IConfig) => async (field: {
  dir: string;
  key: string;
  data: object;
  name: string;
}) => {

  const path = join(config.cwd, config.metafields, field.dir);

  if (!pathExistsSync(path)) await mkdir(path);

  await writeJson(join(path, field.name), field.data, { spaces: config.transform.json.spaces });

  return join(config.metafields, field.dir, field.name);

};

const pull = async (store: IStore, config: IConfig) => {

  const spins = new Spinner();
  spins.start('Fetching Metafields from ' + store.domain);
  const choices = await list(store).catch(e => spins.error(e));

  if (!choices) return;

  spins.stop(c.bold(`${c.green.bold('✔')} Returned ${c.cyan(String(choices.length))} metafields`));

  const download = await prompts([
    {
      type: 'multiselect',
      name: 'metafields',
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
            name: meta.key.endsWith('.json')
              ? meta.key
              : `${meta.key}.json`
          }
        })
      )
    }
  ]);

  const path = await mapFastAsync(write(config), download.metafields);

  path.forEach(p => console.log(p));

};

const merge = async (store: IStore, config: IConfig) => {

  const spins = new Spinner();
  spins.start('Fetching Metafields from ' + store.domain);
  const choices = await list(store).catch(e => spins.error(e));

  if (!choices) return;

  const update = choices.map(meta => {

    const name = meta.key.endsWith('.json') ? meta.key : `${meta.key}.json`;
    const path = join(config.metafields, meta.namespace, name);

    if (config.paths.metafields(path)) {
      return {
        path: join(config.cwd, path),
        lastUpdate: new Date(meta.updated_at)
      };
    }

    return false;

  });

  spins.stop(c.bold(`${c.green.bold('✔')} Returned ${c.cyan(String(choices.length))} metafields`));

  for (const p of update) {

    if (isObject(p)) {

      const updated = await stat(p.path as string);
      const timestamp = new Date(updated.mtime);

      console.log(p.path, timestamp.getTime() > p.lastUpdate.getTime());

    }
  }

};

/**
 * Pull Metafield
 *
 * Downloads metafields from store using a command
 * prompt interface
 */
export const metafields = async (config: IConfig) => {

  if (!is(config.sync.stores.length, 1)) {

    throw console.error('Metafields can only query 1 store');

  }

  const [ store ] = config.sync.stores;
  const action = allFalse(config.mode.pull, config.mode.merge) ? await prompts([
    {
      type: 'select',
      name: 'resource',
      message: 'Select Resource',
      instructions: false,
      initial: 0,
      choices: [
        {
          title: 'Pull',
          description: 'Download metafields from ' + store.domain,
          value: 'p'
        },
        {
          title: 'Merge',
          description: 'Merge remote metafields with local records',
          value: 'm'
        },
        {
          title: 'Check',
          description: 'Check if local metafields are aligned',
          value: 'c'
        },
        {
          title: 'Query',
          description: 'Browse and search metafields in ' + store.domain,
          value: 'q'
        }
      ]
    }
  ]) : {
    resource: config.mode.pull ? 'p' : 'm'
  };

  if (action.resource === 'p') {
    return pull(store, config);
  } else if (action.resource === 'm') {
    return merge(store, config);
  }

};
