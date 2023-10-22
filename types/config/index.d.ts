/* eslint-disable no-unused-vars */

import type { Merge, PackageJson } from 'type-fest';
import type { Sections, Snippets } from './views';
import type { HOTConfig } from '../bundle/hot';
import type { ScriptTerse, JSONTerse, MarkupTerse, LiquidTerse } from './terser';
import type { PluginHooks } from '../$/plugin';
import type { JSONConfig } from '../transform/json';
import type { SharpConfig } from '../transform/image';
import type { PagesConfig } from '../transform/pages';
import type { ScriptTransformer, ESBuildConfig } from '../transform/script';
import type { StyleTransformer, SASSConfig, PostCSSConfig } from '../transform/style';
import type { SVGTransformer, SVGOConfig, SVGSpriteConfig } from '../transform/svg';

/* -------------------------------------------- */
/* PROCESSORS                                   */
/* -------------------------------------------- */

export interface Publishing {
  /**
   * The port address to publish on - In most cases, you can leave
   * this to the default, unless port `80` is occupied, in such
   * situation, use a different port.
   *
   * @default 80
   */
  tunnelPort?: number;
  /**
   * Set the publishment role to use - This defaults to `unpublished`
   * which means theme publishes will not be made pushed live.
   *
   * `main`
   *
   * The theme is published. Customers see it when they visit the online store.
   *
   * `unpublished`
   *
   * The theme is unpublished. Customers can't see it.
   *
   * `development`
   *
   * The theme is used for development. The theme can't be published, and is temporary.
   *
   * @default 'unpublished'
   */
  publishRole?: 'main' | 'unpublished' | 'development';
  /**
   * **NOT YET AVAILABLE**
   *
   * Bind theme version with the `settings_schema.json` version.
   *
   * @default false
   */
  bindVersion?: boolean;
  /**
   * Limit the amount of new theme publishments.
   *
   * @default 3
   */
  themeLimit?: number;
}

/**
 * Processor Default Configurations
 *
 * Holds reference to default config options for
 * each supported processor.
 */
export interface Processors {
  /**
   * JSON File processing - Options defined here are used when
   * writing to the file system. Typically in operations like
   * `--merge`, `--pull` and `--download`.
   *
   * > The options will also be used in **development** (`dev`)
   * mode when uploading `.json` files to stores/themes.
   */
  json?: JSONConfig;
  /**
   * [ESBuild](https://esbuild.github.io/) Config
   *
   * Syncify uses ESBuild under the hood for JS/TS transpilation.
   * Some native ESBuild options are omitted from processing and
   * handled internally by Syncify.
   */
  esbuild?: ESBuildConfig
  /**
   * [PostCSS](https://postcss.org/) Plugins
   */
  postcss?: PostCSSConfig[]
  /**
   * [SASS Dart](https://sass-lang.com/documentation/js-api/) Config
   */
  sass?: SASSConfig
  /**
   * [Sharp](https://sharp.pixelplumbing.com) Config
   */
  sharp?: SharpConfig;
  /**
   * [SVGO](https://github.com/svg/svgo) Config
   *
   */
  svgo?: SVGOConfig;
  /**
   * [SVG Sprite](https://github.com/svg-sprite) Config
   */
  sprite?: SVGSpriteConfig
}

/* -------------------------------------------- */
/* VIEWS                                        */
/* -------------------------------------------- */

export interface Views {
  /**
   * Static page handling
   */
  pages?: PagesConfig;
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
   *
   * // OPTION 2 - Rename with multiple inputs
   * {
   *   style: {
   *    'assets/stylesheet.css': [
   *      'path/to/source/file-1.scss',
   *      'path/to/source/file-2.scss',
   *    ]
   *   }
   * }
   *
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
   *
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
   *
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
  style?: StyleTransformer
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
   *
   * // OPTION 2 - Rename with multiple inputs
   * {
   *   script: {
   *    'assets/[file].min.[ext]': [
   *      'path/to/source/file-1.ts', // outputs assets/file-1.min.js
   *      'path/to/source/file-2.ts', // outputs assets/file-2.min.js
   *    ]
   *   }
   * }
   *
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
   *
   * // OPTION 4 - Single config
   * {
   *   script: {
   *     input: 'path/to/source/file.ts',
   *     rename: 'filename.min.js',
   *     esbuild: {}
   *   }
   * }
   *
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
  script?: false | ScriptTransformer
  /**
   * SVG File transforms
   */
  svg?: SVGTransformer
}

