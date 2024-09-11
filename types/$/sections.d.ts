import type { LiteralUnion } from 'type-fest';

/**
 * Sections sub-directory grouping options
 */
export interface Sections {
  /**
   * An array list of files to be uploaded as sections
   *
   * @default 'source/sections'
   */
  input: string | string[];
  /**
   * Whether sections allow directory name prefixing
   *
   * @default false
   *
   * @example
   *
   * // Assuming the separator is '_'
   * // Take the following structure:
   *
   * sections
   * │
   * ├─ index
   * │  ├─ slideshow.liquid
   * │  └─ banner.liquid
   * └─ layouts
   *    ├─ header.liquid
   *    └─ footer.liquid
   *
   * // The output result will be:
   *
   * theme
   * └─ sections
   *   ├─ index_slideshow.liquid
   *   ├─ index_banner.liquid
   *   ├─ layout_header.liquid
   *   └─ layout_footer.liquid
   *
   */
  prefixDir?: boolean;
  /**
   * Prefix separator character
   *
   * @default '-'
   *
   * @example
   *
   * // Filename will be prefix
   * 'dir/file.liquid' => 'dir-file.liquid'
   */
  separator?: LiteralUnion<
    | '-'
    | '_'
    | '.'
    | '@'
    | ':'
    ,
    string
  >;
  /**
   * A list section sub-directories or relative files that should
   * pass through or skip prefixing
   *
   * **NOTE:**
   *
   * **Cannot contain glob (`*`) stars**
   *
   * @default []
   *
   * @example
   *
   * // ✓ This is correct
   * { global: ['some-dir/filename.liquid' ] }
   *
   * // ✗ This is incorrect
   * { global: ['some-dir/*.liquid' ] }
   */
  global?: string[];
}
