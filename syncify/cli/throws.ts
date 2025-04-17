import { basename } from 'node:path';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';
import { kill } from '@syncify/kill';

import { error } from '~errors';
import { log } from '~log';
import { has, isString, isUndefined, keys, o, prettyDate, type } from '~utils';

import { $ } from '$';

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
export const warnings: { [group: string]: string[] } = o();

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
export const severities: { [group: string]: string[] } = o();

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
      warnings[group].push(_.yellowBright(message));
    } else {
      warnings[group].push(_.yellowBright(message + _.COL + WSP + _.bold(value)));
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
      severities[group].push(_.Tree.red + _.red(message));
    } else {
      severities[group].push(_.Tree.red + _.red(message + _.COL + WSP + _.bold(value)));
    }
  };
};

export function internalError (e: Error) {

  const message = _.Create({ type: 'error' })
  .Line('INTERNAL ERROR ~ Thrown during define()', _.bold)
  .Header(e.message)
  .Wrap(_.cleanStack(e.stack))
  .Newline()
  .Line('Submit Issue', _.gray.bold)
  .Line('This is an internal error thrown by Syncify. Please report to the', _.gray)
  .Line('Github repository and provide re-production information', _.gray)
  .Newline()
  .Line(_.CHV + WSP + _.underline.gray('https://github.com/panoply/syncify/issues'))
  .Newline()
  .End($.log.group)
  .Break()
  .toString();

  error(message);

  $.running ? kill.exit(0) : process.exit(0);

}

/**
 * Invalid Type
 *
 * Throws an error when an invalid type was provided to a config option.
 */
export function typeError ({ option, name, provided, expects }: {
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

  const base = basename($.file.config);

  error(
    _
    .Create({ type: 'error' })
    .Line('TYPE ERROR', _.bold)
    .Newline()
    .Line(`An invalid ${_.cyan(option)} type value was provided within your ${_.bold(base)} file.`)
    .Line(`The ${_.cyan(name)} option has an incorrect type. Syncify will not intialize until this is fixed.`)
    .Newline()
    .Line(`provided${_.COL} ${_.yellowBright(type(provided).toLowerCase())}`)
    .Line(`expected${_.COL} ${_.blue(expects.replace(/([|,])/g, _.gray('$1')))}`)
    .Line(`location${_.COL} ${_.TLD}${_.gray.underline(base)}`)
    .Newline()
    .Line('How to fix?', _.gray.bold)
    .Line(`You need to change the option value to use the ${_.blue('expected')} type.`, _.gray)
    .Line(`Use the ${_.white('defineConfig')} named export for type checking`, _.gray)
    .End($.log.group)
    .Break()
    .toString()

  );

  $.running ? kill.exit(0) : process.exit(0);

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
    provided = glue.ws($.argv);
    expected = _.whiteBright(`sy ${provided} ${_.cyan(expected.replace(/([|,-])/g, _.gray('$1')))}`);
  } else {
    expected = _.whiteBright(`sy ${expected}`);
  }

  error(
    _.Create({ type: 'error' })
    .Line('COMMAND ERROR', _.bold)
    .Newline()
    .Wrap(message)
    .Newline()
    .Line(`provided${_.COL} ${_.whiteBright('$')} ${provided}`)
    .Line(`expected${_.COL} ${_.whiteBright('$')} ${expected}`)
    .Newline()
    .Line('How to fix?', _.gray.bold)
    .Wrap(fix, _.gray)
    .Newline()
    .End($.log.group)
    .Break()
    .toString()
  );

  $.running ? kill.exit(0) : process.exit(0);

}

