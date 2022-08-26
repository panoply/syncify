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
     * Enable HTML tags in source, defaults to `true`
     */
    html: boolean;
    /**
     * // Use `/` to close single tags (<br />), defaults to `false`.
     * This is only for full CommonMark compatibility.
     */
    xhtmlOut: boolean;
    /**
     * Convert '\n' in paragraphs into `<br>`, defaults to `true`
     */
    breaks: boolean;
    /**
     * CSS language prefix for fenced blocks. Can be useful for external
     * highlighters, defaults to `language-`
     */
    langPrefix: string;
    /**
     * Autoconvert URL-like text to links, defaults to `false`
     */
    linkify: boolean;

    /**
     * Enable some language-neutral replacement + quotes beautification (defaults to `false`)
     * For the full list of replacements, see;
     * https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
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
    headingStyle?: 'setext' | 'atx';
    /**
     * Horizontal Rules, defaults to `***`
     */
    hr?: '***' | '---' | '___';
    /**
     * Bullet list markers, defaults to `-`
     */
    bulletListMarker?: '-' | '+' | '*'
    /**
     * Code blocks, defaults to `fenced`
     */
    codeBlockStyle?: 'indented' | 'fenced';
    /**
     * EM Delimiter (ie: Italic), defaults to `_`
     */
    emDelimiter?: '_' | '*';
    /**
     * Code block fence style, defaults to ```
     */
    fence?: '```' | '~~~' | undefined;
    /**
     * Strong Delimiter (ie: bold), defaults to `**`
     */
    strongDelimiter?: '__' | '**' | undefined;
    /**
     * Link style, defaults to `inlined`
     *
     * _Don't fuck around with this and leave it as `inlined`_
     */
    linkStyle?: 'inlined' | 'referenced' | undefined;
    /**
     * Link style reference, defaults to `full`
     *
     * _Don't fuck around with this and leave it as `full`_
     */
    linkReferenceStyle?: 'full' | 'collapsed' | 'shortcut' | undefined;
  }
}
