import { has } from 'rambdax';
import { IRequest } from 'types';
import { join } from 'path';
import { is, isArray, isString } from 'shared/native';

/**
 * Environment
 *
 * This is a helper utility used to determine the
 * current environment Syncify is running within.
 *
 * > This function is exposed in the distribution bundle.
 */
export function env (value: 'prod' | 'dev') {

  return process.env.SYNCIFY_ENV === value;

}

/**
 * To Upcase
 *
 * Will captilalize the first letter of a string. Used
 * by the console for names and various other informatives.
 */
export function toUpcase <T extends string> (value: T) {

  return value.charAt(0).toUpperCase() + value.slice(1);

}

/**
 * Last Path
 *
 * Will return the portion of a URI path. If
 * the path does not not contain forward slashes it
 * returns the passed string.
 */
export function lastPath (path: string) {

  return is(path.indexOf('/'), -1) ? path : path.match(/[^/]+(?:\/$|$)/)[0];
}

/**
 * Parent Path
 *
 * Will return the parent path of a URL, ie: that of which
 * omits the file name. Omits any glob patterns.
 */
export function parentPath (path: string) {

  const last = path.lastIndexOf('/');

  if (is(last, -1)) return path;

  const glob = path.indexOf('*');

  return is(glob, -1) ? path.slice(0, last) : path.slice(0, glob);

}

/**
 * Normalize path
 *
 * Resolve CWD to a path definition. Returns a function type
 * who accepts a string. Paths will include the directory
 * `input` folder name.
 */
export function normalPath (input: string) {

  const regex = new RegExp(`^\\.?\\/?${input}\\/`);

  return function prepend (path: string | string[]) {

    if (isArray(path)) return path.map(prepend);

    let ignore: boolean = false;

    if (is(path.charCodeAt(0), 33)) {
      ignore = true;
      path = path.slice(1);
    }

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
}

/**
 * Load module
 */
export function loadModule (moduleId: string) {

  try {

    return require(moduleId);

  } catch {

    // Ignore error
  }

}

/**
 * Get the asset key reference (used for logs)
 */
export function getAssetKey (config: IRequest) {

  switch (config.method) {
    case 'put':
    case 'post':

      if (has('metafield', config.data)) {
        return (config.data as { metafield: any }).metafield.key;
      } else if (has('asset', config.data)) {
        return (config.data as { asset: any }).asset.key;
      }

      break;

    case 'delete':

      return config.params['asset[key]'];

  }

}

/**
 * Returns the byte size of a string value
 */
export function byteSize (string: string | Buffer): number {

  return isString(string) ? Buffer.from(string).toString().length : string.toString().length;

}

/**
 * Converts byte size to killobyte, megabyre,
 * gigabyte or terrabyte
 */
export function byteConvert (bytes: number): string {

  if (bytes === 0) return '0 bytes';

  const size = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  const unit = [ 'bytes', 'kb', 'mb', 'gb', 'tb' ];

  return size === 0
    ? `${bytes}${unit[size]}`
    : `${(bytes / 1024 ** size).toFixed(1)} ${unit[size]}`;
}
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
