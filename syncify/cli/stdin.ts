import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';
import { kill, prexit } from '@syncify/kill';

import { log } from '~cli/log';
import { LogModes } from '~enums';
import { event } from '~events';
import { o, plur } from '~utils';

import { $ } from '$';

interface StdinState {
  /**
   * The error index being shown
   */
  index: number;
  /**
   * The errors to render as TUI
   */
  write: _.Tui[];
  /**
   * Whether on not stdin errors is attached.
   */
  isAttached: boolean;
  /**
   * The callback handler for keypress events
   */
  keypress: ((data: string, key: { name: string; ctrl: boolean; }) => void);
  /**
   * Keyboard input was `s` for skipped - this is callback function
   */
  skipped: (index: number) => void;
  /**
   * Keyboard input was `w` for warn - this is callback function
   */
  warnings: (index: number) => void;
  /**
   * Keyboard input was `e` for errors - this is callback function
   */
  errors: (index: number) => void
  /**
   * The current TUI reference being shown
   */
  get shown(): _.Tui;
}

declare namespace Stdin {

  export type Warning = {
    /**
     * The error index being shown
     */
    index: number;
    /**
     * The TUI Instance of previews and editors
     */
    write: _.Tui[];
    /**
     *  Whether on not stdin watch is attached.
     */
    isAttached: boolean;
    /**
     * Whether or not `v` was pressed
     */
    pressed: boolean;
    /**
     * The callback handler for keypress events
     */
    keypress: ((data: string, key: { name: string; ctrl: boolean; }) => void);
    /**
     * The current TUI reference being shown
     */
    get active(): _.Tui;
  }

  export type Watch = {
    /**
     * The TUI Instance of previews and editors
     */
    write: _.Tui;
    /**
     *  Whether on not stdin watch is attached.
     */
    isAttached: boolean;
    /**
     * Whether or not `i` was pressed and preview + editor links are showing.
     */
    isShown: boolean;
    /**
     * The callback handler for keypress events
     */
    keypress: ((data: string, key: { name: string; ctrl: boolean; }) => void);
  }

  export type Bulk = {
    /**
     * The error index being shown
     */
    index: number;
    /**
     * The errors to render as TUI
     */
    write: _.Tui[];
    /**
     * Whether on not stdin errors is attached.
     */
    isAttached: boolean;
    /**
     * The callback handler for keypress events
     */
    keypress: ((data: string, key: { name: string; ctrl: boolean; }) => void);
    /**
     * The current TUI reference being shown
     */
    get active(): _.Tui;
  }

}

export const setStdin = stdin;

/**
 * Stdin Listeners
 *
 * Attached keypress listeners by extending this function.
 */
export function stdin () {

  stdin.errors = stdinerr();

  if ($.mode.watch) {
    stdin.bulk = stdinbulk();
    stdin.watch = stdinwatch();
    stdin.warnings = stdinwarn();
  }

};

stdin.errors = undefined as ReturnType<typeof stdinerr>;
stdin.watch = undefined as ReturnType<typeof stdinwatch>;
stdin.bulk = undefined as ReturnType<typeof stdinbulk>;
stdin.warnings = undefined as ReturnType<typeof stdinwarn>;
stdin.ansi = o({
  footer: `USE ${_.Encase('SB', _.gray('◄'))} AND ${_.Encase('SB', _.gray('►'))} ARROW KEYS TO NAVIGATE`,
  legend: {
    /** `[q] Exit Debug` */
    q: _.Encase('SB', _.gray.bold('q')) + WSP + 'Exit Debug',
    /** `[s] Skip Error */
    s: _.Encase('SB', _.gray.bold('s')) + WSP + 'Skip Error',
    /** `[w] View Warnings */
    w: _.Encase('SB', _.gray.bold('w')) + WSP + 'View Warnings',
    /** `[e] View Errors */
    e: _.Encase('SB', _.gray.bold('e')) + WSP + 'View Errors',
    /** `[v] View All' */
    v: _.Encase('SB', _.gray.bold('v')) + WSP + 'View all'
  }
});

