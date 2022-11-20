/* eslint-disable no-unused-vars */

import { LiteralUnion } from 'type-fest';

type IScreens = 'xs' | 'sm' | 'md' | 'lg'

export interface Shopify {
  PaymentButton: {
    init(): any
  }
  autoloadFeatures(param: any): any
  PreviewBarInjector(): any
  /**
   * Set to `true` when active in theme editor
   */
  designMode?: boolean
  cdnHost: string
  currency: {
    active: string
    rate: string
  },
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
   * Myshopify.com store domain
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

interface App {
  images?: lozad.Observer
  discounts ?: {
    [code: string]: string
  }
  screen?: {
    isActive(screen: IScreens): boolean
  },
  modules?: {
    sdk?: {
      facebook: string
      google: string
    }
  }
}

interface Shop {
  customer_id: number,
  asset_url?: string,
  script: {
    framework: string,
    polyfills: string
  },
  cart: {
    charity: {
      enabled: boolean,
      organization: string
      amount: number,
      subtext: string,
      logo: string
    }
  }
}

declare global {

  interface Window {
    Shopify: Shopify
    app: App,
    i18n: i18n.i18n,
    shop: Shop
  }

  interface StoreJsAPI {
   // patch<T = any>(key: string, ...updates: Partial<T>[]): T
   // watch<T = any>(key: string, callback: (value: T) => void): any
   // unwatch(key: string): void
   // once<T = any>(key: string, callback: (value: T) => void): void
  }
}
