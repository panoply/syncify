/* eslint-disable no-unused-vars */

import blessed, { Widgets, IGrid, ITabs, ITabState, ITabSpawnState } from 'neo-blessed';
import { spawn } from 'child_process';
import { has } from 'rambdax';
import { toUpcase, values } from 'config/utils';
import { IConfig } from 'types';
import { magenta, bold, gray } from 'kleur';

export const screen = blessed.screen(
  {
    title: 'Syncify',
    smartCSR: true,
    fastCSR: false,
    warnings: true,
    dockBorders: true,
    ignoreDockContrast: true,
    autoPadding: true,
    debug: true,
    cols: 14,
    rows: 14,
    fullUnicode: true,
    forceUnicode: true
  }
);

/**
 * Clear CLI
 *
 * Clears the console logs. Accepts
 * a boolean which will determine whether
 * or not clear (`ctrl+k`) or remove the
 * previous logged outputs.
 */
function clear (isSoft?: boolean) {

  process.stdout.write(isSoft ? '\x1B[H\x1B[2J' : '\x1B[2J\x1B[3J\x1B[H\x1Bc');

}

/**
 * Grid Helper
 *
 * This logic is lifted from blessed-contrib
 * and allows us to construct and build terminal
 * panes as a grid layout structure.
 */
function grid (
  row: number,
  col: number,
  rowSpan: number,
  colSpan: number,
  widget: any,
  options: any
) {

  const margin = 0;
  const cellWidth = ((100 - margin * 2) / screen.options.cols);
  const cellHeight = ((100 - margin * 2) / screen.options.rows);

  const top = row * cellHeight;
  const left = col * cellWidth;

  options.top = top + '%';
  options.left = left + '%';
  options.width = (cellWidth * colSpan) + '%';
  options.height = (cellHeight * rowSpan) + '%';

  if (!options.hideBorder) {
    options.border = { type: 'line', fg: options.color || 'cyan' };
  } else {
    options.border.left = false;
    options.border.right = false;
    options.border.top = false;
    options.border.bottom = false;
  }

  const instance = widget(options);

  screen.append(instance);

  return instance;

};

/**
 * Render CLI nodes to terminal and apply
 * screen keys.
 */
export function render (spawned: ReturnType<typeof spawns>) {

  screen.key([ 'escape', 'q', 'C-c' ], (ch, key) => {
    clear(true);
    spawned.kill();
    process.exit(0);
  });

  screen.render();

}

/**
 * Blessed Tabs
 *
 * Generates a tab controlled layout with
 * multiple panes. Tabs accepts mouse events
 * and will toggle according to activity.
 */
export function tabs <
  T extends ITabState,
  R extends {
    [K in keyof T]?: (message: string) => void
  }
