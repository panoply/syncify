/* eslint-disable no-unused-vars */

import type { Tester } from 'anymatch';
import { Merge } from 'type-fest';
import { Markdown } from '../misc/markdown';
import { Paths, Directories, HOT, Transforms, Views, Minify } from '../config/index';
import { SVGInline, SVGSprite } from '../config/transforms';
import { AxiosRequestConfig } from 'axios';
import { Plugins } from './plugin';

/* -------------------------------------------- */
/* RE-EXPORT                                    */
/* -------------------------------------------- */

export { File } from './file';
export { Cache } from './cache';

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
  push: boolean
  /**
   * Trigger export, alias: `-e`
   */
  export: boolean;
}

/* -------------------------------------------- */
/* BUNDLE                                       */
/* -------------------------------------------- */

export declare type Style = Merge<Transforms['style'], { input: string; watch: Tester; }>

export interface Bundle {
  /**
   * The version defined in the package.json
   */
  version: string;
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
  paths: { [K in keyof Paths]: Tester };
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
  watch: string[];
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
   * Page handling
   */
  style: Merge<Transforms['style'], { input: string; watch: Tester; }>[];
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
   * JSON handling
   */
  json: Merge<Transforms['json'], {
    exclude: Tester
  }>;
  /**
   * Minify Options
   */
  minify: {
    script: Minify['script'];
    json: Merge<Minify['json'], { exclude: Tester }>;
    html: Merge<Minify['html'], { exclude: Tester }>;
    liquid: Merge<Minify['liquid'], { exclude: Tester }>;
  };
  /**
   * Plugins
   */
  get plugins(): Plugins
}
