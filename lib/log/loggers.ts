import type { LiteralUnion } from 'type-fest';
import type { File, Store, Theme } from 'types';
import notifier from 'node-notifier';
import { inspect } from 'node:util';
import { has, isEmpty } from 'rambdax';
import { $, warning } from '~state';
import { queue } from '~requests/queue';
import { NIL, NWL } from '~utils/chars';
import { addSuffix, sanitize, plural, toUpcase } from '~utils/utils';
import { error, isArray, isObject, log, nil, nl } from '~utils/native';
import { intercept } from '~cli/intercept';
import * as timer from '~utils/timer';
import * as errors from '~log/errors';
import * as c from '~cli/ansi';
import * as tui from '~log/tui';
import { Kind } from '~process/files';

/* -------------------------------------------- */
/* RE-EXPORTS                                   */
/* -------------------------------------------- */

export { default as update } from 'log-update';
export { start } from '~log/start';
export { clear, hline } from '~log/tui';
export { spinner } from '~log/spinner';
export { progress } from '~cli/progress';
export { log as out } from '~utils/native';

/* -------------------------------------------- */
/* INTERNAL                                     */
/* -------------------------------------------- */

/**
 * **INTERNAL - DEVELOPMENT ONLY**
 *
 * Console Log with inspect
 */
export function console (...message: any) {

  log(inspect(message, { colors: true, showHidden: true }));

}

/* -------------------------------------------- */
/* LOCAL SCOPES                                 */
/* -------------------------------------------- */

/**
 * Logger State
 *
 * Maintains a various log specific refs
 */
const state: {
  /**
   * Whether or not we are in idle
   */
  idle: boolean;
  /**
   * Current Group Name
   */
  group: LiteralUnion<Kind, string>;
  /**
   * Current Filename
   */
  title: string;
  /**
   * Current URI
   */
  uri: string;
  /**
   * Stdout/Stderr interception hook
   */
  listen: () => void;
  /**
   * Upload stacks, maintains files being uploaded
   */
  queue: Set<[string, string, string]>
} = {
  idle: false,
  group: 'Syncify',
  title: NIL,
  uri: NIL,
  listen: null,
  queue: new Set()
};

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

/**
 * Log Building - `neonCyan`
 *
 * @example '│ building → source/dir/file.ext'
 */
export function build (id: string, count: number, file: File | string) {

  const close = (state.title !== id);

  timer.start();

  // close previous group
  if (close) {
    log(tui.closer(state.group));

  }

  // clear if first run
  if (state.group === 'Syncify') tui.clear();

  // open new group
  if (close) {

    log(tui.opener(state.group));
    nwl();
    log(c.line.gray + c.bold(`${count} ${toUpcase(id)}`));
    nwl();

    // update group
    state.group = id;
    state.title = id;
  }

  nwl();
  log(tui.tree('top', c.neonCyan(typeof file === 'string' ? file : file.relative)));

};

/**
 * TUI Newline
 *
 * Inserts a newline _trunk_ character. Optionally pass
 * an empty string (ie: `''`) to insert a newline without
 * without c.line character
 *
 * `│`
 */
export function nwl (entry: '' | 'red' | 'yellow' | 'gray' | undefined = 'gray') {

  if (isEmpty(entry)) {
    log(NWL);
  } else {
    log(c.line[entry]);
  }

}

/**
 * Log Error - `red`
 *
 * Equivalent of `console.error` but applies line prefix
 * and sanitizes the input. Does not apply operation prefix.
 *
 */
export function err (input: string | string[]) {

  if (isArray(input)) {
    error(c.red(input.map(text => c.line.red + sanitize(text)).join(NWL)));
  } else {
    error(c.line.red + sanitize(input));
  }
}

/**
 * Log Write
 *
 * Writes a standard stdout message with line prefix.
 *
 * @example '│ lorem ipsum'
 */
export function write (input: string | string[]) {

  if (isArray(input)) {
    log(input.map(text => c.line.gray + sanitize(text)).join(nl));
  } else {
    log(c.line.gray + sanitize(input));
  }
}

/**
 * External Handling - `cyan`
 *
 * @example '│ external → operation'
 */
export function external (operation: string) {

  log(tui.suffix('cyan', 'external', operation));

};

/**
 * Hook
 *
 * Listens on `stdout` and Intercepts logs messages.
 * Maintains a reference of warning/stdout invoked by different processes.
 */
