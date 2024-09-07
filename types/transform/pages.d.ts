import { Tester } from 'anymatch';
import { Merge } from 'type-fest';
import { PageMetafield } from '../$/requests';
import { LiteralString } from 'types/shared';

/**
 * **Markdown > HTML**
 *
 * Syncify uses [markdown-it](https://github.com/markdown-it/markdown-it) when
 * converting markdown to HTML (export).
 *
 * **HTML > Markdown**
 *
 * Syncify uses [Turndown](https://github.com/mixmark-io/turndown) when
 * converting HTML to HTML (import).
 */
export namespace Markdown {
  /**
   * Syncify uses [markdown-it](https://github.com/markdown-it/markdown-it) under
   * the hood for transforming markdown pages into HTML. The options provided here
   * will be passed onto markdown-it.
   */
  export interface Export {
    /**
     * Enable HTML tags in source
     *
     * @default true
     */
    html: boolean;
    /**
     * // Use `/` to close single tags (<br />), defaults to `false`.
     * This is only for full CommonMark compatibility.
     *
     * @default false
     */
    xhtmlOut: boolean;
    /**
     * Convert '\n' in paragraphs into `<br>`, defaults to `true`
     *
     * @default true
     */
    breaks: boolean;
    /**
     * CSS language prefix for fenced blocks. Can be useful for external
     * highlighters, defaults to `language-`
     *
     * @default 'language-'
     */
    langPrefix: string;
    /**
     * Autoconvert URL-like text to links, defaults to `false`
     *
     * @default false
     */
    linkify: boolean;

    /**
     * Enable some language-neutral replacement + quotes beautification (defaults to `false`)
     * For the full list of replacements, see;
     * https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
     *
     * @default false
     */
    typographer: boolean;
    /**
     * Double + single quotes replacement pairs, when typographer enabled,
     * and smartquotes on. Could be either a String or an Array.
     * For example, you can use '«»„“' for Russian, '„“‚‘' for German,
     * and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
     */
    quotes: string;
  }

  /**
   * Syncify uses [Turndown](https://github.com/mixmark-io/turndown) under
   * the hood to convert pages imported from stores into Markdown. The
   * `language` option **MUST** be set to `markdown`.
   */
  export interface Import {
    /**
     * Heading style for conversion. This defaults to `atx`.
     */
    headingStyle?: LiteralString<'setext' | 'atx'>;
    /**
     * Horizontal Rules, defaults to `***`
     */
    hr?: LiteralString<'***' | '---' | '___'>;
    /**
     * Bullet list markers, defaults to `-`
     */
    bulletListMarker?: LiteralString<'-' | '+' | '*'>
    /**
     * Code blocks, defaults to `fenced`
     */
    codeBlockStyle?: LiteralString<'indented' | 'fenced'>;
    /**
     * EM Delimiter (ie: Italic), defaults to `_`
     */
    emDelimiter?: LiteralString<'_' | '*'>;
    /**
     * Code block fence style, defaults to ```
     */
    fence?: LiteralString<'```' | '~~~' | undefined>;
    /**
     * Strong Delimiter (ie: bold), defaults to `**`
     */
    strongDelimiter?: LiteralString<'__' | '**' | undefined>;
    /**
     * Link style, defaults to `inlined`
     *
     * _Don't fuck around with this, leave it as `inlined`_
     */
    linkStyle?: LiteralString<'inlined' | 'referenced' | undefined>;
    /**
     * Link style reference, defaults to `full`
     *
     * _Don't fuck around with this, leave it as `full`_
     */
    linkReferenceStyle?: LiteralString<'full' | 'collapsed' | 'shortcut' | undefined>;
  }
}

/**
 * Static Page publishing
 */
export interface PagesConfig {
  /**
   * Whether the pulled page content should be written as HTML or have the HTML converted to Markdown.
   *
   * @default 'html'
   */
  language?: 'markdown' | 'html',
  /**
   * Fallback author name
   *
   * @default ''
   */
  author?: string;
  /**
   * Import HTML > Markdown Conversion Options
   */
  export?: Markdown.Import;
  /**
   * **HTML → Markdown**
   *
   * Import markup conversion settings
   */
  import?: Markdown.Import;

}

/* -------------------------------------------- */
/* INTERNAL USE                                 */
/* -------------------------------------------- */

/**
 * **Internal Use**
 *
 * Describes the frontmatter of a page file
 */
export interface PageFrontmatter {
  /**
   * Page title
   */
  title?: string;
  /**
   * Page id reference
   */
  id?: number;
  /**
   * Page handle
   */
  handle?: string;
  /**
   * The template suffix
   */
  template?: string;
    /**
   * The template suffix (fallback if user passed explicit ref)
   */
  template_suffix?: string;
  /**
   * The author of the page
   */
  author?: string;
  /**
   * `markdown-it` option
   *
   * Whether or not HTML tags in source are enabled
   */
  html?: boolean;
  /**
   * Whether or not the page should be published
   */
  published?: boolean;
  /**
   * Write the following metafields to the page
   */
  metafields?: PageMetafield[]
  /**
   * Catches invalid reference
   */
  metafield?: PageMetafield[]
  /**
   * `markdown-it` option
   *
   * Applies `linkify` overwrite (Autoconvert URL-like text to links)
   */
  links?: boolean;
  /**
   * `markdown-it` option
   *
   * Applies `breaks` overwrite (Convert '\n' in paragraphs into `<br>`)
   */
  breaks?: boolean;
}

/**
 * **Internal Use**
 */
export type PageBundle = Merge<PagesConfig, {
  /**
   * Import configuration for Turndown
   */
  import: Markdown.Import;
  /**
   * Export configuration for Markdown-it
   */
  export: Markdown.Export;
  /**
   * Whether or not `safe` is enabled
   */
  safeSync: boolean;
  /**
   * Global passthrough;
   */
  global: RegExp;
  /**
   * Anymatch pattern
   */
  paths?: Tester;
}>
