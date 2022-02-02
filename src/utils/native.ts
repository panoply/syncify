import { isType } from 'rambdax';

/**
 * Native Object Methods
 */
export const { assign, is, defineProperty, defineProperties, keys, values, create } = Object;

/**
 * Native Array Methods
 */
export const { isArray, from } = Array;

/**
 * Empty String
 */
export const nil = '';

/**
 * Is Buffer
 */
export const { isBuffer } = Buffer;

/**
 * is Undefined
 */
export const isUndefined = isType('Undefined');

/**
 * is Object
 */
export const isObject = isType('Object');

/**
 * is Boolean
 */
export const isBoolean = isType('Boolean');

/**
 * is Boolean
 */
export const isRegex = isType('RegExp');

/**
 * is String
 */
export const isString = isType('String');
