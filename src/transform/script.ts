import type { Syncify, File, HOTSockets, ClientParam, ScriptBundle } from 'types';
import ESBuild from 'esbuild';
import { join, relative } from 'node:path';
import { has, isNil, isType } from 'rambdax';
import { keys } from '~utils/native';
import { writeFile } from 'fs-extra';
import { log, error, bold } from '~log';
import { debouncePromise, getImport, getSizeStr } from '~utils/utils';
import * as timer from '~utils/timer';
import { bundle, cache, processor } from '~config';

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
export async function esbuildBundle (options: ScriptBundle): Promise<void> {

  if (processor.esbuild.loaded) options.watch.clear();

  const result = await esbuild.build(options.esbuild);

  if (result.metafile) {
    for (const file of keys(result.metafile.inputs)) {
      if (!/node_modules/.test(file)) {

        const path = join(bundle.cwd, file);

        options.watch.add(path);

        console.log(path);

        if (!bundle.watch.has(path)) bundle.watch.add(path);

      }
    }
  }
}

export function createSnippet (string: string) {

  return '<script>' + string + '</script>';

};

/**
 * TypeScript/JavaScript compile
 *
 * Used for Script transformations.
 */
export async function compile <T extends ScriptBundle> (
  this: HOTSockets,
  file: File<T[]>,
  sync: ClientParam<T>,
  hook: Syncify
): Promise<void> {

  if (bundle.mode.watch) timer.start();

  const trigger = file.config.length;
  const request: Promise<void | any[]>[] = [];

  if (!file.config) return;

  await build();

  async function build () {

    for (let i = 0, l = file.config.length; i < l; i++) {

      const config = file.config[i];

      try {

        if (trigger > 1) {
          log.nwl();
          log.importer(relative(bundle.cwd, config.input));
        }

        const result = await esbuild.build(config.esbuild);

        for (const file of keys(result.metafile.inputs).filter(file => !/node_modules/.test(file))) {
          const path = join(bundle.cwd, file);
          config.watch.add(path);
          bundle.watch.add(path);
        }

        await handle(result.outputFiles, config);

        log.process(bold('ESBuild'), timer.now());

        if (bundle.mode.hot) {
          log.syncing(config.key);
          this.script(config.key);
        }

      } catch (e) {

        log.invalid(file.relative);

        if (has('errors', e)) {

          bundle.errors.add(config.input);

          e.errors.forEach(error.esbuild);

        }

      }

    }

    if (trigger > 1) log.nwl();

    return Promise.all(request);

  }

  async function handle (output: ESBuild.OutputFile[], config: ScriptBundle) {

    const esb = config.esbuild;

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

        log.transform(`${bold(esb.format.toUpperCase())} bundle → ${bold(getSizeStr(text))}`);

        let data: string;

        if (config.snippet) {

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

          await writeFile(config.output, data).catch(
            error.write('Error writing inline <script> snippet', {
              file: file.relative
            })
          );

          log.exported(config.key);

          if (!bundle.mode.build) {
            if (bundle.mode.hot) {
              sync('put', config as any, data);
            } else {
              request.push(sync('put', config as any, data));
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

          await writeFile(config.output, text).catch(
            error.write('Error writing JavaScript asset', {
              file: file.relative
            })
          );

          if (!bundle.mode.build) {
            if (bundle.mode.hot) {
              sync('put', config as any, text);
            } else {
              request.push(sync('put', config as any, text));
            }
          }
        }

      }
    }

  }

};
