import { Bundle } from 'types';
import { basename } from 'node:path';
import { allFalse, anyTrue } from 'rambdax';
import { getTime, toUpcase } from '../shared/utils';
import { keys, nil, values, nl, ws, from } from '../shared/native';
import { spawns } from '../cli/spawn';
import * as c from '../cli/ansi';
import { warnings } from '../options/validate';

/**
 * Log Heading
 *
 * Prints a small overview of runing resource, all operations
 * initialize with the header.
 *
 * ```
 * ┌─ Syncify v0.1.0.beta
 * │
 * │ Watch (production)
 * │
 * │ Syncing 2 stores and 2 themes
 * │ Spawned 2 child processes
 * │
 * │ Child Processes:
 * │
 * │ esbuild:  12345 (pid)
 * │ tailwind: 12345 (pid)
 * │
 * │ Theme Editor:
 * │
 * │ dev:  https://shop.myshopify.com/admin/themes/123456789/editor
 * │ prod: https://shop.myshopify.com/admin/themes/123456789/editor
 * │
 * │ Theme Previews:
 * │
 * │ dev:  https://shop.myshopify.com?preview_theme_id=123456789
 * │ prod: https://shop.myshopify.com?preview_theme_id=123456789
 * │
 * │ Live Reloading:
 * │
 * │ Assets:   http://localhost:8080
 * │ External: http://192.168.2.8:8080
 * │
 * │ Warnings:
 * │
 * │ 2 Terser rule warnings
 * │
 * │   Option is not allowed: minifyJS
 * │   Option is not allowed: minifyCSS
 * │
 * ```
 */
export function logHeader (bundle: Bundle) {

  const text: string[] = [];

  if (bundle.mode.metafields) return nil;

  text.push(
    `${c.open}${c.gray('Syncify')} ${c.gray('~')} ${c.gray(getTime())}`,
    `${c.line}`,
    `${c.line}${c.whiteBright.bold(`v${bundle.version}`)}`,
    `${c.line}`
  );

  /** Plural store/s length */
  const _st = bundle.sync.stores.length;

  /** Plural theme/s length */
  const _th = keys(bundle.sync.themes).length;

  /** Plural spawns/s length */
  const _ss = keys(bundle.spawn.commands).length;

  /* -------------------------------------------- */
  /* BEGIN                                        */
  /* -------------------------------------------- */

  const { mode } = bundle;

  /** Prints store, eg: `1 store` or `2 stores` */
  const stores = c.cyan.bold(String(_st)) + (_st > 1 ? ' stores' : ' store');

  /** Prints theme, eg: `1 theme` or `2 themes` */
  const themes = c.cyan.bold(String(_th)) + (_th > 1 ? ' themes' : ' theme');

  /** Prints Environment, eg: `(development)` or `(production)` */
  const env = c.cyan.bold(`${bundle.dev ? 'development' : 'production'}`);

  if (mode.build) {
    text.push(`${c.line}Running ${c.cyan.bold('build')} in ${env}`);
  } else if (mode.watch) {
    text.push(`${c.line}Running ${c.cyan.bold('watch')} in ${env}`);
  } else if (mode.upload) {
    text.push(`${c.line}Running ${c.cyan.bold('upload')} mode`);
  } else if (mode.download) {
    text.push(`${c.line}Running ${c.cyan.bold('download')} mode`);
  } else if (mode.vsc) {
    text.push(`${c.line}Generate ${c.cyan.bold('vscode')} schema`);
  } else if (mode.clean) {
    text.push(`${c.line}Running ${c.cyan.bold('clean')} mode`);
  } else if (mode.export) {
    text.push(`${c.line}Running ${c.cyan.bold('export')} mode`);
  }

  text.push(`${c.line}${(_st > 0 && _th > 0 ? `Syncing ${themes} to ${stores}` : nil)}`);

  if (anyTrue(mode.build, mode.watch) && _ss > 0) {
    text.push(`Spawned ${c.cyan.bold(`${_ss}`)} child ${_ss > 1 ? 'processes' : 'process'}${nl}`);
  } else {
    text.push(c.line);
  }

  if (allFalse(
    mode.upload,
    mode.download,
    mode.build,
    mode.clean,
    mode.vsc
  )) {

    /* -------------------------------------------- */
    /* CHILD PROCESSES                              */
    /* -------------------------------------------- */

    if (_ss > 0) {

      const spwns = from(spawns);
      const width = spwns.reduce((size, [ name ]) => (name.length > size ? name.length : size), 0);
      const pids = spwns.map(([ name, child ]) => (
        c.line +
        ws.repeat(width - name.length) +
        c.whiteBright(toUpcase(name)) + c.gray(':') + ws +
        c.gray('PID') + ' → ' + c.gray('#') +
        c.pink(`${child.pid}`)
      ));

      text.push(`${c.line}${c.bold('Processes:')}${c.newline}${pids.join(nl)}${_th > 0 ? nl : nil}`);

    }

    /* -------------------------------------------- */
    /* THEME EDITOR                                 */
    /* -------------------------------------------- */

    if (_th > 0) {

      const themes = values(bundle.sync.themes);
      const width = themes.reduce((size, { target }) => (target.length > size ? target.length : size), 0);
      const urls = themes.map(({ id, store, target }) => (
        ws.repeat(width - target.length) + c.newline + c.line +
        c.pink(`${store.slice(0, store.indexOf('.'))} → `) +
        c.pink.bold(target) + c.pink(' → ') +
        c.gray.underline(`https://${store}/admin/themes/${id}/editor`)
      ));

      text.push(`${c.line}${c.bold('Theme Editors:')}${urls.join(nl)}${nl}${c.line}`);
    }

    /* -------------------------------------------- */
    /* THEME PREVIEWS                               */
    /* -------------------------------------------- */

    if (_th > 0) {

      const themes = values(bundle.sync.themes);
      const width = themes.reduce((size, { target }) => (target.length > size ? target.length : size), 0);
      const urls = themes.map(({ id, store, target }) => (
        ws.repeat(width - target.length) + c.newline + c.line +
        c.pink(`${store.slice(0, store.indexOf('.'))} → `) +
        c.pink.bold(target) + c.pink(' → ') +
        c.gray.underline('https://' + store + '?preview_theme_id=' + id)
      ));

      text.push(`${c.line}${c.bold('Theme Previews:')}${urls.join(nl)}${nl}${c.line}`);
    }

  }

  /* -------------------------------------------- */
  /* CONFIG WARNINGS                              */
  /* -------------------------------------------- */

  let hasWarning: boolean = false;

  const cf = basename(bundle.file);

  for (const prop in warnings) {

    const warn = warnings[prop];

    if (warn.length > 0) {

      if (!hasWarning) {
        text.push(`${c.line}${c.yellowBright(`${c.bold('Warnings')} in ${c.bold(cf)}`)}:${nl}${c.line}`);
        hasWarning = true;
      }

      const title = c.yellowBright(`${c.bold(`${warn.length}`)} ${prop} ${warn.length > 1 ? 'warnings' : 'warning'}`);
      text.push(`${c.line}${title}${c.newline}${warn.join(nl)}${nl}${c.line}`);
    }
  }

  return text.join(`${nl}`);

};
