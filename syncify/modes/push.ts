import type { Progress } from '@syncify/ansi';
import type { Store, Target } from 'types';
import type { File } from '~file';

import { relative } from 'node:path';

import { subscribe } from '@parcel/watcher';
import glob from 'fast-glob';
import { readFile } from 'fs-extra';

import * as _ from '@syncify/ansi';
import { kill } from '@syncify/kill';
import { timer } from '@syncify/timer';

import { Transform } from './watch';

import { stdin } from '~cli/stdin';
import { throwError } from '~cli/throws';
import { error } from '~errors';
import { event } from '~events';
import { themeFilesUpsertMap, type Upsert } from '~http/themeFiles';
import { outputFile, parse } from '~process/files';
import { byteSize, delay, eqWS, forEach, getChunk, m, NooP, s, stringSize } from '~utils';

import { $, q } from '$';

interface Synced {
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
  write: _.TUIInstance;
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
  warnings: Map<File, _.Tui>;
  /**
   * Remote Errors
   *
   * Entries in this map are request failures incurred during transfer
   */
  errors: Map<string, _.Tui>;
}

/**
 * Generates the push state model. This will maintain references used for the mass upsert
 * operation and hold all the necessary information required.
 */
function setState (write: _.Tui, files: string[]) {

  if (files.length === 0) {
    throwError([
      'Empty output directory'
    ], [
      `There are no files within ${_.neonCyan(relative($.cwd, $.dirs.output) + '/**')}`,
      `Run the ${_.neonCyan.bold('sy build')} command and try again.`
    ]);
  }

  const state: State = {
    kb: 0,
    files: files.sort(),
    stream: [],
    completed: [],
    interval: null,
    parsed: m(),
    stores: s(),
    transfer: m(),
    synced: m(),
    warnings: m(),
    errors: m(),
    write
  };

  const whitespace = eqWS($.target, { prop: 'target' });

  $.target.forEach(target => {

    if (state.stores.has(target.store) === false) {

      state.stores.add(target.store);

      state.write
      .Prepend(target.store.domain, _.bold)
      .Template({ id: `${target.uid}:files` })
      .Template({ id: `${target.uid}:progress` });

    }

    state.write.Template(_.ARL + WSR + target.target, {
      hidden: true,
      id: `${target.uid}`,
      color: _.gray
    });

    state.synced.set(target, {
      target,
      total: 0,
      ws: whitespace(target.target) + _.ARR + WSR,
      success: 0,
      transfer: 0,
      interval: null,
      progress: _.progress(state.files.length, {
        prepend: null,
        clearOnComplete: false
      })
    });

  });

  return state;

}

/**
 * Keeps the **duration** ticker running and prints the log update to terminal.
 */
function setLogInterval (state: State) {

  if (state.interval !== null) {
    clearInterval(state.interval);
    state.interval = null;
  }

  state.interval = setInterval(() => {

    state.write
    .Update('elapsed', _.capture.numbers(timer.now('upload'), _.bold))
    .Update('synced', state.stream.length > 1 ? state.stream.pop() : state.stream[0])
    .toUpdate();

  }, 100);

}

/**
 * Create file upsert chunks based on `--batch` and valdate files. This function will
 * also perform that file upserts. The `onUpsert` will receive handled files.
 */
async function setBatchUpserts (state: State) {

  const { write } = state;
  const parse = outputFile($.dirs.output);
  const batches: File[] = [];

  write.Spinner(`${state.files.length} Files`);

  for (let i = 0, s = state.files.length; i < s; i++) {

    const path = state.files[i];
    const file = parse(path);

    try {

      file.value = await readFile(file.output, 'utf8');
      file.size = byteSize(file.value);

      state.transfer.set(file.key, file.size);
      state.parsed.set(file.key, file);

      batches.push(file);

    } catch (e) {

      error.write('Error reading output file', {
        file: file.key,
        source: file.relative
      })(e);

    }

  }

  await delay();

  timer.start('batch');

  // Lets begin the uploads, splitting up into batches
  //
  for (const batch of getChunk(batches, $.cmd.batch)) {

    await themeFilesUpsertMap(batch);

  }

}

