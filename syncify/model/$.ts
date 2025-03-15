import type { ChildProcess } from 'node:child_process';
import type * as Type from 'types';
import type { File } from '~file';

import { homedir, platform } from 'node:os';
import { join } from 'node:path';
import { cwd } from 'node:process';

import { tsize } from '@syncify/ansi';

import { defaults } from './defaults';
import { Stores, Targets } from './extends';
import { plugins } from './plugins';
import { processor } from './processor';

import { checksum, m, merge, o, paths, pm, s } from '~utils';

export { q } from './queue';

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
  private static config: Type.Config = defaults();

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
   *
   * > When `null` there is no `package.json` file present in the project.
   */
  private static package: Type.PKG = null;

  /**
   * The package manager used
   */
  private static pm: string = null;

  /**
   * Cache interface
   */
  private static cache: Type.Cache.Model = o();

  /**
   * The user platform OS
   */
  public readonly platform: NodeJS.Platform = platform();

  /**
   * The Syncify Github Repository
   */
  public readonly github: string = 'https://github.com/panoply/syncify.git';

  /**
   * The version of Syncify running
   */
  public readonly version: string = VERSION;

  /**
   * **READY AT RUNTIME**
   *
   * Home or temporary directory if home fails
   *
   * @example
   * '/Users/sissel/.syncify'
   */
  public readonly home: string = join(homedir(), '.syncify');

  /**
   * The provided command passed on the CLI.
   *
   * > The references sliced[2] copy of `process.argv`
   */
  public argv: string[];

  /**
   * The path to node.js binary
   */
  public node: string;

  /**
   * The path to the script binary being run
   */
  public bin: string;

  /**
   * Model representing the shopify stores
   */
  public stores: Stores = new Stores();

  /**
   * Model representing the shopify themes
   * Each theme can access their associated {@link Stores}
   */
  public target: Targets = new Targets();

  /**
   * Cache copy of the invoked commands in which syncify was started.
   * By default, this structure will assign `target` and `filter` entries
   * only, as they are parsed and handled in their own respective define
   * operations.
   */
  public cmd: Type.CommandValues = o({
    target: [],
    filter: [],
    batch: 16
  });

  /**
   * Whether or not synicfy is running.
    */
  public running: boolean = false;

  /**
   * Event Name emitter reference
   */
  public event: string = null;

  /**
   * **READY AT RUNTIME**
   *
   * The current working directory
   *
   * @example
   * '/Users/sissel/projects/site-name'
   */
  public cwd: string = cwd();

  /**
   * **READY AT RUNTIME**
   *
   * Encoded checksum of the CWD
   *
   * @example
   * 'eb4e712f2f3970b7'
   */
  public hash: string = checksum(this.cwd);

  /**
   * **READY AT RUNTIME**
   *
   * Root directory base
   *
   * @example
    * '/Users/sissel/.syncify/eb4e712f2f3970b7'
    */
  public root: string = join(this.home, this.hash);

  /**
   * Base directory path references. These are fully resolved absolute URI
   * paths pointing to all base directory locations, included cached locations.
   */
  public dirs: Type.Dirs = o<Type.Dirs>({
    module: null,
    input: null,
    output: null,
    config: this.cwd,
    hot: join(this.root, 'hot'),
    cache: join(this.root, 'cache'),
    temp: join(this.root, 'temp'),
    versions: join(this.root, 'versions'),
    sourcemaps: {
      root: join(this.root, 'sourcemaps'),
      scripts: join(this.root, 'sourcemaps', 'scripts'),
      styles: join(this.root, 'sourcemaps', 'styles')
    }
  });

  /**
   * Configuration file path resolutions for `syncify.config` and `package.json`
   * and other required files.
   */
  public file: Type.Files = o<Type.Files>({
    keychain: join(this.home, '.keychain'),
    pkg: join(this.cwd, 'package.json'),
    notifier: join(this.home, 'icon.png'),
    project: null,
    tsconfig: null,
    targets: null,
    env: null,
    config: null,
    githook: null
  });

  /**
   * Global keychain for store access tokens stored in home
   */
  public keychain: Record<string, { [tokenName: string]: Type.Keychain }> = null;

  /**
   * The project store which references the parsed cache project file. This reference
   * is a `Proxy` type and will apply atomic writes to the project cache file.
   * The data this reference holds lives in the root project location of the users OS.
   *
   * > This will be `null` and populated at runtime in one of the first operations to occur.
   */
  public project: Type.Project = null;

  /**
   * The installation binary being used
   */
  public using: 'global' | 'local' = null;

  /**
   * Process Child
   */
  public process: ChildProcess = null;

  /**
   * Whether or not to restart process
   */
  public restart: boolean = false;

  /**
   * Websockets HOT reloading instance
   *
   * @default null
   */
  public wss: Type.WSS = null;

  /**
   * Stats information for the output directory
   *
   * @default null
   */
  public stats: Type.Stats = o();

  /**
   * CLI provided filters
   *
   * @default null
   */
  public filters: Type.Filters = o();

  /**
   * Error store, holds reference to errors. Map key is {@link File}
   * and values are an array list of string error messages.
   *
   * @default Map<File, string>
   */
  public errors: Map<File, string[]> = m();

  /**
   * Error stack store. Used in some instances where stack-trace is
   * required and reference is to exist. Stacks are temporary.
   *
   * @default Set<string>
   */
  public stacks: Set<string> = s();

  /**
   * Error store, holds reference to errors
   *
   * The file uri input path - The `Map` will hold
   * process identifier and a `Set` of stack messages.
   *
   * @default
   * {}
   */
  public warnings: Type.Warnings = m();

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
   * Stash Import paths
   *
   * Used in `pull` modes and assigns the locations to files that are unresolvable.
   * This will only be assigned and populated in certain modes.
   */
  public stash: Type.PathStash = o<Type.PathStash>({
    assets: null,
    blocks: null,
    config: null,
    customers: null,
    layout: null,
    locales: null,
    metaobject: null,
    sections: null,
    snippets: null,
    templates: null
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
  public env: Type.Env = o<Type.Env>({
    dev: true,
    cli: false,
    tree: true, // TODO - REMOVE THIS
    prod: false,
    ready: false,
    sync: 0,
    vars: null
  });

  public git: any = {};

  /**
   * Version Control settings
   */
  public vc: Type.VersionControl = o<Type.VersionControl>({
    cache: null,
    source: 1,
    dir: null,
    number: null,
    zip: null,
    patch: 0,
    major: 0,
    minor: 0,
    update: null
  });

  /**
   * Hot reload mode options - Use the `mode.hot` reference to
   * determine whether or not HOT reloading is enabled.
   */
  public hot: Type.HOTBundle = o<Type.HOTBundle>({
    source: null,
    route: null,
    ready: false,
    server: 41001,
    socket: 51001,
    label: true,
    eject: true,
    method: 'hot',
    client: 'inject',
    alias: {},
    layouts: [
      'theme.liquid'
    ],
    version: o({
      source: null,
      remote: null,
      local: HOT_VERSION
    }),
    flags: o({
      'no-preview-bar': true,
      'no-checkout-preloads': false,
      'no-perfkit': false,
      'no-trekkie': false,
      'no-shopify-features': false,
      'no-web-pixels-manager': false
    }),
    cache: o({
      root: null,
      snippet: null,
      layouts: []
    }),
    alive: o({
      snippet: false,
      layouts: o()
    })
  });

  /**
   * Log state and console references
   */
  public log: Type.LogBundle = o<Type.LogBundle>({
    idle: false,
    group: 'Syncify',
    mode: null,
    title: NIL,
    uri: NIL,
    queue: s(),
    changes: m<string, number>()
  });

  /**
   * Bulk batch model - used when performing bulk operations in `watch` mode.
   */
  public bulk: Type.Bulk = o<Type.Bulk>({
    id: null,
    group: NIL,
    files: 0,
    type: null,
    synced: s()
  });

  /**
   * The operation mode executing
   *
   * @default false // all modes are false by default
   */
  public mode: Type.Modes = o<Type.Modes>({
    _: null,
    align: false,
    bind: false,
    build: false,
    clean: false,
    debug: false,
    bulk: false,
    create: false,
    doctor: false,
    dev: false,
    pack: false,
    force: false,
    git: false,
    help: false,
    hot: false,
    projects: false,
    inspect: false,
    keychain: false,
    main: false,
    metafields: false,
    pages: false,
    prod: false,
    prompt: false,
    prune: false,
    publish: false,
    pull: false,
    push: false,
    stash: false,
    redirects: false,
    liquid: false,
    json: false,
    script: false,
    style: false,
    svg: false,
    init: false,
    setup: false,
    suggest: false,
    terse: false,
    link: false,
    unpublished: false,
    version: false,
    watch: false
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
  public section: Type.SectionBundle = o<Type.SectionBundle>({
    schema: null,
    shared: m(),
    template: o()
  });

  /**
   * Page transforms
   *
   * Populated during the setPages options generation
   */
  public page: Type.PageBundle = null;

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
  public liquid: Type.LiquidBundle = o({
    terse: {
      enabled: false,
      exclude: null,
      liquid: {
        minifySchema: true
      },
      markup: {

        // EXPOSED
        //
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        removeComments: true,

        // OVERRIDES
        //
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
  });

  /**
   * Liquid Transforms
   *
   * @default []
   */
  public json: Type.JSONBundle = o({
    crlf: false,
    cache: null,
    stripComments: false,
    exclude: null,
    indent: 2,
    useTab: false,
    sortObjects: false,
    sortArrays: [],
    noSortList: [],
    options: {
      indentSize: 2,
      useTab: false,
      crlf: false,
      arrays: false,
      objects: false,
      removeComments: false,
      exclude: []
    },
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
  });

  /**
  * Returns the {@link Bundle.cache} static model
  */
  get cache () { return Bundle.cache; }
  /**
   * Returns the {@link Bundle.cache.checksum} static model
   */
  get checksum () { return Bundle.cache.checksum; }
  /**
   * Processor Configurations
   */
  get processor () { return Bundle.processor; }
  /**
   * Merge users configuration with default
   */
  set config (data: Type.Config) { Bundle.config = merge(Bundle.config, data); }
  /**
   * Returns the merged configuration of users syncify configuration with defaults
   */
  get config () { return Bundle.config; }
  /**
   * Returns the `package.json` contents
   */
  get pkg (): Type.PKG { return <Type.PKG>Bundle.package; }
  /**
   * Set the `package.json` contents
   */
  set pkg (pkg) { Bundle.package = pkg; }
  /**
   * Returns the `package.json` contents
   */
  get pm (): string { return Bundle.pm === null ? pm() : Bundle.pm; }
  /**
   * Set the `package.json` contents
   */
  set pm (manager) { Bundle.pm = manager; }
  /**
   * Plugins
   */
  get plugins (): Type.Plugins { return Bundle.plugins; }
  /**
   * The terminal rows and columns size
   */
  get terminal (): { cols: number; rows: number; wrap?: number } { return tsize(); }

}();

export type Bundle = typeof $
