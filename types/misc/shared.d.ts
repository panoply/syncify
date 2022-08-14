import { Config } from '../config';

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
