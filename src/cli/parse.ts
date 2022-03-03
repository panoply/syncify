import type { Exception, SourceSpan } from 'sass';
import type { Warning } from 'postcss';
import { range } from 'rambdax';
import * as c from 'cli/ansi';
import { is, isArray, nil } from 'utils/native';

/* -------------------------------------------- */
/* EXPRESSIONS                                  */
/* -------------------------------------------- */

/**
 * Captures Strings in Shopify responses
 */
const QuotedString = /(['"][\w\s]+['"])/g;

/**
  * Captures Strings in Shopify responses
  */
const RegExpURLs = /((?:www|http:|https:)+[^\s]+[\w])/g;

/**
  * Captures Quotations in string
  */
const Quotations = /(["'])/g;

/**
  * Captures Regular Expressions in Shopify responses
  */
const RegExpRegex = /(\/)(.*?)(\/)/g;

/**
 * Captures Line Number text in Shopify responses
 */
const LiquidLineNo = /\((line\s[0-9]+)\)(:)/g;

/**
 * Captures Liquid tags in Shopify responses
 */
const LiquidTags = /['"]({?[{%])(.*?)([%}]}?)['"]/g;

/**
 * Captures Liquid Object tag (with no spaces), typically used
 * for tags like {{content_for_header}}
 */
const LiquidObjects = /({{2}-?)([a-zA-Z0-9_\-.'"[\]]+)(-?}{2})/g;

/**
 * Captures SASS Variable names
 */
const SassMessage = /\n?\b([a-zA-Z\s]+)(:)(\s+)([^\n]+)/g;

/**
 * Captures SASS Numbers
 */
const SassStack = /([^\n]+\b)([0-9]+)(:)([0-9]+)([^\n]+)/g;

/* -------------------------------------------- */
/* PUBLIC METHODS                               */
/* -------------------------------------------- */

/**
 * Quotes Parse
 *
 * Replaces all occurances of quotation characters
 */
export const quotes = (text: string) => text.replace(Quotations, c.white('$1'));

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
export const string = (text: string) => text.replace(QuotedString, c.yellow('$1'));

/**
 * PostCSS Warning Parser
 *
 * Pretty formatted log for postcss warnings.
 */
export const postcss = (data: Warning) => {

  return c.yellow.bold(data.text) + '\n\n' +
  c.yellow(data.node.toString()) + '\n\n' +
  c.gray('Lines:  ') + data.line + ' > ' + data.endLine + '\n' +
  c.gray('Column: ') + data.column + '\n' +
  c.gray('Plugin: ') + data.plugin + '\n';

};

/**
 * Pretty Stacks
 *
 * Formats stack tracers into a prretty formatted variation.
 */
export const sassStack = (stack: string) => {

  return (
    c.gray('Stack Trace') + ':\n' +
    stack.replace(SassStack, `  $1 ${c.bold('$2')}$3${c.bold('$4')}${c.gray('$5')}`) + '\n'
  );

};

export const sassError = (error: Exception) => {

  const removed = error.message.replace(error.sassMessage, nil);
  const omitted = removed.lastIndexOf('╵'); // omit stack from message
  const message = is(omitted, -1) ? removed : removed.slice(0, omitted);

  return '\n' + (
    c.red(c.bold(error.sassMessage) + '\n' + message) + '\n\n' +
    sassStack(error.sassStack)
  );

};

/**
 * Split Warning
 *
 * Formats a string with newlines that is a warning
 */
export const sassSplit = (stack: string) => {

  return '\n' + stack
    .split('\n')
    .filter(Boolean)
    .map((v, i) => `${c.white(String(i + 1))}. ${c.yellowBright(v)}`)
    .join('\n') + '\n';

};

/**
 * Pretty SASS
 *
 * Pretty Parse for errors. Transforms responses
 * into a visually appealing format. It looks for
 * specific strings in request responses and replacing
 * them with colourized equivalents.
 */
export const sassPetty = (message: string, span: SourceSpan, stack: string) => {

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
      .replace(SassMessage, `${c.gray('$1')}$2` + '\n  ' + c.white('$4') + '\n')
      .replace(RegExpURLs, c.white.underline('$1')) + '\n'
  );

};

/**
 * Pretty Parse
 *
 * Pretty Parse for errors. Transforms responses
 * into a visually appealing format. It looks for
 * specific strings in request responses and replacing
 * them with colourized equivalents.
 */
export const liquidPretty = (message: string[] | string) => {

  return isArray(message) ? message.map(liquidPretty).join('\n') : message
    .replace(LiquidLineNo, c.white('$1') + c.gray('$2') + '\n\n')
    .replace(QuotedString, c.yellow('$1'))
    .replace(LiquidTags, c.cyan('$1') + c.magenta('$2') + c.cyan('$3'))
    .replace(RegExpURLs, c.underline('$1'))
    .replace(LiquidObjects, c.white('$1') + c.gray('$2') + c.white('$3'))
    .replace(RegExpRegex, c.magenta('$1') + c.cyan('$2') + c.magenta('$3'));

};
