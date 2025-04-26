import type { Resource } from './requests';
import type { SchemaTemplates, SettingsSchema } from './schema';
import type { LiteralUnion } from 'type-fest';

export namespace Cache {

  /**
   * Version Exports
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/versions'
   */
  export type Versions = {
    /**
     * The input file path as key and reference of value
     *
     * > `key` - _The output path_
     * >
     * > `value` - _The input path_
     */
    [version: string]: {
      /**
       * Local path (`null`) if no local copy detected
       *
       * @example
       * '/Users/sissel/.syncify/eb4e712f2f3970b7/versions/1.0.0'
       */
      local: string;
      /**
       * Remote url (`null`) if none determined.
       */
      remote: string;
    }
  }

  /**
   * File Checksum hashes
   *
   * Checksum cache references use a `key > value` structure. Keys hold reference
   * to the input absolute path resolutions of files within `input` directories.
   * The values are checksum hashes that are stored and compared during transforms
   * or other operations related to diffing.
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/checksum'
  */
  export type Checksum = {
    /**
     * The input file path as key and reference of value
     *
     * > `key` - _The input path_
     * >
     * > `value` - _The output path_
     */
    [inputPath: string]: string;
  }

  /**
   * Output > Input and Input > Output (Source Path Mapping)
   *
   * Holds forward and reverse references between input and output directories.
   * This map also contains key based mapping references, where the output `dir/filename`
   * will point to the **input** locations. This reference is specifically for pull operations.
   *
   * > **NOTE**
   * >
   * > This cache reference will update each time build mode runs.
   *
   * @example
   * Map() {
   *  // input > output
   *  '<uri>/source/sections/a.liquid': '<uri>/theme/sections/a.liquid'
   *  // output > input (Reverse)
   *  '<uri>/theme/sections/a.liquid': '<uri>/source/sections/a.liquid'
   *  // output key > input (Reverse)
   *  'sections/a.liquid': '<uri>/theme/sections/a.liquid'
   * }
   */
  export type Paths = Map<string, string>;

  /**
   * Output > Input and Input > Output (Source Path Mapping)
   *
   * Holds forward and reverse references between input and output directories.
   *
   * > **NOTE**
   * >
   * > This cache reference will update each time build mode runs.
   *
   * @example
   * Map() {
   *  'sections/a.liquid': '<uri>/theme/sections/a.liquid'
   *  '<uri>/theme/sections/a.liquid': '<uri>/source/sections/a.liquid'
   * }
   */
  export type Writes = Map<string, string>;

  /**
   * Shared Schema path mappings
   *
   * `Set<string>`
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/sections'
   */
  export type Sections = {
    /**
     * The input path and a `Set` of
     */
    [inputPath: string]: Set<string>;

  }

  /**
   * Shared Schema
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/schema'
   */
  export type Schema = {
    /**
     * The `key` is the shared schema full URI.
     * The `value` is a `Set<string>` of section URI's which reference the shared schema.
     */
    [inputPath: string]: Set<string>;
  }

  /**
   * Maintains a cache reference of remote JSON Template
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/templates'
   */
  export type Templates = {
    /**
     * The store domain name containing the templates, eg: `syncify` would
     * equate to `syncify.myshopify.com`.
     *
     * The input (`src`) file path as key and the remote JSON data from the theme
     */
    [storeName: string]: {
      /**
       * The theme id
       */
      [themeId: string]: {
        /**
         * The template uri path
         */
        [templateUri: string]: SchemaTemplates;

      }
    }
  }

  /**
   * Theme config files (`settings_data.json`) remote sources
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/config'
   */
  export type Settings = {
    /**
     * The store domain name containing the theme config, eg: `syncify` would
     * equate to `syncify.myshopify.com`.
     */
    [storeName: string]: {
      /**
       * The theme id, as **key** and the `settings_data.json` and value
       */
      [themeId: number]: SettingsSchema;

    };
  }

