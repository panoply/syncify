import type { AxiosRequestConfig } from 'axios';
import { IPackage } from 'types';
import { readConfig, ConfigLoaderError } from '@web/config-loader';
import { has } from 'rambdax';
import { basename, extname } from 'path';
import { lastPath } from './paths';
import { isUndefined } from './native';

/**
 * Store Authorization URL
 *
 * Generate the the authorization URL to
 * be used for requests.
 */
export function authURL (domain: string, env: object): AxiosRequestConfig {

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
export function getModules (pkg: IPackage, name: string) {

  if (has('devDependencies', pkg)) {
    if (has(name, pkg.devDependencies)) return true;
  }

  if (has('dependencies', pkg)) {
    if (has(name, pkg.dependencies)) return true;
  }

  if (has('peerDependencies', pkg)) {
    if (has(name, pkg.peerDependencies)) return true;
  }

  if (has('optionalDependencies', pkg)) {
    if (has(name, pkg.peerDependencies)) return true;
  }

  return false;

};

/**
 * Read Config File
 *
 * Load the syncify config file for node projects.
 * Supports loading config as es module or common js module,
 */
export async function readConfigFile (path: string, customPath?: string, basedir?: string): Promise<any> {

  try {

    return readConfig(path, customPath, basedir);

  } catch (e) {

    if (e instanceof ConfigLoaderError) console.error(e.message);

    return null;

  }

};

export function renameFile (src: string, rename?: string) {

  let name = rename;

  // Get the filename (remember we flattened this earlier)
  const dir = lastPath(src).slice(1);

  // file input extension
  const ext = extname(src);

  // Get the filename (remember we flattened this earlier)
  const file = basename(src, ext);

  if (isUndefined(rename)) return { dir, ext, file, name: file + '.css' };

  if (/(\[dir\])/.test(name)) name = name.replace('[dir]', dir);
  if (/(\[file\])/.test(name)) name = name.replace('[file]', file);
  if (/(\[ext\])/.test(name)) name = name.replace('.[ext]', ext);

  return {
    ext,
    file,
    dir,
    name: rename.replace(rename, name) };
};
