let Promise = require('bluebird')
let { log } = require('../helpers')
let inquirer = Promise.promisifyAll(require('inquirer'))

module.exports = function*(config) {
    log(`

    You have two options for ignoring files in shopify sync.
    You can use a '.gitignore' file which allows you to have all your ignores in one place or you can use a '.strignore'. Which allows git and shopify sync to ignore different files.

  `, 'yellow')

    let choice

    choice = yield inquirer.prompt([{
        type: 'list',
        name: 'ignore_file',
        message: 'What would you like to use as the sync ignore file?',
        default: config.compile_scss,
        choices: [
            '.gitignore',
            '.strignore'
        ]
    }])
    config.ignore_file = choice.ignore_file

    return config
}