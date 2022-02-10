import { PartialDeep } from 'type-fest';
import { resolve, join } from 'path';
import { hasPath, isNil, has, includes } from 'rambdax';
import { readJson, pathExistsSync, mkdir } from 'fs-extra';
import { is, isArray, keys } from 'shared/native';
import { create, log } from 'cli/console';
import * as transforms from 'config/transforms';
import { ICLIOptions, IConfig, IPackage, IStore } from 'types';
import { Model } from 'config/model';
import dotenv from 'dotenv';

/**
 * Store Authorization URL
 *
 * Generate the the authorization URL to
 * be used for requests.
 */
function getURL (domain: string, env: object): { token: string; base: string; } {

  let api_token = domain + '_api_token';

  if (has(api_token, env)) {
    return {
      token: env[api_token],
      base: `https://${domain}.myshopify.com`
    };
  }

  api_token = api_token.toUpperCase();

  if (has(api_token, env)) {
    return {
      token: env[api_token],
      base: `https://${domain}.myshopify.com`
    };
  }

  api_token = undefined;

  let api_key = domain + '_api_key';
  let api_secret = domain + '_api_secret';

  if (!has(api_key, env)) api_key = api_key.toUpperCase();
  if (!has(api_secret, env)) api_secret = api_secret.toUpperCase();
  if (has(api_key, env) && has(api_secret, env)) {
    return {
      token: null,
      base: `https://${env[api_key]}:${env[api_secret]}@${domain}.myshopify.com`
    };
  }

  throw new Error(`Missing "${domain}" credentials`);

};

/**
 * Resolve Stores
 *
 * Resolves Shopify stores and themes from the `package.json`
 * file and the `.env` file locations relative to the current
 * working directory.
 */
function shops (config: PartialDeep<IConfig>, cli: ICLIOptions, pkg: IPackage) {

  const file = dotenv.config({ path: join(config.cwd, '.env') });

  if (config.mode.build || config.mode.clean) {
    return transforms.paths.call(pkg, config);
  }

  const stores = pkg.syncify.stores.filter(({ domain }) => includes(domain, cli.store));

  for (const field of stores) {

    const store: PartialDeep<IStore> = {};

    // Upcase the store name for logs, eg: sissel > Sissel
    store.store = field.domain;

    // The myshopify store domain
    store.domain = `${store.store}.myshopify.com`.toLowerCase();

    // Fallback to environment variables if no .env file
    const env = file.error ? process.env : file.parsed;

    // Get authorization url for the store
    const { base, token } = getURL(field.domain, env);

    // Set token (if defined)
    store.token = token;

    // Set URLs
    store.url = {
      themes: `${base}/admin/themes.json`,
      redirects: `${base}/admin/redirects.json`,
      metafields: `${base}/admin/metafields.json`,
      pages: `${base}/admin/pages.json`
    };

    if (isNil(token)) store.token = token;

    // Set store endpoints
    config.sync.stores.push(store);

    const themes = has('theme', cli)
      ? cli.theme
      : has(field.domain, cli)
        ? cli[field.domain].split(',')
        : keys(field.themes);

    for (const target of themes) {

      if (!has(target, field.themes)) {
        log.throw(`Missing theme target "${target}" in ${field.domain} store.`);
      }

      config.sync.themes.push({
        target,
        store: store.store,
        token: store.token,
        domain: store.domain,
        id: field.themes[target],
        url: `${base}/admin/themes/${field.themes[target]}/assets.json`
      });
    }
  }

  if (is(config.sync.stores.length, 0)) {
    log.throw('Unknown, missing or invalid store/theme targets');
  }

  return transforms.paths.call(pkg, config);

};

function dirs (config: PartialDeep<IConfig>, cli: ICLIOptions, pkg: IPackage) {

  if (!has('dirs', pkg.syncify)) return shops(config, cli, pkg); ;

  for (const dir in pkg.syncify.dirs) {

    let path: string = pkg.syncify.dirs[dir];

    // path directory starts with . character
    if (is(path.charCodeAt(0), 46)) {

      // path directory next character is not forard slash
      // for example, ".folder" this will be invalid
      if (is(path.charCodeAt(1), 47)) {
        path = path.slice(1);
      } else {
        log.throw('Directory path is invalid at: "' + path + '"');
      }
    }

    // path directory starts with / character
    if (is(path.charCodeAt(0), 47)) path = path.slice(1);

    // path directory is valid, eg: path
    // dirs cannot reference sub directorys, eg: path/sub
    if (/^[a-zA-Z0-9_-]+/.test(path)) {
      config[dir] = pkg.syncify.dirs[dir];
    } else {
      log.throw('Directory path is invalid at: "' + path + '"');
    }
  }

  return shops(config, cli, pkg);

};

