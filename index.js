const Promise = require('bluebird')
global.Promise = Promise
const main = require('./lib/main')
const fancyLog = require('fancy-log')
const chalk = require('chalk')

module.exports = function (options) {

  if (!options.run) {
    fancyLog(chalk`{red Error! The} {bold run} {red option must be defined!}`)
    return
  }

  if (!options.target) {
    fancyLog(chalk`{red Error! The} {bold target} {option must be defined!}`)
    return
  }

  const config = Object.assign({}, {
    concurrency: 20
  }, options)

  return main(config)

}
