const Promise = require('bluebird')
global.Promise = Promise
const main = require('./lib/main')
const fancyLog = require('fancy-log')
const chalk = require('chalk')

module.exports = function (resource, options, callback) {

  if (!resource) {
    fancyLog(chalk`{red Error! The {bold resource} option is missing}!`)
    return
  }

  if (!options.target) {
    fancyLog(chalk`{red Error! Please define a {bold theme target}!}`)
    return
  }

  const config = Object.assign({}, { resource }, {
    target: '',
    concurrency: 20,
    dir: 'theme',
    ignore: []
  }, options)

  return main(config, callback)

}
