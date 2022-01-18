import { Widgets } from 'neo-blessed';
import { Merge } from 'type-fest';
import { ChildProcessWithoutNullStreams } from 'child_process';

declare module 'neo-blessed' {

  export interface IGrid {
    /**
     * The grid rows which are placement of
     * items between the top and bottom, for
     * example the below would have 3 rows.
     *
     * ```js
     * |    |    | // row 0
     * |    |    | // row 1
     * |    |    | // row 2
     * ```
     */
    row: number;
    /**
     * The grid cols which are placement of
     * items from left to right
     *
     * ```js
     * | col 0 | col 1  | // col 0 and 1 on row 0
     * | col 0 | col 1  | // col 0 and 1 on row 1
     * | col 0 | col 1  | // col 0 and 1 on row 2
     * ```
     */
    col: number;
    /**
     * The grid rowSpan which infers how
     * tall a row offset should be.
     *
     * ```js
     * |        |  col 1 | // row span is 0 on col 1
     * | col 0  |        | // row span is 1 on col 0
     * |        | col 1  | // row span is 3 on col 1
     * ```
     */
    rowSpan: number;
    /**
     * The grid colSpan which infers how
     * wide a col offset should be
     *
     * ```js
     * |        |  col 1 | // col span is 1
     * | col 0  |        | // col span is 0
     * |        | col 1  | // col span is 1
     * ```
     */
    colSpan: number;
  }

  export interface ITabState {
    [prop: string]: {
      tabs: Widgets.ButtonElement;
      panes: Widgets.Log;
    }
  }

  export interface ITabSpawnState {
    [prop: string]: {
      tabs: Widgets.ButtonElement;
      panes: Widgets.Log;
      process: ChildProcessWithoutNullStreams
    }
  }

  export interface ITabs {
    tabs: IGrid;
    panes: Merge<IGrid, { options: Widgets.LogOptions }>;
  }

}
