import { PassThrough } from 'node:stream';
import { Console } from 'node:console';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

/**
 * Native Methods
 */
const native: Map<string, typeof console> = new Map();

/**
 * Console Methods for intercepting spawned processes
 */
const methods: string[] = [
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
 * Console Intercept
 *
 * Intercepts `stdout` and `stderr` console methods. This ensures log output is correctly
 * printed and follows the TUI aesthetic. Interception is dynamic and is only enabled during
 * processing to catch any logs from external tooling.
 */
export function intercept (callback:(stream: 'stdout' | 'stderr', data: string) => void): () => void {

  const stdout: any = new PassThrough();
  const stderr: any = new PassThrough();

  stdout.write = (data: string): void => callback('stdout', data); // eslint-disable-line
  stderr.write = (data: string): void => callback('stderr', data); // eslint-disable-line

  const internal = new Console(stdout, stderr);

  for (const method of methods) {
    native.set(method, console[method]);
    console[method] = (internal as any)[method];
  }

  return () => {

    for (const method of methods) {
      console[method] = native.get(method);
    }

    native.clear();

  };
};
