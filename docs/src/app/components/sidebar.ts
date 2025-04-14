import relapse, { Relapse } from 'relapse';
import spx, { SPX } from 'spx';

export class Sidebar extends spx.Component({
  state: {
    multiple: Boolean,
    open: {
      default: 0,
      typeof: Number
    }
  },
  nodes: <const>[
    'link'
  ]
}) {

  get sidebar () { return spx.live('drawer').view; }

  onmount () {

    relapse({ multiple: false });

  }

  unmount () {

  }

  // onMouseover () {

  //   this.sidebar.style.setProperty('overflow', 'visible');

  // }

  // onMouseleave () {
  //   this.sidebar.style.removeProperty('overflow');
  // }

  onLink ({ target }: SPX.Event<HTMLAnchorElement>) {

    this.linkNodes.forEach(link => {
      link.isEqualNode(target)
        ? link.classList.add('active')
        : link.classList.remove('active');

    });

  }

  public relapse: Relapse[];

}
