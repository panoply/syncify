/* eslint-disable quote-props */
/* eslint-disable dot-notation */
import process from 'node:process';
import readline from 'node:readline';
import { isAsyncFunction } from 'node:util/types';

type Listener = (data: any, key: readline.Key) => void;

interface Prexit {
  /**
   * Intercepts process exit key sequences via `stdin` and runs the
   * callbacks. Triggers `process.exit(0)` once hooks resolve. Dispose
   * hooks by calling the function instance, just like `kill`
   *
   * @example
   * import { prexit } from '@syncify/kill';
   *
   * prexit(async () => {
   *
   *    console.log('Pressed ctrl + c')
   *
   *    await new Promise(resolve => setTimeout(resolve , 2000))
   *
   *    console.log('process exit will be invoked')
   *
   * })
   *
   */
  (...params: [
    id: string,
    callback: (() => any) | (() => Promise<any>),
    code?: number
  ] | [
    id: string,
    callback: (() => any) | (() => Promise<any>)
  ] | [
    callback: (() => any) | (() => Promise<any>),
    code?: number
  ] | [
    callback: (() => any) | (() => Promise<any>)
  ] | []): () => boolean;
  /**
   * The `Set` store of kill hooks to run on `process.exit(0)`
   */
  hooks: Map<string, Function>;
  /**
   * Whether or not exit listeners are attached
   */
  setup: boolean;
  /**
   * Whether or not `process.exit(0)` was triggered.
   */
  fired: boolean;
  /**
   * Control the exit code
   *
   *
   * Trigger disposal, programmatic call for all hooks. Pass in value `0` to
   * execute `process.exit(0)` after disposal completes.
   *
   * - `0` _Success_
   * - `1` _General error_
   * - `2` _Misuse of shell built-ins (e.g., invalid arguments)_
   * - `126` _Command invoked cannot execute_
   * - `127` _Command not found_
   * - `128` _Invalid exit argument_
   * - `130` _Script terminated by Ctrl+C (SIGINT)_ (default)
   * - `255` _Exit status out of range_
   *
   * @default 130
   */
  code: number;
  /**
   * Optional listeners for additional keypress events
   */
  listener: (handler: Listener) => void;
  /**
   * The key sequences to intercept
   */
  intercept: {
    /**
     * Intercept keypress sequence of `\x1b`
     *
     * @default true
     */
    'escape': boolean;
    /**
     * Intercept keypress sequence of `\u0003`
     *
     * @default true
     */
    'ctrl+c': boolean;
    /**
     * Intercept keypress sequence of `\u0004`
     *
     * @default false
     */
    'ctrl+d': boolean;
    /**
     * Intercept keypress sequence of `\u001A`
     *
     * @default false
     */
    'ctrl+z': boolean;
  }
}

/**
 * Press Hooks
 *
 * Intercepts process exit key sequences and runs the callbacks before processes are killed
 */
export const prexit: Prexit = function (...params) {
  let id: string | undefined;
  let callback: Function | undefined;

  // Parse parameters
  if (params.length === 3) {
    [ id, callback, prexit.code ] = params;
  } else if (params.length === 2) {
    if (typeof params[0] === 'string') {
      [ id, callback ] = params as [string, Function];
    } else {
      callback = params[0];
      id = callback.name || Date.now().toString();
      prexit.code = params[1] as number;
    }
  } else if (params.length === 1) {
    callback = params[0];
    id = callback.name || Date.now().toString();
  }

  // If a callback is provided, register it as a hook
  if (callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    prexit.hooks.set(id!, callback);
  }

  // Setup keypress listeners if not already done
  if (!prexit.setup) {
    prexit.setup = true;
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    process.stdin.resume();

    process.stdin.on('keypress', async (_, key) => {
      if (prexit.fired) return;

      // Single key triggers for exit
      if (
        (prexit.intercept['escape'] && key.sequence === '\u001b') ||
        (prexit.intercept['ctrl+c'] && key.sequence === '\u0003') ||
        (prexit.intercept['ctrl+d'] && key.sequence === '\u0004') ||
        (prexit.intercept['ctrl+z'] && key.sequence === '\u001a')
      ) {
        await hooks();
      }
    });
  }

  // Return disposer if a hook was added
  return id ? () => prexit.hooks.delete(id) : () => false;
} as Prexit;

// Attach properties
prexit.hooks = new Map();
prexit.code = 130;
prexit.setup = false;
prexit.fired = false;
prexit.intercept = {
  'escape': true,
  'ctrl+c': true,
  'ctrl+d': false,
  'ctrl+z': false
};

// Method to add custom keypress listeners (renamed to listener)
prexit.listener = (handler: Listener) => {
  if (!prexit.setup) {
    prexit(); // Setup listeners if not already done
  }
  process.stdin.on('keypress', handler);
};

// Helper to run all hooks
async function hooks () {
  if (prexit.fired) return;
  prexit.fired = true;

  const promises: Promise<any>[] = [];

  for (const [ id, hook ] of prexit.hooks) {
    try {
      const result = hook();
      if (isAsyncFunction(hook)) {
        promises.push(result);
      } else if (result instanceof Promise) {
        promises.push(result);
      }
    } catch (err) {

      console.error(`Error in hook ${id}:`, err);

    }
  }

  await Promise.allSettled(promises);

  process.exit(prexit.code);

}
