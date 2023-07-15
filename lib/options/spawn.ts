import type { Config } from 'types';
import { isNil, has } from 'rambdax';
import { queue } from '~requests/queue';
import { spawned } from '~cli/spawn';
import { kill } from '~cli/exit';
import { gray } from '~cli/ansi';
import { typeError } from '~options/validate';
import { log } from '~log';
import { $ } from '~state';
import * as u from '~utils/native';

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

  if (!u.isObject(config.spawn)) {
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

  if (!u.isObject(config.spawn[run])) {
    typeError({
      option: 'spawn',
      name: run,
      provided: config.spawn[run],
      expects: '{ build: {}, watch: {} }'
    });
  }

  const props = u.keys(config.spawn[run]);

  if (props.length === 0) return;

  for (const name in config.spawn[run]) {

    const command = config.spawn[run][name];

    if (u.isString(command)) {

      // create the command model
      $.spawn.commands[name] = {
        cmd: u.nil,
        args: [],
        pid: NaN
      };

      // convert to an array
      const cmd = (command as string).trimStart().indexOf(u.ws) > -1
        ? (command as string).trimStart().split(u.ws) as string[]
        : [ command ] as string[];

      $.spawn.commands[name].cmd = cmd.shift();
      $.spawn.commands[name].args = cmd;

      spawned(name, $.spawn.commands[name], log.spawn(name));

    } else if (u.isArray(command)) {

      // create the command model
      const cmd = command.shift();
      $.spawn.commands[name] = { cmd, args: command, pid: NaN };

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

    log.nwl(u.nil);

    spawn.streams.forEach((child, name) => {

      u.error(`- ${gray(`pid: #${child.pid} (${name}) process exited`)}`);
      child.kill();

    });

    log.nwl(u.nil);

    spawn.streams.clear();
    process.exit(0);

  });

};
