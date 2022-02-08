import { OptimizeOptions } from 'svgo';
import { Tester } from 'anymatch';
import { Options } from 'html-minifier-terser';

/* -------------------------------------------- */
/* THEMES                                       */
/* -------------------------------------------- */

export interface IThemes {
  /**
   * The store domain name in Upcase (without `myshopify.com`)
   */
  store: string;
  /**
   * The store token (returns `null` is using API key and secret)
   */
  token: string;
  /**
   * The store myshopify domain, eg: `store.myshopify.com`
   */
  domain: string;
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

/* -------------------------------------------- */
/* JSON FILES                                   */
/* -------------------------------------------- */

export interface IJson {
  /**
   * Whether or not JSON files accept comments
   */
  spaces: number;
  /**
   * JSON file minification options
   */
  minify: {
    /**
     * Whether or not minification should be applied to JSON files.
     * This is dependant upon the `env` provided in configuration.
     */
    apply: boolean;
    /**
     * Whether or not to remove `$schema` store spec references
     */
    removeSchemaRefs: boolean;
    /**
     * A list of files and directories to exclude from JSON minification.
     */
    exclude: string[]
  }

}

/* -------------------------------------------- */
/* VIEW FILES                                   */
/* -------------------------------------------- */

export interface ITerser extends Options {
  minifyJS?: boolean;
  minifyCSS?: boolean;
  removeComments?: boolean;
  collapseWhitespace?: boolean;
  trimCustomFragments?: boolean;
  ignoreCustomFragments?: RegExp[];
}

export interface ILiquidMinifyOptions {
  /**
   * Minifies JSON contained within schema sections
   */
  minifySectionSchema?: boolean;
  /**
   * A List of Liquid tags to ignore from minification
   */
  ignoredLiquidTags?: string[];
  /**
   * Remove all occurances of Liquid comments
   */
  removeLiquidComments?: boolean;
  /**
   * Removes and strips Liquid syntax contained within HTML
   * Attributes that span newlines or apply extraneous whitespace.
   */
  removeLiquidNewlineAttributes?: boolean;
  /**
   * Removes redundant whitespace Liquid dash trims from Liquid
   * tags and objects.
   */
  removeRedundantWhitespaceDashes: boolean;
}

export interface IViews {
  /**
   * Section specific view handling options
   */
  sections: {
    /**
     * Whether sections allow prefixing
     */
    allowPrefix: boolean;
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
    globals: RegExp;
  },
  /**
   * Liquid + HTML minifier options
   */
  minify?: {
    /**
     * Whether or not we should apply formatting
     */
    apply: boolean;
    /**
     * HTML minification options to be passed to terser
     */
    terser: ITerser;
    /**
     * Liquid specific minification options
     */
    liquid: ILiquidMinifyOptions;
    /**
     * A list of files or directories to exclude from minification
     */
    exclude: string[];
  }
}

/* -------------------------------------------- */
/* STYLE OPTIONS                                */
/* -------------------------------------------- */

export interface IStyle {
  /**
   * Stylesheet inputs src paths
   */
  input: string;
  /**
   * Output Path
   */
  output: string;
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
   * Path location to the sass map cache
   */
  cache: string;
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
  };
  /**
   * A list of paths to include, ie: node_modules.
   */
  include: string[];
}

/* -------------------------------------------- */
/* STORES TO SYNC                               */
/* -------------------------------------------- */

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
   * The store token (returns `null` is using API key and secret)
   */
  token: string;
  /**
   * Preset API endpoint URLs
   */
  url: {
    /**
     * The authorized URL for pages
     */
    pages: string;
    /**
     * The authorized URL for themes
     */
    themes: string;
    /**
     * The authorized URL for redirects
     */
    redirects: string;
    /**
     * The authorized URL for metafields
     */
    metafields: string
  }
}

/* -------------------------------------------- */
/* ICONS TRANSFORMS                             */
/* -------------------------------------------- */

export interface IIcons {
  /**
   * SVGO transform options provided in a `svgo.config.js` file,
   * when no svgo file is present this will be `null`
   */
  svgo: OptimizeOptions
  /**
   * Inline SVG files to generated as snippets
   */
  snippets: string[];
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
    output: string;
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

/* -------------------------------------------- */
/* FILE CONFIG                                  */
/* -------------------------------------------- */

/* -------------------------------------------- */
/* CONSTRUCTED CONFIGURATION                    */
/* -------------------------------------------- */

export interface IConfig {
  /**
   * The environment we are running
   */
  env: 'dev' | 'prod';
  /**
   * The mode from which Syncify was intialized.
   */
  cli: boolean;
  /**
   * The resource to execute, eg: 'watch', 'upload' or 'download'
   */
  resource: string;
  /**
   * The current working directory
   */
  cwd: string;
  /**
   * Path to node_modules directory relative from root path.
   */
  node_modules: string;
  /**
   * The list of spawned child proccesses running
   */
  spawns: { [name: string]: string };
  /**
   * List of paths to watch or build from
   */
  watch: string[];
  /**
   * The resolved `.cache/syncify` directory path. This directory
   * is written into `node_modules` and files contained
   * within are JSON reference files used for various operations.
   */
  cache: string;
  /**
   * The resolved `input` directory path
   *
   * @default 'source'
   */
  source: string;
  /**
   * The resolved `output` directory path
   *
   * @default 'theme'
   */
  output: string;
  /**
   * The resolved `import` (downloads) directory path
   *
   * @default 'import'
   */
  import: string;
  /**
   * The resolved `export` (packaged .zip) directory path
   *
   * @default 'export'
   */
  export: string;
  /**
   * The resolved `config` directory path for build tool files
   *
   * @default '.' // defaults to root directory
   */
  config: string;
  /**
   * The operation to run
   */
  mode: {
    /**
     * Shows help information
     */
    help: boolean;
    /**
     * Execute a build
     */
    build: boolean;
    /**
     * Execute watch
     */
    watch: boolean;
    /**
     * Execute Upload
     */
    upload: boolean;
    /**
     * Execute Download
     */
    download: boolean;
    /**
     * Execute Clean
     */
    clean: boolean;
    /**
     * Generates VSC Schema spec file
     */
    vsc: boolean;
  }
  /**
   * Directory structure paths
   */
  paths: {
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
  };
  /**
   * The build configuration
   */
  transform: {
    /**
     * Stylesheet transforms, supports CSS/SASS
     */
    styles: IStyle[];
    /**
     * Iconset transforms, sprites and inline snippets
     */
    icons: IIcons;
    /**
     * View specific tranform options
     */
    views: IViews
    /**
     * JSON file transformation options
     */
    json: IJson

  };
  /**
   * The sync data model. Multiple stores and themes
   * can run concurrently.
   */
  sync: {
    /**
     * Redirect Sync
     */
    redirects: {

      [store: IStore['domain']]: {
        /**
         * The redirect id, this is optional and applied
         * only when redirect exists.
         */
        id?: number;
        /**
         * The redirect pathname
         */
        path?: string;
        /**
         * The redirect target path
         */
        target?: string;
      }
    };
    /**
     * Metafield synchronization options
     */
    metafields: {
      /**
       * Whether or not to bind remote and local metafields
       */
      bind: boolean;
    };
    /**
     * Theme synchronization options
     */
    themes: Array<IThemes>;
    /**
     * Store synchronization options
     */
    stores: Array<IStore>;
  }
}
