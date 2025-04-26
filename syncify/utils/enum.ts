/* eslint-disable no-unused-vars */

export const enum LogModes {
  /**
   * Running in `watch` mode
   */
  Watch = 1,
  /**
   * Performing a `bulk` operation in `watch` mode.
   */
  Bulk,
  /**
   * Showing Bulk Errors interactive stdin
   */
  BulkErrors,
  /**
   * An error was encountered and is shown
   */
  Error,
  /**
   * Running in `build` mode
   */
  Build,
  /**
   * Prompt action in `watch` mode.
   */
  Prompt,
  /**
   * Running in `push` mode
   */
  Push,
  /**
   * Running in `pull` mode
   */
  Pull,
  /**
   * Running in `pack` mode
   */
  Pack
}
