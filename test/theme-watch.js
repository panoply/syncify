const sync = require('../package/index.js');

sync('watch', {
  dir: 'example',
  concurrency: 20,
  target: 'development',
  ignore: [
    'example/dist/**/**',
    'example/assets/*.js.map',
    'example/sections/ignore.js',
    'example/assets/ignore.liquid'
  ]
}, function () {
  console.log(this);
});
