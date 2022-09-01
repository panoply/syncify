import { Spawn } from 'types';
import { ChildProcessWithoutNullStreams } from 'node:child_process';
import spawn from 'cross-spawn';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

/**
 * Callback function method
 */
type Callback = (...data: string[]) => void

/* -------------------------------------------- */
/* EXPORTS                                      */
/* -------------------------------------------- */

/**
 * Child Processes
 *
 * Collection of spawned child proccesses. We need to hold reference of these
 * to kill when ending the session.
 */
export const spawns: Map<string, ChildProcessWithoutNullStreams> = new Map();

/**
 * Spawn Processes
 *
 * Spins up a child process of the defined spawns. The spawned process is encapsulted
 * and `stdio` is piped, then later intercepted and printed. The _spawn_ `Map` keeps a
 * store of the child processes which are references when ending / killing a process.
 *
 * The `callback` function parameter will pass _stdout_ and _stderr_ to returning
 * function of `log.spawn()` which is responsible for parsing and normalizing the log
 * messages.
 *
 * > The `kill()` hook is also located in `options/define.ts`
 */
export const spawned = (name: string, command: Spawn['commands'][string], callback: Callback) => {

  const child = spawn(command.cmd, command.args, { stdio: 'pipe' });

  child.stdio[0].on('data', callback);
  child.stdio[1].on('data', callback);
  child.stdio[2].on('data', callback);

  command.pid = child.pid;

  spawns.set(name, child);

};
