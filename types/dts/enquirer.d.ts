/* eslint-disable no-use-before-define */

import type { Ansis } from '@syncify/ansi';
import type { EventEmitter } from 'events';

import { LiteralUnion } from 'type-fest';

interface PromptSymbols {
  /** `undefined` on windows, `✘` on other platforms. */
  ballotCross?: string;
  /** `☒` */
  ballotDisabled?: string;
  /** `☐` */
  ballotOff?: string;
  /** `☑` */
  ballotOn?: string;
  /** `•` */
  bullet?: string;
  /** `√` on windows, `✔` on other platforms. */
  check?: string;
  /** `×` on windows, `✖` on other platforms. */
  cross?: string;
  /** `...` on windows, `…` on other platforms. */
  ellipsis?: string;
  /** `❤` */
  heart?: string;
  /** `ℹ` */
  info?: string;
  /** `─` */
  line?: string;
  /** `·` */
  middot?: string;
  /** `>` on windows, `▸` on linux, and `❯` on other platforms. */
  pointer?: string;
  /** `»` on windows, `‣` on linux, and `›` on other platforms. */
  pointerSmall?: string;
  /** `?` */
  question?: string;
  /** `undefined` on windows, `？` on other platforms. */
  questionFull?: string;
  /** `?` on windows, `﹖` on other platforms. */
  questionSmall?: string;
  /** `( )` on windows, `◯` on other platforms. */
  radioOff?: string;
  /** `(*)` on windows, `◉` on other platforms. */
  radioOn?: string;
  /** `★` */
  starsOn?: string,
  /** `☆` */
  starsOff?: string,
  /** `‼` on windows, `⚠` on other platforms. */
  warning?: string;

  /* -------------------------------------------- */
  /* SYMBOLS OVERRIDDEN BY ENQUIRER               */
  /* -------------------------------------------- */

  /** `⇕` */
  upDownDoubleArrow?: string,
  /** `⬍` */
  upDownDoubleArrow2?: string,
  /** `↕` */
  upDownArrow?: string,
  /** `*` */
  asterisk?: string,
  /** `⁂` */
  asterism?: string,
  /** `◦` */
  bulletWhite?: string,
  /** `⌁` */
  electricArrow?: string,
  /** `⋯` */
  ellipsisLarge?: string,
  /** `…` */
  ellipsisSmall?: string,
  /** `█` */
  fullBlock?: string,
  /** `≡` */
  identicalTo?: string,
  /**
   * `√` on windows, `✔` on other platforms.
   */
  indicator?: string;
  /** `‹` */
  leftAngle?: string,
  /** `※` */
  mark?: string,
  /** `−` */
  minus?: string,
  /** `×` */
  multiplication?: string,
  /** `÷` */
  obelus?: string,
  /** `%` */
  percent?: string,
  /** `¶` */
  pilcrow?: string,
  /** `❡` */
  pilcrow2?: string,
  /** `✐` */
  pencilUpRight?: string,
  /** `✎` */
  pencilDownRight?: string,
  /** `✏` */
  pencilRight?: string,
  /** `+` */
  plus?: string,
  /** `±` */
  plusMinus?: string,
  /** `☞` */
  pointRight?: string,
  /** `›` */
  rightAngle?: string,
  /** `§` */
  section?: string,
  /** `{ off?: '⬡', on?: '⬢', disabled?: '⬢' }` */
  hexagon?: {
    /** `⬡` */
    off?: string,
    /** `⬢` */
    on?: string,
    /** `⬢` */
    disabled?: string
  },
  /** `{ on?: '☑', off?: '☐', disabled?: '☒' }` */
  ballot?: {
    /** `☑` */
    on?: string,
   /** `☐` */
    off?: string,
   /** `☒` */
    disabled?: string
  },
  /** `{ on?: '★', off?: '☆', disabled?: '☆' }` */
  stars?: {
    /** `★` */
    on?: string,
   /** `☆` */
    off?: string,
   /** `☆` */
    disabled?: string
  },
  /** `{ on?: '▼', off?: '▶', disabled?: '▶' }` */
  folder?: {
    /** `▼` */
    on?: string,
   /** `▶` */
    off?: string,
   /** `▶` */
    disabled?: string
  },
  prefix?: {
    /** `?` */
    pending?: string;
    /** `✔` */
    submitted?: string;
    /** `×` */
    cancelled?: string;
  };
  separator?: {
    /** `»` on windows, `‣` on linux, and `›` on other platforms. */
    pending?: string;
    /** `·` */
    submitted?: string;
    /** `·` */
    cancelled?: string;
  };
  /** `{ on?: '◯', off?: '◉', disabled?: 'Ⓘ' }` */
  radio?: {
    /**
     * `( )` on windows, `◯` on other platforms.
     */
    off?: '( )' | '◯';
    /**
     * `(*)` on windows, `◉` on other platforms.
     */
    on?: '(*)' | '◉';
    /**
     * `(|)` on windows, `Ⓘ` on other platforms.
     */
    disabled?: '(|)' | 'Ⓘ';
  };
  /**
   * Unicode circled numbers from `⓪` through `㊿`: `⓪`, `①`, `②`, `③`, etc.
   */
  numbers?: string[];
}

