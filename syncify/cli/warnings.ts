import type { Message } from 'esbuild';
import type { Warning } from 'postcss';
import type { LoggerWarnOptions } from 'sass-embedded';
import type { File } from '~file';

import { relative } from 'node:path';

import { readFileSync } from 'fs-extra';
import { LiteralUnion } from 'type-fest';

import * as _ from '@syncify/ansi';
import { codeframe } from '@syncify/codeframe';
import { glue } from '@syncify/glue';

import { stderr } from '~console';
import { forEach, has, isNumber, isObject, isUndefined, m, o, s } from '~utils';

import { $ } from '$';

export function warn (...message: string[]) { forEach(line => stderr.write(line), message); };

/**
 * Warning Store
 *
 * This object holds a reference to each option warning
 * to be printed. The `key` values infer the config option
 * and the values are the warning messages to be printed.
 *
 * Example:
 *
 * ```
 * │ (!) 2 group warnings
 * │
 * │ Some warning: 'option'
 * │ Some warning: 'option'
 * ```
 */
export const warnings: { [group: string]: string[] } = o();

/**
 * Severities Store
 *
 * This object holds a reference to each severe warnings
 * to be printed (or otherwise errors which do not throw).
 * The `key` values infer the config option and the values
 * are the warning messages to be printed.
 *
 * Example:
 *
 * ```
 * │ (!) 2 errors
 * │
 * │ Some error: 'option'
 * │ Some error: 'option'
 * ```
 */
export const severities: { [group: string]: string[] } = o();

/**
 * Option Warnings
 *
 * Records all config option warnings. Warnings are
 * printed to the console at the end of runtime cycle.
 * This function merely populates the `warning` object store.
 */
export function warnOption (group: string) {

  if (!has(group, warnings)) warnings[group] = [];

  return (message: string, value?: string) => {
    if (isUndefined(value)) {
      warnings[group].push(_.yellowBright(message));
    } else {
      warnings[group].push(_.yellowBright(message + _.COL + WSP + _.bold(value)));
    }
  };
};

/**
 * Error Warnings
 *
 * Prints a warning that requires attention but will not throw.
 * A warn error demands attention from the user.
 */
export function warnSevere (group: string) {

  if (!has(group, severities)) severities[group] = [];

  return (message: string, value?: string) => {
    if (isUndefined(value)) {
      severities[group].push(_.Tree.red + _.red(message));
    } else {
      severities[group].push(_.Tree.red + _.red(message + _.COL + WSP + _.bold(value)));
    }
  };
};

/**
 * Returns warning count total
 */
warn.count = () => {
  let total = 0;
  $.warnings.get($.log.uri).values().forEach(stack => total += stack.size);
  return total;
};

/**
 * Get Stack
 *
 * Generates or obtains a warning stack reference from the `$` state model.
 */
function messages (processor: string, uri: string) {

  if ($.warnings.has(uri)) {

    const file = $.warnings.get(uri);

    return file.has(processor)
      ? file.get(processor)
      : file.set(processor, s()).get(processor);

  }

  return $.warnings
  .set(uri, m([ [ processor, s() ] ]))
  .get(uri)
  .get(processor);

}

warn.schema = (file: File, options: {
  shared: string,
  schema: LiteralUnion<'settings' | 'blocks', string>
  message: string | string[],
  $ref: string
}) => {

  const stack = messages('Shared Schema', file.input);
  const tui = _.Create({ type: 'warning' })
  .Newline()
  .Wrap(options.message, _.yellowBright)
  .Newline()
  .Context({
    stack: false,
    type: 'warning',
    entries: {
      reference: options.$ref,
      schema: options.schema,
      section: file.relative,
      shared: options.shared
    }
  });

  stack.add(tui.toString());

};

/**
 * SASS Warnings Parser
 */
warn.sass = (file: File) => (message: string, options?: LoggerWarnOptions) => {

  const stack = messages('sass', file.input);
  const text = _.capture.url(message.replace(/\n+/g, WSP), text => _.underline(text));
  const tui = _.Create({ type: 'warning' }).Wrap(text, _.yellowBright);

  const location: {
    input?: string;
    source?: string;
    module?: string;
    processor?: string;
    line?: number;
    details?: string;
    column?: number;
  } = {};

  if (options && has('span', options)) {

    if (isObject(options.span)) {

      const { span } = options;
      const source = readFileSync(span.url.pathname, 'utf8');
      const frame = codeframe(source, {
        type: 'warning',
        start: {
          line: span.start.line + 1,
          column: span.start.column
        }
      });

      tui.Newline().Insert(frame);

      location.line = span.start.line + 1;
      location.column = span.start.column;
      location.input = _.TLD + file.relative;
      location.source = _.TLD + relative($.cwd, options.span.url.pathname);

      if (/\/node_modules\//.test(span.url.pathname)) {
        location.module = _.pink(span.url.pathname.match(/(?:.*?\/node_modules\/)((?:@[^/]+\/)?[^/]+)/)[1]);
      }

    } else {
      location.input = _.TLD + file.relative;
    }

  } else {
    location.input = _.TLD + file.relative;
  }

  location.processor = _.neonMagenta('SASS Dart');

  if (options && options.deprecation) {
    location.details = 'DEPRECATION WARNING';
  }

  tui
  .Newline()
  .Context({
    stack: false,
    type: 'warning',
    entries: {
      ...location,
      processor: _.neonMagenta('SASS Dart')
    }
  });

  const context = tui.toString({ trim: false });

  if (!stack.has(context)) stack.add(context);

};

/**
 * ESBuild Warning Parser
 */
warn.esbuild = (data: Message[]) => {

};

/**
 * PostCSS Warning Parser
 */
warn.postcss = (file: File, data: Warning) => {

  const stack = messages('postcss', file.input);

  /**
   * Code Sample Snippets
   *
   * This prints an equally space distributed table of
   * `key: value` records, typically used in errors.
   *
   * ```
   * │
   * │ 10:
   * │ 11: foo()
   * │ 12:
   * │
   * ```
   */
  function Sample (code: string, {
    line = _.Tree.line,
    span = null
  }: {
    line?: LiteralUnion<'red' | 'yellow', string>,
    span?: {
      start: number,
      end: number
    }
  } = {}) {

    if (line === 'red') {
      line = _.Tree.red;
    } else if (line === 'yellow') {
      line = _.Tree.yellow;
    }

    if (span !== null) {

      const end = has('end', span) ? span.end : span.start + 1;

      return line + NWL + glue.nl(
        line + _.blue(`${span.start - 1}`) + _.COL,
        line + _.blue(`${span.start}`) + _.COL + code,
        line + _.blue(`${end}`) + _.COL
      );

    }

    return line + NWL + line + code;

  }

  const output = glue(
    Sample(
      data.node.toString(), {
        line: 'yellow',
        span: isNumber(data.endLine) ? {
          start: data.line,
          end: data.endLine
        } : {
          start: data.line,
          end: data.endLine
        }
      }
    )
    ,
    _.Context({
      stack: false,
      entries: {
        column: data.column,
        file: file.relative,
        plugin: data.plugin
      }
    })
  );

  if (!stack.has(output)) {
    stack.add(output);
  }

};
