import type { ESBuildProcesser } from './script';
import type { PostCSSProcesser, SASSProcesser, TailwindCSSProcesser } from './style';
import type { SVGOProcesser } from './svg';
import type { HTMLMinifierTerserOptions } from './terser';
import type { LiteralString } from './utilities';
import type { EvaluateOptions } from '@syncify/json';
import type { Directories, HOT, JSONTerse, JSONTransform, LiquidTerse } from '@syncify/types';
import type { uWS } from '@syncify/uws';
import type { Tester } from 'anymatch';
import type { XiorRequestConfig } from 'xior';
// FILE SYSTEM
import type { LogModes } from '~enums';

/**
 * Axios Request configs
 */
export type Clients = Record<string, XiorRequestConfig>;

/**
 * Store Model
 */
export interface Store {
  /**
   * The store name as per the target reference. This is also the
   * key reference used on the `$.stores` object.
   *
   * @example
   * 'webshop' // webshop.myshopify.com
   */
  name: string;
  /**
   * The store myshopify domain, eg: `store.myshopify.com`,
   */
  domain: string;
  /**
   * Password used for password protected stores
   *
   * @default null
   */
  password: string;
  /**
   * The store API Access token
   */
  token: string;
  /**
   * List of themes associated with this store.
   */
  get themes(): Record<string, number>;
}

/**
 * Theme Model - This represents entries of `$.target`
 */
export interface Target {
  /**
   * The theme id.
   */
  id: number;
  /**
   * Unique Identifier MurMur hash for each target which is combinator composed of
   * the store name and theme id. This is used to query targets and other
   * validation related operations.
   *
   * @example
   * 'syncify124567890' => 1021111586
   */
  uid: number;
  /**
   * The theme target name
   */
  target: string;
  /**
   * The theme role reference
   */
  role?: LiteralString<'main' | 'unpublished' | 'unknown'>;
  /**
   * Preview URL for the theme
   *
   * @example
   * 'https://syncify.myshopify.com?preview_theme_id=124567890'
   */
  get preview(): string;
  /**
   * Store theme customizer url
   *
   * @example
   * 'https://syncify.domain.com/admin/themes/124567890/editor'
   */
  get editor(): string;
  /**
   * The graphql `gid`
   *
   * @example
   * 'gid://shopify/OnlineStoreTheme/123456789'
   */
  get gid(): string;
  /**
   * Getter which reference a store existing on `$.stores`
   */
  get store(): Store;
}

export type Theme = Target

export interface Dirs extends Directories {
  /**
   * **READY AT RUNTIME**
   *
   * The cache directory path containing cbor files and persisted data stores
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/cache'
   */
  cache: string;
  /**
   * **READY AT RUNTIME**
   *
   * The temp directory path containing various hard-copy files.
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/temp'
   */
  temp: string;
  /**
   * **READY AT RUNTIME**
   *
   * The URI path to the HOT cache base directory
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/hot'
   */
  hot: string;
  /**
   * **READY AT RUNTIME**
   *
   * The resolved hard-copy cache `version` directory path.
   * Use `$.vc.cache` to obtain the current **major** sub-directory path
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/versions'
   */
  versions: string;
  /**
   * The location of the Syncify node_module package
   *
   * @default
   * null
   *
   * @example
   * 'node_modules/@syncify/cli/'
   *
   * // If global installation it will be something like:
   * '/Users/sissel/.pnpm/store/node_modules/@syncify/cli/'
   */
  module: string;
  /**
   * Sourcemaps directories - Writes are relative to root
   *
   * > **READY AT RUNTIME**
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/sourcemaps/scripts'
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/sourcemaps/styles'
   */
  sourcemaps: {
    /**
     * Root directory sourcemap path
     *
     * > **READY AT RUNTIME**
     *
     * @example
     * '/Users/sissel/.syncify/eb4e712f2f3970b7/sourcemaps'
     */
    root: string;
    /**
     * Script directory sourcemap path
     *
     * > **READY AT RUNTIME**
     *
     * @example
     * '/Users/sissel/.syncify/eb4e712f2f3970b7/sourcemaps/scripts'
     */
    scripts: string;
    /**
     * Style directory sourcemaps path
     *
     * > **READY AT RUNTIME**
     *
     * @example
     * '/Users/sissel/.syncify/eb4e712f2f3970b7/sourcemaps/styles'
     */
    styles: string;
  }
}

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
   * Environment Variables
   */
  vars: {
    [key: string]: string;
  }
}