async function caches (config: PartialDeep<IConfig>, cli: ICLIOptions, pkg: IPackage) {

  const cache = join(cli.cwd, 'node_modules/.cache');

  if (!pathExistsSync(cache)) {
    try {
      await mkdir(cache);
    } catch (e) {
      log.throw('Failed to create a ".cache" directory');
    }
  }

  if (!pathExistsSync(config.cache)) {
    try {
      await mkdir(config.cache);
    } catch (e) {
      log.throw('Failed to create a ".cache/syncify" directory.');
    }
  }

  if (!pathExistsSync(config.output)) {
    try {
      await mkdir(config.output);
    } catch (e) {
      log.throw('Failed to create a "output" directory "' + config.output + '"');
    }
  }

  return dirs(config, cli, pkg);

};

/**
 * Set Base defaults
 *
 * Utility function for normalizing dirs paths configuration.
 * This resolve the directory paths, and attempt to correct them
 * if they are misconfigured.
 */
async function runtime (cli: ICLIOptions, pkg: IPackage) {

  const config = new Model(cli);

  console.log(config);

  /* if (
    (
      !config.mode.clean &&
      !config.mode.build
    ) && (
      isEmpty(cli.store) ||
      config.mode.vsc ||
      config.mode.help
    )
  ) return config; */

  config.resource = config.mode.watch
    ? 'watch'
    : config.mode.build
      ? 'build'
      : null;

  if (!isNil(config.resource)) config.spawns = pkg.syncify.spawn[config.resource];

  // env variables
  process.env.SYNCIFY_ENV = config.env;
  process.env.SYNCIFY_WATCH = String(config.mode.watch);

  await create(config as any);

  return caches(config, cli, pkg);

};

/**
 * Read Package Configuration
 *
 * Read the `package.json` file and extract
 * the `syncify` defined settings.
 */
async function readPackage (options: ICLIOptions) {

  const pkg: IPackage = await readJson(options.pkg);

  if (hasPath('syncify.stores', pkg)) {
    if (isArray(pkg.syncify.stores)) {
      return runtime(options, pkg);
    } else {
      throw new Error('The "stores" option must be of type array');
    }
  }

  throw new Error('Your package.json file is missing the "syncify" value.');

};

/**
 * Resolve Paths
 *
 * Resolves `package.json` file and the `.env`
 * file locations relative to the current working
 * directory.
 */
function getPackage (options: ICLIOptions) {

  if (has('cwd', options)) options.cwd = process.cwd();

  options.pkg = resolve(options.cwd, 'package.json');

  if (pathExistsSync(options.pkg)) return readPackage(options);

  throw new Error('Missing "package.json" file');

};

/**
 * Parse Command
 *
 * Determines what commands were passed via the
 * CLI and constructs a workable configuration.
 */
function command (options: ICLIOptions) {

  if (is(options._.length, 0)) {
    options.prompt = true;
    return getPackage(options);
  }

  options.store = options._[0].split(',');

  if (has('theme', options)) {
    options.theme = (options.theme as any).split(',');
  }

  if (has('theme', options)) {
    if (options.store.includes('store')) {
      throw new Error('Theme name "store" is reserved, use a different name.');
    }
    if (options.store.includes('theme')) {
      throw new Error('Theme name, "theme" is reserved, use a different name.');
    }
    if (options.store.includes('vsc')) {
      throw new Error('Theme name, "vsc" is reserved, use a different name.');
    }
  }

  if (has('cwd', options)) options.cwd = process.cwd();

  options.pkg = resolve(options.cwd, 'package.json');

  if (pathExistsSync(options.pkg)) {
    return readPackage(options);
  }

  throw new Error('Missing "package.json" file');

};

/* -------------------------------------------- */
/* EXPORTED METHOD                              */
/* -------------------------------------------- */

/**
 * Read Configuration
 *
 * Acquires the necessary configurations
 * from the workspace. Parses the `package.json`
 * file and the `.env` file, returning the
 * credentials of store connection data.
 */
export async function readConfig (options: ICLIOptions) {

  if (!options.cli) return options as any as IConfig;

  return command(options) as unknown as IConfig;

};