/**
 * Invalid Target
 *
 * Throws an error when an invalid command expression was passed.
 * Determined by the `-T` (or `--target`) argument.
 *
 * ```
 * │ INVALID THEME TARGET
 * │
 * │ The theme target "name" is either undefined or unknown. Please provide
 * │ One or more valid theme targets as defined in your package.json:
 * │
 * │ — foo
 * │ — bar
 * │ — baz
 * │
 * │ How to fix?
 * │ Check for typos in the theme target name. If you intended to use this target,
 * │ ensure it is properly defined and associated or connect it using sy setup.
 * ```
 */
export function invalidTarget ({
  type,
  provided,
  storeName = null
}: {
  type: 'theme' | 'store';
  provided: string;
  storeName?: string
}) {

  const targets = $.file.targets === null
    ? 'package.json'
    : basename($.file.targets);

  const message = storeName ? [
    `The ${_.bold(storeName)} ${type} has no theme "${_.bold.redBright(provided)}" target defined.`,
    `Provide one or more valid ${storeName} theme target/s as defined in your ${targets} file:`
  ] : [
    `The ${type} target "${_.bold.redBright(provided)}" is either undefined or unknown.`,
    `Provide one or more valid ${type} target/s as defined in your ${targets} file:`
  ];

  const solution = [
    `Check for typos in the ${type} target name. If you intended to use this target`,
    `ensure it is properly defined and associated or use ${_.blue('sy setup')} to connect it.`
  ];

  const expected = storeName
    ? keys($.stores.get(storeName).themes).map(name => `${_.DSH} ${_.redBright(name)}`)
    : type === 'store'
      ? $.stores.map(({ name }) => `${_.DSH} ${_.redBright(name)}`)
      : $.stores.flatMap(({ themes }) => keys(themes).map(name => `${_.DSH} ${_.redBright(name)}`));

  _.Create({ type: 'error' })
  .Newline('line')
  .Append(`INVALID ${type.toUpperCase()} TARGET`, _.bold)
  .Wrap(message)
  .Newline()
  .Multiline(expected)
  .Newline()
  .Line('How to fix?', _.gray.bold)
  .Wrap(solution, _.gray)
  .Newline('line')
  .End($.log.group)
  .toLog()
  .Break();

  kill.exit(2);

}

/**
 * Ambiguous Target
 *
 * Throws if command line argument expression is referencing a theme
 * name that can result in repeat targets. Reaching this error would
 * mean that targets take a structure like:
 *
 * ```json
 * {
 *   "store-1": {
 *     "example": 1234567890
 *   },
 *   "store-2": {
 *     "example": 0987654321
 *   }
 * }
 * ```
 *
 * If the user was to pass the following target command:
 *
 * ```bash
 * $ sy watch -T example
 * ```
 *
 * Then this error will be thrown, because it is unclear of the exact
 * theme that should be targeted, because both `store-1` and `store-2`
 * use the same name.
 *
 * ```bash
 * │ AMBIGUOUS THEME TARGET
 * │
 * │ The theme target name "example" is an ambiguous reference and used
 * │ by multiple stores in this project. Syncify is unable to determine
 * │ which theme you wish interface.
 * │
 * │ Prefix command with store name/s:
 * │
 * │ provided: -T example
 * │ expected: -T store-1:example
 * │
 * │ Use a glob star * prefix to instruct Syncify to target all stores:
 * │
 * │ provided: -T example
 * │ expected: -T *:example
 * ```
 */
