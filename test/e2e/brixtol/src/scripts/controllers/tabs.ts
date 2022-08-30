import { Controller } from '@hotwired/stimulus';
import Tablist from '@accede-web/tablist';

export class Tabs extends Controller {

  /**
   * Tabs component instance
   */
  public list: Tablist;

  /**
   * Tab stimulus target
   */
  public tabTarget: HTMLElement;

  /**
   * Stimulus targets
   */
  static targets = [ 'tab' ];

  /**
   * Stimulus Initialize
   */
  initialize () {

    this.list = new Tablist(this.tabTarget);

  }

  /**
   * Stimulus Connect
   */
  connect () {

    this.list.mount();

  }

}
