import type { Commands, Config, WatchBundle } from 'types';
import { join } from 'pathe';
import { has } from 'rambdax';
import { FSWatcher } from 'chokidar';
import { pathExists, readJSON, remove } from 'fs-extra';
import { missingConfig } from 'syncify:log/throws';
import { configFile, getPackageJson } from './files';
import { setCacheDirs, setImportDirs, setThemeDirs, setBaseDirs } from './dirs';
import { setJsonOptions } from './json';
import { setModes } from './modes';
import { setSnippetOptions } from './snippets';
import { setSectionOptions } from './sections';
import { setStores } from './stores';
import { setPaths } from './paths';
import { setVersion } from './version';
import { setSpawns } from './spawn';
import { setScriptOptions } from './script';
import { setStyleConfig } from './style';
import { setSvgOptions } from './svg';
import { setHotReloads } from './hot';
import { setFilters } from './filters';
import { setMinifyOptions } from './terser';
import { setPageOptions } from './pages';
import { log } from 'syncify:log';
import { isArray } from 'syncify:utils';
import { assign, toArray } from 'syncify:native';
import { $ } from 'syncify:state';

/**
 * Define Options
 *
 * Runtime function - Syncify execution executes and generates the workable
 * state (`$`) object and constructs all required references,
 */
export async function define (cli: Commands, _options?: Config) {

  log.runtime($);

  await getPackageJson(cli.cwd);
  await getConfig(cli);

  $.restart = false;
  $.cli = cli;
  $.mode = setModes(cli);
  $.cwd = cli.cwd;
  $.env.cli = cli.cli;
  $.env.prod = cli.prod;
  $.env.dev = cli.dev && !cli.prod;
  $.logger.silent = cli.silent;
  $.terminal.wrap = Math.round($.terminal.cols - ($.terminal.cols / 3));

  process.env.SYNCIFY_ENV = $.env.dev ? 'dev' : 'prod';
  process.env.SYNCIFY_WATCH = String($.mode.watch);

  const { config, cwd } = $;
  const promise = await Promise.all([
    setChokidar(cli.watch || cli.upload, cwd),
    setBaseDirs(cli),
    setCaches(cwd),
    setVersion(cli),
    setThemeDirs($.dirs.output),
    setImportDirs(),
    setStores(cli, config),
    setPaths(config),
    setFilters(cli),
    setProcessors(config),
    setSectionOptions(config),
    setSnippetOptions(config),
    setPageOptions(config),
    setJsonOptions(config),
    setScriptOptions(config),
    setStyleConfig(config),
    setSvgOptions(config),
    setMinifyOptions(config),
    setSpawns(config),
    setPlugins(config),
    setHotReloads(config)
  ]).catch(e => {

    console.log(e);

  });

  log.spinner.stop();
  log.start($);

  return promise;

};

/**
 * Set Chokidar
 *
 * Creates an instance of chodkidar FSWatcher, we will assign watch paths
 * during the initialization process that executes in directly after this.
 */
export function setChokidar (watch: boolean, cwd: string) {

  if (!watch) return;

  $.watch = new FSWatcher({
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 75,
    binaryInterval: 100,
    ignored: [ '**/*.map' ],
    ignorePermissionErrors: true
  });

  $.watch = Object.defineProperties($.watch, {
    has: {
      value (path: string, dir = cwd) {
        return ($.watch as WatchBundle)._watched.get(dir).items.has(path);
      }
    },
    paths: {
      get () {
        return toArray($.watch.values());
      }
    },
    watching: {
      get () {
        return ($.watch as WatchBundle)._watched;
      }
    }
  });

}

/**
 * Set Processors
 *
 * Merges processor defaults with defaults provided in configuration.
 */
function setProcessors (config: Config) {

  for (const prop in config.processors) {
    $.processor[prop].config = isArray(config.processors[prop])
      ? config.processors[prop]
      : assign($.processor[prop].config, config.processors[prop]);
  }

};

/**
 * Set Plugins
 *
 * Sets and constructs the Syncify plugin model of all
 * plugins defined in the configuration.
 */
function setPlugins (config: Config) {

  if (!has('plugins', config)) return;
  if (!isArray(config.plugins)) return; // TODO: Throw error if not array

  for (const plugin of config.plugins) {

    if (has('onInit', plugin)) plugin.onInit.call({ ...$ }, config);

    if (has('onChange', plugin)) {
      $.plugins.onChange.push([
        plugin.name,
        plugin.onChange
      ]);
    }

    if (has('onTransform', plugin)) {
      $.plugins.onTransform.push([
        plugin.name,
        plugin.onTransform
      ]);
    }

    if ($.mode.watch) {

      if (has('onWatch', plugin)) {
        $.plugins.onWatch.push([
          plugin.name,
          plugin.onWatch
        ]);
      }

      if (has('onReload', plugin)) {
        $.plugins.onReload.push([
          plugin.name,
          plugin.onReload
        ]);
      }
    }

    if ($.mode.build) {
      if (has('onBuild', plugin)) {
        $.plugins.onBuild.push([
          plugin.name,
          plugin.onBuild
        ]);
      }
    }

  }

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

  $.dirs.cache = join(cwd, 'node_modules/.syncify');

  const uri = join($.dirs.cache, 'build.map');
  const exists = await pathExists(uri);

  if (!exists) return setCacheDirs($.dirs.cache);

  $.cache = await readJSON(uri);

  // TODO
  // THIS LOGIC NEEDS IMPROVEMENTS WHEREIN MISSING
  // PROPS IN CACHE GET POPULATED - THIS IS JUST A QUICKFIX FOR NOW
  if (!has('themeVersion', $.cache)) {
    $.cache.themeVersion = $.pkg.version;
  }

  if ($.cache.version !== $.version && $.version === '0.3.0-beta') {
    if (await (pathExists($.dirs.cache))) {
      await remove($.dirs.cache);
      return setCacheDirs($.dirs.cache);
    }
  }

};

/**
 * Get Config
 *
 * Resolves the `syncify.config.js` file or configuration
 * property contained in the _package.json_ file.
 */
async function getConfig (cli: Commands) {

  const cfg = await configFile(cli.cwd);

  if (cfg !== null) {
    $.config = cfg;
  } else if (has('syncify', $.pkg)) {
    $.config = $.pkg.syncify as unknown as Config;
  } else {
    missingConfig(cli.cwd);
  }
};
