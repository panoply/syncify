/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import { PartialDeep } from 'type-fest';
import { HOT, Bundle, Cache, Config, Minify, Plugins, ProcessorConfigs } from 'types';
import { assign } from '../shared/native';

/**
 * Cache Configuration
 *
 * This model represents cache references stores
 * within the `node_modules/.syncify` directory.
 */
export const cache = <PartialDeep<Cache>>({ /* DYNAMICALLY POPULATED */ });

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
  views: {
    minifyScript: true,
    minifyStyle: true,
    minifySchema: true,
    removeComments: true,
    stripDashes: true,
    collapseWhitespace: true,
    ignoreTags: [],
    ignoreObjects: [],
    exclude: []
  }
};

/**
 * Processor Configuration
 *
 * This model is the default options for
 * the transform processors.
 */
export const processor: PartialDeep<ProcessorConfigs> = {
  json: {
    indent: 2,
    useTab: false,
    crlf: false,
    exclude: []
  },
  postcss: {
    installed: false,
    required: false,
    loaded: false,
    file: false,
    config: []
  },
  sass: {
    installed: false,
    required: false,
    loaded: false,
    file: false,
    config: {
      warnings: true,
      style: 'compressed',
      sourcemap: true,
      includePaths: [ 'node_modules' ]
    }
  },
  esbuild: {
    installed: false,
    required: false,
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
    required: false,
    loaded: false,
    file: false,
    config: {
      svg: {
        dimensionAttributes: false,
        namespaceClassnames: false,
        namespaceIDs: false
      }
    }
  },
  svgo: {
    installed: false,
    required: false,
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
 * HOT~Reload Configuration
 *
 * This model is used for HOT Reloading assets, views and
 * other content. HOT Reloads are only available in `--watch`
 * mode. The `bundle` config will use a boolean value to indicate
 * whether or not we should enable the feature.
 */
export const hot: HOT = {
  inject: true,
  server: 3000,
  socket: 8089,
  method: 'hot',
  scroll: 'preserved',
  layouts: [ 'theme.liquid' ],
  label: 'visible',
  output: null,
  renderer: '{% render \'hot.js.liquid\', server: 3000, socket: 8089 %}',
  snippet: null,
  alive: {},
  assets: {
    js: new Set(),
    css: new Set(),
    svg: new Set()
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
export const config: Config = {
  input: 'source',
  output: 'theme',
  import: 'import',
  export: 'export',
  stores: null,
  config: '.',
  hot: false,
  spawn: {
    build: null,
    watch: null
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
    pages: {
      author: '',
      language: 'html'
    }
  },
  transforms: {
    svg: null,
    image: null,
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
  hot: false,
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
  svg: {
    sprite: [],
    inline: []
  },
  set config (merge: Config) { assign(config, merge); },
  get config () { return config; },
  get processor () { return processor; },
  get minify () { return minify; }
} as unknown as Bundle;
