import type { Get, PascalCase, Paths } from 'type-fest';
import type { DotPaths, LiteralString, MultipleTopLevelPatch } from 'types';

import { exec, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { env } from 'node:process';
import { promisify } from 'node:util';
import { isAsyncFunction } from 'node:util/types';
import zlib from 'node:zlib';

import { bold, COL, DSH } from '@syncify/ansi';

import { DAY_IN_MS, TIME, UNITS } from '~const';

import { $ } from '$';

/**
 * Async Execute
 */
export const command = promisify(exec);

/**
 * Noop
 */
export const NooP = () => {};

/**
 * Native Object methods
 */
export const assign = Object.assign;

/**
 * Native Object methods
 */
export const defineProperty = Object.defineProperty;

/**
 * Native Object methods
 */
export const defineProperties = Object.defineProperties;

/**
 * Native Object methods
 */
export const keys = Object.keys;

/**
 * Native Object methods
 */
export const values = Object.values;

/**
 * Native Object methods
 */
export const setPrototypeOf = Object.setPrototypeOf;

/**
 * Native Array from Method
 */
export const toArray = Array.from;

/**
 * To Buffer
 */
export const toBuffer = Buffer.from;

/**
 * Native Math methods
 */
export const { abs } = Math;

/**
 * Native prototype `toString` for type checks
 */
export const { toString } = Object.prototype;

/**
* **isBuffer**
*
* Check if param is Buffer type
*/
export const isBuffer = Buffer.isBuffer;

/* -------------------------------------------- */
/* TYPE AND VALUE CHECKS                        */
/* -------------------------------------------- */

/**
 * **type**
 *
 * Returns the `input` type value
 *
 * @example
 *
 * type(undefined)      // 'undefined'
 * type(async ()=> {})  // 'promise'
 * type(100)            // 'number
 */
export function type (input: any) {

  if (input === null) return 'null';
  if (input === undefined) return 'undefined';
  if (isNaN(input)) return 'NaN';
  if (isBuffer(input)) return 'Buffer';

  const result = toString.call(input).slice(8, -1);

  return result === 'AsyncFunction' ? 'Promise' : result;

}

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
* isEmptyString(' ') // true
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
  if (isUndefined(input) || isNumber(input) || isNull(input) || isNaN(input)) return true;

  return !input;

}

/**
 * **isPromise**
 *
 * Check if param is a promise type
 *
 * @example
 *
 * isPromise(Promise.resolve()) // true
 * isPromise(async () => {}) // false
 */
export function isPromise<T extends Promise<any>> (param: any): param is T {

  return toString.call(param).slice(8, -1) === 'Promise';

}

/**
 * **isAwait**
 *
 * Check if param is either promise or async
 *
 * @example
 *
 * isAwait(Promise.resolve()) // true
 * isAwait(async () => {}) // true
 * isAwait(async function () {}) // true
 */
export function isAwait<T extends Promise<any>> (param: any): param is T {

  return toString.call(param).slice(8, -1) === 'Promise' || isAsync(param);

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

  return toString.call(param).slice(8, -1) === 'Object';

}

/**
 * **isString**
 *
 * Check if param is a string type and contains `1` or more characters
 *
 * @example
 *
 * isString('') // true
 * isString(``) // true
 * isString([]) // false
 */
export function isStringStrict <T extends string> (param: any): param is T {

  return typeof param === 'string' && param.length > 0;

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

  return toString.call(param).slice(8, -1) === 'String';

}

/**
 * **isDate**
 *
 * Check if param is a date type
 */
export function isDate <T extends Date> (param: any): param is T {

  return toString.call(param).slice(8, -1) === 'Date';

}

/**
 * **isRegex**
 *
 * Check if param is an regular expression type
 */
