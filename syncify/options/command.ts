import type { CommandModes, ParseArgsOptions, ParseCommand } from 'types';

import { join } from 'node:path';
import { argv, env } from 'node:process';
import { parseArgs } from 'node:util';

import * as _ from '@syncify/ansi';
import { glue } from '@syncify/glue';
import { kill } from '@syncify/kill';

import { log } from '~cli/log';
import { runtime } from '~cli/runtime';
import { LogModes } from '~enums';
import { event } from '~events';
import { Help } from '~mode/help';
import { assign, forKeys, includes, isNull, NooP, o } from '~utils';

import { $ } from '$';

/**
 * List of argument parser flags
 */
const flags = (): Record<string, ParseArgsOptions> => ({
  input: { type: 'string', short: 'i' },
  output: { type: 'string', short: 'o' },
  config: { type: 'string', short: 'c' },
  target: { type: 'string', multiple: true, short: 'T' },
  filter: { type: 'string', multiple: true, short: 'F' },
  help: { type: 'boolean', short: 'h' },
  version: { type: 'boolean', short: 'v' },
  align: { type: 'boolean' },
  new: { type: 'boolean' },
  merge: { type: 'boolean' },
  dev: { type: 'boolean' },
  prod: { type: 'boolean' },
  terse: { type: 'boolean' },
  clean: { type: 'boolean' },
  silent: { type: 'boolean' },
  batch: { type: 'string' },
  hot: { type: 'boolean' },
  bind: { type: 'boolean' },
  force: { type: 'boolean' },
  patch: { type: 'boolean' },
  minor: { type: 'boolean' },
  major: { type: 'boolean' },
  main: { type: 'boolean' },
  unpublished: { type: 'boolean' }
});

/**
 * Argument Parser - Extracts the positional arguments and constructs the flag references
 */
function parse (cmd: ParseCommand[]): [ ParseCommand, ReturnType<typeof parseArgs> ] {

  log.clear();

  const fallback = <[ ParseCommand, ReturnType<typeof parseArgs> ]>[
    { mode: 'suggest' },
    { values: null, positionals: null, tokens: null }
  ];

  // print help is missing command
  //
  if (argv.length === 2) {

    $.mode.suggest = true;
    return fallback;

  } else {

    const find = argv[2];

    switch (find) {
      case '-v':
      case '--version':

        $.mode.help = true;
        $.mode.version = true;
        fallback[0].mode = 'version';

        return fallback;
      case '-h':
      case '--help':
        $.mode.help = true;
        fallback[0].mode = 'help';
        return fallback;
    }

    let i: number = -1;
    let s: number = cmd.length;

    while (++i < s) if (cmd[i].mode === find) break;

    if (i === s) {
      CommandError([
        `Invalid positional or mode${_.COL} "${_.red.bold(find)}"` + NWL,
        'You must provide a known and valid execution mode.',
        `For a list of available modes, run the help command${_.COL}` + NLR,
        `${_.gray('$')} ${_.blue('sy help modes')}`
      ]);
    }

    const flag = flags();
    const mode = cmd[i];
    const options: Record<CommandModes, ParseArgsOptions> = o();

    if ('flags' in mode) {

      i = -1;
      s = mode.flags.length;

      while (++i < s) {
        if (mode.flags[i] in flag) {

          options[mode.flags[i]] = flag[mode.flags[i]];

        } else {

          // This is actually an internal error and means "flags[]"
          // has not been provided in the flags() options.
          CommandError([
            `Unknown flag expression provided "${_.bold(`--${mode.flags[i]}`)}"` + NWL,
            `Accepted flags for ${_.bold(mode.mode)} mode${_.COL}` + NLR,
            `${glue.nl(mode.flags.map(v => _.gray('--') + _.blue(v)))}`
          ]);
        }
      }
    }

    try {

      const args = parseArgs({
        args: argv,
        allowPositionals: true,
        tokens: true,
        options
      });

      return [ mode, args ];

    } catch (error) {

      CommandError(error.message.replace(/(--?)([a-z-]+)?/g, _.red.bold('$1$2')));

    }
  }
}

/**
 * Command positional extraction and validation. Throws on invalid command line
 * expressions and ensures command line sequences adhere to expected structures.
 */
