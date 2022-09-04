/* eslint-disable no-unused-vars */

import type { Package } from 'types';
import type { AxiosRequestConfig } from 'axios';
import { basename, extname } from 'node:path';
import glob from 'fast-glob';
import { pathExists } from 'fs-extra';
import { anyTrue, has } from 'rambdax';
import { bundleRequire } from 'bundle-require';
import { lastPath, normalPath } from '~utils/paths';
import { isArray, isObject, isString, isUndefined, assign } from '~utils/native';
import { typeError, invalidError, unknownError, warnOption, throwError } from '~log/validate';
import { cyan } from '~cli/ansi';
import { CONFIG_FILE_EXT } from '~const';
import { bundle } from '~config';

const enum EnvType {
  /**
   * Using `.env` file
   */
  DOTENV = 1,
  /**
   * Using `process.env` variables
   */
  VARENV
}

/**
 * Store Authorization URL
 *
 * Generate the the authorization URL to
 * be used for requests.
 */
export function authURL (domain: string, env: object, type: EnvType): AxiosRequestConfig {

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

  if (type === EnvType.DOTENV) {
    throwError(`Invalid or missing ${cyan(domain + '.myshopify.com')} credentials`, [
      `Your shop credentials in the ${cyan.bold('.env')} file could`,
      'not be read correctly or are missing.'
    ]);
  } else if (type === EnvType.VARENV) {
    throwError(`Missing credentials for: ${cyan(domain + '.myshopify.com')}`, `
    You need to provide shop credentials within a ${cyan.bold('.env')} file.
    Please check you project setup and ensure you have correctly provided authorization.`);
  }

};

/**
 * Path Resovler
 *
 * Returns absolute paths and validates all provided URI
 * path locations. Before passing entries to this function,
 * it is assumed existence was confirmed.
 *
 * @param filePath The path we need to resolve
 */
export function getResolvedPaths (filePath: string | string[]) {

  const { cwd } = bundle;
  const warn = warnOption('URI Resolver');
  const path = normalPath(bundle.dirs.input); // Path normalizer

  if (isArray(filePath)) {

    const paths: string[] = [];

    for (const item of filePath) {
      const match = glob.sync(path(item), { cwd, absolute: true });
      if (match.length === 0) {
        warn('Path could not be resolved at', item);
      } else {
        paths.push(...match);
      }
    }

    return paths;

  }

  if (isString(filePath)) {

    const match = glob.sync(path(filePath), { cwd, absolute: true });

    if (match.length === 0) {
      warn('Path could not be resolved at', filePath);
      return null;
    } else {
      return match;
    }
  }

  typeError('uri', 'uri/path', filePath, 'string | string[]');

}

/**
 * Transform Schema
 *
 * Determines the transform schema which was provided.
 * Transform options can be provided in a multitude of
 * different formats, such as:
 *
 * - _string_ or _string[]_
 * - _object_ or _object[]_
 *
 * This function will handle and return a workable reference
 * from that which the user provided.
 */
export function getTransform <T extends unknown> (transforms: any, flatten = false): T {

  const config = [];

  for (const prop in transforms) {

    const o: any = { snippet: prop.startsWith('snippets/') };

    const asset = prop.startsWith('assets/');
    const option = transforms[prop];
    const isArr = isArray(option);
    const rename = (asset || o.snippet);

    if (isString(option) || (isArr && rename)) { // { 'assets/file': '...' | ['...'] }

      if (rename) o.rename = asset ? prop.slice(7) : prop.slice(9);

      if (isArr && !option.every(isString)) {
        typeError('transform', prop, option, 'string[]');
      }

      const paths = getResolvedPaths(option as string);

      if (paths) {
        if (flatten) {
          for (const input of paths) config.push(assign({}, o, { input }));
        } else {
          config.push(assign({}, o, { input: paths }));
        }
      }

    } else if (isObject(option)) { // { 'assets/file': {} }

      if (!has('input', option)) {
        invalidError('tranform', prop, option, '{ input: string | string[] }');
      }

      const paths = getResolvedPaths(option.input as string);

      if (paths) {

        const merge = rename
          ? assign({}, option, o, { rename: asset ? prop.slice(7) : prop.slice(9) })
          : assign({}, o, option);

        if (flatten) {
          for (const input of paths) config.push(assign(merge, { input }));
        } else {
          config.push(assign(merge, { input: paths }));
        }
      }

    } else if (isArray(option)) {

      if (option.every(isString)) {

        const paths = getResolvedPaths(option as string[]);

        if (paths) {
          if (flatten) {
            for (const input of paths) config.push(assign({}, o, option, { input }));
          } else {
            config.push(assign({}, o, option, { input: paths }));
          }
        }

      } else if (isObject(option[0])) { // check first item is an object

        for (const item of option) {

          if (!isObject(item)) {
            typeError('transform', prop, item, '{ input: string }');
          }

          if (!has('input', item)) {
            invalidError('tranform', prop, item, '{ input: string | string[] }');
          }

          const paths = getResolvedPaths(item.input as string | string[]);

          if (paths) {
            if (flatten) {
              for (const input of paths) config.push(assign({}, o, item, { input }));
            } else {
              config.push(assign({}, o, item, { input: paths }));
            }
          }
        }

      } else {
        typeError('transform', prop, option, 'string[] | object[]');
      }

    }

  }

  return config as T;

};

/**
 * Get Required modules
 *
 * Ensures that peer dependencies exists for
 * the transform processors.
 */
export function getModules (pkg: Package, name: string) {

  return anyTrue(
    (has('devDependencies', pkg) && has(name, pkg.devDependencies)),
    (has('dependencies', pkg) && has(name, pkg.dependencies)),
    (has('peerDependencies', pkg) && has(name, pkg.peerDependencies)),
    (has('optionalDependencies', pkg) && has(name, pkg.peerDependencies))
  );

};

export async function getConfigFilePath (filename: string): Promise<string> {

  for (const ext of CONFIG_FILE_EXT) {

    const filepath = `${filename}.${ext}`;
    const fileExists = await pathExists(filepath);

    if (fileExists) return filepath;

  }

  return null;

};

/**
 * Read Config File
 *
 * Load the syncify config file for node projects.
 * Supports loading config as es module or common js module,
 */
export async function readConfigFile <T> (filename: string): Promise<{ config: T; path: string; }> {

  try {

    const path = await getConfigFilePath(filename);

    if (path !== null) {

      const config = await bundleRequire({ filepath: path });

      return {
        path,
        config: config.mod.syncify || config.mod.default || config.mod
      };
    }

    return null;

  } catch (e) {

    return null;

  }

};

/**
 * Rename File
 *
 * String parser for file renaming. Uses the common braced
 * reference structures find in most bundlers.
 */
export function renameFile (src: string, rename?: string) {

  let name = rename;

  // Get the filename (remember we flattened this earlier)
  const dir = lastPath(src);

  // file input extension
  const ext = extname(src);

  // Get the filename (remember we flattened this earlier)
  const file = basename(src, ext);

  if (isUndefined(rename)) return { dir, ext, file, name: file };

  if (/(\[dir\])/.test(name)) name = name.replace('[dir]', dir);
  if (/(\[file\])/.test(name)) name = name.replace('[file]', file);
  if (/(\[ext\])/.test(name)) name = name.replace('.[ext]', ext);

  return {
    ext,
    file,
    dir,
    name: rename.replace(rename, name)
  };
};
