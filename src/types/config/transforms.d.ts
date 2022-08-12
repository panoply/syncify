import type { BuildOptions } from 'esbuild';
import { SharpOptions } from 'sharp';
import type { OptimizeOptions } from 'svgo';

export namespace Transforms {

  export interface SVGInline {
    /**
     * SVG inputs source paths - Must be defined!
     *
     * @default null
     */
    input: string | string[];
    /**
     * Rename the svg file - The same name as source file will be used
     * undefined.
     *
     * @default null
     *
     * @example
     * 'source/svgs/arrow.svg' => 'arrow.svg' // if snippet is false
     * 'source/svgs/checkmark.svg' => 'checkmark.liquid' // if snippet is true
     */
    rename?: string;
    /**
     * Whether to generate svg as snippet or asset. When `true` the
     * svg source will be written as a snippet
     *
     * @default false
     */
    snippet?: boolean;
    /**
     * Options to be passed to `svgo` - Requires `svgo` to be installed.
     */
    svgo?: OptimizeOptions;
  }

  export interface SVGSprite {
    /**
     * SVG inputs source paths - Must be defined!
     *
     * @default null
     */
    input: string | string[];
    /**
     * Rename the generated svg sprite file. By default
     * the parent input directory name is used.
     *
     * @default null
     *
     * @example
     * 'source/svgs/sprite/*.svg' => 'sprite.svg' // if snippet is false
     * 'source/svgs/sprite/*.svg' => 'sprite.liquid' // if snippet is true
     */
    rename: string;
    /**
     * Whether to generate sprite as snippet or write
     * as an `.svg` file to `theme/assets`.
     *
     * > By default, sprites will write to `theme/snippets`
     *
     * @default true
     */
    snippet?: boolean;
    /**
     * Options to be passed into `svg-sprite`.
     */
    sprite?: {
      dimensionAttributes?: boolean;
      namespaceClassnames?: boolean;
      namespaceIDS?: boolean;
      rootAttributes?: {
        [prop: string]: string
      }
    }
  }

  /* -------------------------------------------- */
  /* SVG FILES                                    */
  /* -------------------------------------------- */

  /**
   * SVG processing transforms
   */
  export type SVG = SVGInline | SVGSprite | Array<SVGInline & SVGSprite>

  /**
   * ESBuild bundle options - cherry picked
   */
  export type ESBuildOptions = Pick<BuildOptions,
    | 'banner'
    | 'charset'
    | 'external'
    | 'footer'
    | 'chunkNames'
    | 'globalName'
    | 'jsx'
    | 'tsconfig'
    | 'target'
    | 'treeShaking'
    | 'splitting'
    | 'sourcemap'
    | 'supported'
    | 'define'
    | 'format'
    | 'inject'
  >;

  /**
   * Image processing transforms. Requires `sharp` to be installed
   * in your project.
   */
  export interface Image {
    /**
     * Image file input source paths - Must be defined!
     *
     * > Only Sharp accepts file extension are allowed
     *
     * @default null
     */
    input: string | string[];
    /**
     * Rename the image/s when writing to `theme/assets`. Defaults
     * to use to provided input name.
     *
     * @default null
     */
    rename?: string;
    /**
     * Options to be passed to Sharp. Requires `sharp` to be installed
     * in your project.
     *
     * @default null // unless sharp is installed
     */
    sharp?: SharpOptions
  }

  /**
   * ESBuild processing transform
   */
  export interface Script {
    /**
     * JS/TS inputs source paths - Must be defined!
     *
     * @default null
     */
    input: string | string[];
    /**
     * Rename the input file - This will be passed to esbuilds `entryNames`
     * option, so `[dir]/[name]-[hash]` placeholders are supported.
     *
     * @default null
     */
    rename?: string;
    /**
     * Optionally write the javascript file inline as a snippet. This will transform
     * the JS and contained code will be output within `<script></script>` tags output as a
     * `snippet.liquid` file.
     *
     * @default false
     */
    snippet?: boolean;
    /**
     * Options to be passed to ESBuild. Requires `esbuild` to be installed
     * in your project.
     *
     * > Please note the some options are omitted
     *
     * @default null // unless esbuild is installed
     */
    esbuild?: ESBuildOptions
  }

  /**
   * Style processing transforms
   */
  export interface Style {
    /**
     * Stylesheet inputs source paths - Must be defined!
     *
     * @default null
     */
    input: string | string[];
    /**
     * Rename the stylesheet
     *
     * @default null
     */
    rename?: string;
    /**
     * Optionally write the stylesheet inline as a snippet. This will transform
     * the CSS, wrap it within `<style></style>` tags output its contents as a
     * `snippet.liquid` file.
     *
     * @default false
     */
    snippet?: boolean;
    /**
     * Glob stylesheet paths/files to watch. When changes
     * are applied to matched files, then the defined `input`
     * will be compiled.
     *
     * @default []
     */
    watch?: string[];
    /**
     * Whether or not to run PostCSS. Requires `postcss` to be installed
     * and assumes that your project contains a `postcss.config.js` file.
     *
     * > If your project has PostCSS installed and a `postcss.config.js` was
     * resolved then this will default to `true` otherwise `false`
     *
     * @default false // unless installed and configured, then true.
     */
    postcss: boolean;
    /**
     * Options to be passed to Dart SASS. Requires `sass` to be installed
     * in your project. Any defined `input` file which uses a `.scss` or
     * `.sass` extension will be passed to Dart SASS.
     *
     * @default null // unless sass is installed
     */
    sass: {
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
  }

  /**
   * JSON File processing - Options defined here are used when
   * writing to the file system. Typically in operations like
   * `--merge`, `--pull` and `--download`.
   *
   * > The options will also be used in **development** (`dev`)
   * mode when uploading `.json` files to stores/themes.
   */
  export interface JSON {
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
  }

}
