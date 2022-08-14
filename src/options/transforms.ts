import { Bundle, Config, Package, SVGInline, SVGSprite, StyleTransform } from 'types';
import glob from 'glob';
import anymatch, { Tester } from 'anymatch';
import { has, hasPath, includes, isNil, last } from 'rambdax';
import { join, extname } from 'path';
import { existsSync, mkdir, pathExistsSync, readJson, writeJson } from 'fs-extra';
import { createVSCodeDir } from '../modes/vsc';
import { getModules, renameFile, readConfigFile } from '../shared/options';
import { lastPath, normalPath } from '../shared/paths';
import { typeError, unknownError, invalidError, warnOption } from './validate';
import { bundle, cache } from './index';
import * as u from '../shared/native';
import * as preprocessor from '../transform/styles';
import * as svgprocess from '../transform/icons';
import { Merge } from 'type-fest';

/**
 * Section Options
 *
 * This is a transform option, we will pass to pages
 * in the next validate check,
 */
export function sectionOptions (config: Config) {

  if (!has('sections', config.views)) return;

  const { sections } = config.views;

  // Ensure the section option is an object
  if (!u.isObject(config.views.sections)) {
    unknownError('sections', config.views.sections);
  }

  // Iterate over all the properties in sections option
  for (const option in bundle.section) {

    // Throw if an undefined property is detected
    // checks against the default model.
    if (!has(option, sections)) unknownError('sections', option);

    // Validate the boolean type values of the option
    if (option === 'directoryPrefixing' || option === 'onlyPrefixDuplicates') {
      if (u.isBoolean(sections[option])) {
        bundle.section[option] = sections[option];
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
          bundle.section[option] = sections[option];
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
        bundle.section[option] = new RegExp(`${globals.join('|')}`);
        continue;
      } else {
        typeError('sections', option, sections[option], 'string | string[]');
      }
    }
  }

}

export function pageOptions (config: Config) {

  if (has('pages', config.views)) return;

  const { pages } = config.views;

  // Ensure the section option is an object
  if (!u.isObject(pages)) unknownError('pages', pages);

  // Iterate over all the properties in sections option
  for (const option in pages) {

    // Throw if an undefined property is detected
    // checks against the default model.
    if (!has(option, bundle.page)) unknownError('pages', option);

    if (option === 'language') {
      if (u.isString(pages[option])) {
        if (pages[option] === 'markdown' || pages[option] === 'html') {
          bundle.page[option] = pages[option];
          continue;
        } else {
          invalidError('pages', option, pages[option], 'markdown | html');
        }
        continue;
      } else {
        typeError('pages', option, pages[option], 'string');
      }
    }

    if (option === 'author') {
      if (u.isString(pages[option])) {
        bundle.page[option] = pages[option];
        continue;
      } else {
        typeError('pages', option, pages[option], 'string');
      }
    }

    if (option === 'markdown') {
      if (u.isObject(pages[option])) {
        u.assign(bundle.page[option], pages[option]);
        continue;
      } else {
        typeError('pages', option, pages[option], 'object');
      }
    }
  }

}

/**
 * JSON Options
 *
 * This is a transform option, we will pass to pages
 * in the next validate check,
 */
