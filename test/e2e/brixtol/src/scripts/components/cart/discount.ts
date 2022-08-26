import m from 'mithril';
import * as currency from 'application/currency';
import { ISession } from 'types/customer';

export function discount (state: Shopify.IAjaxCart, customer: ISession) {

  if (customer.discountAmount <= 0) return null;

  return m(
    '.row.jc-between.ai-center.py-2.cart__shipping', [
      m(
        '.col-auto',
        m(
          'span.pr-2.cart__label',
        `${customer.discountAmount}% DISCOUNT`
        )
      ),
      m(
        '.col-auto',
        m(
          '.span.cart__price',
          currency.format(state.total_price)
        )
      )
    ]
  );

};
