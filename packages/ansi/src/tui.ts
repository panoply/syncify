/* -------------------------------------------- */
/* MESSAGE GENERATOR                            */
/* -------------------------------------------- */

import type { IssueContext, Prefixes } from './write';
import type { Ansis } from 'ansis';
import type { LiteralUnion } from 'type-fest';

import { Console } from 'node:console';
import process from 'node:process';

import update, { createLogUpdate } from 'log-update';

import { glue } from '@syncify/glue';

import { NIL, NWL, WSP } from './characters';
import { gray, lightGray, neonMagenta, neonTeal, redBright, white, whiteBright, yellowBright } from './colors';
import { Spinner } from './spinner';
import { DSH } from './symbols';
import { Tree } from './tree';
import { tsize } from './tsize';
import { Context, Dash, End, Header, Line, Multiline, Prefix, Top, Wrap } from './write';

/* -------------------------------------------- */
/* CONSOLE                                      */
/* -------------------------------------------- */

export class Log extends Console {

  static get stdout () { return process.stdout; }
  static get stderr () { return process.stderr; }
  static update: typeof update = createLogUpdate(Log.stdout);

  constructor () {
    super(Log.stdout, Log.stderr);
  }

  write (message: string) {
    Log.stdout.write(message);
  }

  info (message: string, color = whiteBright): void {
    Log.stdout.write(Line(color(message.trim())) + '\n');
  }

  dash (message: string, color = whiteBright) {
    Log.stdout.write(Dash(color(message)) + '\n');
  }

  error (message: string): void {
    Log.stderr.write(Tree.red + redBright(message.trim()) + '\n');
  }

  warn (message: string): void {
    Log.stderr.write(Tree.yellow + yellowBright(message.trim()) + '\n');
  }

  header (message: string, color = whiteBright) {
    Log.stdout.write(Header(color(message.trim())) + '\n');
    return this;
  }

  wrap (...input: (string[] | string | Ansis)[]) {
    const color = <Ansis>(typeof input[input.length - 1] === 'function' ? input.pop() : gray);
    Log.stdout.write(Wrap(input as string[], { color, firstLineTree: false }) + '\n');
    return this;
  }

  tree (type?: LiteralUnion<'red' | 'yellow', string>) {
    Log.stdout.write((type === 'red' ? Tree.redTrim : type === 'yellow' ? Tree.yellowTrim : Tree.trim) + '\n');
    return this;
  }

  break () {
    Log.stdout.write('\n\n');
    return this;
  }

};

/* -------------------------------------------- */
/* MESSAGE GENERATOR                            */
/* -------------------------------------------- */

export interface toString {
  /**
   * Clears the stack. Passing id entries will result in specific stack entries
   * being pruned, typically those with track identifiers. This can be used to
   * reset only certain stack entries.
   *
   * - `default: true` when `toString()`
   * - `default: false` when `Log()`
   */
  clear?: boolean | string | string[];
  /**
   * Clears specific stack entries, typically those with track
   * identifiers. This can be used to reset only certain stack entries.
   *
   * > Passing `true` to `clear` will override and ignore these references
   */
  prune?: string | string[];
  /**
   * Applies a slice of the current stack. The stack is preserved with
   * only the entries starting from the provided index being logged.
   *
   * @default 0
   */
  from?: number;
  /**
   * Whether or not to disable final `trimEnd()` on the stack entry.
   *
   * - `default: true` when `toString()`
   * - `default: false` when `Log()`
   */
  trim?: boolean;
  /**
   * Wrap the stack in a specific color
   *
   * @default undefined
   */
  color?: Ansis;
}

export interface TUIOptions {
  /**
   * The type of tree message to generate - This will
   * default the `Tree.line` to a specific color, meaning
   * the `.line()` will be output according to the type.
   *
   * @default 'info
   */
  type?: LiteralUnion<'info' | 'warning' | 'error', string>;
  /**
   * Optionally provide an existing structure to build from.
   *
   * @default []
   */
  stack?: string[];
  /**
   * Whether or not tree printing applies
   *
   * @default true
   */
  tree?: boolean;
  /**
   * @deprecated Use stack instead.
   */
  text?: string[];
}

interface TUISpinner {
  /**
   * Whether or not spinner is active
   */
  active: boolean;
  /**
   * The label to append
   */
  label: string;
  /**
   * The interval timer
   */
  interval: NodeJS.Timeout;
  /**
   * This stack index of spinner message
   */
  index: number;
  /**
   * The spinner style
   *
   * @default 'brielle'
   */
  style: 'brielle' | 'spinning' | 'material';
  /**
   * Ansi Colour
   *
   * @default neonMagenta
   */
  color: Ansis;
  /**
   * The log update method to use on spinner update.
   *
   * > `clear` (default)
   * >
   * > Uses `this.update.clear()` by default
   *
   * > `done`
   * >
   * > Uses `this.update.done()` when `toUpdate()` was issued on instance.
   */
  stopOn: 'clear' | 'done'
}
type toStringParam = (
  | [ toString? ]
  | [ ((message: string) => any) ]
  | [ toString, ((message: string) => any) ]
)

