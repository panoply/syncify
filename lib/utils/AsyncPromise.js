/* const parallel = require('co-parallel')

module.exports = async function (list, fn, options = {}) {

  const { concurrency } = Object.assign({ concurrency: 10 }, options)
  const tasks = list.map(fn)
  const response = await parallel(tasks, concurrency)

  return response

} */

module.exports = function (promise) {
  return promise.then(val => val).catch(error => {

    error.isError = true
    return error

  })
}
