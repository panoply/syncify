import { Controller } from '@hotwired/stimulus';
import { Siema } from 'modules/siema';
import screen from 'simplestatemanager';
import { from } from 'utils/native';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Viewer extends Controller {

  /**
   * Stimulus Values
   */
  static values = {
    photoswipe: String,
    dimensions: Boolean
  };

  /**
   * Stimulus Targets
   */
  static targets = [
    'slide',
    'slides',
    'nav'
  ];

  /**
   * Stimulus Initialize
   */
  initialize () {

    this.template = document.querySelector('.pswp');
    this.image = new Image();
    this.carousel = new Siema({
      selector: this.slidesTarget,
      onChange: this.onChange.bind(this),
      easing: 'ease-out',
      perPage: 1
    });

  }

  /**
   * Stimulus Connect
   */
  connect () {

    this.hydrate();

  }

  /**
   * Stimulus Disconnect
   */
  disconnect () {

    this.carousel.destroy();

  }

  /**
   * Carousel - Next
   */
  next () {

    this.carousel.next();

  }

  /**
   * Carousel - Previous
   */
  prev () {

    this.carousel.prev();

  }

  /**
   * Siema
   *
   * Goto Slide
   */
  goto ({ target }: { target: HTMLButtonElement}) {

    this.carousel.goTo(Number(target.id));

  }

  /**
   * Siema onChange event toggles the nav legend
   * square buttons. Triggered on element in dom.
   */
  onChange () {

    from(this.navTarget.children).forEach(({ firstElementChild: { classList } }, index) => {
      classList.remove('active');
      if (this.carousel.currentSlide === index) classList.add('active');
    });

  }

  /**
   * Hydrator function, modifies the SSR content and
   * progressively loads the images
   */
  private hydrate () {

    for (const node of this.slideTargets) {

      node.classList.remove('d-none');

      if (!this.dimensionsValue) {
        this.image.src = node.href;
        this.image.onload = () => {
          node.setAttribute('data-width', String(this.image.width));
          node.setAttribute('data-height', String(this.image.height));
          this.dimensionsValue = true;
        };
      }

    }

  }

  /**
   * Photoswipe Initialisation
   */
  async photoswipe (event: MouseEvent) {

    event.preventDefault();

    const { PhotoSwipe } = await import(this.photoswipeValue);

    const pswp = new PhotoSwipe({
      history: false,
      gallery: this.template,
      index: this.carousel.currentSlide,
      dataSource: this.slides,
      shareEl: false,
      fullscreenEl: false,
      closeOnScroll: screen.isActive('md')
    });

    pswp.init();
    pswp.goTo(this.carousel.currentSlide);
    pswp.on('change', () => this.carousel.goTo(pswp.currIndex));

  }

  /**
   * Returns photoswipe generated slides from
   * product images.
   */
  get slides () {

    return this.slideTargets.map(({
      href,
      title,
      dataset: {
        width,
        height
      }
    }) => ({
      title,
      src: href,
      w: Number(width),
      h: Number(height),
      msrc: href.replace(/\.jpg\?[^?]{0}/, '_1024x.jpg?')
    }));

  }

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * Photoswipe Template
   */
  template: Element;

  /**
   * Siema Carousel Instance
   */
  carousel: Siema;

  /**
   * HTML Image Element
   */
  image: HTMLImageElement;

  /**
   * Stimulus: import URL reference for photoswipe
   */
  photoswipeValue: string;

  /**
   * Stimulus: whether or not image dimensions have been set
   */
  dimensionsValue: boolean;

  /**
   * Stimulus: Photoswipe Template
   */
  navTarget: HTMLElement;

  /**
   *Stimulus: Siema slides target
   */
  slidesTarget: HTMLElement;

  /**
  * Stimulus: Siema Slide Targets
  */
  slideTargets: HTMLLinkElement[];

}
