import Queue from 'p-queue';
import connect from 'axios';
import https from 'https';
import http from 'http';
import { is } from 'utils/native';

/**
 * Axios Request
 *
 * Creates a request instance
 */
export const axios = connect.create(
  {
    responseType: 'json',
    headers: {},
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
    concurrency: 3,
    interval: 500,
    intervalCap: 2
  }
);

/**
 * Re-queue Request
 *
 * Determines whether or not the request
 * should be re-queued
 */
export const requeue = (status: number) => {

  if (is(status, 429) || is(status, 500)) return true;
  if (!queue.isPaused) queue.pause();

  return false;

};
