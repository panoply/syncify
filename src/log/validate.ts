import { type, has } from 'rambdax';
import { isArray, isUndefined, nl, ws, error, nlr } from '../utils/native';
import { bold, yellow, yellowBright, line, white, colon, red, cyan, gray, blue } from '~cli/ansi';

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
    red(`
      ${bold(`Invalid ${cyan(option)} configuration`)}

      The ${cyan(name)} option has an incorrect type value.

      Provided${gray(':')} ${yellow.bold(type(value).toLowerCase())}
      Expected${gray(':')} ${blue.bold(expects)}

      ${white.bold('How to fix?')}
      ${white('You need to update the option type.')}

    `)
  );

  process.exit(1);

};

/**
 * Missing Dependency
 *
 * Throws an error when an invalid config option was provided.
 */
export function missingDependency (dep: string) {

  error(
    red(`
      ${bold(`Missing ${cyan(dep)} dependency`)}

      You need to install ${cyan(dep)} to use it as a processor

      ${white.bold('How to fix?')}
      ${white('Run ' + bold('pnpm add ' + dep + '-D'))}

    `)
  );

  process.exit(1);

};

/**
 * Invalid Option
 *
 * Throws an error when an invalid config option was provided.
 */
export function invalidError (option: string, name: any, value: any, expects: string) {

  error(
    red(`
      ${bold(`Invalid ${cyan(option)} configuration`)}

      The ${cyan(name)} option has an invalid or missing value.

      Provided${gray(':')} ${yellow.bold(value)}
      Expected${gray(':')} ${blue(expects.replace(/([|,])/g, gray('$1')))}

      ${white.bold('How to fix?')}
      ${white('You need to update the option and use one of the expected values.')}

    `)
  );

  process.exit(1);

};

/**
 * Missing Configuration
 *
 * Throws when the `syncify.config` file cannot be resolved or found in the workspace.
 */
export function missingConfig (cwd: string) {

  error(
    red(`
      ${bold(`Missing ${cyan('syncify.config.js')} configuration`)}

      Unable to resolve a configuration file in the workspace.

      Directory${colon + gray.underline(cwd)}

      ${white.bold('How to fix?')}
      ${white('Add one of the following files to your workspace') + colon}
        ${gray('-')} ${white('syncify.config.ts')}
        ${gray('-')} ${white('syncify.config.js')}
        ${gray('-')} ${white('syncify.config.mjs')}
        ${gray('-')} ${white('syncify.config.cjs')}
        ${gray('-')} ${white('syncify.config.json')}
    `)
  );

  process.exit(1);

};

/**
 * Unknown Option
 *
 * Throws an error when an unknown config option  was provided.
 */
export function throwError (message: string, solution: string | string[]) {

  error(
    red.bold(`Error ${message + nlr(2)}`),
    gray.italic(isArray(solution) ? solution.join(nl) : solution)
  );

  process.exit(1);

};

/**
 * Unknown Option
 *
 * Throws an error when an unknown config option was provided.
 */
export function unknownError (option: string, value: any) {

  console.error(
    red.bold(`Unknown ${option} option\n\n`),
    red(`The ${bold(value)} option in invalid, remove it from the config`)
  );

  process.exit(1);

};
