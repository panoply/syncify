import type { Tester } from 'anymatch';
import type { Plugin as PostCSSPlugin, Transformer, TransformCallback } from 'postcss';
import type { Options as SASSOptions } from 'sass';
import type { OptimizeOptions as SVGOOptions } from 'svgo';
import type { Config as SVGSpriteOptions } from 'svg-sprite';
import type { SharpOptions } from 'sharp';
import type { BuildOptions as ESBuildOptions } from 'esbuild';
import type { Merge } from 'type-fest';

/* -------------------------------------------- */
/* PROCESSORS                                   */
/* -------------------------------------------- */

export type PostCSSConfig = (PostCSSPlugin | Transformer | TransformCallback)[];
export type ESBuildConfig = Merge<ESBuildOptions, { format?: 'esm' | 'iife' }>

export interface Processors {
  /**
   * JSON File processing - Options defined here are used when
   * writing to the file system. Typically in operations like
   * `--merge`, `--pull` and `--download`.
   *
   * > The options will also be used in **development** (`dev`)
   * mode when uploading `.json` files to stores/themes.
   */
  json: {
    /**
     * The indentation level
     *
     * @default 2
     */
    indent?: number;
    /**
     * Whether to use `\t` identation characters.
     *
     * @default false
     */
    useTab?: boolean;
    /**
     * If line termination should be Windows (CRLF) format.
     * Unix (LF) format is the default.
     *
     * @default false
     */
    crlf?: boolean;
    /**
     * An optional string list of paths/filenames to exclude
     * from processing, ie: pass through
     *
     * @default false
     */
    exclude?: string[]
  };
  /**
   * [ESBuild](https://esbuild.github.io/) Config
   *
   * Syncify uses ESBuild under the hood for JS/TS transpilation.
   * Some native ESBuild options are omitted from processing and
   * handled internally by Syncify.
   */
  esbuild?: Merge<Pick<ESBuildOptions,
    | 'bundle'
    | 'treeShaking'
    | 'tsconfig'
    | 'target'
    | 'splitting'
    | 'pure'
    | 'define'
    | 'format'
    | 'banner'
    | 'footer'
    | 'charset'
    | 'chunkNames'
    | 'drop'
    | 'ignoreAnnotations'
    | 'jsx'
    | 'jsxDev'
    | 'jsxFactory'
    | 'jsxFragment'
    | 'jsxImportSource'
    | 'mainFields'
    | 'metafile'
    | 'resolveExtensions'
    | 'supported'
    | 'plugins'
    >, {
    /**
     * The format to be generated. Because we are targeting
     * browser environments, Syncify does not allow for CJS (commonjs)
     * bundles to be produced.
     *
     * @default 'esm'
     */
    format?: 'esm' | 'iife';
    /**
     * Whether or not sourcemaps should be generated.
     * Syncify will process sourcemap generation internally,
     * so this option only accepts a boolean value.
     *
     * @default true
     */
    sourcemap?: boolean;
  }>;
  /**
   * [PostCSS](https://postcss.org/) Plugins
   */
  postcss?: PostCSSConfig[]
  /**
   * [SASS Dart](https://sass-lang.com/documentation/js-api/) Config
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
   * [Sharp](https://sharp.pixelplumbing.com) Config
   */
  sharp?: SharpOptions;
  /**
   * [SVGO](https://github.com/svg/svgo) Config
   *
   */
  svgo?: SVGOOptions
  /**
   * [SVG Sprite](https://github.com/svg-sprite) Config
   */
  sprite?: Pick<
    SVGSpriteOptions,
    | 'mode'
    | 'shape'
    | 'svg'
    | 'variables'
  >
}

type GetProcessorConfigs<T> = {
  /**
   * Whether or not the processor is required
   */
  required: boolean;
  /**
   * Whether or not the processor is installed
   */
  installed: boolean;
  /**
   * Whether or not the module was loaded, ie: imported.
   * This will be `false` until the the import was loaded.
   */
  loaded: boolean;
  /**
   * Whether or not a config file exists for the processor,
   * When one exists the URI path location to the file will
   * applied as the value.
   */
  file: false | string;
  /**
   * Configuration of the processor, Initialized with defaults
   */
  config: T;
}

export interface ProcessorConfig {
  json: Merge<Processors['json'], { exclude: Tester }>;
  postcss: GetProcessorConfigs<PostCSSConfig[]>;
  sass: GetProcessorConfigs<SASSOptions<'sync'>>;
  sharp: GetProcessorConfigs<SharpOptions>;
  sprite:GetProcessorConfigs<SVGSpriteOptions>;
  svgo: GetProcessorConfigs<SVGOOptions>
  esbuild: GetProcessorConfigs<
    Merge<ESBuildOptions, {
      format: 'esm' | 'iife'
    }>
  >
}
