import type { Options } from 'html-minifier-terser';
import type { BuildOptions } from 'esbuild';

/**
 * ESBuild minification options
 */
export type ESBuildMinify = Pick<BuildOptions,
  | 'keepNames'
  | 'legalComments'
  | 'mangleProps'
  | 'minifyIdentifiers'
  | 'minifySyntax'
  | 'minifyWhitespace'
  | 'mangleQuoted'
  >

/**
 * HTML Minification (html-minifer-terser)
 */
export type HTMLMinifierTerser = Omit<Options,
  | 'minifyCSS'
  | 'minifyJS'
  | 'sortAttributes'
  | 'sortClassName'
>

/**
 * JSON File Minification
 */
export interface JSONMinify {
  /**
   * Minify `.json` files writing to `theme/assets`
   *
   * @default true
   */
  assets: boolean;
  /**
   * Minify `settings_schema.json` and `settings_data.json` config files.
   *
   * @default true
   */
  config: boolean;
  /**
   * Minify `locale` and `.json` files.
   *
   * @default true
   */
  locales: boolean;
  /**
   * Minify `metafield` and `.json` files.
   *
   * @default true
   */
  metafields: boolean;
  /**
   * Minify `template` and `.json` files.
   *
   * @default true
   */
  templates: boolean;
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
export interface ViewMinify {
  /**
   * Minifies inner contents of `<script>` tags
   *
   * @default true
   */
  minifyScript: boolean;
  /**
   * Minifies inner contents of `<style>` tags
   *
   * @default true
   */
  minifyStyle: boolean;
  /**
   * Minifies JSON contained within schema tags, ie: `{% schema %}`
   *
   * @default true
   */
  minifySchema: boolean;
  /**
   * Remove all occurances of Liquid/HTML comments
   *
   * @default true
   */
  removeComments: boolean;
  /**
   * Collpase all whitespace
   *
   * @default true
   */
  collapseWhitespace: boolean;
  /**
   * Removes redundant whitespace Liquid dash trims from Liquid
   * tags and objects.
   *
   * @default true
   */
  stripDashes: boolean;
  /**
   * A List of Liquid tags to ignore from minification
   *
   * @default null
   */
  ignoreTags: RegExp[];
  /**
   * A List of Liquid tags to ignore from minification
   *
   * @default null
   */
  ignoreObjects: RegExp[];
  /**
   * Excluded files from minification
   *
   * @default null
   */
  exclude: string[]
}

/**
 * Liquid Minification
 */
export interface LiquidMinify {
  /**
   * Minifies JSON contained within schema tags, ie: `{% schema %}`
   *
   * @default true
   */
  minifySchemaTag: boolean;
  /**
   * Remove all occurances of Liquid comments
   *
   * @default true
   */
  removeComments: boolean;
  /**
   * Remove `$schema` props from JSON objects
   *
   * @default true
   */
  removeSchemaRefs: boolean;
  /**
   * Removes and strips Liquid syntax contained within HTML
   * Attributes that span newlines or apply extraneous whitespace.
   *
   * @default true
   */
  removeNewlineAttributes: boolean;
  /**
   * Removes redundant whitespace Liquid dash trims from Liquid
   * tags and objects.
   *
   * @default true
   */
  stripWhitespaceDashes: boolean;
  /**
   * Removes Liquid tag extrenous whitespaces
   *
   * @default true
   */
  stripInnerTagWhitespace: boolean;
  /**
   * Removes and strips Liquid syntax contained within HTML
   * Attributes that span newlines or apply extraneous whitespace.
   *
   * @default true
   */
  stripAttributeNewlines: boolean;
  /**
   * A List of Liquid tags to ignore from minification
   *
   * @default null
   */
  ignoreTags: RegExp[];
  /**
   * A List of Liquid tags to ignore from minification
   *
   * @default null
   */
  ignoreObjects: RegExp[];
  /**
   * Excluded files from minification
   *
   * @default null
   */
  exclude: string[]
}
