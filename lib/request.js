const axios = require('axios')
const co = require('co')
const Promise = require('bluebird')
const { log } = require('./helpers')

const queues = {}

const url = function (target) {
  return `https://${target.api_key}:${target.password}@${target.domain}.myshopify.com`
}

const baseQueue = {

  add: function (target, request) {

    return new Promise((resolve, reject) => {

      this.list.push({ target, request, resolve, reject })
      if (!this.isProcessing) {
        this.process()
      }

    })

  },

  process: function () {

    co(function * () {

      this.isProcessing = true

      while (this.list.length > 0) {

        let req = this.list.shift()
        let headroom = this.max - (this.rate + this.inFlight)

        if (headroom <= 0) {
          headroom = 0
        }

        let exponent = (headroom * headroom)

        if (exponent <= 0.9) {
          exponent = 0.9
        }

        let throttle = 500 / exponent

        yield Promise.delay(throttle)

        this.request(req)
      }

      this.isProcessing = false

    }.bind(this)).catch(function (err) {
      console.log(err)
    })
  },

  request: function ({
    target,
    request,
    resolve,
    reject
  }) {

    // console.log(`Shopify Request: [${request.method}]${request.url}`)

    co(function * () {

      let result

      this.inFlight += 1

      try {

        result = yield axios(Object.assign({}, request, {
          url: `${url(target)}${request.url}`
        }))

      } catch (e) {

        if (e.statusText === 'Too Many Requests') {

          log(`Exceeded Shopify API limit, will retry...`, 'yellow')

          return this.list.unshift({
            target,
            request,
            resolve,
            reject
          })

        } else {

          let data, message

          const response = e.response.data

          // If Response has any errors we can log
          if (response.errors) {

            // If error is File or API related
            if (response.errors.asset) {
              message = request.data.asset.key
              data = response.errors.asset

            } else {

              // API errors
              if (request.data) {
                if (request.data.asset) {
                  message = `${request.data.asset.key} was not uploaded`
                } else {
                  message = `${request.method.toUpperCase()} ${request.url}`
                }
              }

              data = response.errors

            }
          } else {

            message = `FAILED! ${e}`
            data = e.statusText

          }

          return reject({
            message: message,
            data: data
          })

        }
      }

      this.inFlight -= 1

      if (result.data.errors) {

        return reject(result.data.errors)

      } else {

        let limit = result.headers['x-shopify-shop-api-call-limit']
        limit = limit.split('/')
        this.rate = parseInt(limit[0], 10)
        this.max = parseInt(limit[1], 10)

      }

      return resolve(result.data)

    }.bind(this)).catch(function (e) {
      console.log(e)
    })
  }

}

const createQueue = function () {

  let queue = Object.create(baseQueue)
  queue.isProcessing = false
  queue.inFlight = 0
  queue.rate = 0
  queue.max = 40
  queue.list = []

  return queue

}

module.exports = function (target, request) {

  let queue

  if (queues[target.domain]) {
    queue = queues[target.domain]
  } else {
    queue = createQueue()
    queues[target.domain] = queue
  }

  return queue.add(target, request)

}
