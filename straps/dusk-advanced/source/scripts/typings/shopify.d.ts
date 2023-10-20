import type { LiteralUnion } from 'type-fest';

export interface BrowserContextSuggestions {
  detected_values: {
    /**
     * An object informing of the the visitors country and 2 letter country code
     */
    country: {
      /**
       * The 2 letter country code
       */
      handle: string;
      /**
       * The country name in English
       */
      name: string;
    };
    /**
     * The country name in English (same as `country.name`)
     */
    country_name: string
  };
  suggestions: Array<{
    parts: {
      country?: {
        /**
         * The active 2 letter country code in uppercase, eg: `SE`, `NL` etc.
         * Identical to `detected_values`
         */
        handle: string;
        /**
         * The country name in English, Identical to `detected_values`
         */
        name: string;
        /**
         * Confidence
         */
        confidence: number;
        /**
         * List of countries
         */
        options: {
          [countryCode: string]: string;
        }
      };
      language?: {
        /**
         * The active 2 letter language code in lowercase, eg: `sv`, `nl` etc.
         */
        handle: string;
        /**
         * The language name in English
         */
        name: string;
        /**
         * Confidence
         */
        confidence: number;
        /**
         * List of languages in the store
         */
        options: {
          /**
           * Language Code > Language Name
           */
          [languageCode: string]: string;
        }
      }
    }
  }>
}

export class PreviewBarInjector {

  /**
   * Options are pre-populated
   */
  constructor(options: {
    targetNode: HTMLElement;
    iframeRoot: string;
    iframeSrc: string;
    previewToken:string;
    themeStoreId:string;
    permanentDomain: string;
  })

}

export interface Shopify {
  PaymentButton: {
    init(): any
  }
  autoloadFeatures(param: any): any
  /**
   * Only show in Theme previews, it's a class instance, yuck.
   */
  PreviewBarInjector(): {
    /**
     * This is already invoked at runtime
     */
    init(): void;
    hideIframe(): void;
    postMessageBuffer(argument: any): any;
    postTrekkieData(param: any): any;
    sendPostMessage(param1: any, param2: any): any;
    postMessageHandler(param1: any, param2: any, param3: any, param4: any): any;
    teardown(): void;
  }
  /**
   * Set to `true` when active in theme editor
   */
  designMode?: boolean;
  /**
   * Related to web-pixels management
   */
  analytics: {
    /**
     * Store reference of some sort, see `publish` method.
     */
    replayQueue: Array<[any, any, any]>;
    /**
     * Inserts entries into the `replayQueue`
     */
    publish(param1: any, param2: any, param3: any): void
  }
  /**
   * Routes reference
   */
  routes: {
    /**
     * The root path, typically `/` unless you are using sub-folder
     * markets then it would be something like `/en-us/` etc
     */
    root: string
  };
  /**
   * Reference to CDN hostname, typically: `cdn.shopify.com`
   */
  cdnHost: string
  /**
   * Currency Reference
   */
  currency: {
    /**
     * The current active current code, eg: `USD`, `SEK` etc
     */
    active: string;
    /**
     * The exchange rate
     */
    rate: string
  },
  /**
   * The current 2 Letter ISO Country code, eg: `US` or `CA` or `NL` etc
   */
  country: string;
  /**
   * Customer Privacy Methods
   */
  customerPrivacy: {
    getRegulation(): any
    getShopPrefs(): any
    getTrackingConsent(): any
    isRegulationEnforced(): any
    setTrackingConsent(param1: any, param2: any): any
    shouldShowGDPRBanner(): any
    userCanBeTracked(): any
    userDataCanBeSold(): any
  },
  loadFeatures(params: Array<{
    name: LiteralUnion<'consent-tracking-api', string>,
    version: LiteralUnion<'0.1', string>
  }>, callback:(error: Error) => void): any
  /**
   * Two letter language code
   */
  locale: string
  /**
   * The `myshopify.com` store domain
   */
  shop: string
  modules: boolean
  /**
   * Theme Information
   */
  theme: {
    handle: string
    id: number
    name: string
    role: 'published' | 'unpublished'
    style: {
      id: number
      handle: string
    },
    theme_store_id: null | number
  }
}

export interface BOOMR {
  /**
   * Timestamp, eg: `new Date().getTime()`
   */
  snippetStart: number;
  snippetExecuted: boolean;
  snippetVersion: number;
  /**
   * The application rederer, typically: `storefront-renderer`
   */
  application: string;
  /**
   * The name of the Theme
   */
  themeName: string;
  /**
   * The theme version
   */
  themeVersion: string;
  /**
   * Shop ID
   */
  shopId: number;
  /**
   * Theme ID
   */
  themeId: number;
  /**
   * Theme render region
   */
  renderRegion: string;
  /**
   * External scripting reference, typically:
   * `https://cdn.shopify.com/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js`
   */
  url: string;
}

export interface ShopifyAnalytics {
  /**
   * Holds some references, not just `currency`
   * Seems to change between navigations.
   */
  meta: {
    currency: string;
  };
  /**
   * Related to Google Analytics, fuck knows what.
   */
  merchantGoogleAnalytics(): void
  /**
   * Seems to be what is used to publish to dashboard
   */
  lib: {
    /**
     * Likely an action reference, something like `Viewed Product Category`
     * as the first parameter and the 2nd being an object describing the action.
     */
    track(action: string, data: object): any;
    /**
     * Similar to `track`
     */
    page(action: string, data: object): any;
  }
}
