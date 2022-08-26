import m from 'mithril';
import { is } from 'utils/native';
import * as customer from 'application/customer';
import { empty } from './empty';
import { lineitem } from './line-item';
import { checkout } from './checkout';
import { shipping } from './shipping';
import { discount } from './discount';
import { charity } from './charity';
import { subtotal, total } from './totals';

export * as api from './api';

export function cart () {

  const state = customer.cart();

  if (is(state.item_count, 0)) return empty();

  return m('.row.jc-center.ac-center', m('.col', [

    // LINE ITEM
    lineitem(state),

    // SUB TOTAL
    subtotal(state),

    // SHIPPING
    shipping(customer.session),

    // DISCOUNT
    discount(state, customer.session),

    // CART TOTAL
    total(state, customer.session),

    // CART TOTAL
    charity(state),

    // CHECKOUT BUTTON
    checkout(state)

  ]));

};
