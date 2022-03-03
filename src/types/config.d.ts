/* eslint-disable no-use-before-define */
// import { OptimizeOptions } from 'svgo';
import { Tester } from 'anymatch';
import { Options as IHTML } from 'html-minifier-terser';
import { AxiosRequestConfig } from 'axios';
import { PartialDeep } from 'type-fest';

export { IHTML };

export interface IModes {
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
   * Execute pagess action, `-p`
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
  /**
   * whether or not to run browser-sync: `--server`
   */
  server: boolean;
}

export interface IDirs {
  /**
   * The resolve cache directory path
   *
   * @default 'node_modules/.syncify'
   */
  cache: string;
  /**
   * The resolved `input` directory path
   *
   * @default 'source'
   */
  input: string;
  /**
   * The resolved `output` directory path
   *
   * @default 'theme'
   */
  output: string;
  /**
   * The resolved `import` directory path for downloaded themes
   *
   * @default 'import'
   */
  import: string;
  /**
   * The resolved `export` directory path for packaged `.zip` themes
   *
   * @default 'export'
   */
  export: string;
  /**
   * The resolved `config` directory path for build tool files
   *
   * @default '/'
   */
  config: string;
  /**
   * The resolved `metafields` directory path, if multiple paths
   * are defined the value will be an array list.
   *
   * @default '/source/metafields'
   */
  metafields: string | string[]
  /**
   * The resolved `pages` directory path, if multiple paths
   * are defined the value will be an array list.
   *
   * @default '/source/pages'
   */
  pages: string
}

export interface IPaths {
  /**
   * An array list of files to be uploaded as assets
   *
   * @default 'source/assets'
   */
  assets: Tester;
  /**
   * An array list of files to be uploaded as snippets
   *
   * @default 'source/snippets'
   */
  snippets: Tester;
  /**
   * An array list of files to be uploaded as sections
   *
   * @default 'source/sections'
   */
  sections: Tester;
  /**
   * An array list of files to be uploaded as layouts
   *
   * @default 'source/layout'
   */
  layout: Tester;
  /**
   * An array list of files to be uploaded as templates
   *
   * @default 'source/templates'
   */
  templates: Tester;
  /**
   * An array list of files to be uploads as template/customers
   *
   * @default 'source/templates/customers'
   */
  customers: Tester;
  /**
   * An array list of files to be uploaded as configs
   *
   * @default 'source/config'
   */
  config: Tester;
  /**
   * An array list of files to be uploaded as locales
   *
   * @default 'source/locales'
   */
  locales: Tester;
  /**
   * The resolved `metafields` directory path
   *
   * @default 'source/metafields'
   */
  metafields: Tester;
  /**
   * The resolved `pages` directory path
   *
   * @default 'source/pages'
   */
  pages: Tester;
  /**
   * The resolved `redirects` yaml file
   *
   * @default 'redirects.yaml'
   */
  redirects: Tester;
}

export interface ICache {
  /**
   * The last time cache was updated at (timestamp)
   */
  updated: number;
  /**
   * When the cache was created (timestamp)
   */
  created: number;
  /**
   * Stylesheet related cache records, typically source maps
   */
  styles: {
    /**
     * The URI cache map location
     *
     * @default 'node_modules/.syncify/styles'
     */
    uri: string;
  },
  /**
   * Metafields related cache records. Metafield source maps
   * are `path > id` object references. Metafield ids are
   * cached for lookup when changes occur. The `map` object
   * holds the references and applied to model on initialization.
   */
  metafields: {
   /**
     * The URI cache reference location
     *
     * @default 'node_modules/.syncify/metafields'
     */
    uri: string,
    /**
     * Metafield pathname > id cache references.
     */
    map: { [path: string]: number }
  },
  /**
   * Page related cache records, this reference typically
   * holds `path > id` object references. Page ids are
   * cached for lookup when changes occur. The `map` object
   * holds the references and applied to model on initialization.
   */
  pages: {
   /**
     * The URI cache reference location
     *
     * @default 'node_modules/.syncify/pages'
     */
    uri: string
    /**
     * Page pathname > id cache references.
     */
    map: { [path: string]: number }
  };
  /**
   * Section related cache records, this reference typically
   * holds output filename reference and used to prevent
   * duplicated sections from being written.
   */
  sections: {
   /**
    * The URI cache reference location
    *
    * @default 'node_modules/.syncify/sections'
    */
    uri: string
  },
  /**
   * Specification JSON for vscode
   */
   vscode: {
    /**
     * The URI vscode reference location
     *
     * @default 'node_modules/.syncify/vscode'
     */
     uri: string;
     /**
      * vscode file maps
      */
     maps: { icons?: string; }
   }
}

