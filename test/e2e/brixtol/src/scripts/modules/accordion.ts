/* eslint-disable no-use-before-define */

import EventEmitter from 'ev-emitter';
import { MergeExclusive } from 'type-fest';
import { assign } from 'utils/native';

class Folds {

  static instances = {};

  private accordion: MergeExclusive<Accordion, Element>;
  private opts: Accordion['options'];

  public id: string;
  public header: MergeExclusive<MergeExclusive<EventEmitter, { fold?: Folds }>, HTMLElement>;
  public button: HTMLButtonElement;
  public content: MergeExclusive<{ fold?: Folds }, HTMLElement>;
  public focused: boolean;
  public expanded: boolean;
  public disabled: boolean;
  public listen: Partial<[
    buttonFocus: ['focus', Folds['button'], EventListenerOrEventListenerObject],
    buttonBlur: ['blur', Folds['button'], EventListenerOrEventListenerObject],
    buttonClick: ['click', Folds['button'], EventListenerOrEventListenerObject],
    buttonKeydown: ['keydown', Folds['button'], EventListenerOrEventListenerObject],
    contentKeydown: ['keydown', Folds['content'], EventListenerOrEventListenerObject],
    contentTransition: ['transitionend', Folds['content'], EventListenerOrEventListenerObject ]
  ]>;

  aria = {
    button: {
      'aria-controls': () => 'c' + this.id,
      'aria-expanded': () => this.expanded ? 'true' : 'false',
      'aria-disabled': () => this.disabled ? 'true' : 'false'
    },
    content: {
      role: () => 'region',
      'aria-labelledby': () => 'h' + this.id
    }
  };

  constructor (
    accordion: Folds['accordion'],
    header: Folds['header'],
    content: Folds['content']
  ) {

    if (header.fold) return;

    this.accordion = accordion;
    this.opts = this.accordion.options;
    this.header = header;
    if (this.opts.button) {
      this.button = header.firstElementChild as HTMLButtonElement;
    } else {
      this.button = this.header.getElementsByTagName('button')[0];
    }
    this.content = content;
    this.header.fold = this;
    this.content.fold = this;

    if (!Folds.instances?.[this.accordion.id]) Folds.instances[this.accordion.id] = 0;

    this.id = `${this.accordion.id}f${++Folds.instances[this.accordion.id]}`;
    this.header.setAttribute('id', this.id + 'h');
    this.content.setAttribute('id', this.id + 'c');
    this.focused = false;
    this.expanded = false;
    this.disabled = false;
    this.listen = [];

    this.bind();
    this.init();
    this.initOpen();
    this.initFocus();
  }

  open (transition = true) {

    if (this.expanded) return;

    this.accordion.emitEvent('accordion:open', [ this ]);
    this.expanded = true;

    if (!this.opts.collapsible) this.disable();

    this.updateAria('button', 'aria-expanded');

    this.header.classList.add('open');
    this.content.classList.add('open');

    if (!transition) {
      this.opened();
    } else {
      const { offsetHeight } = this.content.firstElementChild as HTMLElement;
      this.content.style.height = `${offsetHeight}px`;
    }
  }

  close (transition = true) {

    if (!this.expanded) return;

    this.accordion.emitEvent('accordion:close', [ this ]);
    this.expanded = false;

    if (!this.opts.collapsible) this.enable();

    this.updateAria('button', 'aria-expanded');
    this.header.classList.remove('opened');
    this.content.classList.remove('opened');

    if (!transition) {
      this.closed();
    } else {
      const { offsetHeight } = this.content.firstElementChild as HTMLElement;
      this.content.style.height = `${offsetHeight}px`;
      requestAnimationFrame(() => { this.content.style.height = '0px'; });
    }
  }

  disable () {

    this.disabled = true;
    this.updateAria('button', 'aria-disabled');
    this.header.classList.add('disabled');
    this.content.classList.add('disabled');

  }

  enable () {

    this.disabled = false;
    this.updateAria('button', 'aria-disabled');
    this.header.classList.remove('disabled');
    this.content.classList.remove('disabled');

  }

  focus () {

    this.button.focus();

  }

  blur () {

    this.button.blur();

  }

  toggle (transition = true) {

    if (this.expanded) {
      this.close(transition);
    } else {
      this.open(transition);
    }

  }

