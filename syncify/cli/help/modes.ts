import * as _ from '@syncify/ansi';

import { COMMAND_MODES, STRAP_EXAMPLES, STRAP_THEMES } from '~const';
import { describe, highlight } from '~help/utils';
import { eqWS, forEach, toArray } from '~utils';

/**
 * Help Command Modes
 */
export function Modes (mode: string) {

  // MODE EXISTS
  //
  if (mode in Modes) return Modes[mode]();

  const tui = _.Create()
  .Top(`Syncify ${_.CHV} Error`, false)
  .Header('NOT YET AVAILABLE', _.yellowBright.bold);

  if (COMMAND_MODES.has(mode)) {

    const message = [
      `Help reference for the ${_.bold(`sy help ${mode}`)} command is not yet available to`,
      `${_.bold('sy help')} but is slated for inclusion in upcoming releases.`,
      'The command itself is valid and functional, only the help information is unavailable.'
    ];

    const modes = toArray(COMMAND_MODES)
    .filter(n => n !== 'help')
    .sort((a, b) => (a in Modes === b in Modes) ? 0 : a in Modes ? -1 : 1);

    const equal = eqWS(modes, { padding: 0 });

    tui
    .Wrap(message, _.yellowBright)
    .Newline()
    .Each(modes, name => name in Modes
      ? tui.Line(`$ sy help ${name} ${equal(name) + _.CHK}`, _.whiteBright)
      : tui.Line(`$ ${_.strikethrough(`sy help ${name}`)}`, _.gray));
  }

  tui
  .Newline()
  .End(`Syncify ${_.CHV} Error`, false)
  .Break()
  .toLog(highlight);

};

/**
 * `sy help push`
 */
Modes.push = () => {

  _.Create()
  .Top(`help ${_.TLD} sy push`, false)
  .Header(`COMMANDS${_.COL}`, _.bold)
  .Line(' $ sy push')
  .Line(' $ sy push --flags')
  .Header(`FLAGS${_.COL}`, _.bold)
  .Line(` --force               ${describe('Skips diffing and force overwrites')}`)
  .Line(` --filter, -F          ${describe('filter specific files/directories')}`)
  .Line(` --target, -T          ${describe('Target a theme or store')}`)
  .Line(` --batch <number>      ${describe('Upsert batch limits (default 10)')}`)
  .Newline()
  .End(`help ${_.TLD} sy push`, false)
  .Break()
  .toLog(highlight);

};

/**
 * `sy help pull`
 */
Modes.pull = () => {

  _.Create()
  .Top(`help ${_.TLD} sy pull`, false)
  .Header(`COMMANDS${_.COL}`, _.bold)
  .Line(' $ sy pull')
  .Line(' $ sy pull --flags')
  .Header(`FLAGS${_.COL}`, _.bold)
  .Line(` --filter, -F          ${describe('filter specific files/directories')}`)
  .Line(` --target, -T          ${describe('Target a theme or store')}`)
  .Line(` --merge               ${describe(`Merges local ${_.ARL} remote theme`)}`)
  .Line(` --align               ${describe(`Align local ${_.ARL} remote theme JSON files`)}`)
  .Line(` --force               ${describe('Skips diffing and force overwrites')}`)
  .Line(` --output, -o          ${describe('Controls where theme file/s are written')}`)
  .Line(` --batch <number>      ${describe('Upsert batch limits (default 10)')}`)
  .Newline()
  .End(`help ${_.TLD} sy push`, false)
  .Break()
  .toLog(highlight);

};

/**
 * `sy help watch`
 */
Modes.watch = () => {

  _.Create()
  .Top(`help ${_.TLD} sy watch`, false)
  .Header(`COMMANDS${_.COL}`, _.bold)
  .Line(' $ sy watch')
  .Line(' $ sy watch --flags')
  .Header(`FLAGS${_.COL}`, _.bold)
  .Line(` --target, -T         ${describe('Target a theme or store')}`)
  .Line(` --filter, -F          ${describe('filter specific files/directories')}`)
  .Line(` --hot                ${describe('Activates HOT Reloading')}`)
  .Line(` --align              ${describe('Align local theme JSON files before watching')}`)
  .Line(` --bind               ${describe('Activates 2 way bindings')}`)
  .Line(` --terse              ${describe('Terse minification')}`)
  .Line(` --dev                ${describe('Development build mode (default)')}`)
  .Line(` --prod               ${describe('Production build mode')}`)
  .Newline()
  .End(`help ${_.TLD} sy watch`, false)
  .toLog(highlight);

};

/**
 * `sy help inspect`
 */
Modes.inspect = () => {

  _.Create()
  .Top(`help ${_.TLD} sy inspect`, false)
  .Header(`DESCRIPTION${_.COL}`, _.bold)
  .Wrap('Prints information about project/s and your syncify installation.', _.gray)
  .Header(`COMMANDS${_.COL}`, _.bold)
  .Line(' $ sy inspect')
  .Newline()
  .End(`help ${_.TLD} sy inspect`, false)
  .Break()
  .toLog(highlight);

};

/**
 * `sy help create`
 */
Modes.create = () => {

  const description = [
    'The create command is an interactive command prompt. You can (optionally)',
    'provide a strap name option to skip choice selection. Options with strikethrough',
    'are either deprecated or not yet available for use.'
  ];

  const message = _.Create()
  .Top(`help ${_.TLD} sy create`, false)
  .Header(`DESCRIPTION${_.COL}`, _.bold)
  .Wrap(description, _.gray)
  .Header(`COMMANDS${_.COL}`, _.bold)
  .Line(' $ sy create')
  .Line(` $ sy create ${_.Encase('AN', 'strap')}`)
  .Header(`OPTIONS${_.COL}`, _.bold);

  const straps = [ ...STRAP_THEMES, ...STRAP_EXAMPLES ];
  const eq = eqWS(straps.map(([ name ]) => name), { padding: 2 });

  forEach(([ name, desc, unavilable ]) => {
    const line = unavilable
      ? ` $ ${_.strikethrough(`sy create ${name}`)}${eq(name)} ${describe('unavilable')}`
      : ` $ sy create ${name}${eq(name)} ${describe(desc.trim())}`;
    message.Line(line);
  }, straps);

  message
  .Newline()
  .End(`help ${_.TLD} sy push`, false)
  .Break()
  .toLog(highlight);

};

/**
 * `sy help build`
 */
Modes.build = () => {

  _.Create()
  .Top(`help ${_.TLD} sy build`, false)
  .Header(`COMMANDS${_.COL}`, _.bold)
  .Line(' $ sy build')
  .Line(' $ sy build --flags')
  .Line(` $ sy build ${_.Encase('SB', 'option')}`)
  .Line(` $ sy build ${_.Encase('SB', 'option')} --flags`)
  .Header(`OPTIONS${_.COL}`, _.bold)
  .Line(` $ sy build script       ${describe('Run build on script transform')}`)
  .Line(` $ sy build style        ${describe('Run build on style transform')}`)
  .Line(` $ sy build svg          ${describe('Run build on svg transform')}`)
  .Line(` $ sy build liquid       ${describe('Run build on liquid transform')}`)
  .Line(` $ sy build json         ${describe('Run build on json transform')}`)
  .Header(`FLAGS${_.COL}`, _.bold)
  .Line(` --terse                 ${describe('Terse minification')}`)
  .Line(` --dev                   ${describe('Development build mode (default)')}`)
  .Line(` --prod                  ${describe('Production build mode')}`)
  .Newline()
  .End(`help ${_.TLD} sy build`, false)
  .toLog(highlight);

};
