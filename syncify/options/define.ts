import type { Config } from 'types';
import type { Commands } from 'types/internal';
import { FSWatcher } from 'chokidar';
import { missingConfig } from 'syncify:log/throws';
import { configFile, getEnvFile, getPackageJson } from './files';
import { setImportDirs, setThemeDirs, setCacheDirs, setHomeDirs } from './dirs';
import { setJsonOptions } from './json';
import { setSectionOptions } from './sections';
import { setSync } from './sync';
import { setPaths } from './paths';
import { setVersion } from './version';
import { setSpawns } from './spawn';
import { setScriptOptions } from './script';
import { setStyleConfig } from './style';
import { setLiquidOptions } from './liquid';
import { setSvgOptions } from './svg';
import { setHotReloads } from './hot';
import { setFilters } from './filters';
import { isArray, has, isObject, isEmpty, merge } from 'syncify:utils';
import { defineProperties, toArray } from 'syncify:native';
import { cacheDone, getCache } from '../process/cache';
import { setPublishConfig } from './publish';
import { timer } from 'syncify:timer';
import { $ } from 'syncify:state';
import * as log from 'syncify:log';
import * as error from 'syncify:errors';
import { LaunchChrome } from 'syncify:hot/launch';

/**
 * Define Configs
 *
 * Required config loading
 */
export async function configs () {

  await getPackageJson();
  await getConfig();

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

  await getEnvFile();
  await getPackageJson();
  await getConfig();
  await getCache();

  if ($.mode.setup || $.mode.strap || $.mode.themes) return;

  process.env.SYNCIFY_ENV = $.env.dev ? 'dev' : 'prod';
  process.env.SYNCIFY_WATCH = String($.mode.watch);

  setVersion(cli);
  setFilters(cli);

  log.runtime.modes($);

  await setSync(cli);

  if ($.mode.themes) return;

  setChokidar();
  setProcessors();
  setPublishConfig();
  setSpawns();

  await Promise.all(
    [
      setHomeDirs(),
      setCacheDirs(),
      setThemeDirs(),
      setImportDirs(),
      setPaths()
    ]
  ).catch(e => {

    error.throws(e, { details: 'Directory and path generation error' });

  });

  if ($.mode.themes) return;

  setJsonOptions();
  setLiquidOptions();
  setPlugins();

  if (!$.mode.build) log.runtime.stores($);

  await setSectionOptions();
  await setScriptOptions();
  await setSvgOptions();
  await setStyleConfig();

  const promise = await Promise.all(
    [
      setHotReloads(),
      cacheDone()
    ]
  ).catch(e => {

    error.throws(e, { details: 'Runtime error' });

  });

  log.runtime.warnings($);

  if (!$.mode.build) log.runtime.time();

  await LaunchChrome().catch(err => {
    console.error(err);
    process.exit(1);
  });

  return promise;

};

/**
 * Set Chokidar
 *
 * Creates an instance of chodkidar FSWatcher, we will assign watch paths
 * during the initialization process that executes in directly after this.
 */
export function setChokidar () {

  if (!($.cmd.watch || $.cmd.upload)) return;

  // @ts-ignore
  $.watch = new FSWatcher({
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 75,
    binaryInterval: 100,
    ignored: [ '*.map' ],
    ignorePermissionErrors: true
  });

  $.watch = defineProperties($.watch, {
    has: {
      value (path: string, dir = $.cwd) {
        return $.watch._watched.has(dir)
          ? $.watch._watched.get(dir).items.has(path)
          : false;
      }
    },
    paths: {
      get () {
        return toArray(this._closers.keys());
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

      if (isEmpty($.config.processors[prop])) {
        continue;
      }

      if (isArray($.config.processors[prop])) {

        $.processor[prop].config = $.config.processors[prop];

      } else if (isObject($.config.processors[prop])) {

        if (prop === 'esbuild') {
          $.processor[prop] = merge($.processor[prop], $.config.processors[prop] as any);
        } else {
          $.processor[prop].config = merge($.processor[prop].config, $.config.processors[prop]);
        }

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
async function getConfig () {

  const config = await configFile();

  if (config !== null) {

    $.config = config;

  } else if (has('syncify', $.pkg)) {

    if (has('config', $.pkg.syncify)) {

      $.config = $.pkg.syncify.config;

    } else if (!has('stores', $.pkg.syncify) && $.cmd.setup === false && !$.cmd.strap) {

      missingConfig($.cwd);

    }
  }

};
