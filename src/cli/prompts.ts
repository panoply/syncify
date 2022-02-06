import prompts from 'prompts';
import { IConfig } from 'types';
import { toLower } from 'rambdax';
import { toUpcase } from 'config/utils';

import * as metafields from 'requests/metafields';

async function resource (config: IConfig) {

  const prompt = await prompts([
    {
      type: 'select',
      name: 'resource',
      message: 'Resource',
      instructions: false,
      initial: 0,
      choices: [
        {
          title: 'watch',
          description: 'Start watching for changes',
          value: 'watch'
        },
        {
          title: 'download',
          description: 'Download themes from a store',
          value: 'download'
        },
        {
          title: 'upload',
          description: 'Upload theme to a stores',
          value: 'upload'
        },
        {
          title: 'stores',
          description: 'List the defined stores',
          value: 'stores'
        },
        {
          title: 'queries',
          description: 'Query store data and information',
          value: 'query'
        }
      ]
    },
    {
      name: 'stores',
      message: 'Stores',
      instructions: false,
      type: config.resource === 'interactive'
        ? 'select'
        : 'multiselect',
      choices: config.sync.stores.map(
        (
          {
            store,
            domain
          }
        ) => ({
          title: toLower(store),
          value: toLower(store),
          description: domain
        })
      )
    }
  ], {
    onSubmit (prompt, answer) {

      if (prompt.name === 'resource') {

        switch (answer) {
          case 'watch':
          case 'upload':
          case 'download': config.resource = answer; break;
        }

      } else if (prompt.name === 'stores') {

        const { stores } = config.sync;

        if (prompt.type === 'select') {
          config.sync.stores = stores.filter(v => toLower(v.store) === answer);
        } else {
          if (stores.length !== answer.length) {
            config.sync.stores = stores.filter(v => answer.includes(toLower(v.store)));
          }
        }
      }
    }
  });

  switch (prompt.resource) {
    case 'query':
      return query(config, prompt);
    default:
      return themes(config, prompt);
  }

}

async function query (
  config: IConfig,
  options: {
    resource: string,
    stores: string[]
  }
) {

  // eslint-disable-next-line
  const prompt = await prompts([
    {
      type: 'select',
      name: 'endpoint',
      message: 'Endpoint',
      instructions: false,
      initial: 0,
      choices: [
        {
          title: 'metafields',
          description: 'Search the shop metafields',
          value: 'metafields'
        },
        {
          title: 'products',
          description: 'Search products in the shop',
          value: 'products'
        },
        {
          title: 'pages',
          description: 'Search pages in the shop',
          value: 'upload'
        },
        {
          title: 'redirects',
          description: 'Search redirects in the shop',
          value: 'redirects'
        },
        {
          title: 'themes',
          description: 'search themes in the shop',
          value: 'themes'
        }
      ]
    }
  ]);

  const q = await metafields.list(config.sync.stores[0]);

  if (!q) return;

  return await prompts([
    {
      type: 'select',
      name: 'metafields',
      message: 'Metafields',
      instructions: false,
      initial: 0,
      choices: q.map(
        meta => ({
          title: meta.namespace + '.' + meta.key,
          description: 'Metafield id is' + meta.id,
          value: meta.value
        })
      )
    }
  ]);

}

async function themes (
  config: IConfig,
  options: {
    resource: string,
    stores: string[]
  }
) {

  const { assets } = config.sync;
  const prompt = await prompts(options.stores.map(
    (
      store
    ) => ({
      type: 'multiselect',
      name: store,
      message: toUpcase(store) + ' Themes',
      instructions: false,
      choices: assets.filter(v => toLower(v.store) === store).map(
        (
          {
            id,
            target
          }
        ) => ({
          title: target,
          value: target,
          description: 'Theme id is ' + id
        })
      )
    })
  ));

  config.sync.assets = assets.filter(v => prompt[toLower(v.store)].includes(v.target));

  return prompt;

}

/**
 * Target
 */
export async function options (config: IConfig): Promise<any> {

  return resource(config);

}
