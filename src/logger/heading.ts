import { Bundle } from 'types';
import { allFalse, anyTrue } from 'rambdax';
import { getTime, toUpcase } from '../shared/utils';
import { log, keys, nil, values, nl, ws, from } from '../shared/native';
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
 * │ Theme Previews:
 * │
 * │ Dev:  https://shop.myshopify.com?preview_theme_id=123456789
 * │ Prod: https://shop.myshopify.com?preview_theme_id=123456789
 * │
 * │ Asset Reloading:
 * │
 * │ Local:    http://localhost:8080
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
export const logHeader = (bundle: Bundle) => {

  /**
   * The generated log message
   */
  let message = nil;

  if (bundle.mode.metafields) return message;

  message += `${c.open}${c.pink.bold('SYNCIFY')} ${c.gray('~')} ${c.gray(getTime())}`;
  message += `${c.newline}${c.line}${c.whiteBright.bold(`v${bundle.version}`)}${c.newline}`;

  /**
   * Plural Store/s
   */
  const SL = bundle.sync.stores.length;

  /**
   * Plural Theme/s
   */
  const TL = keys(bundle.sync.themes).length;

  /**
   * Plural Spawns/s
   */
  const PL = keys(bundle.spawn.commands).length;

  /* -------------------------------------------- */
  /* BEGIN                                        */
  /* -------------------------------------------- */

  const { mode } = bundle;

  /**
   * Prints store, eg: `1 store` or `2 stores`
   */
  const stores = c.cyan.bold(String(SL)) + (SL > 1 ? ' stores' : ' store');

  /**
   * Prints theme, eg: `1 theme` or `2 themes`
   */
  const themes = c.cyan.bold(String(TL)) + (TL > 1 ? ' themes' : ' theme');

  /**
   * Prints Environment, eg: `(development)` or `(production)`
   */
  const env = c.cyan.bold(`${bundle.dev ? 'development' : 'production'}`);

  if (mode.build) {
    message += `${c.line}Running ${c.cyan.bold('build')} in ${env}`;
  } else if (mode.watch) {
    message += `${c.line}Running ${c.cyan.bold('watch')} in ${env}`;
  } else if (mode.upload) {
    message += `${c.line}Running ${c.cyan.bold('upload')} mode`;
  } else if (mode.download) {
    message += `${c.line}Running ${c.cyan.bold('download')} mode`;
  } else if (mode.vsc) {
    message += `${c.line}Generate ${c.cyan.bold('vscode')} schemas`;
  } else if (mode.clean) {
    message += `${c.line}Running ${c.cyan.bold('clean')} mode`;
  } else if (mode.export) {
    message += `${c.line}Running ${c.cyan.bold('export')} mode`;
  }

  message += `${nl}${(SL > 0 && TL > 0 ? c.line + `Syncing ${themes} to ${stores}${nl}` : nil)}`;

  if (anyTrue(mode.build, mode.watch) && PL > 0) {
    message += `${c.line}Spawned ${c.cyan.bold(`${PL}`)} child ${PL > 1 ? 'processes' : 'process'}${nl}`;
  } else {
    message += c.line;
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

    if (PL > 0) {

      const spwns = from(spawns);
      const width = spwns.reduce((size, [ name ]) => (name.length > size ? name.length : size), 0);
      const pids = spwns.map(([ name, child ]) => (
        c.line +
        ws.repeat(width - name.length) +
        c.whiteBright(toUpcase(name)) + c.gray(':') + ws +
        c.gray('PID') + ' → ' + c.gray('#') +
        c.pink(`${child.pid}`)
      ));

      message += `${c.line}${nl}${c.line}${c.bold('Processes:')}${c.newline}${pids.join(nl)}${TL > 0 ? nl : nil}`;

    }

    /* -------------------------------------------- */
    /* THEME PREVIEWS                               */
    /* -------------------------------------------- */

    if (TL > 0) {

      const themes = values(bundle.sync.themes);
      const width = themes.reduce((size, { target }) => (target.length > size ? target.length : size), 0);
      const urls = themes.map(({ id, store, target }) => (
        c.line +
        ws.repeat(width - target.length) +
        c.neonGreen(target) + ':' + ws +
        c.underline.gray('https://' + store + '?preview_theme_id=' + id)
      ));

      message += `${c.line}${nl}${c.line}${c.bold('Theme Previews:')}${c.newline}${urls.join(nl)}${nl}${c.line}`;
    }

  }

  /* -------------------------------------------- */
  /* CONFIG WARNINGS                              */
  /* -------------------------------------------- */

  let hasWarning: boolean = false;

  for (const prop in warnings) {

    const warn = warnings[prop];

    if (warn.length > 0) {

      if (!hasWarning) {
        message += `${nl}${c.line}${c.yellow.bold('Warnings:')}${nl}${c.line}`;
        hasWarning = true;
      }

      const title = c.yellowBright(`${warn.length} ${prop} ${warn.length > 1 ? 'warnings' : 'warning'}`);
      message += `${nl}${c.line}${title}${c.newline}${warn.join(nl)}${nl}${c.line}`;
    }
  }

  log(message);

};
