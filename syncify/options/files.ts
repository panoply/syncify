import type { Config, ENV, Tsconfig, PKGSyncify, PKG } from 'types';
import dotenv from 'dotenv';
import { join, relative, basename, extname } from 'node:path';
import { pathExists, readFile, readJson } from 'fs-extra';
import stripJsonComments from 'strip-json-comments';
import { bundleRequire } from 'syncify:requests/require';
import { isArray, isEmpty, isObject, jsonc } from 'syncify:utils';
import { keys } from 'syncify:native';
import { throws } from 'syncify:log/errors';
import { $ } from 'syncify:state';
import { missingEnv, missingStores } from 'syncify:log/throws';
import { hasPath, has } from 'rambdax';
import { SYNCIFY_CONFIG } from 'syncify:const';
import PackageJson from '@npmcli/package-json';
import { PartialDeep } from 'type-fest';

/**
 * Config Files
 *
 * Looks for syncify configuration files within
 * the users project. Looks for a `syncify.config.js`
 * file, if one does not exists it will look for a
 * `syncify.config.json` file, if none found, returns `null`.
 *
 * > When `null` is returned, the `package.json` file is
 * assumed to contain configuration requirements.
 */
export async function configFile (): Promise<Config> {

  let path: string = null;

  for (const file of SYNCIFY_CONFIG) {

    path = join($.cwd, file);

    const exists = await pathExists(path);

    if (exists) break;

    path = null;

  }

  if (path === null) return null;

  try {

    if (extname(path) === '.json') {

      $.file.path = path;
      $.file.relative = relative($.cwd, path);
      $.file.base = basename(path);

      const json = await readFile(path);

      return jsonc<Config>(json.toString());

    } else {

      $.file.path = path;
      $.file.relative = relative($.cwd, path);
      $.file.base = basename(path);

      const config = await bundleRequire({
        cwd: $.cwd,
        filepath: path
      });

      return config.mod.syncify || config.mod.default || config.mod;

    }

  } catch (e) {

    const jsonconfig = join($.cwd, 'syncify.config.json');
    const hasFile = await pathExists(jsonconfig);

    if (hasFile) return readJson(jsonconfig);

    return null;

  }

};

/**
 * Parse tsconfig.json / jsconfig.json
 *
 * Resolves `tsconfig.json` or `jsconfig.json` files for usage
 * with _script_ transforms and esbuild to support different
 * capabilities like path aliases.
 */
export async function getTSConfig (): Promise<Tsconfig> {

  let uri: string;

  // Save path reference of package
  uri = join($.cwd, 'tsconfig.json');

  const tsconfig = await pathExists(uri);

  if (!tsconfig) {
    uri = join($.cwd, 'jsconfig.json');
    const jsconfig = await pathExists(uri);
    if (!jsconfig) return null;
  }

  try {

    const file = await readFile(uri);
    const config = stripJsonComments(file.toString());

    return JSON.parse(config);

  } catch (e) {

    throw new Error(e);

  }

};

/**
 * Set `"syncify": {}` reference in Package.json
 *
 * This is a fallback workaround in situations where an `.env` file exists
 * and has containing store references, but no stores have been defined within
 * the users package.json file.
 */
export async function setPackageSyncify (pkg: PKG = $.pkg) {

  const syncify: PartialDeep<PKGSyncify> = has('syncify', pkg) ? pkg.syncify : {};

  // Lets attempt to write stores within package.json based on the .env values
  if ($.env.file !== null && isEmpty($.env.vars) === false) {

    const props = keys($.env.vars);
    const stores = has('stores', syncify) ? isArray(syncify.stores) ? syncify.stores : [ syncify.stores ] : [];

    for (const name of props) {

      const match = name.match(/^([a-zA-Z0-9-]+)_api_(token|key)$/);

      if (match !== null) {

        if (stores.some(({ domain }) => domain === `${match[1]}.myshopify.com`)) continue;

        if (match[2] === 'token') {

          // value is _api_token, we will assume Shopify reference
          stores.push({ domain: match[1], themes: {} });

        } else if (match[2] === 'key' && has(`${match[1]}_api_secret`, $.env.vars)) {

          // when value is _api_key we can confirm shopify reference by checking for secret
          stores.push({ domain: match[1], themes: {} });

        }
      }
    }

    if (stores.length > 0) {

      $.package.update({
        syncify: {
          stores: stores.length > 1 ? stores : stores[0]
        }
      });

      await $.package.save();

      return true;

    }

  }

  return false;
}

/**
 * Set Package.json File
 *
 * Resolves `package.json` file. This is triggered at runtime, the
 * module requires the existence of a `package.json` file. This
 * function will also assign `$.stores[]` reference.
 */
export async function getPackageJson () {

  const has = await pathExists(join($.cwd, 'package.json'));
  if (!has) throw new Error('Missing "package.json" file');

  try {

    $.package = await PackageJson.load($.cwd);

    const pkg = $.pkg;

    if (hasPath('syncify.stores', pkg)) {

      if (isArray(pkg.syncify.stores)) {
        $.stores = pkg.syncify.stores;
      } else if (isObject(pkg.syncify.stores) && isEmpty(pkg.syncify.stores) === false) {
        $.stores = [ pkg.syncify.stores ];
      }

    } else if (!$.cmd.strap && $.cmd.mode !== 'setup') {

      const hasReference = await setPackageSyncify();

      if (hasReference) {

        return getPackageJson();

      } else {

        missingStores($.cwd);

      }

    }

  } catch (e) {

    throw new Error(e);

  }

};

/**
 * Set Package.json Version
 *
 * Resolves `package.json` file and overwrites the
 * version number, while preserving the JSON indentation.
 * Applies a reparse following the write, updating the the state `$.pkg` reference.
 */
export async function setPkgVersion (current: string, version: string) {

  try {

    if ($.pkg.version === version) {

      $.package.update({ version });

      await $.package.save();

      return true;

    } else {

      return false;

    }

  } catch (e) {

    throw new Error(e);
  }

};

/**
 * Read rcfile
 *
 * Looks for the existence of a `.env.syncify` or
 * `.env.syncify.json` file. This file can optionally
 * include credential information.
 */
export async function getEnvFile (): Promise<ENV.RCFile> {

  const path = join($.cwd, '.env');

  if (await pathExists(path)) {

    const env = dotenv.config({ path });

    if (env.error) {
      throws(env.error, { path });
      return null;
    }

    $.env.file = path;
    $.env.vars = env.parsed;

  } else {

    if ($.cmd.mode !== 'setup') {

      missingEnv($.cwd);

    }

  }

};
