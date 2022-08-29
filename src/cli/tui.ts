import { has, isNil } from 'rambdax';
import wrap from 'wrap-ansi';
import cleanStack from 'clean-stack';
import { addSuffix, byteConvert, getTime } from '../shared/utils';
import { isArray, log, nil, nl } from '../shared/native';
import type { Colors } from './ansi';
import * as c from './ansi';
import { bundle } from '../config';
import { Error } from 'types';

/**
 * LOG PREFIXES
 *
 * The CLI logs will be prefixed with the different naming groups.
 * Each prefix name infers an action pertaining to an executed operation.
 * Depending on the prefix name character length of the arrow separator
 * will equally distributed.
 *
 * changed   →  3 spaces
 * processor →  0 spaces
 * transfrom →  0 spaces
 * minified  →  2 spaces
 * reloaded  →  2 spaces
 * syncing   →  3 spaces
 * queued    →  4 spaces
 * pending   →  3 spaces
 * uploaded  →  2 spaces
 * invalid   →  3 spaces
 * failed    →  4 spaces
 * retrying  →  2 spaces
 * warning   →  3 spaces
 * deleted   →  3 spaces
 * ignored   →  3 spaces
 *
 * LOG METHOD
 *
 * The native `console.log` is used for printing each message, opposed to using
 * `process.stdout.write`. This is largely because we want the newlines to
 * be applied for every new log message. The _shared/native_ exports a cached
 * deconstruction of the `log` method from `console`.
 */

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

/* -------------------------------------------- */
/* WRITE LOGS                                   */
/* -------------------------------------------- */

/**
 * TUI Opened
 *
 * ```
 * ┌─ Name ~ 01:59:20
 * ```
 */
export const opened = (name: string) => log(
  nl +
  c.open +
  c.gray(`${name} ~ ${getTime()}`)
);

/**
 * TUI Closed
 *
 * ```
 * └─ Name ~ 01:59:20
 * ```
 */
export const closed = (name: string) => log(
  c.line +
  nl +
  c.close +
  c.gray(`${name} ~ ${getTime()}`)
);

/**
 * Contained Title
 */
export const title = (name: string) => log(
  nl +
  c.open +
  c.gray(`${name} ~ ${getTime()}`)
);

/**
 * TUI Changed `neonCyan`
 *
 * ```
 * │ changed → source/dir/filename.ext
 * ```
 */
export const changed = (message: string) => log(
  c.line +
  c.neonCyan('changed  ') +
  c.arrow +
  c.neonCyan(message) +
  c.time(getTime())
);

/**
 * TUI Processor `whiteBright`
 *
 * ```
 * │ process   → esbuild ~ 500ms
 * ```
 */
export const processor = (message: string, time: string) => log(
  c.line +
  c.whiteBright('processor') +
  c.arrow +
  c.whiteBright(message) +
  c.time(time)
);

/**
 * TUI Transfrom `whiteBright`
 *
 * ```
 * │ transform →  source/dir/filename.ext
 * ```
 */
export const transform = (message: string) => log(
  c.line +
  c.whiteBright('transform') +
  c.arrow +
  c.whiteBright(message)
);

/**
 * TUI Syncing `magentaBright`
 *
 * ```
 * │ syncing  →  sections/filename.liquid
 * ```
 */
export const syncing = (file: string) => log(
  c.line +
  c.magentaBright('syncing  ') +
  c.arrow +
  c.magentaBright(file)
);

/**
 * TUI Pending `yellowBright`
 *
 * ```
 * │ pending   →  uploads paused ~ 4 requests pending
 * ```
 */
export const pending = (file: string, req: number) => log(
  c.line +
  c.yellowBright('pending  ') +
  c.arrow +
  c.yellowBright('uploads paused') +
  c.gray(`~ ${c.bold(`${req}`)} ${req > 1 ? 'requests' : 'request'} pending`)
);

/**
 * TUI Queued `yellowBright`
 *
 * ```
 * │ waiting  →  sections/filename.liquid ~ 2nd in-queue
 * ```
 */
export const queued = (file: string, pos: number) => log(
  c.line +
  c.yellowBright('waiting  ') +
  c.arrow +
  c.yellowBright(`${file} ~ ${c.bold(addSuffix(pos))} in queue`)
);

/**
 * TUI Minified `whiteBright`
 *
 * ```
 * │ minified  →  200kb > 120kb ~ saved 80kb
 * ```
 */
export const minified = (before: string, after: string, saved: number) => log(
  c.line +
  c.whiteBright('minified  ') +
  c.arrow +
  before + ' > ' + after +
  c.gray(`~ saved ${byteConvert(saved)}`)
);

/**
 * TUI Uploaded `neonGreen`
 *
 * ```
 * │ uploaded →  resource → syncify.myshopify.com ~ 500ms
 * ```
 */
export const uploaded = (resource: string, store: string, time: string) => log(
  c.line +
  c.neonGreen('uploaded ') +
  c.arrow +
  c.neonGreen(`${c.bold(resource)} → ${store}`) +
  c.time(time)
);

/**
 * TUI Reloaded `magentaBright`
 *
 * ```
 * │ reloaded →  section → sections/filename.liquid ~ 500ms
 * ```
 */
export const reloaded = (type: string, time: string) => log(
  c.line +
  c.magentaBright('reloaded ') + c.arrow +
  c.magentaBright(type) +
  c.time(time)
);

/**
 * TUI Ignored `yellow`
 *
 * ```
 * │ ignored   →  sections/filename.liquid
 * ```
 */
export const ignored = (filename: string) => log(
  c.line +
  c.yellow('ignored  ') +
  c.arrow +
  c.yellow(filename)
);

/**
 * TUI Invalid `redBright`
 *
 * ```
 * │ invalid  →  sections/filename.liquid
 * ```
 */
