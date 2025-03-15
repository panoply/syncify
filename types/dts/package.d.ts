import type { Store } from './$';
import type { Config } from '@syncify/types';
import type { Merge, PackageJson } from 'type-fest';

export type FileTargets = Record<string, { [theme: string]: number }>;

export type PKGStores = Record<string, { [theme: string]: number }>

export type PKG = Merge<PackageJson, {
  syncify?: {
    /**
     * Store Configurations
     */
    stores?: PKGStores;
    /**
     * Optional Config
     */
    config?: Omit<Config, 'stores'>
  }
}>

export interface PackageConfig {
  /**
   * The `stores` property holds store and theme configuration
   */
  stores: Omit<Store, 'password'> | Omit<Store, 'password'>[];
  /**
   * The `config` property holds Syncify configuration options
   */
  config: Config;
}

export interface Package {
  version?: string;
  syncify?: PackageConfig;
  dependencies?: { [module: string]: string; };
  devDependencies?: { [module: string]: string };
  peerDependencies?: { [module: string]: string };
  optionalDependencies?: { [module: string]: string };
}
