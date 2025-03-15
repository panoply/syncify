import type { LiteralString, LogMinifiedParams, Store, Theme, ThemeFiles, VC } from 'types';
import type { File } from '~file';
import type { Upsert } from '~http/theme';

import notifier from 'node-notifier';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';
import { timer } from '@syncify/timer';

import { bulk } from '~cli/bulk';
import { console } from '~cli/console';
import { stdin } from '~cli/stdin';
import { error } from '~errors';
import {
  addSuffix,
  forEach,
  getTime,
  hasProp,
  isArray,
  isEmpty,
  isFunction,
  isObject,
  isString,
  last,
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
  forEach(line => console.stdout.prefix(NIL).write(line), message);
  return log;
};

log.renamed = <[string?]>[];
log.progress = _.progress;
log.update = _.update;
log.spinner = _.Spinner();
log.line = console.info;
log.bulk = bulk;

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
log.begin = function (message: string, {
  timestamp = true,
  clear = true,
  group = false
} = {}) {

  if (clear) log.clear();
  if (group) $.log.group = message;

  log(_.Top(message, timestamp) + _.Tree.next);

};

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
log.ender = function (message?: string, { timestamp = true, clear = true } = {}): typeof log {

  if (!message) message = $.log.group;
  if (clear) log.clear();

  log(_.Tree.trim + NWL + _.End(message));

  return this;

};

/**
 * Log Wrap
 *
 * @example
 *
 * '│\n'
 * '│ lorem ipsum\n'
 * '│ lorem ipsum\n'
 * '│\n'
 */
log.wrap = (...message: [ string, _.Ansis? ] | [ ...Array<string | _.Ansis> ]) => {

  if (isFunction(last(message))) {
    const color = <_.Ansis>message.pop();
    console.info(_.Wrap(<string[]>message, { color, firstLineTree: false }));
  } else {
    console.info(_.Wrap(<string[]>message, { firstLineTree: false }));
  }

};

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
 * Log Write
 *
 * A custom log message for non-dedicated log methods
 *
 * @example
 *
 * '│ lorem ipsum'             // Settings omitted
 * '│ lorem ipsum ~ 10ms'      // Settings with prefix
 */
log.write = (message: string, {
  color = null,
  type = null,
  prefix = null,
  suffix = null
}:{
    /**
     * The color of the message
     *
     * @default whiteBright
     */
    color?: _.Ansis;
    /**
     * The type of message - The message `color` will reflect
     * if unspecific, meaning if `type` is `warning` text is yellow,
     * if `type` is `error` text is red.
     *
     * @default null
     */
    type?: 'warning' | 'error'
    /**
     * Whether or not to apply an prepend prefix.
     *
     * @default null
     */
    prefix?: string;
    /**
     * Whether or not to apply an append suffix.
     *
     * @default null
     */
    suffix?: string;
  } = {}) => {

  if (type === 'error') {
    if (prefix === null) {
      error(
        glue.ws(
          _.LineRed(color ? color(message) : _.redBright(message)),
          _.Append(suffix)
        )
      );
    } else {
      error(
        _.LineRed(
          (color || _.redBright)(
            _.Prefix(
              prefix
              , glue.ws(
                message,
                _.Append(suffix)
              )
            )
          )
        )
      );
    }
  } else if (type === 'warning') {
    if (prefix === null) {
      console.info(
        _.LineYellow(
          glue.ws(
            color ? color(message) : _.yellowBright(message),
            _.Append(suffix)
          )
        )
      );
    } else {
      console.info(
        _.LineYellow(
          (color || _.yellowBright)(
            _.Prefix(
              prefix
              , glue.ws(
                message,
                _.Append(suffix)
              )
            )
          )
        )
      );
    }
  } else {
    if (prefix === null) {
      console.info(
        _.Line(
          glue.ws(
            color ? color(message) : _.whiteBright(message),
            _.Append(suffix)
          )
        )
      );
    } else {
      console.info(
        _.Line(
          (color || _.whiteBright)(
            _.Prefix(
              prefix
              , glue.ws(
                message,
                _.Append(suffix)
              )
            )
          )
        )
      );
    }
  }

};

