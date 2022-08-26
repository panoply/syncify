const sync = require('../package/index.js');

sync('upload', {
  dir: 'example',
  concurrency: 5,
  target: 'development',
  ignore: [
    'test/example/dist/**/**',
    'test/example/sections/ignore.js',
    'test/example/assets/ignore.liquid'
  ]
}, function () {

  console.log(this);

});
