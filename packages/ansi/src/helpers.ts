import { COL, DSH } from './symbols';

/**
 * Sanitizes the log message passed. Converts a `Buffer`, `number`, `object`,
 * `boolean` or an `array` type to a readable string.
 *
 * @example
 *
* sanitize(true) => 'true'
* sanitize({ x: 1 }) => '{"x":1}'
* sanitize(1000) => '1000'
*/
export function sanitize (message: number | boolean | string | Buffer | object | any[]): string {

  if (Buffer.isBuffer(message)) return message.toString();
  if (Array.isArray(message) || typeof message === 'object') return JSON.stringify(message);
  if (typeof message === 'boolean' || typeof message === 'number') return `${message}`;

  return typeof message === 'string'
    ? message
    : String(message);

};

/**
 * Join `string[]` or `...string[]` (spread) together
 *
 * @example
 *
* glue('foo', 'bar', 'bar')   // foobarbaz
* glue(['foo', 'bar', 'baz']) // foobarbaz
*/
export function glue (...input: [ string[] ] | string[]) {

  return Array.isArray(input[0])
    ? input[0].join('')
    : input.join('');

}

/**
 * **eq**
 *
 * Equalised Spacing
 */
export function eq (array: any[] | object, prop: string = null) {

  let size: number = 0;

  if (Array.isArray(array)) {
    for (const item of array) {
      if (prop) {

        if (item[prop].length > size) {
          size = item[prop].length;
        }

      } else {

        if (item.length > size) {
          size = item.length;
        }

      }
    }
  } else {

    for (const item in array) {
      if (item.length > size) size = item.length;
    }
  }

  size = size + 1;

  return function curried (string: string | number) {

    const n = typeof string === 'string' ? size - string.length : size - string;

    return n < 1 ? ' ' : ' '.repeat(n);

  };

}

/**
 * Return the current time/date - This is console specific and
 * will write ANSI colors
 *
 * @example
* getTime() // 01:59:20
*/
export function getTime () {

  const now = new Date();
  const hur = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();

  return (
    (hur < 10 ? `0${hur}` : hur) +
    COL + (min < 10 ? `0${min}` : min) +
    COL + (sec < 10 ? `0${sec}` : sec)
  );
};

/**
* Return the current time/date - This is console specific
*
* @example
* getDateTime() // 01-01-2022 01:59:20
*/
export function getDateTime () {

  const now = new Date();

  const d = now.getDate();
  const m = now.getMonth() + 1;
  const y = now.getFullYear();
  const hur = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();

  return (
    (d < 10 ? `0${d + 1}` : `${d + 1}`) +
    DSH + (m < 10 ? `0${m}` : m) +
    DSH + y + ' ' + (hur < 10 ? `0${hur}` : hur) +
    COL + (min < 10 ? `0${min}` : min) +
    COL + (sec < 10 ? `0${sec}` : sec)
  );

};
