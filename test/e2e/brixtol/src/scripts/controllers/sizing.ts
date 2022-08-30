import { LiteralUnion } from 'type-fest';
import { Controller } from '@hotwired/stimulus';
import * as customer from 'application/customer';

export class Sizing extends Controller {

  /**
   * Stimulus Values
   */
  static values = {
    measurementType: String,
    metricTolerence: String,
    imperialTolerence: String
  };

  /**
   * Stimulus Targets
   */
  static targets = [
    'imperial',
    'metric',
    'weight',
    'measurement',
    'tolerence'
  ];

  /**
   * Stimulus Initialize
   */
  connect () {

    this.measurementTypeValue = customer.session.countryCode !== 'US'
      ? 'metric'
      : 'imperial';
  }

  get sizeUnit () {

    if (this.measurementTypeValue === 'metric') {
      this.imperialTarget.classList.remove('active');
      this.metricTarget.classList.add('active');
      this.tolerenceTarget.innerHTML = this.metricTolerenceValue;
      return 'cm';
    } else if (this.measurementTypeValue === 'imperial') {
      this.metricTarget.classList.remove('active');
      this.imperialTarget.classList.add('active');
      this.tolerenceTarget.innerHTML = this.imperialTolerenceValue;
      return '″';
    }

    return 'cm';

  }

  toggle (event: Event) {

    event.preventDefault();

    if (event.target instanceof HTMLElement) {

      if (!event.target.hasAttribute('data-sizing-target')) return;
      if (event.target.classList.contains('active')) event.target.classList.remove('active');

      this.measurementTypeValue = event.target.getAttribute('data-sizing-target');

      for (const node of this.measurementTargets) {

        const attr = node.getAttribute(`data-${this.measurementTypeValue}`).trim();

        if (attr.length > 0) {
          if (node.hasAttribute('data-unit')) {
            if (this.measurementTypeValue === 'imperial') {
              node.innerHTML = `${attr} <small>LBS</small>`;
            } else {
              node.innerHTML = `${attr}kg`;
            }
          } else {
            node.innerHTML = `${attr}${this.sizeUnit}`;
          }
        }
      }

    }
  }

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * Stimulus: Imperial measurement
   */
  imperialTarget: HTMLElement;

  /**
   * Stimulus: Metric measurement
   */
  metricTarget: HTMLElement;

  /**
   * Stimulus: tolerence text
   */
  tolerenceTarget: HTMLElement;

  /**
   * Stimulus: measurement target
   */
  measurementTargets: HTMLElement[];

  /**
   * Stimulus: measurement type, ie: imperial or metric
   */
  measurementTypeValue: LiteralUnion<'metric' | 'imperial', string>;

  /**
   * Stimulus: Metric measurement tolerance label
   */
  metricTolerenceValue: string;

  /**
   * Stimulus: Imperial measurement tolerance label
   */
  imperialTolerenceValue: string;

}
