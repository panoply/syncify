export interface Paths<T = string | string[]> {
  /**
   * An array list of files to be uploaded as snippets
   *
   * @default 'source/snippets'
   */
  snippets?: T | Record<SnippetSeparators, T>
  /**
   * An array list of files to be uploaded as sections
   *
   * @default 'source/sections'
   */
  sections?: T | Record<SnippetSeparators, T>
  /**
   * An array list of files to be uploaded as assets
   *
   * @default 'source/assets'
   */
  assets?: T | {
    /**
     * An array list of files to be uploaded as assets
     *
     * @default 'source/assets'
     */
    input: T
  };
  /**
   * An array list of files to be uploaded as layouts
   *
   * @default 'source/layout'
   */
  layout?: T | {
    /**
     * An array list of files to be uploaded as assets
     *
     * @default 'source/assets'
     */
    input: T
  };
  /**
   * An array list of files to be uploaded as templates
   *
   * @default 'source/templates'
   */
  templates?: T | Record<TemplateSeparators, T>
  /**
   * An array list of files to be uploaded as metaobject templates
   *
   * @default 'source/templates/metaobject'
   */
  metaobject?: T | {
    /**
     * An array list of files to be uploaded as metaobject templates
     *
     * @default 'source/templates/metaobject'
     */
    input: T
  };
  /**
   * An array list of files to be uploaded as template/customers
   *
   * @default 'source/templates/customers'
   */
  customers?: T | {
    /**
     * An array list of files to be uploaded as template/customers
     *
     * @default 'source/templates/customers'
     */
    input: T
  };
  /**
   * An array list of files to be uploaded as configs, i.e: `settings_schema.json`
   *
   * @default 'source/config/.json'
   */
  config?: T | {
    /**
     * An array list of files to be uploaded as config, i.e: `settings_schema.json`
     *
     * @default 'source/config/*.json'
     */
    input: T
  };
  /**
   * An array list of files to be uploaded as config, i.e: `en.default.json`
   *
   * @default 'source/locales/*.json'
   */
  locales?: T | {
    /**
     * An array list of files to be uploaded as config, i.e: `en.default.json`
     *
     * @default 'source/locales/*.json'
     */
    input: T
  };
  /**
   * An array list of shared section schema `.json` or `.schema` files.
   *
   * @default 'source/schema/*.{json,schema}'
   */
  schema?: T | {
    /**
     * An array list of shared section schema `.json` or `.schema` files.
     *
     * @default 'source/schema/*.{json,schema}'
     */
    input: T
  };
  /**
   * **NOT YET AVAILABLE**
   *
   * > **This option will be available in later versions**
   *
   * ---
   *
   * The resolved `metafields` directory path
   *
   * @default 'source/metafields/'
   */
  metafields?: T | {
    /**
     *
     * The resolved `metafields` directory path
     *
     * @default 'source/metafields/'
     */
    input: T
  };
  /**
   * The resolved `pages` directory path
   *
   * @default 'source/pages'
   */
  pages?: T | {
    /**
     *
     * The resolved `pages` directory path
     *
     * @default 'source/pages'
     */
    input: T
  };
  /**
   * **NOT YET AVAILABLE**
   *
   * > **This option will be available in later versions**
   *
   * ---
   *
   * @default 'redirects.yaml'
   */
  redirects?: `${string}.${'yaml' | 'yml'}` | {
    /**
     *
     * The resolved `pages` directory path
     *
     * @default 'source/pages'
     */
    input: `${string}.${'yaml' | 'yml'}`
  };
}
