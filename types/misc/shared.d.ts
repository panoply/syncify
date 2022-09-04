import { Config } from '../config';

export type Namespacing = (
  | '[dir]'
  | '[file]'
  | '[ext]'
)

/**
 * Namespaced Paths
 */
export type NamespacePaths = `${'assets' | 'snippets'}/${Namespacing}${string}${Namespacing}`

/**
 * Directory Paths
 */
export type DirPaths = `${'assets' | 'snippets'}/${string}`

/**
 * Rename Paths
 */
export type RenamePaths = NamespacePaths | DirPaths

/**
 * Rename input type
 */
export type RenameInput = {
  [filename: string]: string | string[]
}

/**
 * Rename input paths type
 */
export type RenameInputPaths = {
  [filename: RenamePaths]: string | string[]
}

/**
 * Rename config type
 */
export type RenameConfig<T> = {
  [filename: RenamePaths]: string | string[] | T
}

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
   * applied as the value.
   */
  file: false | string;
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
    domain: string,
    key: string,
    secret: string
  }

  /**
   *  Auth using `key` and `secret` in `.syncifyrc` File
   *
   *  > _Array of stores_
   */
  export type RCSecrets = RCSecret[]

  /**
   * Auth using `token` in `.syncifyrc` file
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
  export type RCFile =
    | RCSecret
    | RCSecret[]
    | RCToken
    | RCToken[]

}
