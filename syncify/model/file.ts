/* eslint-disable no-unused-vars */
import type { ParsedPath } from 'node:path';
import { assign } from 'syncify:native';
import type { FileKeys, FileResources } from 'types';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

/**
 * File types are represented as numeric values.
 */
export const enum Type {
  Template = 1,
  Layout,
  Snippet,
  Section,
  Schema,
  Metaobject,
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
 * File namespaces represent various identifiers, typically
 * passed to store synchronization requests.
 */
export const enum Namespace {
  Sections = 'sections',
  Snippets = 'snippets',
  Layout = 'layout',
  Templates = 'templates',
  Customers = 'templates/customers',
  Metaobject = 'templates/metaobject',
  Config = 'config',
  Locales = 'locales',
  Assets = 'assets',
  Metafields = 'metafields',
  Pages = 'pages',
  Schema = 'schema'
}

/**
 * File kinds represent the processing types, typicaly infers the transform
 * operation to be applied.
 */
export const enum Kind {
  JSON = 'JSON',
  CSS = 'CSS',
  SASS = 'SASS',
  SCSS = 'SCSS',
  JavaScript = 'JavaScript',
  TypeScript = 'TypeScript',
  JSX = 'JSX',
  TSX = 'TSX',
  Font = 'Font',
  SVG = 'SVG',
  Sprite = 'Sprite',
  PDF = 'PDF',
  Image = 'Image',
  Video = 'Video',
  Liquid = 'Liquid',
  HTML = 'HTML',
  Markdown = 'Markdown',
  Yaml = 'YAML',
  Unknown = 'Unknown'
}

export class File<T = any> {

  constructor ({ base, dir, ext, name, root }: ParsedPath) {
    this.base = base;
    this.dir = dir;
    this.ext = ext;
    this.name = name;
    this.root = root;
  }

  /**
   * Configuration reference. This will hold a reference to additional data.
   * Typically, this is used for transforms, wherein it holds the indexed config.
   *
   * @default undefined // getter when required
   */
  readonly data: T = undefined;

  /**
   * A unique UUID reference for this file - This option can change
   * where required and when dealing with multiple stores at the request level.
   *
   * @example
   *
   * 'ABD41WX'
   */
  public uuid: string;
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
  public type: Type;
  /**
   * The resource API endpoint to which the file will be synced.
   * This will be passed to the request client.
   *
   * @example
   *
   * 'assets'
   * 'redirects'
   */
  public resource: FileResources;
  /**
   * The root of the file path
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * '/' OR 'c:\'
   */
  public root: string;
  /**
   * The full directory path such.
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * '/home/user/dir' OR 'c:\path\dir'
   */
  public dir: string;
  /**
   * The file name without extension (if any).
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * 'filename' // filename.ext
   */
  public name: string;
  /**
   * The filename extension including the dot, eg: `.liquid`
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * '.ext'
   */
  public ext: string;
  /**
   * The input base filename including file extension.
   *
   * > Value is obtained via the native `path.parse()` method
   *
   * @example
   *
   * 'filename.ext'
   */
  public base: string;
  /**
   * The input relative path location from current _root_ working directory
   *
   * @example
   *
   * 'source/views/sections/dir/file.liquid'
   */
  public relative: string;
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
  public key: FileKeys;
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
  public namespace: Namespace;
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
  public kind: Kind;
  /**
   * The chokidar passed path - this is full URI file path.
   *
   * @example
   *
   * 'User/name/project/source/dir/file.liquid'
   */
  public input: string;
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
  public output: string;
  /**
   * The file size in bytes before any augmentation is applied. This
   * value will assigned post-context, typically in a transform.
   *
   * @example
   *
   * 1024 // => 1.24kb
   */
  public size?: number;

}
