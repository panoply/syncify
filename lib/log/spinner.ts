import { Colors } from '~cli/ansi';
import { SPINNER_FRAMES } from '~const';
import update from 'log-update';
import * as c from '~cli/ansi';
import { nil } from '~utils/native';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

type Spinner = {
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
   * @param color
   * Spinner defaults to using pink.
   */
  (text?: string, color?: Colors): void;
  /**
   * Clears the interval and stops the spinner. Optionally
   * provide preserve text, if none passed, line is cleared.
   *
   * @param text
   * Optional text to append
   */
  stop: (text?: string) => void;
}

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * The interval instance
 */
let interval: NodeJS.Timer;

/**
 * Whether or not the spinner is running
 */
let active: boolean = false;

/**
 * TUI Spinner
 *
 * Generates a log spinner.
 */
const spinner: Spinner = function spinner (text?, color = 'pink') {

  active = true;

  let f = 0;
  const size = SPINNER_FRAMES.length;

  interval = setInterval(() => {
    if (!active) return;
    update(`${c.line.gray} ${c[color](`${SPINNER_FRAMES[f = ++f % size]}`)}${text ? ` ${text}` : nil}`);
  }, 50);

};

spinner.stop = (text?) => {

  if (!active) return;

  active = false;

  if (text) {
    update(c.line.gray + text);
    update.done();
  } else {
    update.clear();
  }

  clearInterval(interval);
  interval = undefined;

};

export { spinner };
