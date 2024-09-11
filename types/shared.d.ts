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
 * Snippet Rename Paths
 */
export type SnippetPaths = LiteralString<
  | '[name]'
  | '[dir]-[name]'
  | '[dir]_[name]'
  | '[dir].[name]'
  | '[name]-[dir]'
  | '[name]_[dir]'
  | '[name].[dir]'
>;

/**
 * Snippet Rename
 */
export type SnippetRename = Record<SnippetPaths, string | string[]>

/**
 * Section Rename Paths
 */
export type SectionPaths = LiteralString<
  | '[name]'
  | '[dir]-[name]'
  | '[dir]_[name]'
  | '[name]-[dir]'
  | '[name]_[dir]'
>;

/**
 * Snippet Rename
 */
export type SectionRename = Record<SectionPaths, string | string[]>

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
