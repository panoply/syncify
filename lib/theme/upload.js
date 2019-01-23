const _ = require('lodash')
const { log, getTarget, loadConfig } = require('../helpers')
const parser = require('gitignore-parser')
const path = require('path')
const fs = require('fs')
fs.mkdirp = require('mkdirp')
Promise.promisifyAll(fs)
const asyncEach = require('../async-each')
const req = require('../request')
const glob = require('glob')

module.exports = function * (argv) {

  let total = 0
  let ignore = null

  const directory = argv.dir || 'theme'
  const dirMatch = new RegExp(`^${directory}/${_.first(argv['_'])}`)
  const filter = _.first(argv['_']) ? dirMatch : null
  const config = yield loadConfig()
  const target = yield getTarget(config, argv)
  const ignore_file = argv.ignore || config.ignore_file

  if (_.isArray(ignore_file)) {
    ignore = ignore_file
  } else {
    ignore = parser.compile(yield fs.readFileAsync(ignore_file, 'utf8'))
  }

  let files = glob.sync(`${directory}/**/*`, { nodir: true })

  if (ignore) {
    files = _.reject(files, function (file) {
      if (argv.ignore) {
        return ignore.includes(file)
      } else {
        return ignore.denies(file)
      }
    })
  }

  if (filter) {
    files = _.filter(files, function (file) {
      return filter.test(file)
    })
  }

  files = files.map((file) => {

    let pathParts = file.split(path.sep)
    let trimmedParts = _.drop(pathParts, (_.lastIndexOf(pathParts, directory) + 1))
    let filepath = trimmedParts.join(path.sep)

    return {
      key: filepath,
      name: path.basename(filepath),
      path: file
    }
  })

  yield asyncEach(files, function * (file, idx) {

    const data = yield fs.readFileAsync(file.path)

    yield req(target, {
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
