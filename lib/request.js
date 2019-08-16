const _ = require('lodash')
const Promise = require('bluebird')
const axios = require('axios')
const log = require('./utils/Log')

const url = ({
  api_key,
  password,
  domain
}) => `https://${api_key}:${password}@${domain}.myshopify.com`

const queues = {}

class Queue {

  constructor () {

    this.isProcessing = false
    this.inFlight = 0
    this.rate = 0
    this.max = 40
    this.list = []

  }

  async add (target, request) {

    await new Promise((resolve, reject) => {

      this.list.push({
        target,
        request,
        resolve,
        reject
      })

      !this.isProcessing && this.process()

    })

  }

  async process () {

    this.isProcessing = true

    while (this.list.length > 0) {

      const inject = this.list.shift()

      let headroom = this.max - (this.rate + this.inFlight)
      if (headroom <= 0) {
        headroom = 0
      }

      let exponent = (headroom * headroom)
      if (exponent <= 0.9) {
        exponent = 0.9
      }

      const throttle = 500 / exponent

      await Promise.delay(throttle)

      this.request(inject)

    }

    this.isProcessing = false

  }

  async request ({
    target,
    request,
    reject,
    resolve
  }, result = null) {

    this.inFlight += 1

    try {

      const settings = Object.assign({}, request, {
        url: `${url(target)}${request.url}`
      })

      result = await axios(settings)

    } catch (error) {

      if (error.statusText === 'Too Many Requests') {

        log(`Exceeded Shopify API limit, will retry...`, 'yellow')

        return this.list.unshift({
          target,
          request,
          resolve,
          reject
        })

      } else {

        const { message, data } = this.handleErrors(request, error)

        return reject({
          message,
          data
        })

      }
    }

    this.inFlight -= 1

    await resolve(result.data)

    if (result.data.errors) {

      return reject(result.data.errors)

    } else {

      let limit

      limit = result.headers['x-shopify-shop-api-call-limit']
      limit = limit.split('/')

      this.rate = parseInt(limit[0], 10)
      this.max = parseInt(limit[1], 10)

    }

  }

  handleErrors (request, error) {

    let data = ''
    let message = ''

    if (!_.has(error.response, 'data')) {

      return {
        data: error.stack,
        message: error.name
      }

    }

    const response = error.response.data

    // If Response has any errors we can log
    if (response.errors) {

      // If error is File or API related
      if (response.errors.asset) {

        message = request.data.asset.key
        data = response.errors.asset

      } else {

        data = response.errors

        // API errors
        if (request.data) {
          if (request.data.asset) {
            message = `${request.data.asset.key} was not uploaded`
          } else {
            message = `${request.method.toUpperCase()} ${request.url}`
          }
        }

      }
    } else {

      message = `FAILED! ${error}`
      data = error.statusText

    }

    return {
      message,
      data
    }

  }

}

async function Request (target, request) {

  let queue

  if (queues[target.domain]) {
    queue = queues[target.domain]
  } else {
    queue = new Queue()
    queues[target.domain] = queue
  }

  await queue.add(target, request)

}

module.exports = {
  Request,
  url
}
