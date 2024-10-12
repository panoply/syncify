/* eslint-disable no-unused-vars */
import type { LiteralUnion } from 'type-fest';
import wrap from 'wrap-ansi';
import cleanStack from 'clean-stack';
import { Ansis } from 'ansis';
import { tsize } from './tsize';
import { TLD, ARR, LAN, LCB, LPR, LSB, RAN, RCB, RPR, RSB, COL } from './symbols';
import {
  bold,
  gray,
  lightGray,
  neonRouge,
  red,
  redBright,
  reset,
  underline,
  white,
  whiteBright,
  yellow,
  yellowBright
} from './colors';
import { eq, getTime, glue, sanitize } from './helpers';

/**
 * Tree Characters
 */
export const Tree = {
  /**
   * Tree Line Top
   *
   * ```bash
   * ┌─
   * ```
   */
  open: `${lightGray.open}┌─${lightGray.close} `,
  /**
   * Tree Line Stub
   *
   * ```bash
   * ├
   * ```
   */
  stub: `${lightGray.open}├${lightGray.close}  `,
  /**
   * Tree Line Dash
   *
   * ```bash
   * ├─
   * ```
   */
  dash: `${lightGray.open}├─${lightGray.close} `,
  /**
   * Tree Line (without suffixed whitespace)
   *
   * ```bash
   * │
   * ```
   */
  trim: `${lightGray.open}│${lightGray.close}`,
  /**
   * Tree Line
   *
   * ```bash
   * │
   * ```
   */
  line: `${lightGray.open}│${lightGray.close}  `,
  /**
   * Tree Line Next
   *
   * Newline plus line (i.e: `\n` will prepend but not append)
   *
   * ```bash
   *
   * │
   * ```
   */
  next: `\n${lightGray.open}│${lightGray.close}`,
  /**
   * Tree Line After
   *
   * Line appended with newline (i.e: `\n` will append)
   *
   * ```bash
   * │
   *
   * ```
   */
  after: `${lightGray.open}│${lightGray.close}\n`,
  /**
   * Tree Line Wrap
   *
   * Newlines and line (i.e: `\n` will prepend and append)
   *
   * ```bash
   *
   * │
   *
   * ```
   */
  wrap: `\n${lightGray.open}│${lightGray.close}\n`,
  /**
   * Tree Line Base
   *
   * ```bash
   * └─
   * ```
   */
  base: `${lightGray.open}└─${lightGray.close} `,
  /**
   * Tree Line Red (Red Dim)
   *
   * ```bash
   * │
   * ```
   */
  red: `${red.dim.open}│${red.dim.close}  `,
  /**
   * Tree Line Red (Red Dim)
   *
   * ```bash
   * │
   * ```
   */
  redTrim: `${red.dim.open}│${red.dim.close}`,
  /**
   * Tree Line Warning (Yellow Dim)
   *
   * ```bash
   * │
   * ```
   */
  yellow: `${yellow.dim.open}│${yellow.dim.close}  `,
  /**
   * Tree Line Warning (Yellow Dim)
   *
   * ```bash
   * │
   * ```
   */
  yellowTrim: `${yellow.dim.open}│${yellow.dim.close}`,
  /**
   * Tree Line Indentation
   *
   * Symbols used for next level lines
   */
  indent: {
    /**
     * Tree Indent Line Top
     *
     * ```bash
     * ├──┬─
     * ```
     */
    edge: `${lightGray.open}├──┬─${lightGray.close} `,
    /**
     * Tree Indent Line Fall
     *
     * ```bash
     * ├──┐
     * ```
     */
    fall: `${lightGray.open}├──┐${lightGray.close} `,
    /**
     * Tree Indent Line
     *
     * ```bash
     * │  │
     * ```
     */
    line: `${lightGray.open}│  │${lightGray.close} `,
    /**
     * Tree Indent Line Stub
     *
     * ```bash
     * │  ├
     * ```
     */
    stub: `${lightGray.open}│  ├${lightGray.close} `,
    /**
     * Tree Indent Line Dash
     *
     * ```bash
     * │  ├─
     * ```
     */
    dash: `${lightGray.open}│  ├─${lightGray.close} `,
    /**
     * Tree Indent Line Base
     *
     * ```bash
     * │  └─
     * ```
     */
    base: `${lightGray.open}│  └─${lightGray.close} `
  }
};

