/* eslint-disable no-use-before-define */
import relapse from 'relapse';
import spx from 'spx';

/**
 * Dropdown
 *
 * Facilitates Dropdown/Collapsible functionality.
 */
export class Dropdown extends spx.Component<typeof Dropdown.define> {

  static define = {
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
  };

  /**
   * Returns all `<label>` elements in the dropdown
   */
  inViewport () {

    const rect = this.dom.collapseNode.getBoundingClientRect();

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

    if (this.root.classList.contains('is-open')) return this.close();

    this.state.collapse = 'opened';
    this.root.classList.add('is-open');
    this.dom.buttonNode.classList.remove('selected');

    if (this.dom.hasAccordionNode) this.inViewport();

    // listen for outside clicks
    addEventListener('click', this.outsideClick.bind(this));

  }

  /**
   * Click detected outside, eg: document body
   */
  outsideClick (event: Event) {

    if (this.dom.buttonNode !== event.target && this.dom.collapseNode !== event.target) {
      if (this.root.classList.contains('is-open')) {
        this.close();
      }
    }

  }

  /**
   * Close Dropdown
   */
  close () {

    this.root.classList.remove('is-open');

    if (this.state.collapse === 'selected' || this.state.hasSelected) {
      this.root.classList.add('selected');
      this.state.collapse = 'selected';
    } else {
      this.state.collapse = 'closed';
    }

    removeEventListener('click', this.outsideClick);
    this.dom.buttonNode.focus();
  }

  /**
   * Select Inputs
   *
   * Used for Dropdown Forms
   */
  select ({ target }: { target: HTMLInputElement }) {

    target.checked = true;
    this.state.selected = target.value;
    this.dom.buttonNode.innerText = target.getAttribute('aria-label');
    this.state.collapse = 'selected';

    for (const label of this.root.getElementsByTagName('label')) {

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
  option (event: MouseEvent) {

    if (event.target instanceof HTMLElement) {

      if (event.currentTarget instanceof HTMLElement) {
        const [ selected ] = event.currentTarget.getElementsByClassName('selected');
        if (selected) this.state.selected = selected.id; // the <span> text
      }
      if (event.currentTarget instanceof HTMLElement) {
        // console.log(event.currentTarget);
      }

      if (this.state.hasRequired) {

        if (this.dom.buttonNode.classList.contains('is-invalid')) {
          this.dom.buttonNode.classList.remove('is-invalid');
        }

        this.state.required = false;
        this.dom.buttonNode.classList.add('selected');
      }

      if (this.state.kind === 'preset') {

        this.state.selected = `Preset (${event.target.textContent.trim()})`;
        this.dom.buttonNode.innerHTML = `Preset (${event.target.textContent.trim()})<span class="icon"></span>`;

      } else {
        this.state.selected = event.target.textContent;
        this.dom.buttonNode.textContent = event.target.textContent;
      }

      for (const node of this.dom.collapseNode.children) {
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
