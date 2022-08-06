import { PassThrough } from 'stream';

/* -------------------------------------------- */
/* CONSTANTS                                    */
/* -------------------------------------------- */

/**
 * Intercepts `stdout` and `stderr` console methods
 * and ensure log output is correctly printed. Interception
 * is dynamic and is only enabled during processing to catch
 * any logs from external tooling.
 */
export function intercept (callback: (stream: 'stdout' | 'stderr', data: string) => void): () => void {

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

  const native: Map<string, unknown> = new Map();
  const stdout: any = new PassThrough();
  const stderr: any = new PassThrough();

  stdout.write = (data: string): void => callback('stdout', data); // eslint-disable-line
  stderr.write = (data: string): void => callback('stderr', data); // eslint-disable-line

  const internal = new console.Console(stdout, stderr);

  for (const method of methods) {
    native.set(method, console[method]);
    console[method] = (internal as any)[method];
  }

  return () => {
    for (const method of methods) console[method] = native.get(method);
    native.clear();
  };
};
