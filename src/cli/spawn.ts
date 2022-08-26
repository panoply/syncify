import { ChildProcessWithoutNullStreams } from 'node:child_process';
import spawn from 'cross-spawn';
import { Spawn } from 'types';

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
 * Collection of spawned child proccesses.
 * We need to hold reference of these to kill when
 * ending the session.
 */
export const spawns: Map<string, ChildProcessWithoutNullStreams> = new Map();

/**
 * Spawn Processes
 *
 * Spins up a child process of the defined spawns.
 * The spawned process is encapsulted and `stdio` is piped
 * and then later intercepted + printed. The _spawn_ Map
 * keeps a store of the child processes which are referencs
 * when ending / killing a process.
 *
 * The `callback` function parameter will pass _stdout_ and _stderr_
 * to returning function of `log.spawn()` located in the
 * `logger/console.ts` file. The `log.spawn()` function is responsible
 * for parsing and normalizing the log messages.
 *
 * Also see the `tui.spawn()` export located in `tui.ts` which
 * is used to augment the messages and `define.setSpawns()` in
 * the `options/define.ts` file.
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
