/* eslint-disable no-unused-vars */

import type { Merge } from 'type-fest';
import type { Ansis } from '@syncify/ansi';
import update from 'log-update';
import { assign, defineProperty } from 'syncify:native';
import { glueString, has, isFunction, isObject, isString, object } from 'syncify:utils';
import { bold, neonGreen, pink } from '@syncify/ansi';
import { Prefix, Break } from 'syncify:cli/tree';

type SpinnerStyles = 'brielle' | 'arrows' | 'spinning'

interface SpinnerOptions {
  /**
   * Whether or not a line prefix is applied
   *
   * @default true
   * @example  │ ⠋
   */
  line?: boolean;
  /**
   * An actionable spinner renders differently and will impose
   * an arrows spinner style.
   *
   * **Examples**
   *
   * ```bash
   * # when input param is passed
   * │ input → before ▹▹▹▹▹ after
   *
   * # when input param is omitted
   * │ before ▹▹▹▹▹ after
   *
   * ```
   *
   * @default null
   */
  action?: {
    /**
     * The arrows loading color, if `color` is passed it will inherit,
     * otherwise if set to defaults, it uses `neonGreen`
     *
     * @default 'neonGreen'
     */
    color?: Ansis;
    /**
     * The before label
     *
     * ```bash
     * before ▹▹▹▹▹
     * ```
     */
    before: string;
    /**
     * The after label
     *
     * ```bash
     * ▹▹▹▹▹ after
     * ```
     */
    after: string;
  };
  /**
   * The spinner color - If `action` is provided, this will have no effect.
   *
   * @default 'pink'
   */
  color?: Ansis;
  /**
   * The spinner color  - If `action` is provided, this will be set to `arrows`
   *
   * ```bash
   * ◓ # spinning
   * ⠋ # brielle
   * ▹ # arrows (only used for actionable spinner)
   * ```
   *
   * @default 'brielle'
   */
  style?: SpinnerStyles;

}

export interface CLISpinner {
  /**
   * Render Spinner
   *
   * Loads the spinner. Optionally pass in text to append.
   *
   * **Passing no parametes**
   *
   * ```
   * │ ⠋
   * ```
   *
   * **Passing text parameter**
   *
   * ```
   * │ ⠋ input
   * ```
   *
   * **Passing spinning style**
   *
   * ```
   * │ ◓ input
   * ```
   *
   * **Passing action options with input**
   *
   * ```
   * │ input → before ▹▹▹▹▹ after
   * ```
   *
   * **Passing action options without input**
   *
   * ```
   * │ before ▹▹▹▹▹ after
   * ```
   *
   * ---
   *
   * @param text
   * The text to append on the right side of the spinner
   *
   * @param options
   * Spinner options
   *
   */
  (input?: SpinnerOptions | string, options?: SpinnerOptions): void;
  /**
   * Updates the text of the loader
   *
   * @param message
   * The new message to apply
   */
  update: (message: string) => void;
  /**
   * Clears the interval and stops the spinner. Optionally
   * provide preserve text, if none passed, line is cleared.
   *
   * @param message
   * Optional text to append
   */
  stop: (message?: string) => void;
  /**
   * Whether or not the spinner is running
   */
  readonly active?: boolean;
}

export function Spinner () {

  /**
   * The interval instance
   */
  let interval: NodeJS.Timeout;

  /**
   * Whether or not the spinner is running
   */
  let active: boolean = false;

  /**
   * The log message
   */
  let message: string = NIL;

  /**
   * Whether or not a tree line should apply
   */
  let tline: boolean = true;

  /**
   * Log Snipper frames
   */
  const loaders = object<{
    [K in SpinnerStyles]: {
      interval: number;
      frames: string[]
    }
  }>({
    arrows: object({
      interval: 120,
      frames: [
        '▹▹▹▹',
        '▸▹▹▹',
        '▹▸▹▹',
        '▹▹▸▹',
        '▹▹▹▸'
      ]
    }),
    brielle: object({
      interval: 50,
      frames: [
        '⠋',
        '⠙',
        '⠹',
        '⠸',
        '⠼',
        '⠴',
        '⠦',
        '⠧',
        '⠇',
        '⠏'
      ]
    }),
    spinning: object({
      interval: 60,
      frames: [
        '◐',
        '◓',
        '◑',
        '◒'
      ]
    })
  });

  const defaults = object<Merge<SpinnerOptions, { label: string }>>({
    label: NIL,
    line: true,
    color: null,
    style: 'brielle',
    action: null
  });

  /**
   * TUI Spinner
   *
   * Generates a log spinner.
   */
  const spinner: CLISpinner = function spinner (input, settings) {

    let options: Merge<SpinnerOptions, { label: string }> = object(defaults);

    if (isObject(input)) {

      options = assign(options, input);

    } else if (isString(input)) {

      options.label = input;

      if (isObject(settings)) {

        options = assign(options, settings);

      }
    }

    active = true;
    tline = options.line;

    let color: Ansis;
    let frame: number = 0;
    let frames: string[];
    let size: number = 0;

    if (options.action !== null) {
      options.style = 'arrows';
      color = has('color', options.action) ? options.action.color : neonGreen;
      frames = loaders.arrows.frames;
      size = frames.length;

    } else {

      color = isFunction(options.color) ? options.color : pink;
      message = options.label;
      frames = loaders[options.style].frames;
      size = frames.length;

    }

    update.done();

    interval = setInterval(() => {

      if (!active) return;

      let label: string;

      if (options.action !== null) {

        const string = glueString(
          bold(options.action.before),
          frames[frame = ++frame % size],
          options.action.after
        );

        label = color(message !== NIL ? Prefix(message, string) : string);

      } else {

        label = color(glueString(frames[frame = ++frame % size], message));
      }

      update(options.line ? Break(label) : label);

    }, loaders[options.style].interval);

  };

  spinner.update = function (input: string) {

    message = input;

  };

  spinner.stop = function (input?: string) {

    if (active === false) return;

    active = false;

    if (input) {
      update(tline ? Break(input) : input);
      update.done();
    } else {
      update.clear();
    }

    clearInterval(interval);

    interval = undefined;
    message = NIL;

  };

  defineProperty(spinner, 'active', {
    get () {
      return active;
    }
  });

  return spinner;
}
