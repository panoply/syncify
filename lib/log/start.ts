import type { Filters, Theme } from 'types';
import type { Bundle } from 'syncify:state';
import type { ChildProcessWithoutNullStreams } from 'node:child_process';
import { allFalse, anyTrue, isEmpty } from 'rambdax';
import { relative } from 'pathe';
import { toArray, values, keys, log } from 'syncify:native';
import { getTime, plural, toUpcase } from 'syncify:utils';
import { warnings } from './throws';
import * as c from 'syncify:cli/ansi';

export function runtime ($: Bundle) {

  log(c.clear);

  const text: string[] = [];

  text.push(
    `${c.open}${c.gray('Syncify')} ${c.gray('~')} ${c.gray(getTime())}`,
    `${c.line.gray}`
  );

  getTerminalWarning(text, $.terminal.cols);

  text.push(
    `${c.line.gray}${c.whiteBright.bold(`v${$.version}`)}`,
    `${c.line.gray}`
  );

  log(text.join(NWL));

}

/**
 * Log Heading
 *
 * Prints a small overview of runing resource, all operations
 * initialize with the header.
 *
 * ```
 * ┌─ Syncify v0.1.0.beta
 * │
 * │ Running watch in production
 * │ Syncing 2 stores and 2 themes
 * │ Spawned 2 child processes
 * │
 * │ Filters:
 * │
 * │ snippets
 * │ sections/file.liquid
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
 * │ HOT Reloading:
 * │
 * │ Assets:   http://localhost:8080
 * │ External: http://192.168.2.8:8080
 * │
 * │ HOT Reloading Failed:
 * │
 * │ 8080 Server address already in use
 * │ 3000 Server address already in use
 * │
 * │ Change the socket and server ports or kill the session occupying them.
 * │ This error typically occurs when multiple Syncify instances are active.
 * │
 * ```
 */
export function start ($: Bundle) {

  if ($.mode.metafields) return NIL;

  const text: string[] = [];

  /* -------------------------------------------- */
  /* BEGIN                                        */
  /* -------------------------------------------- */

  const { mode, spawn, sync } = $;

  /** Plural store/s length */
  const _st = sync.stores.length;

  /** Plural theme/s length */
  const _th = sync.themes.length;

  /** Plural spawns/s length */
  const _ss = keys($.spawn.commands).length;

  /** Shortcut Color Open */
  const oNC = c.neonRouge.bold.open;

  /** Shortcut Color Close */
  const cNC = c.neonRouge.bold.close;

  /** Prints store, eg: `1 store` or `2 stores` */
  const stores = oNC + String(_st) + cNC + (_st > 1 ? ' stores' : ' store');

  /** Prints theme, eg: `1 theme` or `2 themes` */
  const themes = oNC + String(_th) + cNC + (_th > 1 ? ' themes' : ' theme');

  /** Prints Environment, eg: `(development)` or `(production)` */
  const env = oNC + `${$.env.dev ? 'development' : 'production'}`.toUpperCase() + cNC;

  if (mode.export) {

    if (mode.build) {
      text.push(`${c.line.gray}Running  ${c.ARR}  ${oNC + 'clean' + cNC}   ${c.gray('--clean')}`);
      text.push(`${c.line.gray}Running  ${c.ARR}  ${oNC + 'build' + cNC}   ${c.gray('--build')}`);
    }

    if ($.vc.update !== null) {

      text.push(`${c.line.gray}Running  ${c.ARR}  ${oNC + 'bump' + cNC}  ${c.gray('--bump')}`);

    }

    text.push(`${c.line.gray}Running  ${c.ARR}  ${oNC + 'export' + cNC}  ${c.gray('--export')}`);
  } else {

    if (mode.build) {
      text.push(`${c.line.gray}${env}`, c.line.gray);
      text.push(`${c.line.gray}Running  ${c.ARR}  ${oNC + 'clean' + cNC}   ${c.gray('--clean')}`);
      text.push(`${c.line.gray}Running  ${c.ARR}  ${oNC + 'build' + cNC}   ${c.gray('--build')}`);
    } else if (mode.watch) {
      text.push(`${c.line.gray}Running ${oNC + 'watch' + cNC} in ${env}`);
    } else if (mode.upload) {
      text.push(`${c.line.gray}Running ${oNC + 'upload' + cNC} mode`);
    } else if (mode.import) {
      text.push(`${c.line.gray}Running ${oNC + 'import' + cNC} mode`);
    } else if (mode.clean) {
      text.push(`${c.line.gray}Running ${oNC + 'clean' + cNC} mode`);
    }

  }

  if (!mode.export) {

    text.push(`${c.line.gray}${(_st > 0 && _th > 0 ? `Syncing ${themes} to ${stores}` : NIL)}`);

  } else {

    if (_st > 0 && _th > 0) {
      text.push(`${c.line.gray}${(_st > 0 && _th > 0 ? `Exporting ${themes} for ${stores}` : NIL)}`);
    }
  }

  /* -------------------------------------------- */
  /* APPLIED FILTERS                              */
  /* -------------------------------------------- */

  if (!isEmpty($.filters)) {
    text.push(
      c.line.gray,
      `${c.line.gray}${c.whiteBright.bold('--filters')}`,
      `${c.line.gray}` + getFilters($.cwd, $.filters)
    );
  }

  /* -------------------------------------------- */
  /* CONFIG WARNINGS                              */
  /* -------------------------------------------- */

  if ($.logger.warnings) getRuntimeWarnings($, text);

  /* -------------------------------------------- */
  /* SPAWNED PROCESSES                            */
  /* -------------------------------------------- */

  if (anyTrue(mode.build, mode.watch) && _ss > 0) {

    text.push(
      `${c.line.gray}Spawned ${oNC + _ss + cNC} child ${_ss > 1 ? 'processes' : 'process'}`,
      `${c.line.gray}`
    );

  } else {

    text.push(c.line.gray);

  }

  if (allFalse(mode.upload, mode.import, mode.build, mode.clean)) {

    /* -------------------------------------------- */
    /* CHILD PROCESSES                              */
    /* -------------------------------------------- */

    if (_ss > 0) {
      text.push(
        `${c.line.gray}${c.bold('Child Processes:')}`,
        `${c.line.gray}${getSpawnProcessors(toArray(spawn.streams))}`,
        `${c.line.gray}`
      );
    }

    /* -------------------------------------------- */
    /* THEME EDITOR                                 */
    /* -------------------------------------------- */

    if (_th > 0) {
      text.push(
        `${c.line.gray}${c.bold('Theme Editors:')}`,
        `${c.line.gray}${getThemeURLS(sync.themes, 'editor')}`,
        `${c.line.gray}`
      );
    }

  }

  if (anyTrue(mode.upload, mode.import, mode.watch)) {

    /* -------------------------------------------- */
    /* THEME PREVIEWS                               */
    /* -------------------------------------------- */

    if (_th > 0) {

      text.push(
        `${c.line.gray}${c.bold((mode.upload || mode.import) ? 'Theme Targets:' : 'Theme Previews:')}`,
        `${c.line.gray}${getThemeURLS(sync.themes, 'preview')}`
      );

    }
  }

  // Ensure an addition trunk line if in HOT mode
  if ($.mode.hot) text.push(`${c.line.gray}`);

  log(text.join(NWL));

};

