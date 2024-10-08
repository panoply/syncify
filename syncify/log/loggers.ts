import type { File, Store, Theme, VC } from 'types';
import type { MinifiedParams } from 'types/internal';
import { cursorTo, clearScreenDown } from 'node:readline';
import { inspect } from 'node:util';
import { stdout, stderr } from 'node:process';
import notifier from 'node-notifier';
import { intercept } from 'syncify:cli/intercept';
import { queue } from 'syncify:requests/queue';
import { Tree, ARL, ARR, CHV, TLD } from '@syncify/ansi';
import { Multiline } from 'syncify:interpolate';
import { timer } from 'syncify:timer';
import { Spinner } from 'syncify:cli/spinner';
import * as errors from 'syncify:log/errors';
import * as x from 'syncify:cli/tree';
import * as c from '@syncify/ansi';
import * as u from 'syncify:utils';
import * as n from 'syncify:native';
import { $ } from 'syncify:state';


/* -------------------------------------------- */
/* REXPORT                                      */
/* -------------------------------------------- */

export { log as out } from 'syncify:native';
export { default as update } from 'log-update';
export { runtime } from 'syncify:log/runtime';
export { progress } from '@syncify/ansi';

/* -------------------------------------------- */
/* INTERNAL                                     */
/* -------------------------------------------- */

/**
 * **INTERNAL - DEVELOPMENT ONLY**
 *
 * Console Log with inspect
 */
export const console = (...message: any) => {

  n.log(
    inspect(
      message,
      {
        colors: true,
        showHidden: true
      }
    )
  );

};

/* -------------------------------------------- */
/* LOGGERS                                      */
/* -------------------------------------------- */

/**
 * Render Spinner
 *
 * Loads the spinner. Optionally pass in text to append.
 *
 * **Passing no parametes**
 *
 * ```
 * │ ⠋
 * ```
 *
 * **Passing text parameter**
 *
 * ```
 * │ ⠋ Lorem Ipsum
 * ```
 *
 * ---
 *
 * @param text
 * The text to append on the right side of the spinner
 *
 * @param options
 * Spinner options
 *
 */
export const spinner = Spinner();

/**
 * Renamed log bucket, which will execute after changed.
 */
export const renamed: [ string? ] = [];

/**
 * Log Horizonal Line
 *
 * Prints a horizontal line separator which will default to spanning the wrap of the terminal pane.
 *
 * @example
 * │
 * ├────────────────────────────────────────────────
 * │
 */
