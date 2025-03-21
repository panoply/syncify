import type { Store, Target } from './$';
import type { Progress, Tui } from '@syncify/ansi';
import type { File } from '~file';

export namespace PushMode {

  export interface Synced {
    /**
     * Progress bar instance
     */
    progress: Progress;
    /**
     * Interval timer
     */
    interval: NodeJS.Timeout
    /**
     * Interval timer
     */
    ws: string
    /**
     * Count
     */
    total: number;
    /**
     * The theme request modal
     */
    target: Target;
    /**
     * The amount of bytes transferred
     */
    transfer: number;
    /**
     * The number of successful transfers
     */
    success: number;
  }

  export interface State {
    /**
     * The kb transferred
     */
    kb: number;
    /**
     * The amount of files globbed
     */
    files: string[];
    /**
     * The file stream
     */
    stream: string[];
    /**
     * Completed
     */
    completed: Synced[]
    /**
     * The TUI instance used for logging
     */
    write: Tui;
    /**
     * Transfer maps
     */
    transfer: Map<string, number>;
    /**
     * Interval timer
     */
    interval: NodeJS.Timeout
    /**
     * The parsed files
     */
    parsed: Map<string, File>;
    /**
     * Set of stores in the push operation.
     */
    stores: Set<Store>;
    /**
     * Push records populated in event callback
     */
    synced: Map<Target, Synced>;
    /**
     * Warning TUI Model
     */
    warnings: Map<File, Tui>;
    /**
     * Remote Errors
     *
     * Entries in this map are request failures incurred during transfer
     */
    errors: Map<string, Tui>;
  }
}