/**
 * Spawn Processors
 *
 * Generates the spawn process id runtime list
 */
function getFilters (cwd: string, filters: Filters) {

  return values(filters).flat().reduce<string>((string, path, index, size) => {

    string += (
      (index > 0 ? (NWL + c.line.gray) : NIL) +
      WSP.repeat(2) +
      c.white(relative(cwd, path))
    );

    return string;

  }, NIL);

}

/**
 * Terminal Width Warning
 *
 * Populates the output when terminal width is less than 100 columns
 * in width. This is important so we apply the message first.
 */
function getTerminalWarning (text: string[], cs: number) {

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

function getRuntimeWarnings ($: Bundle, text: string[]) {

  let title: boolean = false;

  for (const prop in warnings) {

    const warn = warnings[prop];

    if (warn.length > 0) {

      if (title === false) {

        title = true;

        text.push(
          `${c.line.gray}`,
          `${c.line.yellow}${c.yellowBright(`${c.bold('Warnings')} in ${c.bold($.file.base)}`)}`
        );

      }

      text.push(
        c.line.yellow,
        c.line.yellow + c.yellow.bold(`${warn.length} ${prop} ${plural('warning', warn.length)}`),
        c.line.yellow,
        warn.join(NWL)
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
      NWL +
      c.line.gray +
      WSP.repeat(width - name.length) +
      c.neonCyan(toUpcase(name)) + `${c.COL} ` +
      c.gray('PID') + ' → ' + c.gray('#') +
      c.pink(`${child.pid}`)
    );

    return string;

  }, NIL);

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
      NWL +
      c.line.gray +
      c.pink(name) + WSP.repeat(width.store - name.length) + c.white('  →  ') +
      c.pink.bold(target) + WSP.repeat(width.theme - target.length) + c.white(' →  ') +
      c.gray.underline(type)
    );

    return string;

  }, NIL);

}
