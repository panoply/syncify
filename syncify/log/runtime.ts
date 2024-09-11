import type { Theme } from 'types';
import type { Bundle } from 'syncify:state';
import { allFalse, anyTrue, isEmpty } from 'rambdax';
import { relative } from 'node:path';
import { log, keys, warn } from 'syncify:native';
import { glueString, plural, ws } from 'syncify:utils';
import { warnings } from 'syncify:log/throws';
import { ARR, COL, DSH, TLD } from '@syncify/ansi';
import { gray, bold, white, neonCyan, pink, yellowBright, lightGray, cyan } from '@syncify/ansi';
import { clear } from 'syncify:log';
import { Create, CreateClosure, Break } from 'syncify:cli/tree';
import { timer } from 'syncify:timer';

interface Runtime {
  /**
   * Begin Runtime Log Tree - This executes within define,
   * immediately after config files have been parsed.
   * Log Heading
   *
   * ```
   * ┌─ Syncify ~ 14:05:42
   * │
   * │    v1.0.0
   * │
   * │  TERMINAL WIDTH WARNING
   * │
   * │  Your terminal width is below 100 columns (currently 80)
   * │  This is not recommended for usage with Syncify (size matters).
   * │  Expand your terminal wider for an optimal logging experience.
   * │
   * │  --clean
   * │  --export
   * │  --build
   * │  --filter sections, snippets
   * ```
   */
  ($: Bundle): void;
  /**
   * Runtime Log Messages for mode execution
   *
   * ```
   * ┌─ Syncify ~ 14:05:42
   * │
   * │  Running:
   * │    --prod → clean → build
   * │
   * │  Filters:
   * │    section: src/sections
   * ```
   */
  modes($: Bundle): void;
  /**
   * Runtime Log Messages for mode execution
   *
   * ```
   * ┌─ Syncify ~ 14:05:42
   * │
   * │  Spawned 2 Processes:
   * │    esbuild:  PID → #12345
   * │    tailwind: PID → #12345
   * ```
   */
  spawns($: Bundle): void;
  /**
   * Runtime Log Messages for Theme links
   *
   * ```
   * │  Editor:
   * │    dev:  https://shop.myshopify.com/admin/themes/123456789/editor
   * │    prod: https://shop.myshopify.com/admin/themes/123456789/editor
   * │
   * │  Previews:
   * │    dev:  https://shop.myshopify.com?preview_theme_id=123456789
   * │    prod: https://shop.myshopify.com?preview_theme_id=123456789
   * ```
   */
  stores ($: Bundle): void;

  /**
   * Runtime Log Messages for Theme links
   *
   * ```
   * │  2 Warnings:
   * │
   * │    2 Terser rule warnings
   * │
   * │    Option is not allowed: minifyJS
   * │    Option is not allowed: minifyCSS
   * ```
   */
  warnings($: Bundle): void;
  /**
   * Start Time
   *
   * ```
   * │ Start Time: 600ms
   * ```
   */
  time(): void

}

export const runtime: Runtime = function ($: Bundle) {

  clear();

  if ($.log.config.silent) return;

  $.env.tree = true;

  const message = Create()
  .BR
  .Top('Syncify')
  .NL
  .Line(`v${$.version}`, bold.whiteBright);

  if ($.terminal.cols < 80) {

    message
    .Newline('red')
    .Error('TERMINAL WIDTH WARNING', bold)
    .Newline('red')
    .Error(`Your terminal width is below ${bold(`${100}`)} columns (currently ${bold(`${$.terminal.cols}`)})`)
    .Error('This is not recommended for usage with Syncify (size matters).')
    .Error('Expand your terminal wider for an optimal logging experience.');

  }

  log(message.toLine());

};

runtime.time = function () {

  log(
    Break(lightGray(`Started in ${timer.stop('runtime')}`))
  );

};

/* -------------------------------------------- */
/* RUNTIME MODES                                */
/* -------------------------------------------- */

runtime.modes = function ($: Bundle) {

  const message = Create();

  let seq: string = $.env.prod ? '--prod' : '--dev';

  if ($.mode.themes) {
    return log(
      message.Wrap(
        'Select theme target/s to be inserted into your package.json file.',
        'You will be given a code example after selecting where you will define',
        'a custom target name. If you would like to create a new theme, then run',
        `the ${cyan('publish')} resource`,
        gray
      ).toLine()
    );
  }

  if ($.mode.cache) {
    if (seq !== NIL) {
      seq += ` ${TLD} cache`;
    } else {
      seq += 'cache';
    }
  }

  if ($.mode.clean) {
    if (seq !== NIL) {
      seq += ` ${TLD} clean`;
    } else {
      seq += 'clean';
    }
  }

  if ($.spawn.invoked) {
    if (seq !== NIL) {
      seq += ` ${TLD} build`;
    } else {
      seq += 'build';
    }
  }

  if ($.mode.build) {
    if (seq !== NIL) {
      seq += ` ${TLD} build`;
    } else {
      seq += 'build';
    }
  }

  if ($.mode.export) {
    if (seq !== NIL) {
      seq += ` ${TLD} export`;
    } else {
      seq += 'export';
    }
  }

  if ($.mode.publish) {
    if (seq !== NIL) {
      seq += ` ${TLD} publish`;
    } else {
      seq += 'publish';
    }
  }

  if ($.mode.import) {
    if (seq !== NIL) {
      seq += ` ${TLD} import`;
    } else {
      seq += 'import';
    }
  }

  if ($.mode.watch) {
    if (seq !== NIL) {
      seq += ` ${TLD} watch`;
    } else {
      seq += 'watch';
    }

    if ($.mode.hot) {
      seq += ` ${TLD} hot`;
    }
  }

  if (seq !== NIL) {
    message.Line(seq, gray);
    seq = NIL;
  }

  if (!isEmpty($.filters)) {

    message
    .NL
    .Line(`Filters${COL}`, white.bold);

    const space = ws($.filters);

    for (const group in $.filters) {
      const join = white($.filters[group].map((k: string) => relative($.cwd, k)).join(', '));
      message.Line(` ${TLD} ${group}${COL}${space(group)}${join}`, neonCyan);
    }

  }

  log(message.toLine());

};

