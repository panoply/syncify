import { Controller } from '@hotwired/stimulus';

export class ClipboardController extends Controller {
  static targets = ['source'];
  sourceTarget: any;

  copy() {

    this.dispatch('copy', {
      detail: { content: this.sourceTarget.value }
    });
    navigator.clipboard.writeText(this.sourceTarget.value);
  }
}
