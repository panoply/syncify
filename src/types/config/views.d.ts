export namespace Views {

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
   * Sections sub-directory grouping options
   */
  export interface Sections {
    /**
     * Whether sections allow prefixing
     *
     * @default false
     */
    directoryPrefixing: boolean;
    /**
     * Whether section prefixes are only applied to duplicate names files
     *
     * @default true
     */
    onlyPrefixDuplicates: boolean;
    /**
     * Prefix separator character
     *
     * @default '-'
     */
    prefixSeparator: string;
    /**
     * A list directories or files that should never be prefixed
     *
     * @default []
     */
    global: string[];
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
    language: 'markdown' | 'html',
    /**
     * Fallback author name
     *
     * @default 'null'
     */
    author: string;
  }

}
