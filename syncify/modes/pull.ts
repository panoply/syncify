import type { File } from '~file';

import { dirname, join, relative } from 'node:path';

import axios from 'axios';
import { ensureDirSync, ensureFile, pathExists, readFile, writeFile, writeFileSync, writeJSONSync } from 'fs-extra';
import pMap from 'p-map';

import * as _ from '@syncify/ansi';
import { equality, evaluate, format, stringify, type EvaluateOptions } from '@syncify/json';
import { timer } from '@syncify/timer';

import { runtime } from '~cli/runtime';
import { PULL_ALIGN } from '~const';
import { error } from '~errors';
import { event } from '~events';
import { themeFiles, themeFilesGlob, themeFilesList } from '~http/theme';
import { log } from '~log';
import { outputFile, parse } from '~process/files';
import { checksum, delay, forEach, getChunk, m, values } from '~utils';

import { $, q } from '$';

interface Alignment {
  /**
   * The total number of files to align
   */
  count: number;
  /**
   * The total number of files to align
   */
  total: number;
  /**
   * File exists in remote but not local
   */
  create: Map<string, File>;
  /**
   * File exists in remote and local but contents are not equal
   */
  update: Map<string, File>;
  /**
   * File exists in both remote and local but contents are equal.
   */
  skipped: File[];
}

export async function runAlignment (write?: _.Tui) {

  if (!$.mode.align) return;
  if (!write && $.mode.watch) write = runtime.log;

  write.Spinner('Theme Alignments', { color: _.neonCyan, style: 'spinning' });

  await q.cache.onIdle();

  const output = outputFile($.dirs.output);
  const list = await themeFilesList({
    target: $.target.default,
    input: [
      'config/*.json',
      'locales/*.json',
      'templates/index.json',
      'templates/customers/*.json',
      'templates/metaobject/*.json',
      'sections/*.json'
    ]
  });

  const align: Alignment = {
    count: 0,
    total: list.files.length,
    create: m(),
    update: m(),
    skipped: []
  };

  write
  .True(list.files.length > 10, tui => tui.Spinner(`${align.count} of ${align.total} Files`))
  .Newline()
  .Template('...', { id: 'align' })
  .toUpdate();

  for (const { filename, body } of list.files) {

    await delay(75);

    const dir = filename.split('/');
    const pop = dir.pop();
    const itm = dir.length > 1 ? dir.pop() : dir[0];

    const file = output(filename);

    if (file.input) {

      const read = await readFile(file.input, 'utf8');

      if (read.trim().length === 0) {

        write
        .Update('align', filename, _.gray)
        .Spinner(`${++align.count} of ${align.total} Files`);

        continue;
      }

      const json = evaluate(read, body.content, $.json.options);

      if (json.change) {

        file.value = json.string;
        align.update.set(filename, file);

        await writeFile(file.input, file.value).catch(
          error.write('Error writing file during alignment', {
            input: file.input
          })
        );

        write
        .Update('align', filename, _.neonGreen)
        .Spinner(`${++align.count} of ${align.total} Files`);

      } else {

        write
        .Update('align', filename, _.gray)
        .Spinner(`${++align.count} of ${align.total} Files`);

        align.skipped.push(file);

      }

    } else {

      file.input = join($.stash[itm], pop);

      await pathExists($.stash[itm]);
      await writeFile(file.input, file.value).catch(
        error.write('Error writing file during alignment', {
          input: file.input
        })
      );

      write
      .Update('align', filename, _.neonGreen)
      .Spinner(`${++align.count} of ${align.total} Files`);

    }

  }

  write
  .Pop()
  .Stop()
  .toUpdate({ clear: true, trim: true })
  .clear();

  event.emit('alignment');

}

interface State {
  /**
   * The total number of files to align
   */
  count: number;
  /**
   * The total number of files to align
   */
  total: number;
  /**
   * File exists in remote but not local
   */
  files: Pull.Model;
}

export async function Pull () {

  $.running = true;

  timer.start('pull');

  if ($.mode.align) return runAlignment(_.Create());

  const write = _.Create()
  .Line($.target.default.store.domain, _.bold)
  .Newline()
  .Spinner('0 Files', { style: 'spinning', color: _.neonCyan })
  .Template({ prefix: true, id: 'elapsed', color: _.whiteBright })
  .Template({ prefix: true, id: 'download', color: _.whiteBright })
  .Newline()
  .Template({ id: 'progress' });

  const remote = await themeFiles($.target.default, n => write.Spinner(`${n} Files`));
  const progress = _.progress(remote.count, { prepend: null, clearOnComplete: false });
  const state: State = {
    count: 0,
    get total () { return remote.count; },
    get files () { return remote.files; }
  };

  write.Stop();

  let ref: NodeJS.Timeout = null;
  function interval () {

    if (ref !== null) {
      clearInterval(ref);
      ref = null;
    }

    ref = setInterval(() => {
      write
      .Update('elapsed', _.capture.numbers(timer.now('push'), _.bold))
      .Update('downloaded', `${state.count} of ${state.total}`)
      .Update('progress', progress.render())
      .toUpdate();
    }, 100);
  }

  for (const directory in state.files) {

    const items = state.files[directory];
    for (const input of getChunk(items.map(({ filename }) => filename), 100)) {

      state.count += items.length;
      progress.increment(items.length);
      interval();

      const { files } = await themeFilesList({
        target: $.target.default,
        input
      });

      for (const file of files) {

        try {

          console.log(file.filename);

        } catch (e) {

        }
      }
    }

  }

};
