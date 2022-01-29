/* eslint-disable new-cap */
import { resolve, join, basename } from 'path';
import { PartialDeep } from 'type-fest';
import postcss from 'postcss';
import YAML from 'yamljs';
import { readJson, pathExistsSync, pathExists, mkdir, createFile, readFile } from 'fs-extra';
import dotenv from 'dotenv';
import { has, hasPath, isType, mapFastAsync } from 'rambdax';
import anymatch, { Tester } from 'anymatch';
import { IOptions, ICLIOptions, IConfig, IStyles, IViews, IIcons, IJson, IStore } from 'types';
import { assign, isArray, toUpcase, keys } from 'config/utils';
import * as redirects from 'requests/redirects';
import { log, screen, bless, create, nodes, terminal } from 'cli/blessed';
import { PartialObjectDeep } from 'type-fest/source/partial-deep';

/**
 * Read Configuration
 *
 * Acquires the necessary configurations
 * from the workspace. Parses the `package.json`
 * file and the `.env` file, returning the
 * credentials of store connection data.
 */
export async function readConfig (options: ICLIOptions): Promise<IConfig> {

  if (options.terminal === 'dashboard') bless(3);

  try {

    if (!options.cli) return options as any as IConfig;

    return command(options);

  } catch (e) {

    screen.destroy();
    log.errors(e);

  }

}

/**
 * Parse Command
 *
 * Determines what commands were passed via the
 * CLI and constructs a workable configuration.
 */