/**
 * TUI Newline
 *
 * Inserts a newline _trunk_ character. Optionally pass an empty string (i.e, `''`) to insert
 * a newline without without line character
 *
 * `│`
 */
log.nl = function (this: typeof log, entry?: LiteralString<'red' | 'yellow'>) {

  entry === NIL ? console.nl() : console.ln(entry);

  return this;

};

/**
 * TUI Clear
 *
 * Clears the console messages. Optionally pass a `boolean` value of `true`
 * to override the syncify `log.config` option.
 */
log.clear = (force = false) => {

  if (force === false && $.config.log.clear === false) return;

  log(_.clear);

};

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

  if ($.mode.bulk) {
    name = `Bulk ${_.CHV} ${toUpcase(name as string)}`;
    if ($.log.group === name) return this;
    $.log.group = name;
  }

  // Close previous group
  log.ender($.log.group);

  if ($.config.log.clear && name !== false) log.clear();

  if (isString(name)) {
    $.log.group = name;
    log.begin($.log.group);
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

    log(_.Dash(glue.ws(_.gray(name), timestamp ? _.Append(getTime()) : NIL)));

  } else {

    log.clear();
    log(_.Tree.after + _.Dash(glue.ws(_.gray($.log.group), _.Append(getTime()))));

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

  const print = _.Prefix(
    'process',
    message.length === 2 ? (
      glue.ws(
        _.bold(label)
        , _.CHV
        , message[0]
        , _.Append(message[1])
      )
    ) : (
      glue.ws(
        _.bold(label),
        _.Append(message[0])
      )
    )
  );

  console.info(_.whiteBright(print));

};

/**
 * Log Deleted - `blueBright`
 *
 * @example
 *
* '│ deleted → dir/filename.ext → theme ~ store.myshopify.com'
*/
log.deleted = (file: string, theme: Theme) => {

  const message = $.mode.bulk
    ? _.Prefix('deleted', file)
    : _.Prefix('deleted', file, theme.target, theme.store.domain);

  console.info(_.blueBright(message));

};

/**
 * Log Uploaded - `neonGreen`
 *
 * @example
 *
 * '│ uploaded → theme → store.myshopify.com ~ 500ms'
 * '│ uploaded → dir/file.liquid → theme → store.myshopify.com ~ 500ms'
 */
log.upload = (theme: Theme, input?: string | string[] | ThemeFiles.UpsertFiles[]) => {

  if ($.config.log.silent) return;

  if ($.mode.watch) {

    if (input) {
      if (isArray(input)) {
        if (input.length > 0) {
          if (isString(input[0])) {
            forEach<string>(file => log.upload(theme, file), input as string[]);
          } else {
            forEach(({ filename }) => log.upload(theme, filename), input as ThemeFiles.UpsertFiles[]);
          }
        }
      } else {

        console.info(
          _.neonGreen(
            _.Prefix(
              'uploaded'
              , input
              , theme.target
              , theme.store.name
              , timer.stop()
            )
          )
        );

      }

    } else {

      $.log.queue.add([ theme.target, theme.store.domain, timer.stop() ]);

      if ($.log.idle) return;

      $.log.idle = true;

      q.http.onIdle().then(() => {

        for (const [ target, store, ctime ] of $.log.queue) {

          console.info(
            _.neonGreen(
              _.Prefix(
                'uploaded'
                , _.bold(target)
                , store
                , ctime
              )
            )
          );

        }

        $.log.queue.clear();
        $.log.idle = false;

      });

    }

  } else {

    console.info(
      _.neonGreen(
        _.Prefix(
          'uploaded'
          , _.bold(theme.target)
          , theme.store.domain
          , timer.stop()
        )
      )
    );

  }
};

