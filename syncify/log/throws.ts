import { type, has } from 'rambdax';
import { argv } from 'node:process';
import { isUndefined, isString, glueString } from 'syncify:utils';
import { error } from 'syncify:native';
import { REGEX_OR_CHARS } from 'syncify:const';
import { Encase, Create } from 'syncify:cli/tree';
import { $ } from 'syncify:state';
import {
  Tree,
  COL,
  TLD,
  ARR,
  blue,
  bold,
  cyan,
  gray,
  red,
  redBright,
  white,
  whiteBright,
  yellowBright
} from '@syncify/ansi';

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
      warnings[group].push(yellowBright(message));
    } else {
      warnings[group].push(yellowBright(message + COL + WSP + bold(value)));
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
      severities[group].push(Tree.red + red(message));
    } else {
      severities[group].push(Tree.red + red(message + COL + WSP + bold(value)));
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
}: {
  /**
   * The config option, eg: `transform`, `terser` etc
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
    Create({ type: 'error' })
    .Line('TYPE ERROR', bold)
    .NL
    .Line(`An invalid ${cyan(option)} type value was provided within your ${bold($.file.base)} file.`)
    .Line(`The ${cyan(name)} option has an incorrect type. Syncify will not intialize until this is fixed.`)
    .NL
    .Line(`provided${COL} ${yellowBright(type(provided).toLowerCase())}`)
    .Line(`expected${COL} ${blue(expects.replace(/([|,])/g, gray('$1')))}`)
    .Line(`location${COL} ${TLD}${gray.underline($.file.base)}`)
    .NL
    .Line('How to fix?', gray.bold)
    .Line(`You need to change the option value to use the ${blue('expected')} type.`, gray)
    .Line(`Use the ${white('defineConfig')} named export for type checking`, gray)
    .End($.log.group)
    .BR
    .toString()
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
  message: string[];
  expected: string;
  provided?: string;
  fix: string[];
}) {

  if (!provided) {
    provided = argv.slice(2).join(WSP);
    expected = whiteBright(`syncify ${provided} ${cyan(expected.replace(/([|,-])/g, gray('$1')))}`);
  } else {
    expected = whiteBright(`syncify ${expected}`);
  }

  error(
    Create({ type: 'error' })
    .Line('COMMAND ERROR', bold)
    .NL
    .Wrap(message)
    .NL
    .Line(`provided${COL} ${whiteBright('$')} ${whiteBright('syncify ' + provided)}`)
    .Line(`expected${COL} ${whiteBright('$')} ${expected}`)
    .NL
    .Line('How to fix?', gray.bold)
    .Wrap(fix, gray)
    .NL
    .End($.log.group)
    .BR
    .toString()
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
  message: string[];
  expected: string;
  provided: string;
  fix: string[];
}) {

  if (REGEX_OR_CHARS.test(provided)) {
    provided = provided.replace(REGEX_OR_CHARS, gray('$1'));
  }

  if (REGEX_OR_CHARS.test(expected)) {
    expected = expected.replace(REGEX_OR_CHARS, gray('$1'));
  }

  error(
    Create({ type: 'error' })
    .Line('INVALID TARGET', bold)
    .NL
    .Wrap(`Invalid ${cyan(type)} target provided. `, ...message)
    .NL
    .Line(`provided${COL} ${yellowBright(expected)}`)
    .Line(`expected${COL} ${blue(provided)}`)
    .NL
    .Line('How to fix?', gray.bold)
    .Wrap(fix, gray)
    .End($.log.group)
    .BR
    .toString()
  );

  process.exit(0);

}

/**
 * Missing Dependency
 *
 * Throws an error when an invalid config option was provided.
 */
export function missingDependency (deps: string | string[]) {

  const message = Create({
    type: 'error'
  }).Line('DEPENDENCY ERROR', bold).NL;

  if (isString(deps)) {

    message
    .Wrap(`Missing ${cyan(deps)} dependency. You need to install ${cyan(deps)} to use it as a processor.`)
    .NL
    .Line('How to fix?', gray.bold)
    .Line('Install the above module as a development dependency, for example:')
    .NL
    .Line(`$ pnpm add ${deps} -D`, whiteBright);

  } else {

    const info = [
      `Missing ${cyan(`${deps.length}`)} dependencies. You are attempting to use processor`,
      '(transforms) which are not yet installed. Install the below modules as development',
      'dependencies or disable the transform:'
    ];

    message
    .Wrap(info)
    .Newline();

    for (const dep of deps) {
      message.Line(`$ pnpm add ${dep} -D`, whiteBright);
    }
  }

  error(
    message
    .NL
    .Wrap('If you are using a different package manager please consider adopting pnpm.', gray)
    .End($.log.group)
    .BR
    .toString()
  );

  process.exit(0);

};

/**
 * Missing Option
 *
 * Throws an error when an option is required but not defined
 */
export function missingOption ({
  option,
  key,
  expects,
  reason
}:{
  /**
   * The missing configuration option
   */
  option: string;
  /**
   * The option key
   */
  key: string;
  /**
   * The expected value
   */
  expects: string,
  /**
   *
   */
  reason: string[]
}) {

  if (option.indexOf('.') > -1) {

    option = option
    .split('.')
    .filter(Boolean)
    .join(gray(' → '));

  }

  error(
    Create({ type: 'error' })
    .Line('MISSING OPTION', bold)
    .NL
    .Wrap(`Missing ${Encase('CB', cyan(option))} config option. The ${cyan(key)} option must be defined`)
    .NL
    .Line(`expected${COL} ${blue(expects.replace(/([|,])/g, gray('$1')))}`)
    .Line(`location${COL} ${gray.underline($.file.base)}`)
    .NL
    .Line('Why?', gray.bold)
    .Wrap(reason, gray)
    .End($.log.group)
    .BR
    .toString()
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

  if (option.indexOf('.') > -1) {
    option = option.split('.').filter(Boolean).join(gray(' → '));
  }

  error(
    Create({ type: 'error' })
    .Line('OPTION ERROR', bold)
    .NL
    .Wrap(`Unsupported ${cyan(option)} configuration. The ${cyan(invalid)} option is not supported in Syncify`)
    .NL
    .Line('How to fix?', gray.bold)
    .Line(fix, gray)
    .Line(`Use the ${cyan('defineConfig')} named export for type checking`)
    .End($.log.group)
    .BR
    .toString()
  );

  process.exit(0);

};

/**
 * Invalid Option
 *
 * Throws an error when an invalid config option was provided.
 */
export function invalidError ({
  option,
  name,
  value,
  expects,
  reason = [ NIL ]
}: {
  /**
   * The config option key.
   */
  option: string;
  /**
   * The option name within the config;
   */
  name: string;
  /**
   * The option value which was provided.
   */
  value: any;
  /**
   * The expected value .
   */
  expects: string;
  /**
   * Some additional information as to why the
   * option was invalid
   *
   * @default ''
   */
  reason?: string[];
}) {

  if (option.indexOf('.') > -1) {
    option = option
    .split('.')
    .filter(Boolean)
    .join(gray(' → '));
  }

  error(
    Create({ type: 'error' })
    .Line('INVALID ERROR', bold)
    .NL
    .Wrap(`Invalid ${cyan(option)} configuration. The ${cyan(name)} option is invalid. `, ...reason)
    .NL
    .Line(`provided${COL} ${yellowBright(value)}`)
    .Line(`expected${COL} ${blue(expects.replace(/([|,])/g, gray('$1')))}`)
    .NL
    .Line('How to fix?', gray.bold)
    .Line('You need to update the option and use one of the expected values.', gray)
    .Line(`Use the ${white('defineConfig')} named export for type checking`, gray)
    .End($.log.group)
    .BR
    .toString(red)
  );

  process.exit(0);

};

/**
 * Missing Stores
 *
 * Throws when store references are missing within the `package.json` file.
 */
export function missingStores (cwd: string) {

  error(
    Create({ type: 'error' })
    .Line(`${'MISSING REFERENCE'}`, bold)
    .NL
    .Line(`You have not provided any ${bold('stores')} within your ${cyan('package.json')} file.`)
    .NL
    .Line('How to fix?', white.bold)
    .Line(`You need to provide ${cyan('stores')} via ${cyan('syncify')} key`, gray)
    .Line('passing both your store name and a key > value list of theme targets.', gray)
    .NL
    .Line('{', gray)
    .Line('  "syncify": {'.replace(/"/g, white('"')), gray)
    .Line('    "stores": {'.replace(/"/g, white('"')), gray)
    .Line(`      "domain": "${redBright('your-store')}"`.replace(/"/g, white('"')), gray)
    .Line('      "themes": {}'.replace(/"/g, white('"')), gray)
    .Line('    }', gray)
    .Line('  }', gray)
    .Line('}', gray)
    .NL
    .Line(`Replace the ${white('your-store')} with the name of your .myshopify domain.`, gray)
    .Line('Syncify will prompt you and provide a list of theme targets to select from.', gray)
    .NL
    .End($.log.group)
    .BR
    .toString()
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
    Create({ type: 'nil' })
    .Line(`${`Missing ${cyan('syncify.config.js')} configuration`}`, bold)
    .BR
    .Line('Unable to resolve a configuration file within the workspace')
    .BR
    .Line(`at${COL} ${gray.underline('~' + cwd)}`)
    .BR
    .Line('How to fix?', white.bold)
    .Line('You need to add one the following files to your project', gray)
    .BR
    .Line(` - ${white('syncify.config.ts')}`, gray)
    .Line(` - ${white('syncify.config.js')}`, gray)
    .Line(` - ${white('syncify.config.mjs')}`, gray)
    .Line(` - ${white('syncify.config.cjs')}`, gray)
    .Line(` - ${white('syncify.config.json')}`, gray)
    .BR
    .Line(`You can also provide configuration in your ${white('package.json')}`, gray)
    .Line(`file using the ${cyan('"syncify": { "config": {} }')} 'property.`, gray)
    .BR
    .toString(red)
  );

  process.exit(0);

};

/**
 * Missing Configuration
 *
 * Throws when the `.env` file cannot be resolved or found in the workspace.
 */
export function missingEnv (cwd: string) {

  const message = [
    `Missing ${cyan('.env')} credentials. Syncify could not resolve credentials within the workspace.`,
    `Check you have ${cyan('.env')} file present in the root of your project`
  ];

  error(
    Create({ type: 'error' })
    .Line('MISSING ENV', bold)
    .NL
    .Wrap(message)
    .NL
    .End($.log.group)
    .BR
    .toString(red)
  );

  process.exit(0);

};

/**
 * Unknown Option
 *
 * Throws an error when an unknown config option was provided.
 */
export function errorRuntime (e: any, options: {
  message: string | string[];
  solution: string | string[]
  entries: {
    [name: string]: string | number;
  }
}) {

  const message: string = e instanceof Error
    ? has('message', e)
      ? e.message
      : e.toString()
    : e;

  if (has('code', e)) options.entries.code = e.code;
  if (has('name', e)) options.entries.name = e.name;

  error(
    Create({ type: 'error' })
    .Line('ERROR', bold)
    .NL
    .Wrap(options.message, redBright)
    .NL
    .Wrap(message, redBright.bold)
    .NL
    .Line('How to fix?', gray.bold)
    .Wrap(options.solution, gray)
    .NL
    .Context({
      entries: options.entries
    })
    .NL
    .End($.log.group)
    .BR
    .toString()
  );

  process.exit(0);

};

/**
 * Unknown Option
 *
 * Throws an error when an unknown config option  was provided.
 */
export function throwError (message: string | string, solution: string[]) {

  error(
    Create({ type: 'error' })
    .Line('ERROR', bold)
    .NL
    .Wrap(message)
    .NL
    .Line('How to fix?', gray.bold)
    .Wrap(solution, gray)
    .NL
    .End($.log.group)
    .BR
    .toString()
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

    option = Encase('CB', glueString(
      option.split('.').filter(Boolean).join(gray(' → ')),
      ARR,
      redBright.bold(value)
    ), {
      spaced: true
    });

  }

  const file = $.file.base === 'package.json'
    ? `${blue('syncify')} config in the ${blue('package.json')} file.`
    : `${blue($.file.base)} file.`;

  error(
    Create({ type: 'error' })
    .Line('ERROR', bold)
    .NL
    .Line(`Unknown ${cyan(option)} option provided.`)
    .NL
    .Line('How to fix?', gray.bold)
    .Line(`The ${cyan(value)} option is invalid or unsupported.`)
    .Line(`You need to remove it from the ${file}`)
    .End($.log.group)
    .BR
    .toString()
  );

  process.exit(0);

};
