import Promise from 'bluebird'
import path from 'path'

const fs = Promise.promisifyAll(require('fs'))

export default async function () {

  let config

  try {
    const cwd = process.cwd()

    let file = path.join(cwd, '.shopifysync.json')

    if (!file) {
      file = path.join(cwd, '.shopifysync')
    }

    config = await fs.readFileAsync(file, 'utf8')

  } catch (err) {
    throw new Error('The \'.shopifysync.json\' configuration is missing!')
  }

  try {
    config = JSON.parse(config)
  } catch (err) {
    throw new Error('Your \'.shopifysync.json\' file is corrupt. JSON failed to parse')
  }

  return config

}
