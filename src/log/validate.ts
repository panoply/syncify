import { type, has } from 'rambdax';
import { isArray, isUndefined, nl, ws, error, nlr, isString } from '../utils/native';
import { bold, yellowBright, line, white, colon, red, cyan, gray, blue, blueBright, whiteBright } from '~cli/ansi';
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
      warnings[group].push(line.yellow + yellowBright(message + colon + ws + bold(value)));
    }
  };
};

/**
 * Invalid Type
 *
 * Throws an error when an invalid type was provided to a config option
 */
export function typeError (option: string, name: string, value: any, expects: string) {

  error(
    nlr(2),
    red(`${bold(`Invalid ${cyan(option)} type value provided`)}`) + nlr(2),
    red(`The ${cyan(name)} option has an incorrect type value`) + nlr(2),
    red(`provided${colon}${yellowBright(type(value).toLowerCase())}`) + nl,
    red(`expected${colon}${blue(expects.replace(/([|,])/g, gray('$1')))}`) + nlr(2),
    red(`at${colon}${gray.underline(bundle.file)}`) + nlr(2),
    white.bold('How to fix?') + colon + nl,
    `
    ${gray('You need to change the option value to use the')} ${blue('expected')} ${gray('type.')}
    ${gray(`Use the ${cyan('defineConfig')} named export for type checking`)}
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
      red(`${bold(`Missing ${cyan(deps as string)} dependency`)}`) + nlr(2),
      red(`You need to install ${cyan(deps as string)} to use it as a processor`) + nlr(2),
      white.bold('How to fix?') + colon + nl,
      `
      $ ${blue.bold('pnpm add ' + deps as string + ' -D')}

      ${gray('If you are using a different package manager (ie: Yarn or NPM) then')}
      ${gray('please consider adopting pnpm. Pnpm is dope and does dope shit.')}
      `
    );

  } else {

    error(
      nlr(2),
      red(`${bold(`Missing ${cyan(`${deps.length}`)} dependencies`)}`) + nlr(2),
      red('You are attempting to use processors which are not yet installed!') + nlr(2),
      whiteBright(gray('-') + ws + (deps as string[]).join(nl + gray(' -') + ws)) + nlr(2),
      white.bold('How to fix?') + colon + nl,
     `
     $ ${blueBright('pnpm add ' + (deps as string[]).join(ws) + ' -D')}

     ${gray('If you are using a different package manager (ie: Yarn or NPM) then')}
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
export function missingOption (option: string, name: any, expects: string, why: string) {

  error(
    nlr(2),
    red(`${bold(`Missing ${cyan(option)} configuration option`)}`) + nlr(2),
    red(`The ${cyan(name)} option needs to be defined`) + nlr(2),
    red(`expects${colon}${blue(expects.replace(/([|,])/g, gray('$1')))}`) + nlr(2),
    red(`at${colon}${gray.underline(bundle.file)}`) + nlr(2),
    white.bold('Why?') + colon + nl,
    `
    ${gray(why)}
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
    red(`${bold(`Invalid ${cyan(option)} configuration`)}`) + nlr(2),
    red(`The ${cyan(name)} option has an invalid or missing value`) + nlr(2),
    red(`provided${colon}${yellowBright(value)}`) + nl,
    red(`expected${colon}${blue(expects.replace(/([|,])/g, gray('$1')))}`) + nlr(2),
    white.bold('How to fix?') + colon + nl,
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

  error(
    nlr(2),
    red(`${bold(`Missing ${cyan('syncify.config.js')} configuration`)}`) + nlr(2),
    red('Unable to resolve a configuration file within the workspace') + nlr(2),
    red(`at${colon + gray.underline(cwd)}`) + nlr(2),
    white.bold('How to fix?') + colon + nl,
    `
    ${gray('You need to add one the following files to your project' + colon)}

    ${gray('-')} ${white('syncify.config.ts')}
    ${gray('-')} ${white('syncify.config.js')}
    ${gray('-')} ${white('syncify.config.mjs')}
    ${gray('-')} ${white('syncify.config.cjs')}
    ${gray('-')} ${white('syncify.config.json')}

    ${gray('You can also provide configuration in your')} ${white('package.json')}
    ${gray('file using a')} ${yellowBright('syncify')} ${gray('property.')}
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
    red.bold(message) + nlr(2),
    white.bold('How to fix?') + colon + nl,
    gray(isArray(solution) ? solution.join(nl).trimStart() : solution),
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

  error(
    nlr(2),
    red.bold(`Unknown ${option} option`) + nlr(2),
    red(`The ${bold(value)} option in invalid, remove it from the config`),
    nlr(2)
  );

  process.exit(0);

};