interface TemplateOptions<ID = string> {
  /**
   * An identifier reference for updates. This is **required** and
   * must be provided.
   */
  id: ID;
  /**
   * Whether or not the template is hidden. When `true` the template
   * message can be assigned but not be added to the stack, instead it
   * will lay dormant in the track store until the `Update` method
   * is triggered.
   *
   * @default false
   */
  hidden?: boolean;
  /**
   * The color of the message, this will persist
   * across all updated applied, unless overwritten via `Update`
   */
  color?: Ansis,
  /**
   * Whether or not input should apply inline insertion, no Tree
   * prefix is applied, content is inserted as-is.
   *
   * @example
   * _.Template('id', { insert: true })
   *
   * // Assuming the current stack is:
   * [ '│ hello' ]
   *
   * // Later on when calling update, insert will behave like:
   * _.Update('id','bar baz qux') => [ '│ hello', 'bar baz qux' ]
   *
   */
  insert?: boolean,
  /**
   * Whether or not to apply tree line dash, default to `├─`
   *
   * @default false
   */
  dash?: boolean
  /**
   * Whether or not `Update` should use the `id` and pass it to `_.Prefix`
   * By default, this will be `false`. Pass a `string` to use instead of
   * `id`.
   *
   * @example
   * _.Template('random', { prefix: true })
   *
   * // Later on when calling update, the output will use the id as prefixer
   * _.Update('random', 'a b c') => '│ random  → some message'
   */
  prefix?: boolean | string
}

interface TemplatePrivate extends TemplateOptions {
  /**
   * The stack index
   */
  index: number;
  /**
   * Label
   */
  label: string;
  /**
   * When `hidden` is `true` this will hold the message to be inserted
   */
  message: string[];
}

type Track = Map<string, TemplatePrivate>

/**
 * Terminal User Interface
 *
 * Static string builder for constructing a console log that
 * will be printed to `stdout` or `stderr`. Maintains a stack
 * for updates and quick referencing along with methods for
 * composing output.
 */
export class Tui<Templates extends string = string> {

  /**
   * Maintain Store
   *
   * Optional store reference used to maintain different TUI
   * instances without variable assignment.
   */
  // eslint-disable-next-line no-use-before-define
  static store: Map<string, Tui> = new Map();

  /**
   * CLI Spinner instance
   */
  private spin: TUISpinner = {
    active: false,
    index: NaN,
    label: NIL,
    color: neonMagenta,
    style: 'spinning',
    interval: null,
    stopOn: 'clear'
  };

  /**
   * Store ID
   *
   * When TUI is created with a self-maintaining instance.
   * If this value is `null`, variable assignment instance was created.
   *
   * @default null
   */
  private id: string = null;

  /**
   * The type of tree message to generate - This will
   * default the `Tree.line` to a specific color, meaning
   * the `.line()` will be output according to the type.
   *
   * > `info`
   * >
   * > Output will be coloured `white` and Tree lines will be gray.
   *
   * > `warning`
   * >
   * > Output will be coloured `yellowBright` and Tree lines will be yellow.
   *
   * > `error`
   * >
   * > Output will be coloured `red` and Tree lines will be red.
   *
   * @default 'info
   */
  private type: LiteralUnion<'nil' | 'info' | 'warning' | 'error', string> = 'info';

  /**
   * Stack entry track
   *
   * @default Map
   */
  private track: Track = new Map();

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
   * The Tree dash color based on message type
   *
   * @default Tree.dash
   */
  private dash: string;

  /**
   * Whether or not tree line prefixes apply
   *
   * @default true
   */
  private tree: boolean = true;

  /**
   * Optionally provide an existing structure to build from.
   *
   * @default []
   */
  private stack?: string[];

  /**
   * Lambda functions
   */
  private lamdas?: Map<string, (this: this, tui: this) => any> = new Map();

  /**
   * Write index reference
   */
  private writes?: number = 0;

  /**
   * Optional data store
   */
  public data?: any;

  /**
   * The log-update instance
   */
  private get update (): typeof update { return Log.update; };

  /**
   * Constructor
   */
  constructor (options?: TUIOptions & { id?: string }) {

    if (typeof options === 'object') {

      this.id = 'id' in options ? options.id : null;
      this.tree = 'tree' in options ? options.tree : true;
      this.type = 'type' in options ? options.type : 'info';
      this.stack = 'stack' in options ? options.stack : [];

      if (this.tree) {
        if (this.type === 'error') {
          this.line = Tree.red;
          this.trim = Tree.redTrim;
          this.dash = Tree.redDash;
        } else if (this.type === 'warning') {
          this.line = Tree.yellow;
          this.trim = Tree.yellowTrim;
          this.dash = Tree.yellowDash;
        } else {
          this.line = Tree.line;
          this.trim = Tree.trim;
          this.dash = Tree.dash;
        }
      } else {
        this.line = '';
        this.trim = '';
        this.dash = '';
      }

    } else {

      this.id = null;
      this.line = Tree.line;
      this.trim = Tree.trim;
      this.dash = Tree.dash;
      this.stack = [];

    }

  }

  /**
   * Log Output
   *
   * Writes to `process.stdout` or `process.stderr` or if custom stream was defined.
   * Calling this option will apply the following `toString` options:
   *
   * ```js
   * {
   *   clear: false,     // stack will NOT clear when calling toLog()
   *   trim: false,      // trim will NOT apply when calling toLog()
   *   color: undefined
   * }
   * ```
   *
   * **Example Usage**
   *
   * ```js
   * import * as _ from '@syncify/ansi'
   *
   * // Calling no parameter
   * _.Create().Line('foo').Line('bar').toLog()
   *
   * // Passing a callback function
   * _.Create().Line('foo').Line('bar').toLog((message) => {})
   *
   * // Passing options with callback function
   * _.Create().Line('foo').Line('bar').toLog({ clear: true },(message) => {})
   * ```
   */
  toLog (...input: toStringParam) {

    const options: toString = { clear: false, color: undefined, trim: false };

    let callback: (message: string) => any = null;

    if (input.length > 0) {
      if (input.length === 1) {
        if (typeof input[0] === 'function') {
          callback = input[0];
        } else {
          Object.assign(options, input[0]);
        }
      } else {
        Object.assign(options, input[0]);
        callback = input[1];
      }
    }

    const output = this.toString(options, callback);

    if (this.type === 'error' || this.type === 'warning') {
      Log.stderr.write(output);
    } else {
      Log.stdout.write(output);
    }

    return this;

  }

