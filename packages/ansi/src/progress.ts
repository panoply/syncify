import ansis, { Ansis } from 'ansis';

import { Colors, lightGray, whiteBright } from './colors';
import { Tree } from './tree';

export interface Progress {
  /**
   * Increment progress
   *
   * @param incrementBy Defaults to `1`
   */
  increment: (incrementBy?: number) => void;
  /**
   * Reset the `total` and percentage to `0`
   *
   * @param newTotal Defaults to `undefined`
   */
  reset: (newTotal?: number) => void;
  /**
   * Decrement progress
   *
   * @param decrementBy Defaults to `1`
   */
  decrement: (decrementBy?: number) => void;
  /**
   * Render the progress bar - Returns the string for console.
   *
   * Optionally provide a percentage color
   *
   * @returns string
   */
  render: (percentColor?: Ansis) => string;
  /**
   * Stops progress and clears console
   */
  stop: () => void;
  /**
   * Returns the current percentage completion
   */
  get percent(): number;
}

/**
 * Progress Rendering Options
 */
export interface ProgressOptions {
  /**
   * Whether or not percentage should be appended.
   *
   * ---
   *
   * ```bash
   *
   * # true (default)
   * ▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱ 50%
   *
   * # false
   * ▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱
   *
   * ```
   *
   * @default true
   */
  showPercentage?: boolean;
  /**
   * Accepts a {@link Tree} line prefix on text to prepend. Can be `null`
   *
   * @default
   * '│  ' // appended with 2 spaces
   */
  prepend?: string;
  /**
   * The color of the percentage number. If `showPercentage`
   * is disabled (`false`) then this option will be ignored.
   *
   * @default 'whiteBright'
   */
  percentColor?: Colors;
  /**
   * The progress bar color. By default, empty progress characters
   * will apply `lightGray`.
   *
   * @default 'neonGreen'
   */
  barColor?: Colors;
  /**
   * The progress bar width. By default, progress bars will be
   * set to 40 columns.
   *
   * @default 40
   */
  barSize?: number;
  /**
   * Whether or not console should be cleared upon progress completion
   *
   * @default false
   */
  clearOnComplete?: boolean
}

/**
 * CLI Progress
 *
 * Renders a progress bar to the terminal and returns incremental/decrement
 * methods for controlling the progress amount.
 *
 * @param total The progress to amount
 * @param opts The progress options
 *
 *
 * ```bash
 *
 * # EXAMPLE
 *
 * ▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱ 50%
 *
 * ```
 */
export function progress (total: number, opts: ProgressOptions = {}): Progress {

  const options: ProgressOptions = Object.assign({
    showPercentage: true,
    barColor: 'neonGreen',
    prepend: Tree.line,
    percentColor: 'whiteBright',
    barSize: 40,
    clearOnComplete: false
  }, opts);

  /**
   * The current progress
   */
  let percent: number = 0;

  /* -------------------------------------------- */
  /* PRIVATES                                     */
  /* -------------------------------------------- */

  const align = (output: string) => {
    if (typeof options.prepend === 'string') {
      return options.prepend + output + ' '.repeat(Math.max(0, options.barSize - output.length));
    } else {
      return output + ' '.repeat(Math.max(0, options.barSize - output.length));
    }
  };

  const bar = (length: number, empty: boolean = false) => (empty ? '▱' : '▰').repeat(length);

  /* -------------------------------------------- */
  /* PUBLIC                                       */
  /* -------------------------------------------- */

  /**
   * Stop progress
   */
  const stop = (): void => {

    if (options.clearOnComplete) console.clear();

  };

  /**
   * Reset progress to `0` - Optionally pass a `newTotal` to reset
   * the progress total.
   */
  const reset = (newTotal?: number): void => {

    if (typeof newTotal === 'number') total = newTotal;
    if (percent !== 0) percent = 0;

  };

  /**
   * Increment the progress
   */
  const increment = (incrementBy: number = 1) => {

    const filled = percent + incrementBy;

    percent = Math.min(filled, total);

    if (percent === total) stop();

  };

  /**
   * Decrement the progress
   */
  const decrement = (decrementBy: number = 1) => {

    const filled = percent - decrementBy;

    percent = Math.max(filled, 0);

  };

  /**
   * Render the progress bar - Returns a string.
   */
  const render = (percentColor?: Ansis): string => {

    const progress = Math.round((percent / total) * options.barSize);
    const filled = bar(progress);
    const empty = bar(options.barSize - progress, true);

    let output = ansis[options.barColor](filled) + lightGray(empty);

    if (options.showPercentage) {
      output += (percentColor || whiteBright)(` ${String(Math.round((percent / total) * 100))}%`);
    }

    return align(output);

  };

  return {
    stop,
    increment,
    decrement,
    render,
    reset,
    /**
     * Returns the percent filled amount
     */
    get percent () { return percent; }
  };

}