/**
 * Error Viewer
 *
 * When there is more than 1 error this event handler is generated.
 * Each error can be navigated using the left/right arrow keys.
 *
 * ```
 * ┌─ Syncify ~ 1.0.0-alpha.1
 * │
 * │  $ sy push --dev
 * │
 * │  USE [►] AND [◄] ARROW KEYS TO NAVIGATE ERRORS
 * │
 * ├─ [v] View All
 * ├─ [w] View Warnings
 * ├─ [e] View Errors
 * ├─ [s] Skip Error
 * ├─ [q] Exit Debug
 * │
 * │  ERROR 1 of 10
 * │
 * └─ USE [►] AND [◄] ARROW KEYS TO NAVIGATE ERRORS
 * ```
 */
function stdinerr () {

  const state: StdinState = {
    index: 0,
    isAttached: false,
    write: [],
    keypress: null,
    skipped: null,
    errors: null,
    warnings: null,
    get shown () {
      return this.write[this.index];
    }
  };

  /**
   * Navigate to the next error
   */
  const next = () => {
    if (state.index < state.write.length - 1) {
      state.index++;
      log.update(state.shown.toString({ clear: false }));
    }
  };

  /**
   * Navigate to the previous error
   */
  const prev = () => {
    if (state.index > 0) {
      state.index--;
      log.update(state.shown.toString({ clear: false }));
    }
  };

  /**
   * Renders all errors, triggered by pressing `v`
   */
  const view = ({ exit = false } = {}) => {

    log.update.clear();
    log.update.done();
    log.nl();

    event.emit('stdin:view', state.index);

    state.write.forEach((write, index) => {

      write
      .Remove('legend', 'debug')
      .True(index !== state.write.length - 1, tui => tui.Pop())
      .True(index !== state.write.length - 1, tui => tui.Ruler())
      .toLog({ clear: true });

    });

    dispose();

    if (exit) kill.exit(0);

  };

  /**
   * Dispose and quit, applies process exit
   */
  const quit = () => {

    log.update.clear();
    log.update.done();
    log.ender($.log.group).nl('');

    dispose();

    kill.exit(0);

  };

  /**
   * Keypress listeners
   */
  const on = (id: 'skip' | 'error' | 'warning', callback: (index: number) => void) => {

    if (id === 'error') {

      if (!state.errors) {
        state.errors = () => callback(state.index);
        event.on('stdin:error', state.errors);
      }

    } else if (id === 'warning') {

      if (!state.warnings) {
        state.warnings = () => callback(state.index);
        event.on('stdin:warn', state.warnings);
      }

    } else if (id === 'skip') {

      if (!state.skipped) {
        state.skipped = () => callback(state.index);
        event.on('stdin:skip', state.skipped);
      }

    }
  };

  /**
   * Add keypress event listener
   */
  function listen (write: _.Tui[]) {

    if (state.isAttached) return update(write);

    state.index = 0;
    state.write = write;
    state.isAttached = true;
    state.keypress = (_data, key) => {
      if (key.name === 'left') return prev();
      if (key.name === 'right') return next();
      if (key.name === 'q') return quit();
      if (key.name === 'v') return view();
      if (key.name === 's') return event.emit('stdin:skip');
      if (key.name === 'w') return event.emit('stdin:warn');
      if (key.name === 'e') return event.emit('stdin:errors');
    };

    // Register the custom listener using the new name
    prexit.listener(state.keypress);

    log.update(state.shown.toString({ clear: false }));

    event.on('stdin:dispose', () => {
      log.update.done();
      dispose();
    });

  };

  /**
   * Updates the items log list being displayed
   */
  function update (messages: _.Tui[]) {

    state.index = 0;
    state.write = messages;

    log.update.clear();
    log.update(state.shown.toString({ clear: false }));

  }

  /**
   * Dispose of the keypress listener
   */
  function dispose () {

    if (!state.keypress) return;

    state.shown.Remove('debug', Infinity);
    log.update(state.shown.toString({ clear: false }));
    log.update.done();

    process.stdin.removeListener('keypress', state.keypress);

    state.keypress = undefined;
    state.isAttached = false;
    state.write = [];
    state.index = 0;

    if (state.skipped) event.off('stdin:skip', state.skipped);
    if (state.warnings) event.off('stdin:warn', state.warnings);
    if (state.errors) event.off('stdin:errors', state.errors);

    event.off('stdin:dispose', dispose);

  };

  /* -------------------------------------------- */
  /* PUBLIC                                       */
  /* -------------------------------------------- */

  return {
    get isAttached () { return state.isAttached; },
    listen,
    dispose,
    update,
    on
  };

};

