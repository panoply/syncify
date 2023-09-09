import { line, type Colors } from 'syncify:cli/ansi';
import update from 'log-update';
import ansis from 'ansis';
import { defineProperty } from 'syncify:native';

export interface Spinner {
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
   * │ ⠋ Lorem Ipsum
   * ```
   *
   * ---
   *
   * @param text
   * The text to append on the right side of the spinner
   *
   * @param line
   * Whether or not to apply line prefix
   *
   * @param color
   * Spinner defaults to using pink.
   */
  (text?: string, line?: boolean, color?: Colors): void;
  /**
   * Clears the interval and stops the spinner. Optionally
   * provide preserve text, if none passed, line is cleared.
   *
   * @param text
   * Optional text to append
   */
  stop: (text?: string) => void;
  /**
   * Whether or not the spinner is running
   */
  readonly active?: boolean;
}

export function getSpinner () {

  /**
   * The interval instance
   */
  let interval: NodeJS.Timeout;

  /**
   * Whether or not the spinner is running
   */
  let active: boolean = false;

  /**
   * Log Snipper frames
   */
  const frames = [
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
  ];

  /**
   * Spinner Frames
   */
  const size = frames.length;

  /**
   * TUI Spinner
   *
   * Generates a log spinner.
   */
  const spinner: Spinner = function spinner (text?, ln = true, color = 'pink') {

    active = true;

    let f: number = 0;

    interval = setInterval(() => {
      if (!active) return;
      update(`${ln ? line.gray : NIL}${ansis[color](`${frames[f = ++f % size]}`)}${text ? ` ${text}` : NIL}`);
    }, 50);

  };

  defineProperty(spinner, 'active', { get () { return active; } });

  spinner.stop = function (text?: string) {

    if (!active) return;

    active = false;

    if (text) {
      update(line.gray + text);
      update.done();
    } else {
      update.clear();
    }

    clearInterval(interval);
    interval = undefined;
  };

  return spinner;

}
