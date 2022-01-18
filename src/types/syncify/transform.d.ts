/**
 * File context generated when passed to a sync
 * resource and used to dispatch to correct transform
 * process.
 */
export interface IFile {
  /**
   * Whether or not the change is a metafield
   */
  metafield: boolean;
  /**
   * The filename extension
   */
  ext: string;
  /**
   * The filename
   */
  base: string;
  /**
   * The resolved file path
   */
  path: string;
  /**
   * When `metafield` is `true` this value will be the
   * parent directory name of the changed file, else this
   * is `null` when file changed is not metafield.
   */
  namespace: string;
  /**
   * When `metafield` is `true` this value will be the
   * key value which is the filename without extension,
   * else this value is the theme file path.
   */
  key: string;
}
