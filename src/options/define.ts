import { Commands, Config, Package, Bundle, Modes } from 'types';
import { anyTrue, isNil, has, includes, forEach } from 'rambdax';
import merge from 'mergerino';
import dotenv from 'dotenv';
import anymatch from 'anymatch';
import { join } from 'node:path';
import { pathExists, readJson } from 'fs-extra';
import { isArray, keys, is, assign, nil, log, isString, isObject, ws, defineProperty } from '../shared/native';
import { normalPath } from '../shared/paths';
import { authURL } from '../shared/options';
import { logHeader } from '../logger/heading';
import { spawn } from '../logger/console';
import { spawned, spawns } from '../cli/spawn';
import { kill } from '../cli/exit';
import { nwl, clear } from '../cli/tui';
import { gray } from '../cli/ansi';
import { queue } from '../requests/queue';
import { configFile, getPackageJson } from './files';
import { setCacheDirs, setImportDirs, setThemeDirs, setBaseDirs } from './dirs';
import { setJsonOptions, setViewOptions } from './transforms';
import { setScriptOptions } from './script';
import { setStyleConfig } from './style';
import { setMinifyOptions } from './minify';
import { bundle, cache, processor, plugins, config, hot } from '.';
import { typeError, invalidError, missingConfig, throwError } from './validate';
import { PATH_KEYS } from '../constants';

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

  const pkg = await getPackageJson(cli.cwd);

  defineProperty(bundle, 'pkg', { get () { return pkg; } });

  bundle.config = await getConfig(pkg, cli);
  bundle.mode = setModes(cli);
  bundle.cli = cli.cli;
  bundle.version = pkg.version;
  bundle.cwd = cli.cwd;
  bundle.silent = cli.silent;
  bundle.prod = cli.prod;
  bundle.dev = cli.dev && !cli.prod;

  process.env.SYNCIFY_ENV = bundle.dev ? 'dev' : 'prod';
  process.env.SYNCIFY_WATCH = String(bundle.mode.watch);
  process.env.SYNCIFY_SERVER = String(bundle.hot.server);
  process.env.SYNCIFY_SOCKET = String(bundle.hot.socket);

  const promise = await Promise.all([
    setBaseDirs(cli, config),
    setCaches(bundle.cwd),
    setThemeDirs(bundle.dirs.output),
    setImportDirs(bundle),
    setStores(cli, config),
    setPaths(config),
    setProcessors(config),
    setMinifyOptions(config),
    setViewOptions(config),
    setJsonOptions(config),
    setScriptOptions(config, pkg),
    setStyleConfig(config, pkg),
    setSpawns(config, bundle),
    setHotReloads(cli, config),
    setPlugins(config, bundle)
  ]);

  log(logHeader(bundle));

  return promise;

};

async function setHotReloads (cli: Commands, config: Config) {

  if (bundle.mode.watch) {
    if ((cli.hot === true || config.hot === true)) {
      bundle.hot = true;
      hot.render = `{% render 'hot.js.liquid', server: ${hot.server}, socket: ${hot.socket} %}`;
    } else if (isObject(config.hot)) {
      const { server, socket } = assign(hot, config.hot);
      bundle.hot = true;
      hot.render = `{% render 'hot.js.liquid', server: ${server}, socket: ${socket} %}`;
    }
  }

  if (!bundle.hot) return;

  hot.snippet = join(bundle.cwd, 'node_modules', '@syncify/cli', 'hot.js.liquid');
  hot.output = join(bundle.dirs.output, 'snippets', 'hot.js.liquid');

  bundle.watch.add(bundle.hot.output);
}

/**
 * Set Processors
 *
 * Merges processor defaults with defaults provided
 * in configuration.
 */
function setProcessors (config: Config) {

  for (const prop in config.processors) {
    processor[prop].config = isArray(config.processors[prop])
      ? config.processors[prop]
      : assign(processor[prop].config, config.processors[prop]);
  }

};

/**
 * Set Plugins
 *
 * Sets and constructs the Syncify plugin model of all
 * plugins defined in the configuration.
 */
function setPlugins (config: Config, bundle: Bundle) {

  if (!has('plugins', config)) return;
  if (!isArray(config.plugins)) return; // TODO: Throw error if not array

  for (const plugin of config.plugins) {

    if (has('onInit', plugin)) plugin.onInit.call({ ...bundle }, config);

    if (has('onChange', plugin)) {
      plugins.onChange.push([
        plugin.name,
        plugin.onChange
      ]);
    }

    if (has('onTransform', plugin)) {
      plugins.onTransform.push([
        plugin.name,
        plugin.onTransform
      ]);
    }

    if (bundle.mode.watch) {

      if (has('onWatch', plugin)) {
        plugins.onWatch.push([
          plugin.name,
          plugin.onWatch
        ]);
      }

      if (has('onReload', plugin)) {
        plugins.onReload.push([
          plugin.name,
          plugin.onReload
        ]);
      }
    }

    if (bundle.mode.build) {
      if (has('onBuild', plugin)) {
        plugins.onBuild.push([
          plugin.name,
          plugin.onBuild
        ]);
      }
    }

  }

};

