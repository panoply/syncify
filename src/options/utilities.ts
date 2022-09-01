/* eslint-disable no-unused-vars */

import type { Package } from 'types';
import type { AxiosRequestConfig } from 'axios';
import { pathExists } from 'fs-extra';
import { has } from 'rambdax';
import glob from 'glob';
import { basename, extname } from 'node:path';
import { bundleRequire } from 'bundle-require';
import { lastPath, normalPath } from 'src/utils/paths';
import { isArray, isObject, isString, isUndefined, assign } from 'src/utils/native';
import { typeError, invalidError, unknownError, warnOption } from '~log/validate';
import { bundle } from '~config';

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

  const warn = warnOption('URI Resolver');
  const { cwd } = bundle;
  const path = normalPath(bundle.config.input); // Path normalizer

  if (isArray(filePath)) {
    return filePath.flatMap((item) => {
      const match = glob.sync(path(item), { cwd, realpath: true });
      if (match.length === 0) {
        warn('Path could not be resolved at', item);
        return null;
      } else {
        return match;
      }
    });
  }

  if (isString(filePath)) {
    const match = glob.sync(path(filePath), { cwd, realpath: true });
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
      if (isArr && !option.every(isString)) typeError('transform', prop, option, 'string[]');

      const paths = getResolvedPaths(option as string);

      if (paths) {
        if (flatten) {
          for (const input of paths) config.push(assign({}, o, { input }));
        } else {
          config.push(assign({}, o, { input: paths }));
        }
      }

    } else if (isObject(option)) { // { 'assets/file': {} }

      if (!has('input', option)) invalidError('tranform', prop, option, '{ input: string | string[] }');

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

          if (!isObject(item)) typeError('transform', prop, item, '{ input: string }');
          if (!has('input', item)) invalidError('tranform', prop, item, '{ input: string | string[] }');

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
 * Store Authorization URL
 *
 * Generate the the authorization URL to
 * be used for requests.
 */
export const authURL = (domain: string, env: object): AxiosRequestConfig => {

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

  throw new Error(`Missing "${domain}" credentials`);

};

/**
 * Get Required modules
 *
 * Ensures that peer dependencies exists for
 * the transform processors.
 */
export const getModules = (pkg: Package, name: string) => {

  if (has('devDependencies', pkg) && has(name, pkg.devDependencies)) return true;
  if (has('dependencies', pkg) && has(name, pkg.dependencies)) return true;
  if (has('peerDependencies', pkg) && has(name, pkg.peerDependencies)) return true;
  if (has('optionalDependencies', pkg) && has(name, pkg.peerDependencies)) return true;

  return false;

};

export const getConfigFilePath = async (filename: string): Promise<string> => {

  for (const ext of [ 'js', 'cjs', 'mjs' ]) {

    const filepath = `${filename}.${ext}`;
    const fileExists = await pathExists(`${filepath}.${ext}`);

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
export const readConfigFile = async <T>(filename: string): Promise<{ config: T; path: string; }> => {

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
export const renameFile = (src: string, rename?: string) => {

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
    name: rename.replace(rename, name) };
};
