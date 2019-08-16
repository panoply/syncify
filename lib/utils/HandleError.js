
module.exports = function (e) {

  console.log(e)

  const err = new Error(e.message)

  err.original = e

  throw err
}
