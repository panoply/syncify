import { has, last } from 'rambdax';
import { IPackage } from 'types';
import { join, basename, extname } from 'path';
import { is, isArray, isString, isUndefined } from 'shared/native';
import { bold } from 'cli/colors';
import { AxiosRequestConfig } from 'axios';

/**
 * Environment
 *
 * This is a helper utility used to determine the
 * current environment Syncify is running within.
 *
 * > This function is exposed in the distribution bundle.
 */
export const env = (value: 'prod' | 'dev') => process.env.SYNCIFY_ENV === value;

/**
 * To Upcase
 *
 * Will captilalize the first letter of a string. Used
 * by the console for names and various other informatives.
 */
export const toUpcase = <T extends string> (value: T) => value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Last Path
 *
 * Will return the portion of a URI path. If
 * the path does not not contain forward slashes it
 * returns the passed string.
 */
export const lastPath = (path: string | string[]) => {

  if (isArray(path)) return path.map(lastPath);

  return is(path.indexOf('/'), -1)
    ? path
    : path.match(/[^/]+(?:\/$|$)/)[0];

};

/**
 * Parent Path
 *
 * Will return the parent path of a URL, ie: that of which
 * omits the file name. Omits any glob patterns.
 */
export const parentPath = (path: string | string[]) => {

  if (isArray(path)) return path.map(parentPath);

  const last = path.lastIndexOf('/');

  if (is(last, -1)) return path;

  const glob = path.indexOf('*');

  return is(glob, -1) ? path.slice(0, last) : path.slice(0, glob);

};

/**
 * Normalize path
 *
 * Resolve CWD to a path definition. Returns a function type
 * who accepts a string. Paths will include the directory
 * `input` folder name.
 */
export const normalPath = (input: string) => {

  const regex = new RegExp(`^\\.?\\/?${input}\\/`);

  return function prepend (path: string | string[]) {

    if (isArray(path)) return path.map(prepend);

    const ignore = is(path.charCodeAt(0), 33);

    if (ignore) path = path.slice(1);
    if (regex.test(path)) return ignore ? '!' + path : path;

    if (
      is(path.charCodeAt(0), 46) &&
      is(path.charCodeAt(1), 46) &&
      is(path.charCodeAt(2), 47)
    ) {
      throw new Error('Invalid path at: ' + path + ' - Paths must be relative to source');
    }

    return (ignore ? '!' : '') + join(input, path);

  };
};

export const basePath = (cwd: string) => (path: string) => {

  // path directory starts with . character
  if (is(path.charCodeAt(0), 46)) {

    // path define is root (dot)
    if (is(path.length, 1)) return cwd + '/';

    // path directory next character is not forard slash
    // for example, ".folder" this will be invalid
    if (is(path.charCodeAt(1), 47)) {
      path = path.slice(1);
    } else {
      console.error('Directory path is invalid at: "' + path + '"');
      process.exit(1);
    }

  }

  // path directory starts with / character
  if (is(path.charCodeAt(0), 47)) path = path.slice(1);

  // path directory is valid, eg: path
  // dirs cannot reference sub directorys, eg: path/sub
  if (/^[a-zA-Z0-9_-]+/.test(path)) {
    path = join(cwd, path);
    return is(last(path).charCodeAt(0), 47) ? path : path + '/';
  } else {
    throw new Error('Directory path is invalid at: "' + path + '"');
  }
};

export const renameFile = (src: string, rename?: string) => {

  // Get the filename (remember we flattened this earlier)
  const dir = parentPath(src);

  // file input extension
  const ext = extname(src);

  // Get the filename (remember we flattened this earlier)
  const file = basename(src, ext);

  if (isUndefined(rename)) {
    return {
      dir,
      ext,
      file,
      newName: file + '.css'
    };
  }

  if (/({dir})/.test(rename)) {
    rename = rename.replace('{dir}', dir);
  }

  if (/({file})/.test(rename)) {
    rename = rename.replace('{file}', file);
  }

  if (/({ext})/.test(rename)) {
    rename = rename.replace('.{ext}', ext);
  }

  return {
    ext,
    file,
    dir,
    newName: rename

  };
};

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
 * Returns the byte size of a string value
 */
export const byteSize = (string: string | Buffer): number => {

  return isString(string)
    ? Buffer.from(string).toString().length
    : string.toString().length;

};

/**
 * Converts byte size to killobyte, megabyre,
 * gigabyte or terrabyte
 */
export const byteConvert = (bytes: number): string => {

  if (bytes === 0) return '0b';

  const size = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  const unit = [ 'b', 'kb', 'mb', 'gb', 'tb' ];

  return size === 0
    ? `${bold(String(bytes))}${unit[size]}`
    : `${bold((bytes / 1024 ** size).toFixed(1))}${unit[size]}`;
};

export const convertTimer = (ms: number) => {
  const m = Math.floor(ms / 60000);
  const s = ((ms % 60000) / 1000).toFixed(0);
  return m > 0 ? (m + 'min' + (Number(s) < 10 ? '0' : '') + s) : s;
};

/**
 * Get Required modules
 *
 * Ensures that peer dependencies exists for
 * the transform processors.
 */
export const getModules = (pkg: IPackage, name: string) => {

  if (has('devDependencies', pkg)) {
    if (has(name, pkg.devDependencies)) return true;
  }

  if (has('peerDependencies', pkg)) {
    if (has(name, pkg.peerDependencies)) return true;
  }

  if (has('dependencies', pkg)) {
    if (has(name, pkg.dependencies)) return true;
  }

  return false;

};
/**
 * Ignored files and/or directories

export const redirects = /^(\/[\w-]+)\s*:\s*((?:https?:\/\/(?:w{3})?)?\/?[/\w_.-]*)$/gm;
export function ignore (settings: ICLIOptions, ignored = {
  count: 0,
  files: null,
  log: null,
  base: /[/\\]\./
}) {

  if (settings.ignore && settings.forceIgnore) {

    ignored.count = settings.ignore.length;
    ignored.log = settings.ignore.join(white('\n\t - '));

    // @ts-ignore
    settings.ignore.push(ignored.base);

    ignored.files = settings.ignore;
  }

  return { settings, ignored };

} */
