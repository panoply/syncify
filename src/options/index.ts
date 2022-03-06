/* eslint-disable prefer-const */
import merge from 'mergerino';
import { mergeDeepRight } from 'rambdax';
import { PartialDeep } from 'type-fest';
import { IBundle, ICache, IConfig, ITerser, ITransform } from 'types';

/**
 * Cache Configuration
 *
 * This model represents cache references stores
 * within the `node_modules/.syncify` directory.
 */
export const cache = <PartialDeep<ICache>>({ /* DYNAMICALLY POPULATED */}) as ICache;

/**
 * Preset Configuration
 *
 * This model is merged with the users config file
 * settings and options. This is reflective of the
 * `syncify.config.js` or `syncify.json` file schema.
 *
 * **Notes:**
 *
 * This model will assert defaults and be merged with
 * the `bundle`, `transform` and `terser` models.
 *
 * The defined settings will hold reference to the user
 * defined options, the model is immutable and as such
 * we can reference it.
 */
export const defaults = mergeDeepRight<IConfig>(<IConfig>{
  input: 'source',
  output: 'theme',
  import: 'import',
  export: 'export',
  stores: null,
  config: '.',
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
    ]
  },
  terser: {
    json: 'never',
    html: 'never',
    pages: 'never'
  },
  transforms: {
    pages: {
      markdown: {
        highlight: false
      }
    }
  }
});

/**
 * Bundle Configuration
 *
 * This model represents bundle specific configuration
 * options and settings. This is typically merged with
 * the CLI defined options.
 */
export let bundle = <PartialDeep<IBundle>>({
  version: null,
  cli: false,
  cwd: null,
  silent: false,
  prod: false,
  dev: true,
  dirs: {},
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
    vsc: false
  },
  spawn: {},
  watch: [],
  paths: {},
  sync: {
    themes: [],
    stores: []
  }
}) as IBundle;

/**
 * Transform Configuration
 *
 * This model represents transform specific configuration
 * options and settings. Transforms are optional, only when
 * transforms exists within a config file will this model be used.
 */
export const transform: ITransform = ({
  styles: [],
  json: {
    indent: 2,
    useTabs: false,
    exclude: null
  },
  sections: {
    directoryPrefixing: false,
    onlyPrefixDuplicates: false,
    prefixSeparator: '-',
    global: null
  },
  pages: {
    importAs: 'markdown',
    liquidWarnings: true,
    fallbackAuthor: null,
    markdown: {
      baseUrl: '',
      breaks: false,
      gfm: true,
      langPrefix: 'hljs language-',
      headerIds: true,
      headerPrefix: '',
      mangle: true,
      silent: false,
      smartypants: false
    }
  },
  icons: {
    replacer: false,
    replacerTag: 'icon',
    vscodeCustomData: false,
    inlined: [],
    sprites: []
  }
});

/**
 * Terser Configuration
 *
 * This model represents minification terser configuration
 * options and settings. Terser is optional, only when a user
 * has defined or informed they want minification processing
 * will this model be used.
 */
export const terser: ITerser = ({
  minify: {
    json: false,
    html: false,
    pages: false
  },
  liquid: {
    removeLiquidNewlineAttributes: true,
    removeLiquidComments: true,
    removeSchemaRefs: true,
    minifyLiquidSectionSchema: true,
    stripAttributesContainingNewlines: true,
    stripInnerTagWhitespace: false,
    stripRedundantWhitespaceDashes: true,
    ignoreLiquidTags: null,
    ignoreLiquidObjects: null,
    external: null
  },
  html: {
    minifyJS: false,
    minifyCSS: true,
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
    sortAttributes: true,
    sortClassName: false,
    useShortDoctype: true,
    collapseWhitespace: true,
    continueOnParseError: true,
    removeComments: true,
    trimCustomFragments: true,
    ignoreCustomFragments: [
      /(?<=\bstyle\b=["']\s?)[\s\S]*?(?="[\s\n>]?)/,
      /<style[\s\S]*?<\/style>/,
      /{%-?\s{0,}liquid[\s\S]*?-?%}/,
      /(?<={%-?\s{0,}(style|javascript)\s{0,}-?%})[\s\S]*?(?={%-?\s{0,}end(style|javascript)\s{0,}-?%})/
    ]
  }
});

/* -------------------------------------------- */
/* MERGE OPTIONS                                */
/* -------------------------------------------- */

/**
 * Patch Updates
 *
 * Merges as a reducer and patches are fed into a function
 * and then applied to export model references. This approach
 * allows us to access configuration across the project and
 * still have update capabilities.
 */
export const update = ({
  bundle: (patch: PartialDeep<IBundle>) => {
    bundle = merge(
      bundle,
      patch
    );
  }
});
