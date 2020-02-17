const sync = require('../index.js')

sync('download', {
  dir: 'example/dist',
  target: 'development'
}, function () {

  console.log(this)

})
