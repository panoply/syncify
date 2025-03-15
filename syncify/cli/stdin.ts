import * as _ from '@syncify/ansi';
import { kill, prexit } from '@syncify/kill';

import { log } from '~cli/log';
import { event } from '~events';

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

export const setStdin = stdin;

/**
 * Stdin Listeners
 *
 * Attached keypress listeners by extending this function.
 */
export function stdin () {

  stdin.errors = StdinError();

  if ($.mode.watch) {
    stdin.watch = StdinWatch();
    stdin.warnings = StdinWarning();
  }

};

stdin.errors = undefined as ReturnType<typeof StdinError>;
stdin.watch = undefined as ReturnType<typeof StdinWatch>;
stdin.warnings = undefined as ReturnType<typeof StdinWarning>;
stdin.ansi = {
  footer: `USE ${_.Encase('SB', _.gray('◄'))} AND ${_.Encase('SB', _.gray('►'))} ARROW KEYS TO NAVIGATE`,
  legend: {
    /** `[q] exit debug mode` */
    q: _.Encase('SB', _.gray.bold('q')) + WSP + 'exit debug mode',
    /** `[s] skip error */
    s: _.Encase('SB', _.gray.bold('s')) + WSP + 'skip error',
    /** `[w] view warnings */
    w: _.Encase('SB', _.gray.bold('w')) + WSP + 'view warnings',
    /** `[e] view errors */
    e: _.Encase('SB', _.gray.bold('e')) + WSP + 'view errors',
    /** `[p] print all errors and exit' */
    p: _.Encase('SB', _.gray.bold('p')) + WSP + 'print all'

  }
};

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
 * ├─ [p] print all errors and exit
 * ├─ [w] view warnings
 * ├─ [e] view errors
 * ├─ [s] skip error
 * ├─ [q] exit debug mode
 * │
 * │  ERROR 1 of 10
 * │
 * └─ USE [►] AND [◄] ARROW KEYS TO NAVIGATE ERRORS
 * ```
 */
function StdinError () {

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
      if (key.name === 'p') return print();
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

  function quit () {

  }

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

  function skip (callback: (index: number) => void) {

    if (!state.skipped) {
      state.skipped = () => callback(state.index);
      event.on('stdin:skip', state.skipped);
    }

  }

  /**
   * Updates the items log list being displayed
   */
  function errors (callback: (index: number) => void) {
    if (!state.errors) {
      state.errors = () => callback(state.index);
      event.on('stdin:error', state.errors);
    }
  }

  /**
   * Updates the items log list being displayed
   */
  function warn (callback: (index: number) => void) {
    if (!state.warnings) {
      state.warnings = () => callback(state.index);
      event.on('stdin:warn', state.warnings);
    }
  }

  /**
   * Renders all errors, triggered by pressing `p`
   */
  function print () {

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

    kill.exit(0);

  }

  /**
   * Navigate to the next error
   */
  function next () {
    if (state.index < state.write.length - 1) {
      state.index++;
      log.update(state.shown.toString({ clear: false }));
    }
  }

  /**
   * Navigate to the previous error
   */
  function prev () {
    if (state.index > 0) {
      state.index--;
      log.update(state.shown.toString({ clear: false }));
    }
  }

  /* -------------------------------------------- */
  /* PUBLIC                                       */
  /* -------------------------------------------- */

  return {
    get isAttached () { return state.isAttached; },
    listen,
    dispose,
    update,
    skip,
    warn,
    errors
  };

};

/**
 * Watch References
 *
 * In watch modes, there are a couple of keypress events
 * made available for quick referencing. These will output
 * relevant information about sync mode.
 */
function StdinWatch () {

  const preview = $.target.map(({ preview }) => preview);
  const editors = $.target.map(({ editor }) => editor);
  const write = _.Create()
  .Newline()
  .Template(preview, { id: 'p', hidden: true, color: _.gray.underline })
  .Template(editors, { id: 'a', hidden: true, color: _.gray.underline });

  /**
   * The callback handler for keypress events
   */
  let keypress: ((data: string, key: { name: string; ctrl: boolean; }) => void);

  /**
   * Attach the stdin watch listener for keypress events
   */
  function listen () {

    keypress = (_data, key) => {
      if (key.name === 'p') return write.Update('p').toLog({ clear: 'p', trim: false });
      if (key.name === 'a') return write.Update('c').toLog({ clear: 'a', trim: false });
    };

    // Register the custom listener using the new name
    prexit.listener(keypress);

    stdin.warnings.listen();

  };

  /**
   * Dispose of the keypress listener
   */
  function dispose () {

    if (keypress) {
      process.stdin.removeListener('keypress', keypress);
      keypress = undefined;
    }

  };

  return { listen, dispose };

};

/**
 * Error Viewer
 *
 * When there is more than 1 error this event handler is generated.
 * Each error can be navigated using the left/right arrow keys.
 *
 * ```
 * ┌─ SCSS ➤ Assets ~ 23:19:35
 * │
 * │  changed    »  source/styles/variables.scss ~ 1 change
 * │  process    »  SASS Dart ~ 234ms
 * │  process    »  PostCSS ~ 76ms
 * │  transform  »  SCSS ➔ CSS ➔ 129.7kb
 * │  syncing    »  assets/stylesheet.min.css
 * │  uploaded   »  dev ➔ brixtol ➔ assets/stylesheet.min.css ~ 615ms
 * │  warnings   »  3 warning ~ Type v and press enter to view all warning/s
 * │
 * │  WARNING 1 of 3
 * │
 * └─ USE [►] AND [◄] ARROW KEYS TO NAVIGATE
 * ```
 */
function StdinWarning () {

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

  function reset () {

    log.update.clear();
    state.write = [];
    state.index = 0;

  }

  /**
   * Attach the stdin watch listener for keypress events
   */
  function listen () {

    if (state.isAttached) return;

    state.isAttached = true;
    state.keypress = (_data, key) => {
      if (key.name === 'left') return prev();
      if (key.name === 'right') return next();
      if (key.name === 'v') return view();
    };

    // Register the custom listener using the new name
    prexit.listener(state.keypress);

    event.on('warn:dispose', () => {
      log.update.done();
      dispose();
    });

  };

  /**
   * Dispose of the keypress listener
   */
  function dispose () {

    if (!state.keypress) return;

    process.stdin.removeListener('keypress', state.keypress);

    state.keypress = undefined;
    state.isAttached = false;
    state.write = [];
    state.index = 0;

    event.off('stdin:dispose', dispose);

  };

  /**
   * Updates the items log list being displayed
   */
  function view () {

    if (!$.warnings.has($.log.uri)) return;

    state.write = [];
    state.index = 0;

    let count: number = 0;

    $.warnings.get($.log.uri).values().forEach(stack => count += stack.size);

    for (const stack of $.warnings.get($.log.uri).values()) {

      stack.forEach((value) => {

        const tui = _.Create({ type: 'warning ' });

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

    log.update(state.shown.toString({ clear: false }));

  }

  /**
   * Navigate to the next error
   */
  function next () {
    if (state.write.length > 1 && state.index < state.write.length - 1) {
      state.index++;
      log.update(state.shown.toString({ clear: false }));
    }
  }

  /**
   * Navigate to the previous error
   */
  function prev () {
    if (state.write.length > 1 && state.index > 0) {
      state.index--;
      log.update(state.shown.toString({ clear: false }));
    }
  }

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
