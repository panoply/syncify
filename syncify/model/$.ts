/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import type * as Type from 'types';
import type { Commands } from 'types/internal';
import type { ChildProcess } from 'node:child_process';
import type PackageJson from '@npmcli/package-json';
import { size } from '@syncify/ansi';
import { join } from 'node:path';
import { homedir, tmpdir } from 'node:os';
import { PATH_KEYS } from 'syncify:const';
import { defaults } from './defaults';
import { processor } from './processor';
import { plugins } from './plugins';
import { object, merge } from 'syncify:utils';

const paths = (): Type.PathBundle => {

  const state = object<Type.PathBundle>();

  for (const path of PATH_KEYS) {
    state[path] = object<Type.PathsRef>({
      input: new Set(),
      match: null,
      config: null,
      rename: []
    });
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
   * The processors configuration settings
   */
  private static processor: Type.ProcessorsBundle = processor();

  /**
   * The parsed contents of `package.json` file
   */
  private static package: PackageJson;

  /**
   * Cache interface
   */
  private static cache: Type.Cache.Model = object();

  /**
   * Chokidar watch instance
   */
  private static watch: Type.WatchBundle = new Set() as unknown as Type.WatchBundle;

  /**
   * The Syncify Module installation reference
   *
   * > This is temporary and will be removed in future versions as it exists
   * > for support with `--strap` command and applied to dependency key of package.json
   */
  public module: string = 'github:panoply/syncify#next';

  /**
   * Process Child
   */
  public process: ChildProcess;

  /**
   * Whether or not to restart process
   */
  public restart: boolean = false;

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
   * The version defined in the package.json
   *
   * @default null
   */
  public version: string = VERSION;

  /**
   * Cache copy of the invoked commands in which syncify was started
   *
   * @default null
   */
  public cmd: Commands = object();

  /**
   * The provided command passed on the CLI.
   *
   * @default null
   */
  public argv: string = null;

  /**
   * CLI provided filters
   *
   * @default null
   */
  public filters: Type.Filters = object();

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
   * Home or temporary directory is home fails
   *
   * @example
   * '/Users/sissel/.syncify/'
   * // OR
   * '/var/folders/m3/5574nnhn0yj488ccryqr7tc80000gn/T'
   */
  public home: string = join(homedir() || tmpdir(), '.syncify');

  /**
   * The current working directory
   *
   * @default null
   */
  public cwd: string = process.cwd();

  /**
   * Base directory path references
   */
  public dirs: Type.Dirs = object<Type.Dirs>({
    module: join(this.cwd, 'node_modules', '@syncify/cli'),
    straps: join(this.cwd, 'node_modules', '@syncify/cli', 'straps'),
    examples: join(this.cwd, 'node_modules', '@syncify/cli', 'examples'),
    chrome: null,
    static: null,
    cache: null,
    config: null,
    export: null,
    import: null,
    input: null,
    output: null,
    sourcemaps: {
      root: null,
      scripts: null,
      styles: null
    }
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
   * instructions Syncify was initialised.
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
    server: 3000,
    socket: 8089,
    method: 'hot',
    strategy: 'hydrate',
    label: 'visible',
    source: null,
    previewBar: false,
    loadEventJS: '',
    chromeFlags: [
      '--restore-last-session',
      '--disable-gpu',
      '--no-sandbox',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      '--disable-sync',
      '--disable-password-manager',
      '--disable-save-password-bubble',
      '--disable-translate',
      '--disable-features=TranslateUI',
      '--disable-infobars',
      '--disable-web-security',
      '--test-type'
    ]
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
    config: {
      clear: true,
      silent: false,
      stats: true,
      warnings: true
    }
  });

  /**
   * The operation mode executing
   *
   * @default false // all modes are false by default
   */
  public mode: Type.Modes = object({
    dev: true,
    build: false,
    interactive: false,
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
   * Files store - Holds a `Set` reference to all files
   */
  public files: Map<string, Set<string>> = new Map();

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
  public section: Type.SectionBundle = {
    schema: null,
    shared: new Map()
  };

  /**
   * Directory structure paths.
   *
   * Includes a special `transforms` Map reference for transform related files
   * which may potentially be using an extension that would lead to it being identified
   * as a different file type. This occurs when (for example) a snippet generated transform
   * is set as an output.
   *
   * >**NOTE**
   * >
   * > The `transform` option will point to resolved file names and the values for each entry
   * > will equal an enum `Type` number. The following transforms are identifiable:
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
    language: 'html',
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
   * Liquid Transforms
   *
   * @default []
   */
  public liquid: Type.LiquidBundle = {
    terse: {
      enabled: false,
      exclude: null,
      liquid: {
        minifySchema: true
      },
      markup: {
        // EXPOSED
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        removeComments: true,
        //
        // OVERRIDES
        caseSensitive: false,
        collapseBooleanAttributes: false,
        collapseInlineTagWhitespace: false,
        conservativeCollapse: false,
        keepClosingSlash: false,
        noNewlinesBeforeTagClose: false,
        preventAttributesEscaping: false,
        removeEmptyAttributes: false,
        removeEmptyElements: false,
        removeOptionalTags: false,
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: false,
        continueOnParseError: true,
        trimCustomFragments: false,
        ignoreCustomFragments: [
          /(?<=\bstyle\b=["']\s?)[\s\S]*?(?="[\s\n>]?)/,
          /<style[\s\S]*?<\/style>/,
          /<script[\s\S]*?<\/script>/,
          /{%[\s\S]*?%}/
        ]

      }
    }
  };

  /**
   * Liquid Transforms
   *
   * @default []
   */
  public json: Type.JSONBundle = {
    crlf: false,
    cache: null,
    comments: false,
    exclude: null,
    indent: 2,
    useTab: false,
    terse: {
      enabled: false,
      exclude: null,
      options: {
        assets: true,
        config: true,
        locales: true,
        metafields: true,
        metaobject: true,
        groups: true,
        templates: true
      }
    }
  };

  /**
   * Image transforms
   */
  public image: any;
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
   * Returns the `package.json` contents
   */
  get pkg (): Type.PKG { return <Type.PKG>Bundle.package.content; }
  /**
   * Returns the `package.json` contents
   */
  get package () { return Bundle.package; }
  /**
   * Returns the `package.json` contents
   */
  set package (pkg) { Bundle.package = pkg; }
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
