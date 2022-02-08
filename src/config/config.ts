/* eslint-disable new-cap */
import { IOptions, ICLIOptions, IConfig, IIcons, IPackage, IStyle, IStore } from 'types';
import { PartialDeep } from 'type-fest';
import { resolve, join, basename } from 'path';
import { glob } from 'glob';
import { has, hasPath, includes, isEmpty, isNil } from 'rambdax';
import anymatch from 'anymatch';
import { readJson, pathExistsSync, pathExists, mkdir } from 'fs-extra';
import dotenv from 'dotenv';
// import YAML from 'yamljs';
import { assign, is, isArray, isObject, isRegex, isString, isUndefined, keys } from 'shared/native';
import { lastPath, normalPath, parentPath, getConfigs, getModules } from 'shared/helpers';
import { log, create } from 'cli/console';
import * as style from 'transform/styles';

/**
 * Read Configuration
 *
 * Acquires the necessary configurations
 * from the workspace. Parses the `package.json`
 * file and the `.env` file, returning the
 * credentials of store connection data.
 */
export const readConfig = async (options: ICLIOptions) => {

  if (!options.cli) return options as any as IConfig;

  return command(options) as unknown as IConfig;

};

/**
 * Parse Command
 *
 * Determines what commands were passed via the
 * CLI and constructs a workable configuration.
 */
function command (options: ICLIOptions) {

  if (is(options._.length, 0)) {
    options.resource = 'flags';
    return getPackage(options);
  }

  options.store = options._[0].split(',');

  if (has('theme', options)) {
    options.theme = (options.theme as any).split(',');
  } else {
    throw new Error('Missing "theme" target in command');
  }

  if (has('theme', options)) {
    if (options.store.includes('store')) {
      throw new Error('Theme name "store" is reserved, use a different name.');
    }
    if (options.store.includes('theme')) {
      throw new Error('Theme name, "theme" is reserved, use a different name.');
    }
    if (options.store.includes('vsc')) {
      throw new Error('Theme name, "vsc" is reserved, use a different name.');
    }
  }

  return getPackage(options);

}

/**
 * Resolve Paths
 *
 * Resolves `package.json` file and the `.env`
 * file locations relative to the current working
 * directory.
 */
function getPackage (options: ICLIOptions) {

  if (has('cwd', options)) options.cwd = process.cwd();

  options.pkg = resolve(options.cwd, 'package.json');

  if (pathExistsSync(options.pkg)) return readPackage(options);

  throw new Error('Missing "package.json" file');

}

/**
 * Read Package Configuration
 *
 * Read the `package.json` file and extract
 * the `syncify` defined settings.
 */
async function readPackage (options: ICLIOptions) {

  const pkg: IPackage = await readJson(options.pkg);

  if (hasPath('syncify.stores', pkg)) {
    if (isArray(pkg.syncify.stores)) return defaults(options, pkg);
    if (isUndefined(pkg.syncify.stores)) {
      throw new Error('Missing "stores" option in syncify settings');
    } else {
      throw new Error('The "stores" option must be of type array');
    }
  }

  throw new Error('Your package.json file is missing the "syncify" value.');

}

/* -------------------------------------------- */
/* DEFAULT CONFIGURATIONS                       */
/* -------------------------------------------- */

/**
 * Set Base defaults
 *
 * Utility function for normalizing dirs paths configuration.
 * This resolve the directory paths, and attempt to correct them
 * if they are misconfigured.
 */
