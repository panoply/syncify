import relapse, { Relapse } from 'relapse';
import spx from 'spx';
import qvp from 'qvp';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Accordion extends spx.Component<typeof Accordion.define> {

  public relapse: Relapse;

  static define = {
    state: {
      multiple: Boolean,
      persist: Boolean
    },
    nodes: <const>[
      'viewport'
    ]
  };

  onmount () {

    this.relapse = relapse(this.root, qvp.test([ 'xs', 'sm' ]) ? {
      multiple: true,
      persist: false
    } : {
      multiple: this.state.multiple,
      persist: this.state.persist
    });

    qvp.on('sm:onenter', this.mobile, this);

  }

  unmount () {

    this.relapse.destroy();

  }

  private mobile () {

    this.relapse.config({
      multiple: true,
      persist: false
    });

  }

}
