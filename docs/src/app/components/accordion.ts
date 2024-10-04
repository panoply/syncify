import relapse, { Relapse } from 'relapse';
import spx from 'spx';
import qvp from 'qvp';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Accordion extends spx.Component({
  state: {
    multiple: Boolean,
    persist: Boolean
  },
  nodes: <const>[
    'viewport'
  ]
}) {

  public relapse: Relapse;

  onmount () {

    this.relapse = relapse(this.view, qvp.test([ 'xs', 'sm' ]) ? {
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