async function defaults (cli: ICLIOptions, pkg: IPackage) {

  const cache = join(cli.cwd, 'node_modules/.cache');
  const apply = cli.env === 'prod' || cli.env === 'production';
  const config: PartialDeep<IConfig> = {
    cwd: cli.cwd,
    cli: true,
    env: cli.env ? cli.env as 'dev' : 'prod',
    mode: {
      help: cli.help,
      vsc: cli.vsc,
      clean: cli.upload ? false : cli.clean,
      build: (cli.watch || cli.upload || cli.download) ? false : cli.build,
      watch: (cli.upload || cli.download) ? false : cli.watch,
      upload: (cli.download || cli.watch) ? false : cli.upload,
      download: (cli.upload || cli.watch || cli.build) ? false : cli.download
    },
    resource: null,
    cache: join(cache, 'syncify'),
    config: cli.cwd,
    source: 'source',
    export: 'export',
    import: 'import',
    output: 'theme',
    watch: [],
    transform: {
      icons: {
        svgo: null,
        snippets: null,
        sprites: []
      },
      json: {
        spaces: 2,
        minify: {
          apply,
          exclude: null,
          removeSchemaRefs: true
        }
      },
      styles: [],
      views: {
        sections: {
          allowPrefix: false,
          globals: null,
          onlyPrefixDuplicates: false,
          prefixSeparator: '-'
        },
        minify: {
          apply,
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
              /({%|{{)-?[\s\S]*?-?(}}|%})/g
            ]
          }
        }
      }
    },
    sync: {
      stores: [],
      themes: []
    },
    paths: {
      assets: null,
      config: null,
      layout: null,
      customers: null,
      locales: null,
      sections: null,
      snippets: null,
      templates: null,
      metafields: null
    }
  };

  console.log(config);

  if (!config.mode.build && (isEmpty(cli.store) || config.mode.vsc || config.mode.help)) return config;

  config.resource = config.mode.watch
    ? 'watch'
    : config.mode.build
      ? 'build'
      : null;

  if (!isNil(config.resource)) config.spawns = pkg.syncify.spawn[config.resource];

  if (!pathExistsSync(cache)) {
    try {
      await mkdir(cache);
    } catch (e) {
      log.throw('Failed to create a ".cache" directory');
    }
  }

  // env variables
  process.env.SYNCIFY_ENV = config.env;
  process.env.SYNCIFY_WATCH = String(config.mode.watch);
  process.env.SYNCIFY_RESOURCE = config.resource;

  // blessed initializes
  create(config as IConfig, [
    'print',
    'throw',
    'error',
    'clean',
    'files'
  ]);

  return setGlobals(config, cli, pkg);

}

/**
 * Set Global Configuration
 *
 * Applies node specific environment globals
 * for the current syncify instance.
 */
async function setGlobals (config: PartialDeep<IConfig>, cli: ICLIOptions, pkg: IPackage) {

  if (!pathExistsSync(config.cache)) {
    try {
      await mkdir(config.cache);
    } catch (e) {
      log.throw('Failed to create a ".cache/syncify" directory.');
    }
  }

  if (!pathExistsSync(config.output)) {
    try {
      await mkdir(config.output);
    } catch (e) {
      log.throw('Failed to create a "output" directory "' + config.output + '"');
    }
  }

  if (!has('dirs', pkg.syncify)) return getStores(config, cli, pkg);

  for (const dir in pkg.syncify.dirs) {

    let path: string = pkg.syncify.dirs[dir];

    // path directory starts with . character
    if (is(path.charCodeAt(0), 46)) {

      // path directory next character is not forard slash
      // for example, ".folder" this will be invalid
      if (is(path.charCodeAt(1), 47)) {
        path = path.slice(1);
      } else {
        log.throw('Directory path is invalid at: "' + path + '"');
      }
    }

    // path directory starts with / character
    if (is(path.charCodeAt(0), 47)) path = path.slice(1);

    // path directory is valid, eg: path
    // dirs cannot reference sub directorys, eg: path/sub
    if (/^[a-zA-Z0-9_-]+/.test(path)) {
      config[dir] = pkg.syncify.dirs[dir];
    } else {
      log.throw('Directory path is invalid at: "' + path + '"');
    }
  }

  return getStores(config, cli, pkg);
}

/**
 * Store Authorization URL
 *
 * Generate the the authorization URL to
 * be used for requests.
 */
function getURL (domain: string, env: object): { token: string; base: string; } {

  let api_token = domain + '_api_token';

  if (has(api_token, env)) {
    return {
      token: env[api_token],
      base: `https://${domain}.myshopify.com`
    };
  }

  api_token = api_token.toUpperCase();

  if (has(api_token, env)) {
    return {
      token: env[api_token],
      base: `https://${domain}.myshopify.com`
    };
  }

  api_token = undefined;

  let api_key = domain + '_api_key';
  let api_secret = domain + '_api_secret';

  if (!has(api_key, env)) api_key = api_key.toUpperCase();
  if (!has(api_secret, env)) api_secret = api_secret.toUpperCase();
  if (has(api_key, env) && has(api_secret, env)) {
    return {
      token: null,
      base: `https://${env[api_key]}:${env[api_secret]}@${domain}.myshopify.com`
    };
  }

  throw new Error(`Missing "${domain}" credentials`);

}

