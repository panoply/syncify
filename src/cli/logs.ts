import * as c from 'cli/colors';
import * as parse from 'cli/parse';
import * as tui from 'cli/ansi';
import { log } from 'cli/console';
import { IConfig, IFile } from 'types';
import type { SourceSpan, Exception } from 'sass';
import { has, hasPath } from 'rambdax';
import { is } from 'shared/native';
import { byteConvert } from 'shared/helpers';
import * as time from 'cli/timer';

/* -------------------------------------------- */
/* RE-EXPORT                                    */
/* -------------------------------------------- */

export * as time from 'cli/timer';

let hasError: boolean = false;
let hasMarks: boolean = false;
let logBuild: boolean = false;

/**
 * Define Preset
 *
 * Letting setter which is used to determine
 * when we are triggering a certain build mode.
 */
export const presets = (config: IConfig['mode']) => { logBuild = config.build; };

/* -------------------------------------------- */
/* FILE LOGGERS                                 */
/* -------------------------------------------- */

/**
 * File Size
 *
 * Informs of the file size before and after minification
 */
export const fileSize = (before: number, after: number) => {

  if (is(before, 0) || !is(before, after)) return;

  log.files(
    tui.task(
      c.pink(`𐄹 filesize is ${byteConvert(after)} saved ${byteConvert(before - after)}`)
    )
  );

};

/**
 * File Change
 *
 * File source path that was changed
 */
export const fileChange = (file: IFile) => {

  if (hasError) hasError = false;
  if (logBuild) {
    time.start('c');
    time.start(file.path);
    hasMarks = true;
  }

  log.files(
    tui.task(
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

  time.start(file.key);

  log.files(
    tui.task(
      c.orange('⌧ deleted ' + file.key)
    )
  );

};

/**
 * File Task
 *
 * File operation (transform) executed on file
 */
export const fileTouch = (key: string) => {

  log.print(tui.task(c.greenBright(`✓ ${key}`)));

  // log.files(tui.task(c.greenBright(`✓ ${file.key}`)));

};

/**
 * File Task
 *
 * File operation (transform) executed on file
 */
export const fileTask = (file: IFile, message: string) => {

  if (hasMarks) {
    log.files(tui.task(c.orange(`✓ ${message} ${c.gray('in')} ${time.stop(file.path)}`)));
    time.start(file.path);
  } else {

    if (has(file.namespace, log)) {
      log[file.namespace](tui.task(c.greenBright(`✓ ${file.key}`)));
    }

    // log.files(tui.task(c.greenBright(`✓ ${file.key}`)));
  }

};

/**
 * File Sync
 *
 * File was synced to a store and theme
 */
export const fileSync = (file: IFile, store: string, theme: string) => {

  if (!hasError) {

    const shop = `uploaded ${file.key} ${c.gray('to')} ${c.magenta(theme)} ${c.gray('on')} ${c.blue(store)}`;

    if (hasMarks) {
      log.files(tui.task(c.greenBright(`✓ ${shop} ${c.gray('in')} ${time.stop('c')}`)));
    } else {
      if (has(file.namespace, log)) {
        log[file.namespace](tui.task(c.greenBright(`✓ ${file.key}`)));
      } else {
        log.files(tui.task(c.greenBright(`✓ ${shop}`)));
      }
    }

  } else {

    hasError = true;
  }

};

/**
 * File Delete
 *
 * File is uploading to a store and theme
 */
export const fileDelete = (storeName: string, themeName: string) => {

  log.files(tui.task(c.gray(`deleted from ${c.white(themeName)} (${c.white(storeName)})`)));

};

/**
 * File Ignored
 *
 * File was ignored from transform and sync
 */
export const fileIgnore = (filePath: string) => {

  log.files(tui.task(c.gray(`${c.bold('!')} ignoring ${filePath}`)));

};

/**
 * File Completion
 *
 * File was transformed and uploaded
 */
export const fileWarn = (message: string) => {

  log.files(tui.task(c.yellow('! warning')), tui.indent(message));

};

/**
 * File Completion
 *
 * File was transformed and uploaded
 */
export const dirEmpty = (path: string) => {

  log.files(
    tui.task(c.yellow(`${c.bold('! empty directory')} ${c.gray('at')} ${c.yellowBright(path)}`))
  );

};

/**
 * File Completion
 *
 * File was transformed and uploaded
 */
export const fileError = (e: { file: string; message: string; data: string | string[] }) => {

  // log.files(tui.task(c.red(`⨯ ${e.message}`)), tui.indent('\n' + c.red(parse.liquidPretty(e.data))));

  if (hasMarks) {
    hasError = true;
    time.clear();
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

  log.files(tui.task(c.yellow(`${c.bold('✲')} ${message}`)), tui.indent(options.span.context));

};

/**
 * SASS Error
 *
 * File was transformed and uploaded
 */
export const sassError = (error: Exception) => {

  hasError = true;

  const title = `⨯ sass error starting ${c.gray('on')} line ${error.span.start.line}${c.white(':')}`;

  log.files(tui.task(c.redBright(title)), tui.indent(parse.sassError(error)));
  time.clear();

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

    log.files(tui.task(c.yellow('! ' + title)), tui.indent(parse.sassSplit(message)));

  } else {

    log.files(
      tui.task(c.yellow.bold(`${title} on line ${options.span.start.line}${c.white(':')}`)),
      tui.indent(parse.sassPetty(message, options.span, options.stack))
    );

  }

};

export const finish = (timer: string) => {

  return log.print(
    tui.footer(c.bold(`Generated Theme ${c.gray('in')} ${time.stop(timer)}`))
  );

};

export const cancel = (message: string) => {

  return log.print(
    tui.newline(),
    tui.task(`${c.yellow.bold('⨯')} ${c.yellowBright(message)}`),
    tui.footer(c.redBright.bold('Cancelled'))
  );

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
