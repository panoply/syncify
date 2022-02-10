import { has } from 'rambdax';
import { IConfig, IPackage } from 'types';
import { join } from 'path';
import { is, isArray, isString } from 'shared/native';
import { bold } from 'cli/colors';
import { pathExists } from 'fs-extra';

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
export const lastPath = (path: string) => is(path.indexOf('/'), -1) ? path : path.match(/[^/]+(?:\/$|$)/)[0];

/**
 * Parent Path
 *
 * Will return the parent path of a URL, ie: that of which
 * omits the file name. Omits any glob patterns.
 */
export const parentPath = (path: string) => {

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

/**
 * Load module
 */
export const loadModule = (moduleId: string) => {

  try {

    return require(moduleId);

  } catch {

    // Ignore error
  }

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

/**
 * Get Configs
 *
 * Returns path locations of config files like
 * postcss.config.js and svgo.config.js.
 */
export const getConfigs = async (config: IConfig, files: string[]) => {

  const file = files.shift();

  const path = (file.endsWith('.yaml') || file.endsWith('.yml'))
    ? join(config.cwd, file)
    : join(config.cwd, config.config, file);

  const exists = await pathExists(path);

  if (exists) return path;
  if (is(file.length, 0)) return null;

  return getConfigs(config, files);

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
