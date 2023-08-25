import { type, has } from 'rambdax';
import { argv } from 'node:process';
import { isArray, isUndefined, nl, ws, error, nlr, isString } from '../utils/native';
import * as c from '~cli/ansi';
import { $ } from '~state';
import { REGEX_OR_CHARS } from '~const';

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
export const warnings: { [group: string]: string[] } = {};

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
export const severities: { [group: string]: string[] } = {};

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
      warnings[group].push(c.line.yellow + c.yellowBright(message));
    } else {
      warnings[group].push(c.line.yellow + c.yellowBright(message + c.COL + ws + c.bold(value)));
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
      severities[group].push(c.line.red + c.red(message));
    } else {
      severities[group].push(c.line.red + c.red(message + c.COL + ws + c.bold(value)));
    }
  };
};

/**
 * Invalid Type
 *
 * Throws an error when an invalid type was provided to a config option
 */
export function typeError ({
  option,
  name,
  provided,
  expects
}:{
  /**
   * The config option, eg: `transform`, `minify` etc
   */
  option: string,
  /**
   * The option name in the config, eg: `script`
   */
  name: string,
  /**
   * The `typeof` value provide
   */
  provided: any,
  /**
   * The `typeof` expected
   */
  expects: string,
}) {

  error(
    nlr(2),
    c.red(`${c.bold(`Invalid ${c.cyan(option)} type value provided`)}`) + nlr(2),
    c.red(`The ${c.cyan(name)} option has an incorrect type value`) + nlr(2),
    c.red(`provided${c.COL} ${c.yellowBright(type(provided).toLowerCase())}`) + nl,
    c.red(`expected${c.COL} ${c.blue(expects.replace(/([|,])/g, c.gray('$1')))}`) + nlr(2),
    c.red(`in${c.COL} ${c.gray.underline($.file.base)}`) + nlr(2),
    c.white.bold('How to fix?') + nl,
    `
    ${c.gray('You need to change the option value to use the')} ${c.blue('expected')} ${c.gray('type.')}
    ${c.gray(`Use the ${c.cyan('defineConfig')} named export for type checking`)}
    `
  );

  process.exit(0);

};

/**
 * Invalid Command
 *
 * Throws an error when an invalid command expression was passed.
 * Will show possible solutions and hints.
 */
export function invalidCommand ({
  message,
  expected,
  fix
}: {
  message: string | string[];
  expected: string;
  fix: string | string[];
}) {

  const provided = argv.slice(2).join(' ');

  expected = c.white('syncify ' + provided + ' ') + c.blue(expected.replace(/([|,])/g, c.gray('$1')));

  error(
    nlr(2),

    // ERROR DESCRIPTION

    c.red(`${c.bold('Invalid or incomplete command passed')}`) + nlr(2),
    c.red(isArray(message) ? message.join('\n ') : message) + nlr(2),

    // PROVIDED / EXPECTED

    c.red(`provided${c.COL} ${c.white('$')} ${c.white('syncify ' + provided)}`) + nl,
    c.red(`expected${c.COL} ${c.white('$')} ${expected}`) + nlr(2),

    // HOW TO FIX

    c.white.bold('How to fix?') + nl,
    c.gray(isArray(fix) ? fix.join(nl) : fix)
  );

  process.exit(0);

}

/**
 * Invalid Command
 *
 * Throws an error when an invalid command expression was passed.
 * Will show possible solutions and hints.
 */
