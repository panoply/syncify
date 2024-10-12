import type { File, RequestError } from 'types';
import type { AxiosResponse } from 'axios';
import type { Exception } from 'sass';
import type { CssSyntaxError } from 'postcss';
import type { Message } from 'esbuild';
import type { JSONError } from 'parse-json';
import { hasPath } from 'rambdax';
import { SHOPIFY_REQUEST_ERRORS } from 'syncify:const';
import { assign, error } from 'syncify:native';
import { getChunk, detect, object, has } from 'syncify:utils';
import { Context, Format } from 'syncify:interpolate';
import { update } from 'syncify:log';
import * as codeframe from 'syncify:cli/codeframe';
import * as c from '@syncify/ansi';
import { $ } from 'syncify:state';

/**
 * Spawned Logging
 *
 * Logging interface for spawned running operations. This
 * function will normalize the output and keep it aligned
 * with the TUI.
 *
 * ```
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * ```
 */
export function spawn (this: { name: string; }, data: string) {

  // let stdout: string[];
  // let stderr: string;

  // const stackerr = data.search(/(?:\n? {4}at .*)+/);
  // const err: string[] = [];

  // if (stackerr > -1) {

  //   stdout = data.slice(0, stackerr + 1).split(NWL);
  //   stderr = data.slice(stackerr);

  //   const stack = cleanStack(data.slice(stackerr), {
  //     pretty: true,
  //     basePath: $.cwd
  //   });

  //   const lines = wrap(stack, $.terminal.wrap).split(NWL);

  //   while (lines.length !== 0) {
  //     let line = lines.shift();

  //     if (line.trim().length > 0) {
  //       line = strip(line);
  //       err.push(Tree.red + gray(line));
  //     }
  //   }

  // } else {
  //   stdout = data.split(NWL);
  // }

  const newlines = data.split(NWL).reduce((acc, line) => {

    const ansi = detect(line);

    let before: string = NIL;
    let after: string = NIL;

    if (ansi !== false) {

      if (ansi.length > 2) {

        const chunk = getChunk(ansi, ansi.length / 2);

        before = c.glue(chunk[0]);
        after = c.glue(chunk[1] || NIL);

      } else {

        before = ansi[0];
        after = ansi[1] || NIL;

      }
    }

    const clean = line.trim().replace(new RegExp($.cwd, 'g'), '');

    if (clean.length === 0) {

      acc.push([ c.Tree.trim ]);

    } else {

      const prefix: string[] = [];
      const nwl = c.wrapAnsi(clean, $.terminal.wrap, {
        hard: true
      }).split(NWL);

      while (nwl.length !== 0) {

        let line = nwl.shift();

        // ensure wraps do not incorrection place word combinations
        if (nwl.length !== 0) {

          if (nwl[0].length === 1) {
            line = line + nwl.shift();
          }
        }

        prefix.push(c.Tree.line + before + line + after);

      }

      acc.push(prefix);
    }

    return acc;

  }, []);

  const format: string[] = [];

  let n: boolean = false;

  while (newlines.length !== 0) {

    const line = newlines.shift();

    if (newlines.length !== 0 && line.length > 1) {

      if (format.length > 0 && format[format.length - 1] !== c.Tree.trim) {
        format.push(c.Tree.trim);
      }

      format.push(line.join(NWL));

    } else if (line === c.Tree.trim) {
      if (n) {
        n = false;
      } else {
        n = true;
        format.push(line[0]);
      }
    } else {
      format.push(line[0]);
    }
  }

  update(format.join(NWL));

  // return;
  // const text = wrap(data, $.terminal.wrap, { hard: true });

  // let message: string[] = [];

  // if (/\berror\b:/i.test(text) && stackerr > 0) {

  //   message = text.slice(0, stackerr).split(NWL);

  //   const stack = cleanStack(text.slice(stackerr), { pretty: true, basePath: $.cwd });
  //   const lines = wrap(stack, $.terminal.wrap).split(NWL);

  //   stderr.push(NWL);

  //   while (lines.length !== 0) {
  //     const line = lines.shift();
  //     if (line.trim().length > 0) stderr.push(Tree.red + redBright(strip(line)));
  //   }

  // }

  // if (message.length === 0) message = text.split(NWL);

  // while (message.length !== 0) {

  //   const line = message.shift();

  //   if (line.trim().length > 0) stdout.push(Tree.line + before + strip(line) + after);

  // }

  // error(`${stdout.join(NWL)}${stderr.length > 1 ? stderr.join(NWL) : NIL}`);

};

/**
 * Request Errors
 *
 * Formats the Shopify response errors thrown when a request fails
 * or is rejected. The response data returned by Shopify is parsed
 * and additional information is appended.
 */
