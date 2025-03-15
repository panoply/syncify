import * as _ from '@syncify/ansi';

import { log } from '~cli/log';

import { $ } from '$';

/**
 * Internal configuration settings for Syncify
 */
export function Inspect () {

  log.clear();

  _.Create()
  .Top('Inspect')
  .Header(`${_.white.bold('@syncify/cli')}`)
  .Line(`${_.gray('VERSION')}${_.COL}  v${_.whiteBright(VERSION)}`)
  .Line(`${_.gray('HOT')}${_.COL}      v${_.whiteBright(HOT_VERSION)}`)
  .Line(`${_.gray('LICENSE')}${_.COL}  ${_.whiteBright('Apache 2.0')}`)
  .Line(`${_.gray('AUTHOR')}${_.COL}   ${_.whiteBright('Νικολας Σαββιδης')}`)
  .Line(`${_.gray('PM')}${_.COL}       ${_.whiteBright($.pm)}`)
  .Line(`${_.gray('OS')}${_.COL}       ${_.whiteBright($.platform)}`)
  .Line(`${_.gray('BINARY')}${_.COL}   ${_.whiteBright($.using)}`)
  .Line(`${_.gray('CWD')}${_.COL}      ${_.whiteBright($.cwd)}`)
  .Line(`${_.gray('HASH')}${_.COL}     ${_.whiteBright($.hash)}`)
  .Line(`${_.gray('SCRIPT')}${_.COL}   ${_.whiteBright($.bin)}`)
  .Line(`${_.gray('MODULE')}${_.COL}   ${_.whiteBright($.dirs.module)}`)
  .Line(`${_.gray('STORE')}${_.COL}    ${_.whiteBright($.home)}`)
  .Line(`${_.gray('KEYCHAIN')}${_.COL} ${_.whiteBright(`${$.file.keychain}`)}`)
  .Line(`${_.gray('GITHUB')}${_.COL}   ${_.whiteBright($.github)}`)
  .Line(`${_.gray('WEBSITE')}${_.COL}  ${_.whiteBright('https://syncify.sh')}`)
  .NL
  .End('Inspect')
  .BR
  .toLog();

}

export function Version () {

  log.clear();

  _.Create()
  .Top('Version')
  .NL
  .Line(`${_.whiteBright('@syncify/cli')} ${_.ARR} ${_.whiteBright('v' + VERSION)}`)
  .Line(`${_.whiteBright('@syncify/hot')} ${_.ARR} ${_.whiteBright('v' + HOT_VERSION)}`)
  .NL
  .End('Version')
  .BR
  .toLog();

}
