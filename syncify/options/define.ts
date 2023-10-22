import type { Commands, Config } from 'types';
import merge from 'mergerino';
import { FSWatcher } from 'chokidar';
import { missingConfig } from 'syncify:log/throws';
import { configFile, getEnvFile, getPackageJson } from './files';
import { setImportDirs, setThemeDirs, setBaseDirs, setCacheDirs } from './dirs';
import { setJsonOptions } from './json';
import { setModes } from './modes';
import { setSnippetOptions } from './snippets';
import { setSectionOptions } from './sections';
import { setSync } from './sync';
import { setPaths } from './paths';
import { setVersion } from './version';
import { setSpawns } from './spawn';
import { setScriptOptions } from './script';
import { setStyleConfig } from './style';
import { setSvgOptions } from './svg';
import { setHotReloads } from './hot';
import { setFilters } from './filters';
import { setTerserOptions } from './terser';
import { setPageOptions } from './pages';
import * as log from 'syncify:log';
import * as error from 'syncify:errors';
import { isArray, has, isObject, isEmpty, hasProp } from 'syncify:utils';
import { toArray } from 'syncify:native';
import { cacheDone, getCache } from '../process/cache';
import { setPublishConfig } from './publish';
import { $ } from 'syncify:state';
import { timer } from 'syncify:timer';

/**
 * Define Configs
 *
 * Required config loading
 */
export async function configs (cli: Commands) {

  await getPackageJson(cli.cwd);
  await getConfig(cli);

}

/**
 * Define Options
 *
 * Runtime function - Syncify execution executes and generates the workable
 * state (`$`) object and constructs all required references,
 */
export async function define (cli: Commands, options?: Config) {

  timer.start('runtime');

  log.runtime($);

  await getEnvFile(cli.cwd);
  await getPackageJson(cli.cwd);
  await getConfig(cli);
  await getCache(cli);

  setMisc(cli);
  setModes(cli);

  process.env.SYNCIFY_ENV = $.env.dev ? 'dev' : 'prod';
  process.env.SYNCIFY_WATCH = String($.mode.watch);

  setBaseDirs(cli);
  setVersion(cli);
  setFilters(cli);

  log.runtime.modes($);

  await setSync(cli);

  setChokidar(cli.watch || cli.upload);
  setProcessors();
  setPublishConfig();
  setSpawns();

  await Promise.all(
    [
      setCacheDirs(),
      setThemeDirs(),
      setImportDirs(),
      setPaths()
    ]
  ).catch(e => {

    error.throws(e, {
      details: 'Directory and path generation error'
    });

  });

  if ($.mode.themes) return;

  setPageOptions();
  setJsonOptions();
  setSnippetOptions();
  setPlugins();

  if (!$.mode.build) log.runtime.stores($);

  const promise = await Promise.all(
    [
      setSectionOptions(),
      setScriptOptions(),
      setStyleConfig(),
      setSvgOptions(),
      setHotReloads(),
      cacheDone()
    ]
  ).catch(e => {

    error.throws(e, {
      details: 'Runtime error'
    });

  });

  setTerserOptions();

  log.runtime.warnings($);

  if (!$.mode.build) log.runtime.time();

  return promise;

};

/**
 * Set Misc
 *
 * Applies various assignments to the `$` modal
 */
function setMisc (cli: Commands) {

  $.restart = false;
  $.cli = cli;
  $.cwd = cli.cwd;
  $.env.cli = cli.cli;
  $.env.prod = cli.prod;
  $.env.dev = cli.dev && !cli.prod;
  $.terminal.wrap = Math.round($.terminal.cols - ($.terminal.cols / 3));

  const prop = hasProp($.config.log);

  if (prop('silent')) $.log.config.silent = $.config.log.silent;
  if (prop('clear')) $.log.config.clear = $.config.log.clear;
  if (prop('stats')) $.log.config.stats = $.config.log.stats;
  if (prop('warnings')) $.log.config.warnings = $.config.log.warnings;

}

/**
 * Set Chokidar
 *
 * Creates an instance of chodkidar FSWatcher, we will assign watch paths
 * during the initialization process that executes in directly after this.
 */
export function setChokidar (watch: boolean) {

  if (!watch) return;

  $.watch = new FSWatcher(
    {
      persistent: true,
      ignoreInitial: true,
      usePolling: true,
      interval: 75,
      binaryInterval: 100,
      ignored: [ '**/*.map' ],
      ignorePermissionErrors: true
    }
  );

  $.watch = Object.defineProperties($.watch, {
    has: {
      value (path: string, dir = $.cwd) {
        return $.watch._watched.has(dir)
          ? $.watch._watched.get(dir).items.has(path)
          : false;
      }
    },
    paths: {
      get () {
        return toArray($.watch.values());
      }
    },
    watching: {
      get () {
        return $.watch._watched;
      }
    }
  });

}

/**
 * Set Processors
 *
 * Merges processor defaults with defaults provided in configuration.
 */
function setProcessors () {

  if (has('processors', $.config) && isObject(process.config)) {

    for (const prop in $.config.processors) {

      if (isEmpty($.config.processors[prop])) continue;

      if (isArray($.config.processors[prop])) {
        $.processor[prop].config = $.config.processors[prop];
      } else if (isObject($.config.processors[prop])) {
        $.processor[prop].config = merge($.processor[prop].config, $.config.processors[prop]);
      }

    }
  }

};

/**
 * Set Plugins
 *
 * Sets and constructs the Syncify plugin model of all
 * plugins defined in the configuration.
 */
function setPlugins () {

  if (!has('plugins', $.config)) return;
  if (!isArray($.config.plugins)) return; // TODO: Throw error if not array

  for (const plugin of $.config.plugins) {

    if (has('onInit', plugin)) plugin.onInit.call({ ...$ }, $.config);

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
 * Get Config
 *
 * Resolves the `syncify.config.js` file or configuration
 * property contained in the _package.json_ file.
 */
async function getConfig (cli: Commands) {

  const cfg = await configFile(cli.cwd);

  if (cfg !== null) {

    $.config = cfg;

  } else {

    if (has('syncify', $.pkg)) {

      if (has('config', $.pkg.syncify)) {

        $.config = $.pkg.syncify.config;

      } else if (!has('stores', $.pkg.syncify)) {

        missingConfig(cli.cwd);

      }
    }
  }

};
