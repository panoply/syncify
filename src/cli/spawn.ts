import { ChildProcessWithoutNullStreams } from 'child_process';
import spawn from 'cross-spawn';
import { isArray } from '../shared/native';
import { bundle } from '../options/index';

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
export const spawns: Map<string, {
  ready: boolean;
  child: ChildProcessWithoutNullStreams
}> = new Map();

/**
 * Spawned Proccesses
 *
 * Syncify spins up a child process for
 * using spawns. The spawned process is encapsulted
 * and `stdio` is piped.
 */
export function spawned (name: string, callback: any) {

  const command = bundle.spawn[name];
  const arg: string[] = isArray(command)
    ? command
    : /\s/g.test(command)
      ? command.split(' ')
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
