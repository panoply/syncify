/* eslint-disable no-unused-vars */

import { ParsedPath } from 'path';
import type { Type as Types, Kind as Kinds } from 'process/files';
import { Requests } from './requests';

/**
 * File context generated when passed to a sync
 * resource and used to dispatch to correct transform
 * process.
 */
interface IFile<T = unknown, Type = Types> extends ParsedPath {
  /**
   * The file type that was intercepted. This is an
   * enum number value. The number value will infer
   * on how the file should be handled.
   *
   * @example
   *
   * 1
   */
  type: Type;
  /**
   * The resource label reference
   *
   * @example
   *
   * 'resource'
   */
  resource: string;
  /**
   * The filename extension including the dot, eg: `.liquid`
   *
   * @example
   *
   * '.liquid'
   */
  ext: string;
  /**
   * The input filename including the file extension.
   *
   * @example
   *
   * 'filename.ext'
   */
  base: string;
  /**
   * The input filename without the extension.
   *
   * @example
   *
   * 'filename'
   */
  stem: string;
  /**
   * The chokidar passed path.
   * This is full URI file URI path.
   *
   * @example
   *
   * 'User/name/project/source/dir/file.liquid'
   */
  input: string;
  /**
   * The output path location which files will be written.
   * Only theme specific files have an output path location,
   * when a file write from source (like metafield) this will
   * have a `null` value.
   *
   * @example
   *
   * // When file is theme specific
   * 'User/name/project/theme/dir/filename.liquid'
   *
   * // When file is not theme specific
   * null
   */
  output: string;
  /**
   * The file size in bytes.
   *
   * @example
   *
   * 1024 // => 1.24kb
   */
  size?: number;
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
   * The `key` value will be passed into the sync request. This
   * will contain the namespace and base name
   *
   * @example
   *
   * 'namespace/file.liquid'
   */
  key: string;
  /**
   * The `namespace` value will typically refelect the output
   * parent directory name reference, but sometimes this might
   * be a unique value depending on the file type we are handling.
   *
   * @example
   *
   * 'snippets'
   */
  namespace: string;
}
