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

export interface RequestError {
  /**
   * An error code number - Typically used in request errors
   *
   * @default false
   */
  code?: number;
  /**
   * The error message to be printed
   */
  message: string;
  /**
   *
   */
  detail?: string;
  /**
   *
   */
  info?: string[];
  /**
   * The stack trace
   */
  stack?: string;
  /**
   * Additional notes or suggestions
   */
  notes?: string;
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
