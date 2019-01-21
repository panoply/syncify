
let _ = require('lodash')
let { log, getTarget, loadConfig } = require('../helpers')
let parser = require('gitignore-parser')
let path = require('path')
let fs = require('fs')
fs.mkdirp = require('mkdirp')
Promise.promisifyAll(fs)
let asyncEach = require('../asyncEach')
let requestify = require('../requestify')
let glob = require('glob')

module.exports = function * (argv) {

  let total = 0
  var filter = _.first(argv['_']) ? new RegExp(`^theme/${_.first(argv['_'])}`) : null
  var ignore = null

  let config = yield loadConfig()

  let target = yield getTarget(config, argv)

  if (config.ignore_file) {
    ignore = parser.compile(yield fs.readFileAsync(config.ignore_file, 'utf8'))
  }

  let files = glob.sync('theme/**/*', { nodir: true })

  if (ignore) {
    files = _.reject(files, function (file) {
      return ignore.denies(file)
    })
  }

  if (filter) {
    files = _.filter(files, function (file) {
      return filter.test(file)
    })
  }

  files = files.map((file) => {
    let pathParts = file.split(path.sep)
    let trimmedParts = _.drop(pathParts, (_.lastIndexOf(pathParts, 'theme') + 1))
    let filepath = trimmedParts.join(path.sep)

    return {
      key: filepath,
      name: path.basename(filepath),
      path: file
    }
  })

  yield asyncEach(files, function * (file, idx) {
    var data = yield fs.readFileAsync(file.path)
    yield requestify(target, {
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
    log(`uploaded ${file.path}`, 'green')
  }, {
    concurrency: argv.concurrency || config.concurrency
  })

  return `Uploaded ${total} files.`
}
