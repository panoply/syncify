import m from 'mithril';

export function checkout (state: Shopify.IAjaxCart) {

  let text: string = window.i18n.cart.payment;
  let icon: string = 'payment';

  const href: string = `${window.location.origin}/checkout`;

  const onclick = () => {

    text = window.i18n.cart.securing_checkout;
    icon = 'loading';

    setTimeout(() => {
      text = window.i18n.cart.redirecting;
      icon = 'tick';
      m.redraw();
    }, 3000);

    setTimeout(() => {
      text = window.i18n.cart.goto_checkout;
      icon = 'payment';
      m.redraw();
    }, 6000);

    return location.replace(href);

  };

  return m(
    'button.cart__checkout.mt-3'
    , {
      type: 'submit',
      name: 'checkout',
      onclick
    }, [
      m('svg.icon', m(`use[xlink:href="#${icon}"]`)),
      m('span', text)
    ]
  )
  ;

}