function stdinwatch () {

  const state: Stdin.Watch = {
    write: null,
    isShown: false,
    isAttached: false,
    keypress: undefined
  };

  const create = () => {

    state.write = _.Create().Ruler();

    const width = $.target.reduce<{ store: number; theme: number }>((size, { target, store }) => {
      if (store.name.length > size.store) size.store = store.name.length;
      if (target.length > size.theme) size.theme = target.length;
      return size;
    }, { store: 0, theme: 0 });

    for (const url of [ 'Preview', 'Editor' ]) {
      state.write
      .Line(plur(url, $.target.length) + _.COL, _.gray)
      .Each($.target, function ({ target, store, editor, preview }) {
        this.Line(
          glue(
            _.WSR,
            _.TLD,
            _.WSP,
            _.whiteBright(store.name),
            _.WSP.repeat(width.store - (store.name.length - 1)),
            _.ARR,
            _.WSP,
            _.whiteBright.bold(target),
            _.WSP.repeat(width.theme - (target.length - 1)),
            _.ARR,
            _.WSP,
            _.gray.underline(url === 'Editor' ? editor : preview)
          )
        );
      }).True(url === 'Preview', tui => tui.Newline());
    }
  };

  const listen = () => {

    if (state.isAttached) return;
    if (state.write === null) create();

    state.keypress = (_data, key) => {
      if (key.name === 'i' && state.isShown === false) {
        state.isShown = true;
        state.write.toLog({ trim: false });
      }
    };

    // Register the custom listener using the new name
    prexit.listener(state.keypress);

    state.isAttached = true;

  };

  const dispose = () => {
    if (state.keypress) {
      process.stdin.removeListener('keypress', state.keypress);
      state.keypress = undefined;
      state.isAttached = false;
    }
  };

  return {
    get isAttached () { return state.isAttached; },
    get isShown () { return state.isShown; },
    set isShown (shown) { state.isShown = shown; },
    listen,
    dispose
  };

};

