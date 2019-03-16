const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))
const chalk = require('chalk')
const inquirer = Promise.promisifyAll(require('inquirer'))
const fancyLog = require('fancy-log')

const loadConfig = function * () {

  let config

  try {
    config = yield fs.readFileAsync(path.join(process.cwd(), '.sync'), 'utf8')
  } catch (err) {
    throw new Error('Shop configuration is missing, have you run \'sync configure\'?')
  }

  try {
    config = JSON.parse(config)
  } catch (err) {
    throw new Error('Shop configuration is corrupt, you may need to delete \'sync.config.json\', and run \'sync configure\' again.')
  }

  return config
}

const getTarget = function * (config, argv) {

  let target = null
  let targetName = null

  if (argv['target']) {
    targetName = argv['target']
  }

  if (_.isArray(config.targets)) {

    if (targetName) {

      target = _.find(config.targets, {
        target_name: targetName
      })

      if (!target) {
        throw new Error(`Could not find target '${targetName}'`)
      }

    } else {

      var targetChoices = _.map(config.targets, (target) => {
        return `[${target.target_name}] - '${target.theme_name}' at ${target.domain}.myshopify.com`
      })

      if (config.targets.length > 1) {
        let choice = yield inquirer.prompt([{
          type: 'list',
          name: 'target',
          message: 'Select target',
          default: null,
          choices: targetChoices
        }])

        target = config.targets[_.indexOf(targetChoices, choice.target)]

      } else if (config.targets.length === 1) {

        target = _.first(config.targets)

      }
    }
  } else {

    throw new Error(`No targets configured! Run 'sync configure' and create a new target.`)
  }

  target.auth = 'Basic ' + Buffer.from(`${target.api_key}:${target.password}`).toString('base64')

  return target
}

const log = function (content, color = 'white') {

  let out = ''

  if (_.isObject(content)) {

    if (content.message) {
      out += content.message + '\n\n\t'
    }

    if (content.data) {
      let data = content.data
      if (data.asset) {
        out += JSON.stringify(_.omit(data.asset, 'attachment'))
      } else {
        out += JSON.stringify(data)
      }
    }

  } else {
    out = content
  }

  fancyLog(chalk[color](`${out}`))

}

module.exports = {
  loadConfig: loadConfig,
  getTarget: getTarget,
  log: log
}
