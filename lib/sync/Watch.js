const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const chokidar = require('chokidar')
const chalk = require('chalk')
const anymatch = require('anymatch')
const log = require('fancy-log')
const box = require('boxen')
const { Request } = require('../Request')
const Config = require('../Config')
const Target = require('../Target')
const Ignore = require('../Ignore')

module.exports = async function (options, callback) {

  const config = await Config()
  const target = await Target(config, options)

  if (!options.file) {
    Object.assign(options, config)
  }

  const directory = options.dir || 'theme'
  const dirMatch = new RegExp(`^${directory}`)
  const { settings, ignored } = Ignore(options)
  const watcher = chokidar.watch(`./${directory}/`, {
    ignored: _.isNull(ignored.files) ? ignored.base : ignored.files,
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 100,
    binaryInterval: 100,
    cwd: process.cwd()
  })

  watcher.on('all', async (event, file) => {

    try {

      const parts = file.split(path.sep)
      const trimmed = _.drop(parts, (_.lastIndexOf(parts, directory) + 1))
      const key = trimmed.join(path.sep)

      if (file.match(/^\..*$/) || !file.match(dirMatch)) {
        return log(chalk`{red Issue in match "/^\..*$/" at: ${file}}"`)
      }

      if (file.match(/[()]/)) {
        return log(chalk`{red Filename cannot contain parentheses at: "${file}"`)
      }

      if (_.has(settings, 'ignore') && settings.ignore.length > 0) {
        if (anymatch(settings.ignore, file)) {
          return log(chalk`{gray Ignoring} '{gray ${file}}'`)
        }
      }

      if (['add', 'change'].includes(event)) {

        const data = await fs.readFileAsync(file)

        await Request(target, {
          method: 'put',
          url: `/admin/themes/${target.theme_id}/assets.json`,
          data: {
            asset: {
              key: key.split(path.sep).join('/'),
              attachment: data.toString('base64')
            }
          }
        })

        log(chalk`{green Uploaded} '{green ${file}}'`)

        if (typeof callback === 'function') {
          callback.apply({
            file: path.parse(file)
          })
        }

      } else if (event === 'unlink') {

        await Request(target, {
          method: 'delete',
          url: `/admin/themes/${target.theme_id}/assets.json?asset[key]=${key.split(path.sep).join('/')}`
        })

        log(chalk`{green Deleted} '{green ${file}}'`)
      }

    } catch (e) {

      let error = ''

      if (e.stack) {
        error = e.stack
      } else {

        error = chalk`{red Error} {dim in } {red ${e.message}}
        \n   {red ${e.data}}
        `
      }

      log(error)

    }
  })

  let banner =
    chalk`  Target: {green ${target.target_name}}\n` +
    chalk`   Store: {green https://${target.domain}.myshopify.com}\n` +
    chalk`Watching: {green ${directory}/**/**}`

  if (!_.isNull(ignored.log)) {
    banner += chalk`\nIgnoring: {yellow ${ignored.count}} Files\n`
    banner += chalk`\t {whiteBright -} {yellow ${ignored.log}}`
  }

  await log(
    chalk.whiteBright.bold('Shopify Sync\n') + box(banner, {
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
    })
  )

}
