import glob from 'glob';
import { IConfig, Syncify } from 'types';
import { client, queue } from 'requests/client';
import { outputFile } from 'config/file';
import { readFile } from 'fs-extra';
import * as log from 'cli/logs';

export const upload = async (config: IConfig, cb?: typeof Syncify.hook): Promise<void> => {

  log.timer.mark('upload');

  const parse = outputFile(config.output);
  const files = glob.sync(`${config.output}/**`, { nodir: true, cwd: config.cwd });
  const request = client(config);

  for (const path of files) {

    const file = parse(path);
    const read = await readFile(path);

    await request.assets.queue('put', file, read.toString());

  }

  return queue.onIdle().then(() => log.finish('upload'));

};
