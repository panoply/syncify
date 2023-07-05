import { nil } from '~utils/native';
import { log, gray } from '~log';

/**
 * Signal Interuption
 *
 * Exits process on signal interruption
 */
export function signal () {

  log.nwl(nil);
  log.out(gray('SIGINT'));
  process.exit();

}

/**
 * Rejected Promise
 *
 * Emitted whenever a Promise is rejected and no error handler is attached to it
 */
export function rejection (reason: any, p: Promise<any>) {

  log.nwl();
  log.err(`Unhandled Promise Rejection at: ${p}`);
  log.nwl('red');
  log.out(reason ? gray(reason) : 'Unkown Reason');

};

/**
 * Uncaught Exception
 *
 * Emitted when an uncaught JavaScript exception bubbles
 */
export function exception (e: Error) {

  log.nwl();
  log.err(`Uncaught Exception: ${e.message}`);
  log.nwl('red');
  log.err(`${e.stack}`);

};
