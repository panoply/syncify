import c from 'ansis';
import * as parse from 'cli/parse';
import * as cli from 'cli/blessed';

/**
 * Deletion Log
 */
export function deleted (file: string) {

  cli.log.files(c.blue.bold('␡ ') + c.blue(file));
  // log.status.update('uploads', 1);

}

/**
 * Uploaded Log
 */
export function created (file: string) {

  cli.log.files(c.green.bold('+ ') + c.green(file));
  // log.status.update('uploads', 1);

}

/**
 * Uploaded Log
 */
export function metafield (message: string) {

  cli.log.metafields(c.green.bold('✓ ' + message));
  // log.status.update('uploads', 1);

}

/**
 * Uploaded Log
 */
export function redirect (text: string) {

  cli.log.redirects(c.green.bold('✓ ') + c.green(text));
  // log.status.update('uploads', 1);

}

/**
 * Uploaded Log
 */
export function updated (text: string) {

  cli.log.files(c.green.bold('✓ ') + c.green(text));
  // log.status.update('uploads', 1);

}

/**
 * Ignoring Log
 */
export function json (file: string) {

  cli.log.json(c.magenta.bold('✓ ') + c.magenta(file));

}

/**
 * Ignoring Log
 */
export function ignoring (file: string) {

  cli.log.files(c.gray.bold('! ') + c.gray(file));

}

/**
 * Warning Log
 *
 * Prints a message in Yellow
 */
export function warn (message: string) {

  cli.log.warnings(c.yellow.bold('! ') + c.yellow(parse.pretty(message)) + '\n');

}

/**
 * Error Log
 *
 * Prints a message in Red. Typically called to
 * format a thrown `Error` which is using a custom
 * defined error message (ie: one written by syncify)
 */
export function error (e: { file: string; message: string; data: string | string[] }) {

  cli.log.errors(
    c.red('Error') + c.white(' in ') + c.red(e.file) +
    '\n\n' +
    c.red(parse.pretty(e.data)) +
    '\n'
  );

  cli.log.files(c.red('⨯ ' + e.file));
  // log.status.update('errors', 1);
}
