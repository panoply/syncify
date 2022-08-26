/* eslint-disable no-unused-vars */
import { Pages, Sections, Snippets } from './views';
import { ImageTransform, ScriptTransform, StyleTransform, SVGTransform } from './transforms';
import { ESBuildMinify, JSONMinify, ViewMinify } from './minify';
import { PluginHooks } from '../bundle/plugin';
import { Processors } from './processors';
import { InferPaths, RenamePaths } from '../misc/shared';
import { MergeExclusive, RequireAllOrNone } from 'type-fest';

/* -------------------------------------------- */
/* PROCESSORS                                   */
/* -------------------------------------------- */

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
}

/* -------------------------------------------- */
/* TRANSFORMS                                   */
/* -------------------------------------------- */

export interface Transforms {
  /**
   * Image File transforms
   */
  image?:
  string
  | string[]
  | ImageTransform
  | ImageTransform[]
  | {
    [output: `assets/${string}`]:
    string
    | string[]
    | ImageTransform
  }
  /**
   * Style File transforms
   *
   * @example
   *
   * // OPTION 1 - Rename with single input
   * {
   *   style: {
   *    'assets/stylesheet.css': 'path/to/file.scss', // write to assets dir and compile with sass
   *    'snippets/style.liquid': 'path/to/foo.css' // write as snippet
   *   }
   * }
   * // OPTION 2 - Rename with multiple inputs
   * {
   *   style: {
   *    'assets/stylesheet.css': [
   *      'path/to/source/file-1.scss',
   *      'path/to/source/file-2.scss',
   *    ]
   *   }
   * }
   * // OPTION 3 - Rename with overrides
   * {
   *   style: {
   *    'assets/filename.min.css': {
   *       input: 'path/to/source/file.scss',
   *       includePaths: ['node_modules'],
   *       watch: []
   *    }
   *   }
   * }
   * // OPTION 4 - Single config
   * {
   *   style: {
   *     input: 'path/to/source/file.scss',
   *     rename: 'filename.min.css',
   *     postcss: [ plugin() ] // use some postcss plugin with this file
   *     sass: {
   *       includePaths: [
   *        'node_modules/bootstrap' // include this path
   *       ]
   *     }
   *   }
   * }
   * // OPTION 5 - Multiple configs
   * {
   *   style: [
   *    {
   *      input: 'path/to/source/file-1.css',
   *      snippet: true,
   *      rename: 'some-name.liquid',
   *      postcss: [ plugin() ], // use some plugin with this file
   *      sass: false // do not process with sass
   *    },
   *    {
   *      input: 'path/to/source/file-2.scss',
   *      postcss: false, // do not process with postcss
   *      sass: true, // use processor defined settings
   *      watch: [
   *       'path/to/files/*.scss'
   *      ]
   *    }
   *   ]
   * }
   */
  style?:
  string
  | string[]
  | StyleTransform
  | StyleTransform[]
  | { [K in RenamePaths]: string | string[] | Pick<StyleTransform, 'postcss' | 'sass' | 'input' | 'watch'> }
  /**
   * JavaScript/TypeScript Transforms - _Requires [ESBuild](https://esbuild.github.io)_
   *
   * Script inputs can be defined a few different ways depending on your preference.
   * You can also override ESBuild `processor` defined options on a per-file basis.
   * Options 1, 2 and 3 are typically the preferred structures.
   *
   *
   * @example
   *
   * // OPTION 1 - Rename with single input
   * {
   *   script: {
   *    'assets/filename.min.js': 'path/to/source/file.ts', // write to assets dir
   *    'snippets/js-file.liquid': 'path/to/source/foo.ts' // write as snippet
   *   }
   * }
   * // OPTION 2 - Rename with multiple inputs
   * {
   *   script: {
   *    'assets/[file].min.[ext]': [
   *      'path/to/source/file-1.ts', // outputs assets/file-1.min.js
   *      'path/to/source/file-2.ts', // outputs assets/file-2.min.js
   *    ]
   *   }
   * }
   * // OPTION 3 - Rename with overrides
   * {
   *   script: {
   *    'assets/filename.min.js': {
   *       input: 'path/to/source/file.ts',
   *       splitting: true,
   *       treeShaking: false
   *    }
   *   }
   * }
   * // OPTION 4 - Single config
   * {
   *   script: {
   *     input: 'path/to/source/file.ts',
   *     rename: 'filename.min.js',
   *     esbuild: {}
   *   }
   * }
   * // OPTION 5 - Multiple configs
   * {
   *   script: [
   *    {
   *      input: 'path/to/source/file-1.ts',
   *      rename: 'filename.min.js',
   *      esbuild: {}
   *    },
   *    {
   *      input: 'path/to/source/file-2.ts',
   *      snippet: true
   *    }
   *   ]
   * }
   */
  script?:
  string
  | string[]
  | ScriptTransform
  | StyleTransform[]
  | { [K in InferPaths]: string | string[] | MergeExclusive<
      Pick<ScriptTransform, 'input' | 'watch'>,
      ScriptTransform['esbuild']
    >
  }
  | { [K in RenamePaths]: string | MergeExclusive<
      Pick<ScriptTransform, 'input' | 'watch'>,
      ScriptTransform['esbuild']
    >
  }

