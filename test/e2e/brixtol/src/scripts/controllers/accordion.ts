import { Controller } from '@hotwired/stimulus';
import { accordion, Accordion as Instance } from 'modules/accordion';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Accordion extends Controller {

  accordion: Instance;
  buttonValue: boolean;
  multiselectValue: boolean;
  collapsibleValue: boolean;
  keyboardValue: boolean;
  initialOpenValue: boolean;
  initialDelayValue: number;

  static values = {
    button: {
      type: Boolean,
      default: false
    },
    multiselect: {
      type: Boolean,
      default: true
    },
    collapsible: {
      type: Boolean,
      default: true
    },
    initialOpen: {
      type: Boolean,
      default: false
    },
    initialDelay: {
      type: Number,
      default: 200
    },
    keyboard: {
      type: Boolean,
      default: true
    }

  };

  /**
   * Stimulus Initialize
   */
  connect (): void {

    this.accordion = accordion(this.element, {
      multiselect: this.multiselectValue,
      button: this.buttonValue,
      carouselFocus: true,
      collapsible: this.collapsibleValue,
      keyboad: this.keyboardValue,
      initialOpen: this.initialOpenValue,
      initialOpenDelay: this.initialDelayValue
    });

  }

  /**
   * Disconnect
   */
  disconnect () {

    this.accordion.destroy();

  }

  /**
   * Open Fold
   *
   * Event target should be the the fold index to open
   */
  open ({ target: { dataset: { index } } }) {

    return this.accordion.folds[parseInt(index)].open();

  }

  /**
   * Close Fold
   *
   * Event target should be the the fold index to close
   */
  close ({ target: { dataset: { index } } }) {

    return this.accordion.folds[parseInt(index)].close();

  }

}
