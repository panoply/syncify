import Promise from 'bluebird'
import path from 'path'

const fs = Promise.promisifyAll(require('fs'))

export default async function () {

  let config

  try {
    const cwd = process.cwd()
    const file = path.join(cwd, '.shopifysync')
    config = await fs.readFileAsync(file, 'utf8')
  } catch (err) {
    throw new Error('The \'.shopifysync\' configuration is missing!')
  }

  try {
    config = JSON.parse(config)
  } catch (err) {
    throw new Error('Your \'.shopifysync\' file is corrupt. JSON failed to parse')
  }

  return config

}
