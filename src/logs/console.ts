import { Console } from 'console';
import fancy from 'fancy-log';
import * as c from 'colorette';
import * as parse from './parse';
import { IConfig, IThemes } from '../typings';
import boxen from 'boxen';
import logUpdate from 'log-update';

export { logUpdate as update };

/**
 * Console Instance - Used for stdout and stderr
 */
export const console = new Console(
  {
    stdout: process.stdout,
    stderr: process.stderr
  }
);

/**
 * Watching Banner
 *
 * Initialize banner for starting in watch
 * mode. Prints the themes and stores being
 * watched. Helpful for loading a theme instance.
 */
export function watching ({ sync, dir }: Partial<IConfig>) {

  const trace: Set<string> = new Set();

  let string: string = '';

  for (const { store, target, id } of sync.themes) {

    if (!trace.has(store)) {
      trace.add(store);
      string += `\n${c.cyan(store)}: \n`;
    }

    const shop = `https://${store.toLowerCase()}.myshopify.com?preview_theme_id=${id}`;

    string += `  ${c.dim('-')} ${c.white(target)}${c.white(':')} `;
    string += c.underline(c.dim(shop)) + '\n';

  }

  const count = sync.themes[0].counts;
  const theme = string.slice(0, string.length - 1);
  const title = c.bold(c.whiteBright('Syncify')) + c.dim(' <!version!> \n\n') +
  c.whiteBright('Watching the ' + c.bold(c.cyan(dir + '/**/**')) + ' directory. \n' +
  'Changes will be uploaded to ' + (count.stores > 1
    ? `${c.bold(c.cyanBright(count.stores))} stores`
    : `${c.bold(c.cyanBright(count.stores))} store`) + ' and ' + (count.themes > 1
    ? `${c.bold(c.cyanBright(count.themes))} themes:`
    : `${c.bold(c.cyanBright(count.themes))} theme:`));

  const ready = boxen(`${title}\n${theme}`, {
    padding: 1,
    margin: 0,
    float: 'left',
    borderColor: 'gray',
    dimBorder: true,
    borderStyle: {
      topLeft: ' ',
      topRight: ' ',
      bottomLeft: ' ',
      bottomRight: ' ',
      horizontal: '-',
      vertical: ' '
    }
  });

  console.info(ready);
  trace.clear();

}

/**
 * Stream Logs
 *
 * Constructs a box in the CLI and updates
 * the contents. Provides a clean UX experience
 * for executing bulk tasks, like uploading or
 * downloading theme contents
 */
export function stream ({
  running,
  store,
  file,
  total,
  size,
  errors
}: {
  running: string,
  store: string
  file: string
  total: number
  size: number
  output: string
  errors: number
}) {

  return boxen(
    (
      ` ${c.magenta('Running')}${c.dim(':')} ${c.white(running)}\n` +
      `   ${c.magenta('Shop')}${c.dim(':')} ${c.dim(c.underline(`${store}.myshopify.com`))}\n` +
      `    ${c.magenta('File')}${c.dim(':')} ${c.cyan(file)}\n` +
      `${c.magenta('Progress')}${c.dim(':')} ${c.cyan(total)} of ${c.cyan(size)}\n` +
      `   ${c.magenta('Error')}${c.dim(':')} ${c.red(errors)}`
    ),
    {
      padding: 1,
      margin: 1,
      borderColor: 'gray',
      dimBorder: true,
      borderStyle: 'round'
    }
  );

}

/**
 * Warning Log
 *
 * Prints a message in Yellow
 */
export function warn (message: string) {

  fancy(c.yellow(parse.string(message, 'yellowBright')));

}

/**
 * Issue Log
 *
 * Prints a message in Red, used when errors are
 * encountered in `watch` mode.
 */
export function issue (message: string) {

  fancy(
    c.red(
      parse.string(message, 'redBright')
    )
  );

}

/**
 * Ignore Log
 *
 * Prints a message in Red, used when errors are
 * encountered in `watch` mode.
 */
export function updating (themes: number, store: string) {

  fancy(`${
    c.cyanBright('Updating')
  } ${
    c.whiteBright(themes)
  } ${
    c.cyanBright(themes > 1 ? 'themes' : 'theme')
  } ${
    c.whiteBright('on')
  } '${
    c.cyanBright(store)
  }'`);

}

/**
 * Deletion Log
 */
export function deletion (sync: IThemes, file: string) {

  fancy(
    c.magenta('Deleted ') +
    '\'' + c.magenta(file) + '\'' +
    c.italic(c.dim(' from ')) +
    c.cyan(sync.store) + sync.counts.spaces + c.dim(' → ') +
    c.white(sync.target)
  );
}

/**
 * Uploaded Log
 */
export function creation (file: string) {

  fancy(c.cyan('Creation ') + '\'' + c.cyan(file) + '\'');

}

/**
 * Uploaded Log
 */
export function uploaded (sync: IThemes, file: string) {

  fancy(
    c.green('Uploaded ') +
    '\'' + c.green(file) + '\'' +
    c.italic(c.dim(' to ')) +
    c.cyan(sync.store) + sync.counts.spaces + c.dim(' → ') +
    c.white(sync.target)
  );

}

/**
 * Modified Log
 */
export function modified (file: string) {

  fancy(c.yellow('Modified ') + '\'' + c.yellow(file) + '\'');

}

/**
 * Ignoring Log
 */
export function ignoring (file: string) {

  fancy(c.gray('Ignoring ') + '\'' + c.gray(file) + '\'');

}

/**
 * Error Log
 *
 * Prints a message in Red. Typically called to
 * format a thrown `Error` which is using a custom
 * defined error message (ie: one written by syncify)
 */
export function error (e: { file: string; message: string; data: string | string[] }) {

  fancy(
    c.redBright('Error') +
    c.white(' in ') +
    '\'' + c.redBright(e.file) + '\'' +
    '\n\n    ' +
    c.redBright(parse.pretty(e.data) + '\n')
  );

}

/**
 * Clear CLI
 *
 * Clears the console logs. Accepts
 * a boolean which will determine whether
 * or not clear (`ctrl+k`) or remove the
 * previous logged outputs.
 */
export function clear (isSoft: boolean) {

  process.stdout.write(isSoft ? '\x1B[H\x1B[2J' : '\x1B[2J\x1B[3J\x1B[H\x1Bc');

}
