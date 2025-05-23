import qvp from 'qvp';
import spx, { SPX } from 'spx';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Drawer extends spx.Component({
  state: {
    outsideClick: Boolean,
    height: String,
    width: String,
    offset: String,
    direction: String,
    shift: String,
    redraw: String,
    backdropClass: 'backdrop',
    useParent: false,
    isOpen: false,
    bodyScroll: false,
    backdrop: true,
    mode: 'overlay'
  },
  nodes: <const>[
    'mount',
    ''
  ]
}) {

  static opened: string = null;

  /**
   * The backdrop element
   */
  static backdrop: HTMLDivElement = null;

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
    return `drawer-${this.state.direction}`;
  }

  /**
   * Returns the drawer shift class name
   */
  get shiftClass () {
    return `drawer-${this.state.mode}`;
  }

  /**
   * Returns the shifts transition class name
   */
  get shifts () {
    return this.root.querySelectorAll<HTMLElement>(this.state.shift);
  }

  connect () {

    if (Drawer.backdrop === null) {
      Drawer.backdrop = document.createElement('div');
      Drawer.backdrop.className = 'drawer-backdrop';
    }

    if (this.state.useParent) {
      this.target = this.view.parentElement;
      // this.target.inert = true;
    } else {
      this.target = this.view;
    }

    if (this.target.classList.contains('d-none')) {
      this.target.classList.remove('d-none');
    }

    if (this.state.mode !== 'overlay' && this.state.hasShift === false) {
      console.error('Missing "data-drawer-shift-value" defintions on:', this.target);
    }

    spx.on('load', this.close, this);

  }

  onmount () {

    if (document.body.contains(Drawer.backdrop) === false) {
      document.body.appendChild(Drawer.backdrop);
    }

    if (this.state.hasWidth) {
      this.target.style.setProperty('width', this.state.width);
    }

    if (this.state.hasHeight) {
      this.target.style.setProperty('height', this.state.height);
    }

    if (this.state.hasDirection && this.target.classList.contains(this.directionClass) === false) {
      this.target.classList.add(this.directionClass);
    }

    if (this.state.mode === 'pull') {
      this.target.style.setProperty('transform', 'translateX(0)');
      this.target.style.setProperty('z-index', '0');
    }

    if (this.root.classList.contains('drawer-open')) {
      this.root.classList.remove('drawer-open');
    }

    if (this.state.isOpen) {
      if (qvp.test([ 'lg', 'xl', 'xxl' ])) {
        this.close();
      } else {
        setTimeout(this.close.bind(this), 200);
      }
    }

  }

  open () {

    //    Drawer.opened = this.target.id;

    if (!this.target.classList.contains('drawer-active')) {
      this.target.classList.add('drawer-active');
    }

    if (!this.backdrop.classList.contains(this.state.backdropClass)) {
      this.backdrop.classList.add(this.state.backdropClass);
    }

    if (this.state.bodyScroll === false) {
      document.body.style.setProperty('overflow', 'hidden');
    }

    if (this.state.hasShift) {
      this.shiftNodeElms();
    }

    if (this.state.hasWidth) {
      if (this.state.direction === 'top') {
        this.backdrop.style.setProperty('transform', `translateY(-${this.state.offset})`);
      } else {
        this.backdrop.style.setProperty('transform', `translateX(-${this.state.width})`);
      }
    }

    this.root.classList.add('drawer-open');
    this.backdrop.addEventListener('click', this.toggle, { once: true });
    this.target.addEventListener('touchstart', this.touchStart, { passive: true });
    // this.target.inert = false;
  }

  close () {

    if (this.state.isOpen) {
      this.state.isOpen = false;
    }

    if (this.state.hasWidth) {
      this.backdrop.style.removeProperty('transform');
    }

    if (this.state.bodyScroll === false) {
      document.body.style.removeProperty('overflow');
    }

    if (this.state.hasShift) {
      this.shiftNodeElms();
    } else {
      this.target.addEventListener('transitionend', this.transition);
    }

    this.root.classList.remove('drawer-open');
    this.target.removeEventListener('touchstart', this.touchStart);
    this.backdrop.removeEventListener('click', this.toggle);
    this.target.classList.remove('drawer-active');
    // this.target.inert = true;

    // Drawer.opened = null;
  };

  transition = (event: TransitionEvent) => {

    if (event.propertyName !== 'transform') return;

    if (this.state.hasShift) {
      this.shifts.forEach(shift => {
        if (shift.classList.contains(this.shiftClass)) {
          shift.classList.remove(this.shiftClass);
          shift.style.removeProperty('transform');
        }
      });
    }

    if (this.backdrop.classList.contains(this.state.backdropClass)) {
      this.backdrop.classList.remove(this.state.backdropClass);
    }

    if (this.state.mode === 'pull') {
      this.shifts.item(0).removeEventListener(event.type, this.transition);
    } else {
      this.target.removeEventListener(event.type, this.transition);
    }

  };

  /**
   * Set attribute requirements for the elements which apply transform shifting
   */
  shiftNodeElms () {

    if (this.state.mode === 'pull') {

      this.target.style.setProperty('transform', 'translateX(0)');
      this.target.style.setProperty('z-index', '0');

      if (this.state.isOpen === false) {
        this.shifts.item(0).addEventListener('transitionend', this.transition);
      }

    } else {

      if (this.state.isOpen === false) {
        this.target.addEventListener('transitionend', this.transition);
      }
    }

    this.shifts.forEach(shift => {
      if (this.state.isOpen) {

        if (!shift.classList.contains(this.shiftClass)) {
          shift.classList.add(this.shiftClass);
        }

        if (this.state.hasWidth && (
          this.state.direction === 'left' ||
          this.state.direction === 'right')) {

          shift.style.setProperty('transform', `translateX(-${this.state.width})`);

        } else if (this.state.hasHeight && (
          this.state.direction === 'top' ||
          this.state.direction === 'bottom')) {

          shift.style.setProperty('transform', `translateY(-${this.state.height})`);

        }

      } else {
        if (this.state.hasWidth && (
          this.state.direction === 'left' ||
          this.state.direction === 'right')) {

          shift.style.setProperty('transform', 'translateX(0)');

        } else if (this.state.hasHeight && (
          this.state.direction === 'top' ||
          this.state.direction === 'bottom')) {

          shift.style.setProperty('transform', 'translateY(0)');

        }
      }
    });
  }

  /**
   * Touch Start scroll position
   */
  touchStart ({ target }: SPX.TouchEvent) {

    const { scrollTop, offsetHeight } = target;
    const position = scrollTop + offsetHeight;

    if (scrollTop === 0) {
      target.scrollTop = 1;
    } else if (position === scrollTop) {
      target.scrollTop = scrollTop - 1;
    }

  }

  /**
   * Click detected outside, eg: document body
   */
  outsideClick = (event: Event) => {

    if (event.target !== this.target) {
      this.close();
      document.body.removeEventListener('click', this.outsideClick, false);
    }

  };

  /**
   * Toggle Drawer
   */
  toggle = (event?: SPX.Event) => {

    if (event) event.preventDefault();

    this.state.isOpen = !this.state.isOpen;

    if (this.state.isOpen) {
      this.open();
    } else {
      this.close();
    }

    return this.state.isOpen ? this.open() : this.close();

  };

  /**
   * Touch Move prevention event
   */
  touchMove = (event: TouchEvent) => {

    if (this.state.isOpen) {
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

}
