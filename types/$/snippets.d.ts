import type { LiteralUnion } from 'type-fest';

/**
 * Snippet sub-directory grouping options
 */
export interface Snippets {
  /**
   * An array list of files to be uploaded as snippets
   *
   * @default 'source/snipets'
   */
  input: string | string[];
  /**
   * Whether snippets allow sub-directory name prefixing
   *
   * @default false
   *
   * @example
   *
   * // Assuming the separator is '_'
   * // Take the following structure:
   *
   * snippets
   * │
   * ├─ head
   * │  └─ foo.liquid
   * └─ body
   *    ├─ bar.liquid
   *    └─ baz.liquid
   *
   * // The output result will be:
   *
   * theme
   * └─ snippets
   *   ├─ head_foo.liquid
   *   ├─ body_bar.liquid
   *   └─  body_baz.liquid
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
   * A list snippet sub-directories or relative files that should
   * pass through or snip prefixing
   *
   * _cannot contain glob (`*`) stars_
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
