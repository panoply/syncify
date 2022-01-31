import ansis from 'ansis';
import { Warning } from 'postcss';

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
const RegExpURLs = /(?:www|http:|https:)+[^\s]+[\w]/g;

/**
 * Captures Quotations in string
 */
const RegExpQuotes = /(["'])/g;

/**
 * Captures Regular Expressions in Shopify responses
 */
const RegExpRegex = /(\/)(.*?)(\/)/g;

/**
 * Quotes Parse
 *
 * Replaces all occurances of quotation characters
 */
export function quotes (text: string) {

  return text.replace(RegExpQuotes, ansis.white('$1'));

}

/**
 * URL Parse
 *
 * Replaces URL occurances
 */
export function urls (text: string) {

  return text.replace(RegExpURLs, ansis.underline('$1'));

}

/**
 * String Parse
 *
 * Replaces all occurances of a value wrapped
 * in quotation characters, including the quotes.
 */
export function string (text: string) {

  return text.replace(RegExpString, ansis.yellow('$1'));

}

/**
 * PostCSS Warning Parser
 *
 * Pretty formatted log for postcss warnings.
 */
export function postcss (data: Warning) {

  return (
    ansis.yellow.bold(data.text) + '\n\n' +
    ansis.yellow(data.node.toString()) + '\n\n' +
    ansis.dim('Lines:  ') + data.line + ' > ' + data.endLine + '\n' +
    ansis.dim('Column: ') + data.column + '\n' +
    ansis.dim('Plugin: ') + data.plugin + '\n'
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
export function pretty (message: string[] | string) {

  if (Array.isArray(message)) return message.map(pretty).join('\n');
  if (!message) return message;

  return message
    .replace(RegExpLineNo, ansis.white('$1') + ansis.gray('$2') + '\n\n')
    .replace(RegExpString, ansis.yellow('$1'))
    .replace(RegExpLiquid, ansis.cyan('$1') + ansis.magenta('$2') + ansis.cyan('$3'))
    .replace(RegExpURLs, ansis.underline('$1'))
    .replace(RegExpObjectTag, ansis.white('$1') + ansis.gray('$2') + ansis.white('$3'))
    .replace(RegExpRegex, ansis.magenta('$1') + ansis.cyan('$2') + ansis.magenta('$3'));

}
