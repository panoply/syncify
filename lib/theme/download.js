const _ = require('lodash')
const { log, getTarget, loadConfig } = require('../helpers')
const parser = require('gitignore-parser')
const path = require('path')
const fs = require('fs')
fs.mkdirp = require('mkdirp')
Promise.promisifyAll(fs)
const asyncEach = require('../async-each')
const requestify = require('../request')

module.exports = function * (argv) {

  let total = 0
  let ignore = null

  const dirName = argv.dir || 'theme'
  const filter = _.first(argv['_']) ? dirName : null
  const config = yield loadConfig()
  const target = yield getTarget(config, argv)
  const ignore_file = argv.ignore || config.ignore_file

  if (_.isArray(ignore_file)) {
    ignore = ignore_file
  } else {
    ignore = parser.compile(yield fs.readFileAsync(ignore_file, 'utf8'))
  }

  var { assets } = yield requestify(target, {
    method: 'get',
    url: `/admin/themes/${target.theme_id}/assets.json`
  })

  if (ignore) {
    assets = _.reject(assets, function (asset) {
      if (argv.ignore) {
        return ignore.includes(asset.key)
      } else {
        return ignore.denies(asset.key)
      }
    })
  }

  if (filter) {
    assets = _.filter(assets, function (asset) {
      return filter.test(asset.key)
    })
  }

  yield asyncEach(assets, function * (asset, idx) {
    let data = yield requestify(target, {
      method: 'get',
      url: `/admin/themes/${target.theme_id}/assets.json`,
      params: {
        'asset[key]': asset.key,
        theme_id: target.theme_id
      }
    })

    data = data.asset
    let rawData = null

    if (data.attachment) {
      rawData = Buffer.from(data.attachment, 'base64')
    } else if (data.value) {
      rawData = Buffer.from(data.value, 'utf8')
    }

    yield fs.mkdirpAsync(path.join(process.cwd(), dirName, path.dirname(data.key)))
    yield fs.writeFileAsync(path.join(process.cwd(), dirName, data.key), rawData)

    total += 1

    log(`Downloaded ${data.key} to ${dirName}`, 'green')

  }, {
    concurrency: argv.concurrency || config.concurrency
  })

  return `Downloaded ${total} files.`
}
