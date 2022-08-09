import { isNil } from 'rambdax';
import wrap from 'wrap-ansi';
import cleanStack from 'clean-stack';
import { getTime } from '../shared/utils';
import { log, nil, nl } from '../shared/native';
import * as c from './ansi';

/* -------------------------------------------- */
/* WRITE LOGS                                   */
/* -------------------------------------------- */

/**
 * close
 */
export const opened = (name: string) => {

  log(`${nl}${c.open}${c.pink.bold(name.toUpperCase())} ${c.gray('~')} ${c.gray(getTime())}`);

};

/**
 * close
 */
export const closed = (name: string) => {

  log(`${c.line}${nl}${c.close}${c.pink.bold(name.toUpperCase())} ${c.gray('~')} ${c.gray(getTime())}`);

};

/**
 * Contained Title
 */
export const title = (name: string, color: 'blueBright' | 'red' | 'yellow' = 'blueBright') => {

  let str: string = nil;
  if (color === 'blueBright') {
    str = c.bold[color].italic(name);
  } else {
    str = c.bold[color](name);
  }

  log(`${c.line}${nl}${c.line}${str}${nl}${c.line}`);

};

/**
 * Changed `cyan`
 *
 * `├ changed ...`
 */
export const changed = (message: string) => log(c.item + c.cyan(`changed ${message}`));

/**
 * Syncing `neonCyan`
 *
 * `├ syncing ...`
 */
export const syncing = (message: string) => log(c.item + c.neonCyan(`syncing ${message}`));

/**
 * Process `whiteBright`
 *
 * `├ process ...`
 */
export const message = (message: string) => log(c.item + c.whiteBright(`process ${message}`));

/**
 * Compile `whiteBright`
 *
 *  `├ compile ...`
 */
export const compile = (message: string) => log(c.item + c.whiteBright(`compile ${message}`));

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
export const warning = (message: string) => log(c.line + c.yellowBright(`warning ${message}`));

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

  log(`${stdout.join(nl)}${stderr.join(nl)}`);

};
