import type { Ansis } from 'ansis';
import type { LiteralUnion } from 'type-fest';

import wrap from 'wrap-ansi';

import { glue } from '@syncify/glue';

import { WSP } from './characters';
import {
  bold,
  gray,
  lightGray,
  neonRouge,
  red,
  redBright,
  reset,
  strip,
  underline,
  whiteBright,
  yellow,
  yellowBright
} from './colors';
import { detect, eq, getTime, sanitize } from './helpers';
import { cleanStack } from './stack';
import { ARR, BAD, COL, LAN, LCB, LPR, LSB, NXT, RAN, RCB, RPR, RSB, TLD } from './symbols';
import { Tree } from './tree';
import { tsize } from './tsize';
import { Create } from './tui';

/**
 * Log Prefixes
 *
 * The CLI logs will be prefixed with the different naming groups.
 * Each prefix name infers an action pertaining to an executed operation.
 * Depending on the prefix name character length of the arrow separator
 * will equally distributed.
 */
export type Prefixes = LiteralUnion<(
  | 'changed'
  | 'create'
  | 'created'
  | 'creating'
  | 'delete'
  | 'deleted'
  | 'deleting'
  | 'deletion'
  | 'elapsed'
  | 'export'
  | 'external'
  | 'failed'
  | 'failures'
  | 'ignored'
  | 'importer'
  | 'invalid'
  | 'minified'
  | 'pending'
  | 'process'
  | 'processing'
  | 'transferred' // Longest Prefix with length of 11
  | 'progress'
  | 'publish'
  | 'queued'
  | 'rejected'
  | 'reloaded'
  | 'release'
  | 'retrying'
  | 'skipped'
  | 'syncing'
  | 'transform'
  | 'template'
  | 'updated'
  | 'updating'
  | 'uploaded'
  | 'version'
  | 'warning'
), string>

/**
 * Prefix limit reference to equally distribute prefix spacing
 */
const PREFIX_LIMIT = 9;

/**
 * The additional spacing to apply for equal distribution
 */
const PREFIX_EXTRA = ' ';

/**
 * The number of whitespace characters to subtract from.
 */
const PREFIX_SPACE = PREFIX_LIMIT + PREFIX_EXTRA.length;

/**
 * Regular Expression for timer suffix
 */
const TIME_SUFFIX = /\d+[μmsec]{1,3}$/;

/**
 * ANSI Prefix
 *
 * Equally distributes whitespace following the `prefix` parameter.
 * Optionally accepts a `suffix[]` string spread. Depending on the number
 * of suffix appends passed, different output is produced. When passing
 * `3 or 4` suffixes the last known suffix will apply `~` appenditure.
 *
 * See below examples:
 *
 * ---
 *
 * **Passing 0 `suffix` parameters**
 *
 * ```bash
 * │ prefix
 * ```
 *
 * ---
 *
 * **Passing 1 `suffix` parameter**
 *
 * ```bash
 * │ prefix  »  action
 * ```
 * ---
 *
 * **Passing 2 `suffix` parameters (applies append is timer)**
 *
 * ```bash
 * │ prefix  »  action → suffix
 * │ prefix  »  action ~ append
 * ```
 *
 * ---
 *
 * **Passing 3 `suffix` parameters**
 *
 * ```bash
 * │ prefix  »  action → suffix ~ append
 * ```
 *
 * ---
 *
 * **Passing 4 `suffix` parameters**
 *
 * ```bash
 * │ prefix  »  handle ⥂ joiner → action ~ append
 * ```
 */
