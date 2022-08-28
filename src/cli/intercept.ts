import { PassThrough } from 'node:stream';
import { Console } from 'node:console';
import { forEach } from 'rambdax';
import { CONSOLE_METHODS } from '../constants'

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

/**
 * Callback function method
 */
type Callback = (stream: 'stdout' | 'stderr', data: string) => void


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

  for (const method of CONSOLE_METHODS) {
    native.set(method, console[method]);
    console[method] = (internal as any)[method];
  }

  return () => {

    for (const method of CONSOLE_METHODS) console[method] = native.get(method);
    native.clear();

  };
};
