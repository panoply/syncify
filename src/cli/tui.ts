import { isNil } from 'rambdax';
import wrap from 'wrap-ansi';
import cleanStack from 'clean-stack';
import { addSuffix, getTime } from '../shared/utils';
import { log, nil, nl } from '../shared/native';
import * as c from './ansi';

/* -------------------------------------------- */
/* WRITE LOGS                                   */
/* -------------------------------------------- */

/**
 * close
 */
export const opened = (name: string) => log(`${nl}${c.open}${c.gray(`${name} ~ ${getTime()}`)}`);

/**
 * close
 */
export const closed = (name: string) => log(`${c.line}${nl}${c.close}${c.gray(`${name} ~ ${getTime()}`)}`);

/**
 * Contained Title
 */
export const title = (name: string, color: 'gray' | 'red' | 'yellow' = 'gray') => {

  log(`${nl}${c.open}${c[color](`${name} ~ ${getTime()}`)}`);

};

const timer = (time: string) => time ? c.gray(` ~ ${time}`) : nil;
const arrow = c.gray(' →  ');

/**
 * Changed `neonCyan`
 *
 * ```
 * │ changed → source/dir/filename.ext
 * ```
 */
export const changed = (message: string) => (
  log(c.line + c.neonCyan('changed  ') + arrow + c.neonCyan(message) + timer(getTime()))
);

/**
 * changed → `neonCyan`
 * processor →
 * transfrom →
 * minify  →
 * reloaded  →
 * syncing   →
 * queued  →
 * uploaded  →
 * warning   →
 * deleted   →
 * ignored   →
 *
 * ```
 * ├ process   → esbuild ~ 500ms
 * ```
 */
export const processor = (message: string, time: string) => (
  log(c.line + c.whiteBright('processor') + arrow + c.whiteBright(message) + timer(time))
);

/**
 * `white`
 *
 * ```
 * ├ transform → source/dir/filename.ext
 * ```
 */
export const transform = (message: string) => (
  log(c.line + c.whiteBright('transform') + arrow + c.whiteBright(message))
);

/**
 * Updated `gray`
 *
 * `├ syncing  → sections/filename.liquid`
 */
export const syncing = (file: string) => (
  log(c.line + c.magentaBright('syncing  ') + arrow + c.magentaBright(file))
);

/**
 * `yellowBright`
 *
 * `├ waiting  → sections/filename.liquid ~ 2nd in-queue`
 */
export const queued = (file: string, pos: number) => (
  log(c.line + c.yellowBright('waiting  ') + arrow + c.yellowBright(`${file} ~ ${c.bold(addSuffix(pos))} in queue`))
);

/**
 * Updated `neonGreen`
 *
 * `├ uploaded   → custom → syncify.myshopify.com ~ 500ms`
 */
export const uploaded = (theme: string, store: string, time: string) => (
  log(c.line + c.neonGreen('uploaded ') + arrow + c.neonGreen(c.bold(theme) + ' → ' + store) + timer(time))
);

/**
 * `orange`
 *
 * `├ reloaded  → asset ~ 500ms`
 */
export const reloaded = (type: string, time: string) => (
  log(c.line + c.orange('reloaded ') + arrow + c.orange(type) + timer(time))
);

/**
 * Process `whiteBright`
 *
 * `├ process ...`
 */
export const message = (message: string) => log(c.item + c.whiteBright(`${message}`));

/**
 * Compile `whiteBright`
 *
 *  `├ compile ...`
 */
export const compile = (message: string) => log(c.item + c.whiteBright(`${message}`));

/**
 * Process `orange`
 *
 * `├ deleted ...`
 */
export const deleted = (message: string) => log(c.item + c.orange(`deleted ${message}`));

/**
 * Updated `neonGreen`
 *
 * `├ updated ...`
 */
export const updated = (message: string) => log(c.item + c.neonGreen(`updated ${message}`));

/**
 * Ignored `gray`
 *
 * `├ ignored ...`
 */
export const ignored = (message: string) => log(c.item + c.gray(`ignored ${message}`));

/**
 * Warning `yellowBright`
 *
 * `├ warning ...`
 */
export const warning = (message: string) => log(c.item + c.yellowBright(`${message}`));

/* -------------------------------------------- */
/* UTILITIES                                    */
/* -------------------------------------------- */

/**
 * TUI Clear
 *
 * Clears the console messages. Optionally pass
 * a `boolean` value of `true` to execute a purge
 * and clean the logs.
 */
export const clear = (purge?: boolean) => process.stdout.write(purge ? c.purge : c.clear);

/**
 * TUI Newline
 *
 * Inserts a newline _trunk_ character. Optionally pass
 * an empty string (ie: `''`) to insert a newline without
 * without c.line character
 *
 * `│`
 */
export const nwl = (blank?: '' | undefined) => isNil(blank) ? log(c.line) : log(nl);

/**
 * TUI Print
 *
 * Logs a message with the _trunk_ prepended.
 */
export const write = (message: string) => log(c.line + message);

/**
 * TUI Print
 *
 * Logs a message with the _trunk_ prepended.
 */
export const item = (message: string) => log(c.item + message);

/* -------------------------------------------- */
/* PRINTED MESSAGES                             */
/* -------------------------------------------- */

/**
 * Spawned Logging
 *
 * Logging interface for spawned running operations. This
 * function will normalize the output and keep it aligned
 * with the TUI. This is invoked by the return function of
 * `log.spawn()` in `logger/console.ts` which has _stdout_
 * passed via `spawned()` in `cli/spawned.ts` and assigned
 * by the `setSpawn()` call in `options/define.ts`
 *
 * ```
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * ```
 */
export const spawn = (data: string) => {

  const limit = process.stdout.columns - 5;
  const stdout: string[] = [];
  const stderr: string[] = [ c.reset(c.line) ];
  const error = data.search(/(?:\n {4}at .*)/);

  let message: string[] = [];

  if (/\berror\b:?/i.test(data) && error > 0) {

    message = data.slice(0, error).split(nl);

    const stack = cleanStack(data.slice(error), { pretty: true, basePath: process.cwd() });
    const lines = wrap(stack, limit).split(nl);

    stderr.push(nl);

    while (lines.length !== 0) {
      const line = lines.shift();
      if (line.trim().length > 0) stderr.push(c.reset(c.item + line));
    }
  }

  if (message.length === 0) message = data.split(nl);

  while (message.length !== 0) {
    const line = message.shift();
    if (line.trim().length > 0) stdout.push(c.reset(c.line) + line);
  }

  log(`${stdout.join(nl)}${stderr.length > 1 ? stderr.join(nl) : nil}`);

};
