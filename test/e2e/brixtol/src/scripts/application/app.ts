import * as spx from 'spx';
import lazy from 'modules/lazysizes';
import { Controller as stimulus } from 'application/controller';
import screen from 'simplestatemanager';
import { defineProperty } from 'utils/native';
import { ssm } from 'utils/common';
import * as customer from 'application/customer';
import * as currency from 'application/currency';

// @ts-ignore
window.dataLayer = window.dataLayer || [];

function gtag (...args: any[]) {

  // @ts-ignore
  dataLayer.push(arguments);

}

export function brixtol ({ targets, screens, controllers }) {

  /**
   * spx Connection
   */
  spx.connect({
    targets,
    hover: {
      trigger: 'href',
      threshold: 100
    }
  });

  /**
   * spx:load
   */
  spx.on('load', () => {

    currency.exchange();

    gtag('js', new Date());
    gtag('config', 'G-HTNV2NPHT6');

  });

  spx.on('connected', () => {

    /**
     * Lazysizes Initialize
     */
    lazy.init();

    /**
     * Stimulus Instance
     */
    stimulus.connect(controllers);

    /**
     * Register Responsive States
     */
    screen.addStates(ssm(screens));

    /* -------------------------------------------- */
    /*                   FUNCTIONS                  */
    /* -------------------------------------------- */

    /**
     * Localize Customer
     */
    customer.localize();

    /**
     * Currency Exchange
     */
    currency.exchange();

    /* -------------------------------------------- */
    /* WINDOW ASSIGNMENT                            */
    /* -------------------------------------------- */

    /**
     * Assign context to the window object
     */
    return defineProperty(window, 'app', {
      get: () => ({
        get spx () {
          return spx;
        },
        get screen () {
          return screen;
        }
      })
    });

  });

}
