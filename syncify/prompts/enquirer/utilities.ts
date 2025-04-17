import type { PascalCase } from 'type-fest';
import type { Choice, PromptTheme } from 'types';

import { stdout } from 'node:process';

import { bold, COL, gray, neonGreen, neonRouge, red, redBright, Tree, whiteBright, yellowBright } from '@syncify/ansi';
import { kill } from '@syncify/kill';

import { log } from '~cli/log';
import { eqWS, o, toPascalCase } from '~utils';

/**
 * Prompt Theming
 */
export const theme: PromptTheme = {
  pointer (choice, index): string {
    const line = this.state.index === index ? Tree.dash : Tree.line;
    return index === 0 ? Tree.trim + NWL + line : line;
  },
  prefix: Tree.trim + WSP,
  styles: {
    primary: neonGreen,
    success: neonGreen,
    danger: red,
    warning: yellowBright,
    muted: gray,
    disabled: gray,
    typing: whiteBright
  },
  symbols: {
    ellipsis: bold('?'),
    prefix: {
      pending: '',
      submitted: '✓',
      cancelled: '✕'
    },
    separator: {
      pending: '',
      submitted: '➔ ',
      cancelled: `${redBright('✕')} `
    }
  }
};

export function cancel (e: any): never {

  kill(() => {
    log.nl().line('PROCESS EXIT WITH CODE 0', neonRouge);
    log.ender('Prompt Exit', { clear: false });
  });

  kill.exit(0);

  throw new Error(e);
}

export function choose <T extends any[] = Choice[]> (array: T, {
  prop = '',
  padding = 2
}: {
  prop?: T[number] extends object ? keyof T[number] : T[number],
  padding?: number
} = {}) {

  const p = prop.length > 0;
  const maxLen = Math.max(...array.map(s => p ? s[prop].length : s.length));
  const padded = array.map(s => ' '.repeat(maxLen - (p ? s[prop].length : s.length) + padding));

  return (cb?: (item: T[number], index?: number) => Choice): Choice[] => array.map((x, i) => {
    if (cb) {
      const c = cb(x, i);
      c.hint = padded[i] + c.hint;
      return c;
    }
    x.hint = padded[i] + x.hint;
    return x;
  });

}

/**
 * Creates equally spaced prompt labels provided to the
 * `message` property values.
 *
 * The reason for this helper is so we can produce output
 * that results in something like:
 *
 * ```
 * Some Label:     →  result
 * Another Label:  →  result
 * ```
 */
export function labels <T extends ReadonlyArray<string>> ({
  prompts,
  padding = 2
}: {
  prompts: T,
  padding?: number
}) {

  const space = eqWS(prompts, { padding });
  const model = o<Record<PascalCase<typeof prompts[number]>, string>>();

  for (let i = 0, size = prompts.length, name = NIL; i < size; i++) {
    name = prompts[i];
    model[toPascalCase(name)] = bold(name + COL + space(name));
  }

  return model;

}

/**
 * Intercept `stdout` and fix any TUI inconsistencies which
 * apply due to the way enquirer parses its output. This patch
 * is going to ensure the TUI Tree prefixes are consistent.
 *
 * The incosistencies occur upon validation operations of prompts.
 * String chunks and modified only when stdout contains `Error` keyword.
 *
 * @returns
 * Returns a disposable curry which will revert interception and
 * return it to the native `stdout.write`.
 *
 */
export function intercept () {

  const native = process.stdout.write;

  stdout.write = <{
    (buffer: string | Uint8Array, cb?: (err?: Error) => void): boolean;
    (str: string | Uint8Array, encoding?: BufferEncoding, cb?: (err?: Error) => void): boolean;
  }> function (chunk, encoding, callback) {

    let modified = chunk.toString();

    if (/ERROR|INVALID|MISSING|REQUIRED/i.test(modified)) {

      modified = modified
      .replace(/\n/, NWL + Tree.trim)
      .replace(/(?<=\u001b\[31m) /, NIL)
      .replace(/(?<=\[39m)\n? +(?=\u001b\[38;2;42;42;46m)/, NIL)
      .replace(/( (?:ERROR|INVALID|MISSING|REQUIRED))/i, '$1');

    }

    native.call(stdout, modified, encoding, callback);

  };

  return () => {

    stdout.write = native;

  };
}
