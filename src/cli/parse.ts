import c from 'ansis';
import type { Warning } from 'postcss';
import { is, isArray, nil } from 'shared/native';
import type { Exception, SourceSpan } from 'sass';
import { range } from 'rambdax';

/**
 * Captures Line Number text in Shopify responses
 */
const RegExpLineNo = /\((line\s[0-9]+)\)(:)/g;

/**
 * Captures Liquid tags in Shopify responses
 */
const RegExpLiquid = /['"]({?[{%])(.*?)([%}]}?)['"]/g;

/**
 * Captures Liquid Object tag (with no spaces), typically used
 * for tags like {{content_for_header}}
 */
const RegExpObjectTag = /({{2}-?)([a-zA-Z0-9_\-.'"[\]]+)(-?}{2})/g;

/**
 * Captures Strings in Shopify responses
 */
const RegExpString = /(['"][\w\s]+['"])/g;

/**
 * Captures Strings in Shopify responses
 */
const RegExpURLs = /((?:www|http:|https:)+[^\s]+[\w])/g;

/**
 * Captures Quotations in string
 */
const RegExpQuotes = /(["'])/g;

/**
 * Captures Regular Expressions in Shopify responses
 */
const RegExpRegex = /(\/)(.*?)(\/)/g;

/**
 * Captures SASS Variable names
 */
const SassMessage = /\n?\b([a-zA-Z\s]+)(:)(\s+)([^\n]+)/g;

/**
 * Captures SASS Numbers
 */
const SassStack = /([^\n]+\b)([0-9]+)(:)([0-9]+)([^\n]+)/g;

/**
 * Quotes Parse
 *
 * Replaces all occurances of quotation characters
 */
export const quotes = (text: string) => text.replace(RegExpQuotes, c.white('$1'));

/**
 * URL Parse
 *
 * Replaces URL occurances
 */
export const urls = (text: string) => text.replace(RegExpURLs, c.underline('$1'));

/**
 * String Parse
 *
 * Replaces all occurances of a value wrapped
 * in quotation characters, including the quotes.
 */
export const string = (text: string) => text.replace(RegExpString, c.yellow('$1'));

/**
 * PostCSS Warning Parser
 *
 * Pretty formatted log for postcss warnings.
 */
export const postcss = (data: Warning) => {

  return c.yellow.bold(data.text) + '\n\n' +
  c.yellow(data.node.toString()) + '\n\n' +
  c.dim('Lines:  ') + data.line + ' > ' + data.endLine + '\n' +
  c.dim('Column: ') + data.column + '\n' +
  c.dim('Plugin: ') + data.plugin + '\n';

};

export const sassspan = (data: SourceSpan) => {

  return c.cyanBright(data.context) + '\n\n' +
  c.dim('Lines:  ') + data.start.line + ' > ' + data.end.line + '\n' +
  c.dim('Column: ') + data.start.column + '\n' +
  c.dim('File: ') + data.url + '\n';

};

export function sassError (error: Exception) {

  const removed = error.message.replace(error.sassMessage, nil);
  const omitted = removed.lastIndexOf('╵'); // omit stack from message
  const message = is(omitted, -1) ? removed : removed.slice(0, omitted);

  return '\n' + (
    c.red(c.bold(error.sassMessage) + '\n' + message) + '\n\n' +
    sassStack(error.sassStack)
  );

}

export function sassStack (stack: string) {

  return (
    c.dim('Stack Trace') + ':\n' +
    stack.replace(SassStack, `  $1 ${c.bold('$2')}$3${c.bold('$4')}${c.dim('$5')}`) + '\n'
  );

}

export function sassSplit (stack: string) {

  return '\n' + stack
    .split('\n')
    .filter(Boolean)
    .map((v, i) => `${c.white(String(i + 1))}. ${c.yellowBright(v)}`)
    .join('\n') + '\n';

}

/**
 * Pretty SASS
 *
 * Pretty Parse for errors. Transforms responses
 * into a visually appealing format. It looks for
 * specific strings in request responses and replacing
 * them with colourized equivalents.
 */
export function sassPetty (message: string, span: SourceSpan, stack: string) {

  const loc = message.search(SassMessage);
  const at = is(loc, -1) ? 0 : loc;

  let code: string;

  if (is(span.start.line, span.end.line)) {

    code = (
      `${span.start.line - 1}${c.gray(':')}\n` +
      `${span.start.line}${c.gray(':')}  ${span.context}` +
      `${span.end.line + 1}${c.gray(':')}\n`
    );

  } else {

    const lines = range(span.start.line, span.end.line);
    const split = span.context.split(/\n/);
    code = split.map((v, i) => `${lines[i]}${c.gray(':')}  ${v}`).join('\n');

  }

  return '\n' + (
    c.gray(code) + '\n\n' +
    c.yellowBright(message.slice(0, at)) + '\n\n' +
    sassStack(stack) +
    message.slice(at)
      .replace(SassMessage, `${c.dim('$1')}$2` + '\n  ' + c.white('$4') + '\n')
      .replace(RegExpURLs, c.white.underline('$1')) + '\n'
  );

}

/**
 * Pretty Parse
 *
 * Pretty Parse for errors. Transforms responses
 * into a visually appealing format. It looks for
 * specific strings in request responses and replacing
 * them with colourized equivalents.
 */
export function liquidPretty (message: string[] | string) {

  return isArray(message) ? message.map(liquidPretty).join('\n') : message
    .replace(RegExpLineNo, c.white('$1') + c.gray('$2') + '\n\n')
    .replace(RegExpString, c.yellow('$1'))
    .replace(RegExpLiquid, c.cyan('$1') + c.magenta('$2') + c.cyan('$3'))
    .replace(RegExpURLs, c.underline('$1'))
    .replace(RegExpObjectTag, c.white('$1') + c.gray('$2') + c.white('$3'))
    .replace(RegExpRegex, c.magenta('$1') + c.cyan('$2') + c.magenta('$3'));

}
