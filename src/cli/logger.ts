import stringify from 'fast-safe-stringify';
import { isBuffer, isObject, isArray, nil } from 'shared/native';
import { getTime } from 'shared/shared';
import { intercept } from './intercept';
import * as tui from 'cli/tui';
import * as c from 'cli/colors';
import { spawns } from './spawn';
import { bundle } from '../options/index';

/* -------------------------------------------- */
/* RE-EXPORT                                    */
/* -------------------------------------------- */

export * as tui from 'cli/tui';
export * as c from './colors';

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
export const log = new class Logs {

  /**
   * Stdout/Stderr Interception
   */
  private intercept: () => void;

  /**
   * Current Group Label
   */
  private label: string = 'Syncify';

  /**
   * Whether or not to run spawns on initial
   */
  public initial: boolean = false;

  /**
   * Whether or not last line should be removed
   */
  private changes: boolean = false;

  /**
   * Current Filename
   */
  private filename: string;

  /**
   * Message stacks
   */
  private stack: { [filename: string]: Set<string>; } = {};

  /**
   * Enabled interceptor
   */
  watch () {

    this.intercept = intercept((stream, data) => {
      if (data.charCodeAt(0) === 9474) {
        process[stream].write(data);
      } else {
        this.stack[this.filename].add(data);
      }
    });

  }

  /**
   * Disable interceptor
   */
  unwatch () {
    this.intercept();
    this.warnings();
  }

  open () { tui.header(); }

  waiting () {
    tui.changes(c.whiteBright('[' + getTime() + '] waiting for changes...'));
    this.changes = true;
  }

  /**
   * Stack messages, typically warnings printed after ending
   */
  warnings () {

    if (this.filename in this.stack) {
      if (this.stack[this.filename].size > 0) {

        tui.tree[1](nil);
        tui.tree[1](c.yellow.bold('(!) Warnings'));
        tui.tree[1](nil);

        for (const warn of this.stack[this.filename]) {
          if (warn) {
            const text = warn.split('\n');
            while (text.length !== 0) tui.tree[1](c.yellowBright(text.shift().trimStart()));
          }
        }

        this.stack[this.filename].clear();

      }
    }

  }

  /**
   * Set Logger Group
   */
  group (label: string) {

    if (this.label !== label) {

      // Close the current log group
      if (this.label !== nil) tui.tree[3](this.label);

      if (bundle.mode.watch) this.clear();

      // Log the new group
      tui.tree[0](label);

      if (bundle.mode.build) tui.newline();

      // Update the current records
      this.label = label;

    }

    return this;

  }

  /**
   * Set current file
   */
  file (filename: string) {

    // Create stack reference model
    if (!(filename in this.stack)) this.stack[filename] = new Set();

    if (bundle.mode.watch) {
      tui.newline();

      if (this.filename !== filename) {
        tui.tree[1](c.gray(filename));
        tui.newline();

        // Update the current records
        this.filename = filename;
      }
    } else {

      // Update the current records
      this.filename = filename;
    }
  }

  /**
   * Log Information
   *
   * - `0` `┌─`
   * - `1` `│`
   * - `2` `├ `
   * - `3` `└─`
   */
  info (message: string, branch: 0 | 1 | 2 | 3 = 2) {

    if (this.changes) {
      process.stdout.moveCursor(0, -2); // up one line
      process.stdout.clearLine(1);
      this.changes = false;
    }

    tui.tree[branch](message);

  }

  /**
   * Log Error
   */
  error (...message: string[]) {

    while (message.length !== 0) {

      const text = sanitize(message.shift());

      tui.tree[1](nil);

      for (const warn of text.split('\n')) {
        if (warn) {
          const text = warn.split('\n');
          while (text.length !== 0) tui.tree[1](c.redBright(text.shift().trimStart()));
        }
      }
    }
  }

  /**
   * Log Warning
   */
  warn (...message: string[]) {

    while (message.length !== 0) {

      let text: string[] | string = sanitize(message.shift());

      if (/\n/.test(text)) {
        text = text.split('\n');
        while (text.length !== 0) tui.tree[1](c.yellow(text.shift()));
      } else {

        if (this.label === 'Syncify') {
          tui.tree[1](c.yellow.bold('(!) ' + text));
        } else {
          tui.tree[1](nil);
          tui.tree[1](c.yellow(text));
          tui.tree[1](nil);
        }

      }
    }
  }

  /**
   * Spawn log
   */
  spawn (spawn: string) {

    return (...message: string[]) => {

      this.group(`${spawn}`);

      tui.newline();
      tui.tree[1](c.gray(`spawn pid: #${spawns.get(spawn).pid}`));

      while (message.length !== 0) {
        const stdout = sanitize(message.shift());
        process.stdout.write(tui.spawn(stdout));
      }

    };

  }

  /**
   * Clear console
   */
  clear (purge?: boolean) {
    if (purge) {
      process.stdout.write(c.purge);
    } else {
      process.stdout.write(c.clear);
    }
  }

}();