  /**
   * Write Output
   *
   * Can be called multiple times, keeps track of stack index for each
   * call and prints from the last known index. This method is different
   * from `.toLog()` and `.toUpdate()` in the sense that stack is persisted
   * and only new stack entries print.
   *
   * ```js
   * {
   *   clear: false,     // stack will NOT clear when calling toWrite()
   *   trim: false,      // trim will NOT apply when calling toWrite()
   *   color: undefined
   * }
   * ```
   *
   * **Example Usage**
   *
   * ```js
   * import * as _ from '@syncify/ansi'
   *
   * const write = _.Create();
   *
   * // Stack: ['│ foo']
   * write
   * .Line('foo')
   * .toWrite() // Logs: │ foo\n
   *
   * // Stack: ['│ foo\n', '│ bar\n']
   * write
   * .Line('bar')
   * .toWrite() // Logs: │ bar\n
   *
   * // Stack: ['│ foo\n', '│ bar\n', '│ baz\n']
   * write
   * .Line('baz')
   * .toWrite() // Logs: │ bar\n
   * ```
   */
  toWrite (params?: Omit<toString, 'from'>) {

    const options = Object.assign({
      clear: false,
      trim: false,
      color: undefined,
      from: this.writes
    }, params);

    const output = this.toString(options);

    if (this.type === 'error' || this.type === 'warning') {
      Log.stderr.write(output);
    } else {
      Log.stdout.write(output);
    }

    this.writes = this.index + 1;

    return this;

  }

  /**
   * Generate string with ending line
   *
   * Applies a `.join` glue to the `this.stack[]`. Unlike other output
   * methods, the `toLine` only accepts an {@link Ansis} color.
   *
   * Calling this option will apply the following `toString` options:
   *
   * ```js
   * {
   *   clear: true,      // stack will be reset
   *   trim: true,       // trim applies because newline line appends
   *   color: undefined  // Applied based on the parameter
   * }
   * ```
   *
   * **Example**
   *
   * ```js
   * import * as _ from '@syncify/ansi'
   *
   * // Calling no parameter
   * _.Create().Line('foo').toLine() => '│ foo\n│ bar\n│'
   *
   * // Passing an ansis color
   * _.Create().Line('foo').toLine(_.gray)
   * ```
   */
  toLine (color?: Ansis) {

    if (this.stack.length === 0) return '';

    this.stack[this.stack.length - 1] = this.stack[this.stack.length - 1].trimEnd();
    this.stack.push('\n' + this.trim);

    const output: string = glue(this.stack);

    this.stack = [];
    this.track.clear();

    if (color) return color(output);
    if (this.type === 'info') return white(output);
    if (this.type === 'error') return redBright(output);
    if (this.type === 'warning') return yellowBright(output);

    return output;

  }

  /**
   * Log Update
   *
   * Updates the previous `stdout` using {@link update} module. The
   * stack will be preserved and the last write will be removed, updated
   * with the current stack.
   *
   * Calling this option will apply the following `toString` options:
   *
   * ```js
   * {
   *   clear: false,      // stack is preserved by default in toUpdate
   *   trim: false,       // trim is not applied by default in toUpdate
   * }
   * ```
   *
   * > The instance of log update is returned, so chaining cannot apply.
   *
   * **Example Usage**
   *
   * ```js
   * import * as _ from '@syncify/ansi'
   *
   * // Calling no parameter
   * _.Create().Line('foo').toUpdate()
   *
   * // Called log update methods
   * _.Create().Line('foo').toUpdate().done()
   * _.Create().Line('foo').toUpdate().clear()
   * ```
   */
  toUpdate (options?: {
    clear?: boolean,
    trim?: boolean,
  }) {

    if (options === null) return this;

    const output = this.toString({ clear: false, trim: false, ...options });

    this.spin.stopOn = 'done';
    this.update(output);

    return this;

  }

  /**
   * Generate string
   *
   * Applies a `.join` glue to the `text[]`, returning a string.
   * Applies trim any newlines in last entry, clears the `this.stack[]` array
   * and `track` Map. The resets can be prevented by passing `{ clear: false }`
   * as option. The defaults are as followed:
   *
   * ```js
   * {
   *   clear: true,      // stack will be reset
   *   trim: true,       // trim applies because newline line appends
   *   color: undefined  // Applied based on the parameter
   * }
   * ```
   */
  toString (...input: toStringParam) {

    if (this.stack.length === 0) return '';

    const options: toString = {
      clear: true,
      trim: true,
      from: 0,
      color: undefined
    };

    let callback: (message: string) => any = null;

    if (input.length > 0) {
      if (input.length === 1) {
        if (typeof input[0] === 'function') {
          callback = input[0];
        } else {
          Object.assign(options, input[0]);
        }
      } else {
        Object.assign(options, input[0]);
        callback = input[1];
      }
    }

    if (options.trim) this.stack[this.index] = this.stack[this.index].trimEnd();

    const stack = options.from > 0 ? this.stack.slice(options.from) : this.stack;

    let output: string;

    if (options.color) {
      output = options.color(glue(stack));
    } else if (this.type === 'info') {
      output = white(glue(stack));
    } else if (this.type === 'error') {
      output = redBright(glue(stack));
    } else if (this.type === 'warning') {
      output = yellowBright(glue(stack));
    } else {
      output = glue(stack);
    }

    if (options.clear === true) {

      this.Reset();

    } else if (Array.isArray(options.clear)) {

      for (const clear of options.clear) {
        if (this.track.has(clear)) {
          const track = this.track.get(clear);
          this.stack[track.index] = '';
        }
      }

    } else if (typeof options.clear === 'string') {

      if (this.track.has(options.clear)) {
        const track = this.track.get(options.clear);
        this.stack[track.index] = '';
      }

    }

    return callback === null ? output : callback(output);

  }

