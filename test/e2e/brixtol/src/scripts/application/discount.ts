import cookie from 'js-cookie';
import m from 'mithril';
import { IDiscount, ISession } from '../export';
import { store } from './store';

/**
 * Discount Amount
 *
 * Returns the amount discounted from the total price.
 * For example, 10% discount of 1000 would return 100.
 */
export function get (price: number, discount: number): number {

  return NaN;

}

/**
 * Discount Apply
 *
 * Applies a discount to the store. This function
 * will save and apply a discount across the store.
 */
export function apply (price: number, discount: number): number {

  return NaN;
}

/**
 * Discount Amount
 *
 * Returns the amount discounted from the total price.
 * For example, 10% discount of 1000 would return 100.
 */
export function amount (price: number): number {

  const session: ISession = store.get('customer');

  return (price * session.discountAmount) / 100;

}

/**
 * Discount Percentage
 *
 * Returns the selling price of a product after
 * discount has been applied. For example, if the discount
 * is 10% and the original price is 1000 then this would return 900
 */
export function percentage (price: number): number {

  // const session: ISession = store.get('customer');

  return price - amount(price);

}

/**
 * Validate Code
 *
 * This function will validate a discount
 * code. It talks to the Brixtol API and returns
 * a basic JSON response that is then stored
 * in the customers session (if the code succeeds).
 */
export async function validate <T extends {
  discountCode: string;
  discountPercentage: string;
  discountAmount: number;
}> (input?: T | string) {

  let code: T | string;

  if (typeof input === 'undefined') {
    code = cookie.get('discount_code');
  } else if (typeof input === 'object') {
    code = input.discountCode;
  } else if (typeof input === 'string') {
    code = input;
  }

  if (!code) {
    return {
      ok: null,
      data: {
        discountCode: null,
        discountAmount: 0,
        discountPercentage: null
      }
    };
  }

  try {

    const response = await m.request<IDiscount>({
      url: 'https://api.brixtol.com/discount/' + code,
      method: 'POST'
    });

    if (response.status === 'valid') {

      if (response.type === 'percentage') {
        return {
          ok: true,
          data: {
            discountCode: response.title,
            discountAmount: 0,
            discountPercentage: Math.abs(response.value)
          }
        };
      }

      if (response.type === 'fixed_amount') {
        return {
          ok: true,
          data: {
            discountCode: response.title,
            discountAmount: Math.abs(response.value),
            discountPercentage: Math.abs(response.value)
          }
        };
      }
    }

    return {
      ok: false,
      data: validate
    };

  } catch (e) {

    console.error('Discount validation failed', e);

  }

}
