import * as c from 'colorette';

type Colors = (
  | 'dim'
  | 'red'
  | 'redBright'
  | 'green'
  | 'greenBright'
  | 'yellow'
  | 'yellowBright'
  | 'blue'
  | 'blueBright'
  | 'magenta'
  | 'magentaBright'
  | 'cyan'
  | 'cyanBright'
  | 'white'
  | 'gray'
)

/* -------------------------------------------- */
/* SHOPIFY RESPONSES                            */
/* -------------------------------------------- */

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
export function quotes (text: string, color: Colors) {

  return text.replace(RegExpQuotes, c[color]('$1'));

}

/**
 * URL Parse
 *
 * Replaces URL occurances
 */
export function urls (text: string, color: Colors) {

  return text.replace(RegExpURLs, c[color]('$1'));

}

/**
 * String Parse
 *
 * Replaces all occurances of a value wrapped
 * in quotation characters, including the quotes.
 */
export function string (text: string, color: Colors) {

  return text.replace(RegExpString, c[color]('$1'));

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

  if (Array.isArray(message)) return message.map(pretty).join('\n    ');

  return message
    .replace(RegExpLineNo, c.whiteBright('$1') + c.dim('$2') + '\n\n   ')
    .replace(RegExpString, c.yellowBright('$1'))
    .replace(RegExpLiquid, c.cyan('$1') + c.magentaBright('$2') + c.cyan('$3'))
    .replace(RegExpURLs, c.underline('$1'))
    .replace(RegExpObjectTag, c.white('$1') + c.gray('$2') + c.white('$3'))
    .replace(RegExpRegex, c.magentaBright('$1') + c.cyan('$2') + c.magentaBright('$3'));

}
