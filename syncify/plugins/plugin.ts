import type { Syncify, Config, ESBuildConfig, ScriptBundle, ScriptTransform, WatchBundle, PluginHooks, File, ClientParam } from 'types';
import { join, relative } from 'node:path';
import anymatch from 'anymatch';
import merge from 'mergerino';
import { has, isEmpty, isNil, omit, isType } from 'rambdax';
import { isArray, isBoolean, uuid, pNext, getImport, getSizeStr, byteSize, fileSize, isBuffer } from 'syncify:utils';
import { getModules, readConfigFile, getResolvedPaths, getTransform, renameFile } from 'syncify:utils/options';
import { warnOption, missingDependency, invalidError, typeError, throwError } from 'syncify:log/throws';
import { writeFile } from 'fs-extra';
import ESBuild, { Metafile } from 'esbuild';
import { timer } from 'syncify:timer';
import { bold } from 'syncify:cli/tree';
import { log, error, warn } from 'syncify:log';
import { $ } from 'syncify:state';

/**
 * ESBuild Instance
 */
export let esbuild: typeof ESBuild = null;

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Load ESBuild
 *
 * Dynamically imports ESBuild and assigns the module to
 * letting `esbuild`. This allows users to optionally include
 * modules in the build.
 */
export function esbuildModule (): boolean {

  esbuild = getImport('esbuild');

  if (isNil(esbuild)) {
    esbuild = null;
    return false;
  }

  return true;

};

/**
 * ESBuild Metafile
 *
 * A sub-build process used at runtime to collect all import paths.
 */
export async function esbuildBundle (config: ScriptBundle): Promise<void> {

  if ($.processor.esbuild.loaded) config.watch.clear();

  const result = await esbuild.build(config.esbuild);

  if ($.mode.terse && $.mode.build) {
    config.size = byteSize(result.outputFiles[0].text);
  }

  if ($.mode.watch) {
    getWatchPaths(config, result.metafile.inputs);
  } else {
    if (!config.watch.has(config.input)) config.watch.add(config.input);
    if (!$.watch.has(config.input)) $.watch.add(config.input);
  }
}

async function getWatchPaths (config: ScriptBundle, inputs: Metafile['inputs']) {

  const store: string[] = [];
  const { cwd, watch, mode } = $;

  for (const file in inputs) {

    if (file.indexOf('/node_modules/') > -1) continue;

    const path = join(cwd, file);

    if (!config.watch.has(path)) config.watch.add(path);
    if (!watch.has(path)) watch.add(path);
    if (mode.watch) store.push(path);

  }

  if (mode.watch && $.processor.esbuild.loaded) {

    // Ensure that watched files of imported are aligned
    // we execute this check in the next event loop to ensure
    // that it does not impact performance.
    await pNext().then(() => {

      for (const path of config.watch) {

        if (path.indexOf('/node_modules/') > -1) continue;
        if (config.watchCustom !== null && config.watchCustom(path)) continue;

        if (!has(path.slice(cwd.length + 1), inputs)) {
          config.watch.delete(path);
          (watch as WatchBundle).unwatch(path);
        }

      }

    });

  }
}

export function createSnippet (string: string) {

  return '<script>' + string + '</script>';

};

function runHook (hook: Syncify) {

  if (!isType('Function', hook)) return false;

  return function (file: File, content: string) {

    const update = hook.apply({ ...file }, content);

    if (update === false) {
      log.external('cancelled');
      return null;
    }

    if (isType('String', update)) {
      log.external('augment');
      return update;
    }

    if (isBuffer(update)) {
      log.external('augment');
      return update.toString();
    }

    return content;

  };

};

/**
 * TypeScript/JavaScript compile
 *
 * Used for Script transformations.
 */
export async function compile <
  T extends ScriptBundle
