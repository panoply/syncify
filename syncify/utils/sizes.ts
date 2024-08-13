import zlib from 'node:zlib';
import { toBuffer } from 'syncify:native';
import { isNumber, isString } from 'syncify:utils';
import { bold } from 'syncify:colors';

/**
 * Transform Units
 */
export const UNITS = [
  'b',
  'kb',
  'mb',
  'gb',
  'tb'
];

/**
 * Helper which runs `byteConvert` and `byteSize` to return readable
 * size string.
 *
 * @param value Either number of bytes of string input
 */
export function stringSize (value: string | number) {

  return isNumber(value) ? byteConvert(value) : byteConvert(byteSize(value));
}

/**
 * Returns the byte size of a string value. Use the `getSizeStr()` utility
 * to return a readable string.
 *
 * @param string The string to determine
 */
export function byteSize (string: string | Buffer): number {

  return isString(string) ? toBuffer(string).toString().length : string.toString().length;

};

/**
 * Converts byte size to killobyte, megabyte, gigabyte or terrabyte
 *
 * @param bytes The bytes number to convert
 * @example 1000 => '1kb'
 */
export function byteConvert (bytes: number): string {

  if (bytes === 0) return `${bold('0')}b`;

  const size = parseInt(String(
    Math.floor(
      Math.log(bytes) /
      Math.log(1024)
    )
  ), 10);

  return size === 0
    ? `${bold(`${bytes}`)}${UNITS[size]}`
    : `${bold((bytes / 1024 ** size).toFixed(1))}${(UNITS[size])}`;
};

/**
 * Returns an object containing size analysis of a string.
 * Requires a `beforeSize` value be provided to perform diff analysis
 *
 * @param content The content to measure
 * @param beforeSize The size to compare
 */
export function sizeDiff (content: string | Buffer, beforeSize: number) {

  const size = byteSize(content);

  return {
    isSmaller: (size > beforeSize || (size === beforeSize)),
    gzip: byteConvert(zlib.gzipSync(content).length),
    before: byteConvert(beforeSize),
    after: byteConvert(size),
    saved: byteConvert(beforeSize - size)
  };
};
