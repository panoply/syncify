import type * as Type from 'types';
import type { File } from '~file';
import type { Upsert } from '~http/themeFiles';

import notifier from 'node-notifier';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';
import { timer } from '@syncify/timer';

import { bulk } from '~cli/bulk';
import { stdin } from '~cli/stdin';
import { console } from '~console';
import { LogModes } from '~enums';
import { error } from '~errors';
import {
  addSuffix,
  forEach,
  getTime,
  hasProp,
  isEmpty,
  isString,
  plur,
  toUpcase
} from '~utils';

import { $, q } from '$';

/*

  LOG METHODS

  This file serves as a centralized control point for handling logging in Syncify.
  The log function is directly augmented with static methods, each responsible for
  writing to stdout at various points and in different modes of operation.

  The rationale for this direct augmentation and centralized logging is to maintain
  a highly refined CLI developer experience (DX). By isolating log messages in a
  single location, we only need to pass the necessary parameters, simplifying the
  implementation and maintenance.

  A few important details to note:

  1. The console import is a custom class that processes a custom Writable stream.
  2. While the TUI composer generates the majority of log messages, there are exceptions
    where direct message forwarding occurs.

  Admittedly, logging in Syncify might seem over-engineered. However, achieving the desired
  outcome requires a certain level of complexity. For now, this approach is the most
  custom and effective solution I've devised.
*/

/* -------------------------------------------- */
/* CORE                                         */
/* -------------------------------------------- */

/**
 * Log method interface Augmentation
 *
 * Calling `log` will omit `Tree.Line` prefixing and behave in a mostly
 * native manner, with the exception that `string` input is expected.
 */
function log (...message: string[]): typeof log {
  forEach(line => console.write(line), message);
  return log;
};

log.runtime = _.TUI('runtime');
log.progress = _.progress;
log.update = _.update;
log.spinner = _.Spinner();
log.line = console.info;
log.header = console.header;
log.bulk = bulk;
log.wrap = console.wrap;

/**
 * Log Horizonal Line
 *
 * Prints a horizontal line separator which will default to spanning the wrap of the terminal pane.
 *
 * @example
 *
 * │
 * ├────────────────────────────────────────────────
 * │
 */
log.hline = (options: { width?: number, newlines?: boolean } = {}) => {

  const { wrap } = $.terminal;

  if (isEmpty(options)) {

    options.width = wrap;
    options.newlines = false;

  } else {

    const has = hasProp(options);

    if (!has('width')) options.width = wrap;
    if (!has('newlines')) options.newlines = false;
  }

  log(
    _.Ruler(
      options.width,
      options.newlines
    )
  );

};

/**
 * TUI Newline
 *
 * Inserts a newline _trunk_ character. Optionally pass an empty string (i.e, `''`) to insert
 * a newline without without line character
 *
 * `│`
 */
log.nl = function (this: typeof log, entry?: Type.LiteralString<'red' | 'yellow'>) {
  entry === NIL ? console.break() : console.tree(entry);
  return this;
};

/**
 * TUI Clear
 *
 * Clears the console messages.
 */
log.clear = (clear = true) => clear ? log(_.clear) : log;

/**
 * New Group
 *
 * Changes the $.log.group
 *
 * @example
 * │
 * └─ Name ~ 01:59:20
 */
log.group = function (this: typeof log, name?: string | boolean) {

  if ($.config.log.silent || $.env.tree === false) return;

  if ($.log.mode === LogModes.BulkErrors) stdin.bulk.dispose();

  log.ender();

  if (isString(name)) {
    if ($.mode.bulk) {
      log.begin(`Bulk ${_.CHV} ${toUpcase(name)}`, { group: true });
    } else {
      log.begin(name, { group: true });
    }
  }

  return this;

};

/**
 * Task Dash
 *
 * @example
 * ├─ input
 */
log.task = (name?: string, timestamp = true) => {

  if ($.config.log.silent || $.env.tree === false) return;

  if (isString(name)) {

    console.dash(
      glue.ws(_.gray(name), timestamp ? _.Append(getTime()) : NIL)
    );

  } else {
    log.clear()(
      _.Tree.trim,
      _.Dash(glue.ws(_.gray($.log.group), _.Append(getTime())))
    );
  }

};

/**
 * Log Process - `whiteBright`
 *
 * The `message` parameter spread accepts either a message and time
 * append or time append.
 *
 * @example
 *
 * '│ process → ESBuild ~ 500ms'             // Passing a time only
 * '│ process → ESBuild ‣ message ~ 500ms'   // Passing a message and time
 */
