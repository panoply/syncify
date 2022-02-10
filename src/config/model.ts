import { join } from 'path';
import { PartialDeep } from 'type-fest';
import { ICLIOptions, IConfig, IModes, IRedirect } from 'types';

export class Model implements PartialDeep<IConfig> {

  public cwd: string;
  public mode: IModes;
  public env: 'prod' | 'dev';
  public dev: boolean;
  public cache: string;
  public redirects: { [store: string]: IRedirect };
  public resource: string;
  public spawns: IConfig['spawns'];
  public node_modules: string;
  public cli = true;
  public config = '.';
  public source = 'source';
  public export = 'export';
  public import = 'import';
  public output = 'theme';
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
    metafields: null
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
            // Ignore all Liquid
            /({%|{{)-?[\s\S]*?-?(}}|%})/g,

            // Ignore Inline Style
            /(?<=\bstyle\b=["']\s?)[\s\S]*?(?="[\s\n>]?)/,

            // Ignore <style></style>
            /<style[\s\S]*?<\/style>/,

            // Ignore Liquid tag blocks
            /{%-?\s{0,}liquid[\s\S]*?-?%}/,

            // Ignore content for header
            /{{-?\s*content_header[\s\S]*?}}/,

            // Ignore content for header
            /(?<={%-?\s{0,}style\s{0,}-?%})[\s\S]*?(?={%-?\s{0,}endstyle\s{0,}-?%})/
          ]
        }
      }
    }
  };

  constructor (cli: ICLIOptions) {

    this.cwd = cli.cwd;
    this.cache = join(this.cwd, 'node_modules', '.cache', 'syncify');
    this.config = this.cwd;
    this.cli = true;
    this.dev = this.getEnv(cli);
    this.env = this.dev ? 'prod' : 'dev';
    this.mode = this.setModes(cli);
    this.node_modules = join(this.cwd, 'node_modules');
    this.transform.json.minify.apply = this.dev;
    this.transform.views.minify.apply = this.dev;

  }

  /* -------------------------------------------- */
  /* PRIVATES                                     */
  /* -------------------------------------------- */

  private getEnv (cli: ICLIOptions) {
    return (cli.prod || cli.env === 'prod' || cli.env === 'production');
  }

  private setModes (cli: ICLIOptions) {

    return {
      help: cli.help,
      vsc: cli.vsc,
      clean: cli.upload ? false : cli.clean,
      build: (cli.watch || cli.upload || cli.download) ? false : cli.build,
      watch: (cli.upload || cli.download) ? false : cli.watch,
      upload: (cli.download || cli.watch) ? false : cli.upload,
      download: (cli.upload || cli.watch || cli.build) ? false : cli.download,
      prompt: cli.prompt
    };

  }

}
