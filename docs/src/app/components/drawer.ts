import spx, { SPX } from 'spx';
import qvp from 'qvp';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

// // Decouple function
// const requestAnimFrame = (() => {
//   return window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     function (callback) {
//       window.setTimeout(callback, 1000 / 60);
//     };
// })();

// function decouple(node, event, fn) {
//   let eve, tracking = false;

//   function captureEvent(e) {
//     eve = e;
//     track();
//   }

//   function track() {
//     if (!tracking) {
//       requestAnimFrame(update);
//       tracking = true;
//     }
//   }

//   function update() {
//     fn.call(node, eve);
//     tracking = false;
//   }

//   node.addEventListener(event, captureEvent, false);

//   return captureEvent;
// }

// // Slideout class without event emitter
// class Slideout {
//   doc: Document;
//   html: any;
//   touch: { start: string; move: string; end: string; };
//   prefix: string;
//   _startOffsetX: number;
//   _currentOffsetX: number;
//   _opening: boolean;
//   _moved: boolean;
//   _opened: boolean;
//   _preventOpen: boolean;
//   panel: any;
//   menu: any;
//   _touch: boolean;
//   _side: any;
//   _easing: any;
//   _duration: number;
//   _tolerance: number;
//   _padding: number;
//   _translateTo: number;
//   _orientation: number;
//   _onScrollFn: (e: any) => void;
//   scrolling: boolean;
//   _preventMove: (eve: any) => void;
//   _resetTouchFn: (eve: any) => void;
//   _onTouchCancelFn: () => void;
//   _onTouchEndFn: () => void;
//   _onTouchMoveFn: (eve: any) => void;

//   constructor(options = {}) {

//     this.doc = window.document;
//     this.html = this.doc.documentElement;
//     this.touch = {
//       'start': 'pointerdown',
//       'move': 'pointermove',
//       'end': 'pointerup'
//     };

//     this.prefix = (() => {
//       const regex = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/;
//       const styleDeclaration = this.doc.getElementsByTagName('script')[0].style;
//       for (const prop in styleDeclaration) {
//         if (regex.test(prop)) {
//           return '-' + prop.match(regex)[0].toLowerCase() + '-';
//         }
//       }
//       if ('WebkitOpacity' in styleDeclaration) return '-webkit-';
//       if ('KhtmlOpacity' in styleDeclaration) return '-khtml-';
//       return '';
//     })();

//     this._startOffsetX = 0;
//     this._currentOffsetX = 0;
//     this._opening = false;
//     this._moved = false;
//     this._opened = false;
//     this._preventOpen = false;

//     this.panel = options.panel;
//     this.menu = options.menu;

//     this._touch = options.touch === undefined ? true : options.touch && true;
//     this._side = options.side || 'left';
//     this._easing = options.fx || options.easing || 'ease';
//     this._duration = parseInt(options.duration, 10) || 300;
//     this._tolerance = parseInt(options.tolerance, 10) || 70;
//     this._padding = this._translateTo = parseInt(options.padding, 10) || 256;
//     this._orientation = this._side === 'right' ? -1 : 1;
//     this._translateTo *= this._orientation;

//     if (!this.panel.classList.contains('slideout-panel')) {
//       this.panel.classList.add('slideout-panel');
//     }
//     if (!this.panel.classList.contains(`slideout-panel-${this._side}`)) {
//       this.panel.classList.add(`slideout-panel-${this._side}`);
//     }
//     if (!this.menu.classList.contains('slideout-menu')) {
//       this.menu.classList.add('slideout-menu');
//     }
//     if (!this.menu.classList.contains(`slideout-menu-${this._side}`)) {
//       this.menu.classList.add(`slideout-menu-${this._side}`);
//     }

//     if (this._touch) {
//       this._initTouchEvents();
//     }
//   }

//   open() {
//     if (!this.html.classList.contains('slideout-open')) {
//       this.html.classList.add('slideout-open');
//     }
//     this._setTransition();
//     this._translateXTo(this._translateTo);
//     this._opened = true;
//     setTimeout(() => {
//       this.panel.style.transition = '';
//     }, this._duration + 50);
//     return this;
//   }

