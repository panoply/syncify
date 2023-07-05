import m from 'mithril';
import * as currency from 'application/currency';
import { ISession } from 'types/customer';

export function subtotal (state: Shopify.IAjaxCart) {

  return m(
    '.row.jc-between.ai-center.py-2.cart__total'
    , [
      m(
        '.col-auto.cart__label',
        window.i18n.cart.sub_total
      ),
      m(
        '.col-auto.cart__price',
        currency.format(state.total_price)
      )
    ]
  );
}

export function total (state: Shopify.IAjaxCart, customer: ISession) {

  const totals: number = state.total_price;

  const total_price = customer.discountAmount > 0
    ? currency.convert(totals, { percentage: customer.discountPercentage })
    : currency.format(totals);

  return m(
    '.row.jc-between.ai-center.py-2.cart__total'
    , [
      m(
        '.col-auto.cart__label'
        , window.i18n.cart.total
      ),
      m(
        '.col-auto.cart__price'
        , total_price
      )
    ]
  );
}
