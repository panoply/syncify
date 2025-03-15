import type { SchemaBlocks, SchemaSettings, SharedSchema } from './schema';

export type SharedSection = Map<string, {
  uri: string;
  description: string | string[] | { [key: string]: string | string[] },
  schema: Record<string, (
    | SchemaSettings[]
    | SchemaBlocks[]
    | SchemaSettings
    | SchemaBlocks
  )>;
}>

export interface SectionBundle {
  /**
   * Section Schema which contains Shared Schema occurances. This is a getter reference.
   * The `key` in the object represents the full **input** URI path pointing to shared schema file.
   * The `Set<string>` value contains a list of URI paths to sections referencing the shared schema file.
   *
   * @default
   * null
   *
   * @example
   * {
   *   schema: {
   *     '~user/project/source/schema/example.schema': Set<[
   *        '~user/project/source/sections/foo.liquid',
   *        '~user/project/source/sections/bar.liquid',
   *        '~user/project/source/sections/baz.liquid'
   *     ]>
   *  }
   * }
   */
  get schema(): Record<string, Set<string>>;
  /**
   * Sections within JSON templates. JSON templates refer to sections by filename
   * and are referenced within the `sections > type` value. Each key in a template JSON
   * file will be used appended to the id value of the sections HTML element Shopify generates,
   * for example:
   *
   * ```jsonc
   * {
   *   "order": ["foo"],
   *   "sections": {
   *     "foo": {
   *       "type": "file" // points to sections/file.liquid
   *     }
   *   }
   * }
   * ```
   *
   * When Shopify generates the Section, the HTML element and id value will be something like:
   *
   * ```html
   * <div
   *   id="shopify-section-template--16871280673009__foo"
   *   class="shopify-section">
   * </div>
   * ```
   *
   * When running HOT reloads in watch mode, the `id` value of sections are used to during the
   * diffing process to determine which section to morph and update. Based on the above, the HOT
   * client would break the `id` value up into 2 parts:
   *
   * ```js
   * 'shopify-section-template--16871280673009__foo'
   *
   * {
   *   id: 16871280673009,
   *   name: 'foo'
   * }
   * ```
   *
   * The reason we need the name reference is because the websocket will send its identifier in the
   * payload. The document will query for the above section in the DOM and then proceed to trigger
   * HOT swap. Because the template sections can appropriate different naming, there would be no
   * way to detect the above section in the DOM without having context of the name used within
   * template JSON files.
   *
   * The model uses a `{ [sectionURI: string]: Set()[ templateURI ] }` structure. We go about determining
   * the template to query by referencing the `$.hot.url` value that will update on each navigation.
   *
   * @example
   * {
   *   template: {
   *    '~user/project/source/sections/foo.liquid': {
   *       'index': ['bar'],
   *       'product': ['baz'],
   *    }
   *  }
   * }
   */
  template: Record<string, { [template: string]: string[] }>;
  /**
   * Shared Schema parsed file.
   *
   * The `Map` key is the shared schema **basename** without extension as per the `$ref` identifier.
   */
  shared: Map<string, {
    /**
     * The shared schema full resolved uri path
     */
    uri: string;
    /**
     * The parsed JSON schema
     */
    schema: SharedSchema;
  }>
}
