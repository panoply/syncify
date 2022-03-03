import { unlink } from 'fs-extra';
import { glob } from 'glob';
import { IConfig } from 'types';
import { mapFastAsync } from 'rambdax';
import { is } from 'utils/native';
import * as timer from 'utils/timer';
import * as tui from 'cli/tui';
import * as c from 'cli/ansi';

/**
 * Cleans Output directory
 */
export async function clean (config: IConfig, log: (...messsage: string[]) => void) {

  const files = glob.sync(`${config.output}/**`, { nodir: true, cwd: config.cwd });
  const size = files.length;

  if (is(size, 0)) return log(tui.task(c.yellowBright('✓ output directory is clean')));

  timer.start('clean');

  log(tui.task(c.yellowBright(`${c.bold('+')} cleaning ${c.bold(String(size))} files from output`)));

  const deleted = await mapFastAsync(async path => {

    try {

      await unlink(path);

      return true;

    } catch (e) {

      console.log(e);

      return e;

    }

  }, files);

  log(
    tui.task(
      c.greenBright(`✓ removed ${c.bold(String(deleted.length))} of ${c.bold(String(size))} files`)
    ),
    tui.task(
      c.greenBright(`✓ cleaned ${c.bold(config.output + '/**')} ${c.gray('in')} ${timer.stop('clean')}`)
    )
  );

  return true;

};
