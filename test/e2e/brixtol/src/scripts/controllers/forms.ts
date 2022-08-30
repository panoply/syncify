import { Controller } from '@hotwired/stimulus';
import { IForm } from '../types/export';
import m from 'mithril';
import 'detect-autofill';
import * as customer from 'application/customer';

export interface Form extends IForm {
  newsletterinputTarget: HTMLInputElement
  fieldTargets: HTMLInputElement[]
  submitTarget: HTMLElement
}

/**
 * Dropdown
 *
 * Facilitates Dropdown/Collapsible functionality.
 */
export class Form extends Controller {

  private cache: Forms.IFormCache = {};

  static values = {
    active: Boolean, // NOT USED
    focus: String,
    errors: Array,
    valid: Boolean,
    locale: Boolean,
    newsletter: Boolean
  };

  static targets = [
    'field',
    'submit',
    'response',
    'newsletterinput',
    'newsletterbutton'
  ];

  /**
   * Input - Returns the currenct active `<input>` element
   */
  get input (): HTMLInputElement {

    // @ts-ignore
    return this.fieldTargets[this.state.index];

  }

  get state () {

    return this.cache[this.focusValue];
  }

  initialize () {

    // document.addEventListener('customer:localized', this.setSavedValue.bind(this));
  }

  setSavedValue () {

    if (!this.newsletterValue) return null;

    const email = customer.session.emailAddress;

    if (email) {
      this.newsletterinputTarget.value = email.toUpperCase();
    }
  }

  /**
   * Stimulus Connect
   *
   * @this {IForm & {fieldTargets: HTMLInputElement[]}}
   */
  connect () {

    // headless virtual node
    const vnode = document.createElement('div');

    // headless render
    m.render(vnode, [
      m('svg.icon.icon-tick', m('use[xlink:href="#tick"]')),
      m('svg.icon.icon-close', m('use[xlink:href="#close"]')),
      m('span.validate')
    ]);

    // presets
    this.validValue = false;
    this.focusValue = null;
    this.cache = this.fieldTargets.reduce((cache, field, index) => {

      const id = field.getAttribute('for');

      if (!id) return cache;

      if (this.focusValue === null) {
        if (field.firstElementChild.hasAttribute('autofocus')) {
          this.focusValue = id;
        }
      }

      // append validation feedback message to the `<label>` node
      if (!field.contains(vnode.firstElementChild.lastElementChild)) {
        vnode.childNodes.forEach(node => field.append(node.cloneNode(true)));
      }

      const novalidate = field.hasAttribute('data-novalidate');

      cache[id] = {
        index,
        novalidate,
        id,
        interacted: false,
        valid: novalidate, // Returns true if novalidate attribute, else false
        message: ''
      };

      return cache;

    }, {});

  }

  disconnect () {

  }

  /* -------------------------------------------- */
  /* SETUP                                        */
  /* -------------------------------------------- */

  /**
   * Fires upon input entry of text form elements and
   * will dispatch to appropriate function in class.
   */
  onFocus ({ target }: Event) {

    if (target instanceof HTMLInputElement) this.focusValue = target.id;
    if (!this.state.interacted) this.state.interacted = true;

  }

  /**
   * Fires upon input entry of text form elements and
   * will dispatch to appropriate function in class.
   */
  onInput ({ target }: Event) {

    if (target instanceof HTMLInputElement) {

      // show the validation response
      this.focusValue = target.id;
      this.state.message = target.validationMessage;
      this.state.value = target.value;

      console.log('oninput ', this.state);

      target.parentElement.lastElementChild.innerHTML = this.state.message;

      if (this?.[target.type]) {
        return this[target.type as string](target);
      }
    }

  }

  /**
   * Fires upon an input change event. `onChange()` is used
   * on the following input fields:
   *
   * - checkbox
   * - radio
   * - select
   */
  async onSubmit (event: Event) {

    // @ts-ignore
    if (this.newsletterValue) return this.newsletter(event);

    event.preventDefault();

    // @ts-ignore
    const { target: { action, method } } = event;
    // const [ span ] = currentTarget.getElementsByTagName('span')
    const params = { country: customer.session.countryName };
    const form = new FormData(event.target as HTMLFormElement);

    this.submitTarget.classList.add('loading');

    for (const [ name, value ] of form) params[name] = value;

    try {

      const response = await m.request({
        url: action,
        method,
        background: false, // prevent global redraw
        params
      });

      this.submitTarget.classList.remove('loading');

      if (this.newsletterValue) {

        return this.newsletter();

      } else {

        // @ts-ignore
        this.responseTarget.innerHTML = response.message;
      }

    } catch (error) {

      // @ts-ignore
      this.errorTarget.innerHTML = error.message;

    }
    // setTimeout(() => (span.innerText = 'con'), 2000)

  }