/**
 * Log Prefixes
 *
 * The CLI logs will be prefixed with the different naming groups.
 * Each prefix name infers an action pertaining to an executed operation.
 * Depending on the prefix name character length of the arrow separator
 * will equally distributed.
 */
export type Prefixes = LiteralUnion<string, (
  | 'changed'
  | 'updated'
  | 'external'
  | 'publish'
  | 'release'
  | 'process'
  | 'export'
  | 'skipped'
  | 'version'
  | 'importer'
  | 'transform'
  | 'minified'
  | 'reloaded'
  | 'syncing'
  | 'queued'
  | 'pending'
  | 'retrying'
  | 'uploaded'
  | 'invalid'
  | 'failed'
  | 'warning'
  | 'deleted'
  | 'ignored'
)>

/**
 * The Return Type of `Create()`
 */
export type CreateClosure = ReturnType<typeof Create>

export interface IssueContext {
  /**
   * The type of context to generate
   *
   * @default 'error'
   */
  type?: 'error' | 'warning'
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
   * > If `stac` is `false` this option is ignored,
   *
   * @default false
   */
  cleanStack?: boolean;
  /**
   * Context entries - This a collection of `key` > `value`
   * pairs to be appended.
   */
  entries: { [name: string]: string | number };
}
/**
 * ANSI Prefix
 *
 * Equally distributes whitespace following the `name` parameter.
 * Optionally accepts a `suffix` string, when passed an arrow
 * appenditure is applied.
 *
 * ---
 *
 * **Passing 1 `suffix` parameter**
 *
 * ```bash
 * │ longest  →  suffix # spacing is equal before arrow
 * │ short    →  suffix # spacing is equal before arrow
 * ```
 * ---
 *
 * **Passing 2 `suffix` parameters**
 *
 * ```bash
 * │ longest  →  action → suffix # spacing is equal before arrow
 * │ short    →  action → suffix # spacing is equal before arrow
 * ```
 *
 * ---
 *
 * **Passing 3 `suffix` parameters**
 *
 * ```bash
 * │ longest  →  action → suffix ~ append
 * │ short    →  action → suffix ~ append
 * ```
 *
 * ---
 *
 * **Omitting a `suffix` parameter**
 *
 * ```bash
 * │ longest # spacing suffix ends equal
 * │ short   # spacing suffix ends equal
 * │ mini    # spacing suffix ends equal
 * │ longer  # spacing suffix ends equal
 * ```
 */
export function Prefix (name: Prefixes, ...suffix: [joiner?: string, action?: string, append?: string]) {

  const spacer = name.length > 9 ? '  ' : ' '.repeat(11 - name.length);
  const joiner = suffix.length > 0
    ? suffix.length === 1
      ? ARR + '  ' + suffix[0]
      : suffix.length === 2
        ? ARR + '  ' + suffix[0] + ' ' + ARR + ' ' + suffix[1]
        : ARR + '  ' + suffix[0] + ' ' + ARR + ' ' + suffix[1] + ' ' + Append(suffix[2])
    : '';

  return name + spacer + joiner;

}