interface PromptStyles {
  /** Main Color `neonGreen` (default: `cyan`) */
  primary: Ansis
  /** Main palette `neonGreen` (default: `green`) */
  success: Ansis
  /** Main palette `red` (default: `magenta`) */
  danger: Ansis
  /** Main palette `yellowBright` (default: `yellow`) */
  warning: Ansis
  /** Main palette `gray` (default: `dim`) */
  muted: Ansis
  /** Main palette `gray` (default: `gray`) */
  disabled: Ansis
  /** Main palette (default: `gray`) */
  dark: Ansis
  /** Main palette (default: `bold`) */
  strong: Ansis
  /** Main palette (default: `underline`) */
  underline: Ansis
  /** Status (uses: `primary`) */
  pending: Ansis
  /** Status (uses: `success`) */
  submitted: Ansis
  /** Status (uses: `danger`) */
  cancelled: Ansis
  /** Special `whiteBright` (uses: `dim`) */
  typing: Ansis
  /** Special (uses: `dim`) */
  placeholder: Ansis
  /** Special (uses: `inverse`) */
  highlight: Ansis
  /** Modifiers (uses: `primary`) */
  inverse: Ansis
  /** Modifiers (uses: `primary`) */
  complement: Ansis
}

interface PromptModifierKeys {
  /** The key name */
  name?: string;
  /** The key code */
  code?: string;
  /** The key sequence */
  sequence?: string;
  /** Whether or not crtl was pressed */
  ctrl?: boolean;
  /** Whether or not shift was pressed */
  shift?: boolean;
  /** Whether or not fn was pressed */
  fn?: boolean;
}

export interface PromptTheme {
  /**
   * Marks the choice that currently has focus. The `❯` symbol is often used for this,
   * but the pointer is not always visible, as with the autocomplete prompt.
   */
  pointer(this: PromptContext, choice: Choice, index: number): string;
  /**
   * Applied to the starting point of prompt types
   *
   * @example
   * // Take the following:
   * 'What is the question?'
   *
   * // The value defined here applies a prefix
   * // in the case for Syncify, this is tree trim
   * '| What is the question?'
   */
  prefix: string;
  /**
   * Custom ansi styles to apply
   */
  styles: Partial<PromptStyles>
  /**
   * Symbol characters
   */
  symbols: Partial<PromptSymbols>
}

