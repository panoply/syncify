import _ from 'lodash'
import path from 'path'
import glob from 'glob'
import anymatch from 'anymatch'
import boxen from 'boxen'
import { log } from '../config/utils'
import chalk from 'chalk'
import Promise from 'bluebird'
import fs from 'fs'
import request from '../config/request'
import configuration from '../config/config'
import targets from '../config/target'
import ignore from '../config/ignore'

Promise.promisifyAll(fs)

export default async function (options, callback) {

  let total = 0
  let problems = 0

  const config = await configuration()
  const target = await targets(config, options)

  if (!options.file) Object.assign(options, config)

  const directory = options.dir || 'theme'
  const dirMatch = new RegExp(`^${directory}/${_.first(options._)}`)
  const { settings } = ignore(options)
  const filter = _.first(settings._) ? dirMatch : null

  let files = glob.sync(`${directory}/**/*`, { nodir: true })

  // When using the CLI and passing in filter
  if (filter) {
    files = _.filter(files, file => filter.test(file))
  }

  // When using API and has `ignore`
  // We will exclude all ignores
  if (_.has(settings, 'ignore') && settings.ignore.length > 0) {
    files = files.filter(file => !anymatch(settings.ignore, file))
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

  return Promise.each(items, async (file) => {

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
    }).then(() => {

      total += 1

      log(chalk`{green Uploaded} '{green ${file.key}}'`)

      if (typeof callback === 'function') {
        callback.apply({
          file: path.parse(file.path),
          content: data
        })
      }

    }).catch(e => {

      problems += 1

      log(chalk`{red Failed} '{red ${e.message}}'`)
      _.isArray(e.data)
        ? e.data.forEach(i => log(chalk`{red >} {white.dim ${i}}`))
        : !_.isUndefined(e.data) && log(chalk`{yellow.dim.italic ${e.data}}`)

    })

  }, {
    concurrency: settings.concurrency
  }).finally(() => {

    const banner =
      chalk`Uploaded: {green ${total}} files.\n` +
      chalk`Problems: {red ${problems}}`

    return log(
      boxen(banner, {
        padding: 0,
        borderColor: 'gray',
        dimBorder: true,
        borderStyle: {
          topLeft: ' ',
          topRight: ' ',
          bottomLeft: ' ',
          bottomRight: ' ',
          horizontal: '-',
          vertical: ' '
        }
      }),
      'white',
      true
    )
  })

}
