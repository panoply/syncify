import { type, has } from 'rambdax';
import { isArray, isUndefined, nl, ws, error, nlr, isString } from '../utils/native';
import * as c from '~cli/ansi';
import { bundle } from '~config';

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
      warnings[group].push(c.line.yellow + c.yellowBright(message + c.colon + ws + c.bold(value)));
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
      severities[group].push(c.line.red + c.red(message + c.colon + ws + c.bold(value)));
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
    c.red(`provided${c.colon}${c.yellowBright(type(provided).toLowerCase())}`) + nl,
    c.red(`expected${c.colon}${c.blue(expects.replace(/([|,])/g, c.gray('$1')))}`) + nlr(2),
    c.red(`at${c.colon}${c.gray.underline(bundle.file)}`) + nlr(2),

    c.white.bold('How to fix?') + c.colon + nl,
    `
    ${c.gray('You need to change the option value to use the')} ${c.blue('expected')} ${c.gray('type.')}
    ${c.gray(`Use the ${c.cyan('defineConfig')} named export for type checking`)}
    `
  );

  process.exit(0);

};

/**
 * Missing Dependency
 *
 * Throws an error when an invalid config option was provided.
 */
export function missingDependency (deps: string | string[]) {

  if (isString(deps)) {

    error(
      nlr(2),
      c.red(`${c.bold(`Missing ${c.cyan(deps as string)} dependency`)}`) + nlr(2),
      c.red(`You need to install ${c.cyan(deps as string)} to use it as a processor`) + nlr(2),
      c.white.bold('How to fix?') + c.colon + nl,
      `
      $ ${c.blue.bold('pnpm add ' + deps as string + ' -D')}

      ${c.gray('If you are using a different package manager (ie: Yarn or NPM) then')}
      ${c.gray('please consider adopting pnpm. Pnpm is dope and does dope shit.')}
      `
    );

  } else {

    error(
      nlr(2),
      c.red(`${c.bold(`Missing ${c.cyan(`${deps.length}`)} dependencies`)}`) + nlr(2),
      c.red('You are attempting to use processors which are not yet installed!') + nlr(2),
      c.whiteBright(c.gray('-') + ws + (deps as string[]).join(nl + c.gray(' -') + ws)) + nlr(2),
      c.white.bold('How to fix?') + c.colon + nl,
     `
     $ ${c.blueBright('pnpm add ' + (deps as string[]).join(ws) + ' -D')}

     ${c.gray('If you are using a different package manager (ie: Yarn or NPM) then')}
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
export function missingOption (option: string, name: any, expects: string, why: string) {

  error(
    nlr(2),
    c.red(`${c.bold(`Missing ${c.cyan(option)} configuration option`)}`) + nlr(2),
    c.red(`The ${c.cyan(name)} option needs to be defined`) + nlr(2),
    c.red(`expects${c.colon}${c.blue(expects.replace(/([|,])/g, c.gray('$1')))}`) + nlr(2),
    c.red(`at${c.colon}${c.gray.underline(bundle.file)}`) + nlr(2),
    c.white.bold('Why?') + c.colon + nl,
    `
    ${c.gray(why)}
    `
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
    c.white.bold('How to fix?') + c.colon + nl,
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
    c.red(`provided${c.colon}${c.yellowBright(value)}`) + nl,
    c.red(`expected${c.colon}${c.blue(expects.replace(/([|,])/g, c.gray('$1')))}`) + nlr(2),
    c.white.bold('How to fix?') + c.colon + nl,
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
    c.red(`at${c.colon + c.gray.underline(cwd)}`) + nlr(2),
    c.white.bold('How to fix?') + c.colon + nl,
    `
    ${c.gray('You need to add one the following files to your project' + c.colon)}

    ${c.gray('-')} ${c.white('syncify.config.ts')}
    ${c.gray('-')} ${c.white('syncify.config.js')}
    ${c.gray('-')} ${c.white('syncify.config.mjs')}
    ${c.gray('-')} ${c.white('syncify.config.cjs')}
    ${c.gray('-')} ${c.white('syncify.config.json')}

    ${c.gray('You can also provide configuration in your')} ${c.white('package.json')}
    ${c.gray('file using a')} ${c.yellowBright('syncify')} ${c.gray('property.')}
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
    c.white.bold('How to fix?') + c.colon + nl,
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

  error(
    nlr(2),
    c.redBright.bold('ERROR (!)'),
    nlr(2),
    c.redBright(`Unknown ${option} option provided.`) + nlr(2),
    c.white.bold('How to fix?') + c.colon + nl,
    c.white(`The ${c.redBright(value)} option in invalid, remove it from the config.`),
    nlr(2)
  );

  process.exit(0);

};
