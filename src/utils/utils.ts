import strip from 'strip-json-comments';
import { bold, gray } from '~log';
import { isString, isBuffer, isArray, isObject, ws } from './native';
import { EventEmitter } from 'node:events';
import zlib from 'node:zlib';
import { UNITS } from '../const';

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
 * Pluralize Word
 *
 * Adds an `s` to the end of a word if length is more than 1
 */
export const plural = (word: string, length: number) => length > 1 ? `${word}s` : word;

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
export function convertTimer (ms: number) {

  const m = Math.floor(ms / 60000);
  const s = ((ms % 60000) / 1000).toFixed(0);

  return m > 0 ? (m + 'min' + (Number(s) < 10 ? '0' : '') + s) : s;

};

/**
 * Return the current time/date
 *
 * @example
 *
 * '01:59:20'
 */
export function getTime () {

  const now = new Date();
  const hur = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  const col = gray(':');

  return (
    (hur < 10 ? `0${hur}` : hur) +
    col + (min < 10 ? `0${min}` : min) +
    col + (sec < 10 ? `0${sec}` : sec)
  );
};

/**
 * Return the current time/date
 *
 * @example
 *
 * '01-01-2022 01:59:20'
 */
export function getDateTime () {

  const now = new Date();

  const d = now.getDate();
  const m = now.getMonth() + 1;
  const y = now.getFullYear();
  const hur = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  const col = gray(':');
  const dsh = gray('-');

  return (
    (d < 10 ? `0${d + 1}` : `${d + 1}`) +
    dsh + (m < 10 ? `0${m}` : m) +
    dsh + y + ws + (hur < 10 ? `0${hur}` : hur) +
    col + (min < 10 ? `0${min}` : min) +
    col + (sec < 10 ? `0${sec}` : sec)
  );

};

export function addSuffix (i: number) {

  const a = i % 10;
  const b = i % 100;

  return i + ((a === 1 && b !== 11)
    ? 'st'
    : (a === 2 && b !== 12) ? 'nd' : (a === 3 && b !== 13) ? 'rd' : 'th'
  );

}

/**
 * Returns the byte size of a string value
 */
export function getSize (string: string | Buffer): number {

  return isString(string)
    ? Buffer.from(string).toString().length
    : string.toString().length;

};
