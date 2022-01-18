import { white, green, gray, yellow, red, cyan, magenta } from 'kleur';
import * as parse from 'logs/parse';
import * as log from 'cli/panes';

/**
 * Warning Log
 *
 * Prints a message in Yellow
 */
export function warn (message: string) {

  log.problem.warnings(yellow(parse.pretty(message)) + '\n\n');

}

/**
 * Deletion Log
 */
export function deletion (file: string) {

  log.sync.deleted('\'' + magenta(file) + '\'');
  log.status.update('uploads', 1);

}

/**
 * Uploaded Log
 */
export function creation (file: string) {

  log.sync.created('\'' + green(file) + '\'');
  log.status.update('uploads', 1);

}

/**
 * Uploaded Log
 */
export function uploaded (file: string) {

  log.sync.uploads('\'' + green(file) + '\'');
  log.status.update('uploads', 1);

}

/**
 * Ignoring Log
 */
export function ignoring (file: string) {

  log.sync.uploads('\'' + gray(file) + '\'');

}

/**
 * Error Log
 *
 * Prints a message in Red. Typically called to
 * format a thrown `Error` which is using a custom
 * defined error message (ie: one written by syncify)
 */
export function error (e: { file: string; message: string; data: string | string[] }) {

  const message = red('Error') + white(' in ') + red(e.file) +
  '\n\n' +
  red(parse.pretty(e.data)) +
  '\n\n';

  log.problem.errors(message);
  log.sync.errors('\'' + red(e.file) + '\'');
  log.status.update('errors', 1);
}