log.process = (label: string, ...message: [ string, string? ]) => {

  if ($.mode.pack || $.mode.build || $.config.log.silent) return;

  console.info(
    _.Prefix(
      'process',
      message.length === 2
        ? glue.ws(_.bold(label), _.CHV, message[0], _.Append(message[1]))
        : glue.ws(_.bold(label), _.Append(message[0]))
    )
  );
};

/**
 * Log Uploaded - `neonGreen`
 *
 * @example
 *
 * '│ uploaded → theme → store.myshopify.com ~ 500ms'
 * '│ uploaded → dir/file.liquid → theme → store.myshopify.com ~ 500ms'
 */
log.upsert = (upsert: Upsert.Resolve) => {

  const { target, store } = upsert.target;

  if ($.mode.bulk) {

    forEach(({ filename }) => {

      bulk.synced(filename, target, store.name);
      bulk.progress.increment();
      bulk.tui.Update($.bulk.type, bulk.progress.render()).toUpdate();

    }, upsert.synced);

    if (upsert.errors.length > 0) {

      error.upsert(upsert.errors);
      bulk.progress.increment(upsert.errors.length);
      bulk.tui
      .Update($.bulk.type, bulk.progress.render())
      .Update('errors', `${_.bold($.errors.size)} ${plur('Error', $.errors.size)}`, _.redBright)
      .toUpdate();

    }

  } else {

    forEach(({ filename }) => {
      console.info(
        _.Prefix('uploaded', _.bold(target), store.name, filename, timer.stop()),
        _.neonGreen
      );
    }, upsert.synced);

    upsert.errors.length > 0 && error.upsert(upsert.errors);

  }

};

/**
 * Log Changed - `neonCyan`
 *
 * This function will perform various house-keeping operations, such as:
 *
 * - Clears {@link $.errors}
 * - Clears {@link $.warnings}
 * - Updates {@link $.log.changes} count
 * - Sets {@link $.log.uri} to file input uri
 * - Changes log group
 *
 * @example '│ changed → source/dir/file.ext'
 */
log.changed = (file: File) => {

  if (stdin.watch.isShown) stdin.watch.isShown = false;
  if ($.errors.size > 0) $.errors.clear();

  if ($.warnings.size > 0) {
    $.warnings.clear();
    stdin.warnings.reset();
  }

  if ($.config.log.silent === true || $.mode.watch === false) return;

  timer.start();

  // Provides us better group context, for example:
  //
  // Liquid Snippet
  // Liquid Template
  //
  const name = `${file.kind} ${_.CHV} ${toUpcase(file.namespace)}`;
  const change = $.log.changes.has(file.relative) ? $.log.changes.get(file.relative) + 1 : 1;

  // Increment Change Count
  $.log.changes.set(file.relative, change);

  // close previous group
  if ($.log.group !== name) {

    log.group(name); // $.log.group is updated

    if ($.log.title !== file.namespace) $.log.title = file.namespace;

  } else {

    log.group(name);

  }

  // Update the current records
  if ($.log.uri !== file.input) $.log.uri = file.input;

  console.info(
    _.Prefix('changed', `${file.relative} ${_.Append(`${change} ${plur('change', change)}`)}`),
    _.neonCyan
  );

};

/**
 * Log Syncing - `magentaBright`
 *
 * @example
 * // Logs warnings if detected
 *
 * '│ warning → 2 warnings ~ Type w and press enter to view'
 * '│ syncing → dir/file.ext'
 *
 * // No Warnings
 * '│ syncing → dir/file.ext'
 */
log.syncing = (path: string, { hot = false } = {}) => {

  if ($.mode.pack || $.mode.bulk || $.mode.build || $.mode.debug || $.config.log.silent) return;

  if ($.warnings.has(path)) {
    const { size } = $.warnings.get(path);
    log.warn(`${_.bold(size)} ${plur('warning', size)}`, _.Suffix.warning);
  }

  console.info(
    _.magentaBright(
      _.Prefix(
        'syncing'
        , path.replace(/^(\d+)/, _.bold('$1'))
      )
    )
  );

  if (q.http.pending > (hot ? 0 : 2)) {

    console.info(
      _.orange(
        _.Prefix(
          'queued'
          , glue.ws(
            path
            , _.TLD
            , _.bold(addSuffix(q.http.pending))
            , 'in queue'
          )
        )
      )
    );
  }
};

