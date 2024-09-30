import type { LiteralUnion } from 'type-fest';
import type { Config } from './config';

/**
 * Union Type for strings
 */
export type LiteralString<T> = LiteralUnion<T, string>

export type Group = LiteralString<
  | 'Syncify'
  | 'Asset'
  | 'Spawn'
  | 'SVG'
  | 'Snippet'
  | 'Layout'
  | 'Section'
  | 'Page'
  | 'Locale'
  | 'Config'
  | 'Template'
  | 'Metafield'
>

export type Namespacing = LiteralString<
  | '[dir]'
  | '[file]'
  | '[ext]'
>

/**
 * Namespaced Paths
 */
export type NamespacePaths = `${'assets' | 'snippets'}/${string}`

/**
 * Directory Paths
 */
export type DirPaths = `${'assets' | 'snippets'}/${string}`

/**
 * Rename Paths
 */
export type RenamePaths = NamespacePaths;

/**
 * Section Rename Paths
 */
export interface SectionPaths<T = string | string[]> {

  /**
   * Uses the filename as per the source, idenitical behaviour as that of `[name]`.
   *
   * @example
   * {
   *   sections: {
   *    '[dir]-[name]': [
   *      'sections/foo/*', // sections in this directory will prefix foo-
   *      'sections/bar/*' // sections in this directory will prefix bar-
   *    ],
   *    '*': [
   *      './sections/**'  // all other sections will use source name
   *    ]
   *   }
   * }
   */
  '*'?: T;
  /**
   * Use the filename as per the source. Passing `[name]` only will result in fallback
   * behaviour, as that of `'*'`.
   *
   * @example
   * @example
   * {
   *   sections: {
   *    '[dir]-[name]': [
   *      'sections/foo/*', // sections in this directory will prefix foo-
   *    ],
   *    'xxx-[name]': [
   *      'sections/bar/*', // sections in this directory will prefix xxx-
   *    ],
   *    '[name]': [
   *      './sections/**'  // all other sections will use source filename
   *    ]
   *   }
   * }
   */
  '[name]'?: T;
  /**
   * Prefix directory name and suffix filename in **kebab-case** format.
   *
   * @example
   * 'layout/header.liquid' > 'layout-header.liquid'
   */
  '[dir]-[name]'?: T;
  /**
   * Prefix directory name and suffix filename in **snake_case** format.
   *
   * @example
   * 'layout/header.liquid' > 'layout_header.liquid'
   */
  '[dir]_[name]'?: T;
  /**
   * Prefix filename and suffix directory in **kebab-case** format.
   *
   * @example
   * 'layout/header.liquid' > 'header-layout.liquid'
   */
  '[name]-[dir]'?: T;
  /**
   * Prefix filename and suffix directory in **snake_case** format.
   *
   * @example
   * 'layout/header.liquid' > 'header_layout.liquid'
   */
  '[name]_[dir]'?: T;
}

/**
 * Snippet Rename Paths
 */
export interface SnippetPaths<T extends string | string[]> {

  /**
   * Use the filename as per the source.
   *
   * @example
   * 'foo.liquid' > 'foo.liquid'
   */
  '[name]'?: T;
  /**
   * Prefix directory name and suffix filename in **kebab-case** format.
   *
   * @example
   * 'xxx/foo.liquid' > 'xxx-foo.liquid'
   */
  '[dir]-[name]'?: T;
  /**
   * Prefix directory name and suffix filename in **snake_case** format.
   *
   * @example
   * 'xxx/foo.liquid' > 'xxx_foo.liquid'
   */
  '[dir]_[name]'?: T;
  /**
   * Prefix directory name and suffix filename with **dot** separator.
   *
   * @example
   * 'xxx/foo.liquid' > 'xxx.foo.liquid'
   */
  '[dir].[name]'?: T;
  /**
   * Prefix filename and suffix directory in **kebab-case** format.
   *
   * @example
   * 'xxx/foo.liquid' > 'foo-xxx.liquid'
   */
  '[name]-[dir]'?: T;
  /**
   * Prefix filename and suffix directory in **snake_case** format.
   *
   * @example
   * 'layout/foo.liquid' > 'header_foo.liquid'
   */
  '[name]_[dir]'?: T;
  /**
   * Prefix filename and suffix directory with **dot** separator.
   *
   * @example
   * 'xxx/foo.liquid' > 'foo.xxx.liquid'
   */
  '[name].[dir]'?: T;
  /**
   * Custom string rename
   */
  [rename: string]: T
}

/**
 * Template Rename Paths
 */
export type TemplatePaths = LiteralString<
  | '[name]'
  | '[dir].[name]'
>;

/**
 * Custom Rename Paths
 */
export type CustomerPaths = LiteralString<
  | '[name]'
  | '[dir].[name]'
>;

/**
 * Metaobject Rename Paths
 */
export type MetaObjectPaths = LiteralString<
  | '[name]'
  | '[dir]-[name]'
  | '[dir]_[name]'
  | '[dir].[name]'
  | '[name]-[dir]'
  | '[name]_[dir]'
  | '[name].[dir]'
>;

/**
 * Processor Configuration
 */
export type GetProcessorConfigs<T> = {
  /**
   * Whether or not the processor is installed
   */
  installed: boolean;
  /**
   * Whether or not the module was loaded, ie: imported.
   * This will be `false` until the the import was loaded.
   */
  loaded: boolean;
  /**
   * Whether or not a config file exists for the processor,
   * When one exists the URI path location to the file will
   * be applied as the value.
   */
  file: boolean | string;
  /**
   * Configuration of the processor. Initialized with defaults.
   */
  config: T;
}

/**
 * Processor Configuration
 */
export type GetProcessorConfigFile<T> = {
  /**
   * Whether or not a config file exists for the processor,
   * When one exists the URI path location to the file will
   * be applied as the value.
   */
  file: boolean | string;
  /**
   * Configuration of the processor, Initialized with defaults
   */
  config: T;
}
/**
 * Picked `package.json` fields
 */
export interface Package {
  version?: string;
  syncify?: Config;
  dependencies?: { [module: string]: string; };
  devDependencies?: { [module: string]: string };
  peerDependencies?: { [module: string]: string };
  optionalDependencies?: { [module: string]: string };
}

export namespace ENV {

  /**
   * Auth using `key` and `secret` in `.syncifyrc` file
   *
   * > _Single store_
   */
  export interface RCSecret {
    /**
     * Domain name
     */
    domain: string;
    /**
     * Authorization Key
     */
    key: string;
    /**
     * Authorization Secret
     */
    secret: string
  }

  /**
   *  Auth using `key` and `secret` in `.syncifyrc` File
   *
   *  > _Array of stores_
   */
  export type RCSecrets = RCSecret[]

  /**
   * Auth using `token` in `.env.syncify.json` file
   *
   * > _Single store_
   */
  export interface RCToken {
    domain: string,
    token: string
  }

  /**
   *  Auth using `token` in `.syncifyrc` file
   *
   *  > _Array of stores_
   */
  export type RCTokens = RCToken[]

  /**
   * Using a `.syncifyrc` file for authorizations
   */
  export type RCFile = RCSecret | RCSecret[] | RCToken | RCToken[]

}
