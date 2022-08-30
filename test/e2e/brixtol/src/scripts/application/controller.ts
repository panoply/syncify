import { Controller as BaseController, Application } from '@hotwired/stimulus';
import { Shared } from '../types/export';

export class Controller extends BaseController implements Shared {

  /**
   * Stimulus Instance
   */
  static connect (controllers: { [name: string]: any }) {

    const stimulus = Application.start();
    for (const id in controllers) stimulus.register(id.toLowerCase(), controllers[id]);
  }

  /**
   * Location Absolute URL
   *
   * Returns the current window location via the
   * Turbolinks instance.
   *
   * @example
   * "https://brixtoltextiles.com/collections/men?currency=SEK"
   *
   */
  get location (): string {

    return window.location.href;

  }

  /**
   * Location Path Getter
   *
   * Returns the current window location pathname via the
   * Turbolinks instance.
   *
   * @example
   * "/collections/men"
   */
  get path (): string {

    return window.location.pathname;

  }

  /**
   * Get Controller
   *
   * Returns the controller instance and methods from Stimulus.
   * Optionally pass in an `id` parameter value, which would
   * be the DOM element `id=""` value.
   */
  controller (identifier: string, id?: string): any {

    return this.application.controllers.find(
      ({ context }) => id ? (
        context.identifier === identifier &&
        context.element.id === id
      ) : (
        context.identifier === identifier
      )
    );

  }

}
