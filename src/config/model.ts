import { join } from 'path';
import { anyTrue } from 'rambdax';
import { PartialDeep } from 'type-fest';
import { ICLIOptions, IConfig, IModes, IRedirect } from 'types';

export class Model implements PartialDeep<IConfig> {

  static output = [
    'assets',
    'config',
    'layout',
    'locales',
    'sections',
    'snippets',
    'templates',
    'templates/customers',
    'metafields',
    'pages'
  ];

  public cwd: string;
  public mode: IModes;
  public env: 'prod' | 'dev';
  public dev: boolean;
  public cache: string;
  public redirects: { [store: string]: IRedirect };
  public resource: string;
  public spawns: IConfig['spawns'];
  public node_modules: string;
  public version: string;
  public cli = true;
  public config = '.';
  public source = 'source';
  public export = 'export';
  public import = 'import';
  public output = 'theme';
  public metafields = 'source/metafields';
  public pages = 'source/pages';
  public watch = [];

  public sync = {
    stores: [],
    themes: []
  };

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
    pages: null
  };

  public caching = {
    styles: {
      uri: null
    },
    metafields: {
      uri: null,
      map: {}
    },
    sections: {
      uri: null
    }
  };

  public transform = {
    styles: [],
    icons: {
      svgo: null,
      snippets: null,
      sprites: []
    },
    json: {
      spaces: 2,
      minify: {
        apply: false,
        exclude: null,
        removeSchemaRefs: true
      }
    },
    markdown: {
      minify: false,
      breaks: false,
      gfm: true,
      headerIds: true,
      headerPrefix: '',
      langPrefix: 'hljs language-',
      highlight: null,
      mangle: true,
      silent: false,
      smartypants: false
    },
    views: {
      sections: {
        allowPrefix: false,
        globals: null,
        onlyPrefixDuplicates: false,
        prefixSeparator: '-'
      },
      minify: {
        apply: false,
        exclude: [],
        liquid: {
          minifySectionSchema: true,
          removeLiquidNewlineAttributes: true,
          removeRedundantWhitespaceDashes: true,
          removeLiquidComments: true,
          ignoredLiquidTags: []
        },
        terser: {
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
            /(?<={%-?\s{0,}style\s{0,}-?%})[\s\S]*?(?={%-?\s{0,}endstyle\s{0,}-?%})/
          ]
        }
      }
    }
  };

  constructor (cli: ICLIOptions) {

    this.cwd = cli.cwd;
    this.cache = join(this.cwd, 'node_modules', '.syncify');
    this.config = this.cwd;
    this.cli = true;
    this.dev = this.getEnv(cli);
    this.env = this.dev ? 'prod' : 'dev';
    this.mode = this.setModes(cli);
    this.node_modules = join(this.cwd, 'node_modules');
    this.transform.json.minify.apply = this.dev;
    this.transform.views.minify.apply = this.dev;
    this.transform.markdown.minify = this.dev;

  }

  /* -------------------------------------------- */
  /* PRIVATES                                     */
  /* -------------------------------------------- */

  private getEnv (cli: ICLIOptions) {

    return (
      cli.prod ||
      cli.env === 'prod' ||
      cli.env === 'production'
    );

  }

  private setModes (cli: ICLIOptions) {

    const resource = anyTrue(cli.pages, cli.metafields);

    return {
      help: cli.help,
      vsc: cli.vsc,
      metafields: cli.metafields,
      pages: cli.pages,
      prompt: cli.prompt,
      merge: cli.merge,
      pull: cli.pull,
      clean: anyTrue(
        resource,
        cli.upload
      ) ? false : cli.clean,
      build: anyTrue(
        resource,
        cli.upload,
        cli.watch,
        cli.download
      ) ? false : cli.build,
      watch: anyTrue(
        resource,
        cli.upload,
        cli.download
      ) ? false : cli.watch,
      upload: anyTrue(
        resource,
        cli.download,
        cli.watch
      ) ? false : cli.upload,
      download: anyTrue(
        resource,
        cli.upload,
        cli.watch,
        cli.build
      ) ? false : cli.download
    };

  }

}
