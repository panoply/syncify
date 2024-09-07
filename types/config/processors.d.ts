import type { ESBuildConfig } from '../transform/script';
import type { SASSConfig, PostCSSConfig, TailwindConfig } from '../transform/style';
import type { SVGOConfig, SVGSpriteConfig } from '../transform/svg';
import type { SharpConfig } from '../transform/image';

/**
 * Processor Default Configurations
 *
 * Holds reference to default config options for each supported processor.
 */
export interface Processors {
  /**
   * [ESBuild](https://esbuild.github.io/) Config
   */
  esbuild?: ESBuildConfig;
  /**
   * [PostCSS](https://postcss.org/) Plugins
   */
  postcss?: PostCSSConfig[];
  /**
   * [TailwindCSS](https://tailwindcss.com/) Config
   */
  tailwind?: TailwindConfig[];
  /**
   * [SASS Dart](https://sass-lang.com/documentation/js-api/) Config
   */
  sass?: SASSConfig;
  /**
   * [Sharp](https://sharp.pixelplumbing.com) Config
   */
  sharp?: SharpConfig;
  /**
   * [SVGO](https://github.com/svg/svgo) Config
   */
  svgo?: SVGOConfig;
  /**
   * [SVG Sprite](https://github.com/svg-sprite) Config
   */
  sprite?: SVGSpriteConfig;
  /**
   * [Markdown](https://github.com/markdown-it/markdown-it) Config
   */
  markdown?: SVGSpriteConfig;
  /**
   * [Turndown](https://github.com/mixmark-io/turndown) Config
   */
  turndown?: SVGSpriteConfig;
}
