import type { Ansis } from 'ansis';
import { has, isArray, isString, sanitize, ws } from 'syncify:utils';
import { Tree, COL, TLD, BAD } from 'syncify:symbol';
import { gray, cyan, white, magenta, underline, neonCyan, blue, whiteBright, yellowBright, red } from 'syncify:colors';
import { Create, CreateClosure, Suffix } from 'syncify:ansi';
import { $ } from 'syncify:state';
import { LiteralUnion } from 'type-fest';

function highlight (string: string) {

  return string
  .replace(/(\()(line\s[0-9]+)(\))(:)/g, gray('$1') + whiteBright('$2') + gray('$3') + '$4' + NWL)
  .replace(/('[{}_\w\s.-]*?'|"[\w\s.-]*?")/g, yellowBright('$1'))
  .replace(/({{2}-?)([a-zA-Z0-9_\-.'"[\]]+)(-?}{2})/g, cyan('$1') + white('$2') + cyan('$3'))
  .replace(/((?:www|http:|https:)+[^\s]+[\w])/g, underline('$1'))
  .replace(/(\/)(.*?)(\/)/g, magenta('$1') + cyan('$2') + magenta('$3'))
  .replace(/(?<=Filename\s)([\w._-]+)(?=\salready)/, neonCyan.bold('$1'));

}

function tokens (string: string) {

  return white(string
  .replace(/({%|{%-}|-%}|%}|{{|{{-|}}|-}}|<\/?|>)/g, cyan('$1'))
  .replace(/(['"].*?['"])/g, gray('$1')));

}

/**
 * TUI Shopify
 *
 * Parse Shopify 422 error responses from failed requests.
 * Applies some sanity and normalization to the output.
 */
export function Shopify (message: string | string[], value: string): {
  line: number,
  column: number,
  output: string
} {

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

          output.push(red.bold(text.slice(0, lineIndex + 2)));

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
              `${blue(sanitize(line - 1))}  ${Tree.trim}`,
              `${blue(sanitize(line))}  ${Tree.trim} ${tokens(doc[line - 1])}`
            );

            if (isNaN(column)) {
              output.push(NWL);
            } else {
              output.push(
                `> ${BAD} ${Tree.redTrim} ${WSP.repeat(column) + red.bold('^'.repeat(match[1].length))}`,
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

  const message = Create({ type });
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
  message?: CreateClosure;
  entries: {
    [name: string]: string | number
  }
}) {

  const space = ws(data.entries);
  const hasMessage = has('message', data);

  if (!has('warning', data)) data.warning = false;

  if (!hasMessage) {
    if (data.warning === false) {
      data.message = Create({ type: 'error' }).NL;
    } else {
      data.message = Create({ type: 'warn' }).NL;
    }
  }

  // generate output
  for (const key in data.entries) {

    const string = sanitize(data.entries[key]);

    if (
      key === 'source' ||
      key === 'output' ||
      key === 'input' ||
      key === 'file') {

      data.message.Line(white(key) + COL + space(key) + TLD + underline(string), gray);

    } else {

      data.message.Line(white(key) + COL + space(key) + string, gray);

    }

  }

  if (isString(data.stack)) {

    if (data.warning === false) {
      $.errors.add(data.stack);
    }

    data.message.Break(Suffix.stack);
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
  line = Tree.line,
  span = null
}: {
  line?: LiteralUnion<'red' | 'yellow', string>,
  span?: {
    start: number,
    end: number
  }
} = {}) {

  if (line === 'red') {
    line = Tree.red;
  } else if (line === 'yellow') {
    line = Tree.yellow;
  }

  if (span !== null) {

    const end = has('end', span) ? span.end : span.start + 1;

    return line + NWL + [
      line + blue(`${span.start - 1}`) + COL,
      line + blue(`${span.start}`) + COL + code,
      line + blue(`${end}`) + COL
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
export function Multiline (input: string[] | string, { type = 'info', color = white }: {

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

  return Create({ type }).Newline(line).Wrap(input, color).toLine();

};