//   close() {
//     if (!this.isOpen() && !this._opening) {
//       return this;
//     }
//     this._setTransition();
//     this._translateXTo(0);
//     this._opened = false;
//     setTimeout(() => {
//       this.html.classList.remove('slideout-open');
//       this.panel.style.transition = this.panel.style[`${this.prefix}transform`] = this.panel.style.transform = '';
//     }, this._duration + 50);
//     return this;
//   }

//   toggle() {
//     return this.isOpen() ? this.close() : this.open();
//   }

//   isOpen() {
//     return this._opened;
//   }

//   _translateXTo(translateX) {
//     this._currentOffsetX = translateX;
//     this.panel.style[`${this.prefix}transform`] = this.panel.style.transform = `translateX(${translateX}px)`;
//     return this;
//   }

//   _setTransition() {
//     this.panel.style[`${this.prefix}transition`] = this.panel.style.transition = `${this.prefix}transform ${this._duration}ms ${this._easing}`;
//     return this;
//   }

//   _initTouchEvents() {
//     this._onScrollFn = decouple(this.doc, 'scroll', () => {
//       if (!this._moved) {
//         clearTimeout(this.scrollTimeout);
//         this.scrolling = true;
//         this.scrollTimeout = setTimeout(() => {
//           this.scrolling = false;
//         }, 250);
//       }
//     });

//     this._preventMove = (eve) => {
//       if (this._moved) {
//         eve.preventDefault();
//       }
//     };

//     this.doc.addEventListener(this.touch.move, this._preventMove);

//     this._resetTouchFn = (eve) => {
//       if (typeof eve.touches === 'undefined') {
//         return;
//       }

//       this._moved = false;
//       this._opening = false;
//       this._startOffsetX = eve.touches[0].pageX;
//       this._preventOpen = (!this._touch || (!this.isOpen() && this.menu.clientWidth !== 0));
//     };

//     this.panel.addEventListener(this.touch.start, this._resetTouchFn);

//     this._onTouchCancelFn = () => {
//       this._moved = false;
//       this._opening = false;
//     };

//     this.panel.addEventListener('touchcancel', this._onTouchCancelFn);

//     this._onTouchEndFn = () => {
//       if (this._moved) {
//         (this._opening && Math.abs(this._currentOffsetX) > this._tolerance) ? this.open() : this.close();
//       }
//       this._moved = false;
//     };

//     this.panel.addEventListener(this.touch.end, this._onTouchEndFn);

//     this._onTouchMoveFn = (eve) => {
//       if (
//         this.scrolling ||
//         this._preventOpen ||
//         typeof eve.touches === 'undefined' ||
//         this._hasIgnoredElements(eve.target)
//       ) {
//         return;
//       }

//       const dif_x = eve.touches[0].clientX - this._startOffsetX;
//       let translateX = this._currentOffsetX = dif_x;

//       if (Math.abs(translateX) > this._padding) {
//         return;
//       }

//       if (Math.abs(dif_x) > 20) {
//         this._opening = true;

//         const oriented_dif_x = dif_x * this._orientation;

//         if (this._opened && oriented_dif_x > 0 || !this._opened && oriented_dif_x < 0) {
//           return;
//         }

//         if (oriented_dif_x <= 0) {
//           translateX = dif_x + this._padding * this._orientation;
//           this._opening = false;
//         }

//         if (!this._moved && !this.html.classList.contains('slideout-open')) {
//           this.html.classList.add('slideout-open');
//         }

//         this.panel.style[`${this.prefix}transform`] = this.panel.style.transform = `translateX(${translateX}px)`;
//         this._moved = true;
//       }
//     };

//     this.panel.addEventListener(this.touch.move, this._onTouchMoveFn);

//     return this;
//   }
//   scrollTimeout(scrollTimeout: any) {
//     throw new Error('Method not implemented.');
//   }

//   _hasIgnoredElements(target) {
//     while (target.parentNode) {
//       if (target.getAttribute('data-slideout-ignore') !== null) {
//         return target;
//       }
//       target = target.parentNode;
//     }
//     return null;
//   }

