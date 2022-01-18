import { resolve, join, basename } from 'path';
import { PartialDeep } from 'type-fest';
import { readJson, pathExistsSync, pathExists } from 'fs-extra';
import dotenv from 'dotenv';
import { has, hasPath, isType } from 'rambdax';
import { matcher } from 'micromatch';
import { IOptions, ICLIOptions, IConfig, IStyles, IViews, IIcons, IJson } from 'types';
import { assign, isArray, toUpcase, keys } from 'config/utils';
import * as log from 'cli/panes';
import * as bless from 'cli/blessed';

/**
 * Read Configuration
 *
 * Acquires the necessary configurations
 * from the workspace. Parses the `package.json`
 * file and the `.env` file, returning the
 * credentials of store connection data.
 */
export async function readConfig (options: ICLIOptions): Promise<IConfig> {

  try {

    if (!options.cli) return options as IConfig;

    return parseCommand(options);

  } catch (e) {

    bless.screen.destroy();
    log.problem.errors(e);

  }

}

/**
 * Parse Command
 *
 * Determines what commands were passed via the
 * CLI and constructs a workable configuration.
 */
function parseCommand (options: ICLIOptions) {

  if (options._.length === 0) {
    options.resource = 'interactive';
    return resolvePackage(options);
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

  return resolvePackage(options);

}

/**
 * Resolve Paths
 *
 * Resolves `package.json` file and the `.env`
 * file locations relative to the current working
 * directory.
 */
function resolvePackage (options: ICLIOptions) {

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
function normalizePath (cwd: string, input: string) {

  const base = input.slice(input.lastIndexOf('/') + 1);
  const regex = new RegExp(`^\\.?\\/?${base}\\/`);

  return {
    base,
    join: (path: string) => {

      if (regex.test(path)) return path;

      const char = path.charCodeAt(0);

      return join(base, (char === 46 || char === 47) ? path.slice(1) : path);
    }

  };
}

/**
 * Set Base defaults
 *
 * Utility function for normalizing dirs paths configuration.
 * This resolve the directory paths, and attempt to correct them
 * if they are misconfigured.
 */
function setDefaults (cwd: string, options: IOptions) {

  const initial: PartialDeep<IConfig> = {
    config: cwd,
    input: join(cwd, 'source'),
    export: join(cwd, 'export'),
    import: join(cwd, 'import'),
    output: join(cwd, 'theme'),
    transform: {}
  };

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
        path = path.slice(2);
      }
    }

    // path directory starts with / character
    if (path.charCodeAt(0) === 47) path = path.slice(1);

    // path directory is valid, eg: path
    // dirs cannot reference sub directorys, eg: path/sub
    if (/^[a-zA-Z0-9_-]+/.test(path)) {
      initial[k] = join(cwd, options.dirs[k]);
    } else {
      throw new Error('Directory paths is invalid at: ' + path);
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
function getPaths (cwd: string, input: string, options: IOptions) {

  const paths: IConfig['paths'] = {
    assets: [],
    config: [],
    customers: [],
    locales: [],
    sections: [],
    snippets: [],
    templates: []
  };

  const path = normalizePath(cwd, input);

  for (const k in paths) {
    if (has(k, options.paths)) {

      paths[k] = matcher(options.paths[k].map(path), {
        cwd,
        nobrace: true
      });

    } else {

      if (k === 'customers') {
        paths[k].push(join(path.base, 'templates', k));
      } else {
        paths[k].push(join(path.base, k));
      }

      paths[k] = matcher(paths[k], {
        cwd,
        nobrace: true
      });
    }
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
    themes: []
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
async function getConfigs (cwd: string, files: string[]) {

  const file = files.shift();
  const path = join(cwd, file);
  const exists = await pathExists(path);

  if (exists) return path;
  if (file.length === 0) return null;

  return getConfigs(cwd, files);

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
        trimCustomFragments: true,
        ignoreCustomFragments: []
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

  const state = {
    postcss: null,
    compile: []
  };

  // Find postcss configuration files
  state.postcss = await getConfigs(config.config, [
    'postcss.config.js',
    'postcss.config.cjs',
    'postcss.config.mjs'
  ]);

  if (isType('Undefined', transform) || !has('styles', transform)) return state;

  if (!isArray(transform.styles)) {
    throw new Error('Invalid transform config, the option "styles" must be an array');
  }

  const path = normalizePath(config.cwd, config.input);

  for (const v of transform.styles) {

    const compile: Partial<IStyles['compile'][number]> = {
      input: path.join(v.input)
    };

    if (has('rename', v)) {

      if (!/[a-zA-Z0-9_.-]+/.test(v.rename)) {
        throw new Error('Invalid rename config defined on stylesheet: ' + v.rename);
      }

      // handle renamed files
      if (!v.rename.endsWith('.css')) {
        if (v.rename.endsWith('.scss')) {
          compile.rename = v.rename.replace('.scss', '.css');
        } else if (v.rename.endsWith('.sass') || v.input.endsWith('.sass')) {
          compile.rename = v.rename.replace('.sass', '.css');
        } else {
          compile.rename = v.rename + '.css';
        }
      } else {
        compile.rename = v.rename;
      }

    } else {

      const name = basename(v.input);

      if (name.endsWith('.scss')) {
        compile.rename = name.replace('.scss', '.css');
      } else if (name.endsWith('.sass')) {
        compile.rename = name.replace('.sass', '.css');
      } else if (!name.endsWith('.css')) {
        compile.rename = name + '.css';
      } else {
        compile.rename = name;
      }
    }

    if (has('watch', v)) {
      if (!isArray(v.watch)) {
        throw new Error('You must use an array type for "watch" path style directories');
      } else {
        compile.watch = v.watch.map(path.join);
      }
    } else {
      compile.watch = [ path.join(v.input) ];
    }

    compile.include = has('include', v)
      ? v.include.map(include => join(config.cwd, include))
      : [ 'node_modules' ];

    if (has('snippet', v) && v.snippet === true) {
      compile.rename = compile.rename + '.liquid';
      compile.snippet = true;
    } else {
      compile.snippet = false;
    }

    state.compile.push(compile);

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
  state.svgo = await getConfigs(config.config, [
    'svgo.config.js',
    'svgo.config.cjs',
    'svgo.config.mjs'
  ]);

  if (isType('Undefined', transform) || !has('icons', transform)) return state;

  const path = normalizePath(config.cwd, config.input);

  if (has('snippets', transform.icons)) {

    if (!isArray(transform.icons.snippets)) {
      throw new Error('Icon snippet paths must use an array type');
    }

    state.snippets = transform.icons.snippets.map(path.join);

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

    sprite.input = v.input.map(path.join);

    // handle renamed files
    if (!v.output.endsWith('.liquid')) {
      sprite.output = v.output + '.liquid';
    }

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

      const path = normalizePath(config.cwd, config.input);

      state.minify.exclude = state.minify.exclude.map(path.join);

    }

    if (has('removeSchemaRefs', transform.json.minify)) {
      state.minify.removeSchemaRefs = transform.json.minify.removeSchemaRefs;
    }

  }

  return state;
}

/**
 * Resolve Paths
 *
 * Resolves `package.json` file and the `.env`
 * file locations relative to the current working
 * directory
 */
async function storeConfig (options: ICLIOptions, pkg: IOptions) {

  const config = setDefaults(options.cwd, pkg);

  // basic config
  config.spawns = pkg.spawn[options.resource];
  config.cwd = options.cwd;
  config.env = options.env as IConfig['env'] ? 'dev' : 'prod';
  config.mode = options.cli ? 'cli' : 'api';
  config.terminal = options.terminal;
  config.resource = options.resource;
  config.sync = getStores(options, pkg);
  config.paths = getPaths(options.cwd, config.input, pkg);

  // transform config
  config.transform.views = getViews(config, pkg.transform);
  config.transform.json = getJson(config, pkg.transform);
  config.transform.styles = await getStyles(config, pkg.transform);
  config.transform.icons = await getIcons(config, pkg.transform);

  // env variables
  process.env.SYNCIFY_ENV = config.env;
  process.env.SYNCIFY_MODE = config.mode;
  process.env.SYNCIFY_RESOURCE = config.resource;

  // blessed initializes
  log.status.render(config as IConfig);
  log.spawned.render(pkg.spawn[config.resource]);

  // render blessed
  bless.render(log.spawned);

  // forward console
  console.log = log.problem.console;
  console.info = log.problem.console;
  console.error = log.problem.errors;

  return config as IConfig;
}
