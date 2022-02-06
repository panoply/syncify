import * as marky from 'marky';
import * as c from 'cli/colors';
import * as parse from 'cli/parse';
import * as tui from 'cli/ansi';
import { log } from 'cli/console';
import { IFile } from 'types';
import type { SourceSpan, Exception } from 'sass';
import { hasPath } from 'rambdax';
import { is } from 'shared/native';
import { byteConvert } from 'shared/helpers';

let hasError: boolean = false;
let hasMarks: boolean = false;
/* -------------------------------------------- */
/* SHARED LOGGERS                               */
/* -------------------------------------------- */

export const fileSize = (before: number, after: number) => {

  if (!is(before, after)) return;

  const saved = byteConvert(before - after);
  const size = byteConvert(after);

  log.files(
    tui.task(c.pink(`𐄹 filesize is ${size} saved ${saved}`))
  );

};

/* -------------------------------------------- */
/* FILE LOGGERS                                 */
/* -------------------------------------------- */

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
    tui.task(c.cyan(`${c.bold('+')} modified ${c.bold(file.path)}`))
  );

  hasMarks = true;
};

/**
 * File Task
 *
 * File operation (transform) executed on file
 */
export const fileRemove = (file: IFile) => {

  marky.mark(file.key);

  log.files(
    tui.task(c.orange('␡ deleted ' + file.key))
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
    tui.task(c.orange(`✓ ${message} ${c.gray('in')} ${duration}ms`))
  );

  marky.mark(file.path);

};

/**
 * File Sync
 *
 * File was synced to a store and theme
 */
export const fileSync = (file: IFile, store: string, theme: string) => {

  if (!hasError) {

    const shop = `${c.magenta(theme)} ${c.gray('on')} ${c.blue(store)} ${c.gray('in')}`;

    if (hasMarks) {
      const time = marky.stop('change').duration.toFixed(0);
      log.files(
        tui.task(c.greenBright(`✓ uploaded ${file.key} ${c.gray('to')} ${shop} ${c.white(time + 'ms')}`))
      );
    } else {
      log.files(
        tui.task(c.greenBright(`✓ uploaded ${file.key} ${c.gray('to')} ${shop}`))
      );
    }

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
    tui.task(c.gray(`deleted from ${c.white(themeName)} (${c.white(storeName)})`))
  );

};

/**
 * File Ignored
 *
 * File was ignored from transform and sync
 */
export const fileIgnore = (filePath: string) => {

  log.files(
    tui.task(c.gray(`${c.bold('!')} ignoring ${filePath}`))
  );

};

/**
 * File Completion
 *
 * File was transformed and uploaded
 */
export const fileWarn = (message: string) => {

  log.files(
    tui.task(c.yellow('! warning')),
    tui.indent(message)
  );

};

/**
 * File Completion
 *
 * File was transformed and uploaded
 */
export const fileError = (error: { file: string; message: string; data: string | string[] }) => {

  log.files(
    tui.task(c.red(`⨯ ${error.message}`)),
    tui.indent('\n' + c.red(parse.liquidPretty(error.data)))
  );

  if (hasMarks) {
    hasError = true;
    marky.clear();
  }

};

/* -------------------------------------------- */
/* SASS LOGGERS                                 */
/* -------------------------------------------- */

/**
 * File Completion
 *
 * File was transformed and uploaded
 */
export const sassDebug = (message: string, options: { span: SourceSpan; }) => {

  log.files(
    tui.task(c.yellow(`${c.bold('✲')} ${message}`)),
    tui.indent(options.span.context)
  );

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
    tui.task(c.redBright(title)),
    tui.indent(parse.sassError(error))
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
      tui.task(c.yellow('! ' + title)),
      tui.indent(parse.sassSplit(message))
    );

  } else {

    log.files(
      tui.task(c.yellow.bold(`${title} on line ${options.span.start.line}${c.white(':')}`)),
      tui.indent(parse.sassPetty(message, options.span, options.stack))
    );

  }

};

export const errors = (error: Error) => {

  return log.error('\n' + (
    tui.indent(c.red(parse.quotes(error.message)))
  ));

};

/**
 * Throws Error
 */
export function throws (message: string) {

  return console.error('\n' + (
    tui.indent(c.red(parse.quotes(message)))
  ));

}