export interface Filters {
  /**
   * Theme Asset filters
   *
   * @example
   * '--filter assets/*'
   */
  assets?: string[];
  /**
   * Theme Config filters
   *
   * @example
   * '--filter config/*'
   */
  config?: string[];
  /**
   * Theme Layout filters
   *
   * @example
   * '--filter layout/*'
   */
  layout?: string[];
  /**
   * Theme Locales filters
   *
   * @example
   * '--filter locales/*'
   */
  locales?: string[];
  /**
   * Theme Templates filters
   *
   * @example
  * '--filter assets/*'
  */
  templates?: string[];
  /**
   * Theme Customers filters
   *
   * @example
   * '--filter assets/*'
   */
  customers?: string[];
  /**
   * Theme Snippets filters
   *
   * @example
   * '--filter snippets/*'
   */
  snippets?: string[];
  /**
   * Theme sections filters
   *
   * @example
   * '--filter sections/*'
   */
  sections?: string[];
  /**
   * Store Metafields filters
   *
   * @example
   * '--filter assets/*'
   */
  metafields?: string[];
  /**
   * Store pages filters
   *
   * @example
   * '--filter pages/*'
   */
  pages?: string[];
  /**
   * Terse filters
   *
   * @example
   * '--filter terse:script'
   * '--filter terse:style'
   * '--filter terse:views'
   */
  terse?: string[];
}

export interface Files {
 /**
   * The cached project config file
   *
   * > If `null` no file exists or has been associated to project.
   *
   * @default
   * null
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/{name}'
   */
  project: string;
  /**
   * **READY AT RUNTIME**
   *
   * The notifier icon which is copied over on postinstall.
   *
   * @default
   * '/Users/sissel/.syncify/icon.png'
   *
   * @example
   * '/Users/sissel/.syncify/icon.png'
   */
  notifier: string;
  /**
   * The full resolved path to the `.env` file. This will either
   * be within projects cwd or within cache project root.
   *
   * > If `null` no `.env` file exists or has been associated to theme.
   *
   * @default
   * null
   *
   * @example
   * 'Users/Sissel/Sites/Folder/project/webshop/.env'
   * // OR
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/.env'
   */
  env: string;
  /**
   * The resolved path to `tsconfig.json` OR `jsconfig.json`
   *
   * > If `null` no `tsconfig.json` OR `jsconfig.json` file exists
   *
   * @default
   * null
   *
   * @example
   * 'Users/Sissel/Sites/Folder/project/webshop/tsconfig.json'
   * // OR
   * 'Users/Sissel/Sites/Folder/project/webshop/jsconfig.json'
   */
  tsconfig: string;
  /**
   * The full resolved path to the `.keychain` file in the root home dir.
   * The `$.keychain.define` will determine whether or not it is being used.
   *
   * > **READY AT RUNTIME**
   *
   * @example
   * 'Users/Sissel/.syncify/.keychain'
   */
  keychain: string;
  /**
   * The full resolved path to the projects `package.json` file.
   * The `$.pkg` will determine whether or not the file exists.
   *
   * > **READY AT RUNTIME**
   *
   * @example
   * 'Users/Sissel/Sites/Folder/project/webshop/package.json'
   */
  pkg: string;
  /**
   * The full resolved path to the syncify configuration file
   *
   * > If `null` no `syncify.config` file exists in the project root
   * > If config is defined within `package.json` or project, it will
   * > match the `pkg` key value.
   *
   * @default
   * null
   *
   * @example
   * 'Users/Sissel/Sites/Folder/project/webshop/syncify.config.ts'
   * // If defined within package.json
   * 'Users/Sissel/Sites/Folder/project/webshop/package.json'
   */
  config: string
  /**
   * The full resolved path to the project git hooks post-merge file.
   * This is generated for git CI integration logic.
   *
   * > If `null` no `.git/hooks/post-merge` file exists in the project
   */
  githook: string;
  /**
   * The full resolved path to the projects `theme.toml` file, which
   * is used as an alternative to `package.json` theme and store defined
   * targets.
   *
   * > If `null` no `theme.toml` file exists in the project root
   *
   * @default
   * null
   *
   * @example
   * 'Users/Sissel/Sites/Folder/project/webshop/theme.toml'
   * 'Users/Sissel/Sites/Folder/project/webshop/theme.yaml'
   * 'Users/Sissel/Sites/Folder/project/webshop/theme.yml'
   */
  targets: string;
}

