import { Icons, Pages, Sections, Snippets } from './views';
import { ImageTransform, JSONTransform, ScriptTransfrom, StyleTransform, SVGTransform } from './transforms';
import { LiquidMinify, ESBuildMinify, HTMLMinifierTerser, JSONMinify } from './minify';
import { PluginHooks } from '../bundle/plugin';

/* -------------------------------------------- */
/* VIEWS                                        */
/* -------------------------------------------- */

export interface Views {
  /**
   * Static page handling
   */
  pages?: Pages;
  /**
   * Snippet file handling (ie: sub-directory grouping)
   */
  snippets?: Snippets;
  /**
   * Section file handling (ie: sub-directory grouping)
   */
  sections?: Sections;
  /**
   * Extended icons handling support, (used together `svg` _transforms_ )
   */
  icons?: Icons
}

/* -------------------------------------------- */
/* TRANSFORMS                                   */
/* -------------------------------------------- */

export interface Transforms {
  /**
   * JSON File transforms
   */
  json?: JSONTransform;
  /**
   * Image File transforms
   */
  image?: ImageTransform | ImageTransform[];
  /**
   * Style File transforms
   */
  style?: StyleTransform | StyleTransform[];
  /**
   * JS/TS File transforms
   */
  script?: ScriptTransfrom | ScriptTransfrom[];
  /**
   * SVG File transforms
   */
  svg?: SVGTransform;
}

/* -------------------------------------------- */
/* MINIFY                                       */
/* -------------------------------------------- */

export interface Minify {
  /**
   * JSON Minification
   */
  json?: false | JSONMinify;
  /**
   * Liquid Minification
   */
  liquid?: false | LiquidMinify;
  /**
   * HTML (Markup) Minification
   *
   * > Uses [html-minifier-terser](https://github.com/terser/html-minifier-terser)
   */
  html?: false | HTMLMinifierTerser;
  /**
   * JS/TS Minification
   *
   * > Uses [esbuild](https://esbuild.github.io/api/#minify) minificiation
   */
  script?: false | ESBuildMinify
}

/* -------------------------------------------- */
/* LOGGER                                       */
/* -------------------------------------------- */

export interface Logger {
  /**
   * Suppress CLI logs
   *
   * @default false
   */
  silent: boolean;
  /**
   * Whether or not file stats should print
   *
   * > Helpful when building for production (`--prod`)
   *
   * @default false
   */
  stats: boolean;
  /**
   * Whether or not to print warnings
   *
   * @default false
   */
  warnings: boolean;
  /**
   * Whether or not to clear the screen
   * between changes.
   *
   * @default true
   */
  clearScreen: boolean;
}

/* -------------------------------------------- */
/* LIVE RELOADS                                 */
/* -------------------------------------------- */

export interface HOT {
  /**
   * Whether or not Syncify hot reloads UI labels should render.
   *
   * @default true
   */
  labels?: boolean,
  /**
   * The static server for assets
   *
   * @default 3000
   * @example 'http://localhost:3000/some-asset.js'
   */
  server?: number;
  /**
   * Websocket port
   *
   * @default 8089
   * @example 'ws://localhost:8089/ws'
   */
  socket?: number;
  /**
   * Reload Method
   *
   * @default 'hot'
   */
  reload?: 'hot' | 'refresh' | 'manual';
  /**
   * Scroll position between reloads
   *
   * @default 'preserved'
   */
  scroll?: 'preserved' | 'top';
  /**
   * Hides the Shopify iFrame preview label.
   *
   * @default true
   */
  hidePreview?: boolean;
}

/* -------------------------------------------- */
/* STORES                                       */
/* -------------------------------------------- */

export interface Stores {
  /**
   * The store myshopify domain, eg: `store.myshopify.com`
   */
  domain: string;
  /**
   * The store theme targets - Theme use a `key > value`
   * structure. The `key` values represent target names that
   * will be used in the CLI.
   */
  themes: { [target: string]: number; }
}

/* -------------------------------------------- */
/* BASE DIRECTORIES                             */
/* -------------------------------------------- */

