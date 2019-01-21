const _ = require('lodash')
const { getTarget, loadConfig } = require('../helpers')
const parser = require('gitignore-parser')
const path = require('path')
const fs = require('fs')
const requestify = require('../requestify')
const co = require('co')
const chokidar = require('chokidar')
const chalk = require('chalk')
const fancyLog = require('fancy-log')

fs.mkdirp = require('mkdirp')

Promise.promisifyAll(fs)

module.exports = function * (argv) {

  let ignore = null

  const config = yield loadConfig()
  const target = yield getTarget(config, argv)

  if (config.ignore_file) {
    ignore = parser.compile(yield fs.readFileAsync(config.ignore_file, 'utf8'))
  }

  let watcher = chokidar.watch('./theme/', {
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
      let trimmedParts = _.drop(pathParts, (_.lastIndexOf(pathParts, 'theme') + 1))
      let key = trimmedParts.join(path.sep)

      if (!filePath.match(/^theme/)) {
        return
      }
      if (filePath.match(/^\..*$/)) {
        return
      }
      if (filePath.match(/[()]/)) {
        fancyLog(chalk`{red Filename may not contain parentheses, please rename - }"{red ${filePath}}"`)
        return
      }

      if (ignore && ignore.denies(filePath)) {
        fancyLog(chalk`{yellow Ignoring} '{yellow ${filePath}}'`)
        return
      }

      if (['add', 'change'].includes(event)) {

        let data = yield fs.readFileAsync(filePath)

        yield requestify(target, {
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

      } else if (event === 'unlink') {

        yield requestify(target, {
          method: 'delete',
          url: `/admin/themes/${target.theme_id}/assets.json?asset[key]=${key.split(path.sep).join('/')}`
        })

        fancyLog(chalk`{green Deleted} '{green ${filePath}}'`)
      }
    }).catch((err) => {

      if (err.stack) {
        err = err.stack
      }

      fancyLog(chalk`{red ${err}}`)

    })

  })

  fancyLog(chalk`Store: {green ${target.domain}.myshopify.com}`)
  fancyLog(chalk`Theme: {green ${target.target_name}}`)

}
