
let _ = require('lodash')

let Download = require('./theme/download')
let Upload = require('./theme/upload')
let Watch = require('./theme/watch')

/* global VERSION */

var HELPTEXT = `

    Sync theme ${VERSION}
    ==============================

    Commands:
     sync theme upload [options] [filter]     Upload theme files
     sync theme download [options] [filter]   Download theme files
     sync theme watch [options]               Watch theme folder
     sync theme                               Show this screen.

    Options:
      --target=[targetname]                    Explicitly select theme target

`

var run = function *(argv) {
  var command = _.first(argv['_'])
  argv['_'] = argv['_'].slice(1)

  var result = null

  if (command === 'download') {
    result = yield Download(argv)
  } else if (command === 'upload') {
    result = yield Upload(argv)
  } else if (command === 'watch') {
    result = yield Watch(argv)
  } else {
    console.log(HELPTEXT)
  }

  return result
}

module.exports = run
