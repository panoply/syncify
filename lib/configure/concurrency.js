const Promise = require('bluebird')
const fs = require('fs')

fs.mkdirp = require('mkdirp')
Promise.promisifyAll(fs)

const inquirer = Promise.promisifyAll(require('inquirer'))

module.exports = function * (config) {

  let choice

  choice = yield inquirer.prompt([{
    type: 'input',
    name: 'concurrency',
    message: 'How many requests should shopify sync process in parallel?',
    default: config.concurrency
  }])

  config.concurrency = choice.concurrency

  if (!isFinite(config.concurrency) || config.concurrency < 1) {
    config.concurrency = 1
  }

  return config
}
