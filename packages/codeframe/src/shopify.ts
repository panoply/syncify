/* eslint-disable no-unused-vars */
import type { FrameOptions, Options } from './index.d';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';

import { LINE_EXP } from './const';
import { getErrorLocation } from './shopify/errors';
import { better_details, line_number } from './shopify/message';

import { codeframe } from '.';

export interface ShopifyCodeframe {
  /**
   * Line Number detected within response
   *
   * @default NaN
   */
  line: number;
  /**
   * Column number
   *
   * @default NaN
   */
  column: number;
  /**
   * This is summary of the error, typically it will be something like:
   *
   * ```js
   * 'Liquid syntax error on line 21'
   * ```
   */
  summary: string;
 /**
   * This will be any additional information that is proceeded by a
   * `/\(line \d+\):/` capture. Anything **after** `:` will be included
   * in this value. Typically something like:
   *
   * ```js
   * "Variable '{{ 'base.min.css' }' was not properly terminated with regexp: /\}\}/"
   * ```
   */
  details: string;
  /**
   * This is the error message with applied ansi. Itis a combination of `summary` and `details`.
   * The `summary` will appear first, followed 2 newlines, then `details`, e.g:
   *
   * ```
   * │  Liquid syntax error on line 21
   * │
   * │  Variable '{{ 'base.min.css' }' was not properly terminated with regexp: /\}\}/
   * ```
   */
  message: string;
  /**
   * This is the codeframe that has been generated based on the error message.
   * and the file input which was provided.
   *
   * ```
   * │    10 │ <div class="fooo">
   * │    11 │   <ul>
   * │  ➤ 12 │     {% unknown 'tag' %}
   * │     ✕ │        ^^^^^^^
   * ```
   */
  frame: string;
  /**
   * Whether or not codeframe was created.
   */
  hasFrame: boolean
}

/**
 * Shopify Syntax Highlighting
 *
 * Parses and applies some normalization to response messages by applying colours.
 */
function highlight (string: string) {

  return _.capture.stream(string)(
    value => _.capture(/(<\/?|>)/g, value, _.gray),
    value => _.capture.quoted(value, _.bold),
    value => _.capture.colons(value, _.gray),
    value => _.capture.pipes(value, _.gray),
    value => _.capture.url(value, _.gray),
    value => value.replace(/(?<=Filename\s)([\w._-]+)(?=\salready)/, _.neonCyan.bold('$1')),
    value => value.replace(/({[{%]-?)([\s\S]*?)(-?%}})/g, (_m, open, inner, close) => {

      const token = _.capture.stream(_.strip(inner))(
        value => _.capture.quoted(value, _.magentaBright),
        value => _.capture.colons(value, _.gray),
        value => _.capture.pipes(value, _.gray),
        value => value.replace(/(?<=\s)(=|==|!=|>=|>|<|<=|in)(?=\s)/g, _.blueBright('$1')),
        value => value.replace(/^\s*([a-z]+)(?=\s)/g, _.WSP + _.neonTeal('$1')),
        value => _.capture(/(\d+)/g, value, _.pink)
      );

      return _.capture.dash(_.neonCyan(open), _.gray) + token + _.capture.dash(_.neonCyan(close), _.gray);

    })
  );
};

export enum Syntax {

  missing_required_tag = 'Missing %{tag} in the %{location} section of the template',

  json_template_unknown_key = "unknown key '%{property}'",
  json_template_must_be_object = '%{property}: must be an object',
  json_template_missing_type = "Section id '%{property}' is missing a type field",
  json_template_does_not_refer = "Section type '%{value}' does not refer to an existing section file",
  json_template_must_exist_in_order = "Section id '%{property}' must exist in order",
  json_template_must_exist_in_sections = "Section id '%{property}' must exist in sections",

  // ADDITIONAL
  //
  expected_found = 'Expected [:end_of_string] but found %{something} in "%{token}"',
  invalid_expression = '[:end_of_string] is not a valid expression in "%{token}',
  invalid_range_expression = 'Invalid expression type \'#{invalid_expr}\' in range expression',

  // UNEXPECTED CHARACTER
  //
  unexpected_character_equals = 'Liquid syntax error (line 4): Unexpected character = in "__CODE__',

  // SCHEMA TAGS
  //
  invalid_schema_attribute = "Invalid schema: '%{property}' is not a valid attribute",
  invalid_schema_type = "Invalid tag 'schema': must be an object",
  invalid_block_type = "Invalid block '%{property}': type is required",
  invalid_setting_type = 'Invalid Schema: setting type is required',

