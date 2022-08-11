import Queue from 'p-queue';
import connect from 'axios';
import { is } from 'shared/native';

/**
 * Axios Request
 *
 * Creates a request instance
 */
export const axios = connect.create(
  {
    responseType: 'json',
    headers: {}
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
    interval: 250,
    intervalCap: 5
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
