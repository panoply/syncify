import { yellow, white, cyan, underline, magenta, grey } from 'kleur';

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

  return text.replace(RegExpQuotes, white('$1'));

}

/**
 * URL Parse
 *
 * Replaces URL occurances
 */
export function urls (text: string) {

  return text.replace(RegExpURLs, underline('$1'));

}

/**
 * String Parse
 *
 * Replaces all occurances of a value wrapped
 * in quotation characters, including the quotes.
 */
export function string (text: string) {

  return text.replace(RegExpString, yellow('$1'));

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
    .replace(RegExpLineNo, white('$1') + grey('$2') + '\n\n')
    .replace(RegExpString, yellow('$1'))
    .replace(RegExpLiquid, cyan('$1') + magenta('$2') + cyan('$3'))
    .replace(RegExpURLs, underline('$1'))
    .replace(RegExpObjectTag, white('$1') + grey('$2') + white('$3'))
    .replace(RegExpRegex, magenta('$1') + cyan('$2') + magenta('$3'));

}
