/* eslint-disable no-unused-vars */

/* -------------------------------------------- */
/* IMPORTS                                      */
/* -------------------------------------------- */

import type { Merge, PackageJson } from 'type-fest';
import type { HOTConfig } from './$/hot';
import type { PluginHooks } from './$/plugin';
import type { Stores } from './config/stores';
import type { Directories } from './config/directories';
import type { Logger } from './config/logger';
import type { Paths } from './config/paths';
import type { Publishing } from './config/publishing';
import type { Transforms } from './config/transform';
import type { Processors } from './config/processors';

/* -------------------------------------------- */
/* EXPORTS                                      */
/* -------------------------------------------- */

export type { HOTConfig } from './$/hot';
export type { PluginHooks } from './$/plugin';
export type { Stores } from './config/stores';
export type { Directories } from './config/directories';
export type { Logger } from './config/logger';
export type { Paths } from './config/paths';
export type { Publishing } from './config/publishing';
export type { Transforms } from './config/transform';
export type { Processors } from './config/processors';

/**
 * The Configuration model
 */
export interface Config<T = Stores> extends Directories {
  /**
   * Define customize input structures - Paths resolve to `input`
   */
  paths?: Paths;
  /**
   * **Clean**
   *
   * Whether of not Syncify should clean output before building.
   */
  clean?: boolean;
  /**
   * **HOT**
   *
   * Hot reloading options. Passing boolean `true` will use defaults.
   * Set to `false` to disable live reloads. Optionally configure
   * reloads by passing configuration _object_.
   *
   * > Hot reloading is only possible in **watch** mode.
   *
   * @default false
   */
  hot?: boolean | HOTConfig;
  /**
   * **Log**
   *
   * Console log options
   */
  log?: Logger;
  /**
   * **NOT YET SUPPORTED**
   *
   * Syncify Plugins
   */
  plugins?: PluginHooks[];
  /**
   * **Publish**
   *
   * Provide publish configuration
   */
  publish?: Publishing;
  /**
   * **Spawn**
   *
   * Spawn child process
   */
  spawn?: {
    /**
     * Processes to spawn when running **build** mode, ie: `--build` or `-b`
     *
     * @default {}
     *
     * @example
     *
     * {
     *   build: {
     *    rollup: 'rollup -c',
     *    gulp: ['gulp', 'build-task'] // can also use arrays
     *  }
     * }
     */
    build?: { [target: string]: string | string[] };
    /**
     * Processes to spawn when running **watch** mode, ie: `--watch` or `-w`
     *
     * @default {}
     *
     * @example
     * {
     *   build: {
     *    rollup: 'rollup -c --watch',
     *    gulp: ['gulp', 'watch-task'], // can also use arrays
     *  }
     * }
     */
    watch?: { [target: string]: string | string[] }
  };
  /**
   * **Transform**
   *
   * The asset transform pipeline configurations
   */
  transform?: Transforms;
  /**
   * **Processors**
   *
   * Configurations for the `transform` processors. Define options
   * for a transform to inherit. You can override these on a per-transform basis.
   * Optionally, you can use the default presets which syncify has pre-configured
   * for optimal output.
   */
  processors?: Processors;
}

/**
 * The Configuration model
 */
export interface SyncifyConfig extends Directories {
  /**
   * Define customize input structures - Paths resolve to `input`
   */
  paths?: Paths;
  /**
   * **Clean**
   *
   * Whether of not Syncify should clean output before building.
   */
  clean?: boolean;
  /**
   * **HOT**
   *
   * Hot reloading options. Passing boolean `true` will use defaults.
   * Set to `false` to disable live reloads. Optionally configure
   * reloads by passing configuration _object_.
   *
   * > Hot reloading is only possible in **watch** mode.
   *
   * @default false
   */
  hot?: boolean | HOTConfig;
  /**
   * **Log**
   *
   * Console log options
   */
  log?: Logger;
  /**
   * **NOT YET SUPPORTED**
   *
   * Syncify Plugins
   */
  plugins?: PluginHooks[];
  /**
   * **Publish**
   *
   * Provide publish configuration
   */
  publish?: Publishing;
  /**
   * **Spawn**
   *
   * Spawn child process
   */
  spawn?: {
    /**
     * Processes to spawn when running **build** mode, ie: `--build` or `-b`
     *
     * @default {}
     *
     * @example
     *
     * {
     *   build: {
     *    rollup: 'rollup -c',
     *    gulp: ['gulp', 'build-task'] // can also use arrays
     *  }
     * }
     */
    build?: { [target: string]: string | string[] };
    /**
     * Processes to spawn when running **watch** mode, ie: `--watch` or `-w`
     *
     * @default {}
     *
     * @example
     * {
     *   build: {
     *    rollup: 'rollup -c --watch',
     *    gulp: ['gulp', 'watch-task'], // can also use arrays
     *  }
     * }
     */
    watch?: { [target: string]: string | string[] }
  };
  /**
   * **Transform**
   *
   * The asset transform pipeline configurations
   */
  transform?: Transforms;
  /**
   * **Processors**
   *
   * Configurations for the `transform` processors. Define options
   * for a transform to inherit. You can override these on a per-transform basis.
   * Optionally, you can use the default presets which syncify has pre-configured
   * for optimal output.
   */
  processors?: Processors;
}

/* -------------------------------------------- */
/* PACKAGE JSON                                 */
/* -------------------------------------------- */

export type PKG = Merge<PackageJson, {
  syncify: {
    /**
     * Store Configurations
     */
    stores: Stores | Stores[];
    /**
     * Optional Config
     */
    config?: Omit<Config, 'stores'>
  }
}>
