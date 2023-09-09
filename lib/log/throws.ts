import { type, has } from 'rambdax';
import { argv } from 'node:process';
import { isArray, isUndefined, isString } from 'syncify:utils';
import { error } from 'syncify:native';
import { log } from 'syncify:log';
import { $ } from 'syncify:state';
import { REGEX_OR_CHARS } from 'syncify:const';
import {
  COL,
  LCB,
  RCB,
  blue,
  blueBright,
  bold,
  cyan,
  gray,
  line,
  red,
  redBright,
  white,
  whiteBright,
  yellowBright
} from 'syncify:ansi';

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
      warnings[group].push(line.yellow + yellowBright(message));
    } else {
      warnings[group].push(line.yellow + yellowBright(message + COL + WSP + bold(value)));
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
      severities[group].push(line.red + red(message));
    } else {
      severities[group].push(line.red + red(message + COL + WSP + bold(value)));
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

  log.write(redBright.bold('⛒ FAILED'));
  log.group();

  error(
    NLR,
    red(`${bold(`Invalid ${cyan(option)} type value provided`)}`) + NLR,
    red(`The ${cyan(name)} option has an incorrect type value`) + NLR,
    red(`provided${COL} ${yellowBright(type(provided).toLowerCase())}`) + NWL,
    red(`expected${COL} ${blue(expects.replace(/([|,])/g, gray('$1')))}`) + NLR,
    red(`in${COL} ${gray.underline($.file.base)}`) + NLR,
    white.bold('How to fix?') + NWL,
    `
    ${gray('You need to change the option value to use the')} ${blue('expected')} ${gray('type.')}
    ${gray(`Use the ${cyan('defineConfig')} named export for type checking`)}
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
  provided = undefined,
  fix
}: {
  message: string | string[];
  expected: string;
  provided?: string;
  fix: string | string[];
}) {

  log.write(redBright.bold('⛒ FAILED'));
  log.group();

  if (!provided) {
    provided = argv.slice(2).join(WSP);
    expected = white('syncify ' + provided + ' ') + blue(expected.replace(/([|,])/g, gray('$1')));
  } else {
    expected = white('syncify ' + expected + ' ');
  }

  error(
    NLR,

    // ERROR DESCRIPTION

    red(`${bold('Invalid or incomplete command passed')}`) + NLR,
    red(isArray(message) ? message.join('\n ') : message) + NLR,

    // PROVIDED / EXPECTED

    red(`provided${COL} ${white('$')} ${white('syncify ' + provided)}`) + NWL,
    red(`expected${COL} ${white('$')} ${expected}`) + NLR,

    // HOW TO FIX

    white.bold('How to fix?') + NWL,
    gray(isArray(fix) ? fix.join(NWL + WSP) : fix),
    NWL
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

  log.write(redBright.bold('⛒ FAILED'));
  log.group();

  if (REGEX_OR_CHARS.test(provided)) {
    provided = provided.replace(REGEX_OR_CHARS, gray('$1'));
  }

  if (REGEX_OR_CHARS.test(expected)) {
    expected = expected.replace(REGEX_OR_CHARS, gray('$1'));
  }

  if (isArray(message)) {
    message = message.join('\n ');
  }

  error(
    NLR,

    // ERROR DESCRIPTION

    red(bold(`Invalid ${cyan(type)} target provided`)) + NLR,
    red(message) + NLR,

    // PROVIDED / EXPECTED

    red(`provided${COL} ${yellowBright(expected)}`) + NWL,
    red(`expected${COL} ${blue(provided)}`) + NLR,

    // HOW TO FIX

    white.bold('How to fix?') + NWL,
    gray(isArray(fix) ? fix.join(NWL) : fix)

  );

  process.exit(0);

}

/**
 * Missing Dependency
 *
 * Throws an error when an invalid config option was provided.
 */
export function missingDependency (deps: string | string[]) {

  log.write(redBright.bold('⛒ FAILED'));
  log.group();

  if (isString(deps)) {

    error(
      NLR,

      // ERROR MESSAGE

      red(`${bold(`Missing ${cyan(deps as string)} dependency`)}`) + NLR,
      red(`You need to install ${cyan(deps as string)} to use it as a processor`) + NLR,

      // HOW TO FIX

      white.bold('How to fix?') + NLR,

      `$ ${blue.bold('pnpm add ' + deps as string + ' -D')}` + NLR,

      gray('If you are using a different package manager (i.e: Yarn or NPM) then'),
      gray('please consider adopting pnpm. Pnpm is dope and does dope shit.')

    );

  } else {

    error(
      NLR,
      red(`${bold(`Missing ${cyan(`${deps.length}`)} dependencies`)}`) + NLR,
      red('You are attempting to use processors which are not yet installed!') + NLR,
      whiteBright(gray('-') + WSP + (deps as string[]).join(NWL + gray(' -') + WSP)) + NLR,
      white.bold('How to fix?') + NWL,
     `
     $ ${blueBright('pnpm add ' + (deps as string[]).join(WSP) + ' -D')}

     ${gray('If you are using a different package manager (i.e: Yarn or NPM) then')}
     ${gray('please consider adopting pnpm. Pnpm is dope and does dope shit.')}
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

  log.write(redBright.bold('⛒ FAILED'));
  log.group();

  if (option.indexOf('.') > -1) option = option.split('.').filter(Boolean).join(gray(' → '));

  error(
    NLR,
    red(`${bold(`Missing ${LCB} ${cyan(option)} ${RCB} configuration option`)}`) + NLR,
    red(`The ${cyan(name)} option needs to be defined`) + NLR,
    red(`expects${COL} ${blue(expects.replace(/([|,])/g, gray('$1')))}`) + NLR,
    red(`at${COL} ${gray.underline($.file.base)}`) + NLR,
    white.bold('Why?') + NLR +
    gray(isArray(why) ? ` ${why.join('\n ')}` : ` ${why}`) + NLR
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

  log.write(redBright.bold('⛒ FAILED'));
  log.group();

  if (option.indexOf('.') > -1) option = option.split('.').filter(Boolean).join(gray(' → '));

  error(
    NLR,
    redBright.bold('ERROR (!)'),
    NLR,
    red(`${bold(`Unsupported ${cyan(option)} configuration`)}`) + NLR,
    red(`The ${cyan(invalid)} option is not supported in Syncify`) + NLR,
    white.bold('How to fix?') + NWL,
    `
    ${gray(fix)}
    ${gray(`Use the ${cyan('defineConfig')} named export for type checking`)}
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

  log.write(redBright.bold('⛒ FAILED'));
  log.group();

  error(
    NLR,
    redBright.bold('ERROR (!)'),
    NLR,
    red(`${bold(`Invalid ${cyan(option)} configuration`)}`) + NLR,
    red(`The ${cyan(name)} option has an invalid or missing value`) + NLR,
    red(`provided${COL} ${yellowBright(value)}`) + NWL,
    red(`expected${COL} ${blue(expects.replace(/([|,])/g, gray('$1')))}`) + NLR,
    white.bold('How to fix?') + NWL,
    `
    ${gray('You need to update the option and use one of the expected values.')}
    ${gray(`Use the ${cyan('defineConfig')} named export for type checking`)}
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

  log.write(redBright.bold('⛒ FAILED'));
  log.group();

  error(
    NLR,
    redBright.bold('ERROR (!)'),
    NLR,
    red(`${bold(`Missing ${cyan('syncify.config.js')} configuration`)}`) + NLR,
    red('Unable to resolve a configuration file within the workspace') + NLR,
    red(`at${COL} ${gray.underline(cwd)}`) + NLR,
    white.bold('How to fix?') + NWL,
    `
    ${gray('You need to add one the following files to your project')}

    ${gray('-')} ${white('syncify.config.ts')}
    ${gray('-')} ${white('syncify.config.js')}
    ${gray('-')} ${white('syncify.config.mjs')}
    ${gray('-')} ${white('syncify.config.cjs')}
    ${gray('-')} ${white('syncify.config.json')}

    ${gray('You can also provide configuration in your')} ${white('package.json')}
    ${gray('file using on a')} ${yellowBright('"syncify": {}')} ${gray('property.')}
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

  log.group();

  error(
    NLR,
    redBright.bold('(!) ERROR'),
    NLR,
    red.bold(message) + NLR,
    white.bold('How to fix?') + NWL,
    gray(isArray(solution) ? solution.join(NWL).trimStart() : solution),
    NLR
  );

  process.exit(0);

};

/**
 * Unknown Option
 *
 * Throws an error when an unknown config option was provided.
 */
export function unknownError (option: string, value: any) {

  log.write(redBright.bold('⛒ FAILED'));
  log.group();

  if (option.indexOf('.') > -1) {
    option = (
      gray.bold('{ ') +
      option.split('.').filter(Boolean).join(gray(' → ')) +
      gray(' → ') +
      redBright.bold(value) +
      gray.bold(' }')
    );
  }

  const cfile = $.file.base === 'package.json'
    ? `${blue('syncify')} config in the ${blue('package.json')} file.`
    : `${blue($.file.base)} file.`;

  error(
    NLR,
    redBright.bold('ERROR (!)'),
    NLR,
    redBright(`Unknown ${option} option provided.`) + NLR,
    white.bold('How to fix?') + NWL,
    `
    ${gray(`The ${blue(value)} option is invalid or unsupported.`)}
    ${gray(`You need to remove it from the ${cfile}`)}
    `
  );

  process.exit(0);

};
