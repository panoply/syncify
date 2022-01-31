/* eslint-disable no-unused-vars */

import { ParsedPath } from 'path';
import { Type } from 'config/file';

/**
 * File context generated when passed to a sync
 * resource and used to dispatch to correct transform
 * process.
 */
interface IFile<T = unknown> extends ParsedPath {
  /**
   * Configuration reference. This will hold a reference
   * to any form of additional reference required in the
   * handling of this file. Typically, this is used for
   * transforms, wherein it holds the indexed config.
   *
   * @default null
   */
  config: T
  /**
   * The file type that was intercepted. This is an
   * enum number value.
   */
  type: Type;
  /**
   * The filename extension including the dot, eg: `.liquid`
   */
  ext: string;
  /**
   * The filename including the file extension.
   */
  base: string;
  /**
   * The filename without the extension.
   */
  name: string;
  /**
   * The parent directory of the file.
   */
  parent: string;
  /**
   * The chokidar passed path.
   */
  path: string;
  /**
   * The output path location which files will be written.
   */
  output: string;
  /**
   * When `metafield` is `true` this value will be the
   * parent directory name of the changed file, else this
   * is `null` when file changed is not metafield.
   */
  namespace: string;
  /**
   * The `key` value passed into the sync request.
   */
  key: string;
}
