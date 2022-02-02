import Queue from 'p-queue';
import connect from 'axios';
import https from 'https';
import http from 'http';

/**
 * Axios Request
 *
 * Creates a request instance
 */
export const axios = connect.create(
  {
    responseType: 'json',
    httpAgent: new http.Agent(
      {
        keepAlive: true
      }
    ),
    httpsAgent: new https.Agent(
      {
        keepAlive: true
      }
    )
  }
);

/**
 * The Request Queue
 *
 * We exceed the rate limits set by Shitify.
 * This allows us to upload in bursts, when we hit
 * the rates we requeue the requests.
 */
export const queue = new Queue(
  {
    concurrency: 5,
    interval: 500,
    intervalCap: 4
  }
);
