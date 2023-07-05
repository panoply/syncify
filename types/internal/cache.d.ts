export interface Cache {
  /**
   * The last time cache was updated at (timestamp)
   */
  updated: number;
  /**
   * When the cache was created (timestamp)
   */
  created: number;
  /**
   * Page related cache records, this reference typically
   * holds `path > id` object references. Page ids are
   * cached for lookup when changes occur. The `map` object
   * holds the references and applied to model on initialization.
   */
  pages: {
    /**
     * The URI cache map location
     *
     * @default 'node_modules/.syncify/pages'
     */
    uri: string;
    /**
     * Page output name and Buffer
     */
    data: { [outputName: string]: Buffer }
  },
   /**
    * Section related cache records, this reference typically
    * holds output filename reference and used to prevent
    * duplicated sections from being written.
    */
  sections: string[];
  /**
   * JavaScript related cache records, typically source maps
   */
  script: {
    /**
     * The URI cache map location
     *
     * @default 'node_modules/.syncify/script'
     */
    uri: string;
    /**
     * Metafield pathname > id cache references.
     */
    data: { [outputName: string]: Buffer }
  },
  /**
   * Stylesheet related cache records, typically source maps
   */
  style: {
    /**
     * The URI cache map location
     *
     * @default 'node_modules/.syncify/styles'
     */
    uri: string;
    /**
     * Stylesheet output name and Buffer
     */
    data: { [outputName: string]: Buffer }
  },
  /**
   * Metafields related cache records. Metafield source maps
   * are `path > id` object references. Metafield ids are
   * cached for lookup when changes occur. The `map` object
   * holds the references and applied to model on initialization.
   */
  metafields: {
   /**
     * The URI cache reference location
     *
     * @default 'node_modules/.syncify/metafields'
     */
    uri: string,
    /**
     * Metafield pathname > id cache references.
     */
    data: { [path: string]: number }
  },
  /**
   * Specification JSON for vscode
   */
  vscode: {
    /**
     * The URI vscode reference location
     *
     * @default 'node_modules/.syncify/vscode'
     */
     uri: string;
     /**
      * vscode file maps
      */
     data: { icons?: string; }
   }
}
