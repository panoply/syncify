/* eslint-disable no-unused-vars */

import type { Merge } from 'type-fest';
import type { Tester } from 'anymatch';
import type { OptionsOutput as CleanCSSOptions } from 'clean-css';
import type { Config as TailwindCSSConfig } from 'tailwindcss';
import type { Plugin as PostCSSPlugin, Transformer, TransformCallback, AcceptedPlugin } from 'postcss';
import type { GetProcessorConfigFile, GetProcessorConfigs, RenamePaths } from '../shared';

/* -------------------------------------------- */
/* PROCESSOR CONFIGS                            */
/* -------------------------------------------- */

export type PostCSSConfig = (
  | AcceptedPlugin
  | PostCSSPlugin
  | Transformer
  | TransformCallback
  | any
);

/**
 * Style Minification
 */
export interface StyleTerse extends CleanCSSOptions {
 /**
  * Whether or not to purge unused CSS class names
  *
  * @default false
  */
  purgeUnusedCSS?: boolean;
  /**
  * Whether or not to obfuscate CSS class names
  *
  * @default false
  */
  obfuscateClassNames?: boolean;
  /**
  * List of class names that should be excluded from
  * obfuscation and shortnaming.
  */
  obfuscateWhitelist?: string[];
  /**
  * The alphabet used to generate the new class names.
  *
  * > **NOTE**
  * >
  * > There is no `d` in the default alphabet to avoid adblock issues.
  *
  * @default 'abcefghijklmnopqrstuvwxyz0123456789'
  */
  obfuscateAlphabet?: string;
  /**
  * Excluded files from terser minification
  *
  * @default []
  */
  exclude?: string[]
}

export interface TailwindConfig extends TailwindCSSConfig {
  config: string[]
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
   * This option is passed to SASS Dart compile instance. If this option is set to `true`,
   * Sass won’t print warnings that are caused by dependencies. A "dependency" is defined
   * as any file that’s loaded through external sources.
   *
   * This is useful for silencing deprecation warnings that you can’t fix on your own.
   * However, please also notify your dependencies of the deprecations so that they can get
   * fixed as soon as possible!
   *
   * @default false
   */
  quietDeps?: boolean;
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
   * When `snippet` is `true` you can provide an additional list of attributes to
   * be applied to `<style>` tag which code will be output within. This only applies
   * to snippet generation and entries will be ignored if snippet is `false`.
   *
   * **Example Definition**
   *
   * ```js
   * // Attribute definitions
   * {
   *   attrs: [
   *    ['id', 'foo']
   *    ['data-attr', 'bar'],
   *    ['{{ object.prop }}'],
   *    ['{% if xxx %}', 'data-xxx', '{% endif %}']
   *   ]
   * }
   * ```
   *
   * **Example Output**
   *
   * ```liquid
   * <style
   *  id="foo"
   *  data-attr="bar"
   *  {{ object.prop }}
   *  {% if xxx %}data-xxx{% endif %}></style>
   * ```
   *
   * // Output
   * @default []
   */
  attrs?: string[][];
  /**
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
  tailwind?: boolean | Partial<TailwindConfig>;
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
  /**
   * **NOTE YET AVAILABLE**
   *
   * Terse Style (CSS) Minification
   *
   * > Uses [clean-css](https://github.com/clean-css/clean-css) minification
   * > Uses [purge-css](https://github.com/FullHuman/purgecss)
   */
  terser?: boolean | SASSConfig;
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
        | 'tailwind'
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
export type PostCSSProcesser = GetProcessorConfigFile<PostCSSConfig[]>;

/**
 * **INTERNAL USE**
 *
 * Tailwind Processor Configuration
 */
export type TailwindCSSProcesser = Merge<GetProcessorConfigs<TailwindConfig>, {
  /**
   * Bundle References
   *
   * Holds the index of each style bundle that uses tailwind.
   */
  map: { [bundle: number]: Set<string> }
}>

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
   * Attributes to apply
   */
  attrs: string[];
  /**
   * Anymatch function
   */
  watch: Tester;
  /**
   * PostCSS
   */
  postcss: PostCSSConfig[];
  /**
   * Tailwind
   */
  tailwind: Partial<TailwindConfig>;
}>;
