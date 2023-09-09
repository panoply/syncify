import { Requests, Resource } from './requests';

export interface Cache {
  /**
   * The Syncify version - cache will be purged and reset when changed
   */
  version?: string;
  /**
   * The last time cache was updated at (timestamp)
   */
  updated?: number;
  /**
   * The last time a build was executed
   */
  lastBuild?: number;
  /**
   * The last time a build was executed
   */
  lastResource?: string;
  /**
   * The theme version
   */
  themeVersion?: string;
 /**
  * Cache Build File
  *
  * @default 'node_modules/.syncify/build.map'
  */
  uri?: string;
  /**
   * Error Cache
   */
  errors?: {
    uri?: string;
    files?: string[];
  }
  /**
   * Sourcemap directories for transforms
   */
  sourcemaps?: {
     /**
     * JavaScript sourcemaps
     *
     * @default 'node_modules/.syncify/sourcemaps/script/'
     */
     script: string;
     /**
      * Stylesheet sourcemaps
      *
      * @default 'node_modules/.syncify/sourcemaps/script/'
      */
     style: string;
  }
  /**
   * Output > Input Source Path Mapping
   *
   * Holds reverse references between input and output
   * directories. Used when executing `upload` mode.
   *
   * > **NOTE**
   * >
   * > This cache reference will update each time build mode runs.
   */
  maps?: {
    /**
     * The output path pointing to input path
     *
     * `key`
     * - _The output path_
     *
     * `value`
     * - _The input path_
     */
    [outputFileURI: string]: string;
  },
  /**
   * Page related cache records, this reference typically
   * holds `path > id` object references. Page ids are
   * cached for lookup when changes occur.
   */
  pages?: {
    /**
     * The store domain name containing the pages, eg: `syncify` would
     * equate to `syncify.myshopify.com`.
     */
    [myshopifyDomain: string]: {
      /**
       * The page id, as property and the page payload reference as value.
       */
      [pageId: number]: Requests.Page
    }
  },
  /**
   * Metafields related cache records. Metafield source maps
   * are `path > id` object references. Metafield ids are
   * cached for lookup when changes occur. The `map` object
   * holds the references and applied to model on initialization.
   */
  metafields?: {
    /**
     * The store domain name containing the pages, eg: `syncify` would
     * equate to `syncify.myshopify.com`.
     */
    [myshopifyDomain: string]: {
      /**
       * Metafield pathname > id cache references..
       */
      [inputFileUri: string]: Requests.Page
    }
  }

}
