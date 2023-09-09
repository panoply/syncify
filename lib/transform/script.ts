import type { Syncify, File, ClientParam, ScriptBundle, WatchBundle } from 'types';
import { writeFile } from 'fs-extra';
import ESBuild, { Metafile } from 'esbuild';
import { join, relative } from 'pathe';
import { has, isNil, isType } from 'rambdax';
import { timer } from 'syncify:timer';
import { bold } from 'syncify:ansi';
import { log, error, warn } from 'syncify:log';
import { pNext, getImport, getSizeStr, byteSize, fileSize, isBuffer } from 'syncify:utils';
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
export async function compile <T extends ScriptBundle> (
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
