import { PartialDeep } from 'type-fest';
import { ISync, Logger } from 'types';
import { isEmpty, isNil } from 'rambdax';
import wrap from 'wrap-ansi';
import cleanStack from 'clean-stack';
import * as c from 'cli/colors';
import { toUpcase } from 'shared/shared';
import { keys, nil, is, values } from 'shared/native';
import { bundle } from '../options/index';
import * as timer from 'process/timer';
import { kill } from 'cli/exit';
import { queue } from 'requests/queue';
import { spawns } from 'cli/spawn';

/**
 * Shortcut to console log
 */
const { log } = console;

/**
 * TUI Tree - Crown
 *
 * `┌─`
 */
const crown = c.line('┌─ ');

/**
 * TUI Tree - Trunk
 *
 * `│`
 */
const trunk = c.line('│ ');

/**
 * TUI Tree - Branch
 *
 * `├ `
 */
const branch = c.line('├ ');

/**
 * TUI Tree - Root
 *
 * `└─`
 */
const root = c.line('└─ ');

/**
 * TUI Tree
 *
 * Tree line logging generator. This array list of
 * functions are used print information to the console
 *
 * Branches:
 *
 * - `0` `┌─`
 * - `1` `│`
 * - `2` `├ `
 * - `3` `└─`
 */
export const tree: Logger = [
  (message: string) => log('\n' + crown + c.pink.bold(toUpcase(message))),
  (message: string) => log(trunk + message),
  (message: string) => log(branch + message),
  (message: string) => log(trunk + '\n' + root + c.pink.bold(toUpcase(message)))
];

kill(() => {

  log('\n\n');

  spawns.forEach(function (child, name) {
    log('- ' + c.gray('pid: #' + child.pid + ' (' + name + ')' + ' process exited'));
    child.kill();
  });

  log('\n');

  queue.pause();
  queue.clear();
  spawns.clear();
  process.exit(0);

});

export const changes = (message: string) => {

  log(trunk + '\n' + root + message);

};

/**
 * Header
 *
 * Prints a small overview of runing resource, all operations
 * initialize with the header.
 *
 * ```
 * ┌─ Syncify v0.1.0.beta
 * │
 * │ Watch (production)
 * │
 * │ Syncing 2 stores and 6 themes
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
export function header () {

  if (bundle.mode.metafields) return '';

  /**
   * Plural Store/s
   */
  const SL = bundle.sync.stores.length;

  /**
   * Plural Theme/s
   */
  const TL = bundle.sync.stores.length;

  /* -------------------------------------------- */
  /* BEGIN                                        */
  /* -------------------------------------------- */

  const stores = c.cyan.bold(String(SL)) + (SL > 1 ? ' stores' : ' store');
  const themes = c.cyan.bold(String(TL)) + (TL > 1 ? ' themes' : ' theme');
  const env = c.reset.gray(`(${c.gray(bundle.dev ? 'development' : 'production')})`);

  let running: string;
  let heading: string;

  if (bundle.mode.build) {
    running = c.bold(`Build Mode ${env}`);
  } else if (bundle.mode.watch) {
    running = c.bold(`Watch Mode ${env}`);
  } else if (bundle.mode.upload) {
    running = c.bold('Uploading');
  } else if (bundle.mode.download) {
    running = c.bold('Download');
  } else if (bundle.mode.vsc) {
    running = c.bold(`VSCode (${c.bold.gray('generation')})`);
  } else if (bundle.mode.clean) {
    running = c.bold('Cleaning');
  } else if (bundle.mode.export) {
    running = c.bold('Exporting');
  }

  heading = (
    `${crown + c.pink.bold('Syncify')} ${c.gray('v<!version!>')}\n${trunk}\n` +
    `${trunk}${running}\n${trunk}\n`
  );

  if (SL > 0 && TL > 0) heading += `${trunk}Syncing ${themes} to ${stores}\n`;

  if (!bundle.mode.upload) {
    if (!isNil(bundle.spawn)) {
      const s = keys(bundle.spawn).length;
      heading += `${trunk}Spawned ${c.cyan.bold(`${s}`)} child ${s > 1 ? 'processes' : 'process'}\n`;
    }
  } else {
    heading += trunk;
  }

  const message = (
    bundle.mode.upload ||
    bundle.mode.download ||
    bundle.mode.build ||
    bundle.mode.clean ||
    bundle.mode.vsc
  ) ? heading : heading + previews(bundle.sync);

  log(message);

};

