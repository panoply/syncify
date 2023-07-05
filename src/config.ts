/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import { argv } from 'node:process';
import { Merge, PackageJson, PartialDeep } from 'type-fest';
import {
  Commands,
  Config,
  Cache,
  Directories,
  Logger,
  Plugins,
  WSS,
  Env,
  CommandBundle,
  ConfigFile,
  Modes,
  Spawn,
  Sync,
  Filters,
  SVGBundle,
  ScriptBundle,
  StyleBundle,
  HOTBundle,
  TerserBundle,
  TerserConfig,
  ProcessorsBundle,
  PathsBundle,
  PagesBundle,
  SnippetBundle,
  SectionBundle,
  WatchBundle
} from 'types';

import { merge } from 'rambdax';

/**
 * Cache Configuration
 *
 * This model represents cache references stores
 * within the `node_modules/.syncify` directory.
 */
export const cache = <PartialDeep<Cache>>({ /* DYNAMICALLY POPULATED */ });

/**
 * Warning stacks, maintains a store of log messages
 */
export const warning: {
  current: string;
  count: number;
  process: {
    [id: string]: Set<string>
  }
} = {
  current: null,
  count: 0,
  process: {}
};

/**
 * Terser Configuration
 *
 * This model represents minification terser configuration
 * options and settings. Terser is optional, only when a user
 * has defined or informed they want minification processing
 * will this model be used
 */
export const terser: TerserConfig = {
  json: {
    assets: true,
    config: true,
    locales: true,
    metafields: true,
    sectionGroups: true,
    templates: true,
    exclude: []
  },
  script: {
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
    mangleProps: undefined,
    legalComments: 'none',
    mangleQuoted: false,
    keepNames: false,
    exclude: []
  },
  liquid: {
    minifyScript: true,
    minifyStyle: true,
    minifySchema: true,
    removeComments: true,
    stripDashes: true,
    exclude: []
  },
  style: {
    exclude: [],
    format: false,
    inline: false
  },
  html: {
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
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    collapseWhitespace: true,
    continueOnParseError: true,
    removeComments: true,
    trimCustomFragments: true,
    ignoreCustomFragments: [
      /(?<=\bstyle\b=["']\s?)[\s\S]*?(?="[\s\n>]?)/,
      /<style[\s\S]*?<\/style>/,
      /<script[\s\S]*?<\/script>/,
      /{%-?\s*liquid[\s\S]*?%}/,
      /{%[\s\S]*?%}/
    ]
  }
};

/**
 * Processor Configuration
 *
 * This model is the default options for the transform processors.
 */
export const processor: PartialDeep<ProcessorsBundle> = {
  json: {
    indent: 2,
    useTab: false,
    crlf: false,
    exclude: null
  },
  postcss: {
    installed: false,
    loaded: false,
    file: false,
    config: []
  },
  sass: {
    installed: false,
    loaded: false,
    file: false,
    config: {
      warnings: true,
      style: 'compressed',
      sourcemap: true,
      include: [ 'node_modules' ]
    }
  },
  esbuild: {
    installed: false,
    loaded: false,
    file: false,
    config: {
      bundle: true,
      format: 'esm',
      globalName: undefined,
      target: 'es2016',
      metafile: true,
      external: [],
      platform: 'browser',
      splitting: false,
      sourcemap: 'linked',
      write: false,
      logLevel: 'silent',
      plugins: []
    }
  },
  sharp: {
    installed: false,
    required: false,
    loaded: false,
    file: false,
    config: {}
  },
  sprite: {
    installed: false,
    loaded: false,
    file: false,
    config: {
      mode: {
        inline: true,
        symbol: {
          example: false
        }
      },
      shape: {
        transform: [ 'svgo' ],
        id: {
          generator: 'svg-%s'
        }
      },
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
        dimensionAttributes: false,
        namespaceClassnames: false,
        namespaceIDs: false
      }
    }
  },
  svgo: {
    installed: false,
    loaded: false,
    file: false,
    config: {
      multipass: true,
      datauri: 'enc',
      js2svg: {
        indent: 2,
        pretty: true
      },
      plugins: [
        'preset-default',
        {
          name: 'pluginName',
          fn: () => {
            return {
              root: {
                enter: node => { },
                exit: node => { }
              },
              element: {
                enter: node => { },
                exit: node => { }
              },
              doctype: {
                enter: node => { },
                exit: node => { }
              },
              instruction: {
                enter: node => { },
                exit: node => { }
              },
              comment: {
                enter: node => { },
                exit: node => { }
              },
              cdata: {
                enter: node => { },
                exit: node => { }
              },
              text: {
                enter: node => { },
                exit: node => { }
              }
            };
          }
        }
      ]
    }
  }
};

