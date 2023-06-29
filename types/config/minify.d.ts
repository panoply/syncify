import type { BuildOptions } from 'esbuild';
import { Merge } from 'type-fest';

/**
 * ESBuild minification options
 */
export type ESBuildMinify = Merge<Pick<BuildOptions,
  | 'keepNames'
  | 'legalComments'
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
     * @default []
     */
    exclude?: []
  }
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
  minifyScript?: boolean;
  /**
   * Minifies inner contents of `<style>` tags
   *
   * @default true
   */
  minifyStyle?: boolean;
  /**
   * Minifies JSON contained within Liquid `{% schema %}` tags.
   *
   * @default true
   */
  minifySchema?: boolean;
  /**
   * Remove all occurances of Liquid/HTML comments
   *
   * @default true
   */
  removeComments?: boolean;
  /**
   * Collpase all whitespace
   *
   * @default true
   */
  collapseWhitespace?: boolean;
  /**
   * Removes redundant whitespace Liquid dash trims from Liquid
   * tags and objects.
   *
   * @default true
   */
  stripDashes?: boolean;
  /**
   * Excluded files from minification
   *
   * @default []
   */
  exclude?: string[]
}
