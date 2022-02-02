
/**
 * Liquid Extension
 */
export const LiquidExt = /\.liquid/;

/**
 * JSON Extension
 */
export const JsonExt = /\.json/;

/**
 * Stylesheet Extensions
 */
export const StyleExt = /\.(?:css|scss|sass)/;

/**
 * HTML Style attribute
 */
export const StyleAttribute = /(?<=\bstyle\b=["']\s?)[\s\S]*?(?="[\s\n>]?)/;

/**
 * Liquid Delimiter
 */
export const LiquidDelimiter = /{[{%]/g;

/**
 * Liquid Comments
 */
export const LiquidComments = /{%-?\s*comment\s*-?%}[\s\S]*?{%-?\s*endcomment\s*-?%}/g;

/**
 * Liquid Schema Tag
 */
export const LiquidSchemaTag = /(?<={%-?\s{0,}schema\s{0,}-?%})[\s\S]*?(?={%-?\s{0,}endschema\s{0,}-?%})/;

/**
 * Liquid Useless Whitespace Dashes
 */
export const UselessDashes = /(?<=\S){[{%]-|-?[%}]}{[{%]-?|-}[%}]<\/?(?=[a-zA-Z]{1,})/g;

/**
 * HTML Attribute Values
 */
export const HTMLAttributeValues = /(?<==["])[\s\S]*?(?=["][a-zA-Z\s\n/{>])/g;
