import m from 'mithril';
import * as currency from 'application/currency';

export function charity (state: Shopify.IAjaxCart) {

  if (!window.shop.cart.charity.enabled) return null;

  return m(
    '.row.jc-between.ai-center.py-2.cart__total.cart-dim'
    ,
    m(
      '.col-auto.cart__label',
      m.trust(`${window.shop.cart.charity.organization} DONATION`)
    ),
    m(
      '.col-auto.cart__price',
      currency.format((state.total_price / 100 * window.shop.cart.charity.amount))
    ),
    m(
      '.col-12.align-self-center.text-center.pt-2.cart-charity'
      , m(
        'span'
        , m.trust(window.shop.cart.charity.subtext)
      )
    )
  );
};
