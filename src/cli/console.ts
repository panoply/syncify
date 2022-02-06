import { render } from 'prettyjson';
import { isObject, isArray, nil, isUndefined, isFunction } from 'shared/native';
import { kill, spawned, spawns } from 'cli/spawn';
import * as ansi from 'cli/ansi';
import c from 'ansis';
import { IConfig } from 'types';

interface ILoggers {
  tracked?: string;
  files?: (...message: string[]) => void,
  metafields?: (message: string) => void,
  redirects?: (message: string) => void,
  throw?: (message: string) => void,
  warn?: (message: string) => void
}

/* -------------------------------------------- */
/* EXPORTED LETTINGS                            */
/* -------------------------------------------- */

/**
 * Log Instances
 *
 * The blessed log panes. This object is
 * populated within `create()` and will hold
 * a reference to each log group.
 */
export const log: ILoggers = { tracked: undefined };

/* -------------------------------------------- */
/* EXPORTED CONSTANTS                           */
/* -------------------------------------------- */

/**
 * Nodes
 *
 * State references. Each console is stored within this
 * object and keeps tracks of messages.
 */
export const nodes: { [label: string]: string } = {};

/* -------------------------------------------- */
/* PRIVATE FUNCTIONS                            */
/* -------------------------------------------- */

/**
 * Tracer
 *
 * Tracks the logging groups and swaps group when
 * newly intercepted logs are detected.
 */
const tracer = (config: IConfig, reset: boolean = false) => (name: string, group: string) => {

  if (name === log.tracked) return;
  if (isUndefined(log.tracked)) process.stdout.write(ansi.header(config));
  if (!reset) reset = true;

  nodes[name] = group;
  log.tracked = name;

  process.stdout.write(nodes[name]);

};

/**
 * Logger
 *
 * Applies the logging to output. Determines whether
 * we need to pass the spawn logger or just print.
 */
const logger = (trace: ReturnType<typeof tracer>) => (name: string, wrap?: (param: string) => string) => {

  const group = ansi.group(name);
  const spawn = isFunction(wrap);

  return (...message: string[]) => {

    trace(name, group);

    while (message.length !== 0) {

      let text = message.shift();

      if (Buffer.isBuffer(text)) {
        text = text.toString();
      } else if (isObject(text) || isArray(text)) {
        text = render(text);
      } else {
        text = String(text);
      }

      process.stdout.write(spawn ? wrap(text) : text);

    }

  };

};

/**
 * Logging Initializer
 *
 * Passes to logger and used to setup the
 * stdout, stderr and stdio pipes.
 */
const stdout = (config: IConfig) => {

  clear(true);

  const trace = tracer(config);
  const print = logger(trace);

  // console.error = print('error', ansi.prepend);

  return (name: string) => ({
    spawn: print(name, ansi.prepend),
    print: print(name)
  });

};

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
 * Create Consoles
 *
 * Generates a tabbed TUI panes within. Multiple
 * nodes are generated and state is written in a
 * progressive manner.
 */
export function create (config: IConfig, panes: string[]) {

  const pipe = stdout(config);

  for (const child in config.spawns) {
    nodes[child] = nil;
    spawned(child, config.spawns[child], pipe(child).spawn);
  }

  for (const script of panes) {
    nodes[script] = nil;
    log[script] = pipe(script).print;
  }

  return kill(() => {

    let first: boolean = true;

    spawns.forEach((child, name) => {
      child.kill();
      console.log((first ? '\n- ' : '- ') + c.dim.italic(name + ' process exited'));
      first = false;
    });

    spawns.clear();
    process.exit(0);

  });
};
