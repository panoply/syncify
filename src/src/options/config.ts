import { PartialDeep } from 'type-fest';
import { join } from 'path';
import { hasPath, isNil, has, includes, allFalse, anyTrue } from 'rambdax';
import { readJson, pathExistsSync, mkdir, pathExists, writeJson } from 'fs-extra';
import { is, isArray, isObject, keys } from 'shared/native';
import { create, log } from '../cli/stdout';
import * as transform from './transforms';
import { ICache, ICLICommands, IOptions, IPackage, IStore, IThemes } from 'types';
import { Model } from './model';
import dotenv from 'dotenv';
import { AxiosRequestConfig } from 'axios';
import { readConfig } from '@web/config-loader';

/* -------------------------------------------- */
/* EXPORTED METHOD                              */
/* -------------------------------------------- */

/**
 * Read Command
 *
 * Acquires the necessary configurations
 * from the workspace. Parses the `package.json`
 * file and the `.env` file, returning the
 * credentials of store connection data.
 */
export async function readCommand (options: ICLICommands) {

  const mode = allFalse(
    options.build,
    options.clean,
    options.download,
    options.upload,
    options.vsc,
    options.watch,
    options.metafields,
    options.redirects,
    options.pages
  );

  try {

    if (options._.length === 0) return pipe(options);

    options.store = options._[0].split(',');

    // build is the default command
    if (mode) options.build = true;

    // If we have a theme reference in command
    if (has('theme', options)) {
      options.theme = (options.theme as any).split(',');
    }

    return pipe(options);

  } catch (e) {

    throw new Error(e);

  }

};

async function pipe (options: ICLICommands) {

  const presets = await getPackage(options);

  return transform.paths.call(presets.pkg, presets.config);

  // transform.paths.call(
}

/**
 * Resolve Paths
 *
 * Resolves `package.json` file and the `.env`
 * file locations relative to the current working
 * directory.
 */
async function getPackage (options: ICLICommands) {

  // Ensure we have CWD in command presets
  if (!has('cwd', options)) options.cwd = process.cwd();

  // Save path reference of package
  options.pkg = join(options.cwd, 'package.json');

  if (!pathExists(options.pkg)) throw new Error('Missing "package.json" file');

  const pkg: IPackage = await readJson(options.pkg);

  // No syncify property in package.json
  // We will look first look for a syncify.json file
  // If that fails we look for syncify.config javascript file
  if (!has('syncify', pkg)) {

    const uri = join(options.cwd, 'syncify.json');
    const path = await pathExists(uri);

    if (path) {
      pkg.syncify = await readJson(uri);
    } else {

      const uri = options.config === '.'
        ? 'syncify.config'
        : join(options.config, 'syncify.config');

      pkg.syncify = await readConfig(uri);

    }

  }

  if (hasPath<IOptions>('syncify.stores', pkg)) {

    // Convert to an array type if object was provided for stores
    if (isObject(pkg.syncify.stores)) {
      if (!isArray(pkg.syncify.stores)) {
        pkg.syncify.stores = [ pkg.syncify.stores ];
      } else {
        throw new Error('The "stores" option must be of type array or object');
      }
    }

    // Ensure we have an object stores configuration and pass to runtime
    if (isArray(pkg.syncify.stores)) return runtime(options, pkg);

  }

  throw new Error('Missing configuration or invalid properties');

};

/**
 * Set Base defaults
 *
 * Utility function for normalizing dirs paths configuration.
 * This resolve the directory paths, and attempt to correct them
 * if they are misconfigured.
 */
