import Queue from 'p-queue';

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
