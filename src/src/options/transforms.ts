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
import * as u from '../utils/native';
import { readConfigFile } from '../utils/options';
import { transform, bundle } from './config/conf';

/**
 * Section Options
 *
 * This is a transform option, we will pass to pages
 * in the next validate check,
 */
export function sectionOptions (config: IOptions) {

  if (!has('sections', config.transforms)) return;

  const { sections } = config.transforms;

  // Ensure the section option is an object
  if (!u.isObject(sections)) unknownError('sections', sections);

  // Iterate over all the properties in sections option
  for (const option in transform.sections) {

    // Throw if an undefined property is detected
    // checks against the default model.
    if (!has(option, sections)) unknownError('sections', option);

    // Validate the boolean type values of the option
    if (option === 'directoryPrefixing' || option === 'onlyPrefixDuplicates') {
      if (u.isBoolean(sections[option])) {
        transform.sections[option] = sections[option];
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
          transform.sections[option] = sections[option];
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
        transform.sections[option] = anymatch(globals as string[]);
        continue;
      } else {
        typeError('sections', option, sections[option], 'string | string[]');
      }
    }

  }

}

export function pageOptions (config: IOptions) {

  if (has('pages', config.transforms)) return;

  const { pages } = config.transforms;

  // Ensure the section option is an object
  if (!u.isObject(pages)) unknownError('pages', pages);

  // Iterate over all the properties in sections option
  for (const option in pages) {

    // Throw if an undefined property is detected
    // checks against the default model.
    if (!has(option, transform.pages)) unknownError('pages', option);

    if (option === 'importAs') {
      if (u.isString(pages[option])) {
        if (/(?:markdown|html)/.test(pages[option])) {
          transform.pages[option] = pages[option];
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
        transform.pages[option] = pages[option];
        continue;
      } else {
        typeError('pages', option, pages[option], 'string');
      }
    }

    if (option === 'liquidWarnings') {
      if (u.isBoolean(pages[option])) {
        transform.pages[option] = pages[option];
        continue;
      } else {
        typeError('pages', option, pages[option], 'boolean');
      }
    }

    if (option === 'markdown') {
      if (u.isObject(pages[option])) {
        u.assign(transform.pages[option], pages[option]);
        continue;
      } else {
        typeError('pages', option, pages[option], 'object');
      }
    }
  }

  if (hasPath('markdown.highlight', pages)) {
    if (pages.markdown.highlight === true) {
      transform.pages.markdown.highlight = function (code, lang) {
        const hljs = require('highlight.js');
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      };
    }
  }

}

/**
 * JSON Options
 *
 * This is a transform option, we will pass to pages
 * in the next validate check,
 */
export function jsonOptions (config: IOptions) {

  if (!has('json', config.transforms)) return;

  const { json } = config.transforms;

  // Ensure the section option is an object
  if (!u.isObject(json)) unknownError('json', json);

  // Iterate over all the properties in sections option
  for (const option in json) {

    // Throw if an undefined property is detected
    // checks against the default model.
    if (!has(option, transform.json)) unknownError('json', option);

    // Validate theindent number
    if (option === 'indent') {
      if (u.isNumber(json[option])) {
        transform.json[option] = json[option];
        continue;
      } else {
        typeError('json', option, json[option], 'number');
      }
    }

    // Validate the useTabs options, when true we indent with tabs
    if (option === 'useTabs') {
      if (u.isBoolean(json[option])) {
        transform.json[option] = json[option];
        continue;
      } else {
        typeError('json', option, json[option], 'boolean');
      }
    }

    // Validate the global globs which should have no prefixes applied.
    if (option === 'exclude') {

      const exclude = u.isString(json[option]) ? [ json[option] ] : json[option];

      if (u.isArray(exclude)) {
        transform.json[option] = anymatch(exclude as string[]);
        continue;
      } else {
        typeError('exclude', option, exclude[option], 'string | string[]');
      }
    }

  }

}

/**
 * Styles
 *
 * Applies defaults to stylesheets defined in config,
 * parses the `postcss.config.js` configuration file and
 * normalizes the configuration object.
 */
export async function styleOptions (config: IOptions, pkg: IPackage) {

  // Find postcss configuration files
  const postcssconfig = await readConfigFile(join(bundle.dirs.config, 'postcss.config'));

  // Ensure postcss config exists
  if (!isNil(postcssconfig)) {

    // Set the postcss processor
    if (getModules(pkg, 'postcss')) {
      style.processer(postcssconfig);
    } else {
      log.throw('Missing "postcss" dependency');
    }
  }

  if (!has('styles', config.transforms)) return;

  // Convert to an array if styles is using an object
  // configuration model, else just shortcut the options.
  const styles = u.isObject(config.transforms.styles)
    ? [ config.transforms.styles ]
    : config.transforms.styles;

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
    if (bundle.mode.watch && has('watch', style)) {

      if (u.isArray(style.watch)) {

        watch = style.watch.map(path);
        watch.push(compile.input);
        compile.watch = anymatch(watch);
        bundle.watch.push(...watch);

      } else {

        typeError('styles', 'watch', style.watch, 'string[]');

      }

    } else {

      watch = [ compile.input ];
      compile.watch = anymatch(watch);
      bundle.watch.push(compile.input);

    }

    // Apply includes (for Dart SASS)
    if (hasPath('sass.include', style)) {
      compile.sass.include = style.sass.include.map((include: string) => join(bundle.cwd, include));
    }

    // Include the CWD and parent directory
    compile.sass.include.unshift(bundle.cwd, join(bundle.cwd, rename.dir));

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
      bundle.watch.push('!' + join(lastPath(config.output), rename.newName));
    }

    // Lets populate the style model
    transform.styles.push(compile as IStyle);

  }

};

