import m from 'mithril';
import { Controller } from 'application/controller';
import { api, cart } from 'cart/index';

export class Cart extends Controller {

  /**
   * Default Dataset Values
   */
  static values = {
    charity: Boolean,
    bogo: Boolean,
    shipping: Boolean,
    newsletter: Boolean
  };

  /**
   * Stimulus Targets
   */
  static targets = [ 'mount' ];

  /**
   * Stimulus Initialize
   */
  initialize () { }

  /**
   * Stimulus Connect
   */
  connect (): void {

    document.addEventListener('customer:localized', this.mount);

  }

  /**
   * Stimulus Disconnect
   */
  disconnect (): void {

    document.removeEventListener('customer:localized', this.mount);

  }

  /**
   * Mount Cart - Runs upon localisation
   */
  mount = async () => {

    try {

      await api.get('cart');

    } catch (e) {

      console.error('Cart Error:', e);

    }

    m.mount(this.mountTarget, { view: cart });

  };

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * Stimulus: Whether or not to enable the charity component
   */
  charityValue: boolean;
  /**
   * Stimulus: Whether or not to enable BOGO component
   */
  bogoValue: boolean;
  /**
   * Stimulus: Whether or not to enable the shipping cost component
   */
  shippingValue: boolean;
  /**
   * Stimulus: Whether or not to show newsletter discount incentive
   */
  newsletterValue: boolean;
  /**
   * Stimulus: The cart element to mount
   */
  mountTarget: HTMLElement;

}
