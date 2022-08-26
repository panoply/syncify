/* eslint-disable no-unused-vars */

import type { Tester } from 'anymatch';
import type { BuildOptions as ESBuildConfig } from 'esbuild';
import type { Merge, MergeExclusive, PartialDeep } from 'type-fest';
import type { Markdown } from '../misc/markdown';
import type { Paths, Directories, HOT, Transforms, Views, Minify, Config } from '../config/index';
import type { ScriptTransform, StyleTransform, SVGInline, SVGSprite } from '../config/transforms';
import type { AxiosRequestConfig } from 'axios';
import type { Plugins } from './plugin';
import type { Processors } from '../config/processors';
import type { Tsconfig } from 'tsconfig-type';

/* -------------------------------------------- */
/* RE-EXPORT                                    */
/* -------------------------------------------- */

export { File } from './file';
export { Cache } from './cache';

/* -------------------------------------------- */
/* PROCESSORS                                   */
/* -------------------------------------------- */

type GetProcessorConfigs<T> = {
  /**
   * Whether or not the processor is required
   */
  required: boolean;
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

export interface ProcessorConfigs {
  json: Processors['json'];
  postcss: GetProcessorConfigs<Processors['postcss']>;
  sass: GetProcessorConfigs<Processors['sass']>;
  sharp: GetProcessorConfigs<Processors['sharp']>;
  sprite:GetProcessorConfigs<Processors['sprite']>;
  svgo: GetProcessorConfigs<Processors['svgo']>
  esbuild: Merge<GetProcessorConfigs<ESBuildConfig>, { get tsconfig(): Tsconfig }>
}

/* -------------------------------------------- */
/* SPAWNED PROCESSES                            */
/* -------------------------------------------- */

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
   * Commands that were spawned.
   */
  commands: {
    /**
     * The name of the process that will run, eg: `esbuild`
     */
    [name: string]: {
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
  }
}

/* -------------------------------------------- */
/* STORE                                        */
/* -------------------------------------------- */

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
/* THEME                                        */
/* -------------------------------------------- */

export interface Theme {
  /**
   * The store index reference
   */
  sidx: number;
  /**
   * The store domain name
   */
  store: string;
  /**
   * The theme target name
   */
  target: string;
  /**
   * The theme id.
   */
  id: number;
  /**
   * The authorized assets URL endpoint
   */
  url: string;
}

/* -------------------------------------------- */
/* SYNC                                         */
/* -------------------------------------------- */

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
/* RESOURCE MODES                               */
/* -------------------------------------------- */

export interface Modes {
  /**
   * Run the command prompt
   */
  prompt: boolean;
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
   * Execute metafields action, `-m`
   */
  metafields: boolean
  /**
   * Execute redirects resource, `-r`
   */
  redirects: boolean;
  /**
   * Execute page action, `-p`
   */
  pages: boolean
  /**
   * Pull data from remote store, `--pull`
   */
  pull: boolean
  /**
   * merge data from remote store, `--merge`
   */
  push: boolean;
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
   * Trigger export, alias: `-e`
   */
  export: boolean;
}

/* -------------------------------------------- */
/* BUNDLE                                       */
/* -------------------------------------------- */

export declare type Style = Merge<Transforms['style'], { input: string; watch: Tester; }>

export interface Bundle<T = unknown> {
  /**
   * The version defined in the package.json
   */
  version: string;
  /**
   * The configuration file name
   */
  file: string
   /**
    * Building for development (default)
    */
  dev: boolean;
  /**
    * Building for production
    */
  prod: boolean;
   /**
    * CLI Initialized, when `false` syncify was called from JavaScript API.
    */
  cli: boolean;
   /**
    * Logging should be silent, only show errors or warnings.
    */
  silent: boolean;
   /**
    * The current working directory
    */
  cwd: string;
  /**
   * Hot reload mode options
   */
  hot: Merge<HOT, {
    alive?: boolean;
    code?: string;
    output?: string;
  }>;
   /**
    * Directory structure paths
    */
  paths: Paths<Tester>
   /**
    * Base directory path references
    */
  dirs: Directories & { cache: string };
   /**
    * The sync clients. Multiple stores and themes
    * can run concurrently.
    */
  sync: Sync
   /**
    * Passed commands that may be of importance in
    * the transform or build processes.
    */
  cmd: {
    /**
     * An input overwrite was passed
     */
    input: string;
    /**
     * An output overwrite was passed
     */
    output: string;
    /**
     * Filters were passed in the command
     */
    filter: string;
    /**
     * Deletions were passed in the command
     */
    delete: string;
  };
   /**
    * Spawn related configuration operations
    */
  spawn: Spawn
   /**
    * The operation to run
    */
  mode: Modes;
   /**
    * List of paths to watch or build from
    */
  watch: Set<string>
  /**
   * Section handling
   */
  snippet: Merge<Views['snippets'], { global: RegExp }>;
  /**
   * Section handling
   */
  section: Merge<Views['sections'], { global: RegExp }>;
  /**
   * Page handling
   */
  page: Merge<Views['pages'], {
    import: Markdown.Import;
    export: Markdown.Export
  }>
  /**
   * Script handling
   */
  script: Merge<ScriptTransform, {
    input: string;
    watch: Tester;
  }>[];
  /**
   * Style handling
   */
  style: Merge<StyleTransform, {
    input: string;
    watch: Tester;
  }>[];
  /**
   * Image handling
   */
  image: Merge<Transforms['image'], { input: Tester }>[];
  /**
   * SVG handling
   */
  svg: {
    sprite: Merge<SVGSprite, { input: string[]; }>[];
    inline: Merge<SVGInline, { input: Tester; }>[]
  };
  /**
   * Minify Options
   */
  get minify(): Minify
  /**
   * Processor Configurations
   */
  get processor(): Processors
  /**
   * Merge users configuration with default
   */
  set config(config: Config)
  /**
   * Returns the merged configuration
   */
  get config(): Config;
  /**
   * Plugins
   */
  get plugins(): Plugins;
}
