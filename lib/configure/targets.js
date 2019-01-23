const _ = require('lodash')
const Promise = require('bluebird')
const { log } = require('../helpers')
const fs = require('fs')

fs.mkdirp = require('mkdirp')
Promise.promisifyAll(fs)

const requestify = require('../request')
const inquirer = Promise.promisifyAll(require('inquirer'))

module.exports = function * (config) {

  let choice = {}

  while (choice.action !== 'Done managing targets') {

    let actionOpts = ['Create target']

    if (config.targets.length > 0) {
      actionOpts = actionOpts.concat([
        'Edit target',
        'Delete target',
        'List targets',
        'Done managing targets'
      ])
    }

    choice = yield inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'Manage targets',
      choices: actionOpts
    }])

    let targetChoices = config.targets.map(function (target) {
      return `[${target.target_name}] - '${target.theme_name}' at ${target.domain}.myshopify.com`
    })

    if (['Create target', 'Edit target'].includes(choice.action)) {

      let currTarget = {}
      let editIndex

      if (choice.action === 'Edit target') {

        const targetChoice = yield inquirer.prompt([{
          type: 'list',
          name: 'target',
          message: 'Select target to edit',
          default: null,
          choices: targetChoices
        }])

        editIndex = _.indexOf(targetChoices, targetChoice.target)
        currTarget = config.targets[editIndex]

      }

      let targetSettings = yield inquirer.prompt([{
        type: 'input',
        name: 'target_name',
        message: 'Enter a name for this target',
        default: (currTarget.target_name || null)
      },
      {
        type: 'input',
        name: 'api_key',
        message: 'Shopify Private APP API key?',
        default: (currTarget.api_key || null)
      },
      {
        type: 'input',
        name: 'password',
        message: 'Shopify Private APP Password?',
        default: (currTarget.password || null)
      },
      {
        type: 'input',
        name: 'domain',
        message: 'MyShopify Domain? (eg: store.myshopify.com)',
        default: (currTarget.domain || null)
      }
      ])

      currTarget = Object.assign(currTarget, targetSettings)
      currTarget.domain = currTarget.domain
        .replace(new RegExp('^https?://'), '')
        .replace(new RegExp('.myshopify.com.*'), '')

      let { themes } = yield requestify(currTarget, {
        method: 'get',
        url: '/admin/themes.json'
      })

      let { shop } = yield requestify(currTarget, {
        method: 'get',
        url: '/admin/shop.json'
      })

      currTarget.primary_domain = shop.force_ssl
        ? `https://${shop.domain}`
        : `http://${shop.domain}`

      let defaultTheme = _.find(themes, {
        id: currTarget.theme_id
      })

      if (defaultTheme) {
        defaultTheme = `${defaultTheme.name} (${defaultTheme.role})`
      }

      let themeChoices = themes.map(theme => `${theme.name} (${theme.role})`)
      let themeChoice = yield inquirer.prompt([{
        type: 'list',
        name: 'theme',
        message: 'Select theme',
        default: defaultTheme || null,
        choices: themeChoices
      }])

      let theme = themes[_.indexOf(themeChoices, themeChoice.theme)]

      currTarget.theme_name = theme.name
      currTarget.theme_id = theme.id

      if (isFinite(editIndex) && editIndex !== -1) {

        config.targets[editIndex] = currTarget
        log('Target Modified!\n\n', 'yellow')

      } else {

        config.targets.push(currTarget)
        log('Target Created!\n\n', 'yellow')

      }

    } else if (choice.action === 'Delete target') {

      let targetChoice = yield inquirer.prompt([{
        type: 'list',
        name: 'target',
        message: 'Select target to edit',
        default: null,
        choices: targetChoices
      }])

      let editIndex = _.indexOf(targetChoices, targetChoice.target)
      config.targets.splice(editIndex, 1)

    } else if (choice.action === 'List targets') {

      console.log('')

      targetChoices.forEach(function (target) {
        log(target, 'cyan')
      })

      console.log('')

    }
  }

  return config

}
