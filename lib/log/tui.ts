import type { LiteralUnion } from 'type-fest';
import type { Colors } from 'syncify:ansi';
import readline from 'node:readline';
import { stdout } from 'node:process';
import { has, hasPath } from 'rambdax';
import wrap from 'wrap-ansi';
import { log } from 'syncify:native';
import { isArray, getTime, glue } from 'syncify:utils';
import { $ } from 'syncify:state';
import * as c from 'syncify:ansi';
import ansis from 'ansis';
import {
  REGEX_LINE_NO,
  REGEX_ADDRESS,
  REGEX_OBJECT,
  REGEX_QUOTES,
  REGEX_STRING,
  REGEX_FILENAME
} from 'syncify:const';

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
  | 'updated'
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

export let stack: string = NIL;

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

  const count = stdout.rows - 2;
  const blank = count > 0 ? NWL.repeat(count) : NIL;

  log(blank);

  readline.cursorTo(stdout, 0, 0);
  readline.clearScreenDown(stdout);

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

  let ln = (prefix === 'invalid' || prefix === 'failed')
    ? c.line.red
    : prefix === 'warning'
      ? c.line.yellow
      : c.line.gray;

  let space = 10 - prefix.length;

  if (space < 0) space = 0;

  if ($.mode.build) {
    if (prefix.startsWith('✓ ')) {
      prefix = prefix.replace('✓ ', '');
      space = 10 - prefix.length;
      ln = ln + c.CHK;
    }
  }

  const cl = ansis[color];

  return ln + cl(prefix) + WSP.repeat(space) + c.ARR + WSP + cl(message);

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
    NWL +
    c.open +
    c.reset.gray(`${name} ~ ${getTime()}`)
  );
}

/**
 * TUI Opener
 *
 * ```
 * ┌─ Name ~ 01:59:20
 * ```
 */
export function tree (direction: 'top' | 'bottom', name: string) {

  return direction === 'top' ? (
    c.top + name
  ) : (
    c.bottom + name
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
  // c.line.gray + NWL +
    c.close +
    c.reset.gray(`${name} ~ ${getTime()}`)
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
    ansis[color](message)
  );
}

/**
 * TUI Shopify
 *
 * Parses Shopify 422 error responses from failed requests.
 * Applies some sanity and normalization to the output.
 */
export function shopify (message: string | string[]) {

  if (isArray(message)) return message.map(shopify).join(NIL);

  let output: string = message;

  output = output.replace(REGEX_LINE_NO, c.gray('$1') + c.white('$2') + c.gray('$3') + c.white('$4') + NWL.repeat(2));
  output = output.replace(REGEX_QUOTES, c.yellow.bold('$1'));
  output = output.replace(REGEX_OBJECT, c.cyan('$1') + c.whiteBright('$2') + c.cyan('$3'));
  output = output.replace(REGEX_ADDRESS, c.underline('$1'));
  output = output.replace(REGEX_STRING, c.magenta('$1') + c.cyan('$2') + c.magenta('$3'));
  output = output.replace(REGEX_FILENAME, c.neonCyan.bold('$1'));

  return indent(c.redBright(wrap(output, $.terminal.wrap)), { line: c.line.red });

}

export function sample (code: string, data: {
  line?: typeof c.line.red,
  span?: {
    start: number,
    end: number
  }
} = {}) {

  const ln = has('line', data) ? data.line : c.line.gray;

  if (hasPath('span.start', data)) {

    const end = has('end', data.span) ? data.span.end : data.span.start + 1;

    return ln + NWL + glue([
      `${ln}${c.blue(`${data.span.start - 1}`)}${c.COL + NWL}` +
      `${ln}${c.blue(`${data.span.start}`)}${c.COL} ${code + NWL}` +
      `${ln}${c.blue(`${end}`)}${c.COL + NWL}`
    ]);

  }

  return ln + NWL + ln + code;

}

export function indent (message: string | string[], ansi: {
  nwl?: boolean;
  text?: typeof c.white,
  line?: typeof c.line.red,
} = {}) {

  const lines = isArray(message) ? message : message.split(NWL).filter(Boolean);
  const ln = has('line', ansi) ? ansi.line : c.line.gray;

  let output: string = has('nwl', ansi) ? `${ln + NWL}` : NIL;

  while (lines.length !== 0) {

    const text = lines.shift();

    if (text.trim().length > 0) {
      if (!text.trim().startsWith(ln)) {
        output += ln + (has('text', ansi) ? ansi.text(text.trimStart()) : text.trimStart()) + NWL;
      } else {
        output += (has('text', ansi) ? ansi.text(text) : text) + NWL;
      }
    } else {
      output += ln + NWL;
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
  let output: string = c.line.red + NWL;

  // equalize indent spaces
  for (const k in data.entries) if (space < k.length && data.entries[k]) space = k.length;

  // generate output
  for (const k in data.entries) {
    if (data.entries[k]) {
      output += glue(
        [
          c.line.red,
          c.white(k),
          c.COL + WSP,
          WSP.repeat(space - k.length),
          c.gray(`${k === 'source' ? c.underline(`${data.entries[k]}`) : data.entries[k]}`) + NWL
        ]
      );
    }
  }

  if (data.stack) {
    stack = data.stack;
    output += glue(
      [
        c.line.red,
        c.white('stack'),
        c.COL + WSP,
        WSP.repeat(space - 5),
        c.gray(`Type ${c.bold('s')} and press ${c.bold('enter')} to view stack trace`),
        NWL + c.line.gray
      ]
    );
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

  let ln = c.line.gray;
  let color = c.white;

  if (type === 'error') {
    ln = c.line.red;
    color = c.red;
  } else if (type === 'warning') {
    ln = c.line.yellow;
    color = c.yellowBright;
  }

  const stdout = [];
  const input = message.trim();
  const lines = wrap(input, $.terminal.wrap).split(NWL);

  while (lines.length !== 0) {
    const text = lines.shift();
    if (text.trim().length > 0) stdout.push(ln + color(text));
  }

  return ln + NWL + stdout.join(NWL) + NWL;

};
