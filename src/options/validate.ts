import { type } from 'rambdax';
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
export const warnOption = (option: string) => {

  warnings[option] = [];

  return (message: string, value: string) => {

    warnings[option].push(`${c.line}  ${c.yellowBright(`${message}: ${c.bold(value)}`)}`);

  };

};

/**
 * Invalid Type
 *
 * Throws an error when an invalid type was provided to
 * a config option
 */
export const typeError = (option: string, name: string, value: any, expects: string) => {

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
export const missingDependency = (dep: string) => {

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
export const invalidError = (option: string, name: any, value: any, expects: string) => {

  console.error(
    c.red(`
      ${c.bold(`Invalid ${c.cyan(option)} configuration`)}

      The ${c.cyan(name)} option has an invalid value defined.

      Provided${c.gray(':')} ${c.yellow.bold(value)}
      Expected${c.gray(':')} ${c.blue(expects.replace(/([|,])/g, c.gray('$1')))}

      ${c.white.bold('How to fix?')}
      ${c.white('You need to update the option and use one of the expected values.')}

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
export const unknownError = (option: string, value: any) => {

  console.error(
    c.redBright.bold(`Unknown ${option} option\n\n`),
    c.redBright(`The ${c.bold(value)} option in invalid, remove it from the config`)
  );

  process.exit(1);

};