/**
 * Set Spawns
 *
 * Invokes the spawned processes. The `spawn()` function
 * parameter passed in `spawned()` returns a function located
 * in `logger/console.ts` and will pipe the child processes output
 * as parameter value.
 *
 * > See the `cli/spawn.ts` which is used to normalize the log output.
 */
function setSpawns (config: Config, bundle: Bundle) {

  if (!has('spawn', config) || isNil(config.spawn)) return;

  if (!isObject(config.spawn)) {
    typeError('config', 'spawn', config.spawn, '{ build: {}, watch: {} }');
  }

  let mode: 'build' | 'watch' = null;

  if (bundle.mode.build && has('build', config.spawn)) mode = 'build';
  if (bundle.mode.watch && has('watch', config.spawn)) mode = 'watch';
  if (isNil(mode) || isNil(config.spawn[mode])) return;

  if (!isObject(config.spawn[mode])) {
    typeError('spawn', mode, config.spawn.build, 'string | string[]');
  }

  const props = keys(config.spawn[mode]);

  if (props.length === 0) return;

  for (const name in config.spawn[mode]) {

    const command = config.spawn[mode][name];

    if (isString(command)) {

      // create the command model
      bundle.spawn.commands[name] = {
        cmd: nil,
        args: [],
        pid: NaN
      };

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
      typeError('spawn', mode, config.spawn[mode], 'string | string[]');
    }

  }

};

/**
 * Set Mode
 *
 * Identifies the execution modes which Syncify should
 * invoke. Validates the CLI flags and options to determine
 * the actions to be run.
 */
function setModes (cli: Commands) {

  const resource = anyTrue(cli.pages, cli.metafields, cli.redirects);
  const transfrom = anyTrue(cli.style, cli.script, cli.image, cli.svg);

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
    script: transfrom
      ? cli.script
      : false,
    style: transfrom
      ? cli.style
      : false,
    image: transfrom
      ? cli.image
      : false,
    svg: transfrom
      ? cli.svg
      : false,
    clean: anyTrue(
      resource,
      transfrom,
      cli.upload
    ) ? false : cli.clean,
    build: anyTrue(
      resource,
      transfrom,
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
      transfrom,
      cli.download,
      cli.watch
    ) ? false : cli.upload,
    download: anyTrue(
      resource,
      transfrom,
      cli.upload,
      cli.watch,
      cli.build
    ) ? false : cli.download
  };
};

/**
 * Set Cache
 *
 * Resolves the cache mapping records, which will exist within
 * the `node_modules/.syncify` directory. This file holds important
 * information about the users project. If no maps are found, they
 * will be generated.
 */
async function setCaches (cwd: string) {

  const dir = join(cwd, 'node_modules/.syncify');
  const map = join(dir, 'store.map');
  const has = await pathExists(map);

  if (!has) return setCacheDirs(dir);

  bundle.dirs.cache = `${dir}/`;
  const read = await readJson(map);

  assign(cache, read);

};

/**
 * Get Config
 *
 * Resolves the `syncify.config.js` file or configuration
 * property contained in the _package.json_ file.
 */
async function getConfig (pkg: Package, cli: Commands) {

  const options = await configFile(cli.cwd);

  if (options !== null) return merge(config, options);
  if (has('syncify', pkg)) return merge(config, pkg.syncify);

  missingConfig(cli.cwd);

};

/**
 * Resolve Stores
 *
 * Resolves Shopify stores and themes from the `package.json`
 * and `.env` file locations relative to the current
 * working directory.
 */
export function setStores (cli: Commands, config: Config) {

  if (is(cli._.length, 0)) return;

  const stores = cli._[0].split(',');
  const file = dotenv.config({ path: join(bundle.cwd, '.env') });
  const array = isArray(config.stores) ? config.stores : [ config.stores ];
  const items = array.filter(({ domain }) => includes(domain, stores));
  const queue = items.length > 1;

  forEach(store => {

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
    if (bundle.mode.metafields || bundle.mode.pages) return;

    // Lets parse the theme target names
    const themes: string[] = has('theme', cli)
      ? (cli.theme as any).split(',')
      : has(store.domain, cli)
        ? cli[store.domain].split(',')
        : keys(store.themes);

    forEach(target => {

      if (!has(target, store.themes)) invalidError('theme', 'target', target, 'string');

      // Let populate the model with theme
      bundle.sync.themes.push({
        target,
        sidx,
        store: domain,
        id: store.themes[target],
        url: `/themes/${store.themes[target]}/assets.json`
      });

    }, themes);

  }, items);

  if (bundle.sync.stores.length === 0) {
    throwError(
      'Unknown, missing or invalid store/theme targets',
      'Check your store config'
    );
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
export async function setPaths (config: Config) {

  // Path normalize,
  const path = normalPath(bundle.dirs.input);

  // iterate over the defined path mappings
  for (const key of PATH_KEYS) {

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

    uri.forEach(p => bundle.watch.add(p));
    bundle.paths[key] = anymatch(uri);

  }

}
