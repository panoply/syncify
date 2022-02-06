import c from 'ansis';
import * as parse from 'cli/parse';
import { task, prepend } from 'cli/ansi';
import { log } from 'cli/console';
import * as marky from 'marky';
import { IFile } from 'types';
import type { SourceSpan, Exception } from 'sass';
import { has, hasPath } from 'rambdax';
import { byteConvert } from 'shared/helpers';

let hasError: boolean = false;

/**
 * File Change
 *
 * File source path that was changed
 */
export const fileChange = (file: IFile) => {

  if (hasError) {
    hasError = false;
  }

  marky.mark('change');
  marky.mark(file.path);

  log.files(
    task(
      c.cyan(`${c.bold('+')} modified ${c.bold(file.path)}`)
    )
  );

};

/**
 * File Task
 *
 * File operation (transform) executed on file
 */
export const fileRemove = (file: IFile) => {

  marky.mark(file.key);

  log.files(
    task(
      c.cyan('␡ deleted ' + file.key)
    )
  );

};

/**
 * File Task
 *
 * File operation (transform) executed on file
 */
export const fileTask = (file: IFile, message: string) => {

  const duration = marky.stop(file.path).duration.toFixed(0);

  log.files(
    task(`✓ ${message} ${c.gray('in')} ${duration}ms`)
  );

  marky.mark(file.path);

};

export const fileSize = (file: IFile) => {

  if (!has('size', file)) return;

  const saved = byteConvert(file.size.before - file.size.after);
  const size = byteConvert(file.size.after);

  log.files(
    task(
      c.magentaBright(`𝌹 filesize is ${c.bold(size)} saved ${c.bold(saved)}`)
    )
  );

};

/**
 * File Sync
 *
 * File was synced to a store and theme
 */
export const fileSync = (file: IFile, store: string, theme: string) => {

  if (!hasError) {

    const time = marky.stop('change').duration.toFixed(0);
    const shop = `${c.magenta(theme)} ${c.gray('on')} ${c.blue(store)} ${c.gray('in')}`;

    log.files(
      task(c.green(`✓ uploaded ${c.bold(file.key)} ${c.gray('to')} ${shop} ${c.white(time + 'ms')}`))
    );

  } else {

    hasError = true;
  }

};

/**
 * File Upload
 *
 * File is uploading to a store and theme
 */
export const fileDelete = (storeName: string, themeName: string) => {

  log.files(
    task(c.gray(`deleted from ${c.white(themeName)} (${c.white(storeName)})`))
  );

};

/**
 * File Ignored
 *
 * File was ignored from transform and sync
 */
export const fileIgnore = (filePath: string) => {

  log.files(
    task(c.gray(`${c.bold('!')} ignoring ${filePath}`))
  );

};

/**
 * File Completion
 *
 * File was transformed and uploaded
 */
export const fileWarn = (message: string) => {

  log.files(
    task(c.yellow('! warning')),
    prepend(message)
  );

};

/**
 * File Completion
 *
 * File was transformed and uploaded
 */
export const fileError = (error: { file: string; message: string; data: string | string[] }) => {

  hasError = true;

  log.files(
    task(c.red(`⨯ ${error.message}`)),
    prepend('\n' + c.red(parse.liquidPretty(error.data)))
  );

  marky.clear();

};

/**
 * File Completion
 *
 * File was transformed and uploaded
 */
export const sassDebug = (message: string, options: { span: SourceSpan; }) => {

  log.files(task(c.yellow(`${c.bold('!')} ${message}`)));
  log.files(prepend(options.span.context));

};

/**
 * SASS Error
 *
 * File was transformed and uploaded
 */
export const sassError = (error: Exception) => {

  hasError = true;

  const title = `⨯ sass error starting ${c.gray('on')} line ${error.span.start.line}${c.white(':')}`;

  log.files(
    task(c.redBright(title)),
    prepend(parse.sassError(error))
  );

  marky.clear();

};

/**
 * SASS Warning
 *
 * Prints a sass file warning
 */
export const sassWarn = (message: string, options: {
  deprecation: boolean;
  span?: SourceSpan;
  stack?: string;
}) => {

  const title = c.bold(`sass ${options.deprecation ? 'deprecation' : 'warning'}`);

  if (!hasPath('span.start.line', options)) {

    log.files(
      task(c.yellow('! ' + title)),
      prepend(parse.sassSplit(message))
    );

  } else {

    log.files(
      task(c.yellow.bold(`${title} on line ${options.span.start.line}${c.white(':')}`)),
      prepend(parse.sassPetty(message, options.span, options.stack))
    );

  }

};

/**
 * Throws Error
 */
export function throws (message: string) {

  return console.error(
    '\n' + prepend(
      c.red(
        parse.quotes(message)
      )
    )
  );

}