/**
 * Resolve Stores
 *
 * Resolves Shopify stores and themes from the `package.json`
 * file and the `.env` file locations relative to the current
 * working directory.
 */
function getStores (config: PartialDeep<IConfig>, cli: ICLIOptions, pkg: IPackage) {

  const { syncify } = pkg;
  const file = dotenv.config({ path: join(config.cwd, '.env') });

  if (config.resource === 'build') return getPaths(config, pkg);

  const stores = syncify.stores.filter(({ domain }) => includes(domain, cli.store));

  for (const field of stores) {

    const store: PartialDeep<IStore> = {};

    // Upcase the store name for logs, eg: sissel > Sissel
    store.store = field.domain;

    // The myshopify store domain
    store.domain = `${store.store}.myshopify.com`.toLowerCase();

    // Fallback to environment variables if no .env file
    const env = file.error ? process.env : file.parsed;

    // Get authorization url for the store
    const { base, token } = getURL(field.domain, env);

    // Set token (if defined)
    store.token = token;

    // Set URLs
    store.url = {
      themes: `${base}/admin/themes.json`,
      redirects: `${base}/admin/redirects.json`,
      metafields: `${base}/admin/metafields.json`,
      pages: `${base}/admin/pages.json`
    };

    if (isNil(token)) {
      store.token = token;

    }

    // Set store endpoints
    config.sync.stores.push(store);

    const themes = has('theme', cli)
      ? cli.theme
      : has(field.domain, cli)
        ? cli[field.domain].split(',')
        : keys(field.themes);

    for (const target of themes) {

      if (!has(target, field.themes)) {
        log.throw(`Missing theme target "${target}" in ${field.domain} store.`);
      }

      config.sync.themes.push({
        target,
        store: store.store,
        token: store.token,
        domain: store.domain,
        id: field.themes[target],
        url: `${base}/admin/themes/${field.themes[target]}/assets.json`
      });
    }
  }

  if (is(config.sync.stores.length, 0)) {
    log.throw('Unknown, missing or invalid store/theme targets');
  }

  return getPaths(config, pkg);

}

/**
 * Create Dirs
 *
 * Generates output directories if they are non existent
 * within the workspace.
 */
export async function createDirs (output: string, path: string) {

  if (path === 'templates/customers') {
    const uri = join(output, 'templates');
    const has = await pathExists(join(output, 'templates'));
    if (!has) {
      try {
        await mkdir(uri);
      } catch (e) {
        log.throw('Failed to create output directory "' + uri + '"');
      }

    }
  }

  const uri = join(output, path);
  const has = await pathExists(uri);

  if (!has) {
    try {
      await mkdir(uri);
    } catch (e) {
      log.throw('Failed to create output directory "' + uri + '"');
    }
  }

}

/**
 * Get Paths
 *
 * Utility function for normalizing the paths configuration.
 * This will fix and resolve custom paths. If a user
 * defines the build directory input in directory paths
 * it will ensure it is formed correctly.
 */
async function getPaths (config: PartialDeep<IConfig>, pkg: IPackage) {

  const { syncify } = pkg;
  const mode = config.resource === 'upload' ? config.output : config.source;
  const path = normalPath(mode);

  for (const key in config.paths) {

    let uri: string[];

    if (key === 'metafields') {

      if (hasPath('metafields.input', syncify)) {
        uri = [ join(path(syncify.metafields.input), '**/*.json') ];
      } else {
        uri = [ join(path('metafields'), '**/*.json') ];
      }

    } else if (key === 'customers') {

      await createDirs(config.output, 'templates/customers');

      uri = [ path('templates/' + key) ];

    } else if (has(key, syncify.paths)) {

      await createDirs(config.output, key);

      uri = isArray(syncify.paths[key]) ? syncify.paths[key].map(path) : [ path(syncify.paths[key]) ];

    } else {

      uri = [ path(key) ];

    }

    if (key === 'assets') {

      const glob = join(config.output, 'assets/**');

      if (isArray(uri)) {
        uri.push(glob);
      } else {
        uri = [ uri, glob ];
      }
    }

    if (!isUndefined(uri)) {

      config.watch.push(...uri);
      config.paths[key] = anymatch(uri);

    }

  }

  return getViews(config, pkg);

}

