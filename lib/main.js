let co = require('co');
let _ = require('lodash');
let {
  log
} = require('./helpers');
let Configure = require('./configure');
let Theme = require('./theme');

var HELPTEXT = `
  Shopify Sync
  ==============================
  Commands:
  sync configure                    Creates/Updates the configuration file
  sync theme                        Manage Shopify themes
  sync                              Show this screen.
`;

const run = function (argv) {
  return co(function* () {
    var command = _.first(argv['_'])
    argv['_'] = argv['_'].slice(1)

    var result

    if (command === 'configure') {
      result = yield Configure(argv)
    } else if (command === 'theme') {
      result = yield Theme(argv)
    } else {
      console.log(HELPTEXT)
    }

    if (result) {
      log(result, 'green')
    }
  }).catch(function (err) {
    if (err.stack) {
      err = err.stack
    }
    log(err, 'red')
  })
}

module.exports = run
