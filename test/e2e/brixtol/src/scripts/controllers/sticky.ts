import { Controller } from 'application/controller';
import { ISticky } from '../types/export';
import stickybits, { StickyBits } from 'stickybits';

export interface Sticky extends ISticky {
  sticky: StickyBits,
  options: StickyBits.Options
}

export class Sticky extends Controller {

  /**
   * Stimulus State
   */
  static values = {
    parent: Boolean,
    breakpoint: String,
    offset: Number
  };

  /**
   * Stimulus Connect
   */
  connect () {

    if (window.app.screen.isActive('sm')) return this.disconnect();

    return this.doSticky({
      stickyBitStickyOffset: this.offsetValue
    });

  }

  doSticky (options: StickyBits.Options) {

    if (this.parentValue) {
      this.sticky = stickybits(this.element.parentElement, options);
    } else {
      this.sticky = stickybits(this.element, options);
    }
  }

  disconnect (): void {

    this.sticky.cleanup();

  }

}
