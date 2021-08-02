import { Promise as P } from 'bluebird';
import axios from 'axios';
import { getTargetUrl } from './utils';
import * as log from '../config/logger';
import { IRequest, IPayload, ITarget, IRequestData } from '../index.d';

export class Queue {

  static queues = {};

  private isProcessing: boolean = false
  private max: number = 40
  private rate: number = 0
  private inFlight: number = 0
  private payload: IPayload[] = []

  /**
   * Add request to Queue
   */
  add (target: ITarget, request: IRequest): Promise<unknown> {

    return new P((resolve, reject) => {

      this.payload.push({ target, request, resolve, reject });

      if (!this.isProcessing) this.process();

    });

  }

  /**
   * Process Queue
   *
   * @async
   * @private
   */
  async process () {

    this.isProcessing = true;

    do {

      let headroom = this.max - (this.rate + this.inFlight);
      if (headroom <= 0) headroom = 0;

      let exponent = (headroom * headroom);
      if (exponent <= 0.9) exponent = 0.9;

      const throttle = 500 / exponent;
      const inject = this.payload.shift();

      await P.delay(throttle);

      this.request(inject);

    } while (this.payload.length > 0);

    this.isProcessing = false;

  }

  /**
   * Queue Request
   */
  async request ({ target, request, reject, resolve }: IPayload) {

    let result = null;

    this.inFlight += 1;

    try {

      const url = getTargetUrl(target) + request.url;
      const settings = Object.assign({}, request, { url });

      result = await axios(settings);

    } catch (error) {

      if (error.statusText === 'Too Many Requests') {

        log.print('Exceeded Shopify API limit, will retry...', 'yellow', 'warn');

        return this.payload.unshift({
          target,
          request,
          resolve,
          reject
        });
      }

      console.log(error);

      const handleError = this.error(request, error);

      return reject(handleError);

    }

    this.inFlight -= 1;

    resolve(result.data);

    if (result.data.errors) return reject(result.data.errors);

    const limit = result.headers['x-shopify-shop-api-call-limit'].split('/');

    this.rate = parseInt(limit[0], 10);
    this.max = parseInt(limit[1], 10);

  }

  /**
   * Error Handler
   *
   */
  error (request: IRequest, error: {
    stack?: string,
    name?: string,
    statusText?: string
    response?: {
      data?: {
        errors: IRequestData
      }
    }
  }) {

    if (!error.response?.data) {
      return {
        data: error.stack,
        message: error.name
      };
    }

    const response = error.response.data;

    // If Response has any errors we can log
    if (response?.errors) {

      // If error is File or API related
      if (response.errors.asset) {

        return {
          data: response.errors.asset,
          message: request.data.asset.key
        };

      } else if (request.data) {

        // API errors
        return {
          data: response.errors,
          message: request.data.asset
            ? `${request.data.asset.key} failed to upload`
            : `${request.method.toUpperCase()} ${request.url}`
        };
      }

    }

    return {
      message: `FAILED! ${error}`,
      data: error.statusText
    };

  }

}
