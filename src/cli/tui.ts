import { PartialDeep } from 'type-fest';
import { ISync } from 'types';
import { isEmpty, isNil, last } from 'rambdax';
import wrap from 'wrap-ansi';
import cleanStack from 'clean-stack';
import * as c from 'cli/ansi';
import { toUpcase } from 'shared/shared';
import { keys, nil, is } from 'shared/native';
import { bundle } from 'options';
import * as timer from 'process/timer';

/**
 * Theme Previews
 *
 * Generate an aligned list of theme preview urls
 * when we are in watch mode.
 */
function previews (sync: PartialDeep<ISync>) {

  if (sync.themes.length === 0) return '';

  const width = sync.themes.reduce((size, { target }) => (
    target.length > size
      ? target.length
      : size
  ), 0);

  const urls = sync.themes.map(({
    id,
    store,
    target
  }) => (
    c.line('│ ') + ' '.repeat(width - target.length) + c.pink.bold(target) + ': ' +
    c.gray('https://' + store + '?preview_theme_id=' + id)
  ));

  return (
    c.line('│') +
    ' Previews:\n' +
    c.line('│') + '\n' +
    urls.join('\n') + '\n'
  );

};

/**
 * Header - Prints a small overview of runing resource
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

  const SL = bundle.sync.stores.length;
  const TL = bundle.sync.stores.length;

  const stores = c.cyan.bold(String(SL)) + (SL > 1 ? ' stores' : ' store');
  const themes = c.cyan.bold(String(TL)) + (TL > 1 ? ' themes' : ' theme');
  const env = bundle.dev ? c.cyan.bold('Development') : c.cyan.bold('Production');

  let running: string;
  let heading: string;

  if (bundle.mode.build) running = 'build';
  else if (bundle.mode.watch) running = 'watch';
  else if (bundle.mode.upload) running = 'upload';
  else if (bundle.mode.download) running = 'download';
  else if (bundle.mode.vsc) running = 'vscode generation';

  heading = '\n' + (
    c.line('┌─ ') + c.pink.bold('Syncify ') + c.gray('<!version!>') + '\n' +
    c.line('│ ') + '\n' +
    c.line('│ ') + env + c.line('\n│\n') +
    c.line('│ ') + 'Running ' + c.cyan.bold(running) + ' mode' + '\n'
  );

  if (SL > 0 && TL > 0) {
    heading += c.line('│ ') + 'Syncing to ' + stores + ' and ' + themes + '\n';
  }

  if (!isNil(bundle.spawn)) {
    const size = keys(bundle.spawn).length;
    const spawned = c.cyan.bold(String(size)) + (size > 1 ? ' child processes' : ' child process');
    heading += c.line('│') + ' Spawned ' + spawned + '\n' + c.line('│') + '\n';
  }

  return (
    bundle.mode.build ||
    bundle.mode.clean ||
    bundle.mode.vsc
  ) ? heading : heading + previews(bundle.sync);

};

let tracer: string = '';

export function fixed (group: string) {

  tracer += (
    c.line('│ ') +
    c.greenBright('✓ ') +
    `${c.bold(toUpcase(group))} ${c.white('in')} ${c.bold(timer.stop())}\n`
  );

  return '\n' + (
    c.line('┌─ ') + c.pink.bold('Building ' + toUpcase(group)) + c.gray(' syncify <!version!>') + '\n' +
    c.line('│ ') + '\n' + tracer +
    c.line('│ ') + '\n'
  );

}

/**
 * Prepend Line to stdout
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
  let stdout: string = nil;

  if (error > 0) {

    lines = message.slice(0, error).split('\n');
    stderr = c.line('│ ') + cleanStack(message.slice(error), {
      pretty: true,
      basePath: bundle.cwd
    });

    stderr = wrap(stderr, limit).replace(/\n/g, `\n${c.line('│')} `);

  } else {

    lines = message.split('\n');

  }

  const size = lines.length - 1;

  // remove the last line if its an empty string
  if (isEmpty(last(lines))) lines.pop();

  for (let i = 0; i < size; i++) {

    // reset ansi syntax and ensure clean logs
    let line = c.reset(lines[i]);

    // break if last line is an empty string
    if (is(size, i) && isEmpty(lines[i])) break;

    // strip ansi from string
    const strip = c.strip(line);

    // when spawn is rollup, omit the version title from logs
    if (/rollup\sv[0-9.]+/.test(strip)) continue;

    // if line start with a single whitespace character
    if (is(line.charCodeAt(0), 32)) line = line.trimStart();

    if (isEmpty(line)) continue;

    // wrap logs that exceed the current column width
    line = wrap(line, limit).replace(/\n/g, `\n${c.line('│')} `);

    // prepend the dash
    stdout += `${c.line('│')} ${line}\n`;

  }

  return stdout + stderr + c.line('│') + '\n';

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

  timer.start();

  return `${c.line('│')}\n${c.line('├─')} ${c.bold(toUpcase(title))}\n${c.line('│')}\n`;

};

/**
 * Newline
 *
 * `│`
 */
export function newline (amount = 1) {

  return `${c.line('│')}\n`.repeat(amount);

}

/**
 * Task - Prints the executed task/operation
 *
 * `├`
 */
export function task (stdout: string) {

  return `${c.line('├─')} ${stdout}\n`;

}

/**
 * Message - Prints the executed task/operation
 *
 * - ` ├ ` When passing `indent` option a `true` value (a single space before is applied)
 * - ` └ ` When passing `indent` and `ender` options a `true` value
 *  - `├ ` When passing no options (the default)
 */
export function message (stdout: string, { indent = false, ender = false }) {

  return `${c.line(indent && ender ? '│  └─ ' : indent ? '│  ├─ ' : '├─  ')}${stdout}\n`;

}

/**
 * Footer - Printed as the very bottom
 *
 * `└─ message`
 */
export function footer (stdout: string) {

  return `${c.line('│')}\n${c.line('└─')} ${c.pink.bold(stdout)} \n\n`;

}
