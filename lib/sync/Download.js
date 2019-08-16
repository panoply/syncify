const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const fs = require('fs')
const log = require('fancy-log')
const chalk = require('chalk')
const axios = require('axios')
const { url } = require('../Request')
const Config = require('../Config')
const Target = require('../Target')
const Ignore = require('../Ignore')

fs.mkdirp = require('mkdirp')
Promise.promisifyAll(fs)

module.exports = async function (options) {

  let total = 0

  const config = await Config()
  const target = await Target(config, options)

  if (!options.file) {
    Object.assign(options, config)
  }

  const cwd = process.cwd()
  const dirName = options.dir || 'theme'
  const filter = _.first(options['_']) ? dirName : null
  const { settings } = Ignore(options)

  try {

    const query = `${url(target)}/admin/themes/${target.theme_id}/assets.json`
    const { data } = await axios.get(query)

    let { assets } = data

    if (_.has(assets, 'ignore') && settings.ignore.length > 0) {
      assets = _.reject(assets, (asset) => settings.ignore.includes(asset))
    }

    if (filter) {
      assets = _.filter(assets, asset => filter.test(asset.key))
    }

    await Promise.map(assets, async ({
      attachment,
      value,
      key
    }) => {

      let raw = null

      if (attachment) {
        raw = Buffer.from(attachment, 'base64')
      } else if (value) {
        raw = Buffer.from(value, 'utf8')
      }

      await fs.mkdirpAsync(path.join(cwd, dirName, path.dirname(key)))
      await fs.writeFileAsync(path.join(cwd, dirName, key), raw)

      total += 1

      await log(chalk`{green Downloaded} '{green ${key}} to {green ${dirName}}'`)

    }, {
      concurrency: settings.concurrency
    })

  } catch (error) {

    console.error(error)

  }

  return `Downloaded ${total} files.`
}