export function hook (name: string) {

  if (warning.current !== name) warning.current = name;

  if (!has(name, warning.process)) {
    warning.current = name;
    warning.process[name] = new Set();
  }

  state.listen = intercept((stream, data) => {

    if (data.charCodeAt(0) === 9474) {
      process[stream].write(data);
    } else {

      warning.count += 1;
      const text = data.split(NWL);

      while (text.length !== 0) {
        warning.process[name].add(`${c.yellowBright(text.shift().trimStart())}`);
      }
    }

  });

};

/**
 * Unhook
 *
 * Removes log listener and prints intercepted messages.
 * Captured logs can be printed based on `stdin` input.
 */
export function unhook () {

  state.listen();
  state.listen = null;

};

/**
 * New Group
 *
 * Changes the log group
 *
 * @example
 * │
 * └─ Name ~ 01:59:20
 */
export function group (name: string, clear = false) {

  // close previous group
  log(tui.closer(state.group));

  // do not clear if first run
  if (clear) tui.clear();

  log(tui.opener(name));

  state.group = name;

  nwl();

}

/**
 * Log Updated - `neonCyan`
 *
 * @example '│ updated → source/dir/file.ext'
 */
export function updated (file: File, suffix?: string) {

  log(tui.suffix('greenBright', 'updated', `${file.relative} ${suffix ? c.gray(`~ ${suffix}`) : nil}`));

}

/**
 * Log Changed - `neonCyan`
 *
 * @example '│ changed → source/dir/file.ext'
 */
export function changed (file: File) {

  const close = (state.title !== file.namespace);

  timer.start();

  // close previous group
  if (close) log(tui.closer(state.group));

  // do not clear if first run
  if (state.group !== 'Syncify' && close) tui.clear();

  // Provides us better group context, for example:
  //
  // Liquid Snippet
  // Liquid Template
  //
  state.group = `${file.kind} ${toUpcase(file.namespace)}`;

  // open new group
  if (close) {
    tui.clear();
    log(tui.opener(state.group));
    state.title = file.namespace;
  }

  // Create stack reference model
  if (!has(file.relative, warning)) warning[file.relative] = new Set();

  // Update the current records
  if (state.uri !== file.relative) state.uri = file.relative;

  if ($.mode.watch) {
    nwl();
    log(tui.suffix('neonCyan', 'changed', file.relative));
  }
};

/**
 * Log HOT Reload - `neonRouge`
 *
 * @example '│ reloaded → HOT RELOAD ~ 500ms'
 */
export function hot () {

  log(tui.suffix('neonRouge', 'reloaded', `${c.bold('HOT RELOAD')}${c.time(timer.now())}`));

}

/**
 * Log Resource - `neonGreen`
 *
 * Identical to `upload` but accepts a `store` parameter and requires
 * the resource `type` be providedl.
 *
 * @example '│ uploaded → page → store.myshopify.com ~ 500ms'
 */
export function resource (type: string, store: Store) {

  if ($.mode.watch) {

    state.queue.add([
      type,
      store.domain,
      timer.stop()
    ]);

    if (state.idle) return;

    state.idle = true;

    queue.onIdle().then(() => {

      for (const [
        type,
        store,
        time
      ] of state.queue) {

        log(tui.suffix('neonGreen', 'uploaded', `${c.bold(type)} → ${store}` + c.time(time)));

      }

      state.queue.clear();
      state.idle = false;

    });

  } else {

    log(tui.suffix('neonGreen', 'uploaded', `${c.bold(type)} → ${store.domain}` + c.time(timer.stop())));

  }

};

/**
 * Log Uploaded - `neonGreen`
 *
 * @example '│ uploaded → theme → store.myshopify.com ~ 500ms'
 */
export function upload (theme: Theme) {

  if ($.mode.watch) {

    state.queue.add(
      [
        theme.target,
        theme.store,
        timer.stop()
      ]
    );

    if (state.idle) return;

    state.idle = true;
    queue.onIdle().then(() => {

      for (const [
        target,
        store,
        time
      ] of state.queue) {

        log(tui.suffix('neonGreen', 'uploaded', `${c.bold(target)} → ${store}` + c.time(time)));

      }

      state.queue.clear();
      state.idle = false;

    });

  } else {

    log(tui.suffix('neonGreen', 'uploaded', `${c.bold(theme.target)} → ${theme.store}` + c.time(timer.stop())));

  }

};

