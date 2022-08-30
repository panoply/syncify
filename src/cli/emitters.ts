import { log, nil } from '../shared/native';
import { redBright, gray } from './ansi';
import * as tui from './tui';

/**
 * Signal Interuption
 *
 * Exits process on signal interruption
 */
export function signal () {

  tui.nwl(nil);
  log(gray('SIGINT'));
  process.exit();

}

/**
 * Rejected Promise
 *
 * Emitted whenever a Promise is rejected and no error handler is attached to it
 */
export function rejection (reason: any, p: Promise<any>) {

  tui.nwl();
  tui.write(redBright(`Unhandled Promise Rejection at: ${p}`));
  tui.nwl();
  tui.write(gray(`${reason}`));

};

/**
 * Uncaught Exception
 *
 * Emitted when an uncaught JavaScript exception bubbles
 */
export function exception (e: Error) {

  tui.write(`Uncaught Exception: ${e.message}`);
  tui.nwl();
  tui.write(`${e.stack}`);

};