  /**
   * Return Structure
   *
   * Returns the current structure being built.
   *
   * @example
   * _.toStack() => ['│ foo', '│ bar', '│ baz']
   */
  toStack () {

    return this.stack;

  }

  /**
   * Function Lambda
   *
   * Tracks a function callback and fires on every call.
   *
   * @example
   * _.Lambda('foo', () => console.label('hello'))
   *
   * _.Lambda('foo')
   */
  Lambda (id: string, callback?: (this: Tui, tui: Tui) => void) {

    if (typeof callback === 'function') {
      this.lamdas.set(id, callback);
    } else if (this.lamdas.has(id)) {
      if (callback === null) {
        this.lamdas.delete(id);
      } else {
        this.lamdas.get(id).call(this, this);
      }
    }

    return this;

  }

  /**
   * String
   *
   * Similar to `toString()` but returns instance
   */
  String (options: toString, callback: (message: string) => void) {

    callback(this.toString(options));

    return this;

  }

  /**
   * True Conditional
   *
   * If parameter 1 is `truthy`, parameter to will trigger.
   *
   * @example
   * _.True(foo === false, function(tui) {
   *
   *   // context is parameter
   *   tui.Line('Hello World')
   *
   *   // this binding applies
   *   this.Line('Hello World')
   * })
   */
  True (condition: any, callback: (this: Tui, tui?: Tui) => void) {

    if (condition) callback.call(this, this);

    return this;

  }

  /**
   * False Conditional
   *
   * If parameter 1 is `falsy`, parameter to will trigger.
   *
   * @example
   * _.False(foo === false, function(tui) {
   *
   *   // context is parameter
   *   tui.Line('Hello World')
   *
   *   // this binding applies
   *   this.Line('Hello World')
   * })
   */
  False (condition: any, callback: (this: Tui, tui?: Tui) => void) {

    if (!condition) callback.call(this, this);

    return this;

  }

  /**
   * Update the newline lines
   *
   * Allows for the tree lines to be changed, but no modification applies to text.
   */
  Tree (tree?: 'error' | 'warning' | 'info' | 'nil') {

    if (tree === 'error') {
      this.line = Tree.red;
      this.trim = Tree.redTrim;
      this.dash = Tree.redDash;
    } else if (tree === 'warning') {
      this.line = Tree.yellow;
      this.trim = Tree.yellowTrim;
      this.dash = Tree.yellowDash;
    } else if (tree === 'nil') {
      this.line = '';
      this.trim = '';
      this.dash = '';
    } else {
      this.line = Tree.line;
      this.trim = Tree.trim;
      this.dash = Tree.dash;
    }

    return this;

  }

  /**
   * Each Iterator
   *
   * Acccepts a array and callback function.
   *
   * @example
   * _.Each(['foo', 'bar'], item => _.Line(item))
   */
  Each <T> (array: T[], callback: (this: Tui, item?: T, index?: number) => void) {

    for (let i = 0, s = array.length; i < s; i++) callback.call(this, array[i], i);

    return this;

  }

  /**
   * Reset stack and track
   *
   * Empties the `stack[]` and clears the `track` map.
   */
  Reset () {

    this.stack = [];
    this.track.clear();
    this.writes = 0;

    if (this.id !== null && Tui.store.has(this.id)) Tui.store.delete(this.id);

  }

  /**
   * is Empty
   *
   * Whether or not the message stack is empty
   */
  get isEmpty () {

    return this.stack.length > 0;

  }

  /**
   * is Endline
   *
   * Whether or not the last item in the stack ends with a newline character
   */
  get isEndline () {

    if (this.stack.length > 0) {
      const last = this.Get();
      return last[last.length - 1] === '\n';
    }

    return false;

  }

  /**
   * Get Line
   *
   * Returns a line at the specific index. Defaults to last known line
   */
  Get (at: string | number = this.stack.length - 1) {

    if (typeof at === 'string' && this.track.has(at)) at = this.track.get(at).index;

    return this.stack[at];

  }

  /**
   * Track Stack entry
   *
   * When called, an index in the stack is tracked. The message in the stack
   * can then be referenced and updated at a later time using `Update`. If
   * the stack is empty, no track applies.
   *
   * The function **must** be called following a write method and the last known
   * entry index in the stack is what is saved. If a tacked reference exists
   * with the `id` provided, it will be overwritten.
   *
   * All tracked references are cleared on `toString` or `toLine`
   */
  Template (...input: [
    message: string | string[],
    options: TemplateOptions<Templates>
  ] | [
    options: TemplateOptions<Templates>
  ]) {

    const message = input.length === 2 ? input[0] : null;
    const options: TemplatePrivate = Object.assign<TemplatePrivate, any>({
      color: null,
      prefix: false,
      insert: false,
      hidden: false,
      id: null,
      label: null,
      message: null,
      dash: false,
      index: this.stack.length
    }, message ? input[1] : input[0]);

    if (typeof options.prefix === 'string') {
      options.label = options.prefix;
      options.prefix = true;
    }

    if (message !== null) {
      const write = Array.isArray(message) ? message : [ message ];
      if (options.hidden) {
        options.message = write;
        this.stack.push('');
      } else {
        if (options.prefix) {
          this.stack.push(
            Prefix(
              typeof options.label === 'string' ? options.label : options.id,
              options.color ? options.color(glue(write)) : glue(write)
            ) + NWL
          );
        } else {
          this.stack.push(Multiline(write, {
            color: options.color,
            line: options.dash ? this.dash : this.line
          }) + NWL);
        }
      }
    } else {
      this.stack.push('');
    }

    if (options.id !== null) {
      if (options.index !== this.stack.length - 1) options.index = this.stack.length - 1;
      this.track.set(options.id, options);
    }

    return this;

  }

