import type { Languages } from './index.d';
import type { JSXToken, Token } from 'js-tokens';

import jsTokens from 'js-tokens';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';

import { BRACKET, keywords, NEWLINE, reserved, sometimes } from './const';

type InternalTokenType = (
  | 'keyword'
  | 'capitalized'
  | 'jsx_identifier'
  | 'jsx_attribute'
  | 'jsx_element'
  | 'liquid_open'
  | 'liquid_close'
  | 'punctuator'
  | 'number'
  | 'string'
  | 'regex'
  | 'comment'
  | 'invalid'
  | 'uncolored'
);

/**
 * Checks if word is a reserved word in non-binding strict mode
 *
 * Includes non-strict reserved words
 */
export function isStrict (word: string, inModule: boolean): boolean {

  return ((inModule && word === 'await') || word === 'enum') || reserved.has(word);

}

/**
   * Get the type of token, specifying punctuator type.
   */
const getTokenType = function (token: Token & { type: string; value: string } | JSXToken): InternalTokenType {

  if (token.type === 'IdentifierName') {

    if (keywords.has(token.value) || isStrict(token.value, true) || sometimes.has(token.value)) return 'keyword';
    if (token.value[0] !== token.value[0].toLowerCase()) return 'capitalized';

  }

  if (token.type === 'Punctuator' && BRACKET.test(token.value)) return 'uncolored';
  if (token.type === 'Invalid' && token.value === '@') return 'punctuator';

  switch (token.type) {
    case 'NumericLiteral':
      return 'number';
    case 'StringLiteral':
    case 'JSXString':
    case 'NoSubstitutionTemplate':
      return 'string';
    case 'RegularExpressionLiteral':
      return 'regex';
    case 'Punctuator':
    case 'JSXPunctuator':
      return 'punctuator';
    case 'MultiLineComment':
    case 'SingleLineComment':
      return 'comment';
    case 'Invalid':
    case 'JSXInvalid':
      return 'invalid';
    case 'JSXIdentifier':
      return 'jsx_identifier';
    default:
      return 'uncolored';
  }
};

/**
   * Turn a string of JS into an array of objects.
   */
function tokenize (text: string): Array<{ type: string; value: string; }> {

  const tokens = Array.from(jsTokens(text, { jsx: true }));
  const syntax: Array<{ type: string; value: string }> = [];
  const tags = new Set();

  let p: number = 0;

  let inLiquid = false;

  for (let i = 0, s = tokens.length; i < s; i++) {

    const token = tokens[i];

    if (token.type === 'RegularExpressionLiteral' && tags.has(token.value)) {

      const punctuator = token.value[0];
      const tagName = token.value.slice(1, -1);
      const closer = token.value[token.value.length - 1];
      syntax.push({ type: 'punctuator', value: punctuator });
      syntax.push({ type: 'jsx_element', value: tagName });
      syntax.push({ type: 'punctuator', value: closer });

    } else if (token.type === 'TemplateHead') {

      syntax.push({ type: 'string', value: token.value.slice(0, -2) });
      syntax.push({ type: 'punctuator', value: '${' });

    } else if (token.type === 'TemplateMiddle') {

      syntax.push({ type: 'punctuator', value: '}' });
      syntax.push({ type: 'string', value: token.value.slice(1, -2) });
      syntax.push({ type: 'punctuator', value: '${' });

    } else if (token.type === 'TemplateTail') {

      syntax.push({ type: 'punctuator', value: '}' });
      syntax.push({ type: 'string', value: token.value.slice(1) });

    } else if (inLiquid) {

      if ((token.value === '}' || token.value === '%') && tokens[i + 1].value === '}') {

        inLiquid = false;
        syntax.push({ type: 'liquid', value: token.value });
        syntax.push({ type: 'liquid', value: tokens[i + 1].value });

        i = i + 1;

      } else {

        syntax.push({ type: 'liquid', value: token.value });
      }

    } else if (token.type === 'JSXIdentifier') {

      if (tokens[i - 1].value === '<') {

        syntax.push({ type: 'jsx_element', value: token.value });
        tags.add(`/${token.value}>`);

      } else if (i >= 2 && tokens[i - 2].value === '<' && tokens[i - 1].value === '/') {

        syntax.push({ type: 'jsx_element', value: token.value });

      } else {

        syntax.push({ type: getTokenType(token), value: token.value });

      }

    } else if (token.value === '{' && (tokens[i + 1].value === '{' || tokens[i + 1].value === '%')) {

      inLiquid = true;

      syntax.push({ type: 'liquid', value: '{' });
      syntax.push({ type: 'liquid', value: tokens[i + 1].value });

      i = i + 1;

    } else if (
      s >= i + 2 &&
      token.type === 'Punctuator' &&
      token.value === '.' &&
      tokens[i + 1].type === 'IdentifierName' &&
      tokens[i + 2].type === 'Punctuator' &&
      tokens[i + 2].value === '('
    ) {

      syntax.push(
        { type: 'punctuator', value: token.value },
        { type: 'function', value: tokens[i + 1].value },
        { type: 'punctuator', value: '(' }
      );

      p = p + 1;
      i = i + 2;

    } else if (token.type === 'Punctuator' && token.value === ')' && p > 0) {

      p = p - 1;
      syntax.push({ type: 'punctuator', value: token.value });

    } else {

      syntax.push({ type: getTokenType(token), value: token.value });

    }

  }

  return syntax;

};

export function highlight (text: string, language: Languages) {

  if (text === '') return '';

  const defs = colors(language);
  const tokens = tokenize(text);
  let highlighted = '';

  for (const { type, value } of tokens) {
    if (type in defs) {
      highlighted += glue.nl(value.split(NEWLINE).map(defs[type]));
    } else {
      highlighted += value;
    }
  }

  return highlighted;
}

export function colors (language?: Languages) {

  return language === 'json' ? {
    keyword: _.neonCyan,
    capitalized: _.greenBright,
    liquid_open: _.gray,
    liquid_close: _.gray,
    jsx_element: _.neonRouge,
    jsx_attribute: _.pink,
    jsx_identifier: _.teal,
    punctuator: _.neonRouge,
    function: _.greenBright,
    number: _.yellowBright,
    string: _.neonCyan,
    regex: _.neonTeal,
    comment: _.gray,
    invalid: _.red.bold,
    reset: _.reset
  } : {
    keyword: _.neonCyan,
    capitalized: _.greenBright,
    liquid_open: _.gray,
    liquid_close: _.gray,
    jsx_element: _.neonRouge,
    jsx_attribute: _.pink,
    jsx_identifier: _.teal,
    punctuator: language === 'markup' ? _.lavender : _.gray,
    function: _.greenBright,
    number: _.neonMagenta,
    string: _.yellowBright,
    regex: _.neonTeal,
    comment: _.gray,
    invalid: _.red.bold,
    reset: _.reset
  };

}
