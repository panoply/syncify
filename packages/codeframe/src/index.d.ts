interface Position {
  line: number;
  column: number;
}

interface Range {
  start: Position,
  end?: Position
}

export interface ShopifyCodeframeResult {
  /**
   * Line Number detected within response
   *
   * @default NaN
   */
  line: number;
  /**
   * Column number
   *
   * @default NaN
   */
  column: number;
  /**
   * This is summary of the error, typically it will be something like:
   *
   * ```js
   * 'Liquid syntax error on line 21'
   * ```
   */
  summary: string;
 /**
   * This will be any additional information that is proceeded by a
   * `/\(line \d+\):/` capture. Anything **after** `:` will be included
   * in this value. Typically something like:
   *
   * ```js
   * "Variable '{{ 'base.min.css' }' was not properly terminated with regexp: /\}\}/"
   * ```
   */
  details: string;
  /**
   * This is the error message with applied ansi. Itis a combination of `summary` and `details`.
   * The `summary` will appear first, followed 2 newlines, then `details`, e.g:
   *
   * ```
   * │  Liquid syntax error on line 21
   * │
   * │  Variable '{{ 'base.min.css' }' was not properly terminated with regexp: /\}\}/
   * ```
   */
  message: string;
  /**
   * This is the codeframe that has been generated based on the error message.
   * and the file input which was provided.
   *
   * ```
   * │    10 │ <div class="fooo">
   * │    11 │   <ul>
   * │  ➤ 12 │     {% unknown 'tag' %}
   * │     ✕ │        ^^^^^^^
   * ```
   */
  frame: string;
  /**
   * Whether or not codeframe was created.
   */
  hasFrame: boolean
}

export type Languages = 'markup' | 'liquid' | 'javascript' | 'yaml' | 'toml' | 'json'

export interface FrameOptions {
  /**
   * The codeframe type which will determine the tree-line prefix colour
   *
   * @default 'error'
   */
  type?: 'error' | 'warning' | 'info'
  /**
   * The language of the codeframe
   *
   * @default 'javascript'
   */
  language?: Languages
  /**
   * Whether or not to highlight the language
   *
   * @default true
   */
  highlight?: boolean;
  /**
   * The number of lines to show above the error.
   *
   * @default 2
   */
  linesAbove?: number;
  /**
   * The number of lines to show below the error.
   *
   * @default 2
   */
  linesBelow?: number;
}

export interface Options extends Range {
  /**
   * The codeframe type which will determine the tree-line prefix colour
   *
   * @default 'error'
   */
  type?: 'error' | 'warning' | 'info'
  /**
   * The language of the codeframe
   *
   * @default 'javascript'
   */
  language?: 'markup' | 'liquid' | 'javascript' | 'yaml' | 'toml' | 'json'
  /**
   * Whether or not to highlight the language
   *
   * @default true
   */
  highlight?: boolean;
  /**
   * The number of lines to show above the error.
   *
   * @default 2
   */
  linesAbove?: number;
  /**
   * The number of lines to show below the error.
   *
   * @default 2
   */
  linesBelow?: number;
}

declare class ShopifyCF {

  /**
   * Shopify Codeframe
   */
  static shopify(source: string, error: string, options?: FrameOptions): ShopifyCodeframeResult

}

interface Codeframe {

  (source: string, options?: Options): string
}

export const codeframe: Codeframe & typeof ShopifyCF;
