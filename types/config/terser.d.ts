import type { BuildOptions } from 'esbuild';
import type { LiteralUnion, Merge } from 'type-fest';
import type { OptionsOutput as CleanCSSOptions } from 'clean-css';
import type { HTMLMinifierTerserOptions } from '../modules/html-minifier-terser';

/**
 * ESBuild minification options
 */
export type ScriptTerse = Merge<Pick<BuildOptions,
  | 'keepNames'
  | 'mangleProps'
  | 'minifyIdentifiers'
  | 'minifySyntax'
  | 'minifyWhitespace'
  | 'mangleQuoted'
  >,
  {
    /**
     * List of input file names to exclude from minification
     *
     * @default 'none'
     */
    legalComments?: LiteralUnion<BuildOptions['legalComments'], string>
    /**
     * List of input file names to exclude from minification
     *
     * @default []
     */
    exclude?: string[];
  }
>

/**
 * JSON File Minification
 */
export interface JSONTerse {
  /**
   * Minify `.json` files writing to `theme/assets`
   *
   * @default true
   */
  assets?: boolean;
  /**
   * Minify `settings_schema.json` and `settings_data.json` config files.
   *
   * @default true
   */
  config?: boolean;
  /**
   * Minify `locale` and `.json` files.
   *
   * @default true
   */
  locales?: boolean;
  /**
   * Minify `metafield` and `.json` files.
   *
   * @default true
   */
  metafields?: boolean;
  /**
   * Minify `metaobject` and `.json` files.
   *
   * @default true
   */
  metaobject?: boolean;
  /**
   * Minify section group `.json` files
   *
   * @default true
   */
  groups?: boolean;
  /**
   * Minify `template` and `.json` files.
   *
   * @default true
   */
  templates?: boolean;
  /**
   * An optional list of paths/files to exclude from minification.
   *
   * @default []
   */
  exclude?: string[]
}

/**
 * Liquid Minification
 */
export interface LiquidTerse {
  /**
   * Minifies inner contents of `{% javascript %}` tags
   *
   * @default false
   */
  minifyJavascript?: boolean;
  /**
   * Minifies inner contents of `{% stylesheet %}`` tags
   *
   * @default false
   */
  minifyStylesheet?: boolean;
  /**
   * Minifies inner contents of `{% style %}` tags
   *
   * @default false
   */
  minifyStyle?: boolean;
  /**
   * Minifies JSON contained within Liquid `{% schema %}` tags.
   *
   * > **NOTE**
   * >
   * > Minifying schema tag contents has no effect on store performance.
   *
   * @default false
   */
  minifySchema?: boolean;
  /**
   * Remove all occurances of Liquid comments
   *
   * @default true
   */
  removeComments?: boolean;
  /**
   * Collapse all whitespace and newlines
   *
   * @default true
   */
  collapseWhitespace?: boolean;
  /**
   * Removes redundant whitespace Liquid dash trims from Liquid tags and objects.
   *
   * @default true
   */
  stripDashes?: boolean;
  /**
   * **NOT YET AVAILABLE**
   *
   * Removes all whitespace and newline occurances within Liquid syntax.
   *
   * > **NOTE**
   * >
   * > Liquid token minification has no effect on store performance.
   *
   * @default
   * true
   *
   * @example
   *
   * // Assuming that collapseWhitespace is set to true.
   * // Using this option would result in the following
   *
   * // BEFORE
   *
   * {% unless foo == bar %}
   *  {{ some.object | filter: 'foo' }}
   * {% endunless %}
   *
   * // AFTER
   *
   * {%unless foo==bar%}{{some.object|filter:'foo'}}{%endunless%}
   */
  collapseInner?: boolean;
  /**
   * Excluded files from minification
   *
   * @default []
   */
  exclude?: string[]
}

/**
 * Liquid Minification
 */
export interface MarkupTerse {
  /**
   * Minifies inner contents of `<script>` tags
   *
   * @default true
   */
  minifyJS?: boolean;
  /**
   * Minifies inner contents of `<style>` tags
   *
   * @default true
   */
  minifyCSS?: boolean;
  /**
   * Remove all occurances of HTML comments
   *
   * @default true
   */
  removeComments?: boolean;
  /**
   * Collapse all whitespace and newlines
   *
   * @default true
   */
  collapseWhitespace?: boolean;
  /**
   * Excluded files from minification
   *
   * @default []
   */
  exclude?: string[]
}

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

/* -------------------------------------------- */
/* INTERNAL USE                                 */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Terser minification configuration
 */
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
   * Terse Markup (HTML) Minification
   *
   * > Uses [html-minifier-terser](https://github.com/terser/html-minifier-terser)
   */
  markup?: HTMLMinifierTerserOptions;
  /**
   * **NOTE YET AVAILABLE**
   *
   * Terse Style (CSS) Minification
   *
   * > Uses [clean-css](https://github.com/clean-css/clean-css) minification
   * > Uses [purge-css](https://github.com/FullHuman/purgecss)
   */
  style?: StyleTerse;
  /**
   * Terse Script (JS/TS) Minification
   *
   * > Uses [esbuild](https://esbuild.github.io/api/#minify) minificiation
   */
  script?: ScriptTerse;
}

/**
 * **INTERNAL USE**
 *
 * Terser minification configuration
 */
export interface TerserBundle {
  /**
   * Terse JSON Minification
   *
   * @default false
   */
  json: boolean;
  /**
   * HTML (Markup) Minification
   */
  markup: boolean;
  /**
   * Liquid Minification
   */
  liquid: boolean;
  /**
   * **NOTE YET AVAILABLE**
   *
   * Terse Style (CSS) Minification
   */
  style: boolean;
  /**
   * Terse Script (JS/TS) Minification
   */
  script: boolean;
}
