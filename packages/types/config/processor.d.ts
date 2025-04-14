import type { ESBuildConfig } from './script';
import type { PostCSSConfig, SASSConfig, TailwindConfig } from './style';
import type { SVGOConfig } from './svg';
import type { Options as MarkdownConfig } from 'markdown-it';

/**
 * Processor Default Configurations
 *
 * Holds reference to default config options for each supported processor.
 */
export type Processors = {
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
   * [SVGO](https://github.com/svg/svgo) Config
   */
  svgo?: SVGOConfig;
  /**
   * [Markdown](https://github.com/markdown-it/markdown-it) Config
   */
  markdown?: MarkdownConfig;
}
