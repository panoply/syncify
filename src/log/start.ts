import type { Bundle } from 'types';
import { basename } from 'node:path';
import { allFalse, anyTrue } from 'rambdax';
import { getTime, plural, toUpcase } from '../utils/utils';
import { keys, nil, values, nl, ws, wsr, log, toArray } from '../utils/native';
import { warnings, severities } from './validate';
import { spawns } from '../cli/spawn';
import * as c from '../cli/ansi';

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
 * │ Warnings:
 * │
 * │ 2 Terser rule warnings
 * │
 * │ Option is not allowed: minifyJS
 * │ Option is not allowed: minifyCSS
 * │
 * │ Errors:
 * │
 * │ 2 Path resolver errors
 * │
 * │ Option is not allowed: minifyJS
 * │ Option is not allowed: minifyCSS
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
 * ```
 */
export function start (bundle: Bundle) {

  const text: string[] = [];

  if (bundle.mode.metafields) return nil;

  text.push(
    `${c.open}${c.gray('Syncify')} ${c.gray('~')} ${c.gray(getTime())}`,
    `${c.line.gray}`,
    `${c.line.gray}${c.whiteBright.bold(`v${bundle.version}`)}`,
    `${c.line.gray}`
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
    text.push(`${c.line.gray}Running ${c.cyan.bold('build')} in ${env}`);
  } else if (mode.watch) {
    text.push(`${c.line.gray}Running ${c.cyan.bold('watch')} in ${env}`);
  } else if (mode.upload) {
    text.push(`${c.line.gray}Running ${c.cyan.bold('upload')} mode`);
  } else if (mode.download) {
    text.push(`${c.line.gray}Running ${c.cyan.bold('download')} mode`);
  } else if (mode.vsc) {
    text.push(`${c.line.gray}Generate ${c.cyan.bold('vscode')} schema`);
  } else if (mode.clean) {
    text.push(`${c.line.gray}Running ${c.cyan.bold('clean')} mode`);
  } else if (mode.export) {
    text.push(`${c.line.gray}Running ${c.cyan.bold('export')} mode`);
  }

  text.push(`${c.line.gray}${(_st > 0 && _th > 0 ? `Syncing ${themes} to ${stores}` : nil)}`);

  /* -------------------------------------------- */
  /* CONFIG WARNINGS                              */
  /* -------------------------------------------- */

  let hasSeverity: boolean = false;
  let hasWarning: boolean = false;

  const cf = basename(bundle.file);

  for (const prop in severities) {

    const issue = severities[prop];

    if (issue.length > 0) {

      if (!hasSeverity) {
        hasSeverity = true;
        text.push(
          c.line.gray +
            nl + c.line.red +
            c.redBright(`${c.bold('Errors')} in ${c.bold(cf)}`) +
            c.colon
        );
      }

      const title = c.red.bold(`${issue.length} ${prop} ${plural('error', issue.length)}`);

      text.push(
        c.line.red + nl + c.line.red +
          title +
          nl + c.line.red + nl +
          issue.join(nl)
      );
    }
  }

  for (const prop in warnings) {

    const warn = warnings[prop];

    if (warn.length > 0) {

      if (!hasWarning) {
        hasWarning = true;
        text.push(
          c.line.gray +
            nl + c.line.yellow +
            c.yellowBright(`${c.bold('Warnings')} in ${c.bold(cf)}`) +
            c.colon
        );
      }

      const title = c.yellow.bold(`${warn.length} ${prop} ${plural('warning', warn.length)}`);

      text.push(
        c.line.yellow + nl + c.line.yellow +
          title +
          nl + c.line.yellow + nl +
          warn.join(nl)
      );
    }
  }

  if (anyTrue(mode.build, mode.watch) && _ss > 0) {
    text.push(`Spawned ${c.cyan.bold(`${_ss}`)} child ${_ss > 1 ? 'processes' : 'process'}${nl}`);
  } else {
    text.push(c.line.gray);
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

      const spwns = toArray(spawns);
      const width = spwns.reduce((size, [ name ]) => (name.length > size ? name.length : size), 0);
      const pids = spwns.map(([ name, child ]) => (
        c.line.gray +
        ws.repeat(width - name.length) +
        c.whiteBright(toUpcase(name)) + c.gray(':') + ws +
        c.gray('PID') + ' → ' + c.gray('#') +
        c.pink(`${child.pid}`)
      ));

      text.push(`${c.line.gray}${c.bold('Processes:')}${c.newline}${pids.join(nl)}${_th > 0 ? nl : nil}`);

    }

    /* -------------------------------------------- */
    /* THEME EDITOR                                 */
    /* -------------------------------------------- */

    if (_th > 0) {

      const themes = values(bundle.sync.themes);
      const width = themes.reduce((size, { target }) => (target.length > size ? target.length : size), 0);
      const urls = themes.map(({ id, store, target }) => (
        wsr(width - target.length) + c.newline + c.line.gray +
        c.pink(`${store.slice(0, store.indexOf('.'))} → `) +
        c.pink.bold(target) + c.pink(' → ') +
        c.gray.underline(`https://${store}/admin/themes/${id}/editor`)
      ));

      text.push(`${c.line.gray}${c.bold('Theme Editors:')}${urls.join(nl)}${nl}${c.line.gray}`);
    }

    /* -------------------------------------------- */
    /* THEME PREVIEWS                               */
    /* -------------------------------------------- */

    if (_th > 0) {

      const themes = values(bundle.sync.themes);
      const width = themes.reduce((size, { target }) => (target.length > size ? target.length : size), 0);
      const urls = themes.map(({ id, store, target }) => (
        wsr(width - target.length) + c.newline + c.line.gray +
        c.pink(`${store.slice(0, store.indexOf('.'))} → `) +
        c.pink.bold(target) + c.pink(' → ') +
        c.gray.underline('https://' + store + '?preview_theme_id=' + id)
      ));

      text.push(`${c.line.gray}${c.bold('Theme Previews:')}${urls.join(nl)}${nl}${c.line.gray}`);
    }

  }

  log(text.join(nl));

};
