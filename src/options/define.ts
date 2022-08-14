
import { anyTrue, isNil, has, uniq, includes, forEach } from 'rambdax';
import { join } from 'path';
import { Commands, Config, Package, Bundle, Modes, Directories } from 'types';
import { pathExists, readJson } from 'fs-extra';
import dotenv from 'dotenv';
import anymatch from 'anymatch';
import { isArray, keys, is, assign, nil, log, isString, isObject, ws, values } from '../shared/native';
import { basePath, normalPath } from '../shared/paths';
import { authURL } from '../shared/options';
import { logHeader } from '../logger/heading';
import { spawn } from '../logger/console';
import { spawned, spawns } from '../cli/spawn';
import { kill } from '../cli/exit';
import { nwl, clear } from '../cli/tui';
import { gray } from '../cli/ansi';
import { queue } from '../requests/queue';
import { configFile, pkgJson, rcFile } from './files';
import { cacheDirs, importDirs, themeDirs } from './dirs';
import { SVGOptions, jsonOptions, sectionOptions } from './transforms';
import { styleOptions } from './style';
import { minifyOptions } from './minify';
import { bundle, update, defaults, cache, minify, plugins } from './index';
import { typeError } from './validate';

/* -------------------------------------------- */
/* EXIT HANDLER                                 */
/* -------------------------------------------- */