export function ambiguousThemeTarget (target: string) {

  const expected = $.stores
  .filter(({ themes }) => target in themes)
  .map(({ name }) => `${name}${_.COL}${target}`)
  .join(WSP);

  const alias = _.capture.dash($.argv.some(value => value === '--target') ? '--target' : '-T', _.gray);
  const message = [
    `The theme target name "${_.cyan(target)}" is an ambiguous reference and used`,
    'by multiple stores in this project. Syncify is unable to determine which theme you wish interface'
  ];

  _.Create({ type: 'error' })
  .Newline('line')
  .Append('AMBIGUOUS THEME TARGET', _.bold)
  .Wrap(message)
  .Header('Prefix command with store name/s' + _.COL)
  .Line(`${_.bold('provided')}${_.COL} ${_.yellowBright(`${alias} ${target}`)}`)
  .Line(`${_.bold('expected')}${_.COL} ${_.blueBright(`${alias} ${expected}`)}`)
  .Header(`Use a glob star ${_.cyan('*')} prefix to instruct Syncify to target all stores${_.COL}`)
  .Line(`${_.bold('provided')}${_.COL} ${_.yellowBright(`${alias} ${target}`)}`)
  .Line(`${_.bold('expected')}${_.COL} ${_.blueBright(`${alias} *${_.COL}${target}`)}`)
  .Newline('line')
  .End($.log.group)
  .toLog()
  .Break();

  kill.exit(2);

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
    _.Create({ type: 'error' })
    .Line('ENOENT ERROR', _.bold)
    .Newline()
    .Wrap(`Failed to resolve ${_.cyan(path)} ${type}.`, ...message)
    .Newline()
    .Line(`task${_.COL} ${_.yellowBright(task)}`)
    .Line(`path${_.COL} ${_.blue(path)}`)
    .Newline()
    .End($.log.group)
    .Break()
    .toString()
  );

  $.running ? kill.exit(0) : process.exit(0);

}

/**
 * Missing Dependency
 *
 * Throws an error when an invalid config option was provided.
 */
export function missingDependency (deps: string | string[]) {

  log.runtime.Stop();

  const tui = _.Create({ type: 'error' })
  .Line('DEPENDENCY ERROR', _.bold)
  .Newline();

  if (isString(deps)) {

    const message = glue.ws(
      `Missing ${_.cyan(deps)} dependency. You need to install ${_.cyan(deps)} to use it as`,
      'a processor or remove the reference to it within your transform/s.'
    );

    tui
    .Wrap(message)
    .Newline()
    .Line('How to fix?', _.gray.bold)
    .Line('Install the above module as a development dependency, for example:', _.gray)
    .Newline()
    .Line(`$ pnpm add ${deps} -D`, _.whiteBright);

  } else {

    const message = glue.ws(
      `Missing ${_.cyan(`${deps.length}`)} dependencies. You are attempting to use a processor`,
      'transform that is not yet installed in your project. Install the below module/s as',
      'development dependencies or disable the transform:'
    );

    tui
    .Wrap(message)
    .Newline();

    for (const dep of deps) {

      tui.Line(`$ pnpm add ${dep} -D`, _.whiteBright);

    }
  }

  error(
    tui
    .Newline()
    .End($.log.group)
    .Break()
    .toString()
  );

  $.running ? kill.exit(0) : process.exit(0);

};

/**
 * Missing Option
 *
 * Throws an error when an option is required but not defined
 */
