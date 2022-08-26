import { Controller } from '@hotwired/stimulus';
import { Siema } from 'modules/siema';
import { allTrue, has } from 'rambdax';
import { defineProperty } from 'utils/native';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Carousel extends Controller {

  /**
   * Clone Cache
   *
   * Holds a reference to the original nodes
   * to help negate issues with pjax
   */
  static clone: { [id: number]: Node } = {};

  /**
   * Click Loaders
   *
   * Holds a reference slides so we can progressively
   * load each slide element
   */
  static click: HTMLElement[] = [];

  /**
   * Click Loaders
   *
   * Holds a reference slides so we can progressively
   * load each slide element
   */
  static state: {
    [id: string]: {
      hidden?: HTMLElement[];
      clone?: Node;
      slideIndex?: number;
    }
  } = {};

  /**
   * Stimulus Values
   */
  static values = {
    id: String,
    startIndex: Number,
    draggable: Boolean,
    loop: Boolean,
    interval: Number,
    hydrate: Boolean,
    duration: Number,
    mobile: Number,
    tablet: Number,
    desktop: Number
  };

  /**
   * Stimulus Targets
   */
  static targets = [
    'slide',
    'siema'
  ];

  /**
   * Static State Reference
   */
  get state () {

    return Carousel.state[this.idValue];

  }

  /**
   * Stimulus Initialize
   */
  initialize () {

    if (!has(this.idValue, Carousel.state)) {
      Carousel.state[this.idValue] = { hidden: [] };
    } else {
      this.startIndexValue = this.state.slideIndex;
    }

    this.restore();

  }

  /**
   * Stimulus Connect
   */
  connect () {

    this.hydrate();

    this.slider = new Siema({
      selector: this.siemaTarget as HTMLElement,
      loop: this.loopValue,
      startIndex: this.startIndexValue,
      duration: this.durationValue,
      easing: 'ease-out',
      onInit: this.onInit.bind(this),
      onChange: this.onChange.bind(this),
      draggable: window.app.screen.isActive('md') ? this.draggableValue : false,
      perPage: allTrue(
        this.mobileValue === 1,
        this.tabletValue === 1,
        this.desktopValue === 1
      ) ? 1 : {
          0: 1,
          290: this.mobileValue,
          576: this.tabletValue,
          768: this.tabletValue,
          1080: this.desktopValue
        }
    });

  }

  /**
   * Stimulus Disconnect
   */
  disconnect () {

    this.state.slideIndex = this.slider.currentSlide;
    this.slider.destroy(true);
    this.siemaTarget.replaceWith(this.state.clone);
    this.element.removeEventListener('pointerenter', this.pause);
    this.element.removeEventListener('pointerleave', this.play); ;

  }

  /**
   * Next Slide
   */
  next () {

    return this.slider.next();

  }

  /**
   * Previous Slide
   */
  prev () {

    return this.slider.prev();

  }

  /**
   * Autoplay Trigger
   *
   * Starts auto-playing the carousel.
   */
  private play = (reset?: PointerEvent) => {

    this.interval = setInterval(() => this.next(), this.intervalValue);
    this.element.addEventListener('pointerenter', this.pause);

    if (reset) this.element.removeEventListener('pointerleave', this.play);

  };

  /**
   * Pause Autoplay
   *
   * Pauses the carousel autoplay and resets the interval.
   * The pause is triggered when user is interacting with
   * the component.
   */
  private pause = () => {

    clearInterval(this.interval);

    this.element.removeEventListener('pointerenter', this.pause);
    this.element.addEventListener('pointerleave', this.play);

  };

  /**
   * Siema onInit
   *
   * Binded function for Siema onInit
   */
  private onInit () {

    if (this.intervalValue > 0) this.play();

  }

  /**
     * Siema onChange
     *
     * Binded function for Siema onChange
     */
  private onChange () {

    this.startIndexValue = this.slider.currentSlide;

    if (this.hydrateValue) {

      const slide = this.slideTargets[this.slider.currentSlide];

      if (slide.classList.contains('d-none')) {
        slide.classList.remove('d-none');
        this.state.hidden.push(slide);
      } else {
        for (const { classList } of this.state.hidden) {
          if (!classList.contains('d-none')) classList.add('d-none');
        }
      }

    }
  }

  /**
   * Restore Content
   *
   * Clones the Siema target node and stores the node
   * in cache. This is performed too negate errors from
   * occuring between pjax navigations.
   */
  private restore () {

    if (this.siemaTarget && !window.Shopify.designMode) {

      if (!has('clone', this.state)) {
        const clone = this.siemaTarget.cloneNode(true);
        defineProperty(this.state, 'clone', { get () { return clone; } });
      } else {
        this.siemaTarget.replaceWith(this.state.clone);
      }
    }

  }

  /**
   * Hydrate Trigger
   *
   * Performs a slide hydration. This is a progessive
   * loading feature to negate content shifts.
   */
  private hydrate () {

    if (this.hasHydrateValue) {
      this.slideTargets.forEach(({ classList }) => classList.remove('d-none'));
    } else if (this.siemaTarget.classList.contains('row')) {

      this.siemaTarget.classList.remove('row');
      this.slideTargets.forEach(({ classList }) => classList.remove('d-none'));

      if (!this.siemaTarget.parentElement.classList.contains('px-0')) {
        this.siemaTarget.parentElement.classList.add('px-2');
      }

    }

  }

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * Siema Instance
   */
  slider: Siema;
  /**
   * The interval timer
   */
  interval: number;
  /**
   * Stimulus: The carousel selector
   */
  siemaTarget: HTMLElement;
  /**
   * Stimulus: The carousel slide elements
   */
  slideTargets: HTMLElement[];
  /**
   * Stimulus: The shopify section id
   */
  idValue: string;
  /**
   * Stimulus: The autoplay interval
   */
  intervalValue: number;
  /**
   * Stimulus: The starting slide
   */
  startIndexValue: number;
  /**
   * Stimulus: Whether or not carousel is draggable
   */
  draggableValue: boolean;
  /**
   * Stimulus: Whether or not to loop slides
   */
  loopValue: boolean;
  /**
   * Stimulus: Whether or not to progressively load slides
   */
  hydrateValue: string;
  /**
   * Stimulus: Determine if `hydrate-value` exists
   */
  hasHydrateValue: boolean;
  /**
   * Stimulus: The animation slide duration
   */
  durationValue: number;
  /**
   * Stimulus: The amount of slides to show in desktop
   */
  desktopValue: number;
  /**
   * Stimulus: The amount of slides to show in mobile
   */
  tabletValue: number;
  /**
   * Stimulus: The amount of slides to show in mobile
   */
  mobileValue: number;

}
