import { resolve } from 'path';
import { readJson, pathExistsSync } from 'fs-extra';
import dotenv from 'dotenv';
import { has, hasPath, isType } from 'rambdax';
import { IOptions, IPkgOptions, IConfig } from '../typings';
import * as log from '../logs/console';

/**
 * Read Configuration
 *
 * Acquires the necessary configurations
 * from the workspace. Parses the `package.json`
 * file and the `.env` file, returning the
 * credentials of store connection data.
 */
export async function readConfig (options: IOptions): Promise<Partial<IConfig>> {

  try {

    return parseCommand(options)

  } catch (e) {

    log.error(e);

  }

}

/**
 * Parse Command
 */
function parseCommand (options: IOptions) {

  if (!options.cli) return options;

  if (options._.length === 0) return null;

  if (options._.length === 1) {
    options.resource = options._[0];
  } else if (options._.length > 1) {
    options.resource = options._[0];
    options.store = options._[1];
  }

  if (has('store', options)) {
    options.store = (options.store as string).split(',');
  } else {
    throw new Error('Missing "store" target in command');
  }

  if (options) {
    if (has('theme', options)) {

      options.theme = (options.theme as string).split(',');

      if (options.store.includes('store')) {
        throw new Error('Target name "store" is reserved, use a different name.');
      }

      if (options.store.includes('theme')) {
        throw new Error('Target name, "theme" is reserved, use a different name.');
      }
    }
  }

  return resolvePaths(options);

}

function resolvePaths (options: IOptions) {

  if (has('cwd', options)) options.cwd = process.cwd();

  options.pkg = resolve(options.cwd, 'package.json');
  options.env = resolve(options.cwd, '.env');

  if (pathExistsSync(options.pkg)) {
    if (pathExistsSync(options.env)) return readFiles(options);
    throw new Error('Missing ".env" file');
  }

  throw new Error('Missing "package.json" file');

}

async function readFiles (options: IOptions) {

  const pkg: { syncify?: IPkgOptions } = await readJson(options.pkg);
  const env = dotenv.config({ path: options.env });

  // console.log(pkg);
  if (env.error) throw env.error;

  if (hasPath('syncify.stores', pkg)) {

    if (isType('Array', pkg.syncify.stores)) {
      return getCredentials({
        options,
        files: { pkg: pkg.syncify, env }
      });
    }

    if (isType('Undefined', pkg.syncify.stores)) {
      throw new Error('Missing "stores" option in syncify settings');
    } else {
      throw new Error('The "stores" option must be of type array');
    }
  }

  throw new Error('Your package.json file is missing the "syncify" value.');

}

async function getCredentials (
  config: {
    options: IOptions,
    files: {
      env: dotenv.DotenvConfigOutput,
      pkg: IPkgOptions
    }
  }
) {

  const {
    options,
    files: {
      pkg,
      env: { parsed }
    }
  } = config;

  const state: Partial<IConfig> = {
    dir: pkg.dir,
    resource: options.resource,
    sync: []
  };

  for (const store of pkg.stores) {

    const { domain } = store;

    if (!options.store.includes(domain)) continue;

    if (state.sync.some(i => i.store === domain)) {
      throw new Error(`Multiple store configurations of "${domain}" defined.`);
    }

    const sync: IConfig['sync'][0] = { store: domain, url: null };
    const api_key = `${domain}_api_key`;
    const password = `${domain}_password`;

    if (has(api_key, parsed) || has(api_key.toUpperCase(), parsed)) {
      if (has(password, parsed) || has(password.toUpperCase(), parsed)) {
        sync.url = `https://${parsed[api_key]}:${parsed[password]}@${domain}.myshopify.com`;
      } else {
        throw new Error(`Missing "${password}" credential in .env file`);
      }
    } else {
      throw new Error(`Missing "${api_key}" credential in .env file`);
    }

    if (options.store.includes(domain)) {

      if (has('theme', options)) {

        sync.themes = [];

        for (const target of options.theme) {
          if (has(target, store.themes)) {
            sync.themes.push({ id: store.themes[target], target });
          } else {
            throw new Error(`Missing theme target "${target}" in ${domain} store.`);
          }
        }

      } else if (has(domain, options)) {

        sync.themes = [];

        const targets = options[domain].split(',');

        for (const target of targets) {
          if (has(target, store.themes)) {
            sync.themes.push({ id: store.themes[target], target });
          } else {
            throw new Error(`Missing theme target "${target}" in ${domain} store.`);
          }
        }

      }
    }

    if (isType('String', sync.url)) {
      if (sync.themes.length > 0) {

        sync.request = {
          inFlight: 0,
          isProcessing: false,
          max: 20,
          rate: 0,
          requests: []
        };

        state.sync.push(sync);

      } else {
        throw new Error(`Missing theme target in "${domain}" store.`);
      }
    }
  }

  if (state.sync.length === 0) throw new Error('Unknown or invalid store/theme targets');

  return state;

}
