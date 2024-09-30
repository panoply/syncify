/* eslint-disable no-unused-vars */

import type { Merge, LiteralUnion } from 'type-fest';
import type { ChildProcessWithoutNullStreams } from 'child_process';
import type { Tester } from 'anymatch';
import type { FSWatcher } from 'chokidar';
import type { AxiosRequestConfig } from 'axios';
import type { Config as TailwindProcessor } from 'tailwindcss';
import type { ESBuildProcesser } from '../transform/script';
import type { SASSProcesser, PostCSSProcesser, TailwindCSSProcesser } from '../transform/style';
import type { SVGOProcesser, SVGSpriteProcesser } from '../transform/svg';
import type { JSONBundle } from '../transform/json';
import type { SchemaBlocks, SchemaSettings } from '../internal/schema';
import type * as Config from '../config';

/* -------------------------------------------- */
/* STATS                                        */
/* -------------------------------------------- */

export interface Dirs extends Config.Directories {
  /**
   * Sourcemaps directories - Writes are relative to root
   *
   * @default
   * 'node_modules/.syncify/sourcemaps'
   */
  sourcemaps: {
    /**
     * Root directory sourcemap path
     *
     * @default
     * 'node_modules/.syncify/sourcemaps'
     */
    root: string;
    /**
     * Script directory sourcemap path
     *
     * @default
     * 'node_modules/.syncify/sourcemaps/scripts'
     */
    scripts: string;
    /**
     * Style directory sourcemaps path
     *
     * @default
     * 'node_modules/.syncify/sourcemaps/styles'
     */
    styles: string;
  }
}

