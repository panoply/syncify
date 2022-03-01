import glob from 'glob';
import { IConfig, Syncify } from 'types';
import { client, queue } from 'requests/client';
import { outputFile } from 'config/file';
import { readFile } from 'fs-extra';
import * as log from 'cli/logs';
import { mapFastAsync } from 'rambdax';

export const upload = async (config: IConfig, cb?: typeof Syncify.hook): Promise<void> => {

  log.time.start('upload');

  const parse = outputFile(config.output);
  const files = glob.sync(`${config.output}/**`, { nodir: true, cwd: config.cwd }).sort();
  const request = client(config);

  await mapFastAsync(async (path) => {

    const file = parse(path);
    const read = await readFile(path);

    await request.assets('put', file, read.toString());

  }, files);

  return queue.onIdle().then(() => log.finish('upload'));

};
