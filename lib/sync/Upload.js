import _ from 'lodash'
import path from 'path'
import glob from 'glob'
import { log } from '../config/utils'
import chalk from 'chalk'
import Promise from 'bluebird'
import fs from 'fs'
import request from '../config/request'
import configuration from '../config/config'
import targets from '../config/target'
import ignore from '../config/ignore'

Promise.promisifyAll(fs)

export default async function (options) {

  let total = 0

  const config = await configuration()
  const target = await targets(config, options)

  if (!options.file) Object.assign(options, config)

  const directory = options.dir || 'theme'
  const dirMatch = new RegExp(`^${directory}/${_.first(options._)}`)
  const { settings } = ignore(options)
  const filter = _.first(settings._) ? dirMatch : null

  let files = glob.sync(`${directory}/**/*`, { nodir: true })

  if (_.has(settings, 'ignore') && settings.ignore.length > 0) {
    files = _.reject(files, (file) => settings.ignore.includes(file))
  }

  if (filter) {
    files = _.filter(files, file => filter.test(file))
  }

  if (settings.files) {
    files = settings.files
  }

  const items = files.map(file => {
    const pathParts = file.split(path.sep)
    const trimmedParts = _.drop(pathParts, (_.lastIndexOf(pathParts, directory) + 1))
    const filepath = trimmedParts.join(path.sep)
    return {
      key: filepath,
      name: path.basename(filepath),
      path: file
    }
  })

  await Promise.map(items, async (file) => {

    // console.log(file)

    const data = await fs.readFileAsync(file.path)

    await request(target, {
      method: 'put',
      url: `/admin/themes/${target.theme_id}/assets.json`,
      data: {
        asset: {
          key: file.key,
          attachment: data.toString('base64')
        }
      }
    })

    total += 1

    await log(chalk`{green Uploaded} '{green ${file.key}}'`)

  }, {
    concurrency: settings.concurrency
  })

  return `Uploaded ${total} files.`

}
