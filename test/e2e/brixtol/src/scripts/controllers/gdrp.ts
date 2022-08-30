import { Controller } from '@hotwired/stimulus';
import * as customer from 'application/customer';

export class Gdrp extends Controller {

  /**
   * Stimulus Values
   */
  static values = {
    consent: Boolean,
    tracking: String,
    noTracking: String,
    noInteraction: Boolean
  };

  /**
   * Stimulus Targets
   */
  static targets = [
    'consent'
  ];

  /**
   * Stimulus Classes
   */
  static classes = [
    'show',
    'overlay'
  ];

  /**
   * Stimulus Connect
   */
  connect (): void {

    window.Shopify.loadFeatures([ { name: 'consent-tracking-api', version: '0.1' } ], this.getStatus);

  }

  /**
   * Hide the GDRP component banner.
   */
  hideBanner () {

    if (!this.element.parentElement.classList.contains(this.showClass)) {
      this.element.parentElement.classList.add(this.showClass);
      this.element.classList.remove(this.showClass);
    }

  }

  /**
   * Returns the consent status and applies the
   * correct options relative to the consent status.
   */
  getStatus = (error: any) => {

    if (error) throw console.error('GDRP: Consent Error', error);

    const consent = window.Shopify.customerPrivacy.getTrackingConsent();

    if (consent === 'yes') {

      this.noInteractionValue = false;
      this.consentValue = true;
      this.application.element.classList.remove(this.overlayClass);
      this.element.classList.add(this.showClass);

      customer.patch({ event: false }, { trackingConsent: true });

    } else if (consent === 'no_interaction') {

      this.noInteractionValue = true;
      this.application.element.classList.add(this.overlayClass);
      this.element.parentElement.classList.remove(this.showClass);
      this.element.classList.remove(this.showClass);

    } else if (consent === 'no') {

      this.noInteractionValue = false;
      this.consentValue = false;
      this.application.element.classList.remove(this.overlayClass);
      this.element.classList.add(this.showClass);

      customer.patch({ event: false }, { trackingConsent: false });

    }

  };

  /**
   * Toggle input checkbox form options when
   * visitor decides to click cookie settings.
   */
  onInput (event: { target: HTMLInputElement }) {

    if (event.target.hasAttribute('checked')) {
      event.target.removeAttribute('checked');
      this.consentValue = false;
      this.consentTarget.innerHTML = this.noTrackingValue;
    } else {
      event.target.setAttribute('checked', '');
      this.consentValue = true;
      this.consentTarget.innerHTML = this.trackingValue;
    }

  }

  /**
   * Accepts tracking button, this is fired from
   * the HTML element. It infers that consent was accepts.
   */
  onAccept () {

    this.consentValue = true;
    window.Shopify.customerPrivacy.setTrackingConsent(this.consentValue, this.getStatus);

  }

  /**
   * Customizes the tacking conditions and is fired
   * when the visitor clicks cookie settings.
   */
  onConfirm (event: SubmitEvent) {

    event.preventDefault();
    window.Shopify.customerPrivacy.setTrackingConsent(this.consentValue, this.getStatus);

  }

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * Stimulus: The consent button target element
   */
  consentTarget: HTMLElement;
  /**
   * Stimulus: Whether or not visitor has consented
   */
  consentValue: boolean;
  /**
   * Stimulus: Text content, eg: "Allow Tracking"
   */
  trackingValue: string;
  /**
   * Stimulus: Text content, eg: "Do not track me"
   */
  noTrackingValue: string;
  /**
   * Stimulus: Visitor interacted with the component
   */
  noInteractionValue: boolean;
  /**
   * Stimulus: The overlay class name
   */
  overlayClass: string;
  /**
   * Stimulus: The show class to toggle the component
   */
  showClass: string;

}
