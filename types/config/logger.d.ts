/* -------------------------------------------- */
/* LOGGER                                       */
/* -------------------------------------------- */

export interface Logger {
  /**
   * Whether or not file stats should print
   *
   * > Helpful when building for production (`--prod`)
   *
   * @default true
   */
  stats?: boolean;
  /**
   * Whether or not to print warnings
   *
   * @default true
   */
  warnings?: boolean;
  /**
   * Suppress CLI logs
   *
   * @default false
   */
  silent?: boolean;
  /**
   * Whether or not to clear the screen between changes.
   *
   * @default true
   */
  clear?: boolean;
}
