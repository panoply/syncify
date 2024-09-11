import type { Syncify, ClientParam, ScriptBundle } from 'types';
import { writeFile } from 'fs-extra';
import esbuild, { Metafile } from 'esbuild';
import { join, relative } from 'node:path';
import { isType } from 'rambdax';
import { File } from 'syncify:file';
import { timer } from 'syncify:timer';
import { bold } from '@syncify/ansi';
import * as log from 'syncify:log';
import * as error from 'syncify:errors';
import * as warn from 'syncify:log/warnings';
import { stringSize, byteSize, sizeDiff } from 'syncify:sizes';
import { pNext, isBuffer, has } from 'syncify:utils';
import { $ } from 'syncify:state';

/**
 * ESBuild Metafile
 *
 * A sub-build process used at runtime to collect all import paths.
 */
export async function esbuildBundle (bundle: ScriptBundle): Promise<void> {

  bundle.watch.clear();

  const result = await esbuild.build(bundle.esbuild);

  if ($.mode.terse && $.mode.build) {
    bundle.size = byteSize(result.outputFiles[0].text);
  }

  if ($.mode.watch) {
    await getWatchPaths(bundle, result.metafile.inputs);
  } else {
    if (!bundle.watch.has(bundle.input)) bundle.watch.add(bundle.input);
    if (!$.watch.has(bundle.input)) $.watch.add(bundle.input);
  }
}

async function getWatchPaths (bundle: ScriptBundle, inputs: Metafile['inputs']) {

  const store: string[] = [];
  const { cwd, watch, mode } = $;

  for (const file in inputs) {

    if (file.indexOf('/node_modules/') > -1) continue;

    const path = join(cwd, file);

    if (!bundle.watch.has(path)) bundle.watch.add(path);
    if (!watch.has(path)) watch.add(path);
    if (mode.watch) store.push(path);

  }

  if (mode.watch) {

    // Ensure that watched files of importes are aligned.
    // We execute this check in the next event loop to ensure
    // that it does not impact performance.
    await pNext().then(() => {

      for (const path of bundle.watch) {

        if (path.indexOf('/node_modules/') > -1) continue;
        if (bundle.watchCustom !== null && bundle.watchCustom(path)) continue;

        if (!has(path.slice(cwd.length + 1), inputs)) {
          bundle.watch.delete(path);
          watch.unwatch(path);
        }

      }

    });

  }
}

export function createSnippet (string: string, attrs: string[]) {

  return attrs.length > 0
    ? `<script ${attrs.join(' ')}>${string}</script>`
    : `<script>${string}</script>`;

};

function runHook (hook: Syncify) {

  if (!isType('Function', hook)) return false;

  return function (file: File, content: string) {

    const update = hook.apply({ ...file }, content);

    if (update === false) {
      log.write('cancelled');
      return null;
    }

    if (isType('String', update)) {
      log.write('augment');
      return update;
    }

    if (isBuffer(update)) {
      log.write('augment');
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
export async function compile <T extends ScriptBundle> (file: File<T[]>, sync: ClientParam<T>, hooks: Syncify) {

  if (!file.data) return;

  if ($.mode.watch) timer.start();
  if ($.mode.hot) timer.start(file.uuid);

  const hook = runHook(hooks);
  const trigger = file.data.length;

  for (const bundle of file.data) {

    const {
      key,
      input,
      output,
      snippet,
      attrs,
      esbuild: { format } } = bundle;

    try {

      const { metafile, outputFiles, warnings } = await esbuild.build(bundle.esbuild);

      if (trigger > 1) {
        log.nwl();
        log.write(relative($.cwd, input));
      }

      if ($.mode.watch) {
        await getWatchPaths(bundle, metafile.inputs);
      }

      if (warnings.length > 0) warn.esbuild(warnings);

      for (const { text, path } of outputFiles) {

        if (path.endsWith('.map')) {

          const map = join($.dirs.sourcemaps.scripts, `${file.base}.map`);

          writeFile(map, text).catch(error.write('Error writing JavaScript Source Map to cache', {
            file: relative($.cwd, map),
            source: file.relative
          }));

        } else {

          if ($.mode.terse) {

            if (isNaN(bundle.size)) {

              log.transform(file.kind, `${bold(format.toUpperCase())} bundle`);
              log.minified(stringSize(text));

            } else {

              const { before, after, saved } = sizeDiff(text, bundle.size);
              log.transform(`${bold(format.toUpperCase())} bundle → ${bold(stringSize(text))}`);
              log.minified(null, before, after, saved);

            }

          } else {
            log.transform(`${bold(format.toUpperCase())} bundle → ${bold(stringSize(text))}`);
          }

          let content: string;

          if (snippet) {

            content = createSnippet(text, attrs);

            if (hook) {
              content = hook(file, content);
              if (content === null) continue;
            }

            await writeFile(output, content).catch(
              error.write('Error writing inline <script> snippet', {
                file: file.relative
              })
            );

            log.exported('script', 'snippet');

          } else {

            content = text;

            if (hook) {
              content = hook(file, content);
              if (content === null) continue;
            }

            await writeFile(output, content).catch(error.write('Error writing JavaScript asset', {
              file: file.relative
            }));

          }

          if ($.mode.hot) {

            log.syncing(key, { hot: true });

            $.wss.script(file.uuid, file.base);

            await sync('put', bundle, content);

          } else if (!$.mode.build) {

            log.syncing(key);

            await sync('put', bundle, content);

          }

        }

      };

    } catch (e) {

      if (has('errors', e)) {

        timer.clear();

        log.error(file.relative, {
          notify: {
            title: 'JavaScript Error',
            message: `Transform failed for ${file.base}`
          }
        });

        $.errors.add(input);
        e.errors.forEach(error.esbuild);

      }

    }

  }

  if (trigger > 1) log.nwl();

};
