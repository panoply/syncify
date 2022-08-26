import { Processors } from './processors';

export interface SVGInline {
  /**
   * SVG inputs source paths - Must be defined!
   *
   * @default null
   */
  input: string | string[];
  /**
   * The export generated type. `inline` types use SVGO and will export as single file
   * SVGs. `sprite` types use SVG Sprite and will export as such.
   *
   * @default 'inline'
   */
  type: 'inline';
  /**
   * Rename the svg file - The same name as source file will be used
   * when undefined.
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
   * SVGO Processor - Skip processing by passing boolean `false`. If SVGO
   * is installed then this will default to `true` and use default processing
   * options.
   *
   * > Optionally you can override SVGO processor configurations on a per-transform
   * basis.
   *
   * @default true // false if SVGO is not installed
   */
  svgo?: false | Processors['svgo']
}

export interface SVGSprite {
  /**
   * SVG inputs source paths - Must be defined!
   *
   * @default null
   */
  input: string | string[];
  /**
   * The export generated type. `inline` types use SVGO and will export as single file
   * SVGs. `sprite` types use SVG Sprite and will export as such.
   *
   * @default 'inline'
   */
  type: 'sprite';
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
  rename?: string;
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
   * SVG Sprite Processor - Skip processing by passing boolean `false`. If SVG Sprite
   * is installed then this will default to `true` and use default processing
   * options.
   *
   * > Optionally you can override SVG Sprite processor configurations on a
   * per-transform basis.
   *
   * @default true // false if SVG Sprite is not installed
   */
  sprite?: boolean | Processors['sprite']
}

/* -------------------------------------------- */
/* SVG FILES                                    */
/* -------------------------------------------- */

/**
 * SVG processing transforms
 */
export type SVGTransform = SVGInline | SVGSprite | Array<SVGInline & SVGSprite>

/**
 * Image processing transforms. Requires `sharp` to be installed
 * in your project.
 */
export interface ImageTransform {
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
   * Sharp Processor - Skip processing by passing boolean `false`. If Sharp
   * is installed then this will default to `true` and use default processing
   * options.
   *
   * > Optionally you can override SVG Sprite processor configurations on a
   * per-transform basis.
   *
   * @default true // false if Sharp is not installed
   */
  sharp?: boolean | Processors['sharp']
}

export interface ScriptTransform {
  /**
   * JS/TS inputs source paths - Must be defined!
   *
   * @default null
   */
  input: string | string[];
  /**
   * Rename the script file
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
   * Entry points (paths/files) to watch that will trigger a rebuilds of
   * the define _input_ file. By default, Syncify will watch all import entries
   * included in the _input_.
   *
   * @default []
   */
  watch?: string[];
  /**
   * ESBuild Processor - Skip processing by passing boolean `false`. If ESBuild
   * is installed then this will default to `true` and use default processing
   * options.
   *
   * @default false // true if esbuild is installed
   */
  esbuild?: boolean | Processors['esbuild'];
}

/**
 * Style processing transforms
 */
export interface StyleTransform {
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
   * PostCSS Processor - Skip processing by passing boolean `false`. If PostCSS
   * is installed then this will default to `true` and use default processing
   * options.
   *
   * > Optionally you can override PostCSS processor configurations on a
   * per-transform basis.
   *
   * @default false // true if postcss is installed
   */
  postcss: boolean | Processors['postcss'];
  /**
   * SASS Dart Processor - Skip processing by passing boolean `false`. If SASS
   * is installed then this will default to `true` and use default processing
   * options.
   *
   * > Optionally you can override SASS processor configurations on a
   * per-transform basis.
   *
   * @default false // true if sass is installed
   */
  sass: boolean | Processors['sass'];
}
