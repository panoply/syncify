// src/scripts/dawn/password-modal.js
var PasswordModal = class extends DetailsModal {
  constructor() {
    super();
    if (this.querySelector('input[aria-invalid="true"]'))
      this.open({ target: this.querySelector("details") });
  }
};
customElements.define("password-modal", PasswordModal);
//# sourceMappingURL=password-modal.js.map
