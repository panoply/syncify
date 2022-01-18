import * as blessed from 'cli/blessed';
import { Console } from 'console';

/**
 * Sync Logs
 *
 * Shopify uploads etc.
 */
export const sync = blessed.tabs(
  {
    uploads: {
      tabs: null,
      panes: null
    },
    created: {
      tabs: null,
      panes: null
    },
    deleted: {
      tabs: null,
      panes: null
    },
    errors: {
      tabs: null,
      panes: null
    }
  },
  {
    tabs: {
      row: 0,
      col: 0,
      rowSpan: 1,
      colSpan: 5
    },
    panes: {
      row: 0,
      col: 0,
      rowSpan: 9,
      colSpan: 5,
      options: {
        top: 'center',
        left: 'center',
        clickable: false,
        focusable: false,
        scrollable: true,
        alwaysScroll: true,
        mouse: true,
        padding: {
          top: 1,
          left: 2,
          right: 0,
          bottom: 1
        },
        scrollbar: {
          ch: ' ',
          track: {
            bg: '#2a2a2e'
          },
          style: {
            bg: '#556875'
          }
        },
        fg: 'green',
        style: {
          border: {
            fg: '#2a2a2e'
          }
        }
      }
    }
  }
);

export const spawned = blessed.spawns(
  {
    row: 0,
    col: 5,
    rowSpan: 1,
    colSpan: 9
  },
  {
    row: 0,
    col: 5,
    rowSpan: 7,
    colSpan: 9,
    options: {
      top: 'center',
      left: 'center',
      clickable: false,
      focusable: false,
      scrollable: true,
      alwaysScroll: true,
      mouse: true,
      padding: {
        top: 1,
        left: 2,
        right: 2,
        bottom: 1
      },
      scrollbar: {
        ch: ' ',
        track: {
          bg: '#2a2a2e'
        },
        style: {
          bg: '#556875'
        }
      },
      style: {
        border: {
          fg: '#2a2a2e'
        }
      }
    }
  }
);

/**
 * Error Logs
 *
 * Syncify error, etc
 */
export const problem = blessed.tabs(
  {
    errors: {
      tabs: null,
      panes: null
    },
    warnings: {
      tabs: null,
      panes: null
    },
    console: {
      tabs: null,
      panes: null
    }
  },
  {
    tabs: {
      row: 7,
      col: 5,
      rowSpan: 1,
      colSpan: 9
    },
    panes: {
      row: 7,
      col: 5,
      rowSpan: 7,
      colSpan: 9,
      options: {
        top: 'center',
        left: 'center',
        scrollable: true,
        mouse: true,
        padding: 1,
        scrollbar: {
          track: {
            bg: '#2a2a2e'
          },
          style: {
            bg: '#556875'
          }
        },
        style: {
          border: {
            fg: '#2a2a2e'
          }
        }
      }
    }
  }
);

/**
 * Status
 *
 * Information about instance
 */
export const status = blessed.status(
  {
    errors: 0,
    uploads: 0,
    warnings: 0
  },
  {
    row: 9,
    col: 0,
    rowSpan: 4,
    colSpan: 4
  }
);

/**
 * Console Instance - Used for stdout and stderr
 */
export const console = new Console(
  {
    stdout: process.stdout,
    stderr: process.stderr
  }
);
