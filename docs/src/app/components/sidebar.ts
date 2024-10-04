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

  onmount () {

    relapse();

  }

  unmount () {

  }

  onLink ({ target }: SPX.Event<HTMLAnchorElement>) {

    this.link(link => {

      link.isEqualNode(target)
        ? link.addClass('active')
        : link.removeClass('active');

    });

  }

  public relapse: Relapse[];

}