/**
 * Log Resource - `neonGreen`
 *
 * Identical to `upload` but accepts a `store` parameter and requires
 * the resource `type` be providedl.
 *
 * @example
 *
 * '│ uploaded → page → store.myshopify.com ~ 500ms'
 */
log.resource = (type: string, store: Type.Store) => {

  if ($.mode.watch) {

    $.log.queue.add(
      [
        type,
        store.domain,
        timer.stop()
      ]
    );

    if ($.log.idle) return; else $.log.idle = true;

    q.http.onIdle().then(() => {

      for (const [ type, store, ctime ] of $.log.queue) {

        console.info(
          _.Line(
            _.neonGreen(
              _.Prefix(
                'uploaded',
                glue.ws(
                  _.bold(type)
                  , _.ARR
                  , store
                  , _.Append(ctime)
                )
              )
            )
          )
        );

      }

      $.log.queue.clear();
      $.log.idle = false;

    });

  } else {

    console.info(
      _.Line(
        _.neonGreen(
          _.Prefix(
            'uploaded',
            glue.ws(
              _.bold(type),
              _.ARR,
              store.domain,
              _.Append(timer.stop())
            )
          )
        )
      )
    );

  }
};

/**
 * Log Invalid - `red`
 *
 * Accepts an optional `message` and when provided will replicate
 * an error. Cancellation is not imposed, it is left upto the calling function
 * to cancel out of any operations.
 *
 * @example
 *
 * '│ invalid → dir/file.ext'
 */
log.invalid = (path: string, message?: string | string[]) => {

  console.error(_.Prefix('invalid', path));

  notifier.notify(
    {
      title: 'Syncify Error',
      sound: 'Pop',
      open: path,
      subtitle: path,
      message: 'Invalid error'
    }
  ).notify();

  if (message) {
    console.error(_.Wrap(...message, { line: 'red', color: _.redBright }));
  }

};

/**
 * Log Error - `red`
 *
 * An applied log error which will also call notifier. This will typically
 * be invoked before the error response is written.
 *
 * ```bash
 *
 * failed → dir/file.ext
 * failed → dir/file.ext ~ suffix
 */
log.error = (input: string, { suffix = null, notify = null }: {
  /**
   * Suffix text - optional and will apply an append when passed
   *
   * @default null
   */
  suffix?: string;
  /**
   * Notifier Object - When undefined no notification will be invoked
   *
   * @default null
   */
  notify?: notifier.Notification & { contentImage?: string }
} = {}) => {

  if ($.mode.bulk) return;

  const message = _.capture.numbers(input, _.bold);

  console.error(_.Prefix('failed', suffix ? `${message} ${_.Append(suffix)}` : message));

  if (notify !== null) {
    notify.contentImage = $.file.notifier;
    notifier.notify(notify).notify();
  }

};

/**
 * Log Transfrom `whiteBright`
 *
 * `label`
 *
 * Renders in **bold**
 *
 * `suffix[0]`
 *
 * Renders with `→` prefix
 *
 * `suffix[1]`
 *
 * Renders with `→` prefix following additional `→`
 *
 * `suffix[2]`
 *
 *  Renders with `→` prefix following additional `→` then `~` append
 *
 * ---
 *
 * **Example**
 *
 * @example
 *
 * // log.transform(File)
 * '│ transform » dir/file.ext'
 *
 * // log.transform(File, 'one')
 * '│ transform » dir/file.ext → one'
 *
 * // log.transform(File, 'one', 'two')
 * '│ transform » dir/file.ext → one → two'
 *
 * // log.transform(File, 'one', 'two', 'three)
 * '│ transform » dir/file.ext → one → two ~ three'
 */
log.transform = (label: string | File, ...suffix: [ string?, string?, string? ]) => (
  $.mode.build ||
  $.mode.bulk ||
  $.mode.debug
) || console.info(
  _.Prefix('transform', _.bold(label), ...suffix),
  _.whiteBright
);

/**
 * Log Minified - `whiteBright`
 *
 * @example
 *
* '│ minified → CSS → 200kb ⥂ 120kb ~ saved 80kb'  // Passing kind
* '│ minified → 200kb ⥂ 120kb ~ saved 80kb'        // Omitting kind
*/
log.minified = (...p: Type.LogMinifiedParams) => (
  $.mode.pack ||
  $.mode.bulk ||
  $.mode.build
) || console.info(
  _.Prefix('minified', _.bold(p.shift()), ...p.slice(0, -1), `saved ${p.pop()}`),
  _.whiteBright
);

