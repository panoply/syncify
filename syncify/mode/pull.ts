import type { File } from '~file';

import { join } from 'node:path';

import { ensureDir, pathExists, readFile, writeFile } from 'fs-extra';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';
import { evaluate, format } from '@syncify/json';
import { timer } from '@syncify/timer';

import { error } from '~errors';
import { event } from '~events';
import { List, themeFilesList, themeFilesMap } from '~http/themeFiles';
import { log } from '~log';
import { outputFile } from '~process/files';
import { delay, getChunk, m } from '~utils';

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
   * File exists in remote but not local - these will apply to stashes
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

export async function runAlignment () {

  if (!$.mode.align) return;

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

  const state: Alignment = {
    count: 0,
    total: list.files.length,
    create: m(),
    update: m(),
    skipped: []
  };

  const print = (filename: string) => glue.nl(
    `${++state.count} of ${state.total} files`,
    _.Tree.trim,
    _.Tree.line + _.gray(filename)
  );

  log
  .runtime
  .True(list.files.length > 10, tui => tui.Spinner(`${state.count} of ${state.total} files`));

  for (const { filename, body } of list.files) {

    await delay(85);

    log.runtime.Spinner(print(filename));

    const splitDir = filename.split('/');
    const fileName = splitDir.pop();
    const stashDir = splitDir.length > 1 ? splitDir.pop() : splitDir[0];

    const file = output(filename);

    if (file.input) {

      const read = await readFile(file.input, 'utf8');
      const json = evaluate(read, body.content, $.json.options);

      if (json.change) {

        file.value = json.string;
        state.update.set(filename, file);

        await writeFile(file.input, file.value).then(() => state.update.set(filename, file)).catch(
          error.write(
            'Error writing file during alignment', {
              input: file.input,
              output: file.output
            }
          )
        ).then(() => state.update.set(filename, file));

      } else {

        state.skipped.push(file);

      }

    } else {

      file.input = join($.stash[stashDir], fileName);
      file.value = format(body.content, $.json.options);

      await ensureDir($.stash[stashDir]);
      await writeFile(file.input, file.value).then(() => align.create.set(filename, file)).catch(
        error.write(
          'Error writing file during alignment', {
            input: file.input,
            output: file.output
          }
        )
      );

    }
  }

  log.runtime
  .True($.mode.hot, tui => tui.Spinner('Preparing HOT Reloads'))
  .False($.mode.hot, tui => tui.Stop());

  // event.emit('alignment');

}

interface State {
  /**
   * The TUI Instance
   */
  write: _.Tui
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
  files: {
    create: File<List.Node>[];
    update: File<List.Node>[];
    stash: File<List.Node>[];
  }
  /**
   * Interval
   */
  interval: NodeJS.Timeout;
  /**
   * Progress bar
   */
  progress: _.Progress
}

export async function Pull () {

  $.running = true;

  if ($.mode.align) return runAlignment();

  log.spinner('0 Files', { style: 'spinning', color: _.whiteBright });

  const state: State = {
    write: _.Create(),
    count: 0,
    total: 0,
    interval: null,
    progress: null,
    files: {
      create: [],
      update: [],
      stash: []
    }
  };

  function interval () {

    if (state.interval !== null) {
      clearInterval(state.interval);
      state.interval = null;
    }

    state.interval = setInterval(() => {

      state.write
      .Update('elapsed', _.capture.numbers(timer.now('pull'), _.bold))
      .Update('pulled', `${_.bold(state.count)} of ${_.bold(state.total)}`)
      .Update('created', `${_.bold(state.files.create.length)}`)
      .Update('updated', `${_.bold(state.files.update.length)}`)
      .Update('stashed', `${_.bold(state.files.stash.length)}`)
      .Update('progress', state.progress.render())
      .toUpdate();

    }, 100);

  }

  const remote = await themeFilesMap($.target.default, n => log.spinner.update(`${n} Files`));
  const output = outputFile($.dirs.output);

  log.spinner.stop();

  timer.start('pull');

  state.total = remote.total;
  state.progress = _.progress(remote.total, {
    prepend: null,
    clearOnComplete: false
  });

  state
  .write
  .Append($.target.default.store.domain, _.bold)
  .Template({ prefix: true, id: 'elapsed', color: _.whiteBright })
  .Template({ prefix: true, id: 'pulled', color: _.whiteBright })
  .Template({ prefix: true, id: 'created', color: _.whiteBright })
  .Template({ prefix: true, id: 'updated', color: _.whiteBright })
  .Template({ prefix: true, id: 'stashed', color: _.whiteBright })
  .Newline()
  .Template({ id: 'progress' });

  interval();

  for (const directory in remote.files) {

    const items = remote.files[directory];

    for (const input of getChunk(items, 40)) {

      const { files } = await themeFilesList({ target: $.target.default, input });

      state.count += input.length;
      state.progress.increment(input.length);

      for (const item of files) {

        const splitDir = item.filename.split('/');
        const fileName = splitDir.pop();
        const stashDir = splitDir.length > 1 ? splitDir.pop() : splitDir[0];
        const file: File<List.Node> = output(item.filename);

        if (file.ext === '.json') {
          file.value = format(item.body.content, $.json.options);
        } else {
          file.value = item.body.content;
        }

        if (file.input) {

          if (await pathExists(file.input)) {
            state.files.update.push(file);
          } else {
            state.files.create.push(file);
          }

        } else {

          file.input = join($.stash[stashDir], fileName);

          state.files.stash.push(file);
          // await ensureDir($.stash[stashDir]);
          // await writeFile(file.input, file.value).then(() => align.create.set(filename, file)).catch(
          //   error.write(
          //     'Error writing file during alignment', {
          //       input: file.input,
          //       output: file.output
          //     }
          //   )
          // );

        }

      }
    }

  }

  state.interval = null;

};
