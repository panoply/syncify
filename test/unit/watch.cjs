const sync = require('@liquify/syncify');

sync('watch', {
  dir: 'example',
  concurrency: 20,
  target: 'dev',
  metafields: {
    path: 'example/metafields'
  },
  ignore: [
    'example/dist/**/**',
    'example/assets/*.js.map',
    'example/sections/ignore.js',
    'example/assets/ignore.liquid'
  ]
}, function (content) {
  console.log(this);

  const data = content.toString();

  // return 'foo';

});
