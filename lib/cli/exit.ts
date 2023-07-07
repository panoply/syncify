/**
 * Called exit hook record
 */
let trigger: boolean = false;

/**
 * Registered exist hook record
 */
let register: boolean = false;

/**
 * Callback exist hooks
 */
const hooks: Set<Function> = new Set();

/**
 * Exist handler
 *
 * Triggers functions to run before existing out of process.
 */
function exit (manual: boolean, signal: number) {

  if (trigger) return;

  trigger = true;

  for (const hook of hooks) {
    hook();
  }

  if (manual) {
    process.exit(128 + signal);
  }

};

/**
 * Exit Hook
 *
 * An exit hook for killing running processes when `ctrl + c` is executed.
 */
export function kill (callback: Function) {

  hooks.add(callback);

  if (!register) {
    register = true;
    process.once('exit', exit);
    process.once('SIGINT', exit.bind(undefined, true, 2));
    process.once('SIGTERM', exit.bind(undefined, true, 15));
    process.on('message', message => {
      if (message === 'shutdown') exit(true, -128);
    });
  }

  return () => hooks.delete(callback);

};
