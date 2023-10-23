/* eslint-disable no-unused-vars */

import type { BOOMR, ShopifyAnalytics, Shopify } from './shopify';
import type { Customer } from './session';
import type LazySizes from 'lazysizes';

declare global {

  interface WindowEventMap {
    /**
     * Shopify Theme Editor section select event
     */
    'shopify:section:select': CustomEvent<{
      detail: {
        sectionId: string;
      }
    }>;
    /**
     * Shopify Theme Editor section select event
     */
    'shopify:section:deselect': CustomEvent<{
      detail:{
        sectionId: string;
      }
    }>;
  }

  interface Window {
    fbq: any;
    /**
     * Shopify BOOMR
     */
    BOOMR: BOOMR;
    /**
     * Shopify Analytics
     */
    ShopifyAnalytics: ShopifyAnalytics;
    /**
     * Shopify context
     */
    Shopify: Shopify;
    /**
     * LazySizes Module
     */
    lazySizes: typeof LazySizes;
    /**
     * Webshop State
     */
    $: {
      /**
       * Customer Session
       */
      customer: Customer;
      /**
       * Exposed controller methods for working in the theme editor.
       * When `Shopify.designMode` is `true` this method will expose
       * access to controller instances via a Map.
       */
      app?: {
        get<T>(id: string): T;
        has(id: string): boolean;
        set<T>(id: string, instance: T): void
      }
    }
  }

  /**
   * Meta Pixel
   */
  const fbq: Window['fbq'];
  /**
   * LazySizes Module
   */
  const lazySizes: Window['lazySizes'];
  /**
   * Shopify context
   */
  const Shopify: Window['Shopify'];
  /**
   * Webshop Store
   */
  const $: Window['$'];
}
