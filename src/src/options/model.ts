import type { Options } from 'browser-sync';
import { ICLICommands, IConfig, IMinify, ITerser, ITransform } from 'types';
import merge from 'mergerino';
import { assign } from '../shared/native';

export class Model implements IConfig {

  static theme = [
    'assets',
    'layout',
    'locales',
    'config',
    'sections',
    'snippets',
    'templates',
    'templates/customers'
  ];

  public version = null;
  public cwd = null;
  public config = '.';
  public input = 'source';
  public output = 'theme';
  public export = 'export';
  public import = 'import';
  public redirects = 'redirects.yaml';
  public metafields = null;
  public pages = null;
  public cli = true;
  public silent = false;
  public dev = true;
  public prod = false;
  public watch = [];
  public cache = {};
  public spawn = {};

  /**
   * Browser Sync server configuration options.
   * Users can optionally enable browser-sync, when
   * undefined, the `proxy` value is `null`
   */
  public server: Options = {
    proxy: null,
    files: [],
    serveStatic: [],
    notify: false,
    open: false,
    reloadOnRestart: true,
    ui: { port: 4000 }
  };

  public cmd = {
    input: null,
    output: null,
    filter: null,
    delete: null
  };

  public sync = {
    stores: [],
    themes: []
  };

  public minify: IMinify = {
    json: false,
    html: false,
    pages: false
  };

  public mode = {
    vsc: false,
    metafields: false,
    redirects: false,
    pages: false,
    prompt: false,
    push: false,
    pull: false,
    clean: false,
    build: false,
    watch: false,
    upload: false,
    download: false,
    server: false,
    export: false
  };

  /**
   * Glob `anymatch` patterns for path
   * mapping of input into output directories.
   */
  public paths = {
    assets: null,
    config: null,
    layout: null,
    customers: null,
    locales: null,
    sections: null,
    snippets: null,
    templates: null,
    metafields: null,
    pages: null,
    redirects: null
  };

  public terser: ITerser = {
    liquid: {
      removeLiquidNewlineAttributes: true,
      removeLiquidComments: true,
      minifyLiquidSectionSchema: true,
      stripAttributesContainingNewlines: true,
      stripInnerTagWhitespace: false,
      stripRedundantWhitespaceDashes: true,
      ignoreLiquidTags: null,
      ignoreLiquidObjects: null,
      external: null
    },
    html: {
      minifyJS: true,
      minifyCSS: true,
      removeComments: true,
      collapseWhitespace: true,
      trimCustomFragments: true,
      continueOnParseError: true,
      ignoreCustomFragments: [
        /(?<=\bstyle\b=["']\s?)[\s\S]*?(?="[\s\n>]?)/,
        /<style[\s\S]*?<\/style>/,
        /{%-?\s{0,}liquid[\s\S]*?-?%}/,
        /(?<={%-?\s{0,}(style|javascript)\s{0,}-?%})[\s\S]*?(?={%-?\s{0,}end(style|javascript)\s{0,}-?%})/
      ]
    }
  };

  /**
   * Transform configuration options
   */
  public transform: ITransform = {
    styles: [],
    icons: {
      replacer: true,
      replacerTag: 'i',
      vscodeCustomData: false,
      sprites: [],
      inlined: []
    },
    json: {
      indent: 2,
      useTabs: false,
      exclude: null
    },
    sections: {
      directoryPrefixing: true,
      onlyPrefixDuplicates: false,
      prefixSeparator: '-',
      global: null
    },
    pages: {
      importAs: 'markdown',
      liquidWarnings: true,
      fallbackAuthor: null,
      markdown: {
        baseUrl: null,
        breaks: false,
        gfm: true,
        headerIds: true,
        headerPrefix: '',
        langPrefix: 'hljs language-',
        highlight: null,
        mangle: true,
        silent: false,
        smartypants: false
      }
    }
  };

  constructor (cli: ICLICommands) {

    this.cwd = cli.cwd;
    this.dev = cli.dev && !cli.prod;
    this.prod = cli.prod;
    this.silent = cli.silent;

  }

  update (options: IConfig) {

    assign(this, merge<IConfig>(this, options));

  }

}