async function runtime (cli: ICLICommands, pkg: IPackage) {

  const config = new Model(cli);

  config.version = pkg.version;
  config.mode = modes(cli);

  if (!isNil(config)) {
    if (config.mode.build) {
      config.spawn = pkg.syncify.spawn.build;
    } else {
      config.spawn = pkg.syncify.spawn.watch;
    }
  }
  // env variables
  process.env.SYNCIFY_ENV = config.dev ? 'dev' : 'prod';
  process.env.SYNCIFY_WATCH = String(config.mode.watch);

  await create(config as any);

  if (config.mode.vsc) return;

  const cachePath = join(cli.cwd, 'node_modules/.syncify/store.map');

  if (pathExists(cachePath)) {
    config.cache = await readJson(cachePath).catch(e => console.error(e));
  } else {
    config.cache = await caches(cli, pkg);
  }

  return baseDirs(config, cli, pkg);

};

function modes (cli: ICLICommands) {

  const resource = anyTrue(cli.pages, cli.metafields, cli.redirects);

  return {
    vsc: cli.vsc,
    server: cli.server,
    redirects: cli.redirects,
    metafields: cli.metafields,
    pages: cli.pages,
    prompt: cli.prompt,
    pull: cli.pull,
    push: cli.push,
    clean: anyTrue(resource, cli.upload) ? false : cli.clean,
    build: anyTrue(resource, cli.upload, cli.watch, cli.download) ? false : cli.build,
    watch: anyTrue(resource, cli.upload, cli.download) ? false : cli.watch,
    upload: anyTrue(resource, cli.download, cli.watch) ? false : cli.upload,
    download: anyTrue(resource, cli.upload, cli.watch, cli.build) ? false : cli.download
  };
}

/**
 * Base Directory Mappings
 */
function baseDirs (config: Model, cli: ICLICommands, pkg:IPackage) {

  for (const dir of [
    'input',
    'output',
    'export',
    'import',
    'config',
    'redirects'
  ]) {

    // base dir is undefined, use default
    if (!has(dir, pkg.syncify)) {
      config[dir] = join(cli.cwd, config[dir]);
      continue;
    }

    let path: string = pkg.syncify[dir];

    // path directory starts with . character
    if (is(path.charCodeAt(0), 46)) {

      // path define is root (dot)
      if (is(path.length, 1)) {
        config[dir] = cli.cwd;
        continue;
      }

      // path directory next character is not forard slash
      // for example, ".folder" this will be invalid
      if (is(path.charCodeAt(1), 47)) {
        path = path.slice(1);
      } else {
        log.throw('Directory path is invalid at: "' + path + '"');
        process.exit(1);
      }

    }

    // path directory starts with / character
    if (is(path.charCodeAt(0), 47)) path = path.slice(1);

    // path directory is valid, eg: path
    // dirs cannot reference sub directorys, eg: path/sub
    if (/^[a-zA-Z0-9_-]+/.test(path)) {
      config[dir] = join(cli.cwd, pkg.syncify[dir]);
    } else {
      throw new Error('Directory path is invalid at: "' + path + '"');
    }
  }

  return resolveShops(config, cli, pkg);

};

/**
 * Resolve Stores
 *
 * Resolves Shopify stores and themes from the `package.json`
 * file and the `.env` file locations relative to the current
 * working directory.
 */