export const hline = (options: { width?: number, newlines?: boolean } = {}) => {

  if (u.isEmpty(options)) {
    options.width = $.terminal.wrap;
    options.newlines = false;
  } else {
    n.assign({
      width: $.terminal.wrap,
      newlines: false
    }, options);
  }

  n.log(
    x.Ruler(
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
export const write = (message: string, {
  color,
  type = null,
  prefix = null,
  suffix = null
}: {
  /**
   * The color of the message
   *
   * @default whiteBright
   */
  color?: c.Ansis;
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
      n.error(
        u.glueString(
          x.LineRed(color ? color(message) : c.redBright(message)),
          x.Append(suffix)
        )
      );
    } else {
      n.error(
        x.LineRed(
          (color || c.redBright)(
            x.Prefix(
              prefix
              , u.glueString(
                message,
                x.Append(suffix)
              )
            )
          )
        )
      );
    }
  } else if (type === 'warning') {
    if (prefix === null) {
      n.log(
        x.LineYellow(
          u.glueString(
            color ? color(message) : c.yellowBright(message),
            x.Append(suffix)
          )
        )
      );
    } else {
      n.log(
        x.LineYellow(
          (color || c.yellowBright)(
            x.Prefix(
              prefix
              , u.glueString(
                message,
                x.Append(suffix)
              )
            )
          )
        )
      );
    }
  } else {
    if (prefix === null) {
      n.log(
        x.Line(
          u.glueString(
            color ? color(message) : c.whiteBright(message),
            x.Append(suffix)
          )
        )
      );
    } else {
      n.log(
        x.Line(
          (color || c.whiteBright)(
            x.Prefix(
              prefix
              , u.glueString(
                message,
                x.Append(suffix)
              )
            )
          )
        )
      );
    }
  }

};

export const message = (message: string) => {

  n.log(x.Line(message));

};

/**
 * TUI Newline
 *
 * Inserts a newline _trunk_ character. Optionally pass
 * an empty string (ie: `''`) to insert a newline without
 * without line character
 *
 * `│`
 */
export const nwl = (entry?: string | 'red' | 'yellow' | undefined) => {

  if (entry === NIL) {
    n.log(NWL);
  } else if (entry === 'red') {
    n.log(Tree.red);
  } else if (entry === 'yellow') {
    n.log(Tree.yellow);
  } else {
    n.log(Tree.line);
  }

};

/**
 * Unhook
 *
 * Removes log listener and prints intercepted messages.
 * Captured logs can be printed based on `stdin` input.
 */
export const unhook = () => {

  $.log.listen();
  $.log.listen = null;

};

/**
 * Hook
 *
 * Listens on `stdout` and Intercepts logs messages.
 * Maintains a reference of warning/stdout invoked by different processes.
 */
export const hook = (name: string) => {

  const warning = $.warnings.has(name)
    ? $.warnings.get(name)
    : $.warnings.set(name, new Map()).get(name);

  $.log.listen = intercept((stream, data) => {

    if (data.charCodeAt(0) === 9474) {

      stream === 'stderr'
        ? stderr.write(data)
        : stdout.write(data);

    } else {

      const text = data.split(NWL);

      while (text.length !== 0) {

        warning.get(name).add(
          c.yellowBright(
            text
            .shift()
            .trimStart()
          )
        );
      }
    }

  });

};

/* -------------------------------------------- */
/* CLEAR                                        */
/* -------------------------------------------- */

/**
 * TUI Clear
 *
 * Clears the console messages. Optionally pass a `boolean` value of `true`
 * to override the syncify `log.config` option.
 */
export const clear = (force = false) => {

  if (force === false && $.log.config.clear === false) return;

  const count = stdout.rows - 2;

  n.log(count > 0 ? NWL.repeat(count) : NIL);

  cursorTo(stdout, 0, 0);

  clearScreenDown(stdout);

};

/* -------------------------------------------- */
/* GROUP                                        */
/* -------------------------------------------- */

/**
 * New Group
 *
 * Changes the log group
 *
 * @example
 * │
 * └─ Name ~ 01:59:20
 */
export const group = (name?: string | boolean) => {

  if ($.log.config.silent || $.env.tree === false) return;

  n.log(x.End($.log.group)); // Close previous group

  if ($.log.config.clear && name !== false) clear();

  if (u.isString(name)) {
    $.log.group = name;
    n.log(NWL + x.Top($.log.group)); // Open new group
  }

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
export const task = (name?: string) => {

  if ($.log.config.silent || $.env.tree === false) return;

  if (u.isString(name)) {

    n.log(x.Dash(c.gray(name) + WSP + x.Append(u.getTime()))); // Open new group

  } else {

    clear();

    n.log(
      Tree.line + NWL + x.Dash(
        u.glueString(
          c.gray($.log.group),
          x.Append(u.getTime())
        )
      )
    );

  }

};

/* -------------------------------------------- */
/* PROCESS                                      */
/* -------------------------------------------- */

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
 *
 */
export const process = (label: string, ...message: [ string, string? ]) => {

  if ($.mode.export || $.mode.build || $.log.config.silent) return;

  if (message.length === 2) {

    n.log(
      x.Line(
        c.whiteBright(
          x.Prefix(
            'process',
            u.glueString(
              c.bold(label)
              , CHV
              , message[0]
              , x.Append(message[1])
            )
          )
        )
      )
    );

  } else {

    n.log(
      x.Line(
        c.whiteBright(
          x.Prefix(
            'process'
            , u.glueString(
              c.bold(label)
              , x.Append(message[0])
            )
          )
        )
      )
    );
  }

};

/**
 * Log Changed - `neonCyan`
 *
 * @example '│ changed → source/dir/file.ext'
 */
export const changed = (file: File) => {

  if ($.log.config.silent === true || $.mode.watch === false) return;

  timer.start();

  // Provides us better group context, for example:
  //
  // Liquid Snippet
  // Liquid Template
  //
  const name = u.glueString(file.kind, CHV, u.toUpcase(file.namespace));
  const change = u.has(file.relative, $.log.changes) ? $.log.changes[file.relative] + 1 : 1;

  // Increment Change Count
  $.log.changes[file.relative] = change;

  // close previous group
  if ($.log.group !== name) {

    nwl();
    group(name); // $.log.group is updated

    if ($.log.title !== file.namespace) $.log.title = file.namespace;

  } else if ($.log.config.clear) {

    nwl();
    group(name);

  }

  // Update the current records
  if ($.log.uri !== file.relative) {
    $.log.uri = file.input;
  }

  n.log(
    x.NextLine(
      c.neonCyan(
        x.Prefix('changed', u.glueString(
          file.relative,
          x.Append(`${change} change${change > 1 ? 's' : NIL}`)
        ))
      )
    )
  );

  if (renamed.length > 0) n.log(renamed.shift());

};

/**
 * Log Minified - `whiteBright`
 *
 * @example
 *
 * '│ minified → CSS → 200kb ⥂ 120kb ~ saved 80kb'  // Passing kind
 * '│ minified → 200kb ⥂ 120kb ~ saved 80kb'        // Omitting kind
 */
export const minified = (...p: MinifiedParams) => {

  if ($.mode.export || $.mode.build || $.log.config.silent) return;

  if (p.length === 1) {

    n.log(
      x.Line(
        c.whiteBright(
          x.Prefix('minified', c.bold(p[0]))
        )
      )
    );

  } else if (p.length === 4) {

    n.log(
      x.Line(
        c.whiteBright(
          x.Prefix(
            'minified',
            u.glueString(
              c.bold(p[0])
              , ARR
              , p[1]
              , ARL
              , p[2]
              , TLD
              , 'saved'
              , p[3]
            )
          )
        )
      )
    );

  } else {

    n.log(
      x.Line(
        c.whiteBright(
          x.Prefix(
            'minified'
            , u.glueString(
              c.bold(p[0])
              , ARL
              , p[1]
              , TLD
              , 'saved'
              , p[2]
              , x.Append(
                timer.now()
              )
            )
          )
        )
      )
    );
  }

};

/**
 * Log Syncing - `magentaBright`
 *
 * @example
 *
 * '│ syncing → dir/file.ext'
 */
export const syncing = (path: string, { hot = false } = {}) => {

  if ($.mode.export || $.mode.build || $.log.config.silent) return;

  if ($.warnings.has(path)) {
    n.log(
      x.LineYellow(
        c.yellowBright(
          x.Prefix(
            'warning',
            u.glueString(
              u.sanitize($.warnings.get(path).size),
              u.plural('warning', $.warnings[path].size),
              x.Suffix.warning
            )
          )
        )
      )
    );
  }

  n.log(
    x.Line(
      c.magentaBright(
        x.Prefix('syncing', path)
      )
    )
  );

  if (queue.pending > (hot ? 0 : 2)) {

    n.log(
      x.Line(
        c.orange(
          x.Prefix('queued', u.glueString(path, TLD, c.bold(u.addSuffix(queue.pending)), 'in queue'))
        )
      )
    );
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
export const prompt = (message: string, notify?: notifier.Notification) => {

  // close previous group

  n.log(
    x.Line(
      c.orange(
        x.Prefix('prompt', message)
      )
    ),
    x.End($.log.group)
  );

  if (u.isObject(notify)) notifier.notify(notify).notify();

  return () => n.log(x.Top($.log.group));

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
export const resource = (type: string, store: Store) => {

  if ($.mode.watch) {

    $.log.queue.add(
      [
        type,
        store.domain,
        timer.stop()
      ]
    );

    if ($.log.idle) return;
    else $.log.idle = true;

    queue.onIdle().then(() => {

      for (const [ type, store, ctime ] of $.log.queue) {

        n.log(
          x.Line(
            c.neonGreen(
              x.Prefix(
                'uploaded',
                u.glueString(
                  c.bold(type)
                  , ARR
                  , store
                  , x.Append(ctime)
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

    n.log(
      x.Line(
        c.neonGreen(
          x.Prefix(
            'uploaded',
            u.glueString(
              c.bold(type),
              ARR,
              store.domain,
              x.Append(timer.stop())
            )
          )
        )
      )
    );

  }

};

/**
 * Log Uploaded - `neonGreen`
 *
 * @example
 *
 * '│ uploaded → theme → store.myshopify.com ~ 500ms'
 */
export const upload = (theme: Theme) => {

  if ($.log.config.silent) return;

  if ($.mode.watch) {

    $.log.queue.add([ theme.target, theme.store, timer.stop() ]);

    if ($.log.idle) return;
    else $.log.idle = true;

    queue.onIdle().then(() => {

      for (const [
        target,
        store,
        ctime
      ] of $.log.queue) {

        n.log(
          x.Line(
            c.neonGreen(
              x.Prefix('uploaded', c.bold(target), store, ctime)
            )
          )
        );

      }

      $.log.queue.clear();
      $.log.idle = false;

    });

  } else {

    n.log(
      x.Line(
        c.neonGreen(
          x.Prefix('uploaded', c.bold(theme.target), theme.store, timer.stop())
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
export const invalid = (path: string, message?: string | string[]) => {

  n.log(
    x.LineRed(
      c.red(
        x.Prefix('invalid', path)
      )
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
    n.error(
      Multiline(
        message
        , {
          type: 'error',
          color: c.red.bold
        }
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
 * error → dir/file.ext
 * error → dir/file.ext ~ suffix
*/
export const error = (input: string, { suffix = null, notify = null }: {
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
  notify?: notifier.Notification
} = {}) => {

  n.error(
    x.LineRed(
      c.red(
        x.Prefix('error', suffix ? input + WSP + x.Append(suffix) : input)
      )
    )
  );

  if (notify !== null) {
    notifier.notify(notify).notify();
  }
};

/**
 * Spawn Logging
 *
 * This function is responsible for spawned logs and also
 * informs about invoked spawned processes, which is not ideal
 * but suffices (for now).
 */
export const spawn = (name: string) => {

  return function (...input: string[]) {

    if (!$.spawn.invoked) $.spawn.invoked = true;

    if ($.log.group !== 'Spawn') {

      n.log(x.End($.log.group));

      // do not clear if first run
      if ($.log.group !== 'Syncify') clear();

      n.log(x.Top('Spawn'));

      // update name reference
      $.log.group = 'Spawn';

    }

    if ($.log.title !== name) {

      n.log(x.Next(c.neonCyan(name)));

      // update spawn process title
      $.log.title = name;

    }

    errors.spawn.call(this, input.toString());

  };

};

/**
 * Log Warning `yellowBright`
 *
 * @example '│ warning → message ~ suffix
 */
export const warn = (message: string, suffix?: string) => {

  if (suffix) {
    n.log(
      x.LineYellow(
        c.yellowBright(
          x.Prefix('warning', message) + x.Append(suffix)
        )
      )
    );
  } else {
    n.log(
      x.LineYellow(
        c.yellowBright(
          x.Prefix('warning', message)
        )
      )
    );
  }
};

/**
 * Log Retrying - `orange`
 *
 * @example '│ retrying → dir/file.ext → theme ~ store.myshopify.com'
 */
export const retrying = (file: string, theme: Theme) => {

  n.log(
    x.Line(
      c.orange(
        x.Prefix('retrying', file, theme.target, theme.store)
      )
    )
  );

};

/**
 * Log Deleted - `blueBright`
 *
 * @example
 *
 * '│ deleted → dir/filename.ext → theme ~ store.myshopify.com'
 */
export const deleted = (file: string, theme: Theme) => {

  n.log(
    x.Line(
      c.blueBright(
        x.Prefix('deleted', file, theme.target, theme.store)
      )
    )
  );
};

/**
 * Log Deleted - `blueBright`
 *
 * @example
 *
* '│ deleted → dir/filename.ext → theme ~ store.myshopify.com'
*/
export const browser = (url: string) => {

  n.log(
    x.Dash(
      c.lightGray(url)
    )
  );

};

/* -------------------------------------------- */
/* TRANSFORM                                    */
/* -------------------------------------------- */

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
 * ```bash
 * # result is omitted
 * │ transform → message
 *
 * # result is passed
 * │ transform → message → result
 *
 * # result and suffix is passed
 * │ transform → message → result ~ suffix
 * ```
 */
export const transform = (label: string, ...suffix: [ string?, string?, string? ]) => {

  if ($.mode.build) return;

  if (suffix.length > 0) {

    n.log(
      x.Line(
        c.whiteBright(
          x.Prefix(
            'transform'
            , u.glueString(
              c.bold(label)
              , ARR
              , suffix[0]
              , suffix.length === 2 ? u.glueString(
                ARR,
                suffix[1]
              ) : suffix.length === 3 ? u.glueString(
                ARR,
                suffix[1],
                x.Append(suffix[2])
              ) : NIL
            )
          )
        )
      )
    );

  } else {

    n.log(
      x.Line(
        c.whiteBright(
          x.Prefix(
            'transform'
            , c.bold(label)
          )
        )
      )
    );

  }
};

/* -------------------------------------------- */
/* ZIPPED                                       */
/* -------------------------------------------- */

/**
 * Log Zipped `whiteBright`
 *
 * @example
 *
 * '│ zipped → ZIP 1.5mb ~ source/dir/file.ext'
 */
export const zipped = (size: string, path: string) => {

  n.log(
    x.Line(
      c.whiteBright(
        x.Prefix(
          'zipped'
          , u.glueString(
            c.bold('ZIP')
            , size
            , x.Append(path)
          )
        )
      )
    )
  );

};

/**
 * Log Skipped - `gray`
 *
 * @example
 *
 * '│ skipped → dir/file.ext'
 */
export const skipped = (file: File | string, reason: string) => {

  if ($.mode.export || $.mode.build) return;

  n.log(
    x.Line(
      x.Prefix(
        'skipped'
        , u.glueString(
          u.isString(file)
            ? file
            : file.key
          , x.Append(reason)
        )
      )
    )
  );

};

/**
 * Log Ignored - `yellowBright`
 *
 * @example
 *
 * '│ ignored → dir/file.ext'
 */
export const ignored = (path: string) => {

  n.log(
    x.Line(
      c.yellowBright(
        x.Prefix(
          'ignored'
          , path
        )
      )
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
export const title = (label: string) => {

  n.log(
    x.Break(
      c.whiteBright.bold(label)
    )
  );

};

/**
 * Log File Rename - `whiteBright`
 *
 * @example
 *
* '│ rename → old-name.liquid ⥂ new-name.liquid'
*/
export const rename = (from: string, to: string) => {

  renamed.push(
    x.Line(
      c.whiteBright(
        x.Prefix(
          'renamed',
          u.glueString(
            c.bold(from)
            , ARL
            , c.bold(to)
          )
        )
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
export const hot = (id?: string) => {

  n.log(
    x.Line(
      c.neonRouge(
        x.Prefix(
          'reloaded'
          , u.glueString(
            c.bold('HOT RELOAD')
            , x.Append(timer.now(id))
          )
        )
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
export const exported = (from: string, to: string) => {

  if ($.mode.build) return;

  n.log(
    x.Line(
      c.teal(
        x.Prefix(
          'exported',
          u.glueString(
            c.bold(from)
            , ARR
            , c.bold(to)
          )
        )
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
export const reloaded = (path: string, time: string) => {

  n.log(
    x.Line(
      c.whiteBright(
        x.Prefix(
          'reloaded',
          u.glueString(
            path
            , x.Append(time)
          )
        )
      )
    )
  );

};

/**
 * Log Version Control `whiteBright`
 *
 * @example '│ warning → message ~ append text
 */
export const version = (vc: VC, type: string) => {

  n.log(
    x.Line(
      c.whiteBright(
        x.Prefix(
          'version'
          , u.glueString(
            vc.number
            , ARL
            , vc.update.number
            , x.Append(type)
          )
        )
      )
    )
  );

};
