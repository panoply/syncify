const parallel = require('co-parallel')

module.exports = function * (list, fn, opts = {}) {

  const { concurrency } = Object.assign({ concurrency: 10 }, opts)
  const tasks = list.map(fn)
  const res = yield parallel(tasks, concurrency)

  return res

}
