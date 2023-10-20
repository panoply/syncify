/* eslint-disable no-use-before-define */

import type { EventEmitter } from 'events';
import { LiteralUnion } from 'type-fest';

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
  /**
   * The default value to return if the user does not supply a value.
   */
  initial?: any;
  required?: boolean
  enabled?: boolean | string
  disabled?: boolean | string;
  /**
   * Function to format user input in the terminal.
   */
  format?(value: string): string | Promise<string>;
  /**
   * Function to format the final submitted value before it's returned.
   */
  result?(value: string): string | Promise<string>
  /**
   * If `true` it will not ask that prompt.
   */
  skip?: ((state: object) => boolean | Promise<boolean>) | boolean;
  /**
   * Function to validate the submitted value before it's returned.
   * This function may return a boolean or a string. If a string is
   * returned it will be used as the validation error message.
   */
  validate?(value: string): boolean | string | Promise<boolean | string>
  onSubmit?(name: string, value: any, prompt: BasePrompt): boolean | Promise<boolean>
  onCancel?(name: string, value: any, prompt: BasePrompt): boolean | Promise<boolean>
  stdin?: NodeJS.ReadStream
  stdout?: NodeJS.WriteStream
}

export interface Choice {
  /**
   * The unique key to identify a choice
   */
  name: string;
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
  footer?(): string;
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
