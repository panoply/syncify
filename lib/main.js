const _ = require('lodash')
const co = require('co')
const { log } = require('./helpers')
const Configure = require('./configure')
const Theme = require('./theme')
const chalk = require('chalk')

const HELPTEXT = chalk`
  {green.bold Shopify Sync} – {bold Sync Commands}
  {gray ---------------------------------------------------------}

  {bold Commands:}
    sync – {gray.italic Show this screen}
    sync configure – {gray.italic Creates/Updates the configuration file}
    sync theme – {gray.italic Manage Shopify themes}
`

module.exports = function (argv) {

  return co(function * () {

    let command, result

    if (!argv['_']) {
      command = 'theme'
      argv.file = true
    } else {
      command = _.first(argv['_'])
      argv['_'] = argv['_'].slice(1)
      argv.file = false
    }

    if (command === 'configure') {
      result = yield Configure(argv)
    } else if (command === 'theme') {
      result = yield Theme(argv)
    } else {
      console.log(HELPTEXT)
    }

    if (result) {
      log(result, 'green')
    }

  }).catch(function (err) {

    if (err.stack) {
      err = err.stack
    }

    log(err, 'red')

  })
}
