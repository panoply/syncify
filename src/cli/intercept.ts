import { PassThrough } from 'stream';

/* -------------------------------------------- */
/* LEXICAL SCOPES                               */
/* -------------------------------------------- */

/**
 * Navite Store
 */
let native: Record<string, unknown> = {};

/* -------------------------------------------- */
/* CONSTANTS                                    */
/* -------------------------------------------- */

/**
 * Native Methods
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

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Intercepts `stdout` and `stderr` console methods
 * and ensure log output is correctly printed. Interception
 * is dynamic and is only enabled during processing to catch
 * any logs from external tooling.
 */
export function intercept (callback: (stream: 'stdout' | 'stderr', data: string) => void): () => void {

  const stdout: any = new PassThrough();
  const stderr: any = new PassThrough();

  stdout.write = function (data: string): void {
    callback('stdout', data); // eslint-disable-line
  };

  stderr.write = function (data: string): void {
    callback('stderr', data); // eslint-disable-line
  };

  const internal = new console.Console(stdout, stderr);

  for (const method of methods) {
    native[method] = console[method];
    console[method] = (internal as any)[method];
  }

  return function () {
    for (const method of methods) console[method] = native[method];
    native = {};
  };
};

/* -------------------------------------------- */
/* EXPORTS                                      */
/* -------------------------------------------- */