export function Prefix (name: Prefixes, ...suffix: [
  handle?: string,
  joiner?: string,
  action?: string,
  append?: string
]) {

  const label = detect(name) ? strip(name).trim() : name.trim();
  const spacer = label.length > PREFIX_LIMIT ? PREFIX_EXTRA : ' '.repeat(PREFIX_SPACE - label.length);
  const ICO = /^(error|invalid|failed|rejected)$/.test(label) ? BAD : NXT;
  const prefix: string = label + PREFIX_EXTRA + spacer + ICO + PREFIX_EXTRA;
  const length = suffix.length;

  if (length > 0) {

    if (length === 1) {

      // name  →  handle
      return glue.ws(prefix, suffix[0]);

    } else if (length === 2) {

      // name  →  handle → joiner
      // name  →  handle ~ append
      return TIME_SUFFIX.test(strip(suffix[1]))
        ? glue.ws(prefix, suffix[0], Append(suffix[1]))
        : glue.ws(prefix, suffix[0], ARR, suffix[1]);

    } else if (length === 3) {

      // name  →  handle → joiner ~ append
      return glue.ws(prefix, suffix[0], ARR, suffix[1], Append(suffix[2]));

    } else if (length === 4) {

      // name  →  handle → joiner → action ~ append
      return glue.ws(prefix, suffix[0], ARR, suffix[1], ARR, suffix[2], Append(suffix[3]));

    }
  }

  // prefix
  return prefix;

}

/**
 * Suffix in gray with Tilde `~` prefix
 *
 * **Examples**
 *
 * ```bash
 * ~ 250ms
 * ~ Lorem Ipsum
 * ```
 */
export function Append (input: string) {

  return input ? TLD + ' ' + reset.gray(input) : '';

}

/**
 * ANSI Infix
 *
 * Infixes input with certain characters. Optionally accepts a
 * `spaced` value, when provided, the _encase_ will be surrounded
 * with a single whitespace character.
 *
 * **Encase Shortcodes**
 *
 * - **AN** ~ `<input>`
 * - **CB** ~ `{input}`
 * - **PR** ~ `(input)`
 * - **SB** ~ `[input]`
 *
 * ---
 *
 * **Spaced Settings**
 *
 * Whether or not to encase with single whitespace characters.
 * When `true` the `input` and encase character are expressed as:
 *
 * - `< input >`
 * - `{ input }`
 * - `( input )`
 * - `[ input ]`
 *
 */
export function Encase (encase: 'AN'| 'CB'| 'PR'| 'SB', input: string, { spaced = false } = {}) {

  const WS = spaced ? ' ' : '';

  switch (encase) {
    case 'AN': return LAN + WS + input + WS + RAN;
    case 'CB': return LCB + WS + input + WS + RCB;
    case 'PR': return LPR + WS + input + WS + RPR;
    case 'SB': return LSB + WS + input + WS + RSB;
  }

}

/* -------------------------------------------- */
/* SUFFIXES                                     */
/* -------------------------------------------- */

const Suffix: {
  /**
   * Warning in yellow stdin suffix with Tilde `~` prefix
   *
   * ```bash
   *  ~ Type w and press enter to view
   * ```
   */
  warning: string;
  /**
   * Error in red stdin suffix with Tilde `~` prefix
   *
   * ```bash
   *  ~ Type v and press enter to view
   * ```
   */
  error: string;
  /**
   * Bulk log inspection suffix
   *
   * ```bash
   *  ~ Type v and press enter to view
   * ```
   */
  bulk: string;
  /**
   * Stack Trace in Gray applied to error contexts
   *
   * ```bash
   * Type s and press enter to view stack trace
   * ```
   */
  stack: string;

} = Object.create(null);

Suffix.warning = yellow(` ${TLD} Type ${bold('w')} and press ${bold('enter')} to view all warning/s`);
Suffix.error = red(` ${TLD} Type ${bold('v')} and press ${bold('enter')} to view all error/s`);
Suffix.stack = gray(`Type ${bold('s')} and press ${bold('enter')} to view stack trace`);
Suffix.bulk = gray(`Type ${bold('i')} and press ${bold('enter')} to inspect bulk file/s`);

export { Suffix };

/* -------------------------------------------- */
/* TREE ANSI                                    */
/* -------------------------------------------- */

