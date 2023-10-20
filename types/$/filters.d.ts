export interface Filters {
  /**
   * Theme Asset filters
   *
   * @example
   * '--filter assets/*'
   */
  assets?: string[];
  /**
   * Theme Config filters
   *
   * @example
   * '--filter config/*'
   */
  config?: string[];
  /**
   * Theme Layout filters
   *
   * @example
   * '--filter layout/*'
   */
  layout?: string[];
  /**
   * Theme Locales filters
   *
   * @example
   * '--filter locales/*'
   */
  locales?: string[];
  /**
   * Theme Templates filters
   *
   * @example
  * '--filter assets/*'
  */
  templates?: string[];
  /**
   * Theme Customers filters
   *
   * @example
   * '--filter assets/*'
   */
  customers?: string[];
  /**
   * Theme Snippets filters
   *
   * @example
   * '--filter snippets/*'
   */
  snippets?: string[];
  /**
   * Theme sections filters
   *
   * @example
   * '--filter sections/*'
   */
  sections?: string[];
  /**
   * Store Metafields filters
   *
   * @example
   * '--filter assets/*'
   */
  metafields?: string[];
  /**
   * Store pages filters
   *
   * @example
   * '--filter pages/*'
   */
  pages?: string[];
  /**
   * Terse filters
   *
   * @example
   * '--filter terse:script'
   * '--filter terse:style'
   * '--filter terse:views'
   */
  terse?: string[];
}
