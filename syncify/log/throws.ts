import { type, has } from 'rambdax';
import { argv } from 'node:process';
import { isUndefined, isString, glueString } from 'syncify:utils';
import { error } from 'syncify:native';
import { REGEX_OR_CHARS } from 'syncify:const';
import { $ } from 'syncify:state';
import * as c from '@syncify/ansi';

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
      warnings[group].push(c.yellowBright(message));
    } else {
      warnings[group].push(c.yellowBright(message + c.COL + WSP + c.bold(value)));
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
      severities[group].push(c.Tree.red + c.red(message));
    } else {
      severities[group].push(c.Tree.red + c.red(message + c.COL + WSP + c.bold(value)));
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
    c.Create({ type: 'error' })
    .Line('TYPE ERROR', c.bold)
    .NL
    .Line(`An invalid ${c.cyan(option)} type value was provided within your ${c.bold($.file.base)} file.`)
    .Line(`The ${c.cyan(name)} option has an incorrect type. Syncify will not intialize until this is fixed.`)
    .NL
    .Line(`provided${c.COL} ${c.yellowBright(type(provided).toLowerCase())}`)
    .Line(`expected${c.COL} ${c.blue(expects.replace(/([|,])/g, c.gray('$1')))}`)
    .Line(`location${c.COL} ${c.TLD}${c.gray.underline($.file.base)}`)
    .NL
    .Line('How to fix?', c.gray.bold)
    .Line(`You need to change the option value to use the ${c.blue('expected')} type.`, c.gray)
    .Line(`Use the ${c.white('defineConfig')} named export for type checking`, c.gray)
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
    expected = c.whiteBright(`syncify ${provided} ${c.cyan(expected.replace(/([|,-])/g, c.gray('$1')))}`);
  } else {
    expected = c.whiteBright(`syncify ${expected}`);
  }

  error(
    c.Create({ type: 'error' })
    .Line('COMMAND ERROR', c.bold)
    .NL
    .Wrap(message)
    .NL
    .Line(`provided${c.COL} ${c.whiteBright('$')} ${c.whiteBright('syncify ' + provided)}`)
    .Line(`expected${c.COL} ${c.whiteBright('$')} ${expected}`)
    .NL
    .Line('How to fix?', c.gray.bold)
    .Wrap(fix, c.gray)
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
    provided = provided.replace(REGEX_OR_CHARS, c.gray('$1'));
  }

  if (REGEX_OR_CHARS.test(expected)) {
    expected = expected.replace(REGEX_OR_CHARS, c.gray('$1'));
  }

  error(
    c.Create({ type: 'error' })
    .Line('INVALID TARGET', c.bold)
    .NL
    .Wrap(`Invalid ${c.cyan(type)} target provided. `, ...message)
    .NL
    .Line(`provided${c.COL} ${c.yellowBright(expected)}`)
    .Line(`expected${c.COL} ${c.blue(provided)}`)
    .NL
    .Line('How to fix?', c.gray.bold)
    .Wrap(fix, c.gray)
    .End($.log.group)
    .BR
    .toString()
  );

  process.exit(0);

}

/**
 * ENOENT Error
 *
 * Wrapper around ENOENT errors, when a file cannot be found or path cannot be resolved.
 */
