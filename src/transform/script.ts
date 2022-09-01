import type { Syncify, File, ScriptTransform, ESBuildConfig } from 'types';
import type ESBuild from 'esbuild';
import { join, resolve, normalize, relative } from 'node:path';
import { has, isNil } from 'rambdax';
import glob from 'glob';
import { isString, nil, keys } from '~utils/native';
import { writeFile } from 'fs-extra';
import { log, error, bold } from '~log';
import { parentPath } from '~utils/paths';
import { byteSize, event, byteConvert } from '~utils/utils';
import * as timer from '~utils/timer';
import { bundle, cache, processor } from '~config';

/* -------------------------------------------- */
/* SCOPES                                       */
/* -------------------------------------------- */

export const paths: Set<string> = new Set();

/**
 * ESBuild Module
 */
export let esbuild: typeof ESBuild = null;

/**
 * Load ESBuild
 *
 * Dynamically imports ESBuild and assigns the module to
 * letting `esbuild`. This allows users to optionally include
 * modules in the build.
 */
export async function load () {

  esbuild = await import('esbuild');

  return isNil(esbuild) === false;

}

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

  return {
    name: 'syncify-watch',
    setup (build) {

      build.onStart(() => timer.start());
      build.onResolve({ filter: /.*/ }, (args) => {

        if (!/node_modules/.test(args.importer)) {

          // console.log(args);

          if (/^[./]/.test(args.path)) {
            if (args.importer !== nil) {

              const [ path ] = glob.sync(join(parentPath(args.importer), args.path + '.*'));

              if (isString(path) && !paths.has(path)) {
                if (!processor.esbuild.loaded) {
                  transform.watch.push(path);
                } else {
                  event.emit('script:watch', path);
                }
              }
            } else {
              if (!paths.has(args.path)) {
                if (!processor.esbuild.loaded) {
                  transform.watch.push(args.path);
                } else {
                  event.emit('script:watch', args.path);
                }
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

/**
 * TypeScript/JavaScript compile
 *
 * Used for Script transformations.
 */
export async function script (file: File<ScriptTransform>, request: any, cb: Syncify) {

  timer.start();

  const { config } = file;

  try {

    const compile = await esbuild.build(file.config.esbuild as ESBuildConfig);

    for (const { text, path } of compile.outputFiles) {

      if (/\.map$/.test(path)) {

        const map = join(cache.script.uri, file.base);

        writeFile(join(cache.script.uri, file.base), text).catch(
          error.write('Error writing JavaScript Source Map file to the cache directory', {
            file: relative(bundle.cwd, map),
            source: file.relative
          })
        );

      } else {

        log.process(bold('ESBuild'), timer.stop());

        const { format } = file.config.esbuild as any;

        log.transform(`${bold(format.toUpperCase())} bundle → ${bold(byteConvert(byteSize(text)))}`);

        if (config.snippet) {

          await writeFile(file.output, createSnippet(text)).catch(
            error.write('Error writing inline <script> snippet', {
              file: file.relative
            })
          );

          log.transform(`exported as ${bold('snippet')}`);

        } else {

          await writeFile(file.output, text).catch(
            error.write('Error writing JavaScript asset', {
              file: file.relative
            })
          );

          if (!bundle.mode.build) {
            await request('put', file, file.output);
          }
        }

      }
    }

    if (compile.outputFiles.length === 1) {
      const out = compile.outputFiles.pop();
      return out.text;
    }
  } catch (err) {

    log.invalid(file.relative);

    for (const e of err.errors as ESBuild.BuildResult['errors']) error.esbuild(e);

    return null;

  }

};
