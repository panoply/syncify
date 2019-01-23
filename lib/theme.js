const _ = require('lodash')
const Download = require('./theme/download')
const Upload = require('./theme/upload')
const Watch = require('./theme/watch')
const chalk = require('chalk')

const HELPTEXT = chalk`
  {green.bold Shopify Sync} – {bold Theme Commands}
  {gray ---------------------------------------------------------}

  {bold Commands:}
    sync theme – {gray.italic Show this screen}
    sync theme upload [options] [filter] – {gray.italic Upload theme files}
    sync theme download [options] [filter] – {gray.italic Download theme files}
    sync theme watch [options] – {gray.italic Watch theme folder}

  {bold Options:}
    --target=[target name] – {gray.italic Explicitly select theme target}
    --filter=[filename] – {gray.italic Only transfer files matching specified filter}
`

module.exports = function * (argv) {

  let command, result

  if (!argv['_']) {
    command = argv.resource
  } else {
    command = _.first(argv['_'])
    argv['_'] = argv['_'].slice(1)
  }

  if (command === 'download') {
    result = yield Download(argv)
  } else if (command === 'upload') {
    result = yield Upload(argv)
  } else if (command === 'watch') {
    result = yield Watch(argv)
  } else {
    console.log(HELPTEXT)
  }

  return result

}
