import Queue from 'p-queue';

/**
 * Queue Literal
 */
export const q = new class Enqueue {

  /**
   * Cache Queue
   *
   * Cache specific queue
   */
  cache = new Queue();

  /**
   * Bulk Queue
   *
   * Used in `watch` mode for batch requests.
   */
  bulk = new Queue({ concurrency: 1 });

  /**
   * Change Queue
   *
   * Used in `watch` mode for single file changes.
   */
  change = new Queue();

  /**
   * Task Queue
   *
   * Holds various different operations that can be queue executed
   */
  tasks = new Queue();

  /**
   * HTTP Queue
   *
   * HTTP Request Queue which performs requests in 1000ms (10 per-cap) intervals. This ensures
   * that requests stay within bounds of limits imposed by Shopify. It does not take into
   * account plan based usage limits, which needs to be addressed in later versions.
   */
  http = new Queue({ interval: 1000, intervalCap: 10 });

}();