  destroy () {

    this.unbind();
    this.clean();
    this.header.classList.remove('open');
    this.header.classList.remove('opened');
    this.header.classList.remove('focus');
    this.content.classList.remove('open');
    this.content.classList.remove('open');
    this.content.classList.remove('focus');
    this.content.style.height = '0px'; // hide content
    this.header.fold = null;
    this.content.fold = null;
    this.header.removeAttribute('id');
    this.content.removeAttribute('id');
    this.accordion = null;

  }

  private opened () {
    this.content.style.height = 'auto';
    this.header.classList.add('opened');
    this.content.classList.add('opened');
    this.accordion.emitEvent('accordion:opened', [ this ]);
  }

  private closed () {
    this.header.classList.remove('open');
    this.content.classList.remove('open');
    this.accordion.emitEvent('accordion:closed', [ this ]);
  }

  private initOpen () {
    if (
      this.header.getAttribute(this.opts.initialOpenAttr) !== null ||
      this.content.getAttribute(this.opts.initialOpenAttr) !== null
    ) {
      if (this.opts.initialOpen) {
        setTimeout(() => { this.open(); }, this.opts.initialOpenDelay);
      } else {
        this.open(false);
      }
    }
  }

  private initFocus () {

    if (this.button.getAttribute('autofocus') === null) return;
    this.onFocus();

  }

  private init () {
    this.updateAria('button');
    this.updateAria('content');
  }

  private clean () {

    this.updateAria('button', null, true);
    this.updateAria('content', null, true);

  }

  private updateAria (element: string, property = null, remove = false) {

    if (!this.opts.ariaEnabled) return;

    if (property) {

      this[element].setAttribute(property, this.aria[element][property]());

    } else {

      for (const property in this.aria[element]) {
        if (!this.aria?.[property]) continue;
        if (remove) {
          this[element].removeAttribute(property);
        } else {
          this[element].setAttribute(property, this.aria[element][property]());
        }
      }
    }
  }

  private transition (e: TransitionEvent) {

    if (e.target === e.currentTarget && e.propertyName === 'height') {
      if (this.expanded) {
        this.opened();
      } else {
        this.closed();
      }
    }

  }

  private onFocus () {
    this.focused = true;
    this.header.classList.add('focus');
    this.content.classList.add('focus');
    this.accordion.emitEvent('accordion:focus', [ this ]);
  }

  private onBlur () {
    this.focused = false;
    this.header.classList.remove('focus');
    this.content.classList.remove('focus');
    this.accordion.emitEvent('accordion:blur', [ this ]);
  }

  private onClick (event: Event) {

    // ensure focus is on button (click is not seting focus on firefox mac)
    this.focus();

    if (this.disabled) return;

    this.toggle();

  }

  private onKeydown (e: KeyboardEvent) {

    if (!this.opts.keyboard) return;

    let action = null;

    switch (e.which) {
      case 40: action = 'next'; break; // Arrow Down
      case 38: action = 'prev'; break; // Arrow Up
      case 36: action = 'first'; break; // Home
      case 35: action = 'last'; break; // End
      case 34: if (e.ctrlKey) action = 'next'; break; // Page down
      case 33: if (e.ctrlKey) action = 'prev'; break; // Page Up
    }

    if (action) {
      e.preventDefault();
      this.accordion.focus(action);
    }

  }

  private onContentKey (e: KeyboardEvent) {

    if (!this.opts.keyboard || !e.ctrlKey) return;

    let action = null;

    switch (e.which) {
      case 34: action = 'next'; break; // Page down
      case 33: action = 'prev'; break; // Page Up
    }

    if (action) {
      e.preventDefault();
      this.accordion.focus(action);
    }
  }

  private bind () {

    this.listen = [
      [ 'focus', this.button, this.onFocus.bind(this) ],
      [ 'blur', this.button, this.onBlur.bind(this) ],
      [ 'click', this.button, this.onClick.bind(this) ],
      [ 'keydown', this.button, this.onKeydown.bind(this) ],
      [ 'keydown', this.content, this.onContentKey.bind(this) ],
      [ 'transitionend', this.content, this.transition.bind(this) ]
    ];

    for (const [ event, element, callback ] of this.listen) {
      element.addEventListener(event, callback);
    }
  }

