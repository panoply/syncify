/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable n/handle-callback-err */

import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import strip from 'strip-json-comments';
import { COL, DSH } from 'syncify:symbol';
import type { MultipleTopLevelPatch } from 'types/internal';
import { assign, create } from 'syncify:native';

/* -------------------------------------------- */
/* UTILITIES                                    */
/* -------------------------------------------- */

/**
 * **merge**
 *
 * An immutable merge util for state management. You can pass multiple patches
 * in a single merge call, array arguments will be flattened before processing.
 * Since falsy patches are ignored.
 */
export function merge <S extends object> (source: S, ...patches: Array<MultipleTopLevelPatch<S>>): S {

  const arr = isArray(source);

  return (function apply (isArr, copy: any, patch: any) {

    const type = typeof patch;

    if (patch && type === 'object') {

      if (isArray(patch)) {
        for (const p of patch) copy = apply(isArr, copy, p);
      } else {
        for (const k in patch) {
          const val = patch[k];
          if (isFunction(val)) {
            copy[k] = val(copy[k], merge);
          } else if (val === undefined) {
            if (isArr) {
              copy.splice(k, 1);
            } else {
              delete copy[k];
            }
          } else if (val === null || isObject(val) === false || isArray(val)) {
            copy[k] = val;
          } else if (typeof copy[k] === 'object') {
            copy[k] = val === copy[k] ? val : merge(copy[k], val);
          } else {
            copy[k] = apply(false, {}, val);
          }
        }
      }
    } else if (type === 'function') {
      copy = patch(copy, merge);
    }

    return copy;

  })(arr, arr ? source.slice() : assign({}, source), patches);
};

/**
 * **hasPath**
 *
 * Whether the provided object `path` exists in deeply nested object.
 *
 * @param prop The object property to check
 * @param object The object
 */
export function hasPath (path: string, param: object) {

  if (isNil(param)) return false;
  if (isObject(param) === false) return false;

  let object = param;
  let counter = 0;

  const props = path.split('.');

  while (counter < props.length) {
    if (isNil(object)) return false;
    if (object[props[counter]] === null) return false;
    object = object[props[counter]];
    counter++;
  }

  return object !== undefined;

}

/**
 * **has**
 *
 * Whether property is in object
 *
 * @param prop The object property to check
 * @param object The object
 */
export function has <T extends object> (prop: keyof T | string, object: T): boolean {

  return isObject(object) ? prop in object : false;

}

/**
 * **hasProp**
 *
 * Whether property is in object, returning an object to be used as curry
 *
 * @param prop The object property to check
 * @param object The object
 */
export function hasProp <T extends object> (object: T): (prop: keyof T) => boolean {

  return (prop) => prop in object;

}

/**
 * **object**
 *
 * Create a null prototype object
 *
 * @param input The object to assign (optional)
 */
export function object <T = any> (input?: T): T {

  return input ? assign(create(null), input) : create(null);

}

/**
 * Detect ANSI Codes
 *
 * Returns the regex expression
 *
 * @param string The string to detect ANSI occurances
 * @param option Whether or not to apply `g` flag
 */
export function detect (string: string, { onlyFirst = false } = {}) {

  const ansi = string.match(new RegExp([
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
  ].join('|'), onlyFirst ? undefined : 'g'));

  return ansi !== null ? ansi : false;
}

/**
 * JSONC
 *
 * Strip JSON Comments
 *
 * @param data JSON content in string form
 */
export function jsonc <T> (data: string): T {

  if (strip(data).trim() === NIL) return <T>{};

  try {

    return new Function(`return ${strip(data).trim()}`)()

  } catch {

    return <T>{}
  }
}

/**
 * File Kind
 *
 * Returns a grouping reference name according to file extensio
 *
 * @param ext The file extension
 */
export function fileKind (ext: string) {

  // Remove the . if passed
  if (ext.charCodeAt(0) === 46) ext = ext.slice(1);

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
 * As a temporary workaround for Jest's lack of stable ESM support, we fallback to require
 * if we're in a Jest environment.
 *
 * See https://github.com/vitejs/vite/pull/5197#issuecomment-938054077
 *
 * @param file File path to import.
 * @param format The import format, e.g: `esm`
 */
export async function dynamicImport (id: string, { format }: { format: string }) {

  if (format === 'esm') {

    return (file: string) => import(file);

  } else {

    return getImport(id);

  }

};

/**
 * Small helper for determining how an external dependency should
 * be resolved, returning an import resolver.
 *
 * @param name The import pkg or path
 */
export function getImport <T> (name: string): T {

  if (isFunction(require)) return require(name);

  // @ts-expect-error
  return createRequire(import.meta.url)(name);

}

/**
 * Infer JavaScript loader (used for esbuild related logic)
 *
 * @param ext The JS file extension, e.g: `.mjs`, `.js` etc
 */
export function inferLoader <T> (ext: string): T {

  if (ext === '.mjs' || ext === '.cjs') return 'js' as T;

  return ext.slice(1) as T;

}

/**
 * Converts milisecond time to a readable string
 *
 * @param ms The miliseconds to convert
 */
export function convertTimer (ms: number) {

  const m = Math.floor(ms / 60000);
  const s = ((ms % 60000) / 1000).toFixed(0);

  return m > 0 ? (m + 'min' + (Number(s) < 10 ? '0' : '') + s) : s;

};

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
 * Return the current time/date - This is console specific and
 * will write ANSI colors
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
    DSH + y + WSP + (hur < 10 ? `0${hur}` : hur) +
    COL + (min < 10 ? `0${min}` : min) +
    COL + (sec < 10 ? `0${sec}` : sec)
  );

};

