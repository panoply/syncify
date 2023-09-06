import type { File } from 'types';
import type { Warning } from 'postcss';
import type { SourceSpan } from 'sass';
import type { Message } from 'esbuild';
import { has } from 'rambdax';
import { log, warn } from '~native';
import { isNumber, plural } from '~utils';
import { tui, c } from '~log';

/**
 * Error stacks, maintains a store of log messages
 */
export const warnings: { [file: string]: Map<string, Set<string>> } = {};

/**
 * File Write Errors
 *
 * Typically used in the `catch` callback of async
 * `writeFile` functions
 */
export const sass = (file: File) => (message: string, options: {
  deprecation: boolean;
  span?: SourceSpan;
  stack?: string;
}) => {

  let output: string = NIL;

  if (!has(file.input, warnings)) {
    warnings[file.input] = new Map([ [ 'sass', new Set() ] ]);
  } else {
    if (!warnings[file.input].has('sass')) {
      warnings[file.input].set('sass', new Set());
    }
  }

  const cache = warnings[file.input].get('sass');

  output += tui.indent(message, {
    nwl: true,
    line: c.line.yellow,
    text: c.yellowBright.bold
  });

  if (has('span', options)) {

    const span = has('start', options.span) && has('end', options.span) ? {
      start: options.span.start.line,
      end: options.span.end.line
    } : null;

    const code = has('context', options.span)
      ? options.span.context
      : has('text', options.span)
        ? options.span.text
        : null;

    if (code !== null) {
      if (span !== null) {
        output += tui.sample(code, {
          line: c.line.yellow,
          span
        });
      } else {
        output += tui.sample(code);
      }
    }
  }

  output += tui.context({
    stack: options.stack,
    entries: {
      file: file.relative,
      deprecated: options.deprecation ? 'Yes' : 'No'
    }
  });

  if (!cache.has(output)) {
    cache.add(output);
    log(tui.suffix('yellowBright', 'warning', `${cache.size} ${plural('warning', cache.size) + c.warning}`));
  } else {
    log(tui.suffix('yellowBright', 'warning', `${cache.size} ${plural('warning', cache.size) + c.warning}`));
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
 * Pretty formatted log for postcss warnings.
 */
export function postcss (file: File, data: Warning) {

  let output: string = NIL;

  if (!has(file.input, warnings)) {
    warnings[file.input] = new Map([ [ 'postcss', new Set() ] ]);
  } else {
    if (!warnings[file.input].has('postcss')) {
      warnings[file.input].set('postcss', new Set());
    }
  }

  const cache = warnings[file.input].get('postcss');

  output += tui.sample(data.node.toString(), {
    line: c.line.yellow,
    span: isNumber(data.endLine) ? {
      start: data.line,
      end: data.endLine
    } : {
      start: data.line,
      end: data.endLine
    }
  });

  output += tui.context({
    stack: false,
    entries: {
      column: data.column,
      file: file.relative,
      plugin: data.plugin
    }
  });

  if (!cache.has(output)) {
    cache.add(output);
    warn(output);
  }

};
