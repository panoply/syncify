import type { AcquireError } from '@syncify/acquire';
import type { JSONError } from '@syncify/json';
import type { Message } from 'esbuild';
import type { CssSyntaxError } from 'postcss';
import type { Exception } from 'sass-embedded';
import type { Merge } from 'type-fest';
import type { ScriptBundle } from 'types';
import type { File } from '~file';
import type { Upsert } from '~http/themeFiles';
import type { RequestError } from '~http/utils';

import { readFileSync } from 'node:fs';
import { relative } from 'node:path';

import { $import } from 'modules';

import * as _ from '@syncify/ansi';
import { codeframe } from '@syncify/codeframe';
import { kill } from '@syncify/kill';

import { log } from '~cli/log';
import { stdin } from '~cli/stdin';
import { stderr } from '~console';
import { Type } from '~file';
import { forEach, has, isString, plur } from '~utils';

import { $ } from '$';

/**
 * Error method interface Augmentation
 *
 * Calling `error` will omit `Tree.Line` prefixing and behave in a mostly
 * native manner, with the exception that `string` input is expected.
 */
export function error (...message: string[]) {

  forEach(line => stderr.write(line), message);

};

error.upsert = (failed: Upsert.Reject[]) => {

  const isWatch = $.mode.bulk || $.mode.push;
  const record: { [filename: string]: number } = {};
  const errors: Merge<Omit<Upsert.Reject, 'message' | 'filename'>, { messages: string[] }>[] = [];
  const write = _.Create({ type: 'error' });

  for (const { code, file, message, summary, graph } of failed) {

    const index = file.key in record ? record[file.key] : null;

    if (index === null) {
      record[file.key] = errors.length;
      errors.push({ code, file, summary, graph, messages: [ message ] });
    } else {
      errors[index].messages.push(message);
    }
  }

  let notifier: boolean = isWatch;
  let heading = NIL;
  let context: _.IssueContext;

  for (const { code, file, messages, summary, graph } of errors) {

    heading = NIL;

    const issue = $.errors.has(file)
      ? $.errors.get(file)
      : $.errors.set(file, []).get(file);

    for (const message of messages) {

      const cf = codeframe.shopify(file.value, message);

      if (cf.hasFrame) {

        isWatch ? write.Header(cf.summary, _.red.bold) : write.Prepend(cf.summary, _.red.bold);

        write
        .Wrap(cf.details, _.redBright)
        .NL
        .Insert(cf.frame, _.gray)
        .Context({
          entries: {
            line: cf.line,
            column: cf.column,
            input: relative($.cwd, file.input),
            output: relative($.cwd, file.output),
            code: _.neonMagenta(code),
            graph: _.pink(graph)
          }
        });

        if (notifier === false) {
          notifier = true;
          log.error(file.relative, {
            notify: {
              title: `Error in ${file.key}`,
              message: cf.summary
            }
          });
        }

        if (issue.length === 1) {
          write
          .NL
          .Unshift(`Press ${_.Encase('SB', _.bold('e'))} to view all file errors`, _.gray);
        }

        write.toString((message) => issue.push(message));

      } else {

        context = {
          entries: {
            input: relative($.cwd, file.input),
            output: relative($.cwd, file.output),
            namespace: file.namespace,
            code: _.neonMagenta(code),
            graph: _.pink(graph)
          }
        };

        // Notification Center
        if (notifier === false) {
          notifier = true;
          log.error(`${failed.length} ${plur('error', failed.length)} detected`, {
            notify: {
              title: 'Request Failed',
              message: `Rejected by Shopify with ${failed.length} ${plur('Error', failed.length)}`
            }
          });
        }

        // The same summary infers an identical enum descriptor.
        // We will list each of these errors to prevent excessive logs.
        if (heading === summary) {

          write.Insert(cf.message, _.gray);

        } else {

          if (heading !== NIL) {

            write
            .Context(context)
            .NL
            .toString(issue.push);

          }

          heading = summary;

          write
          .Header(summary, _.bold)
          .Insert(cf.message, _.gray);

        }
      }
    }

    // If our header has only 1 entry, it means that the error had either a single
    // issue or multiple issues using the same enum description. We can provide the
    // file context here if such is the case.
    if (heading !== NIL) {

      issue.push(
        write
        .Context(context)
        .NL
        .toString()
      );

    }

    if (write.isEmpty) issue.push(write.toString());

  }

  if (isWatch === false) {

    // We print the first error, others are optional
    //
    // eslint-disable-next-line no-unreachable-loop
    for (const [ file, messages ] of $.errors) {
      error(messages.shift());
      if (messages.length > 0) $.errors.delete(file);
      break;
    }
  }

};

