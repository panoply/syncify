import type { SnippetPaths, SectionPaths } from '../shared';

export interface Paths<T = string | string[]> {
  /**
   * A glob string, glob array or rename `output → input` key/value object of files to be uploaded as snippets.
   *
   * @default 'source/snippets/*.{liquid}'
   * @example
   *
   * //OPTION 1 - Globs
   * {
   *   paths: 'source/snippets/*.liquid'
   * }
   *
   * //OPTION 2 - Globs Array
   * {
   *   paths: [
   *    'source/snippets/*.liquid',
   *    'source/snippets/xxx/*'
   *   ]
   * }
   *
   * //OPTION 3 - Rename Object
   * {
   *   paths: {
   *    // Output will be: snippets/foo.bar.liquid
   *    '[dir].[name]': 'source/snippets/foo/bar.liquid',
   *    // Output will be: snippets/quz-baz.liquid
   *    '[name]-[dir]': 'source/snippets/baz/qux.liquid'
   *   }
   * }
   *
   *
   * //OPTION 4 - Rename Object Glob Array
   * {
   *   paths: {
   *    // Output will be: snippets/foo.bar.liquid
   *    // Output will be: snippets/baz.qux.liquid
   *    '[dir].[name]': [
   *       'source/snippets/foo/bar.liquid',
   *       'source/snippets/baz/qux.liquid'
   *    ]
   *   }
   * }
   */
  snippets?: T | Record<SnippetPaths, T>
  /**
   * A glob string, glob array or rename `output → input` key/value object of files to be uploaded as sections.
   *
   * > **NOTE**
   * > This path reference will also sync section group files.
   *
   * @default 'source/sections/*.{liquid,json}'
   * @example
   *
   * //OPTION 1 - Globs
   * {
   *   paths: 'source/sections/*.liquid'
   * }
   *
   * //OPTION 2 - Globs Array
   * {
   *   paths: [
   *    'source/sections/*.liquid',
   *    'source/sections/xxx/*'
   *   ]
   * }
   *
   * //OPTION 3 - Rename Object Glob
   * {
   *   paths: {
   *    // Output will be: sections/foo.bar.liquid
   *    '[dir].[name]': 'source/sections/foo/bar.liquid',
   *    // Output will be: sections/quz-baz.liquid
   *    '[name]-[dir]': 'source/sections/baz/qux.liquid'
   *   }
   * }
   *
   * //OPTION 4 - Rename Object Glob Array
   * {
   *   paths: {
   *    // Output will be: sections/foo.bar.liquid
   *    // Output will be: sections/baz.qux.liquid
   *    '[dir].[name]': [
   *       'source/sections/foo/bar.liquid',
   *       'source/sections/baz/qux.liquid'
   *    ]
   *   }
   * }
   */
  sections?: T | Record<SectionPaths, T>;
  /**
   * A glob string or glob array of files to be uploaded as templates.
   *
   * @default 'source/templates/*.{liquid,json}'
   */
  templates?: T;
  /**
   * A glob string or glob array of files to be uploaded asas metaobject templates
   *
   * @default 'source/templates/metaobject/*.{liquid,json}'
   */
  metaobject?: T;
  /**
   * A glob string or glob array of files to be uploaded as template/customers
   *
   * @default 'source/templates/customers/*.{liquid,json}'
   */
  customers?: T;
  /**
   * A glob string or glob array of files to be uploaded as assets
   *
   * @default 'source/assets/*'
   */
  assets?: T;
  /**
   * A glob string or glob array of files to be uploaded as layouts
   *
   * @default 'source/layout/*.liquid'
   */
  layout?: T;
  /**
   * A glob string or glob array of files to be uploaded as configs, i.e, `settings_schema.json`
   *
   * @default 'source/config/.json'
   */
  config?: T;
  /**
   * A glob string or glob array of files to be uploaded as config, i.e, `en.default.json`
   *
   * @default 'source/locales/*.json'
   */
  locales?: T;
  /**
   * A glob string or glob array of files to be uploaded as **shared schema** `.json` or `.schema` files.
   *
   * @default 'source/schema/*.{json,schema}'
   */
  schema?: T;
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
  metafields?: T;
  /**
   * A glob string or glob array string to be uploaded, published and controlled as `pages`
   *
   * @default 'source/pages/*.{md,html}'
   */
  pages?: T;
  /**
   * **NOT YET AVAILABLE**
   *
   * > **This option will be available in later versions**
   *
   * ---
   *
   * @default 'redirects.yaml'
   */
  redirects?: `${string}.${'yaml' | 'yml'}`;
}
