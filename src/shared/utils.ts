import strip from 'strip-json-comments';
import { bold, gray } from '../cli/ansi';
import { isString, isBuffer, isArray, isObject } from './native';
import { EventEmitter } from 'node:events';
import zlib from 'node:zlib';
import { UNITS } from '../constants';

/**
 * Event emitter instance
 */
export const event = new EventEmitter();

/**
 * Strip JSON Comments
 */
export function jsonc <T> (data: string): T {

  try {

    return JSON.parse(strip(data).trim());

  } catch (e) {

    throw new Error(e);
  }
}

/**
 * Returns a grouping reference name according
 * to file extension
 */
export const fileKind = (ext: string) => {

  switch (ext) {
    case 'webm':
    case 'mpg':
    case 'mp2':
    case 'mpeg':
    case 'mpe':
    case 'mpv':
    case 'ogg':
    case 'm4p':
    case 'm4v':
    case 'avi':
    case 'wmv':
    case 'mov':
    case 'qt':
    case 'flv':
    case 'swf':
    case 'avchd': return 'video';

    case 'm4a':
    case '3gp':
    case '3g2':
    case 'aiff':
    case 'amr':
    case 'mp3':
    case 'wav': return 'audio';
  }

};

/**
 * Sanitize Message
 *
 * Sanatizes the log message passed
 */
export const sanitize = (message: string) => {

  if (isBuffer(message)) return message.toString();
  if (isObject(message) || isArray(message)) return JSON.stringify(message);

  return String(message);

};

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

  return size === 0
    ? `${bold(String(bytes))}${(UNITS[size])}`
    : `${bold((bytes / 1024 ** size).toFixed(1))}${(UNITS[size])}`;
};

export const fileSize = (content: string | Buffer, beforeSize: number) => {

  const size = byteSize(content);
  const gzip = byteConvert(zlib.gzipSync(content).length);
  const before = byteConvert(beforeSize);
  const after = byteConvert(size);
  const saved = byteConvert(beforeSize - size);

  return {
    isSmaller: (size > beforeSize || (size === beforeSize)),
    gzip,
    before,
    after,
    saved
  };
};

/**
 * Converts Time
 */
export const convertTimer = (ms: number) => {
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

export function addSuffix (i: number) {

  const a = i % 10;
  const b = i % 100;

  if (a === 1 && b !== 11) return i + 'st';
  else if (a === 2 && b !== 12) return i + 'nd';
  else if (a === 3 && b !== 13) return i + 'rd';
  else return i + 'th';

}

/**
 * Returns the byte size of a string value
 */
export function getSize (string: string | Buffer): number {

  return isString(string)
    ? Buffer.from(string).toString().length
    : string.toString().length;

};
