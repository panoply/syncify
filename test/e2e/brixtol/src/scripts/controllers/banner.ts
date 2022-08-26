import { Controller } from '@hotwired/stimulus';
import { Siema } from '../modules/siema';
import { IBanner } from '../types/export';

/* -------------------------------------------- */
/* INTERFACE                                    */
/* -------------------------------------------- */

export interface Banner extends IBanner {

  /**
   * Siema Instance
   */
  slider: Siema,

  /**
   * Interval autoplay timer
   */
  interval: any,

  /**
   * Siema onChange event
   */
  onChange(this: Siema): void

  /**
   * Siema onInit event
   */
  onInit(this: Siema): void

}
export class Banner extends Controller {

  static targets = [ 'slides' ];

  initialize () {

    this.slider = new Siema({
      selector: this.slidesTarget,
      duration: 200,
      easing: 'ease-out',
      perPage: 1,
      startIndex: 0,
      draggable: true
    });

  }

  next () {

    this.slider.next();

  }

  prev () {

    this.slider.prev();

  }

  disconnect () {

    this.slider.destroy();

  }

  get index () {

    return parseInt(this.data.get('index'));

  }

}
