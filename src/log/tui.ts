import type { Colors } from '~cli/ansi';
import { has, hasPath } from 'rambdax';
import readline from 'node:readline';
import wrap from 'wrap-ansi';
import { REGEX_LINE_NO, REGEX_ADDRESS, REGEX_OBJECT, REGEX_QUOTES, REGEX_STRING } from '~const';
import { glue, isArray, log, nil, nl, nlr, ws, wsr } from '~utils/native';
import { getTime } from '~utils/utils';
import * as c from '~cli/ansi';
import { LiteralUnion } from 'type-fest';
import { size } from '~cli/size';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

/**
 * Loggers
 *
 * Literal is used to determine the colors to use in
 * different TUI formatters.
 */
type Loggers = (
  | 'error'
  | 'warning'
  | 'info'
)

/**
 * Log Prefixes
 *
 * The CLI logs will be prefixed with the different naming groups.
 * Each prefix name infers an action pertaining to an executed operation.
 * Depending on the prefix name character length of the arrow separator
 * will equally distributed.
 */
type Prefixes = LiteralUnion<string, (
  | 'changed'
  | 'process'
  | 'exports'
  | 'skipped'
  | 'importer'
  | 'transform'
  | 'minified'
  | 'reloaded'
  | 'syncing'
  | 'queued'
  | 'pending'
  | 'external'
  | 'uploaded'
  | 'invalid'
  | 'failed'
  | 'retrying'
  | 'warning'
  | 'deleted'
  | 'ignored'
)>

export let stack: string = nil;

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
export function clear () {

  const count = process.stdout.rows - 2;
  const blank = count > 0 ? nlr(count) : nil;

  log(blank);

  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);

}

/**
 * TUI Horizontal Row
 *
 * Prints a horizontal line separator. Will span the length
 * of the terminal pane.
 *
 * ```
 * │
 * ├────────────────────────────────────────────────
 * │
 * ```
 */
export function hline (minus = 15) {

  log(c.hr(minus));

}

/* -------------------------------------------- */
/* WRITE LOGS                                   */
/* -------------------------------------------- */

/**
 * String Suffix
 *
 * Generates a formated string with prefix group that has an equally distributed spacing.
 *
 * ```
 * │ prefix → operation message
 * ```
 */
export function suffix (color: Colors, prefix: Prefixes, message: string) {

  const line = (prefix === 'invalid' || prefix === 'failed')
    ? c.line.red
    : prefix === 'warning'
      ? c.line.yellow
      : c.line.gray;

  return (
    line +
    c[color](prefix) +
    wsr(10 - prefix.length) +
    c.ARR +
    ws +
    c[color](message)
  );

};

/**
 * TUI Opener
 *
 * ```
 * ┌─ Name ~ 01:59:20
 * ```
 */
export function opener (name: string) {

  return (
    nl +
    c.open +
    c.gray(`${name} ~ ${getTime()}`)
  );
}

/**
 * TUI Closer
 *
 * ```
 * │
 * └─ Name ~ 01:59:20
 * ```
 */
export function closer (name: string) {

  return (
    c.line.gray + nl +
    c.close +
    c.gray(`${name} ~ ${getTime()}`)
  );
}

/**
 * TUI Message `whiteBright`
 *
 * Generates a message without prefix. The is practically identical
 * to the `suffix` generator but does not apply group name.
 *
 * ```
 * │ lorem ipsum lorem ipsum
 * ```
 */
export function message (color: Colors, message: string) {

  return (
    c.line.gray +
    c[color](message)
  );
}

/**
 * TUI Shopify
 *
 * Parses Shopify 422 error responses from failed requests.
 * Applies some sanity and normalization to the output.
 */
