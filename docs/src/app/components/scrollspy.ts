import spx from 'spx';

export class ScrollSpy extends spx.Component({
  name: 'scrollspy',
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

    this.options = {
      rootMargin: this.state.rootMargin,
      threshold: this.state.threshold
    };

  }

  onmount () {

    window.onscroll = this.onScroll.bind(this);
    this.hrefNode.classList.add('fc-green');
    this.anchors = this.hrefNodes.map(a => a.href.slice(a.href.lastIndexOf('#') + 1));

  }

  unmount (): void {

    this.anchors = [];

  }

  onScroll () {

    this.anchorNodes.forEach((node, i) => {
      if (this.anchors.includes(node.id)) {
        const next = node.getBoundingClientRect().top - 150;
        if (next < window.screenY && this.hrefNodes[i]) {
          this.hrefNodes.forEach(href => href.classList.remove('fc-green'));
          this.hrefNodes[i].classList.add('fc-green');
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
