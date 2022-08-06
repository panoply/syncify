import { Logger } from 'types';
import { isNil } from 'rambdax';
import wrap from 'wrap-ansi';
import cleanStack from 'clean-stack';
import { toUpcase } from '../shared/utils';
import { log, keys, nil, values } from '../shared/native';
import { bold, cyan, reset, gray, pink, underline, whiteBright } from './colors';
import { trunk, crown, branch, root } from './chars';
import { bundle } from '../options/index';

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
  (message: string) => log('\n' + crown + pink.bold(toUpcase(message))),
  (message: string) => log(trunk + message),
  (message: string) => log(branch + message),
  (message: string) => log(root + pink.bold(toUpcase(message)))
];

/**
 * TUI Newline
 *
 * Inserts a newline _trunk_ character
 *
 * `│`
 */
export const newline = () => log(trunk);

/**
 * TUI Waiting
 *
 * Prints a waiting text reference
 *
 * ```
 * │
 * └─ [2029 5:21:29] waiting for changes...
 * ```
 */
export const waiting = (message: string) => log(trunk + message);

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
  const TL = keys(bundle.sync.themes).length;

  /* -------------------------------------------- */
  /* BEGIN                                        */
  /* -------------------------------------------- */

  const stores = cyan.bold(String(SL)) + (SL > 1 ? ' stores' : ' store');
  const themes = cyan.bold(String(TL)) + (TL > 1 ? ' themes' : ' theme');
  const env = reset.gray(`(${gray(bundle.dev ? 'development' : 'production')})`);

  let running: string;
  let heading: string;

  if (bundle.mode.build) {
    running = bold(`Build Mode ${env}`);
  } else if (bundle.mode.watch) {
    running = bold(`Watch Mode ${env}`);
  } else if (bundle.mode.upload) {
    running = bold('Uploading');
  } else if (bundle.mode.download) {
    running = bold('Download');
  } else if (bundle.mode.vsc) {
    running = bold(`VSCode (${bold.gray('generation')})`);
  } else if (bundle.mode.clean) {
    running = bold('Cleaning');
  } else if (bundle.mode.export) {
    running = bold('Exporting');
  }

  heading = (
    `${crown + pink.bold('Syncify')} ${gray('v<!version!>')}\n${trunk}\n` +
    `${trunk}${running}\n${trunk}\n`
  );

  if (SL > 0 && TL > 0) heading += `${trunk}Syncing ${themes} to ${stores}\n`;

  if (!bundle.mode.upload) {
    if (!isNil(bundle.spawn)) {
      const s = keys(bundle.spawn).length;
      heading += `${trunk}Spawning ${cyan.bold(`${s}`)} child ${s > 1 ? 'processes' : 'process'}\n`;
    }
  } else {
    heading += trunk;
  }

  if (
    bundle.mode.upload ||
    bundle.mode.download ||
    bundle.mode.build ||
    bundle.mode.clean ||
    bundle.mode.vsc) {

    log(heading);

  } else {

    if (TL > 0) {

      const themes = values(bundle.sync.themes);

      const width = themes.reduce((size, { target }) => (
        target.length > size ? target.length : size
      ), 0);

      const urls = themes.map(({ id, store, target }) => (
        trunk + ' '.repeat(width - target.length) + whiteBright(toUpcase(target)) + ': ' +
        underline.gray('https://' + store + '?preview_theme_id=' + id)
      )).join('\n');

      log(`${heading}${trunk}\n${trunk}${bold('Theme Previews:')}\n${trunk}\n${urls}\n${trunk}`);

    } else {

      log(heading);

    }

  }

};

export function spawnsHeader () {

  if (!bundle.mode.upload) {
    if (!isNil(bundle.spawn)) {
      log(`${trunk}${bold('Spawn Processes:')}\n${trunk}`);
    }
  }

}

export function spawnsReady (name: string, pid: number) {

  tree[1](`${gray('PID')} ${pid}: ${pink(name)}`);

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

  const stdout: string[] = [];
  const limit = process.stdout.columns - 5;
  const error = message.search(/(?:\n {4}at .*)/);

  let lines: string[];
  let stderr: string = nil;

  if (error > 0) {

    lines = message.slice(0, error).split('\n');
    lines.push(trunk);

    stderr = cleanStack(message.slice(error), {
      pretty: true,
      basePath: bundle.cwd
    });

    const temp = [ trunk ];

    for (const err of wrap(stderr, limit).split('\n')) temp.push(trunk + err);

    temp.push('\n', trunk);
    stderr = temp.join('\n');

  } else {

    lines = message.split('\n');

  }

  const size = lines.length - 1;

  for (let i = 0; i < size; i++) {

    // reset ansi syntax and ensure clean logs
    const line = lines[i];

    // prepend the dash
    stdout.push(trunk + line);

  }

  bundle.build.spawn = 3;

  return `${stdout.join('\n')}${stderr}\n`;

}
