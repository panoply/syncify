import c from 'ansis';
import * as parse from 'cli/parse';
import * as cli from 'cli/console';
import * as ansis from 'cli/ansi';

/**
 * Prints Deletions
 */
export function deleted (file: string) {

  cli.log.files(c.blue.bold('␡ ') + c.blue(file));

}

/**
 * Prints Created
 */
export function created (file: string) {

  cli.log.files(c.green.bold('+ ') + c.green(file));

}

/**
 * Prints Metafield
 */
export function metafield (message: string) {

  cli.log.metafields(c.green.bold('✓ ' + message));

}

/**
 * Prints Redirect
 */
export function redirect (text: string) {

  cli.log.redirects(c.green.bold('✓ ') + c.green(text));

}

/**
 * Prints Updates
 */
export function updated (text: string) {

  cli.log.files(c.green.bold('✓ ') + c.green(text));

}

/**
 * Prints JSON
 */
export function json (file: string) {

  cli.log.files(c.magenta.bold('✓ ') + c.magenta(file));

}

/**
 * Prints ignoring
 */
export function ignoring (file: string) {

  cli.log.files(c.gray.bold('! ') + c.gray(file));

}

/**
 * Prints Warnings
 */
export function warn (message: string) {

  cli.log.files(c.yellow.bold('! ') + c.yellow(parse.pretty(message)));

}

/**
 * Throws Error
 */
export function throws (message: string) {

  throw cli.log.throw(c.red(parse.quotes(message)));

}

/**
 * Error Log
 *
 * Prints a message in Red. Typically called to
 * format a thrown `Error` which is using a custom
 * defined error message (ie: one written by syncify)
 */
export function error (e: { file: string; message: string; data: string | string[] }) {

  cli.log.files(c.red('⨯ ' + e.file));
  cli.log.files(
    ('\n' + c.redBright(parse.pretty(e.message)) + '\n').replace(/^/gm, ansis.dim('│  '))
  );

}
