/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import { PartialDeep } from 'type-fest';
import { Bundle, Cache, Config, Minify, Plugins, ProcessorConfig } from 'types';
import { assign } from './utils/native';

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
 * Minify Configuration

 * This model represents minification terser configuration
 * options and settings. Terser is optional, only when a user
 * has defined or informed they want minification processing
 * will this model be used
 */
export const minify: Minify = {
  json: {
    assets: true,
    config: true,
    locales: true,
    metafields: true,
    templates: true,
    exclude: []
  },
  script: {
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
    mangleProps: null,
    legalComments: 'inline',
    mangleQuoted: false,
    keepNames: false
  },
  liquid: {
    minifyScript: true,
    minifyStyle: true,
    minifySchema: true,
    removeComments: true,
    stripDashes: true,
    exclude: []
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
      /{%[\s\S]*?%}/,
      /{{[\s\S]*?}}/
    ]
  }
};

/**
 * Processor Configuration
 *
 * This model is the default options for
 * the transform processors.
 */
export const processor: PartialDeep<ProcessorConfig> = {
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
      splitting: false,
      sourcemap: true,
      watch: false,
      write: false,
      incremental: true,
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
        'prefixIds'
      ]
    }
  }
};

/**
 * Preset Configuration
 *
 * This model is merged with the users config file
 * settings and options. This is reflective of the
 * `syncify.config.js` or `syncify.json` file schema.
 *
 * **Notes:**
 *
 * This model will assert defaults to be merged with
 * the `bundle`, `transform` and `terser` models.
 *
 * The defined settings will hold reference to the user
 * defined options, the model is immutable and as such
 * we can reference it.
 */
export const options: Config = {
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
    sections: 'sections/**/*.liquid',
    snippets: 'snippets/*.liquid',
    metafields: 'metafields/**/*.json',
    redirects: 'redirects.yaml',
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
  minify: {
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
 * This model represents bundle specific configuration
 * options and settings. This is typically merged with
 * the CLI defined options.
 */
export const bundle = {
  version: null,
  cli: false,
  cwd: null,
  silent: false,
  prod: false,
  dev: true,
  hot: {
    inject: true,
    server: 3000,
    socket: 8089,
    method: 'hot',
    scroll: 'preserved',
    layouts: [ 'theme.liquid' ],
    label: 'visible',
    renderer: '{% render \'hot.js.liquid\', server: 3000, socket: 8089 %}',
    snippet: null,
    output: null,
    alive: {}
  },
  dirs: {},
  sync: {
    themes: [],
    stores: []
  },
  mode: {
    build: false,
    prompt: false,
    watch: false,
    clean: false,
    upload: false,
    download: false,
    metafields: false,
    minify: false,
    hot: false,
    pages: false,
    pull: false,
    push: false,
    vsc: false,
    script: false,
    image: false,
    style: false,
    svg: false,
    redirects: false,
    export: false
  },
  spawn: {
    paths: new Set(),
    invoked: false,
    commands: {}
  },
  watch: new Set(),
  logger: {},
  paths: {},
  section: {},
  cmd: {},
  json: {},
  page: {
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
  },
  image: [],
  style: [],
  script: [],
  svg: [],
  set config (merge: Config) { assign(options, merge); },
  get config () { return options; },
  get processor () { return processor; },
  minify: {
    json: false,
    views: false,
    script: false,
    get options () { return minify; }
  }

} as unknown as Bundle;
