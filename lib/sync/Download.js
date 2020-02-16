import _ from 'lodash'
import Promise from 'bluebird'
import path from 'path'
import fs from 'fs'
import { log, url } from '../config/utils'
import chalk from 'chalk'
import axios from 'axios'
import configuration from '../config/config'
import targets from '../config/target'
import ignore from '../config/ignore'

fs.mkdirp = require('mkdirp')

Promise.promisifyAll(fs)

export default async function (options) {

  let total = 0

  const config = await configuration()
  const target = await targets(config, options)

  if (!options.file) Object.assign(options, config)

  const cwd = process.cwd()
  const dirName = options.dir || 'theme'
  const filter = _.first(options._) ? dirName : null
  const { settings } = ignore(options)

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

    await Promise.map(assets, async function ({
      attachment,
      value,
      key
    }) {

      let raw = null

      if (attachment) {
        raw = Buffer.from(attachment, 'base64')
      } else if (value) {
        raw = Buffer.from(value, 'utf8')
      }

      await fs.mkdirp(path.join(cwd, dirName, path.dirname(key)))
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
