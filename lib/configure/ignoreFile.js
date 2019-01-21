const Promise = require('bluebird')
const { log } = require('../helpers')
const inquirer = Promise.promisifyAll(require('inquirer'))

module.exports = function * (config) {

  log(`

    You have two options for ignoring files in shopify sync.
    You can use a '.gitignore' file which allows you to have
    all your ignores in one place or you can use a '.syncignore'
    which allows git and shopify sync to ignore different files.

  `, 'yellow')

  let choice

  choice = yield inquirer.prompt([{
    type: 'list',
    name: 'ignore_file',
    message: 'What would you like to use as the sync ignore file?',
    default: config.compile_scss,
    choices: [
      '.gitignore',
      '.syncignore'
    ]
  }])

  config.ignore_file = choice.ignore_file

  return config
}