/**
 * TUI Horizontal Line
 *
 * Prints a horizontal line separator which will default to
 * spanning the `wrap` of the terminal pane.
 *
 * ```bash
 * │\n
 * ├────────────────────────────────────────────────
 * │
 * ```
 */
export const Ruler = (width = undefined, newlines = true) => {

  if (width === undefined) width = tsize().wrap;

  const line = lightGray.open + '├' + '─'.repeat(width - 10) + lightGray.close;

  if (newlines) return Tree.trim + '\n' + line + '\n' + Tree.trim;

  return line;
};

/**
 * Tree Top
 *
 * ```
 * '\n┌─ Label ~ 01:59:20'
 * ```
 */
export function Top (label: string, timestamp = true) {

  return Tree.open + reset.gray(timestamp ? `${label} ~ ${getTime()}` : label);

}

type MultilineParams =
  | string[]
  | [string[], style?: { color?: Ansis; line?: string; }]
  | [...string[], { color?: Ansis; line?: string; }];

/**
 * Tree Multiline
 *
 * Prefixes a multiline string with tree line but does not respect wrap.
 * If a string with newlines is passed, the newline occurance will be
 * respected.
 *
 * > **NOTE**
 * >
 * > Any extraneous newline applied will be sliced in the result. This
 * > means that you need to pass `\n` to the multiline to ensure ending
 * > newline applied, e.g, `Multiline('abc\n')`. If multiline string does
 * > not include an ending newline one will not be applied.
 *
 * ```bash
 * │ lorem ipsum lorem ipsum\n
 * │ lorem ipsum lorem ipsum\n
 * │ lorem ipsum lorem ipsum
 * ```
 */
export const Multiline = (...input: MultilineParams) => {

  const style: { color?: Ansis; line?: string; } = { color: null, line: Tree.line };

  let write: string = '';
  let lines: string[];

  if (Array.isArray(input[0])) {

    if (typeof input[1] === 'object') {
      Object.assign(style, input[1]);
    }

    lines = input[0];

  } else {

    if (typeof input[input.length - 1] === 'object') Object.assign(style, input.pop());

    lines = input as string[];

  }

  while (lines.length !== 0) {

    let line = lines.shift();

    if (/^\n+$/.test(line)) {
      const nl = line.split('\n').length - 1;
      for (let i = 0; i < nl; i++) write += style.line + '\n';
    } else {
      line = line.trim();
      if (line.length > 0) {
        write += style.line + (style.color ? style.color(line) : line) + '\n';
      } else {
        write += style.line + '\n';
      }

    }
  }

  return write.slice(0, -1);

};

interface WrapOptions {
  /**
   * The color of the message
   *
   * @default null
   */
  color?: Ansis;
  /**
   * The `Tree.line` to apply
   *
   * @default Tree.line
   */
  line?: string;
  /**
   * Whether or not the first line is to begin like Tree line.
   *
   * Default behaviour: `{ firstLineTree: true }`
   *
   * ```js
   * '│ lorem ipsum lorem ipsum'  // this line begins with │
   * '│ lorem ipsum lorem ipsum'
   * '│ lorem ipsum lorem ipsum'
   * ```
   *
   * When disabled: `{ firstLineTree: false }`
   *
   * ```js
   * 'lorem ipsum lorem ipsum'  // this line does not apply prefix
   * '│ lorem ipsum lorem ipsum'
   * '│ lorem ipsum lorem ipsum'
   * ```
   *
   * @default true
   */
  firstLineTree?: boolean;
}

/**
 * Tree Wrap
 *
 * Accepts `string[]` or `...string[]` spread. The last entry accepts an
 * optional **style** config, which can be used to pass in **Ansis** color
 * and/or tree line type (e.g: `Tree.red` or `Tree.yellow`). The `line` key
 * will default to using `Tree.line` (i.e: _lightGray_) and `color` defaults
 * to `null` and will apply according to what was passed.
 *
 *
 * ```
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * ```
 */