export function enoentError ({
  type,
  path,
  message,
  task
}: {
  type: 'file' | 'directory',
  path: string;
  message: string[];
  task: string;
}) {

  error(
    c.Create({ type: 'error' })
    .Line('ENOENT ERROR', c.bold)
    .NL
    .Wrap(`Failed to resolve ${c.cyan(path)} ${type}.`, ...message)
    .NL
    .Line(`task${c.COL} ${c.yellowBright(task)}`)
    .Line(`path${c.COL} ${c.blue(path)}`)
    .NL
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

  const message = c.Create({
    type: 'error'
  }).Line('DEPENDENCY ERROR', c.bold).NL;

  if (isString(deps)) {

    message
    .Wrap(`Missing ${c.cyan(deps)} dependency. You need to install ${c.cyan(deps)} to use it as a processor.`)
    .NL
    .Line('How to fix?', c.gray.bold)
    .Line('Install the above module as a development dependency, for example:')
    .NL
    .Line(`$ pnpm add ${deps} -D`, c.whiteBright);

  } else {

    const info = [
      `Missing ${c.cyan(`${deps.length}`)} dependencies. You are attempting to use processor`,
      '(transforms) which are not yet installed. Install the below modules as development',
      'dependencies or disable the transform:'
    ];

    message
    .Wrap(info)
    .Newline();

    for (const dep of deps) {
      message.Line(`$ pnpm add ${dep} -D`, c.whiteBright);
    }
  }

  error(
    message
    .NL
    .Wrap('If you are using a different package manager please consider adopting pnpm.', c.gray)
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
    .join(c.gray(' → '));

  }

  error(
    c.Create({ type: 'error' })
    .Line('MISSING OPTION', c.bold)
    .NL
    .Wrap(
      `Missing ${c.Encase('CB', c.cyan(option), { spaced: true })} config option.`,
      `The ${c.cyan(key)} option must be defined`
    )
    .NL
    .Line(`expected${c.COL} ${c.blue(expects.replace(/([|,])/g, c.gray('$1')))}`)
    .Line(`location${c.COL} ${c.gray.underline($.file.base)}`)
    .NL
    .Line('Why?', c.gray.bold)
    .Wrap(reason, c.gray)
    .Newline('line')
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
    option = option.split('.').filter(Boolean).join(c.gray(' → '));
  }

  error(
    c.Create({ type: 'error' })
    .Line('OPTION ERROR', c.bold)
    .NL
    .Wrap(`Unsupported ${c.cyan(option)} configuration. The ${c.cyan(invalid)} option is not supported in Syncify`)
    .NL
    .Line('How to fix?', c.gray.bold)
    .Line(fix, c.gray)
    .Line(`Use the ${c.cyan('defineConfig')} named export for type checking`)
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
    .join(c.gray(' → '));
  }

  error(
    c.Create({ type: 'error' })
    .Line('INVALID ERROR', c.bold)
    .NL
    .Wrap(`Invalid ${c.cyan(option)} configuration. The ${c.cyan(name)} option is invalid. `, ...reason)
    .NL
    .Line(`provided${c.COL} ${c.yellowBright(value)}`)
    .Line(`expected${c.COL} ${c.blue(expects.replace(/([|,])/g, c.gray('$1')))}`)
    .NL
    .Line('How to fix?', c.gray.bold)
    .Line('You need to update the option and use one of the expected values.', c.gray)
    .Line(`Use the ${c.white('defineConfig')} named export for type checking`, c.gray)
    .End($.log.group)
    .BR
    .toString(c.red)
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
    c.Create({ type: 'error' })
    .Line(`${'MISSING REFERENCE'}`, c.bold)
    .NL
    .Line(`You have not provided any ${c.bold('stores')} within your ${c.cyan('package.json')} file.`)
    .NL
    .Line('How to fix?', c.white.bold)
    .Line(`You need to provide ${c.cyan('stores')} via ${c.cyan('syncify')} key`, c.gray)
    .Line('passing both your store name and a key > value list of theme targets.', c.gray)
    .NL
    .Line('{', c.gray)
    .Line('  "syncify": {'.replace(/"/g, c.white('"')), c.gray)
    .Line('    "stores": {'.replace(/"/g, c.white('"')), c.gray)
    .Line(`      "domain": "${c.redBright('your-store')}"`.replace(/"/g, c.white('"')), c.gray)
    .Line('      "themes": {}'.replace(/"/g, c.white('"')), c.gray)
    .Line('    }', c.gray)
    .Line('  }', c.gray)
    .Line('}', c.gray)
    .NL
    .Line(`Replace the ${c.white('your-store')} with the name of your .myshopify domain.`, c.gray)
    .Line('Syncify will prompt you and provide a list of theme targets to select from.', c.gray)
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
    c.Create({ type: 'nil' })
    .Line(`${`Missing ${c.cyan('syncify.config.js')} configuration`}`, c.bold)
    .BR
    .Line('Unable to resolve a configuration file within the workspace')
    .BR
    .Line(`at${c.COL} ${c.gray.underline('~' + cwd)}`)
    .BR
    .Line('How to fix?', c.white.bold)
    .Line('You need to add one the following files to your project', c.gray)
    .BR
    .Line(` - ${c.white('syncify.config.ts')}`, c.gray)
    .Line(` - ${c.white('syncify.config.js')}`, c.gray)
    .Line(` - ${c.white('syncify.config.mjs')}`, c.gray)
    .Line(` - ${c.white('syncify.config.cjs')}`, c.gray)
    .Line(` - ${c.white('syncify.config.json')}`, c.gray)
    .BR
    .Line(`You can also provide configuration in your ${c.white('package.json')}`, c.gray)
    .Line(`file using the ${c.cyan('"syncify": { "config": {} }')} 'property.`, c.gray)
    .BR
    .toString(c.red)
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
    `Missing ${c.cyan('.env')} credentials. Syncify could not resolve credentials within the workspace.`,
    `Check you have ${c.cyan('.env')} file present in the root of your project`
  ];

  error(
    c.Create({ type: 'error' })
    .Line('MISSING ENV', c.bold)
    .NL
    .Wrap(message)
    .NL
    .End($.log.group)
    .BR
    .toString(c.red)
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
    c.Create({ type: 'error' })
    .Line('ERROR', c.bold)
    .NL
    .Wrap(options.message, c.redBright)
    .NL
    .Wrap(message, c.redBright.bold)
    .NL
    .Line('How to fix?', c.gray.bold)
    .Wrap(options.solution, c.gray)
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
    c.Create({ type: 'error' })
    .Line('ERROR', c.bold)
    .NL
    .Wrap(message)
    .NL
    .Line('How to fix?', c.gray.bold)
    .Wrap(solution, c.gray)
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

    option = c.Encase('CB', glueString(
      option.split('.').filter(Boolean).join(c.gray(' → ')),
      c.ARR,
      c.redBright.bold(value)
    ), {
      spaced: true
    });

  }

  const file = $.file.base === 'package.json'
    ? `${c.blue('syncify')} config in the ${c.blue('package.json')} file.`
    : `${c.blue($.file.base)} file.`;

  error(
    c.Create({ type: 'error' })
    .Line('ERROR', c.bold)
    .NL
    .Line(`Unknown ${c.cyan(option)} option provided.`)
    .NL
    .Line('How to fix?', c.gray.bold)
    .Line(`The ${c.cyan(value)} option is invalid or unsupported.`)
    .Line(`You need to remove it from the ${file}`)
    .End($.log.group)
    .BR
    .toString()
  );

  process.exit(0);

};
