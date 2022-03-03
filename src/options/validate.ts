import { type } from 'rambdax';
import * as c from '../cli/ansi';

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

}

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

      The ${c.cyan(name)} option has an invalid value defined.

      Provided${c.gray(':')} ${c.yellow.bold(value)}
      Expected${c.gray(':')} ${c.blue(expects.replace(/([|,])/g, c.gray('$1')))}

      ${c.white.bold('How to fix?')}
      ${c.white('You need to update the option and use one of the expected values.')}

    `)
  );

  process.exit(1);

}

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

}
