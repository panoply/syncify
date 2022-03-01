import { PartialDeep } from 'type-fest';
import { IConfig, IIcons, IModes, IOptions, IPackage, IStyle } from 'types';
import glob from 'glob';
import anymatch from 'anymatch';
import { has, hasPath, includes, isNil, last } from 'rambdax';
import { join, extname } from 'path';
import { getModules, lastPath, normalPath, parentPath, renameFile } from 'shared/helpers';
import { existsSync, mkdir, pathExistsSync, readdirSync, readJson, writeJson } from 'fs-extra';
import { log } from '../cli/stdout';
import { cancel, dirEmpty } from 'cli/logs';
import { readConfig, ConfigLoaderError } from '@web/config-loader';
import { createVSCodeDir } from 'modes/vsc';
import { typeError, unknownError, invalidError } from './validate';
import * as style from 'transform/styles';
import * as u from '../shared/native';

/* -------------------------------------------- */
/* PRIVATES                                     */
/* -------------------------------------------- */

/**
 * Read Config File
 *
 * Load the syncify config file for node projects.
 * Supports loading config as es module or common js module,
 */
async function readConfigFile (path: string): Promise<any> {

  try {

    return readConfig(path);

  } catch (e) {

    if (e instanceof ConfigLoaderError) console.error(e.message);

    return null;

  }

}

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

    if (!pathExistsSync(uri)) {
      try {
        await mkdir(uri);
        state = 1;
      } catch (e) {
        log.throw('Failed to create output directory "' + uri + '"');
      }
    }

  }

  const uri = join(output, path);

  if (!pathExistsSync(uri)) {
    try {
      await mkdir(uri);
      state = 1;
    } catch (e) {
      log.throw('Failed to create output directory "' + uri + '"');
    }
  } else {

    if (mode.upload) {

      const empty = readdirSync(uri);

      if (path === 'templates') {
        if (u.is(empty.length, 1) && empty[0] === 'customers') empty.shift();
      }

      if (u.is(empty.length, 0)) {
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

export function options (config: PartialDeep<IConfig>, syncify: IOptions) {

  /**
   * SVG Icon Transforms
   *
   * Build the icons configuration for generating
   * SVG sprites and snippets.
   */
  const iconOptions = async () => {

    // Find svgo configuration file
    const svgoconfig = await readConfigFile(join(config.config, 'svgo.config'));

    // Ensure postcss config exists
    if (!isNil(svgoconfig)) {

      // Set the postcss processor
      if (getModules(this, 'svgo')) {
        style.processer(svgoconfig);
      } else {
        throw new Error('Missing "svgo" dependency, you need to install svgo');
      }
    }

    if (!has('icons', this.syncify.transforms)) return terserOptions.call(this, config);

    const { icons } = this.syncify.transforms;

    // Throw when styles config is not an array type
    if (!u.isObject(icons)) unknownError('icons', icons);

    const path = normalPath(lastPath(config.input));

    if (has('inlined', icons)) {
      if (u.isArray(icons.inlined)) {
        for (const inline of icons.inlined) {
          config.transform.icons.inlined.push({
            input: path(inline.input),
            rename: has('rename', inline) ? inline.rename : null,
            snippet: has('snippet', inline) ? inline.snippet : true,
            svgo: !isNil(svgoconfig)
          });
        }
      } else {
        typeError('icons', 'inlined', icons.inlined, '[]');
      }
    }

    if (!has('sprites', icons)) return config;

    const sprites = (u.isObject(icons.sprites)
      ? [ icons.sprites ]
      : icons.sprites) as IIcons['sprites'];

    if (!u.isArray(icons.sprites)) typeError('icons', 'sprites', icons.sprites, '{} | []');

    for (const sprite of sprites) {
      const input = path(sprite.input);
      config.transform.icons.sprites.push({
        input: u.isArray(input) ? input : [ input ],
        rename: has('rename', sprite) ? sprite.rename : null,
        snippet: has('snippet', sprite) ? sprite.snippet : true,
        svgo: !isNil(svgoconfig),
        options: has('options', sprite) ? sprite.options : {}
      });
    }

    if (has('replacer', icons.replacer)) {
      if (u.isBoolean(icons.replacer)) {
        config.transform.icons.replacer = icons.replacer;
      } else {
        typeError('icons', 'replacer', icons.replacer, 'boolean');
      }
    }

    if (has('vscodeCustomData', icons)) {

      if (!u.isBoolean(icons.vscodeCustomData)) {
        typeError('icons', 'vscodeCustomData', icons.vscodeCustomData, 'boolean');
      }

      if (config.transform.icons.replacer && icons.vscodeCustomData) {

        if (!existsSync(config.cache.vscode.uri)) {
          try {
            await mkdir(config.cache.vscode.uri);
          } catch (e) {
            throw new Error(e);
          }
        }

        let name: string = 'icon';

        if (has('replacerTag', icons)) {
          if (u.isString(icons.replacerTag)) {

            const test = /[a-z](?:[a-zA-Z-]+)?/.test(icons.replacerTag);

            if (test && !u.is(last(icons.replacerTag).charCodeAt(0), 45)) {
              name = icons.replacerTag;
            } else {
              invalidError('icons', 'replacerTag', icons.replacerTag, '[a-z] | [a-z]-[a-z]');
            }
          } else {
            typeError('icons', 'replacerTag', icons.replacerTag, 'string');
          }
        }

        const schema = {
          version: 1.1,
          tags: [
            {
              name,
              description: {
                kind: 'markdown',
                value: 'Replacer SVG icon name helper. Replaces all matched tags with the SVG file.'
              },
              attributes: [
                {
                  name: 'name',
                  values: [],
                  description: 'The SVG icon name or id',
                  valueSet: 'is'
                },
                {
                  name: 'from',
                  values: [],
                  description: 'Where to import the icon from',
                  valueSet: 'is'
                }
              ],
              references: [
                {
                  name: 'Syncify Reference',
                  url: 'https://syncify.myshopify.com/pages/icons#vscode-html-data'
                }
              ]
            }
          ]
        };

        await writeJson(config.cache.vscode.maps.icons, schema, { spaces: 0 });

        const file = await createVSCodeDir(config as IConfig);
        const settings = pathExistsSync(file) ? await readJson(file) : {};

        if (!settings['html.customData']) settings['html.customData'] = [];

        if (!includes(config.cache.vscode.maps.icons, settings['html.customData'])) {
          settings['html.customData'].push(config.cache.vscode.maps.icons);
          await writeJson(file, settings, { spaces: config.transform.json.indent });
        }

      }
    }

    return terserOptions.call(this, config);

  };

  /**
   * Style Options
   *
   * Applies defaults to stylesheets defined in config,
   * parses the `postcss.config.js` configuration file and
   * normalizes the configuration object.
   */
  const styleOptions = async () => {

    // Find postcss configuration files
    const postcssconfig = await readConfigFile(join(config.config, 'postcss.config'));

    // Ensure postcss config exists
    if (!isNil(postcssconfig)) {

      // Set the postcss processor
      if (getModules(this, 'postcss')) {
        style.processer(postcssconfig);
      } else {
        log.throw('Missing "postcss" dependency');
      }
    }

    if (!has('styles', this.syncify.transforms)) return iconOptions.call(this, config);

    // Convert to an array if styles is using an object
    // configuration model, else just shortcut the options.
    const styles = u.isObject(this.syncify.transforms.styles)
      ? [ this.syncify.transforms.styles ]
      : this.syncify.transforms.styles;

    // Throw when styles config is not an array type
    if (!u.isArray(styles)) unknownError('styles', styles);

    // Path normalizer
    const path = normalPath(lastPath(config.input));

    // Process defined stylesheet inputs
    // For every stylesheet defined we we create an individual config
    const list = styles.flatMap((style: any) => {
    // Flatten and glob array type inputs
      return u.isArray(style.input)
        ? style.input.flatMap((input: any) => glob.sync(path(input)).map(input => ({ ...style, input })))
        : glob.sync(path(style.input)).map(input => ({ ...style, input }));
    });

    // Lets construct the configurations
    for (const style of list) {

      // Compile model for each style
      const compile: Partial<IStyle> = {};

      // input path
      compile.input = path(style.input);

      // Default Dart SASS options
      compile.sass = {
        sourcemap: true,
        style: 'compressed',
        warnings: true,
        include: []
      };

      // Options passed to PostCSS
      // We will always pass stylesheets to PostCSS when
      // the option is omitted and when the module exists
      if (has('postcss', style)) {
        if (u.isBoolean(style.postcss)) {
          compile.postcss = style.postcss;
        } else {
          typeError('styles', 'postcss', compile.postcss, 'boolean');
        }
      } else {
        compile.postcss = !isNil(postcssconfig);
      }

      // If sass options were provided in package config, lets apply
      if (has('sass', style)) {

        // Warn if input is not using sass or scss extension
        if (!/\.s[ac]ss/.test(extname(compile.input))) {
          log.warning(`Input ${compile.input} is not a sass file. Consider processing it with PostCSS.`);
        }

        // iterate of user defined options and u.assign to defaults
        for (const option in style.sass) {

          // Throw if an undefined property is detected
          // checks against the default model.
          if (!has(option, style.sass)) unknownError('sass', option);

          // Validate the boolean options
          if (option === 'sourcemap' || option === 'warnings') {
            if (u.isBoolean(style.sass[option])) {
              compile.sass[option] = style.sass[option];
              continue;
            } else {
              typeError('sass', option, style.sass[option], 'boolean');
            }
          }

          // validate the sass style
          if (option === 'style') {
            if (u.isString(style.sass[option])) {
              if (/(?:compressed|expanded)/.test(style.sass[option])) {

                compile.sass[option] = style.sass[option];

                // Warn when using expanded
                if (style.sass[option] === 'expanded') {
                  log.warning('Consider using compressed sass style for faster requests');
                }

                continue;

              } else {
                invalidError('sass', option, style.sass[option], 'expanded | compressed');
              }
            } else {
              typeError('sass', option, style.sass[option], 'string');
            }
          }

          // Validate the include paths option
          if (option === 'include') {
            if (u.isArray(style.sass[option])) {
              compile.sass[option] = style.sass[option];
              continue;
            } else {
              typeError('sass', option, style.sass[option], 'string[]');
            }
          }

        }

      }

      // Rename file
      let rename: ReturnType<typeof renameFile>;

      // Define files to watch
      let watch: string[];

      // Package options has rename value
      if (has('rename', style)) {

        // Ensure the rename value is a string
        if (u.isString(style.rename)) {

          rename = renameFile(compile.input, style.rename);

          // Validate the file new name.
          if (!/[a-zA-Z0-9_.-]+/.test(rename.newName)) {
            log.throw('Invalid rename config defined on stylesheet: ' + style.rename);
          }

          // We are dealing with a .css file
          if (rename.newName.endsWith('.css')) {

            // Rename is using valid .css extension
            compile.rename = rename.newName;

          } else {

            // rename is using a non .css extension
            if (rename.newName.endsWith('.scss')) {
              rename.newName = rename.newName.replace('.scss', '.css');
            } else if (rename.newName.endsWith('.sass')) {
              rename.newName = rename.newName.replace('.sass', '.css');
            } else {
              rename.newName = rename.newName + '.css';
            }
          }
        } else {
          typeError('styles', 'rename', style.rename, 'string');
        }

      } else {

        rename = renameFile(compile.input);

      }

      // Apply watch options
      if (config.mode.watch && has('watch', style)) {

        if (u.isArray(style.watch)) {

          watch = style.watch.map(path);
          watch.push(compile.input);
          compile.watch = anymatch(watch);
          config.watch.push(...watch);

        } else {

          typeError('styles', 'watch', style.watch, 'string[]');

        }

      } else {

        watch = [ compile.input ];
        compile.watch = anymatch(watch);
        config.watch.push(compile.input);

      }

      // Apply includes (for Dart SASS)
      if (hasPath('sass.include', style)) {
        compile.sass.include = style.sass.include.map((include: string) => join(config.cwd, include));
      }

      // Include the CWD and parent directory
      compile.sass.include.unshift(config.cwd, join(config.cwd, rename.dir));

      if (has('snippet', style)) {
        if (u.isBoolean(style.snippet)) {
          compile.snippet = style.snippet;
        } else {
          typeError('styles', 'snippet', style.snippet, 'boolean');
        }
      }

      // Based on the snippet condition, we rename the export or not
      if (compile.snippet) {
        compile.rename = rename.newName + '.liquid';
      } else {

        compile.rename = rename.newName;

        // We need to add stylesheets being written to assets
        // as ignored files to prevent repeat uploads.
        config.watch.push('!' + join(lastPath(config.output), rename.newName));
      }

      // Lets populate the style model
      config.transform.styles.push(compile);

    }

    return iconOptions.call(this, config);

  };

  /**
   * JSON Options
   *
   * This is a transform option, we will pass to pages
   * in the next validate check,
   */
  const jsonOptions = () => {

    if (!has('json', this.syncify.transforms)) return styleOptions.call(this, config);

    const { json } = this.syncify.transforms;

    // Ensure the section option is an object
    if (!u.isObject(json)) unknownError('json', json);

    // Iterate over all the properties in sections option
    for (const option in json) {

      // Throw if an undefined property is detected
      // checks against the default model.
      if (!has(option, config.transform.json)) unknownError('json', option);

      // Validate theindent number
      if (option === 'indent') {
        if (u.isNumber(json[option])) {
          config.transform.json[option] = json[option];
          continue;
        } else {
          typeError('json', option, json[option], 'number');
        }
      }

      // Validate the useTabs options, when true we indent with tabs
      if (option === 'useTabs') {
        if (u.isBoolean(json[option])) {
          config.transform.json[option] = json[option];
          continue;
        } else {
          typeError('json', option, json[option], 'boolean');
        }
      }

      // Validate the global globs which should have no prefixes applied.
      if (option === 'exclude') {

        const exclude = u.isString(json[option]) ? [ json[option] ] : json[option];

        if (u.isArray(exclude)) {
          config.transform.json[option] = anymatch(exclude as string[]);
          continue;
        } else {
          typeError('exclude', option, exclude[option], 'string | string[]');
        }
      }

    }

    return styleOptions.call(this, config);

  };

  /**
   * Section Options
   *
   * This is a transform option, we will pass to pages
   * in the next validate check,
   */
  const pageOptions = () => {

    if (has('pages', this.syncify.transforms)) return jsonOptions.call(this, config);

    const { pages } = this.syncify.transforms;

    // Ensure the section option is an object
    if (!u.isObject(pages)) unknownError('pages', pages);

    // Iterate over all the properties in sections option
    for (const option in pages) {

      // Throw if an undefined property is detected
      // checks against the default model.
      if (!has(option, config.transform.pages)) unknownError('pages', option);

      if (option === 'importAs') {
        if (u.isString(pages[option])) {
          if (/(?:markdown|html)/.test(pages[option])) {
            config.transform.pages[option] = pages[option];
            continue;
          } else {
            invalidError('pages', option, pages[option], 'markdown | html');
          }
          continue;
        } else {
          typeError('pages', option, pages[option], 'string');
        }
      }

      if (option === 'fallbackAuthor') {
        if (u.isString(pages[option])) {
          config.transform.pages[option] = pages[option];
          continue;
        } else {
          typeError('pages', option, pages[option], 'string');
        }
      }

      if (option === 'liquidWarnings') {
        if (u.isBoolean(pages[option])) {
          config.transform.pages[option] = pages[option];
          continue;
        } else {
          typeError('pages', option, pages[option], 'boolean');
        }
      }

      if (option === 'markdown') {
        if (u.isObject(pages[option])) {
          u.assign(config.transform.pages[option], pages[option]);
          continue;
        } else {
          typeError('pages', option, pages[option], 'object');
        }
      }
    }

    if (hasPath('markdown.highlight', pages)) {
      if (pages.markdown.highlight === true) {
        config.transform.pages.markdown.highlight = function (code, lang) {
          const hljs = require('highlight.js');
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        };
      }
    }

    return jsonOptions.call(this, config);

  };

  /**
   * Section Options
   *
   * This is a transform option, we will pass to pages
   * in the next validate check,
   */
  const sectionOptions = () => {

    if (!has('sections', this.syncify.transforms)) return pageOptions.call(this, config);

    const { sections } = this.syncify.transforms;

    // Ensure the section option is an object
    if (!u.isObject(sections)) unknownError('sections', sections);

    // Iterate over all the properties in sections option
    for (const option in sections) {

      // Throw if an undefined property is detected
      // checks against the default model.
      if (!has(option, config.transform.sections)) unknownError('sections', option);

      // Validate the boolean type values of the option
      if (option === 'directoryPrefixing' || option === 'onlyPrefixDuplicates') {
        if (u.isBoolean(sections[option])) {
          config.transform.sections[option] = sections[option];
          continue;
        } else {
          typeError('sections', option, sections[option], 'boolean');
        }
      }

      // Validate the prefix separator option, in Shopify sections
      // We cannot use dot prefixes, we ensure only accepts values are defined.
      if (option === 'prefixSeparator') {
        if (u.isString(sections[option])) {

          // Only these character can be prefixers
          if (/[$@:_-]/.test(sections[option])) {
            config.transform.sections[option] = sections[option];
            continue;
          } else {
            invalidError('sections', option, sections[option], '@ | _ | : | - | $');
          }
        } else {
          typeError('sections', option, sections[option], 'string');
        }
      }

      // Validate the global globs which should have no prefixes applied.
      if (option === 'global') {

        const globals = u.isString(sections[option]) ? [ sections[option] ] : sections[option];

        if (u.isArray(globals)) {
          config.transform.sections[option] = anymatch(globals as string[]);
          continue;
        } else {
          typeError('sections', option, sections[option], 'string | string[]');
        }
      }

    }

    return pageOptions.call(this, config);

  };

  /**
   * Get Paths
   *
   * Utility function for normalizing the paths configuration.
   * This will fix and resolve custom paths. If a user
   * defines the build directory input in directory paths
   * it will ensure it is formed correctly.
   */
  const pathOptions = async () => {

    // Path normalize,
    // When mode is upload we reference output directory
    const path = normalPath(lastPath(config.mode.upload ? config.output : config.input));
    const dirs = directories(config.mode as IModes, config.output);

    let valid: number = 8;

    // iterate over the define path mappings
    for (const key in config.paths) {

      let uri: string[];

      if (key === 'customers') {

        // customers directory lives with the templates directory
        const dir = await dirs('templates/customers');

        if (u.is(dir, 0)) valid--;

        uri = has(key, syncify.paths)
          ? u.isArray(syncify.paths[key])
            ? (syncify.paths[key] as string[]).map(path)
            : [ path(syncify.paths[key]) ]
          : [ path('templates/customers') ];

      } else if (has(key, syncify.paths)) {

        uri = u.isArray(syncify.paths[key])
          ? syncify.paths[key].map(path)
          : [ path(syncify.paths[key]) ];

        if (key === 'metafields' || key === 'pages') {

          config[key] = join(config.cwd, parentPath(path(uri))[0]);

          if (config.mode.build) {
            uri = [];
          } else {
            uri = uri.map(p => join(p, '**/*.json'));
          }
        } else {

          const dir = await dirs(key);

          if (u.is(dir, 0) || u.is(dir, 3)) valid--;

        }

      } else {

        uri = [ path(key) ];

      }

      if (key === 'assets') {

        const assets = join(lastPath(config.output), 'assets/*');

        if (u.isArray(uri)) {
          uri.push(assets);
        } else {
          uri = [ assets ];
        }
      }

      if (!u.isUndefined(uri)) {

        config.watch.push(...uri);
        config.paths[key] = anymatch(uri);

      }

    }

    if (config.mode.upload) {
      if (!u.is(valid, 0)) {
        cancel('Output directories empty, no files can be uploaded');
        process.exit();
      }
    }

    return u.isUndefined(this.syncify.transforms)
      ? terserOptions.call(this, config)
      : sectionOptions.call(this, config);

  };

}

/**
 * Get Paths
 *
 * Utility function for normalizing the paths configuration.
 * This will fix and resolve custom paths. If a user
 * defines the build directory input in directory paths
 * it will ensure it is formed correctly.
 */
export async function pathOptions (this: IPackage, config: PartialDeep<IConfig>) {

  // Path normalize,
  // When mode is upload we reference output directory
  const path = normalPath(lastPath(config.mode.upload ? config.output : config.input));
  const dirs = directories(config.mode as IModes, config.output);

  let valid: number = 8;

  // iterate over the define path mappings
  for (const key in config.paths) {

    let uri: string[];

    if (key === 'customers') {

      // customers directory lives with the templates directory
      const dir = await dirs('templates/customers');

      if (u.is(dir, 0)) valid--;

      uri = has(key, this.syncify.paths)
        ? u.isArray(this.syncify.paths[key])
          ? (this.syncify.paths[key] as string[]).map(path)
          : [ path(this.syncify.paths[key]) ]
        : [ path('templates/customers') ];

    } else if (has(key, this.syncify.paths)) {

      uri = u.isArray(this.syncify.paths[key])
        ? this.syncify.paths[key].map(path)
        : [ path(this.syncify.paths[key]) ];

      if (key === 'metafields' || key === 'pages') {

        config[key] = join(config.cwd, parentPath(path(uri))[0]);

        if (config.mode.build) {
          uri = [];
        } else {
          uri = uri.map(p => join(p, '**/*.json'));
        }
      } else {

        const dir = await dirs(key);

        if (u.is(dir, 0) || u.is(dir, 3)) valid--;

      }

    } else {

      uri = [ path(key) ];

    }

    if (key === 'assets') {

      const assets = join(lastPath(config.output), 'assets/*');

      if (u.isArray(uri)) {
        uri.push(assets);
      } else {
        uri = [ assets ];
      }
    }

    if (!u.isUndefined(uri)) {

      config.watch.push(...uri);
      config.paths[key] = anymatch(uri);

    }

  }

  if (config.mode.upload) {
    if (!u.is(valid, 0)) {
      cancel('Output directories empty, no files can be uploaded');
      process.exit();
    }
  }

  return u.isUndefined(this.syncify.transforms)
    ? terserOptions.call(this, config)
    : sectionOptions.call(this, config);
}

/**
 * Section Options
 *
 * This is a transform option, we will pass to pages
 * in the next validate check,
 */
export function sectionOptions (this: IPackage, config: PartialDeep<IConfig>) {

  if (!has('sections', this.syncify.transforms)) return pageOptions.call(this, config);

  const { sections } = this.syncify.transforms;

  // Ensure the section option is an object
  if (!u.isObject(sections)) unknownError('sections', sections);

  // Iterate over all the properties in sections option
  for (const option in sections) {

    // Throw if an undefined property is detected
    // checks against the default model.
    if (!has(option, config.transform.sections)) unknownError('sections', option);

    // Validate the boolean type values of the option
    if (option === 'directoryPrefixing' || option === 'onlyPrefixDuplicates') {
      if (u.isBoolean(sections[option])) {
        config.transform.sections[option] = sections[option];
        continue;
      } else {
        typeError('sections', option, sections[option], 'boolean');
      }
    }

    // Validate the prefix separator option, in Shopify sections
    // We cannot use dot prefixes, we ensure only accepts values are defined.
    if (option === 'prefixSeparator') {
      if (u.isString(sections[option])) {

        // Only these character can be prefixers
        if (/[$@:_-]/.test(sections[option])) {
          config.transform.sections[option] = sections[option];
          continue;
        } else {
          invalidError('sections', option, sections[option], '@ | _ | : | - | $');
        }
      } else {
        typeError('sections', option, sections[option], 'string');
      }
    }

    // Validate the global globs which should have no prefixes applied.
    if (option === 'global') {

      const globals = u.isString(sections[option]) ? [ sections[option] ] : sections[option];

      if (u.isArray(globals)) {
        config.transform.sections[option] = anymatch(globals as string[]);
        continue;
      } else {
        typeError('sections', option, sections[option], 'string | string[]');
      }
    }

  }

  return pageOptions.call(this, config);

}

export function pageOptions (this: IPackage, config: PartialDeep<IConfig>) {

  if (has('pages', this.syncify.transforms)) return jsonOptions.call(this, config);

  const { pages } = this.syncify.transforms;

  // Ensure the section option is an object
  if (!u.isObject(pages)) unknownError('pages', pages);

  // Iterate over all the properties in sections option
  for (const option in pages) {

    // Throw if an undefined property is detected
    // checks against the default model.
    if (!has(option, config.transform.pages)) unknownError('pages', option);

    if (option === 'importAs') {
      if (u.isString(pages[option])) {
        if (/(?:markdown|html)/.test(pages[option])) {
          config.transform.pages[option] = pages[option];
          continue;
        } else {
          invalidError('pages', option, pages[option], 'markdown | html');
        }
        continue;
      } else {
        typeError('pages', option, pages[option], 'string');
      }
    }

    if (option === 'fallbackAuthor') {
      if (u.isString(pages[option])) {
        config.transform.pages[option] = pages[option];
        continue;
      } else {
        typeError('pages', option, pages[option], 'string');
      }
    }

    if (option === 'liquidWarnings') {
      if (u.isBoolean(pages[option])) {
        config.transform.pages[option] = pages[option];
        continue;
      } else {
        typeError('pages', option, pages[option], 'boolean');
      }
    }

    if (option === 'markdown') {
      if (u.isObject(pages[option])) {
        u.assign(config.transform.pages[option], pages[option]);
        continue;
      } else {
        typeError('pages', option, pages[option], 'object');
      }
    }
  }

  if (hasPath('markdown.highlight', pages)) {
    if (pages.markdown.highlight === true) {
      config.transform.pages.markdown.highlight = function (code, lang) {
        const hljs = require('highlight.js');
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      };
    }
  }

  return jsonOptions.call(this, config);

}

/**
 * JSON Options
 *
 * This is a transform option, we will pass to pages
 * in the next validate check,
 */
export function jsonOptions (this: IPackage, config: PartialDeep<IConfig>) {

  if (!has('json', this.syncify.transforms)) return styleOptions.call(this, config);

  const { json } = this.syncify.transforms;

  // Ensure the section option is an object
  if (!u.isObject(json)) unknownError('json', json);

  // Iterate over all the properties in sections option
  for (const option in json) {

    // Throw if an undefined property is detected
    // checks against the default model.
    if (!has(option, config.transform.json)) unknownError('json', option);

    // Validate theindent number
    if (option === 'indent') {
      if (u.isNumber(json[option])) {
        config.transform.json[option] = json[option];
        continue;
      } else {
        typeError('json', option, json[option], 'number');
      }
    }

    // Validate the useTabs options, when true we indent with tabs
    if (option === 'useTabs') {
      if (u.isBoolean(json[option])) {
        config.transform.json[option] = json[option];
        continue;
      } else {
        typeError('json', option, json[option], 'boolean');
      }
    }

    // Validate the global globs which should have no prefixes applied.
    if (option === 'exclude') {

      const exclude = u.isString(json[option]) ? [ json[option] ] : json[option];

      if (u.isArray(exclude)) {
        config.transform.json[option] = anymatch(exclude as string[]);
        continue;
      } else {
        typeError('exclude', option, exclude[option], 'string | string[]');
      }
    }

  }

  return styleOptions.call(this, config);

}

/**
 * Styles
 *
 * Applies defaults to stylesheets defined in config,
 * parses the `postcss.config.js` configuration file and
 * normalizes the configuration object.
 */
export async function styleOptions (this: IPackage, config: PartialDeep<IConfig>) {

  // Find postcss configuration files
  const postcssconfig = await readConfigFile(join(config.config, 'postcss.config'));

  // Ensure postcss config exists
  if (!isNil(postcssconfig)) {

    // Set the postcss processor
    if (getModules(this, 'postcss')) {
      style.processer(postcssconfig);
    } else {
      log.throw('Missing "postcss" dependency');
    }
  }

  if (!has('styles', this.syncify.transforms)) return iconOptions.call(this, config);

  // Convert to an array if styles is using an object
  // configuration model, else just shortcut the options.
  const styles = u.isObject(this.syncify.transforms.styles)
    ? [ this.syncify.transforms.styles ]
    : this.syncify.transforms.styles;

  // Throw when styles config is not an array type
  if (!u.isArray(styles)) unknownError('styles', styles);

  // Path normalizer
  const path = normalPath(lastPath(config.input));

  // Process defined stylesheet inputs
  // For every stylesheet defined we we create an individual config
  const list = styles.flatMap((style: any) => {
    // Flatten and glob array type inputs
    return u.isArray(style.input)
      ? style.input.flatMap((input: any) => glob.sync(path(input)).map(input => ({ ...style, input })))
      : glob.sync(path(style.input)).map(input => ({ ...style, input }));
  });

  // Lets construct the configurations
  for (const style of list) {

    // Compile model for each style
    const compile: Partial<IStyle> = {};

    // input path
    compile.input = path(style.input);

    // Default Dart SASS options
    compile.sass = {
      sourcemap: true,
      style: 'compressed',
      warnings: true,
      include: []
    };

    // Options passed to PostCSS
    // We will always pass stylesheets to PostCSS when
    // the option is omitted and when the module exists
    if (has('postcss', style)) {
      if (u.isBoolean(style.postcss)) {
        compile.postcss = style.postcss;
      } else {
        typeError('styles', 'postcss', compile.postcss, 'boolean');
      }
    } else {
      compile.postcss = !isNil(postcssconfig);
    }

    // If sass options were provided in package config, lets apply
    if (has('sass', style)) {

      // Warn if input is not using sass or scss extension
      if (!/\.s[ac]ss/.test(extname(compile.input))) {
        log.warning(`Input ${compile.input} is not a sass file. Consider processing it with PostCSS.`);
      }

      // iterate of user defined options and u.assign to defaults
      for (const option in style.sass) {

        // Throw if an undefined property is detected
        // checks against the default model.
        if (!has(option, style.sass)) unknownError('sass', option);

        // Validate the boolean options
        if (option === 'sourcemap' || option === 'warnings') {
          if (u.isBoolean(style.sass[option])) {
            compile.sass[option] = style.sass[option];
            continue;
          } else {
            typeError('sass', option, style.sass[option], 'boolean');
          }
        }

        // validate the sass style
        if (option === 'style') {
          if (u.isString(style.sass[option])) {
            if (/(?:compressed|expanded)/.test(style.sass[option])) {

              compile.sass[option] = style.sass[option];

              // Warn when using expanded
              if (style.sass[option] === 'expanded') {
                log.warning('Consider using compressed sass style for faster requests');
              }

              continue;

            } else {
              invalidError('sass', option, style.sass[option], 'expanded | compressed');
            }
          } else {
            typeError('sass', option, style.sass[option], 'string');
          }
        }

        // Validate the include paths option
        if (option === 'include') {
          if (u.isArray(style.sass[option])) {
            compile.sass[option] = style.sass[option];
            continue;
          } else {
            typeError('sass', option, style.sass[option], 'string[]');
          }
        }

      }

    }

    // Rename file
    let rename: ReturnType<typeof renameFile>;

    // Define files to watch
    let watch: string[];

    // Package options has rename value
    if (has('rename', style)) {

      // Ensure the rename value is a string
      if (u.isString(style.rename)) {

        rename = renameFile(compile.input, style.rename);

        // Validate the file new name.
        if (!/[a-zA-Z0-9_.-]+/.test(rename.newName)) {
          log.throw('Invalid rename config defined on stylesheet: ' + style.rename);
        }

        // We are dealing with a .css file
        if (rename.newName.endsWith('.css')) {

          // Rename is using valid .css extension
          compile.rename = rename.newName;

        } else {

          // rename is using a non .css extension
          if (rename.newName.endsWith('.scss')) {
            rename.newName = rename.newName.replace('.scss', '.css');
          } else if (rename.newName.endsWith('.sass')) {
            rename.newName = rename.newName.replace('.sass', '.css');
          } else {
            rename.newName = rename.newName + '.css';
          }
        }
      } else {
        typeError('styles', 'rename', style.rename, 'string');
      }

    } else {

      rename = renameFile(compile.input);

    }

    // Apply watch options
    if (config.mode.watch && has('watch', style)) {

      if (u.isArray(style.watch)) {

        watch = style.watch.map(path);
        watch.push(compile.input);
        compile.watch = anymatch(watch);
        config.watch.push(...watch);

      } else {

        typeError('styles', 'watch', style.watch, 'string[]');

      }

    } else {

      watch = [ compile.input ];
      compile.watch = anymatch(watch);
      config.watch.push(compile.input);

    }

    // Apply includes (for Dart SASS)
    if (hasPath('sass.include', style)) {
      compile.sass.include = style.sass.include.map((include: string) => join(config.cwd, include));
    }

    // Include the CWD and parent directory
    compile.sass.include.unshift(config.cwd, join(config.cwd, rename.dir));

    if (has('snippet', style)) {
      if (u.isBoolean(style.snippet)) {
        compile.snippet = style.snippet;
      } else {
        typeError('styles', 'snippet', style.snippet, 'boolean');
      }
    }

    // Based on the snippet condition, we rename the export or not
    if (compile.snippet) {
      compile.rename = rename.newName + '.liquid';
    } else {

      compile.rename = rename.newName;

      // We need to add stylesheets being written to assets
      // as ignored files to prevent repeat uploads.
      config.watch.push('!' + join(lastPath(config.output), rename.newName));
    }

    // Lets populate the style model
    config.transform.styles.push(compile);

  }

  return iconOptions.call(this, config);

};

/**
 * SVG Icon Transforms
 *
 * Build the icons configuration for generating
 * SVG sprites and snippets.
 */
export async function iconOptions (this: IPackage, config: PartialDeep<IConfig>) {

  // Find svgo configuration file
  const svgoconfig = await readConfigFile(join(config.config, 'svgo.config'));

  // Ensure postcss config exists
  if (!isNil(svgoconfig)) {

    // Set the postcss processor
    if (getModules(this, 'svgo')) {
      style.processer(svgoconfig);
    } else {
      throw new Error('Missing "svgo" dependency, you need to install svgo');
    }
  }

  if (!has('icons', this.syncify.transforms)) return terserOptions.call(this, config);

  const { icons } = this.syncify.transforms;

  // Throw when styles config is not an array type
  if (!u.isObject(icons)) unknownError('icons', icons);

  const path = normalPath(lastPath(config.input));

  if (has('inlined', icons)) {
    if (u.isArray(icons.inlined)) {
      for (const inline of icons.inlined) {
        config.transform.icons.inlined.push({
          input: path(inline.input),
          rename: has('rename', inline) ? inline.rename : null,
          snippet: has('snippet', inline) ? inline.snippet : true,
          svgo: !isNil(svgoconfig)
        });
      }
    } else {
      typeError('icons', 'inlined', icons.inlined, '[]');
    }
  }

  if (!has('sprites', icons)) return config;

  const sprites = (u.isObject(icons.sprites)
    ? [ icons.sprites ]
    : icons.sprites) as IIcons['sprites'];

  if (!u.isArray(icons.sprites)) typeError('icons', 'sprites', icons.sprites, '{} | []');

  for (const sprite of sprites) {
    const input = path(sprite.input);
    config.transform.icons.sprites.push({
      input: u.isArray(input) ? input : [ input ],
      rename: has('rename', sprite) ? sprite.rename : null,
      snippet: has('snippet', sprite) ? sprite.snippet : true,
      svgo: !isNil(svgoconfig),
      options: has('options', sprite) ? sprite.options : {}
    });
  }

  if (has('replacer', icons.replacer)) {
    if (u.isBoolean(icons.replacer)) {
      config.transform.icons.replacer = icons.replacer;
    } else {
      typeError('icons', 'replacer', icons.replacer, 'boolean');
    }
  }

  if (has('vscodeCustomData', icons)) {

    if (!u.isBoolean(icons.vscodeCustomData)) {
      typeError('icons', 'vscodeCustomData', icons.vscodeCustomData, 'boolean');
    }

    if (config.transform.icons.replacer && icons.vscodeCustomData) {

      if (!existsSync(config.cache.vscode.uri)) {
        try {
          await mkdir(config.cache.vscode.uri);
        } catch (e) {
          throw new Error(e);
        }
      }

      let name: string = 'icon';

      if (has('replacerTag', icons)) {
        if (u.isString(icons.replacerTag)) {

          const test = /[a-z](?:[a-zA-Z-]+)?/.test(icons.replacerTag);

          if (test && !u.is(last(icons.replacerTag).charCodeAt(0), 45)) {
            name = icons.replacerTag;
          } else {
            invalidError('icons', 'replacerTag', icons.replacerTag, '[a-z] | [a-z]-[a-z]');
          }
        } else {
          typeError('icons', 'replacerTag', icons.replacerTag, 'string');
        }
      }

      const schema = {
        version: 1.1,
        tags: [
          {
            name,
            description: {
              kind: 'markdown',
              value: 'Replacer SVG icon name helper. Replaces all matched tags with the SVG file.'
            },
            attributes: [
              {
                name: 'name',
                values: [],
                description: 'The SVG icon name or id',
                valueSet: 'is'
              },
              {
                name: 'from',
                values: [],
                description: 'Where to import the icon from',
                valueSet: 'is'
              }
            ],
            references: [
              {
                name: 'Syncify Reference',
                url: 'https://syncify.myshopify.com/pages/icons#vscode-html-data'
              }
            ]
          }
        ]
      };

      await writeJson(config.cache.vscode.maps.icons, schema, { spaces: 0 });

      const file = await createVSCodeDir(config as IConfig);
      const settings = pathExistsSync(file) ? await readJson(file) : {};

      if (!settings['html.customData']) settings['html.customData'] = [];

      if (!includes(config.cache.vscode.maps.icons, settings['html.customData'])) {
        settings['html.customData'].push(config.cache.vscode.maps.icons);
        await writeJson(file, settings, { spaces: config.transform.json.indent });
      }

    }
  }

  return terserOptions.call(this, config);

}

/**
 * Minification Options
 *
 * Apply minification options for views. This will write
 * logic for both liquid and HTML terser minifier options.
 */
export function terserOptions (this: IPackage, config: PartialDeep<IConfig>) {

  if (!hasPath('terser.rules', this.syncify)) return config;

  const { rules } = this.syncify.terser;

  for (const key in rules) {

    if (has(key, config.terser.liquid)) {
      config.terser.liquid[key] = rules[key];
    } else if (has(key, config.terser.html)) {
      config.terser.html[key] = rules[key];
    } else {
      config.terser.html[key] = rules[key];
    }
  }

  if (has('ignoreCustomFragments', this.syncify.terser.rules)) {

    const { ignoreCustomFragments } = this.syncify.terser.rules;

    if (u.isArray(ignoreCustomFragments)) {
      const tags = ignoreCustomFragments.map((v: any) => u.isRegex(v) ? v : new RegExp(v));
      config.terser.html.ignoreCustomFragments.push(...tags);
    } else {
      throw TypeError('Invalid value on "ignoreCustomFragments", option must be an array type');
    }

  }

  if (has('ignoreLiquidTags', this.syncify.terser.rules)) {

    const { ignoreLiquidTags } = this.syncify.terser.rules;

    if (u.isArray(ignoreLiquidTags)) {
      const tags = new RegExp(`{%-?\\s*(?:(?!${ignoreLiquidTags.join('|')})[\\s\\S])*?%}`);
      config.terser.html.ignoreCustomFragments.push(tags);
    } else {
      throw TypeError('Invalid value on "ignoreLiquidTags", option must be an array type');
    }

  }

  if (has('ignoreLiquidObjects', this.syncify.terser.rules)) {

    const { ignoreLiquidObjects } = this.syncify.terser.rules;

    if (u.isArray(ignoreLiquidObjects)) {
      const tags = new RegExp(`{{-?\\s*(?:(?!${ignoreLiquidObjects.join('|')})[\\s\\S])*?-?}}`);
      config.terser.html.ignoreCustomFragments.push(tags);
    } else {
      throw TypeError('Invalid value on "ignoreLiquidObjects", option must be an array type');
    }

  }

  return config;

}
