import type { File } from 'types';
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
import { getSizeStr, toUpcase } from '~utils/utils';
import { errors } from '~log/errors';
import { AxiosResponse } from 'axios';
import { hasSnippet, removeRender } from '~hot/inject';

export async function upload (cb?: Syncify): Promise<void> {

  log.newGroup('Upload');
  log.spinner('Preparing');

  timer.start();

  const parse = outputFile(bundle.dirs.output);
  const files = glob.sync(`${bundle.dirs.output}/**`).sort();
  const request = client(bundle.sync);
  const hashook = n.isFunction(cb);
  const errs: Array<[file: File, response: AxiosResponse]> = [];

  /**
   * Track successful uploads
   */
  let pass = 0;

  /**
   * Track upload failures
   */
  let fail = 0;

  const size = files.length;

  /**
   * Log Updates
   *
   * Helper function for updating the the console when uploading.
   */
  const update = ({
    color = 'neonCyan',
    namespace,
    key,
    fileSize,
    duration,
    elapsed
  }: {
    color?: c.Colors;
    namespace: string,
    key: string,
    fileSize: string,
    duration: string,
    elapsed: string
  }) => log.update(
    n.glue([
      tui.message('whiteBright', c.bold(toUpcase(namespace))),
      c.newline,
      tui.message(color, key),
      c.newline,
      tui.suffix('neonGreen', 'uploaded ', `  ${c.bold(`${pass}`)} ${c.white('of')} ${c.bold(`${size}`)}`),
      n.nl,
      tui.suffix(fail > 0 ? 'redBright' : 'white', 'failed ', `  ${c.bold(`${fail}`)}`),
      n.nl,
      tui.suffix('white', 'size ', `  ${fileSize}`),
      n.nl,
      tui.suffix('white', 'duration ', `  ${duration}`),
      n.nl,
      tui.suffix('white', 'elapsed ', `  ${elapsed}`),
      c.newline
    ])
  );

  for (const path of files) {

    const file = parse(path);

    let input: string;

    try {

      timer.start();

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

      log.spinner.stop();

      pass++;

      update({
        key: file.key,
        namespace: file.namespace,
        fileSize: getSizeStr(input),
        duration: timer.stop(),
        elapsed: timer.now()
      });

    } catch (e) {

      errs.push([ file, e ]);

      fail++;

      update({
        key: file.key,
        color: 'redBright',
        namespace: file.namespace,
        fileSize: getSizeStr(input),
        duration: timer.stop(),
        elapsed: timer.now()
      });

    }

  }

  log.spinner.stop();

  log.update(
    n.glue([
      tui.message('whiteBright', c.bold('Completed')),
      c.newline,
      tui.suffix('neonGreen', 'uploaded ', `  ${c.bold(`${pass}`)} ${c.white('of')} ${c.bold(`${size}`)}`),
      n.nl,
      tui.suffix(fail > 0 ? 'redBright' : 'white', 'errors ', `  ${c.bold(`${fail}`)}`),
      n.nl,
      tui.suffix('white', 'duration ', `  ${timer.stop()}`)
    ])
  );

  log.update.done();
  log.nwl();

  if (fail > 0) {

    log.write([
      c.gray(`The below ${c.bold(`${fail}`)} files failed to sync to and were not uploaded.`),
      c.gray(`Type ${c.blue.bold('v')} and press ${c.blue.bold('enter')} to view error responses from Shopify.`)
    ]);

    log.nwl();

    for (const [ file, e ] of errs) {
      if (!has(file.key, errors)) errors[file.key] = new Set();
      errors[file.key].add(error.request<string>(file.input, e, false));
      log.write(`${c.DSH} ${c.redBright(file.key)}`);
    }

    log.nwl();

  } else {

    return queue.onIdle().then(() => {
      tui.closer('Upload');
      process.exit(0);
    });

  }
};
