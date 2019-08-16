const _ = require('lodash')
const chalk = require('chalk')

module.exports = function (settings, ignored = {
  base: /[/\\]\./,
  count: 0,
  files: null,
  log: null
}) {

  if (settings.ignore && settings.forceIgnore) {
    ignored.count = settings.ignore.length
    ignored.log = _.join(settings.ignore, chalk`\n\t {whiteBright - }`)
    settings.ignore.push(ignored.base)
    ignored.files = settings.ignore
  }

  return {
    settings,
    ignored
  }

}
