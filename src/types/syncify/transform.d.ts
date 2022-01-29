/* eslint-disable no-unused-vars */

import { ParsedPath } from 'path';

/**
 * File context generated when passed to a sync
 * resource and used to dispatch to correct transform
 * process.
 */
interface IFile extends ParsedPath {
  /**
   * Index references to additional configurations
   */
  idx: number
  /**
   * The file type that was intercepted
   */
  type: number;
  /**
   * The filename extension
   */
  ext: string;
  /**
   * The filename with extension
   */
  base: string;
  /**
   * The resolved file path
   */
  root: string;
  /**
   * The chokidar passed path
   */
  path: string;
  /**
   * The output directory
   */
  output: string;
  /**
   * The filename
   */
  name: string;
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
