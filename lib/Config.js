const Promise = require('bluebird')
const path = require('path')
const fs = Promise.promisifyAll(require('fs'))

module.exports = async function () {

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
