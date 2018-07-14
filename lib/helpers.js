
let _ = require('lodash')
let Promise = require('bluebird')
let path = require('path')
let fs = Promise.promisifyAll(require('fs'))
let colors = require('colors')
let inquirer = Promise.promisifyAll(require('inquirer'))

/* global CONFIGVERSION */

var loadConfig = function *() {
  let config

  try {
    config = yield fs.readFileAsync(path.join(process.cwd(), 'store.config.json'), 'utf8')
  } catch (err) {
    throw new Error('Shop configuration is missing, have you run \'store configure\'?')
  }

  try {
    config = JSON.parse(config)
  } catch (err) {
    throw new Error('Shop configuration is corrupt, you may need to delete \'store.json\', and run \'store configure\' again.')
  }

  if (!config.configVersion || config.configVersion < CONFIGVERSION) {
    throw new Error('Shop configuration is from an older incompatible version of store. You need to run \'store configure\' again.')
  }

  return config
}

var getTarget = function *(config, argv) {
  if (argv['target']) {
    var targetName = argv['target']
  }

  var target = null
  if (_.isArray(config.targets)) {
    if (targetName) {
      target = _.find(config.targets, {target_name: targetName})
      if (!target) {
        throw new Error(`Could not find target '${targetName}'`)
      }
    } else {
      var targetChoices = _.map(config.targets, (target) => { return `[${target.target_name}] - '${target.theme_name}' at ${target.domain}.myshopify.com` })
      if (config.targets.length > 1) {
        let choice = yield inquirer.prompt([
          {
            type: 'list',
            name: 'target',
            message: 'Select target',
            default: null,
            choices: targetChoices
          }
        ])
        target = config.targets[_.indexOf(targetChoices, choice.target)]
      } else if (config.targets.length === 1) {
        target = _.first(config.targets)
      }
    }
  } else {
    throw new Error(`No targets configured! Run 'store configure' and create a new target.`)
  }

  target.auth = 'Basic ' + new Buffer(`${target.api_key}:${target.password}`).toString('base64')
  return target
}

var log = function (content, color = 'white') {
  let out = ''
  if (_.isObject(content)) {
    if (content.message) {
      out += content.message + '\n\n'
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
  console.log('['+colors['green']('Shopifysync')+']'+colors[color](` ${out}`))
}

module.exports = {
  loadConfig: loadConfig,
  getTarget: getTarget,
  log: log
}