/* -------------------------------------------- */
/* RUNTIME SPAWNS                               */
/* -------------------------------------------- */

runtime.spawns = function ($: Bundle) {

  if ($.mode.build || $.mode.watch) {

    const message = Create().Line(`Spawned${COL}`, white.bold);
    const space = ws($.spawn.commands);

    for (const name in $.spawn.commands) {

      const sp = space(name);
      const pid = $.spawn.commands[name].pid;

      message.Line(` ${TLD} ${neonCyan(name)}${COL}${sp}PID ${ARR} #${pink(`${pid}`)}`, gray);

    }

    log(message.toLine());

  }

};

/**
 * Log Heading
 *
 * Prints a small overview of runing resource, all operations
 * initialize with the header.
 *
 * ```
 * │  Theme Editors:
 * │
 * │  dev:  https://shop.myshopify.com/admin/themes/123456789/editor
 * │  prod: https://shop.myshopify.com/admin/themes/123456789/editor
 * │
 * │  Theme Previews:
 * │
 * │  dev:  https://shop.myshopify.com?preview_theme_id=123456789
 * │  prod: https://shop.myshopify.com?preview_theme_id=123456789
 * │
 * │  Warnings:
 * │
 * │  2 Terser rule warnings
 * │
 * │  Option is not allowed: minifyJS
 * │  Option is not allowed: minifyCSS
 * │
 * │  Errors:
 * │
 * │  2 Path resolver errors
 * │
 * │  Option is not allowed: minifyJS
 * │  Option is not allowed: minifyCSS
 * │
 * │  HOT Reloading:
 * │
 * │  Assets:   http://localhost:8080
 * │  External: http://192.168.2.8:8080
 * │
 * │  HOT Reloading Failed:
 * │
 * │  8080 Server address already in use
 * │  3000 Server address already in use
 * │
 * │  Change the socket and server ports or kill the session occupying them.
 * │  This error typically occurs when multiple Syncify instances are active.
 * │
 * ```
 */
runtime.stores = function ($: Bundle) {

  const text = Create();
  const size = $.sync.themes.length;

  if (allFalse($.mode.upload, $.mode.import, $.mode.build, $.mode.clean)) {

    /* -------------------------------------------- */
    /* THEME EDITOR                                 */
    /* -------------------------------------------- */

    if (size > 0) {
      text.Line(`Editors${COL}`, bold.white);
      getThemeURLS(text, $.sync.themes, 'editor');
    }

  }

  if (anyTrue($.mode.upload, $.mode.import, $.mode.watch)) {

    /* -------------------------------------------- */
    /* THEME PREVIEWS                               */
    /* -------------------------------------------- */

    if (size > 0) {

      if ($.mode.upload || $.mode.import) {
        text.NL.Line(`Targets${COL}`, bold.white);
      } else {
        text.NL.Line(`Previews${COL}`, bold.white);
      }

      getThemeURLS(text, $.sync.themes, 'preview');

    }
  }

  log(text.toLine());

};

runtime.warnings = function getRuntimeWarnings ($: Bundle) {

  if (!$.log.config.warnings) return;

  const props = keys(warnings);
  const amount = props.reduce((n, k) => {
    n = n + warnings[k].length;
    return n;
  }, 0);

  if (amount === 0) return;

  const message = Create({ type: 'warning' }).Line(`${amount} ${plural('Warning', amount)}`, bold);

  for (const key of props) {

    const item = warnings[key];

    if (item.length > 0) {

      if (item.length === amount) {
        message
        .Newline()
        .Line(`${key} ${plural('Warning', item.length)}`, bold)
        .Newline();
      } else {
        message
        .Newline()
        .Line(`${item.length} ${key} ${plural('Warning', item.length)}`, bold);
      }

      for (const text of item) {
        message.Line(`${DSH} ${text}`, yellowBright);
      }
    }
  }

  warn(message.toString());

};

/**
 * Theme Previews
 *
 * Generates the theme previews/targets runtime list
 */
export function getThemeURLS (text: CreateClosure, themes: Theme[], url: 'preview' | 'editor') {

  const width = themes.reduce<{
    store: number;
    theme: number
  }>((size, { target, store }) => {

    const name = store.indexOf('.');

    if (name > size.store) size.store = name;
    if (target.length > size.theme) size.theme = target.length;

    return size;

  }, {
    store: 0,
    theme: 0
  });

  for (const { target, store, id } of themes) {

    const name = store.slice(0, store.indexOf('.'));
    const type = url === 'editor'
      ? `https://${store}/admin/themes/${id}/editor`
      : `https://${store}?preview_theme_id=${id}`;

    text.Line(
      glueString(
        WSP,
        TLD,
        pink(name),
        WSP.repeat(width.store - name.length),
        ARR,
        WSP,
        pink.bold(target),
        WSP.repeat(width.theme - target.length),
        ARR,
        WSP,
        gray.underline(type)
      )
    );

  }

}
