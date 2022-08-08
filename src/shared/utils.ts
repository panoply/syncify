import stringify from 'fast-safe-stringify';
import { bold, gray } from '../cli/ansi';
import { isString, isBuffer, isArray, isObject } from './native';

/**
 * Sanitize Message
 *
 * Sanatizes the log message passed
 */
export function sanitize (message: string) {

  if (isBuffer(message)) return message.toString();
  if (isObject(message) || isArray(message)) return stringify(message);

  return String(message);

};

/**
 * To Upcase
 *
 * Will captilalize the first letter of a string. Used
 * by the console for names and various other informatives.
 */
export function toUpcase <T extends string> (value: T) {

  return value.charAt(0).toUpperCase() + value.slice(1);

};

/**
 * Returns the byte size of a string value
 */
export function byteSize (string: string | Buffer): number {

  return isString(string)
    ? Buffer.from(string).toString().length
    : string.toString().length;

};

/**
 * Converts byte size to killobyte, megabyre,
 * gigabyte or terrabyte
 */
export function byteConvert (bytes: number): string {

  if (bytes === 0) return '0b';

  const size = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  const unit = [ 'b', 'kb', 'mb', 'gb', 'tb' ];

  return size === 0
    ? `${bold(String(bytes))}${unit[size]}`
    : `${bold((bytes / 1024 ** size).toFixed(1))}${unit[size]}`;
};

/**
 * Converts Time
 */
export function convertTimer (ms: number) {
  const m = Math.floor(ms / 60000);
  const s = ((ms % 60000) / 1000).toFixed(0);
  return m > 0 ? (m + 'min' + (Number(s) < 10 ? '0' : '') + s) : s;
};

/**
 * Return the current time/date
 *
 * Example:
 *
 * ```
 * 01:59:20
 * ```
 */
export function getTime () {

  const now = new Date();

  return gray(
    ((now.getHours() < 10) ? ('0' + now.getHours()) : (now.getHours())) +
    gray(':') +
    ((now.getMinutes() < 10) ? ('0' + now.getMinutes()) : (now.getMinutes())) +
    gray(':') +
    ((now.getSeconds() < 10) ? ('0' + now.getSeconds()) : (now.getSeconds()))
  );
};

/**
 * Return the current time/date
 *
 * Example:
 *
 * ```
 * 01-01-2022 1:59:20
 * ```
 */
export function getDateTime () {

  const now = new Date();

  return (
    (((now.getDate()) < 10) ? ('0' + (now.getDate() + 1)) : ((now.getDate() + 1))) +
    gray('-') +
    (((now.getMonth() + 1) < 10) ? ('0' + (now.getMonth() + 1)) : ((now.getMonth() + 1))) +
    gray('-') +
    now.getFullYear() + ' ' +
    now.getHours() + gray(':') +
    ((now.getMinutes() < 10) ? ('0' + now.getMinutes()) : (now.getMinutes())) +
    gray(':') +
    ((now.getSeconds() < 10) ? ('0' + now.getSeconds()) : (now.getSeconds()))
  );
};

/**
 * Returns the byte size of a string value
 */
export function getSize (string: string | Buffer): number {

  return isString(string)
    ? Buffer.from(string).toString().length
    : string.toString().length;

};
