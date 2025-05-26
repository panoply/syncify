import type { Processors, SASSConfig, StyleBundle, StyleTransform, TailwindConfig } from 'types';

import { extname, join, relative } from 'node:path';

import anymatch from 'anymatch';
import glob from 'fast-glob';
import { exists } from 'fs-extra';
import { $import } from 'modules';

import { throws } from '~cli/throws';
import { warnOption } from '~cli/warnings';
import { getModules, getTransform, readConfigFile, renameFileParse } from '~options/utils';
import * as u from '~utils';
import { normalPath } from '~utils/paths';

import { $ } from '$';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

// @ts-expect-error
// eslint-disable-next-line no-unused-vars
const _TERSER = {
  exclude: [],
  format: false,
  inline: false,
  purgeUnusedCSS: false,
  obfuscateAlphabet: 'abcefghijklmnopqrstuvwxyz0123456789',
  obfuscateClassNames: false,
  obfuscateWhitelist: []
};

type PostCSSProcess = Processors['postcss']
// type SassDartProcess = Processors['sass']

/**
 * Get External Modules
 *
 * Populates the processors store and determines which processor transforms should apply.
 */
async function getExternalModules () {

  await $import('postcss');
  await $import('clean-css');

  const postcss = await readConfigFile<PostCSSProcess>('postcss.config', 'PostCSS', (config) => {
    if (config !== null) {
      // TODO: Log processor config file changes
      $.processor.postcss.config = config;
    }
  });

  if (postcss !== null) {
    $.processor.postcss.file = postcss.file;
    $.processor.postcss.config = postcss.config;
  }

  $.processor.tailwind.installed = getModules($.pkg, 'tailwindcss');

  if ($.processor.tailwind.installed) {

    await $import('tailwindcss');

    const tw = await readConfigFile<TailwindConfig>('tailwind.config', 'Tailwind', (config) => {
      if (config !== null) {
        // TODO: Log processor config file changes
        $.processor.tailwind.config = config;
      }
    });

    if (tw !== null) {
      $.processor.tailwind.file = tw.file;
      $.processor.tailwind.config = tw.config;
    }

  }

}

/**
 *
 * Applies defaults to stylesheets defined in config,
 * parses the `postcss.config.js` configuration file and
 * normalizes the configuration object.
 */
