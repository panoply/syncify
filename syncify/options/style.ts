import type { StyleTransform, Processors, StyleBundle, SASSConfig } from 'types';
import glob from 'fast-glob';
import merge from 'mergerino';
import anymatch from 'anymatch';
import { hasPath } from 'rambdax';
import { join, extname } from 'pathe';
import { exists } from 'fs-extra';
import { typeError, invalidError, warnOption, missingDependency, throwError } from 'syncify:log/throws';
import { normalPath } from 'syncify:utils/paths';
import { getModules, renameFile, readConfigFile, getTransform } from 'syncify:utils/options';
import * as u from 'syncify:utils';
import { load } from 'syncify:transform/style';
import { Type } from 'syncify:file';
import { defineProperty } from 'syncify:native';
import { $ } from 'syncify:state';

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
export async function setStyleConfig () {

  if (!u.has('style', $.config.transform)) return;
  if (!$.config.transform.style || u.isEmpty($.config.transform.style)) return;

  const { postcss, sass } = $.processor;
  const warn = warnOption('Style Transform');

  sass.installed = getModules($.pkg, 'sass');

  // Load SASS Dart module
  if (sass.installed) {

    const loaded = await load('sass');

    if (!loaded) {
      throwError('Unable to dynamically import SASS', [
        'Ensure you have installed sass'
      ]);
    }
  }

  postcss.installed = getModules($.pkg, 'postcss');

  if (postcss.installed) {

    // Load PostCSS module
    const loaded = await load('postcss');

    if (!loaded) {
      throwError('Unable to dynamically import PostCSS', [
        'Ensure you have installed postcss'
      ]);
    }

    const pcss = await readConfigFile<PostCSSProcess>('postcss.config', {
      tsconfig: null
    });

    if (pcss !== null) {
      postcss.file = pcss.path;
      postcss.config = pcss.config;
    }

  }

  // Convert to an array if styles is using an object
  // configuration model, else just shortcut the options.
  const styles = getTransform <StyleTransform<string>[]>($.config.transform.style, {
    addWatch: false,
    flatten: true
  });

  // Path normalizer
  const path = normalPath($.config.input);

  for (const style of styles) {

    const has = u.hasProp(style);
    const bundle = u.object<StyleBundle>();

    bundle.uuid = u.uuid();
    bundle.input = style.input;
    bundle.watch = null;
    bundle.attrs = [];
    bundle.postcss = false;
    bundle.sass = false;
    bundle.tailwind = false;

    if (has('postcss')) {

      if (!postcss.installed) missingDependency('postcss');

      if (u.isArray(style.postcss)) {

        bundle.postcss = style.postcss;

      } else {

        const override = u.isObject(style.postcss);

        if (u.isBoolean(style.postcss) || override) {
          if (
            style.postcss !== false &&
            u.isNil(style.postcss) === false) {

            if (!postcss.installed) missingDependency('postcss');
            bundle.postcss = override ? merge(postcss.config, style.postcss) : true;

          }
        } else {

          typeError(
            {
              option: 'style',
              name: 'postcss',
              provided: bundle.postcss,
              expects: 'boolean | {}'
            }
          );
        }
      }
    } else {

      bundle.postcss = postcss.installed;

    }

    if ((has('sass') && style.sass !== false) && sass.installed === true) {

      const override = u.isObject(style.sass);

      if ((u.isBoolean(style.sass) || override) && u.isNil(style.sass) === false) {

        if (!sass.installed) missingDependency('sass');

        if (override === false) {

          defineProperty(bundle, 'sass', { get () { return style.sass; } });

        } else {

          // console.log(sass.config);
          bundle.sass = merge(sass.config, style.sass as SASSConfig);

          for (const option in style.sass as StyleTransform) {

            // Validate the boolean options
            if (
              option === 'sourcemap' ||
              option === 'warnings' ||
              option === 'quietDeps') {

              if (u.isBoolean(style.sass[option])) {

                bundle.sass[option] = style.sass[option];

              } else {

                typeError(
                  {
                    option: 'sass',
                    name: option,
                    provided: style.sass[option],
                    expects: 'boolean'
                  }
                );
              }

            } else if (option === 'style') {

              if (u.isString(style.sass[option]) === false) {

                typeError(
                  {
                    option: 'sass',
                    name: option,
                    provided: style.sass[option],
                    expects: 'string'
                  }
                );

              }

              if (
                style.sass[option] === 'expanded' ||
                style.sass[option] === 'compressed') {

                bundle.sass[option] = style.sass[option];

              } else {

                invalidError(
                  {
                    option: 'sass',
                    name: option,
                    value: style.sass[option],
                    expects: 'expanded | compressed'
                  }
                );

              }

            } else if (option === 'includePaths') {

              if (u.isArray(style.sass[option])) {

                // Full path relative to CWD
                const includePaths: string[] = [];

                for (const path of style.sass[option]) {
                  const resolve = join($.cwd, path);
                  if (await exists(resolve)) {
                    includePaths.push(resolve);
                  } else {
                    warn('Cannot resolve sass includePath entry', path);
                  }
                }

                bundle.sass[option] = includePaths;

              } else {

                typeError(
                  {
                    option: 'sass',
                    name: option,
                    provided: style.sass[option],
                    expects: 'string[]'
                  }
                );
              }
            }

          };
        }
      } else {

        typeError(
          {
            option: 'style',
            name: 'sass',
            provided: style.sass,
            expects: 'boolean | {}'
          }
        );
      }

      // Warn if input is not using sass or scss extension
      if (
        style.snippet === false &&
        !/\.s[ac]ss/.test(extname(bundle.input))) {

        warn('Input is not a sass file', bundle.input);

      }

    }

    // Rename file
    let rename: ReturnType<typeof renameFile> = renameFile(style.rename);

    // Package options has rename value
    if (has('rename') && u.isNil(style) === false) {

      // Ensure the rename value is a string
      if (u.isString(style.rename) === false) {
        typeError(
          {
            option: 'styles',
            name: 'rename',
            provided: style.rename,
            expects: 'string'
          }
        );
      }

      rename = renameFile(bundle.input, style.rename);

      // Validate the file new name.
      if (/[a-zA-Z0-9_.-]+/.test(rename.name) === false) {
        typeError(
          {
            option: 'sass',
            name: 'rename',
            provided: rename,
            expects: 'Characters: [a-zA-Z0-9_.-]'
          }
        );
      }

      // We are dealing with a .css file
      if (rename.name.endsWith('.css')) {

        // Rename is using valid .css extension
        bundle.rename = rename.name;

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

    if ($.mode.watch && has('watch')) {

      if (!u.isArray(style.watch)) {
        typeError(
          {
            option: 'styles',
            name: 'watch',
            provided: style.watch,
            expects: 'string[]'
          }
        );
      }

      for (const uri of style.watch) {

        const globs = await glob(join($.cwd, path(uri)));

        if (globs.length === 0 && uri[0] !== '!') {
          warn('Cannot resolve watch glob/path uri', uri);
        }

        for (const p of globs) {
          if (await exists(p)) {
            watch.push(p);
          } else {
            warn('No file exists in path', p);
          }
        }

      };

      watch.push(bundle.input);

      for (const path of watch) $.watch.add(path);

      bundle.watch = anymatch(watch);

    } else {

      bundle.watch = anymatch([ bundle.input ]);

      $.watch.add(bundle.input);

    }

    if (u.isObject(bundle.sass)) {

      // Include the CWD and parent directory
      bundle.sass.include.unshift($.cwd, join($.cwd, rename.dir));

      // Apply includes (for Dart SASS)
      if (hasPath('sass.include', style)) {
        bundle.sass.include = (style.sass as SassDartProcess).include.map(p => join($.cwd, p));
      }

    }

    if (has('snippet')) {

      if (!u.isBoolean(style.snippet)) {

        typeError(
          {
            option: 'styles',
            name: 'snippet',
            provided: style.snippet,
            expects: 'boolean'
          }
        );

      }

      bundle.snippet = style.snippet;

      if (
        bundle.snippet === true &&
        has('attrs') &&
        u.isEmpty(style.attrs) === false) {

        if (u.isArray(style.attrs)) {

          for (let i = 0; i < style.attrs.length; i++) {

            const attr = style.attrs[i];

            if (u.isArray(attr)) {

              bundle.attrs.push(attr.join(''));

            } else {

              typeError(
                {
                  option: 'style',
                  name: `attrs[${i}]`,
                  provided: attr,
                  expects: 'string[]'
                }
              );

            }
          }

        } else {

          typeError(
            {
              option: 'style',
              name: 'attrs',
              provided: style.attrs,
              expects: '[ string[] ]'
            }
          );

        }

      }

    }

    // Based on the snippet condition, we rename the export or not
    if (bundle.snippet) {

      if (!u.has('rename', bundle)) {
        bundle.rename = rename.name;
      }

      if (
        rename.name.endsWith('.liquid') === false ||
        bundle.rename.endsWith('.liquid') === false) {

        bundle.rename = rename.name + '.liquid';

      }

      $.paths.transforms.set(bundle.input, Type.Style);

      if ($.mode.watch) {
        $.watch.unwatch(join($.dirs.output, 'snippets', bundle.rename));
      }

    } else {

      bundle.rename = rename.name;

      if ($.mode.watch) {
        $.watch.unwatch(join($.dirs.output, 'assets', rename.name));
      }

    }

    // Final Step - Insert Build Configuration
    // This is where we populate the build
    //
    $.style.push(bundle);

  };

};