error.graph = (e: RequestError) => {

  const count = e.errors.length;
  const write = _.Create({ type: 'error' }).Header(`${count} GRAPHQL ${plur('ERROR', count)}`, _.bold.redBright);

  for (const item of e.errors) {

    write.Wrap(item.message.replace(/(\s+'.*?'\s*)/g, _.bold('$1')));

    if (has('path', item)) {

      write.Newline();

      let indent = '';

      const max = item.path.length - 1;

      item.path.forEach((path, i) => {
        if (i !== 0) indent += WSR;
        if (max !== i) {
          write.Line(`${indent}${path} ${_.gray('{')}`, _.yellow);
        } else {
          write.Line(`${indent}${path}`, _.red.bold);
          indent = indent.slice(2);
        }
      });

      item.path.forEach((path, i) => {
        if (max !== i) {
          write.Line(`${indent}${_.gray('}')}`);
          indent = indent.slice(2);
        }
      });

    }

    write.Newline();

  }

  write.Context({
    entries: {
      target: e.target.target,
      domain: e.target.store.domain,
      graph: _.neonMagenta(e.graph)
    }
  });

  write
  .NL
  .End($.log.group)
  .Break()
  .toLog();

  kill.exit(0);

};

error.request = (e: RequestError) => {

  if ($.running) {

    log.spinner.stop(); // stop the spinner

  } else {
    log.error('Request failed', {
      suffix: e.graph,
      notify: {
        message: `An error was thrown when attempting to interface with ${e.target.store.domain} store.`
      }
    });
  }

  if (e instanceof TypeError) {

    _.Create({ type: 'error' })
    .Header('TYPE ERROR', _.bold.redBright)
    .Wrap(e.message)
    .Context({
      stack: e.stack,
      cleanStack: true,
      entries: {
        name: e.name,
        graph: e.graph,
        detail: 'POSSIBLY INTERNAL'
      }
    })
    .NL
    .End($.log.group)
    .Break()
    .toLog();

    kill.exit(0);

  } else if (e.isGraphError) {

    return error.graph(e);

  } else if (e.isGraphError) {

    _.Create({ type: 'error' })
    .Header('REQUEST ERROR', _.bold.redBright)
    .Wrap(e.message)
    .Context({
      entries: {
        cause: e.cause,
        status: e.response.status,
        graph: e.name
      }
    })
    .NL
    .toLog({ clear: true });

  }

};

