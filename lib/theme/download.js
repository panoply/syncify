
let _ = require('lodash')
let { log, getTarget, loadConfig } = require('../helpers')
let parser = require('gitignore-parser')
let path = require('path')
let fs = require('fs')
fs.mkdirp = require('mkdirp')
Promise.promisifyAll(fs)
let asyncEach = require('../asyncEach')
let requestify = require('../requestify')

module.exports = function *(argv) {
  let total = 0
  var filter = _.first(argv['_']) ? new RegExp(`^${_.first(argv['_'])}`) : null
  var ignore = null
  var config = yield loadConfig()
  var target = yield getTarget(config, argv)

  if (config.ignore_file) {
    ignore = parser.compile(yield fs.readFileAsync(config.ignore_file, 'utf8'))
  }

  var {assets} = yield requestify(target, {
    method: 'get',
    url: `/admin/themes/${target.theme_id}/assets.json`
  })

  if (ignore) {
    assets = _.reject(assets, function (asset) {
      return ignore.denies(asset.key)
    })
  }

  if (filter) {
    assets = _.filter(assets, function (asset) {
      return filter.test(asset.key)
    })
  }

  yield asyncEach(assets, function *(asset, idx) {
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
      rawData = new Buffer(data.attachment, 'base64')
    } else if (data.value) {
      rawData = new Buffer(data.value, 'utf8')
    }

    yield fs.mkdirpAsync(path.join(process.cwd(), 'theme', path.dirname(data.key)))
    yield fs.writeFileAsync(path.join(process.cwd(), 'theme', data.key), rawData)

    total += 1
    log(`Downloaded ${data.key}`, 'green')
  }, {concurrency: config.concurrency})

  return `Downloaded ${total} files.`
}