  private unbind () {

    for (const [ event, element, callback ] of this.listen) {
      element.removeEventListener(event, callback);
    }
  }

};

/**
 * Accordion
 *
 * Uses the following id combinator
 *
 * a = 'accordion'
 * f = 'fold number'
 * h = 'header'
 * c = 'content'
 *
 * eg: a1f1c is accordion with id 1, fold number 1 content target
 */
export class Accordion extends EventEmitter {

  static instances = 0;

  options: {
    /**
     * Whether W3C keyboard shortcuts are enabled
     */
    keyboard: boolean,
    button: boolean,
    /**
     * Whether multiple folds can be opened at once
     */
    multiselect: boolean,
    /**
     * Whether ARIA attributes are enabled
     */
    ariaEnabled: boolean,
    /**
     * Whether the folds are collapsible
     */
    collapsible: boolean,
    /**
     * Whether to loop header focus. Sets focus back to
     * first/last header when end/start reached.
     */
    carouselFocus: boolean,
    /**
     * Attribute for the header or content to open
     * folds at initialization
     */
    initialOpenAttr: string,
    /**
     * Whether to use transition at initial open
     */
    initialOpen: boolean,
    /**
     * Delay used to show initial transition
     */
    initialOpenDelay: number,
  } = {
      keyboard: true,
      button: false,
      multiselect: true,
      ariaEnabled: true,
      collapsible: true,
      carouselFocus: true,
      initialOpen: true,
      initialOpenDelay: 200,
      initialOpenAttr: 'data-open'
    };

  id: string;
  folds: Folds[];
  element: MergeExclusive<{ fold?: Folds; accordion?: Accordion; }, HTMLElement>;
  active: Function;

  constructor (element: Element, options: Partial<Accordion['options']> = {}) {

    super();

    this.element = element as Accordion['element'];
    this.element.accordion = this;
    this.id = `a${++Accordion.instances}`;
    this.element.setAttribute('id', this.id);
    this.options = assign(this.options, options);
    this.folds = [];
    this.bind();
    this.init();
    this.update();

  }

  update () {

    this.folds = [];

    const children = this.element.children;
    const length = children.length;

    for (let i = 0; i < length; i = i + 2) {

      const header = children[i] as Folds['header'];
      const content = children[i + 1] as Folds['content'];

      // get fold instance if there is already one
      let fold: Folds = header.fold;

      // create new one when header and content exist
      if (!fold && header && content) fold = new Folds(this, header, content);
      if (fold) this.folds.push(fold);

    }
  }

  focus (target: string) {

    let focused = null;
    const folds = this.folds.length;

    for (let i = 0; i < folds && focused === null; i++) {
      if (this.folds[i].focused) focused = i;
    }

    if ((target === 'prev' || target === 'next') && focused === null) {
      target = target === 'prev' ? 'last' : 'first';
    }

    if (target === 'prev' && focused === 0) {
      if (!this.options.carouselFocus) return;
      target = 'last';
    }

    if (target === 'next' && focused === folds - 1) {
      if (!this.options.carouselFocus) return;
      target = 'first';
    }

    switch (target) {
      case 'prev': this.folds[--focused].focus(); break;
      case 'next': this.folds[++focused].focus(); break;
      case 'last': this.folds[folds - 1].focus(); break;
      case 'first': default: this.folds[0].focus();
    }

  }

  destroy () {

    this.emitEvent('destroy');
    this.element.removeAttribute('id');

    for (const fold of this.folds) fold.destroy();

    this.unbind();
    this.clean();
    this.element.accordion = null;
    this.emitEvent('destroyed');

  }

  private handleFoldOpen (openFold: Folds) {

    if (this.options.multiselect) return;
    for (const fold of this.folds) if (openFold !== fold) fold.close();

  }

  private init () {

    if (!this.options.ariaEnabled) return;
    if (this.options.multiselect) {
      this.element.setAttribute('aria-multiselectable', 'true');
    }

  }

  private clean () {

    this.element.removeAttribute('aria-multiselectable');

  }

  private bind () {

    this.active = this.handleFoldOpen.bind(this);
    this.on('accordion:open', this.active);

  }

  private unbind () {

    this.off('accordion:open', this.active);

  }

}

export function accordion (element: Element, options: Partial<Accordion['options']> = {}) {

  return new Accordion(element, options);

}
