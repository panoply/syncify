
module.exports = function (e) {
  console.log(e)
  var err = new Error(e.message)
  err.original = e
  throw err
}
