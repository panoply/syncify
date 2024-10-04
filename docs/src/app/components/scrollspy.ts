import spx from 'spx';

export class ScrollSpy extends spx.Component({
  name: 'scrollspy',
  sugar: true,
  nodes: <const>[
    'href',
    'anchor'
  ],
  state: {
    threshold: 0,
    rootMargin: '0px'
  }
}) {

  /**
   * Stimulus: Initialize
   */
  connect () {

    window.onscroll = this.onScroll;
    this.anchors = [];
    this.options = {
      rootMargin: this.state.rootMargin,
      threshold: this.state.threshold
    };

  }

  onmount () {

    if (this.hasHref) {

      this.href.addClass('fc-blue');
      this.href(a => {
        this.anchors.push(a.href.slice(a.href.lastIndexOf('#') + 1));
      });
    }

    if (this.hasAnchor) {
      this.onScroll();
    }
  }

  unmount (): void {

    this.anchors = [];

  }

  onScroll = () => {

    this.anchor((node, i) => {
      if (this.anchors.includes(node.id)) {
        const next = node.getBoundingClientRect().top;
        if (next < window.screenY && this.href(i)) {
          this.href(href => href.removeClass('fc-blue'));
          this.href(i).addClass('fc-blue');
        }
      }
    });
  };

  /* -------------------------------------------- */
  /* TYPE VALUES                                  */
  /* -------------------------------------------- */

  anchors: string[];
  observer: IntersectionObserver;
  options: IntersectionObserverInit;

}
