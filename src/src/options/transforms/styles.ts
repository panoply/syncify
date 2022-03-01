import { readConfig, ConfigLoaderError } from '@web/config-loader';
import { PartialDeep } from 'type-fest';
import { IConfig, IOptions } from 'types';

/**
 * Styles
 *
 * Applies defaults to stylesheets defined in config,
 * parses the `postcss.config.js` configuration file and
 * normalizes the configuration object.
 */
export default async function (config: PartialDeep<IConfig>, defaults: IOptions) {

  // Find postcss configuration files
  const postcssconfig = await readConfig(join(config.dirs.config, 'postcss.config'));

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