error.toml = (file: string, e: any) => {

  if (e instanceof $import.toml.TomlError) {

    const context: _.IssueContext = {
      entries: {
        location: `${e.line}${_.COL}${e.column}`,
        input: file,
        cause: e.cause as string,
        processor: _.neonMagenta('TOML')
      }
    };

    const code = e.codeblock
    .replace(/\[/g, _.magenta('['))
    .replace(/=/g, _.magentaBright('='))
    .replace(/("[\s\S]*")/g, _.yellowBright('$1'))
    .replace(/(\d+)(:)/g, `${_.blue('$1')} ${_.Tree.line}`)
    .replace(/(\^)/, '$1' + WSP + _.Tree.line);

    _.Create({ type: 'error' })
    .Append(`TOML Error on Line ${e.line}`, _.bold)
    .Wrap(e.message.replace(e.codeblock, '').trim())
    .NL
    .Wrap(code)
    .NL
    .Context(context)
    .NL
    .toLog({ clear: true });

  }

};

error.throw = (e: any, entries: { [name: string]: string | number }) => {

  const context: { stack: string | false; entries: { [name: string]: string | number; }; } = {
    stack: false,
    entries: { ...entries }
  };

  const message: string = e.message.replace(/(OnlineStoreThemeFileReadResult)/, _.bold('$1'));

  if (has('stack', e)) context.stack = e.stack;
  if (has('code', e)) context.entries.code = e.code;
  if (has('name', e)) context.entries.name = e.name;

  const tui = _
  .Create({ type: 'error' })
  .Line(message, _.redBright.bold)
  .Context(context);

  if (context.stack === false) {

    kill.exit(0);

  } else {

    $.stacks.add(tui.toString());

  }
};

error.write = (details: string, context?: { [name: string]: string }) => {

  return function (e: NodeJS.ErrnoException) {

    _
    .Create({ type: 'error' })
    .Header('WRITE ERROR')
    .Wrap(e.message)
    .NL
    .Context({
      stack: e.stack,
      entries: {
        code: e.code,
        details,
        ...context,
        name: e.name
      }
    })
    .toLog({ clear: true });

  };

};

error.read = (details: string, context: { [name: string]: string }) => {

  return function (e: NodeJS.ErrnoException) {

    _
    .Create({ type: 'error' })
    .Header('FILE ERROR')
    .Wrap(e.message)
    .NL
    .Context({
      stack: e.stack,
      entries: {
        code: e.code,
        details,
        ...context,
        name: e.name
      }
    })
    .toLog({ clear: true });

  };
};

error.json = (e: JSONError, file: string | Partial<File>, ...contexts: [ string?, number? ] | [ number?, string? ]) => {

  let details: string = 'JSON Parse Error';
  let lineOffset: number = 0;
  let message: string;

  if (contexts.length > 0) {
    if (typeof contexts[0] === 'string') details = contexts[0];
    if (typeof contexts[0] === 'number') lineOffset = contexts[0];
    if (contexts.length > 1) {
      if (typeof contexts[1] === 'string') details = contexts[1];
      if (typeof contexts[1] === 'number') lineOffset = contexts[1];
    }
  }

  const frame = codeframe(e.source, {
    language: 'json',
    start: {
      line: e.line + lineOffset,
      column: e.column
    }
  });

  if (lineOffset > 0) {
    message = e.message
    .replace(/(line number:?|line:?) (\d+)/i, `$1 ${e.line + lineOffset}`)
    .replace(/Line \d+:\s+/, NIL);
  } else {
    message = e.message.replace(/Line \d+:\s+/, NIL);
  }

  _.Create({ type: 'error' })
  .Prepend(details, _.bold)
  .Wrap(_.capture.numbers(message, _.bold), _.redBright)
  .NL
  .Insert(frame)
  .Context({
    entries: {
      line: e.line + lineOffset,
      column: e.column,
      input: isString(file) ? relative($.cwd, file) : file.relative,
      processor: _.neonMagenta('JSON')
    }
  })
  .toLog({ clear: true });

};

error.sass = (file: File, e: Exception) => {

  const entries: Record<string, any> = {};
  const write = _.Create({ type: 'error' })
  .NL
  .Wrap(e.sassMessage, _.red.bold)
  .Newline();

  const { span } = e;
  const source = readFileSync(span.url.pathname, 'utf8');
  const frame = codeframe(source, {
    start: {
      line: span.start.line + 1,
      column: span.start.column
    }
  });

  write.Insert(frame);

  const uri = _.TLD + relative($.cwd, span.url.pathname);

  entries.line = span.start.line + 1;
  entries.column = span.start.column;
  entries.input = _.TLD + file.relative;

  if (entries.input !== uri) entries.source = uri;

  if (/\/node_modules\//.test(span.url.pathname)) {
    entries.module = _.pink(span.url.pathname.match(/(?:.*?\/node_modules\/)((?:@[^/]+\/)?[^/]+)/)[1]);
  }

  entries.cause = e.cause;
  entries.processor = _.neonMagenta('SASS Dart');

  write
  .NL
  .Context({ entries })
  .toLog();

};

error.terser = (file: File, e: Error) => {

  _.Create({ type: 'error' })
  .Header('Terse minification error')
  .Wrap(e.message, _.red.bold)
  .NL
  .Context({
    entries: {
      input: file.input,
      cause: e.cause as string,
      processor: _.neonMagenta('html-minifier-terser')
    }
  }).NL.toLog();

};

error.esbuild = <T extends ScriptBundle>(file: File | File<T[]>, errors: Message[]) => {

  if (errors.length === 0) return;

  const { length } = errors;
  const multiple = length > 1;
  const isSyncifyConfig = file.type === Type.Syncify;

  if (!isSyncifyConfig) {
    log.error(file.relative, {
      suffix: 'transform failed',
      notify: {
        title: `${length} ${file.kind} ${plur('Error', length)}`,
        message: `${file.key || file.base}`
      }
    });
  }

  if (errors.length > 1) log.nl('red');

  file.value = readFileSync(file.input, 'utf8');

  const issues = errors.map(({
    location,
    text,
    pluginName
  }, no) => {

    const write = _.Create({ type: 'error' })
    .Template({ id: 'errors' })
    .True(multiple, tui => tui.Update('errors', `${_.bold('ERROR')} ${_.bold(no + 1)} of ${_.bold(length)}`))
    .Header(multiple ? _.white(file.input) : _.bold.redBright(`${file.kind} Error`));

    if (location === null) {

      const context: _.IssueContext = { entries: {} };

      if (pluginName === 'acquire') {
        context.entries.internal = '@syncify/acquire';
      } else {
        context.entries.plugin = pluginName;
      }

      context.entries.namespace = file.namespace;
      context.entries.processor = _.neonMagenta('ESBuild');

      if (/Require stack:\n/.test(text)) {
        text = text.replace(/Require stack:\n/, '\nRequire stack:\n');
      }

      write
      .Wrap(text, _.redBright)
      .NL
      .Context(context)
      .Newline();

    } else {

      const frame = codeframe(file.value, {
        language: 'javascript',
        highlight: true,
        start: {
          line: location.line,
          column: location.column
        }
      });

      write
      .Wrap(`${text} on line ${location.line}`, _.redBright)
      .NL
      .Insert(frame)
      .Context({
        entries: {
          line: location.line,
          column: location.column,
          file: location.file,
          plugin: pluginName,
          namespace: location.namespace,
          processor: _.neonMagenta('ESBuild')
        }
      });
    }

    if (multiple) {
      write
      .Mark('legend')
      .Tree('info')
      .NL
      .Dash(stdin.ansi.legend.e, _.gray)
      .NL
      .End(stdin.ansi.footer, false);
    }

    return write;

  });

  if (isSyncifyConfig) {
    issues.forEach(message => message.Newline().End('Error').toLog({ clear: true }));
    kill.exit(0);
  } else if (issues.length > 1) {
    stdin.errors.listen(issues);
  } else {
    issues[0].toLog({ clear: true });
  }
};

error.postcss = (file: File, e: CssSyntaxError) => {

  const write = _.Create({ type: 'error' });
  const stack: string[] = [];
  const trace = _.cleanStack(e.stack, { pretty: true, basePath: $.cwd }).split(NWL);

  while (trace.length !== 0) stack.push(_.Tree.red + trace.shift());

  $.stacks.add(stack.join(NWL));

  const frame = codeframe(e.source, {
    start: {
      line: e.line,
      column: e.column
    },
    end: {
      line: e.endLine,
      column: e.endColumn
    }
  });

  write
  .Insert(frame)
  .NL
  .Wrap(`${e.name}${_.COL} ${e.reason}`, _.red.bold)
  .Context({
    stack: true,
    entries: {
      line: e.line,
      column: e.column,
      source: file.input,
      file: file.input === e.file ? undefined : e.file,
      plugin: _.blue(e.plugin),
      processor: _.neonMagenta('PostCSS')
    }
  })
  .toLog();

};

error.acquire = (e: AcquireError) => {

  _.Create({ type: 'error' })
  .Append(e.type.toUpperCase(), _.bold.red)
  .True(e.summary, tui => tui.Header(e.summary, _.bold.red))
  .Wrap(e.message, _.redBright)
  .Context({ entries: { ...e.context } })
  .Tree('info')
  .NL
  .End('Error')
  .Break()
  .toLog({ clear: true });

  kill.exit(1);

};
