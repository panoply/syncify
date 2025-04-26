import type { ScriptBundle, ScriptTransform } from 'types';

import { join } from 'node:path';

import anymatch from 'anymatch';

import { throws } from '~cli/throws';
import { warnOption } from '~cli/warnings';
import { Namespace, Type } from '~file';
import { getResolvedPaths, getTransform, renameFileParse } from '~options/utils';
import { esbuildBundle } from '~transform/script';
import * as u from '~utils';

import { $ } from '$';

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

  // Lets ensure that no excluded esbuild options were provided
  // on the processor configuration object
  if (u.has('entryPoints', $.processor.esbuild)) {

    warn('processor option is not allowed and was omitted', 'entryPoints');
    delete $.processor.esbuild.entryPoints;

  }

  const transforms = getTransform<ScriptTransform[]>($.config.transform.script, { flatten: true });

  if (!u.has('absWorkingDir', $.processor.esbuild)) {

    $.processor.esbuild.absWorkingDir = $.cwd;

  }

  for (const script of transforms) {

    /**
     * The Shopify request key directory
     */
    const keyDir = script.snippet ? 'snippets' : 'assets';

    /**
     * Rename file
     */
    const { name } = renameFileParse(script.input as string, script.rename); // Rename file

    let rename: string;

    if (!name.endsWith('.js') && !name.endsWith('.mjs')) {

      rename = name + '.js';

    } else if (name.endsWith('.cjs')) {

      throws.option({
        option: 'transform.script',
        name: 'rename',
        value: name,
        expects: '.js | .mjs',
        reason: [
          'You cannot use cjs extensions in Shopify themes.',
          'The .cjs extension is for Node, themes are a web environment. '
        ]
      });

    } else {

      rename = name;

    }

    /**
     * The script bundle to be added to the `bundle` model
     */
    const has = u.hasProp(script);
    const bundle = u.o<ScriptBundle>();

    if (script.snippet) {

      if (!rename.endsWith('.liquid')) rename = rename + '.liquid';

      bundle.attrs = [];
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

              throws.typeError(
                {
                  option: 'transform.script',
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
              option: 'transform.script',
              name: 'attrs',
              provided: script.attrs,
              expects: '[ [ name: string, value: string ] ]'
            }
          );
        }
      }
    } else {

      bundle.attrs = [];
      bundle.snippet = false;
      bundle.namespace = Namespace.Assets;
      bundle.type = Type.Script;

    }

    bundle.uuid = u.uuid();
    bundle.snippet = script.snippet;
    bundle.input = script.input as string;
    bundle.output = join($.dirs.output, keyDir, rename);
    bundle.key = join(keyDir, rename);
    bundle.size = NaN;
    bundle.watch = null;
    bundle.watchCustom = null;
    bundle.esbuild = null;

    $.processor.esbuild.outfile = bundle.output;

    // if ($.mode.watch) $.watch.unwatch(bundle.output);

    if (has('esbuild')) {
      if (u.isBoolean(script.esbuild) || u.isNil(script.esbuild)) {

        bundle.esbuild = u.merge<any>($.processor.esbuild);

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
            warn('Option is not allowed, Syncify will handle output location', prop);
          } else if (prop === 'watch' && esProp(prop)) {
            warn('Option is not allowed, declare watch paths using Syncify', prop);
          } else if (esProp(prop)) {
            warn('Option is not allowed and will be ignored', prop);
          }
        }

        if (esProp('plugins') && u.has('plugins', $.processor.esbuild)) {
          script.esbuild.plugins.unshift(...$.processor.esbuild.plugins);
        }

        bundle.esbuild = u.merge<any>($.processor.esbuild, script.esbuild);

      } else {
        throws.typeError({
          option: 'script',
          name: 'esbuild',
          provided: typeof script.esbuild,
          expects: 'boolean | null | {}'
        });
      }

    } else {

      bundle.esbuild = u.merge<any>($.processor.esbuild);

    }

    bundle.esbuild.entryPoints = [ bundle.input ];

    if ($.mode.watch) {

      if (!has('watch')) {

        bundle.watch = u.s();

      } else {

        if (!u.isArray(script.watch)) {
          throws.typeError({
            option: 'script',
            name: 'watch',
            provided: script.watch,
            expects: 'string[]'
          });
        }

        const watchers = getResolvedPaths<string[]>(script.watch);

        bundle.watchCustom = anymatch(watchers);
        bundle.watch = u.s(watchers);

      }

    } else {

      bundle.watch = u.s();

    }

    try {

      await esbuildBundle(bundle);

    } catch (err) {

      throws.runtime(err, {
        message: [
          'Syncify has failed to initialize due to a script transform prebuild error.',
          'Script transforms execute at runtime builds but the compile process did not complete.',
          'This error may have been thrown because of an early process exit and be unrelated to',
          'your script transforms.'
        ],
        solution: [
          'You may need to correct the error encountered. It is unclear why the error was thrown',
          'so consult the message response and act accordingly.'
        ],
        entries: {
          processor: 'ESBuild'
        }
      });

    }

    if ($.mode.terse) {

      bundle.esbuild = u.merge<any>(bundle.esbuild, {
        exclude: undefined
      });

    }

    $.script.push(bundle);

  }

}
