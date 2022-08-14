import type { Plugin as PostCSSPlugin, Transformer, TransformCallback } from 'postcss';
import type { OptimizeOptions } from 'svgo';
import type { Config as SVGSpriteConfig } from 'svg-sprite';
import type { SharpOptions } from 'sharp';
import type { Options as TSUPOptions } from 'tsup';

export interface ScriptProcessor {
  /**
   * [TSUP](https://tsup.egoist.sh) Options
   */
  tsup?: Pick<TSUPOptions,
    | 'banner'
    | 'define'
    | 'dts'
    | 'esbuildOptions'
    | 'esbuildPlugins'
    | 'tsconfig'
    | 'treeshake'
    | 'splitting'
    | 'sourcemap'
    | 'pure'
    | 'plugins'
    | 'platform'
    | 'noExternal'
    | 'external'
    | 'metafile'
    | 'legacyOutput'
    | 'footer'
    | 'loader'
    | 'format'
    | 'globalName'
    | 'inject'
    | 'injectStyle'
    | 'jsxFactory'
    | 'jsxFragment'
    | 'keepNames'
    | 'target'
    | 'bundle'
  >;
}

export interface StyleProcessors {
  /**
   * [SASS Dart](https://sass-lang.com/documentation/js-api/) Options
   */
  sass?: {
    /**
     * Whether or not to generate sourcemaps
     *
     * @default true
     */
    sourcemap?: boolean;
    /**
     * The style compiled CSS should be output.
     *
     * @default 'compressed'
     */
    style?: 'expanded' | 'compressed';
    /**
     * Whether or not to print warnings to CLI - Warnings will require
     * an `stdin` invocation to view. Setting this to `false` will hide
     * warnings all together.
     *
     * @default true
     */
    warnings?: boolean;
    /**
     * A list of paths to include, ie: node_modules.
     *
     * @default ['node_modules']
     */
    includePaths?: string[];
  };
  /**
   * [PostCSS](https://postcss.org/) Plugins
   */
  postcss?:(PostCSSPlugin | Transformer | TransformCallback)[]

}

export interface ImageProcessors {
  /**
   * [Sharp](https://sharp.pixelplumbing.com) Options
   */
  sharp?: SharpOptions

}

export interface SVGProcessors {
  /**
   * [SVGO](https://github.com/svg/svgo) Options
   *
   */
  svgo?: OptimizeOptions
  /**
   * [SVG Sprite](https://github.com/svg-sprite) Options
   */
  sprite?: Pick<
    SVGSpriteConfig,
    | 'mode'
    | 'shape'
    | 'svg'
    | 'variables'
  >

}
