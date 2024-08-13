/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import type { ChildProcess } from 'node:child_process';
import * as Type from 'types';
import { argv } from 'node:process';
import merge from 'mergerino';
import { size } from 'syncify:cli/size';
import { PATH_KEYS } from 'syncify:const';
import { terser } from './terser';
import { defaults } from './defaults';
import { processor } from './processor';
import { plugins } from './plugins';
import { object } from 'syncify:utils';

function paths (): Type.PathBundle {

  const state = object<Type.PathBundle>();

  for (const path of PATH_KEYS) {
    state[path] = object<Type.PathsRef>({ input: null, match: null });
  }

  state.transforms = new Map();

  return state;

};

/**
 * Bundle State Configuration
 *
 * This model represents bundle specific configuration options and settings.
 * This will merged with the CLI defined options.
 */
export const $ = new class Bundle {

  /**
   * The users configuration settings merged with defaults
   */
  private static defaults: Type.Config = defaults();

  /**
   * Plugins
   */
  private static plugins: Type.Plugins = plugins();

  /**
   * The terse minification configuration settings
   */
  private static terser: Type.TerserConfig = terser();

  /**
   * The processors configuration settings
   */
  private static processor: Type.ProcessorsBundle = processor();

  /**
   * The parsed contents of `package.json` file
   */
  private static package: Type.PKG = object();

  /**
   * Cache interface
   */
  private static cache: Type.Cache.Model = object();

  /**
   * Chokidar watch instance
   */
  private static watch: Type.WatchBundle = new Set() as unknown as Type.WatchBundle;

  /**
   * Process Child
   */
  public process: ChildProcess;

  /**
   * Whether or not to restart process
   */
  public restart: boolean = false;

  /**
   * Cached reference of the CLI commands passed
   */
  public cli: Type.Commands = object();

  /**
   * Websockets HOT reloading
   */
  public wss: Type.WSS = null;

  /**
   * Stats information for the output directory
   *
   * @default null
   */
  public stats: Type.Stats = object();

  /**
   * CLI provided filters
   *
   * @default null
   */
  public filters: Type.Filters = object();

  /**
   * Cache copy of the invoked commands in which syncify was started
   *
   * @default null
   */
  public commands: Type.Commands = object();

  /**
   * The version defined in the package.json
   *
   * @default null
   */
  public version: string = VERSION;

  /**
   * The current working directory
   *
   * @default null
   */
  public cwd: string = null;

  /**
   * The provided command passed on the CLI.
   *
   * @default null
   */
  public argv: string = argv.slice(2).join(WSP);

  /**
   * Error store, holds reference to errors
   *
   * @default Set<string>
   */
  public errors: Set<string> = new Set();

  /**
   * Error store, holds reference to errors
   *
   * The file uri input path - The `Map` will hold
   * process identifier and a `Set` of stack messages.
   *
   * @default
   * {}
   */
  public warnings: Type.Warnings = new Map();

  /**
   * Theme Publishing
   */
  public publish: Type.PublishBundle = object<Type.PublishBundle>({
    ngrok: null,
    bindVersion: false,
    publishRole: 'unpublished',
    themeLimit: 3,
    tunnelPort: 80
  });

  /**
   * Version Control
   *
   * @default
   * {
   *  dir: null,
   *  number: null,
   *  zip: null,
   *  patch: 0,
   *  major: 0,
   *  minor: 0,
   *  update: null
   * }
   */
  public vc: Type.VC = object<Type.VC>({
    dir: null,
    number: null,
    zip: null,
    patch: 0,
    major: 0,
    minor: 0,
    update: null
  });

  /**
   * Execution options which describe the invocation and operation
   * instructions which Syncify was initialised.
   *
   * @default
   * {
   *  cli: false,
   *  dev: true,
   *  prod: false
   *  sync: 0,
   *  vars: {}
   * }
   */
  public env: Type.Env = object<Type.Env>({
    cli: false,
    tree: false,
    dev: true,
    prod: false,
    ready: false,
    sync: 0,
    file: null,
    vars: {}
  });

  /**
   * Hot reload mode options - Use the `mode.hot` reference to
   * determine whether or not HOT reloading is enabled.
   *
   * @default
   * {
   *  inject: true,
   *  server: 3000,
   *  socket: 8089,
   *  method: 'hot',
   *  scroll: 'preserved',
   *  layouts: [ 'theme.liquid' ],
   *  label: 'visible',
   *  renderer: '{% render \'hot.js\', server: 3000, socket: 8089 %}',
   *  snippet: null,
   *  output: null,
   *  alive: {}
   * }
   */
  public hot: Type.HOTBundle = object<Type.HOTBundle>({
    inject: true,
    server: 3000,
    socket: 8089,
    history: false,
    method: 'hot',
    strategy: 'hydrate',
    scroll: 'preserved',
    layouts: [ 'theme.liquid' ],
    label: 'visible',
    snippet: null,
    output: null,
    alive: {},
    renderer: '{% render \'hot.js\'' + [
      ''
      , 'server: 3000'
      , 'socket: 8089'
      , 'strategy: "hydrate"'
      , 'scroll: "preserved"'
      , 'label: "visible"'
      , 'history: false'
      , 'method: "hot"'
    ].join(', ') + ' %}'

  });

  /**
   * Log State
   */
  public log: Type.LogBundle = object<Type.LogBundle>({
    idle: false,
    group: 'Syncify',
    title: NIL,
    uri: NIL,
    listen: null,
    thrown: null,
    queue: new Set(),
    changes: object(),
    config: object<Type.Logger>({
      clear: true,
      silent: false,
      stats: true,
      warnings: true
    })
  });

  /**
   * The operation mode executing
   *
   * @default false // all modes are false by default
   */
  public mode: Type.Modes = object<Type.Modes>({
    build: false,
    interactive: false,
    dev: true,
    prod: false,
    strap: false,
    watch: false,
    clean: false,
    cache: false,
    setup: false,
    upload: false,
    import: false,
    metafields: false,
    terse: false,
    hot: false,
    pages: false,
    pull: false,
    force: false,
    views: false,
    script: false,
    image: false,
    style: false,
    svg: false,
    redirects: false,
    export: false,
    release: false,
    publish: false,
    themes: false
  });

  /**
   * The configuration file name resolution
   *
   * @default
   * {
   *  base: null,
   *  ext: null,
   *  path: null,
   *  relative: null
   *  type: null
   * }
   */
  public file: Type.ConfigFile = object<Type.ConfigFile>({
    base: null,
    path: null,
    relative: null
  });

  /**
   * Files store - Holds a `Set` reference to all files
   */
  public files: Map<string, Set<string>> = new Map();

  /**
   * Base directory path references
   */
  public dirs: Type.Dirs = object<Type.Dirs>();

  /**
   * Passed commands that may be of importance in the transform or build processes.
   *
   * @default
   * {
   *   config: null,
   *   delete: null,
   *   filter: null,
   *   input: null,
   *   output: null
   * }
   */
  public cmd: Type.CommandBundle = object<Type.CommandBundle>({
    config: null,
    delete: null,
    filter: null,
    input: null,
    output: null
  });

  /**
   * The available stores as per configuration in `package.json` file
   *
   * @default
   * {
   *   themes: [],
   *   stores: []
   * }
   */
  public stores: Type.Stores[] = [];

  /**
   * The sync clients. Multiple stores and themes can run concurrently.
   *
   * @default
   * {
   *   themes: [],
   *   stores: []
   * }
   */
  public sync: Type.Sync = object<Type.Sync>({
    themes: [],
    stores: []
  });

  /**
   * Spawn related configuration operations
   */
  public spawn: Type.Spawn = object<Type.Spawn>({
    paths: new Set(),
    streams: new Map(),
    invoked: false,
    commands: object()
  });

  /**
   * Section sub-directory configuration
   *
   * @todo
   * Allow anymatch global patterns
   *
   * @default
   * {
   *   prefixDir: false,
   *   separator: '-',
   *   global: null
   * }
   */
  public section: Type.SectionBundle = object<Type.SectionBundle>({
    prefixDir: false,
    separator: '-',
    global: null,
    baseDir: new Set(),
    schema: null,
    shared: new Map()
  });

  /**
   * Snippet sub-directory configuration
   *
   * @todo
   * Allow anymatch global patterns
   *
   * @default
   * {
   *   prefixDir: false,
   *   separator: '-',
   *   global: null
   * }
   */
  public snippet: Type.SnippetBundle = object<Type.SnippetBundle>({
    prefixDir: false,
    separator: '-',
    global: null,
    baseDir: new Set()
  });

  /**
   * Directory structure paths.
   *
   * Includes a special `transforms` Map reference for transform related files
   * which may potentially be using an extension that would lead to it being identified
   * as a different file type. This occurs when (for example) snippet generated transforms
   * are inferred. The `transform` option will point to resolved file names and the values
   * for each entry will equal an enum `Type` number. The following transforms are identifiable:
   *
   * - `7` > `Type.Style`
   * - `8` > `Type.Script`
   * - `9` > `Type.SVG`
   */
  public paths: Type.PathBundle = paths();

  /**
   * Page transforms
   *
   * @default
   * {
   *  export: {
   *    quotes: '“”‘’',
   *    html: true,
   *    linkify: false,
   *    typographer: false,
   *    xhtmlOut: false,
   *    breaks: true,
   *    langPrefix: 'language-'
   *  },
   *  import: {
   *    codeBlockStyle: 'fenced',
   *    emDelimiter: '_',
   *    fence: '```',
   *    headingStyle: 'atx',
   *    hr: '---',
   *    linkReferenceStyle: 'full',
   *    linkStyle: 'inlined',
   *    strongDelimiter: '**',
   *    bulletListMarker: '-'
   *  }
   *}
   */
  public page: Type.PageBundle = object<Type.PageBundle>({
    safeSync: true,
    author: '',
    global: null,
    suffixDir: false,
    language: 'html',
    export: object<Type.Markdown.Export>({
      quotes: '“”‘’',
      html: true,
      linkify: false,
      typographer: false,
      xhtmlOut: false,
      breaks: true,
      langPrefix: 'language-'
    }),
    import: object<Type.Markdown.Import>({
      codeBlockStyle: 'fenced',
      emDelimiter: '_',
      fence: '```',
      headingStyle: 'atx',
      hr: '---',
      linkReferenceStyle: 'full',
      linkStyle: 'inlined',
      strongDelimiter: '**',
      bulletListMarker: '-'
    })
  });

  /**
   * Script transforms
   *
   * @default []
   */
  public script: Type.ScriptBundle[] = [];
  /**
   * Style tranforms
   *
   * @default []
   */
  public style: Type.StyleBundle[] = [];
  /**
   * SVG transforms
   *
   * @default []
   */
  public svg: Type.SVGBundle[] = [];
  /**
   * Image transforms
   */
  public image: any;
  /**
   * Terser Minification Options
   */
  public terse: Type.TerserBundle = object<Type.TerserBundle>({
    /**
     * Terse JSON Minification
     *
     * @default false
     */
    json: false,
    /**
     * Terse Liquid minification
     */
    liquid: false,
    /**
     * Terse Markup (HTML) minification
     */
    markup: false,
    /**
      * **NOTE YET AVAILABLE**
      *
      * Terse Style (CSS) Minification
      */
    style: false,
    /**
      * Terse Script (JS/TS) Minification
      */
    script: false
  });

  /**
   * Holds an instance of FSWatcher. Chokidar is leveraged in for watching,
   * and this value exposes the instance and it can be used anywhere in the
   * module. In addition, the main Chokidar is extended to support `.has()`
   *
   * @default null // defaults to null unless watch mode is invoked
   */
  get watch () { return Bundle.watch; }
  /**
   * Set the FSWatch instance reference
   */
  set watch (instance: Type.WatchBundle) { Bundle.watch = instance; }
  /**
  * Merged terse minification configuration
  */
  get cache () { return Bundle.cache; }
  /**
    * Merged terse minification configuration
    */
  set cache (cache: Type.Cache.Model) { Bundle.cache = cache; }
  /**
  * Merged terse minification configuration
  */
  get terser () { return Bundle.terser; }
  /**
    * Merged terse minification configuration
    */
  set terser (options: Type.TerserConfig) { Bundle.terser = merge(Bundle.terser, options); }
  /**
   * Processor Configurations
   */
  get processor () { return Bundle.processor; }
  /**
   * Merge users configuration with default
   */
  set config (data: Type.Config) { Bundle.defaults = merge(Bundle.defaults, data); }
  /**
   * Returns the merged configuration of users syncify configuration with defaults
   */
  get config () { return Bundle.defaults; }
  /**
   * Merge the `package.json` contents
   */
  set pkg (data: Type.PKG) { Bundle.package = data; }
  /**
   * Returns the `package.json` contents
   */
  get pkg (): Type.PKG { return Bundle.package; }
  /**
   * Plugins
   */
  get plugins (): Type.Plugins { return Bundle.plugins; }
  /**
   * The terminal rows and columns size
   */
  get terminal (): { cols: number; rows: number; wrap?: number } { return size(); }

}();

export type Bundle = typeof $