export interface Stats {
  /**
   * File count within output assets directory
   *
   * @default 0;
   */
  assets?: number;
  /**
   * File count within output snippets directory
   *
   * @default 0;
   */
  snippets?: number;
  /**
   * File count within output snippets directory
   *
   * @default 0;
   */
  sections?: number;
  /**
   * File count within output layout directory
   *
   * @default 0;
   */
  layout?: number;
  /**
   * File count within output templates directory
   *
   * @default 0;
   */
  templates?: number;
  /**
   * File count within output templates/metaobject directory
   *
   * @default 0;
   */
  metaobject?: number;
  /**
   * File count within output templates/customers directory
   *
   * @default 0;
   */
  customers?: number;
  /**
   * File count within output config directory
   *
   * @default 0;
   */
  config?: number;
  /**
   * File count within output locales directory
   *
   * @default 0;
   */
  locales?: number;
}

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
  /**
   * Whether or not Terminal TUI Tree has applied, when `true` then the TUI Tree is
   * active and logs require line prefixing.
   *
   * @default false
   */
  tree: boolean;
 /**
   * Whether or not Syncify is ready, this boolean will change after runtime operations
   * conclude. This happens when `define()` finishes
   *
   * @default false
   */
  ready: boolean;
  /**
   * The `.env` file uri containing environment variables/secrets
   */
  file: string;
  /**
   * Environment Variables
   */
  vars: {
    [key: string]: string;
  }
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
export interface Store<T = any> {
  /**
  * The store domain name captilized (without `myshopify.com`)
  *
  * @example
  * 'Webshop' // webshop.myshopify.com
  */
  store: string;
  /**
   * The store myshopify domain, eg: `store.myshopify.com`
   */
  domain: string;
  /**
   * Client instances
   */
  client: AxiosRequestConfig<T>,
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
/* PUBLISH CONFIGURATIONS                       */
/* -------------------------------------------- */

export interface PublishBundle extends Config.Publishing {
  /**
   * The ngrok token
   */
  ngrok: string;
}

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
   * Executed in dev mode, `--dev`
   */
  dev: boolean;
 /**
   * Executed in prod mode, `--prod`
   */
  prod: boolean;
 /**
   * Executed setup, `--setup`
   */
  setup: boolean;
  /**
   * Executed in strap mode, `--strap`
   */
  strap: boolean;
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
  import: boolean;
  /**
   * Execute Clean, alias: `-c`
   */
  clean: boolean;
  /**
   * Reset Cache, alias: `--cache`
   */
  cache: boolean;
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
   * Trigger export, `--export`
   */
  export: boolean;
  /**
   * Execute Publishment
   */
  publish: boolean;
  /**
   * Execute Release
   */
  release: boolean;
  /**
   * Configure Themes
   */
  themes: boolean;
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

export type SharedSection = Map<string, {
  uri: string;
  description: string | string[] | { [key: string]: string | string[] },
  schema: Record<string, (
    | SchemaSettings[]
    | SchemaBlocks[]
    | SchemaSettings
    | SchemaBlocks
  )>;
}>

/**
 * **INTERNAL USE**
 *
 * Sections sub-directory configuration
 */
export interface SectionBundle {
  /**
   * Section Schema which contains Shared Schema occurances.
   * The `key` in the object represents the full **input** URI path pointing to shared schema file.
   * The `Set<string>` value contains a list of URI paths to sections referencing the shared schema file.
   *
   * @default
   * null
   *
   * @example
   * {
   *   schema: {
   *     '~user/project/source/schema/example.schema': Set<[
   *        '~user/project/source/sections/foo.liquid',
   *        '~user/project/source/sections/bar.liquid',
   *        '~user/project/source/sections/baz.liquid'
   *     ]>
   *  }
   * }
   */
  schema: Record<string, Set<string>>
  /**
   * Shared Schema parsed file.
   *
   * The `Map` key is the shared schema **basename** without extension as per the `$ref` identifier.
   */
  shared: Map<string, {
    /**
     * The shared schema full resolved uri path
     */
    uri: string;
    /**
     * The parsed JSON schema
     */
    schema: Record<string, SchemaSettings[] | SchemaBlocks[] | SchemaSettings | SchemaBlocks>;
  }>
}

/* -------------------------------------------- */
/* PATHS                                        */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Anymatched paths
 */
export type PathsBundle = Merge<Config.Paths<Tester>, { transforms?: Map<string, 7 | 8 | 9> }>;

export type PathsRef = {
  /**
   * Set of all resolved paths;
   *
   * @default null
   */
  input: Set<string>;
  /**
   * A copy of the user define paths
   *
   * @default null
   */
  config: string;
  /**
   * Anymatch tester of all resolved paths which determine a section type
   *
   * @default null
   */
  match: Tester;
  /**
   * Match rename paths, this array will map to a rename pattern.
   *
   * @default []
   *
   * @example
   * {
   *   rename: [
   *    [ anymatch(), '[name]'],
   *    [ anymatch(), '[dir]-[name]']
   *   ]
   * }
   */
  rename: Array<[
    match: Tester,
    pattern: string
  ]>
};

export interface PathBundle {
  /**
   * Resolved match and path references uploaded as assets
   *
   * @default 'source/assets'
   */
  assets?: PathsRef
  /**
   * Resolved match and path references uploaded as snippets
   *
   * @default 'source/snippets'
   */
  snippets?: PathsRef
  /**
   * Resolved match and path references uploaded as sections
   *
   * @default 'source/sections'
   */
  sections?: PathsRef
  /**
   * Resolved match and path references uploaded as layouts
   *
   * @default 'source/layout'
   */
  layout?: PathsRef
  /**
   * Resolved match and path references uploaded as templates
   *
   * @default 'source/templates'
   */
  templates?: PathsRef
  /**
   * Resolved match and path references uploaded as template/metaobject
   *
   * @default 'source/templates/metaobjects'
   */
  metaobject?: PathsRef
  /**
   * Resolved match and path references uploaded as template/customers
   *
   * @default 'source/templates/customers'
   */
  customers?: PathsRef
  /**
   * Resolved match and path references uploaded as configs
   *
   * @default 'source/config'
   */
  config?: PathsRef
  /**
   * Resolved match and path references uploaded as locales
   *
   * @default 'source/locales'
   */
  locales?: PathsRef
  /**
   * The resolved `metafields` directory path
   *
   * @default 'source/metafields'
   */
  metafields?: PathsRef
  /**
   * The resolved shared `schema` paths
   *
   * @default 'source/schema'
   */
  schema?: PathsRef;
  /**
   * The resolved `pages` directory path
   *
   * @default 'source/pages'
   */
  pages?: PathsRef
  /**
   * The resolved `redirects` yaml file
   *
   * @default 'redirects.yaml'
   */
  redirects?: PathsRef
  /**
   * Special Transforms reference
   *
   * @default 'source/assets'
   */
  transforms?: Map<string, 7 | 8 | 9>
}

/* -------------------------------------------- */
/* SYVER                                        */
/* -------------------------------------------- */

/**
 * **INTERNAL USE**
 *
 * Version control settings
 */
export interface VC {
 /**
   * The resolved version URI
   *
   * @default 'export/v1'
   */
  dir: string;
  /**
   * The current resolved `.zip` file path
   *
   * @default 'export/v1/1.2.0.zip'
   */
  zip: string;
  /**
   * The version number in string format
   *
   * @example 'v1.1.4'
   */
  number: string;
  /**
   * The current major version number
   */
  major: number;
  /**
   * The current minor version number
   */
  minor: number;
  /**
   * The current patch version number
   */
  patch: number;
  /**
   * Update model. This is populated when `--bump` flags
   * is passed or when an export has applied.
   */
  update: {
    /**
     * The version bump type
     *
     */
    bump?: string;
    /**
     * The resolved `.zip` file path of next version
     *
     * @default 'export/v1/1.2.1.zip'
     */
    zip?: string;
    /**
     * The resolved version URI
     *
     * @default 'export/v2'
     */
    dir?: string;
    /**
     * The version number in string format
     *
     * @example 'v1.2.1'
     */
    number?: string;
    /**
     * The current major version number
     */
    major?: number;
    /**
     * The current minor version number
     */
    minor?: number;
    /**
     * The current patch version number
     */
    patch?: number;
  }
}

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
/* LOG                                          */
/* -------------------------------------------- */

export interface LogBundle {
  /**
   * The Log configuration settings inherited
   * from syncify config.
   */
  config: Config.Logger
  /**
   * Whether or not we are in idle
   */
  idle: boolean;
  /**
   * Current Group Name - This is used a `Tree.Top` and
   * will be applied to `Tree.End` respectively.
   *
   * ```bash
   * ┌─ FileKind FileNamespace ~ 01:59:20
   *
   * └─ FileKind FileNamespace ~ 01:59:20
   * ```
   */
  group: LiteralUnion<(
  | 'JSON'
  | 'CSS'
  | 'SASS'
  | 'SCSS'
  | 'JavaScript'
  | 'TypeScript'
  | 'JSX'
  | 'TSX'
  | 'Font'
  | 'SVG'
  | 'Sprite'
  | 'PDF'
  | 'Image'
  | 'Video'
  | 'Liquid'
  | 'Template'
  | 'Section'
  | 'Snippet'
  | 'Assets'
  | 'Config'
  | 'Locale'
  | 'Metaobject'
  | 'Page'
  | 'HTML'
  | 'Markdown'
  | 'Yaml'
  | 'Unknown'), string>;
  /**
   * Log Title - This is typically an additional reference
   * that is used to within certain log groups. Can be used
   * as a combinator in group.
   */
  title: string;
  /**
   * Change count tracking, which will be used to monitor
   * the amount of changes each logged file has applied.
   */
  changes: {
    [uuid: string]: number;
  }
  /**
   * The Current File **input** URI log message pertains.
   * This is called and referenced via stdin.
   */
  uri: string;
  /**
   * Upload stacks, maintains files being uploaded
   */
  queue: Set<[string, string, string]>
  /**
   * Stdout/Stderr interception hook
   */
  listen: () => void;
  /**
   * Whether or not an error or warning was thrown.
   * When `null` no error or warning
   *
   * @default null
   */
  thrown: 'ERROR' | 'WARNING'
}

/**
 * Warning stacks, maintains a store of log messages
 *
 * The file uri input path - The `Map` will hold
 * process identifier and a `Set` of stack messages.
 */
type Warnings = Map<string, Map<string, Set<string>>>

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
   * [PostCSS](https://postcss.org/) Pre-Processor
   */
  postcss?: PostCSSProcesser;
  /**
   * [SASS Dart](https://sass-lang.com/documentation/js-api/) Pre-Processor
   */
  sass?: SASSProcesser;
  /**
   * [TailwindCSS](https://tailwindcss.com/) Pre-Processor
   */
  tailwind?: TailwindCSSProcesser;
  /**
   * [Sharp](https://sharp.pixelplumbing.com) Pre-Processor
   */
  sharp?: any;
  /**
   * [SVG Sprite](https://github.com/svg-sprite) Pre-Processor
   */
  sprite?: SVGSpriteProcesser;
  /**
   * [SVGO](https://github.com/svg/svgo) Pre-Processor
   */
  svgo?: SVGOProcesser
  /**
   * [ESBuild](https://esbuild.github.io/) Pre-Processor
   */
  esbuild?: ESBuildProcesser
}