export interface Keychain {
  /**
   * The keychain name, which will default to the base directory name
   */
  name: string;
  /**
   * The storefront token
   */
  token: string;
  /**
   * When the token was added to the keychain
   */
  created: number;
  /**
   * When the token was updated - matched `created` if no updates applies
   */
  updated: number;
  /**
   * Project references using the token - matches the hash of the project name
   *
   * @example
   * [
   *  'eb4e712f2f3970b7',
   *  '2f3970b7eb4e7r3'
   * ]
   */
  projects: string[]
}

export interface Project {
 /**
  * The CWD of the project
  *
  * @example
  * 'Users/Sissel/Sites/Folder/project/webshop/'
  */
  dir: string;
 /**
  * The projects name, uses the base directory name.
  *
  * @example
  * 'webshop'
  */
  name: string;
 /**
  * The users text editor reference.
  *
  * > When this is `null` the `editor` has not be defined by the user which means
  * > we will attempt to obtain the text editor reference automatically.
  *
  * @example
  * 'vscode'
  */
  textEditor: string;
 /**
  * The remote github url for the theme
  *
  * > When this is `null` the remote git URL has not be defined by the user which means
  * > we will attempt to obtain it during runtime.
  *
  * @example
  * 'https://github.com/panoply/webshop'
  */
  gitRemote: string;
 /**
  * The last known `@syncify/config` version
  *
  * > When this is `null` the `@syncify/config` package is not installed in project
  *
  * @example
  *  '1.0.0'
  */
  configVersion: string;
 /**
  * The Last known Syncify version being used by the project
  *
  * @example
  *  '1.0.0'
  */
  syncifyVersion: string;
 /**
  * The current theme version number in accordance with the version specified
  * in the `settings_schema.json` file `VERSION` property.
  *
  * > When this is `null` the version references have not yet been parsed
  * > typically signaling that a new project was just generated or defined.
  */
  themeVersion: string;
 /**
  * The current HOT Reloading client version
  *
  * @example
  * '1.0.0'
  */
  hotVersion: string;
 /**
  * The method in which credentials are stored for this project
  */
  credentials: 'kc' | 'env';
 /**
  * The target source method used for theme and store references.
  *
  * @example
  *  'package.json'
  */
  targetSource: 'package.json' | 'theme.toml' | 'theme.yaml' | 'theme.yml';
 /**
  * When cache auto-expires and is regenerated
  */
  expires: number;
 /**
  * When the cache was created. This is updated whenever the cache is purged or created.
  */
  createdAt: number;
 /**
  * The last time syncify was ran
  */
  lastRunAt: number;
 /**
  * The last time a version check was performed. This value will be used to check
  * for version updates on the npm registry.
  */
  lastVersionCheck: number;
}

