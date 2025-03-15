/**
 * RegExp to test for newlines in terminal.
 */
export const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;

/**
 * RegExp to test for the three types of brackets.
 */
export const BRACKET = /^[()[\]{}]$/;

/**
 * RegExp to test for what seems to be a JSX tag name.
 */
export const JSX_TAG = /^[a-z][\w-]*$/i;

/**
 * The line number expression, eg: `(line 25):`
 */
export const LINE_EXP = /\(line \d+\):/;

/**
 * Names that are always allowed as identifiers, but also appear as keywords
 * within certain syntactic productions.
 *
 * https://tc39.es/ecma262/#sec-keywords-and-reserved-words
 *
 * `target` has been omitted since it is very likely going to be a false
 * positive.
 */
export const sometimes = new Set([
  'as',
  'async',
  'from',
  'get',
  'of',
  'set'
]);

export const reserved = new Set([
  'implements',
  'interface',
  'let',
  'package',
  'private',
  'protected',
  'public',
  'static',
  'yield'
]);

export const keywords = new Set([
  'console',
  'break',
  'constructor',
  'case',
  'catch',
  'continue',
  'debugger',
  'default',
  'do',
  'else',
  'finally',
  'for',
  'function',
  'if',
  'return',
  'switch',
  'throw',
  'try',
  'var',
  'const',
  'while',
  'with',
  'new',
  'this',
  'super',
  'class',
  'extends',
  'export',
  'import',
  'null',
  'true',
  'false',
  'in',
  'instanceof',
  'typeof',
  'void',
  'delete'
]);
