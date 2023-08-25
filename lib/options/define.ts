import type { Commands, Config, WatchBundle } from 'types';
import { join } from 'pathe';
import { has } from 'rambdax';
import { FSWatcher } from 'chokidar';
import { pathExists, readJSON } from 'fs-extra';
import { missingConfig } from '~options/validate';
import { configFile, getPackageJson } from '~options/files';
import { setCacheDirs, setImportDirs, setThemeDirs, setBaseDirs } from '~options/dirs';
import { setJsonOptions } from '~options/json';
import { setModes } from '~options/modes';
import { setSnippetOptions } from '~options/snippets';
import { setSectionOptions } from '~options/sections';
import { setStores } from '~options/stores';
import { setPaths } from '~options/paths';
import { setSpawns } from '~options/spawn';
import { setScriptOptions } from '~options/script';
import { setStyleConfig } from '~options/style';
import { setSvgOptions } from '~options/svgs';
import { setHotReloads } from '~options/hot';
import { setFilters } from '~options/filters';
import { setMinifyOptions } from '~options/terser';
import { log } from '~log';
import { $ } from '~state';
import * as u from '~utils/native';

/**
 * Resolve Paths
 *
 * Resolves `package.json` file and the `.env`
 * file locations relative to the current working
 * directory.
 */
export async function define (cli: Commands, _options?: Config) {

  log.clear();

  await getPackageJson(cli.cwd);
  await getConfig(cli);

  // @ts-expect-error
  $.version = VERSION;
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
    setThemeDirs($.dirs.output),
    setImportDirs(),
    setStores(cli, config),
    setPaths(config),
    setFilters(cli),
    setProcessors(config),
    setSectionOptions(config),
    setSnippetOptions(config),
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

  if (!watch) {

    $.watch = new Set() as any;

  } else {

    $.watch = new FSWatcher({
      persistent: true,
      ignoreInitial: true,
      usePolling: true,
      interval: 75,
      binaryInterval: 100,
      ignored: [ '**/*.map' ],
      ignorePermissionErrors: true
    });

    Object.defineProperties($.watch, {
      has: {
        value (path: string, dir = cwd) {
          return ($.watch as WatchBundle)._watched.get(dir).items.has(path);
        }
      },
      paths: {
        get () {
          return u.toArray($.watch.values());
        }
      },
      watching: {
        get () {
          return ($.watch as WatchBundle)._watched;
        }
      }
    });
  }
}

/**
 * Set Processors
 *
 * Merges processor defaults with defaults provided in configuration.
 */
function setProcessors (config: Config) {

  for (const prop in config.processors) {
    $.processor[prop].config = u.isArray(config.processors[prop])
      ? config.processors[prop]
      : u.assign($.processor[prop].config, config.processors[prop]);
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
  if (!u.isArray(config.plugins)) return; // TODO: Throw error if not array

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

  const dir = join(cwd, 'node_modules/.syncify');
  const uri = join(dir, 'build.json');
  const has = await pathExists(uri);

  if (!has) return setCacheDirs(dir);

  $.cache = await readJSON(uri);

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
