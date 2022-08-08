import { relative } from 'node:path';
import notifier from 'node-notifier';
import { lastPath } from '../shared/paths';
import { nil } from '../shared/native';
import { sanitize } from '../shared/utils';
import { intercept } from '../cli/intercept';
import { bundle } from '../options/index';
import * as tui from '../cli/tui';
import * as c from '../cli/ansi';
import { Group, IFile, IThemes } from 'types';
import * as timer from '../process/timer';

export { syncing, deleted, updated, warning } from '../cli/tui';

/**
 * Warning stacks, maintains a store of log messages
 */
const warnings: { [filename: string]: Set<string>; } = {};

/**
 * Stdout/Stderr Interception
 */
let $intercept: () => void = null;

/**
 * Current Filename
 */
let group: Group = 'syncify';

/**
 * Current Filename
 */
let title: string = nil;
/**
 * Current Filename
 */
let $filename: string = nil;

export const active: 1 | 2 | 3 = 1;

/**
 * Enabled interceptor
 */
export function listen () {

  $intercept = intercept((stream, data) => {

    if (data.charCodeAt(0) === 9474) {
      process[stream].write(data);
    } else {
      warnings[$filename].add(data);
    }

  });

};

/**
 * Disable interceptor
 */
export function reset () {

  $intercept();

  if ($filename in warnings && warnings[$filename].size > 0) {

    tui.nwl();
    tui.write(c.yellow.bold('(!) Warnings'));
    tui.nwl();

    for (const warn of warnings[$filename]) {
      if (!warn) {
        const text = warn.split('\n');
        while (text.length !== 0) tui.warning(text.shift().trimStart());
      }
    }

    warnings[$filename].clear();

  }

};

/**
 * Set current file
 */
export function changed (file: IFile) {

  tui.closed(group);

  // do not clear if first run
  if (group !== 'syncify') tui.clear();

  group = file.namespace;

  tui.opened(group);
  tui.title(relative(bundle.dirs.input, file.input));

  const filename = lastPath(file.input) + '/' + file.base;

  // Create stack reference model
  if (!(file.base in warnings)) warnings[filename] = new Set();
  if ($filename !== filename) $filename = filename; // Update the current records

  if (bundle.mode.watch) {
    tui.changed(c.bold(filename));
  }

};

export function upload (theme: IThemes) {

  tui.updated(`${c.bold(theme.target)} → ${theme.store} ${c.gray('~ ' + timer.stop())}`);

}

export function compile (message: string) {

  tui.compile(message);

}

/**
 * Log Information
 *
 */
export function info (message: string) {

  tui.message(message);

};

/**
 * Log Error
 */
export function error (...message: string[]) {

  // Object
  notifier.notify({
    title: 'Syncify Error',
    sound: true
  });

  while (message.length !== 0) {

    const text = sanitize(message.shift());

    tui.nwl();

    for (const warn of text.split('\n')) {
      if (warn) {
        const text = warn.split('\n');
        while (text.length !== 0) tui.write(text.shift());
      }
    }
  }

};

export function optionWarn (...message: string[]) {

  while (message.length !== 0) {

    let text: string[] | string = sanitize(message.shift());

    if (/\n/.test(text)) {
      text = text.split('\n');
      while (text.length !== 0) tui.write(c.yellow(text.shift()));
    } else {

      tui.write(c.yellow.bold('(!) ' + text));

    }
  }

  tui.nwl();
}

/**
 * Log Warning
 */
export function warn (...message: string[]) {

  while (message.length !== 0) {

    let text: string[] | string = sanitize(message.shift());

    if (/\n/.test(text)) {
      text = text.split('\n');
      while (text.length !== 0) tui.warning(text.shift());
    } else {

      tui.warning(text);

    }
  }

};

/**
 * Spawn log
 */
export const spawn = (name: string) => (...message: string[]) => {

  if (!bundle.spawn.invoked) bundle.spawn.invoked = true;

  if (group !== 'spawns') {

    tui.closed(group);

    // do not clear if first run
    if (group !== 'syncify') tui.clear();

    // update name reference
    tui.opened('spawns');
    group = 'spawns';
  }

  if (title !== name) {
    // update spawn process title
    tui.title(name);
    title = name;

  }

  tui.spawn(sanitize(message.shift()));

};