export interface Directories {
  /**
   * The resolved `input` directory path
   *
   * @default 'source'
   */
  input?: string;
  /**
   * The resolved `output` directory path
   *
   * @default 'theme/'
   */
  output?: string;
  /**
   * The resolved `import` directory path for downloaded themes
   *
   * @default 'import/'
   */
  import?: string;
  /**
   * The resolved `export` directory path for packaged `.zip` themes
   *
   * @default 'export'
   */
  export?: string;
  /**
   * The resolved `config` directory path for build tool files
   *
   * @default '/'
   */
  config?: string;
  /**
   * The resolved `pages` directory path, if multiple paths
   * are defined the value will be an array list.
   *
   * @default '/source/pages/'
   */
  pages?: string;
  /**
   * The resolved `metafields` directory path, if multiple paths
   * are defined the value will be an array list.
   *
   * @default '/source/metafields/'
   */
  metafields?: string | string[]
}

/* -------------------------------------------- */
/* SOURCE PATHS                                 */
/* -------------------------------------------- */

export interface Paths {
  /**
   * An array list of files to be uploaded as assets
   *
   * @default 'source/assets'
   */
  assets?: string | string[];
  /**
   * An array list of files to be uploaded as snippets
   *
   * @default 'source/snippets'
   */
  snippets?: string | string[];
  /**
   * An array list of files to be uploaded as sections
   *
   * @default 'source/sections'
   */
  sections?: string | string[];
  /**
   * An array list of files to be uploaded as layouts
   *
   * @default 'source/layout'
   */
  layout?: string | string[];
  /**
   * An array list of files to be uploaded as templates
   *
   * @default 'source/templates'
   */
  templates?: string | string[];
  /**
   * An array list of files to be uploaded as template/customers
   *
   * @default 'source/templates/customers'
   */
  customers?: string | string[];
  /**
   * An array list of files to be uploaded as configs
   *
   * @default 'source/config'
   */
  config?: string | string[];
  /**
   * An array list of files to be uploaded as locales
   *
   * @default 'source/locales'
   */
  locales?: string | string[];
  /**
   * The resolved `metafields` directory path
   *
   * @default 'source/metafields'
   */
  metafields?: string | string[];
  /**
   * The resolved `pages` directory path
   *
   * @default 'source/pages'
   */
  pages?: string | string[];
  /**
   * The resolved `redirects` yaml file
   *
   * @default 'redirects.yaml'
   */
  redirects?: `${string}.${'yaml' | 'yml'}`
}

/* -------------------------------------------- */
/* DEFINE CONFIG                                */
/* -------------------------------------------- */

/**
 * The Configuration model
 */
export interface Config extends Directories {
  /**
   * Define your Shopify store/s and thier theme/s
   */
  stores: Stores | Stores[];
  /**
   * Define customize input structures - Paths resolve to `input`
   */
  paths?: Paths;
  /**
   * Hot reloading options. Passing boolean `true` will use defaults.
   * Set to `false` to disable live reloads. Optionally configure
   * reloads by passing configuration _object_.
   *
   * > Hot reloading is only possible in **watch** mode.
   *
   * @default false
   */
  hot?: false | HOT;
  /**
   * Syncify Plugins
   */
  plugins?: PluginHooks[]
  /**
   * Spawn child process
   */
  spawn?: {
    /**
     * Processes to spawn when running **build** mode, ie: `--build` or `-b`
     *
     * @default {}
     *
     * @example
     *
     * {
     *   build: {
     *    rollup: 'rollup -c',
     *    gulp: ['gulp', 'build-task'] // can also use arrays
     *  }
     * }
     */
    build?: { [target: string]: string | string[] };
    /**
     * Processes to spawn when running **watch** mode, ie: `--watch` or `-w`
     *
     * @default {}
     *
     * @example
     * {
     *   build: {
     *    rollup: 'rollup -c --watch',
     *    gulp: ['gulp', 'watch-task'], // can also use arrays
     *  }
     * }
     */
    watch?: { [target: string]: string | string[] }
  };
  /**
   * View specific processing configuration
   */
  views?: Views;
  /**
   * Console log options
   */
  logger?: Logger;
  /**
   * Transform pipeline configurations
   */
  transforms?: Transforms;
  /**
   * Minify options - Invoked when in **production** `--prod` mode or
   * if the `--minify` flag was passed. Options will default to `false`
   * when either of these conditionals are not met.
   */
  minify?: Minify
}