log.upsert = (upsert: Upsert.Resolve) => {

  if ($.mode.bulk) {

    const { target, store } = upsert.target;

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
        _.neonGreen(
          _.Prefix(
            'uploaded'
            , _.bold(upsert.target.target)
            , upsert.target.store.name
            , filename
            , timer.stop()
          )
        )
      );

    }, upsert.synced);

    if (upsert.errors.length > 0) {

      error.upsert(upsert.errors);

    }

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

  } else if ($.config.log.clear) {

    log.group(name);

  }

  // Update the current records
  if ($.log.uri !== file.input) $.log.uri = file.input;

  log(
    _.Line(
      _.neonCyan(
        _.Prefix(
          'changed',
          `${file.relative} ${_.Append(`${change} ${plur('change', change)}`)}`
        )
      )
    )
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

  if (
    $.mode.pack ||
    $.mode.bulk ||
    $.mode.build ||
    $.mode.debug ||
    $.config.log.silent) return;

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
 * Log Prompt - `blueBright`
 *
 * This is curried and will close the $.log.group. Calling
 * the return function will opens the $.log.group. In addition
 * an optional `notify` message can be provided which will
 * trigger a notification when defined
 *
 * @example
 *
 * '│ prompt → Command is required'
 * '│'
 * '└─ Name ~ 01:59:20'
 *
 * 'Select an option'
 *
 * '>'
 *
 * '┌─ Name ~ 01:59:20'
 */
log.prompt = (message: string, notify?: notifier.Notification) => {

  // close previous group

  console.info(
    _.Line(
      _.orange(
        _.Prefix('prompt', message)
      )
    ),
    _.End($.log.group)
  );

  if (isObject(notify)) notifier.notify(notify).notify();

  return () => console.info(_.Top($.log.group));

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
log.resource = (type: string, store: Store) => {

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

  error(
    _.red(
      _.Prefix('invalid', path)
    )
  );

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
    error(
      _.Wrap(
        ...message,
        { line: 'red', color: _.redBright }
      )
    );
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

  error(
    _.LineRed(
      _.redBright(
        _.Prefix(
          'failed',
          suffix ? `${message} ${_.Append(suffix)}` : message
        )
      )
    )
  );

  if (notify !== null) {
    notify.contentImage = $.file.notifier;
    notifier.notify(notify).notify();
  }

};

/**
 * Log Warning `yellowBright`
 *
 * @example
 *
 * '│ warning → message ~ suffix
 */
log.warn = (message: string, suffix?: string) => {

  console.warn(
    _.yellowBright(
      _.Prefix(
        'warnings',
        suffix ? `${message} ${_.Append(suffix)}` : `${message}`
      )
    )
  );

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
log.transform = (label: string | File, ...suffix: [ string?, string?, string? ]) => {

  if ($.mode.build || $.mode.bulk || $.mode.debug) return;

  console.info(
    _.whiteBright(
      _.Prefix(
        'transform',
        _.bold(label),
        ...suffix
      )
    )
  );

};

/**
 * Log Minified - `whiteBright`
 *
 * @example
 *
* '│ minified → CSS → 200kb ⥂ 120kb ~ saved 80kb'  // Passing kind
* '│ minified → 200kb ⥂ 120kb ~ saved 80kb'        // Omitting kind
*/
log.minified = (...p: LogMinifiedParams) => {

  if (
    $.mode.pack ||
    $.mode.bulk ||
    $.mode.build ||
    $.config.log.silent) return;

  const message = p.length === 1 ? (
    _.whiteBright(
      _.Prefix(
        'minified',
        _.bold(p[0])
      )
    )
  ) : p.length === 4 ? (
    _.whiteBright(
      _.Prefix(
        'minified',
        `${_.bold(p[0])} ${_.ARR} ${p[1]} ${_.ARL} ${p[2]} ${_.Append(`saved ${p[3]}`)}`
      )
    )
  ) : (
    _.whiteBright(
      _.Prefix(
        'minified',
        `${_.bold(p[0])} ${_.ARL} ${p[1]} ${_.CHV} saved ${p[2]} ${_.Append(timer.now())}`
      )
    )
  );

  console.info(message);

};

/**
 * Log Zipped `whiteBright`
 *
 * @example
 *
 * '│ zipped → ZIP 1.5mb ~ source/dir/file.ext'
 */
log.zipped = (size: string, path: string) => {

  console.info(
    _.whiteBright(
      _.Prefix(
        'zipped',
        `${_.bold('ZIP')} ${size} ${_.Append(path)}`
      )
    )
  );

};

/**
 * Log Skipped - `gray`
 *
 * @example
 *
 * '│ skipped → dir/file.ext ~ reason'
 */
log.skipped = (file: File | string, reason: string) => {

  if ($.mode.pack || $.mode.build || $.mode.bulk) return null;

  console.info(
    _.gray(
      _.Prefix(
        'skipped',
        `${isString(file) ? file : file.key} ${_.Append(reason)}`
      )
    )
  );

  return null;

};

/**
 * Log Ignored - `yellowBright`
 *
 * @example
 *
 * '│ ignored → dir/file.ext'
 */
log.ignored = (path: string) => {

  console.info(
    _.yellowBright(
      _.Prefix('ignored', path)
    )
  );

};

/**
 * Log Title
 *
 * @example
 *
 * '│'
 * '│ Title'
 * '│'
 */
log.header = (label: string, color: _.Ansis = _.whiteBright.bold) => {

  log(_.Header(color(label)));

};

/**
 * Log File Rename - `whiteBright`
 *
 * @example
 *
 * '│ rename → old-name.liquid ⥂ new-name.liquid'
 */
log.rename = (from: string, to: string) => {

  log.renamed.push(
    _.whiteBright(
      _.Prefix(
        'renamed',
        `${_.bold(from)} ${_.ARL} ${_.bold(to)}`
      )
    )
  );

};

/**
 * Log HOT Reload - `neonRouge`
 *
 * Pass an optional timer `id`
 *
 * @example
 *
 * '│ reloaded → HOT RELOAD ~ 500ms'
 */
log.hot = (id?: string) => {

  console.info(
    _.neonRouge(
      _.Prefix(
        'reloaded',
        `${_.bold('HOT RELOAD')} ${_.Append(timer.now(id))}`
      )
    )
  );

};

/**
 * Log Exported - `teal`
 *
 * @example
 *
 * '│ exported → script ⥂ snippet'
 */
log.exported = (from: string, to: string) => {

  if ($.mode.build) return;

  console.info(
    _.teal(
      _.Prefix(
        'exported',
        `${_.bold(from)} ${_.ARL} ${_.bold(to)}`
      )
    )
  );

};

/**
 * Log Retrying - `orange`
 *
 * @example
 *
 * '│ retrying → dir/file.ext → theme ~ store.myshopify.com'
 */
log.retrying = (file: string, theme: Theme) => {

  console.info(
    _.orange(
      _.Prefix(
        'retrying',
        file,
        theme.target,
        theme.store.domain
      )
    )
  );

};

/**
 * Log Reloaded - `whiteBright`
 *
 * @example
 *
 * '│ reloaded → dir/file.ext ~ 500ms'
 */
log.reloaded = (path: string, time: string) => {

  console.info(
    _.whiteBright(
      _.Prefix(
        'reloaded',
        `${path} ${_.Append(time)}`
      )
    )
  );

};

/**
 * Log Version Control `whiteBright`
 *
 * @example
 *
 * '│ warning → message ~ append text
 */
log.version = (vc: VC, type: string) => {

  console.info(
    _.whiteBright(
      _.Prefix(
        'version',
        `${_.bold(vc.number)} ${_.ARL} ${_.bold(vc.update.number)} ${_.Append(type)}`
      )
    )
  );

};

export { log };
