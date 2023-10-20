import { Customer, Root } from 'types/index';
import { isSameDay, lowercase, setFlag, xDaysFrom } from 'utils/common';
import * as currency from 'application/currency';
import spx from 'spx';
import { assign, create, defineProperty } from 'utils/native';
import * as q from 'application/queries';
import { PartialDeep } from 'type-fest';

/**
 * Session Version
 *
 * The customer session version reference used to execute a hard refresh
 */
export const version = 1.55;

const storage: {
  /**
   * Proxy States
   */
  (target: Customer, write: (local: string) => void): Customer;
  /**
   * Weak map cache
   */
  cache?: WeakMap<object, Customer>

} = function (target, write) {

  return new Proxy(target, {

    get (target, property) {

      const item = target[property];

      if (item && typeof item === 'object') {
        if (storage.cache.has(item)) return storage.cache.get(item);
        const proxy = storage(item, write);
        storage.cache.set(item, proxy);
        return proxy;
      }

      return item;

    },
    set (target, property, newValue) {
      target[property] = newValue;
      write(JSON.stringify($.session));
      return true;
    }
  });

};

/**
 * Localize
 *
 * Localizes the customer and determine the market and operations
 * which should take place (i.e: whether or not to run a geo request).
 *
 * When the visitor is referred from a different localized domain we
 * will purge existing cache and execute geoip based on query parameter
 * of value `?market=SE` (or whichever country code).
 */
export async function localize () {

  /**
   * Customer Session
   *
   * Default customer data object session. This is a global object
   * used accross the webshop. It hold a reference to the customers
   * visit, locality and features.
   */
  const customer: Customer = JSON.parse(localStorage.getItem('customer')) || {
    version: NaN,
    expires: NaN,
    forward: null,
    referrer: null,
    shouldRedirect: false,
    deniedRedirect: false,
    lastVisit: NaN,
    visitCount: 0,
    giftCard: null,
    discountAmount: 0,
    discountPercentage: 0,
    discountCode: null,
    lowStockNotifications: [],
    restockNotifications: [],
    customerId: null,
    trackingConsent: null,
    emailAddress: null,
    assumedGender: 'NA',
    privateSaleAccess: NaN,
    privateSaleSavings: {},
    privateSaleDiscounts: {},
    market: {
      active: false,
      languageCode: 'EN',
      returnFree: false,
      returnPrice: 79,
      returnThreshold: 0,
      returnPricePresent: '79.00 SEK',
      shippingFree: false,
      shippingPrice: 49,
      shippingThreshold: 1000,
      shippingPricePresent: '49.00 SEK',
      countryCode: 'SE',
      currencyCode: 'SEK',
      countryName: 'Sweden',
      domain: 'brixtoltextiles.com',
      unitSystem: 'METRIC',
      currencySymbol: 'kr',
      isEU: true,
      root: '/',
      flag: 'https://cdn.shopify.com/static/images/flags/se.svg?width=28',
      languageSupport: [
        {
          isoCode: 'EN',
          name: 'English',
          endonymName: 'Engels',
          domain: 'brixtoltextiles.com'
        },
        {
          isoCode: 'SV',
          name: 'Swedish',
          endonymName: 'Svenska',
          domain: 'brixtoltextiles.se'
        }
      ]
    }
  };

  const url = root();

  if (url.localizedDomain) {

    if (customer.version !== version) {
      localStorage.removeItem('customer');
      customer.lastVisit = Date.now();
      customer.visitCount = 1;
      customer.version = version;
    } else {
      customer.lastVisit = Date.now();
      customer.visitCount += 1;
    }

    const market = await q.market(Shopify.country);

    if (market.countryCode !== customer.market.countryCode) {
      customer.market = market;
    }

    return route(customer);

  }

  if (customer.version !== version) {
    localStorage.removeItem('customer');
    customer.lastVisit = Date.now();
    customer.visitCount = 1;
    customer.version = version;
  } else {
    customer.lastVisit = Date.now();
    customer.visitCount += 1;
  }

  if (url.localizedSubfolder) {
    customer.expires = xDaysFrom(customer.lastVisit, 90);
    customer.market = await q.market(url.countryCode);
    customer.market.languageCode = url.languageCode;
    return route(customer);
  }

  if (url.referred !== null) {
    customer.expires = xDaysFrom(customer.lastVisit, 90);
    customer.market = await q.market(url.referred);
    return route(customer);
  }

  if (isNaN(customer.expires)) return geoip(customer);
  if (customer.lastVisit > customer.expires) return geoip(customer);

  return route(customer);

}

/**
 * Route
 *
 * Executes a route operation and applies global contexts to the `$` object.
 * The function is responsible for applying hydration and localizing the
 * vistor to their correct market.
 */
