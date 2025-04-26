import { relative } from 'node:path';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';
import { timer } from '@syncify/timer';
import update from '@syncify/update';

import { warnings } from '~cli/warnings';
import { log } from '~log';
import { eqWS, isEmpty, keys, plur, toUpcase } from '~utils';

import { $ } from '$';

/**
 * Begin the runtime timer
 */
export function runtime () {

  if ($.config.log.silent || $.running) return;

  timer.start('runtime'); // Begin startup timer

};

/**
 * Startup logging will print `argv` and if terminal width is too small
 * we will report upon that with warning.
 *
 * **Standard**
 *
 * ```
 * ┌─ Syncify ~ v1.0.0
 * │
 * │  sy watch --hot
 * │
 * ```
 *
 * **When Terminal width is too small**
 *
 * ```
 * ┌─ Syncify ~ v1.0.0
 * │
 * │  sy watch --hot
 * │
 * │  TERMINAL WIDTH WARNING
 * │
 * │  Your terminal width is below 100 columns (currently 80)
 * │  This is not recommended for usage with Syncify (size matters).
 * │  Expand your terminal wider for an optimal logging experience.
 * │
 * ```
 */
runtime.startup = function () {

  if ($.running) {

    // TODO - When syncify.config file changes

    return null;

  } else {

    log.runtime
    .Break()
    .Top('Syncify')
    .Newline()
    .Template(_.white.dim(`v${$.version}`), { id: 'v' })
    .True($.terminal.cols < 80, function () {
      this.Header('TERMINAL WIDTH WARNING', _.bold.red)
      .Wrap(
        _.red,
        `Your terminal width is below ${_.bold(80)} columns (currently ${_.bold($.terminal.cols)})`,
        'This is not recommended for usage with Syncify (size matters).',
        'Expand your terminal width wider for an optimal console experience.'
      );
    })
    .Newline()
    .toWrite();

    update('@syncify/cli', $.version).then(version => {
      if (version !== false) {
        const latest = `${_.neonGreen(`${_.bold(version.registry)} (available)`)}`;
        log.runtime.Update('v', `${_.red.dim($.version)} ${_.ARL} ${latest}`);
      }
    });

  }
};

/**
 * Start Time
 *
 * ```
 * │ » Runtime ~ 600ms
 * ```
 */
runtime.time = () => {

  if ($.running) return;

  log.runtime
  .Prepend(`${_.NXT} Runtime ~ ${timer.stop('runtime')}`, _.gray.dim)
  .toWrite({ trim: true })
  .Reset();

};

/* -------------------------------------------- */
/* RUNTIME MODES                                */
/* -------------------------------------------- */

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
runtime.modes = function () {

  if ($.mode.link) {

    log.wrap(
      'Select theme target/s to be inserted into your package.json file.',
      'You will be given a code example after selecting where you will define',
      'a custom target name. If you would like to create a new theme, then run',
      `the ${_.cyan('publish')} resource`,
      _.gray
    );

  } else {

    if (!isEmpty($.filters)) {

      const tui = _.Create().Newline().Line(`Filters${_.COL}`, _.white.bold);

      const space = eqWS($.filters);

      for (const group in $.filters) {
        const join = _.white($.filters[group].map((k: string) => relative($.cwd, k)).join(', '));
        tui.Line(` ${_.TLD} ${group}${_.COL}${space(group)}${join}`, _.neonCyan);
      }

      tui
      .Newline()
      .toLog({ clear: true });

    }

  }

};

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
runtime.stores = function () {

  if (!$.mode.watch) return;

  for (const url of [ 'editor', 'preview' ]) {

    const width = $.target.reduce<{ store: number; theme: number }>((size, { target, store }) => {
      if (store.name.length > size.store) size.store = store.name.length;
      if (target.length > size.theme) size.theme = target.length;
      return size;
    }, {
      store: 0,
      theme: 0
    });

    log.runtime
    .Line(plur(toUpcase(url), $.target.length) + _.COL, _.bold.white)
    .Each($.target, function ({ target, store, editor, preview }) {
      this.Line(
        glue.ws(
          WSP,
          _.TLD,
          _.pink(store.name),
          _.WSP.repeat(width.store - store.name.length),
          _.ARR,
          _.pink.bold(target),
          _.WSP.repeat(width.theme - target.length),
          _.ARR,
          _.WSP,
          _.gray.underline(url === 'editor' ? editor : preview)
        )
      );
    }).True(url === 'editor', tui => tui.Newline());

  }

  log.runtime.NL.toWrite();

  if ($.mode.hot) {
    if ($.mode.align) {
      log.runtime.Spinner(`Remote ${_.ARL} Local Merges`, { color: _.gray });
    } else {
      log.runtime.Line('Reloads' + _.COL, _.bold).toWrite();
      log.runtime.Spinner('Preparing uWS Sockets', { color: _.gray, indent: 2 });
    }
  } else if ($.mode.align) {
    log.runtime.Spinner(`Remote ${_.ARL} Local Merges`, { color: _.gray });
  }

};

/**
 * Runtime Log Messages for Theme links
 *
 * ```
 * │  Reloads:
 * │   method  →  HOT
 * │   server  →  3000
 * │   socket  →  8089
 * ```
 */
runtime.hot = ({ isError = false } = {}) => {

  log.runtime.Stop();

  if (isError) {

    log
    .runtime
    .Line(`  ${_.BAD} ${_.redBright('server')}  ${_.ARR}  ${_.redBright('FAILED')}`)
    .Line(`  ${_.BAD} ${_.redBright('socket')}  ${_.ARR}  ${_.redBright('FAILED')}`);

  } else {

    log
    .runtime
    .True($.mode.align, tui => tui.Line('Reloads' + _.COL, _.bold))
    .Line(`  ${_.TLD} ${_.neonMagenta('method')}  ${_.ARR}  ${_.neonMagenta.bold(`${$.hot.method.toUpperCase()}`)}`)
    .Line(`  ${_.TLD} ${_.neonMagenta('server')}  ${_.ARR}  ${_.neonMagenta(`${$.hot.server}`)}`)
    .Line(`  ${_.TLD} ${_.neonMagenta('socket')}  ${_.ARR}  ${_.neonMagenta(`${$.hot.socket}`)}`);

  }

};

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
runtime.warnings = () => {

  if (!$.config.log.warnings) return;

  const props = keys(warnings);
  const amount = props.reduce((n, k) => n = n + warnings[k].length, 0);

  if (amount === 0) return;

  log
  .runtime
  .Tree('warning')
  .Line(`${amount} ${plur('Runtime Warning', amount)}`, _.bold);

  for (const key of props) {

    const item = warnings[key];

    if (item.length > 0) {

      const condition = item.length === amount;

      log
      .runtime
      .True(condition, tui => tui.Line(`${key} ${plur('Warning', item.length)}${_.COL}`, _.bold))
      .False(condition, tui => tui.Prepend(`${item.length} ${key} ${plur('Warning', item.length)}`, _.bold))
      .Each(item, function (message) {

        this.Line(`  𐄂 ${message}`, _.yellowBright);

      });

    }
  }

  log
  .runtime
  .Tree('info')
  .Newline()
  .toLog({ clear: true });

};
