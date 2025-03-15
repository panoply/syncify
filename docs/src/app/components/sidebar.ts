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
  sugar: true,
  nodes: <const>[
    'link'
  ]
}) {

  get sidebar () { return spx.live('drawer').view; }

  onmount () {

    relapse();

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

    this.link(link => {

      link.isEqualNode(target)
        ? link.addClass('active')
        : link.removeClass('active');

    });

  }

  public relapse: Relapse[];

}