/* -------------------------------------------- */
/* MINIFY                                       */
/* -------------------------------------------- */

export interface Terser {
  /**
   * JSON minification options. You can disable all JSON files from
   * being minified by passing a boolean `false`. Optionally, you can
   * exclude certain types of JSON from being minified.
   */
  json?: boolean | JSONTerse;
  /**
   * View minification options. You can disable all views from
   * being minified by passing a boolean `false`.
   *
   * Syncify uses HTML Minifier Terser under the hood, it has been
   * configured to work with Liquid files so only a limited number
   * of options are exposed in order to prevent invalid or broken
   * output from being generated.
   */
  liquid?: boolean | LiquidTerse;
  /**
   * View minification options. You can disable all views from
   * being minified by passing a boolean `false`.
   *
   * Syncify uses HTML Minifier Terser under the hood, it has been
   * configured to work with Liquid files so only a limited number
   * of options are exposed in order to prevent invalid or broken
   * output from being generated.
   */
  markup?: boolean | MarkupTerse;
  /**
   * JavaScript minification options. Script minification is only
   * available for projects with `esbuild` installed and configured
   * as a processor.
   */
  script?: boolean | ScriptTerse;
}

/* -------------------------------------------- */
/* LOGGER                                       */
/* -------------------------------------------- */

export interface Logger {
  /**
   * Whether or not file stats should print
   *
   * > Helpful when building for production (`--prod`)
   *
   * @default true
   */
  stats?: boolean;
  /**
   * Whether or not to print warnings
   *
   * @default true
   */
  warnings?: boolean;
  /**
   * Suppress CLI logs
   *
   * @default false
   */
  silent?: boolean;
  /**
   * Whether or not to clear the screen between changes.
   *
   * @default true
   */
  clear?: boolean;
}

/* -------------------------------------------- */
/* STORES                                       */
/* -------------------------------------------- */

/**
 * Stores Configuration
 */
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
  themes: { [target: string]: number }
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
   * The resolved `cache` directory path for build tool files
   *
   * @default 'node_modules/.syncify/'
   */
  cache?: string;
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
   * An array list of files to be uploaded as metaobject templates
   *
   * @default 'source/templates/metaobject'
   */
  metaobject?: T
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
   * An array list of shared section schema `.json` files
   *
   * @default 'source/schema'
   */
  schema?: T
  /**
   * **NOT YET AVAILABLE**
   *
   * > **This option will be available in later versions**
   *
   * ---
   *
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
   * **NOT YET AVAILABLE**
   *
   * > **This option will be available in later versions**
   *
   * ---
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
export interface Config<T = Stores> extends Directories {
  /**
   * **Use `package.json` file for store and theme references**
   *
   * Define Shopify stores and themes within your projects `package.json` file.
   * In your `package.json` provide store/s and themes as per the example below:
   *
   * ```jsonc
   * {
   *   "syncify": {
   *     "stores": {} // define your themes in package.json
   *   }
   * }
   * ```
   *
   * @deprecated
   */
  stores?: T | Stores | Stores[];
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
  hot?: boolean | HOTConfig;
  /**
   * Console log options
   */
  log?: Logger;
  /**
   * Syncify Plugins
   */
  plugins?: PluginHooks[];
  /**
   * Provide publish configuration
   */
  publish?: Publishing;
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
   * **Transform**
   *
   * The asset transform pipeline configurations
   */
  transform?: Transforms;
  /**
   * **Processors**
   *
   * Configurations for the `transform` processors. Define options
   * for a transform to inherit. You can override these on a per-transform basis.
   * Optionally, you can use the default presets which syncify has pre-configured
   * for optimal output.
   */
  processors?: Processors;
  /**
   * Terse options (minification)
   *
   * Invoked when in **production** (`--prod`) mode or when the `--terse` flag is passed.
   * Options will default to `false`when either of these conditionals are not met.
   */
  terser?: boolean | Terser;
  /**
   * @deprecated
   *
   * Use `terser` option instead
   */
  minify?: undefined;
}

/* -------------------------------------------- */
/* PACKAGE JSON                                 */
/* -------------------------------------------- */

export type PKG = Merge<PackageJson, {
  syncify: {
    /**
     * Store Configurations
     */
    stores: Stores | Stores[];
    /**
     * Optional Config
     */
    config?: Omit<Config, 'stores'>
  }
}>
