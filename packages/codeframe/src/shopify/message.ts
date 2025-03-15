import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';

/**
 * Better Details
 *
 * We will completely replace some error messages thrown by Shopify on
 * account that they simply don't provide good enough information.
 * This does not apply to all error, just a few and will likely extend
 * to more over time.
 */
export function better_details (errMsg: string) {

  let update: string = errMsg;

  for (const [ regex, change ] of <[RegExp, (errMsg: string) => string][]>[
    [ /- Valid syntax: (.*?)/i, valid_syntax ],
    [ /'(.*?)' is not a valid delimiter for/, invalid_delimiter ],
    [ /^For loops require an 'in' clause/, for_loops ],
    [ /Unexpected character (.*?) in "/, unexpected_character ],
    [ /was not properly terminated with regexp:/, terminated_with_regexp ],
    [ /\[:([a-z_]+), "(.+)"\] is not a valid expression/, valid_expression ]
  ]) {

    if (regex.test(update)) update = change(update);

  }

  return update;

};

/**
 * Improves and unexpected character when it spans multiple lines
 *
 *
 */
export function invalid_delimiter (errMsg: string) {

  const message = errMsg.match(/'(.*?)' is not a valid delimiter for ([a-z_]+) tags\. use ([a-z_]+)/i);

  if (message === null) return errMsg;

  return glue.ws(
    `Unterminated "${message[2]}" tag due to an "${message[1]}" tag name. This is not a valid ender,`,
    `you need to use: "${message[3]}"`
  );

}

/**
 * For loops requirement
 */
export function for_loops () {

  return 'The "for" loop tag requires an "in" clause operator be provided.';

}

/**
 * Improves and unexpected character when it spans multiple lines
 *
 *
 */
export function unexpected_character (errMsg: string) {

  const message = errMsg.match(/Unexpected character (\S+) in "([\S\s]*)/i);

  if (message === null) return errMsg;

  if (/\n/.test(message[2])) {
    return `Unexpected character occurrence "${message[1]}" detected`;
  }

  return `Unexpected character occurrence "${message[1]}" detected in "${message[2]}"`;

}

/**
 * Normalize the `was not properly terminated with regexp:` error message on delimiters.
 *
 * ```js
 * // Standard message example 1:
 * `Tag 'foo' was not properly terminated with regexp: /\}\}/`
 *
 * // Enhanced message example 1:
 * `Tag 'foo' was not properly terminated with closing delimiter token: }}`
 * // Enhanced message example 2:
 * `Tag 'foo' was not properly terminated with closing delimiter token: %}`
 * ```
 */
export function terminated_with_regexp (errMsg: string) {

  if (!/(regexp: )((?:\/\\}|\\}\/)|(?:\/\\\$|\\}\/))/.test(errMsg)) return errMsg;

  return errMsg
  .replace(/(')(.*?)(')/, '"$2"')
  .replace(/regexp: /, 'closing delimiter token: ')
  .replace(/[/\\]+/g, _.NIL);

}

/**
 * Unwrap the parenthesis of `(line 44):` to better align to header message
 *
 * ```js
 * // Standard message example:
 * `(line 50):`
 *
 * // Enhanced message example:
 * `on line 50`
 * ```
 */
export function line_number (errMsg: string) {

  if (!/\(line (\d+)\):/.test(errMsg)) return errMsg;

  return errMsg.replace(/\(line (\d+)\):/, 'on line $1');

}

/**
 * Improves syntax error messages like: `Syntax Error in 'for' - Valid syntax: for [item] in [collection]`
 *
 * ```js
 * // Standard message example:
 * `Syntax Error in 'for' - Valid syntax: for [item] in [collection]`
 *
 * // Enhanced message example:
 * `
 * An invalid or incomplete expression provided, typically resulting from
 * a missing operator or keyword. Example of valid syntax: {% for item in collection %}
 * `
 * ```
 */
export function valid_syntax (errMsg: string) {

  const inexp = /^in tag '([a-z_]+)(?:\s[a-z]+)?'/;
  const in_tag = errMsg.match(inexp);
  const prefix: string = in_tag !== null
    ? `Invalid "${in_tag[1]}" tag,`
    : 'An invalid or incomplete expression provided';

  const tag = errMsg.match(/- Valid syntax: (.*?)/i);

  if (tag === null) {
    return in_tag !== null ? errMsg.replace(inexp, prefix) : errMsg;
  }

  const example = errMsg.slice(errMsg.indexOf('- Valid syntax:') + 15).trim();

  const valid = example.replace(/[[\]]/g, '');

  return glue.ws(
    `${prefix} likely due to a missing operator or keyword.`,
    `Expected syntax: {% ${valid} %}`
  );

}

/**
 * Improves and normalizes the `[:name, "x"] is not a valid expression in {{ }}` error message
 *
 * ```js
 * // Standard message example:
 * `[:pipe, "|"] is not a valid expression in {{ | filter }}`
 *
 * // Enhanced message example:
 * `
 * Invalid "|" (pipe) placement detected in liquid expression. This is not a valid output tag: {{ | filter }}
 * `
 * ```
 */
export function valid_expression (errMsg: string) {

  const message = errMsg.match(/\[:([a-z_]+), "(.+)"\] is not a valid expression in "({{.*?}})"/i);

  if (message === null) return errMsg;

  return glue.ws(
    `Invalid "${_.bold(message[2])}" (${message[1].replace(/_/g, _.WSP)}) placement detected in liquid expression.`,
    `This is not a valid output tag: ${message[3]}`
  );

}
