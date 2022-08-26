import { type, has } from 'rambdax';
import { c } from '../logger';

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

  return (message: string, value: string) => {
    warnings[group].push(
      `${c.line}  ${c.yellowBright(`${message}${c.whiteBright(':')} ${c.bold(value)}`)}`
    );
  };
};

/**
 * Invalid Type
 *
 * Throws an error when an invalid type was provided to
 * a config option
 */
export function typeError (option: string, name: string, value: any, expects: string) {

  console.error(c.red(`
    ${c.bold(`Invalid ${c.cyan(option)} configuration`)}

    The ${c.cyan(name)} option has an incorrect type value.

    Provided${c.gray(':')} ${c.yellow.bold(type(value).toLowerCase())}
    Expected${c.gray(':')} ${c.blue.bold(expects)}

    ${c.white.bold('How to fix?')}
    ${c.white('You need to update the option type.')}

  `));

  process.exit(1);

};

/**
 * Missing Dependency
 *
 * Throws an error when an invalid config option
 * was provided.
 */
export function missingDependency (dep: string) {

  console.error(
    c.red(`
      ${c.bold(`Missing ${c.cyan(dep)} dependency`)}

      You need to install ${c.cyan(dep)} to use it as a processor

      ${c.white.bold('How to fix?')}
      ${c.white('Run ' + c.bold('pnpm add ' + dep + '-D'))}

    `)
  );

  process.exit(1);

};

/**
 * Invalid Option
 *
 * Throws an error when an invalid config option
 * was provided.
 */
export function invalidError (option: string, name: any, value: any, expects: string) {

  console.error(
    c.red(`
      ${c.bold(`Invalid ${c.cyan(option)} configuration`)}

      The ${c.cyan(name)} option has an invalid or missing value.

      Provided${c.gray(':')} ${c.yellow.bold(value)}
      Expected${c.gray(':')} ${c.blue(expects.replace(/([|,])/g, c.gray('$1')))}

      ${c.white.bold('How to fix?')}
      ${c.white('You need to update the option and use one of the expected values.')}

    `)
  );

  process.exit(1);

};

/**
 * Missing Configuration
 *
 * Throws when the `syncify.config` file cannot be resolved
 * or found in the workspace.
 */
export function missingConfig (cwd: string) {

  console.error(
    c.red(`
      ${c.bold(`Missing ${c.cyan('syncify.config.js')} configuration`)}

      Unable to resolve a configuration file in the workspace.

      Directory${c.gray(':')} ${c.gray.underline(cwd)}

      ${c.white.bold('How to fix?')}
      ${c.white('Add one of the following files to your workspace:')}
        ${c.gray('-')} ${c.white('syncify.config.ts')}
        ${c.gray('-')} ${c.white('syncify.config.js')}
        ${c.gray('-')} ${c.white('syncify.config.mjs')}
        ${c.gray('-')} ${c.white('syncify.config.cjs')}
        ${c.gray('-')} ${c.white('syncify.config.json')}
    `)
  );

  process.exit(1);

};

/**
 * Unknown Option
 *
 * Throws an error when an unknown config option
 * was provided.
 */
export function throwError (message: string, solution: string) {

  console.error(
    c.redBright.bold(`Error ${message} option\n\n`),
    c.gray(`${solution}`)
  );

  process.exit(1);

};

/**
 * Unknown Option
 *
 * Throws an error when an unknown config option
 * was provided.
 */
export function unknownError (option: string, value: any) {

  console.error(
    c.redBright.bold(`Unknown ${option} option\n\n`),
    c.redBright(`The ${c.bold(value)} option in invalid, remove it from the config`)
  );

  process.exit(1);

};
