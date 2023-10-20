import Queue from 'p-queue';
import connect from 'axios';

/**
 * Axios Request
 *
 * Creates a request instance
 */
export const axios = connect.create({
  responseType: 'json',
  headers: {}
});

/**
 * The Request Queue
 *
 * We exceed the rate limits set by Shopify.
 * This allows us to upload in bursts, when we hit
 * the rates we requeue the requests.
 */
export const queue = new Queue({
  // concurrency: 5,
  interval: 500,
  intervalCap: 2
});

/**
 * Re-queue Request
 *
 * Determines whether or not the request
 * should be re-queued
 */
export function requeue (status: number) {

  if ((status === 429) || (status === 500)) return true;
  if (!queue.isPaused) queue.pause();

  return false;

};
