import m from 'mithril';

export default {
  view: ({ attrs }) => attrs.properties ? m('.d-inline.cart__item--property.pl-2', [
    m('svg.icon', m('use[xlink:href="#plus"]')),
    m('span.pl-2', attrs.properties['Free Beanie'])
  ]) : null
};
