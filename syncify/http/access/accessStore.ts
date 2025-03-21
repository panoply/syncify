import xior, { XiorError } from 'xior';

/**
 * **accessStore**
 *
 * Performs a storefront existence check. Queries Shopify for a response
 * to confirm whether or not the store name provided exists.
 *
 * ```js
 * accessStore('some-shop-name').then(({ exists }) => {
 *
 *  if (exists === true) {
 *    console.log('some-shop-name.myshopify.com exists!')
 *  }
 *
 * })
 * ```
 */
export async function accessStore (store: string): Promise<{
  /**
   * A boolean indicating whether or not store exists
   */
  exists: boolean;
  /**
   * Error response - `null` if store is found, otherwise holds response error
   */
  error?: XiorError;
}> {

  return xior.head(`https://${store}.myshopify.com`).then(() => ({
    exists: true,
    error: null
  })).catch((error: XiorError) => ({
    exists: false,
    error
  }));

}
