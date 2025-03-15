import { CodeFrame } from './frame';
import { shopify } from './shopify';

interface Position {
  line: number;
  column: number;
}

interface Range {
  start: Position,
  end?: Position
}

export interface Options extends Range {
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

export function codeframe (source: string, options: Options) {

  return CodeFrame(source, {
    start: options.start,
    end: options.end
  }, {
    language: 'javascript',
    type: 'error',
    highlight: true,
    linesAbove: 2,
    linesBelow: 2,
    ...options
  });

}

codeframe.shopify = shopify;
