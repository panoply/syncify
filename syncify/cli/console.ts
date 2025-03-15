import type { Ansis } from '@syncify/ansi';
import type { LiteralString } from 'types';

import { Console } from 'node:console';
import process from 'node:process';
import { Writable } from 'node:stream';

import { gray, Tree, Wrap } from '@syncify/ansi';

import { isFunction, last } from '~utils';

/* -------------------------------------------- */
/* STREAMS                                      */
/* -------------------------------------------- */

class LogStream extends Writable {

  /**
   * The Tree line Prefix
   */
  tree: string = Tree.line;

  /**
   * Update Prefix (used to swap when calling warn or error)
   */
  prefix (prefix = Tree.line) {

    this.tree = prefix;

    return this;

  }

  _write (chunk: Buffer, encoding?: BufferEncoding, next?: (error?: Error | null) => void) {

    process.stdout.write(this.tree + chunk.toString().trim() + NWL);

    if (next) next();

    this.tree = Tree.line; // Reset Prefix

  }

};

/* -------------------------------------------- */
/* CONSOLE                                      */
/* -------------------------------------------- */

class Log extends Console {

  static stdio: LogStream = new LogStream();

  get stdout () { return Log.stdio; }
  get stderr () { return Log.stdio; }

  error (message: string): void {
    this.stderr.prefix(Tree.red).write(message);
  }

  warn (message: string): void {
    this.stderr.prefix(Tree.yellow).write(message);
  }

  encase (message: string) {
    this.stdout.write(NIL);
    this.stdout.write(message);
    this.stdout.write(NIL);
    return this;
  }

  wrap (...input: (string[] | string | Ansis)[]) {
    const color = <Ansis>(isFunction(last(input)) ? input.pop() : gray);
    this.stdout.write(Wrap(<string[]>input, { color, firstLineTree: false }));
    return this;
  }

  ln (type?: LiteralString<'red' | 'yellow'>) {
    this.stdout.prefix(type === 'red' ? Tree.redTrim : type === 'yellow' ? Tree.yellowTrim : Tree.trim).write(NIL);
    return this;
  }

  nl () {
    process.stdout.write(NLR);
    return this;
  }

};

/* -------------------------------------------- */
/* INSTANCES                                    */
/* -------------------------------------------- */

/**
 * Syncify `console`
 */
export const console: Log = new Log(Log.stdio, Log.stdio);

/**
 * Syncify `stdout`
 */
export const { stdout, stderr } = console;