function command (options: ICLIOptions) {

  if (options._.length === 0) {
    options.resource = 'interactive';
    return getPackage(options);
  } else if (options._.length === 1) {
    options.resource = options._[0];
  } else if (options._.length > 1) {
    options.resource = options._[0];
    options.store = options._[1];
  }

  if (has('store', options)) {
    options.store = (options.store as string).split(',');
  } else {
    throw new Error('Missing "store" target in command');
  }

  if (options) {
    if (has('theme', options)) {

      options.theme = (options.theme as any).split(',');

      if (options.store.includes('store')) {
        throw new Error('Target name "store" is reserved, use a different name.');
      }

      if (options.store.includes('theme')) {
        throw new Error('Target name, "theme" is reserved, use a different name.');
      }
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

  const pkg: { syncify?: IOptions } = await readJson(options.pkg);

  if (hasPath('syncify.stores', pkg)) {

    if (isType('Array', pkg.syncify.stores)) return storeConfig(options, pkg.syncify);

    if (isType('Undefined', pkg.syncify.stores)) {
      throw new Error('Missing "stores" option in syncify settings');
    } else {
      throw new Error('The "stores" option must be of type array');
    }
  }

  throw new Error('Your package.json file is missing the "syncify" value.');

}

/**
 * Normalize path
 *
 * Resolve CWD to a path definition. Returns a function type
 * who accepts a string. Paths will include the directory
 * `input` folder name.
 */
function normalize (input: string) {

  const regex = new RegExp(`^\\.?\\/?${input}\\/`);

  return (path: string) => {

    let ignore: boolean = false;

    if (path.charCodeAt(0) === 33) {
      ignore = true;
      path = path.slice(1);
    }

    if (regex.test(path)) {
      return ignore ? '!' + path : path;
    }

    if (path.charCodeAt(0) === 46 && path.charCodeAt(1) === 46 && path.charCodeAt(2) === 47) {
      throw new Error('Invalid path at: ' + path + ' - Paths must be relative to source');
    }

    return (ignore ? '!' : '') + join(input, path);

  };
}

/**
 * Set Base defaults
 *
 * Utility function for normalizing dirs paths configuration.
 * This resolve the directory paths, and attempt to correct them
 * if they are misconfigured.
 */
async function defaults (cwd: string, options: IOptions) {

  const cache = join(cwd, 'node_modules/.cache');
  const initial: PartialDeep<IConfig> = {
    config: cwd,
    cache: join(cwd, 'node_modules/.cache/syncify'),
    source: 'source',
    export: 'export',
    import: 'import',
    output: 'theme',
    watch: [],
    transform: {}
  };

  if (!pathExistsSync(cache)) {
    try {
      await mkdir(cache);
    } catch (e) {
      throw new Error('Failed to create a .cache file');
    }
  }

  if (!pathExistsSync(initial.cache)) {
    try {
      await mkdir(initial.cache);
    } catch (e) {
      throw new Error('Failed to create a .cache file');
    }
  }

  if (!has('dirs', options)) return initial;

  for (const k in options.dirs) {

    let path: string = options.dirs[k];

    // path directory starts with . character
    if (path.charCodeAt(0) === 46) {

      // path directory next character is not forard slash
      // for example, ".folder" this will be invalid
      if (path.charCodeAt(1) !== 47) {
        throw new Error('Directory path is invalid at: ' + path);
      } else {
        path = path.slice(1);
      }
    }

    // path directory starts with / character
    if (path.charCodeAt(0) === 47) path = path.slice(1);

    // path directory is valid, eg: path
    // dirs cannot reference sub directorys, eg: path/sub
    if (/^[a-zA-Z0-9_-]+/.test(path)) {
      initial[k] = options.dirs[k];
    } else {
      throw new Error('Directory path is invalid at: ' + path);
    }
  }

  return initial;

}

/**
 * Get Paths
 *
 * Utility function for normalizing the paths configuration.
 * This will fix and resolve custom paths. If a user
 * defines the build directory input in directory paths
 * it will ensure it is formed correctly.
 */
function getPaths (config: PartialObjectDeep<IConfig>, options: IOptions) {

  const paths: IConfig['paths'] = {
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

  const path = normalize(config.source);

  for (const k in paths) {

    let uri: any;

    if (k === 'metafields') {

      uri = [ join(path(options.dirs.metafields), '**/*.json') ];

    } else if (has(k, options.paths)) {

      uri = isArray(options.paths[k])
        ? options.paths[k].map(path)
        : [ path(options.paths[k]) ];

    } else {

      uri = [ k === 'customers' ? path('templates/' + k) : path(k) ];

    }

    if (k === 'assets') {

      if (isArray(uri)) {
        uri.push(join(config.output, 'assets/*'));
      } else {
        uri = [ uri, join(config.output, 'assets/*') ];
      }
    }

    config.watch.push(...uri);

    paths[k] = anymatch(uri);

  }

  return paths;

}

/**
 * Store Authorization URL
 *
 * Generate the the authorization URL to
 * be used for requests.
 */
function getURL (domain: string, env: object): false | string {

  const api_key = `${domain}_api_key`;
  const password = `${domain}_password`;

  if (has(api_key, env) || has(api_key.toUpperCase(), env)) {
    if (has(password, env) || has(password.toUpperCase(), env)) {
      return `https://${env[api_key]}:${env[password]}@${domain}.myshopify.com`;
    } else {
      throw new Error(`Missing "${password}" credential for store "${domain}"`);
    }
  } else {
    throw new Error(`Missing "${api_key}" credential for store "${domain}"`);
  }
}

/**
 * Resolve Stores
 *
 * Resolves Shopify stores and themes from the `package.json`
 * file and the `.env` file locations relative to the current
 * working directory.
 */
function getStores (cli: ICLIOptions, options: IOptions) {

  const file = dotenv.config();
  const state: IConfig['sync'] = {
    stores: [],
    themes: [],
    redirects: []
  };

  for (const v of options.stores) {

    // Upcase the store name for logs, eg: sissel > Sissel
    const store = toUpcase(v.domain);

    // The myshopify store domain
    const domain = `${store}.myshopify.com`.toLowerCase();

    // Fallback to environment variables if no .env file
    const env = file.error ? process.env : file.parsed;

    // Get authorization url for the store
    const base = getURL(v.domain, env);

    // Whether or not to queue this request
    const queue = cli.resource !== 'interactive';

    // Set store endpoints
    state.stores.push(
      {
        store,
        domain,
        queue,
        endpoints: {
          themes: `${base}/admin/themes.json`,
          redirects: `${base}/admin/redirects.json`,
          metafields: `${base}/admin/metafields.json`,
          pages: `${base}/admin/pages.json`
        }
      }
    );

    if (queue) {
      if (!cli.store.includes(v.domain)) {
        throw new Error(`Unknown store "${v.domain}" domain was provided`);
      }
    }

    const themes = has('theme', options)
      ? cli.theme
      : has(v.domain, options)
        ? options[v.domain].split(',')
        : keys(v.themes);

    for (const target of themes) {

      if (!has(target, v.themes)) {
        throw new Error(`Missing theme target "${target}" in ${v.domain} store.`);
      }

      state.themes.push(
        {
          target,
          store,
          domain,
          queue,
          id: v.themes[target],
          url: `${base}/admin/themes/${v.themes[target]}/assets.json`
        }
      );
    }

  }

  if (state.stores.length === 0) {
    throw new Error('Unknown, missing or invalid store/theme targets');
  }

  return state;

}

/**
 * Get Configs
 *
 * Returns path locations of config files like
 * postcss.config.js and svgo.config.js.
 */
async function getConfigs (config: IConfig, files: string[]) {

  const file = files.shift();
  const path = join(config.cwd, config.config, file);
  const exists = await pathExists(path);

  if (exists) return path;
  if (file.length === 0) return null;

  return getConfigs(config, files);

}

/**
 * Get Configs
 *
 * Returns path locations of config files like
 * postcss.config.js and svgo.config.js.
 */
function getViews (
  config: PartialDeep<IConfig>,
  transform: IOptions['transform']
) {

  const state: Partial<IViews> = {
    sections: {
      allowPrefix: false,
      globals: [],
      onlyPrefixDuplicates: false,
      prefixSeparator: '-'
    },
    minify: {
      apply: config.env === 'prod',
      exclude: [],
      liquid: {
        minifySectionSchema: true,
        removeLiquidComments: true,
        ignoredLiquidTags: []
      },
      terser: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        collapseWhitespace: true,
        trimCustomFragments: true
      }
    }
  };

  if (isType('Undefined', transform) || !has('views', transform)) return state;

  if (has('sections', transform.views)) {
    state.sections = assign(state.sections, transform.views.sections);
  }

  if (has('minify', transform.views)) {

    for (const v in transform.views.minify) {

      const minify = transform.views.minify[v];

      if (has(v, state.minify.terser)) {
        state.minify.terser[v] = minify;
        continue;
      }

      if (has(v, state.minify.liquid)) {
        state.minify.liquid[v] = minify;
        continue;
      }

      if (v === 'env') {
        if (minify.env === 'any') state.minify.apply = true;
        else if (minify.env === 'never') state.minify.apply = false;
        else state.minify.apply = minify.env === config.env;
        continue;
      }

      if (v === 'exclude') {
        if (!isArray(minify)) {
          throw new Error('View minification excludes must be array type');
        } else {
          state.minify.exclude = minify;
        }
      }

    }

  }

  state.minify.terser.ignoreCustomFragments = [
    /({%|{{)-?[\s\S]*?-?(}}|%})/g
  ];

  return state;
}

/**
 * Styles
 *
 * Applies defaults to stylesheets defined in config,
 * parses the `postcss.config.js` configuration file and
 * normalizes the configuration object.
 */
async function getStyles (config: PartialDeep<IConfig>, transform: IOptions['transform']) {

  const state: IStyles = {
    postcss: null,
    node_modules: join(config.cwd, 'node_modules') + '/',
    compile: []
  };

  // Find postcss configuration files
  const postcssconfig = await getConfigs(config as IConfig, [
    'postcss.config.js',
    'postcss.config.cjs',
    'postcss.config.mjs'
  ]);

  state.postcss = postcss(require(postcssconfig));

  if (isType('Undefined', transform) || !has('styles', transform)) return state;

  if (!isArray(transform.styles)) {
    throw new Error('Invalid transform config, the option "styles" must be an array');
  }

  const path = normalize(config.source);

  for (const v of transform.styles) {

    const compile: Partial<IStyles['compile'][number]> = {
      input: path(v.input)
    };

    let rename: string;

    if (has('rename', v)) {

      if (!/[a-zA-Z0-9_.-]+/.test(v.rename)) {
        throw new Error('Invalid rename config defined on stylesheet: ' + v.rename);
      }

      // handle renamed files
      if (!v.rename.endsWith('.css')) {
        if (v.rename.endsWith('.scss')) {
          rename = v.rename.replace('.scss', '.css');
        } else if (v.rename.endsWith('.sass') || v.input.endsWith('.sass')) {
          rename = v.rename.replace('.sass', '.css');
        } else {
          rename = v.rename + '.css';
        }
      } else {
        rename = v.rename;
      }

    } else {

      const name = basename(v.input);

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

    if (has('watch', v)) {
      if (isArray(v.watch)) {

        const watch = v.watch.map(path);

        watch.push(compile.input);

        compile.watch = anymatch([ ...watch ]);
        config.watch.push(...watch);

      } else {
        throw new Error('You must use an array type for "watch" path style directories');
      }

    } else {
      compile.watch = anymatch([ compile.input ]);
      config.watch.push(compile.input);
    }

    if (has('include', v)) {
      if (isArray(v.include)) {
        compile.include = v.include.map(include => join(config.cwd, include));
      } else {
        throw new Error('You must use an array type for "include" paths');
      }
    } else {
      compile.include = [];
    }

    compile.include.unshift(
      config.cwd,
      compile.input.replace(basename(v.input), '')
    );

    if (has('snippet', v) && v.snippet === true) {
      compile.output = join('snippets', rename + '.liquid');
      compile.snippet = true;
    } else {
      compile.output = join('assets', rename);
      config.watch.push('!' + join(config.output, compile.output));
      compile.snippet = false;
    }

    state.compile.push(compile as IStyles['compile'][number]);

  }

  return state as IStyles;

}

/**
 * SVG Icon Transforms
 *
 * Build the icons configuration for generating
 * SVG sprites and snippets.
 */
async function getIcons (config: PartialDeep<IConfig>, transform: IOptions['transform']) {

  const state: IIcons = {
    svgo: null,
    snippets: null,
    sprites: []
  };

  // Find postcss configuration files
  state.svgo = await getConfigs(config as IConfig, [
    'svgo.config.js',
    'svgo.config.cjs',
    'svgo.config.mjs'
  ]);

  if (isType('Undefined', transform) || !has('icons', transform)) return state;

  const path = normalize(config.metafields);

  if (has('snippets', transform.icons)) {

    if (!isArray(transform.icons.snippets)) {
      throw new Error('Icon snippet paths must use an array type');
    }

    state.snippets = transform.icons.snippets.map(path);

  }

  if (!has('sprites', transform.icons)) return state;

  if (!isArray(transform.icons.sprites)) {
    throw new Error('Icon sprites must use an array type');
  }

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

    if (has('options', v)) sprite.options = assign(sprite.options, v);

    sprite.input = v.input.map(path);

    // handle renamed files
    if (!v.output.endsWith('.liquid')) sprite.output = v.output + '.liquid';

    state.sprites.push(sprite);

  }

  return state;

}

/**
 * JSON
 *
 * Applied defaults for JSON configuration
 */
function getJson (config: PartialDeep<IConfig>, transform: IOptions['transform']) {

  const state: IJson = {
    allowComments: false,
    minify: {
      apply: config.env === 'prod',
      exclude: null,
      removeSchemaRefs: true
    }
  };

  if (isType('Undefined', transform) || !has('json', transform)) return state;

  if (has('minify', transform.json)) {

    if (has('env', transform.json.minify)) {
      if (transform.json.minify.env === 'any') {
        state.minify.apply = true;
      } else if (transform.json.minify.env === 'never') {
        state.minify.apply = false;
      } else {
        state.minify.apply = transform.json.minify.env === config.env;
      }
    }

    if (has('exclude', transform.json.minify.exclude)) {

      if (!isArray(transform.json.minify.exclude)) {
        throw new Error('JSON excludes must use an array type');
      }

      const path = normalize(config.source);

      state.minify.exclude = state.minify.exclude.map(path);

    }

    if (has('removeSchemaRefs', transform.json.minify)) {
      state.minify.removeSchemaRefs = transform.json.minify.removeSchemaRefs;
    }

  }

  return state;
}

async function getRedirects (config: PartialDeep<IConfig>, options: IOptions) {

  const cachePath = join(config.cache, 'redirects.json');
  const path = await getConfigs(config, [
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

  return file;

}

/**
 * Resolve Paths
 *
 * Resolves `package.json` file and the `.env`
 * file locations relative to the current working
 * directory
 */
async function storeConfig (options: ICLIOptions, pkg: IOptions) {

  const config = await defaults(options.cwd, pkg);

  // basic config
  config.spawns = pkg.spawn[options.resource];

  // blessed initializes
  create(
    {
      group: 'Logs',
      tabs: [ 'errors', 'warnings', 'console' ],
      row: 6,
      col: 5,
      rowSpan: 8,
      colSpan: 9,
      spawns: null
    },
    {
      group: 'Store',
      tabs: [ 'files', 'metafields', 'redirects' ],
      row: 0,
      col: 0,
      rowSpan: 9,
      colSpan: 5,
      spawns: null
    },
    {
      group: 'Assets',
      tabs: [ 'scripts', 'json', 'styles', 'icons' ],
      row: 0,
      col: 5,
      rowSpan: 6,
      colSpan: 9,
      spawns: config.spawns
    }
  );

  config.cwd = options.cwd;
  config.env = options.env as IConfig['env'] ? 'dev' : 'prod';
  config.mode = options.cli ? 'cli' : 'api';
  config.terminal = options.terminal;
  config.resource = options.resource;
  config.sync = getStores(options, pkg);
  config.paths = getPaths(config, pkg);

  // transform config
  config.transform.views = getViews(config, pkg.transform);
  config.transform.json = getJson(config, pkg.transform);
  config.transform.styles = await getStyles(config, pkg.transform);
  config.transform.icons = await getIcons(config, pkg.transform);

  // env variables
  process.env.SYNCIFY_ENV = config.env;
  process.env.SYNCIFY_MODE = config.mode;
  process.env.SYNCIFY_RESOURCE = config.resource;

  // const yaml = await getRedirects(config, pkg);

  if (terminal === 2) {
    screen.render();

    // render blessed
    console.log = log.console;
    console.info = log.console;
    console.error = log.errors;
    console.warn = log.warnings;

  }

  return config as IConfig;
}
