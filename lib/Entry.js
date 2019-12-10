const Promise = require('bluebird')
const log = require('fancy-log')
const chalk = require('chalk')
const Commands = require('./Commands')

global.Promise = Promise

module.exports = function (resource, options, callback) {

  if (!resource) {
    return log(chalk`{red Error! The {bold resource} option is missing}!`)
  }

  if (!options.target) {
    return log(chalk`{red Error! Please define a {bold theme target}!}`)
  }

  const config = Object.assign({}, { resource }, {
    target: '',
    concurrency: 20,
    dir: 'theme',
    files: [],
    forceIgnore: false,
    ignore: []
  }, options)

  return Commands(config, callback)

}