async function resolveShops (config: Model, cli: ICLICommands, pkg:IPackage) {

  const file = dotenv.config({ path: join(config.cwd, '.env') });

  // if (config.mode.build || config.mode.clean) return transform.paths.call(pkg, config);

  const stores = pkg.syncify.stores.filter(({ domain }) => includes(domain, cli.store));
  const queue = stores.length > 1;

  for (let i = 0; i < stores.length; i++) {

    // The store
    const field = stores[i];

    // The store client modal
    const store: PartialDeep<IStore> = { queue };

    // Upcase the store name for logs, eg: sissel > Sissel
    store.store = field.domain;

    // The myshopify store domain
    store.domain = `${store.store}.myshopify.com`.toLowerCase();

    // Fallback to environment variables if no .env file
    const env = file.error ? process.env : file.parsed;

    // Get authorization url for the store
    store.client = getURL(field.domain, env);

    // Set store endpoints
    config.sync.stores.push(store);

    // skip theme reference generation if within these resource based modes
    // we do not need context of themes if such modes were initialized by cli
    if (config.mode.metafields || config.mode.pages) continue;

    // Lets parse the theme target names
    const themes: string[] = has('theme', cli)
      ? cli.theme
      : has(field.domain, cli)
        ? cli[field.domain].split(',')
        : keys(field.themes);

    for (const target of themes) {

      if (!has(target, field.themes)) {
        log.throw(`Missing theme target "${target}" in ${field.domain} store.`);
      }

      // Generate import directories if in download mode
      if (config.mode.download) {

        // imports are domain based
        const domain = join(config.cwd, config.import, store.domain);

        // theme targets are nested within
        const dirname = join(domain, target);

        // helper theme directory generator
        const directory = transform.directories(config.mode, dirname);

        // create import/domain.myshopify.com
        if (!pathExistsSync(domain)) {
          try {
            await mkdir(domain);
          } catch (e) {
            log.throw('Failed to create a "domain" directory "' + domain + '"');
          }
        }

        // create import/domain.myshopify.com/target/
        if (!pathExistsSync(dirname)) {
          try {
            await mkdir(dirname);
          } catch (e) {
            log.throw('Failed to create a "domain theme" directory "' + dirname + '"');
          }
        }

        // generate the theme structure
        for (const output of Model.theme) await directory(output);

      }

      // Let populate the model with theme
      config.sync.themes.push(<IThemes>{
        target,
        store: i,
        id: field.themes[target],
        url: `/themes/${field.themes[target]}/assets.json`
      });
    }
  }

  if (is(config.sync.stores.length, 0)) {
    throw new Error('Unknown, missing or invalid store/theme targets');
  }

  return { config, pkg };

};

/**
 * Store Authorization URL
 *
 * Generate the the authorization URL to
 * be used for requests.
 */
function getURL (domain: string, env: object): AxiosRequestConfig {

  let api_token = domain + '_api_token';

  if (!has(api_token, env)) api_token = api_token.toUpperCase();

  if (has(api_token, env)) {
    return {
      baseURL: `https://${domain}.myshopify.com/admin`,
      headers: { 'X-Shopify-Access-Token': env[api_token] }
    };
  }

  let api_key = domain + '_api_key';
  let api_secret = domain + '_api_secret';

  if (!has(api_key, env)) api_key = api_key.toUpperCase();
  if (!has(api_secret, env)) api_secret = api_secret.toUpperCase();
  if (has(api_key, env) && has(api_secret, env)) {
    return {
      baseURL: `https://${domain}.myshopify.com/admin`,
      auth: {
        username: env[api_key],
        password: env[api_secret]
      }
    };
  }

  throw new Error(`Missing "${domain}" credentials`);

};

/**
 * Generate Cache Directories
 *
 * Writes cache references to the `node_modules`
 * directory. This is a fallback function and only runs
 * is `postinstall` was not triggered.
 */
async function caches (cli: ICLICommands, pkg: IPackage): Promise<ICache> {

  const path = join(cli.cwd, 'node_modules/.syncify');
  const dirs = [
    'styles',
    'icons',
    'metafields',
    'pages',
    'sections',
    'redirects',
    'vscode'
  ];

  const refs: PartialDeep<ICache> = {
    version: pkg.version,
    created: Date.now(),
    updated: Date.now()
  };

  /* -------------------------------------------- */
  /* LOGIC                                        */
  /* -------------------------------------------- */

  if (!pathExistsSync(path)) {

    try {
      await mkdir(path);
    } catch (e) {
      throw new Error(e);
    }

  }

  while (dirs.length !== 0) {

    const name = dirs.shift();
    const uri = join(path, name);

    if (!pathExistsSync(uri)) {
      try {
        await mkdir(uri);
      } catch (e) {
        throw new Error(e);
      }
    }

    refs[name] = { uri, maps: {} };

  }

  await writeJson(join(path, 'store.map'), refs, { spaces: 0 });

  return refs as ICache;

};
