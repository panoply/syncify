import { ChildProcessWithoutNullStreams } from 'child_process';
import spawn from 'cross-spawn';

/* -------------------------------------------- */
/* PRIVATE                                      */
/* -------------------------------------------- */

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
const callbacks: Set<Function> = new Set();

/**
 * Exist handler
 *
 * Triggers functions to run before
 * existing out of process.
 */
function exit (manualExit: boolean, signal: number) {

  if (triggered) return;

  triggered = true;

  for (const callback of callbacks) callback();
  if (manualExit === true) process.exit(128 + signal);

}

/* -------------------------------------------- */
/* EXPORTS                                      */
/* -------------------------------------------- */

/**
 * Spawned Processes
 *
 * Set collection of spawned child proccesses.
 * We need to hold reference of these to kill
 * when ending the session.
 */
export const spawns: Map<string, ChildProcessWithoutNullStreams> = new Map();

/**
 * Exist Hook
 *
 * An exit hook for killing running processes
 * when ctrl+c is executed.
 */
export function kill (fn: Function) {

  callbacks.add(fn);

  if (!registers) {

    registers = true;

    process.once('exit', exit);
    process.once('SIGINT', exit.bind(undefined, true, 2));
    process.once('SIGTERM', exit.bind(undefined, true, 15));
    process.on('message', message => { if (message === 'shutdown') exit(true, -128); });

  }

  return () => callbacks.delete(fn);

}

/**
 * Spawned Proccesses
 *
 * Syncify spins up a child process for
 * using spawns. The spawned process is encapsulted
 * and `stdio` is piped.
 */
export function spawned (name: string, command: string, callback: (message: string) => void) {

  const arg: string[] = /\s/g.test(command) ? command.split(' ') : [ command ];
  const cmd = arg.shift();
  const child = spawn(cmd, arg, {
    stdio: [
      'pipe',
      'pipe',
      'pipe',
      'pipe',
      'pipe'
    ]
  });

  child.stdio[0].on('data', callback);
  child.stdio[1].on('data', callback);
  child.stdio[2].on('data', callback);

  spawns.set(name, child);

  return child;

};
