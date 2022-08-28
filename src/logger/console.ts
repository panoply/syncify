import notifier from 'node-notifier';
import zlib from 'node:zlib';
import { has } from 'rambdax';
import { nil } from '../shared/native';
import { byteConvert, byteSize, sanitize } from '../shared/utils';
import { intercept } from '../cli/intercept';
import { bundle, hot } from '../options/index';
import { queue } from '../requests/queue';
import { Group, File, Theme } from 'types';
import * as timer from '../process/timer';
import * as tui from '../cli/tui';
import * as c from '../cli/ansi';

/* -------------------------------------------- */
/* RE-EXPORTS                                   */
/* -------------------------------------------- */

export { deleted, updated, processor as process, uploaded, transform } from '../cli/tui';

/**
 * Warning stacks, maintains a store of log messages
 */
export const warning: {
  current: string;
  count: number;
  process: { [id: string]: Set<string> }
} = {
  current: null,
  count: 0,
  process: {}
};

const uploads: Set<[string, string, string]> = new Set();

/**
 * Stdout/Stderr interception hook
 */
let listen: () => void = null;

/**
 * Whether or not we are in idle
 */
let idle: boolean = false;

/**
 * File Kind
 */
let kind: string = '';

/**
 * Current Filename
 */
let group: Group = 'Syncify';

/**
 * Current Filename
 */
let title: string = nil;

/**
 * Current Filename
 */
let uri: string = nil;

process.stdin.on('data', data => {

  const input = data.toString().trim().toLowerCase();

  if (input === 'w') {

    for (const prop in warning.process) {

      if (warning.process[prop].size === 0) continue;

      tui.title(prop, 'yellow');

      for (const message of warning.process[prop].values()) {
        if (typeof message === 'string' && message.length > 0) tui.write(message);
      }

      warning.process[prop].clear();
    }

    warning.count = 0;

  }

});

/**
 * Listens on `stdout` and Intercepts logs
 * messages. Maintains a reference of warning/stdout
 * invoked by different processes.
 */
export const hook = (name: string) => {

  if (warning.current !== name) warning.current = name;
  if (!has(name, warning.process)) {
    warning.current = name;
    warning.process[name] = new Set();
  }

  listen = intercept((stream, data) => {
    if (data.charCodeAt(0) === 9474) {
      process[stream].write(data);
    } else {
      warning.count += 1;
      const text = data.split('\n');
      while (text.length !== 0) {
        warning.process[name].add(`${c.yellowBright(text.shift().trimStart())}`);
      }
    }
  });

};

export const complete = () => {

};

/**
 * Removes log listener and prints intercepted
 * messages. Captured logs can be printed based on
 * `stdin` input.
 */
export const unhook = () => {

  listen();
  listen = null;

};

export const syncing = (message: string) => {

  if (warning.count > 0) {
    const count = c.bold(`! ${warning.count} ${warning.count > 1 ? 'warnings' : 'warning'}`);
    tui.warning(`${count} ${c.yellowBright(`~ Type ${c.bold('w')} and press ${c.bold('enter')} to view`)}`);
  }

  if (bundle.hot) {
    tui.reloaded(c.bold('HOT REPLACEMENT'), timer.now());
  }

  tui.syncing(message);

  if (queue.pending > 0) tui.queued(message, queue.pending);

};

/**
 * Set current file
 */
export const changed = (file: File) => {

  const close = title !== file.relative;

  timer.start();

  // close previous group
  if (close) tui.closed(group);

  // do not clear if first run
  if (group !== 'Syncify' && close) tui.clear();

  // update group
  group = file.namespace;

  // open new group
  if (close) {
    tui.clear();
    tui.title(file.kind);
    kind = file.kind;
    title = file.relative;
  }

  // Create stack reference model
  if (!(file.relative in warning)) warning[file.relative] = new Set();
  if (uri !== file.relative) uri = file.relative; // Update the current records

  if (bundle.mode.watch) {
    tui.nwl();
    tui.changed(file.relative);
  }
};

export const upload = (theme: Theme) => {

  uploads.add([ theme.target, theme.store, timer.stop() ]);

  if (!idle) {
    idle = true;
    queue.onIdle().then(() => {
      uploads.forEach(([ target, store, time ]) => tui.uploaded(target, store, time));
      uploads.clear();
      idle = false;
    });
  }

};

/**
 * Log file size stats, used in minification
 */
export const filesize = (file: File, content: string | Buffer) => {

  const size = byteSize(content);
  const before = byteConvert(file.size);
  const after = byteConvert(size);

  if ((size > file.size || (size === file.size))) {
    const gzip = byteConvert(zlib.gzipSync(content).length);
    tui.transform(`filesize ${before} → gzip ${gzip}`);
  } else {
    tui.item(`minified ${before} → ${after} ${c.gray(`saved ${byteConvert(file.size - size)}`)}`);
  }
};

/**
 * Log Information
 */
export const info = (message: string) => {

  tui.message(message);

};

export const throws = (message: string) => {

  tui.nwl();

  console.log(message);

};

/**
 * Log Error
 */
export const error = (message: string, file: File) => {

  if (queue.pending > 0) {
    tui.item(c.orange.bold(`${queue.pending} ${queue.pending > 1 ? 'requests' : 'request'} in queue`));
    queue.pause();
  }

  // Object
  notifier.notify({
    title: 'Syncify Error',
    sound: 'Pop',
    open: file.input,
    subtitle: message,
    message: file.relative
  }).notify();

  tui.write(c.redBright.bold(message));
  tui.nwl();

};

/**
 * Log Warning
 */
export const warn = (message: string) => {

  if (typeof message === 'string') {

    const text = message.split('\n');

    warning.count += 1;

    while (text.length !== 0) warning.process[warning.current].add(text.shift());

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

export const catcher = (error: any) => {

  tui.nwl();

  while (error.length !== 0) {
    const text = sanitize(error.shift()).split('\n');
    while (text.length !== 0) tui.write(text.shift());
  }

};
