/* eslint-disable no-unused-vars */

import type { Tester } from 'anymatch';
import type { Options as HTMLTerserOptions } from 'html-minifier-terser';
import type { BuildOptions as ESBuildConfig } from 'esbuild';
import type { Merge, PackageJson } from 'type-fest';
import type { Markdown } from '../misc/markdown';
import type { Paths, Directories, Views, Config, Logger, Processors } from '../config/index';
import type { AxiosRequestConfig } from 'axios';
import type { Plugins } from './plugin';
import type { ScriptBundle, ESBuildProcesser } from '../transforms/script';
import type { StyleBundle, SASSProcesser, PostCSSProcesser } from '../transforms/style';
import type { SVGBundle, SVGOProcesser, SVGSpriteProcesser } from '../transforms/svg';
import type { HOT } from './hot';
import type { JSONMinify, ESBuildMinify, ViewMinify } from '../config/minify';
import type { JSONBundle } from '../transforms/json';

/* -------------------------------------------- */
/* RE-EXPORT                                    */
/* -------------------------------------------- */

export { File } from './file';
export { Cache } from './cache';

/* -------------------------------------------- */
/* PROCESSORS                                   */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Processor configuration state. This model infers which
 * pre-processors are being used and/or available.
 */
export interface ProcessorConfig {
  json: JSONBundle
  /**
   * [PostCSS](https://postcss.org/) Pre-Processor
   */
  postcss: PostCSSProcesser;
  /**
   *  [SASS Dart](https://sass-lang.com/documentation/js-api/) Pre-Processor
   */
  sass: SASSProcesser;
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

/* -------------------------------------------- */
/* SPAWNED PROCESSES                            */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Spawn configuration state.
 */
export interface SpawnBundle {
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
/* THEME                                        */
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
/* MINIFY                                       */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 */
export interface Minify {
  /**
   * JSON Minification
   */
  json?: JSONMinify;
  /**
   * View (Liquid) Minification
   */
  liquid?: Omit<ViewMinify, 'collapseWhitespace'>;
  /**
   * View (HTML) Minification
   *
   * > Uses [html-minifier-terser](https://github.com/terser/html-minifier-terser)
   */
  html?: HTMLTerserOptions;
  /**
   * JS/TS Minification
   *
   * > Uses [esbuild](https://esbuild.github.io/api/#minify) minificiation
   */
  script?: ESBuildMinify;
}
/* -------------------------------------------- */
/* RESOURCE MODES                               */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 */
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
   * Run minification, either `--prod` or `--minify`
   */
  minify: boolean;
  /**
   * Trigger export, alias: `-e`
   */
  export: boolean;
}

/* -------------------------------------------- */
/* BUNDLE                                       */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Bundle Configuration. This is an internally used model
 * which maintains a store used for handling. It holds the
 * modules path resolutions and execution options.
 */
export interface Bundle {
  /**
   * The version defined in the package.json
   */
  version: string;
  /**
   * Logger Options
   */
  logger: Logger;
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
  hot: HOT;
   /**
    * Directory structure paths
    */
  paths: Paths<Tester>
   /**
    * Base directory path references
    */
  dirs: Merge<Directories, { cache: string }>;
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
  spawn: SpawnBundle
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
  script: ScriptBundle[];
  /**
   * Style handling
   */
  style: StyleBundle[];
  /**
   * SVG handling
   */
  svg: SVGBundle[];
  /**
   * Image handling
   */
  image: any
  /**
   * Minify Options
   */
  minify: {
    json: boolean;
    views: boolean;
    script: boolean;
    get options(): Minify
  }
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
   * Returns the `package.json` contents
   */
  get pkg(): PackageJson;
  /**
   * Plugins
   */
  get plugins(): Plugins;
}
