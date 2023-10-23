import { PartialDeep } from 'type-fest';
import { Config } from './config';
import { Resource } from './$/requests';
import { File } from './$/file';

type Download = (
  this: {
    /**
     * The Shopify asset resource response
     */
    asset: Resource.Asset
    /**
     * The destination directory of the asset
     */
    output: string;
  },
  /**
   * The asset contents as Buffer.
   *
   * > Convert to a string using `content.toString()`
   */
  content: Buffer
) => (
  string |
  Buffer |
  void |
  {
    /**
     * Output the asset file to a new location
     */
    output: string;
    /**
     * Updated content of the asset
     */
    asset?: (
      string |
      Buffer |
      object |
      void
    )
  }
)

type Upload = (
  this: File,
  /**
   * The file contents as Buffer.
   *
   * > Convert to a string using `content.toString()`
   */
  content: Buffer
) => (
  string |
  Buffer |
  void |
  object
)

type Watch = (
  this: File,
  /**
   * The file contents as Buffer.
   *
   * > Convert to a string using `content.toString()`
   */
  content: Buffer
) => (
  string |
  Buffer |
  void |
  object
)

type Export = (
  this: File,
  /**
   * The file contents as Buffer.
   *
   * > Convert to a string using `content.toString()`
   */
  content: Buffer
) => (
  string |
  Buffer |
  void |
  object
)

type Build = (
  this: File,
  /**
   * The file contents as Buffer.
   *
   * > Convert to a string using `content.toString()`
   */
  content: Buffer
) => (
  string |
  Buffer |
  void |
  object
)

export declare interface Resources {
  /**
   * Import
   *
   * Invoked for every asset that is downloaded from
   * store theme. Use the `this` scope to access file
   * information.
   */
  import(callback: Download): void
  /**
   * Export
   *
   * Invoked for every asset that is downloaded from
   * store theme. Use the `this` scope to access file
   * information.
   */
  export(callback: Export): void
   /**
   * Upload
   *
   * Invoked before each file is downloaded to the
   * specified store theme. Use the `this` scope to
   * access file information.
   */
  upload(callback: Upload): void
  /**
   * Watch
   *
   * Invoked each time a file changes, after the transform
   * operation has completed but before it uploaded
   * to the specified store theme. Use the `this` scope to
   * access file information.
   */
  watch(callback: Watch): void
  /**
   * Build
   *
   * Invoked after transform operation has completed in build
   * mode. Use the `this` scope to access file information.
   */
  build(callback: Build): void
}

/**
 * **Syncify**
 *
 * The function returns a function with parameter
 * Buffer value and a `this` holding file context.
 * You can apply modifications to the file in pipeline by
 * returning a type `string` or `Buffer`.
 *
 * If you return a `boolean` value `false` syncify will not
 * process the file. An `undefined`, `void` or `true` return value
 * will allow the file to pass through without modification.
 * If the file extension is `.json` you can return an `object`.
 *
 * @example
 *
 * import syncify from '@syncify/cli'
 *
 * // USING CURRY
 *
 * // Returns a function
 * const watch = syncify('watch', {})
 *
 * // Hook into the transform
 * watch(function (content){
 *
 *  console.log(this) // Prints the file context to CLI
 *  console.log(content) // Buffer of the file
 *  console.log(content.toString()) // Convert the buffer to string
 *
 *  // Update the content of the file
 *  return 'new value'
 *
 * })
 *
 * // USING INSTANCE
 *
 * // Create an instance
 * const sync = syncify({})
 *
 * // Invoke watch mode
 * sync.watch(function(content) {})
 *
 * // Invoke build mode
 * sync.build(function(content) {})
 *
 * // Invoke download mode
 * sync.import(function(content) {})
 *
 * // Invoke export mode
 * sync.export(function(content) {})
 *
 * // Invoke upload mode
 * sync.upload(function(content) {})
 *
 * // ADDITIONAL METHODS
 *
 * syncify.clean()
 * syncify.metafields()
 * syncify.pages()
 */
