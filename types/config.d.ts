/* eslint-disable no-unused-vars */

import type { LiteralUnion, Merge, PackageJson } from 'type-fest';
import type { HOTConfig } from './$/hot';
import type { LiquidTransform } from './transform/liquid';
import type { PluginHooks } from './$/plugin';
import type { JSONTransform } from './transform/json';
import type { SharpConfig } from './transform/image';
import type { PagesConfig } from './transform/pages';
import type { ScriptTransformer, ESBuildConfig } from './transform/script';
import type { StyleTransformer, SASSConfig, PostCSSConfig } from './transform/style';
import type { SVGTransformer, SVGOConfig, SVGSpriteConfig } from './transform/svg';

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
   * **JavaScript/TypeScript Transforms**
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
   * **SVG File Transforms**
   */
  svg?: SVGTransformer;
  /**
   * **JSON File Transforms**
   *
   * Options defined here are used when writing to the file system and
   * uploading `.json` files to themes. When running sync operations that
   * import from remote sources will also use these options, they include:
   *
   * - `--merge`
   * - `--pull`
   * - `--download`
   */
  json?: JSONTransform;
  /**
   * **Liquid File Transforms**
   *
   * Liquid transform options are terse-specific and related to minification operations.
   * Syncify uses HTML Minifier Terser under the hood, it has been configured to work with
   * Liquid files.
   *
   * > **NOTE**
   *
   * > Liquid transforms will only be carried out under the `--prod` or `--terse` flag.
   * > If this option is set to `false` then no minification will be applied to `.liquid`
   * > files.
   */
  liquid?: LiquidTransform;

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

/**
 * Snippet sub-directory grouping options
 */
export interface Snippets {
  /**
   * An array list of files to be uploaded as snippets
   *
   * @default 'source/snipets'
   */
  input: string | string[];
  /**
   * Whether snippets allow sub-directory name prefixing
   *
   * @default false
   *
   * @example
   *
   * // Assuming the separator is '_'
   * // Take the following structure:
   *
   * snippets
   * │
   * ├─ head
   * │  └─ foo.liquid
   * └─ body
   *    ├─ bar.liquid
   *    └─ baz.liquid
   *
   * // The output result will be:
   *
   * theme
   * └─ snippets
   *   ├─ head_foo.liquid
   *   ├─ body_bar.liquid
   *   └─  body_baz.liquid
   */
  prefixDir?: boolean;
  /**
   * Prefix separator character
   *
   * @default '-'
   *
   * @example
   *
   * // Filename will be prefix
   * 'dir/file.liquid' => 'dir-file.liquid'
   */
  separator?: LiteralUnion<
    | '-'
    | '_'
    | '.'
    | '@'
    | ':'
    ,
    string
  >;
  /**
   * A list snippet sub-directories or relative files that should
   * pass through or snip prefixing
   *
   * _cannot contain glob (`*`) stars_
   *
   * @default []
   *
   * @example
   *
   * // ✓ This is correct
   * { global: ['some-dir/filename.liquid' ] }
   *
   * // ✗ This is incorrect
   * { global: ['some-dir/*.liquid' ] }
   */
  global?: string[];
}

/**
 * Sections sub-directory grouping options
 */
export interface Sections {
  /**
   * An array list of files to be uploaded as sections
   *
   * @default 'source/sections'
   */
  input: string | string[];
  /**
   * Whether sections allow directory name prefixing
   *
   * @default false
   *
   * @example
   *
   * // Assuming the separator is '_'
   * // Take the following structure:
   *
   * sections
   * │
   * ├─ index
   * │  ├─ slideshow.liquid
   * │  └─ banner.liquid
   * └─ layouts
   *    ├─ header.liquid
   *    └─ footer.liquid
   *
   * // The output result will be:
   *
   * theme
   * └─ sections
   *   ├─ index_slideshow.liquid
   *   ├─ index_banner.liquid
   *   ├─ layout_header.liquid
   *   └─ layout_footer.liquid
   *
   */
  prefixDir?: boolean;
  /**
   * Prefix separator character
   *
   * @default '-'
   *
   * @example
   *
   * // Filename will be prefix
   * 'dir/file.liquid' => 'dir-file.liquid'
   */
  separator?: LiteralUnion<
    | '-'
    | '_'
    | '.'
    | '@'
    | ':'
    ,
    string
  >;
  /**
   * A list section sub-directories or relative files that should
   * pass through or snip prefixing
   *
   * **NOTE:**
   *
   * **Cannot contain glob (`*`) stars**
   *
   * @default []
   *
   * @example
   *
   * // ✓ This is correct
   * { global: ['some-dir/filename.liquid' ] }
   *
   * // ✗ This is incorrect
   * { global: ['some-dir/*.liquid' ] }
   */
  global?: string[];
}

export interface PathsInput<T = string | string[]> {
  input: T
}


