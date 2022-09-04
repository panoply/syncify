import type { JSONConfig } from './json';
import type { SharpConfig, SharpProcesser } from './image';
import type { ESBuildConfig, ESBuildProcesser } from './script';
import type { SASSConfig, PostCSSConfig, SASSProcesser, PostCSSProcesser } from './style';
import type { SVGOConfig, SVGSpriteConfig, SVGOProcesser, SVGSpriteProcesser } from './svg';

/**
 * Processor Default Configurations
 *
 * Holds reference to default config options for
 * each supported processor.
 */
export interface Processors {
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
  esbuild?: ESBuildConfig
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

/**
 * **INTERNAL USE**
 *
 * Processor configuration state. This model infers which
 * pre-processors are being used and/or available.
 */
export interface ProcessorConfig {
  /**
   * [PostCSS](https://postcss.org/) Pre-Processor
   */
  postcss: PostCSSProcesser;
  /**
   *  [SASS Dart](https://sass-lang.com/documentation/js-api/) Pre-Processor
   */
  sass: SASSProcesser;
  /**
   * [Sharp](https://sharp.pixelplumbing.com) Pre-Processor
   */
  sharp: SharpProcesser;
  /**
   * [SVG Sprite](https://github.com/svg-sprite) Pre-Processor
   */
  sprite: SVGSpriteProcesser;
  /**
   * [SVGO](https://github.com/svg/svgo) Pre-Processor
   */
  svgo: SVGOProcesser
  /**
   * [ESBuild](https://esbuild.github.io/) Pre-Processor
   */
  esbuild: ESBuildProcesser
}
