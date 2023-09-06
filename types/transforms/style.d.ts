/* eslint-disable no-unused-vars */

import type { LiteralUnion, Merge } from 'type-fest';
import type { Tester } from 'anymatch';
import type { Config as TailwindConfig } from 'tailwindcss';
import type { Plugin as PostCSSPlugin, Transformer, TransformCallback } from 'postcss';
import type { GetProcessorConfigs, RenamePaths } from '../shared';

/* -------------------------------------------- */
/* PROCESSOR CONFIGS                            */
/* -------------------------------------------- */

export type PostCSSConfig = (
  | PostCSSPlugin
  | Transformer
  | TransformCallback
);

export interface TailwindCSSConfig {
  important: TailwindConfig['important'];
  prefix: TailwindConfig['PrefixConfig'];
  separator: TailwindConfig['SeparatorConfig'];
  safelist: TailwindConfig['SafelistConfig'];
  blocklist: TailwindConfig['BlocklistConfig'];
  presets: TailwindConfig['presets'];
  future: TailwindConfig['future'];
  experimental: TailwindConfig['experimental'];
  darkMode: TailwindConfig['darkMode'];
  theme: TailwindConfig['theme'];
  corePlugins: TailwindConfig['corePlugins'];
  plugins: TailwindConfig['plugins'];
}

export interface SASSConfig {
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
  include?: string[];
}

/* -------------------------------------------- */
/* TRANSFORM                                    */
/* -------------------------------------------- */

export interface StyleTransform<T = string | string[]> {
  /**
   * SVG input source paths. Accepts `string` or `string[]` glob patterns.
   * Resolution is relative to your defined `input` directory.
   *
   * @default undefined
   */
  input: T;
  /**
   * Glob stylesheet paths/files to watch. When changes
   * are applied to matched files, then the defined `input`
   * will be compiled.
   *
   * @default []
   */
  watch?: string[];
  /**
   * Rename the stylesheet file/s. The same name as source file will be used
   * when undefined. Accepts namespaces, `[file]`, `[dir]` and `[ext]`.
   *
   * ---
   *
   * @default undefined
   */
  rename?: string;
  /**
   * Optionally output the CSS as a snippet. This will transform
   * the stylesheet inline, wrap output within `<style></style>`
   * tags and write it to `snippets`.
   *
   * @default false
   */
  snippet?: boolean;
  /**
   * **NOT YET AVAILABLE**
   *
   * [TailwindCSS](https://tailwindcss.com/) Override
   *
   * Tailwind transforms will use the `tailwind.config.js` configuration
   * file in your projects root (or defined `config` path). If you have not
   * provided a tailwind config file, then syncify will use options defined
   * via `processor.tailwind`. You can optionally override configuration
   * on a per-transform basis and any options defined here will be merged with
   * those defined in your `tailwind.config.js` or `processor.tailwind`.
   *
   * @default true // if tailwind is not installed this is false
   */
  tailwind?: boolean | TailwindCSSConfig;
  /**
   * [PostCSS](https://postcss.org/) Override
   *
   * CSS File transforms will use the options provided to `processor.postcss`
   * but you can optionally override those defaults on a per-transform
   * basis. Any configuration options defined here will be merged with
   * the options defined in `processor.postcss`.
   *
   * You can also skip pre-processing with postcss by passing a _boolean_
   * `false` which will inform Syncify to not pass output to PostCSS. By
   * default, Syncify will pass all compiled SASS and files with `.css`
   * extensions to PostCSS.
   *
   * @default true // if postcss is not installed this is false
   */
  postcss?: boolean | PostCSSConfig[];
  /**
   * [SASS Dart](https://sass-lang.com/documentation/js-api/) Override
   *
   * SASS File transforms will use the options provided to `processor.sass`
   * but you can optionally override those defaults on a per-transform
   * basis. Any configuration options defined here will be merged with
   * the options defined in `processor.sass`.
   *
   * You can also skip SASS transfroms by passing a _boolean_ `false` which will
   * inform Syncify to not pass output to SASS, which is the default if SASS is not
   * installed.
   *
   * By default, Syncify will forward all input files using `.scss` or `.sass`
   * or extension to SASS Dart. If you have PostCSS installed then Syncify will
   * automatically pass SASS files to PostCSS in the post-process.
   *
   * @default true // if sass is not installed this is false
   */
  sass?: boolean | SASSConfig;
}

/* -------------------------------------------- */
/* TRANSFORMER                                  */
/* -------------------------------------------- */

export type StyleTransformer = (
  | string
  | string[]
  | StyleTransform
  | StyleTransform[]
  | {
    [K in RenamePaths]: (
      | string
      | string[]
      | Pick<StyleTransform,
        | 'postcss'
        | 'sass'
        | 'snippet'
        | 'watch'
        | 'input'
      >
    )
  }
)

/* -------------------------------------------- */
/* INTERNAL USE                                 */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * PostCSS Processor Configuration
 */
export type PostCSSProcesser = GetProcessorConfigs<PostCSSConfig[]>;

/**
 * **INTERNAL USE**
 *
 * Tailwind Processor Configuration
 */
export type TailwindCSSProcesser = GetProcessorConfigs<TailwindCSSConfig>

/**
 * **INTERNAL USE**
 *
 * SASS Processor Configuration
 */
export type SASSProcesser = GetProcessorConfigs<SASSConfig>

/**
 * **INTERNAL USE**
 *
 * Bundling Configuration
 */
export type StyleBundle = Merge<StyleTransform, {
  /**
   * A UUID reference for this $.
   */
  uuid: string;
  /**
   * Resolved input path
   */
  input: string;
  /**
   * Anymatch function
   */
  watch: Tester;
}>;
