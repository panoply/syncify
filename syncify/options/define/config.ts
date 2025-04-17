import type { Config, Tsconfig } from 'types';

import { extname, join } from 'node:path';

import { pathExists, readFile } from 'fs-extra';

import { acquire } from '@syncify/acquire';
import { bold, Create, yellowBright } from '@syncify/ansi';
import { parse } from '@syncify/json';
import { kill } from '@syncify/kill';

import { JS_TS_CONFIGS, SYNCIFY_CONFIG } from '~const';
import { error } from '~errors';
import { event } from '~events';
import { Configure } from '~options/configure';
import { parseSyncifyConfig } from '~process/files';
import { has, hasPath, isEmpty } from '~utils';

import { $ } from '$';

/**
 * Parse tsconfig.json / jsconfig.json
 *
 * Resolves `tsconfig.json` or `jsconfig.json` files for usage
 * with _script_ transforms and esbuild to support different
 * capabilities like path aliases.
 */
export async function getTSConfig (): Promise<Tsconfig> {

  for (const file of JS_TS_CONFIGS) {
    const uri = join($.cwd, file);
    if (await pathExists(uri)) {
      $.file.tsconfig = uri;
      break;
    }
  }

  if ($.file.tsconfig === null && $.cwd !== $.dirs.config) {
    for (const file of JS_TS_CONFIGS) {
      const uri = join($.dirs.config, file);
      if (await pathExists(uri)) {
        $.file.tsconfig = uri;
        break;
      }
    }
  }

  if ($.file.tsconfig === null) return undefined;

  try {

    const file = await readFile($.file.tsconfig, 'utf8');
    const config = parse<Tsconfig>(file);

    return config;

  } catch (e) {

    throw error.json(e, $.file.tsconfig);

  }

};

/**
 * Config Files
 *
 * Looks for syncify configuration files within
 * the users project. Looks for a `syncify.config.js`
 * file, if one does not exists it will look for a
 * `syncify.config.json` file, if none found, returns `null`.
 *
 * > When `null` is returned, the `package.json` file is assumed to contain configuration requirements.
 */
export async function getConfigFile (): Promise<Config> {

  if ($.project.syncifyConfig !== null) {
    if (await pathExists($.project.syncifyConfig)) {
      $.file.config = $.project.syncifyConfig;
    } else {
      $.file.config = null;
    }
  }

  if ($.file.config === null) {

    for (const file of SYNCIFY_CONFIG) {

      const path = join($.cwd, file);

      if (await pathExists(path)) {
        $.file.config = path;
        $.project.syncifyConfig = path;
        break;
      }
    }

    if ($.pkg !== null) {
      if (hasPath('syncify.config', $.pkg) && !isEmpty($.pkg.syncify.config)) {
        $.file.config = $.file.pkg;
        $.project.syncifyConfig = $.file.pkg;
        return $.pkg.syncify.config;
      }
    }

    return null;

  }

  if (extname($.file.config) === '.json') {

    try {
      const json = await readFile($.file.config, 'utf8');
      return parse<Config>(json);
    } catch (e) {
      throw error.json(e, $.file.config);
    }

  } else {

    const tsconfig = await getTSConfig();

    try {

      const config = await acquire<Config>({
        named: 'syncify',
        file: $.file.config,
        cwd: $.cwd,
        tsconfig,
        type: has('type', $.pkg) ? $.pkg.type : 'commonjs',
        onRebuild: $.mode.watch ? (bundle: Config) => {

          $.config = bundle; // rebuild configuration file
          $.running && event.emit('restart', Configure);

        } : undefined,
        onError: (errors) => {

          const file = parseSyncifyConfig($.file.config);

          Create({ type: 'error' })
          .Append('ERROR IN SYNCIFY CONFIG', bold)
          .Wrap(`The ${yellowBright.bold(file.base)} file could not be processed.`)
          .toLog({ clear: true });

          error.esbuild(file, errors);

        }

      });

      kill(async () => await acquire.dispose('syncify'));

      return config;

    } catch (e) {

      throw error.acquire(e);

    }

  }

};

/**
 * Get Config
 *
 * Resolves the `syncify.config.js` file or configuration
 * property contained in the _package.json_ file.
 */
export async function getConfig () {

  if ($.running) return;

  const settings = await getConfigFile();

  if (settings !== null) $.config = settings;

};
