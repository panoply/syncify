import { unlink } from 'fs-extra';
import { glob } from 'glob';
import { dirname } from 'path';
import { mapFastAsync } from 'rambdax';
import { is } from 'shared/native';
import { log } from 'cli/stdout';
import * as tui from 'cli/tui';
import * as c from 'cli/ansi';
import { themeDirs } from 'options/dirs';
import { bundle } from 'options';

/**
 * Cleans Output directory
 */
export async function clean () {

  const files = glob.sync(`${bundle.dirs.output}/**`, { nodir: true });
  const size = files.length;

  if (is(size, 0)) return log.clean(tui.task(c.yellowBright('✓ output directory is clean')));

  log.clean(c.yellowBright(`${c.bold('+')} cleaning ${c.bold(String(size))} files from output`));

  const deleted = await mapFastAsync(async path => {

    try {

      await unlink(path);

      return true;

    } catch (e) {

      console.log(e);

      return e;

    }

  }, files);

  log.clean(
    c.greenBright(`✓ removed ${c.bold(String(deleted.length))} of ${c.bold(String(size))} files`),
    c.greenBright(`✓ cleaned ${c.bold(dirname(bundle.dirs.output) + '/**')}`)
  );

  await themeDirs(bundle.cwd);

  return true;

};
