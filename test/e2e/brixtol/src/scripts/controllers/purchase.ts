import { IPurchase, ISession } from '../types/export';
import * as pjax from 'spx';
import { Controller } from 'application/controller';
import * as api from 'cart/api';
import * as customer from 'application/customer';
import * as currency from 'application/currency';

/* -------------------------------------------- */
/* INTERFACE                                    */
/* -------------------------------------------- */

export interface Purchase extends IPurchase {}

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Purchase extends Controller {

  /**
   * DOM Targets
   */
  static targets = [
    'addToCart',
    'selectVariant',
    'stockAlert',
    'selectSize',
    'offer'
  ];

  /**
   * Stimulus State
   */
  static values = {
    selected: String,
    productPrice: Number,
    cartPrice: Number,
    onSale: Boolean,
    stockNotification: String,
    offer: String,
    shippingPrice: String,
    returnPrice: String
  };

  /**
   * Stimulus Classes
   */
  static classes = [
    'enabled'
  ];

  /**
   * Exposed actions - Referenced in the virtual DOM
   */
  static public = {
    action: {
      'data-action': 'click->purchase#selectVariant'
    }
  };

  /**
   * Cart Controller
   */
  get cart () {

    return this.controller('drawer', 'ajax-cart');

  }

  /**
   * i18n Locale Translations
   */
  get i18n () {

    return window.i18n;

  }

  /**
   * Stimulus Initialize
   */
  initialize (): void {

    document.addEventListener('customer:localized', this.isReady);
    pjax.on('hydrate', this.hydrate);

  }

  /**
   * Stimulus Connect
   */
  connect (): void {

    if (this.cartPriceValue === 0) {
      this.cartPriceValue = this.productPriceValue;
    }

    if (!isNaN(customer.session.expires)) {
      this.offerShipping(customer.session);
      this.offerReturn(customer.session);
    }

  }

  /**
   * Stimulus Disconnect
   */
  disconnect (): void {
    document.removeEventListener('customer:localized', this.isReady);
  }

  /**
   * Hydration logic
   *
   * This handles attribute replacement on the stimulus
   * controller element. It is capturing the pjax hydrate.
   * We prevent the hydration replacement from occuring by
   * returning boolean `false`.
   */
  hydrate = (target: Element, newTarget: Element): void | boolean => {

    if (target.id !== 'purchase') return;

    for (const attr of newTarget.attributes) {
      this.element.setAttribute(attr.nodeName, attr.nodeValue);
    }

    return false;

  };

  isReady = ({ detail }: CustomEvent<ISession>) => {
    this.offerShipping(detail);
    this.offerReturn(detail);
  };

  offerShipping (session: ISession) {

    const threshold = currency.convert(session.shippingThreshold, { integer: true });
    const shippingPrice = currency.convert(session.shippingPrice);

    if (session.shippingFree) {
      if (this.cartPriceValue > threshold) {
        this.shippingPriceValue = 'FREE';
        this.offer(this.i18n.offer.free_shipping);
      } else {
        this.returnPriceValue = shippingPrice as string;
      }
    } else {
      this.shippingPriceValue = shippingPrice as string;
      this.offerTooltip(this.i18n.offer.paid_shipping);
    }

    return this;

  }

  offerReturn (session: ISession) {

    const threshold = currency.convert(session.returnThreshold, { integer: true });
    const returnPrice = currency.convert(session.returnPrice);

    if (session.returnFree) {
      if (this.productPriceValue > threshold) {
        this.returnPriceValue = 'FREE';
        this.offer(this.i18n.offer.free_return);
      } else {
        this.returnPriceValue = returnPrice as string;
      }
    } else {
      this.returnPriceValue = returnPrice as string;
      this.offerTooltip(this.i18n.offer.paid_return);
    }

    return this;

  }

  offer (text: string) {

    if (this.offerTarget.classList.contains('hidden')) {
      this.offerTarget.classList.remove('hidden');
    }

    if (this.hasOfferValue) {
      if (this.shippingPriceValue === 'FREE' && this.returnPriceValue === 'FREE') {
        this.offerTarget.innerHTML = this.i18n.offer.free_shipping_and_returns;
        return null;
      }
    } else {
      this.offerValue = text;
    }

    this.offerTarget.innerHTML = this.offerValue;

  }

  /**
   * Product offer tooltip
   */
  offerTooltip (text: string) {

    const asterisk = document.createElement('strong');

    asterisk.className = 'ml-2 icon-alert';

    this.offerTarget.setAttribute('data-tooltip-position', 'bottom');
    this.offerTarget.setAttribute('data-tooltip-size', 'x-small');
    this.offerTarget.setAttribute('role', 'tooltip');
    this.offerTarget.setAttribute('aria-label', text);
    this.offerTarget.appendChild(asterisk);

  }

  /**
   * Add product to cart
   */
  async addToCart (event: Event) {

    event.preventDefault();

    try {

      await api.post('add', {
        quantity: 1,
        id: this.selectedValue,
        properties: {
          return: this.returnPriceValue,
          shipping: this.shippingPriceValue
        }
      });

      this.cart.toggle(event);

    } catch (e) {

      console.error('Cart: Failed to add item to cart', e);

    }

  }

  select (event: Event) {

    if (this.hasAddToCartTarget) {
      this.addToCartTarget.removeAttribute('disabled');
    }

    if (this.hasStockAlertTarget) {
      this.selectSizeTarget.classList.add('d-none');
      this.stockAlertTarget.classList.remove('d-none');
    }

    this.selectedValue = (event.target as HTMLElement).id;

  }

}
