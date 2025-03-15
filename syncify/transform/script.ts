import type { ScriptBundle } from 'types';

import { basename, join, relative } from 'node:path';

import esbuild, { Metafile } from 'esbuild';
import { writeFile } from 'fs-extra';
import pMap from 'p-map';

import { ARR, bold } from '@syncify/ansi';
import { glue } from '@syncify/glue';
import { timer } from '@syncify/timer';

import { log } from '~cli/log';
import { warn } from '~cli/warnings';
import { error } from '~errors';
import { File } from '~file';
import { themeFilesUpsertMap } from '~http/themeFiles';
import { byteSize, has, inProp, isEmpty, pNext, sizeDiff, stringSize } from '~utils';

import { $, q } from '$';

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
    if (!bundle.watch.has(bundle.input)) {
      bundle.watch.add(bundle.input);
    }
  }
}

async function getWatchPaths (bundle: ScriptBundle, inputs: Metafile['inputs']) {

  const store: string[] = [];
  const { cwd, mode } = $;

  for (const file in inputs) {

    if (file.indexOf('/node_modules/') > -1) continue;

    const path = join(cwd, file);

    if (!bundle.watch.has(path)) bundle.watch.add(path);
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
        if (!has(path.slice(cwd.length + 1), inputs)) bundle.watch.delete(path);
      }
    });

  }
}

export function createSnippet (string: string, attrs: string[]) {

  return attrs.length > 0
    ? `<script ${glue.ws(attrs)}>${string}</script>`
    : `<script>${string}</script>`;

};

/**
 * TypeScript/JavaScript compile
 *
 * Used for Script transformations.
 */
export async function ScriptTransform <T extends ScriptBundle> (file: File<T[]>) {

  if (!file.data) return;

  const { hot, watch, terse, bulk, build } = $.mode;

  if (watch) timer.start();
  if (hot) timer.start(file.uuid);

  const files = await pMap(file.data, async bundle => {

    const { key, input, output, snippet, attrs, esbuild: { format } } = bundle;
    const { metafile, outputFiles, warnings } = await esbuild.build(bundle.esbuild);

    if (file.data.length > 1) {
      log.nl().write(relative($.cwd, input));
    }

    if ($.mode.watch) {
      await getWatchPaths(bundle, metafile.inputs);
    }

    if (warnings.length > 0) {
      warn.esbuild(warnings);
    }

    for (const { text, path } of outputFiles) {

      if (path.endsWith('.map')) {

        const map = join($.dirs.sourcemaps.scripts, `${file.base}.map`);

        q.tasks.add(() => writeFile(map, text).catch(
          error.write('Error writing JavaScript Source Map to cache', {
            output: $.dirs.sourcemaps.scripts,
            source: file.relative
          })
        ));

      } else {

        if (terse) {
          if (isNaN(bundle.size)) {
            log.transform(file.kind, `${bold(format.toUpperCase())} bundle`);
            log.minified(stringSize(text));
          } else {
            const size = sizeDiff(text, bundle.size);
            log.transform(`${bold(format.toUpperCase())} bundle ${ARR} ${bold(stringSize(text))}`);
            log.minified(null, size.before, size.after, size.saved);
          }
        } else {
          log.transform(`${bold(format.toUpperCase())} bundle ${ARR} ${bold(stringSize(text))}`);
        }

        if (snippet) {

          bundle.value = createSnippet(text, attrs);

          await writeFile(output, bundle.value).catch(
            error.write('Error writing inline <script> snippet', {
              source: file.relative
            })
          );

          log.exported('script', 'snippet');

        } else {

          bundle.value = text;

          await writeFile(output, bundle.value).catch(
            error.write('Error writing JavaScript asset', {
              source: file.relative
            })
          );

        }

        if (bulk === false || build === false) {
          log.syncing(key, { hot });
          hot && $.wss.script(file.uuid, basename(key));
        }

      }

    };

    return bundle as unknown as File<T>;

  }).catch(issue => {

    if (inProp('errors', issue)) {
      timer.clear();
      error.esbuild(file, issue.errors);
    }

  });

  if (files && isEmpty(files) === false && build === false) {

    await themeFilesUpsertMap(files);

  }

};
