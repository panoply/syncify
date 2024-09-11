import { SpawnCommand } from 'types';
import { spawn } from 'node:child_process';
import { $ } from 'syncify:state';
import { delay } from 'rambdax';

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
export function spawned (name: string, command: SpawnCommand, callback: (...data: string[]) => void) {

  const child = spawn(command.cmd, command.args, { stdio: 'pipe' });
  command.pid = child.pid;

  (async function wait () {

    if ($.env.ready === false) {
      await delay(100);
      return wait();
    }

    child.stdio[0].on('data', callback.bind({ name, type: 'stdin' }));
    child.stdio[0].on('data', callback.bind({ name, type: 'stdout' }));
    child.stdio[2].on('data', callback.bind({ name, type: 'stderr' }));

    $.spawn.streams.set(name, child);

  })();

};