export interface PromptContext<T = any> extends EventEmitter {
  /** The name of the prompt, set from options.name, used as an identifier. */
  name: string | undefined;
  /** The type of the prompt (e.g., 'input', 'select'), set from the prompt class name or options.type. */
  type: string | undefined;
  /** The options object passed to the prompt constructor, containing configuration like message and initial value. */
  options: T;
  /** An object of symbols (e.g., prefix, pointer) used for rendering, derived from options.symbols or defaults. */
  symbols: PromptSymbols;
  /** An object of ANSI color/style functions (e.g., cyan, bold) from ansi-colors, set via options.styles. */
  styles: any;
  /** An object managing timer instances for animations or delays, initialized in the Prompt constructor. */
  timers: any;
  /** The current state object of the prompt, tracking input, status, and other runtime properties. */
  state: PromptState;
  /** The initial value for the prompt, typically a number for choice-based prompts, set from options.initial. */
  initial?: number;
  /** The readonly style object, alias for this.styles, providing ANSI formatting functions. */
  readonly style: any;
  /** The readonly height of the prompt in lines, calculated from rendered content (header, prompt, footer). */
  readonly height: number;
  /** The readonly width of the terminal in columns, sourced from process.stdout.columns. */
  readonly width: number;
  /** The readonly total size of the prompt in lines, summing rendered sections plus margins. */
  readonly size: number;
  /** The current cursor position within the input string, updated via keypress events. */
  cursor: number;
  /** The current user input string, updated as the user types. */
  input: string;
  /** The current value of the prompt, reflecting the user's selection or input, typed as T. */
  value: T;
  /** Emits an 'alert' event with the current state's error, typically writing to stderr. */
  alert(): void;
  /** The body section (e.g., choices list) as a string, or null if not applicable, overridden by prompt type. */
  body(): null | string;
  /** Cancels the prompt, setting state.cancelled to true, emitting 'cancel', and closing with an optional error. */
  cancel(err: any): void;
  /** Clears the specified number of lines from the terminal (defaulting to prompt height) using ANSI escape codes. */
  clear(lines?: number): void;
  /** Closes the prompt, restoring terminal state, stopping timers, and emitting 'close'. */
  close(): void;
  /** Hides the terminal cursor by writing ANSI escape code '\x1B[?25l' to stdout. */
  cursorHide(): void;
  /** Shows the terminal cursor by writing ANSI escape code '\x1B[?25h' to stdout. */
  cursorShow(): void;
  /** A specific element (e.g., 'choice', 'separator') for a choice at index, returning a promise with the result. */
  element(name: string, choice: string[] | undefined, index: number): Promise<string>;
  /** Formats an error from state.error, returning the error object or a styled string if defined. */
  error<E>(err: E): E | string;
  /** Returns the footer string from options.footer, or empty string if undefined, as a promise. */
  footer(): Promise<string>;
  /** Formats the current value (state.value) for display, defaulting to toString(), customizable per prompt. */
  format(value: T): string;
  /** Returns the header string from options.header, or empty string if undefined, as a promise. */
  header(): Promise<string>;
  /** Returns the hint string from options.hint or state.hint, or empty string, as a promise. */
  hint(): Promise<string>;
  /** Returns the indicator (e.g., checkbox) for a choice at index, defaulting to empty string, as a promise. */
  indicator(choice: string | undefined, i: number): Promise<string>;
  /** Initializes the prompt state and timers, called during construction, can be overridden. */
  initialize(): void;
  /** Checks if a value is non-empty (not null/undefined/empty string), returning a boolean. */
  isValue(value: any): boolean;
  /** Processes a keypress, updating state (e.g., cursor, input) based on input and modifiers, returning a promise. */
  keypress(input: string | number | null, modifiers?: PromptModifierKeys): Promise<void>;
  /** Returns the message string from options.message, styled with prefix, as a promise. */
  message(): Promise<string>;
  /** The pointer symbol (e.g., '>') for a choice at index, defaulting to empty string, as a promise or string. */
  pointer(choice: string[] | undefined, i: number): Promise<string> | string;
  /** Returns the prefix symbol (e.g., '?') from symbols.prefix, styled, as a promise. */
  prefix(): Promise<string>;
  /** Renders the full prompt (header, message, body, footer) to stdout, updating the display. */
  render(): void;
  /** Resolves a value, executing it as a function with this context if callable, passing additional args. */
  resolve(value: ((this: PromptContext, ...args: any[]) => any) | any, ...args: any[]): any;
  /** Restores the terminal by showing the cursor and writing a newline. */
  restore(): void;
  /** Formats the final result (state.value) for return, defaulting to format(), customizable per prompt. */
  result(value: T): string;
  /** Runs the prompt, starting it, rendering, and resolving with the final value when submitted. */
  run(): Promise<T>;
  /** Returns an object splitting the prompt into sections (header, prompt, after, rest, last) for rendering. */
  sections(): { header: string; prompt: string; after: string; rest: string[]; last: string; };
  /** Returns the separator string (e.g., '---') from options.separator, as a promise. */
  separator(): Promise<string>;
  /** Determines if the prompt should be skipped based on options.skip, returning a boolean. */
  skip(): boolean;
  /** Starts the prompt by initializing, hiding the cursor, and rendering the initial state. */
  start(): void;
  /** Submits the prompt, setting state.submitted to true, emitting 'submit', and closing with the value. */
  submit(value?: any): Promise<void>;
  /** Validates the current value using options.validate, returning a boolean (true if valid). */
  validate(value: T): boolean;
  /** Writes a string to stdout, used for rendering prompt content or updates. */
  write(string: string): void;
}