export function isRegex <T extends RegExp> (param: any): param is T {

  return toString.call(param).slice(8, -1) === 'RegExp';

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
 * **isConstructor**
 *
 * Check if param is a constructor or function prototype
 */
export function isConstructor (object: object, key: string) {

  return (key === 'constructor' && isFunction(object[key])) || key === '__proto__';

}

/**
 * **isNumberStrict**
 *
 * Check if param is a number type, `0x` number type or
 * math-like expression number, float etc (e.g: `-200`, `+200` etc)
 *
 * > Used for cli args check
 */
export function isNumberStrict <T extends number> (param: any): param is T {

  return (
    isNumber(param) ||
    /^0x[0-9a-f]+$/i.test(param) ||
    /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(param)
  );

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

  return param === null;

}

/**
 * **isUndefined**
 *
 * Check if param is a undefined type
 */
export function isUndefined <T extends undefined> (param: any): param is T {

  return typeof param === 'undefined' && param === undefined;

}

/**
 * **isAsync**
 *
 * Check if param is Asynchronous type
 */
export function isAsync<T extends Promise<unknown>> (param: any): param is T {

  return isAsyncFunction(param);

}

/**
 * **Last**
 *
 * Returns the last item in an array
 */
export function last <T extends any[]> (input: T) {

  return input[input.length - 1];
}

/* -------------------------------------------- */
/* CREATORS                                     */
/* -------------------------------------------- */

/**
 * Returns the package manager
 */
export function pm () {

  if (!env.npm_config_user_agent) return '?';

  const userAgent = env.npm_config_user_agent;
  const pmSpec = userAgent.split(' ')[0];
  const separatorPos = pmSpec.lastIndexOf('/');
  const name = pmSpec.substring(0, separatorPos);

  return name === 'npminstall' ? 'cnpm' : name;

};

/**
 * **Object**
 *
 * Cached object creation
 *
 * @param input The object to assign (optional)
 */
export function o <T = any> (input?: T): T {

  return input ? Object.assign<T, T>(Object.create(null), input) : Object.create(null);

}

/**
 * **Set**
 *
 * Creates a new `Set` instance
 */
export function s <K> (value?: K[]) {

  return new Set<K>(value);

}

/**
 * **Map**
 *
 * Creates a new `Map` instance
 */
export function m <K, V> (input?: Iterable<readonly [K, V]> | null) {

  return new Map<K, V>(input);

}

/**
 * **checksum**
 *
 * Creates an MD5 checksum hash from input. Optionally accepts an `outputLength`
 * and when provided will hash using `shake256`
 *
 * @param input
 * The data input to digest
 *
 * @param [outputLength]
 * Optional length for shake256
 */
export function checksum (input: string | Buffer, outputLength: number = -1) {

  const hash = outputLength > -1 ? createHash('shake256', { outputLength }) : createHash('md5');

  return hash.update(input).digest('hex');

}

/**
 * Opens the `filePath` in the users text editor
 */
export async function openInEditor (filePath: string) {

  return new Promise((resolve, reject) => {
    try {

      const process = spawn($.project.textEditor, [ filePath ], {
        stdio: 'ignore',
        detached: true
      });

      process.unref();

      resolve(true);

    } catch (error) {

      reject(new Error(`Failed to open file: ${error.message}`));

    }
  });
}

/* -------------------------------------------- */
/* ARRAYS                                       */
/* -------------------------------------------- */

/**
 * **getChunk**
 *
 * Chunked arrays
 */
export function getChunk <T = any> (array: T[], perChunk: number = 2) {

  return array.reduce((acc, item, index) => {

    const ci = Math.floor(index / perChunk); // chunk index

    if (!acc[ci]) acc[ci] = []; // start a new chunk

    acc[ci].push(item);

    return acc;

  }, []);

}

/**
 * **includes**
 *
 * Whether or not the parameter `a` exists in the provided list.
 * Uses `String() === String()` based comparison.
 */
export function includes (a: string, list?: any[]) {

  let index = -1;

  const size = list.length;

  while (++index < size) {
    if (String(list[index]) === String(a)) return true;
  }

  return false;

}

/**
 * **hasPath**
 *
 * Whether the provided object `path` exists in deeply nested object.
 *
 * @param prop The object property to check
 * @param object The object
 */
export function hasPath <T, P extends DotPaths<T>> (path: LiteralString<P>, param: T) {

  if (isNil(param)) return false;
  if (isObject(param) === false) return false;

  let object = param;
  let counter = 0;

  const props = (path as string).split('.');

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
 * **inProp**
 *
 * Weak version of {@link has} that does not type check object.
 *
 * @param prop The object property to check
 * @param object The object
 */
export function inProp <T extends Error> (prop: keyof T | string, object: T): boolean {

  return prop in object;

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

  const isObj = isObject(object);

  return (prop) => isObj ? prop in object : false;

}

/**
 * **pathOr**
 *
 * Walks a deeply nested object structure returning the value
 * of the keys provided, if value cannot be obtains, returns fallback
 *
 * @example
 * // Assume the following object
 * const o = { a: b: { c: { d: { e: 'f' } } } }
 *
 * // This is valid, return value will be 'f'
 * pathOr(o, 'a.b.c.d.e', (o) => 'xxx')
 *
 * // This is invalid, return value will be 'xxx'
 * pathOr(o, 'a.c', (o) => 'xxx')
 */
export function pathOr<
  T,
  P extends Paths<T, { maxRecursionDepth: 10, bracketNotation: true}>
> (object: T, path: P, fallback: (param: T) => any): Get<T, P> {

  const keys = <string[]>(isString(path) ? path.split('.') : path);

  if (keys.length === 0) return fallback(object);

  let result: any = object;

  for (const key of keys) {
    if (result == null || !(key in result)) return fallback(object);
    result = result[key];
  }

  return result;
}

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

  })(arr, arr ? source.slice() : Object.assign({}, source), patches);
};