  /**
   * Tree Update
   *
   * Updates a stack entry at either a `Track()` identifier index or index (depending on `id`)
   * parameter `type` provided. The stack will be augmented and updated, at the index provided.
   * Passing an `string[]` input will result in spliced insertion.
   *
   * @example
   * // Assuming Template('ref') was called during message creation
   *
   * // If ref was index 1 in the stack
   * _.Update('ref', ['hello', 'world'])
   *
   * // Before
   * ['│ foo\n', '│ bar\n', '│ baz\n']
   * // After
   * ['│ foo\n', '│ hello\n', '│ world\n', '│ baz\n']
   */
  Update (id: Templates, input: string | string[] = null, newColor: Ansis = null) {

    let index: number = NaN;
    let track: TemplatePrivate;

    if (typeof id === 'string' && this.track.has(id)) {
      track = this.track.get(id);
      index = track.index;
    }

    if (isNaN(index) || typeof this.stack[index] !== 'string') return this;

    const lines = track.hidden
      ? input === null
        ? [ ...track.message ]
        : [ '' ]
      : typeof input === 'string'
        ? [ input ]
        : Array.isArray(input)
          ? input
          : [ `${input}` ];

    const newline: boolean = lines.length > 1;
    const replace: string[] = [];
    const color = newColor || track.color;
    const { prefix, insert, label, dash } = track;
    const line = dash ? this.dash : this.line;

    let tree: number = 0;

    while (lines.length !== 0) {

      const line = lines.shift();

      newline && tree > 0 && insert === false
        ? replace.push(line + (color ? color(line) : line))
        : replace.push((color ? color(line) : line));

      tree++;

    }

    const output = prefix
      ? Prefix(typeof label === 'string' ? label : id, glue(replace))
      : newline ? glue.nl(replace) : glue(replace);

    if (insert) {
      this.stack.splice(index, 1, output);
    } else {
      this.stack.splice(index, 1, line + output + '\n');
    }

    return this;

  }

  /**
   * TUI Spinner
   *
   * Prints a spinning loading and persists within stack Calling `this.toUpdate()` each interval.
   * Can be used with `this.Stop()`. Renders a `Header` entry.
   *
   * @example
   * // Spinner will begin immediately
   * _.Line('foo').Spinner('bar')
   *
   * // Stack input - notice how a header is applied
   * ['│ foo\n', '│\n│ ◓ bar\n│\n']
   *
   * // When we want to stop and clear spinner
   * _.Stop()
   */
  Spinner (message: string, options?: { style?: 'spinning' | 'brielle', color?: Ansis }) {

    options = Object.assign({
      style: 'spinning',
      color: neonTeal
    }, {
      color: this.spin.color,
      style: this.spin.style
    }, options);

    if (this.spin.active === false) {

      if (this.spin.stopOn === 'done') {
        this.update.clear();
      }

      let frame: number = 0;

      this.spin.style = options.style as any;

      const spin = Spinner.loaders[this.spin.style];
      const frames = spin.frames;
      const size = frames.length;

      this.spin.index = this.stack.push('') - 1;
      this.spin.color = options.color;
      this.spin.label = message;
      this.spin.active = true;
      this.update(this.line + gray.dim('...'));
      this.spin.interval = setInterval(() => {

        if (this.spin.active) {
          this.update(glue(
            this.line,
            this.spin.color(frames[++frame % size] + WSP + this.spin.label),
            NWL
          ));
        }
      }, spin.interval);

    } else {

      this.spin.label = message;
      this.spin.color = options.color;

    }

    return this;
  }

  /**
   * TUI Stop Spinner
   *
   * When spinner is active, calling this will stop and remove the spinner
   * from the stack. Optionally update the spinner value to preserve.
   *
   * > **NOTE** Passing an update will render as line, not Header
   */
  Stop (update?: string, color?: Ansis) {

    if (this.spin.interval !== null) {
      clearInterval(this.spin.interval);
    }

    if (this.spin.active === false) {
      this.update.done();
      return this;
    }

    this.update.clear();
    this.spin.active = false;
    this.spin.interval = null;

    this
    .True(this.writes > 0, () => this.Remove(this.spin.index, Infinity))
    .True(update, () => this.Line(update, color));

    this.spin.index = NaN;

    return this;

  }

  /**
   * Checks if previous stack entry is tree line and pops it
   * if determined to be true.
   */
  Trim () {

    const previous = this.stack[this.stack.length - 1] + '\n';

    if (!previous) return this;

    if (
      previous === Tree.line ||
      previous === Tree.trim ||
      previous === Tree.red ||
      previous === Tree.redTrim ||
      previous === Tree.yellow ||
      previous === Tree.yellowTrim) this.Pop();

    return this;

  }

  /**
   * Remove Line
   *
   * Removes a line at specific index. Can apply a slice or splice.
   * Passing a `deleteCount` value of `Infinity` will slice stack at the index.
   *
   * @example
   * // Assuming the stack contains the following:
   * [
   *   '│ foo',
   *   '│ bar',
   *   '│ baz'
   * ]
   *
   * // Calling .remove(0) will remove first index
   * [
   *   '│ bar',
   *   '│ baz'
   * ]
   */
  Remove (at: number | string, deleteCount: number | string = 1) {

    let index: number;

    if (typeof at === 'string') {
      if (!this.track.has(at)) return this;
      index = this.track.get(at).index;
      this.track.delete(at);
    } else {
      index = at;
    }

    if (deleteCount === Infinity) {

      this.stack.splice(index);

      // Remove all IDs that point to removed indices
      for (const [ otherId, data ] of this.track.entries()) {
        if (data.index >= index) {
          this.track.delete(otherId);
        }
      }

      this.stack = this.stack.slice(0, index);

    } else {

      let ender: number;

      if (typeof deleteCount === 'string') {
        if (this.track.has(deleteCount)) {
          ender = this.track.get(deleteCount).index;
          this.track.delete(deleteCount);
        } else {
          ender = 1;
        }
      } else {
        ender = deleteCount;
      }

      this.stack.splice(index, ender);

      for (const [ id, track ] of this.track.entries()) {
        if (track.index > index) {
          this.track.get(id).index = track.index - ender;
        }
      }
    }

    return this;

  }