  /**
   * Fires upon an input change event. `onChange()` is used
   * on the following input fields:
   *
   * - checkbox
   * - radio
   * - select
   *
   * @this {IForm}
   * @param {{ target: HTMLInputElement }} event
   */
  onChange (event: Event) {

    this.onFocus(event);

    if (event.target instanceof HTMLInputElement) {
      if (this?.[event.target.type]) {
        return this[event.target.type](event.target);
      }
    }

  }

  /**
   * Checks all form fields are valid. Enables / Disables
   * the submit button state.
   */
  isFormValid () {

    if (Object.values(this.cache).every(({ valid }) => valid === true)) {
      this.submitTarget.removeAttribute('disabled');
      this.validValue = true;
    } else {
      if (!this.submitTarget.hasAttribute('disabled')) {
        this.submitTarget.setAttribute('disabled', 'true');
        this.validValue = false;
      }
    }

  }

  /**
   * Checks all form field inputs are valid. Enables / Disables
   * the submit button state.
   *
   * @this {IForm}
   * @param {HTMLInputElement} target
   */
  isInputValid (target: HTMLInputElement): void {

    console.log(Object.values(this.cache));

    if (target.checkValidity()) {

      // @ts-ignore
      if (!this.state.valid) this.state.valid = true;
      if (this.input?.classList && !this.input.classList.contains('valid')) {
        this.input.classList.remove('error', 'warn');
        this.input.classList.add('valid');
      }

    } else {

      // @ts-ignore
      if (this.state.valid) this.state.valid = false;
      if (this.input?.classList && !this.input.classList.contains('error')) {
        this.input.classList.remove('valid', 'warn');
        this.input.classList.add('error');
      }
    }

    return this.isFormValid();

  }

  /* -------------------------------------------- */
  /* FORM ELEMENTS                                */
  /* -------------------------------------------- */

  /**
   * Validates checkbox input fields. When a checkbox
   * field contains a `required` attribute the field
   * must be checked or form submission will be disabled.
   *
   * @this {IForm}
   * @param {HTMLInputElement} target
   */
  checkbox (target: HTMLInputElement): void {

    // @ts-ignore
    if (!this.state.novalidate) {
      if (target.hasAttribute('required')) {
        this.state.valid = target.checked;
      }
    } else {
      if (target.hasAttribute('checked')) {
        target.removeAttribute('checked');
        target.checked = false;
      } else {
        target.setAttribute('checked', '');
        target.checked = true;
      }
    }

    return this.isFormValid();

  }

  /**
   * Validate text input type
   */
  text (target: HTMLInputElement): void {

    // console.log(target)

    return this.isInputValid(target);
  }

  /**
   * Validate textarea
   */
  textarea (target: HTMLInputElement): void {

    return this.isInputValid(target);

  }

  /**
   * Validate email type text input form field. Applies an
   * extra layer of validation and/or helpers upon user input.
   */
  email (target: HTMLInputElement): void {

    // TODO
    // Add regex expression validations and additional helpers

    return this.isInputValid(target);

  }

  /**
   * Validate Feedback
   */
  success (target?: HTMLButtonElement) {

  }

  async newsletter (event?: Event) {

    event.preventDefault();

    // @ts-ignore
    const { target: { action, method } } = event;
    const params = { country: customer.session.countryName };
    const form = new FormData(event.target as HTMLFormElement);
    const i = window.i18n.newsletter;

    this.submitTarget.innerHTML = 'LOADING';

    // @ts-ignore
    for (const [ name, value ] of form) params[name] = value.toLowerCase();

    try {

      const response = await m.request({
        url: action,
        method,
        params
      });

      this.submitTarget.innerHTML = 'SUBSCRIBE';

      // @ts-ignore
      if (response.ref === 'opt_in') {
        // @ts-ignore
        this.responseTarget.innerHTML = 'Thanks! You are subscribed!';
        // @ts-ignore
      } else if (response.ref === 'exists') {
        // @ts-ignore
        this.responseTarget.innerHTML = i.error_exists;
      } else {
        // @ts-ignore
        this.responseTarget.innerHTML = i.error_exists;
      }

    } catch (error) {

      // @ts-ignore
      this.errorTarget.innerHTML = i.error_404;

    }

  }

  password () {

  }

  radio () {

  }

  /**
   * Validates Phone Number
   */
  tel (target: HTMLInputElement): void {

    if (!target.hasAttribute('required') && !/\S/.test(target.value)) {

      // @ts-ignore
      this.state.valid = true;
    }

    return this.isInputValid(target);

  }

  file () {

  }

}
