import type { LiteralUnion } from 'type-fest';
import type { Resource } from './requests';
import type { JSONTemplatesSchema, SettingsSchema } from '../internal';

export namespace Cache {

   /**
    * Build Cache
    *
    * @see 'node_modules/.cache/syncify/build.bin'
    */
  export interface Build {
    /**
     * The Last known Syncify version
     */
    syncifyVersion: string;
    /**
     * The current theme version
     */
    themeVersion: string;
    /**
     * The cache expiry
     */
    expires: number;
    /**
     * The last time a build was executed
     */
    lastBuild: number;
    /**
     * List of layouts where hot snippet exists
     */
    hotSnippet: string[]
  }

  /**
   * Version Exports
   *
   * @see 'node_modules/.cache/syncify/versions.bin'
   */
  export interface Versions {
    /**
     * The input file path as key and reference of value
     *
     * `key`
     * - _The output path_
     *
     * `value`
     * - _The input path_
     */
    [version: string]: {
      /**
       * Local path (`null`) if no local copy detected
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
   * @see 'node_modules/.cache/syncify/checksum.bin'
  */
  export interface Checksum {
    /**
     * The input file path as key and reference of value
     *
     * `key`
     * - _The output path_
     *
     * `value`
     * - _The input path_
     */
    [inputPath: string]: string;
  }

  /**
   * Output > Input (Source Path Mapping)
   *
   * Holds reverse references between input and output
   * directories. Used when executing `upload` mode.
   *
   * > **NOTE**
   * >
   * > This cache reference will update each time build mode runs.
   *
   * @see 'node_modules/.cache/syncify/paths.bin'
   */
  export interface Paths {
    /**
     * The output path pointing to input path
     *
     * `key`
     * - _The output path_
     *
     * `value`
     * - _The input path_
     */
    [outputPath: string]: string;
  }

  /**
   * Shared Schema path mappings
   *
   * `Set<string>`
   *
   * @see 'node_modules/.cache/syncify/sections.bin'
   */
  export interface Sections {
    [inputPath: string]: Set<string>;
  }

  /**
   * Shared Schema
   *
   * @see 'node_modules/.cache/syncify/schema.bin'
   */
  export interface Schema {
    /**
     * The `key` is the shared schema full URI.
     * The `value` is a `Set<string>` of section URI's which reference the shared schema.
     */
    [inputPath: string]: Set<string>;
  }

  /**
   * Maintains a cache reference of remote JSON Template
   *
   * @see 'node_modules/.cache/syncify/templates.bin'
   */
  export interface Templates {
    /**
     * The store domain name containing the templates, eg: `syncify` would
     * equate to `syncify.myshopify.com`.
     *
     * `Map<path, TemplateSchema>`
     *
     * The input (`src`) file path as key and the remote JSON data from the theme
     */
    [storeName: string]: {
      /**
       * The theme id
       */
      [themeId: string]: {

        /**
         * The input path
         */
        [inputPath: string]: JSONTemplatesSchema;

      }
    }
  }

  /**
   * Theme config files (`settings_data.json`) remote sources
   *
   * @see 'node_modules/.cache/syncify/config.bin'
   */
  export interface Settings {
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
   * @see 'node_modules/.cache/syncify/pages.bin'
   */
  export interface Pages {
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
   * @see 'node_modules/.cache/syncify/metafields.bin'
   */
  export interface Metafields {
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
  export interface PathModel {
    paths: Paths;
    checksum: Checksum;
    /**
     * The `key` is the section file full URI.
     * The `value` is a `Set<string>` of shared schema references contained within
     */
    sections: Sections;
    /**
     * The `key` is the shared schema full URI.
     * The `value` is a `Set<string>` of section URI's which reference the shared schema.
     */
    schema: Schema;
  }

  /**
   * Cache Path Models
   *
   * The Cache store object
   */
  export interface StoreModel {
    settings: Settings;
    templates: Templates;
    pages: Pages;
    metafields: Metafields;
  }

  /**
   * Cache Model Store
   *
   * The Cache store object
   */
  export interface Model extends PathModel, StoreModel {
    build: Build;
    uri: {
      build: string;
      paths: string;
      checksum: string;
      sections: string;
      schema: string;
      settings: string;
      templates: string;
      pages: string;
      metafields: string;
    };
  }

  /**
   * Store Keys
   *
   * Literal union of the cache file `.bin` names.
   */
   export type StoreKeys = LiteralUnion<keyof StoreModel, string>;

  /**
   * Path Keys
   *
   * Literal union of the cache file `.bin` names.
   */
   export type PathKeys = LiteralUnion<keyof PathModel, string>;

  /**
   * Keys
   *
   * Literal union of the cache file `.bin` names.
   */
  export type Keys = LiteralUnion<keyof Model, string>;

}