function stdinbulk () {

  const state: Stdin.Bulk = {
    index: 0,
    isAttached: false,
    write: [],
    keypress: undefined,
    get active () { return this.write[this.index]; }
  };

  const next = () => {
    if (state.write.length > 1 && state.index < state.write.length - 1) {
      state.index++;
      log.update(state.active.toString({ clear: false, trim: false }));
    }
  };

  const prev = () => {
    if (state.write.length > 1 && state.index > 0) {
      state.index--;
      log.update(state.active.toString({ clear: false, trim: false }));
    }
  };

  const reset = () => {
    log.update.clear();
    state.write = [];
    state.index = 0;
  };

  const render = () => {

    if ($.errors.size === 0) return;

    state.write = [];
    state.index = 0;

    let count: number = 0;

    $.errors.values().forEach(stack => count += stack.length);

    for (const stack of $.errors.values()) {

      stack.forEach((value) => {

        const T = _.Create({ type: 'error' });

        count > 1 ? T
        .Newline('line')
        .Line(`ERROR ${state.write.length + 1} of ${count}`, _.bold)
        .Insert(value)
        .BR
        .Newline('line')
        .True(count > 1, tux => tux.End(stdin.ansi.footer, false)) : T.Insert(value).BR.Newline('line');

        state.write.push(T);

      });

    }

    log.update(
      state.active.toString({
        clear: false,
        trim: false
      })
    );

  };

  const dispose = () => {

    if (!state.keypress) return;

    process.stdin.removeListener('keypress', state.keypress);

    log.update.clear();
    log.update.done();

    // log all errors on dispose and empty write cache
    state.write.forEach((write, i) => {
      write
      .Pop()
      .True(i !== state.write.length - 1, tui => tui.Ruler())
      .toLog({ clear: true });
    });

    state.keypress = undefined;
    state.isAttached = false;
    state.write = [];
    state.index = 0;

    $.log.mode = LogModes.Watch;

    if (!stdin.watch.isAttached) {
      stdin.watch.listen();
      stdin.warnings.listen();
    }

  };

  const listen = () => {

    if (state.isAttached) return;

    stdin.warnings.dispose(); // dispose of warnings in watch
    stdin.watch.dispose(); // dispose of watch in bulk watch

    state.isAttached = true;
    state.keypress = (_data, key) => {
      if (key.name === 'left') return prev();
      if (key.name === 'right') return next();
    };

    // Register the custom listener using the new name
    prexit.listener(state.keypress);

    render();

    $.log.mode = LogModes.BulkErrors;

  };

  return {
    get isAttached () { return state.isAttached; },
    listen,
    dispose,
    reset
  };

}

function stdinwarn () {

  const state: Stdin.Warning = {
    index: 0,
    isAttached: false,
    write: undefined,
    keypress: undefined,
    pressed: false,
    get active () { return this.write[this.index]; }
  };

  const next = () => {
    if (state.write.length > 1 && state.index < state.write.length - 1) {
      state.index++;
      log.update(state.active.toString({ clear: false }));
    }
  };

  const prev = () => {
    if (state.write.length > 1 && state.index > 0) {
      state.index--;
      log.update(state.active.toString({ clear: false }));
    }
  };

  const reset = () => {
    log.update.clear();
    state.write = [];
    state.index = 0;
  };

  const view = () => {

    if (state.pressed) return;
    if (!$.warnings.has($.log.uri)) return;

    state.write = undefined;
    state.index = 0;
    state.pressed = true;

    let count: number = 0;

    $.warnings.get($.log.uri).values().forEach(stack => count += stack.size);

    for (const stack of $.warnings.get($.log.uri).values()) {

      stack.forEach((value) => {

        const tui = _.Create({ type: 'warning' });

        if (count > 1) {
          tui
          .Newline('line')
          .Append(`WARNING ${state.write.length + 1} of ${count}`, _.bold.yellowBright)
          .Insert(value)
          .Newline('line')
          .End(stdin.ansi.footer);
        } else {
          tui.Insert(value);
        }

        state.write.push(tui);

      });

    }

    log.update(
      state.active.toString({
        clear: false
      })
    );

  };

  const dispose = () => {

    if (!state.keypress) return;

    process.stdin.removeListener('keypress', state.keypress);

    state.keypress = undefined;
    state.isAttached = false;
    state.write = [];
    state.index = 0;
    state.pressed = false;

    log.update.done();

  };

  const listen = () => {

    if (state.isAttached) return;

    state.isAttached = true;
    state.keypress = (_data, key) => {
      if (key.name === 'left') return prev();
      if (key.name === 'right') return next();
      if (key.name === 'v') return view();
    };

    // Register the custom listener using the new name
    prexit.listener(state.keypress);

  };

  /* -------------------------------------------- */
  /* PUBLIC                                       */
  /* -------------------------------------------- */

  return {
    get isAttached () { return state.isAttached; },
    listen,
    dispose,
    view,
    reset
  };

}
