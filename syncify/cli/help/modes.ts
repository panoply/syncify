import * as _ from '@syncify/ansi';
import { kill } from '@syncify/kill';

import { description } from './descriptions';

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
  .BR
  .toLog(highlight);

};

/**
 * `sy help push`
 */
Modes.push = () => {

  const info = description('push');

  _.Create()
  .BR
  .Top(`help ${_.TLD} sy push`, false)
  .True(info, tui => tui.Header(`DESCRIPTION${_.COL}`, _.bold).Wrap(_.gray, info.overview))
  .True(info, tui => tui.Prepend(info.reference, _.gray.underline))
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
  .BR
  .toLog(highlight);

  kill.exit(0);

};

/**
 * `sy help pull`
 */
Modes.pull = () => {

  const info = description('pull');

  _.Create()
  .BR
  .Top(`help ${_.TLD} sy pull`, false)
  .True(info, tui => tui.Header(`DESCRIPTION${_.COL}`, _.bold).Wrap(_.gray, info.overview))
  .True(info, tui => tui.Prepend(info.reference, _.gray.underline))
  .Header(`COMMANDS${_.COL}`, _.bold)
  .Line(' $ sy pull')
  .Line(' $ sy pull --flags')
  .Header(`FLAGS${_.COL}`, _.bold)
  .Line(` --filter, -F          ${describe('Filter specific files/directories')}`)
  .Line(` --target, -T          ${describe('Target a theme or store')}`)
  .Line(` --merge               ${describe(`Merges local ${_.ARL} remote theme`)}`)
  .Line(` --align               ${describe(`Align local ${_.ARL} remote theme JSON files`)}`)
  .Line(` --force               ${describe('Skips diffing and force overwrites')}`)
  .Line(` --output, -o          ${describe('Controls where theme file/s are written')}`)
  .Line(` --batch <number>      ${describe('Upsert batch limits (default 10)')}`)
  .Line(` --help                ${describe('Show this screen')}`)
  .NL
  .End(`help ${_.TLD} sy push`, false)
  .BR
  .toLog(highlight);

};

/**
 * `sy help watch`
 */
Modes.watch = () => {

  const info = description('watch');

  _.Create()
  .BR
  .Top(`help ${_.TLD} sy watch`, false)
  .True(info, tui => tui.Header(`DESCRIPTION${_.COL}`, _.bold).Wrap(_.gray, info.overview))
  .True(info, tui => tui.Prepend(info.reference, _.gray.underline))
  .Header(`COMMANDS${_.COL}`, _.bold)
  .Line(' $ sy watch')
  .Line(' $ sy watch --flags')
  .Header(`FLAGS${_.COL}`, _.bold)
  .Line(` --target, -T    ${describe('Target a theme or store')}`)
  .Line(` --filter, -F    ${describe('Filter specific files/directories')}`)
  .Line(` --hot           ${describe('Activates HOT Reloading')}`)
  .Line(` --align         ${describe('Align local theme JSON files before watching')}`)
  .Line(` --bind          ${describe('Activates 2 way bindings')}`)
  .Line(` --terse         ${describe('Terse minification')}`)
  .Line(` --dev           ${describe('Development build mode (default)')}`)
  .Line(` --prod          ${describe('Production build mode')}`)
  .Line(` --help          ${describe('Show this screen')}`)
  .NL
  .End(`help ${_.TLD} sy watch`, false)
  .BR
  .toLog(highlight);

};

/**
 * `sy help inspect`
 */
Modes.inspect = () => {

  const info = description('watch');

  _.Create()
  .BR
  .Top(`help ${_.TLD} sy inspect`, false)
  .True(info, tui => tui.Header(`DESCRIPTION${_.COL}`, _.bold).Wrap(_.gray, info.overview))
  .True(info, tui => tui.Prepend(info.reference, _.gray.underline))
  .Header(`COMMANDS${_.COL}`, _.bold)
  .Line(' $ sy inspect')
  .NL
  .End(`help ${_.TLD} sy inspect`, false)
  .BR
  .toLog(highlight);

};

/**
 * `sy help create`
 */
Modes.create = () => {

  const info = description('build');

  const message = _.Create()
  .BR
  .Top(`help ${_.TLD} sy create`, false)
  .True(info, tui => tui.Header(`DESCRIPTION${_.COL}`, _.bold).Wrap(_.gray, info.overview))
  .True(info, tui => tui.Prepend(info.reference, _.gray.underline))
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
  .NL
  .End(`help ${_.TLD} sy push`, false)
  .BR
  .toLog(highlight);

};

/**
 * `sy help projects`
 */
Modes.projects = () => {

  const info = description('projects');

  _.Create()
  .BR
  .Top(`help ${_.TLD} sy projects`, false)
  .True(info, tui => tui.Header(`DESCRIPTION${_.COL}`, _.bold).Wrap(_.gray, info.overview))
  .True(info, tui => tui.Prepend(info.reference, _.gray.underline))
  .Header(`COMMANDS${_.COL}`, _.bold)
  .Line(' $ sy projects')
  .Line(` $ sy projects ${_.Encase('AN', _.magenta('name'))}`)
  .NL
  .End(`help ${_.TLD} sy push`, false)
  .BR
  .toLog(highlight);

};

/**
 * `sy help build`
 */
Modes.build = () => {

  const info = description('build');

  _.Create()
  .BR
  .Top(`help ${_.TLD} sy build`, false)
  .True(info, tui => tui.Header(`DESCRIPTION${_.COL}`, _.bold).Wrap(_.gray, info.overview))
  .True(info, tui => tui.Prepend(info.reference, _.gray.underline))
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
  .Line(` --help                  ${describe('Show this screen')}`)
  .NL
  .End(`help ${_.TLD} sy build`, false)
  .BR
  .toLog(highlight);

};