/**
 * **omit**
 *
 * Creates a new object excluding the specified keys with optimized performance.
 * Uses direct property access and avoids unnecessary iterations for both performance and type safety.
 */
export function omit <T> (props: Array<keyof T>, input?: T) {

  if (arguments.length === 1) return (o: T) => omit(props, o);

  if (input === null || input === undefined) { return undefined; }

  const newObject = o<T>();

  for (const key in input) {
    if (!includes(key, props)) {
      newObject[key] = input[key];
    }
  }

  return newObject;
}

/**
 * **forMap**
 *
 * Synchronous map which will only push non nil values into
 * the returning array. The callback function will pass only
 * the value, not the index so we can avoid opening new functionss
 */
export function forMap <T, R> (cb: (T: T) => R, array: Array<T>) {

  if (!isArray(array)) return [];

  const s = array.length;

  // Ensure we can iterate the list
  if (s === 0) return [];

  const a = [];

  // Loop over the items in the array

  let i = 0;

  for (; i < s; i++) {
    const v = cb(array[i]);
    if (!isNil(v)) a.push(v);
  }

  return a;

}

/**
 * **reduce**
 *
 * Synchronous reducer sugar
 */
export function reduce <T, R> (array: Array<T>, cb: (V: R, T: T) => R, model: R): R {

  const s = array.length;

  // Ensure we can iterate the list
  if (s === 0) return model;

  // Loop over the items in the array

  let i = 0;

  for (; i < s; i++) cb(model, array[i]);

  return model;

}

/**
 * **forEach**
 *
 * Synchronous forEach iterator wrapper. Provides curried support.
 * It's using the `for` iterator which is best for records under
 * 1000 (which is the standard for this library).
 *
 * > Cancel the loop by returning `false` in the callback
 */
export function forEach <T> (cb: (item: T) => any, array?: Array<T>) {

  // if (!isArray(array)) return;

  const s = array.length;

  // Ensure we can iterate the list
  if (s === 0) return;

  // Loop over the items in the array

  let i = 0;
  for (; i < s; i++) if (cb(array[i]) === false) break;

}

/**
 * **forValue**
 *
 * Iterates an object returning the value
 *
 * > Cancel the loop by returning `false` in the callback
 */
export function forValue <T> (cb: (value: T[keyof T]) => any, object?: T) {

  for (const k in object) if (cb(object[k]) === false) break;

}

/**
 * **forKeys**
 *
 * Iterates an object returning the value
 *
 * > Cancel the loop by returning `false` in the callback
 */
export function forKeys <T> (cb: (value: keyof T) => any, object?: T) {

  for (const k in object) if (cb(k) === false) break;

}

/* -------------------------------------------- */
/* PROMISE                                      */
/* -------------------------------------------- */

