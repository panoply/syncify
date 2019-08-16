const _ = require('lodash')
const path = require('path')
const glob = require('glob')
const log = require('fancy-log')
const chalk = require('chalk')
const Promise = require('bluebird')
const fs = require('fs')
Promise.promisifyAll(fs)
const { Request } = require('../Request')
const Config = require('../Config')
const Target = require('../Target')
const Ignore = require('../Ignore')

module.exports = async function (options) {

  let total = 0

  const config = await Config()
  const target = await Target(config, options)

  if (!options.file) {
    Object.assign(options, config)
  }

  const directory = options.dir || 'theme'
  const dirMatch = new RegExp(`^${directory}/${_.first(options['_'])}`)
  const { settings } = Ignore(options)
  const filter = _.first(settings['_']) ? dirMatch : null

  let files = glob.sync(`${directory}/**/*`, { nodir: true })

  if (_.has(settings, 'ignore') && settings.ignore.length > 0) {
    files = _.reject(files, (file) => settings.ignore.includes(file))
  }

  if (filter) {
    files = _.filter(files, file => filter.test(file))
  }

  files = files.map(file => {
    const pathParts = file.split(path.sep)
    const trimmedParts = _.drop(pathParts, (_.lastIndexOf(pathParts, directory) + 1))
    const filepath = trimmedParts.join(path.sep)
    return {
      key: filepath,
      name: path.basename(filepath),
      path: file
    }
  })

  await Promise.map(files, async (file) => {

    const data = await fs.readFileAsync(file.path)

    await Request(target, {
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
