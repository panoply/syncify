import process from 'node:process';
import { isAsyncFunction } from 'node:util/types';

const LINUX = process.platform === 'linux';
const WINDOWS = process.platform === 'win32';
const SIGNALS = [
  'SIGABRT',
  'SIGALRM',
  'SIGHUP',
  'SIGINT',
  'SIGTERM'
];

if (!WINDOWS) {
  SIGNALS.push(
    'SIGVTALRM',
    'SIGXCPU',
    'SIGXFSZ',
    'SIGUSR2',
    'SIGTRAP',
    'SIGSYS',
    'SIGQUIT',
    'SIGIOT'
  );

}

if (LINUX) {
  SIGNALS.push(
    'SIGIO',
    'SIGPOLL',
    'SIGPWR',
    'SIGSTKFLT',
    'SIGUNUSED'
  );
}

interface Kill {
  /**
   * The kill hook to be trigger on `process.exit(0)`
   * You can dispose of the hook by calling the function
   *
   * @example
   * import { kill } from '@syncify/kill';
   *
   * kill(() => console.log('I will run before process exit'))
   *
   * const dispose = kill(() => console.log('I will not run on process exit'))
   *
   * dispose()
   *
   * process.exist(0)
   */
  (callback: ((() => any) | (() => Promise<any>))): () => boolean;
  /**
   * The `Set` store of kill hooks to run on `process.exit(0)`
   */
  hooks: Set<Function>;
  /**
   * Whether or not exit listeners are attached
   */
  setup: boolean;
  /**
   * Whether or not `process.exit(0)` was triggered.
   */
  fired: boolean;
  /**
   * Trigger disposal, programmatic call for all hooks. Pass in value `0` to
   * execute `process.exit(0)` after disposal completes.
   *
   * - `0` _Success_ (default)
   * - `1` _General error_
   * - `2` _Misuse of shell built-ins (e.g., invalid arguments)_
   * - `126` _Command invoked cannot execute_
   * - `127` _Command not found_
   * - `128` _Invalid exit argument_
   * - `130` _Script terminated by Ctrl+C (SIGINT)_
   * - `255` _Exit status out of range_
   */
  exit:(exit?: number) => void;

}

/**
 * Kill Hooks
 *
 * Provide functions to trigger before `process.exit(0)` executes.
 * Accepts Async callbacks and attempts to resolve before exit concludes.
 */
export const kill: Kill = function (callback) {

  kill.hooks.add(callback);

  if (!kill.setup) {

    kill.setup = true;

    process.once('exit', () => hook());

    for (const signal of SIGNALS) {
      try {

        process.once(signal, () => hook(signal));

      } catch {}
    }
  }

  return () => kill.hooks.delete(callback);

};

kill.hooks = new Set();
kill.setup = false;
kill.fired = false;
kill.exit = function (code: number = 0) {

  if (code > 0) {
    kill.hooks.clear();
    process.exit(code);
  }

  const done = () => {

    if (kill.hooks.size > 0) kill.hooks.clear();

    process.exit(code);

  };

  const wait: Promise<any>[] = [];

  kill.hooks.forEach(hook => isAsyncFunction(hook) ? wait.push(hook()) : hook());

  Promise.allSettled(wait).finally(done);

};

function hook (signal?: string) {

  if (kill.fired === true) return;

  const wait: Promise<any>[] = [];

  const done = () => {
    if (signal) {
      // Node emulates these 3 signals, but windows does not support POSIX signals
      if (WINDOWS && (signal !== 'SIGINT' && signal !== 'SIGTERM' && signal !== 'SIGKILL')) {
        process.kill(process.pid, 'SIGTERM');
      } else {
        process.kill(process.pid, signal);
      }
    }
  };

  kill.fired = true;
  kill.hooks.forEach(cb => isAsyncFunction(cb) ? wait.push(cb()) : cb());

  Promise.allSettled(wait).finally(done);

}