/**
 * Suffix in gray with Tilde `~` prefix
 *
 * **Examples**
 *
 * ```bash
 *  ~ 250ms
 *  ~ Lorem Ipsum
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

export const Suffix = {
  /**
   * Warning in yellow stdin suffix with Tilde `~` prefix
   *
   * ```bash
   *  ~ Type w and press enter to view
   * ```
   */
  warning: yellow(` ${TLD} Type ${bold('w')} and press ${bold('enter')} to view`),
  /**
   * Error in red stdin suffix with Tilde `~` prefix
   *
   * ```bash
   *  ~ Type v and press enter to view
   * ```
   */
  error: red(` ${TLD} Type ${bold('v')} and press ${bold('enter')} to view`),
  /**
   * Stack Trace in Gray applied to error contexts
   *
   * ```bash
   * Type s and press enter to view stack trace
   * ```
   */
  stack: gray(`Type ${bold('s')} and press ${bold('enter')} to view stack trace`)

};

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
 * │
 * ├────────────────────────────────────────────────
 * │
 * ```
 */
export const Ruler = (width = undefined, newlines = true) => {

  if (width === undefined) width = tsize().wrap;

  const line = '├' + '─'.repeat(width - 10);

  return newlines
    ? `${lightGray.open}${'\n'}${line}${'\n'}│${lightGray.close}`
    : `${lightGray.open}${line}${lightGray.close}`;
};

/**
 * Tree Top
 *
 * ```bash
 * \n
 * ┌─ Label ~ 01:59:20
 * ```
 */
export const Top = (label: string) => Tree.open + reset.gray(`${label} ~ ${getTime()}`);

/**
 * Tree Multiline
 *
 * Prefixes a multiline string with tree line but does not respect wrap
 *
 * ```bash
 * │ lorem ipsum lorem ipsum\n
 * │ lorem ipsum lorem ipsum\n
 * │ lorem ipsum lorem ipsum\n
 * ```
 */
export const Multiline = <T extends { color?: Ansis; line?: string; }> (...input: [ string[], T?] | (string | T)[]) => {

  const style: T = <T>{ color: null, line: Tree.line };

  let lines: string[];
  let write: string = '';

  if (Array.isArray(input[0])) {

    if (typeof input[1] === 'object') {
      Object.assign(style, input[1]);
    }

    lines = input[0];

  } else {

    if (typeof input[input.length - 1] === 'object') {
      Object.assign(style, input.pop());
    }

    lines = input as string[];

  }

  while (lines.length !== 0) {

    const line = lines.shift().trim();

    if (line.length > 0) {
      write += style.line + (style.color ? style.color(line) : line) + '\n';
    } else {
      write += style.line + '\n';
    }

  }

  return write.slice(0, -1);

};

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
 * ```bash
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * ```
 */
export const Wrap = <T extends { color?: Ansis; line?: string; }> (...input: [ string[], T?] | (string | T)[]) => {

  const style: T = <T>{ color: null, line: Tree.line };
  const width: number = tsize().wrap;

  let lines: string[];
  let write: string = '';

  if (Array.isArray(input[0])) {

    if (typeof input[1] === 'object') {
      Object.assign(style, input[1]);
    }

    lines = wrap(input[0].join(' '), width).split('\n');

  } else {

    if (typeof input[input.length - 1] === 'object') {
      Object.assign(style, input.pop());
    }

    lines = wrap(input.join(' '), width).split('\n');

  }

  while (lines.length !== 0) {

    const line = lines.shift().trim();

    if (line.length > 0) {
      write += style.line + (style.color ? style.color(line) : line) + '\n';
    } else {
      write += style.line + '\n';
    }
  }

  return write.trimEnd();

};

/**
 * Tree Line Break
 *
 * ```bash
 * │
 * │ input
 * │
 * ```
 */
export const Break = (input: string) =>
  Tree.trim + '\n' + Tree.line + input + '\n' + Tree.trim;

/**
 * Tree Line Break Red
 *
 * ```bash
 * │
 * │ input
 * │
 * ```
 */
export function BreakRed (input: string) {

  return Tree.redTrim + '\n' + Tree.red + red(input) + '\n' + Tree.redTrim;

}
/**
 * Tree Line Break
 *
 * ```bash
 * │
 * │ input
 * │
 * ```
 */
export function BreakYellow (input: string) {

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
 * │
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
export function End (input: string) {

  return Tree.base + reset.gray(`${input} ~ ${getTime()}`) + '\n';

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
 * Error and/or Warning context normalizer.
 *
 * **Example**
 *
 * ```
 * │
 * │ code:      422
 * │ file:     ~source/dir/filename.liquid
 * │ status:    Unprocessed Entity
 * │
 * │ Type s and press enter to view stack trace
 * ```
 */
export function Context (data: IssueContext) {

  const space = eq(data.entries);
  const message = Create({ type: data.type || 'error' });

  if (typeof data.stack === 'string') {

    const stack = data.cleanStack ? cleanStack(data.stack, { pretty: true }) : data.stack;

    message.Wrap(stack.split('\n'), gray).NL.Newline();

  }

  // generate output
  for (const key in data.entries) {

    if (data.entries[key] === undefined) continue;

    let string: string;

    if (typeof data.entries[key] === 'number') {

      if (isNaN(data.entries[key])) continue;

      string = neonRouge(sanitize(data.entries[key]));

    } else {

      string = sanitize(data.entries[key]);

    }

    if (string.length === 0) continue;

    const entry = data.type === 'warning' ? yellowBright(key) : redBright(key);

    if (
      key === 'source' ||
      key === 'output' ||
      key === 'input' ||
      key === 'file') {
      message.Line(entry + COL + ' ' + space(key) + underline(string), gray);
    } else {
      message.Line(entry + COL + ' ' + space(key) + string, gray);
    }

  }

  if (data.stack === true) {

    message.NL.Line(Suffix.stack);

  }

  return message.toString();

};

/* -------------------------------------------- */
/* MESSAGE GENERATOR                            */
/* -------------------------------------------- */

class Message {

  /**
   * The type of tree message to generate - This will
   * default the `Tree.line` to a specific color, meaning
   * the `.line()` will be output according to the type.
   *
   * @default 'info
   */
  private type: LiteralUnion<'nil' | 'info' | 'warning' | 'error', string> = 'info';

  /**
   * The Tree line color based on message type
   *
   * @default Tree.line
   */
  private line: string;

  /**
   * The Tree trim color based on message type
   *
   * @default Tree.trim
   */
  private trim: string;

  /**
   * Optionally provide an existing structure to build from.
   *
   * @default []
   */
  private text?: string[];

  constructor (options?: { type?: LiteralUnion<'nil' | 'info' | 'warning' | 'error', string>; text?: string[] }) {

    if (typeof options === 'object') {

      this.type = 'type' in options ? options.type : 'info';
      this.text = 'text' in options ? options.text : [];

      if (this.type === 'error') {
        this.line = Tree.red;
        this.trim = Tree.redTrim;
      } else if (this.type === 'warning') {
        this.line = Tree.yellow;
        this.trim = Tree.yellowTrim;
      } else if (this.type === 'nil') {
        this.line = '';
        this.trim = '';
      } else {
        this.line = Tree.line;
        this.trim = Tree.trim;
      }

    } else {
      this.line = Tree.line;
      this.trim = Tree.trim;
      this.text = [];
    }

  }

  /**
   * Return Structure
   *
   * Returns the current structure being built.
   */
  toRaw () {
    return this.text;
  }

  /**
   * Generate string with ending line
   *
   * Applies a `.join` glue to the `this.text[]` - Calling this function
   * will clear the message array. Use `toRaw()` to obtain current
   * string build.
   *
   * The difference with `toLine()` and `toString()` is that this caller
   * will append a newline line to end of output.
   *
   * ```bash
   * \n
   * │
   * ```
   */
  toLine (color?: Ansis) {

    if (this.text.length === 0) return '';

    this.text[this.text.length - 1] = this.text[this.text.length - 1].trimEnd();

    let output: string;

    if (color) {
      output = color(glue(this.text));
    } else if (this.type === 'info') {
      output = white(glue(this.text));
    } else if (this.type === 'error') {
      output = red(glue(this.text));
    } else if (this.type === 'warning') {
      output = yellowBright(glue(this.text));
    } else {
      output = glue(this.text);
    }

    this.text = [];

    return output + '\n' + this.trim;

  }

  /**
   * Generate string - Trims any newlines in last entry
   *
   * Applies a `.join` glue to the `text[]` - Call this function
   * will clear the message array. Use `toRaw()` to obtain current
   * string build.
   *
   * ```bash
   * │ ending content
   * ```
   */
  toString (color?: Ansis) {

    if (this.text.length === 0) return '';

    this.text[this.text.length - 1] = this.text[this.text.length - 1].trimEnd();

    let output: string;

    if (color) {
      output = color(this.text.join(''));
    } else if (this.type === 'info') {
      output = white(this.text.join(''));
    } else if (this.type === 'error') {
      output = red(this.text.join(''));
    } else if (this.type === 'warning') {
      output = yellowBright(this.text.join(''));
    } else {
      output = this.text.join('');
    }

    this.text = [];

    return output;

  }

  /**
   * Get Line
   *
   * Returns a line at the specific index. Defaults to last known line
   */
  Get (index: number = this.text.length - 1) {

    return this.text[index];

  }

  /**
   * Remove Line
   *
   * Removes a line at specific index
   */
  Remove (index: number) {

    this.text.splice(index, 1);

    return this;

  }

  /**
   * Replace and persist
   *
   * Replaces an entry at the provided index
   */
  Replace (index: number, input: string, color?: Ansis) {

    if (this.text[index]) {
      this.text[index] = this.line + (color ? color(input) : input) + '\n';
    }

    return this;

  }

  /**
   * Tree Horizontal Line
   *
   * Prints a horizontal line separator which will default to
   * spanning the `wrap` of the terminal pane.
   *
   * ```bash
   * │\n
   * ├─────────────────────\n
   * │\n
   * ```
   */
  Ruler (width: number = undefined) {

    if (width === undefined) width = tsize().wrap;

    this.text.push(Tree.trim + '\n' + lightGray(`├${'─'.repeat(width)}`) + '\n' + Tree.trim + '\n');

    return this;
  }

  /**
   * Tree Newline using applied
   *
   * ```bash
   * │\n
   * ```
   */
  get NL () {

    this.text.push(this.trim + '\n');

    return this;
  }

  /**
   * Newline only
   *
   * ```bash
   * \n
   * ```
   */
  get BR () {

    this.text.push('\n');

    return this;

  }

  /**
   * Tree Pop
   *
   * ```bash
   * │\n
   * ```
   */
  Pop () {
    this.text.pop();
    return this;
  }

  /**
   * Tree Newline
   *
   * ```bash
   * │\n
   * ```
   */
  Newline (
    line?: number | LiteralUnion<'line' | 'red' | 'yellow', string>,
    color?: LiteralUnion<'red' | 'yellow', string>
  ) {

    if (typeof line === 'number') {

      let input: string = this.trim + '\n';

      if (color) {
        if (color === 'yellow') {
          input = Tree.yellowTrim + '\n';
        } else if (color === 'red') {
          input = Tree.redTrim + '\n';
        } else if (color === '') {
          input = '\n';
        }
      }

      for (let i = 0; i < line; i++) this.text.push(input);

    } else {

      if (line === '') {
        this.text.push('\n');
      } else if (line === 'line') {
        this.text.push(Tree.trim + '\n');
      } else if (line === 'yellow') {
        this.text.push(Tree.yellowTrim + '\n');
      } else if (line === 'red') {
        this.text.push(Tree.redTrim + '\n');
      } else {
        this.text.push(this.trim + '\n');
      }
    }

    return this;

  }

  /**
   * Tree Inline - Appends to the previous entry. If no entries
   * exist in the message, a new one is created with tree line prefix.
   *
   * Use `Push()` method to insert entry without line prefix.
   *
   * ```bash
   * │ previous <input> # <input> will prefix with single whitespace
   * ```
   */
  Inline (input: string, color?: Ansis) {

    const length = this.text.length;

    if (length > 0) {
      this.text[length - 1] = this.text[length - 1].trimEnd() + ' ' + (color ? color(input) : input) + '\n';
    } else {
      this.text.push(this.line + (color ? color(input) : input) + '\n');
    }

    return this;
  }

  /**
   * Tree Line Trim
   *
   * ```bash
   * │input\n
   * ```
   */
  Trim (input: string, color?: Ansis) {

    this.text.push(this.line + (color ? color(input) : input) + '\n');

    return this;

  }

  /**
   * Push string entry
   *
   * Unlike `Line` or other methods, this call will simply apply
   * a `this.text.push(string)` of the input.
   *
   * **NOTE** Newline `'\n'` will be appended to insertion
   */
  Insert (input: string, color?: Ansis) {

    this.text.push((color ? color(input) : input));

    return this;

  }

  /**
   * Tree Line
   *
   * ```bash
   * │ input\n
   * ```
   */
  Line (input: string, color?: Ansis) {

    if (this.type === 'error') return this.Error(input, color);
    if (this.type === 'warning') return this.Warn(input, color);

    this.text.push(this.line + (color ? color(input) : input) + '\n');

    return this;
  }

  /**
   * Tree Error Line (red)
   *
   * ```bash
   * │ input\n
   * ```
   */
  Error (input: string, color?: Ansis) {

    this.text.push(Tree.red + (color ? color(input) : red(input)) + '\n');

    return this;

  }

  /**
   * Tree Warn Line (yellow)
   *
   * ```bash
   * │ input
   * ```
   */
  Warn (input: string, color?: Ansis) {

    this.text.push(Tree.yellow + (color ? color(input) : yellow(input)) + '\n');

    return this;
  }

  /**
   * Tree Line Break
   *
   * ```bash
   * │\n
   * │ input\n
   * │\n
   * ```
   */
  Break (input: string, color?: Ansis) {

    this.text.push(this.trim + '\n' + this.line + (color ? color(input) : input) + '\n' + this.trim + '\n');

    return this;
  }

  /**
   * Tree Top
   *
   * ```bash
   * \n
   * ┌─ Label ~ 01:59:20\n
   * ```
   */
  Top (label: string) {

    this.text.push(Top(label) + '\n');

    return this;
  }

  /**
   * Tree End
   *
   * ```bash
   * │\n
   * └─ input\n
   * ```
   */
  End (input: string) {

    this.text.push(End(input));

    return this;

  }

  /**
   * Tree Context
   *
   * ```bash
   * │
   * │ code:      422
   * │ file:     ~source/dir/filename.liquid
   * │ status:    Unprocessed Entity
   * │
   * │ Type s and press enter to view stack trace
   * ```
   */
  Context (data: IssueContext) {

    this.text.push(Context(data) + '\n');

    return this;

  }

  /**
   * Tree Dash
   *
   * ```bash
   * ├─ input\n
   * ```
   */
  Dash (input: string, color?: Ansis) {

    this.text.push(Tree.dash + (color ? color(input) : input) + '\n');

    return this;

  }

  /**
   * Tree Multiline
   *
   * Prefixes a multiline string with tree line
   *
   * ```bash
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * ```
   */
  Multiline (input: string | string[]) {

    const lines = Array.isArray(input) ? input : input.split('\n');

    while (lines.length !== 0) {
      this.text.push(this.line + lines.shift() + '\n');
    }

    return this;

  }

  /**
   * Tree Wrap
   *
   * Accepts `string[]` or `...string[]` spread. The last entry accepts an
   * optional Ansis color. The **input** will be passed to `Wrap` and the
   * returning output will end with newline.
   *
   * ```bash
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * ```
   */
  Wrap (...input: (string[] | string | Ansis)[]) {

    const style: { line?: string; color?: Ansis } = { line: this.line };

    if (this.type === 'error') {
      style.color = red;
    } else if (this.type === 'warning') {
      style.color = yellow;
    } else {
      style.color = whiteBright;
    }

    if (Array.isArray(input[0])) {

      if (typeof input[1] === 'function') {

        style.color = <Ansis>input.pop();

      }

      this.text.push(Wrap(input[0], style) + '\n');

    } else {

      if (typeof input[input.length - 1] === 'function') {

        style.color = <Ansis>input.pop();

      }

      this.text.push(Wrap(<string[]>input, style) + '\n');

    }

    return this;
  }

}

/**
 * Create a tree structure
 *
 * ```bash
 * ┌─
 * │
 * ├─
 * │
 * └─
 * ```
 */
export function Create (options: {
  /**
   * The type of tree message to generate - This will
   * default the `Tree.line` to a specific color, meaning
   * the `.line()` will be output according to the type.
   *
   * @default 'info
   */
  type?: LiteralUnion<'nil' | 'info' | 'warning' | 'error', string>;
  /**
   * Optionally provide an existing structure to build from.
   *
   * @default []
   */
  text?: string[];
  /**
   * Whether or not tree printing applies
   *
   * @default true
   */
  tree?: boolean;

} = undefined) {

  if (options === undefined) {

    options = { type: '', tree: true };

  } else {

    Object.assign({ type: '', tree: true }, options);

  }

  return new Message(options);

}