export interface IThemes {
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

export interface IJson {
  /**
   * Indentation level for imported JSON
   */
  indent: number;
  /**
   * Whether to indent with tabs or spaces
   */
  useTabs: boolean;
  /**
   * A list of files and directories to exclude from JSON minification.
   */
  exclude: Tester | null
}

export interface IPages {
  /**
   * Whether the pulled page content should be written
   * as HTML or have the HTML converted to Markdown.
   */
  importAs: 'markdown' | 'html',
  /**
   * Whether to show warnings of Liquid tag existence
   * in pages. Liquid is not supported in pages, only static HTML
   */
  liquidWarnings: boolean,
  /**
   * Fallback author name, defaults to `null`
   */
  fallbackAuthor: string,
  /**
   * Options passed to marked parser
   */
  markdown: {
    gfm: boolean;
    breaks: boolean;
    baseUrl: string;
    headerIds: boolean;
    headerPrefix: string;
    langPrefix: string;
    highlight?: (
        code: string,
        lang: string,
        callback?: (error: any, code?: string) => void,
    ) =>string | void
    mangle: boolean;
    silent: boolean;
    smartypants: boolean;
  }
}

export interface IMinify {
  /**
   * Whether or not minification should be applied to JSON files.
   */
  json: boolean;
  /**
   * Whether or not minification should be applied to HTML files.
   */
  html: boolean;
  /**
   * Whether or not minification should be applied to Page HTML
   */
  pages: boolean;
}

export interface ILiquid {
  /**
   * Minifies JSON contained within schema sections
   */
  minifyLiquidSectionSchema: boolean;
   /**
    * A List of Liquid tags to ignore from minification
    */
  ignoreLiquidTags: RegExp;
   /**
    * A List of Liquid tags to ignore from minification
    */
  ignoreLiquidObjects: RegExp;
   /**
    * Remove all occurances of Liquid comments
    */
  removeLiquidComments: boolean;
   /**
    * Removes and strips Liquid syntax contained within HTML
    * Attributes that span newlines or apply extraneous whitespace.
    */
  removeLiquidNewlineAttributes: boolean;
   /**
    * Removes redundant whitespace Liquid dash trims from Liquid
    * tags and objects.
    */
  stripRedundantWhitespaceDashes: boolean;
   /**
    * Removes Liquid tag extrenous whitespaces
    */
  stripInnerTagWhitespace: boolean;
   /**
    * Removes and strips Liquid syntax contained within HTML
    * Attributes that span newlines or apply extraneous whitespace.
    */
  stripAttributesContainingNewlines: boolean;
  /**
   * Excluded files from minification
   */
  external: Tester | null;
}

export interface ITerser {
  html: IHTML;
  liquid: ILiquid;
  /**
   * Minification Conditions
   */
  minify: {
  /**
   * Whether or not minification should be applied to JSON files.
   */
   json: boolean;
   /**
    * Whether or not minification should be applied to HTML files.
    */
   html: boolean;
   /**
    * Whether or not minification should be applied to Page HTML
    */
   pages: boolean;
  }
}

export interface ISections {
  /**
   * Whether sections allow prefixing
   */
  directoryPrefixing: boolean;
  /**
   * Whether section prefixes are only applied to duplicate names files
   */
  onlyPrefixDuplicates: boolean;
  /**
   * Prefix separator character
   */
  prefixSeparator: string;
  /**
   * A list directories or files that should never be prefixed
   */
  global: Tester | null
}

export interface IStyle {
  /**
   * Stylesheet inputs src paths
   */
  input: string;
  /**
   * Rename the stylesheet
   */
  rename: string;
  /**
   * Optionally write the stylesheet inline
   * as a snippet, this will transform the
   * CSS, wrap it within `<style></style>` tags
   * output its contents as a snippet.liquid file.
   */
  snippet: boolean;
  /**
   * Stylesheet paths to watch, when changes
   * are applied files will be processed.
   */
  watch: Tester;
  /**
   * Run PostCSS
   */
  postcss: boolean;
  /**
   * Options to be passed to Dart SASS
   */
  sass: {
    /**
     * Whether or not to generate sourcemaps
     */
    sourcemap: boolean;
    /**
     * The style compiled CSS should be output
     */
    style: 'expanded' | 'compressed';
    /**
     * Whether or not to print warnings to CLI
     */
    warnings: boolean;
    /**
     * A list of paths to include, ie: node_modules.
     */
    include: string[];
  };
}

export interface IStore {
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

export interface IIcons {
   /**
   * Whether or not to enable inlined replacements for icons.
   * When `true` you can reference SVG icons using a HTML tag
   * with a `name=""` property and Syncify will replace all
   * occurances with the embedded SVG. For example:
   *
   * ```html
   * <!-- In your HTML you can reference the SVG -->
   * <i name="name-of-icon" from="sprite-id"></i>
   *
   * <!-- Syncify will replace this with the raw data -->
   * <svg id="name-of-icon"><path>...</path></svg>
   * ```
   *
   * This approach will likely improve render times of your webshop.
   * Using Snippets to render inline SVGs is costly and a performance
   * bottleneck. Just because Shopify does this in Dawn, does not mean
   * it is a good idea.
   *
   */
  replacer: boolean;
  /**
   * Replacer HTML tag to look for occurances within
   */
  replacerTag: string;
  /**
   * A vscode user specific option which will auto-generate
   * icon name completions for you and link them to your worksapce settings.
   */
  vscodeCustomData?: boolean;
  /**
   * Inlined SVG file types
   */
  inlined?: Array<{
    /**
     * Paths to SVG files to be converted to sprite
     */
     input: string[];
     /**
      * The output filename to snippets
      */
     rename: string;
      /**
      * Pass contents through to SVGO
      */
     svgo: boolean;
     /**
      * Whether to generate spite as snippet or asset
      */
     snippet: boolean;
  }>
  /**
   * Sprites Config
   */
  sprites: Array<{
    /**
     * Paths to SVG files to be converted to sprite
     */
    input: string[];
    /**
     * The output filename to snippets
     */
    rename: string;
     /**
     * Pass contents through to SVGO
     */
    svgo: boolean;
    /**
     * Whether to generate spite as snippet or asset
     */
    snippet: boolean;
    /**
     * Options to be passed into svg-sprite
     */
    options: {
      dimensionAttributes: boolean;
      namespaceClassnames: boolean;
      namespaceIDS: boolean;
      rootAttributes: {
        [prop: string]: string
      }
    }
  }>
}

export interface ITransform {
  /**
   * Section transforms
   */
  sections: ISections;
   /**
    * Page transform options
    */
  pages: IPages;
  /**
   * Stylesheet transforms, supports CSS/SASS
   */
  styles: IStyle[];
  /**
   * Iconset transforms, sprites and inline snippets
   */
  icons: IIcons;
  /**
   * JSON file transformation options
   */
  json: IJson
}

export interface ISync {
  /**
   * Theme synchronization options
   */
  themes: Array<IThemes>;
  /**
   * Store synchronization options
   */
  stores: Array<IStore>;
}

export interface IBundle {
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
    * Directory structure paths
    */
   paths: IPaths;
   /**
    * Base directory path references
    */
   dirs: IDirs;
   /**
    * The sync data model. Multiple stores and themes
    * can run concurrently.
    */
   sync: ISync;
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
    * The list of spawned child proccesses running
    */
   spawn: { [name: string]: string };
   /**
    * List of paths to watch or build from
    */
   watch: string[];
   /**
    * Cache references
    */
   cache: PartialDeep<ICache>
   /**
    * The operation to run
    */
   mode: IModes;
}

/* -------------------------------------------- */
/* CONSTRUCTED CONFIGURATION                    */
/* -------------------------------------------- */

export interface IConfig {
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
   * Directory structure paths
   */
  paths: IPaths;
  /**
   * Base directory path references
   */
  dirs: IDirs;
  /**
   * The sync data model. Multiple stores and themes
   * can run concurrently.
   */
  sync: ISync;
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
   * The list of spawned child proccesses running
   */
  spawn: { [name: string]: string };
  /**
   * List of paths to watch or build from
   */
  watch: string[];
  /**
   * Cache references
   */
  cache: PartialDeep<ICache>
  /**
   * The operation to run
   */
  mode: IModes;
  /**
   * The build configuration
   */
  transform: ITransform;
  /**
   * Minification executions
   */
  minify: IMinify;
  /**
   * Minification executions
   */
  terser: ITerser;
}