/**
 * Get Configs
 *
 * Returns path locations of config files like
 * postcss.config.js and svgo.config.js.
 */
function getViews (config: PartialDeep<IConfig>, pkg: IPackage) {

  if (isUndefined(pkg.syncify.transform) || !has('views', pkg.syncify.transform)) {
    return minifyOptions(config, pkg);
  }

  const { transform } = pkg.syncify;

  if (has('sections', transform.views)) {

    assign(config.transform.views.sections, transform.views.sections);

    if (has('globals', transform.views.sections)) {

      const { globals } = transform.views.sections;

      if (isArray(globals)) {
        config.transform.views.sections.globals = new RegExp(globals.join('|'));
      } else {
        log.throw('Section "global" configuration must be an array type.');
      }
    }

  }

  if (has('minify', transform.views)) {

    for (const key in transform.views.minify) {

      const minify = transform.views.minify[key];

      if (has(key, config.transform.views.minify.terser)) {

        config.transform.views.minify.terser[key] = minify;

      } else if (has(key, config.transform.views.minify.liquid)) {

        config.transform.views.minify.liquid[key] = minify;

      } else if (key === 'env') {

        if (minify === 'any') {
          config.transform.views.minify.apply = true;
        } else if (minify === 'never') {
          config.transform.views.minify.apply = false;
        } else if (minify === 'production') {
          config.transform.views.minify.apply = true;
        }

      } else if (key === 'exclude') {

        if (isArray(minify)) {
          config.transform.views.minify.exclude = minify;
        } else {
          log.throw('The views "minification" excludes must be array type');
        }
      }
    }
  }

  return minifyOptions(config, pkg);

}

/**
 * Minification Options
 *
 * Apply minification options for views. This will write
 * logic for both liquid and HTML terser minifier options.
 */
