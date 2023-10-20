import type { BuildOptions } from 'esbuild';
import type { JSONConfig } from '../transform/json';
import type { SharpConfig } from '../transform/image';
import type { SASSConfig, PostCSSConfig } from '../transform/style';
import type { SVGOConfig, SVGSpriteConfig } from '../transform/svg';

/**
 * **INTERNAL USE**
 *
 * Processor Default Configurations
 *
 * Holds reference to default config options for
 * each supported processor.
 */
export interface ProcessorsBundle {
  /**
   * JSON File processing - Options defined here are used when
   * writing to the file system. Typically in operations like
   * `--merge`, `--pull` and `--download`.
   *
   * > The options will also be used in **development** (`dev`)
   * mode when uploading `.json` files to stores/themes.
   */
  json?: JSONConfig;
  /**
   * [ESBuild](https://esbuild.github.io/) Config
   *
   * Syncify uses ESBuild under the hood for JS/TS transpilation.
   * Some native ESBuild options are omitted from processing and
   * handled internally by Syncify.
   */
  esbuild?: BuildOptions;
  /**
   * [PostCSS](https://postcss.org/) Plugins
   */
  postcss?: PostCSSConfig[]
  /**
   * [SASS Dart](https://sass-lang.com/documentation/js-api/) Config
   */
  sass?: SASSConfig
  /**
   * [Sharp](https://sharp.pixelplumbing.com) Config
   */
  sharp?: SharpConfig;
  /**
   * [SVGO](https://github.com/svg/svgo) Config
   *
   */
  svgo?: SVGOConfig;
  /**
   * [SVG Sprite](https://github.com/svg-sprite) Config
   */
  sprite?: SVGSpriteConfig
}
