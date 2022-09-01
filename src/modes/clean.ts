import { unlink } from 'fs-extra';
import { glob } from 'glob';
import { dirname } from 'node:path';
import { mapFastAsync } from 'rambdax';
import { log, c, neonGreen, bold } from '~log';
import { setThemeDirs } from '~options/dirs';
import { bundle } from '~config';

/**
 * Cleans Output directory
 */
export async function clean () {

  const files = glob.sync(bundle.dirs.output + '**', { nodir: true });
  const size = files.length;

  console.log(files);

  if (size === 0) {
    return log.write('✓ output directory is clean');
  }

  log.write(c.yellowBright(`${c.bold('+')} cleaning ${c.bold(String(size))} files from output`));

  const deleted = await mapFastAsync(async path => {

    try {

      await unlink(path);

      return true;

    } catch (e) {

      console.log(e);

      return e;

    }

  }, files);

  log.write(`${neonGreen('✓')} removed ${bold(String(deleted.length))} of ${c.bold(String(size))} files`);
  log.write(`${neonGreen('✓')} cleaned ${bold(dirname(bundle.dirs.output) + '/**')}`);
  log.nwl();

  await setThemeDirs(bundle.cwd);

  return true;

};