export interface VersionControl {
  /**
   * The root URI of preserved theme versions existing as an archive `.zip` file.
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/versions'
   */
  cache: string;
  /**
   * The source version reference to use.
   *
   * - `1` _use package.json_
   * - `2` _use settings_schema.json_
   * - `3` _use package.json and settings_schema.json_
   *
   * @default 0
   */
  source: 1 | 2 | 3;
  /**
   * The current resolved version URI
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
   * The current version number in string format
   *
   * @example 'v1.1.4'
   */
  number: string;
  /**
   * The current major version number
   *
   * @example 1
   */
  major: number;
  /**
   * The current minor version number
   *
   * @example 1
   */
  minor: number;
  /**
   * The current patch version number
   *
   * @example 4
   */
  patch: number;
  /**
   * Parsed representation of the new theme version.
   *
   * > This information will be populated when running version command or export
   */
  update: {
    /**
     * The version bump type
     *
     */
    bump?: LiteralString<'major' | 'minor' | 'patch'>
    /**
     * The resolved `.zip` URI file path of next version
     *
     * @default 'export/v1/1.2.1.zip'
     */
    zip?: string;
    /**
     * The resolved version URI directory path where the version will be exported
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

export interface WSS {
  /**
   * The `wss` instance
   */
  get http(): uWS.TemplatedApp; // Server<typeof WebSocket, typeof IncomingMessage>
  /**
   * Section Aliases
   *
   * @param uuid The UUID of the file for HOT reload timers
   * @param src The script output base filename
   */
  alias(json: string): boolean;
  /**
   * Hot Socket for `<script>` tags,
   *
   * @param uuid The UUID of the file for HOT reload timers
   * @param src The script output base filename
   */
  script(uuid: string, src: string): boolean;
  /**
   * Hot Socket for `<link>` stylesheet tags
   *
   * @param uuid The UUID of the file for HOT reload timers
   * @param src The style output base filename
   */
  stylesheet(uuid: string, href: string): boolean;
  /**
   * Hot Socket for theme sections
   */
  section(id: string): boolean;
  /**
   * Hot Socket SVG tags or sprites
   */
  svg(id: string): boolean;
  /**
   * Hot Socket for other asset files
   */
  assets(): boolean;
  /**
   * Hot Socket for `refresh` mode
   */
  reload(): boolean;
  /**
   * Hot Socket for view replacement
   */
  replace(): boolean;
  /**
   * Connected message
   */
  connected(): boolean;
  /**
   * Disconnect message
   */
  disconnect(): boolean;
}

export interface HOTBundle extends Omit<HOT, 'flags'> {
  /**
   * The full resolved path to the HOT injection snippet source.
   * This file is used to generate the per-project injection.
   *
   * > This will be `null` unless running in HOT mode.
   *
   * @default
   * null
   *
   * @example
   * '/Users/sissel/.syncify/eb4e712f2f3970b7/hot-snippet'
   */
  source: string
  /**
   * Whether or not HOT reloading is ready
   */
  ready: boolean;
  /**
   * Cache URI paths to files used during HOT sessions.
   */
  cache: {
    /**
     * **READY AT RUNTIME**
     *
     * The URI path to the HOT theme ID specific sub-directory.
     *
     * @example
     * '/Users/sissel/.syncify/eb4e712f2f3970b7/hot/123456789'
     */
    root: string;
    /**
     * **READY AT RUNTIME**
     *
     * The URI path to the HOT snippet injection. File is placed in
     * sub-directory using the theme `id` as name
     *
     * @example
     * '/Users/sissel/.syncify/eb4e712f2f3970b7/hot/123456789/hot.js.liquid'
     */
    snippet: string;
    /**
     * **READY AT RUNTIME**
     *
     * The URI paths to the HOT layout files within cache. Files are placed in
     * sub-directory using the theme `id` as name
     *
     * @example
     * [
     *  '/Users/sissel/.syncify/eb4e712f2f3970b7/hot/123456789/theme.liquid'
     * ]
     */
    layouts: string[];
  }
  /**
   * HOT Reloads uses server port `41001`
   *
   * @default 41001
   * @example 'http://localhost:41001/some-asset.js'
   */
  server?: number;
  /**
   * Websocket uses port `51001`
   *
   * @default 51001
   * @example 'ws://localhost:51001/ws'
   */
  socket?: number;
  /**
   * **NOT YET AVAILABLE**
   *
   * The client tactic to use
   */
  client?: 'inject' | 'extension';
  /**
   * The user defined configuration `layouts` array list.
   *
   * @default
   * [
   *   'theme.liquid'
   * ]
   */
  layouts?: string[];
  /**
   * Which files contain the hot client related logic. The `key` value
   * will hold the `layout` or `snippet` and the boolean value determines
   * whether or not the requirements exist in remote sources.
   */
  alive?: {
    /**
     * Whether or not `snippets/hot.js.liquid` exists in remote theme.
     *
     * @default false
     */
    snippet: boolean;
    /**
     * Each key represents a layout as per the user configuration `hot > layouts` value.
     * The values infer whether or not the render snippet injection exists in the remote themes
     *
     * @default
     * {
     *   theme: false,
     *   password: false
     * }
     */
    layouts: Record<string, boolean>
  };
  /**
   * The version of the HOT Client script as per the `@syncify/hot` package.json version
   */
  version?: {
    /**
     * The remote snippet version number
     */
    remote: string;
    /**
     * The local snippet version
     */
    local: string;
  }
  /**
   * Section aliases mapped via by template
   *
   * @example
   * {
   *   index: {
   *    foo: 'a,b,c', // foo.liquid section in index.json
   *    bar: 'b,c',   // bar.liquid section in index.json
   *  }
   * }
   */
  alias?: { [template: string]: { [alias: string]: string[] } }
  /**
   * Current Template relative to the URL which is populated by the websocket
   */
  route?: {
    /**
     * The current pathname and/or any query parameters
     */
    url?: string;
    /**
     * The name of the template's parent directory and the current template type
     * excluding file extension.
     *
     * @example 'index'
     */
    template?: string;
  }
  /**
   * Run mode
   *
   * @default 'hot'
   */
  method?: LiteralString<'hot' | 'live' | 'refresh'>;
  /**
   * Developer Flags
   */
  flags?: {
    /**
     * Hides Preview Bar
     */
    'no-preview-bar': boolean;
    /**
     * Prevents CFH wpm from evaluating
     */
    'no-web-pixels-manager': boolean;
    /**
     * Prevents CFH checkout preloads from evaluating
     */
    'no-checkout-preloads': boolean;
    /**
     * Prevents CFH Shopify features from evaluating
     */
    'no-shopify-features': boolean;
    /**
     * Prevents CFH trekkie from evaluating
     */
    'no-trekkie': boolean;
    /**
     * Prevents CFH perfkit from evaluation
     */
    'no-perfkit': boolean;
  }
}

export interface LiquidBundle {
  /**
   * Terse Minification Options
   */
  terse: {
    /**
     * Whether or not terse minificiation applies
     */
    enabled: boolean;
    /**
     * Paths to exclude from Terse minfication
     */
    exclude: Tester;
    /**
     * Terse Options for HTML (Markup)
     */
    markup: HTMLMinifierTerserOptions;
    /**
     * Terse Options for Liquid
     */
    liquid: Pick<LiquidTerse, | 'minifySchema' | 'stripTrims'>;
  }
}

export interface JSONBundle extends Required<Omit<JSONTransform, 'exclude' | 'terse'>> {
  /**
   * Paths to exclude from JSON processing
   */
  exclude: Tester;
  /**
   * The resolved cache path.
   */
  cache: string;
  /**
   * Options applied to `@syncify/json`
   */
  options: EvaluateOptions
  /**
   * Terse minification options
   */
  terse: {
    /**
     * Whether or not terse minificiation applies
     */
    enabled: boolean;
    /**
     * Paths to exclude from JSON processing
     */
    exclude: Tester;
    /**
     * Terse Options
     */
    options: Omit<JSONTerse, 'exclude'>;
  }
}

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
   * [SVGO](https://github.com/svg/svgo) Pre-Processor
   */
  svgo?: SVGOProcesser
  /**
   * [ESBuild](https://esbuild.github.io/) Pre-Processor
   */
  esbuild?: ESBuildProcesser
}

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

export interface LogBundle {
  /**
   * Whether or not we are in idle
   */
  idle: boolean;
  /**
   * Current Group Name - This is used a `Tree.Top` and
   * will be applied to `Tree.End` respectively.
   *
   * ```bash
   * ┌─ Group ➤ Namespace ~ 01:59:20
   *
   * └─ Group ➤ Namespace ~ 01:59:20
   * ```
   */
  group: LiteralString<(
    | 'Syncify'
    | 'Bulk'
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
    | 'Metafield'
    | 'Page'
    | 'HTML'
    | 'Markdown'
    | 'Yaml'
    | 'Unknown'
  )>;
  /**
   * This is typically an additional reference that is used to within certain `$.log.groups`.
   */
  title: string;
  /**
   * Change count tracking, which will be used to monitor the amount of changes
   * file has undergone since the mode was initialised. This is a Map type store
   * due to o(1) aspect and because this model may get very large during long watch
   * sesssion.
   *
   * The Map key is file URI, and value is number of times the file was changed.
   */
  changes: Map<string, number>
  /**
   * The current (**relative input**) file URI the log message pertains.
   * This can be referenced via stdin operations when inspecting warnings and such
   */
  uri: string;
  /**
   * The current log mode. This will inform upon the current CLI log status and is used
   * to determine states. For example, if we are running in `watch` mode, but the user
   * is interfacing with a `prompt` then this value will reflect as `prompt`.
   */
  mode: LogModes
  /**
   * Upload stacks, maintains files being uploaded. Each item is an `[string, string, string]`
   * and provides the follow information for logging once queue item is ready:
   *
   * ```js
   * [
   *   target, // Theme Target name
   *   domain, // The .myshopify domain
   *   timing  // The timer reference mark
   * ]
   * ```
   */
  queue: Set<[
    target: string,
    domain: string,
    timing: string
  ]>

}

export interface Bulk {
  /**
   * Unique bulk operation identifier
   */
  id: string;
  /**
   * The log group title
   */
  group: string;
  /**
   * The bulk operation taking place
   */
  type: 'uploaded' | 'deleted';
  /**
   * The number of files the bulk operation is carrying out
   */
  files: number;
  /**
   * Holds reference to all successful requests which can be accessed
   * via `stdin` after bulk operations finish.
   */
  synced: Set<string>;
}

export interface Bind {
  files: Set<string>;
  auto: boolean;
}

export type Warnings = Map<string, Map<string, Set<string>>>
