import * as _ from '@syncify/ansi';

import { highlight } from '~help/utils';

/**
 * `sy`
 *
 * Fallback output when command line argument is missing.
 */
export function Suggest () {

  _.Create()
  .Top(`Syncify ${_.CHV} Error`, false)
  .Header(VERSION, _.gray)
  .Error('MISSING COMMAND ' + _.BAD, _.bold.redBright)
  .Newline('red')
  .Error('Please provide a command line argument', _.redBright)
  .Header(`USAGE${_.COL}`, _.bold)
  .Line(` $ sy <${_.magenta('mode')}>`)
  .Line(` $ sy <${_.magenta('mode')}> --flags`)
  .Line(` $ sy <${_.magenta('mode')}> [options]`)
  .Line(` $ sy <${_.magenta('mode')}> [options] --flags`)
  .Header(`HELP${_.COL}`, _.bold)
  .Line(' $ sy help')
  .Line(` $ sy <${_.magenta('mode')}> --help`)
  .NL
  .End(`Syncify ${_.CHV} Error`, false)
  .BR
  .toLog(highlight)
  .Break();

}
