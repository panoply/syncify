import type pQueue from 'p-queue';

export interface Queue {

  /**
   * Define Queue
   *
   * Typically runtime usage only.
   */
  define: pQueue;

  /**
   * Bulk Queue
   *
   * Used in `watch` mode for batch requests.
   */
  bulk: pQueue;

  /**
   * Change Queue
   *
   * Used in `watch` mode for single file changes.
   */
  change: pQueue;

  /**
   * HTTP Queue
   *
   * The request client
   */
  request: pQueue;

}
