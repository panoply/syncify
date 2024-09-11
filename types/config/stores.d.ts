/**
 * Stores Configuration
 */
export interface Stores {
  /**
   * The store myshopify domain, eg: `store.myshopify.com`
   */
  domain: string;
  /**
   * The store theme targets - Theme use a `key > value`
   * structure. The `key` values represent target names that
   * will be used in the CLI.
   */
  themes: { [target: string]: number }
}
