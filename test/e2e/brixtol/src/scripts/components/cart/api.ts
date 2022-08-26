import m from 'mithril';
import currency from 'currency.js';
import { convert } from 'application/currency';
import * as customer from 'application/customer';

/**
 * Event Listener
 *
 * Triggered when currency changes are applied
 */
document.addEventListener('customer:cart', returns);

/**
 * Ajax Cart Endpoints
 */
export const endpoint: Shopify.IEndpoints = {
  get: '/cart.json',
  add: '/cart/add.js',
  update: '/cart/update.js',
  change: '/cart/change.js',
  clear: '/cart/clear.js',
  shipping_rates: '/cart/shipping_rates.json'
};

/**
 * Get Request (Cart)
 */
export function get (api: 'cart' | 'shipping_rates' = 'cart', currency?: string) {

  const url = api === 'cart' ? endpoint.get : endpoint[api];

  return m.request(url)
    .then(customer.cart)
    .catch(console.error)
    .finally(count);

}

/**
 * Post Request (Cart)
 */
export function post (api: 'add' | 'update' | 'change' | 'clear', body: any) {

  const fetch: boolean = body?.fetch === false
    ? !(delete body.fetch)
    : true;

  return m.request({ body, url: endpoint[api], method: 'POST', responseType: 'text' })
    .then(customer.cart)
    .then(() => fetch ? get() : null)
    .catch(console.error)
    .finally(count);

}

/**
 * Update Returns
 *
 * Performs an update of return cart properties
 * when user changes currency with existing cart items
 * this function iterates over items in the cart an
 * corrects return properties.
 */
export async function returns () {

  const { returnThreshold, returnFree, returnPrice } = customer.session;
  const threshold = convert(returnThreshold, { integer: true }) as number;
  const state = customer.cart();

  for (let i = 0; i < state.items.length; i++) {

    const item = state.items[i];
    const fees = convert(returnPrice) as string;

    if (returnFree) {
      const price = currency(item.price, { fromCents: true }).dollars();
      item.properties.return = price > threshold ? 'FREE' : fees;
    } else {
      item.properties.return = fees;
    }

    try {

      await post('change', {
        line: i + 1,
        properties: item.properties,
        fetch: false
      });

    } catch (e) {

      console.log(e);

    }

  }

  return get();

}

/**
 * Cart Count - Updates all elements using a `.cart-count` class
 * name.
 */
export function count (): void {

  const state = customer.cart();

  if (state?.item_count > 0) {

    const elements = document.querySelectorAll('.cart-count');

    if (elements.length > 0) {
      elements.forEach(node => { node.innerHTML = String(state.item_count); });
    }
  }

}