  /**
   * Page related cache records, this reference typically
   * holds `path > id` object references. Page ids are
   * cached for lookup when changes occur.
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/pages'
   */
  export type Pages = {
    /**
     * The store domain name containing the pages, eg: `syncify` would
     * equate to `syncify.myshopify.com`.
     *
     * `Map<id, Page>`
     *
     * The page id, as property and the page payload reference as value.
     */
    [storeName: string]: {
      /**
       * The page id, as **key** and the `settings_data.json` and value
       */
      [pageId: number]: Resource.Page;
    }
  }

  /**
   * Metafields related cache records. Metafield source maps
   * are `path > id` object references. Metafield ids are
   * cached for lookup when changes occur. The `map` object
   * holds the references and applied to model on initialization.
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/metafields'
   */
  export type Metafields = {
    /**
     * Metafield pathname > id cache references.
     *
     * `Map<path, Metafield>`
     *
     * The input (`src`) file path as key and the remote JSON data from the metafield
     */
    [storeName: string]: {
      /**
       * The input path of the metafield
       */
      [inputPath: number]: Resource.Metafield;
    }
  }

  /**
   * Cache Path Models
   *
   * The Cache store object
   */
  export type PathModel = {
    /**
     * URI Paths
     */
    paths: Paths;
    /**
     * Hash Checksums
     */
    checksum: Checksum;
    /**
     * The `key` is the section file full URI.
     * The `value` is a `Set<string>` of shared schema references contained within.
     *
     * This is the inverse of the `schema` Path model
     *
     * @example
     *
     * // <uri> represents the full resolved path
     *
     * {
     *  '<uri>/sections/header.liquid': Set(2) {
     *     '<uri>/schema/foo.schema',
     *     '<uri>/schema/baz.schema',
     *   },
     *  '<uri>/sections/footer.liquid': Set(2) {
     *     '<uri>/schema/bar.schema',
     *   },
    *  '<uri>/sections/banner.liquid': Set(2) {
    *     '<uri>/schema/bar.schema',
    *   },
     *  '<uri>/sections/hero.liquid': Set(2) {
     *     '<uri>/schema/bar.schema',
     *     '<uri>/schema/baz.schema'
     *   }
     * }
     */
    sections: Sections;
    /**
     * The `key` is the shared schema full URI.
     * The `value` is a `Set<string>` of section URI's which reference the shared schema.
     *
     * @example
     *
     * // <uri> represents the full resolved path
     *
     * {
     *  '<uri>/schema/foo.schema': Set(2) {
     *     '<uri>/sections/header.liquid',
     *     '<uri>/sections/footer.liquid'
     *   },
     *  '<uri>/schema/bar.schema': Set(2) {
     *     '<uri>/sections/banner.liquid'
     *   },
     *  '<uri>/schema/baz.schema': Set(2) {
     *     '<uri>/sections/header.liquid',
     *     '<uri>/sections/footer.liquid',
     *     '<uri>/sections/hero.liquid'
     *   }
     * }
     */
    schema: Schema;
  }

  /**
   * Cache Config File
   *
   * Hold data relating to the syncify configuration file
   */
  export interface ConfigModel {
    /**
     * The `syncify.config` file checksum
     */
    checksum: string;
    /**
     * The fully resolved input path to syncify config
     */
    input: string;
  }

  /**
   * Cache Path Models
   *
   * The Cache store object
   */
  export interface StoreModel {
    /**
     * Store `settings_data.json` and `settings_schema.json`
     */
    settings: Settings;
    /**
     * Store template JSON
     */
    templates: Templates;
    /**
     * Store pages
     */
    pages: Pages;
    /**
     * Store metafields
     */
    metafields: Metafields;
  }

