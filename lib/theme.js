
let _ = require('lodash')

let Download = require('./theme/download')
let Upload = require('./theme/upload')
let Watch = require('./theme/watch')

/* global VERSION */

var HELPTEXT = `

    Store theme ${VERSION}
    ==============================

    Commands:
     store theme upload [options] [filter]     Upload theme files
     store theme download [options] [filter]   Download theme files
     store theme watch [options]               Watch theme folder
     store theme                               Show this screen.

    Options:
      --target=[targetname]                   Explicitly select theme target

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
