import treeKill from 'tree-kill';
import { gray } from '@syncify/ansi';
import * as log from 'syncify:log';
import * as u from 'syncify:utils';
import { typeError } from 'syncify:log/throws';
import { queue } from 'syncify:requests/queue';
import { spawned } from 'syncify:cli/spawn';
import { kill } from 'syncify:cli/exit';
import { $ } from 'syncify:state';

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
export function setSpawns () {

  const { mode, spawn, config } = $;

  if (!u.has('spawn', config) || u.isNil(config.spawn)) return;

  if (!u.isObject(config.spawn)) {

    typeError(
      {
        option: 'config',
        name: 'spawn',
        provided: config.spawn,
        expects: '{ build: {}, watch: {} }'
      }
    );
  }

  const has = u.hasProp(config.spawn);

  let run: 'build' | 'watch' = null;

  if (mode.build && has('build')) run = 'build';
  if (mode.watch && has('watch')) run = 'watch';
  if (u.isNil(mode) || u.isNil(config.spawn[run])) return;

  if (!u.isObject(config.spawn[run])) {

    typeError(
      {
        option: 'spawn',
        name: run,
        provided: config.spawn[run],
        expects: '{ build: {}, watch: {} }'
      }
    );

  }

  if (u.isEmpty(config.spawn[run])) return;

  for (const name in config.spawn[run]) {

    const command = config.spawn[run][name];

    if (u.isString(command)) {

      // create the command model
      $.spawn.commands[name] = u.object();

      // convert to an array
      const cmd = command.trimStart().indexOf(WSP) > -1
        ? command.trimStart().split(WSP)
        : [ command ];

      $.spawn.commands[name].cmd = cmd.shift().trim();
      $.spawn.commands[name].args = cmd;
      $.spawn.commands[name].pid = NaN;

      spawned(name, $.spawn.commands[name], log.spawn(name));

    } else if (u.isArray(command)) {

      // create the command model
      const cmd = command.shift().trim();

      $.spawn.commands[name] = u.object({
        cmd,
        args: command,
        pid: NaN
      });

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

  log.runtime.spawns($);

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