/**
 * Upload reporting which fires in the event emitter during `sy push`
 * operations. See the {@link upsert} sync function which handles the bulk.
 */
function onUpsert (state: State) {

  const { write } = state;

  return (upsert: Upsert.Resolve) => {

    const record = state.synced.get(upsert.target);

    forEach(({ filename }) => {
      state.kb += state.transfer.get(filename);
      state.stream.push(_.gray(filename));
    }, upsert.synced);

    record.progress.increment(upsert.synced.length);
    record.success += upsert.synced.length;

    // Update the templates
    write
    .Stop()
    .Update('version', $.vc.number)
    .Update('elapsed', _.capture.numbers(timer.now('upload'), _.bold))
    .Update('uploads', `${_.bold(record.success)} of ${_.bold(state.files.length)}`)
    .Update('transfer', stringSize(state.kb))
    .Update('errors', $.errors.size > 0 ? _.red.bold($.errors.size) : _.gray($.errors.size))
    .Update('synced', state.stream.length > 1 ? state.stream.pop() : state.stream[0])
    .Update(`${record.target.uid}:progress`, record.progress.render())
    .Update(`${record.target.uid}`)
    .toUpdate();

    if (upsert.errors.length > 0) {

      error.upsert(upsert.errors);

      record.progress.increment(upsert.errors.length);

      write
      .Update('errors', _.redBright.bold($.errors.size))
      .Update(`${record.target.uid}:progress`, record.progress.render());

      forEach(error => {

        // Create error TUI references
        // We need a new TUI instance for every error encountered.
        const tui = _.Create()
        .Mark('legend')
        .Newline()
        .Template({ id: 's', color: _.gray })
        .Template({ id: 'p', color: _.gray })
        .Template({ id: 'e', color: _.gray })
        .Template({ id: 'w', color: _.gray })
        .Template({ id: 's', color: _.gray })
        .Template({ id: 'q', color: _.gray })
        .Mark('results')
        .Header(upsert.target.store.domain, _.bold.whiteBright)
        .Template({ prefix: true, id: 'uploads', color: _.neonGreen })
        .Template({ prefix: true, id: 'errors', color: _.redBright })
        .Template({ prefix: true, id: 'warnings', color: _.yellowBright, hidden: true })
        .Template({ prefix: true, id: 'skipped', color: _.gray })
        .Newline()
        .Mark('debug')
        .Tree('error')
        .Template({ id: 'count', color: _.redBright });

        state.errors.set(error.file.key, tui);
        state.stream.push(_.redBright(error.file.key));

      }, upsert.errors);

    }

    if (state.interval === null) {

      setLogInterval(state);

    }

  };
}

async function Complete (state: State) {

  await q.http.onIdle();

  clearInterval(state.interval);

  state.write
  .Each($.target, ({ store }) => state.write.Remove('version', Infinity))
  .toUpdate({ clear: true })
  .clear();

  if ($.errors.size > 0) return Debug(state);

}