export const invalid = (filename: string) => log(
  c.line +
  c.red('invalid  ') +
  c.arrow +
  c.red.bold(filename)
);

/**
 * TUI Failed `redBright`
 *
 * ```
 * │ failed   →  sections/filename.liquid
 * ```
 */
export const failed = (filename: string) => log(
  c.eline +
  c.red('failed   ') +
  c.arrow +
  c.red(filename)
);

/**
 * TUI Warning `orange`
 *
 * ```
 * │ retrying  →  sections/filename.liquid → theme ~ syncify.myshopify.com
 * ```
 */
export const retrying = (file: string, resource: string, store: string) => log(
  c.line +
  c.orange('retrying   ') +
  c.arrow +
  c.orange(`${file} → ${c.bold(resource)}`) +
  c.gray(` ~ ${store}`)
);

/**
 * TUI Warning `yellowBright`
 *
 * ```
 * │ warning   →  2 sass warnings ~ Type w and press enter to view
 * ```
 */
export const warning = (file: string) => log(
  c.line +
  c.yellowBright('warning   ') +
  c.arrow +
  c.yellowBright.bold(file) +
  c.warn
);

/**
 * TUI Deleted `blueBright`
 *
 * ```
 * │ deleted   →  sections/filename.liquid
 * ```
 */
export const deleted = (filename: string) => log(
  c.line +
  c.blueBright('deleted   ') +
  c.arrow +
  c.blueBright(filename)
);

/**
 * TUI Message `whiteBright`
 *
 * ```
 * │ lorem ipsum lorem ipsum
 * ```
 */
export const message = (message: string) => log(
  c.line + c.whiteBright(`${message}`)
);

/**
 * TUI Multiline `gray` OR `whiteBright`
 *
 * ```
 * │
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │
 * ```
 */
export const multiline = <T = void>(message: string | string[], color: Colors, text: boolean = true): T => {

  const limit = process.stdout.columns - 5;
  const input = isArray(message) ? message.join(nl) : message.trim();
  const lines = wrap(input, limit).split(nl);
  const stdout = [];

  while (lines.length !== 0) {
    const line = lines.shift();
    if (line.trim().length > 0) stdout.push(c.line + c[color](line));
  }

  const output = c.line + nl + stdout.join(nl) + nl + c.line;

  return (text ? log(output) : output) as T;

};

/**
 * TUI Errors
 *
 * ```
 * │  invalid  →  sections/filename.liquid
 * │
 * │  ERROR 422:
 * │
 * │  lorem ipsum lorem ipsum, lorem ipsum lorem ipsum lorem:
 * │
 * │  19 |
 * │  20 | Hello World {{ tag }
 * │  21 |                    ^
 * │
 * │  DETAILS:
 * │
 * │  - lorem ipsum lorem ipsum
 * │  - lorem ipsum lorem ipsum lorem
 * │
 * │  LOCATION:
 * │
 * │  line:    20
 * │  column:  14
 * │  file:    src/views/sections/filename.liquid
 * │
 * │  NOTES:
 * │
 * │  some addition notes in italic gray will be printed
 * │
 * │  STACK:
 * │
 * │  at startup (node.js:139:18)
 * │  at startup (node.js:139:18)
 * │
 * ```
 */
export const error = (e: Error) => {

  const stderr: string[] = [];
  const title = c.red.bold(`ERROR${has('code', e) ? ` ${e.code + c.colon}` : c.colon}`);

  stderr.push(c.line + nl + c.line + title);
  stderr.push(multiline(e.message, 'redBright', false));

  if (e.details) {

    stderr.push(c.line + c.redBright.bold('DETAILS' + c.colon) + nl + c.line);

    if (isArray(e.details)) {

      while (e.details.length !== 0) {
        const line = e.details.shift();
        if (line.trim().length > 0) stderr.push(c.line + c.gray('- ') + c.redBright(line));
      }

      stderr.push(nl + c.line);
    }
  }

  if (e.notes) {
    stderr.push(c.line + c.gray('NOTES:') + nl + c.line);
    stderr.push(c.italic(multiline(e.notes, 'gray', false)));
  }

  if (e.location) {
    stderr.push(c.line + c.redBright('LOCATION:') + nl + c.line + nl);
    stderr.push(c.line + c.gray('line:   ') + c.whiteBright(`${e.location.line}`) + nl);

    if (e.location.column) {
      stderr.push(c.line + c.gray('column: ') + c.whiteBright(`${e.location.column}`) + nl + c.line + nl);
    }
  }

  if (e.stack) {
    stderr.push(c.line + c.redBright('STACK:') + nl + c.line + nl);
    const stack = cleanStack(e.stack, { pretty: true, basePath: bundle.cwd });
    const lines = wrap(stack, process.stdout.columns - 5).split(nl);
    while (lines.length !== 0) {
      const line = lines.shift();
      if (line.trim().length > 0) stderr.push(c.reset(c.line + line));
    }
  }

  if (e.throw) {
    throw log(stderr.join(nil));
  } else {
    log(stderr.join(nl));
  }
};

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

    const stack = cleanStack(data.slice(error), { pretty: true, basePath: bundle.cwd });
    const lines = wrap(stack, limit).split(nl);

    stderr.push(nl);

    while (lines.length !== 0) {
      const line = lines.shift();
      if (line.trim().length > 0) stderr.push(c.reset(c.line + line));
    }
  }

  if (message.length === 0) message = data.split(nl);

  while (message.length !== 0) {
    const line = message.shift();
    if (line.trim().length > 0) stdout.push(c.reset(c.line) + line);
  }

  log(`${stdout.join(nl)}${stderr.length > 1 ? stderr.join(nl) : nil}`);

};