/**
 * Returns a promise resolved in the next event loop
 */
export function pNext () {

  return new Promise(resolve => isFunction(setImmediate) ? setImmediate(resolve) : setTimeout(resolve));

}

export function forAsync <T = any> (array: T[], fn: (item: T) => Promise<void>): Promise<void> {

  const s = array.length;

  // Ensure we can iterate the list
  if (s === 0) return;

  let i = 0;

  return (function next () {

    return i >= s ? Promise.resolve() : fn(array[i++]).then(next);

  }());

}

/**
 * **pSerial**
 *
 * Serial execution of async functions or sync functions. The parameter value
 * accepts either an array or spread. When an array type is passed, entries will
 * resolve with `Promise.all()`, when a spread is passed, each function will resolve
 * in the order they were provided.
 */
export async function pSerial (...tasks: any[]) {

  if (isArray(tasks[0])) {
    try {
      await Promise.all(tasks[0]);
    } catch (e) {
      return (handle: Function) => handle(e);
    }
  } else {
    for (let i = 0, s = tasks.length; i < s; i++) {
      if (isAwait(tasks[i])) {
        try {
          await tasks[i]();
        } catch (e) {
          return (handle: Function) => handle(e);
        }
      } else {
        tasks[i](); // sync
      }
    }
  }
}

/**
 * **delay**
 *
 * Resolves a promise after `ms` delay. Defaults to `1000` (1s).
 *
 * @example
 * await delay(2000) // delay for 2 seconds
 */
