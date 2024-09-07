import ansis, { Ansis } from 'ansis';
import { Tree } from 'syncify:symbol';
import { Colors, lightGray, whiteBright } from 'syncify:colors';
import { assign } from 'syncify:native';

export interface Progress {
  /**
   * Increment progress
   *
   * @param incrementBy Defaults to `1`
   */
  increment: (incrementBy?: number) => void;
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
interface ProgressOptions {
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

  const options: ProgressOptions = assign({
    showPercentage: true,
    barColor: 'neonGreen',
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

  const align = (output: string) => Tree.line + output + WSP.repeat(Math.max(0, options.barSize - output.length));
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
    /**
     * Returns the percent filled amount
     */
    get percent () { return percent; }
  };

}
