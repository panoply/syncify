import type { LiquidTerse } from '../transform/liquid';
import type { JSONTerse } from '../transform/json';
import type { StyleTerse } from '../transform/style';

export interface TerserConfig {
  /**
   * Terse JSON Minification
   */
  json?: JSONTerse;
  /**
   * Terse View (Liquid) Minification
   */
  liquid?: LiquidTerse;
  /**
   * **NOTE YET AVAILABLE**
   *
   * Terse Style (CSS) Minification
   *
   * > Uses [clean-css](https://github.com/clean-css/clean-css) minification
   * > Uses [purge-css](https://github.com/FullHuman/purgecss)
   */
  style?: StyleTerse;
}
