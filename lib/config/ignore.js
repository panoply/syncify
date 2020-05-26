import _ from 'lodash'
import chalk from 'chalk'

export default function (settings, ignored = {
  base: /[/\\]\./,
  count: 0,
  files: null,
  log: null
}) {

  if (settings.ignore && settings.forceIgnore) {
    ignored.count = settings.ignore.length
    ignored.log = settings.ignore.join(chalk`\n\t {whiteBright - }`)
    settings.ignore.push(ignored.base)
    ignored.files = settings.ignore
  }

  return {
    settings,
    ignored
  }

}
