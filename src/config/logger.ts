import { IRequestData } from '../index.d';
import omit from 'lodash.omit';
import chalk, { ForegroundColor } from 'chalk';
import fancylog from 'fancy-log';
import logUpdate from 'log-update';

declare type Content = string | { message: string, data: IRequestData }

export { logUpdate as update };

/**
 * Clears CLI console
 */
export function clear (isSoft: boolean) {

  process.stdout.write(
    isSoft
      ? '\x1B[H\x1B[2J'
      : '\x1B[2J\x1B[3J\x1B[H\x1Bc'
  );
}

export function getText (content: Content) {

  if (typeof content === 'string') return content;

  let message: string;

  message = content?.message ? content.message + '\n\n\t' : '';
  message += content?.data ? JSON.stringify(content.data?.asset
    ? omit(content.data.asset, 'attachment')
    : content.data) : '';

  return message;

}

export function errors (error: any) {

  if (error?.stack) {

    throw print(error.stack);

  } else {

    if (error?.data && Array.isArray(error.data)) {

      const plural = error.data.length > 1 ? 'Errors' : 'Error';

      let output: string;

      output = chalk`{red.bold ${error.data.length}} {red ${plural}} `;
      output += chalk`{dim in} {redBright ${error.message}}`;
      output += '\n\n';
      output += error.data
        .map((text: string, i: number) => (
          chalk` {bold.dim ${i + 1}.} {redBright ${parse(text)}}`
        ))
        .join('\n');

      output += '\n';

      return print(output);

    }

    return print(error, 'redBright', 'error');

  }

}

/**
 * Log Error Parser
 */
export function parse (error: string) {

  const liquid = /['"]({?[{%])(.*?)([%}]}?)['"]/g;
  const string = /(['"][\w\s]+['"])/g;
  const regexp = /(\/)(.*?)(\/)/g;
  const lineNo = /\((line\s[0-9]+)\)(:)/g;

  return error
    .replace(lineNo, chalk`{white $1}{white.dim $2}\n\n   `)
    .replace(string, chalk`{yellowBright $1}`)
    .replace(liquid, chalk`{cyan $1}{magentaBright $2}{cyan $3}`)
    .replace(regexp, chalk`{magentaBright $1}{cyan $2}{magentaBright $3}`);

}

export function print (
  content: Content,
  color: typeof ForegroundColor = 'white',
  type: 'none' | 'warn' | 'error' | 'info' = 'none'
): void {

  const message = getText(content);
  const colorize = chalk[color](message);

  return Object.is(type, 'none')
    ? fancylog(colorize)
    : fancylog[type](colorize);

}