export async function setStyleConfig () {

  if (!u.has('style', $.config.transform)) return;
  if (!$.config.transform.style || u.isEmpty($.config.transform.style)) return;

  await getExternalModules();

  const warn = warnOption('Style Transform');

  // Convert to an array if styles is using an object
  // configuration model, else just shortcut the options.
  const styles = getTransform <StyleTransform<string>[]>($.config.transform.style, { flatten: true });

  // Path normalizer
  const path = normalPath($.config.input);

  for (let i = 0; i < styles.length; i++) {

    const style = styles[i];
    const has = u.hasProp(style);
    const bundle = u.o<StyleBundle>();

    if (u.isUndefined(style.input)) {
      throws.option({
        option: 'transform.style',
        name: style.rename || style.input,
        expects: 'string',
        value: style.input
      });
    }

    bundle.uuid = u.uuid();
    bundle.input = style.input;
    bundle.watch = null;
    bundle.attrs = [];
    bundle.postcss = null;
    bundle.sass = /\.s[ca]ss$/.test(style.input);
    bundle.tailwind = null;

    if (has('postcss')) {

      if (u.isArray(style.postcss) && style.postcss.length > 0) {
        u.defineProperty(bundle, 'postcss', { get () { return style.postcss; } });
      } else {
        if (u.isBoolean(style.postcss) && style.postcss !== false && u.isNil(style.postcss) === false) {
          u.defineProperty(bundle, 'postcss', { get () { return u.merge($.processor.postcss.config); } });
        } else {
          throws.typeError(
            {
              option: 'style',
              name: 'postcss',
              provided: bundle.postcss,
              expects: 'boolean | []'
            }
          );
        }
      }
    } else {
      u.defineProperty(bundle, 'postcss', { get () { return u.merge($.processor.postcss.config); } });
    }

    if (has('tailwind')) {

      if (!$.processor.tailwind.installed) {
        throws.dependency([ 'tailwindcss' ]);
      }

      const override = u.isObject(style.tailwind);

      if (override || (
        u.isBoolean(style.tailwind) &&
        style.tailwind !== false &&
        u.isNil(style.tailwind) === false
      )) {

        const tw = u.merge(override ? style.tailwind as TailwindConfig : $.processor.tailwind.config);

        if (u.isArray(tw.content) && u.isEmpty(tw.content)) {
          tw.content = [
            join(
              relative($.cwd, $.dirs.input),
              '**',
              '*.{css,js,ts,jsx,tsx,vue,svelte,liquid,json,schema}'
            )
          ];
        }

        u.defineProperty(bundle, 'tailwind', { get () { return tw; } });

        if ($.mode.watch && u.isArray(bundle.tailwind.content)) {

          const files = await glob(bundle.tailwind.content as string[]);

          if ($.processor.tailwind.map === null) {
            $.processor.tailwind.map = u.o();
          }

          $.processor.tailwind.map[i] = u.s(files);

        }

      } else {

        throws.typeError(
          {
            option: 'style',
            name: 'tailwind',
            provided: bundle.tailwind,
            expects: 'boolean | {}'
          }
        );

      }

    }

    if (has('sass') && style.sass !== false) {

      if ($.processor.sass.loaded === false) {
        await $import('sass-embedded', { as: true });
        $.processor.sass.loaded = true;
      }

      const override = u.isObject(style.sass);

      if ((u.isBoolean(style.sass) || override) && u.isNil(style.sass) === false) {

        if (override === false) {

          u.defineProperty(bundle, 'sass', { get () { return style.sass; } });

        } else {

          // console.log(sass.config);
          bundle.sass = u.merge($.processor.sass.config, style.sass as SASSConfig);

          for (const option in style.sass as StyleTransform) {

            // Validate the boolean options
            if (option === 'sourcemap' || option === 'warnings' || option === 'quietDeps') {

              if (u.isBoolean(style.sass[option])) {

                bundle.sass[option] = style.sass[option];

              } else {

                throws.typeError(
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

                throws.typeError(
                  {
                    option: 'sass',
                    name: option,
                    provided: style.sass[option],
                    expects: 'string'
                  }
                );

              }

              if (style.sass[option] === 'expanded' || style.sass[option] === 'compressed') {

                bundle.sass[option] = style.sass[option];

              } else {

                throws.option(
                  {
                    option: 'sass',
                    name: option,
                    value: style.sass[option],
                    expects: 'expanded | compressed'
                  }
                );

              }

            }

          };
        }
      } else {

        throws.typeError(
          {
            option: 'style',
            name: 'sass',
            provided: style.sass,
            expects: 'boolean | {}'
          }
        );
      }

      // Warn if input is not using sass or scss extension
      if (style.snippet === false && !/\.s[ac]ss/.test(extname(bundle.input))) {
        warn('Input is not a sass file', bundle.input);
      }

    }

    // Rename file
    let rename: ReturnType<typeof renameFileParse> = renameFileParse(style.rename);

    // Package options has rename value
    if (has('rename') && u.isNil(style) === false) {

      // Ensure the rename value is a string
      if (u.isString(style.rename) === false) {
        throws.typeError(
          {
            option: 'styles',
            name: 'rename',
            provided: style.rename,
            expects: 'string'
          }
        );
      }

      rename = renameFileParse(bundle.input, style.rename);

      // Validate the file new name.
      if (/[a-zA-Z0-9_.-]+/.test(rename.name) === false) {
        throws.typeError(
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
        throws.typeError(
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
      watch.forEach(x => $.paths.assets.exclude.add(x));

      bundle.watch = anymatch(watch);

    } else {

      bundle.watch = anymatch([ bundle.input ]);

      $.paths.assets.exclude.add(bundle.input);

    }

    if (u.isObject(bundle.sass)) {

      // Include the CWD and parent directory
      bundle.sass.include.unshift($.cwd, join($.cwd, rename.dir));

      // Apply includes (for Dart SASS)
      if (u.hasPath('sass.include', style)) {
        bundle.sass.include = (style.sass as { include: string[] }).include.map(p => join($.cwd, p));
      }

    }

    if (has('snippet')) {

      if (!u.isBoolean(style.snippet)) {

        throws.typeError(
          {
            option: 'styles',
            name: 'snippet',
            provided: style.snippet,
            expects: 'boolean'
          }
        );

      }

      bundle.snippet = style.snippet;

      if (bundle.snippet === true && has('attrs') && u.isEmpty(style.attrs) === false) {

        if (u.isArray(style.attrs)) {

          for (let i = 0; i < style.attrs.length; i++) {

            const attr = style.attrs[i];

            if (u.isArray(attr)) {

              bundle.attrs.push(attr.join(''));

            } else {

              throws.typeError(
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

          throws.typeError(
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

      if (!(rename.name.endsWith('.liquid') && bundle.rename.endsWith('.liquid'))) {
        bundle.rename = rename.name + '.liquid';
      }

    } else {

      bundle.rename = rename.name;

    }

    // Final Step - Insert Build Configuration
    // This is where we populate the build
    //
    $.style.push(bundle);

  };

};