  /**
   * SVG File transforms
   */
  svg?:
  string
  | string[]
  | SVGTransform
  | SVGTransform[]
  | {
    [output: `${'assets' | 'snippets'}/${string}`]:
    string
    | string[]
    | SVGTransform
  }
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
   * View (Liquid/HTML) Minification
   *
   * > Uses [html-minifier-terser](https://github.com/terser/html-minifier-terser)
   */
  views?: false | ViewMinify;
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
  labels?: boolean;
  /**
   * Whether or not Syncify should inject the required HOT snippet
   * at runtime to the defined layouts. When `false` you will need
   * to manually place the `hot.liquid` snippet into your theme.
   *
   * _Please note that by default when running `--hot` Syncify will
   * upload layouts upon initializing_
   *
   * @default true
   */
  inject?: boolean;
  /**
   * A string list of Liquid template layouts used in your theme.
   *
   * @default ['theme.liquid']
   */
  layouts?: string[];
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

export interface Paths<T = string | string[]> {
  /**
   * An array list of files to be uploaded as assets
   *
   * @default 'source/assets'
   */
  assets?: T;
  /**
   * An array list of files to be uploaded as snippets
   *
   * @default 'source/snippets'
   */
  snippets?: T
  /**
   * An array list of files to be uploaded as sections
   *
   * @default 'source/sections'
   */
  sections?: T
  /**
   * An array list of files to be uploaded as layouts
   *
   * @default 'source/layout'
   */
  layout?: T
  /**
   * An array list of files to be uploaded as templates
   *
   * @default 'source/templates'
   */
  templates?: T
  /**
   * An array list of files to be uploaded as template/customers
   *
   * @default 'source/templates/customers'
   */
  customers?: T
  /**
   * An array list of files to be uploaded as configs
   *
   * @default 'source/config'
   */
  config?: T
  /**
   * An array list of files to be uploaded as locales
   *
   * @default 'source/locales'
   */
  locales?: T
  /**
   * The resolved `metafields` directory path
   *
   * @default 'source/metafields'
   */
  metafields?: T
  /**
   * The resolved `pages` directory path
   *
   * @default 'source/pages'
   */
  pages?: T
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
   * Whether of not Syncify should clean output before building.
   */
  clean?: boolean;
  /**
   * Hot reloading options. Passing boolean `true` will use defaults.
   * Set to `false` to disable live reloads. Optionally configure
   * reloads by passing configuration _object_.
   *
   * > Hot reloading is only possible in **watch** mode.
   *
   * @default false
   */
  hot?: boolean | HOT;
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
   * Configurations for the `transform` processors. Define options
   * for the transformers to inherit. You can override these on a
   * per-transform basis. Optionally, you can use the default presets
   * pre-configured for optimal use.
   */
  processors?: Processors;
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
