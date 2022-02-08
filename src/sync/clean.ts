import { unlink } from 'fs-extra';
import { glob } from 'glob';
import { IConfig } from 'types';
import { mapFastAsync } from 'rambdax';
import * as tui from 'cli/ansi';
import * as c from 'cli/colors';
import * as timer from 'marky';
import { is } from 'shared/native';

/**
 * Cleans Output directory
 */
export const clean = async (config: IConfig, log: (...messsage: string[]) => void) => {

  const files = glob.sync(`${config.output}/**`, { nodir: true, cwd: config.cwd });
  const size = files.length;

  if (is(size, 0)) return log(tui.task(c.greenBright('✓ output directory is clean')));

  timer.mark('clean');

  log(tui.task(c.cyanBright(`${c.bold('+')} cleaning ${c.bold(String(size))} files from output`)));

  const deleted = await mapFastAsync(async path => {

    try {

      await unlink(path);

      return true;

    } catch (e) {

      console.log(e);

      return e;

    }

  }, files);

  const cleared = deleted.length;
  const timing = `${c.gray('in')} ${`${timer.stop('clean').duration.toFixed(0)}ms`}`;

  log(
    tui.task(
      c.greenBright(`✓ removed ${c.bold(String(cleared))} of ${c.bold(String(size))} files`)
    ),
    tui.task(
      c.greenBright(`✓ cleaned ${c.white('\'')}${config.output}/**${c.white('\'')} ${timing}`)
    )
  );

  return true;

};
