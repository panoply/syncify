import glob from 'glob';
import { IConfig, IFile, IStyle, Syncify } from 'types';
import { client } from 'requests/client';
import { extname } from 'path';
import { delay, mapFastAsync, wait } from 'rambdax';
import { isStyle, outputFile, Type } from 'config/file';
import { readFile } from 'fs-extra';
import { from, is } from 'shared/native';
import * as log from 'cli/logs';

export const upload = async (config: IConfig, cb?: typeof Syncify.hook): Promise<void> => {

  const files = glob.sync(`${config.output}/**`, { nodir: true, cwd: config.cwd });
  const parse = outputFile(config.output);
  const request = client(config);
  const errors = new Set();

  await mapFastAsync(async (path: string) => {

    const file = parse(path);

    try {
      const read = await readFile(path);
      await request.assets.queue('put', file, read.toString());
    } catch (e) {
      errors.add(e.file);
    }

  }, files);

  console.log(from(errors.values()));
};
