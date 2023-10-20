import { Controller as stimulus } from 'application/controller';
import spx from 'spx';
import * as track from 'application/tracking';

export function App ({ targets, screens, controllers }) {

  /**
   * SPX: Called to establish SPX connection
   */
  spx.connect({ targets })(function () {

    lazySizes.init();
    stimulus.connect(controllers, screens);
    Shopify.designMode || spx.disconnect();

  });

  /**
   * SPX: Called each time a page is loaded
   */
  spx.on('load', function () {

    track.google();
    track.meta();

  });

}