  /**
   * Cache Model
   *
   * This is data structure that will be generated during define
   * operation and assigned to project `$.cache`
   */
  export interface Model {
    /**
     * URI Paths
     */
    paths: Paths;
    /**
     * Hash Checksums
     */
    checksum: Checksum;
    /**
     * The `key` is the section file full URI.
     * The `value` is a `Set<string>` of shared schema references contained within.
     *
     * This is the inverse of the `schema` Path model
     *
     * @example
     *
     * // <uri> represents the full resolved path
     *
     * {
     *  '<uri>/sections/header.liquid': Set(2) {
     *     '<uri>/schema/foo.schema',
     *     '<uri>/schema/baz.schema',
     *   },
     *  '<uri>/sections/footer.liquid': Set(2) {
     *     '<uri>/schema/bar.schema',
     *   },
    *  '<uri>/sections/banner.liquid': Set(2) {
    *     '<uri>/schema/bar.schema',
    *   },
     *  '<uri>/sections/hero.liquid': Set(2) {
     *     '<uri>/schema/bar.schema',
     *     '<uri>/schema/baz.schema'
     *   }
     * }
     */
    sections: Sections;
    /**
     * The `key` is the shared schema full URI.
     * The `value` is a `Set<string>` of section URI's which reference the shared schema.
     *
     * @example
     *
     * // <uri> represents the full resolved path
     *
     * {
     *  '<uri>/schema/foo.schema': Set(2) {
     *     '<uri>/sections/header.liquid',
     *     '<uri>/sections/footer.liquid'
     *   },
     *  '<uri>/schema/bar.schema': Set(2) {
     *     '<uri>/sections/banner.liquid'
     *   },
     *  '<uri>/schema/baz.schema': Set(2) {
     *     '<uri>/sections/header.liquid',
     *     '<uri>/sections/footer.liquid',
     *     '<uri>/sections/hero.liquid'
     *   }
     * }
     */
    schema: Schema;
    /**
     * Store `settings_data.json` and `settings_schema.json`
     */
    settings: Settings;
    /**
     * Store template JSON
     */
    templates: Templates;
    /**
     * Store pages
     */
    pages: Pages;
    /**
     * Store metafields
     */
    metafields: Metafields;
    /**
     * URI Paths
     *
     * Holds absolute paths to all the persisted cache stores
     */
    uri: {
      /**
       * The absolute URI to the {@link Paths} cache file
       *
       * @example
       * '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/paths'
       */
      paths: string;
      /**
       * The absolute URI to the {@link Checksum} cache file
       *
       * @example
       * '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/checksum'
       */
      checksum: string;
      /**
       * The absolute URI to the {@link Sections} cache file
       *
       * @example
       *  '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/sections'
       */
      sections: string;
      /**
       * The absolute URI to the {@link Schema} cache file
       *
       * @example
       *  '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/schema'
       */
      schema: string;
      /**
       * The absolute URI to the {@link Settings} cache file
       *
       * @example
       * '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/settings'
       */
      settings: string;
      /**
       * The absolute URI to the {@link Templates} cache file
       *
       * @example
       *  '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/templates'
       */
      templates: string;
      /**
       * The absolute URI to the {@link Pages} cache file
       *
       * @example
       *  '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/pages'
       */
      pages: string;
      /**
       * The absolute URI to the {@link Metafields} cache file
       *
       * @example
       * '/Users/sissel/.syncify/eb4e712f2f3970b7/cache/metafields'
       */
      metafields: string;

    };
  }

  export type UriKeys = LiteralUnion<keyof Model['uri'], string>;

  /**
   * Store Keys
   *
   * Literal union of the cache file `.cbgz` names.
   */
   export type StoreKeys = LiteralUnion<keyof StoreModel, string>;

  /**
   * Path Keys
   *
   * Literal union of the cache file `.cbgz` names.
   */
   export type PathKeys = LiteralUnion<keyof PathModel, string>;

  /**
   * Keys
   *
   * Literal union of the cache file `.cbgz` names.
   */
  export type Keys = LiteralUnion<keyof Model, string>;

}