kill(() => {

  queue.pause();
  queue.clear();

  nwl(nil);

  spawns.forEach((child, name) => {

    log(`- ${gray(`pid: #${child.pid} (${name}) process exited`)}`);
    child.kill();

  });

  nwl(nil);

  spawns.clear();
  process.exit(0);

});

/**
 * Resolve Paths
 *
 * Resolves `package.json` file and the `.env`
 * file locations relative to the current working
 * directory.
 */
export async function define (cli: Commands, _options?: Config) {

  clear();

  const mode = modes(cli);
  const pkg = await pkgJson(cli.cwd);
  const config = await getConfig(pkg, cli);

  update.bundle({
    mode,
    config: () => config,
    version: pkg.version,
    cli: cli.cli,
    cwd: cli.cwd,
    silent: cli.silent,
    prod: cli.prod,
    dev: cli.dev && !cli.prod,
    minify: anyTrue(cli.prod, cli.minify)
      ? bundle.minify
      : minify as any
  });

  // env variables
  process.env.SYNCIFY_ENV = bundle.dev ? 'dev' : 'prod';
  process.env.SYNCIFY_WATCH = String(bundle.mode.watch);

  const promise = await Promise.allSettled(
    [
      baseDirs(cli, config),
      caches(cli.cwd),
      getStores(cli, config),
      themeDirs(bundle.dirs.output),
      importDirs(bundle),
      getPaths(config),
      setProcessors(config, bundle),
      minifyOptions(config),
      sectionOptions(config),
      jsonOptions(config),
      styleOptions(config, pkg),
      SVGOptions(config, pkg),
      setSpawns(config.spawn, bundle),
      loadPlugins(config, bundle)
    ]
  );

  logHeader(bundle);

  return promise;

};

function setProcessors (config: Config, bundle: Bundle) {

  forEach(processor => {

    forEach((name: keyof Bundle['processor']) => {

      if (has(name, bundle.processor) && name !== 'watch') {
        bundle.processor[name].config = processor[name];
      }

    }, keys(processor));

  }, values(config.processor));

}

function loadPlugins (config: Config, bundle: Bundle) {

  if (!has('plugins', config)) return;

  if (!isArray(config.plugins)) return; // TODO: Throw error if not array

  for (const plugin of config.plugins) {

    const { name } = plugin;

    if (has('onInit', plugin)) plugin.onInit.call({ ...bundle }, config);

    if (has('onChange', plugin)) plugins.onChange.push([ name, plugin.onChange ]);
    if (has('onTransform', plugin)) plugins.onTransform.push([ name, plugin.onTransform ]);

    if (bundle.mode.watch) {
      if (has('onWatch', plugin)) plugins.onWatch.push([ name, plugin.onWatch ]);
      if (has('onReload', plugin)) plugins.onReload.push([ name, plugin.onReload ]);
    }

    if (bundle.mode.build) {
      if (has('onBuild', plugin)) plugins.onBuild.push([ name, plugin.onBuild ]);
    }
  }

}

/**
 * Define Spawn
 *
 * Invokes the spawned processes. The `spawn()` function
 * parameter passed in `spawned()` returns a function located
 * in `logger/console.ts` and will pipe the child processes output
 * as parameter value.
 *
 * > See the `cli/spawn.ts` which is used to normalize the log output.
 */
function setSpawns (config: Config['spawn'], bundle: Bundle) {

  if (!isObject(config)) return typeError('spawn', 'spawn', config, '{ build: {}, watch: {} }');

  let mode: 'build' | 'watch' = null;

  if (bundle.mode.build && has('build', config)) mode = 'build';
  if (bundle.mode.watch && has('watch', config)) mode = 'watch';

  if (isNil(mode)) return;
  if (!isObject(config[mode])) return typeError('spawn', 'build', config.build, 'string | string[]');

  console.log(mode);
  const props = keys(config[mode]);

  if (props.length === 0) return;

  for (const name of props) {

    const command = config[mode][name];

    if (isString(command)) {

      // create the command model
      bundle.spawn.commands[name] = { cmd: nil, args: [], pid: NaN };

      // convert to an array
      const cmd = (command as string).trimStart().indexOf(ws) > -1
        ? (command as string).trimStart().split(ws) as string[]
        : [ command ] as string[];

      bundle.spawn.commands[name].cmd = cmd.shift();
      bundle.spawn.commands[name].args = cmd;

      spawned(name, bundle.spawn.commands[name], spawn(name));

    } else if (isArray(command)) {

      // create the command model
      const cmd = command.shift();
      bundle.spawn.commands[name] = { cmd, args: command, pid: NaN };

      spawned(name, bundle.spawn.commands[name], spawn(name));

    } else {
      typeError('spawn', mode, config[mode], 'string | string[]');
    }

  }

}

/**
 * Define Mode
 *
 * Identifies the execution modes which Syncify should
 * invoke. Validates the CLI flags and options to determine
 * the actions to be run.
 */
function modes (cli: Commands) {

  const resource = anyTrue(cli.pages, cli.metafields, cli.redirects);

  return <Modes>{
    vsc: cli.vsc,
    live: cli.watch && cli.hot,
    export: cli.export,
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

async function getConfig (pkg: Package, cli: Commands) {

  const config = await configFile(cli.cwd);

  if (config !== null) return defaults(config);

  if (has('syncify', pkg)) return defaults(pkg.syncify);

  const rccfg = await rcFile(bundle.cwd);

  if (rccfg !== null) return defaults(rccfg);

  throw new Error('Missing Configuration');

}

/**
 * Resolve Stores
 *
 * Resolves Shopify stores and themes from the `package.json`
 * and `.env` file locations relative to the current
 * working directory.
 */
export async function getStores (cli: Commands, config: Config) {

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
    const sidx = bundle.sync.stores.push({
      store: store.domain,
      domain,
      client,
      queue
    }) - 1;

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
      bundle.sync.themes.push({
        target,
        sidx,
        store: domain,
        id: store.themes[target],
        url: `/themes/${store.themes[target]}/assets.json`
      });
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
function baseDirs (cli: Commands, config: Config) {

  const base = basePath(cli.cwd);

  for (const [ dir, def ] of [
    [ 'input', 'source' ],
    [ 'output', 'theme' ],
    [ 'export', 'export' ],
    [ 'import', 'import' ],
    [ 'config', '.' ]
  ]) {

    let path: string | string[];

    if (cli[dir] === def) {
      if (config[dir] === def) {
        bundle.dirs[dir] = base(cli[dir]);
        continue;
      } else {
        path = config[dir];
      }
    } else {
      path = cli[dir];
    }

    if (isArray(path)) {
      const roots = uniq(path.map(base));
      bundle.dirs[dir] = is(roots.length, 1) ? roots[0] : roots;
    } else {
      bundle.dirs[dir] = base(path);
    }
  }

  // add config file to watch
  bundle.watch.push(bundle.file);

};

/**
 * Get Paths
 *
 * Utility function for normalizing the paths configuration.
 * This will fix and resolve custom paths. If a user
 * defines the build directory input in directory paths
 * it will ensure it is formed correctly.
 */
export async function getPaths (config: Config) {

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

    } else if (key === 'redirects') {

      uri = [ join(bundle.cwd, config.paths[key]) ];

    } else {

      uri = [ path(key) ];

    }

    bundle.watch.push(...uri);
    bundle.paths[key] = anymatch(uri);

  }

}
