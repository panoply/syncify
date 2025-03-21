import type { Progress, Tui } from '@syncify/ansi';
import type { File } from '~file';
import type { List } from '~http/themeFiles';

export namespace PullMode {

  export interface State {
    /**
     * The TUI Instance
     */
    write: Tui
    /**
     * The total number of files to align
     */
    count: number;
    /**
     * The total number of files to align
     */
    total: number;
    /**
     * File exists in remote but not local
     */
    files: {
      create: File<List.Node>[];
      update: File<List.Node>[];
      stash: File<List.Node>[];
    }
    /**
     * Interval
     */
    interval: NodeJS.Timeout;
    /**
     * Progress bar
     */
    progress: Progress
  }

}
