/* eslint-disable no-unused-vars */

import type { Tester } from 'anymatch';
import type { Config as TailwindProcessor } from 'tailwindcss';
import type { Merge } from 'type-fest';
import type { Markdown } from './markdown';
import type { AxiosRequestConfig } from 'axios';
import type { ESBuildProcesser, ScriptBundle } from '../transforms/script';
import type { SASSProcesser, PostCSSProcesser, StyleBundle } from '../transforms/style';
import type { SVGOProcesser, SVGSpriteProcesser } from '../transforms/svg';
import type { JSONBundle } from '../transforms/json';
import type { FSWatcher } from 'chokidar';
import type { ChildProcessWithoutNullStreams } from 'child_process';
import type * as Config from '../config/index';

/* -------------------------------------------- */
/* PROCESSORS                                   */
/* -------------------------------------------- */

export interface SpawnCommand {
  /**
   * The base command, For example `esbuild` would be the
   * _base_ command in `esbuild src/file.js --watch`. If an
   * array command was provided in config then this value would
   * represent the first item in that array.
   */
  cmd: string;
  /**
   * The command arguments. For example, all commands following
   * the base command. The value here will be passed to spawn.
   */
  args: string[];
  /**
   * The process id (pid) assigned to the spawn. This is dynamically
   * assigned and will be `NaN` until spawn has been invoked.
   */
  pid: number;
}

/* -------------------------------------------- */
/* ENVIRONMENT REFERENCES                       */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Execution options which describe the invocation and operation
 * instructions which Syncify was initialised.
 */
export interface Env {
  /**
   * Building for development (default)
   *
   * @default true
   */
  dev: boolean;
  /**
   * Building for production (default)
   *
   * @default false
   */
  prod: boolean;
  /**
   * Signals sync execution, values represent the following:
   *
   * `0` - _No sync operation inferred_
   *
   * `1` -  _Sync to 1 store and 1 theme_
   *
   * `2` - _Syncing to more than 1 store or theme._
   *
   * @default 0
   */
  sync: 0 | 1 | 2;
  /**
   * Whether or not syncify was CLI Initialized. When `false` syncify
   * was called from JavaScript API, whereas `true` means it was invoked via API.
   *
   * @default false
   */
  cli: boolean;
}

/* -------------------------------------------- */
/* SPAWN CONFIGURATION                          */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Spawn configuration state.
 */
export interface Spawn {
  /**
   * Dynamically populated `Set` of file paths
   * that were generated from a spawned process.
   * Each item in the set will be matched against
   * in modes like `watch` from the chokidar instance.
   */
  paths: Set<string>;
  /**
   * Whether or not a spawn process ran. This is used
   * to determine what action took place in the build
   * cycles. When this value is `true` it infers a spawn
   * process was fired, when `false` it infers the opposite.
   *
   * > _Spawned invocation uses the `stdio` stream to determine
   * whether or not a change was fired by a child running process_
   */
  invoked: boolean;
  /**
   * Child Processes
   *
   * Collection of spawned child proccesses. We need to hold reference of these
   * so as they can be killed when ending the session.
   */
  streams: Map<string, ChildProcessWithoutNullStreams>
  /**
   * Commands that were spawned.
   */
  commands: {
    /**
     * The name of the process that will run, eg: `esbuild`
     */
    [name: string]: SpawnCommand
  }
}

/* -------------------------------------------- */
/* STORE CONFIGURATION                          */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Store authorisation client
 */
export interface Store {
  /**
  * The store domain name in Upcase (without `myshopify.com`)
  */
  store: string;
  /**
   * The store myshopify domain, eg: `store.myshopify.com`
   */
  domain: string;
  /**
   * Client instances
   */
  client: AxiosRequestConfig
  /**
   * Queue
   */
  queue: boolean;
}

/* -------------------------------------------- */
/* THEME CONFIGURATION                          */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Theme related model
 */
export interface Theme {
  /**
   * The store index reference
   */
  sidx: number;
  /**
   * The theme id.
   */
  id: number;
  /**
   * The store domain name
   */
  store: string;
  /**
   * The theme target name
   */
  target: string;
  /**
   * The authorized assets URL endpoint
   */
  url: string;
}

/* -------------------------------------------- */
/* SYNC CONFIGURATION                           */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Sync clients
 */
export interface Sync {
  /**
   * Theme synchronization options
   */
  themes: Array<Theme>;
  /**
   * Store synchronization options
   */
  stores: Array<Store>;
}

/* -------------------------------------------- */
/* TERSER CONFIGURATION                         */
/* -------------------------------------------- */

/* -------------------------------------------- */
/* MODE CONFIGURATION                           */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Execution modes
 */