> (
  file: File<T[]>,
  sync: ClientParam<T>,
  hooks: Syncify
): Promise<void> {

  if (!file.data) return;
  if ($.mode.watch) timer.start();

  const hook = runHook(hooks);
  const { errors, wss, mode, cwd } = $;
  const trigger = file.data.length;
  const req: Promise<void>[] = [];

  for (const config of file.data) {

    const {
      key,
      input,
      output,
      snippet,
      esbuild: { format } } = config;

    try {

      const { metafile, outputFiles, warnings } = await esbuild.build(config.esbuild);

      if (trigger > 1) {
        log.nwl();
        log.importer(relative(cwd, input));
      }

      if (mode.watch) {
        await getWatchPaths(config, metafile.inputs);
      }

      if (warnings.length > 0) {
        warn.esbuild(warnings);
      }

      for (const { text, path } of outputFiles) {

        if (path.endsWith('.map')) {

          const map = join($.cache.sourcemaps.script, file.base + '.map');

          writeFile(map, text).catch(
            error.write('Error writing JavaScript Source Map to cache', {
              file: relative(cwd, map),
              source: file.relative
            })
          );

        } else {

          if (mode.terse) {
            const { before, after, saved } = fileSize(text, config.size);
            log.transform(`${bold(format.toUpperCase())} bundle`);
            log.minified(null, before, after, saved);
          } else {
            log.transform(`${bold(format.toUpperCase())} bundle → ${bold(getSizeStr(text))}`);
          }

          let content: string;

          if (snippet) {

            content = createSnippet(text);

            if (hook) {
              content = hook(file, content);
              if (content === null) continue;
            }

            await writeFile(output, content).catch(
              error.write('Error writing inline <script> snippet', {
                file: file.relative
              })
            );

            log.transform(`exported as ${bold('snippet')}`);

          } else {

            content = text;

            if (hook) {
              content = hook(file, content);
              if (content === null) continue;
            }

            await writeFile(output, content).catch(
              error.write('Error writing JavaScript asset', {
                file: file.relative
              })
            );

          }

          if (mode.hot) {

            log.syncing(key, true);
            wss.script(key);
            req.push(sync('put', config as any, content));

          } else {
            if (!mode.build) {
              log.syncing(key);
              req.push(sync('put', config as any, content));
            }
          }

        }

      };

    } catch (e) {

      if (has('errors', e)) {

        log.invalid(file.relative);
        errors.add(input);
        e.errors.forEach(error.esbuild);

      }

    }

  }

  if (trigger > 1) log.nwl();

  await Promise.all(req);

};

/**
 * Script Transform
 *
 * Normalizes and generates the configuration model which will
 * be used for script transformations using ESBuild.
 */