/**
 * Default Configuration
 *
 * This model is merged with the users config file settings and options.
 * This is reflective of the `syncify.config.js` or `syncify.json` file.
 *
 * **Notes:**
 *
 * This model will assert defaults to be merged with the `bundle`, `transform` and `terser` models.
 * The defined settings will hold reference to the user defined options, the model is immutable.
 */
export const defaults: Config = {
  input: 'source',
  output: 'theme',
  import: 'import',
  export: 'export',
  config: '.',
  hot: false,
  stores: null,
  spawn: {
    build: null,
    watch: null
  },
  logger: {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  },
  paths: {
    assets: 'assets/*',
    config: 'config/*.json',
    layout: 'layout/*.liquid',
    locales: 'locales/*.json',
    snippets: 'snippets/*.liquid',
    metafields: 'metafields/**/*.json',
    redirects: 'redirects.yaml',
    sections: [
      'sections/**/*.json',
      'sections/**/*.liquid'
    ],
    pages: [
      'pages/*.html',
      'pages/*.md'
    ],
    templates: [
      'templates/customers/*.liquid',
      'templates/customers/*.json'
    ],
    customers: [
      'templates/customers/*.liquid',
      'templates/customers/*.json'
    ]
  },
  views: {
    sections: {
      prefixDir: false,
      separator: '-',
      global: []
    },
    snippets: {
      prefixDir: false,
      separator: '-',
      global: []
    },
    pages: {
      author: '',
      language: 'html'
    }
  },
  transforms: {
    svg: null,
    style: null,
    script: null
  },
  terser: {
    json: false,
    views: false,
    script: false
  }
};

/**
 * Plugin Store
 *
 * This model holds reference to plugins. Entries
 * are populated at runtime and thier hooks stored
 * in relative Map and invoked at different cycles.
 */
export const plugins: Plugins = {
  onBuild: [],
  onChange: [],
  onReload: [],
  onTransform: [],
  onWatch: []
};

/**
 * Bundle Configuration
 *
 * This model represents bundle specific configuration options and settings.
 * This will merged with the CLI defined options.
 */
