
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { has } from 'rambdax';
import { render } from 'prettyjson';
import { isObject } from 'utils/native';
import c from 'ansis';
import { isArray, toUpcase } from 'config/utils';

type Logger = (message: string) => void;

type State = {
  focus?: number,
  nodes?: Array<{
    label?: string;
    count?: number;
    spawn?: boolean;
  }>
} | string

interface ILoggers {
  tracked?: string;
  scripts?: Logger,
  assets?: Logger,
  files?: Logger,
  metafields?: Logger,
  redirects?: Logger,
  console?: Logger,
  throw?: Logger,
  warn?: Logger
}

const dim = c.hex('#2a2a2e');

/* -------------------------------------------- */
/* EXPORTED LETTINGS                            */
/* -------------------------------------------- */

/**
 * Blessed Screen
 *
 * Exported letting. Blessed will load only when
 * the `bless()` function is invoked.
 */
export let screen: Console;

/**
 * Log Instances
 *
 * The blessed log panes. This object is
 * populated within `create()` and will hold
 * a reference to each log group.
 */
export const log: ILoggers = {
  tracked: undefined,
  console: console.log
};

/* -------------------------------------------- */
/* EXPORTED CONSTANTS                           */
/* -------------------------------------------- */

/**
 * Nodes
 *
 * State references. Each console is stores within this
 * object and keeps tracks of messages.
 */
export const nodes: { [label: string]: string } = {};

/**
  * Spawned Processes
  *
  * Set collection of spawned child proccesses.
  * We need to hold reference of these to kill
  * when ending the session.
  */
export const spawns: Set<ChildProcessWithoutNullStreams> = new Set();

/* -------------------------------------------- */
/* PRIVATE FUNCTIONS                            */
/* -------------------------------------------- */

function print (index: number, state: number) {

  const node = nodes[index] as any;

  return (message: string) => {

    const active = node.nodes[state];

    if (Buffer.isBuffer(message)) {
      active.pane.log(message.toString());
    } else if (isObject(message) || isArray(message)) {
      active.pane.log(JSON.stringify(message, null, 2));
    } else {
      active.pane.log(message);
    }

    node.focus = state;

  };
};

/**
 * Spawned Proccesses
 *
 * Syncify spins up a child process for
 * compiling spawns/typescript. The spawned
 * process is encapsulted and `stdio` is piped.
 */
function spawned (command: string, callback: ReturnType<typeof print>) {

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

  child.stdio[1].on('data', callback);
  child.stdio[2].on('data', callback);
  child.stdio[3].on('data', callback);

  spawns.add(child);

  return child;

};

function stdout () {

  clear(true);

  let reset: boolean = false;

  const heading = (
    dim('┌── ') + c.bold(c.cyanBright('Syncify ')) + c.gray(' <!version!>') + '\n' +
    dim('│') + '\n'
  );

  const trace = (name: string, group: string) => {

    if (name !== log.tracked) {

      if (typeof log.tracked === 'undefined') {
        process.stdout.write(heading);
      }

      const endnode = nodes[name] as string;
      const newline = endnode ? endnode.charCodeAt(endnode.length - 1) === 10 : true;
      const message = dim(newline
        ? (dim('│') + '\n' + '├── ')
        : (dim('│'))) + group + '\n' + dim('│') + '\n';

      nodes[name] = message;
      process.stdout.write(nodes[name]);

      log.tracked = name;

      if (!reset) reset = true;

    }
  };

  return (name: string) => {

    const group = c.white.bold(toUpcase(name));

    return ({

      print: (message: string) => {

        trace(name, group);

        if (Buffer.isBuffer(message)) {
          message = message.toString();
        } else if (isObject(message) || isArray(message)) {
          message = render(message);
        } else {
          message = String(message);
        }

        process.stdout.write(message.replace(/^/gm, dim('│  ')) + '\n');

      },

      spawn: (message: string) => {

        trace(name, group);

        process.stdout.write(message.toString().replace(/^/gm, dim('│  ')) + '\n');

      }
    });
  };
}

function standard <T extends Array<keyof ILoggers>> (options: Create<T>) {

  const output = stdout();

  for (const { tabs, spawns } of options) {
    for (const name of tabs) {

      nodes[name] = '';

      if (has(name, spawns)) {
        // @ts-ignore
        spawned(spawns[name], output(name).spawn);
      } else {
        // @ts-ignore
        log[name] = output(name).print;
      }
    }
  }

}

/* -------------------------------------------- */
/* PUBLIC METHODS                               */
/* -------------------------------------------- */

/**
 * Clear CLI
 *
 * Clears the console logs. Accepts
 * a boolean which will determine whether
 * or not clear (`ctrl+k`) or remove the
 * previous logged outputs.
 */
export function clear (isSoft?: boolean) {

  process.stdout.write(isSoft ? '\x1B[H\x1B[2J' : '\x1B[2J\x1B[3J\x1B[H\x1Bc');

};

/**
 * Blessed kill
 *
 * Kills both blessed and any spawned child processes
 * which are running in parallel. We listen for key
 * events from the `screen` instance.
 */
export function kill () {

  // clear(true);
  spawns.forEach(child => child.kill());
  spawns.clear();
  process.exit(0);

};

/**
 * Create Consoles
 *
 * Generates a tabbed TUI panes within. Multiple
 * nodes are generated and state is written in a
 * progressive manner.
 */
export function create <T extends Array<keyof ILoggers>> (...options: Create<T>) {

  const pipe = stdout();

  // console.log = pipe('console').print;
  console.error = pipe('error').print;
  console.info = pipe('info').print;
  console.warn = pipe('warn').print;

  standard<T>(options);

};
