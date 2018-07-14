let _ = require('lodash')
let {
  log,
  getTarget,
  loadConfig
} = require('../helpers')
let parser = require('gitignore-parser')
let path = require('path')
let fs = require('fs')
fs.mkdirp = require('mkdirp')
Promise.promisifyAll(fs)
let requestify = require('../requestify')
let co = require('co')
let chokidar = require('chokidar')

module.exports = function* (argv) {
  var ignore = null
  let config = yield loadConfig()
  let target = yield getTarget(config, argv)

  if (config.ignore_file) {
    ignore = parser.compile(yield fs.readFileAsync(config.ignore_file, 'utf8'))
  }

  let watcher = chokidar.watch('./theme/', {
    ignored: /[\/\\]\./,
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 300,
    binaryInterval: 300,
    cwd: process.cwd()
  })

  watcher.on('all', function (event, filePath) {
    return co(function* () {
      let pathParts = filePath.split(path.sep)
      let trimmedParts = _.drop(pathParts, (_.lastIndexOf(pathParts, 'theme') + 1))
      let key = trimmedParts.join(path.sep)

      if (!filePath.match(/^theme/)) {
        return
      }
      if (filePath.match(/^\..*$/)) {
        return
      }
      if (filePath.match(/[\(\)]/)) {
        log(`Filename may not contain parentheses, please rename - "${filePath}"`, 'red')
        return
      }

      if (ignore && ignore.denies(filePath)) {
        //log(`IGNORING: ${filePath}`, 'yellow')
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

        log(`Added/Updated ${filePath}`, 'green')

      } else if (event === 'unlink') {

        yield requestify(target, {
          method: 'delete',
          url: `/admin/themes/${target.theme_id}/assets.json?asset[key]=${key.split(path.sep).join('/')}`
        })

        log(`Deleted ${filePath}`, 'green')
      }
    }).catch((err) => {
      if (err.stack) {
        err = err.stack
      }
      log(err, 'red')
    })
  })

  let _log = {
    name: '[' + colors['green']('Storesync') + ']',
    target: colors['green'](`${argv['target']}`),
    ready: colors['green']('Watching theme...')
  };

  console.log(`${_log.name} Targeting: ${_log.target}`)
  console.log(`${_log.name} ${_log.ready}`)
}