/**
 * Log Prompt - `blueBright`
 *
 * This is curried and will close the log group. Calling
 * the return function will opens the log group. In addition
 * an optional `notify` message can be provided which will
 * trigger a notification when defined
 *
 *
 * ```
 * │ prompt → Command is required
 * │
 * └─ Name ~ 01:59:20
 *
 * Select an option
 *
 * >
 *
 * ┌─ Name ~ 01:59:20
 * ```
 *
 * @example '│ prompt → dir/file.ext'
 */
export function prompt (message: string, notify?: notifier.Notification) {

  // close previous group

  log(tui.suffix('orange', 'prompt', message));
  log(tui.closer(state.group) + NWL);

  if (isObject(notify)) notifier.notify(notify).notify();

  return () => {
    log(tui.opener(state.group));
    nwl();
  };

}

/**
 * Log Syncing - `magenta`
 *
 * @example '│ syncing → dir/file.ext'
 */
export function syncing (path: string, hot = false) {

  if (warning.count > 0) {
    log(tui.suffix(
      'yellowBright',
      'warning',
      `${warning.count} ${plural('warning', warning.count)}`
    ));
  }

  if (hot) {

    log(tui.suffix(
      'magentaBright',
      'syncing',
      path
    ));

    // when hot reloads hold off on logging queues
    if (queue.pending > 2) {
      log(tui.suffix(
        'orange',
        'queued',
        `${path} ${c.TLD} ${c.bold(addSuffix(queue.pending))} in queue`
      ));
    }

  } else {

    log(tui.suffix(
      'magentaBright',
      'syncing',
      path
    ));

    if (queue.pending > 0) {

      log(tui.suffix(
        'orange',
        'queued',
        `${path} ${c.TLD} ${c.bold(addSuffix(queue.pending))} in queue`
      ));
    }
  }

};

/**
 * Log Process - `whiteBright`
 *
 * The `message` parameter spread accepts either a message and time
 * append or simply a time append.
 *
 * When both message and time are passed:
 *
 * ```js
 * '│ process → ESBuild ‣ lorem ipsum ~ 500ms'
 * ```
 *
 * @example '│ process → ESBuild ~ 500ms'
 */
export function process (name: string, ...message: [message?: string, time?: string]) {

  let time: string = message[0];
  let text: string = nil;

  if (message.length === 2) {
    text = ` ${c.CHV} ${message[0]}`;
    time = message[1];
  }

  log(tui.suffix(
    'whiteBright',
    'process',
    `${c.bold(name)}${text}${c.time(time)}`
  ));

};

/**
 * Log Generate `whiteBright`
 *
 * @example '│ exported → Snippet → file.js.liquid'
 */
export function exported (file: string) {

  log(tui.suffix(
    'whiteBright',
    'exports',
    file
  ));

};

/**
 * Log Transfrom `whiteBright`
 *
 * ```
 * │  src/scripts/snippet.ts
 * │  └┐
 * │   ├→ transform → ESM bundle → 72.8kb
 * │   ├→ transform → exported as snippet
 * │  ┌┘
 * │  src/scripts/snippet.ts
 * ```
 *
 * @example '│ importer → source/dir/file.ext'
 */
export function importer (message: string) {

  if (!$.mode.build) {
    log(tui.suffix(
      'lavender',
      'importer',
      message
    ));
  }
};

/**
 * Log Transfrom `whiteBright`
 *
 * @example '│ transform → source/dir/file.ext'
 */
export function transform (message: string) {

  log(tui.suffix(
    'whiteBright',
    'transform',
    message
  ));

};

/**
 * Log Warning `yellowBright`
 *
 * @example '│ warning → message ~ autofix was applied
 */
export function warn (message: string, fix?: string) {

  log(tui.suffix(
    'yellowBright',
    'warning',
    `${message}${fix ? c.gray(` ~ ${fix}`) : NIL}`
  ));

};

/**
 * TUI Warning - `orange`
 *
 * @example '│ retrying → dir/file.ext → theme ~ store.myshopify.com'
 */
export function retrying (file: string, theme: Theme) {

  log(tui.suffix(
    'orange',
    'retrying',
    `${file} → ${theme.target} ${c.gray(`~ ${theme.store}`)}`
  ));

}

/**
 * Log Deleted - `blueBright`
 *
 * @example '│ deleted → dir/filename.ext → theme ~ store.myshopify.com'
 */
