
let Promise = require('bluebird')
let {log, loadConfig} = require('./helpers')
let path = require('path')
let fs = require('fs')
fs.mkdirp = require('mkdirp')
Promise.promisifyAll(fs)

let inquirer = Promise.promisifyAll(require('inquirer'))
let configTargets = require('./configure/targets')
let configIgnoreFile = require('./configure/ignoreFile')
let configConcurrency = require('./configure/concurrency')

/* global CONFIGVERSION */

let gitignore = `
# This your '.gitignore file. Anything you put in here will be ignored by shopify-sync and git.
`

let strignore = `
# This your '.syncignore' file. Anything you put in here will be ignored by shopify-sync. This file uses the same format as a '.gitignore' file.

# Ignore maps
/theme/assets/*.map

`

module.exports = function *(argv) {
  let config
  try {
    config = yield loadConfig()
  } catch (err) {}

  config = Object.assign({
    concurrency: 20,
    ignore_file: '.syncignore',
    targets: []
  }, config)

  let choice = {}

  while (choice.action !== 'Save configuration and exit') {
    choice = yield inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'Main Menu',
      choices: [
        'Configure targets',
        'Configure ignore file',
        'Configure concurrency',
        'Save configuration and exit'
      ]
    }])

    if (choice.action === 'Configure targets') {
      config = yield configTargets(config)
    } else if (choice.action === 'Configure ignore file') {
      config = yield configIgnoreFile(config)
    } else if (choice.action === 'Configure concurrency') {
      config = yield configConcurrency(config)
    }
  }

  try {
    yield fs.statAsync(path.join(process.cwd(), config.ignore_file))
  } catch (err) {
    if (config.ignore_file === '.gitignore') {
      yield fs.writeFileAsync(path.join(process.cwd(), config.ignore_file), gitignore)
    } else {
      yield fs.writeFileAsync(path.join(process.cwd(), config.ignore_file), strignore)
    }
  }

  config.configVersion = CONFIGVERSION
  yield fs.writeFileAsync('sync.config.json', JSON.stringify(config))

  log('Configuration saved!\n', 'green')
}
