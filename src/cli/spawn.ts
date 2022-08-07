import { ChildProcessWithoutNullStreams } from 'node:child_process';
import spawn from 'cross-spawn';
import { ws, isArray } from '../shared/native';
import { bundle } from '../options/index';

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
export const spawns: Map<string, { ready: boolean; child: ChildProcessWithoutNullStreams }> = new Map();

/**
 * Spawn Processes
 *
 * Spins up a child process of the defined spawns.
 * The spawned process is encapsulted and `stdio` is piped
 * and then later intercepted + printed. The _spawn_ Map
 * keeps a store of the child processes which are referencs
 * when ending / killing a process.
 */
export const spawned = (name: string, callback: (data: string) => void) => {

  const command = bundle.spawn[name];
  const arg: string[] = isArray(command)
    ? command
    : command.trimStart().indexOf(ws) > -1
      ? command.trimStart().split(ws)
      : [ command ];

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
  child.stdio[3].on('data', callback);

  spawns.set(name, { child, ready: false });

  return child;

};
