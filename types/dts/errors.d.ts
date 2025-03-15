import type { LiteralString } from './utilities';

export type ErrorTypes = LiteralString<
  | 'request'
  | 'syntax'
  | 'transform'
  | 'esbuild'
  | 'sass'
  | 'postcss'
  | 'minify'
  | 'json'
  | 'liquid'
  | 'shopify'
  | 'svgo'
  | 'sprite'
  | 'resolve'
>

export interface GraphqlError {
  /**
   * Contains details about the error(s).
   */
  message: string;
  /**
   * Path in the graph query
   */
  path?: string[];
  /**
   * Line / Column Reference of the graph
   */
  location?: Array<{
    /**
     * Line Number
     */
    line: number;
    /**
     * Column Number
     */
    column: number
  }>
  /**
   * Provides more information about the error(s) including properties and metadata.
   */
  extensions: {
    /**
     * Shows error codes common to Shopify. Additional error codes may also be shown.
     */
    code: LiteralString<
      | 'THROTTLED'
      | 'ACCESS_DENIED'
      | 'SHOP_INACTIVE'
      | 'INTERNAL_SERVER_ERROR'
    >
  }
}

export interface RequestErrorData {
  /**
   * The error message to be printed
   */
  message?: string;
  /**
   * The error message to be printed with ansi stripped
   */
  rawMessage?: string;
  /**
   * Error contexts
   */
  context?: {
    /**
     * The error stack trace or `false` if no stack determined. When
     * `true` the thrown error context will be stored in local state.
     * The user will need to `stdin` to retrieve the stack.
     */
    stack: string | boolean;
    /**
     * An additional key > value object list to be merged and rendered
     * The output generated to terminal will look like this:
     *
     * ```
     * │ (!) ERROR
     * │
     * │ This is the error message
     * │
     * │ Code:      422
     * │ File:     ~source/dir/filename.liquid
     * │ Status:    Unprocessed Entity
     * │
     * │ Type s and press enter to view stack trace
     * ```
     */
    entries: { [name: string]: string | number; };
  }
}

export interface RequestErrorOptions {
  /**
   * Whether or not to console log the error
   *
   * @default true
   */
  write?: boolean;
  /**
   * Whether or not trigger notification
   *
   * @default true
   */
  notify?: boolean;
  /**
   * Whether or not to store the error, when `true` the
   * error object will be returned instead of the interpolated
   * error string.
   *
   * @default false
   */
  store?: boolean;
}

export interface Error {
  /**
   * The error type - This can one of many issues
   */
  type: ErrorTypes
  /**
   * An error code number - Typically used in request errors
   *
   * @default false
   */
  code?: number;
  /**
   * The error message to be printed
   */
  message: string | string[];
  /**
   *
   */
  data?: { details: string[]; line?: number }[]
  /**
   * Error details, typically used in request failures
   */
  details?: string | string[];
  /**
   * Whether or not to throw
   *
   * @default false
   */
  throw?: boolean;
  /**
   * The stack trace
   */
  stack?: string;
  /**
   * Additional notes or suggestions
   */
  notes?: string | string[];
  /**
   * The line number and column (if any)
   */
  location?: {
    /**
     * Line number
     */
    line: number;
    /**
     * Column number (ie: character)
     */
    column?: number;
    /**
     * Code sample indicating where the error occurs
     */
    sample?: string
  }
}