export interface Syncify {
  /**
   * Import
   *
   * Invoked for every asset that is downloaded from
   * store theme. Use the `this` scope to access file
   * information.
   */
  (resource: 'import', options?: PartialDeep<Config>): (callback: Download) => void
   /**
   * Upload
   *
   * Invoked before each file is downloaded to the
   * specified store theme. Use the `this` scope to
   * access file information.
   */
  (resource: 'upload', options?: PartialDeep<Config>): (callback: Upload) => void
  /**
   * Watch
   *
   * Invoked each time a file changes, after the transform
   * operation has completed but before it uploaded
   * to the specified store theme. Use the `this` scope to
   * access file information.
   */
  (resource: 'watch', options?: PartialDeep<Config>): (callback: Watch) => void
  /**
   * Build
   *
   * Invoked after transform operation has completed in build
   * mode. Use the `this` scope to access file information.
   */
  (resource: 'build', options?: PartialDeep<Config>): (callback: Build) => void
  /**
   * Export
   *
   * Invoked after theme export has completed.
   * Use the `this` scope to access file information.
   */
  (resource: 'export', options?: PartialDeep<Config>): (callback: Build) => void
  /**
   * Usage via instance
   *
   * **NOT YET AVAILABLE**
   */
  (options?: PartialDeep<Config>): Resources
  /**
   * Bundle resources
   *
   * **NOT YET AVAILABLE**
   */
  bundle: {
    style(options?: any): Promise<any>;
    script(options?: any): Promise<any>;
    svg(options?: any): Promise<any>;
    json(options?: any): Promise<any>;
    image(options?: any): Promise<any>;
    pages(options?: any): Promise<any>;
  };
  /**
   * Theme resource
   *
   * **NOT YET AVAILABLE**
   */
  themes: {
    push(file: string | string[], options?: any): Promise<any>;
    pull(file: string | string[], options?: any): Promise<any>;
    merge(file: string | string[], options?: any): Promise<any>;
    delete(file: string | string[], options?: any): Promise<any>;
    query(file: string | string[], options?: any): Promise<any>
  };
  /**
   * Assets resource
   *
   * **NOT YET AVAILABLE**
   */
  assets: {
    push(file: string | string[], options?: any): Promise<any>;
    pull(file: string | string[], options?: any): Promise<any>;
    merge(file: string | string[], options?: any): Promise<any>;
    delete(file: string | string[], options?: any): Promise<any>;
    query(file: string | string[], options?: any): Promise<any>
  };
  /**
   * Files API resource
   *
   * **NOT YET AVAILABLE**
   */
  files: {
    push(file: string | string[], options?: any): Promise<any>;
    pull(file: string | string[], options?: any): Promise<any>;
    merge(file: string | string[], options?: any): Promise<any>;
    delete(file: string | string[], options?: any): Promise<any>;
    query(file: string | string[], options?: any): Promise<any>
  };
  /**
   * Metafields resource
   *
   * **NOT YET AVAILABLE**
   */
  metafields: {
    push(file: string | string[], options?: any): Promise<any>;
    pull(file: string | string[], options?: any): Promise<any>;
    merge(file: string | string[], options?: any): Promise<any>;
    delete(file: string | string[], options?: any): Promise<any>;
    query(file: string | string[], options?: any): Promise<any>
  };
  /**
   * Pages resource
   *
   * **NOT YET AVAILABLE**
   */
  pages: {
    push(file: string, options?: any): Promise<any>;
    pull(file: string, options?: any): Promise<any>;
    merge(file: string, options?: any): Promise<any>;
    delete(file: string, options?: any): Promise<any>;
    query(file: string, options?: any): Promise<any>
  };
  /**
   * Update the configuration
   *
   * **NOT YET AVAILABLE**
   */
  config(options: Config): void
  /**
   * Clean the output directory
   *
   * **NOT YET AVAILABLE**
   */
  clean(): Promise<void>;
  /**
   * Clean the output directory
   *
   * **NOT YET AVAILABLE**
   */
  spawn(options: any): Promise<void>
}
