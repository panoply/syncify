import { LiteralUnion } from 'type-fest';

export interface Options {
  /**
   * Whether or not the label should render
   *
   * @default true
   */
  label?: boolean;
  /**
   * The Server URL
   */
  server?: number;
  /**
   * The Websocket url
   */
  socket?: number;
  /**
   * The Reload Mode
   *
   * > `hot`
   * > Partial replacements, best option.
   *
   * > `live`
   * > Replaces the entire `<body>` element on each change
   *
   * > `refresh`
   * > Triggers full-page refresh on each change
   */
  method?: LiteralUnion<'hot' | 'live' | 'refresh', string>;
  /**
   * Rendering flags
   */
  flags?: {
    /**
     * Hides Preview Bar
     */
    'no-preview-bar': boolean;
    /**
     * Prevents CFH wpm from evaluating
     */
    'no-web-pixels-manager': boolean;
    /**
     * Prevents CFH checkout preloads from evaluating
     */
    'no-checkout-preloads': boolean;
    /**
     * Prevents CFH Shopify features from evaluating
     */
    'no-shopify-features': boolean;
    /**
     * Prevents CFH trekkie from evaluating
     */
    'no-trekkie': boolean;
    /**
     * Prevents CFH perfkit from evaluation
     */
    'no-perfkit': boolean;
  }

}
