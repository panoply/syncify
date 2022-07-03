import { ILog } from 'types';
import { queue } from 'requests/queue';
import stringify from 'fast-safe-stringify';
import { isBuffer, isObject, isArray, nil, create, isString } from 'shared/native';
import { spawns } from 'cli/spawn';
import { kill } from 'cli/exit';
import * as tui from 'cli/tui';
import * as c from 'cli/ansi';
import * as timer from '../process/timer';
import { bundle } from '../options/index';

export * as tui from 'cli/tui';
export * as c from './ansi';

/**
 * Sanitize Message
 *
 * Sanatizes the log message passed
 */
function sanitize (message: string) {

  if (isBuffer(message)) return message.toString();
  if (isObject(message) || isArray(message)) return stringify(message);

  return String(message);

};

/**
 * Log Instances
 *
 * This object is populated within `create()` and will hold
 * a reference to each log group.
 */
export const log: ILog = function (stdout: string, param?: any) {

  if (isString(stdout) && isString(param)) {

    if (log.stack.group !== stdout) {
      if (log.stack.group) tui.tree[5](log.stack.group);
      log.stack.group = stdout;
      tui.tree[0](stdout);
      log.last = 0;
    }

    tui.tree[2](param, log.last);
    log.last = 2;

  } else {

    if (param) {
      if (bundle.mode.build) {
        tui.tree[4](stdout);
        log.last = 4;
      } else {
        tui.tree[3](stdout);
        log.last = 3;
      }
    } else {
      tui.tree[3](stdout);
      log.last = 3;
    }

  }

};

export function warnings (filename: string) {

  if (filename in log.stack.warnings) {
    if (log.stack.warnings[filename].size > 0) {

      tui.newline();

      for (const warning of log.stack.warnings[filename]) {
        if (warning) console.log(warning);
      }

      log.stack.warnings[filename].clear();
    }
  }
};

/**
 * Logger
 *
 * Applies the logging to output. Determines whether
 * we need to pass to the spawn logger or just print.
 */
export function stdout (name: 1 | 2 | 3) {

  return function (...message: string[]) {

    while (message.length !== 0) {

      const text = sanitize(message.shift());

      if (name === 1) {
        console.log(tui.tree[1](c.yellow.bold('(!) ' + text)));
      } else if (name === 2) {
        console.log(tui.tree[1](c.redBright(text)));
      } else if (name === 3) {
        console.log(tui.spawn(text));
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
export async function logger () {

  process.stdout.write(c.clear);

  log.group = nil;
  log.stack = create(null);
  log.stack.warnings = create(null);

  log.error = stdout(2);
  log.spawn = stdout(3);

  log.warn = function (filename: string, message: string) {
    if (!(filename in log.stack.warnings)) log.stack.warnings[filename] = new Set();
    log.stack.warnings[filename].add(message);
  };

  console.log(tui.header());

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
