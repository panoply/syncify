/* eslint-disable no-use-before-define */
import relapse from 'relapse';
import spx, { SPX } from 'spx';

/**
 * Dropdown
 *
 * Facilitates Dropdown/Collapsible functionality.
 */
export class Dropdown extends spx.Component({
  state: {
    selected: String,
    form: String,
    accordion: String,
    kind: String,
    required: {
      typeof: Boolean,
      default: false
    },
    collapse: {
      typeof: String,
      default: 'closed'
    },
    type: {
      typeof: String,
      default: 'dropdown'
    }
  },
  nodes: <const>[
    'button',
    'accordion',
    'collapse',
    'viewport',
    'placeholder'
  ]
}) {

  /**
   * Returns all `<label>` elements in the dropdown
   */
  inViewport () {

    const rect = this.collapseNode.getBoundingClientRect();

    for (const { element, folds } of relapse.get()) {
      if (element.id === this.state.accordion) {

        if (!(
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )) {
          folds.find(fold => fold.expanded === true).close();
        }

        break;
      }
    }

  }

  /**
   * Toggle - Open/Close
   */
  toggle (event: Event) {

    event.stopPropagation();

    if (this.view.classList.contains('is-open')) return this.close();

    this.state.collapse = 'opened';
    this.view.classList.add('is-open');
    this.buttonNode.classList.remove('selected');

    if (this.hasAccordion) this.inViewport();

    // listen for outside clicks
    addEventListener('click', this.outsideClick.bind(this));

  }

  /**
   * Click detected outside, eg: document body
   */
  outsideClick (event: Event) {

    if (this.buttonNode !== event.target && this.collapseNode !== event.target) {
      if (this.view.classList.contains('is-open')) {
        this.close();
      }
    }

  }

  /**
   * Close Dropdown
   */
  close () {

    this.view.classList.remove('is-open');

    if (this.state.collapse === 'selected' || this.state.hasSelected) {
      this.view.classList.add('selected');
      this.state.collapse = 'selected';
    } else {
      this.state.collapse = 'closed';
    }

    removeEventListener('click', this.outsideClick);
    this.buttonNode.focus();
  }

  /**
   * Select Inputs
   *
   * Used for Dropdown Forms
   */
  select ({ target }: { target: HTMLInputElement }) {

    target.checked = true;
    this.state.selected = target.value;
    this.buttonNode.innerText = target.getAttribute('aria-label');
    this.state.collapse = 'selected';

    for (const label of this.view.getElementsByTagName('label')) {

      if (label.getAttribute('for') === target.id) {
        if (!label.classList.contains('selected')) {
          label.classList.add('selected');
        }
      } else {
        if (label.classList.contains('selected')) {
          label.classList.remove('selected');
        }
      }

    };

    this.close();

  }

  /**
   * Items in dropdown - An ul > li <select> element equivelent
   */
  option (event: SPX.InputEvent) {

    if (event.target instanceof HTMLElement) {

      if (event.currentTarget instanceof HTMLElement) {
        const [ selected ] = event.target.getElementsByClassName('selected');
        if (selected) this.state.selected = selected.id; // the <span> text
      }
      if (event.currentTarget instanceof HTMLElement) {
        // console.log(event.currentTarget);
      }

      if (this.state.hasRequired) {

        if (this.buttonNode.classList.contains('is-invalid')) {
          this.buttonNode.classList.remove('is-invalid');
        }

        this.state.required = false;
        this.buttonNode.classList.add('selected');
      }

      if (this.state.kind === 'preset') {

        this.state.selected = `Preset (${event.target.textContent.trim()})`;
        this.buttonNode.innerHTML = `Preset (${event.target.textContent.trim()})<span class="icon"></span>`;

      } else {
        this.state.selected = event.target.textContent;
        this.buttonNode.textContent = event.target.textContent;
      }

      for (const node of this.collapseNode.children) {
        if (node.id !== event.target.id) {
          node.classList.remove('selected');
        } else {
          node.classList.add('selected');
        }
      }

      this.state.collapse = 'selected';

      this.toggle(event);

    }
  }

}