export const Wrap = <T extends WrapOptions> (...input: [ string[], T?] | (string | T)[]) => {

  const style: T = <T>{ color: null, line: Tree.line, firstLineTree: true };
  const width: number = tsize().wrap - 5;

  let lines: string[];
  let write: string = '';

  if (Array.isArray(input[0])) {

    // Update options
    //
    if (typeof input[1] === 'object') Object.assign(style, input[1]);

    lines = wrap(glue.ws(input[0]), width, { hard: true }).split('\n');

  } else {

    // Update options
    //
    if (typeof input[input.length - 1] === 'object') Object.assign(style, input.pop());

    lines = wrap(input.join(' '), width, { hard: true }).split('\n');

  }

  for (let i = 0, s = lines.length; i < s; i++) {

    const line = lines[i];
    const tree = i === 0 && style.firstLineTree === false ? '' : style.line;

    write += (
      tree + (
        line.length > 0 ? (style.color ? style.color(line) : line) : ''
      ) + '\n'
    );

  }

  return write.trimEnd();

};

/**
 * Tree Line Break
 *
 * ```
 * │
 * │ input
 * │
 * ```
 */
export const Header = (input: string) => Tree.trim + '\n' + Tree.line + input + '\n' + Tree.trim;

/**
 * Tree Line Break Red
 *
 * ```
 * │
 * │ input
 * │
 * ```
 */
export const HeaderRed = (input: string) => Tree.redTrim + '\n' + Tree.red + red(input) + '\n' + Tree.redTrim;

/**
 * Tree Line Break
 *
 * ```bash
 * │
 * │ input
 * │
 * ```
 */
export function HeaderYellow (input: string) {

  return Tree.yellowTrim + '\n' + Tree.yellow + yellow(input) + '\n' + Tree.yellowTrim;

}

/**
 * Tree Line
 *
 * ```bash
 * │ input
 * ```
 */
export function Line (input: string) {

  return Tree.line + input;

}
/**
 * Tree Red Line
 *
 * ```bash
 * │ input
 * ```
 */
export function LineRed (input: string) {

  return Tree.red + input;

}
/**
 * Tree Warn Line
 *
 * ```bash
 * │ input
 * ```
 */
export function LineYellow (input: string) {

  return Tree.yellow + input;

}
/**
 * Tree Next Line
 *
 * ```bash
 * │\n
 * │ input
 * ```
 */
export function NextLine (input: string) {

  return Tree.trim + '\n' + Tree.line + input;

}
/**
 * Tree Line Next
 *
 * ```bash
 * │ input\n
 * │
 * ```
 */
export function Next (input: string) {

  return Tree.line + input + '\n' + Tree.line;

}
/**
 * Tree Dash
 *
 * ```bash
 * ├─ input
 * ```
 */
export function Dash (input: string) {

  return Tree.dash + input;

}
/**
 * Tree End
 *
 * ```bash
 * └─ input\n
 * ```
 */
export function End (input: string, timestamp = true) {

  return Tree.base + reset.gray(timestamp ? `${input} ~ ${getTime()}` : input) + '\n';

}
/**
 * Tree Indent Line
 *
 * ```bash
 * │  │  input
 * ```
 */
export function IndentLine (input: string) {

  return Tree.indent.line + input;

}
/**
 * Tree Indent Line Dash
 *
 * ```bash
 * │  ├─ input
 * ```
 */
export function IndentDash (input: string) {

  return Tree.indent.dash + input;

}
/** Tree Indent Line Dash
 *
 * ```bash
 * │  └─ input\n
 * │
 * ```
 */
export function IndentEnd (input: string) {

  return Tree.indent.base + input + '\n' + Tree.trim;

}

/**
 * Tree Count up rendered
 *
 * ```bash
 * │  └─ input\n
 * │
 * ```
 */
