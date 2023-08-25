/* eslint-disable no-unused-vars */

import { LiteralUnion, Merge } from 'type-fest';

/**
 * File types are represented as numeric values.
 * The infer the following:
 */
export enum FileTypes {
  Template = 1,
  Layout,
  Snippet,
  Section,
  Config,
  Locale,
  Style,
  Script,
  Svg,
  Redirect,
  File,
  Asset,
  Metafield,
  Page,
  Spawn
}

/**
 * File Kinds
 *
 * Applied to `file.kind` context. The is a text value
 * Used to describe of file being handled.
 */
export type FileKinds = LiteralUnion<
  | 'style'
  | 'script'
  | 'liquid'
  | 'json'
  | 'image'
  | 'svg'
  | 'markdown'
  | 'html'
  | 'redirect'
  | 'video'
  | 'font'
  | 'document'
  , string
>

/**
 * Shopify Asset Key
 *
 * Applied to `file.key` context and required in theme asset
 * requests. The `key` represents to the file and directory
 * structure.
 *
 * > Used in REST API request payload
 *
 * @example
 *
 * 'snippets/filename.liquid'
 *
 */
export type FileKeys = LiteralUnion<
  | `templates/${string}${'.liquid' | '.json'}`
  | `templates/customer/${string}${'.liquid' | '.json'}`
  | `assets/${string}`
  | `sections/${string}${'.liquid' | '-group.json'}`
  | `snippets/${string}${'.liquid'}`
  | `layout/${string}${'.liquid'}`
  | `locales/${string}${'.json'}`
  | `config/settings_${'data' | 'schema'}${'.json'}`
  , string
>

/**
 * File Namespace
 *
 * Applied to `file.namespace` context. This value represents the
 * the output theme directory where a file should be written, but
 * may also represent an endpoint.
 *
 * > Used in logs, reports and other logic
 */
export type FileNamespaces = LiteralUnion<
  | 'template'
  | 'template/customer'
  | 'snippet'
  | 'section'
  | 'locale'
  | 'config'
  | 'layout'
  | 'asset'
  | 'metafield'
  | 'page'
  | 'redirect'
  | 'files'
  , string
>

/**
 * File Resource - Applied to `file.resource` context
 *
 * Applied to `file.resource` context. Infers the REST API endpoint
 * excluding `files` which will use the insufferable Shopify GraphQL endpoint.
 */
export type FileResources = LiteralUnion<
  | 'pages'
  | 'redirects'
  | 'assets'
  | 'themes'
  | 'metafields'
  | 'files'
  , string
>

/**
 * File context generated when passed to a sync resource and used
 * to dispatch to correct transform process.
 */
interface File<T = any> {
  /**
   * A unique UUID reference for this file - This option can change
   * where required and when dealing with multiple stores at the request level.
   *
   * @example
   *
   * 'ABD41WX'
   */
  uuid: string;
  /**
   * The file type that was intercepted. This is an enum number value.
   * The number value will infer on how the file should be handled and uses
   * the `FileType` enum for checks.
   *
   * @example
   *
   * file.type === FileType.Template
   *
   */
  type: number;
  /**
   * The resource API endpoint to which the file will be synced.
   * This will be passed to the request client.
   *
   * @example
   *
   * 'assets'
   * 'redirects'
   */
  resource: FileResources;
  /**
   * The root of the file path
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * '/' OR 'c:\'
   */
  root: string;
  /**
   * The full directory path such.
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * '/home/user/dir' OR 'c:\path\dir'
   */
  dir: string;
  /**
   * The file name without extension (if any).
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * 'filename' // filename.ext
   */
  name: string;
  /**
   * The filename extension including the dot, eg: `.liquid`
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * '.ext'
   */
  ext: string;
  /**
   * The input base filename including file extension.
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * 'filename.ext'
   */
  base: string;
  /**
   * The input relative path location from current _root_ working directory
   *
   * @example
   *
   * 'source/views/sections/dir/file.liquid'
   */
  relative: string;
  /**
   * The `key` value will be passed into the sync request. This
   * will contain the namespace and base name and is used for
   * uploading to Shopify stores.
   *
   * @example
   *
   * 'sections/file.liquid'
   * 'snippets/file.liquid'
   * 'templates/index.liquid'
   */
  key: FileKeys;
  /**
   * The `namespace` value will typically refelect the output
   * parent directory name reference, but sometimes this might
   * be a unique value depending on the file type we are handling.
   *
   * @example
   *
   * 'snippets'
   * 'sections'
   * 'templates'
   */
  namespace: FileNamespaces;
  /**
   * The file kind grouping. This is used internally and describes
   * the type of file we are working with.
   *
   * @example
   *
   * 'json'
   * 'liquid'
   * 'sass'
   * 'css'
   *
   * // etc etc
   */
  kind: FileKinds
  /**
   * The chokidar passed path - this is full URI file path.
   *
   * @example
   *
   * 'User/name/project/source/dir/file.liquid'
   */
  input: string;
  /**
   * The output path location which files will be written. Only theme specific files
   * have an output path location, when a file writes from its source (like a metafield) or
   * if the file is handled in an asset pipeline transform then this will have a `null` value.
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
   * The file size in bytes before any augmentation is applied. This
   * value will assigned post-context, typically in a transform.
   *
   * @example
   *
   * 1024 // => 1.24kb
   */
  size?: number;
  /**
   * Configuration reference. This will hold a reference to additional data.
   * Typically, this is used for transforms, wherein it holds the indexed config.
   *
   * @default undefined // getter when required
   */
  get data(): T
}
