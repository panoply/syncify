
import { Controller } from '@hotwired/stimulus';
import { IDropdown } from '../types/export';

/* -------------------------------------------- */
/* INTERFACE                                    */
/* -------------------------------------------- */

export interface Dropdown extends IDropdown {

  buttonTarget: HTMLElement
}

/**
 * Dropdown
 *
 * Facilitates Dropdown/Collapsible functionality.
 */
export class Dropdown extends Controller {

  /**
   * Public Attributes - Consumed by components
   *
   * @static
   * @memberof Dropdown
   */
  static public = {
    contoller: {
      'data-controller': 'dropdown',
      'data-dropdown-active-class': 'active',
      'data-dropdown-collapse-value': 'closed',
      'data-dropdown-selected-class': 'selected'
    },
    button: {
      'data-action': 'click->dropdown#toggle',
      'data-dropdown-target': 'button'
    }
  };

  /**
   * Stimulus Values
   *
   * @static
   * @memberof Dropdown
   */
  static values = {
    type: String,
    collapse: String,
    selected: String
  };

  /**
   * Stimulus Targets
   *
   * @static
   * @memberof Dropdown
   */
  static targets = [
    'list',
    'button'
  ];

  /**
   * Stimulus Classes
   *
   * @static
   * @memberof Dropdown
   */
  static classes = [
    'active',
    'selected'
  ];

  /**
   * Stimulus Initialize
   *
   * @static
   * @memberof Dropdown
   */
  initialize () {

    if (!this.hasTypeValue) {
      this.typeValue = 'dropdown';
    }

  }

  /**
   * Stimulus Disconnect
   *
   * @static
   * @memberof Dropdown
   * @version 2.0
   */
  disconnect () {

    //

  }

  /**
   * Toggle - Open/Close
   */
  toggle (event: Event) {

    event.stopPropagation();

    if (this.element.classList.contains('active')) return this.close(event);

    this.collapseValue = 'opened';
    this.element.classList.add('active');
    this.buttonTarget.classList.remove('selected');

    // listen for outside clicks
    document.addEventListener('click', this.outsideClick.bind(this));

  }

  /**
   * Click detected outside, eg: document body
   */
  outsideClick (event: Event) {

    if (this.buttonTarget !== event.target) {
      if (this.element.classList.contains('active')) this.close(event);
    }

  }

  /**
   * Close Dropdown
   */
  close (event: Event) {

    this.element.classList.remove('active');

    if (this.collapseValue === 'selected' || this.hasSelectedValue) {
      this.buttonTarget.classList.add('selected');
    } else {
      this.collapseValue = 'closed';
    }

    document.removeEventListener('click', this.outsideClick);

  }

  /**
   * Items in dropdown - An ul > li <select> element equivelent
   */
  options (event: MouseEvent) {

    event.stopPropagation();

    if (event.target instanceof HTMLElement) {

      if (event.target.hasAttribute('data-disabled')) return;

      event.target.classList.add('selected');

      // @ts-ignore
      const [ selected ] = event.currentTarget.getElementsByClassName('selected');

      if (selected) selected.classList.remove('selected');

      // the <span> text
      this.selectedValue = selected.id;
      this.buttonTarget.firstElementChild.textContent = event.target.textContent;
      this.collapseValue = 'selected';
      this.toggle(event);
    }
  }

}
