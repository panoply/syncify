/* eslint-disable no-unused-vars */

import type { Merge } from 'type-fest';
import type { Tester } from 'anymatch';
import type { OptimizeOptions as SVGOConfig } from 'svgo';
import type { Config as SVGSpriteConfig } from 'svg-sprite';
import type { GetProcessorConfigs, RenamePaths } from '../misc/shared';

/* -------------------------------------------- */
/* PROCESSOR CONFIGS                            */
/* -------------------------------------------- */

export { SVGOConfig, SVGSpriteConfig };

/* -------------------------------------------- */
/* SHARED                                       */
/* -------------------------------------------- */

interface SVGShared<T extends 'file' | 'sprite'> {
  /**
   * SVG input source paths. Accepts `string` or `string[]` glob patterns.
   * Resolution is relative to your defined `input` directory.
   *
   * @default ''
   */
  input: string | string[];
  /**
   * Rename the svg file/s. The same name as source file will be used
   * when undefined. Accepts namespaces, `[file]`, `[dir]` and `[ext]`.
   * ---
   *
   * @default undefined
   *
   * @example
   * 'source/svgs/arrow.svg' > 'arrow.svg' // if snippet is false
   * 'source/svgs/checkmark.svg' > 'checkmark.liquid' // if snippet is true
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
   * The SVG export format. Syncify can produce 2 different SVG formats:
   *
   * You can omit this option when you have only 1 pre-processor installed or
   * if you are applying a per-transfrom configuration override as it will default
   * to the format which the inferred pre-processor produces. If you are using
   * both the supported processors ([SVGO](https://github.com/svg/svgo) &
   * [SVG Sprite](https://github.com/svg-sprite)) then you will need
   * to inform Syncify on which format it should produce.
   *
   * ---
   *
   * **File Format**
   *
   * _SVG transforms using a `file` format require SVGO to be installed. File
   * formats will produce individual `.svg` files from that can be output as
   * an`asset` or inlined into a `snippet`_
   *
   * ---
   *
   * **Sprite Format**
   *
   * _SVG transforms using a `sprite` format require SVG Sprite to be installed.
   * Sprite formats will produce an SVG Sprite that can be output as an `asset`
   * or inlined into a `snippet`_
   *
   * ---
   *
   * @default
   * undefined   // When no SVG pre-processor is installed
   * null        // When both SVGO and SVG Sprite are installed (required)
   * 'file'      // When SVGO is the only processor installed
   * 'sprite'    // When SVG Sprite is the only processor installed
   */
  format?: T;
}

export interface SVGFile extends SVGShared<'file'> {
  /**
   * [SVGO](https://github.com/svg/svgo) Override
   *
   * SVG File transforms will use the options provided to `processor.svgo`
   * but you can optionally override those defaults on a per-transform
   * basis. Any configuration options defined here will be merged with
   * the options defined in `processor.svgo`.
   *
   * @default
   * processor.svgo // When processor configuration is defined
   */
  svgo?: SVGOConfig
}

export interface SVGSprite extends SVGShared<'sprite'> {
  /**
   * [SVG Sprite](https://github.com/svg-sprite) Override
   *
   * SVG Sprite transforms will use the options provided to `processor.sprite`
   * but you can optionally override those defaults on a per-transform
   * basis. Any configuration options defined here will be merged with
   * the options defined in `processor.sprite`.
   *
   * @default
   * processor.sprite // When processor configuration is defined
   */
  sprite?: SVGSpriteConfig
}

/* -------------------------------------------- */
/* TRANSFORM                                    */
/* -------------------------------------------- */

/**
 * SVG processing transforms
 */
export type SVGTransform = (
  | SVGFile
  | SVGSprite
  | Array<SVGFile & SVGSprite>
)

/* -------------------------------------------- */
/* TRANSFORMER                                  */
/* -------------------------------------------- */

export type SVGTransformer = (
  | string
  | string[]
  | SVGTransform
  | SVGTransform[]
  | {
    [K in RenamePaths]: (
      | string
      | string[]
      | Omit<SVGTransform, 'rename'>
    )
  }
)

/* -------------------------------------------- */
/* INTERAL USE                                  */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Processor Configuration
 */
export type SVGOProcesser = GetProcessorConfigs<SVGOConfig>

/**
 * **INTERNAL USE**
 *
 * Processor Configuration
 */
export type SVGSpriteProcesser = GetProcessorConfigs<SVGSpriteConfig>

/**
 * **INTERNAL USE**
 *
 * Bundling Configuration
 */
export type SVGBundle = Merge<SVGTransform, {
  /**
   * Resolved input paths (paths are expanded)
   */
  input: string[];
  /**
   * Anymatch function - (input paths)
   */
  watch: Tester;
}>[];
