import type { File, Theme } from 'types';
import glob from 'fast-glob';
import { readFile } from 'fs-extra';
import { Syncify } from 'types';
import { client, queue } from '../requests/client';
import { outputFile } from '~process/files';
import { error, log, tui } from '~log';
import { bundle } from '~config';
import * as n from '~utils/native';
import * as timer from '~utils/timer';
import * as c from '~cli/ansi';
import { has } from 'rambdax';
import { event } from '~utils/utils';
import { errors } from '~logerrors';
import { AxiosResponse } from 'axios';
import { hasSnippet, removeRender } from '~hot/inject';

export async function upload (cb?: Syncify): Promise<void> {

  log.newGroup('Upload');
  log.spinner('Preparing');

  timer.start('upload');

  const $: {
    files: {
      key: string;
      namespace: string;
      fileSize: string;
      duration: string;
      elapsed: string;
    }[],
    sync: {
      [store: string]: {
        theme: string;
        uploaded: number;
        failed: number;
        progress: ReturnType<typeof log['progress']>
      }[]
    }
  } = {
    files: [],
    sync: {}
  };

  const parse = outputFile(bundle.dirs.output);
  const files = glob.sync(`${bundle.dirs.output}/**`).sort();
  const request = client(bundle.sync);
  const hashook = n.isFunction(cb);
  const errs: Map<
    [store: string, theme: string],
    Array<[file: File, response: AxiosResponse]>
  > = new Map();

  /**
   * Track successful uploads
   */
  let pass = 0;

  /**
   * Track upload failures
   */
  let fail = 0;

  let width: number = 0;

  const size = files.length;

  for (const { store, target } of bundle.sync.themes) {
    if (target.length > width) width = target.length;
    if (!has(store, $.sync)) $.sync[store] = [];
    $.sync[store].push({
      theme: target,
      uploaded: 0,
      failed: 0,
      progress: log.progress(size)
    });
  }

  event.on('upload', function (type: 'uploaded' | 'failed', { target, store }: Theme, item) {

    log.spinner.stop();

    const isErr = type === 'failed';

    const items = [
      tui.message('whiteBright', c.bold(item.namespace)),

      c.newline,
      tui.message(type === 'failed' ? 'redBright' : 'neonGreen', item.key),
      c.newline,

      tui.suffix('white', 'size ', `  ${item.fileSize}`),
      n.nl,
      tui.suffix('white', 'duration ', `  ${timer.stop()}`),
      n.nl,
      tui.suffix('white', 'elapsed ', `  ${timer.now('upload')}`),

      c.newline

    ];

    for (const prop in $.sync) {
      for (const th of $.sync[prop]) {

        if (prop === store && target === th.theme) {
          th[type] += 1;
          th.progress.increment(1);
        }

        const title = `${c.bold(th.theme.toUpperCase()) + n.wsr(width - target.length)}  ${c.ARR}  ${prop}`;

        items.push(
          tui.message('neonCyan', title),
          c.newline,
          tui.suffix('whiteBright', 'uploaded ', `  ${c.bold(`${th.uploaded}`)} ${c.white('of')} ${c.bold(`${size}`)}`),
          n.nl,
          tui.suffix(th.failed > 0 ? 'redBright' : 'white', 'failed ', `  ${c.bold(`${th.failed}`)}`),
          c.newline,
          th.progress.render(false),
          c.newline
        );

        if (isErr) {
          if (errs.has([ prop, target ])) {
            errs.get([ prop, target ]).push([ item.file, item.error ]);
          } else {
            errs.set([ prop, target ], [ [ item.file, item.error ] ]);
          }
        }

      }

    }

    log.update(n.glue(items));

  });

  for (const path of files) {

    const file = parse(path);

    let input: string;

    try {

      const read = await readFile(file.input);

      input = read.toString();

      // remove HOT snippet occurances
      if (file.namespace === 'layout') {
        if (hasSnippet(input)) {
          input = removeRender(input);
        }
      }

      if (!hashook) {

        await request.assets('put', file, input);

      } else {

        const update = cb.apply({ ...file }, input);

        if (n.isUndefined(update) || update === false) {
          await request.assets('put', file, input);
        } else if (n.isString(update)) {
          await request.assets('put', file, update);
        } else if (n.isBuffer(update)) {
          await request.assets('put', file, update.toString());
        } else {
          await request.assets('put', file, input);
        }
      }

      pass++;

    } catch (e) {

      console.log(e);
      // errs.push([ file, e ]);

      fail++;

      // update({
      //   key: file.key,
      //   color: 'redBright',
      //   namespace: file.namespace,
      //   fileSize: getSizeStr(input),
      //   duration: timer.stop(),
      //   elapsed: timer.now()
      // });

    }

  }

  // log.spinner.stop();

  // log.update(
  //   n.glue([
  //     tui.message('whiteBright', c.bold('Completed')),
  //     c.newline,
  //     tui.suffix('neonGreen', 'uploaded ', `  ${c.bold(`${pass}`)} ${c.white('of')} ${c.bold(`${size}`)}`),
  //     n.nl,
  //     tui.suffix(fail > 0 ? 'redBright' : 'white', 'errors ', `  ${c.bold(`${fail}`)}`),
  //     n.nl,
  //     tui.suffix('white', 'duration ', `  ${timer.stop()}`)
  //   ])
  // );

  // log.update.done();
  // log.nwl();

  // if (fail > 0) {

  //   log.write([
  //     c.gray(`The below ${c.bold(`${fail}`)} files failed to sync to and were not uploaded.`),
  //     c.gray(`Type ${c.blue.bold('v')} and press ${c.blue.bold('enter')} to view error responses from Shopify.`)
  //   ]);

  //   log.nwl();

  //   for (const [ file, e ] of errs) {
  //     if (!has(file.key, errors)) errors[file.key] = new Set();
  //     errors[file.key].add(error.request<string>(file.input, e, false));
  //     log.write(`${c.DSH} ${c.redBright(file.key)}`);
  //   }

  //   log.nwl();

  // } else {

  //   return queue.onIdle().then(() => {
  //     tui.closer('Upload');
  //     process.exit(0);
  //   });

  // }
};
