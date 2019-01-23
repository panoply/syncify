const sync = require('../index.js')

sync('upload', {
  dir: 'example',
  target: 'development',
  ignore: [
    'example/sections/ignore.js',
    'example/assets/ignore.liquid'
  ]
})
