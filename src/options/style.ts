import { Config, Package, StyleTransform, Processors } from 'types';
import glob from 'glob';
import anymatch, { Tester } from 'anymatch';
import { forEach, has, hasPath, isNil } from 'rambdax';
import { join, extname } from 'path';
import { existsSync } from 'fs-extra';
import { getModules, renameFile, readConfigFile } from '../shared/options';
import { normalPath } from '../shared/paths';
import { typeError, unknownError, invalidError, warnOption, missingDependency } from './validate';
import { bundle, update } from './index';
import * as u from '../shared/native';
import { Merge } from 'type-fest';
import { keys } from '../shared/native';

type PostCSSProcess = Processors['style']['postcss']
type SassDartProcess = Processors['style']['sass']

/**
 * Styles
 *
 * Applies defaults to stylesheets defined in config,
 * parses the `postcss.config.js` configuration file and
 * normalizes the configuration object.
 */
export async function styleOptions (config: Config, pkg: Package) {

  if (!has('style', config.transforms)) return;

  const { postcss, sass } = bundle.processor;
  const warn = warnOption('Style option');

  sass.installed = getModules(pkg, 'sass');
  postcss.installed = getModules(pkg, 'postcss');

  if (postcss.installed) {
    const pcss = await readConfigFile<PostCSSProcess>('postcss.config');
    if (pcss !== null) {
      postcss.configFile = pcss.path;
      postcss.config = pcss.config;
    }
  }

  // Convert to an array if styles is using an object
  // configuration model, else just shortcut the options.
  const styles = u.isObject(config.transforms.style)
    ? [ config.transforms.style ]
    : config.transforms.style;

  // Throw when styles config is not an array type
  if (!u.isArray(styles)) unknownError('styles', styles);

  // Path normalizer
  const path = normalPath(config.input);
  const list = (styles as StyleTransform[]).flatMap((style: any) => {

    if (u.isArray(style.input)) {
      return style.input.flatMap((item: any) => {

        const match = glob.sync(path(item));
        if (match.length === 0) warn('Input could not be resolved', item);

        return match.map(input => ({ ...style, input: join(bundle.cwd, input) }));
      });
    }

    const match = glob.sync(path(style.input));
    if (match.length === 0) warn('Input could not be resolved', style.input);

    // Flatten and glob array type inputs
    return match.map(input => ({ ...style, input: join(bundle.cwd, input) }));

  });

  forEach(style => {

    // Default Dart SASS options  compile model for each style
    const compile: typeof style = {
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
          if (!postcss.required) postcss.required = true;

          compile.postcss = override
            ? update.patch(postcss.config, style.postcss)
            : true;

        }
      } else {
        typeError('style', 'postcss', compile.postcss, 'boolean | {}');
      }
    }

    if (has('sass', style)) {

      const override = u.isObject(style.sass);

      if ((u.isBoolean(style.sass) || override) && !isNil(style.sass)) {
        if (!sass.installed) missingDependency('sass');
        if (!sass.required) sass.required = true;
        if (!override) {
          compile.sass = style.sass;
        } else {

          // console.log(sass.config);
          compile.sass = update.patch(sass.config, style.sass);

          forEach(option => {

            // Validate the boolean options
            if (option === 'sourcemap' || option === 'warnings') {

              if (u.isBoolean(style.sass[option])) {
                compile.sass[option] = style.sass[option];
              } else {
                typeError('sass', option, style.sass[option], 'boolean');
              }

            } else if (option === 'style') {

              if (!u.isString(style.sass[option])) typeError('sass', option, style.sass[option], 'string');

              if (style.sass[option] === 'expanded' || style.sass[option] === 'compressed') {
                compile.sass[option] = style.sass[option];
              } else {
                invalidError('sass', option, style.sass[option], 'expanded | compressed');
              }

            } else if (option === 'includePaths') {

              if (u.isArray(style.sass[option])) {
                compile.sass[option] = style.sass[option];
              } else {
                typeError('sass', option, style.sass[option], 'string[]');
              }
            }

          }, keys(style.sass));
        }
      } else {
        typeError('style', 'sass', style.sass, 'boolean | {}');
      }

      // Warn if input is not using sass or scss extension
      if (!style.snippet && !/\.s[ac]ss/.test(extname(compile.input))) {
        warn('Input is not a sass file', compile.input);
      }

    }

    // Rename file
    let rename: ReturnType<typeof renameFile> = renameFile(compile.input); ;

    // Package options has rename value
    if (has('rename', style) && !isNil(style)) {

      // Ensure the rename value is a string
      if (!u.isString(style.rename)) typeError('styles', 'rename', style.rename, 'string');

      rename = renameFile(compile.input, style.rename);

      // Validate the file new name.
      if (!/[a-zA-Z0-9_.-]+/.test(rename.name)) typeError('sass', 'rename', rename, 'Invalid name augment');

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
      if (!u.isArray(style.watch)) typeError('styles', 'watch', style.watch, 'string[]');

      forEach(uri => {

        const globs = glob.sync(join(bundle.cwd, path(uri)));

        if (globs.length === 0 && uri[0] !== '!') warn('Cannot resolve watch glob/path uri', uri);

        forEach(p => existsSync(p)
          ? watch.push(p)
          : warn('No file exists in path', p), globs);

      }, style.watch as unknown as string[]);

      watch.push(compile.input);
      compile.watch = anymatch(watch);
      bundle.watch.push(...watch);

    } else {
      compile.watch = anymatch([ compile.input ]);
      bundle.watch.push(compile.input);
    }

    if (typeof compile.sass === 'object') {

      // Include the CWD and parent directory
      compile.sass.includePaths.unshift(bundle.cwd, join(bundle.cwd, rename.dir));

      // Apply includes (for Dart SASS)
      if (hasPath('sass.includePaths', style)) {
        compile.sass.includePaths = (style.sass as SassDartProcess).includePaths.map(p => join(bundle.cwd, p));
      }
    }

    if (has('snippet', style)) {
      if (!u.isBoolean(style.snippet)) typeError('styles', 'snippet', style.snippet, 'boolean');
      compile.snippet = style.snippet;
    }

    // Based on the snippet condition, we rename the export or not
    if (compile.snippet) {
      if (!rename.name.endsWith('.liquid')) compile.rename = rename.name + '.liquid';
      bundle.watch.push('!' + join(bundle.cwd, config.output, 'snippets', compile.rename));
    } else {
      compile.rename = rename.name;
      bundle.watch.push('!' + join(bundle.cwd, config.output, 'assets', rename.name));
    }

    // console.log(bundle.watch);

    bundle.style.push(compile as any);

  }, list as Array<Merge<StyleTransform, {
      input: string,
      watch: Tester
    }>
  >);

  // console.log(bundle);

};
