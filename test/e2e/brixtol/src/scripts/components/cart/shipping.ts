import m from 'mithril';
import * as currency from 'application/currency';
import { ISession } from 'types/customer';

export function shipping (customer: ISession) {

  const price = customer.shippingFree ? window.i18n.cart.free : currency.convert(customer.shippingPrice, {
    from: 'SEK',
    to: customer.currencyCode,
    percentage: 0
  });

  return m('.row.jc-between.ai-center.py-2.cart__shipping', [
    m(
      '.col-auto',
      [
        m(
          'span.cart__label.pr-2',
          window.i18n.cart.shipping_to
        ),
        m(
          'img.flag', {
            src: customer.countryFlag
          }
        )
      ]
    ),
    m(
      '.col-auto',
      m(
        '.span.cart__price',
        price
      )
    )
  ]);
};
