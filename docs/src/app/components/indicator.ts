import spx, { SPX } from 'spx';

export class Indicator extends spx.Component<typeof Indicator.define> {

  static define: SPX.Define = {
    nodes: <const>[
      'marker'
    ]
  };

  toggle ({ attrs: { list } }: SPX.Event<{ list: number }>) {

    console.log(this.dom.markerNodes);

    this.dom.markerNode.style.setProperty(
      'transform',
      `translateY(${this.root.offsetTop}px)`
    );

  }

}
