import { Console } from 'node:console';
import { stdout, stderr } from 'node:process';

/**
 * Native Console Log
 */
export const {
  error,
  log,
  warn,
  clear
} = new Console(stdout, stderr);

/**
 * Native Object methods
 */
export const {
  create,
  assign,
  defineProperty,
  defineProperties,
  keys,
  values,
  setPrototypeOf
} = Object;

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
