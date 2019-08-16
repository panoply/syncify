const sync = require('../index.js')

sync('watch', {
  dir: 'example',
  target: 'development',
  ignore: [
    'example/assets/*.js.map',
    'example/sections/ignore.js',
    'example/assets/ignore.liquid'
  ]
}, function () {
  console.log('IS DONE', this.file)
})
