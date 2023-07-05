import m from 'mithril';
import currency from 'currency.js';
import * as cashify from 'cashify';
import * as pjax from 'spx';
import * as customer from 'application/customer';
import { assign, is } from 'utils/native';
import { CurrencyCodes as Codes, CurrencyCodes } from '@brixtol/i18n';

/**
 * Exchange Rates
 *
 * These are hardcoded as we use manual exchange
 * rates, likely to move this logic in the future.
 *
 * @see https://brixtol.myshopify.com/admin/settings/payments
 */
const rates = Object.freeze({
  SEK: 1,
  AUD: 0.159895,
  EUR: 0.09945,
  USD: 0.1199,
  HKD: 0.89944,
  JPY: 12.7764,
  KRW: 134.695,
  SGD: 0.16995,
  ISK: 15.1245,
  SAR: 0.524959,
  RUB: 8.464525,
  UAH: 3.24995,
  GEL: 0.39445,
  CZK: 2.52459,
  HRK: 0.752945,
  RSD: 11.84539,
  CNY: 0.846489,
  ILS: 0.401945,
  PLN: 0.4595,
  ALL: 12.0045,
  HUF: 36.94747,
  GBP: 0.0995,
  CAD: 0.15899,
  NZD: 0.17999,
  CHF: 0.13376,
  DKK: 0.75995,
  NOK: 1.11595
});

/**
 * The base currency for the store.
 */
export const base = 'SEK';

/**
 * Percentage Price
 *
 * Handles an Increase / Decrease of an integer
 * price based on a percentage amount.
 */
function percent (amount: number, percentage: number) {

  return ((percentage / 100) * amount) + amount;
}

/**
 * Price Roundings
 *
 * Normalizes prices and applies the correct rounding
 * rates in accordance to Shopify.
 */
function round (price: number, rate: number) {

  const [ dollars, cents = '0' ] = price.toString().match(/(\d+)\.?(\d+)?/);
  const amount = Number(cents[0]) > 0 ? Math.ceil(price) : Number(dollars);
  const round = Number(String(amount).slice(rate));

  if (is(rate, -3)) {
    if (is(round, 0)) return amount;
    return (amount + (1000 - round));
  }

  if (is(rate, -2)) {
    if (is(round, 0)) return amount;
    return (amount + (100 - round));
  }

  return round;
}

/**
 * Decimal Point
 *
 * Currencies are using automatic roundings.
 * This function returns a index value amount
 * that we use to slice converted prices. We validates
 * the exchange rate according to the expected exchange.
 */
function point (rate: number) {

  if (rate > 5 && rate < 100) return -2;
  if (rate > 100) return -3;

  return 0;

}

/**
 * Local Conversion
 *
 * Executes a dynamic convert. This helps negate
 * a pjax triggered conversion. If the currency rates
 * are defined we will apply conversion with the local
 * references.
 */
function validate (currency: CurrencyCodes) {

  const { active } = window.Shopify.currency;

  // Matches, do nothing.
  if (currency === base && active === base) return true;

  // Matches, do nothing.
  if (currency === active) return true;

  return false;

}

/**
 * Cart Event
 *
 * Triggers a fetch of the customer cart.
 * Executed when currencies change.
 *
 */
function cart () {

  const event = new CustomEvent('customer:cart');

  document.dispatchEvent(event);

}

/**
 * Local Conversion
 *
 * Executes a dynamic convert. This helps negate
 * a pjax triggered conversion. If the currency rates
 * are defined we will apply conversion with the local
 * references.
 */
export async function local (currency: CurrencyCodes, country?: string) {

  if (!validate(currency)) {

    // Store is not in SEK, global convert
    if (currency !== base) return global(currency, country);

    // Store is in SEK but we have no rates
    if (!rates?.[currency]) return global(currency, country);

    // We have rates and store is in SEK
    await exchange();

    // Update cart currency
    return m.request('/cart/update.js', { body: { currency }, method: 'POST' })
      .then(customer.cart)
      .then(() => cart())
      .catch(console.error);

  }
}

/**
 * Global Conversion
 *
 * Executes a fetched hydration conversion. This
 * will send a request to the Shopify conversion
 * endpoint which will change the store currency.
 */
export async function global (currency?: string, country?: string) {

  await m.request('/cart/update.js', { body: { currency }, method: 'POST' })
    .then(customer.cart)
    .catch(console.error);

  cart();

  const url = '/services/currency/update?' + m.buildQueryString({
    currency,
    country,
    return_to: window.location.pathname
  });

  await pjax.hydrate(url, [ '.price' ]);

}

/**
 * Convert Currency
 *
 * Executes a conversion of from SEK to the provided
 * currency type. When the store currency is no SEK,
 * the conversion is handled using pjax visit.
 */
export function convert (amount: number | string, options: Currency.IConvert = {}) {

  const {
    from,
    to,
    percentage,
    integer,
    render
  } = assign({
    from: base,
    to: customer.session.currencyCode,
    percentage: customer.session.priceAdjustment || 0,
    integer: false,
    render: 'symbol'
  }, options);

  const price = cashify.convert(amount, {
    base,
    to,
    from,
    rates
  });

  const rate = point(rates[to]);
  const rounded = percentage > 0
    ? round(percent(price, percentage), rate)
    : round(price, rate);

  return integer ? rounded : format(rounded, {
    fromCents: false,
    format: render
  });
}

/**
 * Currency Formatted
 *
 * Returns the converted price with currency
 * as a string. The return value is what customers
 * will be shown, ie: written to dom.
 */
export function format (
  price: number,
  {
    fromCents = true,
    render = 'symbol'
  }: Currency.IFormat = {
    fromCents: true,
    render: 'symbol'
  }
) {

  const exchanged = currency(price, { fromCents });
  const converted = currency(exchanged, render === 'symbol' ? {
    precision: 0,
    pattern: customer.session.currencyPlacement,
    symbol: customer.session.currencySymbol
  } : {
    precision: 0,
    pattern: '# !',
    symbol: customer.session.currencyCode
  });

  return converted.format();

}

/**
 * Exchange Currency
 *
 * Executes a currency exchange conversion
 * to dom elements. This is different from `convert`
 * wherein the conversion is done on Elements.
 */
export function exchange (
  input?: Element,
  opts: Currency.IExchange = {
    from: window.Shopify.currency.active as Codes,
    to: customer.session.currencyCode as Codes,
    percent: 0,
    render: 'symbol'
  }
): any {

  if (base === opts.from && base === opts.to) return null;

  if (!(input instanceof Element)) {
    return document.querySelectorAll('.price').forEach(node => exchange(node));
  }

  if (!input.hasAttribute('data-currency-price')) return null;

  opts.from = input.hasAttribute('data-currency-from')
    ? input.getAttribute('data-currency-from')
    : base;

  opts.render = input.hasAttribute('data-currency-render')
    ? input.getAttribute('data-currency-render')
    : 'symbol';

  if (!opts?.to) opts.to = customer.session.currencyCode;

  const price = input.getAttribute('data-currency-price');

  if (isNaN(price as any) || !price) return null;

  const update = convert(price, opts);

  if (typeof update === 'string') input.innerHTML = update;

}