export interface Modes {
  /**
   * Run the command prompt
   */
  interactive: boolean;
  /**
   * Execute a build, alias: `-b`
   */
  build: boolean;
  /**
   * Execute watch, alias: `-w`
   */
  watch: boolean;
  /**
   * Execute Upload, alias: `-u`
   */
  upload: boolean;
  /**
   * Execute Download, alias: `-d`
   */
  download: boolean;
  /**
   * Execute Clean, alias: `-c`
   */
  clean: boolean;
  /**
   * Generates VSC Schema spec file
   */
  vsc: boolean;
  /**
   * Execute metafields action, `--metafields`
   */
  metafields: boolean
  /**
   * Execute redirects resource, `--redirects`
   */
  redirects: boolean;
  /**
   * Execute page action, `--pages`
   */
  pages: boolean
  /**
   * Pull data from remote store, `--pull`
   */
  pull: boolean;
  /**
   * Force upload and overwrite, `--force`
   */
  force: boolean;
  /**
   * Invoke HOT reloads, `--hot`
   */
  hot: boolean;
  /**
   * Run the style transform, `--style`
   */
  style: boolean;
  /**
   * Run the script transform, `--script`
   */
  script: boolean;
  /**
   * Run the svg transform, `--svg`
   */
  svg: boolean;
  /**
   * Run the image transform, `--image`
   */
  image: boolean;
  /**
   * Run minification, either `--prod`, `--terse`
   */
  terse: boolean;
  /**
   * Trigger export, alias: `-e`
   */
  export: boolean;
}

/* -------------------------------------------- */
/* CMD CONFIGURATION                            */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Passed command overwrites
 */
export interface CommandBundle {
  /**
   * An input overwrite path was passed
   *
   * @default null
   */
  input: string;
  /**
   * An output overwrite path was passed
   *
   * @default null
   */
  output: string;
  /**
   * A config overwrite path was passed
   *
   * @default null
   */
  config: string;
  /**
   * Filters were passed in the command
   *
   * @default null
   */
  filter: string;
  /**
   * Deletions were passed in the command
   *
   * @default null
   */
  delete: string;
}

/* -------------------------------------------- */
/* CONFIG FILE RESOLUTION                       */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Configuration File
 */
export interface ConfigFile {
  /**
   * The full resolved path to the syncify configuration file
   *
   * @example
   *
   * 'Users/Sissel/Sites/Folder/views/dir/syncify.config.ts'
   */
  path: string;
  /**
   * The config file name including file extension.
   *
   * @example
   *
   * 'syncify.config.ts'
   */
  base: string;
  /**
   * The config file relative path location from current _root_ working directory.
   * This is typically going to match the `base` value as most config files work
   * from workspace root directory unless inferred otherwise.
   *
   * @example
   *
   * 'dir/syncify.config.ts'
   */
  relative: string;
}

/* -------------------------------------------- */
/* SECTIONS                                     */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Sections sub-directory configuration
 */
export type SectionBundle = Merge<Config.Views['sections'], {
  global: RegExp;
  paths?: Tester;
}>

/* -------------------------------------------- */
/* SNIPPETS                                     */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Snippets sub-directory configuration
 */
export type SnippetBundle = Merge<Config.Views['snippets'], {
  global: RegExp;
  paths?: Tester;
}>

/* -------------------------------------------- */
/* PATHS                                        */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Anymatched paths
 */
export type PathsBundle = Merge<Config.Paths<Tester>, {
  transforms?: Map<string, 7 | 8 | 9>
}>;

/* -------------------------------------------- */
/* PAGES                                        */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Page configuration
 */
export type PagesBundle = Merge<Config.Views['pages'], {
  import: Markdown.Import;
  export: Markdown.Export
}>

/* -------------------------------------------- */
/* WATCH                                        */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Chokidar watch instance
 */
export type WatchBundle = Merge<FSWatcher, {
  /**
   * Private method of chokidar
   */
  _watched: Map<string, { items: Set<string> }>;
  /**
   * The chokidar instance will be a `Set` when running in
   * non-watch modes. This value is used in the `paths` getter
   * to convert entries to an array.
   */
  values (): IterableIterator<string>;
  /**
   * Check whether or not a path is being watched
   */
  has (path: string, dir?: string): boolean;
 /**
   * Returns all watched paths
   */
  get paths (): string[]
}>;

/* -------------------------------------------- */
/* PROCESSORS                                   */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Processor configuration state. This model infers which
 * pre-processors are being used and/or available.
 */
export interface ProcessorsBundle {
  /**
   * JSON processing
   */
  json: JSONBundle;
  /**
   * [PostCSS](https://postcss.org/) Pre-Processor
   */
  postcss: PostCSSProcesser;
  /**
   * [SASS Dart](https://sass-lang.com/documentation/js-api/) Pre-Processor
   */
  sass: SASSProcesser;
  /**
   * [TailwindCSS](https://tailwindcss.com/) Pre-Processor
   */
  tailwind: TailwindProcessor;
  /**
   * [Sharp](https://sharp.pixelplumbing.com) Pre-Processor
   */
  sharp: any;
  /**
   * [SVG Sprite](https://github.com/svg-sprite) Pre-Processor
   */
  sprite: SVGSpriteProcesser;
  /**
   * [SVGO](https://github.com/svg/svgo) Pre-Processor
   */
  svgo: SVGOProcesser
  /**
   * [ESBuild](https://esbuild.github.io/) Pre-Processor
   */
  esbuild: ESBuildProcesser
}
