import { AcceptedPlugin } from 'postcss';
import { OptimizeOptions } from 'svgo';

/* -------------------------------------------- */
/* THEMES                                       */
/* -------------------------------------------- */

export interface IThemes {
  /**
   * Whether or not we require queued requests
   */
  queue: boolean;
  /**
   * The store domain name in Upcase (without `myshopify.com`)
   */
  store: string;
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
  allowComments: boolean;
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
    globals: string[];
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
    terser: {
      minifyJS?: boolean;
      minifyCSS?: boolean;
      removeComments?: boolean;
      collapseWhitespace?: boolean;
      trimCustomFragments?: boolean;
      ignoreCustomFragments?: string[];
    }
    /**
     * Liquid specific minification options
     */
    liquid: {
      minifySectionSchema?: boolean;
      removeLiquidComments?: boolean;
      ignoredLiquidTags?: string[];
    }
    /**
     * A list of files or directories to exclude from minification
     */
    exclude: string[];
  }
}

/* -------------------------------------------- */
/* STYLE OPTIONS                                */
/* -------------------------------------------- */

export interface IStyles {
  /**
   * POSTCSS transform options provided in a `postcss.config.js` file,
   * when no `postcss.config.js` file is present this will be `null`
   */
  postcss: {
    plugins?: AcceptedPlugin[];
  }
  /**
   * List of stylesheet files to process.
   */
  compile: Array<{
    /**
     * Stylesheet inputs src paths
     */
    input: string;
    /**
     * The stylesheet
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
    watch: string[];
    /**
     * A list of paths to include, ie: node_modules.
     */
    include: string[];
  }>

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
   * Whether or not we require queued requests
   */
  queue: boolean;
  /**
   * Preset API endpoint URLs
   */
  endpoints: {
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
  mode: 'cli' | 'api';
  /**
   * The mode from which Syncify was intialized.
   */
  terminal: 'default' | 'minimal' | 'dashboard';
  /**
   * The resource to execute, eg: 'watch', 'upload' or 'download'
   */
  resource: string;
  /**
   * The current working directory
   */
  cwd: string;
  /**
   * The list of spawned child proccesses running
   */
  spawns: string[];
  /**
   * The resolved `input` directory path
   */
  input: string;
  /**
   * The resolved `output` directory path
   */
  output: string;
  /**
   * The resolved `import` (downloads) directory path
   */
  import: string;
  /**
   * The resolved `export` (packaged .zip) directory path
   */
  export: string;
  /**
   * The resolved `config` directory path for build tool files
   */
  config: string;
  /**
   * Directory structure paths
   */
  paths: {
    /**
     * An array list of files to be uploaded as assets
     */
    assets: string[];
    /**
     * An array list of files to be uploaded as snippets
     */
    snippets: string[];
    /**
     * An array list of files to be uploaded as sections
     */
    sections: string[];
    /**
     * An array list of files to be uploaded as templates
     */
    templates: string[];
    /**
     * An array list of files to be uploads as template/customers
     */
    customers: string[];
    /**
     * An array list of files to be uploaded as configs
     */
    config: string[];
    /**
     * An array list of files to be uploaded as locales
     */
    locales: string[];
  };
  /**
   * The build configuration
   */
  transform: {
    /**
     * Stylesheet transforms, supports CSS/SASS
     */
    styles: IStyles;
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
    json: IViews
  };
  /**
   * The sync data model. Multiple stores and themes
   * can run concurrently.
   */
  sync: {
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
