const _ = require('lodash')
const chalk = require('chalk')
const Download = require('./sync/Download')
const Upload = require('./sync/Upload')
const Watch = require('./sync/Watch')
const Log = require('./utils/Log')

const HELPTEXT = chalk`
  {green.bold Shopify Sync} – {bold Commands}
  {gray ---------------------------------------------------------}

  {bold Commands:}
    sync watch [options] – {gray.italic Watch theme folder}
    sync upload [options] [filter] – {gray.italic Upload theme files}
    sync download [options] [filter] – {gray.italic Download theme files}

  {bold Options:}
    --target=[target name] – {gray.italic Explicitly select theme target}
    --filter=[filename] – {gray.italic Only transfer files matching specified filter}
`

module.exports = async function (options, callback) {

  let command
  let result

  try {

    if (!options._) {
      command = options.resource
      options.file = true
    } else {
      command = _.first(options._)
      options._ = options._.slice(1)
      options.file = false
    }

    if (command === 'watch') {
      result = await Watch(options, callback)
    } else if (command === 'upload') {
      result = await Upload(options, callback)
    } else if (command === 'download') {
      result = await Download(options, callback)
    } else {
      process.stdout.write(HELPTEXT)
    }

    result && process.stdout.write(result)

  } catch (e) {

    let error = null

    if (e.stack) {
      error = e.stack
    }

    Log(_.isNull(error) ? e : error, 'red')
  }

  return result

}
