import type { Bundle, Theme } from 'types';
import type { ChildProcessWithoutNullStreams } from 'node:child_process';
import { basename } from 'node:path';
import { allFalse, anyTrue } from 'rambdax';
import { getTime, plural, toUpcase } from '../utils/utils';
import { keys, nil, nl, wsr, log, toArray } from '../utils/native';
import { warnings } from './validate';
import { spawns } from '../cli/spawn';
import * as c from '../cli/ansi';
import { size } from '~cli/size';

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
    `${c.line.gray}`
  );

  getTerminalWarning(text);

  text.push(
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

  if (bundle.logger.warnings) getRuntimeWarnings(bundle, text);

  /* -------------------------------------------- */
  /* SPAWNED PROCESSES                            */
  /* -------------------------------------------- */

  if (anyTrue(mode.build, mode.watch) && _ss > 0) {

    text.push(
      `${c.line.gray}Spawned ${c.cyan.bold(`${_ss}`)} child ${_ss > 1 ? 'processes' : 'process'}`,
      `${c.line.gray}`
    );

  } else {

    text.push(c.line.gray);

  }

  if (allFalse(mode.upload, mode.download, mode.build, mode.clean, mode.vsc)) {

    /* -------------------------------------------- */
    /* CHILD PROCESSES                              */
    /* -------------------------------------------- */

    if (_ss > 0) {
      text.push(
        `${c.line.gray}${c.bold('Child Processes:')}`,
        `${c.line.gray}${getSpawnProcessors(toArray(spawns))}`,
        `${c.line.gray}`
      );
    }

    /* -------------------------------------------- */
    /* THEME EDITOR                                 */
    /* -------------------------------------------- */

    if (_th > 0) {
      text.push(
        `${c.line.gray}${c.bold('Theme Editors:')}`,
        `${c.line.gray}${getThemeURLS(bundle.sync.themes, 'editor')}`,
        `${c.line.gray}`
      );
    }

  }

  if (anyTrue(mode.upload, mode.download, mode.watch)) {

    /* -------------------------------------------- */
    /* THEME PREVIEWS                               */
    /* -------------------------------------------- */

    if (_th > 0) {

      text.push(
        `${c.line.gray}${c.bold((mode.upload || mode.download) ? 'Theme Targets:' : 'Theme Previews:')}`,
        `${c.line.gray}${getThemeURLS(bundle.sync.themes, 'preview')}`
      );

    }
  }

  // Ensure an addition trunk line if in HOT mode
  if (bundle.mode.hot) text.push(`${c.line.gray}`);

  log(text.join(nl));

};

/**
 * Terminal Width Warning
 *
 * Populates the output when terminal width is less than 100 columns
 * in width. This is important so we apply the message first.
 */
function getTerminalWarning (text: string[]) {

  const cs = size().columns;

  if (cs >= 100) return;

  text.push(
    `${c.line.gray}${c.red.bold('TERMINAL WIDTH WARNING')}`,
    `${c.line.gray}`,
    `${c.line.gray}${c.red(`Your terminal width is below ${c.bold(`${100}`)} columns (currently ${c.bold(`${cs}`)})`)}`,
    `${c.line.gray}${c.red('This is not recommended for usage with Syncify (size matters).')}`,
    `${c.line.gray}${c.red('Expand your terminal wider for an optimal logging experience.')}`,
    `${c.line.gray}`
  );

}

function getRuntimeWarnings (bundle: Bundle, text: string[]) {

  let title: boolean = false;

  const cfile = basename(bundle.file);

  for (const prop in warnings) {

    const warn = warnings[prop];

    if (warn.length > 0) {

      if (title === false) {

        title = true;

        text.push(
          `${c.line.gray}`,
          `${c.line.yellow}${c.yellowBright(`${c.bold('Warnings')} in ${c.bold(cfile)}`)}`
        );

      }

      text.push(
        c.line.yellow,
        c.line.yellow + c.yellow.bold(`${warn.length} ${prop} ${plural('warning', warn.length)}`),
        c.line.yellow,
        warn.join(nl)
      );

    }
  }
}

/**
 * Spawn Processors
 *
 * Generates the spawn process id runtime list
 */
function getSpawnProcessors (spwns: [string, ChildProcessWithoutNullStreams][]) {

  const width = spwns.reduce((size, [ name ]) => (name.length > size ? name.length : size), 0);

  return spwns.reduce<string>((string, [ name, child ]) => {

    string += (
      nl +
      c.line.gray +
      wsr(width - name.length) +
      c.neonCyan(toUpcase(name)) + `${c.COL} ` +
      c.gray('PID') + ' → ' + c.gray('#') +
      c.pink(`${child.pid}`)
    );

    return string;

  }, nil);

}

/**
 * Theme Previews
 *
 * Generates the theme previews/targets runtime list
 */
function getThemeURLS (themes: Theme[], url: 'preview' | 'editor'): string {

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

  return themes.reduce<string>((string, { target, store, id }) => {

    const name = store.slice(0, store.indexOf('.'));
    const type = url === 'editor'
      ? `https://${store}/admin/themes/${id}/editor`
      : `https://${store}?preview_theme_id=${id}`;

    string += (
      nl +
      c.line.gray +
      c.pink(name) + wsr(width.store - name.length) + c.white(' → ') +
      c.pink.bold(target) + wsr(width.theme - target.length) + c.white(' → ') +
      c.gray.underline(type)
    );

    return string;

  }, nil);

}
