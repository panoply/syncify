import { Controller } from '../application/controller';
import { IRewaxing } from '../types/export';
import * as api from '../components/cart/api';

export interface Rewaxing extends IRewaxing {
  checkoutTarget: HTMLElement,
  loaderTarget: HTMLElement,
  productNameTarget: HTMLElement
}

export class Rewaxing extends Controller {

  static targets = [
    'checkout',
    'loader',
    'productName'
  ];

  get carousel () {

    return this.controller('carousel', 'rewaxing-products');






  }

  get title () {

    const { currentSlide } = this.carousel.slider;

    return parseInt(this.carousel.slideTargets[currentSlide].dataset.title);

  }

  get variant () {

    const { currentSlide } = this.carousel.slider;

    return parseInt(this.carousel.slideTargets[currentSlide].dataset.variant);

  }

  async checkout (event: MouseEvent) {

    event.preventDefault();

    // @ts-ignore
    event.currentTarget.classList.add('loading');

    this.checkoutTarget.innerText = 'Loading';

    try {

      await api.post('add', { quantity: 1, id: this.variant });

      this.checkoutTarget.innerText = 'Securing Checkout';

      // @ts-ignore
      window.location = '/checkout';

    } catch (error) {

      this.checkoutTarget.innerText = 'Request Failed';
      console.error(error);

    }

  }

}
