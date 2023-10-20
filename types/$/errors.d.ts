export type ErrorTypes = (
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
  | 'sharp'
  | 'svgo'
  | 'sprite'
  | 'resolve'
)

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

export interface RequestError {
  /**
   * Whether or not to console log the error
   *
   * @default true
   */
  log: boolean;
  /**
   * Whether or not to store the error, when `true` the
   * error object will be returned instead of the interpolated
   * error string.
   *
   * @default false
   */
  store: boolean;
  /**
   * The error data object - will be returned if `store` is `true`
   */
  data?: RequestErrorData
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
