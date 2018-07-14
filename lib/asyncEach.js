let co = require('co')
let parallel = require('co-parallel')

module.exports = function *(list, fn, opts = {}) {
  let {concurrency} = Object.assign({concurrency: 10}, opts)

  var tasks = list.map(fn)
  var res = yield parallel(tasks, concurrency)
  return res
}
