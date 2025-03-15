import { NIL } from './characters';
import { strip } from './colors';
import { detect } from './helpers';

interface Captures {
 /**
 * Main function from which all methods will extend
 *
 * Accepts a Regular expression, excludes all ANSI occurences when matching.
 */
 (regex: RegExp, input: string, fn: (capture: string) => string): string;
 /**
  * Stream capture replacements
  *
  * @example
  *
  * const updated = capture.stream(string)(
  *   value => capture.quoted(value, bold),
  *   value => capture.braces(value, bold),
  *   value => capture.brackets(value, bold),
  *   value => value.replace('example', 'xxx'),
  * )
  */
 stream: (input: string) => (...replacers: Array<((match: string) => string)>) => string;
  /**
   * Greedy match of `[|$\[]{}<>:-]`
   */
  punctuation(input: string, fn: (match: string) => string): string;
  /**
   * Greedy match of `"*"` and `'*'`
   */
  quoted(input: string, fn: (match: string) => string): string;
  /**
   * Greedy match of `{` and `}`
   */
  braces(input: string, fn: (match: string) => string): string;
  /**
   * Greedy match of `[` and `]`
   */
  brackets(input: string, fn: (match: string) => string): string;
  /**
   * Greedy match of `<` and `>`
   */
  angles(input: string, fn: (match: string) => string): string;
  /**
   * Greedy match of `\d`
   */
  numbers(input: string, fn: (match: string) => string): string;
  /**
   * Greedy match of `|`
   */
  pipes(input: string, fn: (match: string) => string): string;
  /**
   * Greedy match of `-`
   */
  dash(input: string, fn: (match: string) => string): string;
  /**
   * Greedy match of `:`
   */
  colons(input: string, fn: (match: string) => string): string;
  /**
   * Greedy match of `,`
   */
  commas(input: string, fn: (match: string) => string): string;
  /**
   * Matches a URL like word pattern, stripping ansi occurences inside to match
   */
  url(input: string, fn: (match: string) => string): string;
  /**
   * Greedy match of `$`
   */
  dollar(input: string, fn: (match: string) => string): string;
}

export const capture: Captures = function (regex: RegExp, input: string, fn: (capture: string) => string) {

  return detect(input) ? input.replace(/(?:\u001b\[[;\d]+m)([\s\S]*?)(?=\u001b)/g, function (match, group) {
    const escape = group.trim().replace(/([^a-z0-9\s]+)/g, '\\$1');
    const regexp = new RegExp(`(${escape})`, 'g');
    return match.replace(regexp, text => text === NIL ? text : text.replace(regex, fn('$1')));
  }) : input.replace(regex, fn('$1'));

};

/**
 * Stream capture replacements
 *
 * @example
 *
 * const updated = capture.stream(string)(
 *   value => capture.quoted(value, bold),
 *   value => capture.braces(value, bold),
 *   value => capture.brackets(value, bold),
 *   value => value.replace('example', 'xxx'),
 * )
 */
capture.stream = (input: string) => (...replacers: Array<((match: string) => string)>) => {

  let output: string = input;

  for (const callback of replacers) {
    output = callback(output);
  }

  return output;

};

capture.quoted = (input: string, fn: (match: string) => string) => {

  return capture.stream(input)(
    value => value.replace(/\B'(?:(?!'\B).)+'/g, fn),
    value => value.replace(/\B"(?:(?!"\B).)+"/g, fn)
  );

};

capture.url = (input: string, fn: (capture: string) => string) => {

  return input.replace(/(https?:\/\/[^\s]+|www\.[^\s]+)/g, match => {
    const url = strip('$1');
    return /^(https?:\/\/|www\.)[./:0-9A-Za-z-]+$/.test(url) ? fn(url) : match;
  });

};

capture.punctuation = (input: string, fn: (capture: string) => string) => capture(/([|$[\]{}<>:-]+)/, input, fn);

capture.numbers = (input: string, fn: (capture: string) => string) => capture(/([\d]+)/g, input, fn);

capture.braces = (input: string, fn: (capture: string) => string) => input.replace(/[{}]+/g, m => fn(m));

capture.angles = (input: string, fn: (capture: string) => string) => input.replace(/[<>]+/g, m => fn(m));

capture.brackets = (input: string, fn: (capture: string) => string) => capture(/([[\]]+)/g, input, fn);

capture.pipes = (input: string, fn: (capture: string) => string) => input.replace(/[|]+/g, m => fn(m));

capture.colons = (input: string, fn: (capture: string) => string) => input.replace(/[:]+/g, m => fn(m));

capture.dash = (input: string, fn: (capture: string) => string) => input.replace(/[-]+/g, m => fn(m));

capture.commas = (input: string, fn: (capture: string) => string) => input.replace(/[,]+/g, m => fn(m));

capture.dollar = (input: string, fn: (capture: string) => string) => input.replace(/[$]+/g, m => fn(m));
