import { isType } from 'rambdax';

/**
 * Native Console Log
 */
export const log = console.log;

/**
 * Empty String
 */
export const nil = '';

/**
 * Native Object assign
 */
export const create = Object.create;

/**
 * Native Object assign
 */
export const assign = Object.assign;

/**
 * Native Object Define Property
 */
export const defineProperty = Object.defineProperty;

/**
 * Native Object keys
 */
export const keys = Object.keys;

/**
 * Native Object keys
 */
export const values = Object.values;

/**
 * Native Object is
 */
export const is = Object.is;
/**
 * Native Array from Method
 */
export const from = Array.from;

/**
 * Native isArray Methods
 */
export const isArray = Array.isArray;

/**
 * Is Buffer
 */
export const isBuffer = Buffer.isBuffer;

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
 * is Regular Expression
 */
export const isRegex = isType('RegExp');

/**
 * is Boolean
 */
export const isNumber = isType('Number');

/**
 * is String
 */
export const isString = isType('String');

/**
 * is Function
 */
export const isFunction = isType('Function');

/**
 * is Async
 */
export const isAsync = isType('Async');
