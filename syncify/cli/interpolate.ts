import type { LiteralUnion } from 'type-fest';
import type { Ansis } from '@syncify/ansi';
import { has, isArray, isString } from 'syncify:utils';
import * as c from '@syncify/ansi';
import { $ } from 'syncify:state';

function highlight (string: string) {

  return string
  .replace(/(\()(line\s[0-9]+)(\))(:)/g, c.gray('$1') + c.whiteBright('$2') + c.gray('$3') + '$4' + NWL)
  .replace(/('[{}_\w\s.-]*?'|"[\w\s.-]*?")/g, c.yellowBright('$1'))
  .replace(/({{2}-?)([a-zA-Z0-9_\-.'"[\]]+)(-?}{2})/g, c.cyan('$1') + c.white('$2') + c.cyan('$3'))
  .replace(/((?:www|http:|https:)+[^\s]+[\w])/g, c.underline('$1'))
  .replace(/(\/)(.*?)(\/)/g, c.magenta('$1') + c.cyan('$2') + c.magenta('$3'))
  .replace(/(?<=Filename\s)([\w._-]+)(?=\salready)/, c.neonCyan.bold('$1'));

}

function tokens (string: string) {

  return c.white(string
  .replace(/({%|{%-}|-%}|%}|{{|{{-|}}|-}}|<\/?|>)/g, c.cyan('$1'))
  .replace(/(['"].*?['"])/g, c.gray('$1')));

}

/**
 * TUI Shopify
 *
 * Parse Shopify 422 error responses from failed requests.
 * Applies some sanity and normalization to the output.
 */
export function Shopify (message: string | string[], value: string): { line: number, column: number, output: string } {

  const output: string[] = [];

  let line: number = NaN;
  let column: number = NaN;

  if (isArray(message)) {

    for (let i = 0; i < message.length; i++) {

      let text = message[i];

      if (/\(line \d+\):/.test(text)) {

        const lineIndex = text.indexOf('):');
        const numberIndex = text.indexOf('(line');

        // Obtain Line number
        if (lineIndex > -1 && numberIndex > -1) {

          output.push(c.red.bold(text.slice(0, lineIndex + 2)));

          line = Number(text.slice(numberIndex + 6, lineIndex));
          text = text.slice(lineIndex + 2);

          const doc = value.split(NWL);

          if (doc.length > 1) {

            const match = text.match(/'(.*?)'/);

            if (match !== null) {

              column = doc[line - 1].indexOf(match[1]);

            }

            output.push(
              NWL,
              `${c.blue(c.sanitize(line - 1))}  ${c.Tree.trim}`,
              `${c.blue(c.sanitize(line))}  ${c.Tree.trim} ${tokens(doc[line - 1])}`
            );

            if (isNaN(column)) {
              output.push(NWL);
            } else {
              output.push(
                `> ${c.BAD} ${c.Tree.redTrim} ${WSP.repeat(column) + c.red.bold('^'.repeat(match[1].length))}`,
                NWL
              );
            }
          }

        }
      }

      output.push(highlight(text));

      if (i === 0) {
        output.push(NWL);
      }
    }

  }

  return {
    line,
    column,
    output: output.join(NWL) + NWL
  };

}

/**
 * Format Message
 *
 * ```
 * │
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │
 * ```
 */
export function Format (input: string | string[], { type = 'info' }: { type?: 'error' | 'warn' | 'info'} = {}) {

  const message = c.Create({ type });
  const lines = isArray(input) ? input : input.split(NWL);
  const color = type === 'error' ? 'red' : type === 'warn' ? 'yellow' : 'line';

  while (lines.length !== 0) {

    const line = lines.shift();

    if (line.trim().length > 0) {
      message.Line(line.trimEnd());
    } else {
      message.Newline(color);
    }

  }

  return message.Newline(color).toString();

}

/**
 * TUI Context Details
 *
 * This prints an equally space distributed table of
 * `key: value` records, typically used in errors.
 *
 * ```
 * │
 * │ code:      422
 * │ file:     ~source/dir/filename.liquid
 * │ status:    Unprocessed Entity
 * │ stack:     Type s and press enter to view stack trace
 * ```
 */
export function Context (data: {
  stack: string | boolean;
  warning?: boolean;
  message?: c.CreateClosure;
  entries: {
    [name: string]: string | number
  }
}) {

  const space = c.eq(data.entries);
  const hasMessage = has('message', data);

  if (!has('warning', data)) data.warning = false;

  if (!hasMessage) {
    if (data.warning === false) {
      data.message = c.Create({ type: 'error' }).NL;
    } else {
      data.message = c.Create({ type: 'warn' }).NL;
    }
  }

  // generate output
  for (const key in data.entries) {

    const string = c.sanitize(data.entries[key]);

    if (
      key === 'source' ||
      key === 'output' ||
      key === 'input' ||
      key === 'file') {

      data.message.Line(c.white(key) + c.COL + space(key) + c.TLD + c.underline(string), c.gray);

    } else {

      data.message.Line(c.white(key) + c.COL + space(key) + string, c.gray);

    }

  }

  if (isString(data.stack)) {

    if (data.warning === false) {
      $.errors.add(data.stack);
    }

    data.message.Break(c.Suffix.stack);
  }

  return data.message.toLine();

};

/**
 * Code Sample Snippets
 *
 * This prints an equally space distributed table of
 * `key: value` records, typically used in errors.
 *
 * ```
 * │
 * │ 10:
 * │ 11: foo()
 * │ 12:
 * │
 * ```
 */
export function Sample (code: string, {
  line = c.Tree.line,
  span = null
}: {
  line?: LiteralUnion<'red' | 'yellow', string>,
  span?: {
    start: number,
    end: number
  }
} = {}) {

  if (line === 'red') {
    line = c.Tree.red;
  } else if (line === 'yellow') {
    line = c.Tree.yellow;
  }

  if (span !== null) {

    const end = has('end', span) ? span.end : span.start + 1;

    return line + NWL + [
      line + c.blue(`${span.start - 1}`) + c.COL,
      line + c.blue(`${span.start}`) + c.COL + code,
      line + c.blue(`${end}`) + c.COL
    ].join(NWL);

  }

  return line + NWL + line + code;

}

/**
 * TUI Multiline
 *
 * ```
 * │
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │
 * ```
 */
export function Multiline (input: string[] | string, { type = 'info', color = c.white }: {

  /**
   * Ansi Color
   *
   * @default white
   */
  color?: Ansis;
  /**
   * The type of Multiline string
   *
   * @default 'info'
   */
  type?: 'info' | 'error' | 'warn';

} = {}): string {

  const line = type === 'error' ? 'red' : type === 'warn' ? 'yellow' : 'line';

  return c.Create({ type }).Newline(line).Wrap(input, color).toLine();

};
