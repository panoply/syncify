import { Controller } from 'application/controller';
import spx from 'spx';
import qvp from 'qvp';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Drawer extends Controller {

  /**
   * The backdrop element
   */
  static backdrop: HTMLDivElement = null;

  /**
   * Stimulus: values
   */
  static values = {
    outsideClick: Boolean,
    height: String,
    width: String,
    offset: String,
    direction: String,
    shift: String,
    redraw: String,
    useParent: {
      type: Boolean,
      default: false
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    bodyScroll: {
      type: Boolean,
      default: false
    },
    backdrop: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'overlay'
    }
  };

  /**
   * Stimulus: values
   */
  static targets = [
    'mount'
  ];

  /**
   * Stimulus: values
   */
  static classes = [
    'backdrop'
  ];

  /**
   * Returns the backdrop element
   */
  get backdrop () {
    return Drawer.backdrop;
  }

  /**
   * Returns the drawer direction class name
   */
  get directionClass () {
    return `drawer-${this.directionValue}`;
  }

  /**
   * Returns the drawer shift class name
   */
  get shiftClass () {
    return `drawer-${this.modeValue}`;
  }

  /**
   * Returns the shifts transition class name
   */
  get shifts () {
    return this.dom.querySelectorAll<HTMLElement>(this.shiftValue);
  }

  /**
   * Returns all button toggles in the dom
   */
  get buttons () {
    return this.dom.querySelectorAll(`[data-drawer="${this.target.id}"]`);
  }

  /**
   * Stimulus: Initialize
   */
  initialize () {

    if (Drawer.backdrop === null) {
      Drawer.backdrop = document.createElement('div');
      Drawer.backdrop.className = 'drawer-backdrop';
      Drawer.backdrop.setAttribute('spx-morph', 'false');
    }

    if (this.useParentValue) {
      this.target = this.element.parentElement;
      this.target.ariaHidden = 'true';
    } else {
      this.target = this.element;
    }

    if (this.target.classList.contains('d-none')) {
      this.target.classList.remove('d-none');
    }

    if (this.modeValue !== 'overlay' && this.hasShiftValue === false) {
      console.error('Missing "data-drawer-shift-value" defintions on:', this.target);
    }

  }

  /**
   * Stimulus: Connect
   */
  connect () {

    for (const button of this.buttons) {
      button.addEventListener('click', this.toggle);
    }

    if (this.dom.contains(Drawer.backdrop) === false) {
      this.dom.appendChild(Drawer.backdrop);
    }

    if (this.hasWidthValue) {
      this.target.style.setProperty('width', this.widthValue);
    }

    if (this.hasHeightValue) {
      this.target.style.setProperty('height', this.heightValue);
    }

    if (this.hasDirectionValue && this.target.classList.contains(this.directionClass) === false) {
      this.target.classList.add(this.directionClass);
    }

    if (this.modeValue === 'pull') {
      this.target.style.setProperty('transform', 'translateX(0)');
      this.target.style.setProperty('z-index', '0');
    }

    if (this.html.classList.contains('drawer-open')) {
      this.html.classList.remove('drawer-open');
    }

    spx.on('load', this.onLoad, this);

  }

  /**
   * Stimulus: Disconnect
   */
  disconnect () {

    //  this.buttons.forEach(button => button.removeEventListener('click', this.toggle, false));

  }

  onLoad () {

    if (this.isOpenValue) {
      if (qvp.test([ 'lg', 'xl', 'xxl' ])) {
        this.close();
      } else {
        setTimeout(this.close.bind(this), 200);
      }
    }
  }

  /**
   * Open Drawer
   */
  open () {

    if (!this.target.classList.contains('drawer-active')) {
      this.target.classList.add('drawer-active');
    }

    if (this.hasBackdropClass && !this.backdrop.classList.contains(this.backdropClass)) {
      this.backdrop.classList.add(this.backdropClass);
    }

    if (this.bodyScrollValue === false) {
      this.dom.style.setProperty('overflow', 'hidden');
    }

    if (this.hasShiftValue) {
      this.shiftNodes();
    }

    if (this.hasWidthValue) {
      if (this.directionValue === 'top') {
        this.backdrop.style.setProperty('transform', `translateY(-${this.offsetValue})`);
      } else {
        this.backdrop.style.setProperty('transform', `translateX(-${this.widthValue})`);
      }
    }

    this.html.classList.add('drawer-open');
    this.backdrop.addEventListener('click', this.toggle, { once: true });
    this.target.addEventListener('touchstart', this.touchStart, { passive: true });
    this.target.ariaHidden = 'false';
  }

  close () {

    if (this.isOpenValue) {
      this.isOpenValue = false;
    }

    if (this.hasWidthValue) {
      this.backdrop.style.removeProperty('transform');
    }

    if (this.bodyScrollValue === false) {
      this.dom.style.removeProperty('overflow');
    }

    if (this.hasShiftValue) {
      this.shiftNodes();
    } else {
      this.target.addEventListener('transitionend', this.transition);
    }

    this.html.classList.remove('drawer-open');
    this.target.removeEventListener('touchstart', this.touchStart);
    this.backdrop.removeEventListener('click', this.toggle);
    this.target.classList.remove('drawer-active');
    this.target.ariaHidden = 'true';

  };

  transition = (event: TransitionEvent) => {

    if (event.propertyName !== 'transform') return;

    if (this.hasShiftValue) {
      for (const shift of this.shifts) {
        if (shift.classList.contains(this.shiftClass)) {
          shift.classList.remove(this.shiftClass);
          shift.style.removeProperty('transform');
        }
      }
    }

    if (this.hasBackdropClass && this.backdrop.classList.contains(this.backdropClass)) {
      this.backdrop.classList.remove(this.backdropClass);
    }

    if (this.modeValue === 'pull') {
      this.shifts.item(0).removeEventListener(event.type, this.transition);
    } else {
      this.target.removeEventListener(event.type, this.transition);
    }

  };

  /**
   * Set attribute requirements for the elements which apply transform shifting
   */
  shiftNodes () {

    if (this.modeValue === 'pull') {

      this.target.style.setProperty('transform', 'translateX(0)');
      this.target.style.setProperty('z-index', '0');

      if (this.isOpenValue === false) {
        this.shifts.item(0).addEventListener('transitionend', this.transition);
      }

    } else {

      if (this.isOpenValue === false) {
        this.target.addEventListener('transitionend', this.transition);
      }
    }

    for (const shift of this.shifts) {

      if (this.isOpenValue) {

        if (!shift.classList.contains(this.shiftClass)) {
          shift.classList.add(this.shiftClass);
        }

        if (this.hasWidthValue && (
          this.directionValue === 'left' ||
          this.directionValue === 'right')) {

          shift.style.setProperty('transform', `translateX(-${this.widthValue})`);

        } else if (this.hasHeightValue && (
          this.directionValue === 'top' ||
          this.directionValue === 'bottom')) {

          shift.style.setProperty('transform', `translateY(-${this.heightValue})`);

        }

      } else {
        if (this.hasWidthValue && (
          this.directionValue === 'left' ||
          this.directionValue === 'right')) {

          shift.style.setProperty('transform', 'translateX(0)');

        } else if (this.hasHeightValue && (
          this.directionValue === 'top' ||
          this.directionValue === 'bottom')) {

          shift.style.setProperty('transform', 'translateY(0)');

        }
      }
    }
  }

  /**
   * Touch Start scroll position
   */
  touchStart ({ target }: TouchEvent) {

    if (target instanceof HTMLElement) {

      const { scrollTop, offsetHeight } = target;
      const position = scrollTop + offsetHeight;

      if (scrollTop === 0) {
        target.scrollTop = 1;
      } else if (position === scrollTop) {
        target.scrollTop = scrollTop - 1;
      }
    }
  }

  /**
   * Click detected outside, eg: document body
   */
  outsideClick = (event: Event) => {

    if (event.target !== this.target) {
      this.close();
      this.dom.removeEventListener('click', this.outsideClick, false);
    }

  };

  /**
   * Toggle Drawer
   */
  toggle = (event?: MouseEvent) => {

    if (event) event.preventDefault();

    this.isOpenValue = !this.isOpenValue;

    if (this.isOpenValue) {
      this.open();
    } else {
      this.close();
    }

    return this.isOpenValue ? this.open() : this.close();

  };

  /**
   * Touch Move prevention event
   */
  touchMove = (event: TouchEvent) => {

    if (this.isOpenValue) {
      if (this.target.scrollHeight <= this.target.clientHeight) {
        event.preventDefault();
      }
    }

  };

  /**
   * Keyboard events
   */
  keyboard = (event: KeyboardEvent) => {

    switch (event.code) {
      case 'Esc':
      case 'Escape': this.close(); break;
    }

  };

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * The drawer target. This defaults to use `this.element` depending on whether or not
   * the use parent is set to `true` - In such cases the parent element will used instead.
   */
  target: HTMLElement;

  /**
   * Stimulus: Whether or not the drawer is opened
   */
  isOpenValue: boolean;

  /**
   * Stimulus: The drawer effect
   */
  modeValue: 'pull' | 'push' | 'overlay';

  /**
   * Stimulus: The offset values, eg: top, right, bottom and left (in that order)
   */
  bodyScrollValue: boolean;

  /**
   * Stimulus: Whether or not open events should fire on toggle clicks
   */
  eventsValue: boolean;

  /**
   * Stimulus: The offset values, eg: top, right, bottom and left (in that order)
   */
  offsetValue: string;

  /**
   * Stimulus: Whether or not an offset value was provided
   */
  hasOffsetValue: string;

  /**
   * Stimulus: The height of the drawer
   */
  heightValue: string;

  /**
   * Stimulus: Whether or not an height value was provided
   */
  hasHeightValue: string;

  /**
   * Stimulus: The width of the drawer
   */
  widthValue: string;

  /**
   * Stimulus: Whether or not a width value was provided
   */
  hasWidthValue: string;

  /**
   * Stimulus: The drawer direction
   */
  directionValue: 'left' | 'right' | 'top' | 'bottom';

  /**
   * Stimulus: Whether or not a direction value was provided
   */
  hasDirectionValue: string;

  /**
   * Stimulus: A list of selectors that will shift
   */
  shiftValue: string;

  /**
   * Stimulus: Whether or not a shift value was provided
   */
  hasShiftValue: boolean;

  /**
   * Stimulus: Whether or not a backdrop class was provided
   */
  hasBackdropClass: boolean;

  /**
   * Stimulus: The backdrop class value
   */
  backdropClass: string;

  /**
   * Stimulus: Whether or not the drawer should use the parent element
   */
  useParentValue: boolean;

  /**
   * Stimulus: Whether or not the drawer has a redraw value
   */
  hasRedrawValue: boolean;

  /**
   * Stimulus: Execute a mithril redraw at this point of operation
   */
  redrawValue: 'open' | 'close';

}
