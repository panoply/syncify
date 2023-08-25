/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import type {
  Commands,
  Config,
  Cache,
  Directories,
  Logger,
  Plugins,
  WSS,
  Env,
  CommandBundle,
  ConfigFile,
  Modes,
  Spawn,
  Sync,
  Filters,
  SVGBundle,
  ScriptBundle,
  StyleBundle,
  HOTBundle,
  TerserBundle,
  TerserConfig,
  PageBundle,
  SnippetBundle,
  SectionBundle,
  WatchBundle,
  ProcessorsBundle,
  PathBundle
} from 'types';
import type { ChildProcess } from 'node:child_process';
import { argv } from 'node:process';
import { PackageJson } from 'type-fest';
import merge from 'mergerino';
import { terser } from './terser';
import { defaults } from './defaults';
import { processor } from './processor';
import { plugins } from './plugins';
import { size } from '~cli/size';
import { PATH_KEYS } from '~const';
import { create } from '~utils/native';

/**
 * Warning stacks, maintains a store of log messages
 */
export const warning: {
  current: string;
  count: number;
  process: {
    [id: string]: Set<string>
  }
} = {
  current: null,
  count: 0,
  process: {}
};

function paths (): PathBundle {

  const state = create(null);

  for (const path of PATH_KEYS) {
    state[path] = create(null);
    state[path].input = null;
    state[path].match = null;
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
  private static defaults: Config = defaults();

  /**
   * Plugins
   */
  private static plugins: Plugins = plugins();

  /**
   * The terse minification configuration settings
   */
  private static terser: TerserConfig = terser();

  /**
   * The processors configuration settings
   */
  private static processor: ProcessorsBundle = processor();

  /**
   * The parsed contents of `package.json` file
   */
  private static package: PackageJson = {};

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
  public cli: Commands = {};

  /**
   * Cache references indexed from `node_modules/.syncify`
   */
  public cache: Cache = {};

  /**
   * Websockets HOT reloading
   */
  public wss: WSS = null;

  /**
   * CLI provided filters
   *
   * @default null
   */
  public filters: Filters = {};

  /**
   * Cache copy of the invoked commands in which syncify was started
   *
   * @default null
   */
  public commands: Commands = null;

  /**
   * The version defined in the package.json
   *
   * @default null
   */
  public version: string = null;

  /**
   * The current working directory
   *
   * @default null
   */
  public cwd: string = null;

  /**
   * The terminal rows and columns size
   *
   * @default
   * {
   *   cols: number;
   *   rows: number;
   *   wrap: number;
   * }
   */
  public terminal: { cols: number; rows: number; wrap?: number } = size();

  /**
   * The provided command passed on the CLI.
   *
   * @default null
   */
  public argv: string = argv.slice(2).join(' ');

  /**
   * Error store, holds reference to errors
   *
   * @default Set<string>
   */
  public errors: Set<string> = new Set();

  /**
   * Execution options which describe the invocation and operation
   * instructions which Syncify was initialised.
   *
   * @default
   * {
   *  cli: false,
   *  dev: true,
   *  prod: false
   *  sync: 0
   * }
   */
  public env: Env = {
    cli: false,
    dev: true,
    prod: false,
    sync: 0
  };

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
  public hot: HOTBundle = {
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
  };

  /**
   * Logger Options
   */
  public logger: Logger = {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  };

  /**
   * The operation mode executing
   *
   * @default false // all modes are false by default
   */
  public mode: Modes = {
    build: false,
    interactive: false,
    watch: false,
    clean: false,
    upload: false,
    download: false,
    metafields: false,
    terse: false,
    hot: false,
    pages: false,
    pull: false,
    force: false,
    vsc: false,
    views: false,
    script: false,
    image: false,
    style: false,
    svg: false,
    redirects: false,
    export: false
  };

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
  public file: ConfigFile = {
    base: null,
    path: null,
    relative: null
  };

  /**
   * Files store - Holds a `Set` reference to all files
   */
  public files: Map<string, Set<string>> = new Map();

  /**
   * Base directory path references
   */
  public dirs: Directories = {};

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
  public cmd: CommandBundle = {
    config: null,
    delete: null,
    filter: null,
    input: null,
    output: null
  };

  /**
   * The sync clients. Multiple stores and themes can run concurrently.
   *
   * @default
   * {
   *   themes: [],
   *   stores: []
   * }
   */
  public sync: Sync = {
    themes: [],
    stores: []
  };

  /**
   * Spawn related configuration operations
   */
  public spawn: Spawn = {
    paths: new Set(),
    streams: new Map(),
    invoked: false,
    commands: {}
  };

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
  public section: SectionBundle = {
    prefixDir: false,
    separator: '-',
    global: null
  };

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
  public snippet: SnippetBundle = {
    prefixDir: false,
    separator: '-',
    global: null
  };

  /**
   * Holds an instance of FSWatcher. Chokidar is leveraged in for watching,
   * and this value exposes the instance and it can be used anywhere in the
   * module. In addition, the main Chokidar is extended to support `.has()`
   *
   *  @default null // defaults to null unless watch mode is invoked
   */
  public watch: WatchBundle | Set<string | readonly string[]> = new Set();

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
  public paths: PathBundle = paths();

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
  public page: PageBundle = {
    export: {
      quotes: '“”‘’',
      html: true,
      linkify: false,
      typographer: false,
      xhtmlOut: false,
      breaks: true,
      langPrefix: 'language-'
    },
    import: {
      codeBlockStyle: 'fenced',
      emDelimiter: '_',
      fence: '```',
      headingStyle: 'atx',
      hr: '---',
      linkReferenceStyle: 'full',
      linkStyle: 'inlined',
      strongDelimiter: '**',
      bulletListMarker: '-'
    }
  };

  /**
   * Script transforms
   *
   * @default []
   */
  public script: ScriptBundle[] = [];
  /**
   * Style tranforms
   *
   * @default []
   */
  public style: StyleBundle[] = [];
  /**
   * SVG transforms
   *
   * @default []
   */
  public svg: SVGBundle[] = [];
  /**
   * Image transforms
   */
  public image: any;
  /**
   * Terser Minification Options
   */
  public terse: TerserBundle = {
    /**
     * Terse JSON Minification
     *
     * @default false
     */
    json: false,
    /**
      * View minification
      */
    views: false,
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
  };

  /**
  * Merged terse minification configuration
  */
  get terser () { return Bundle.terser; }
  /**
    * Merged terse minification configuration
    */
  set terser (options: TerserConfig) { Bundle.terser = merge(Bundle.terser, options); }
  /**
   * Processor Configurations
   */
  get processor () { return Bundle.processor; }
  /**
   * Merge users configuration with default
   */
  set config (data: Config) { Bundle.defaults = merge(Bundle.defaults, data); }
  /**
   * Returns the merged configuration of users syncify configuration with defaults
   */
  get config () { return Bundle.defaults; }
  /**
   * Merge the `package.json` contents
   */
  set pkg (data: PackageJson) { Bundle.package = data; }
  /**
   * Returns the `package.json` contents
   */
  get pkg (): PackageJson { return Bundle.package; }
  /**
   * Plugins
   */
  get plugins (): Plugins { return Bundle.plugins; }

}();

export type Bundle = typeof $
