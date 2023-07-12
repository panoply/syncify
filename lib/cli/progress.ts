import { c, Colors } from '~log';
import { assign } from '~utils/native';

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
 * ```bash
 *
 * # EXAMPLE
 *
 * ▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱ 50%
 *
 * ```
 */
export function progress (total: number, opts: ProgressOptions = {}) {

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
  let current: number = 0;

  /* -------------------------------------------- */
  /* PRIVATES                                     */
  /* -------------------------------------------- */

  function align (output: string) {

    return c.line.gray + output + ' '.repeat(Math.max(0, options.barSize - output.length));

  }

  function bar (length: number, empty: boolean = false) {

    return (empty ? '▱' : '▰').repeat(length);
  }

  /* -------------------------------------------- */
  /* PUBLIC                                       */
  /* -------------------------------------------- */

  /**
   * Stop progress
   */
  function stop (): void {

    if (options.clearOnComplete) console.clear();

  }

  /**
   * Increment the progress
   */
  function increment (incrementBy: number = 1) {

    const filled = current + incrementBy;

    current = Math.min(filled, total);

    if (current === total) stop();

  }

  /**
   * Decrement the progress
   */
  function decrement (decrementBy: number = 1) {

    const filled = current - decrementBy;

    current = Math.max(filled, 0);

  }

  /**
   * Render the progress bar - Returns a string.
   */
  function render (): string {

    const progress = Math.round((current / total) * options.barSize);
    const filled = bar(progress);
    const empty = bar(options.barSize - progress, true);

    let output = c[options.barColor](filled) + c.lightGray(empty);

    if (options.showPercentage) {
      output += ` ${String(Math.round((current / total) * 100))}%`;
    }

    return align(output);

  }

  return {
    stop,
    increment,
    decrement,
    render,
    /**
     * Returns the current filled amount
     */
    get percent () { return current; }
  };

}