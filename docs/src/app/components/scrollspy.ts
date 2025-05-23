import spx from 'spx';

export class ScrollSpy extends spx.Component({
  name: 'scrollspy',
  nodes: <const>[ 'href', 'anchor' ],
  state: {
    class: String,
    anchors: Array<string>
  }
}) {

  onmount () {

    if (!this.hrefExists) return;

    window.onscroll = this.onScroll.bind(this);

    this.hrefNode.classList.add(this.state.class);
    this.state.anchors.length === 0 && this.hrefNodes.forEach(a => {
      this.state.anchors.push(a.href.slice(a.href.lastIndexOf('#') + 1));
    });

    this.onScroll();

  }

  onScroll () {
    this.anchorNodes.forEach((node, i) => {
      if (!this.state.anchors.includes(node.id)) return;
      if (node.getBoundingClientRect().top < window.screenY && this.hrefNodes[i]) {
        this.hrefNodes.forEach(href => href.classList.remove(this.state.class));
        this.hrefNodes[i].classList.add(this.state.class);
      }
    });
  };

  /* -------------------------------------------- */
  /* TYPE VALUES                                  */
  /* -------------------------------------------- */

}
