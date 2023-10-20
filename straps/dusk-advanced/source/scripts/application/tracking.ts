/**
 * Google Analytics
 *
 * This is UA (GA4 is handled within Shopify)
 */
export function google () {

  if (typeof gtag === 'function') {
    gtag('js', new Date());
    gtag('config', 'UA-43951408-1');
  }

}

/**
 * Meta (Facebook)
 *
 * Facebook tracking for SPX handling.
 */
export function meta (data?: {
  id: number;
  price: number;
  category: string;
  currency: string;
  name: string;
}) {

  if (typeof fbq === 'function') {

    fbq('track', 'PageView');

    if (data) {

      fbq('track', 'ViewContent', {
        content_ids: [ data.id ],
        content_category: data.category,
        content_type: 'product_group',
        content_name: data.name,
        currency: data.currency,
        value: data.price
      });

    }
  }

}
