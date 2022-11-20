import type { Syncify, File, ScriptTransform, ESBuildConfig, Methods } from 'types';
import type ESBuild from 'esbuild';
import { join, resolve, normalize, relative } from 'node:path';
import { has, isNil } from 'rambdax';
import glob from 'fast-glob';
import { nil, keys, assign } from '~utils/native';
import { writeFile } from 'fs-extra';
import { log, error, bold } from '~log';
import { byteSize, event, byteConvert } from '~utils/utils';
import * as timer from '~utils/timer';
import { bundle, cache, minify, processor } from '~config';

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

/**
 * TypeScript/JavaScript compile
 *
 * Used for Script transformations.
 */
export async function compile (
  file: File<ScriptTransform>,
  request: (
    method: Methods,
    file: File<ScriptTransform>,
    content?: any
  ) => Promise<any[]>,
  wss: {
    script: (src: string) => boolean;
    stylesheet: (href: string) => boolean;
    section: (id: string) => boolean;
    svg: (id: string) => boolean;
    assets: () => boolean;
    reload: () => boolean;
    replace: () => boolean;
  },
  _cb: Syncify
) {

  if (bundle.mode.watch) timer.start();

  const options = file.config;

  if (bundle.minify.script === true) assign(options.esbuild, minify.script, { sourcemap: false });

  try {

    const compile = await esbuild.build(options.esbuild as ESBuildConfig);

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

        if (bundle.mode.watch) log.process(bold('ESBuild'), timer.stop());

        const { format } = options.esbuild as any;

        log.transform(`${bold(format.toUpperCase())} bundle → ${bold(byteConvert(byteSize(text)))}`);

        if (options.snippet) {

          const snippet = createSnippet(text);

          await writeFile(file.output, snippet).catch(
            error.write('Error writing inline <script> snippet', {
              file: file.relative
            })
          );

          if (!bundle.mode.build) {
            await request('put', file, createSnippet(text));
          }

          log.transform(`exported as ${bold('snippet')}`);

        } else {

          await writeFile(file.output, text).catch(
            error.write('Error writing JavaScript asset', {
              file: file.relative
            })
          );

          if (!bundle.mode.build) {
            await request('put', file, text);
          }
        }

      }
    }

    if (bundle.mode.hot) wss.script(file.key);

  } catch (err) {

    log.invalid(file.relative);

    if (has('errors', err)) {
      for (const e of err.errors as ESBuild.BuildResult['errors']) {
        error.esbuild(e);
      }
    }

    return null;

  }

};