export function jsonOptions (config: Config) {

  if (!has('json', config.transforms)) return;

  const { json } = config.transforms;

  // Ensure the section option is an object
  if (!u.isObject(json)) unknownError('json', json);

  // Iterate over all the properties in sections option
  for (const option in json) {

    // Validate theindent number
    if (option === 'indent') {
      if (u.isNumber(json[option])) {
        bundle.json[option] = json[option];
        continue;
      } else {
        typeError('json', option, json[option], 'number');
      }
    }

    // Validate the useTabs options, when true we indent with tabs
    if (option === 'useTab') {
      if (u.isBoolean(json[option])) {
        bundle.json[option] = json[option];
        continue;
      } else {
        typeError('json', option, json[option], 'boolean');
      }
    }

    // Validate the global globs which should have no prefixes applied.
    if (option === 'exclude') {

      const exclude = u.isString(json[option]) ? [ json[option] ] : json[option];

      if (u.isArray(exclude)) {
        bundle.json[option] = anymatch(exclude as string[]);
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
export async function styleOptions (config: Config, pkg: Package) {

  const warn = warnOption('Style option');

  // Find postcss configuration files
  const postcssconfig = await readConfigFile('postcss.config', null, bundle.dirs.config).catch(e => {
    throw new Error(e);
  });

  // Ensure postcss config exists
  if (!isNil(postcssconfig)) {

    // Set the postcss processor
    if (getModules(pkg, 'postcss')) {
      preprocessor.processer(postcssconfig);
    } else {
      warn('Missing dependency', 'postcss');
    }
  }

  if (!has('style', config.transforms)) return;

  // Convert to an array if styles is using an object
  // configuration model, else just shortcut the options.
  const styles = u.isObject(config.transforms.style)
    ? [ config.transforms.style ]
    : config.transforms.style;

  // Throw when styles config is not an array type
  if (!u.isArray(styles)) unknownError('styles', styles);

  // Path normalizer
  const path = normalPath(config.input);

  // Process defined stylesheet inputs
  // For every stylesheet defined we create an individual config
  const list = (styles as StyleTransform[]).flatMap((style: any) => {

    // Flatten and glob array type inputs
    return u.isArray(style.input) ? style.input.flatMap(
      (input: any) => glob.sync(path(input)).map(
        input => ({
          ...style,
          input: join(bundle.cwd, input)
        })
      )
    ) : glob.sync(path(style.input)).map(
      input => ({
        ...style,
        input: join(bundle.cwd, input)
      })
    );
  });

  // Lets construct the configurations
  for (const style of list as Merge<StyleTransform, { input: string, watch: Tester }>[]) {

    // Default Dart SASS options
    // Compile model for each style
    const compile: typeof style = {
      input: style.input,
      postcss: false,
      watch: null,
      sass: {
        sourcemap: true,
        style: 'compressed',
        warnings: true,
        includePaths: []
      }
    };

    // Options passed to PostCSS
    // We will always pass stylesheets to PostCSS when
    // the option is omitted and when the module exists
    if (has('postcss', style)) {
      if (u.isBoolean(style.postcss)) {
        compile.postcss = style.postcss;
      } else {
        typeError('style', 'postcss', compile.postcss, 'boolean');
      }
    } else {
      compile.postcss = !isNil(postcssconfig);
    }

    // If sass options were provided in package config, lets apply
    if (has('sass', style)) {

      // Warn if input is not using sass or scss extension
      if (!/\.s[ac]ss/.test(extname(compile.input))) warn('Input is not a sass file', compile.input);

      // iterate of user defined options and assign to defaults
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
            if (style.sass[option] === 'expanded' || style.sass[option] === 'compressed') {

              compile.sass[option] = style.sass[option];

              // Warn when using expanded
              if (style.sass[option] === 'expanded') {
                warn('Use "compressed" sass style for faster requests', option);
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
    const watch: string[] = [];

    // Package options has rename value
    if (has('rename', style)) {

      // Ensure the rename value is a string
      if (u.isString(style.rename)) {

        rename = renameFile(compile.input, style.rename);

        // Validate the file new name.
        if (!/[a-zA-Z0-9_.-]+/.test(rename.name)) typeError('sass', 'rename', rename, 'Invalid name augment');

        // We are dealing with a .css file
        if (rename.name.endsWith('.css')) {

          // Rename is using valid .css extension
          compile.rename = rename.name;

        } else {

          // rename is using a non .css extension
          if (rename.name.endsWith('.scss')) {
            rename.name = rename.name.replace('.scss', '.css');
          } else if (rename.name.endsWith('.sass')) {
            rename.name = rename.name.replace('.sass', '.css');
          } else {
            rename.name = rename.name + '.css';
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

        // Expands the defined watch paths and validates the uri paths
        for (const uri of style.watch) {

          const globs = glob.sync(join(bundle.cwd, path(uri)));

          if (globs.length === 0 && uri[0] !== '!') {
            warn('Cannot resolve watch glob/path uri', uri);
          }

          for (const p of globs) {
            if (existsSync(p)) {
              watch.push(p);
            } else {
              warn('No file exists in path', p);
            }
          }
        }

        watch.push(compile.input);
        compile.watch = anymatch(watch);
        bundle.watch.push(...watch);

      } else {

        typeError('styles', 'watch', style.watch, 'string[]');

      }

    } else {
      compile.watch = anymatch([ compile.input ]);
      bundle.watch.push(compile.input);
    }

    // Apply includes (for Dart SASS)
    if (hasPath('sass.includePaths', style)) {
      compile.sass.includePaths = style.sass.includePaths.map((include: string) => join(bundle.cwd, include));
    }

    // Include the CWD and parent directory
    compile.sass.includePaths.unshift(bundle.cwd, join(bundle.cwd, rename.dir));

    if (has('snippet', style)) {
      if (u.isBoolean(style.snippet)) {
        compile.snippet = style.snippet;
      } else {
        typeError('styles', 'snippet', style.snippet, 'boolean');
      }
    }

    // Based on the snippet condition, we rename the export or not
    if (compile.snippet) {

      compile.rename = rename.name + '.liquid';

      // We need to add stylesheet being written to snippets
      // as ignored files to prevent repeat uploads.
      bundle.watch.push('!' + join(bundle.cwd, config.output, 'snippets', compile.rename));

    } else {

      compile.rename = rename.name;

      // We need to add stylesheets being written to assets
      // as ignored files to prevent repeat uploads.
      bundle.watch.push('!' + join(bundle.cwd, config.output, 'assets', rename.name));
    }

    // Lets populate the style model
    bundle.style.push(compile);

  }

  // console.log(bundle);

};

/**
 * SVG Icon Transforms
 *
 * Build the icons configuration for generating
 * SVG sprites and snippets.
 */
export async function SVGOptions (config: Config, pkg: Package) {

  // Find svgo configuration file
  const svgoconfig = await readConfigFile(join(bundle.dirs.config, 'svgo.config'));

  // Ensure svgo config exists
  if (!isNil(svgoconfig)) {
    // Set the postcss processor
    if (getModules(pkg, 'svgo')) {
      svgprocess.processers('svgo', svgoconfig);
    } else {
      throw new Error('Missing "svgo" dependency, you need to install svgo');
    }
  }

  if (!has('svg', config.transforms)) return;

  const svgs = u.isArray(config.transforms.svg) ? config.transforms.svg : [ config.transforms.svg ];

  for (const svg of svgs as Merge<SVGInline, SVGSprite>[]) {

    const path = normalPath(lastPath(svg.input));
    const conf = u.isObject(svg.svgo);

    if (((u.isUndefined(svg.sprite) || (
      u.isBoolean(svg.sprite) && svg.sprite === false)) && conf === true) || (
      u.isBoolean(svg.svgo) && svg.svgo === true)
    ) {

      bundle.svg.inline.push({
        input: path(svg.input),
        rename: has('rename', svg) ? svg.rename : null,
        snippet: has('snippet', svg) ? svg.snippet : true,
        svgo: (conf && isNil(svgoconfig)) ? svg.svgo : svgoconfig
      });

    }

    if ((u.isUndefined(svg.svgo) ||
      (u.isBoolean(svg.svgo) && svg.svgo === false)) ||
      (u.isBoolean(svg.sprite) && svg.sprite === true) ||
      (u.isObject(svg.sprite))
    ) {

      const input = path(svg.input);

      bundle.svg.sprite.push({
        input: u.isArray(input) ? input : [ input ],
        rename: has('rename', svg) ? svg.rename : null,
        snippet: has('snippet', svg) ? svg.snippet : true,
        sprite: u.isObject(svg.sprite) ? svg.sprite : {}
      });

    }

  }

  if (!hasPath('views.icons', config)) return;

  const { icons } = config.views;

  if (u.isBoolean(icons.useCustomTag)) {
    bundle.svg.icons.useCustomTag = icons.useCustomTag;
  } else {
    typeError('icons', 'replacer', icons.useCustomTag, 'boolean');
  }

  if (has('vscodeCustomData', icons)) {

    if (!u.isBoolean(icons.vscodeCustomData)) {
      typeError('icons', 'vscodeCustomData', icons.vscodeCustomData, 'boolean');
    }

    if (bundle.svg.icons.useCustomTag && icons.vscodeCustomData) {

      if (!existsSync(cache.vscode.uri)) {
        try {
          await mkdir(cache.vscode.uri);
        } catch (e) {
          throw new Error(e);
        }
      }

      let name: string = 'icon';

      if (has('tagName', icons)) {
        if (u.isString(icons.tagName)) {

          const test = /[a-z](?:[a-zA-Z-]+)?/.test(icons.tagName);

          if (test && !u.is(last(icons.tagName).charCodeAt(0), 45)) {
            name = icons.tagName;
          } else {
            invalidError('icons', 'tagName', icons.tagName, '[a-z] | [a-z]-[a-z]');
          }
        } else {
          typeError('icons', 'tagName', icons.tagName, 'string');
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

      await writeJson(cache.vscode.data.icons, schema, { spaces: 0 });

      const file = await createVSCodeDir(bundle as Bundle);
      const settings = pathExistsSync(file) ? await readJson(file) : {};

      if (!settings['html.customData']) settings['html.customData'] = [];

      if (!includes(cache.vscode.data.icons, settings['html.customData'])) {

        settings['html.customData'].push(cache.vscode.data.icons);

        await writeJson(file, settings, {
          spaces: bundle.json.indent
        });
      }

    }
  }

}