function positional (cmd: ParseCommand, tokens: string[]) {

  function parseBuild () {

    if (tokens.length > 1) {

      CommandError([
        `Invalid positional ${_.bold('build')} arguments expression provided. No more than 1 transform`,
        `can be passed. Use comma ${_.bold(',')} separated expression instead, e.g:` + NLR,
        `${_.gray('$')} ${_.blue(`sy build ${_.bold(tokens.join(_.gray(',')))}`)}`
      ]);

      return false;

    } else {

      if (tokens[0].indexOf(',') > -1) {

        // eslint-disable-next-line no-unreachable-loop
        for (const transform of tokens[0].split(',')) {

          if (!includes(transform, cmd.accepts)) {

            CommandError([
              `Invalid ${_.bold('sy build')} transform "${_.bold(transform)}" provided.`,
              `Must be one of the following${_.COL}` + NLR,
              `${glue.nl(cmd.accepts.map(v => _.blue(v)))}`
            ]);

            return false;

          } else {

            $.mode[transform] = true;

            return true;

          }

        }

      } else {
        if (!includes(tokens[0], cmd.accepts)) {

          CommandError([
            `Invalid ${_.bold('sy build')} transform "${_.bold(tokens[0])}"`,
            `Must be one of the following${_.COL}` + NLR,
            `${glue.nl(cmd.accepts.map(v => _.blue(v)))}`
          ]);

          return false;

        } else {

          $.mode[tokens[0]] = true;

          return true;

        }
      }
    }

  }

  function parseHelp () {

    if (cmd.accepts.includes(tokens[0])) {

      $.mode._ = tokens[0];

      return true;

    } else {

      CommandError([
        `Invalid ${_.bold('sy help')} argument "${_.bold(tokens[0])}" ${_.TLD}`,
        `Must be one of the following${_.COL}` + NLR,
        `${glue.nl(cmd.accepts.map(v => `${_.DSH} sy help ${v}`))}`
      ]);

      return false;

    }

  }

  function parseKeychain () {

    if (cmd.accepts.includes(tokens[0])) {
      $.mode._ = tokens[0];
      return true;
    } else {
      CommandError([
        `Invalid ${_.bold('keychain')} argument "${_.bold(tokens[0])}" ${_.TLD}`,
        `Must be one of the following${_.COL}` + NLR,
        `${glue.nl(cmd.accepts.map(v => `${_.DSH} ${_.blue(v)}`))}`
      ]);

      return false;
    }

  }

  if ($.mode.build) return parseBuild();
  if ($.mode.help) return parseHelp();
  if ($.mode.keychain) return parseKeychain();

  return true;

}

/**
 * Command argv parse and runtime setup handler. This function
 * is used to analyse the command line argument and setup the
 * run mode, runtime state etc.
 */
export function command (commands: ParseCommand[]): any {

  runtime();

  const [ cmd, flags ] = parse(commands);

  if (cmd.mode === 'suggest') {
    Help($.mode);
    return NooP;
  }

  const [ node, bin ] = argv;
  const position = flags.positionals ? positional(cmd, flags.positionals.slice(3)) : false;

  event.mode(cmd.mode);

  // Command line references
  $.node = node;
  $.bin = bin;
  $.argv = argv.slice(2);
  $.dirs.module = bin.slice(0, bin.indexOf('dist/'));
  $.using = $.dirs.module.startsWith(join($.cwd, 'node_modules')) ? 'local' : 'global';
  $.terminal.wrap = Math.round($.terminal.cols - ($.terminal.cols / 3));
  $.mode[cmd.mode] = true;

  if ($.mode.build) {

    $.log.mode = LogModes.Build;

    // Activate all modes
    // TODO - Unsure of whether or not this should apply
    //
    $.mode.script = true;
    $.mode.style = true;
    $.mode.svg = true;
    $.mode.liquid = true;
    $.mode.json = true;

  } else {
    if ($.mode.watch) $.log.mode = LogModes.Watch;
    if (isNull($.log.mode) && $.mode.push) $.log.mode = LogModes.Push;
    if (isNull($.log.mode) && $.mode.pull) $.log.mode = LogModes.Pull;
    if (isNull($.log.mode) && $.mode.build) $.log.mode = LogModes.Build;
    if (isNull($.log.mode) && $.mode.pack) $.log.mode = LogModes.Pack;
  }

  // Command mode accepts additional positional values
  if (cmd.accepts !== null && $.argv.length > 1 && position === false) return NooP;

  // lets default the positionals
  if ($.mode.build) {

    $.mode.script = true;
    $.mode.style = true;
    $.mode.svg = true;
    $.mode.liquid = true;
    $.mode.json = true;

  }

  if ($.mode.help || $.mode.inspect) {
    Help($.mode);
    return NooP;
  }

  // Raw copy of parse argument values
  //
  assign($.cmd, flags.values);

  // Activate modes from flags
  //
  forKeys(mode => mode in $.mode ? $.mode[mode] = true : null, flags.values);

  if ($.mode.help) {
    $.mode._ = cmd.mode;
    Help($.mode);
    return NooP;
  }

  // Environment Variables
  //
  $.env.prod = $.mode.prod;
  $.env.dev = $.mode.dev && !$.mode.prod;
  $.env.cli = true;

  // Global Variables
  //
  env.SYNCIFY_ENV = $.env.dev ? 'dev' : 'prod';
  env.SYNCIFY_WATCH = String($.mode.watch);
  env.SYNCIFY_VERSION = VERSION;

  return (fn: Function) => fn();

};

/* -------------------------------------------- */
/* ERRORS                                       */
/* -------------------------------------------- */

/**
 * Command Error
 *
 * Throws an error of any kind.
 */
function CommandError (message: string | string[]) {

  _.Create({ type: 'error' })
  .Top(`Syncify ${_.CHV} Error`, false)
  .Newline(_.Tree.trim)
  .Line(`COMMAND LINE ERROR ${_.BAD}`, _.bold)
  .Newline()
  .Wrap(message)
  .Tree('info')
  .NL
  .Line('Need Help?', _.gray.bold)
  .Line('Refer to the usage documentation for more information:', _.gray)
  .Prepend(`${_.CHV} ${_.underline('https://syncify.sh/usage/syncify-cli')}`, _.gray)
  .NL
  .End(`Syncify ${_.CHV} Error`, false)
  .BR
  .toLog();

  $.running ? kill.exit(0) : process.exit(0);

};
