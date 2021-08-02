import { join } from 'path';
import { readFile } from 'fs-extra';
import { IConfigFile } from '../index.d';

function parseConfig (config: string):IConfigFile {

  try {

    return JSON.parse(config);

  } catch (e) {

    throw new Error('Your \'.shopifysync.json\' file is corrupt. JSON failed to parse');
  }

}

export async function readConfig () {

  try {

    const cwd = process.cwd();
    const file = join(cwd, '.shopifysync.json');
    const config = await readFile(file, 'utf8');

    return parseConfig(config);

  } catch (e) {

    throw new Error('The \'.shopifysync.json\' configuration is missing!');

  }

}
