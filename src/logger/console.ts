import notifier from 'node-notifier';
import zlib from 'node:zlib';
import { lastPath } from '../shared/paths';
import { nil } from '../shared/native';
import { byteConvert, byteSize, sanitize } from '../shared/utils';
import { intercept } from '../cli/intercept';
import { bundle } from '../options/index';
import * as tui from '../cli/tui';
import * as c from '../cli/ansi';
import { Group, IFile, IThemes } from 'types';
import * as timer from '../process/timer';

/* -------------------------------------------- */
/* RE-EXPORTS                                   */
/* -------------------------------------------- */

export { syncing, deleted, updated, warning } from '../cli/tui';

/**
 * Warning stacks, maintains a store of log messages
 */
const warnings: { [filename: string]: Set<string>; } = {};

/**
 * The interception warner
 */
let warner: string = nil;

/**
 * Stdout/Stderr interception hook
 */
let listen: () => void = null;

/**
 * Current Filename
 */
let group: Group = 'SYNCIFY';

/**
 * Current Filename
 */
let title: string = nil;

/**
 * Current Filename
 */
let uri: string = nil;

/**
 * Enabled interceptor
 */
export const hook = (name: string) => {

  warner = name;
  listen = intercept((stream, data) => {
    if (data.charCodeAt(0) === 9474) {
      process[stream].write(data);
    } else {
      const text = data.split('\n');
      while (text.length !== 0) warnings[uri].add(`${c.yellowBright(text.shift().trimStart())}`);
    }
  });

};

/**
 * Disable interceptor
 */
export const unhook = () => {

  if (typeof listen === 'function') {
    listen();
    listen = null;
  }

  if (uri in warnings && warnings[uri].size === 0) return;

  tui.warning(`${c.bold(`${warner}`)} ~ type ${c.bold('w')} and press ${c.bold('enter')} to view`);

  process.stdin.on('data', data => {

    const input = data.toString().trim().toLowerCase();

    if (input === 'w') {

      tui.title('Warnings:', 'yellow');

      for (const message of warnings[uri].values()) {
        if (typeof message === 'string' && message.length > 0) tui.write(message);
      }

      warner = null;
      warnings[uri].clear();

    }
  });

};

/**
 * Set current file
 */
export const changed = (file: IFile) => {

  tui.closed(group);

  // do not clear if first run
  if (group !== 'SYNCIFY') tui.clear();

  group = file.namespace;

  tui.opened(group);
  tui.title(file.key);
  title = file.key;

  const filename = lastPath(file.input) + '/' + file.base;

  // Create stack reference model
  if (!(filename in warnings)) warnings[filename] = new Set();
  if (uri !== filename) uri = filename; // Update the current records

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
 * Log file size stats, used in minification
 */
export const filesize = (file: IFile, content: string | Buffer) => {

  const size = byteSize(content);
  const before = byteConvert(file.size);
  const after = byteConvert(size);

  if ((size > file.size || (size === file.size))) {
    const gzip = byteConvert(zlib.gzipSync(content).length);
    tui.compile(`${before} ${c.gray(`~ gzip ${gzip}`)}`);
  } else {
    tui.compile(`${before} → ${after} ${c.gray(`saved ${byteConvert(file.size - size)}`)}`);
  }
};

/**
 * Log Information
 */
export const info = (message: string) => {

  tui.message(message);

};

/**
 * Log Error
 */
export const error = (...message: string[]) => {

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

/**
 * Log Warning
 */
export const warn = (message: string) => {

  if (typeof message === 'string') {

    const text = message.split('\n');

    if (typeof listen === 'function') {
      while (text.length !== 0) warnings[uri].add(text.shift());
    } else {
      while (text.length !== 0) tui.warning(text.shift());
    }
  }
};

/**
 * Spawn Logging
 *
 * This function is responsible for spawned logs and also
 * informs about invoked spawned processes, which is not ideal
 * but suffices (for now).
 */
export const spawn = (name: string) => (...message: string[]) => {

  if (!bundle.spawn.invoked) bundle.spawn.invoked = true;

  if (group !== 'SPAWNS') {

    tui.closed(group);

    // do not clear if first run
    if (group !== 'SYNCIFY') tui.clear();

    // update name reference
    tui.opened('SPAWNS');
    group = 'SPAWNS';
  }

  if (title !== name) {
    // update spawn process title
    tui.title(name);
    title = name;

  }

  tui.spawn(sanitize(message.shift()));

};
