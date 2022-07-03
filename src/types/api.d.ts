import { PartialDeep } from 'type-fest';
import { IConfig } from './config';
import { IAsset, Resource } from './requests';
import { IFile } from './file';

type Download = (
  this: {
    /**
     * The Shopify asset resource response
     */
    asset: IAsset
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
  this: IFile,
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
  this: IFile,
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
  this: IFile,
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
   * Download
   *
   * Invoked for every asset that is downloaded from
   * store theme. Use the `this` scope to access file
   * information.
   */
  download(callback: Download): void
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
 * Syncify Utilities
 *
 * A couple  of utilities which are helpful when working
 * with external build tools or using Syncify within a script.
 */
export namespace utils {

  /**
   * Conditional check of the current environment.
   */
  export function env(env: 'dev' | 'prod'): boolean

  /**
   * Condition check of the current running resource.
   */
  export function resource(resource: 'watch' | 'upload' | 'download'): boolean

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
 * import syncify from '@liquify/syncify'
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
 * sync.download(function(content) {})
 *
 * // Invoke upload mode
 * sync.upload(function(content) {})
 *
 * // METHODS
 *
 * syncify.clean()
 * syncify.vsc()
 * syncify.metafields()
 * syncify.pages()
 */
export interface Syncify {
  /**
   * Download
   *
   * Invoked for every asset that is downloaded from
   * store theme. Use the `this` scope to access file
   * information.
   */
  (resource: 'download', options?: PartialDeep<IConfig>): (callback: Download) => void
   /**
   * Upload
   *
   * Invoked before each file is downloaded to the
   * specified store theme. Use the `this` scope to
   * access file information.
   */
  (resource: 'upload', options?: PartialDeep<IConfig>): (callback: Upload) => void
  /**
   * Watch
   *
   * Invoked each time a file changes, after the transform
   * operation has completed but before it uploaded
   * to the specified store theme. Use the `this` scope to
   * access file information.
   */
  (resource: 'watch', options?: PartialDeep<IConfig>): (callback: Watch) => void
  /**
   * Build
   *
   * Invoked after transform operation has completed in build
   * mode. Use the `this` scope to access file information.
   */
  (resource: 'build', options?: PartialDeep<IConfig>): (callback: Build) => void
  /**
   * Usage via instance
   *
   * **NOT YET AVAILABLE**
   */
  (options?: PartialDeep<IConfig>): Resources
  /**
   * Files resource
   *
   * **NOT YET AVAILABLE**
   */
  files: {
    push(file: string, options?: any): Promise<any>;
    pull(file: string, options?: any): Promise<any>;
    merge(file: string, options?: any): Promise<any>;
    delete(file: string, options?: any): Promise<any>;
    query(file: string, options?: any): Promise<any>
  };
  /**
   * Metafields resource
   *
   * **NOT YET AVAILABLE**
   */
  metafields: {
    push(file: string, options?: any): Promise<any>;
    pull(file: string, options?: any): Promise<any>;
    merge(file: string, options?: any): Promise<any>;
    delete(file: string, options?: any): Promise<any>;
    query(file: string, options?: any): Promise<any>
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
   * Clean the output directory
   *
   * **NOT YET AVAILABLE**
   */
  config(options: IConfig): void
  /**
   * Clean the output directory
   *
   * **NOT YET AVAILABLE**
   */
  clean(): Promise<void>
  /**
   * VS Code Schema Store generation
   *
   * **NOT YET AVAILABLE**
   */
  vsc(): Promise<void>
}

export default Syncify;