function Debug (state: State) {

  const debug: {
    error: Array<[File, _.Tui]>;
    skips: number[]
    warn: number[]
    first: boolean;
  } = {
    error: [],
    skips: [],
    warn: [],
    first: false
  };

  entries();
  observe();

  stdin.errors.warn((index) => {

    if (debug.error.length > 0) {
      debug.error.splice(index, 1);
      debug.skips.push(index);
    }

    entries();

  });

  stdin.errors.skip((index) => {

    if (debug.error.length > 0) {
      debug.error.splice(index, 1);
      debug.skips.push(index);
    }

    entries();

  });

  function observe () {

    subscribe($.dirs.input, (e, [ event ]) => {

      const change = parse(event.path);

      if (debug.error.some(([ { output } ]) => change.output === output)) {
        event.type !== 'delete' ? Transform(change) : NooP();
      }

    }).then(({ unsubscribe }) => {

      $.mode.debug = true;

      event
      .mode('debug')
      .on('debug', change);

      kill(async () => await unsubscribe());

    });
  }

  function entries () {

    if ($.errors.size === 0) return null;

    if (debug.first === true) {

      debug.error.forEach(([ file, tui ], number) => {

        const amount = `${_.gray('of')} ${_.bold(state.files.length)}`;
        const count = `${_.bold(number + 1)} of ${_.bold(debug.error.length)}`;

        tui
        .Update('uploads', `${_.bold(state.completed)} ${amount}`)
        .Update('errors', `${_.bold(debug.error.length)} ${_.gray('of')} ${_.bold(state.errors.size)}`)
        .Update('skipped', `${_.bold(debug.skips.length)} ${_.gray('of')} ${_.bold(state.errors.size)} `)
        .Update('count', `${_.bold('ERROR')} ${count}`);

      });

      if (debug.error.length === 0) {

        stdin.errors.dispose();

      } else {

        stdin.errors.update(debug.error.map(tui => tui[1]));
      }

    } else {

      $.errors.entries().forEach(([ file, messages ], number) => {

        const tui = state.errors.get(file.key);
        const amount = `${_.gray('of')} ${_.bold(state.errors.size)}`;
        const count = `${_.bold(number + 1)} of ${_.bold(state.errors.size)}`;

        tui
        .Tree('info')
        .Newline()
        .Update('s', stdin.ansi.legend.s, _.gray)
        .Update('p', stdin.ansi.legend.p, _.gray)
        .Update('e', stdin.ansi.legend.e, _.gray)
        .Update('q', stdin.ansi.legend.q, _.gray)
        .Newline()
        .Update('uploads', `${_.bold(state.completed.length)} ${amount}`)
        .Update('skipped', `${_.bold(debug.skips.length)} of ${_.bold(state.errors.size)}`)
        .Update('errors', `${_.bold(state.errors.size)} of ${_.bold(state.errors.size)}`)
        .Update('count', `${_.bold('ERROR')} ${count}`)
        .Pop(2)
        .Each(messages, message => tui.Insert(message).Break())
        .Tree('info')
        .Newline()
        .End(stdin.ansi.footer, false);

        debug.error.push([ file, tui ]);

      });

      debug.first = true;
      stdin.errors.listen(debug.error.map(tui => tui[1]));
    }
  };

  /**
   * Watch Change
   *
   * Callback fired when file with error has changed.
   */
  function change (upsert: Upsert.Resolve) {

    const record = state.synced.get(upsert.target);

    for (const { filename } of upsert.synced) {

      const find = debug.error.find(([ { key } ]) => key === filename);
      if (find) {
        $.errors.delete(find[0]);
        record.success += upsert.synced.length;
        entries();
      }
    }
  };

}

/**
 * `sy push`
 *
 * The `sy push` handler which applies uploads of theme file/s to the store/s.
 */
export async function Push (): Promise<void> {

  $.running = true;

  timer.start('upload');

  const write = _.Create()
  .Newline()
  .Spinner('0 Files')
  .Template({ prefix: true, id: 'version', color: _.bold })
  .Template({ prefix: true, id: 'elapsed', color: _.whiteBright })
  .Template({ prefix: true, id: 'uploads', color: _.whiteBright })
  .Template({ prefix: true, id: 'transfer', color: _.whiteBright })
  .Template({ prefix: true, id: 'errors', color: _.whiteBright })
  .Template({ prefix: true, id: 'warnings', color: _.whiteBright })
  .Template({ prefix: true, id: 'synced', color: _.whiteBright });

  const files = await glob([ `${$.dirs.output}/**` ]);
  const state = setState(write, files);

  event.mode('push').on('push', onUpsert(state));

  await setBatchUpserts(state);
  await Complete(state);

};
