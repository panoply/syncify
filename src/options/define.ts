
import { anyTrue, isNil, has, uniq, includes } from 'rambdax';
import { join } from 'path';
import { ICLICommands, IConfig, IPackage, IBundle } from 'types';
import { pathExists, readJson } from 'fs-extra';
import dotenv from 'dotenv';
import anymatch from 'anymatch';
import { isArray, keys, is, assign } from 'shared/native';
import { basePath, normalPath, parentPath } from 'shared/paths';
import { authURL } from '../shared/options';
import { log } from 'cli/logger';
import { configFile, pkgJson, rcFile } from './files';
import { cacheDirs, importDirs, themeDirs } from './dirs';
import { iconOptions, jsonOptions, sectionOptions, styleOptions } from './transforms';
import { terserOptions } from './terser';
import { spawned } from 'cli/spawn';
import { bundle, update, defaults, cache } from './index';

/**
 * Resolve Paths
 *
 * Resolves `package.json` file and the `.env`
 * file locations relative to the current working
 * directory.
 */
export async function define (cli: ICLICommands) {

  log.clear();

  const mode = modes(cli);
  const pkg = await pkgJson(cli.cwd);
  const config = await getConfig(pkg);

  update.bundle({
    mode,
    version: pkg.version,
    cli: cli.cli,
    cwd: cli.cwd,
    silent: cli.silent,
    prod: cli.prod,
    dev: cli.dev && !cli.prod,
    spawn: config.spawn[mode.build ? 'build' : 'watch'],
    dirs: {
      input: cli.input,
      output: cli.output,
      config: cli.config
    }
  });

  // env variables
  process.env.SYNCIFY_ENV = bundle.dev ? 'dev' : 'prod';
  process.env.SYNCIFY_WATCH = String(bundle.mode.watch);

  return Promise.allSettled(
    [
      caches(cli.cwd),
      getStores(cli, config),
      baseDirs(config),
      log.open(),
      themeDirs(bundle.dirs.output),
      setSpawns(bundle.spawn),
      importDirs(bundle),
      getPaths(config),
      sectionOptions(config),
      jsonOptions(config),
      styleOptions(config, pkg),
      iconOptions(config, pkg),
      terserOptions(config)
    ]
  );

};

/**
 * Define Mode
 *
 * Identifies the execution modes which Syncify should
 * invoke. Validates the CLI flags and options to determine
 * the actions to be run.
 */
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
    clean: anyTrue(
      resource,
      cli.upload
    ) ? false : cli.clean,
    build: anyTrue(
      resource,
      cli.upload,
      cli.watch,
      cli.download
    ) ? false : cli.build,
    watch: anyTrue(
      resource,
      cli.upload,
      cli.download
    ) ? false : cli.watch,
    upload: anyTrue(
      resource,
      cli.download,
      cli.watch
    ) ? false : cli.upload,
    download: anyTrue(
      resource,
      cli.upload,
      cli.watch,
      cli.build
    ) ? false : cli.download
  };
}

/**
 * Cache Maps
 *
 * Resolves the cache mapping records, which will
 * exist within the `node_modules/.syncify` directory.
 * This file holds important information about the users
 * project. If no maps are found, they will be generated.
 *
 * > The cache maps are generated via `postinstall`
 */
async function caches (cwd: string) {

  const dir = join(cwd, 'node_modules/.syncify');
  const map = join(dir, 'store.map');
  const has = await pathExists(map);

  if (!has) return cacheDirs(dir);

  bundle.dirs.cache = `${dir}/`;
  const read = await readJson(map);

  assign(cache, read);

};

async function getConfig (pkg: IPackage) {

  const config = await configFile(bundle.dirs.config);

  if (!isNil(config)) return defaults(config);

  if (has('syncify', pkg)) return defaults(pkg.syncify);

  const rccfg = await rcFile(bundle.cwd);

  if (!isNil(rccfg)) return defaults(config);

  throw new Error('Missing Configuration');

}

/**
 * Resolve Stores
 *
 * Resolves Shopify stores and themes from the `package.json`
 * and `.env` file locations relative to the current
 * working directory.
 */
