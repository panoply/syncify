import { PartialDeep } from 'type-fest';
import { IConfig, IIcons, IModes, IPackage, IStyle } from 'types';
import glob from 'glob';
import { has, hasPath, isNil } from 'rambdax';
import { join, basename, extname } from 'path';
import { assign, is, isArray, isObject, isRegex, isString, isUndefined } from 'shared/native';
import { getConfigs, getModules, lastPath, normalPath, parentPath } from 'shared/helpers';
import * as style from 'transform/styles';
import anymatch from 'anymatch';
import { mkdir, pathExists, readdir } from 'fs-extra';
import { log } from 'cli/console';
import { cancel, dirEmpty } from 'cli/logs';

/* -------------------------------------------- */
/* PRIVATES                                     */
/* -------------------------------------------- */

/**
 * Create Dirs
 *
 * Generates output directories if they are non existent
 * within the workspace. Returns an enum value which infers
 * the status of the output directory:
 *
 * - `0` Directory is valid
 * - `1` Directory was created
 * - `2` Directory is empty
 * - `3` Directory is assets and empty
 */
export const directories = (mode: IModes, output: string) => async (path: string) => {

  let state: number = 0;

  if (path === 'templates/customers') {

    const uri = join(output, 'templates');
    const has = await pathExists(uri);

    if (!has) {
      try {
        await mkdir(uri);
        state = 1;
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
      state = 1;
    } catch (e) {
      log.throw('Failed to create output directory "' + uri + '"');
    }
  } else {

    if (mode.upload) {

      const empty = await readdir(uri);

      if (path === 'templates') {
        if (is(empty.length, 1) && empty[0] === 'customers') empty.shift();
      }

      if (is(empty.length, 0)) {
        state = path === 'assets' ? 3 : 2;
        dirEmpty(uri);
      }

    }
  }

  return state;

};

/* -------------------------------------------- */
/* EXPORTED METHODS                             */
/* -------------------------------------------- */

/**
 * Get Paths
 *
 * Utility function for normalizing the paths configuration.
 * This will fix and resolve custom paths. If a user
 * defines the build directory input in directory paths
 * it will ensure it is formed correctly.
 */
export async function paths (this: IPackage, config: PartialDeep<IConfig>) {

  // Path normalize,
  // When mode is upload we reference output directory
  const path = normalPath(config.mode.upload ? config.output : config.source);
  const dirs = directories(config.mode as IModes, config.output);

  let valid: number = 8;

  // iterate over the define path mappings
  for (const key in config.paths) {

    let uri: string[];

    if (key === 'metafields') {

      // Skip metafields in build mode, we are constructing
      // the imposed theme and this directory is not part of it
      if (config.mode.build) {

        uri = [];

      } else {
        if (hasPath('metafields.input', this.syncify)) {
          uri = [ join(path(this.syncify.metafields.input), '**/*.json') ];
        } else {
          uri = [ join(path('metafields'), '**/*.json') ];
        }
      }

      // Special handling for customers path
    } else if (key === 'customers') {

      // customers directory lives with the templates directory
      const dir = await dirs('templates/customers');

      if (is(dir, 0)) valid--;

      uri = has(key, this.syncify.paths)
        ? isArray(this.syncify.paths[key])
          ? this.syncify.paths[key].map(path)
          : [ path(this.syncify.paths[key]) ]
        : [ path('templates/customers') ];

    } else if (has(key, this.syncify.paths)) {

      const dir = await dirs(key);

      if (is(dir, 0) || is(dir, 3)) valid--;

      uri = isArray(this.syncify.paths[key])
        ? this.syncify.paths[key].map(path)
        : [ path(this.syncify.paths[key]) ];

    } else {

      uri = [ path(key) ];

    }

    if (key === 'assets') {

      const assets = join(config.output, 'assets/**');

      if (isArray(uri)) {
        uri.push(assets);
      } else {
        uri = [ assets ];
      }
    }

    if (!isUndefined(uri)) {

      config.watch.push(...uri);
      config.paths[key] = anymatch(uri);

    }

  }

  if (config.mode.upload) {
    if (!is(valid, 0)) {
      cancel('Output directories empty, no files can be uploaded');
      process.exit();
    }
  }

  return views.call(this, config);

}

/**
 * Get Views
 *
 * Returns path locations of config files like
 * postcss.config.js and svgo.config.js.
 */
export function views (this: IPackage, config: PartialDeep<IConfig>) {

  if (isUndefined(this.syncify.transform) || !has('views', this.syncify.transform)) {
    return minifier.call(this, config);
  }

  const { transform } = this.syncify;

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

  return minifier.call(this, config);

}

/**
 * Minification Options
 *
 * Apply minification options for views. This will write
 * logic for both liquid and HTML terser minifier options.
 */
export function minifier (this: IPackage, config: PartialDeep<IConfig>) {

  if (!hasPath('transform.views.minify', this.syncify)) return json.call(this, config);

  if (has('ignoreCustomFragments', this.syncify.transform.views.minify)) {

    const { ignoreCustomFragments } = this.syncify.transform.views.minify;

    if (isArray(ignoreCustomFragments)) {
      const tags = ignoreCustomFragments.map((v: any) => isRegex(v) ? v : new RegExp(v));
      config.transform.views.minify.terser.ignoreCustomFragments.push(...tags);
    } else {

      log.throw('The "ignoredLiquidTags" option must be an array type');
    }

  }

  if (has('ignoredLiquidTags', this.syncify.transform.views.minify)) {

    const { ignoredLiquidTags } = this.syncify.transform.views.minify;

    if (isArray(ignoredLiquidTags)) {
      const tags = new RegExp(`{%-?\\s*(?:(?!${ignoredLiquidTags.join('|')})[\\s\\S])*?%}`);
      config.transform.views.minify.terser.ignoreCustomFragments.push(tags);
    } else {
      log.throw('The "ignoredLiquidTags" option must be an array type');
    }

  }

  return json.call(this, config);

}

/**
 * JSON
 *
 * Applied defaults for JSON configuration
 */
export function json (this: IPackage, config: PartialDeep<IConfig>) {

  if (isUndefined(this.syncify.transform) || !has('json', this.syncify.transform)) {
    return styles.call(this, config);
  }

  const { transform } = this.syncify;

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

  return styles.call(this, config);
};

/**
 * Styles
 *
 * Applies defaults to stylesheets defined in config,
 * parses the `postcss.config.js` configuration file and
 * normalizes the configuration object.
 */
export async function styles (this: IPackage, config: PartialDeep<IConfig>) {

  // Find postcss configuration files
  const postcssconfig = await getConfigs(config as IConfig, [
    'postcss.config.js',
    'postcss.config.cjs',
    'postcss.config.mjs'
  ]);

  // Ensure postcss config exists
  if (!isNil(postcssconfig)) {

    // Set the postcss processor
    if (getModules(this, 'postcss')) {
      style.processer(postcssconfig);
    } else {
      log.throw('Missing "postcss" dependency');
    }
  }

  const { transform } = this.syncify;

  // Ensure options have been passed in package
  if (isUndefined(transform) || !has('styles', transform)) {
    return icons.call(this, config);
  }

  // Throw when styles config is not an array type
  if (!isArray(transform.styles)) {
    log.throw('Invalid transform configuration, the option "styles" must be an array type');
  }

  // Path normalizer
  const path = normalPath(config.source);

  // Process defined stylesheet inputs
  const list = transform.styles.flatMap((style) => {

    // Flatten and glob array type inputs
    return isArray(style.input)
      ? style.input.flatMap(input => glob.sync(path(input)).map(input => ({ ...style, input })))
      : glob.sync(path(style.input)).map(input => ({ ...style, input }));

  });

  for (const style of list) {

    // Compile model for each style
    const compile: Partial<IStyle> = {};

    // Get the parent path
    const parent = parentPath(style.input);

    // input path
    compile.input = path(style.input);

    // Get the filename (remember we flattened this earlier)
    const base = basename(compile.input);

    // file input extension
    const ext = extname(base);

    // Cache path (we store source maps here)
    compile.cache = config.cache + '/';

    // Default Dart SASS options
    compile.sass = {
      sourcemap: true,
      style: 'compressed',
      warnings: true
    };

    // Options passed to PostCSS
    // TODO: Improve this and allow additional options to be passed
    compile.postcss = has('postcss', style)
      ? (style.postcss === 'prod' || style.postcss === 'production')
      : false;

    // If sass options were provided in package config, lets apply
    if (has('sass', style)) {

      // Warn if input is not using sass or scss extension
      if (!/\.(sass|scss)/.test(ext)) {
        console.warn(`Input "${compile.input}" is not a sass file. Consider processing it with PostCSS`);
      }

      // iterate of user defined options and assign to defaults
      for (const sass in style.sass) compile.sass[sass] = style.sass[sass];

    }

    // Rename file
    let rename: string;

    // Define files to watch
    let watch: string[];

    // Package options has rename value
    if (has('rename', style)) {

      // If rename option is an object the input type was an array
      // and for every stylesheet in the input we will apply the
      // rename configurations.
      if (isObject(style.rename)) {

        // rename object has a separator value
        const sep = has('separator', style.rename) ? style.rename.separator : '-';

        // rename object should prefix file name with the parent directory name
        if (has('prefixDir', style.rename) && style.rename.prefixDir === true) {

          style.rename = lastPath(parent) + sep + base;

        } else if (has('prefix', style.rename)) {

          style.rename = style.rename.prefix + sep + base;

        }

      }

      // Ensure the rename value is a string, if rename was an
      // object we augmented the value already, this is just an addition
      // checksum before applying the final name to be used.
      if (isString(style.rename)) {

        // Validate the file new name.
        if (!/[a-zA-Z0-9_.-]+/.test(style.rename)) {
          log.throw('Invalid rename config defined on stylesheet: ' + style.rename);
        }

        // We are dealing with a .scss or .sass file
        if (style.rename.endsWith('.css')) {

          // Rename is using valid .css extension
          rename = style.rename;

        } else {

          // rename is using a non .css extension
          if (style.rename.endsWith('.scss')) {
            rename = style.rename.replace('.scss', '.css');
          } else if (style.rename.endsWith('.sass')) {
            rename = style.rename.replace('.sass', '.css');
          } else {
            rename = style.rename + '.css';
          }
        }
      }

    } else {

      if (base.endsWith('.scss')) {
        rename = base.replace('.scss', '.css');
      } else if (base.endsWith('.sass')) {
        rename = base.replace('.sass', '.css');
      } else if (!base.endsWith('.css')) {
        rename = base + '.css';
      } else {
        rename = base;
      }
    }

    // Apply watch options
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

    // Apply includes (for Dart SASS)
    if (has('include', style)) {

      if (isArray(style.include)) {
        compile.include = style.include.map(include => join(config.cwd, include));
      } else {
        log.throw('You must use an array type for "include" paths');
      }

    } else {
      compile.include = [];
    }

    // Include the CWD and parent directory
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

  return icons.call(this, config);

};

/**
 * SVG Icon Transforms
 *
 * Build the icons configuration for generating
 * SVG sprites and snippets.
 */
export async function icons (this: IPackage, config: PartialDeep<IConfig>) {

  // Find postcss configuration files
  config.transform.icons.svgo = await getConfigs(config as IConfig, [
    'svgo.config.js',
    'svgo.config.cjs',
    'svgo.config.mjs'
  ]);

  const { transform } = this.syncify;

  // Ensure options have been passed in package
  if (isUndefined(transform) || !has('styles', transform)) return config;

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
