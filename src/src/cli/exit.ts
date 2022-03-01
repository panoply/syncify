/**
 * Called exit hook record
 */
let triggered = false;

/**
 * Registered exist hook record
 */
let registers = false;

/**
 * Callback exist hooks
 */
const exited: Set<Function> = new Set();

/**
 * Exist handler
 *
 * Triggers functions to run before
 * existing out of process.
 */
function exit (manualExit: boolean, signal: number) {

  if (triggered) return;

  triggered = true;

  for (const callback of exited) callback();
  if (manualExit === true) process.exit(128 + signal);

};

/**
 * Exist Hook
 *
 * An exit hook for killing running processes
 * when ctrl+c is executed.
 */
export function kill (fn: Function) {

  exited.add(fn);

  if (!registers) {

    registers = true;

    process.once('exit', exit);
    process.once('SIGINT', exit.bind(undefined, true, 2));
    process.once('SIGTERM', exit.bind(undefined, true, 15));
    process.on('message', message => { if (message === 'shutdown') exit(true, -128); });

  }

  return () => exited.delete(fn);

};
