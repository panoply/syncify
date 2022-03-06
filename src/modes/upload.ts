import glob from 'glob';
import { readFile } from 'fs-extra';
import { mapFastAsync } from 'rambdax';
import { IConfig, Syncify } from 'types';
import { client, queue } from 'requests/client';
import { outputFile } from 'process/files';
import * as log from 'cli/logs';

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
