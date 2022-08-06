import { basename } from 'path';
import notifier from 'node-notifier';
import { queue } from '../requests/queue';
import { nil, log } from '../shared/native';
import { sanitize } from '../shared/utils';
import { intercept } from '../cli/intercept';
import { spawns } from '../cli/spawn';
import { bundle } from '../options/index';
import { kill } from '../cli/exit';
import * as tui from '../cli/tui';
import * as c from '../cli/colors';
import { IFile, IThemes } from 'types';
import * as timer from '../process/timer';

kill(() => {

  spawns.forEach(function ({ child }, name) {
    log('- ' + c.gray('pid: #' + child.pid + ' (' + name + ')' + ' process exited'));
    child.kill();
  });

  log('\n');

  queue.pause();
  queue.clear();
  spawns.clear();
  process.exit(0);

});

/**
 * Warning stacks, maintains a store of log messages
 */
const warnings: { [filename: string]: Set<string>; } = {};

/**
 * Stdout/Stderr Interception
 */
let $intercept: () => void = null;
/**
 * Current Group Label
 */
let pid: number = -1;
/**
 * Current Group Label
 */
let $group: string = 'Syncify';
/**
 * Current Filename
 */
let $filename: string = '';

/**
 * Clear console
 */
export function clear (purge?: boolean) {

  if (purge) {
    process.stdout.write(c.purge);
  } else {
    process.stdout.write(c.clear);
  }

};

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

  if (bundle.build.spawn === 3) {

    $intercept();

    if ($filename in warnings && warnings[$filename].size > 0) {

      tui.newline();
      tui.tree[1](c.yellow.bold('(!) Warnings'));
      tui.newline();

      for (const warn of warnings[$filename]) {
        if (!warn) {
          const text = warn.split('\n');
          while (text.length !== 0) tui.tree[1](c.yellowBright(text.shift().trimStart()));
        }
      }

      warnings[$filename].clear();

    }

    bundle.build.spawn = 2;
  }

};

/**
 * Set current file
 */
export function file (filename: string) {

  // Create stack reference model
  if (!(filename in warnings)) warnings[filename] = new Set();

  if (bundle.mode.watch) {
    tui.newline();
    if ($filename !== filename) {
      tui.tree[1](c.gray(filename));
      tui.newline();
      $filename = filename; // Update the current records
    }

  } else {
    $filename = filename; // Update the current records
  }
};

/**
 * Set logger group
 */
export function group (label: string) {

  if (label === 'assets' && (
    bundle.build.spawn === 3 ||
    bundle.build.spawn === 1
  )) return { file };

  if ($group !== label) {

    if ($group !== nil) {
      if ($group === 'Syncify') tui.newline();
      tui.tree[3]($group); // Close the current log group
      clear();
    }

    // Log the new group
    tui.tree[0](label);

    if (bundle.mode.build) {
      tui.newline();
    }

    // Update the current records
    $group = label;

  }

  return { file };

};

export function upload (file: IFile, theme: IThemes) {

  const isSpawn = bundle.build.spawn === 3;

  if (isSpawn) tui.newline();

  info(c.whiteBright(`syncing ${c.bold(basename(file.key))}`));
  info(c.green(`updated ${c.bold(theme.target)} in ${c.bold(theme.store)} ${c.gray(`µ${timer.stop()}`)}`));

  if (isSpawn) tui.newline();
}

/**
 * Log Information
 *
 * - `0` `┌─`
 * - `1` `│`
 * - `2` `├ `
 * - `3` `└─`
 */
export function info (message: string, branch: 0 | 1 | 2 | 3 = 2) {

  tui.tree[branch](message);

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

    tui.newline();

    for (const warn of text.split('\n')) {
      if (warn) {
        const text = warn.split('\n');
        while (text.length !== 0) tui.tree[1](c.redBright(text.shift().trimStart()));
      }
    }
  }

};

/**
 * Log Warning
 */
export function warn (...message: string[]) {

  while (message.length !== 0) {

    let text: string[] | string = sanitize(message.shift());

    if (/\n/.test(text)) {
      text = text.split('\n');
      while (text.length !== 0) tui.tree[1](c.yellow(text.shift()));
    } else {
      if ($group === 'Syncify') {
        tui.tree[1](c.yellow.bold('(!) ' + text));
      } else {
        tui.newline();
        tui.tree[1](c.yellow(text));
        tui.newline();
      }

    }
  }

  if ($group === 'Syncify') tui.newline();
};

/**
 * Spawn log
 */
export function spawn (spawn: string) {

  return (...message: string[]) => {

    const spwn = spawns.get(spawn);
    const { ready, child } = spwn;

    if (!ready) {
      spwn.ready = true;
      bundle.build.spawn = 1;
      tui.spawnsReady(spawn, child.pid);
      return;
    }

    if (bundle.build.spawn === 1) bundle.build.spawn = 2;
    if (spawn !== $group && ready) group(spawn);

    if (child.pid !== pid) {
      tui.newline();
      tui.tree[1](c.gray(`pid: ${child.pid}`));
      tui.newline();
      pid = child.pid;
    }

    while (message.length !== 0) {
      const stdout = sanitize(message.shift());
      process.stdout.write(tui.spawn(stdout));
    }

  };

};