export function delay (ms = 1000) {

  return new Promise(resolve => setTimeout(resolve, ms));

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
 * **eqWS**
 *
 * Equalised Spacing. Provide a data structure of either `array` or `object`
 * type (optional prop to query when object). The function returns a function
 * which accepts a `string` or `number` parameter. The returning value is additional
 * whitespace alignment.
 *
 * @example
 *
 * const eq = eqWS([ 'example', 'loooooooooong', 'abc' ], {
 *  prop?: null, // optional
 *  padding?: 0  // add additional spacing
 * });
 *
 * eq('example')          =>    'example      '
 * eq('loooooooooong')    =>    'loooooooooong'
 * eq('mini')             =>    'abc          '
 */
export function eqWS <T extends any[] | object> (array: T, { prop = null, padding = 0 }: {
  /**
   * Property value to select which holds the string
   */
  prop?: string;
  /**
   * Adds additional whitespace characters to the output.
   */
  padding?: number;
} = {}) {

  let size: number = 0;

  if (isArray(array)) {
    for (let i = 0, s = array.length; i < s; i++) {
      if (prop) {
        if (array[i][prop].length > size) {
          size = array[i][prop].length;
        }
      } else {
        if (array[i].length > size) {
          size = array[i].length;
        }
      }
    }
  } else {
    for (const item in array) {
      if (item.length > size) size = item.length;
    }
  }

  size = size + 1;

  const p = padding > 0 ? WSP.repeat(padding) : NIL;

  return (string: string | number) => {

    const n = isString(string) ? size - string.length : size - string;
    const s = n < 1 ? WSP : WSP.repeat(n);

    return s + p;

  };

}

/**
 * MurmurHash2
 *
 * @author Gary Court and Austin Appleby
 * @see http://github.com/garycourt/murmurhash-js
 */
export function murmur (str: string, seed: number): number {

  const string = new TextEncoder().encode(str);

  let s = string.length;
  let h = seed ^ s;
  let i = 0;
  let k: number;

  while (s >= 4) {

    k =
      ((string[i] & 0xff)) |
      ((string[++i] & 0xff) << 8) |
      ((string[++i] & 0xff) << 16) |
      ((string[++i] & 0xff) << 24);

    k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
    k ^= k >>> 24;
    k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
    h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k;
    s -= 4;
    ++i;
  }

  if (s === 3) h ^= (string[i + 2] & 0xff) << 16;
  if (s === 2) h ^= (string[i + 1] & 0xff) << 8;

  if (s === 1) {
    h ^= (string[i] & 0xff); h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
  }

  h ^= h >>> 13;
  h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
  h ^= h >>> 15;

  return h >>> 0;

};

/**
 * **uuid**
 *
 * Generate a random string UUID
 *
 * @example
 *
 * uuid() => 'x1s2n5'
 */
export function uuid (): string {

  return Math.random().toString(36).slice(2);

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
 * **toPascalCase**
 *
 * Converts string input to `PascalCase`
 *
 * @param string
 * The string to convert
 *
 * @example 'some string' => 'SomeString'
 */
export function toPascalCase <T extends string> (string: string): PascalCase<T> {

  return <PascalCase<T>>string
  .replace(/[^a-zA-Z0-9_:]+(.)/g, (_, c) => c.toUpperCase())
  .replace(/^./, c => c.toUpperCase());

}

/**
* **plur**
*
* Adds an `s` to the end of a word if length is more than 1
*
* @param word The word to pluralize
* @param size The length to determine, if `undefined` will measure `word`
*/
export function plur (word: string, size: number) {

  if (size === 1) return word;
  if (size >= 2 || size === 0) return word[word.length - 1] !== 's' ? `${word}s` : word;

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
 * **constructTree**
 *
 * Construct an array tree from a list of path strings.
 */
export function constructTree (paths: string[]): Array<{
  /**
   * The base directory name
   *
   * @example
   * 'icons'
   */
  name: string;
 /**
   * The path from which we will construct
   *
   * @example
   * 'source/assets/icons'
   */
  path: string;
  /**
   * The tree character sequence
   *
   * @example
   * '    └─ '
   */
  tree: string;
}> {

  const result = [];
  const tree = {};

  // Build tree structure
  paths.forEach(path => {
    let current = tree;
    path.split('/').forEach(segment => {
      current[segment] = current[segment] || {};
      current = current[segment];
    });
  });

  // Generate objects with correct tree lines
  function buildLines (object: any, prefix = '', parentPath = '') {

    const entries = Object.entries(object).sort();

    entries.forEach(([ key, value ], i) => {

      const isLast = i === entries.length - 1;
      const currentPath = parentPath ? `${parentPath}/${key}` : key;
      const treeLine = `${prefix}${isLast ? '└─' : '├─'}`;

      result.push({
        name: key,
        path: currentPath + '/*',
        tree: treeLine
      });

      buildLines(value, prefix + (isLast ? '  ' : '│ '), currentPath);

    });
  }

  buildLines(tree);
  return result;

}

/**
 * **replaceAllOccurrences**
 *
 * Searches a string for all occurrences of a substring and replaces them.
 *
 * @param inputString The original string to process.
 * @param searchCriteria The substring (string) to search for.
 * @param replacement The string value to replace each match.
 */
export function replaceAllOccurrences (inputString: string, searchCriteria: string, replacement: string): string {

  if (typeof searchCriteria === 'string' && searchCriteria === '') {
    return inputString;
  }

  return inputString.replaceAll(searchCriteria, replacement);
}

/* -------------------------------------------- */
/* SIZES                                        */
/* -------------------------------------------- */

/**
 * **stringSize**
 *
 * Helper which runs `byteConvert` and `byteSize` to return readable
 * size string.
 *
 * @param value Either number of bytes of string input
 */
export function stringSize (value: string | number) {

  return isNumber(value) ? byteConvert(value) : byteConvert(byteSize(value));
}

/**
 * **byteSize**
 *
 * Returns the byte size of a string value. Use the `stringSize()` utility
 * to return a readable string.
 *
 * @param string The string to determine
 */
export function byteSize (string: string | Buffer): number {

  return isString(string)
    ? Buffer.from(string).toString().length
    : string.toString().length;

};

/**
 * **byteConvert**
 *
 * Converts byte size to killobyte, megabyte, gigabyte or terrabyte
 *
 * @param bytes The bytes number to convert
 * @example 1000 => '1kb'
 */
export function byteConvert (bytes: number): string {

  if (bytes === 0) return `${bold('0')}b`;

  const size = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10);

  return size === 0
    ? `${bold(`${bytes}`)}${UNITS[size]}`
    : `${bold((bytes / 1024 ** size).toFixed(1))}${(UNITS[size])}`;
};

/**
 * **sizeDiff**
 *
 * Returns an object containing size analysis of a string.
 * Requires a `beforeSize` value be provided to perform diff analysis
 *
 * The closure returns getters to avoid unnecessary calls, (i.e, `zlib brotli`)
 *
 * @param content The content to measure
 * @param beforeSize The size to compare
 */
export function sizeDiff (content: string | Buffer, beforeSize: number) {

  const size = byteSize(content);

  return {
    get isSmaller () {
      return (size > beforeSize || (size === beforeSize));
    },
    get brotli () {
      return byteConvert(zlib.brotliCompressSync(content).length);
    },
    get before () {
      return byteConvert(beforeSize);
    },
    get after () {
      return byteConvert(size);
    },
    get saved () {
      return byteConvert(beforeSize - size);
    }
  };
};

/* -------------------------------------------- */
/* TIME AND DATE                                */
/* -------------------------------------------- */

/**
 * **futureTimestamp**
 *
 * Returns a timestamp that is `x` amount of months in the future
 * from current timestamp
 */
export function getFuture (months: number) {

  const current = new Date(Date.now());

  // Add 4 months to the current date
  // Note: This method assumes the day of the month will remain the same,
  // which might not be true if you cross into a month with fewer days.
  current.setMonth(current.getMonth() + months);

  // If the day doesn't exist in the new month (e.g., 31st to April),
  // setDate will adjust to the last day of the new month:
  const d = current.getDate();
  current.setDate(1); // Reset to first of the month
  current.setDate(Math.min(d, new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate()));

  // Convert back to timestamp if needed
  return current.getTime();
}

/**
 * **prettyDate**
 *
 * Converts a timestamp to readable data format:
 *
 * ```
 * 25th December 2025
 * ```
 */
export function prettyDate (time: number) {

  const date = new Date(time);
  // Use toLocaleDateString with 'en-GB' locale for "25th" style ordinal suffixes
  const locale = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return locale.replace(/\d+/, addSuffix(date.getDate()));

}

/**
 * **timeAgo**
 *
 * Converts an ISO 8601 date string to a readable format:
 *
 * ```js
 * '2025-04-07T15:50:00Z'
 *  // TO
 * '5 seconds ago'
 * '1 minute ago'
 * '1 hour ago'
 * '2 days ago'
 * '1 month ago'
 * '2 years ago'
 * ```
 */
export function timeAgo (dateStr: string | number) {

  const date = new Date(dateStr);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const absSeconds = Math.abs(seconds);

  for (const interval of TIME) {
    const count = Math.floor(absSeconds / interval.seconds);
    if (count >= 1) {
      const prefix = seconds < 0 ? 'in ' : '';
      const suffix = seconds >= 0 ? ' ago' : '';
      return `${prefix}${count} ${interval.label}${count === 1 ? '' : 's'}${suffix}`;
    }
  }

  return '1 second ago';

}

/**
 * **hasDayPassed**
 *
 * Checks whether the provided timestamp has exceed 24 hours or not.
 *
 * @param timestamp The saved timestamp in ms
 */
export function hasDayPassed (timestamp: number): boolean {

  return (Date.now() - timestamp) > DAY_IN_MS;

}

/**
 * **convertTimer**
 *
 * Converts milisecond time to a readable string
 *
 * @param ms
 * The miliseconds to convert
 *
 * @param suffix
 * The suffixes to apply
 *
 * @example
* const time = 1000300;
*
* convertTimer(time) => '16min 40s'
* convertTimer(time, { min: 'm' }) => '16m 40s'
* convertTimer(time, { sec: 'sec', }) => '16min 40sec'
*/
export function convertTimer (ms: number, { min = 'min', sec = 's' } = {}) {

  const m = Math.floor(ms / 60000);
  const s = +((ms % 60000) / 1000).toFixed(0);

  return m > 0
    ? `${m}min ${s < 10 && s > 0 ? '0' : ''}${s > 0 ? s + 'sec' : ''}`
    : `${s}sec`;

};

/**
* **getTime**
*
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
   ':' + (min < 10 ? `0${min}` : min) +
   ':' + (sec < 10 ? `0${sec}` : sec)
  );
};

/**
* **getDateTime**
*
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
