import papyrus from 'papyrus'
import spx from 'spx';
import qvp from 'qvp';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Hovers extends spx.Component<typeof Hovers.define> {


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

   papyrus.list().forEach

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
