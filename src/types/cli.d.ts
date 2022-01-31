/* eslint-disable no-unused-vars */
import { Widgets, IGrid, ITabStates, ITabSpawn } from 'neo-blessed';
import { ChildProcessWithoutNullStreams } from 'child_process';

/* -------------------------------------------- */
/* CLI DASHBOARD                                */
/* -------------------------------------------- */

export interface IDashboard {
  status: {
    state: { errors: number; warnings: number; uploads: number; },
    layout: IGrid;
  },
  sync: {
    state: {
      uploaded: {
        tab: Widgets.ButtonElement,
        pane: Widgets.Log,
        count: number,
        spawn: ITabSpawn
      },
      created: {
        tab: Widgets.ButtonElement,
        pane: Widgets.Log,
        count: number,
        spawn: ITabSpawn
      },
      deleted: {
        tab: Widgets.ButtonElement,
        pane: Widgets.Log,
        count: number,
        spawn: ITabSpawn
      },
      errors: {
        tab: Widgets.ButtonElement,
        pane: Widgets.Log,
        count: number,
        spawn: ITabSpawn
      }
    }
    layout: IGrid;
    settings?: Widgets.LogOptions
  },
  console: {
    state: {
      error: {
        tab: Widgets.ButtonElement,
        pane: Widgets.Log,
        count: number,
        spawn: ITabSpawn
      },
      warning: {
        tab: Widgets.ButtonElement,
        pane: Widgets.Log,
        count: number,
        spawn: ITabSpawn
      },
      log: {
        tab: Widgets.ButtonElement,
        pane: Widgets.Log,
        count: number,
        spawn: ITabSpawn
      }
    };
    layout: IGrid;
    settings?: Widgets.LogOptions
  },
  assets: {
    state: ITabStates
    layout: IGrid;
    settings?: Widgets.LogOptions
  }
}

export type Sync<T = IDashboard['sync']['state']> = {
  [K in keyof T]: (message: string) => void
}

export type Assets<T = IDashboard['assets']['state']> = {
  [K in keyof T]: ChildProcessWithoutNullStreams
}

export type Console<T = IDashboard['console']['state']> = {
  [K in keyof T]: (message: string) => void
}

/* -------------------------------------------- */
/* CLI ROLLING LOG                              */
/* -------------------------------------------- */

export interface IStandard {
  assets: Array<{
    label: string;
    command: string;
  }>;
}

/* -------------------------------------------- */
/* CLI OPTIONS                                  */
/* -------------------------------------------- */

export interface ICLIOptions {
  /**
   * The command triggered
   */
  _?: string[];
  /**
   * Whether or not syncify was called via the cli
   */
  cli?: boolean;
  /**
   * The `package.json` url path
   */
  pkg?: string;
  /**
   * The current working directory
   */
  cwd?: string;
  /**
   * The environment variable passed
   */
  env?: string;
  /**
   *  The resource to be executed
   */
  resource?: string;
  /**
   *  The resource to be executed
   */
  terminal?: 'default' | 'minimal' | 'dashboard';
  /**
   * Provided stores to run sync on
   */
  store?: string | string[];
  /**
   * Themes within stores to run sync on
   */
  theme?: string[];
  /**
   * The output directory
   */
  output?: string;
}