export function missingOption ({ option, key, expects, reason }:{
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

  const base = basename($.file.config);

  if (option.indexOf('.') > -1) {

    option = option.split('.').filter(Boolean).join(_.gray(' → '));

  }

  error(
    _.Create({ type: 'error' })
    .Line('MISSING OPTION', _.bold)
    .Newline()
    .Line(`Missing ${_.Encase('CB', _.cyan(option), { spaced: true })} config option.`)
    .Line(`The ${_.cyan(key)} option must be defined`)
    .Newline()
    .Line(`expected${_.COL} ${_.blue(expects.replace(/([|,])/g, _.gray('$1')))}`)
    .Line(`location${_.COL} ${_.gray.underline(base)}`)
    .Newline()
    .Line('Why?', _.gray.bold)
    .Wrap(reason, _.gray)
    .Newline('line')
    .End($.log.group)
    .Break()
    .toString()
  );

  $.running ? kill.exit(0) : process.exit(0);

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
    option = option.split('.').filter(Boolean).join(_.gray(' → '));
  }

  error(
    _.Create({ type: 'error' })
    .Line('OPTION ERROR', _.bold)
    .Newline()
    .Wrap(`Unsupported ${_.cyan(option)} config. The ${_.cyan(invalid)} option is not supported in Syncify`)
    .Newline()
    .Line('How to fix?', _.gray.bold)
    .Line(fix, _.gray)
    .Line(`Use the ${_.cyan('defineConfig')} named export for type checking`)
    .End($.log.group)
    .Break()
    .toString()
  );

  $.running ? kill.exit(0) : process.exit(0);

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
    .join(_.gray(' → '));
  }

  error(
    _.Create({ type: 'error' })
    .Line('INVALID ERROR', _.bold)
    .Newline()
    .Wrap(`Invalid ${_.cyan(option)} configuration. The ${_.cyan(name)} option is invalid. `, ...reason)
    .Newline()
    .Line(`provided${_.COL} ${_.yellowBright(value)}`)
    .Line(`expected${_.COL} ${_.blue(expects.replace(/([|,])/g, _.gray('$1')))}`)
    .Newline()
    .Line('How to fix?', _.gray.bold)
    .Line('You need to update the option and use one of the expected values.', _.gray)
    .Line(`Use the ${_.white('defineConfig')} named export for type checking`, _.gray)
    .Newline()
    .End($.log.group)
    .Break()
    .toString({ color: _.red })
  );

  $.running ? kill.exit(0) : process.exit(0);

};

/**
 * Invalid Structure
 *
 * Throws when resolution cannot be obtained of the input (source)
 */
export function invalidInput (title: string) {

  error(
    _.Create()
    .Error(title.toUpperCase(), _.bold.redBright)
    .Newline('red')
    .Error(`Failed to obtain resolution of the ${_.bold('input')} base directory.`)
    .Error('The path does not exist or the directory is empty.')
    .Newline('red')
    .Error(`${_.BAD} ${_.bold.underline($.dirs.input.replace($.cwd, '').slice(1))}**`)
    .Newline()
    .Line('How to fix?', _.gray.bold)
    .Line(`Check that the ${_.cyan(basename($.dirs.input))} directory can be resolved.`, _.gray)
    .Newline()
    .End($.log.group)
    .Break()
    .toString()
  );

  $.running ? kill.exit(0) : process.exit(0);

};

/**
 * Missing Stores
 *
 * Throws when store references are missing within the `package.json` file.
 */
