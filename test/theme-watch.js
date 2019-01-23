const sync = require('../index.js')

sync('watch', {
  dir: 'example',
  target: 'development',
  ignore: [
    'example/snippets/ignore.liquid',
    'example/assets/ignore.js'
  ]
})