/**
 * **getChunk**
 *
 * Chunked arrays
 */
export function getChunk (array: any[], perChunk: number = 2) {

  return array.reduce((acc, item, index) => {

    const ci = Math.floor(index / perChunk); // chunk index

    if (!acc[ci]) acc[ci] = []; // start a new chunk
    acc[ci].push(item);
    return acc;

  }, []);

}

/**
 * Returns a promise resolved in the next event loop
 */
export function pNext () {

  return new Promise(resolve => {
    if (isFunction(setImmediate)) {
      setImmediate(resolve);
    } else {
      setTimeout(resolve);
    }
  });

}

export function debouncePromise<T extends unknown[]> (
  fn: (...args: T) => Promise<void>,
  delay: number,
  onError: (err: unknown) => void
) {

  let timeout: ReturnType<typeof setTimeout> | undefined;
  let transit: Promise<void> | undefined;
  let pending: (() => void) | undefined;

  return function debounced (...args: Parameters<typeof fn>) {
    if (transit) {
      pending = () => {
        debounced(...args);
        pending = undefined;
      };
    } else {
      if (timeout != null) clearTimeout(timeout);

      timeout = setTimeout(() => {
        timeout = undefined;
        transit = fn(...args).catch(onError).finally(() => {
          transit = undefined;
          if (pending) pending();
        });
      }, delay);
    }
  };
}

/* -------------------------------------------- */
/* STRING                                       */
/* -------------------------------------------- */

/**
 * **sanatize**
 *
 * Sanatizes the log message passed. Converts a `Buffer`, `number`, `object`,
 * `boolean` or an `array` type to a readable string.
 *
 * @example
 *
* sanitize(true) => 'true'
* sanitize({ x: 1 }) => '{"x":1}'
* sanitize(1000) => '1000'
*/
export function sanitize (message: number | boolean | string | Buffer | object | any[]): string {

  if (isBuffer(message)) return message.toString();
  if (isObject(message) || isArray(message)) return JSON.stringify(message);
  if (isBoolean(message) || isNumber(message)) return `${message}`;

  return isString(message) ? message : String(message);

};

/**
 * **handleize**
 *
 * Converts string input to a handle
 *
 * @param string The string to convert
 * @example 'foo:bar_baz 10' => 'foo-bar-baz-10'
 */
export function checksum (input: string | Buffer) {

  return createHash('md5').update(input).digest('hex');

}

/**
 * **handleize**
 *
 * Converts string input to a handle
 *
 * @param string The string to convert
 * @example 'foo:bar_baz 10' => 'foo-bar-baz-10'
 */
export function handleize (string: string) {

  return string
  .toLowerCase()
  .replace(/[^a-z0-9_:]+/g, '-')
  .replace(/-$/, '')
  .replace(/^-/, '');

}

/**
 * **plural**
 *
 * Adds an `s` to the end of a word if length is more than 1
 *
 * @param word The word to pluralize
 * @param size The length to determine, if `undefined` will measure `word`
 */
export function plural (word: string, size: number) {

  if (size >= 2) return word[word.length - 1] !== 's' ? `${word}s` : word;

  return word[word.length - 1] !== 's' ? word : word.slice(0, -1);

}

/**
 * **toUpcase**
 *
 * Capitlalize the first letter of a string.
 *
 * @example
 *
 * toUpcase('title') // Title
 */
export function toUpcase <T extends string> (value: T) {

  return value.charAt(0).toUpperCase() + value.slice(1);

};

/**
 * **addSuffix**
 *
 * Append an `st`, `nd`, `rd` or `th` to the end of a number
 *
 * @example
 *
 * addSuffix(1) // 1st
 * addSuffix(2) // 2nd
 * addSuffix(3) // 3rd
 * addSuffix(4) // 4th
 */
export function addSuffix (number: number): string {

  const a = number % 10;
  const b = number % 100;

  return number + ((a === 1 && b !== 11)
    ? 'st'
    : (a === 2 && b !== 12) ? 'nd' : (a === 3 && b !== 13) ? 'rd' : 'th'
  );

}

/**
 * **glueString**
 *
 * Join a string together with a single space character.
 * Accepts spread of string only.
 *
 * @example
 *
 * glueString('foo', 'bar', 'bar') // foo bar baz
 */
export function glueString (...input: string[]) {

  return input.join(' ');

}

