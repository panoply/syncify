import type { Config } from 'types';
import { isNil, has } from 'rambdax';
import treeKill from 'tree-kill';
import { create, keys } from '~native';
import { isObject, isString, isArray } from '~utils';
import { log, gray } from '~log';
import { typeError } from '~log/validate';
import { queue } from '~requests/queue';
import { spawned } from '~cli/spawn';
import { kill } from '~cli/exit';
import { $ } from '~state';

/**
 * Set Spawns
 *
 * Invokes the spawned processes. The `spawn()` function
 * parameter passed in `spawned()` returns a function located
 * in `logger/console.ts` and will pipe the child processes output
 * as parameter value.
 *
 * > See the `cli/spawn.ts` which is used to normalize the log output.
 */
export function setSpawns (config: Config) {

  const { mode, spawn } = $;

  if (!has('spawn', config) || isNil(config.spawn)) return;

  if (!isObject(config.spawn)) {
    typeError({
      option: 'config',
      name: 'spawn',
      provided: config.spawn,
      expects: '{ build: {}, watch: {} }'
    });
  }

  let run: 'build' | 'watch' = null;

  if (mode.build && has('build', config.spawn)) run = 'build';
  if (mode.watch && has('watch', config.spawn)) run = 'watch';
  if (isNil(mode) || isNil(config.spawn[run])) return;

  if (!isObject(config.spawn[run])) {
    typeError({
      option: 'spawn',
      name: run,
      provided: config.spawn[run],
      expects: '{ build: {}, watch: {} }'
    });
  }

  const props = keys(config.spawn[run]);

  if (props.length === 0) return;

  for (const name in config.spawn[run]) {

    const command = config.spawn[run][name];

    if (isString(command)) {

      // create the command model
      $.spawn.commands[name] = {
        cmd: NIL,
        args: [],
        pid: NaN
      };

      // convert to an array
      const cmd = (command as string).trimStart().indexOf(WSP) > -1
        ? (command as string).trimStart().split(WSP) as string[]
        : [ command ] as string[];

      $.spawn.commands[name].cmd = cmd.shift();
      $.spawn.commands[name].args = cmd;

      spawned(name, $.spawn.commands[name], log.spawn(name));

    } else if (isArray(command)) {

      // create the command model
      const cmd = command.shift();
      $.spawn.commands[name] = create(null);
      $.spawn.commands[name].cmd = cmd;
      $.spawn.commands[name].args = command;
      $.spawn.commands[name].pid = NaN;

      spawned(name, $.spawn.commands[name], log.spawn(name));

    } else {
      typeError({
        option: 'spawn',
        name: run,
        provided: config.spawn[run],
        expects: 'string | string[]'
      });
    }

  }

  kill(() => {

    queue.pause();
    queue.clear();

    log.nwl(NIL);

    spawn.streams.forEach((child, name) => {

      log.out(`- ${gray(`pid: #${child.pid} (${name}) process exited`)}`);
      treeKill(child.pid);

    });

    log.nwl(NIL);

    spawn.streams.clear();
    process.exit(0);

  });

};
