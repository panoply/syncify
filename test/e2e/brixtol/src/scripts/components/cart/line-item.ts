import m from 'mithril';
import { imgSrc, getProductName } from 'utils/common';
import * as Pjax from 'spx';
import * as currency from 'application/currency';
import * as api from './api';

/**
 * Product Title
 *
 * Splits product name and variant.
 */
function productTitle (item: Shopify.ILineItems) {

  const { productName, variantName } = getProductName(item.product_title);

  return [
    variantName !== null ? [
      m(
        'li.line-item-title'
        , productName
      )
      , m(
        'li.line-item-variant'
        , variantName
      )
    ] : m(
      'li.line-item-title'
      , productName
    )
    , m(
      'li.line-item-size'
      , item.variant_title
    )
  ];
}

/**
 * Quantity Adjustment
 *
 * Curried function triggers via `onclick`
 * events when adjusting quantities.
 */
function quantityChange (line: number, quantity: number) {

  return async ({ target }: { target: HTMLButtonElement }) => {

    target.classList.add('focus');

    try {

      await api.post('change', { line, quantity });

      target.classList.remove('focus');

    } catch (e) {

      console.warn('Cart: Failed to adjust quantity');

    }
  };

}

/**
 * Line Item
 *
 * Generates the current line-items within the
 * cart, along with the various adjustments for each.
 */
export function lineitem (state: Shopify.IAjaxCart) {

  if (!state.items) return null;

  return state.items.map(
    (
      item,
      line
    ) => m(
      '.row.jc-between.ai-center.line-item',

      /* REMOVE PRODUCT ----------------------------- */

      m(
        'button.btn-remove.d-block[type="button"]'
        , { onclick: quantityChange(line + 1, 0) }
        , m(
          'svg'
          , m('use[xlink:href="#cross"]')
        )
      ),

      /* PRODUCT IMAGE ------------------------------ */

      m(
        '.col-auto.px-0'
        , m(
          'img.img-fluid', {
            src: imgSrc(item.image, 140),
            onclick: () => Pjax.visit(item.url)
          }
        )
      ),

      m(
        '.col.ai-center',

        /* PRODUCT NAME AND SIZE ------------------------ */

        m(
          'ul.d-block.mb-2'
          , { onclick: () => Pjax.visit(item.url) }
          , productTitle(item)
        ),

        m(
          '.row.jc-between',

          /* QUANTITY SELECTOR -------------------------- */

          m(
            '.col-auto',
            m(
              '.quantity', [
                m(
                  'button.btn-minus[type="button"]'
                  , { onclick: quantityChange(line + 1, item.quantity - 1) }
                  , m(
                    'svg'
                    , m('use[xlink:href="#minus"]')
                  )
                ),
                m(
                  'input[readonly]', {
                    type: 'text',
                    name: 'quantity',
                    value: item.quantity
                  }
                ),
                m(
                  'button.btn-plus[type="button"]',
                  { onclick: quantityChange(line + 1, item.quantity + 1) },
                  m(
                    'svg',
                    m('use[xlink:href="#plus"]')
                  )
                )
              ]
            )
          ),

          /* ITEM PRICE --------------------------------- */

          m(
            '.col-auto.cart__price'
            , currency.format(item.line_price)
          )

        )

      ),
      /* FREE RETURN TEXT --------------------------- */

      item.properties?.return === 'FREE'
        ? m(
          '.line-item-return',
          m(
            'span',
            window.i18n.offer.free_return
          )
        ) : null

    )
  );
};
