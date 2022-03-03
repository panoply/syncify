import { ILog } from 'types';
import { queue } from 'requests/queue';
import stringify from 'fast-safe-stringify';
import { isObject, isArray, isUndefined, nil } from 'utils/native';
import { spawned, spawns } from 'cli/spawn';
import { kill } from 'cli/exit';
import * as tui from 'cli/tui';
import * as c from 'cli/ansi';

/**
 * Tracker
 *
 * Keeps track of the current log group. In the console
 * different operations are grouped.
 */
let track: string;

/**
 * Log Instances
 *
 * This object is populated within `create()` and will hold
 * a reference to each log group.
 */
export const log: ILog = {};

/**
 * Logger
 *
 * Applies the logging to output. Determines whether
 * we need to pass the spawn logger or just print.
 */
export function stdout (name: string, indent = false) {

  const group = tui.title(name);

  if (isUndefined(track)) {
    process.stdout.write(tui.header());
    track = nil;
  }

  return (...message: string[]) => {

    if (track !== name) process.stdout.write(group);

    track = name;

    while (message.length !== 0) {

      let text = message.shift();

      if (Buffer.isBuffer(text)) {
        text = text.toString();
      } else if (isObject(text) || isArray(text)) {
        text = stringify(text);
      } else {
        text = String(text);
      }

      if (indent) {
        process.stdout.write(tui.spawn(text));
      } else {
        process.stdout.write(tui.task(text));
      }

    }
  };
};

/**
 * Create Consoles
 *
 * Generates a tabbed TUI panes within. Multiple
 * nodes are generated and state is written in a
 * progressive manner.
 */
export async function logger (logs: { [spawn: string]: string } | string[], options = { clear: false }) {

  if (options.clear) process.stdout.write(c.clear);

  if (isArray(logs)) {
    for (const write of logs) log[write] = stdout(write);
  } else {
    for (const spawn in logs) spawned(spawn, stdout);
  }

  kill(() => {

    process.stdout.write(tui.footer('Process Ended'));

    spawns.forEach(([ name, child ]) => {
      child.kill();
      console.log('- ' + c.gray.italic(name + '(' + child.pid + ')' + ' process exited'));
    });

    queue.pause();
    queue.clear();
    spawns.clear();
    process.exit(0);

  });

};

export function exit () {

  kill(() => {

    tui.footer('Process Ended');

    spawns.forEach(([ name, child ]) => {
      child.kill();
      console.log('- ' + c.gray.italic(name + '(' + child.pid + ')' + ' process exited'));
    });

    queue.pause();
    queue.clear();
    spawns.clear();
    process.exit(0);

  });

}
