module.exports = function (promise) {

  return promise.then(val => val).catch(error => {

    error.isError = true

    return error

  })

}
