import * as c from 'cli/colors';
import { isNil } from 'rambdax';
import { toUpcase } from 'shared/helpers';
import { keys } from 'shared/native';
import { IConfig, IThemes } from 'types';

/**
 * Alignment - Returns aligned themes previews upon initialization
 */
const alignment = (themes: IThemes[]) => {

  const width = themes.reduce((size, { target }) => {
    if (target.length > size) size = target.length;
    return size;
  }, 0);

  const previews = themes.map(({ id, domain, target }) => {
    const offset = width - target.length;
    return (
      c.line('│ ') + ' '.repeat((offset)) + c.pink.bold(target) + ': ' +
      c.gray('https://' + domain + '?preview_theme_id=' + id)
    );
  });

  return previews.join('\n');

};

/* -------------------------------------------- */
/* PUBLIC                                       */
/* -------------------------------------------- */

/**
 * Prepend - Prepends vertical line to texts
 *
 * ```
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * ```
 */
export const indent = (message: string) => message.replace(/^/gm, c.line('│  ')) + '\n';

/**
 * Header - Prints a small overview of runing resource
 *
 * ```
 * ┌── Syncify v0.1.0.beta
 * │
 * │ Running in watch mode (production)
 * │ Syncing to 2 stores and 6 themes
 * │ Spawned 1 process in the asset pipline
 * │
 * │ Theme previews:
 * │
 * │  - https://shop.myshopify.com?preview_theme_id=123456789
 * │  - https://shop.myshopify.com?preview_theme_id=123456789
 * │  - https://shop.myshopify.com?preview_theme_id=123456789
 * │  - https://shop.myshopify.com?preview_theme_id=123456789
 * │
 * ```
 */
export const header = ({ sync, spawns, env, mode }: IConfig) => {

  const stores = c.cyan.bold(String(sync.stores.length)) + (sync.stores.length > 1 ? ' stores' : ' store');
  const themes = c.cyan.bold(String(sync.themes.length)) + (sync.themes.length > 1 ? ' themes' : ' theme');
  const preview = alignment(sync.themes);

  let running: string;

  if (mode.vsc) running = 'vscode generation';
  if (mode.build) running = 'build';
  if (mode.watch) running = 'watch';
  if (mode.upload) running = 'upload';
  if (mode.download) running = 'download';

  let heading: string = '\n' + (
    c.line('┌─ ') + c.cyan.bold('Syncify ') + c.gray('<!version!>') + '\n' +
    c.line('│ ') + '\n' +
    c.line('│ ') + 'Running ' + c.cyan.bold(running) + ' mode in ' + c.cyan.bold(env) + '\n' +
    c.line('│ ') + 'Syncing to ' + stores + '  and ' + themes + '\n'
  );

  if (!isNil(spawns)) {
    const size = keys(spawns).length;
    const spawned = c.cyan.bold(String(size)) + (size > 1 ? ' child processes' : ' child process');
    heading += c.line('│ ') + 'Spawned ' + spawned + '\n' + c.line('│\n');
  }

  return (mode.build || mode.clean || mode.vsc) ? heading : heading + (
    c.line('│ ') + 'Previews:' + c.line('\n│\n') + preview + '\n' +
    c.line('│ ') + '\n'
  );

};

/**
 * Group - Printed first upon running resource
 *
 * `├─ title`
 */
export const group = (title: string) => (
  c.line('│\n├─ ') + c.bold.doubleUnderline(toUpcase(title)) + c.line('\n│\n')
);

/**
 * Task - Prints the executed task/operation
 *
 * `│`
 */
export const newline = (amount = 1) => c.line('│\n'.repeat(amount));

/**
 * Task - Prints the executed task/operation
 *
 * `│`
 */
export const task = (message: string) => c.line('├ ') + message + '\n';

/**
 * Footer - Printed as the very bottom
 *
 * `└── message`
 */
export const footer = (message: string) => c.line('│\n└── ') + c.cyan(message) + '\n\n';
