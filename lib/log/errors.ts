import type { File } from 'types';
import type { AxiosResponse } from 'axios';
import type { Exception } from 'sass';
import type { NodeErrorOptions } from 'postcss';
import type { Message } from 'esbuild';
import { hasPath } from 'rambdax';
import { nil, nl, error, glue, assign } from '~utils/native';
import cleanStack from 'clean-stack';
import wrap from 'wrap-ansi';
import { SHOPIFY_REQUEST_ERRORS } from '~const';
import * as tui from '~log/tui';
import * as c from '~cli/ansi';
import { $ } from '~state';

/**
 * Error Reporting
 *
 * This is a store model used for delayed logging of
 * errors encountered. Typically used when performing uploads.
 */
export const errors: { [file: string]: Set<string> } = {};

/**
 * Spawned Logging
 *
 * Logging interface for spawned running operations. This
 * function will normalize the output and keep it aligned
 * with the TUI. This is invoked by the return function of
 * `log.spawn()` in `logger/console.ts` which has _stdout_
 * passed via `spawned()` in `cli/spawned.ts` and assigned
 * by the `setSpawn()` call in `options/define.ts`
 *
 * ```
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * │ lorem ipsum lorem ipsum
 * ```
 */
export function spawn (data: string) {

  const stdout: string[] = [];
  const stderr: string[] = [ c.line.red ];
  const stackerr = data.search(/(?:\n {4}at .*)/);

  let message: string[] = [];

  if (/\berror\b:?/i.test(data) && stackerr > 0) {

    message = data.slice(0, stackerr).split(nl);

    const stack = cleanStack(data.slice(stackerr), { pretty: true, basePath: $.cwd });
    const lines = wrap(stack, $.terminal.wrap).split(nl);

    stderr.push(nl);

    while (lines.length !== 0) {
      const line = lines.shift();
      if (line.trim().length > 0) stderr.push(c.reset(c.line.red + line));
    }
  }

  if (message.length === 0) message = data.split(nl);

  while (message.length !== 0) {
    const line = message.shift();
    if (line.trim().length > 0) stdout.push(c.reset(c.line.gray) + line);
  }

  error(`${stdout.join(nl)}${stderr.length > 1 ? stderr.join(nl) : nil}`);

};

/**
 * Request Errors
 *
 * Formats the Shopify response errors thrown when a request fails
 * or is rejected. The response data returned by Shopify is parsed
 * and additional information is appended.
 */
export function request <T> (file: string, e: AxiosResponse, options: {
  log?: boolean;
  store?: boolean;
} = {}): T {

  const o: {
    log: boolean;
    store: boolean;
    data?: {
      message?: string;
      context?: {
        stack: string | boolean;
        entries: {
            [name: string]: string | number;
        };
      }
    }
  } = assign({ log: true, store: false }, options);

  if (o.store) o.data = {};

  const message = hasPath('error.asset', e.data)
    ? e.data.error.asset
    : hasPath('errors.asset', e.data) ? e.data.errors.asset : null;

  if (e.status === 422) {

    const info = tui.shopify(message);
    const context = {
      stack: false,
      entries: {
        details: 'File did not sync because Shopify rejected the request',
        status: e.status,
        message: e.statusText,
        source: file
      }
    };

    if (o.store) {
      o.data.message = c.strip(info);
      o.data.context = context;
    }

    const output = glue([
      c.line.red,
      nl,
      info,
      tui.context(context as any)
    ]);

    if (o.log) error(output);

    return <T>(o.store ? o.data : output);

  } else if (e.status in SHOPIFY_REQUEST_ERRORS) {

    const info = tui.multiline('error', SHOPIFY_REQUEST_ERRORS[e.status]);
    const context = {
      stack: false,
      entries: {
        status: e.status,
        message: e.statusText,
        source: `${file}`
      }
    };

    if (o.store) {
      o.data.message = c.strip(info);
      o.data.context = context;
    }

    const output = glue([
      c.line.red,
      nl,
      info +
      tui.context(context as any)
    ]);

    if (o.log) error(output);

    return <T>(o.store ? o.data : output);

  } else {

    const info = 'Unknown error has occured';
    const context = {
      stack: false,
      entries: {
        status: e.status,
        message: e.statusText,
        source: `${file}`
      }
    };

    if (o.store) {
      o.data.message = info;
      o.data.context = context;
    }

    const output = glue([
      c.line.red,
      nl,
      c.redBright(info) +
      tui.context({
        stack: false,
        entries: {
          status: e.status,
          message: e.statusText,
          source: `${file}`
        }
      })
    ]);

    if (o.log) error(output);

    return <T>(o.store ? o.data : output);

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
    tui.indent(e.message, {
      nwl: true,
      line: c.line.red,
      text: c.red.bold
    }) +
    tui.context({
      stack: e.stack,
      entries: {
        ...context,
        code: e.code,
        name: e.name,
        details: message
      }
    })
  );
};

/**
 * SASS Errors
 *
 * Formats the SASS Dart error exception.
 */
export function sass (file: File, e: Exception) {

  error(
    tui.indent(e.message, {
      nwl: true,
      line: c.line.red,
      text: c.red
    }) +
    tui.context({
      stack: e.sassStack,
      entries: {
        input: file.relative,
        message: e.sassMessage
      }
    })
  );

}

/**
 * ESBuild Errors
 *
 * Formats the ESBuild errors
 */
export function esbuild (e: Message) {

  error(
    tui.indent(e.text, {
      nwl: true,
      line: c.line.red,
      text: c.red
    }) +
    tui.sample(e.location.lineText, {
      line: c.line.red,
      span: {
        start: e.location.line,
        end: e.location.line + 1
      }
    }) +
    tui.context({
      stack: false,
      entries: {
        file: e.location.file,
        line: e.location.line,
        column: e.location.column,
        plugin: e.pluginName
      }
    })
  );

}

/**
 * PostCSS Errors
 *
 * Formats the PostCSS errors
 */
export function postcss (e: NodeErrorOptions) {

  // TODO

}
