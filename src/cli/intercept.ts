import { PassThrough } from 'node:stream';
import { Console } from 'node:console';
import { forEach } from 'rambdax';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

/**
 * Callback function method
 */
type Callback = (stream: 'stdout' | 'stderr', data: string) => void

/* -------------------------------------------- */
/* CONSTANTS                                    */
/* -------------------------------------------- */

/**
 * Console Methods
 */
const methods = [
  'assert',
  'count',
  'countReset',
  'debug',
  'dir',
  'dirxml',
  'error',
  'group',
  'groupCollapsed',
  'groupEnd',
  'info',
  'log',
  'table',
  'time',
  'timeEnd',
  'timeLog',
  'trace',
  'warn'
];

/**
 * Native Methods
 */
const native: Map<string, typeof console> = new Map();

/**
 * Console Intercept
 *
 * Intercepts `stdout` and `stderr` console methods.
 * This ensures log output is correctly printed as follows
 * the TUI aesthetic. Interception is dynamic and is only
 * enabled during processing to catch any logs from external tooling.
 */
export const intercept = (callback: Callback): () => void => {

  const stdout: any = new PassThrough();
  const stderr: any = new PassThrough();

  stdout.write = (data: string): void => callback('stdout', data); // eslint-disable-line
  stderr.write = (data: string): void => callback('stderr', data); // eslint-disable-line

  const internal = new Console(stdout, stderr);

  forEach((method) => {
    native.set(method, console[method]);
    console[method] = (internal as any)[method];
  }, methods);

  return () => {
    forEach((method) => { console[method] = native.get(method); }, methods);
    native.clear();
  };
};