export function invalidTarget ({
  type,
  message,
  provided,
  expected,
  fix
}: {
  type: 'theme' | 'store';
  message: string | string[];
  expected: string;
  provided: string;
  fix: string | string[];
}) {

  if (REGEX_OR_CHARS.test(provided)) {
    provided = provided.replace(REGEX_OR_CHARS, c.gray('$1'));
  }

  if (REGEX_OR_CHARS.test(expected)) {
    expected = expected.replace(REGEX_OR_CHARS, c.gray('$1'));
  }

  if (isArray(message)) {
    message = message.join('\n ');
  }

  error(
    nlr(2),

    // ERROR DESCRIPTION

    c.red(c.bold(`Invalid ${c.cyan(type)} target provided`)) + nlr(2),
    c.red(message) + nlr(2),

    // PROVIDED / EXPECTED

    c.red(`provided${c.COL} ${c.yellowBright(expected)}`) + nl,
    c.red(`expected${c.COL} ${c.blue(provided)}`) + nlr(2),

    // HOW TO FIX

    c.white.bold('How to fix?') + nl,
    c.gray(isArray(fix) ? fix.join(nl) : fix)

  );

  process.exit(0);

}

/**
 * Missing Dependency
 *
 * Throws an error when an invalid config option was provided.
 */
export function missingDependency (deps: string | string[]) {

  if (isString(deps)) {

    error(
      nlr(2),

      // ERROR MESSAGE

      c.red(`${c.bold(`Missing ${c.cyan(deps as string)} dependency`)}`) + nlr(2),
      c.red(`You need to install ${c.cyan(deps as string)} to use it as a processor`) + nlr(2),

      // HOW TO FIX

      c.white.bold('How to fix?') + nl + nl,

      `$ ${c.blue.bold('pnpm add ' + deps as string + ' -D')}` + nlr(2),

      c.gray('If you are using a different package manager (i.e: Yarn or NPM) then'),
      c.gray('please consider adopting pnpm. Pnpm is dope and does dope shit.')

    );

  } else {

    error(
      nlr(2),
      c.red(`${c.bold(`Missing ${c.cyan(`${deps.length}`)} dependencies`)}`) + nlr(2),
      c.red('You are attempting to use processors which are not yet installed!') + nlr(2),
      c.whiteBright(c.gray('-') + ws + (deps as string[]).join(nl + c.gray(' -') + ws)) + nlr(2),
      c.white.bold('How to fix?') + nl,
     `
     $ ${c.blueBright('pnpm add ' + (deps as string[]).join(ws) + ' -D')}

     ${c.gray('If you are using a different package manager (i.e: Yarn or NPM) then')}
     ${c.gray('please consider adopting pnpm. Pnpm is dope and does dope shit.')}
     `
    );

  }

  process.exit(0);

};

/**
 * Missing Option
 *
 * Throws an error when an option is required but not defined
 */
export function missingOption (option: string, name: any, expects: string, why: string | string[]) {

  if (option.indexOf('.') > -1) option = option.split('.').filter(Boolean).join(c.gray(' → '));

  error(
    nlr(2),
    c.red(`${c.bold(`Missing ${c.LCB} ${c.cyan(option)} ${c.RCB} configuration option`)}`) + nlr(2),
    c.red(`The ${c.cyan(name)} option needs to be defined`) + nlr(2),
    c.red(`expects${c.COL} ${c.blue(expects.replace(/([|,])/g, c.gray('$1')))}`) + nlr(2),
    c.red(`at${c.COL} ${c.gray.underline($.file.base)}`) + nlr(2),
    c.white.bold('Why?') + nl + nl +
    c.gray(isArray(why) ? ` ${why.join('\n ')}` : ` ${why}`) + nl + nl
  );

  process.exit(0);

};

/**
 * Support Error
 *
 * Throws an error when a configuration is not supported
 *
 * @param option
 * The option in question, passing a dot path,
 * eg: `foo.bar.baz` will print as `foo → bar → baz`
 *
 * @param invalid
 * The invalid value name
 *
 * @param fix
 * A small string explaining how to fix
 */
export function supportOptionError (option: string, invalid: any, fix: string) {

  if (option.indexOf('.') > -1) option = option.split('.').filter(Boolean).join(c.gray(' → '));

  error(
    nlr(2),
    c.redBright.bold('ERROR (!)'),
    nlr(2),
    c.red(`${c.bold(`Unsupported ${c.cyan(option)} configuration`)}`) + nlr(2),
    c.red(`The ${c.cyan(invalid)} option is not supported in Syncify`) + nlr(2),
    c.white.bold('How to fix?') + nl,
    `
    ${c.gray(fix)}
    ${c.gray(`Use the ${c.cyan('defineConfig')} named export for type checking`)}
    `
  );

  process.exit(0);

};