export function request <T> (file: string, e: AxiosResponse, options?: {
  /**
   * Whether or not to log the error, when `false` error
   * string will be returned.
   *
   * @default true
   */
  log?: boolean;
  /**
   * Whether or not to retain a store of the error, when `true`
   * the error object will be returned.
   *
   * @default false
   */
  store?: boolean;
}): T {

  const defaults = { log: true, store: false };
  const config: RequestError = assign(defaults, options);

  if (config.store === true) config.data = object();

  const response = hasPath('error.asset', e.data)
    ? e.data.error.asset
    : hasPath('errors.asset', e.data) ? e.data.errors.asset : null;

  // KNOWN ERROR
  //
  // Status 422 will retail an error response from Shopify
  //
  if (e.status === 422) {

    const { value } = JSON.parse(e.config.data).asset;
    const { output, line, column } = codeframe.Shopify(response, value.split(NWL));
    const context = object({
      stack: false,
      entries: object({
        column,
        line,
        file: c.TLD + file,
        details: e.statusText,
        status: c.white(c.sanitize(e.status)),
        processor: c.neonMagenta('SHOPIFY API')
      })
    });

    const message = c.Create({ type: 'error' })
    .NL
    .Insert(output, c.gray)
    .NL
    .Context(context)
    .toString();

    if (config.store) {
      config.data.message = output;
      config.data.rawMessage = c.strip(output);
      config.data.context = context;
    }

    if (config.log) error(message);
    if (config.store) return <T>config.data;

    return <T>message;

  }

  // WRAPPED ERROR RESPONSES
  //
  // Status numbers which we have context over are intercepted
  // these will be unrelated to the asset payload and Syncify applies
  // handling for such errors.
  //
  if (e.status in SHOPIFY_REQUEST_ERRORS) {

    const message = c.Create({ type: 'error' })
    .NL
    .Wrap(SHOPIFY_REQUEST_ERRORS[e.status])
    .toLine();

    const context = object({
      stack: false,
      entries: object({
        status: e.status,
        message: e.statusText,
        source: `${file}`
      })
    });

    if (config.store) {
      config.data.message = message;
      config.data.context = context;
    }

    const output = c.glue(c.Tree.red, NWL, message, Context(context));

    if (config.log) error(output);
    if (config.store) return <T>config.data;

    return <T>output;

  }

  // UNKNOWN ERROR

  const message = c.red('Unknown error has occured');
  const context = {
    stack: false,
    entries: {
      status: e.status,
      message: e.statusText,
      source: `${file}`
    }
  };

  if (config.store) {
    config.data.message = message;
    config.data.context = context;
  }

  const output = c.glue(
    c.Tree.red,
    NWL,
    message,
    Context({
      stack: false,
      entries: object({
        status: e.status,
        message: e.statusText,
        source: `${file}`
      })
    })
  );

  if (config.log) error(output);
  if (config.store) return <T>config.data;

  return <T>output;

}

/**
 * Generic Throws
 *
 * Used for any type of error
 */
export function throws (e: any, entries: { [name: string]: string | number }) {

  const context: { stack: string | false; entries: { [name: string]: string | number; }; } = {
    stack: false,
    entries: {
      ...entries
    }
  };

  const message: string = e instanceof Error
    ? has('message', e)
      ? e.message
      : e.toString()
    : e;

  if (has('stack', e)) context.stack = e.stack;
  if (has('code', e)) context.entries.code = e.code;
  if (has('name', e)) context.entries.name = e.name;

  if (context.stack === false) {

    error(
      c.glue(
        Format(message, { type: 'error' }),
        Context(context)
      )
    );

    process.exit(0);

  } else {

    $.errors.add(
      c.glue(
        Format(message, { type: 'error' }),
        Context(context)
      )
    );
  }
}

/**
 * File Write Errors
 *
 * Typically used in the `catch` callback of async
 * `writeFile` functions
 */
export const write = (
  message: string,
  context: {
    [name: string]: string,
  }
) => (e: NodeJS.ErrnoException) => {

  error(
    c.glue(
      Format(e.message, { type: 'error' }),
      Context(
        {
          stack: e.stack,
          entries: {
            ...context,
            code: e.code,
            name: e.name,
            details: message
          }
        }
      )
    )
  );
};

/**
 * Read File Errors
 *
 * Typically used in the `catch` callback of async `readFile` functions.
 * The `details` is a short form description, the errno Exception will
 * inform upon everything else.
 */
export function read (details: string, entries: { [name: string]: string }) {

  const message = c.Create({ type: 'error' }).Break('FILE ERROR');

  return function (e: NodeJS.ErrnoException) {

    error(
      message
      .Wrap(e.message)
      .Newline()
      .Context({
        stack: e.stack,
        entries: {
          code: e.code,
          details,
          ...entries,
          name: e.name
        }
      }).toLine()
    );

  };
};

/**
 * JSON Errors
 *
 * Refines JSON parse error thrown by **parse-json** and ensures
 * it reflects the syncify aesthetic. In addition, it will do some
 * additional handling for `{% schema %}` embedded sections which
 * have parse errors by ensuring line numbers reflect correctly.
 */