export interface PromptState {
  /** The type of the prompt. */
  type: string;
  /** The name of the prompt. */
  name: string;
  /** The message displayed to the user. */
  message: string;
  /** The header text. */
  header: string;
  /** The footer text. */
  footer: string;
  /** The error message. */
  error: string;
  /** The hint text. */
  hint: string;
  /** The user's input. */
  input: string;
  /** The cursor position. */
  cursor: number;
  /** The current index. */
  index: number;
  /** The number of lines. */
  lines: number;
  /** The tick count. */
  tick: number;
  /** The prompt string. */
  prompt: string;
  /** The input buffer. */
  buffer: string;
  /** The width of the prompt. */
  width: number;
  /** The prefix string. */
  prefix: string;
  /** An object containing symbols used in the prompt. */
  symbols: any;
  /** An object containing style functions or configurations. */
  styles: any;
  /** A set of required fields or values. */
  required: typeof Set;
  /** Whether the prompt was cancelled. */
  cancelled: boolean;
  /** Whether the prompt was submitted. */
  submitted: boolean;
  /** The loading state, either a boolean or the string 'choices'. */
  loading: boolean | 'choices';
  /** The status of the prompt. */
  readonly status: 'pending' | 'cancelled' | 'submitted';
  /** Method that clones the state, returning an object with the same properties as State. */
  clone(): Omit<PromptState, 'clone' | 'buffer'> & { buffer: Buffer };
  /** A color function or value. */
  color: Function | any;
  /** A method that returns the pointer string. */
  pointer(): string;
  /** An array of choices for the prompt. */
  _choices: Choice[];
}

export class BasePrompt extends EventEmitter {

  constructor(options?: PromptOptions);
  render(): void;
  run(): Promise<any>;

}

export interface BasePromptOptions {
  /**
   * Used as the key for the answer on the returned values (answers) object.
   */
  name: string | (() => string);
  /**
   * Enquirer uses this value to determine the type of prompt to run,
   * but it's optional when prompts are run directly.
   */
  type: string | (() => string);
  /**
   * The message to display when the prompt is rendered in the terminal.
   */
  message: string | (() => string) | (() => Promise<string>)
  /**
   * Prefix message to apply before prompt
   */
  prefix?: string
  default?: string
  /**
   * The default value to return if the user does not supply a value.
   */
  initial?: any;
  required?: boolean
  enabled?: boolean | string
  footer?: string | (() => string) | (() => Promise<string>);
  disabled?: boolean | string;
  hint?: string;
  theme?: any;
  /**
   * Overwrite the pointer function callback
   */
  pointer?: (this: PromptContext, choice: Choice, index: number) => string;
  /**
   * Function to format user input in the terminal.
   */
  format?(this: PromptContext, value: string): string | Promise<string>;
  /**
   * Function to format the final submitted value before it's returned.
   */
  result?(this: { map:(params: any) => string; focused: { value: string } }, value: string | string[]): any;
  /**
   * If `true` it will not ask that prompt.
   */
  skip?: ((state: object) => boolean | Promise<boolean>) | boolean;
  /**
   * Function to validate the submitted value before it's returned.
   * This function may return a boolean or a string. If a string is
   * returned it will be used as the validation error message.
   */
  validate?(this: PromptContext, value: string): boolean | string | Promise<boolean | string>
  onSubmit?(this: PromptContext, name: string, value: any, prompt: BasePrompt): boolean | Promise<boolean>
  onCancel?(this: PromptContext, name: string, value: any, prompt: BasePrompt): boolean | Promise<boolean>
  stdin?: NodeJS.ReadStream
  stdout?: NodeJS.WriteStream
}

/**
 * Enquirer Choice
 */
