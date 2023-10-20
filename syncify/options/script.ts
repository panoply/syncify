import type { ESBuildConfig, ScriptBundle, ScriptTransform } from 'types';
import { join } from 'pathe';
import anymatch from 'anymatch';
import merge from 'mergerino';
import { omit } from 'rambdax';
import { Namespace, Type } from 'syncify:file';
import { getModules, readConfigFile, getResolvedPaths, getTransform, renameFile } from 'syncify:utils/options';
import { esbuildModule, esbuildBundle } from 'syncify:transform/script';
import { warnOption, missingDependency, invalidError, typeError, throwError } from 'syncify:log/throws';
import * as u from 'syncify:utils';

import { $ } from 'syncify:state';

/**
 * Script Transform
 *
 * Normalizes and generates the configuration model which will
 * be used for script transformations using ESBuild.
 */
export async function setScriptOptions () {

  if (!u.has('script', $.config.transform)) return;
  if (!$.config.transform.script || u.isEmpty($.config.transform.script)) return;

  const warn = warnOption('Script Transform');

  const { esbuild } = $.processor;
  const { script } = $.config.transform;

  esbuild.installed = getModules($.pkg, 'esbuild');

  if (esbuild.installed) {

    const loaded = esbuildModule();

    if (!loaded) {
      throwError('failed to import ESBuild', [
        'Ensure you have installed esbuild in your project'
      ]);
    }

    /** External `esbuild.config.js` file  */
    const esbuildConfigFile = await readConfigFile<ESBuildConfig>('esbuild.config');

    if (esbuildConfigFile !== null) {
      esbuild.file = esbuildConfigFile.path;
      esbuild.config = merge(esbuild.config, esbuildConfigFile.config);
    }

  } else {

    missingDependency('esbuild');

  }

  // Lets ensure that no excluded esbuild options were provided
  // on the processor configuration object
  if (u.has('entryPoints', esbuild.config)) {
    warn('processor option is not allowed and was omitted', 'entryPoints');
    delete esbuild.config.entryPoints;
  }

  // Provide tsconfig raw options
  //
  // const tsconfig = await getTSConfig($.cwd);
  //
  // defineProperty(esbuild, 'tsconfig', {
  //   get () {
  //     return tsconfig;
  //   }
  // });

  const transforms = getTransform<ScriptTransform[]>(script, {
    addWatch: false,
    flatten: true
  });

  /**
   * Curry omitter for excluding all properties from
   * the `script` transform which are not esbuild related.
   * Some esbuild options are exposed per-script transform
   * for convenience sake, this fuction will retrive only this
   * which are relative to esbuild
   */
  const esbuildOptions = omit([
    'input',
    'watch',
    'rename',
    'snippet'
  ]);

  if (!u.has('absWorkingDir', esbuild.config)) {
    esbuild.config.absWorkingDir = $.cwd;
  }

  for (const script of transforms) {

    /**
     * The Shopify request key directory
     */
    const keyDir = script.snippet ? 'snippets' : 'assets';

    /**
     * Rename file
     */
    const { name } = renameFile(script.input as string, script.rename); // Rename file

    let rename: string;

    if (name.endsWith('.js') === false && name.endsWith('.mjs') === false) {

      rename = name + '.js';

    } else if (name.endsWith('.cjs')) {

      invalidError({
        option: 'transform.script',
        name: 'rename',
        value: name,
        expects: '.js | .mjs',
        reason: [
          'You cannot use cjs extensions in web environments'
        ]
      });

    } else {
      rename = name;
    }

    if (
      script.snippet === true &&
      rename.endsWith('.liquid') === false) {
      rename = rename + '.liquid';
    }

    /**
     * The script bundle to be added to the `bundle` model
     */
    const has = u.hasProp(script);
    const bundle = u.object<ScriptBundle>();

    if (script.snippet) {

      bundle.snippet = true;
      bundle.namespace = Namespace.Snippets;
      bundle.type = Type.Snippet;

      if (has('attrs') && u.isEmpty(script.attrs) === false) {
        if (u.isArray(script.attrs)) {
          for (let i = 0; i < script.attrs.length; i++) {

            const attr = script.attrs[i];

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
              provided: script.attrs,
              expects: '[ string[] ]'
            }
          );
        }
      }
    } else {
      bundle.snippet = false;
      bundle.namespace = Namespace.Assets;
      bundle.type = Type.Script;
    }

    bundle.uuid = u.uuid();
    bundle.snippet = script.snippet;
    bundle.input = script.input as string;
    bundle.output = join($.dirs.output, keyDir, rename);
    bundle.key = join(keyDir, rename);
    bundle.attrs = [];
    bundle.size = NaN;
    bundle.watch = null;
    bundle.watchCustom = null;
    bundle.esbuild = null;

    esbuild.config.outfile = bundle.output;

    if ($.mode.watch) $.watch.unwatch(bundle.output);

    if (has('esbuild')) {
      if (u.isBoolean(script.esbuild) || u.isNil(script.esbuild)) {

        if (u.isEmpty(esbuildOptions)) {
          bundle.esbuild = merge(esbuild.config);
        } else {
          bundle.esbuild = merge(esbuild.config, esbuildOptions);
        }

      } else if (u.isObject(script.esbuild)) {

        const esProp = u.hasProp<any>(script.esbuild);

        for (const prop in <string[]>[
          'entryPoints',
          'outdir',
          'watch',
          'absWorkingDir',
          'watch',
          'write',
          'logLevel',
          'incremental'
        ]) {
          if (prop === 'entryPoints' && esProp(prop)) {
            warn('Option is not allowed, use Syncify "input" instead', prop);
          } else if (prop === 'outdir' && esProp(prop)) {
            warn('Option is not allowed, Syncify will handle output', prop);
          } else if (prop === 'watch' && esProp(prop)) {
            warn('Option is not allowed, declare watch using Syncify', prop);
          } else if (esProp(prop)) {
            warn('Option is not allowed and will be ignored', prop);
          }
        }

        if (esProp('plugins') && u.has('plugins', esbuild.config)) {
          script.esbuild.plugins.unshift(...esbuild.config.plugins);
        }

        if (u.isEmpty(esbuildOptions)) {
          bundle.esbuild = merge(esbuild.config, script.esbuild);
        } else {
          bundle.esbuild = merge(esbuild.config, script.esbuild, esbuildOptions);
        }

      } else {
        typeError({
          option: 'script',
          name: 'esbuild',
          provided: typeof script.esbuild,
          expects: 'boolean | null | {}'
        });
      }

    } else {
      if (u.isEmpty(esbuildOptions)) {
        bundle.esbuild = esbuild.config as ESBuildConfig;
      } else {
        bundle.esbuild = merge(esbuild.config, esbuildOptions);
      }
    }

    bundle.esbuild.entryPoints = [ bundle.input as string ];

    if ($.mode.watch) {

      if (!has('watch')) {

        bundle.watch = new Set();

      } else {

        if (!u.isArray(script.watch)) {
          typeError({
            option: 'script',
            name: 'watch',
            provided: script.watch,
            expects: 'string[]'
          });
        }

        const watchers = getResolvedPaths<string[]>(script.watch);
        bundle.watchCustom = anymatch(watchers);
        bundle.watch = new Set(watchers);

      }

    } else {

      bundle.watch = new Set();

    }

    try {

      await esbuildBundle(bundle);

    } catch (e) {

      // TODO - HANDLE RUNTIME ERRORS
      throw new Error(e);

    }

    if ($.mode.terse) {
      bundle.esbuild = merge<any>(bundle.esbuild, $.terser.script, { exclude: undefined });
    }

    $.script.push(bundle);

  }

  esbuild.loaded = true;

}
