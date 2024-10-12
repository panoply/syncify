import type { File } from 'types';
import type { Warning } from 'postcss';
import type { SourceSpan } from 'sass';
import type { Message } from 'esbuild';
import { log, warn } from 'syncify:native';
import { glueString, isNumber, plural, has, isUndefined } from 'syncify:utils';
import { Sample } from 'syncify:interpolate';
import * as c from '@syncify/ansi';
import { $ } from 'syncify:state';
import { LiteralUnion } from 'type-fest';

/**
 * Get Stack
 *
 * Generates or obtains a warning stack reference from the `$` state model.
 */
function getStack (processor: string, uri: string) {

  if ($.warnings.has(uri)) {

    const file = $.warnings.get(uri);

    if (file.has(processor)) {
      return file.get(processor);
    }

    return file.set(processor, new Set()).get(processor);

  }

  return $.warnings
  .set(uri, new Map([ [ processor, new Set() ] ]))
  .get(uri)
  .get(processor);

}

export function schema (file: File, options: {
  shared: string,
  schema: LiteralUnion<'settings' | 'blocks', string>
  message: string | string[],
  $ref: string
}) {

  const stack = getStack('Shared Schema', file.input);
  const output = c.Create({ type: 'warning' })
  .NL
  .Wrap(options.message, c.yellowBright)
  .NL
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

  stack.add(output.toString());
}

/**
 * SASS Warnings
 */
export const sass = (file: File) => (message: string, options: {
  deprecation: boolean;
  span?: SourceSpan;
  stack?: string;
}) => {

  const stack = getStack('sass', file.input);
  const output = c.Create({ type: 'warning' }).NL.Wrap(message, c.yellowBright);

  if (has('span', options)) {

    if (isUndefined(options.span)) return;

    const { span } = options;
    const code = has('context', span) ? span.context : span.text;

    const content = code.slice(span.start.offset, span.end.offset);
    const lines = content.split(NWL);

    if (lines.length < 15) {

      const space = c.sanitize(span.end.line).length;

      let from = span.start.line + 1;

      for (const line of lines) {
        const number = c.sanitize(from++);
        const same = space - number.length;
        const align = same === 0 ? NIL : WSP.repeat(same);
        output.Trim(`   ${align + c.blue(number)} ${c.Tree.trim} ${line}`);
      }

    }

  }

  const context = output
  .NL
  .Wrap(options.stack, c.yellowBright)
  .NL
  .Context({
    stack: false,
    entries: {
      source: file.relative,
      deprecated: options.deprecation ? 'Yes' : 'No'
    }
  }).toString();

  if (!stack.has(context)) stack.add(context);

  if (!$.mode.build) {

    log(
      c.LineYellow(
        c.yellowBright(
          c.Prefix(
            'warning'
            , glueString(c.sanitize(stack.size), plural('warning', stack.size))
          ) + c.Suffix.warning
        )
      )
    );

  }
};

/**
 * ESBuild Warning Parser
 */
export function esbuild (data: Message[]) {

}

/**
 * PostCSS Warning Parser
 *
 * Pretty formatted log for postcss stack.
 */
export function postcss (file: File, data: Warning) {

  const stack = getStack('postcss', file.input);

  const output = c.glue(
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
    c.Context(
      {
        stack: false,
        entries: {
          column: data.column,
          file: file.relative,
          plugin: data.plugin
        }
      }
    )
  );

  if (!stack.has(output)) {
    stack.add(output);
    warn(output);
  }

};