/**
 * Invalid Option
 *
 * Throws an error when an invalid config option was provided.
 */
export function invalidError (option: string, name: any, value: any, expects: string) {

  error(
    nlr(2),
    c.redBright.bold('ERROR (!)'),
    nlr(2),
    c.red(`${c.bold(`Invalid ${c.cyan(option)} configuration`)}`) + nlr(2),
    c.red(`The ${c.cyan(name)} option has an invalid or missing value`) + nlr(2),
    c.red(`provided${c.COL} ${c.yellowBright(value)}`) + nl,
    c.red(`expected${c.COL} ${c.blue(expects.replace(/([|,])/g, c.gray('$1')))}`) + nlr(2),
    c.white.bold('How to fix?') + nl,
    `
    ${c.gray('You need to update the option and use one of the expected values.')}
    ${c.gray(`Use the ${c.cyan('defineConfig')} named export for type checking`)}
    `
  );

  process.exit(0);

};

/**
 * Missing Configuration
 *
 * Throws when the `syncify.config` file cannot be resolved or found in the workspace.
 */
export function missingConfig (cwd: string) {

  error(
    nlr(2),
    c.redBright.bold('ERROR (!)'),
    nlr(2),
    c.red(`${c.bold(`Missing ${c.cyan('syncify.config.js')} configuration`)}`) + nlr(2),
    c.red('Unable to resolve a configuration file within the workspace') + nlr(2),
    c.red(`at${c.COL} ${c.gray.underline(cwd)}`) + nlr(2),
    c.white.bold('How to fix?') + nl,
    `
    ${c.gray('You need to add one the following files to your project')}

    ${c.gray('-')} ${c.white('syncify.config.ts')}
    ${c.gray('-')} ${c.white('syncify.config.js')}
    ${c.gray('-')} ${c.white('syncify.config.mjs')}
    ${c.gray('-')} ${c.white('syncify.config.cjs')}
    ${c.gray('-')} ${c.white('syncify.config.json')}

    ${c.gray('You can also provide configuration in your')} ${c.white('package.json')}
    ${c.gray('file using on a')} ${c.yellowBright('"syncify": {}')} ${c.gray('property.')}
    `
  );

  process.exit(0);

};

/**
 * Unknown Option
 *
 * Throws an error when an unknown config option  was provided.
 */
export function throwError (message: string, solution: string | string[]) {

  error(
    nlr(2),
    c.redBright.bold('(!) ERROR'),
    nlr(2),
    c.red.bold(message) + nlr(2),
    c.white.bold('How to fix?') + nl,
    c.gray(isArray(solution) ? solution.join(nl).trimStart() : solution),
    nlr(2)
  );

  process.exit(0);

};

/**
 * Unknown Option
 *
 * Throws an error when an unknown config option was provided.
 */
export function unknownError (option: string, value: any) {

  if (option.indexOf('.') > -1) {
    option = (
      c.gray.bold('{ ') +
      option.split('.').filter(Boolean).join(c.gray(' → ')) +
      c.gray(' → ') +
      c.redBright.bold(value) +
      c.gray.bold(' }')
    );
  }

  const cfile = $.file.base === 'package.json'
    ? `${c.blue('syncify')} config in the ${c.blue('package.json')} file.`
    : `${c.blue($.file.base)} file.`;

  error(
    nlr(2),
    c.redBright.bold('ERROR (!)'),
    nlr(2),
    c.redBright(`Unknown ${option} option provided.`) + nlr(2),
    c.white.bold('How to fix?') + nl,
    `
    ${c.gray(`The ${c.blue(value)} option is invalid or unsupported.`)}
    ${c.gray(`You need to remove it from the ${cfile}`)}
    `
  );

  process.exit(0);

};
