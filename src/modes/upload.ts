import glob from 'glob';
import { readFile } from 'fs-extra';
import { mapFastAsync } from 'rambdax';
import { Syncify } from 'types';
import { client, queue } from '../requests/client';
import { outputFile } from 'process/files';
import { log } from 'cli/log';
import { bundle } from '../options/index';
import * as timer from 'process/timer';
import { isFunction, isUndefined, isString, isBuffer } from 'shared/native';

export const upload = async (cb?: Syncify): Promise<void> => {

  timer.start();

  const parse = outputFile(bundle.dirs.output);
  const files = glob.sync(`${bundle.dirs.output}/**`, { nodir: true, mark: true }).sort();
  const request = client(bundle.sync);
  const hashook = isFunction(cb);

  await mapFastAsync(async (path) => {

    const file = parse(path);
    const read = await readFile(path);

    if (!hashook) return request.assets('put', file, read.toString());

    const update = cb.apply({ ...file }, read.toString());

    if (isUndefined(update) || update === false) {
      return request.assets('put', file, read.toString());
    } else if (isString(update)) {
      return request.assets('put', file, update);
    } else if (isBuffer(update)) {
      return request.assets('put', file, update.toString());
    }

    return request.assets('put', file, read.toString());

  }, files);

  return queue.onIdle().then(() => log.print('Completed Upload'));

};