//   enableTouch() {
//     this._touch = true;
//     return this;
//   }

//   disableTouch() {
//     this._touch = false;
//     return this;
//   }

//   destroy() {
//     this.close();

//     this.doc.removeEventListener(this.touch.move, this._preventMove);
//     this.panel.removeEventListener(this.touch.start, this._resetTouchFn);
//     this.panel.removeEventListener('touchcancel', this._onTouchCancelFn);
//     this.panel.removeEventListener(this.touch.end, this._onTouchEndFn);
//     this.panel.removeEventListener(this.touch.move, this._onTouchMoveFn);
//     this.doc.removeEventListener('scroll', this._onScrollFn);

//     this.open = this.close = () => {};

//     return this;
//   }
// }

export class Drawer extends spx.Component<typeof Drawer.define> {

  static opened: string = null;

  /**
   * The backdrop element
   */
  static backdrop: HTMLDivElement = null;

  /**
   * Stimulus: values
   */
  static define = {
    state: {
      outsideClick: Boolean,
      height: String,
      width: String,
      offset: String,
      direction: String,
      shift: String,
      redraw: String,
      backdropClass: {
        typeof: String,
        default: 'backdrop'
      },
      useParent: Boolean,
      isOpen: Boolean,
      bodyScroll: Boolean,
      mode: {
        typeof: String,
        default: 'overlay'
      }
    },
    nodes: <const>[
      'mount',
      'backdrop'
    ]
  };

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
    return document.querySelectorAll<HTMLElement>(this.state.shift);
  }

  connect () {

    console.log(this.root);

    if (this.state.useParent) {
      this.target = this.root.parentElement;
      this.target.ariaHidden = 'true';
    } else {
      this.target = this.root;
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

    if (this.html.classList.contains('drawer-open')) {
      this.html.classList.remove('drawer-open');
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

    if (this.state.hasBackdropClass && !this.dom.backdropNode.classList.contains(this.state.backdropClass)) {
      this.dom.backdropNode.classList.add(this.state.backdropClass);
    }

    if (this.state.bodyScroll === false) {
      document.body.style.setProperty('overflow', 'hidden');
    }

    if (this.state.hasShift) {
      this.shiftNodeElms();
    }

    if (this.state.hasWidth) {
      if (this.state.direction === 'top') {
        this.dom.backdropNode.style.setProperty('transform', `translateY(-${this.state.offset})`);
      } else {
        this.dom.backdropNode.style.setProperty('transform', `translateX(-${this.state.width})`);
      }
    }

    this.html.classList.add('drawer-open');
    this.dom.backdropNode.addEventListener('click', this.toggle, { once: true });
    this.target.addEventListener('touchstart', this.touchStart, { passive: true });
    this.target.ariaHidden = 'false';
  }

  close () {

    if (this.state.isOpen) {
      this.state.isOpen = false;
    }

    if (this.state.hasWidth) {
      this.dom.backdropNode.style.removeProperty('transform');
    }

    if (this.state.bodyScroll === false) {
      document.body.style.removeProperty('overflow');
    }

    if (this.state.hasShift) {
      this.shiftNodeElms();
    } else {
      this.target.addEventListener('transitionend', this.transition);
    }

    this.html.classList.remove('drawer-open');
    this.target.removeEventListener('touchstart', this.touchStart);
    this.dom.backdropNode.removeEventListener('click', this.toggle);
    this.target.classList.remove('drawer-active');
    this.target.ariaHidden = 'true';

    // Drawer.opened = null;
  };

  transition = (event: TransitionEvent) => {

    if (event.propertyName !== 'transform') return;

    if (this.state.hasShift) {
      for (const shift of this.shifts) {
        if (shift.classList.contains(this.shiftClass)) {
          shift.classList.remove(this.shiftClass);
          shift.style.removeProperty('transform');
        }
      }
    }

    if (this.state.hasBackdropClass && this.dom.backdropNode.classList.contains(this.state.backdropClass)) {
      this.dom.backdropNode.classList.remove(this.state.backdropClass);
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

    for (const shift of this.shifts) {

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
    }
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