export function missingStores (cwd: string) {

  error(
    _.Create({ type: 'error' })
    .Line(`${'MISSING REFERENCE'}`, _.bold)
    .Newline()
    .Line(`You have not provided any ${_.bold('stores')} within your ${_.cyan('package.json')} file.`)
    .Newline()
    .Line('How to fix?', _.white.bold)
    .Line(`You need to provide ${_.cyan('stores')} via ${_.cyan('syncify')} key`, _.gray)
    .Line('passing both the shop name and a key > value list of theme targets.', _.gray)
    .Newline()
    .Line('{', _.gray)
    .Line('  "syncify": {'.replace(/"/g, _.white('"')), _.gray)
    .Line('    "stores": {'.replace(/"/g, _.white('"')), _.gray)
    .Line(`      "${_.redBright('your-store')}": {}`.replace(/"/g, _.white('"')), _.gray)
    .Line('    }', _.gray)
    .Line('  }', _.gray)
    .Line('}', _.gray)
    .Newline()
    .Line(`Replace the ${_.white('your-store')} with the name of your .myshopify domain.`, _.gray)
    .Line('Syncify will prompt you and provide a list of theme targets to select from.', _.gray)
    .Newline()
    .End($.log.group)
    .Break()
    .toString()
  );

  $.running ? kill.exit(0) : process.exit(0);

};

/**
 * Missing Configuration
 *
 * Throws when the `syncify.config` file cannot be resolved or found in the workspace.
 */
export function missingConfig (cwd: string) {

  error(
    _.Create()
    .Error(`${`Missing ${_.cyan('syncify.config.js')} configuration`}`, _.bold)
    .Newline('red')
    .Error('Unable to resolve a configuration file within the workspace')
    .Newline('red')
    .Error(`at${_.COL} ${_.gray.underline('~' + cwd)}`)
    .NL
    .Line('How to fix?', _.white.bold)
    .Line('You need to add one the following files to your project', _.gray)
    .NL
    .Line(`${_.DSH} ${_.white('syncify.config.ts')}`, _.gray)
    .Line(`${_.DSH} ${_.white('syncify.config.js')}`, _.gray)
    .Line(`${_.DSH} ${_.white('syncify.config.mjs')}`, _.gray)
    .Line(`${_.DSH} ${_.white('syncify.config.cjs')}`, _.gray)
    .Line(`${_.DSH} ${_.white('syncify.config.json')}`, _.gray)
    .NL
    .Line(`You can also provide configuration in your ${_.white('package.json')}`, _.gray)
    .Line(`file using the ${_.cyan('"syncify": { "config": {} }')} 'property.`, _.gray)
    .NL
    .End($.log.group)
    .Break()
    .toString()
  );

  $.running ? kill.exit(0) : process.exit(0);

};

/**
 * Existing Project
 *
 * Throws when attempting to run `create` command in an existing syncify project.
 * This is not allowed
 */
export function existingProject () {

  const message = glue.ws(
    'Creating a new project within existing project is not allowed.',
    `The ${_.cyan('create')} command is a strap generator which cannot`,
    'be executed inside a known project structure.'
  );

  const suggest = glue.ws(
    `Execute the ${_.cyan('sy create')} from a different location not within this directory.`,
    `You can configure this project using the ${_.cyan('sy setup')} command. If you are stuck`,
    `or confused, use the ${_.cyan('sy inspect')} command for current project context.`
  );

  error(
    _.Create({ type: 'error' })
    .Line('PROJECT ALREADY EXISTS', _.bold)
    .Newline()
    .Wrap(message)
    .Newline()
    .Line('How to fix?', _.white.bold)
    .Wrap(suggest, _.gray)
    .Newline()
    .End($.log.group)
    .Break()
    .toString({ color: _.red })
  );

  $.running ? kill.exit(0) : process.exit(0);

};

/**
 * Existing Project
 *
 * Throws when attempting to run `create` command in an existing syncify project.
 * This is not allowed
 */
export function unknownProject () {

  const message = glue.ws(
    'Syncify cannot run from this location as it is unknown. The necessary files',
    'and references that would auto-confirm this directory as a valid project could',
    'not be located.'
  );

  const write = _.Create({ type: 'error' })
  .Line('UNKNOWN PROJECT', _.bold)
  .Newline()
  .Wrap(message)
  .Header(`${_.underline.redBright($.cwd)}`);

  let _stores = false;
  let _credential = false;
  let _config = false;

  if ($.project.credentials === null) {
    write.Line(`${_.BAD} no credentials`, _.bold);
  } else {
    _credential = true;
  }

  if ($.stores.length === 0) {
    write.Line(`${_.BAD} no targets`, _.bold);
  } else {
    _stores = true;
  }

  if ($.file.config === null) {
    write.Line(`${_.BAD} no config file`, _.bold);
  } else {
    _config = true;
  }

  if (_config) write.Line(`${_.CHK} ${basename($.file.config)}`, _.neonGreen);
  if (_stores) write.Line(`${_.CHK} stores defined`, _.neonGreen);
  if (_credential) {
    if ($.project.credentials === 'env') {
      write.Line(`${_.CHK} .env file`, _.neonGreen);
    } else {
      write.Line(`${_.CHK} using keychain`, _.neonGreen);
    }
  }

  const suggest = glue.ws(
    `Run the ${_.neonCyan('sy init')} command if you would like to make this directory a Syncify project.`,
    'You can alternatively provide the necessary files/references. For more information',
    `visit the setup guide: ${_.underline('https://syncify.sh/setup/')}`
  );

  error(
    write
    .Newline()
    .Line('How to fix?', _.gray.bold)
    .Wrap(suggest, _.gray)
    .Newline('line')
    .End($.log.group)
    .Break()
    .toString({ color: _.red })
  );

  $.running ? kill.exit(0) : process.exit(0);

};

/**
 * Missing Configuration
 *
 * Throws when the `.env` file cannot be resolved or found in the workspace.
 */
export function missingEnv () {

  const message = glue.ws(
    `Missing ${_.cyan('.env')} credentials. Syncify could not resolve credentials within the workspace.`,
    `Check you have ${_.cyan('.env')} file present in the root of your project`
  );

  error(
    _.Create({ type: 'error' })
    .Line('MISSING ENV', _.bold)
    .Newline()
    .Wrap(message)
    .Newline()
    .End($.log.group)
    .Break()
    .toString({ color: _.red })
  );

  $.running ? kill.exit(0) : process.exit(0);

};

/**
 * Invalid Credentials
 */
export function invalidCredentials () {

  const message = glue.ws(
    'The project\'s authorization access failed due to missing or invalid credentials.',
    'Syncify could not obtain the store access tokens. Check that you have correctly',
    `provided API access within your ${_.cyan('.env')} file.`
  );

  const suggest = glue.ws(
    'Credentials are expected to adhere to a specific format and can be expressed',
    'in either uppercase or lowercase. The store name must be is appended with "_api_token".',
    `If the Shopify store (domain) name is ${_.white('foo-store.myshopify.com')}:`
  );

  error(
    _.Create({ type: 'error' })
    .Line('BAD CREDENTIALS', _.bold)
    .Newline()
    .Wrap(message)
    .Newline()
    .Line($.file.env, _.underline.redBright)
    .Newline()
    .Line('How to fix?', _.gray.bold)
    .Wrap(suggest, _.gray)
    .Newline()
    .Line("FOO-STORE_API_TOKEN = 'shpat_abcdefghijklmnopqrstuvwz'", _.gray)
    .Newline()
    .End($.log.group)
    .Break()
    .toString({ color: _.red })
  );

  $.running ? kill.exit(0) : process.exit(0);

};

/**
 * Unknown Option
 *
 * Throws an error when an unknown config option was provided.
 */
export function errorRuntime (e: any, options: {
  message: string | string[];
  solution: string | string[]
  entries?: {
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

  log.runtime
  .Tree('error')
  .Header('ERROR', _.bold.red)
  .Wrap(options.message, _.redBright)
  .Newline()
  .Wrap(message, _.redBright.bold)
  .Newline()
  .Line('How to fix?', _.gray.bold)
  .Wrap(options.solution, _.gray)
  .Newline()
  .True(has('entries', options), _ => _.Context({ entries: options.entries }))
  .Newline()
  .End($.log.group)
  .Break()
  .toWrite({ clear: true });

  $.running ? kill.exit(0) : process.exit(0);

};

/**
 * Throws Error
 *
 * Throws an error of any kind.
 */
export function throwError (message: string | string[], solution?: string[], errName?: string) {

  if (!errName) errName = 'ERROR';

  const tui = _.Create({ type: 'error' })
  .Line(errName.toUpperCase(), _.bold)
  .Newline()
  .Wrap(message);

  if (solution && solution.length > 0) {

    tui.Line('How to fix?', _.gray.bold).Wrap(solution, _.gray);

  }

  error(
    tui
    .Newline(_.Tree.trim)
    .End($.log.group)
    .Break()
    .toString()
  );

  $.running ? kill.exit(0) : process.exit(0);

};

/**
 * Throws Command
 *
 * Throws an error of any kind.
 */
export function throwCommand (message: string | string[]) {

  _.Create({ type: 'error' })
  .Top(`Syncify ${_.CHV} Error`, false)
  .Newline(_.Tree.trim)
  .Line('COMMAND LINE ERROR', _.bold)
  .Newline()
  .Wrap(message)
  .Newline()
  .Line('Need Help?', _.gray.bold)
  .Line('Refer to the usage documentation for more information:', _.gray)
  .Line(_.underline('https://syncify.sh/usage/syncify-cli'), _.gray)
  .Newline(_.Tree.trim)
  .End(`Syncify ${_.CHV} Error`, false)
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);

};

/**
 * Unknown Option
 *
 * Throws an error when an unknown config option was provided.
 */
export function unknownError (option: string, value: any) {

  if (option.indexOf('.') > -1) {

    const opts = option.split('.').filter(Boolean).join(WSP + _.ARR + WSP);
    const join = glue.ws(opts, _.ARR, _.red.bold(value));

    option = _.Encase('CB', join, { spaced: true });

  }

  const base = basename($.file.config);
  const file = base === 'package.json'
    ? `${_.blue('syncify')} config in the ${_.blue('package.json')} file.`
    : `${_.blue(base)} file.`;

  error(
    _.Create({ type: 'error' })
    .Line('ERROR', _.bold)
    .Newline()
    .Line(`Unknown ${_.cyan(option)} option provided.`)
    .Newline()
    .Line('How to fix?', _.gray.bold)
    .Line(`The ${_.cyan(value)} option is invalid or unsupported.`)
    .Line(`You need to remove it from the ${file}`)
    .Newline()
    .End($.log.group)
    .Break()
    .toString()
  );

  $.running ? kill.exit(0) : process.exit(0);

};

/**
 * Throws when attempting to initialise in an existing project
 */
export function projectExists () {

  _.Create({ type: 'error' })
  .Error('PROJECT ALREADY EXISTS ' + _.BAD, _.bold.redBright)
  .Newline('red')
  .Error('You cannot initialize inside of a pre-existing project.', _.redBright)
  .Header(`PROJECT${_.COL}`, _.bold)
  .Line(`${_.gray('NAME')}${_.COL}     ${_.whiteBright($.project.name)}`)
  .Line(`${_.gray('CWD')}${_.COL}      ${_.whiteBright($.cwd)}`)
  .Line(`${_.gray('CACHE')}${_.COL}    ${_.whiteBright($.dirs.cache)}`)
  .Line(`${_.gray('CREATED')}${_.COL}  ${_.whiteBright(prettyDate($.project.createdAt))}`)
  .Line(`${_.gray('UPDATED')}${_.COL}  ${_.whiteBright(prettyDate($.project.lastRunAt))}`)
  .Line(`${_.gray('TARGETS')}${_.COL}  ${_.whiteBright($.project.targetSource)}`)
  .Line(`${_.gray('AUTH')}${_.COL}     ${_.whiteBright($.project.credentials)}`)
  .NL
  .End(`Syncify ${_.CHV} Error`, false)
  .BR
  .Break()
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);

}

/**
 * Throws when attempting to initialise in a project that is determined to be a flat structure
 */
export function flatStructure () {

  _.Create({ type: 'error' })
  .Error('FLAT DIRECTORY STRUCTURE ' + _.BAD, _.bold.redBright)
  .Newline('red')
  .Multiline([
    'Attempting to initialize a Syncify project within a flat structure.',
    'You will need to convert to a hierarchical structure and try again.'
  ])
  .NL
  .Line('How to fix?', _.gray.bold)
  .Line(`Move theme directories into a sub-directory called ${_.blue('source')}`, _.gray)
  .Line('Please refer to the documentation for more information:', _.gray)
  .NL
  .Line(`${_.CHV} ${_.underline('https://syncify.sh/usage/directory-structures')}`, _.gray)
  .Newline('line')
  .End($.log.group)
  .BR
  .Break()
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);

}
