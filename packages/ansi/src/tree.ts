import { lightGray, red, yellow } from './colors';

/**
 * Tree Characters
 */
export const Tree = {
  /**
   * Tree Line Top
   *
   * ```js
   * '┌─ ' // appended with 1 spaces
   * ```
   */
  open: `${lightGray.open}┌─${lightGray.close} `,
  /**
   * Tree Line Stub
   *
   * ```js
   * '├  ' // appended with 2 spaces
   * ```
   */
  stub: `${lightGray.open}├${lightGray.close}  `,
  /**
   * Tree Line Dash
   *
   * ```js
   * '├─ ' // appended with 1 space
   * ```
   */
  dash: `${lightGray.open}├─${lightGray.close} `,
  /**
   * Tree Line (without suffixed whitespace)
   *
   * ```js
   * '│' // appended with no space
   * ```
   */
  trim: `${lightGray.open}│${lightGray.close}`,
  /**
   * Tree Line
   *
   * ```js
   * '│  ' // appended with 2 spaces
   * ```
   */
  line: `${lightGray.open}│${lightGray.close}  `,
  /**
   * Tree Line Next - (`\n` will prepend)
   *
   * ```js
   * '\n│' // appended with no space
   * ```
   */
  next: `\n${lightGray.open}│${lightGray.close}`,
  /**
   * Tree Line Next - (`\n` will prepend)
   *
   * ```js
   * '│\n'
   * '│  ' // appended with 2 spaces
   * ```
   */
  newline: `\n${lightGray.open}│${lightGray.close}\n${lightGray.open}│${lightGray.close}  `,
  /**
   * Tree Line After - (`\n` will append)
   *
   * ```js
   * '│\n' // appended with no space
   * ```
   */
  after: `${lightGray.open}│${lightGray.close}\n`,
  /**
   * Tree Line Wrap
   *
   * Newlines and line (i.e: `\n` will prepend and append)
   *
   * ```js
   * '\n│\n' // appended with no space
   * ```
   */
  wrap: `\n${lightGray.open}│${lightGray.close}\n`,
  /**
   * Tree Line Base
   *
   * ```js
   * '└─' // appended with 1 space
   * ```
   */
  base: `${lightGray.open}└─${lightGray.close} `,
  /**
   * Tree Line Red (Red Dim)
   *
   * ```js
   * '│  ' // appended with 2 spaces
   * ```
   */
  red: `${red.dim.open}│${red.dim.close}  `,
  /**
   * Tree Line Red (Red Dim)
   *
   * ```js
   * '│' // appended with no space
   * ```
   */
  redTrim: `${red.dim.open}│${red.dim.close}`,
  /**
   * Tree Yello Line Dash
   *
   * ```js
   * '├─ ' // appended with 1 space
   * ```
   */
  redDash: `${red.dim.open}├─${red.dim.close} `,
  /**
   * Tree Red Line stub
   *
   * ```js
   * '├ ' // appended with 1 space
   * ```
   */
  redStub: `${red.dim.open}├${red.dim.close} `,
  /**
   * Tree Line Warning (Yellow Dim)
   *
   * ```js
   * '│  ' // appended with 2 spaces
   * ```
   */
  yellow: `${yellow.dim.open}│${yellow.dim.close}  `,
  /**
   * Tree Line Warning (Yellow Dim)
   *
   * ```js
   * '│' // appended with no space
   * ```
   */
  yellowTrim: `${yellow.dim.open}│${yellow.dim.close}`,
  /**
   * Tree Yello Line Dash
   *
   * ```js
   * '├─ ' // appended with 1 space
   * ```
   */
  yellowDash: `${yellow.dim.open}├─${yellow.dim.close} `,
  /**
   * Tree Red Line stub
   *
   * ```js
   * '├ ' // appended with 1 space
   * ```
   */
  yellowStub: `${yellow.dim.open}├${yellow.dim.close} `,
  /**
   * Tree Line Indentation
   *
   * Symbols used for next level lines
   */
  indent: {
    /**
     * Tree Indent Line Top
     *
     * ```js
     * '├──┬─ ' // appended with 1 space
     * ```
     */
    edge: `${lightGray.open}├──┬─${lightGray.close} `,
    /**
     * Tree Indent Line Fall
     *
     * ```js
     * '├──┐ ' // appended with 1 space
     * ```
     */
    fall: `${lightGray.open}├──┐${lightGray.close} `,
    /**
     * Tree Indent Line
     *
     * ```js
     * '│  │ ' // appended with 1 space
     * ```
     */
    line: `${lightGray.open}│  │${lightGray.close} `,
    /**
     * Tree Indent Line Stub
     *
     * ```js
     * '│  ├ ' // appended with 1 space
     * ```
     */
    stub: `${lightGray.open}│  ├${lightGray.close} `,
    /**
     * Tree Indent Line Dash
     *
     * ```js
     * '│  ├─' // appended with 1 space
     * ```
     */
    dash: `${lightGray.open}│  ├─${lightGray.close} `,
    /**
     * Tree Indent Line Base
     *
     * ```js
     * '│  └─' // appended with 1 space
     * ```
     */
    base: `${lightGray.open}│  └─${lightGray.close} `
  }
};
