import { Views } from './views';
import { Transforms } from './transforms';
import { Minify } from './minify';

/* -------------------------------------------- */
/* RE-EXPORTS                                   */
/* -------------------------------------------- */

export { Views } from './views';
export { Transforms } from './transforms';
export { Minify } from './minify';

/* -------------------------------------------- */
/* LIVE RELOADS                                 */
/* -------------------------------------------- */

export interface Live {
  /**
   * Whether or not Syncify Live labels should render to dom.
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
  scroll?: 'preserved' | 'top'
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
  live?: false | Live,
  /**
   * Spawn child process
   */
  spawn?: {
    /**
     * Processes to spawn when running **build** mode, ie: `--build`
     *
     *  @default {}
     */
    build?: { [target: string]: string | string[] };
    /**
     * Processes to spawn when running **watch** mode, ie: `--watch`
     *
     * @default {}
     */
    watch?: { [target: string]: string | string[] }
  };
  /**
   * View specific processing configuration
   */
  views?: {
    /**
     * Static page handling
     */
    pages?: Views.Pages;
    /**
     * Section file handling (ie: sub-directory grouping)
     */
    sections?: Views.Sections;
    /**
     * Extended icons handling support, (used together `svg` _transforms_ )
     */
    icons?: Views.Icons
  }
  /**
   * Transform pipeline configurations
   */
  transforms?: {
    /**
     * JSON File transforms
     */
    json?: Transforms.JSON;
    /**
     * Image File transforms
     */
    image?: Transforms.Image | Transforms.Image[];
    /**
     * Style File transforms
     */
    style?: Transforms.Style | Transforms.Style[];
    /**
     * JS/TS File transforms
     */
    script?: Transforms.Script | Transforms.Script[];
    /**
     * SVG File transforms
     */
    svg?: Transforms.SVG;
  };
  /**
   * Minify options - Invoked when in **production** `--prod` mode or
   * if the `--min` flag was passed.
   */
  minify?: {
    /**
     * JSON Minification
     */
    json: Minify.JSON,
    /**
     * HTML (Markup) Minification
     */
    html: Minify.HTML;
    /**
     * Liquid Minification
     */
    liquid: Minify.Liquid;
    /**
     * JS/TS Minification
     */
    script: Minify.Script
  }
}
