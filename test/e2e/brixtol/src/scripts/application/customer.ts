import m from 'mithril';
import merge from 'mergerino';
import Stream from 'mithril/stream';
import { assign, defineProperty } from 'utils/native';
import { xDaysFrom } from 'utils/common';
import { store } from 'modules/store';
import { ISession } from 'types/export';

/**
 * Customer Cart
 *
 * Mithril stream which maintains the ajax cart
 * state and customers line items.
 */
export const cart = Stream.scan(merge, <Shopify.IAjaxCart>{}, Stream());

if (store.get('customer')?.country_name) {

  store.remove('customer');

}

/**
 * Customer Session
 *
 * Default customer data object session. This is a global object
 * used accross the webshop. It hold a reference to the customers
 * visit, locality and features.
 */
export const session: ISession = store.get('customer', <ISession>{
  expires: NaN,
  lastVisit: NaN,
  visitCount: 0,
  currencyCode: 'SEK',
  currencySymbol: 'kr',
  currencyPlacement: '# !',
  currencyRate: 1,
  priceAdjustment: 0,
  countryName: 'Sweden',
  countryCode: 'SE',
  countryFlag: 'https://brixtol.cloud/flags/flag_se.svg',
  continentCode: 'EU',
  continentName: 'Europe',
  returnThreshold: 1499,
  returnFree: true,
  returnPrice: 79,
  shippingPrice: 0,
  shippingFree: true,
  shippingThreshold: 0,
  giftCard: null,
  discountAmount: 0,
  discountPercentage: 0,
  discountCode: null,
  offerBogo: false,
  offerNewsletter: false,
  restockNotifications: [],
  customerId: null,
  trackingConsent: null,
  emailAddress: null,
  assumedGender: 'NA',
  referrer: 'NA'
});

/**
 * Patch Update
 *
 * Modifies the customer session data.
 * Optionally triggers a document event which
 * are listening for changes within different
 * stimulus controllers.
 */
export function patch <T extends ISession> (opts: { event: boolean }, input: T) {

  const detail = assign(session, input);
  const update = store.set('customer', detail);

  if (opts.event) {
    const event = new CustomEvent('customer:localized', { detail });
    document.dispatchEvent(event);
  } else {
    return update;
  }

}

/**
 * Localize
 *
 * Localizes the customer.
 */
export async function localize () {

  session.lastVisit = new Date().getTime();
  session.visitCount += 1;

  const locales = await import(window.i18n.module);

  defineProperty(window.i18n, 'locales', { get () { return locales.default; } });

  if (isNaN(session.expires) || session.lastVisit > session.expires) {
    return geoip(locales.default);
  }

  return patch({ event: true }, session);

}

/**
 * GeoIP
 *
 * Fetches visitor i18n localisation information
 * from the IP Stack. If for some reason GeoIP
 * fails, we load Swedish defaults as a fallback.
 */
export async function geoip (locales: { [iso: string]: ISession }) {

  try {

    const { country_code } = await m.request<{ country_code: string }>({
      url: 'https://api.ipstack.com/check',
      params: {
        access_key: '80f013347261a445a6778233c302acb2',
        fields: 'country_code'
      }
    });

    session.expires = xDaysFrom(session.lastVisit, 90);

    return patch({ event: true }, locales[country_code]);

  } catch (e) {

    console.error('GeoIP Failed, using i18n fallback', e);

    session.expires = xDaysFrom(session.lastVisit, 1);

    return patch({ event: true }, session);

  }

}

export function privacy (consent: boolean, action?: (error: Error) => void) {

  const tracked = window.Shopify.customerPrivacy.userCanBeTracked();
  const status = window.Shopify.customerPrivacy.getTrackingConsent();

  if (!tracked && status === 'no_interaction') {
    session.trackingConsent = null;
  }

  window.Shopify.loadFeatures([
    {
      name: 'consent-tracking-api',
      version: '0.1'
    }
  ], action);

}