/**
 * SVG Icon Transforms
 *
 * Build the icons configuration for generating
 * SVG sprites and snippets.
 */
export async function iconOptions (config: IOptions, pkg: IPackage) {

  // Find svgo configuration file
  const svgoconfig = await readConfigFile(join(bundle.dirs.config, 'svgo.config'));

  // Ensure postcss config exists
  if (!isNil(svgoconfig)) {

    // Set the postcss processor
    if (getModules(pkg, 'svgo')) {
      style.processer(svgoconfig);
    } else {
      throw new Error('Missing "svgo" dependency, you need to install svgo');
    }
  }

  if (!has('icons', config.transforms)) return;

  const { icons } = config.transforms;

  // Throw when styles config is not an array type
  if (!u.isObject(icons)) unknownError('icons', icons);

  const path = normalPath(lastPath(config.input));

  if (has('inlined', icons)) {
    if (u.isArray(icons.inlined)) {
      for (const inline of icons.inlined) {
        transform.icons.inlined.push({
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
    transform.icons.sprites.push({
      input: u.isArray(input) ? input : [ input ],
      rename: has('rename', sprite) ? sprite.rename : null,
      snippet: has('snippet', sprite) ? sprite.snippet : true,
      svgo: !isNil(svgoconfig),
      options: has('options', sprite) ? sprite.options : {}
    });
  }

  if (has('replacer', icons.replacer)) {
    if (u.isBoolean(icons.replacer)) {
      transform.icons.replacer = icons.replacer;
    } else {
      typeError('icons', 'replacer', icons.replacer, 'boolean');
    }
  }

  if (has('vscodeCustomData', icons)) {

    if (!u.isBoolean(icons.vscodeCustomData)) {
      typeError('icons', 'vscodeCustomData', icons.vscodeCustomData, 'boolean');
    }

    if (transform.icons.replacer && icons.vscodeCustomData) {

      if (!existsSync(bundle.cache.vscode.uri)) {
        try {
          await mkdir(bundle.cache.vscode.uri);
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

      await writeJson(bundle.cache.vscode.maps.icons, schema, { spaces: 0 });

      const file = await createVSCodeDir(bundle as IConfig);
      const settings = pathExistsSync(file) ? await readJson(file) : {};

      if (!settings['html.customData']) settings['html.customData'] = [];

      if (!includes(bundle.cache.vscode.maps.icons, settings['html.customData'])) {
        settings['html.customData'].push(bundle.cache.vscode.maps.icons);
        await writeJson(file, settings, { spaces: bundle.transform.json.indent });
      }

    }
  }

}
