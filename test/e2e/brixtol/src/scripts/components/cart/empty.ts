import m from 'mithril';

export function empty () {

  return m(
    '.cart__empty.d-flex'
    , m(
      '.align-self-center.text-center.m-auto'
      ,
      m(
        'svg.icon'
        , m('use[xlink:href="#thumbs-down"]')
      ),
      m(
        '.title.pt-2'
        , window.i18n.cart.empty
      )
    )
  );

}
