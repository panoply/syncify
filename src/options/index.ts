/* eslint-disable prefer-const */
import merge from 'mergerino';
import { mergeDeepRight } from 'rambdax';
import { PartialDeep } from 'type-fest';
import { Bundle, Cache, Config, Minify, Plugins } from 'types';

/**
 * Cache Configuration
 *
 * This model represents cache references stores
 * within the `node_modules/.syncify` directory.
 */
export const cache = <PartialDeep<Cache>>({ /* DYNAMICALLY POPULATED */ });

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
    legalComments: 'none',
    mangleCache: {},
    mangleProps: null,
    mangleQuoted: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  },
  liquid: {
    removeNewlineAttributes: true,
    removeComments: true,
    removeSchemaRefs: true,
    minifySchemaTag: true,
    stripInnerTagWhitespace: false,
    stripWhitespaceDashes: true,
    stripAttributeNewlines: true,
    ignoreTags: [],
    ignoreObjects: [],
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
export const defaults = mergeDeepRight<Config>(<Config>{
  input: 'source',
  output: 'theme',
  import: 'import',
  export: 'export',
  stores: null,
  config: '.',
  live: false,
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
    ],
    redirects: 'redirects.yaml'
  },
  views: {
    icons: {
      useCustomTag: false,
      tagName: 'i',
      tagVoid: false,
      vscodeCustomData: false
    },
    sections: {
      directoryPrefixing: true,
      onlyPrefixDuplicates: true,
      prefixSeparator: '-',
      global: []
    },
    pages: {
      author: '',
      language: 'html'
    }
  },
  transforms: {
    svg: {
      input: null,
      rename: '',
      snippet: false,
      svgo: null,
      sprite: {
        dimensionAttributes: false,
        namespaceClassnames: false,
        namespaceIDS: false,
        rootAttributes: {}
      }
    },
    image: {
      input: null,
      sharp: {}
    },
    style: {
      input: null,
      postcss: false,
      sass: null
    },
    script: {
      input: [],
      rename: null,
      esbuild: {
        bundle: true,
        format: 'esm'
      }
    },
    json: {
      indent: 2,
      useTab: false,
      crlf: false,
      exclude: []
    }
  },
  minify: {
    json: false,
    html: false,
    liquid: false,
    script: false
  }
});

/**
 * Bundle Configuration
 *
 * This model represents bundle specific configuration
 * options and settings. This is typically merged with
 * the CLI defined options.
 */
export let bundle = <PartialDeep<Bundle>>({
  get plugins () { return plugins; },
  version: null,
  cli: false,
  cwd: null,
  silent: false,
  prod: false,
  dev: true,
  live: {},
  dirs: {},
  mode: {
    build: false,
    prompt: false,
    live: false,
    watch: false,
    clean: false,
    upload: false,
    download: false,
    metafields: false,
    pages: false,
    pull: false,
    push: false,
    vsc: false
  },
  spawn: {
    paths: new Set(),
    invoked: false,
    commands: {}
  },
  watch: [],
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
  svg: [],
  sync: {
    themes: [],
    stores: []
  },
  minify: {
    html: {},
    json: {},
    liquid: {},
    script: {}
  }
}) as Bundle;

/* -------------------------------------------- */
/* MERGE OPTIONS                                */
/* -------------------------------------------- */

/**
 * Patch Updates
 *
 * Merge as a reducer and patches are fed into a function
 * and then applied to export model references. This approach
 * allows us to access configuration across the project and
 * still have update capabilities.
 */
export const update = ({
  bundle: (patch: PartialDeep<Bundle>) => {
    bundle = merge(bundle, patch);
  }
});
