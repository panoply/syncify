import type { SVGOConfig, SVGSprite, SVGTransform } from '@syncify/types';
import type { Tester } from 'anymatch';
import type { Merge } from 'type-fest';

/**
 * Processor Configuration
 */
export type SVGOProcesser = SVGOConfig

/**
 * Bundling Configuration
 */
export type SVGBundle = Merge<SVGTransform, {
  /**
   * A UUID reference for this $.
   */
  uuid: string;
  /**
   * Resolved input paths (paths are expanded)
   */
  input: Set<string>;
  /**
   * File matching, used to determine when new files are
   * added to an `input` defined path/directory.
   */
  match: Tester;
  /**
   * The SVG Sprite configuration options
   */
  sprite: Merge<SVGSprite['sprite'], { attrs: string[] }>
  /**
   * SVGO Override
   */
  svgo?: true | SVGOConfig;
}>;
