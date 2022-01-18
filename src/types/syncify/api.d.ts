import { PartialDeep } from 'type-fest';
import { IOptions } from './options';
import { Resource } from './requests';

/**
 * File Scope
 */
interface IFileScope {
  /**
   * The file extension
   */
  ext: string;
  /**
   * The resolved file path
   */
  path: string;
  /**
   * The file name without extension
   */
  name: string;
   /**
   * The file namespace. This will be the parent directory
   * name identifier that we use in the upload process.
   */
  namespace: (
    'asset' |
    'metafield' |
    'template' |
    'section' |
    'snippet' |
    'locale' |
    'layout' |
    'config' |
    'redirect' |
    'metafield'
  )
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
 * Default Export
 */
export namespace Syncify {

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
   * // Returns a function
   * const sync = syncify('watch', {})
   *
   * // Hook into the transform
   * sync(function(content){
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
   */
  export function hook(
    resource: Resource,
    options?: PartialDeep<IOptions>
  ): (this: IFileScope, content: Buffer) => string | Buffer | void | object

}

export default Syncify.hook;
