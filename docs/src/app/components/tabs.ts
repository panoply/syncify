import spx, { SPX } from 'spx';

export class Tabs extends spx.Component({
  state: {
    size: Number,
    open: {
      default: 0,
      typeof: Number
    }
  },
  nodes: <const>[
    'button',
    'tab'
  ]
}) {

  connect () {

    this.state.size = this.tabNodes.length;

  }

  toggle ({ attrs }: SPX.Event<{ index: number }>) {

    if (this.state.open === attrs.index) return;

    for (let i = 0, s = this.state.size; i < s; i++) {
      if (i === attrs.index) {
        this.buttonNodes[i].classList.add('active');
        this.tabNodes[i].classList.remove('d-none');
      } else {
        this.buttonNodes[i].classList.remove('active');
        this.tabNodes[i].classList.add('d-none');
      }
    }

    this.state.open = attrs.index;
  }

}
