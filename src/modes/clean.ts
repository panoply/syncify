import { unlink } from 'fs-extra';
import { glob } from 'glob';
import { dirname } from 'path';
import { mapFastAsync } from 'rambdax';
import { log, c } from '../logger';
import { setThemeDirs } from '../options/dirs';
import { bundle } from '../config';

/**
 * Cleans Output directory
 */
export async function clean () {

  const files = glob.sync(`${bundle.dirs.output}/**`, { nodir: true });
  const size = files.length;

  if (size === 0) return log.info(c.yellowBright('✓ output directory is clean'));

  log.info(c.yellowBright(`${c.bold('+')} cleaning ${c.bold(String(size))} files from output`));

  const deleted = await mapFastAsync(async path => {

    try {

      await unlink(path);

      return true;

    } catch (e) {

      console.log(e);

      return e;

    }

  }, files);

  log.info(`✓ removed ${c.bold(String(deleted.length))} of ${c.bold(String(size))} files`);
  log.info(`✓ cleaned ${c.bold(dirname(bundle.dirs.output) + '/**')}`);

  await setThemeDirs(bundle.cwd);

  return true;

};