function minifyOptions (config: PartialDeep<IConfig>, pkg: IPackage) {

  if (hasPath('transform.views.minify', pkg.syncify)) {

    if (has('ignoreCustomFragments', pkg.syncify.transform.views.minify)) {

      const { ignoreCustomFragments } = pkg.syncify.transform.views.minify;

      if (isArray(ignoreCustomFragments)) {

        const tags = ignoreCustomFragments.map(
          (fragment: any) => isRegex(fragment)
            ? fragment
            : new RegExp(fragment)
        );

        config.transform.views.minify.terser.ignoreCustomFragments.push(
          ...tags,
          // Ignore Inline Style
          /(?<=\bstyle\b=["']\s?)[\s\S]*?(?="[\s\n>]?)/,

          // Ignore <style></style>
          /<style[\s\S]*?<\/style>/,

          // Ignore Liquid tabs blocks
          /{%-?\s{0,}liquid[\s\S]*?-?%}/,

          // Ignore content for header
          /{{-?\s*content_header[\s\S]*?}}/,

          // Ignore content for header
          /(?<={%-?\s{0,}style\s{0,}-?%})[\s\S]*?(?={%-?\s{0,}endstyle\s{0,}-?%})/
        );

      } else {

        log.throw('The "ignoredLiquidTags" option must be an array type');
      }

    }

    if (has('ignoredLiquidTags', pkg.syncify.transform.views.minify)) {

      const { ignoredLiquidTags } = pkg.syncify.transform.views.minify;

      if (isArray(ignoredLiquidTags)) {
        const tags = new RegExp(`{%-?\\s*(?:(?!${ignoredLiquidTags.join('|')})[\\s\\S])*?%}`);
        config.transform.views.minify.terser.ignoreCustomFragments.push(tags);
      } else {
        log.throw('The "ignoredLiquidTags" option must be an array type');
      }

    }

  }

  return getJson(config, pkg);

}

/**
 * JSON
 *
 * Applied defaults for JSON configuration
 */
function getJson (config: PartialDeep<IConfig>, pkg: IPackage) {

  if (isUndefined(pkg.syncify.transform) || !has('json', pkg.syncify.transform)) {
    return getStyles(config, pkg);
  }

  const { transform } = pkg.syncify;

  if (has('spaces', transform.json)) {
    config.transform.json.spaces = transform.json.spaces;
  }

  if (has('minify', transform.json)) {

    if (has('env', transform.json.minify)) {
      if (transform.json.minify.env === 'any') {
        config.transform.json.minify.apply = true;
      } else if (transform.json.minify.env === 'never') {
        config.transform.json.minify.apply = false;
      } else {
        config.transform.json.minify.apply = transform.json.minify.env === config.env;
      }
    }

    if (has('exclude', transform.json.minify.exclude)) {

      if (!isArray(transform.json.minify.exclude)) {
        log.throw('JSON "excludes" must use an array type');
      }

      const path = normalPath(config.source);
      config.transform.json.minify.exclude = config.transform.json.minify.exclude.map(path);

    }

    if (has('removeSchemaRefs', transform.json.minify)) {
      config.transform.json.minify.removeSchemaRefs = transform.json.minify.removeSchemaRefs;
    }

  }

  return getStyles(config, pkg);
}

/**
 * Styles
 *
 * Applies defaults to stylesheets defined in config,
 * parses the `postcss.config.js` configuration file and
 * normalizes the configuration object.
 */
async function getStyles (config: PartialDeep<IConfig>, pkg: IPackage) {

  // Find postcss configuration files
  const postcssconfig = await getConfigs(config as IConfig, [
    'postcss.config.js',
    'postcss.config.cjs',
    'postcss.config.mjs'
  ]);

  if (!isNil(postcssconfig)) {
    if (getModules(pkg, 'postcss')) {
      style.processer(postcssconfig);
    } else {
      log.throw('Missing "postcss" dependency');
    }
  }

  const { transform } = pkg.syncify;

  if (isUndefined(transform) || !has('styles', transform)) {
    return getIcons(config, transform);
  }

  if (!isArray(transform.styles)) {
    log.throw('Invalid transform configuration, the option "styles" must be an array type');
  }

  const path = normalPath(config.source);
  const list = transform.styles.flatMap((style) => {

    if (isArray(style.input)) {

      return style.input.flatMap(input => {
        if (!/\*\.(?:css|scss|sass)/.test(input)) return { ...style, input };
        return glob.sync(path(input)).map(input => ({ ...style, input }));
      });

    }

    return /\*\.(?:css|scss|sass)/.test(style.input)
      ? glob.sync(path(style.input)).map(input => ({ input }))
      : style;

  });

  for (const style of list) {

    const compile: Partial<IStyle> = {};
    const parent = parentPath(style.input);

    compile.input = path(style.input);
    compile.cache = config.cache + '/';
    compile.sass = { sourcemap: true, style: 'compressed', warnings: true };
    compile.postcss = has('postcss', style)
      ? (style.postcss === 'prod' || style.postcss === 'production')
      : false;

    if (has('sass', style)) for (const sass in style.sass) compile.sass[sass] = style.sass[sass];

    let rename: string;
    let watch: string[];

    if (has('rename', style)) {

      if (isObject(style.rename)) {

        const base = basename(style.input);
        const sep = has('separator', style.rename) ? style.rename.separator : '-';

        if (has('prefixDir', style.rename) && style.rename.prefixDir === true) {

          style.rename = lastPath(parent) + sep + base;

        } else if (has('prefix', style.rename)) {

          style.rename = lastPath(parent) + sep + base;

        }

      }

      if (isString(style.rename)) {

        if (!/[a-zA-Z0-9_.-]+/.test(style.rename)) {
          log.throw('Invalid rename config defined on stylesheet: ' + style.rename);
        }

        if (!style.rename.endsWith('.css')) {
          if (style.rename.endsWith('.scss')) {
            rename = style.rename.replace('.scss', '.css');
          } else if (style.rename.endsWith('.sass') || style.input.endsWith('.sass')) {
            rename = style.rename.replace('.sass', '.css');
          } else {
            rename = style.rename + '.css';
          }
        } else {
          rename = style.rename;
        }
      }

    } else {

      const name = basename(style.input);

      if (name.endsWith('.scss')) {
        rename = name.replace('.scss', '.css');
      } else if (name.endsWith('.sass')) {
        rename = name.replace('.sass', '.css');
      } else if (!name.endsWith('.css')) {
        rename = name + '.css';
      } else {
        rename = name;
      }
    }

    if (config.mode.watch && has('watch', style)) {

      if (isArray(style.watch)) {

        watch = style.watch.map(path);
        watch.push(compile.input);
        compile.watch = anymatch(watch);
        config.watch.push(...watch);

      } else {

        log.throw('You must use an array type for "watch" path style directories');

      }

    } else {

      watch = [ compile.input ];
      compile.watch = anymatch(watch);
      config.watch.push(compile.input);

    }

    if (has('include', style)) {

      if (isArray(style.include)) {
        compile.include = style.include.map(include => join(config.cwd, include));
      } else {
        log.throw('You must use an array type for "include" paths');
      }

    } else {
      compile.include = [];
    }

    compile.include.unshift(config.cwd, parent);

    if (has('snippet', style) && style.snippet === true) {

      compile.snippet = true;
      compile.output = join('snippets', rename + '.liquid');

    } else {

      compile.snippet = false;
      compile.output = join('assets', rename);
      config.watch.push('!' + join(config.output, compile.output));

    }

    config.transform.styles.push(compile);

  }

  return getIcons(config, transform);

}

/**
 * SVG Icon Transforms
 *
 * Build the icons configuration for generating
 * SVG sprites and snippets.
 */
async function getIcons (config: PartialDeep<IConfig>, transform: IOptions['transform']) {

  // Find postcss configuration files
  config.transform.icons.svgo = await getConfigs(config as IConfig, [
    'svgo.config.js',
    'svgo.config.cjs',
    'svgo.config.mjs'
  ]);

  if (isUndefined(transform) || !has('icons', transform)) return config;

  const path = normalPath(config.source);

  if (has('snippets', transform.icons)) {
    if (isArray(transform.icons.snippets)) {
      config.transform.icons.snippets = transform.icons.snippets.map(path);
    } else {
      throw new Error('Icon snippet paths must use an array type');
    }
  }

  if (!has('sprites', transform.icons)) return config;
  if (!isArray(transform.icons.sprites)) throw new Error('Icon sprites must use an array type');

  for (const v of transform.icons.sprites) {

    const sprite: IIcons['sprites'][number] = {
      input: [],
      output: null,
      options: {
        dimensionAttributes: true,
        namespaceClassnames: false,
        namespaceIDS: false,
        rootAttributes: {}
      }
    };

    if (!has('output', v)) {
      throw new Error('Missing sprite output name');
    }

    if (!/[a-zA-Z0-9_.-]+/.test(v.output)) {
      throw new Error('Invalid output name defined on sprite: ' + v.output);
    }

    if (has('options', v)) assign(sprite.options, v.options);

    sprite.input = v.input.map(path);

    // handle renamed files
    if (!v.output.endsWith('.liquid')) sprite.output = v.output + '.liquid';

    config.transform.icons.sprites.push(sprite);

  }

  return config;

}

/* -------------------------------------------- */
/* UTILITIES                                    */
/* -------------------------------------------- */

/*
async function getRedirects (config: PartialDeep<IConfig>, options: IOptions) {

  const cachePath = join(config.cache, 'redirects.json');
  const path = await getConfigs(config as IConfig, [
    'redirects.yaml',
    'redirects.yml'
  ]);

  const cache = pathExistsSync(cachePath)
    ? await readJson(cachePath, {
      encoding: 'utf-8',
      throws: true
    }) : {};

  const yaml = await readFile(path);
  const file = YAML.parse(yaml.toString());

  /* redirects.queue.add(() => mapFastAsync(store => {

    return redirects.list(store as IStore, cache, file);

  }, config.sync.stores)); */

// return file;

// }