export function deleted (file: string, theme: Theme) {

  log(tui.suffix(
    'blueBright',
    'deleted',
    `${file} → ${theme.target} ${c.gray(`~ ${theme.store}`)}`
  ));

};

/**
 * Log Minified - `whiteBright`
 *
 * @example '│ minified → CSS 200kb → 120kb ~ saved 80kb'
 */
export function minified (kind: string, before: string, after: string, saved: string) {

  const suffix = kind
    ? `${c.bold(kind)} ${c.ARR} ${before} ${c.ARL} ${after} ${c.gray(`~ saved ${saved}`)}`
    : `${before} ${c.ARL} ${after} ${c.gray(`~ saved ${saved}`)}`;

  log(tui.suffix('whiteBright', 'minified', suffix));

};

/**
 * Log Reloaded - `magentaBright`
 *
 * @example '│ reloaded → section → dir/file.ext ~ 500ms'
 */
export function reloaded (path: string, time: string) {

  log(tui.suffix(
    'whiteBright',
    'reloaded',
    `${path}${time}`
  ));

};

/**
 * Log Skipped - `gray`
 *
 * @example '│ skipped → dir/file.ext'
 */
export function skipped (file: File | string, reason: string) {

  log(tui.suffix(
    'gray',
    'skipped',
    `${typeof file === 'string' ? file : file.key} ~ ${reason}`
  ));

};

/**
 * Log Warnings - `yellowBright`
 *
 * @example '│ ignored → dir/file.ext'
 */
export function ignored (path: string) {

  log(tui.suffix('gray', 'ignored', path));

};

/**
 * Log Invalid - `red`
 *
 * Accepts an optional `message` and when provided will replicate
 * an error. Cancellation is not imposed, it is left upto the calling function
 * to cancel out of any operations.
 *
 * @example '│ invalid → dir/file.ext'
 */
export function invalid (path: string, message?: string | string[]) {

  log(tui.suffix('red', 'invalid', path));

  const notification = notifier.notify({
    title: 'Syncify Error',
    sound: 'Pop',
    open: path,
    subtitle: path,
    message: 'Invalid error'
  });

  notification.notify();

  if (message) {

    nwl();

    if (isArray(message)) {
      error(c.red(message.map(text => `${c.line.red}${sanitize(text)}`).join(NWL)));
    } else {
      error(`${c.line.red}${sanitize(message)}`);
    }
  }

};

/**
 * Log Failed - `red`
 *
 * @example '│ failed → dir/file.ext'
 */
export function failed (path: string) {

  log(tui.suffix('red', 'failed', path));

  const notification = notifier.notify({
    title: 'Syncify Error',
    sound: 'Pop',
    open: path,
    subtitle: path,
    message: 'Request failed'
  });

  notification.notify();

};

export function configChanges () {

  nwl('yellow');
  log(`${c.line.yellow}${c.bold.yellow(`WARNING ${c.TLD} RESTART IS REQUIRED`)}`);
  nwl('yellow');
  log(
    c.line.yellow +
    c.bold.yellow(`Changes to ${c.neonCyan($.file.base)} require you restart watch mode.`) + NWL +
    c.line.yellow +
    c.bold.yellow('Failure to restart watch mode will prevent changes from being reflected.')
  );

  nwl('yellow');

  const notification = notifier.notify({
    title: 'WARNING',
    sound: 'Pop',
    wait: true,
    message: `Changes in ${$.file.base} will not reflect until you to restart watch mode.`
  });

  notification.notify();

}

/**
 * Log Failed - `red`
 *
 * @example '│ failed → dir/file.ext'
 */
export function throws (data: string) {

  throw new Error(data);

};

/**
 * Spawn Logging
 *
 * This function is responsible for spawned logs and also
 * informs about invoked spawned processes, which is not ideal
 * but suffices (for now).
 */
export function spawn (name: string) {

  return (...message: string[]) => {

    if (!$.spawn.invoked) $.spawn.invoked = true;

    if (state.group !== 'Spawn') {

      log(tui.closer(state.group));

      // do not clear if first run
      if (state.group !== 'Syncify') tui.clear();

      log(tui.opener('Spawn'));

      // update name reference
      state.group = 'Spawn';

    }

    if (state.title !== name) {

      log(tui.message('pink', name));

      // update spawn process title
      state.title = name;

    }

    errors.spawn(sanitize(message.shift()));
  };

};