export async function getStores (cli: ICLICommands, config: IConfig) {

  if (is(cli._.length, 0)) return;

  const stores = cli._[0].split(',');
  const file = dotenv.config({ path: join(bundle.cwd, '.env') });
  const array = isArray(config.stores) ? config.stores : [ config.stores ];
  const items = array.filter(({ domain }) => includes(domain, stores));
  const queue = items.length > 1;

  for (const store of items) {

    // The myshopify store domain
    const domain = `${store.domain}.myshopify.com`.toLowerCase();

    // Fallback to environment variables if no .env file
    const env = file.error ? process.env : file.parsed;

    // Get authorization url for the store
    const client = authURL(store.domain, env);

    // Set store endpoints
    bundle.sync.stores.push({
      store: store.domain,
      domain,
      client,
      queue
    });

    // skip theme reference generation if within these resource based modes
    // we do not need context of themes if such modes were initialized by cli
    if (bundle.mode.metafields || bundle.mode.pages) continue;

    // Lets parse the theme target names
    const themes: string[] = has('theme', cli)
      ? (cli.theme as any).split(',')
      : has(store.domain, cli)
        ? cli[store.domain].split(',')
        : keys(store.themes);

    for (const target of themes) {

      if (!has(target, store.themes)) {
        throw new Error(`Missing theme target "${target}" in ${store.domain} store.`);
      }

      // Let populate the model with theme
      bundle.sync.themes[domain] = {
        target,
        store: domain,
        id: store.themes[target],
        url: `/themes/${store.themes[target]}/assets.json`
      };
    }

  }

  if (is(bundle.sync.stores.length, 0)) {
    throw new Error('Unknown, missing or invalid store/theme targets');
  }

};

/**
 * Base Directories
 *
 * Generates the base directory paths. The function
 * also normalizes paths to ensure the mapping is
 * correct.
 */
function baseDirs (config: IConfig) {

  const base = basePath(bundle.cwd);

  for (const dir of [
    'input',
    'output',
    'export',
    'import',
    'config',
    'metafields',
    'pages'
  ]) {

    let path: string | string[];

    if (dir === 'metafields' || dir === 'pages') {
      path = parentPath(config.paths[dir]);
    } else {
      if (has(dir, config)) {
        bundle.dirs[dir] = base(config[dir]);
        continue;
      } else {
        path = config[dir];
      }
    }

    if (isArray(path)) {
      const roots = uniq(path.map(base));
      bundle.dirs[dir] = is(roots.length, 1) ? roots[0] : roots;
    } else {
      bundle.dirs[dir] = base(path);
    }
  }

};

/**
 * Get Paths
 *
 * Utility function for normalizing the paths configuration.
 * This will fix and resolve custom paths. If a user
 * defines the build directory input in directory paths
 * it will ensure it is formed correctly.
 */
export async function getPaths (config: IConfig) {

  // Path normalize,
  const path = normalPath(bundle.dirs.input);

  // iterate over the define path mappings
  for (const key of [
    'assets',
    'styles',
    'config',
    'layout',
    'customers',
    'locales',
    'sections',
    'snippets',
    'templates',
    'metafields',
    'pages',
    'redirects'
  ]) {

    let uri: string[];

    if (key === 'customers') {

      uri = has(key, config.paths)
        ? isArray(config.paths[key])
          ? (config.paths[key] as string[]).map(path)
          : [ path(config.paths[key]) ]
        : [ path('templates/customers') ];

    } else if (has(key, config.paths)) {

      uri = isArray(config.paths[key])
        ? config.paths[key].map(path)
        : [ path(config.paths[key]) ];

      if (key === 'assets') uri.push(join(bundle.dirs.output, 'assets/*'));

    } else {

      uri = [ path(key) ];

    }

    bundle.watch.push(...uri);
    bundle.paths[key] = anymatch(uri);

  }

}

export function setSpawns (cmds: IBundle['spawn']) {

  for (const spawn in cmds) {
    const child = log.spawn(spawn);
    spawned(spawn, child);
  }

}