/**
 * **glue**
 *
 * Join `string[]` or `...string[]` (spread) together
 *
 * @example
 *
 * glue('foo', 'bar', 'bar')   // foobarbaz
 * glue(['foo', 'bar', 'baz']) // foobarbaz
 */
export function glue (...input: [ string[] ] | string[]) {

  return isArray(input[0]) ? input[0].join('') : input.join('');

}

/**
 * **ws**
 *
 * Equalised Spacing
 */
export function ws (array: any[] | object, prop: string = null) {

  let size: number = 0;

  if (isArray(array)) {
    for (const item of array) {
      if (prop) {
        if (item[prop].length > size) size = item[prop].length;
      } else {
        if (item.length > size) size = item.length;
      }
    }
  } else {
    for (const item in array) if (item.length > size) size = item.length;
  }

  size = size + 1;

  return function curried (string: string | number) {
    const n = isString(string) ? size - string.length : size - string;
    return n < 1 ? WSP : WSP.repeat(n);
  };

}

/**
 * Generate a random UUID
 *
 * @example
 *
 * uuid() => 'x1s2n5'
 */
export function uuid (): string {

  return Math.random().toString(36).slice(2);

}

/* -------------------------------------------- */
/* TYPE AND VALUE CHECKS                        */
/* -------------------------------------------- */

/**
 * **isNil**
 *
 * Check whether value is `undefined` or `null`
 *
 * @example
 *
* isNil(undefined) // true
* isNil(null)      // true
* isNil(-1)        // false
*/
export function isNil (input: any) {

  return input === undefined || input === null;

}

/**
* **isEven**
*
* Check whether value is even number
*
* @example
*
* isEven(50) // true
* isEven(99) // false
*/
export function isEven (number: number) {

  return number % 2 === 0;

}

/**
* **isEmptyString**
*
* Check whether a Buffer or String is empty
*
* @example
*
* isEmptyString('  ') // true
*/
export function isEmptyString (input: Buffer | string) {

  if (isBuffer(input)) return input.toString().trim().length === 0;

  return input.trim().length === 0;

}

/**
* **isEmpty**
*
* Check whether a object or array is empty.
*
* @example
*
* isEmpty([])  // true
* isEmpty({})  // true
* isEmpty([1]) // false
*/
export function isEmpty (input: any) {

  if (isObject(input)) {
    for (const _ in input) return false; // eslint-disable-line no-unreachable-loop
    return true;
  }

  if (isArray(input)) return input.length === 0;
  if (isUndefined(input) || isNumber(input) || isNull(input) || isNaN(input)) return false;

  return !input;

}

/**
* **isArray**
*
* Check if param is an array type
*
* @example
*
* isArray([]) // true
* isArray({}) // false
*/
export function isArray <T extends any[]> (param: any): param is T {

  return Array.isArray(param);

}

/**
* **isObject**
*
* Check if param is an object type
*
* @example
*
* isObject({}) // true
* isObject([]) // false
*/
export function isObject <T extends object> (param: any): param is T {

  return typeof param === 'object';

}

/**
* **isString**
*
* Check if param is a string type
*
* @example
*
* isString('') // true
* isString(``) // true
* isString([]) // false
*/
export function isString <T extends string> (param: any): param is T {

  return typeof param === 'string';

}

/**
* **isDate**
*
* Check if param is a date type
*/
export function isDate <T extends Date> (param: any): param is T {

  return Object.prototype.toString.call(param).slice(8, -1) === 'Date';

}

/**
* **isRegex**
*
* Check if param is an regular expression type
*/
export function isRegex <T extends RegExp> (param: any): param is T {

  return Object.prototype.toString.call(param).slice(8, -1) === 'RegExp';

}

/**
* **isFunction**
*
* Check if param is a function type
*/
export function isFunction <T extends Function> (param: any): param is T {

  return typeof param === 'function';

}

/**
* **isBoolean**
*
* Check if param is a boolean type
*/
export function isBoolean <T extends boolean> (param: any): param is T {

  return typeof param === 'boolean';

}

/**
* **isNumber**
*
* Check if param is a number type
*/
export function isNumber <T extends number> (param: any): param is T {

  return typeof param === 'number';

}

/**
* **isNaN**
*
* Check if param is `NaN`
*/
export function isNaN <T extends number> (param: any): param is T {

  return Number.isNaN(param);

}

/**
* **isNull**
*
* Check if param is null type
*/
export function isNull <T extends null> (param: any): param is T {

  return Object.prototype.toString.call(param).slice(8, -1) === 'Null';

}

/**
* **isUndefined**
*
* Check if param is a undefined type
*/
export function isUndefined <T extends undefined> (param: any): param is T {

  return typeof param === 'undefined';

}

/**
* **isAsync**
*
* Check if param is Asynchronous type
*/
export function isAsync<T extends Promise<unknown>> (param: any): param is T {

  return toString.call(param).slice(8, -1) === 'AsyncFunction';

}

/**
* **isBuffer**
*
* Check if param is Buffer type
*/
export function isBuffer<T extends Buffer> (param: any): param is T {

  return Buffer.isBuffer(param);
}
