/* eslint-disable new-cap */
import { resolve, join, basename } from 'path';
import { PartialDeep } from 'type-fest';
// import YAML from 'yamljs';
import { readJson, pathExistsSync, pathExists, mkdir } from 'fs-extra';
import dotenv from 'dotenv';
import { has, hasPath, isNil } from 'rambdax';
import anymatch from 'anymatch';
import { assign, is, isArray, isObject, isRegex, isString, isUndefined, keys } from 'utils/native';
import { lastPath, normalPath, toUpcase } from 'utils/helpers';
import { IOptions, ICLIOptions, IConfig, IStyles, IIcons, IPackage } from 'types';
import { log, create } from 'cli/console';
import * as style from 'transform/styles';
import { glob } from 'glob';

/**
 * Read Configuration
 *
 * Acquires the necessary configurations
 * from the workspace. Parses the `package.json`
 * file and the `.env` file, returning the
 * credentials of store connection data.
 */
export async function readConfig (options: ICLIOptions) {

  if (!options.cli) return options as any as IConfig;

  return command(options) as unknown as IConfig;

}

/**
 * Parse Command
 *
 * Determines what commands were passed via the
 * CLI and constructs a workable configuration.
 */
function command (options: ICLIOptions) {

  if (is(options._.length, 0)) {
    options.resource = 'interactive';
    return getPackage(options);
  } else if (is(options._.length, 1)) {
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

/**
 * Set Global Configuration
 *
 * Applies node specific environment globals
 * for the current syncify instance.
 */
function setGlobals ({ env, mode, resource, spawns }: PartialDeep<IConfig>) {

  // env variables
  process.env.SYNCIFY_ENV = env;
  process.env.SYNCIFY_MODE = mode;
  process.env.SYNCIFY_RESOURCE = resource;

  // blessed initializes
  create(
    {
      group: 'Assets',
      tabs: [
        'throw',
        'scripts',
        'assets',
        'files',
        'metafields',
        'redirects'
      ],
      spawns
    }
  );
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
  const apply = cli.env === 'prod';
  const config: PartialDeep<IConfig> = {
    cwd: cli.cwd,
    env: cli.env ? 'dev' : 'prod',
    mode: cli.cli ? 'cli' : 'api',
    resource: cli.resource,
    spawns: pkg.syncify.spawn[cli.resource],
    cache: join(cache, 'syncify'),
    node_modules: join(cli.cwd, 'node_modules'),
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
        allowComments: false,
        minify: {
          apply,
          exclude: null,
          removeSchemaRefs: true
        }
      },
      styles: {
        postcss: null,
        compile: []
      },
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

  setGlobals(config);

  if (!pathExistsSync(cache)) {
    try {
      await mkdir(cache);
    } catch (e) {
      log.throw('Failed to create a ".cache" file.');
    }
  }

  if (!pathExistsSync(config.cache)) {
    try {
      await mkdir(config.cache);
    } catch (e) {
      log.throw('Failed to create a ".cache" file.');
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
 * Resolve Stores
 *
 * Resolves Shopify stores and themes from the `package.json`
 * file and the `.env` file locations relative to the current
 * working directory.
 */
function getStores (config: PartialDeep<IConfig>, cli: ICLIOptions, pkg: IPackage) {

  const file = dotenv.config({ path: join(config.cwd, '.env') });
  const { syncify } = pkg;

  for (const field of syncify.stores) {

    // Upcase the store name for logs, eg: sissel > Sissel
    const store = toUpcase(field.domain);

    // The myshopify store domain
    const domain = `${store}.myshopify.com`.toLowerCase();

    // Fallback to environment variables if no .env file
    const env = file.error ? process.env : file.parsed;

    // Get authorization url for the store
    const base = getURL(field.domain, env);

    // Whether or not to queue this request
    const queue = cli.resource !== 'interactive';

    // Set store endpoints
    config.sync.stores.push(
      {
        store,
        domain,
        queue,
        url: {
          themes: `${base}/admin/themes.json`,
          redirects: `${base}/admin/redirects.json`,
          metafields: `${base}/admin/metafields.json`,
          pages: `${base}/admin/pages.json`
        }
      }
    );

    if (queue) {
      if (!cli.store.includes(field.domain)) {
        log.throw(`Unknown store "${field.domain}" domain was provided`);
      }
    }

    const themes = has('theme', syncify)
      ? cli.theme
      : has(field.domain, syncify)
        ? syncify[field.domain].split(',')
        : keys(field.themes);

    for (const target of themes) {

      if (!has(target, field.themes)) {
        log.throw(`Missing theme target "${target}" in ${field.domain} store.`);
      }

      config.sync.themes.push({
        target,
        store,
        domain,
        queue,
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

  const path = normalPath(config.source);
  const { syncify } = pkg;

  for (const key in config.paths) {

    let uri: any;

    if (key === 'metafields') {
      uri = [ join(path(syncify.dirs.metafields), '**/*.json') ];
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
      const glob = join(config.output, 'assets/*');
      if (isArray(uri)) uri.push(glob); else uri = [ uri, glob ];
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

  const styles = transform.styles.reduce((acc, v, i) => {

    if (isArray(v.input)) {
      acc.push(
        ...v.input.flatMap(input => {
          return /\*\.s?css/.test(input)
            ? glob.sync(path(input)).map(input => ({ ...v, input }))
            : { ...v, input };
        })
      );
    } else if (/\*\.s?css/.test(v.input)) {
      acc.push(...glob.sync(path(v.input)).map(input => ({ input })));
    } else {
      acc.push(v);
    }
    return acc;

  }, []);

  for (const v of styles) {

    const compile: Partial<IStyles['compile'][number]> = {
      input: path(v.input),
      node_modules: config.node_modules + '/'
    };

    let rename: string;

    if (has('rename', v)) {

      if (isObject(v.rename)) {

        const base = basename(v.input);
        const sep = has('separator', v.rename) ? v.rename.separator : '-';
        const parent = lastPath(v.input.replace(base, '')).replace('/', '');

        if (has('prefixDir', v.rename) && v.rename.prefixDir === true) {

          v.rename = v.input.replace(base, parent + sep + base);

        } else {
          if (has('prefix', v.rename)) {
            v.rename = v.input.replace(base, parent + sep + base);
          }
        }

      }

      if (isString(v.rename)) {

        if (!/[a-zA-Z0-9_.-]+/.test(v.rename)) {
          log.throw('Invalid rename config defined on stylesheet: ' + v.rename);
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
    let watch: string[];

    if (has('watch', v)) {
      if (isArray(v.watch)) {

        watch = v.watch.map(path);

        watch.push(compile.input);

        compile.watch = anymatch([ ...watch ]);
        config.watch.push(...watch);

      } else {
        log.throw('You must use an array type for "watch" path style directories');
      }

    } else {

      watch = [ compile.input ];
      compile.watch = anymatch(watch);
      config.watch.push(compile.input);

    }

    if (has('include', v)) {
      if (isArray(v.include)) {
        compile.include = v.include.map(include => join(config.cwd, include));
      } else {
        log.throw('You must use an array type for "include" paths');
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

    config.transform.styles.compile.push(compile as IStyles['compile'][number]);

  }

  // console.log(config.transform.styles.compile);

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

/**
 * Store Authorization URL
 *
 * Generate the the authorization URL to
 * be used for requests.
 */
function getURL (domain: string, env: object): false | string {

  const api_key = domain + '_api_key';
  const password = domain + '_password';

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
  if (is(file.length, 0)) return null;

  return getConfigs(config, files);

}

/**
 * Get Required modules
 *
 * Ensures that peer dependencies exists for
 * the transform processors.
 */
function getModules (pkg: IPackage, name: string) {

  if (has('devDependencies', pkg)) {
    if (has(name, pkg.devDependencies)) return true;
  }

  if (has('peerDependencies', pkg)) {
    if (has(name, pkg.peerDependencies)) return true;
  }

  if (has('dependencies', pkg)) {
    if (has(name, pkg.dependencies)) {
      log.warn('Module ' + name + ' should not be a dependency');
      return true;
    }
  }

  return false;

}

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
