import type { Tester } from 'anymatch';
import type { Merge } from 'type-fest';

export interface JSONConfig {
  /**
   * The indentation level
   *
   * @default 2
   */
  indent?: number;
  /**
   * Whether to use `\t` identation characters.
   *
   * @default false
   */
  useTab?: boolean;
  /**
   * If line termination should be Windows (CRLF) format.
   * Unix (LF) format is the default.
   *
   * @default false
   */
  crlf?: boolean;
  /**
   * An optional string list of paths/filenames to exclude
   * from processing, ie: pass through
   *
   * @default false
   */
  exclude?: string[]
}

/* -------------------------------------------- */
/* INTERAL USE                                  */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Bundling Configuration
 */
export type JSONBundle = Merge<JSONConfig, { exclude: Tester }>;