export function json (e: JSONError, file: File) {

  e.fileName = file.base;

  const entries: { [key: string]: string } = object();

  let line: number;

  const message = c.Create({ type: 'error' })
  .NL
  .Wrap(e.message.split(NWL)[0], c.red.bold)
  .NL;

  // const isSchema = file.ext === '.liquid';

  if (has('codeFrame', e)) {

    message.Newline();

    const lines = e.codeFrame.split(NWL);
    const rawFrame = e.rawCodeFrame.split(NWL);

    let i: number = 0;

    while (lines.length !== 0) {

      if (has('line', entries) === false) {

        const raw = rawFrame[i].trimStart();

        if (raw[0] === '>') {
          const number = raw.slice(1).trimStart().match(/^\d+/);
          if (number !== null) line = Number(number[0]);
        }
      }

      message.Line(lines.shift());

      i = i + 1;
    }

    message.Newline();

  }

  const stack: string[] = [];
  const trace = e.stack.split(NWL);
  while (trace.length !== 0) stack.push(c.Tree.red + trace.shift());

  $.errors.add(stack.join(NWL));

  error(
    message
    .NL
    .Context({
      stack: true,
      entries: {
        line,
        name: e.name,
        file: c.TLD + file.relative,
        processor: c.neonMagenta('JSON')
      }
    }).toString()
  );

}

/**
 * SASS Errors
 *
 * Formats the SASS Dart error exception.
 */
export function sass (file: File, e: Exception) {

  const message = c.Create({ type: 'error' })
  .NL
  .Wrap(e.sassMessage, c.red.bold)
  .Newline();

  if (has('span', e)) {

    const { span } = e;
    const code = has('context', span) ? span.context : span.text;

    if (code.length === 0) return NIL;

    message.Newline();

    const { start, end } = span;
    const space = c.sanitize(end.line + 1).length;

    // ALL MATCHING
    if (start.line === end.line) {

      let same = space - c.sanitize(end.line).length;

      if (start.line > 1) message.Line(`${WSP.repeat(same) + c.blue(`${end.line}`)} ${c.Tree.trim}`);

      same = space - c.sanitize(end.line + 1).length;

      message.Line(`${WSP.repeat(same) + c.blue(`${end.line + 1}`)} ${c.Tree.trim} ${code.trimEnd()}`);
      message.Line(`${WSP.repeat(space - 1) + c.BAD} ${c.Tree.redTrim} ${WSP.repeat(end.column) + c.bold('^')}`);

    } else {

      const content = code.slice(span.start.offset, span.end.offset);
      const lines = content.split(NWL);

      let from = span.start.line + 1;

      for (const line of lines) {
        const number = c.sanitize(from++);
        const same = space - number.length;
        const align = same === 0 ? NIL : WSP.repeat(same);
        message.Line(`${align + c.blue(number)} ${c.Tree.trim} ${line}`);
      }

    }

  }

  error(
    message.NL.Context({
      stack: e.sassStack,
      entries: {
        line: e.span.start.line,
        name: e.name,
        input: file.input,
        cause: e.cause as string,
        processor: c.neonMagenta('SASS Dart')
      }
    }).toString()
  );

}

/**
 * ESBuild Errors
 *
 * Formats the ESBuild errors
 */
export function esbuild (e: Message) {

  const message = c.Create({ type: 'error' })
  .NL
  .Wrap(e.text, c.red.bold)
  .Newline();

  const span = e.location;
  const space = c.sanitize(span.line).length;

  let same = space - c.sanitize(e.location.line).length;

  if (span.line > 1) message.Line(`${WSP.repeat(same) + c.blue(`${span.line - 1}`)} ${c.Tree.trim}`);

  same = space - c.sanitize(span.line).length;

  error(
    message
    .Line(`${WSP.repeat(same) + c.blue(`${span.line}`)} ${c.Tree.trim} ${span.lineText}`)
    .Line(`${WSP.repeat(space - 1) + c.BAD} ${c.Tree.redTrim} ${WSP.repeat(span.column) + c.bold('^')}`)
    .NL
    .NL
    .Context({
      stack: false,
      entries: {
        suggest: c.whiteBright(span.suggestion),
        line: e.location.line,
        column: e.location.column,
        plugin: e.pluginName,
        namespace: span.namespace,
        file: c.TLD + e.location.file,
        processor: c.neonMagenta('ESBuild')
      }
    }).toString()
  );

}

/**
 * PostCSS Errors
 *
 * Formats the PostCSS errors
 */
export function postcss (file: File, e: CssSyntaxError) {

  const stack: string[] = [];
  const trace = c.cleanStack(e.stack, { pretty: true, basePath: $.cwd }).split(NWL);

  while (trace.length !== 0) stack.push(c.Tree.red + trace.shift());

  $.errors.add(stack.join(NWL));

  error(
    c.Create({ type: 'error' })
    .NL
    .Wrap(`${e.name}${c.COL} ${e.reason}`, c.red.bold)
    .Newline()
    .Multiline(e.showSourceCode(true))
    .NL
    .NL
    .Context({
      stack: true,
      entries: {
        line: e.line,
        column: e.column,
        source: file.input,
        file: file.input === e.file ? undefined : e.file,
        plugin: c.blue(e.plugin),
        processor: c.neonMagenta('PostCSS')
      }
    })
    .toString()
  );

}
