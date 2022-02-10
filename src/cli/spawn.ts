import { ChildProcessWithoutNullStreams } from 'child_process';
import spawn from 'cross-spawn';
import { IConfig } from 'types';

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
const exited: Set<Function> = new Set();

/**
 * Exist handler
 *
 * Triggers functions to run before
 * existing out of process.
 */
const exit = (manualExit: boolean, signal: number) => {

  if (triggered) return;

  triggered = true;

  for (const callback of exited) callback();
  if (manualExit === true) process.exit(128 + signal);

};

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
export const spawns: Set<[
  name: string,
  child: ChildProcessWithoutNullStreams
]> = new Set();

/**
 * Exist Hook
 *
 * An exit hook for killing running processes
 * when ctrl+c is executed.
 */
export const kill = (fn: Function) => {

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

/**
 * Spawned Proccesses
 *
 * Syncify spins up a child process for
 * using spawns. The spawned process is encapsulted
 * and `stdio` is piped.
 */
export const spawned = (name: string, config: IConfig, callback: (message: string) => void) => {

  const command = config.spawns[name];
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

  spawns.add([ name, child ]);

  return child;

};
