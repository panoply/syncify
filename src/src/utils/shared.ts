import { has } from 'rambdax';
import { IPackage } from 'types';
import { basename, extname } from 'path';
import { isString, isUndefined } from 'shared/native';
import { bold } from 'cli/colors';
import { lastPath } from './paths';

/**
 * To Upcase
 *
 * Will captilalize the first letter of a string. Used
 * by the console for names and various other informatives.
 */
export const toUpcase = <T extends string> (value: T) => {

  return value.charAt(0).toUpperCase() + value.slice(1);

};

export const renameFile = (src: string, rename?: string) => {

  let name = rename;

  // Get the filename (remember we flattened this earlier)
  const dir = lastPath(src);

  // file input extension
  const ext = extname(src);

  // Get the filename (remember we flattened this earlier)
  const file = basename(src, ext);

  if (isUndefined(rename)) return { dir, ext, file, name: file };

  if (/({dir})/.test(rename)) name = name.replace('{dir}', dir);
  if (/({file})/.test(rename)) name = name.replace('{file}', file);
  if (/({ext})/.test(rename)) name = name.replace('.{ext}', ext);

  return { ext, file, dir, name };
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