  /**
   * Mark Stack
   *
   * Inserts a fake placeholder that is to be removed or replaced at a later time.
   * The `track` Map will assign `insert` to `true` to prevent newline line insertion.
   *
   * @example
   * _.Mark('xxx')
   *
   * // Before
   * [ '│ foo', '│ bar' ]
   *
   * // After
   * [ '│ foo', '│ bar', '']
   *
   * // Later on
   * _.Remove('xxx')
   *
   * // Use Infinity to slice at mark
   * _.Remove('xxx', Infinity)
   */
  Mark (id: string) {

    this.track.set(id, {
      id,
      index: this.stack.length,
      label: null,
      prefix: false,
      color: undefined,
      insert: false,
      dash: false,
      hidden: false,
      message: null
    });

    this.stack.push('');

    return this;

  }

  /**
   * Replace and persist
   *
   * Replaces an entry at the provided index. Line is prefixed and not required in `input`
   *
   * @example
   * _.Replace(1, 'qux')
   *
   * // Before
   * [ '│ foo', '│ bar', '│ baz' ]
   *
   * // After
   * [ '│ foo', '│ qux', '│ baz' ]
   */
  Replace (at: number | string, input: string, color?: Ansis) {

    let index: number;

    if (typeof at === 'string') {
      if (!this.track.has(at)) return this;
      index = this.track.get(at).index;
    } else {
      index = at;
    }

    if (this.stack[index]) {
      this.stack[index] = this.line + (color ? color(input) : input) + '\n';
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
   * # When Tree is enabled
   * │\n
   * ├─────────────────────\n
   * │\n
   *
   * # When Tree is disabled
   * ──────────────────────\n
   * ```
   */
  Ruler (width: number = undefined, { noLines = false } = {}) {

    if (width === undefined) width = tsize().wrap;

    if (this.tree) {
      if (noLines) {
        this.stack.push(lightGray(`├${'─'.repeat(width)}`) + '\n');
      } else {
        this.stack.push(Tree.trim + '\n' + lightGray(`├${'─'.repeat(width)}`) + '\n' + Tree.trim + '\n');
      }
    } else {
      this.stack.push(lightGray('─'.repeat(width)) + '\n');
    }
    return this;
  }

  /**
   * Returns the current text index in the stack
   */
  get index () {

    return this.stack.length - 1;

  }

  get newlines () {

    return this.stack.join('').split(NWL).length;

  }

  /**
   * Tree Newline
   *
   * Works the same as `Newline()` but is exposed as getter
   *
   * ```bash
   * │\n
   * ```
   */
  get NL () {

    this.stack.push(this.trim + '\n');

    return this;
  }

  /**
   * Newline only
   *
   * Pushed a newline into the stack
   *
   * ```bash
   * \n
   * ```
   */
  get BR () {

    this.stack.push('\n');

    return this;

  }

  /**
   * Newline only
   *
   * Pushes a single `\n` newline into the stack or
   * multiple newlines if `repeat` parameter is provided.
   *
   * ```bash
   * \n
   * ```
   */
  Break (repeat?: number) {

    if (typeof repeat === 'number') {
      this.stack.push('\n'.repeat(repeat));
    } else {
      this.stack.push('\n');
    }

    return this;

  }

  /**
   * Tree Pop
   *
   * Removes the last entry in the message stack. Accepts
   * a number parameter to increase the amount of removals
   * to occur.
   *
   * ```bash
   * │\n
   * ```
   *
   * @example
   * // Assuming the stack contains the following:
   * [
   *   '│ foo',
   *   '│ bar',
   *   '│ baz'
   * ]
   *
   * // Calling .pop() will remove the last entry:
   * [
   *   '│ foo',
   *   '│ bar'
   * ]
   */
  Pop (amount: number = 1) {

    while (amount-- > 0) this.stack.pop();

    return this;
  }

  /**
   * Tree Newline
   *
   * Returns a newline, accepts `addLines` parameter that accepts a `number`
   * and when provided will generate multiple newlines. In addition (or optionally)
   * a `color` can be provided, which expects a valid color string name.
   *
   * ```bash
   * │\n
   * ```
   *
   * ---
   *
   * **Passing Color**
   *
   * Passing `Newlines('red')` will a line in red.
   *
   * ```bash
   * │\n
   * ```
   *
   * ---
   *
   * **Passing Lines and Color**
   *
   * Passing `Newlines(2, 'red')` will generate the following string in red.
   *
   * ```bash
   * │\n
   * │\n
   * ```
   */
  Newline (
    addLines?: number | LiteralUnion<'line' | 'red' | 'yellow', string>,
    color?: LiteralUnion<'red' | 'yellow', string>
  ) {

    if (typeof addLines === 'number') {

      let input: string = this.trim + '\n';

      if (color) {
        if (this.tree) {
          if (color === 'yellow') {
            input = Tree.yellowTrim + '\n';
          } else if (color === 'red') {
            input = Tree.redTrim + '\n';
          }
        }
      }

      for (let i = 0; i < addLines; i++) this.stack.push(input);

    } else {

      if (addLines === '') {
        this.stack.push('\n');
      } else if (addLines === 'line') {
        this.stack.push(Tree.trim + '\n');
      } else if (addLines === 'yellow') {
        this.stack.push((this.tree ? Tree.yellowTrim : '') + '\n');
      } else if (addLines === 'red') {
        this.stack.push((this.tree ? Tree.redTrim : '') + '\n');
      } else if (typeof addLines === 'string') {
        this.stack.push(addLines + '\n');
      } else {
        this.stack.push(this.trim + '\n');
      }
    }

    return this;

  }

  /**
   * Tree Inline
   *
   * Appends to the previous entry. If no entries exist in the message, a new one is
   * created with tree line prefix.
   *
   * > Use `Push()` method to insert entry without line prefix.
   *
   * @example
   * _.Inline('baz qux')
   *
   * // Before
   * [ '│ hello', '│ foo bar\n' ]
   *
   * // After
   * [ '│ hello', '│ foo bar baz qux\n' ]
   *
   * // If the stack is empty, default behaviour applied
   *
   * // Before
   * []
   *
   * // After
   * [ '│ baz qux' ]
   */
  Inline (input: string, ...options: [ number?, Ansis? ] | [ Ansis? ] | [ number? ]) {

    let index: number = this.stack.length > 0 ? this.stack.length - 1 : NaN;
    let color: Ansis = null;

    if (options.length > 0) {
      if (options.length === 2) {
        index = options[0];
        color = options[1];
      } else if (options.length === 1) {
        if (typeof options[0] === 'number') {
          index = options[0];
        } else {
          color = options[0];
        }
      }
    }

    if (index > -1) {
      this.stack[index] = this.stack[index].trimEnd() + ' ' + (color ? color(input) : input) + '\n';
    } else {
      this.stack.push(this.line + (color ? color(input) : input) + '\n');
    }

    return this;
  }

  /**
   * Tree Insert
   *
   * Pushes input onto the stack, but does not prefix line or append newline.
   * Inserts the `input` as is, and accepts an optional `color` function.
   *
   * @example
   * _.Insert('bar baz qux')
   *
   * // Before
   * [ '│ hello', '│ foo' ]
   *
   * // After
   * [ '│ hello', '│ foo', 'bar baz qux' ]
   */
  Insert (input: string, color?: Ansis) {

    this.stack.push((color ? color(input) : input));

    return this;

  }

  /**
   * Tree Line
   *
   * Pushes a string onto the message stack. Prefixes with a `│` and
   * suffixes with newline `\n`. This is _typically_ the most common method.
   *
   * ```bash
   * │ input\n
   * ```
   *
   * @example
   * _.Line('world')
   *
   * // Before
   * [ '│ hello\n' ]
   *
   * // After
   * [ '│ hello\n', '│ world\n' ]
   */
  Line (input: string, color?: Ansis) {

    if (this.type === 'error') {
      return this.Error(input, color);
    }

    if (this.type === 'warning') {
      return this.Warn(input, color);
    }

    this.stack.push(this.line + (color ? color(input) : input) + '\n');

    return this;
  }

  /**
   * Tree Prefix
   *
   * Applies the {@link Prefix} render on a line.
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
   * **Passing 2 `suffix` parameters**
   *
   * ```bash
   * │ prefix  »  action → suffix
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
  Prefix (label: Prefixes, ...suffix: [
    string,
    Ansis?
  ] | [
    string,
    string,
    Ansis?
  ] | [
    string,
    string,
    string,
    Ansis?
  ] | [
    string,
    string,
    string,
    string,
    Ansis?
  ]) {

    const color = typeof suffix[suffix.length - 1] === 'function' ? suffix.pop() as Ansis : null;
    const text = color ? suffix.map((item: string) => color(item)) : suffix as string[];
    const input = Prefix(label, ...text);

    this.stack.push(this.line + input + '\n');

    return this;
  }

  /**
   * Prepend Line
   *
   * Pushes a string onto the message stack with a newline line prepended
   *
   * ```bash
   * │\n
   * │ input\n
   * ```
   *
   * @example
   * _.Prepend('world')
   *
   * // Before
   * [ '│ hello\n' ]
   *
   * // After
   * [ '│ hello\n', '│\n│ world\n' ]
   */
  Prepend (input: string, color?: Ansis) {

    if (this.type === 'error') {
      return this.NL.Error(input, color);
    } else if (this.type === 'warning') {
      return this.NL.Warn(input, color);
    }

    return this.NL.Line(input, color);

  }

  /**
   * Append Line
   *
   * Pushes a string onto the message stack. Appended with a newline line `│` and
   * suffixes with newline `\n`.
   *
   * ```bash
   * │ input\n
   * │\n
   * ```
   *
   * @example
    * _.Append('world')
    *
    * // Before
    * [ '│ hello\n' ]
    *
    * // After
    * [ '│ hello\n', '│ world\n│\n' ]
    */
  Append (input: string, color?: Ansis) {

    if (this.type === 'error') {
      this.Error(input, color);
    } else if (this.type === 'warning') {
      this.Warn(input, color);
    } else {
      this.Line(input, color);
    }

    return this.Newline();

  }

  /**
   * Tree Error Line (red)
   *
   * Same as `Line()` but tree line suffix is `red`
   *
   * ```bash
   * │ input\n
   * ```
   */
  Error (input: string, color?: Ansis) {

    this.stack.push((this.tree ? Tree.red : '') + (color ? color(input) : redBright(input)) + '\n');

    return this;

  }

  /**
   * Tree Warn Line (yellow)
   *
   * Same as `Line()` but tree line suffix is `yellow`
   *
   * ```bash
   * │ input\n
   * ```
   */
  Warn (input: string, color?: Ansis) {

    this.stack.push((this.tree ? Tree.yellow : '') + (color ? color(input) : yellowBright(input)), '\n');

    return this;

  }

  /**
   * Tree Line Break
   *
   * Appends and Prepends newlines, effectively wrapping the `input` in
   * paragraphical format.
   *
   * ```js
   * // When tree is enabled
   * │\n
   * │ input\n
   * │\n
   *
   * // When tree is disabled
   * \n
   * input\n
   * \n
   * ```
   */
  Header (message: string, color?: Ansis) {

    this.stack.push(
      this.trim + '\n' +
      this.line + (color ? color(message) : message) + '\n' +
      this.trim + '\n'
    );

    return this;
  }

  /**
   * Tree Top
   *
   * ```
   * '\n┌─ Label ~ 01:59:20\n'
   * ```
   */
  Top (label: string, timestamp = true) {

    this.stack.push(Top(label, timestamp) + '\n');

    return this;
  }

  /**
   * Tree End
   *
   * Returns a tree ender with optional timestamp suffix appended.
   * Timestamp suffix defaults to `true` and will be applied.
   *
   * ```js
   * '└─ input ~ 01:59:20\n'   // Passing true to timestamp (default)
   * // OR
   * '└─ input\n'  // Passing false to timestamp
   * ```
   */
  End (input: string, timestamp = true) {

    this.stack.push(End(input, timestamp));

    return this;

  }

  /**
   * Tree Context
   *
   * Accepts a contextual model. The context will be parsed and
   * pushed onto the stack.
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
  Context (data: IssueContext) {

    if (!('tree' in data)) data.tree = this.line !== '';

    this.stack.push(Context(data) + '\n');

    return this;

  }

  /**
   * Tree Dash
   *
   * Applies prefixed tree dash to input
   *
   * ```js
   * // When tree is enabled
   * ├─ input\n
   *
   * // When tree is disabled
   * — input\n
   * ```
   */
  Dash (input: string, color?: Ansis) {

    this.stack.push((this.tree ? this.dash : `${DSH} `) + (color ? color(input) : input) + '\n');

    return this;

  }

  /**
   * Tree Multiline
   *
   * Prefixes a multiline string with tree line. This method does
   * not apply wrap, but instead applies a `.split('\n')` on string
   * input (if single string is passed). The method accepts `...string`
   * spread or `string[]` parameter value.
   *
   * ```
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * ```
   *
   * @example
   * // Passing a string with newlines
   * _.Multline('hello\nworld') => [ '│ hello\n', '│ world\n' ]
   *
   * // Passing an array of strings
   * _.Multline(['hello', 'world']) => [ '│ hello\n', '│ world\n' ]
   *
   * // Passing a spread
   * _.Multline('hello', 'world') => [ '│ hello\n', '│ world\n' ]
   */
  Multiline (...input: [ string[] ] | string[]) {

    const lines = typeof input[0] === 'string'
      ? input.length === 1
        ? input[0].split('\n')
        : input
      : input[0];

    while (lines.length !== 0) {

      this.stack.push(this.line + lines.shift() + '\n');

    }

    return this;

  }

  /**
   * Tree Unshift
   *
   * Inserts a string onto the message stack at index `0`. Prefixes with a `│` and
   * suffixes with newline `\n`.
   *
   * > If `type` is `error` or `warning` and you want to prevent the red or yellow
   * color highlighting, then pass a value of `null` to color parameter.
   *
   * ```bash
   * │ input\n
   * ```
   *
   * @example
    * _.Unshift('world', 0)
    *
    * // Before
    * [ '│ hello\n' ]
    *
    * // After
    * ['│ world\n', '│ hello\n' ]
    */
  Unshift (input: string, color?: Ansis) {

    if (!color) {
      if (color !== null) {
        if (this.type === 'error') color = redBright;
        if (this.type === 'warning') color = yellowBright;
      }
    }

    this.stack.push(this.line + (color ? color(input) : input) + '\n');

    return this;

  }

  /**
   * Tree Wrap
   *
   * Accepts `string[]` or `...string[]` spread. The last entry accepts an
   * optional Ansis color. The **input** will be passed to {@link Wrap} and the
   * returning output will end with newline.
   *
   * ```
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * │ lorem ipsum lorem ipsum\n
   * ```
   */
  Wrap (...input: (string[] | string | Ansis | ((message: string) => string))[]) {

    let color: Ansis = whiteBright;

    if (this.type === 'error') {
      color = redBright;
    } else if (this.type === 'warning') {
      color = yellowBright;
    }

    if (typeof input[0] === 'string') {

      if (typeof input[input.length - 1] === 'function') {
        color = <Ansis>input.pop();
      }

      this.stack.push(Wrap(<string[]>input, { color, line: this.line }) + '\n');

    } else if (Array.isArray(input[0])) {

      if (typeof input[1] === 'function') color = <Ansis>input.pop();

      this.stack.push(Wrap(input[0], { color, line: this.line }) + '\n');

    } else if (typeof input[0] === 'function') {

      color = <Ansis>input.shift();

      this.stack.push(Wrap(<string[]>input, { color, line: this.line }) + '\n');

    } else if (Array.isArray(input[1])) {

      color = <Ansis>input[0];

      this.stack.push(Wrap(<string[]>input[1], { color, line: this.line }) + '\n');

    }

    return this;
  }

}

type CreateParams = [ id: string, options?: TUIOptions ] | [ options?: TUIOptions ]

/**
 * Create a TUI Instance
 *
 * ```bash
 * ┌─
 * │
 * ├─
 * │
 * └─
 * ```
 */
export function Create <Templates extends string> (...params: CreateParams) {

  let id: string;
  let options: TUIOptions & { id?: string };

  if (params.length === 2) {
    id = params[0];
    options = params[1];
  } else if (params.length === 1) {
    if (typeof params[0] === 'string') {
      id = params[0];
    } else {
      options = params[0];
    }
  }

  if (id) {

    if (options) {
      options.id = id;
    } else {
      options = { id };
    }

    const instance = new Tui<Templates>(options);

    return Tui.store.set(id, instance).get(id);

  }

  return new Tui<Templates>(options);

}

/**
 * Create Self-Maintained TUI Instance
 *
 * ```bash
 * ┌─
 * │
 * ├─
 * │
 * └─
 * ```
 */
export function TUI (id: string) {

  if (Tui.store.has(id)) return Tui.store.get(id);

  return Create(id);

}