> (state: T, layout: ITabs): R {

  let focus: string;

  const toggle = (id: keyof ITabState) => (message?: string) => {

    if (message) state[id].panes.log(message);

    state[focus].panes.hide();
    state[focus].tabs.style.bold = false;
    state[focus].tabs.style.fg = 'white';
    state[id].panes.focus();
    state[id].panes.show();
    state[id].tabs.focus();
    state[id].tabs.style.bold = true;
    state[id].tabs.style.fg = 'cyan';

    focus = id as string;

  };

  const children = [];
  const returned: { [K in keyof T]?: (message: string) => void; } = {};

  for (const prop in state) {

    if (!focus) focus = prop;

    const active = prop === focus;

    returned[prop] = toggle(prop);

    state[prop].tabs = blessed.button({
      focus: active,
      content: toUpcase(prop),
      screen,
      mouse: true,
      clickable: true,
      padding: {
        right: 4
      },
      style: {
        bold: active,
        fg: active ? 'cyan' : 'white',
        hover: {
          fg: 'cyan'
        },
        focus: {
          fg: 'cyan',
          bold: true
        }
      }
    });

    children.push(state[prop].tabs);

    layout.panes.options.hidden = !active;
    layout.panes.options.content = prop;
    layout.panes.options.screen = screen;

    state[prop].panes = grid(
      layout.panes.row,
      layout.panes.col,
      layout.panes.rowSpan,
      layout.panes.colSpan,
      blessed.log,
      layout.panes.options
    );

    state[prop].tabs.on('press', returned[prop]);

  }

  grid(
    layout.tabs.row,
    layout.tabs.col,
    layout.tabs.rowSpan,
    layout.tabs.colSpan,
    blessed.layout,
    <Widgets.LayoutOptions>{
      children,
      screen,
      layout: 'inline-block',
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

  return returned as R;

}

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

      widget.setLine(0, bold().cyan('Syncify') + gray(' <!version!>'));
      widget.setLine(2, 'Uploads   ' + state.uploads);
      widget.setLine(3, 'Errors    ' + state.errors);
      widget.setLine(4, 'Warnings  ' + state.warnings);
      widget.setLine(6, 'Env       ' + magenta(env || 'development'));
      widget.setLine(7, 'Resource  ' + magenta(resource));

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

/**
 * Spawned Proccesses
 *
 * Syncify spins up a child process for
 * compiling spawns/typescript. The spawned
 * process is encapsulted within the this pane.
 */
export function spawns (wrapper: IGrid, panes: ITabs['panes']) {

  let focus: string;

  const children: Widgets.ButtonElement[] = [];
  const state: ITabSpawnState = {};

  screen.key([ 'escape', 'q', 'C-c' ], (ch, key) => {
    clear();
    values(state).forEach(({ process }) => process.kill());
  });

  /**
   * Kill Spawned proccesses
   */
  const kill = () => values(state).forEach(({ process }) => process.kill());

  /**
   * Toggle Pane
   */
  const toggle = (id: string) => (message?: any) => {
    if (message) state[id].panes.log(message.toString());
    state[focus].panes.hide();
    state[focus].tabs.style.bold = false;
    state[focus].tabs.style.fg = 'white';
    state[id].panes.focus();
    state[id].panes.show();
    state[id].tabs.focus();
    state[id].tabs.style.bold = true;
    state[id].tabs.style.fg = 'cyan';
    focus = id;
  };

  /**
   * Render Spawned Proccesses
   */
  const render = (commands: string[]) => {

    for (const k in commands) {

      const cmd = commands[k];
      const args: string[] = /\s/g.test(cmd) ? cmd.split(' ') : [ cmd ];
      const command = args.shift();

      if (!has(command, state)) {
        if (!focus) focus = command;
        state[command] = { tabs: null, panes: null, process: null };
        state[command].process = spawn(command, args, {
          stdio: [
            'pipe',
            'pipe',
            'pipe',
            'pipe',
            'pipe'
          ]
        });
      }

      const active = focus === command;

      state[command].tabs = blessed.button({
        focus: active,
        content: toUpcase(k),
        mouse: true,
        clickable: true,
        padding: {
          right: 4
        },
        style: {
          bold: active,
          fg: active ? 'cyan' : 'white',
          hover: {
            fg: 'cyan'
          },
          focus: {
            fg: 'cyan',
            bold: true
          }
        }
      });

      children.push(state[command].tabs);

      state[command].panes = grid(
        panes.row,
        panes.col,
        panes.rowSpan,
        panes.colSpan,
        blessed.log,
        panes.options
      );

      state[command].process.stdio[1].on('data', toggle(command));
      state[command].process.stdio[2].on('data', toggle(command));
      state[command].process.stdio[3].on('data', toggle(command));
      state[command].tabs.on('press', () => toggle(command)());

    }

    grid(
      wrapper.row,
      wrapper.col,
      wrapper.rowSpan,
      wrapper.colSpan,
      blessed.layout,
      <Widgets.LayoutOptions>{
        layout: 'inline-block',
        children,
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

  return { kill, render };
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
