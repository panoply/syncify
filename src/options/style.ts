import { Merge } from 'type-fest';
import { Config, Package, StyleTransform, Processors } from 'types';
import glob from 'fast-glob';
import merge from 'mergerino';
import anymatch, { Tester } from 'anymatch';
import { has, hasPath, isNil, uniq } from 'rambdax';
import { join, extname } from 'path';
import { existsSync } from 'fs-extra';
import { getModules, renameFile, readConfigFile } from '~utils/options';
import { normalPath } from '~utils/paths';
import { typeError, invalidError, warnOption, missingDependency, throwError } from '~log/validate';
import { bundle, processor } from '~config';
import { load } from '~transform/styles';
import { getTransform } from './utilities';
import * as u from '~utils/native';
import { uuid } from '~utils/utils';
import { Type } from '~process/files';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

type PostCSSProcess = Processors['postcss']
type SassDartProcess = Processors['sass']
type StylesFlattened = Merge<StyleTransform, {
  uuid: string;
  input: string;
  watch: Tester
}>

/**
 *
 * Applies defaults to stylesheets defined in config,
 * parses the `postcss.config.js` configuration file and
 * normalizes the configuration object.
 */
export async function setStyleConfig (config: Config, pkg: Package) {

  if (!has('style', config.transforms)) return;

  const { postcss, sass } = processor;
  const warn = warnOption('style transform option');

  sass.installed = getModules(pkg, 'sass');

  // Load SASS Dart module
  if (sass.installed) {
    const loaded = await load('sass');

    if (!loaded) {
      throwError('Unable to dynamically import SASS', 'Ensure you have installed sass');
    }
  }

  postcss.installed = getModules(pkg, 'postcss');

  if (postcss.installed) {

    // Load PostCSS module
    const loaded = await load('postcss');

    if (!loaded) {
      throwError('Unable to dynamically import PostCSS', 'Ensure you have installed postcss');
    }

    const pcss = await readConfigFile<PostCSSProcess>('postcss.config');

    if (pcss !== null) {
      postcss.file = pcss.path;
      postcss.config = pcss.config;
    }

  }

  // Convert to an array if styles is using an object
  // configuration model, else just shortcut the options.
  const styles = getTransform<StylesFlattened[]>(config.transforms.style, {
    addWatch: false,
    flatten: true
  });

  // Path normalizer
  const path = normalPath(config.input);

  for (const style of styles) {

    // Default Dart SASS options compile model for each style
    const compile: typeof style = {
      uuid: uuid(),
      input: style.input,
      watch: null,
      postcss: false,
      sass: false
    };

    if (has('postcss', style)) {

      const override = u.isObject(style.postcss);

      if ((u.isBoolean(style.postcss) || override) && !isNil(style.postcss)) {
        if (style.postcss !== false) {

          if (!postcss.installed) missingDependency('postcss');

          compile.postcss = override
            ? merge(postcss.config, style.postcss as Processors['postcss'])
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

    if ((has('sass', style) && style.sass !== false) || sass.installed === true) {

      const override = u.isObject(style.sass);

      if ((u.isBoolean(style.sass) || override) && !isNil(style.sass)) {
        if (!sass.installed) missingDependency('sass');
        if (!override) {

          u.defineProperty(compile, 'sass', { get () { return style.sass; } });

        } else {

          // console.log(sass.config);
          compile.sass = u.assign(sass.config, style.sass);

          for (const option in style.sass as StyleTransform) {

            // Validate the boolean options
            if (option === 'sourcemap' || option === 'warnings') {

              if (u.isBoolean(style.sass[option])) {
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

              if (!u.isString(style.sass[option])) {
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

              if (u.isArray(style.sass[option])) {
                // Full path relative to CWD
                compile.sass[option] = uniq<string>(style.sass[option]).map(p => join(bundle.cwd, p));
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
      if (!u.isString(style.rename)) {
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
        compile.rename = rename.name; // Rename is using valid .css extension
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

    if (bundle.mode.watch && has('watch', style)) {

      if (!u.isArray(style.watch)) {
        typeError({
          option: 'styles',
          name: 'watch',
          provided: style.watch,
          expects: 'string[]'
        });
      }

      for (const uri of style.watch as unknown as string[]) {

        const globs = await glob(join(bundle.cwd, path(uri)));

        if (globs.length === 0 && uri[0] !== '!') warn('Cannot resolve watch glob/path uri', uri);

        for (const p of globs) {
          if (existsSync(p)) {
            watch.push(p);
          } else {
            warn('No file exists in path', p);
          }
        }

      };

      watch.push(compile.input);
      watch.forEach(p => bundle.watch.add(p));
      compile.watch = anymatch(watch);

    } else {
      compile.watch = anymatch([ compile.input ]);
      bundle.watch.add(compile.input);
    }

    if (typeof compile.sass === 'object') {

      // Include the CWD and parent directory
      compile.sass.include.unshift(bundle.cwd, join(bundle.cwd, rename.dir));

      // Apply includes (for Dart SASS)
      if (hasPath('sass.include', style)) {
        compile.sass.include = (style.sass as SassDartProcess).include.map(p => join(bundle.cwd, p));
      }
    }

    if (has('snippet', style)) {

      if (!u.isBoolean(style.snippet)) {
        typeError({
          option: 'styles',
          name: 'snippet',
          provided: style.snippet,
          expects: 'boolean'
        });
      }

      compile.snippet = style.snippet;
    }

    // Based on the snippet condition, we rename the export or not
    if (compile.snippet) {

      if (!has('rename', compile)) compile.rename = rename.name;
      if (!rename.name.endsWith('.liquid') || !compile.rename.endsWith('.liquid')) {
        compile.rename = rename.name + '.liquid';
      }

      bundle.paths.transforms.set(compile.input, Type.Style);

      if (bundle.mode.watch) {
        bundle.watch.unwatch(`${join(bundle.cwd, config.output, 'snippets', compile.rename)}`);
      }
    } else {

      compile.rename = rename.name;

      if (bundle.mode.watch) {
        bundle.watch.unwatch(`${join(bundle.cwd, config.output, 'assets', rename.name)}`);
      }
    }

    bundle.style.push(compile as any);

  };

};
