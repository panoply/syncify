import { basename } from 'node:path';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';
import { kill } from '@syncify/kill';

import { log } from '~log';
import { has, type } from '~utils';

import { $ } from '$';

export function throws (message: string | string[], solution?: string[], name?: string) {

  if (!name) name = 'ERROR';

  _
  .Create({ type: 'error' })
  .Line(name.toUpperCase(), _.bold)
  .Newline()
  .Wrap(message)
  .Tree('info')
  .True(solution && solution.length > 0, tui => tui.NL.Line('Solution?', _.gray.bold).Wrap(solution, _.gray))
  .NL
  .End($.log.group)
  .BR
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);
  $.running ? kill.exit(0) : process.exit(0);

}

throws.internal = (err: Error) => {

  _
  .Create({ type: 'error' })
  .Line('INTERNAL ERROR ~ Thrown during define()', _.bold)
  .Header(err.message)
  .Wrap(_.cleanStack(err.stack))
  .Tree('info')
  .NL
  .Line('Submit Issue', _.gray.bold)
  .Line('This is an internal error thrown by Syncify. Please report to the', _.gray)
  .Line('Github repository and provide re-production information.', _.gray)
  .Header(_.CHV + WSP + _.underline.gray('https://github.com/panoply/syncify/issues'))
  .End($.log.group)
  .BR
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);

};

throws.typeError = ({ option, name, provided, expects }: {
  /**
   * The config option, eg: `transform`, `terser` etc
   */
  option: string;
  /**
   * The option name in the config, eg: `script`
   */
  name: string;
  /**
   * The `typeof` value provide
   */
  provided: any;
  /**
   * The `typeof` expected
   */
  expects: string;
}) => {

  _
  .Create({ type: 'error' })
  .Line('TYPE ERROR', _.bold)
  .NL
  .Line(`An invalid ${_.cyan(option)} type value was provided in your ${_.bold(basename($.file.config))} file.`)
  .Append(`The ${_.cyan(name)} option has an incorrect type. Syncify will not intialize until this is fixed.`)
  .NL
  .Line(`provided${_.COL} ${_.yellowBright(type(provided).toLowerCase())}`)
  .Line(`expected${_.COL} ${_.blue(expects.replace(/([|,])/g, _.gray('$1')))}`)
  .Tree('info')
  .NL
  .Line('How to fix?', _.gray.bold)
  .Line(`You need to change the option value to reflect the ${_.blue('expected')} type.`, _.gray)
  .Append(`Use the ${_.blue('defineConfig')} named export for type checking`, _.gray)
  .End($.log.group)
  .BR
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);

};

throws.command = ({
  message,
  expected,
  provided,
  fix
}: {
  message: string[];
  expected: string;
  provided?: string;
  fix: string[];
}) => {

  if (!provided) {
    provided = glue.ws($.argv);
    expected = _.whiteBright(`sy ${provided} ${_.cyan(expected.replace(/([|,-])/g, _.gray('$1')))}`);
  } else {
    expected = _.whiteBright(`sy ${expected}`);
  }

  _
  .Create({ type: 'error' })
  .Line('COMMAND ERROR', _.bold)
  .NL
  .Wrap(message)
  .NL
  .Line(`provided${_.COL} ${_.whiteBright('$')} ${provided}`)
  .Line(`expected${_.COL} ${_.whiteBright('$')} ${expected}`)
  .Tree('info')
  .Prepend('How to fix?', _.gray.bold)
  .Wrap(fix, _.gray)
  .NL
  .End($.log.group)
  .BR
  .toLog();

  $.running ? kill.exit(2) : process.exit(2);

};

throws.stores = () => {

  _
  .Create({ type: 'error' })
  .Line(`${'MISSING REFERENCE'}`, _.bold)
  .NL
  .Line(`You have not provided any ${_.bold('stores')} within your ${_.cyan('package.json')} file.`)
  .Tree('info')
  .NL
  .Line('How to fix?', _.white.bold)
  .Line(`You need to provide ${_.cyan('stores')} via ${_.cyan('syncify')} key`, _.gray)
  .Line('passing both the shop name and a key > value list of theme targets.', _.gray)
  .NL
  .Line('{', _.gray)
  .Line('  "syncify": {'.replace(/"/g, _.white('"')), _.gray)
  .Line('    "stores": {'.replace(/"/g, _.white('"')), _.gray)
  .Line(`      "${_.redBright('your-store')}": {}`.replace(/"/g, _.white('"')), _.gray)
  .Line('    }', _.gray)
  .Line('  }', _.gray)
  .Line('}', _.gray)
  .NL
  .Line(`Replace the ${_.white('your-store')} with the name of your .myshopify domain.`, _.gray)
  .Line('Syncify will prompt you and provide a list of theme targets to select from.', _.gray)
  .NL
  .End($.log.group)
  .BR
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);
};

throws.enoent = ({
  type,
  path,
  message,
  task
}: {
  type: 'file' | 'directory',
  path: string;
  message: string[];
  task: string;
}) => {

  _
  .Create({ type: 'error' })
  .Line('ENOENT ERROR', _.bold)
  .Newline()
  .Wrap(`Failed to resolve ${_.cyan(path)} ${type}.`, ...message)
  .Newline()
  .Line(`task${_.COL} ${_.yellowBright(task)}`)
  .Line(`path${_.COL} ${_.blue(path)}`)
  .Tree('info')
  .NL
  .End($.log.group)
  .BR
  .toLog();

  $.running ? kill.exit(1) : process.exit(1);
};

throws.dependency = (dependencies: string[]) => {

  log.runtime.Stop();

  _
  .Create({ type: 'error' })
  .Append('DEPENDENCY ERROR', _.bold)
  .Wrap('You are attempting to use transform processor/s that are not yet installed in this project.')
  .NL
  .Line('How to fix?', _.gray.bold)
  .Wrap(_.gray, 'Install these modules as development dependencies or disable the transform using them.')
  .NL
  .Each(dependencies, function (name) { this.Line(`$ pnpm add ${name} -D`, _.whiteBright); })
  .NL
  .End($.log.group)
  .BR
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);

};

throws.option = ({
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
}) => {

  if (option.includes('.')) option = option.split('.').filter(Boolean).join(_.gray(' → '));

  _.Create({ type: 'error' })
  .Line('INVALID ERROR', _.bold)
  .NL
  .Wrap(`Error in ${_.cyan(option)} configuration. The ${_.cyan(name)} option is invalid. `, ...reason)
  .NL
  .Line(`provided${_.COL} ${_.yellowBright(value)}`)
  .Line(`expected${_.COL} ${_.blue(expects.replace(/([|,])/g, _.gray('$1')))}`)
  .Tree('info')
  .Prepend('How to fix?', _.gray.bold)
  .Line('You need to update the option and use one of the expected values.', _.gray)
  .Append(`Use the ${_.blue('defineConfig')} named export for type checking`, _.gray)
  .End($.log.group)
  .BR
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);

};

throws.runtime = (e: any, options: {
  message: string | string[];
  solution: string | string[]
  entries?: {
    [name: string]: string | number;
  }
}) => {

  const message: string = e instanceof Error ? has('message', e) ? e.message : e.toString() : e;

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
  .BR
  .toWrite({ clear: true });

  $.running ? kill.exit(0) : process.exit(0);

};

throws.unknown = () => {

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

  write
  .Tree('info')
  .NL
  .Line('How to fix?', _.gray.bold)
  .Wrap(suggest, _.gray)
  .NL
  .End($.log.group)
  .BR
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);

};
