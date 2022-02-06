import glob from 'glob';
import { IConfig, IFile, IStyle, Syncify } from 'types';
import { client } from 'requests/client';
import { extname } from 'path';
import { delay, mapFastAsync } from 'rambdax';
import { isStyle, parseFile, Type } from 'config/file';
import { readFile } from 'fs-extra';
import { is } from 'shared/native';

export const upload = async (config: IConfig, cb?: typeof Syncify.hook): Promise<void> => {

  const files = glob.sync(`${config.output}/**`, { nodir: true, cwd: config.cwd });
  const parse = parseFile(config.paths, config.output);
  const request = client(config);

  console.log(files);

  await mapFastAsync(async (path: string) => {

    const file = parse(path);
    const read = await readFile(path);

    console.log(file);

    await delay(1000);

    // await request.assets.queue('put', file, read.toString());

  }, files);

};
