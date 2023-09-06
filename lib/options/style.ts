import type { Config, StyleTransform, Processors, WatchBundle, StyleBundle, SASSConfig } from 'types';
import glob from 'fast-glob';
import merge from 'mergerino';
import anymatch from 'anymatch';
import { has, hasPath, isNil, uniq } from 'rambdax';
import { join, extname } from 'pathe';
import { existsSync } from 'fs-extra';
import { typeError, invalidError, warnOption, missingDependency, throwError } from '~log/validate';
import { normalPath } from '~utils/paths';
import { getModules, renameFile, readConfigFile, getTransform } from '~utils/options';
import { isObject, isBoolean, isArray, isString, uuid } from '~utils';
import { load } from '~transform/styles';
import { Type } from '~process/files';
import { defineProperty } from '~native';
import { $ } from '~state';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

type PostCSSProcess = Processors['postcss']
type SassDartProcess = Processors['sass']

/**
 *
 * Applies defaults to stylesheets defined in config,
 * parses the `postcss.config.js` configuration file and
 * normalizes the configuration object.
 */
export async function setStyleConfig (config: Config) {

  if (!has('style', config.transforms)) return;

  const { postcss, sass } = $.processor;
  const warn = warnOption('style transform option');

  sass.installed = getModules($.pkg, 'sass');

  // Load SASS Dart module
  if (sass.installed) {

    const loaded = await load('sass');
    if (!loaded) {
      throwError(
        'Unable to dynamically import SASS',
        'Ensure you have installed sass'
      );
    }
  }

  postcss.installed = getModules($.pkg, 'postcss');

  if (postcss.installed) {

    // Load PostCSS module
    const loaded = await load('postcss');

    if (!loaded) {
      throwError(
        'Unable to dynamically import PostCSS',
        'Ensure you have installed postcss'
      );
    }

    const pcss = await readConfigFile<PostCSSProcess>('postcss.config');

    if (pcss !== null) {
      postcss.file = pcss.path;
      postcss.config = pcss.config;
    }

  }

  // Convert to an array if styles is using an object
  // configuration model, else just shortcut the options.
  const styles = getTransform <StyleTransform<string>[]>(config.transforms.style, {
    addWatch: false,
    flatten: true
  });

  // Path normalizer
  const path = normalPath(config.input);

  for (const style of styles) {

    // Default Dart SASS options compile model for each style
    const compile: StyleBundle = {
      uuid: uuid(),
      input: style.input,
      watch: null,
      postcss: false,
      sass: false
    };

    if (has('postcss', style)) {

      if (!postcss.installed) {
        missingDependency('postcss');
      }

      if (isArray(style.postcss)) {

        compile.postcss = style.postcss;

      } else {

        const override = isObject(style.postcss);

        if ((isBoolean(style.postcss) || override) && !isNil(style.postcss)) {
          if (style.postcss !== false) {

            if (!postcss.installed) missingDependency('postcss');

            compile.postcss = override
              ? merge(postcss.config, style.postcss as any)
              : true as unknown as any;

          }
        } else {
          typeError({
            option: 'style',
            name: 'postcss',
            provided: compile.postcss,
            expects: 'boolean | {}'
          });
        }
      }
    }

    if ((has('sass', style) && style.sass !== false) && sass.installed === true) {

      const override = isObject(style.sass);

      if ((isBoolean(style.sass) || override) && !isNil(style.sass)) {

        if (!sass.installed) {
          missingDependency('sass');
        }

        if (!override) {

          defineProperty(compile, 'sass', {
            get () {
              return style.sass;
            }
          });

        } else {

          // console.log(sass.config);
          compile.sass = merge(sass.config, style.sass as SASSConfig);

          for (const option in style.sass as StyleTransform) {

            // Validate the boolean options
            if (option === 'sourcemap' || option === 'warnings') {

              if (isBoolean(style.sass[option])) {
                compile.sass[option] = style.sass[option];
              } else {
                typeError({
                  option: 'sass',
                  name: option,
                  provided: style.sass[option],
                  expects: 'boolean'
                });
              }

            } else if (option === 'style') {

              if (!isString(style.sass[option])) {
                typeError({
                  option: 'sass',
                  name: option,
                  provided: style.sass[option],
                  expects: 'string'
                });
              }

              if (style.sass[option] === 'expanded' || style.sass[option] === 'compressed') {
                compile.sass[option] = style.sass[option];
              } else {
                invalidError('sass', option, style.sass[option], 'expanded | compressed');
              }

            } else if (option === 'includePaths') {

              if (isArray(style.sass[option])) {

                // Full path relative to CWD
                compile.sass[option] = uniq<string>(style.sass[option]).map(p => join($.cwd, p));

              } else {
                typeError({
                  option: 'sass',
                  name: option,
                  provided: style.sass[option],
                  expects: 'string[]'
                });
              }
            }

          };
        }
      } else {
        typeError({
          option: 'style',
          name: 'sass',
          provided: style.sass,
          expects: 'boolean | {}'
        });
      }

      // Warn if input is not using sass or scss extension
      if (!style.snippet && !/\.s[ac]ss/.test(extname(compile.input))) {
        warn('Input is not a sass file', compile.input);
      }

    }

    // Rename file
    let rename: ReturnType<typeof renameFile> = renameFile(style.rename);

    // Package options has rename value
    if (has('rename', style) && !isNil(style)) {

      // Ensure the rename value is a string
      if (!isString(style.rename)) {
        typeError({
          option: 'styles',
          name: 'rename',
          provided: style.rename,
          expects: 'string'
        });
      }

      rename = renameFile(compile.input, style.rename);

      // Validate the file new name.
      if (!/[a-zA-Z0-9_.-]+/.test(rename.name)) {
        typeError({
          option: 'sass',
          name: 'rename',
          provided: rename,
          expects: 'Characters: [a-zA-Z0-9_.-]'
        });
      }

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
        } else if (!rename.name.endsWith('.liquid')) {
          rename.name = rename.name + '.css';
        }

      }
    }

    const watch: string[] = [];

    if ($.mode.watch && has('watch', style)) {

      if (!isArray(style.watch)) {
        typeError({
          option: 'styles',
          name: 'watch',
          provided: style.watch,
          expects: 'string[]'
        });
      }

      for (const uri of style.watch as unknown as string[]) {

        const globs = await glob(join($.cwd, path(uri)));

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

      };

      watch.push(compile.input);
      watch.forEach(p => $.watch.add(p));

      compile.watch = anymatch(watch);

    } else {

      compile.watch = anymatch([ compile.input ]);

      $.watch.add(compile.input);

    }

    if (typeof compile.sass === 'object') {

      // Include the CWD and parent directory
      compile.sass.include.unshift($.cwd, join($.cwd, rename.dir));

      // Apply includes (for Dart SASS)
      if (hasPath('sass.include', style)) {
        compile.sass.include = (style.sass as SassDartProcess).include.map(p => join($.cwd, p));
      }
    }

    if (has('snippet', style)) {

      if (!isBoolean(style.snippet)) {

        typeError(
          {
            option: 'styles',
            name: 'snippet',
            provided: style.snippet,
            expects: 'boolean'
          }
        );

      }

      compile.snippet = style.snippet;

    }

    // Based on the snippet condition, we rename the export or not
    if (compile.snippet) {

      if (!has('rename', compile)) {
        compile.rename = rename.name;
      }

      if (!rename.name.endsWith('.liquid') || !compile.rename.endsWith('.liquid')) {
        compile.rename = rename.name + '.liquid';
      }

      $.paths.transforms.set(compile.input, Type.Style);

      if ($.mode.watch) {
        ($.watch as WatchBundle).unwatch(join($.cwd, config.output, 'snippets', compile.rename));
      }

    } else {

      compile.rename = rename.name;

      if ($.mode.watch) {
        ($.watch as WatchBundle).unwatch(join($.cwd, config.output, 'assets', rename.name));
      }

    }

    // Final Step - Insert Build Configuration
    // This is where we populate the build
    //
    $.style.push(compile);

  };

};