export const bundle = new class Bundle {

  /**
   * The users configuration settings merged with defaults
   */
  private static defaults: Config = defaults;

  /**
   * The parsed contents of `package.json` file
   */
  private static package: PackageJson = {};

  /**
   * The terse minification configuration settings
   */
  private static terser: TerserConfig = terser;

  /**
   * Websockets HOT reloading
   */
  public wss: WSS = null;

  /**
   * CLI provided filters
   *
   * @default null
   */
  public filters: Filters = {};

  /**
   * Cache copy of the invoked commands in which syncify was started
   *
   * @default null
   */
  public commands: Commands = null;

  /**
   * The version defined in the package.json
   *
   * @default null
   */
  public version: string = null;

  /**
   * The current working directory
   *
   * @default null
   */
  public cwd: string = null;

  /**
   * The provided command passed on the CLI.
   *
   * @default null
   */
  public argv: string = argv.slice(2).join(' ');

  /**
   * Error store, holds reference to errors
   *
   * @default Set<string>
   */
  public errors: Set<string> = new Set();

  /**
   * Execution options which describe the invocation and operation
   * instructions which Syncify was initialised.
   *
   * @default
   * {
   *  cli: false,
   *  dev: true,
   *  prod: false
   *  sync: 0
   * }
   */
  public env: Env = {
    cli: false,
    dev: true,
    prod: false,
    sync: 0
  };

  /**
   * Hot reload mode options - Use the `mode.hot` reference to
   * determine whether or not HOT reloading is enabled.
   *
   * @default
   * {
   *  inject: true,
   *  server: 3000,
   *  socket: 8089,
   *  method: 'hot',
   *  scroll: 'preserved',
   *  layouts: [ 'theme.liquid' ],
   *  label: 'visible',
   *  renderer: '{% render \'hot.js\', server: 3000, socket: 8089 %}',
   *  snippet: null,
   *  output: null,
   *  alive: {}
   * }
   */
  public hot: HOTBundle = {
    inject: true,
    server: 3000,
    socket: 8089,
    history: false,
    method: 'hot',
    scroll: 'preserved',
    layouts: [ 'theme.liquid' ],
    label: 'visible',
    renderer: '{% render \'hot.js\', server: 3000, socket: 8089 %}',
    snippet: null,
    output: null,
    alive: {}
  };

  /**
   * Logger Options
   */
  public logger: Logger = {
    clear: true,
    silent: false,
    stats: true,
    warnings: true
  };

  /**
   * The operation mode executing
   *
   * @default false // all modes are false by default
   */
  public mode: Modes = {
    build: false,
    interactive: false,
    watch: false,
    clean: false,
    upload: false,
    download: false,
    metafields: false,
    terse: false,
    hot: false,
    pages: false,
    pull: false,
    force: false,
    vsc: false,
    views: false,
    script: false,
    image: false,
    style: false,
    svg: false,
    redirects: false,
    export: false
  };

  /**
   * The configuration file name resolution
   *
   * @default
   * {
   *  base: null,
   *  ext: null,
   *  path: null,
   *  relative: null
   *  type: null
   * }
   */
  public file: ConfigFile = {
    base: null,
    path: null,
    relative: null
  };

  /**
   * Base directory path references
   */
  public dirs: Merge<Directories, { cache: string }> = {};

  /**
   * Passed commands that may be of importance in the transform or build processes.
   *
   * @default
   * {
   *   config: null,
   *   delete: null,
   *   filter: null,
   *   input: null,
   *   output: null
   * }
   */
  public cmd: CommandBundle = {
    config: null,
    delete: null,
    filter: null,
    input: null,
    output: null
  };

  /**
   * The sync clients. Multiple stores and themes can run concurrently.
   *
   * @default
   * {
   *   themes: [],
   *   stores: []
   * }
   */
  public sync: Sync = {
    themes: [],
    stores: []
  };

  /**
   * Spawn related configuration operations
   */
  public spawn: Spawn = {
    paths: new Set(),
    streams: new Map(),
    invoked: false,
    commands: {}
  };

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
  public section: SectionBundle = {
    prefixDir: false,
    separator: '-',
    global: null
  };

  /**
   * Snippet sub-directory configuration
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
  public snippet: SnippetBundle = {
    prefixDir: false,
    separator: '-',
    global: null
  };

  /**
   * Holds an instance of FSWatcher. Chokidar is leveraged in for watching,
   * and this value exposes the instance and it can be used anywhere in the
   * module. In addition, the main Chokidar is extended to support `.has()`
   *
   *  @default null // defaults to null unless watch mode is invoked
   */
  public watch: WatchBundle | Set<string | readonly string[]> = new Set();
  /**
   * Directory structure paths.
   *
   * Includes a special `transforms` Map reference for transform related files
   * which may potentially be using an extension that would lead to it being identified
   * as a different file type. This occurs when (for example) snippet generated transforms
   * are inferred. The `transform` option will point to resolved file names and the values
   * for each entry will equal an enum `Type` number. The following transforms are identifiable:
   *
   * - `7` > `Type.Style`
   * - `8` > `Type.Script`
   * - `9` > `Type.SVG`
   */
  public paths: PathsBundle = {
    transforms: new Map()
  };

  /**
   * Page transforms
   *
   * @default []
   */
  public page: PagesBundle = {
    export: {
      quotes: '“”‘’',
      html: true,
      linkify: false,
      typographer: false,
      xhtmlOut: false,
      breaks: false,
      langPrefix: 'language-'
    },
    import: {
      codeBlockStyle: 'fenced',
      emDelimiter: '_',
      fence: '```',
      headingStyle: 'atx',
      hr: '***',
      linkReferenceStyle: 'full',
      linkStyle: 'inlined',
      strongDelimiter: '**',
      bulletListMarker: '-'
    }
  };

  /**
   * Script transforms
   *
   * @default []
   */
  public script: ScriptBundle[] = [];
  /**
   * Style tranforms
   *
   * @default []
   */
  public style: StyleBundle[] = [];
  /**
   * SVG transforms
   *
   * @default []
   */
  public svg: SVGBundle[] = [];
  /**
   * Image transforms
   */
  public image: any;
  /**
   * Terser Minification Options
   */
  public terse: TerserBundle = {
    /**
     * Terse JSON Minification
     *
     * @default false
     */
    json: false,
    /**
      * View minification
      */
    views: false,
    /**
      * **NOTE YET AVAILABLE**
      *
      * Terse Style (CSS) Minification
      */
    style: false,
    /**
      * Terse Script (JS/TS) Minification
      */
    script: false
  };

  /**
  * Merged terse minification configuration
  */
  get terser () { return Bundle.terser; }
  /**
    * Merged terse minification configuration
    */
  set terser (options: TerserConfig) { Bundle.terser = merge(Bundle.terser, options); }
  /**
   * Processor Configurations
   */
  get processor () { return processor; }
  /**
   * Merge users configuration with default
   */
  set config (data: Config) { Bundle.defaults = merge(Bundle.defaults, data); }
  /**
   * Returns the merged configuration of users syncify configuration with defaults
   */
  get config () { return Bundle.defaults; }
  /**
   * Merge the `package.json` contents
   */
  set pkg (data: PackageJson) { Bundle.package = merge(Bundle.package, data); }
  /**
   * Returns the `package.json` contents
   */
  get pkg (): PackageJson { return Bundle.package; }
  /**
   * Plugins
   */
  get plugins (): Plugins { return plugins; }

}();

export type Bundle = typeof bundle
