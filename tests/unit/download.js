const sync = require('../package/index.js');

sync('download', {
  dir: 'test/dist',
  target: 'development',
  ignore: [
    'snippets/*.liquid'
  ]
}, function () {

  // console.log(this)

});