export interface Choice {
  /**
   * The unique key to identify a choice
   */
  name?: string;
  /**
   * The message to display in the terminal. `name` is used when this is undefined.
   */
  message?: string;
  /**
   * Value to associate with the choice. Useful for creating key-value pairs from
   * user choices. `name` is used when this is undefined.
   */
  value?: unknown;
  /**
   * Help message to display next to a choice.
   */
  hint?: string;
  /**
   * Determines how the choice will be displayed. Currently the only role supported is
   * `separator`. Additional roles may be added in the future (like heading, etc).
   */
  role?: LiteralUnion<'separator', string>;
  /**
   * Enabled a choice by default. This is only supported when `options.multiple` is `true` or
   * on prompts that support multiple choices, like MultiSelect.
   */
  enabled?: boolean;
  /**
   * Indentation prefix rendered before the choice
   *
   * @default ''
   */
  indent?: string;
  /**
   * Disable a choice so that it cannot be selected. This value may either be `true`, `false`,
   * or a message to display.
   */
  disabled?: boolean | string;
  /**
   * Array of "child" choices.
   */
  choice?: (string | Choice)[];
  /**
   * Custom indicator to render for a choice (like a check or radio button).
   */
  indicator?: (string | ((state: any, choice: Choice)=> string))
}

export interface Fields extends Choice {
  validate(value: string, state: any, item: {
    name: string,
    field: Fields,
    value: string,
    message: string
  }): string | boolean
}

export interface AutocompletePromptOptions extends BasePromptOptions {

}

export interface ArrayPromptOptions extends BasePromptOptions {
  type:
  | 'autocomplete'
  | 'editable'
  | 'form'
  | 'multiselect'
  | 'select'
  | 'survey'
  | 'list'
  | 'scale'
  /**
   * Array of choices that have been normalized from choices passed on the prompt options.
   */
  choices: (string | Choice)[]
  maxChoices?: number;
  /**
   * Allow multiple choices to be selected.
   */
  multiple?: boolean;
  /**
   * Preselected item in the list of choices.
   */
  initial?: number;
  /**
   * The number of choices to display on-screen.
   */
  limit?: number;
  delay?: number
  separator?: boolean
  sort?: boolean
  linebreak?: boolean
  edgeLength?: number
  align?: 'left' | 'right'
  scroll?: boolean;
  /**
   * The color to use when "highlighting" characters in the list that match user input.
   */
  highlight?(input: string): string;
  /**
   * Function that filters choices. Takes user input and a choices array,
   * and returns a list of matching choices.
   *
   * **Default**
   *
   * Greedy match, returns choices where choice.message contains the input string
   */
  suggest?(input?: string, choices?: (string | Choice)[]): (string | Choice)[];
  /**
   * Function that displays footer text
   */
  footer?: string | (() => string) | (() => Promise<string>)
}

export interface BooleanPromptOptions extends BasePromptOptions {
  type: 'confirm'
  initial?: boolean
}

export interface StringPromptOptions extends BasePromptOptions {
  type: 'input' | 'invisible' | 'list' | 'password' | 'text'
  initial?: string
  multiline?: boolean
}

export interface NumberPromptOptions extends BasePromptOptions {
  type: 'numeral'
  min?: number
  max?: number
  delay?: number
  float?: boolean
  round?: boolean
  major?: number
  minor?: number
  initial?: number
}

export interface SnippetPromptOptions extends BasePromptOptions {
  type: 'snippet'
  newline?: string
  template?: string
  required: any;
  render(): Promise<any>
}

export interface SortPromptOptions extends BasePromptOptions {
  type: 'sort'
  hint?: string
  drag?: boolean
  numbered?: boolean
}

export type PromptOptions =
  | BasePromptOptions
  | ArrayPromptOptions
  | BooleanPromptOptions
  | StringPromptOptions
  | NumberPromptOptions
  | SnippetPromptOptions
  | SortPromptOptions

export declare class Enquirer<T = object> extends EventEmitter {

  constructor(options?: object, answers?: T);

  /**
   * Register a custom prompt type.
   *
   * @param type
   * @param fn `Prompt` class, or a function that returns a `Prompt` class.
   */
  register(type: string, fn: typeof BasePrompt | (() => typeof BasePrompt)): this;

  /**
   * Prompt function that takes a "question" object or array of question objects,
   * and returns an object with responses from the user.
   *
   * @param questions Options objects for one or more prompts to run.
   */
  prompt(
    questions:
      | PromptOptions
      | ((this: Enquirer) => PromptOptions)
      | (PromptOptions | ((this: Enquirer) => PromptOptions))[]
  ): Promise<T>;

  /**
   * Use an enquirer plugin.
   *
   * @param plugin Plugin function that takes an instance of Enquirer.
   */
  use(plugin: (this: this, enquirer: this) => void): this;

}

export function prompt<T>(questions: PromptOptions | PromptOptions[]): Promise<T>;
