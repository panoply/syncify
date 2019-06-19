const _ = require('lodash')
const { getTarget, loadConfig } = require('../helpers')
const parser = require('gitignore-parser')
const path = require('path')
const fs = require('fs')
const req = require('../request')
const co = require('co')
const chokidar = require('chokidar')
const chalk = require('chalk')
const fancyLog = require('fancy-log')
const box = require('boxen')
fs.mkdirp = require('mkdirp')

Promise.promisifyAll(fs)

module.exports = function * (argv, callback) {

  let ignore = null

  const config = yield loadConfig()
  const target = yield getTarget(config, argv)
  const directory = argv.dir || 'theme'
  const dirMatch = new RegExp(`^${directory}`)
  const ignore_file = argv.ignore || config.ignore_file

  if (_.isArray(ignore_file)) {
    ignore = ignore_file
  } else {
    ignore = parser.compile(yield fs.readFileAsync(ignore_file, 'utf8'))
  }

  const watcher = chokidar.watch(`./${directory}/`, {
    ignored: /[/\\]\./,
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 100,
    binaryInterval: 100,
    cwd: process.cwd()
  })

  watcher.on('all', function (event, filePath) {

    return co(function * () {
      let pathParts = filePath.split(path.sep)
      let trimmedParts = _.drop(pathParts, (_.lastIndexOf(pathParts, directory) + 1))
      let key = trimmedParts.join(path.sep)

      if (!filePath.match(dirMatch)) {
        return
      }
      if (filePath.match(/^\..*$/)) {
        return
      }
      if (filePath.match(/[()]/)) {
        fancyLog(chalk`{red Filename may not contain parentheses, please rename - }"{red ${filePath}}"`)
        return
      }

      if (argv.ignore) {
        if (ignore && ignore_file.includes(filePath)) {
          fancyLog(chalk`{yellow Ignoring} '{yellow ${filePath}}'`)
          return
        }
      } else {
        if (ignore && ignore.denies(filePath)) {
          fancyLog(chalk`{yellow Ignoring} '{yellow ${filePath}}'`)
          return
        }
      }

      if (['add', 'change'].includes(event)) {

        let data = yield fs.readFileAsync(filePath)

        yield req(target, {
          method: 'put',
          url: `/admin/themes/${target.theme_id}/assets.json`,
          data: {
            asset: {
              key: key.split(path.sep).join('/'),
              attachment: data.toString('base64')
            }
          }
        })

        fancyLog(chalk`{green Uploaded} '{green ${filePath}}'`)

        if (typeof callback === 'function') {
          callback.apply({ file: path.parse(filePath) })
        }

      } else if (event === 'unlink') {

        yield req(target, {
          method: 'delete',
          url: `/admin/themes/${target.theme_id}/assets.json?asset[key]=${key.split(path.sep).join('/')}`
        })

        fancyLog(chalk`{green Deleted} '{green ${filePath}}'`)
      }

    }).catch((err) => {

      if (err.stack) {
        err = err.stack
      } else {
        err = `ERROR! ${err.message}\n\n\t${err.data}`
      }

      fancyLog(chalk`{red ${err}}`)

    })

  })

  fancyLog(
    chalk.whiteBright.bold('Shopify Sync\n') +
    box(
      chalk`  Target: {green ${target.target_name}}\n` +
      chalk`   Store: {green https://${target.domain}.myshopify.com}\n` +
      chalk`Watching: {green ${directory}/**/**} `,
      { padding: 0,
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
      }
    )
  )

}
