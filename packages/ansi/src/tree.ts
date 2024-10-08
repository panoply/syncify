import { lightGray, red, yellow } from './colors';

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
