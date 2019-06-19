const _ = require('lodash')
const co = require('co')
const chalk = require('chalk')
const { log } = require('./helpers')
const configure = require('./configure')
const theme = require('./theme')

const HELPTEXT = chalk`
  {green.bold Shopify Sync} – {bold Sync Commands}
  {gray ---------------------------------------------------------}

  {bold Commands:}
    sync – {gray.italic Show this screen}
    sync configure – {gray.italic Creates/Updates the configuration file}
    sync theme – {gray.italic Manage Shopify themes}
`

module.exports = function (argv, callback) {

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
      result = yield configure(argv)
    } else if (command === 'theme') {
      result = yield theme(argv, callback)
    } else {
      console.log(HELPTEXT)
    }

    if (result) {
      console.log(result)
      // log(result, 'green')
    }

  }).catch(function (err) {

    if (err.stack) {
      err = err.stack
    }

    log(err, 'red')

  })
}
