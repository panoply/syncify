import { PartialDeep } from 'type-fest';
import { ICLICommands, IConfig, IOptions } from 'types';
import { join } from 'path';
import { has, includes } from 'rambdax';
import dotenv from 'dotenv';
import { is, isArray, keys } from '../../shared/native';
import { authURL } from 'shared/helpers';

/**
 * Resolve Stores
 *
 * Resolves Shopify stores and themes from the `package.json`
 * file and the `.env` file locations relative to the current
 * working directory.
 */
export async function stores (cli: ICLICommands, config: PartialDeep<IConfig>, defaults: IOptions) {

  const file = dotenv.config({ path: join(config.cwd, '.env') });
  const array = isArray(defaults.stores) ? defaults.stores : [ defaults.stores ];
  const items = array.filter(({ domain }) => includes(domain, cli.store));
  const queue = stores.length > 1;

  for (const store of items) {

    // The myshopify store domain
    const domain = `${store.domain}.myshopify.com`.toLowerCase();

    // Fallback to environment variables if no .env file
    const env = file.error ? process.env : file.parsed;

    // Get authorization url for the store
    const client = authURL(domain, env);

    // Set store endpoints
    config.sync.stores.push({
      store: store.domain,
      domain,
      client,
      queue
    });

    // skip theme reference generation if within these resource based modes
    // we do not need context of themes if such modes were initialized by cli
    if (config.mode.metafields || config.mode.pages) continue;

    // Lets parse the theme target names
    const themes: string[] = has('theme', cli)
      ? cli.theme
      : has(store.domain, cli)
        ? cli[store.domain].split(',')
        : keys(store.themes);

    for (const target of themes) {

      if (!has(target, store.themes)) {
        throw new Error(`Missing theme target "${target}" in ${store.domain} store.`);
      }

      // Let populate the model with theme
      config.sync.themes.push({
        target,
        store: domain,
        id: store.themes[target],
        url: `/themes/${store.themes[target]}/assets.json`
      });
    }
  }

  if (is(config.sync.stores.length, 0)) {
    throw new Error('Unknown, missing or invalid store/theme targets');
  }

  return config;

};
