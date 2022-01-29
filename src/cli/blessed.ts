
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import blessed, { Widgets, IGrid } from 'neo-blessed';
import { assign, defineProperty, toUpcase } from 'config/utils';
import { IConfig } from 'types';
import c from 'ansis';
import { Merge } from 'type-fest';
import { has, isType } from 'rambdax';

type Logger = (message: string) => void;
type n = number

type State = {
  focus?: number,
  nodes?: Array<{
    label?: string;
    pane?: Widgets.Log;
    tab?: Widgets.ButtonElement;
    count?: number;
    spawn?: boolean;
  }>
} | string

type Create<T> = Merge<IGrid, {
  tabs: T;
  group: string;
  spawns: null | { [name: string]: string };
}>[]

interface ILoggers {
  tracked?: string;
  json?: Logger;
  files?: Logger;
  styles?: Logger;
  scripts?: Logger;
  icons?: Logger;
  metafields?: Logger;
  redirects?: Logger;
  errors?: Logger;
  warnings?: Logger;
  console?: Logger
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
export let screen: Console | Widgets.Screen = null;

/**
  * Terminal Type
  *
  * Exported letting. Blessed will load only when
  * the `bless()` function is invoked.
  */
export let terminal: 1 | 2 = 2;

/* -------------------------------------------- */
/* EXPORTED CONSTANTS                           */
/* -------------------------------------------- */

/**
 * Native console
 *
 * Assist in the handling of the native
 * console module. Pass contents to stdout/err.
 */
// export const console = new Console({ stdout: process.stdout, stderr: process.stderr });

/**
 * Log Instances
 *
 * The blessed log panes. This object is
 * populated within `create()` and will hold
 * a reference to each log group.
 */
export const log: ILoggers = {
  tracked: undefined,
  errors: console.error,
  console: console.log,
  warnings: console.warn
};

/**
 * Blessed Nodes
 *
 * State reference array. Each blessed node
 * group is stores within this array. We query
 * the nodes via index.
 */
export const nodes: Array<State> = [];

/**
 * Standard Nodes
 *
 * State reference array. Each blessed node
 * group is stores within this array. We query
 * the nodes via index.
 */
export const parts: { [label: string]: string } = {};

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

/**
 * Grid Generator
 *
 * This logic is lifted off of `blessed-contrib` with
 * some slight modifications applied. It allows us to
 * work the layout using grid structure.
 */
function grid <T> (row: n, col: n, rowSpan: n, colSpan: n, widget: any, options: T) {

  const cell = (100 / 14);
  const top = row * cell;
  const left = col * cell;

  assign(options, {
    top: top + '%',
    left: left + '%',
    width: (cell * colSpan) + '%',
    height: (cell * rowSpan) + '%',
    // @ts-ignore
    border: { type: 'line', fg: '#2a2a2e', ...options.border }
  });

  const node = widget(options);

  (screen as Widgets.Screen).append(node);

  return node;

};

/**
 * Blessed Buttons
 *
 * Generates tabs (buttons) with labels
 * for each active console pane. Clicking is
 * enabled to switch between panes.
 */
function button (content: string, focus: boolean) {

  return blessed.button({
    focus,
    content,
    mouse: true,
    shrink: true,
    clickable: true,
    scrollable: false,
    padding: { right: 4 },
    style: {
      bold: focus,
      fg: focus ? 'cyan' : 'white',
      hover: { fg: 'cyan' },
      focus: {
        fg: 'cyan',
        bold: true
      }
    }
  });
};

/**
 * Blessed Container
 *
 * A wrapper element which assists in the
 * tab layout. It provides nesting and tabed
 * items will be docked.
 */
function container (row: n, col: n, rowSpan: n, colSpan: n, children: Widgets.Node[]) {

  return grid<Widgets.LayoutOptions>(
    row,
    col,
    rowSpan,
    colSpan,
    blessed.layout,
    <Widgets.LayoutOptions>{
      children,
      screen,
      layout: 'inline-block',
      valign: 'middle',
      padding: {
        left: 3,
        right: 3
      },
      style: {
        border: {
          fg: '#2a2a2e'
        }
      }
    }
  );

};

/**
 * Blessed Panes
 *
 * This generated different log panes
 * from which we will write console information.
 * These are toggled panes.
 */
function panes <T> (row: n, col: n, rowSpan: n, colSpan: n, hidden: boolean): T {

  return grid<Widgets.LogOptions>(
    row,
    col,
    rowSpan,
    colSpan,
    blessed.log,
    {
      hidden,
      top: 'center',
      left: 'center',
      clickable: false,
      focusable: false,
      scrollable: true,
      mouse: true,
      padding: {
        top: 3,
        left: 2,
        right: 0,
        bottom: 1
      },
      scrollbar: {
        track: { bg: '#2a2a2e' },
        style: { bg: '#556875' }
      }
    }
  );

};

function toggle (index: number, state: number) {

  const node = nodes[index] as any;

  return () => {

    const active = node.nodes[node.focus];
    const change = node.nodes[state];

    // hide active
    active.pane.hide();
    active.tab.style.bold = false;
    active.tab.style.fg = 'white';

    // show active
    change.pane.focus();
    change.pane.show();
    change.tab.focus();
    change.tab.style.bold = true;
    change.tab.style.fg = 'cyan';

    // re-assign focus
    node.focus = state;

  };
};

function print (index: number, state: number) {

  const node = nodes[index] as any;

  return (message: string) => {

    const active = node.nodes[state];

    active.count += 1;
    active.tab.setContent(active.label + ' (' + active.count + ') ');

    if (Buffer.isBuffer(message)) {
      active.pane.log(message.toString());
    } else if (isType('Object', message)) {
      active.pane.log(JSON.stringify(message, null, 2));
    } else {
      active.pane.log(message);
    }

    return toggle(index, state);

  };
};

/**
 * Spawned Proccesses
 *
 * Syncify spins up a child process for
 * compiling spawns/typescript. The spawned
 * process is encapsulted within the this pane.
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

      const endnode = parts[name] as string;
      const newline = endnode ? endnode.charCodeAt(endnode.length - 1) === 10 : true;
      const message = dim(newline
        ? (dim('│') + '\n' + '├── ')
        : (dim('│'))) + group + '\n' + dim('│') + '\n';

      parts[name] = message;
      process.stdout.write(parts[name]);

      log.tracked = name;

      if (!reset) reset = true;

    }
  };

  const stdio = (name: string) => {

    const group = c.cyan.italic(name);

    return ({

      print: (message: string) => {

        trace(name, group);

        process.stdout.write(message.replace(/^/gm, dim('│  ')) + '\n');

      },

      spawn: (message: string) => {

        trace(name, group);

        process.stdout.write(message.toString().replace(/^/gm, dim('│  ')) + '\n');

      }
    });
  };

  return stdio;
}

function standard <T extends Array<keyof ILoggers>> (options: Create<T>) {

  const output = stdout();

  for (const { tabs, spawns } of options) {
    for (const name of tabs) {

      parts[name] = '';

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

function dashboard <T extends Array<keyof ILoggers>> (options: Create<T>[number]) {

  const config = options;
  const { tabs, row, col, rowSpan, colSpan, spawns = null } = config;
  const state = { focus: 0, nodes: [] };
  const length = nodes.push(state) - 1;
  const children = tabs.map((name, index) => {

    const show = index === 0;
    const label = toUpcase(name);
    const tab = button(label, show);
    const callback = print(length, index);

    state.nodes.push({
      tab,
      label,
      count: 0,
      pane: panes<Widgets.Log>(row, col, rowSpan, colSpan, !show),
      spawn: has(name, spawns) ? spawned(spawns[name], callback) : null
    });

    // add listener
    tab.on('press', toggle(length, index));

    defineProperty(log, name, { value: callback });

    return tab;

  });

  container(row, col, rowSpan - (rowSpan - 1), colSpan, children);

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
export function kill (ch: string, key: Widgets.Events.IKeyEventArg) {

  // clear(true);
  spawns.forEach(child => child.kill());
  spawns.clear();
  process.exit(0);

};

/**
 * Bless Instance
 *
 * This function will initialize a bless terminal
 * instance and assign the TUI screen letting export.
 */
export function bless (type: 1 | 2 | 3) {

  if (process.stdout.rows > 44) {

    terminal = 2;
    screen = blessed.screen({
      title: 'Syncify',
      smartCSR: true,
      fastCSR: true,
      warnings: true,
      dockBorders: true,
      ignoreDockContrast: true,
      autoPadding: true,
      debug: true,
      cols: 14,
      rows: 14,
      fullUnicode: true,
      forceUnicode: true
    });

    screen.key([ 'escape', 'q', 'C-c' ], kill);

  } else {

    terminal = 1;

    console.log = stdout()('console').print;
    console.error = stdout()('error').print;
    console.info = stdout()('info').print;
    console.warn = stdout()('warn').print;
  }

};

/**
 * Create Consoles
 *
 * Generates a tabbed TUI panes within. Multiple
 * nodes are generated and state is written in a
 * progressive manner.
 */
export function create <T extends Array<keyof ILoggers>> (...options: Create<T>) {

  if (terminal === 2) {
    while (options.length !== 0) dashboard<T>(options.shift());
  } else {
    standard<T>(options);
  }

  return log;

};

/**
 * Status Pane
 *
 * Generates the build and bundle status overview.
 * Returns 2 methods, one is called just after configuration
 * and settings were passed and the other when we
 * need to update counters.
 */
export function status <
  U extends 'errors' | 'uploads' | 'warnings',
  T extends { errors: number; warnings: number; uploads: number; }
> (
  state: T,
  layout: IGrid
) {

  const lines = Object.freeze({
    uploads: 2,
    errors: 3,
    warnings: 4
  });

  const widget: Widgets.BoxElement = grid(
    layout.row,
    layout.col,
    layout.rowSpan,
    layout.colSpan,
    blessed.box,
     <Widgets.BoxOptions>{
       screen,
       mouse: false,
       top: 'center',
       left: 'center',
       padding: {
         top: 1,
         left: 5,
         bottom: 2,
         right: 1
       },
       style: {
         border: {
           fg: '#2a2a2e'
         }
       }
     }
  );

  return {

    render: ({ env, resource }: IConfig) => {

      widget.setLine(0, c.bold(c.cyanBright('Syncify') + c.gray(' <!version!>')));
      widget.setLine(2, 'Uploads   ' + state.uploads);
      widget.setLine(3, 'Errors    ' + state.errors);
      widget.setLine(4, 'Warnings  ' + state.warnings);
      widget.setLine(6, 'Env       ' + c.magenta(env || 'development'));
      widget.setLine(7, 'Resource  ' + c.magenta(resource));

    },

    update: (update: U, number: number) => {

      state[update] += number;

      const lineNum = lines[update];
      const current = widget.getLine(lineNum);
      const replace = current.replace(/[0-9]+/, String(state[update]));

      widget.setLine(lineNum, replace);

    }

  };

}

/*

/**
 * Shortcut Command Listbar

  for (const { store, target, id } of sync.assets) {

    if (!trace.has(store)) {
      trace.add(store);
      string += `\n${c.cyan(store)}: \n`;
    }

    const shop = `https://${store.toLowerCase()}.myshopify.com?preview_theme_id=${id}`;

    string += `  ${c.dim('-')} ${c.white(target)}${c.white(':')} `;
    string += c.underline(c.dim(shop)) + '\n';

  }

const shortcut: blessed.Widgets.ListbarElement = grid.set(
  12,
  0,
  1,
  4,
  blessed.listbar,
  // @ts-ignore
  <blessed.Widgets.ListbarOptions>{
    items: [
      'help'
    ],
    style: {
      border: {
        fg: '#2a2a2e'
      }
    }
  }
);
 */