/**
 * Log Begin
 *
 * @example
 *
* // { timestamp: true }
* '\n┌─ Label ~ 01:59:20'
* '\n│'
*
* // { timestamp: false }
* '\n┌─ Label'
* '\n│'
*/
log.begin = (message: string, { timestamp = true, clear = true, group = false } = {}) => log.clear(clear)(
  _.NWL,
  _.Top(group ? ($.log.group = message) : message, timestamp),
  _.Tree.next + _.NWL
);

/**
* Log Ender
*
* @example
*
* // { timestamp: true }
* '│\n'
* '└─ input ~ 01:59:20 \n'
*
* // { timestamp: false }
* '│\n'
* '└─ input\n
*/
log.ender = (message?: string, { timestamp = true, clear = true } = {}) => log.clear(clear)(
  _.Tree.trim + NWL,
  _.End(message || $.log.group, timestamp),
  _.NLR
);

/**
 * Log Skipped - `gray`
 *
 * @example
 *
 * '│ skipped → dir/file.ext ~ reason'
 */
log.skipped = (file: File | string, reason: string) => (
  $.mode.pack ||
  $.mode.build ||
  $.mode.bulk
) || console.info(
  _.Prefix('skipped', `${isString(file) ? file : file.key} ${_.Append(reason)}`),
  _.gray
);

/**
 * Log Deleted - `blueBright`
 *
 * @example
 *
* '│ deleted → dir/filename.ext → theme ~ store.myshopify.com'
*/
log.deleted = (file: string, theme: Type.Theme) => console.info(
  _.Prefix('deleted', file, ...[ $.mode.bulk ? (theme.target, theme.store.domain) : undefined ]),
  _.blueBright
);

/**
 * Log Zipped `whiteBright`
 *
 * @example
 *
* '│ zipped → ZIP 1.5mb ~ source/dir/file.ext'
*/
log.zipped = (size: string, path: string) => console.info(
  _.Prefix('zipped', `${_.bold('ZIP')} ${size} ${_.Append(path)}`),
  _.whiteBright
);

/**
 * Log Ignored - `yellowBright`
 *
 * @example
 *
 * '│ ignored → dir/file.ext'
 */
log.ignored = (path: string) => console.info(
  _.Prefix('ignored', path),
  _.yellowBright
);

/**
 * Log File Rename - `whiteBright`
 *
 * @example
 *
 * '│ rename → old-name.liquid ⥂ new-name.liquid'
 */
log.rename = (from: string, to: string) => (
  $.running === false ||
  $.mode.watch
) || console.info(
  _.Prefix('renamed', _.bold(from), _.bold(to)),
  _.whiteBright
);

/**
 * Log Warning `yellowBright`
 *
 * @example
 *
* '│ warning → message ~ suffix
*/
log.warn = (message: string, suffix?: string) => console.info(
  _.Prefix('warnings', suffix ? `${message} ${_.Append(suffix)}` : `${message}`),
  _.yellowBright
);

/**
 * Log HOT Reload - `neonRouge`
 *
 * > Pass an optional timer `id` reference
 *
 * @example
 *
 * '│ reloaded → HOT RELOAD ~ 500ms'
 */
log.hot = (id?: string) => console.info(
  _.Prefix('reloaded', _.bold('HOT RELOAD'), timer.now(id)),
  _.neonRouge
);

/**
 * Log Exported - `teal`
 *
 * @example
 *
 * '│ exported → script ⥂ snippet'
 */
log.exported = (from: string, to: string) => console.info(
  _.Prefix('exported', _.bold(from), _.bold(to)),
  _.teal
);

/**
 * Log Retrying - `orange`
 *
 * @example
 *
 * '│ retrying → dir/file.ext → theme ~ store.myshopify.com'
 */
log.retrying = (file: string, theme: Type.Theme) => console.info(
  _.Prefix('retrying', file, theme.target, theme.store.domain),
  _.orange
);

/**
 * Log Reloaded - `whiteBright`
 *
 * @example
 *
 * '│ reloaded » dir/file.ext ~ 500ms'
 */
log.reloaded = (path: string, time: string) => console.info(
  _.Prefix('reloaded', path, time),
  _.whiteBright
);

/**
 * Log Version Control `whiteBright`
 *
 * @example
 *
 * '│ version » v1.2.0 → v1.3.0 ~ bump'
 */
log.version = (version: Type.VersionControl, action: string) => console.info(
  _.Prefix('version', _.bold(version.number), _.bold(version.update.number), action),
  _.whiteBright
);

export { log };
