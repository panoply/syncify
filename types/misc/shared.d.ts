import { Config } from '../config';

/**
 * Rename Paths
 */
export type InferPaths = `${'assets' | 'snippets'}/[${'dir' | 'file'}]${string}[${'file' | 'dir'}]${string}`

/**
 * Rename Paths
 */
export type RenamePaths = `${'assets' | 'snippets'}/${string}`

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
