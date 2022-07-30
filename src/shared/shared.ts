import { bold } from 'cli/colors';
import { isString } from './native';

/**
 * To Upcase
 *
 * Will captilalize the first letter of a string. Used
 * by the console for names and various other informatives.
 */
export const toUpcase = <T extends string> (value: T) => {

  return value.charAt(0).toUpperCase() + value.slice(1);

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

export const getTime = () => {

  const now = new Date();

  return (now.getDate() +
  '-' +
  (((now.getMonth() + 1) < 10) ? ('0' + (now.getMonth() + 1)) : ((now.getMonth() + 1))) +
  '-' +
  now.getFullYear() + ' ' +
  now.getHours() + ':' +
  ((now.getMinutes() < 10) ? ('0' + now.getMinutes()) : (now.getMinutes())) +
  ':' +
  ((now.getSeconds() < 10) ? ('0' + now.getSeconds()) : (now.getSeconds())));
};

/**
 * Returns the byte size of a string value
 */
export const getSize = (string: string | Buffer): number => {

  return isString(string)
    ? Buffer.from(string).toString().length
    : string.toString().length;

};