export async function route (session: Customer) {

  const customer = context(session);
  const { market } = customer;
  const url = root();
  const same = isSameDay(customer.lastVisit);

  if (url.localizedDomain === false && url.domain !== customer.market.domain && (
    customer.visitCount === 1 || (
      same === false &&
      customer.deniedRedirect === false
    )
  )) {

    $.session.shouldRedirect = true;

  }

  // We are not on our main domain
  if (url.localizedDomain) {

    // Localized domains infer specific market, let's ensure language is correct
    // When language does not match, lets hydrate forward
    if (url.languageCode !== market.languageCode) {

      // The .SE domain is special case handling, we don't want to apply any
      // additional appenditures
      if (url.domain !== 'brixtoltextiles.se') {

        await spx.hydrate(lowercase(`/${market.languageCode}${url.path}`), [
          'header',
          'main',
          'footer',
          '!form',
          '!picture',
          '!img',
          '!.accordion'
        ]);

      }
    }

  } else if (url.countryCode !== market.countryCode) {

    if (
      market.countryCode === 'SE' &&
      market.languageCode !== 'EN') $.session.market.languageCode = 'EN';

    let path: string = url.path;

    if (
      market.active &&
      url.root !== market.root &&
      url.localizedDomain === false
    ) {

      if (market.languageCode === 'EN') {

        // Let's handle default redirection
        path = `${market.root}${url.path}`;

      } else {

        // If user has specified a different language, let's apply
        path = lowercase(`/${market.languageCode}-${market.countryCode}${url.path}`);

      }

    }

    if (customer.market.currencyCode !== Shopify.currency.active) {

      const nodes = [
        'header',
        'main',
        'footer',
        '!form',
        '!picture',
        '!img',
        '!.accordion'
      ];

      if ($.session.shouldRedirect) nodes.push('!#navbar-flag');

      await currency.global(customer.market.currencyCode);
      await spx.hydrate(path, nodes);

    }

  }

  setFlag(customer.market.flag);

}

export function localized () {

}

/**
 * Root Paths
 *
 * Obtains the current localized pathname context. Returns
 * an object which describes the current path location.
 */
export function root (): Root {

  const { pathname, hostname, search } = location;
  const locale: Root = create(null);

  locale.root = '/';
  locale.path = '';
  locale.subfolderCountry = false;
  locale.subfolderLanguage = false;
  locale.localizedSubfolder = false;
  locale.localizedDomain = /\.com$/.test(location.hostname) === false;
  locale.domain = hostname;
  locale.languageCode = Shopify.locale.toUpperCase();
  locale.countryCode = Shopify.country;
  locale.referred = null;

  if (search.startsWith('?r=301')) {

    const iso = search.slice(6).trim().toUpperCase();

    if (/^[A-Z]{2}/.test(iso)) {
      locale.referred = iso.slice(0, 2);
    }
  }

  const path = pathname.split('/').filter(Boolean).shift();

  if (path && path.length === 2 && /[a-z]{2}$/.test(path)) {

    const p = pathname.slice(3);

    locale.path = p[p.length - 1] === '/' ? p.slice(0, -1) : p;
    locale.root = `/${path}`;
    locale.languageCode = path.toUpperCase();
    locale.countryCode = path.toUpperCase();
    locale.subfolderLanguage = true;

  } else if (/[a-z]{2}-[a-z]{2}$/.test(path)) {

    const [ language, iso ] = path.split('-');
    const p = pathname.slice(6);

    locale.path = p[p.length - 1] === '/' ? p.slice(0, -1) : p;
    locale.root = `/${path}`;
    locale.languageCode = language.toUpperCase();
    locale.countryCode = iso.toUpperCase();
    locale.localizedSubfolder = true;
    locale.subfolderCountry = true;
    locale.subfolderLanguage = true;

  } else {

    locale.path = pathname[pathname.length - 1] === '/' ? pathname.slice(0, -1) : pathname;

  }

  return locale;

}

/**
 * GeoIP
 *
 * Executes a Geo request to the
 */
export async function geoip (customer: Customer) {

  try {

    const { countryCode } = await q.geoip();
    const market = await q.market(countryCode);

    customer.expires = xDaysFrom(customer.lastVisit, 90);
    customer.market = market;

    return route(customer);

  } catch (e) {

    console.error('GeoIP Failed, using i18n fallback', e);

  }
}

/**
 * Patch Update
 *
 * Modifies the customer session data.
 */
export function patch <T extends PartialDeep<Customer>> (input: T): Customer {

  $.session = input as Customer;

  return $.session;

}

export function context (customer: Customer) {

  if (!$.session) {

    storage.cache = new WeakMap();

    defineProperty(window.$, 'session', {
      get () {
        return storage(customer, function (local: string) {
          localStorage.setItem('customer', local);
        });
      },
      set (session) {
        const update = assign(customer, merge($.session, session));
        localStorage.setItem('customer', JSON.stringify(update));
      }
    });
  }

  if (!$.market) {
    defineProperty(window.$, 'market', { get () { return $.session.market; } });
  }

  if (!$.patch) {
    defineProperty(window.$, 'patch', { value: patch });
  }

  if (!$.root) {
    defineProperty(window.$, 'root', { value: root });
  }

  return $.session;

}

export function privacy (consent: boolean, action?: (error: Error) => void) {

  const tracked = Shopify.customerPrivacy.userCanBeTracked();
  const status = Shopify.customerPrivacy.getTrackingConsent();

  if (!tracked && status === 'no_interaction') $.session.trackingConsent = null;

  Shopify.loadFeatures([
    {
      name: 'consent-tracking-api',
      version: '0.1'
    }
  ], action);

}
