/* -------------------------------------------- */
/* IMPORTS                                      */
/* -------------------------------------------- */

import type { Directories } from './config/directories';
import type { Git } from './config/git';
import type { HOT } from './config/hot';
import type { Logger } from './config/logger';
import type { Paths } from './config/paths';
import type { Processors } from './config/processor';
import type { Publishing } from './config/publishing';
import type { Transforms } from './config/transform';
import type { VC } from './config/vc';
import type { LiteralUnion } from 'type-fest';

/* -------------------------------------------- */
/* LOGIC EXPORTS                                */
/* -------------------------------------------- */

export type * from './config/script';
export type * from './config/style';
export type * from './config/svg';
export type * from './config/liquid';
export type * from './config/json';

/* -------------------------------------------- */
/* CONFIG EXPORTS                               */
/* -------------------------------------------- */

export type { HOT } from './config/hot';
export type { VC } from './config/vc';
export type { Git } from './config/git';
export type { Directories } from './config/directories';
export type { Logger } from './config/logger';
export type { CustomStash, Paths, RenamePaths } from './config/paths';
export type { Publishing } from './config/publishing';
export type { Transforms } from './config/transform';
export type { Processors } from './config/processor';

/* -------------------------------------------- */
/* EXPORTS                                      */
/* -------------------------------------------- */

/**
 * **Syncify Configuration**
 *
 * The `defineConfig` named export used within `syncify.config.js` (or `.ts`) configuration files.
 */
export interface Config extends Directories {
  /**
   * Specify the text-editor you use for development. This is optional and when
   * left undefined, Syncify will attempt guess your preferred editor.
   */
  editor?: LiteralUnion<
    | 'vscode'
    | 'sublime'
    | 'atom'
    | 'webstorm'
    | 'intellij'
    | 'textmate'
    | 'xcode'
    | 'nano'
    | 'notepad++'
    | 'gedit'
    | 'vim'
  , string>;
  /**
   * Define customize input structures. Paths will automatically resolve
   * the `input` directory you provide.
   */
  paths?: Paths;
  /**
   * **NOT YET AVAILABLE**
   *
   * > Syncify plugins are planned in future releases!
   */
  plugins?: never;
  /**
   * **Clean**
   *
   * Whether of not Syncify should clean output before building.
   */
  clean?: boolean;
  /**
   * **HOT**
   *
   * Hot reloading options. Pass the `--hot` flag to enable.
   *
   * > Passing `--hot` will enable **watch** mode. You do not need to pass `-w`
   * > or `--watch` when `--hot` is provided as it will be assumed.
   */
  hot?: HOT;
  /**
   * **Log**
   *
   * Console log options
   */
  log?: Logger;
  /**
   * **Publish**
   *
   * Provide publish configuration
   */
  publish?: Publishing;
  /**
   * **Git**
   *
   * Git automation and workflow configuration for controlling the integration pipline. Settings
   * defined here will be used to provide a streamlines tactic for theme publishing, version
   * control and source control.
   */
  git?: false | Git
  /**
   * **Version Control**
   *
   * Syncify introduces a strategic version control system based on the Modular Arithmetic Model (**MaM**),
   * a unique approach inspired by, but distinct from, [SemVer](https://semver.org/). The MaM tactic in
   * its appropriation by Syncify to Theme development is designed around the idea that progression should
   * be predictive and controlled. The [Version Control](https://syncify.sh/usage/version-control/) documentation
   * guide provides a strong overview for how Syncify applies versioning to themes.
   */
  vc?: false | VC
  /**
   * **Transform**
   *
   * The asset transform pipeline configurations
   */
  transform?: Transforms;
  /**
   * **Processor**
   *
   * Configurations for the `transform` processors. Define options for a transform to inherit.
   * You can override these on a per-transform basis. Optionally, you can use the default presets
   * which syncify has pre-configured for optimal output.
   */
  processor?: Processors;
}

/**
 * ENV Utilities
 *
 * Helper utility for checking environment variables and returning some other data references
 */
export declare const env: {
  /**
   * Whether or not `--dev` mode is running
   */
  readonly dev: boolean;
  /**
   * Whether or not `--prod` mode is running
   */
  readonly prod: boolean;
  /**
   * Whether or not `--watch` mode is running
   */
  readonly watch: boolean;
};

/**
 * Define Config (named export)
 *
 * Used in `syncify.config.js` or `syncify.config.ts` files and provides type completions to the export.
 */
export declare const defineConfig: (config: Config) => Config;
