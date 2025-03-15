import * as _ from '@syncify/ansi';

import { $ } from '$';

/* -------------------------------------------- */
/* UTILITIES                                    */
/* -------------------------------------------- */

/**
 * Output description in help modes but only when
 * terminal row width (wrap) is above `75`.
 */
export function describe (message: string) {

  return $.terminal.cols < 75 ? NIL : _.gray(`›    ${message}`);

};

/**
 * Post proccess which will replace certain characters and make them gray:
 *
 * - `$`
 * - `{`
 * - `}`
 * - `,`
 * - `<`
 * - `>`
 * - `--`
 * - `[options]` > `[` and `]`
 *
 */
export function highlight (input: string) {

  return input
  .replace(/([${},<>])/g, _.gray('$1'))
  .replace(/\s(-{1,2})(?=[a-zA-Z])/g, _.gray(' $1'))
  .replace(/(\[options\])/g, `${_.LSB}options${_.RSB}`);

};

/**
 * Encase the `stdout` with header and footer when using `Scroll`
 *
 * **HEADER**
 *
 * This is disabled by default via `{ banner: false }` parameters.
 *
 * ```
 * ┌─ UP [▲] AND DOWN [▼] ARROW KEYS TO SCROLL
 * │
 * │  █▀▀ █ █ █▀█ █▀▀ ▀█▀ █▀▀ █ █
 * │  ▀▀█ ▀▀█ █ █ █    █  █▀▀ ▀▀█
 * │  ▀▀▀ ▀▀▀ ▀ ▀ ▀▀▀ ▀▀▀ ▀   ▀▀▀
 * │
 * ```
 *
 * **FOOTER**
 *
 * ```
 * │
 * └─ UP [▲] AND DOWN [▼] ARROW KEYS TO SCROLL
 * ```
 */
export function encase ({ banner = false }): [ header: string, footer: _.Tui<string> ] {

  const arrow = `${_.Encase('SB', _.gray('▲'))} AND DOWN ${_.Encase('SB', _.gray('▼'))}`;
  const label = _.gray(`UP ${arrow} ARROW KEYS TO SCROLL`);
  const header = _.Create().Break(2).Top(label, false).Newline();
  const footer = _.Create().Newline(2).End(label, false).Break();

  if (banner) {

    header
    .Line('█▀▀ █ █ █▀█ █▀▀ ▀█▀ █▀▀ █ █', _.lightGray)
    .Line('▀▀█ ▀▀█ █ █ █    █  █▀▀ ▀▀█', _.lightGray)
    .Line('▀▀▀ ▀▀▀ ▀ ▀ ▀▀▀ ▀▀▀ ▀   ▀▀▀', _.lightGray)
    .Newline();

  }

  return [ header.toString(), footer ];

};
