import type { Syncify, File, ScriptTransform, ESBuildConfig, HOTSockets, ClientParam, ScriptBundle } from 'types';
import ESBuild from 'esbuild';
import { join, resolve, normalize, relative } from 'node:path';
import { has, isNil, isType } from 'rambdax';
import glob from 'fast-glob';
import { nil, keys, assign, isObject } from '~utils/native';
import { writeFile } from 'fs-extra';
import { log, error, bold } from '~log';
import { byteSize, event, byteConvert, getImport } from '~utils/utils';
import * as timer from '~utils/timer';
import { bundle, cache, minify, processor } from '~config';

/* -------------------------------------------- */
/* SCOPES                                       */
/* -------------------------------------------- */

export const paths: Set<string> = new Set();

/**
 * ESBuild Cached
 */
export const context: { [uuid: string]: ESBuild.BuildContext } = {};

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
export const module = async (options?: ScriptBundle): Promise<boolean> => {

  if (isObject(options)) {

    if (has(options.uuid, context)) {

      await context[options.uuid].dispose();

      if (bundle.minify.script === true) {
        assign(options.esbuild, minify.script, { sourcemap: false });
      }

    }

    context[options.uuid] = await esbuild.context(options.esbuild as ESBuildConfig);

  } else {

    esbuild = getImport('esbuild');

    if (isNil(esbuild)) {
      esbuild = null;
      return false;
    }

    return true;

  }
};

/* -------------------------------------------- */
/* PLUGINS                                      */
/* -------------------------------------------- */

/**
 * Syncify Paths ~ ESBuild Plugin
 *
 * This is an internal plugin for usage with ESBuild that applies
 * alias path resolutions when `paths` are defined in a `tsconfig.json`
 * or `jsconfig.json` file.
 *
 * > ESBuild supports this capability natively but seems to have issues.
 * This plugin ensures resolution is applied.
 */
export function pluginPaths (transform?: ScriptTransform): ESBuild.Plugin {

  const { compilerOptions } = processor.esbuild.tsconfig;

  if (!has('paths', compilerOptions)) return;

  const aliases = keys(compilerOptions.paths);
  const filter = new RegExp(`^(${aliases.join('|')})`);

  return {
    name: 'syncify-paths',
    setup (build) {

      build.onResolve({ filter }, function (args) {

        const alias = aliases.find(p => new RegExp(`^${p}`).test(args.path));
        const [ dir ] = alias.split('*');

        let file = args.path.replace(dir, nil);

        if (file === args.path) file = nil;

        for (const dir of compilerOptions.paths[alias]) {

          const uri = normalize(resolve(bundle.cwd, dir).replace('*', file));

          if (!uri.endsWith('*')) {

            if (!paths.has(args.path)) {
              if (!processor.esbuild.loaded) {
                transform.watch.push(uri);
              } else {
                event.emit('script:watch', args.path);
              }
            }

            return { path: uri };

          }

          let [ path ] = glob.sync(`${uri}.*`);

          if (!path) {
            const [ fileidx ] = glob.sync(`${uri}/index.*`);
            path = fileidx;
          }

          if (path) return { path };
        }

        return { path: args.path };

      });
    }
  };

};

/**
 * Syncify Watch ~ ESBuild Plugin
 *
 * This is an internal plugin for usage with ESBuild that keeps track
 * of entry points (imports) which are added to the chokidar watch
 * instances.
 */
export function pluginWatch (transform?: ScriptTransform): ESBuild.Plugin {

  const dirs: Set<string> = new Set();

  return {
    name: 'syncify-watch',
    setup (build) {

      build.onResolve({ filter: /.*/ }, (args: ESBuild.OnResolveArgs) => {

        if (!/node_modules/.test(args.importer) && /^[./]/.test(args.path)) {

          if (dirs.has(args.resolveDir)) return undefined;

          if (args.importer !== nil) {

            dirs.add(args.resolveDir);

            const files = glob.sync(join(args.resolveDir, '*'), { cwd: bundle.cwd });

            for (const path of files) {
              if (!paths.has(path) && !path.endsWith('.liquid')) {

                paths.add(path);

                if (processor.esbuild.loaded === false) {
                  transform.watch.push(path);
                } else {
                  event.emit('script:watch', path);
                }
              }
            }
          } else {

            // Entry Points
            if (!paths.has(args.path)) {
              if (!processor.esbuild.loaded) {
                transform.watch.push(args.path);
              } else {
                event.emit('script:watch', args.path);
              }
            }
          }
        }

        return undefined;

      });
    }
  };
};

export const createSnippet = (string: string) => '<script>' + string + '</script>';

async function handler<T extends ScriptBundle> (
  output: ESBuild.OutputFile[],
  file: File<T>,
  request: ClientParam<T>,
  hook: Syncify
) {

  const option = file.config;
  const config = option.esbuild as ESBuildConfig;

  for (const { text, path } of output) {

    if (/\.map$/.test(path)) {

      const map = join(cache.script.uri, file.base);

      writeFile(map, text).catch(
        error.write('Error writing JavaScript Source Map to cache', {
          file: relative(bundle.cwd, map),
          source: file.relative
        })
      );

    } else {

      if (bundle.mode.watch) {
        log.process(bold('ESBuild'), timer.stop());
      }

      log.transform(`${bold(config.format.toUpperCase())} bundle → ${bold(byteConvert(byteSize(text)))}`);

      let data: string;

      if (option.snippet) {

        data = createSnippet(text);

        if (isType('Function', hook)) {

          const update = hook.apply({ ...file }, data);

          if (update === false) {
            log.external('cancelled');
            continue;
          } else if (isType('String', update)) {
            log.external('augment');
            data = update;
          } else if (Buffer.isBuffer(update)) {
            log.external('augment');
            data = update.toString();
          }

        }

        await writeFile(file.output, data).catch(
          error.write('Error writing inline <script> snippet', {
            file: file.relative
          })
        );

        log.transform(`exported as ${bold('snippet')}`);

        if (!bundle.mode.build) {
          if (bundle.mode.hot) {
            request('put', file, data);
          } else {
            await request('put', file, data);
          }
        }

      } else {

        data = text;

        if (isType('Function', hook)) {

          const update = hook.apply({ ...file }, text);

          if (update === false) {
            log.external('cancelled');
            continue;
          } else if (isType('String', update)) {
            log.external('augment');
            data = update;
          } else if (Buffer.isBuffer(update)) {
            log.external('augment');
            data = update.toString();
          }

        }

        await writeFile(file.output, text).catch(
          error.write('Error writing JavaScript asset', {
            file: file.relative
          })
        );

        if (!bundle.mode.build) {
          if (bundle.mode.hot) {
            request('put', file, text);
          } else {
            await request('put', file, text);
          }
        }
      }

    }
  }

}

/**
 * TypeScript/JavaScript compile
 *
 * Used for Script transformations.
 */
export async function compile <T extends ScriptBundle> (
  this: HOTSockets,
  file: File<T>,
  request: ClientParam<T>,
  hook: Syncify
): Promise<void> {

  if (bundle.mode.watch) timer.start();

  console.log(file, context);
  try {

    const result = await context[file.config.uuid].rebuild();

    await handler(result.outputFiles, file, request, hook);

    if (bundle.mode.hot) {
      log.syncing(file.key);
      this.script(file.key);
    }

  } catch (error) {

    log.invalid(file.relative);

    if (has('errors', error)) {
      for (const e of error.errors as ESBuild.BuildResult['errors']) {
        error.esbuild(e);
      }
    }

    return null;

  }

};
