import { Console } from 'node:console';
import { stdout, stderr } from 'node:process';
import { EventEmitter } from 'node:events';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

/**
 * Async Execute
 */
export const command = promisify(exec);

/**
 * Event emitter instance
 */
export const event = new EventEmitter();

/**
 * Native Console Log
 */
export const { error, log, warn, clear } = new Console(stdout, stderr);

/**
 * Native Object methods
 */
export const { create, assign, defineProperty, defineProperties, keys, values, setPrototypeOf } = Object;

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
