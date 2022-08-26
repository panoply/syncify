import type { Syncify, File, ScriptTransform, ESBuildConfig } from 'types';
import type { Plugin, BuildResult, build } from 'esbuild';
import { join, resolve, normalize } from 'node:path';
import { has } from 'rambdax';
import { isString, nil, keys } from '../shared/native';
import { writeFile } from 'fs-extra';
import { bundle, cache, processor } from '../options';
import { log, c } from '../logger';
import { parentPath } from '../shared/paths';
import { byteSize, event, byteConvert } from '../shared/utils';
import glob from 'glob';
import * as timer from '../process/timer';

export const paths: Set<string> = new Set();

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
export function pluginPaths (transform?: ScriptTransform): Plugin {

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
export function pluginWatch (transform?: ScriptTransform): Plugin {

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

let esbuild: typeof build;

export async function runtime (options: ESBuildConfig) {

  const { build } = await import('esbuild');

  esbuild = build;

  return build(options);

}

export const createSnippet = (string: string) => '<script>' + string + '</script>';

/**
 * TypeScript/JavaScript compile
 *
 * Used for Script transformations.
 */
export async function script (file: File<ScriptTransform>, cb: Syncify) {

  timer.start();

  const { config } = file;

  try {

    const compile = await esbuild(file.config.esbuild as ESBuildConfig);

    for (const { text, path } of compile.outputFiles) {

      if (/\.map$/.test(path)) {

        writeFile(join(cache.script.uri, file.base), text);

      } else {

        log.process(`${c.bold('ESBuild')}`, timer.stop());

        const { format } = file.config.esbuild as any;

        log.transform(`created ${c.bold(format.toUpperCase())} bundle → ${c.bold(byteConvert(byteSize(text)))}`);

        if (config.snippet) {
          await writeFile(file.output, createSnippet(text));
          log.transform(`exported as ${c.bold('snippet')}`);
        } else {
          await writeFile(file.output, text);
        }

      }
    }

  } catch (e) {

    for (const { text, location } of e.errors as BuildResult['errors']) {
      log.error(text, file);
      log.info(c.redBright(`Line ${location.line} in ${c.bold(location.file)}`));
    }

    return null;

  }

};