export interface Paths<T = string | string[]> {
  /**
   * An array list of files to be uploaded as snippets
   *
   * @default 'source/snippets'
   */
  snippets?: T | Record<SnippetSeparators, T>
  /**
   * An array list of files to be uploaded as sections
   *
   * @default 'source/sections'
   */
  sections?: T | Record<SnippetSeparators, T>
  /**
   * An array list of files to be uploaded as assets
   *
   * @default 'source/assets'
   */
  assets?: T | {
    /**
     * An array list of files to be uploaded as assets
     *
     * @default 'source/assets'
     */
    input: T
  };
  /**
   * An array list of files to be uploaded as layouts
   *
   * @default 'source/layout'
   */
  layout?: T | {
    /**
     * An array list of files to be uploaded as assets
     *
     * @default 'source/assets'
     */
    input: T
  };
  /**
   * An array list of files to be uploaded as templates
   *
   * @default 'source/templates'
   */
  templates?: T | Record<TemplateSeparators, T>
  /**
   * An array list of files to be uploaded as metaobject templates
   *
   * @default 'source/templates/metaobject'
   */
  metaobject?: T | {
    /**
     * An array list of files to be uploaded as metaobject templates
     *
     * @default 'source/templates/metaobject'
     */
    input: T
  };
  /**
   * An array list of files to be uploaded as template/customers
   *
   * @default 'source/templates/customers'
   */
  customers?: T | {
    /**
     * An array list of files to be uploaded as template/customers
     *
     * @default 'source/templates/customers'
     */
    input: T
  };
  /**
   * An array list of files to be uploaded as configs, i.e: `settings_schema.json`
   *
   * @default 'source/config/.json'
   */
  config?: T | {
    /**
     * An array list of files to be uploaded as config, i.e: `settings_schema.json`
     *
     * @default 'source/config/*.json'
     */
    input: T
  };
  /**
   * An array list of files to be uploaded as config, i.e: `en.default.json`
   *
   * @default 'source/locales/*.json'
   */
  locales?: T | {
    /**
     * An array list of files to be uploaded as config, i.e: `en.default.json`
     *
     * @default 'source/locales/*.json'
     */
    input: T
  };
  /**
   * An array list of shared section schema `.json` or `.schema` files.
   *
   * @default 'source/schema/*.{json,schema}'
   */
  schema?: T | {
    /**
     * An array list of shared section schema `.json` or `.schema` files.
     *
     * @default 'source/schema/*.{json,schema}'
     */
    input: T
  };
  /**
   * **NOT YET AVAILABLE**
   *
   * > **This option will be available in later versions**
   *
   * ---
   *
   * The resolved `metafields` directory path
   *
   * @default 'source/metafields/'
   */
  metafields?: T | {
    /**
     *
     * The resolved `metafields` directory path
     *
     * @default 'source/metafields/'
     */
    input: T
  };
  /**
   * The resolved `pages` directory path
   *
   * @default 'source/pages'
   */
  pages?: T | {
    /**
     *
     * The resolved `pages` directory path
     *
     * @default 'source/pages'
     */
    input: T
  };
  /**
   * **NOT YET AVAILABLE**
   *
   * > **This option will be available in later versions**
   *
   * ---
   *
   * @default 'redirects.yaml'
   */
  redirects?: `${string}.${'yaml' | 'yml'}` | {
    /**
     *
     * The resolved `pages` directory path
     *
     * @default 'source/pages'
     */
    input: `${string}.${'yaml' | 'yml'}`
  };
}

/* -------------------------------------------- */
/* DEFINE CONFIG                                */
/* -------------------------------------------- */

/**
 * The Configuration model
 */
export interface Config<T = Stores> extends Directories {
  /**
   * Define customize input structures - Paths resolve to `input`
   */
  paths?: Paths;
  /**
   * **Clean**
   *
   * Whether of not Syncify should clean output before building.
   */
  clean?: boolean;
  /**
   * **HOT**
   *
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
   * **Log**
   *
   * Console log options
   */
  log?: Logger;
  /**
   * **NOT YET SUPPORTED**
   *
   * Syncify Plugins
   */
  plugins?: PluginHooks[];
  /**
   * **Publish**
   *
   * Provide publish configuration
   */
  publish?: Publishing;
  /**
   * **Spawn**
   *
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
}

/**
 * The Configuration model
 */
export interface SyncifyConfig extends Directories {
  /**
   * Define customize input structures - Paths resolve to `input`
   */
  paths?: Paths;
  /**
   * **Clean**
   *
   * Whether of not Syncify should clean output before building.
   */
  clean?: boolean;
  /**
   * **HOT**
   *
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
   * **Log**
   *
   * Console log options
   */
  log?: Logger;
  /**
   * **NOT YET SUPPORTED**
   *
   * Syncify Plugins
   */
  plugins?: PluginHooks[];
  /**
   * **Publish**
   *
   * Provide publish configuration
   */
  publish?: Publishing;
  /**
   * **Spawn**
   *
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