export function CountUp (count = 0, total = 0, color: Ansis = whiteBright) {

  return Tree.line + color(bold(count) + ' of ' + bold(total));

}

export interface IssueContext {
  /**
   * The type of context to generate
   *
   * @default 'error'
   */
  type?: 'error' | 'warning'
  /**
   * Whether or not tree line prefix is to apply
   *
   * @default true
   */
  tree?: boolean
  /**
   * The stack trace messages, typically provided by the error.
   *
   * When `stack` message are passed, they will be prepended above
   * the `entries`.
   *
   * When `true` then stack will be stored in running `$` state
   * and made available via stdin input, this will result in a
   * stack suffix being appended to the context,
   *
   * If this value is `false` (or `undefined`) then no stack
   * handling is done.
   *
   * @default false
   */
  stack?: boolean | string;
  /**
   * Whether or not the stack should be cleaned using `cleanStack`
   * module. This helps bring sanity to errors, not always a good choice.
   *
   * > **NOTE**
   * >
   * > If `stack` is `false` this option is ignored,
   *
   * @default false
   */
  cleanStack?: boolean;
  /**
   * Context entries - This a collection of `key` > `value`
   * pairs to be appended.
   */
  entries: { [name: string]: any }
}

/**
 * Error and/or Warning context normalizer.
 *
 * There is special handling for entries with a `failed` key,
 * this accepts an array of strings.
 *
 * **Example**
 *
 * ```
 * │
 * │ code:      422
 * │ status:    Unprocessed Entity
 * │ failed:    ~source/sections/file.liquid
 * │ failed:    ~source/sections/file.liquid
 * │
 * │ Type s and press enter to view stack trace
 * ```
 */
export function Context (data: IssueContext) {

  const space = eq(data.entries);
  const tui = Create({
    type: data.type || 'error',
    tree: 'tree' in data ? data.tree : true
  }).Newline();

  if (typeof data.stack === 'string') {

    let stack = data.cleanStack
      ? cleanStack(data.stack, { pretty: true })
      : data.stack;

    if (/TypeError/.test(stack.trimStart())) {
      stack = stack.slice(stack.indexOf('\n') + 1).replace(/^ +/gm, ARR + WSP);
    }

    tui.Multiline(gray(stack)).Newline();

  }

  let line: string = '';
  let col: string = '';

  if ('line' in data.entries) {
    line = `:${typeof data.entries.line === 'number' ? data.entries.line : strip(data.entries.line)}`;
  }

  if (line !== '' && 'column' in data.entries) {
    col = `:${typeof data.entries.column === 'number' ? data.entries.column : strip(data.entries.column)}`;
  }

  // generate output
  for (const key in data.entries) {

    if (data.entries[key] === undefined) continue;

    let string: string;

    const isFailed = key === 'failed';

    if (typeof data.entries[key] === 'number') {

      if (isNaN(data.entries[key])) continue;

      string = neonRouge(sanitize(data.entries[key]));

    } else if (!isFailed) {

      string = sanitize(data.entries[key]);

    }

    if (string.length === 0) continue;

    const entry = data.type === 'warning' ? yellowBright(key) : redBright(key);

    if (
      key === 'source' ||
      key === 'output' ||
      key === 'input' ||
      key === 'file') {

      tui.Line(`${entry}${COL} ${space(key)}${underline(string + line + col)}`, gray);

    } else if (isFailed) {

      if (Array.isArray(data.entries[key])) {

        for (const fail of data.entries[key]) {
          tui.Line(`${entry}${COL} ${space(key)}${underline(fail)}`, gray);
        }

      } else {

        tui.Line(`${entry}${COL} ${space(key)}${underline(data.entries[key])}`, gray);

      }

    } else {

      tui.Line(`${entry}${COL} ${space(key)}${string}`, gray);

    }

  }

  if (data.stack === true) {

    tui.Newline().Line(Suffix.stack);

  }

  return tui.toString();

};
