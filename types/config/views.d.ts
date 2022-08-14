import { LiteralUnion } from 'type-fest';

export interface Icons {
  /**
   * Whether or not to support icon custom tags. When `true` you can
   * reference SVG icons using a HTML tag with a `name=""` property and
   * Syncify will replace all occurances with the embedded SVG.
   *
   * For example:
   *
   * ```html
   * <!-- In your HTML you can reference the SVG -->
   * <i name="name-of-icon" from="sprite-id"></i>
   *
   * <!-- Syncify will replace this with the raw data -->
   * <svg id="name-of-icon"><path>...</path></svg>
   * ```
   *
   * This approach will likely improve render times of your webshop.
   * Using Snippets to render inline SVGs is costly and a performance
   * bottleneck. Just because Shopify does this in Dawn, does not mean
   * it is a good idea.
   *
   * @default false
   */
  useCustomTag: boolean;
  /**
   * Replacer HTML tag to look for occurances within
   *
   * @default 'i' // eg: <i name="svg"></i>
   */
  tagName?: string;
  /**
   * Whether or not to treat the custom tag as a void (self-closing)
   *
   * @default false
   */
  tagVoid?: boolean
  /**
   * A vscode user specific option which will auto-generate
   * icon name completions for you and link them to your workspace settings.
   *
   * > Option is only available to vscode users.
   *
   * @default false
   */
  vscodeCustomData?: boolean;
}

/**
 * Snippet sub-directory grouping options
 */
export interface Snippets {
  /**
   * Whether snippets allow sub-directory name prefixing
   *
   * @default false
   *
   * @example
   *
   * // Take the following structure
   * snippets
   * │
   * ├─ head
   * │  └─ foo.liquid
   * └─ body
   *    ├─ bar.liquid
   *    └─ baz.liquid
   *
   * // The output result will be
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

/**
 * Sections sub-directory grouping options
 */
export interface Sections {
  /**
   * Whether sections allow directory name prefixing
   *
   * @default false
   *
   * @example
   *
   * // Take the following structure
   * sections
   * │
   * ├─ index
   * │  ├─ slideshow.liquid
   * │  └─ banner.liquid
   * └─ layouts
   *    ├─ header.liquid
   *    └─ footer.liquid
   *
   * // The output result will be
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

/**
 * Static Page publishing
 */
export interface Pages {
  /**
   * Whether the pulled page content should be written
   * as HTML or have the HTML converted to Markdown.
   *
   * @default 'html'
   */
  language?: 'markdown' | 'html',
  /**
   * Fallback author name
   *
   * @default null
   */
  author?: string;
  /**
   * Whether pages contained in sub-directories should
   * use the directory name as the `template_suffix`
   *
   * @default false
   */
  suffixDir?: boolean;
  /**
   * A list of page sub-directories or relative files that should
   * pass through and not apply the directory name as a `template_suffix`
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