export function shopify (message: string | string[]) {

  if (isArray(message)) return glue(message.map(shopify));

  let output: string = message;

  output = output.replace(REGEX_LINE_NO, c.gray('$1') + c.white('$2') + c.gray('$3') + c.white('$4') + nlr(2));
  output = output.replace(REGEX_QUOTES, c.yellowBright.bold('$1'));
  output = output.replace(REGEX_OBJECT, c.cyan('$1') + c.whiteBright('$2') + c.cyan('$3'));
  output = output.replace(REGEX_ADDRESS, c.underline('$1'));
  output = output.replace(REGEX_STRING, c.magenta('$1') + c.cyan('$2') + c.magenta('$3'));

  return indent(c.red(wrap(output, size().columns - 15)), { line: c.line.red });

}

export function sample (code: string, data: {
  line?: typeof c.line.red,
  span?: {
    start: number,
    end: number
  }
} = {}) {

  const line = has('line', data) ? data.line : c.line.gray;

  if (hasPath('span.start', data)) {

    const end = has('end', data.span) ? data.span.end : data.span.start + 1;

    return line + nl + glue([
      `${line}${c.blue(`${data.span.start - 1}`)}${c.COL + nl}` +
      `${line}${c.blue(`${data.span.start}`)}${c.COL} ${code + nl}` +
      `${line}${c.blue(`${end}`)}${c.COL + nl}`
    ]);

  }

  return line + nl + line + code;

}

export function indent (message: string | string[], ansi: {
  nwl?: boolean;
  text?: typeof c.white,
  line?: typeof c.line.red,
} = {}) {

  const lines = isArray(message) ? message : message.split(nl).filter(Boolean);
  const line = has('line', ansi) ? ansi.line : c.line.gray;

  let output: string = has('nwl', ansi) ? `${line + nl}` : nil;

  while (lines.length !== 0) {

    const text = lines.shift();

    if (text.trim().length > 0) {
      if (!text.trim().startsWith(line)) {
        output += line + (has('text', ansi) ? ansi.text(text.trimStart()) : text.trimStart()) + nl;
      } else {
        output += (has('text', ansi) ? ansi.text(text) : text) + nl;
      }
    } else {
      output += line + nl;
    }
  }

  return output;

}

/* -------------------------------------------- */
/* FORMATTERS                                   */
/* -------------------------------------------- */

/**
 * TUI Context Details
 *
 * This prints an equally space distributed table of
 * `key: value` records, typically used in errors.
 *
 * ```
 * │
 * │ Code:      422
 * │ File:     ~source/dir/filename.liquid
 * │ Status:    Unprocessed Entity
 * ```
 */
export function context (data: {
  stack: string | false;
  entries: {
    [name: string]: string | number
  }
}) {

  let space: number = 0;
  let output: string = c.line.red + nl;

  // equalize indent spaces
  for (const k in data.entries) if (space < k.length && data.entries[k]) space = k.length;

  // generate output
  for (const k in data.entries) {

    if (data.entries[k]) {
      output += glue([
        c.line.red,
        c.red(k),
        c.COL + ws,
        wsr(space - k.length),
        c.gray(`${data.entries[k]}`) + nl
      ]);
    }
  }

  if (data.stack) {
    stack = data.stack;
    output += glue([
      c.line.red,
      c.red('stack'),
      c.COL + ws,
      wsr(space - 5),
      c.gray(`Type ${c.bold('s')} and press ${c.bold('enter')} to view stack trace`),
      nl + c.line.gray
    ]);
  }

  return output.trimEnd();

};

/**
 * TUI Multiline
 *
 * ```
 * │
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │
 * ```
 */
export function multiline (type: Loggers, message: string): string {

  let line = c.line.gray;
  let color = c.white;

  if (type === 'error') {
    line = c.line.red;
    color = c.red;
  } else if (type === 'warning') {
    line = c.line.yellow;
    color = c.yellowBright;
  }

  const stdout = [];
  const input = message.trim();
  const lines = wrap(input, size().columns - 15).split(nl);

  while (lines.length !== 0) {
    const text = lines.shift();
    if (text.trim().length > 0) stdout.push(line + color(text));
  }

  return line + nl + stdout.join(nl);

};