export async function setScriptOptions (config: Config) {

  if (!has('script', config.transform)) return;
  if (config.transform.script === false) return;

  const warn = warnOption('script transform option');

  const { esbuild } = $.processor;
  const { script } = config.transform;

  esbuild.installed = getModules($.pkg, 'esbuild');

  if (esbuild.installed) {

    const loaded = esbuildModule();

    if (!loaded) {
      throwError('failed to import ESBuild', [
        'Ensure you have installed esbuild'
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
  if (has('entryPoints', esbuild.config)) {
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

  if (!has('absWorkingDir', esbuild.config)) {
    esbuild.config.absWorkingDir = $.cwd;
  }

  for (const transform of transforms) {

    const { snippet } = transform;

    /**
     * The Shopify request key directory
     */
    const keyDir = snippet ? 'snippets' : 'assets';

    /**
     * Rename file
     */
    const { name } = renameFile(transform.input as string, transform.rename); // Rename file

    let rename: string;

    if (!name.endsWith('.js') && !name.endsWith('.mjs')) {
      rename = name + '.js';
    } else if (name.endsWith('.cjs')) {
      invalidError('rename', 'file extension', name, '.js | .mjs');
    } else {
      rename = name;
    }

    if (snippet && !/\.liquid$/.test(rename)) rename = rename + '.liquid';

    /**
     * The script bundle to be added to the `bundle` model
     */
    const scriptBundle: ScriptBundle = {
      uuid: uuid(),
      snippet,
      input: transform.input as string,
      output: join($.dirs.output, keyDir, rename),
      key: join(keyDir, rename),
      namespace: transform.snippet ? 'snippets' : 'assets',
      size: NaN,
      watch: null,
      watchCustom: null,
      esbuild: null
    };

    esbuild.config.outfile = scriptBundle.output;

    if ($.mode.watch) {
      ($.watch as WatchBundle).unwatch(scriptBundle.output);
    }

    if (has('esbuild', transform)) {
      if (isBoolean(transform.esbuild) || isNil(transform.esbuild)) {

        if (isEmpty(esbuildOptions)) {
          scriptBundle.esbuild = merge<any>(esbuild.config);
        } else {
          scriptBundle.esbuild = merge(esbuild.config, esbuildOptions);
        }

      } else if (typeof transform.esbuild === 'object') {

        for (const prop in [
          'entryPoints',
          'outdir',
          'watch',
          'absWorkingDir',
          'watch',
          'write',
          'logLevel',
          'incremental'
        ]) {
          if (prop === 'entryPoints' && has(prop, transform.esbuild)) {
            warn('Option is not allowed, use Syncify "input" instead', prop);
          } else if (prop === 'outdir' && has(prop, transform.esbuild)) {
            warn('Option is not allowed, Syncify will handle output', prop);
          } else if (prop === 'watch' && has(prop, transform.esbuild)) {
            warn('Option is not allowed, declare watch using Syncify', prop);
          } else if (has(prop, transform.esbuild)) {
            warn('Option is not allowed and will be ignored', prop);
          }
        }

        if (has('plugins', transform.esbuild) && has('plugins', esbuild.config)) {
          transform.esbuild.plugins.unshift(...esbuild.config.plugins);
        }

        if (isEmpty(esbuildOptions)) {
          scriptBundle.esbuild = merge<any>(esbuild.config, transform.esbuild);
        } else {
          scriptBundle.esbuild = merge<any>(esbuild.config, transform.esbuild, esbuildOptions);
        }

      } else {
        typeError({
          option: 'script',
          name: 'esbuild',
          provided: typeof transform.esbuild,
          expects: 'boolean | null | {}'
        });
      }

    } else {
      if (isEmpty(esbuildOptions)) {
        scriptBundle.esbuild = esbuild.config as ESBuildConfig;
      } else {
        scriptBundle.esbuild = merge(esbuild.config, esbuildOptions);
      }
    }

    scriptBundle.esbuild.entryPoints = [ scriptBundle.input as string ];

    if ($.mode.watch) {

      if (!has('watch', transform)) {

        scriptBundle.watch = new Set();

      } else {

        if (!isArray(transform.watch)) {
          typeError({
            option: 'script',
            name: 'watch',
            provided: transform.watch,
            expects: 'string[]'
          });
        }

        const watchers = getResolvedPaths<string[]>(transform.watch);
        scriptBundle.watchCustom = anymatch(watchers);
        scriptBundle.watch = new Set(watchers);

      }
    } else {

      scriptBundle.watch = new Set();

    }

    try {

      await esbuildBundle(scriptBundle);

    } catch (e) {

      // TODO - HANDLE RUNTIME ERRORS
      throw new Error(e);

    }

    if ($.mode.terse) {

      // @ts-expect-error
      scriptBundle.esbuild = merge(scriptBundle.esbuild, $.terser.script, {
        exclude: undefined
      });

    }

    $.script.push(scriptBundle);

  }

  esbuild.loaded = true;

}

export default function (options: {}): PluginHooks {

  return {
    name: '',
    onInit: setScriptOptions,
    onBuild (file) {

    },
    onWatch (wss) {

    },
    onChange (file) {

    },
    onTransform (file: File) {

    },
    onReload (dom: Document) {

    }
  };
};