/**
 * Theme Previews
 *
 * Generate an aligned list of theme preview urls
 * when we are in watch mode.
 */
function previews (sync: PartialDeep<ISync>) {

  if (sync.themes.length === 0) return nil;

  const themes = values(sync.themes);
  const width = themes.reduce((size, { target }) => (target.length > size ? target.length : size), 0);
  const urls = themes.map(({ id, store, target }) => (
    trunk + ' '.repeat(width - target.length) + c.whiteBright(toUpcase(target)) + ': ' +
    c.underline.gray('https://' + store + '?preview_theme_id=' + id)
  ));

  return `${trunk}\n${trunk}${c.bold('Theme Previews:')}\n${trunk}\n${urls.join('\n')}\n${trunk}`;

};

let tracer: string = '';

/**
 * Summary Report
 *
 * Generates a small summary after a build has completed
 * that prints execution time and resource
 */
export function summary (group: string) {

  if (bundle.mode.build) {

    tracer += (
      c.line('│ ') +
      c.greenBright('✓ ') +
     `${c.bold(toUpcase(group))} ${c.white('in')} ${c.bold(timer.stop())}\n`
    );

    return '\n' + (
      c.line('┌─ ') + c.pink.bold(toUpcase(group)) + c.gray(' syncify <!version!>') + '\n' +
      c.line('│ ') + '\n' + tracer +
      c.line('│ ') + '\n'
    );
  }

  return '\n' + (
    c.line('┌─ ') + c.pink.bold(toUpcase(group)) + c.gray(' syncify <!version!>') + '\n' +
    c.line('│ ') + '\n'
  );

}

/**
 * Spawned Processes
 *
 * Logging interface for spawned running operations. Syncify
 * attempts to normalize the output of spawned processes (to some degree).
 *
 * ```
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * ```
 */
export function spawn (message: string) {

  const limit = process.stdout.columns - 5;
  const error = message.search(/(?:\n {4}at .*)/);

  let lines: string[];
  let stderr: string = nil;
  const stdout: string[] = [];

  if (error > 0) {

    lines = message.slice(0, error).split('\n');
    stderr = c.line('│ ') + cleanStack(message.slice(error), {
      pretty: true,
      basePath: bundle.cwd
    });

    stderr = wrap(stderr, limit).replace(/^\s+/g, `\n${c.line('│')} `);

  } else {

    lines = message.split('\n');

  }

  const size = lines.length - 1;

  for (let i = 0; i < size; i++) {

    // reset ansi syntax and ensure clean logs
    let line = c.reset(lines[i]);

    // break if last line is an empty string
    if (is(size, i) && isEmpty(lines[i])) break;

    // if line start with a single whitespace character
    if (is(line.charCodeAt(0), 32)) line = line.trimStart();

    if (isEmpty(line)) continue;

    // wrap logs that exceed the current column width
    line = wrap(line, limit).replace(/\n/g, `\n${c.line('│')} `);

    // prepend the dash
    stdout.push(`${c.line('│')} ${line}`);

  }

  return `${c.line('│')}\n${stdout.join('\n')}${stderr}${c.line('│')}\n`;

}

/**
 * Group - Printed first upon running resource
 *
 * ```
 * │
 * ├─ Title
 * │
 * ```
 */
export function title (title: string) {

  if (title !== 'warning' && title !== 'error') timer.start();

  return `${c.line('│')}\n${c.line('├─')} ${c.bold(toUpcase(title))}\n${c.line('│')}\n`;

};

/**
 * Logs a Newline
 *
 * `│`
 */
export function newline () {

  return log(trunk);

}

export function warn (stdout: string) {

  return log(`${trunk}${c.yellowBright.bold('(!) ' + stdout)}`);

}