  // KNOWN AS PER
  // https://github.com/Shopify/liquid/blob/03aafa974c2ace05605be5ce8cb732e92e4ca94d/lib/liquid/locales/en.yml
  //
  tag_unexpected_args = "Syntax Error in '%{tag}' - Valid syntax: %{tag}",
  assign = "Syntax Error in 'assign' - Valid syntax: assign [var] = [source]",
  capture = "Syntax Error in 'capture' - Valid syntax: capture [var]",
  case = "Syntax Error in 'case' - Valid syntax: case [condition]",
  case_invalid_when = "Syntax Error in tag 'case' - Valid when condition: {% when [condition] [or condition2...] %}",
  case_invalid_else = "Syntax Error in tag 'case' - Valid else condition: {% else %} (no parameters) ",
  cycle = "Syntax Error in 'cycle' - Valid syntax: cycle [name :] var [, var2, var3 ...]",
  for = "Syntax Error in 'for loop' - Valid syntax: for [item] in [collection]",
  for_invalid_in = "For loops require an 'in' clause",
  for_invalid_attribute = 'Invalid attribute in for loop. Valid attributes are limit and offset',
  if = "Syntax Error in tag 'if' - Valid syntax: if [expression]",
  include = "Error in tag 'include' - Valid syntax: include '[template]' (with|for) [object|collection]",
  inline_comment_invalid = "Syntax error in tag '#' - Each line of comments must be prefixed by the '#' character",
  invalid_delimiter = "'%{tag}' is not a valid delimiter for %{block_name} tags. use %{block_delimiter}",
  invalid_template_encoding = 'Invalid template encoding',
  render = "Syntax error in tag 'render' - Template name must be a quoted string",
  table_row = "Syntax Error in 'table_row loop' - Valid syntax: table_row [item] in [collection] cols=3",
  tag_never_closed = "'%{block_name}' tag was never closed",
  tag_termination = "Tag '%{token}' was not properly terminated with regexp: %{tag_end}",
  unexpected_else = "%{block_name} tag does not expect 'else' tag",
  unexpected_outer_tag = "Unexpected outer '%{tag}' tag",
  unknown_tag = "Unknown tag '%{tag}'",
  variable_termination = "Variable '%{token}' was not properly terminated with regexp: %{tag_end}"
}

/**
 * Extraction
 *
 * We will perform some analysis on the error message itself and
 * separate certain phrases. This will be used in our result.
 */
function extract (lead: string, text: string): {
  /**
   * The error summary, the initial first line:
   *
   * ```
   * Liquid syntax error (line 21)
   * ```
   */
  summary: string;
  /**
   * The error details, the rest of the message, separated by newline
   *
   * ```
   * Variable '{{ 'base.min.css' }' was not properly terminated with regexp: /\}\}
   * ```
   */
  details: string;
  /**
   * The error message, which is summary + details combined:
   *
   * ```
   * Liquid syntax error (line 21)
   * Variable '{{ 'base.min.css' }' was not properly terminated with regexp: /\}\}
   * ```
   */
  message: string;
} {

  let details = _.NIL;
  let summary = _.NIL;
  let message = _.NIL;

  const valid = text.indexOf('- Valid syntax:');

  if (valid > -1) {

    // The text leading upto the Summary point
    summary = line_number(lead.replace(/(Syntax Error)/, 'Syntax error'));
    details = better_details(text.trim());

    // The ansi applied message combining summary and details
    message = glue(
      _.bold(summary),
      _.COL,
      _.NLR,
      _.capture.stream(details)(value => _.capture.colons(value, _.gray))
    );

  } else {

    summary = line_number(lead);
    details = better_details(text.trim());
    message = glue(
      _.bold(summary),
      _.COL,
      _.NLR,
      details
    );

  }

  return {
    summary,
    details,
    message
  };
};

/**
 * Parses Shopify errors and generates a codeframe from the provided
 * input structure. Extends the basic error messaging for more human
 * readable output.
 */
export function shopify (source: string, errMsg: any, opts: FrameOptions = {}): ShopifyCodeframe {

  const options = <Options>{
    type: 'error',
    language: 'liquid',
    highlight: true,
    linesAbove: 2,
    linesBelow: 2,
    ...opts
  };

  const context = <ShopifyCodeframe>{};

  if (LINE_EXP.test(errMsg)) {

    // We will slice to the known number in the error message
    // and add 6 to reach point just before integer, for example
    // where ^ represents index: (line ^24):
    //
    const lineNoIndex = errMsg.indexOf('(line') + 6;

    // Next, we obtain index of the ending location of line number
    // occurence found within the error message, for example
    // where
    //
    const lineNoEnder = errMsg.indexOf('):');

    // Lets obtain the line number for stack references
    // + 6 characters to skip over the `(line ` portion
    //
    const lineInteger = Number(errMsg.slice(lineNoIndex, lineNoEnder));

    // Lets assign the last portion index of the line num
    // Where ^ indicates the index position: line 30):^
    //
    const lineNoSlice = lineNoEnder + 2;

    // Extract the error details. This constitutes the portion
    // of text after line 60):^
    //
    // This is the original text, before augmentating. This information
    // is used for obtaining error location.
    //
    const lineDetails = errMsg.slice(lineNoSlice);

    // Lets re-align the text variable by removing the above
    // portion we have already pushed onto the code frame response.
    //
    // This sequence might include a name reference, from which we
    // can obtain column number.
    //
    const {
      summary,
      details,
      message
    } = extract(errMsg.slice(0, lineNoSlice), errMsg.slice(lineNoSlice));

    // We can safely assign contexts
    //
    context.line = lineInteger;
    context.summary = summary;
    context.details = details;
    context.message = _.Wrap(highlight(message), { color: _.redBright });

    // This next operation will attempt to locate
    // the error in the file source by parsing the
    // error message and looking for hints of error location.
    // It will compose a range that will be passed to the
    // codeframe generator if successful.
    //
    const location = getErrorLocation(source, lineDetails, lineInteger);

    if (location !== null) {

      context.hasFrame = true;
      context.column = location.range.start.column;
      context.frame = codeframe(source, {
        start: location.range.start,
        language: 'liquid',
        end: location.range.ender,
        ...options
      });

    } else {
      context.hasFrame = false;
      context.column = 0;
      context.frame = null;
    }

  } else {

    context.hasFrame = false;
    context.summary = _.NIL;
    context.details = _.NIL;
    context.message = _.Wrap(errMsg, { color: _.redBright, line: _.Tree.red }) + _.NWL;
    context.line = NaN;
    context.column = NaN;
    context.frame = null;

  }

  return context;

};
