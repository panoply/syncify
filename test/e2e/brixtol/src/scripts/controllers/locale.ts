
import m from 'mithril';
import { i18n } from '@brixtol/types';
import { ILocale } from 'types/export';
import { is, isArray, values } from 'utils/native';
import { Controller } from '@hotwired/stimulus';
import * as customer from 'application/customer';
import * as currency from 'application/currency';

export interface Locale extends ILocale {
  /**
   * Virtual DOM Component
   */
  vnode: HTMLDivElement
  /**
   * i18n Locales (fetched from api.brixtol.com)
   */
  i18n: i18n.ILocales[]
}

export class Locale extends Controller implements ILocale {

  /**
   * DOM State Values
   */
  static values = {
    mounted: Boolean,
    placeholder: String,
    spinner: String,
    loading: Boolean,
    locale: Array,
    active: Number,
    show: Boolean,
    input: String,
    search: Array
  };

  /**
   * DOM Target Elements
   */
  static targets = [
    'flag',
    'currency',
    'input'
  ];

  /**
   * Stimulus Initialize
   */
  initialize () {

    this.vnode = document.createElement('div');
    this.vnode.className = 'd-none';

  }

  /**
   * Stimulus Connect
   */
  connect (): void {

    document.addEventListener('customer:localized', this.localize);

  }

  /**
   * Localize UX
   *
   * Renders the customers localization UX
   * additions, ie: The SVG country flag and
   * the currency code.
   */
  localize = (event: CustomEvent) => {

    console.log('i18n: Localized Customer');

    this.currencyTarget.innerHTML = event.detail.currencyCode;
    this.flagTarget.setAttribute('src', event.detail.countryFlag);
    this.loadingValue = false;
    this.countries();

    return currency.local(event.detail.currencyCode, event.detail.countryCode);

  };

  /**
   * i18n References
   *
   * Fetches the i18n locale list from the
   * Brixtol Textiles API (api.brixtol.com/i18n).
   * These values are stored in the class scope
   */
  async countries () {

    if (!this.i18n) this.i18n = values(window.i18n.locales);
    if (!this.mountedValue) m.mount(this.vnode, this.view);

  }

  /* -------------------------------------------- */
  /* SSR LOGIC                                    */
  /* -------------------------------------------- */

  /**
   * Toggle Click
   *
   * Executed from within the DOM via Stimulus action
   * method. Toggles the countries list visibility and state.
   */
  toggle (): void {

    if (!this.showValue && this.vnode.classList.contains('d-none')) {

      if (!this.mountedValue) m.mount(this.vnode, this.view);

      this.inputValue = '';
      this.showValue = true;
      this.vnode.classList.remove('d-none');
      this.vnode.classList.add('inline-block');
      this.currencyTarget.classList.add('d-none');
      this.inputTarget.focus();

    } else if (this.showValue && this.vnode.classList.contains('inline-block')) {

      this.inputValue = '';
      this.showValue = false;
      this.vnode.classList.remove('d-inline');
      this.vnode.classList.add('d-none');
      this.currencyTarget.classList.remove('d-none');

    }

  }

  /**
   * Set Locale
   *
   * Called from the virtual node list. This updates the
   * customers `session` locale using the global conversion
   * method. Uses `pjax` to fetch to the page over the wire.
   */
  setLocale (locale: Customer.ISession): any {

    const session = customer.patch({ event: false }, locale);

    this.toggle();

    this.currencyTarget.innerHTML = session.currencyCode;
    this.loadingValue = true;
    this.flagTarget.setAttribute('src', this.spinnerValue);

    return currency.global(session.currencyCode, session.countryCode).then(() => {
      this.loadingValue = false;
      this.flagTarget.setAttribute('src', session.countryFlag);
    });

  }

  /**
   * Stimulus `showValue` Changed
   *
   * Executed from within the DOM via Stimulus action
   * method. Loads the search input.
   */
  showValueChanged () {

    if (this.showValue === true) {
      setTimeout(() => document.addEventListener('click', this.outsideClick), 500);
    } else {
      document.removeEventListener('click', this.outsideClick);
    }

  }

  /**
   * Outside Click
   *
   * Handles outside clicks when the locale
   * i18n countries list is open. Allows
   * users to close the country list by clicking
   * outside the element.
   */
  outsideClick = (event: Event): void => {

    if (this.element !== event.target) return this.toggle();

  };

  /* -------------------------------------------- */
  /* VIRTUAL COMPONENT                            */
  /* -------------------------------------------- */

  /**
   * View - Mithril Component
   *
   * This getter returns a mithril virtual node
   * that is mounted to the locale target. The
   * component gives us a i18n search list.
   */
  get view () {

    return {
      // oninit: this.countries.bind(this),

      oncreate: () => {
        this.element.append(this.vnode);
        this.mountedValue = true;
      },

      view: () => isArray(this.i18n) ? [
        this.vSearch(),
        this.vList()
      ] : null

    };

  }

  /**
   * i18n List - Mithril Vnode
   *
   * Renders the i18n countries list and
   * provides handler when a new country
   * is selected.
   */
  vList () {

    if (!this.showValue && !this.searchValues?.length) return null;

    const list = this.searchValues.length > 0 ? this.searchValues : this.i18n;

    return m('ul.locale-list', list.map((i18n, index) => m('li', {
      onclick: () => this.setLocale(i18n),
      class: index === this.activeValue ? 'active' : ''
    }, i18n.countryName)));

  }

  /**
   * Search List - Mithril Vnode
   *
   * Fuzzy search for querying countries
   * rendered in the i18n List.
   */
  vSearch () {

    return m('input[data-locale-target="input"]', {
      type: 'text',
      class: 'locale-search',
      value: this.inputValue,
      placeholder: this.placeholderValue,
      oninput: ({ target: { value } }) => {

        this.inputValue = value;
        this.showValue = true;
        this.activeValue = 0;
        this.searchValues = this.i18n.filter(({ countryName }) => {

          const country = countryName.toLowerCase();
          const search = this.inputValue.toLowerCase();

          return country.indexOf(search) > -1;

        });

      },
      onkeydown: ({ keyCode }) => {

        switch (keyCode) {
          case 27: { // ESC
            this.toggle();
            break;
          }
          case 13: { // ENTER
            this.setLocale(this.searchValues[this.activeValue]);
            break;
          }
          case 38: { // UP
            if (is(this.activeValue, 0)) break;
            this.activeValue--;
            break;
          }
          case 40: { // DOWN
            if (is(this.activeValue, this.searchValues.length - 1)) break;
            this.activeValue++;
            break;
          }
        }

      }
    });

  }

}
