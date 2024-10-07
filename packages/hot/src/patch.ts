/**
 * Patches WebComponents
 *
 * Majority of this is for Dawn themes and a reminder that Dawn is an abomination.
 */
export function PatchWebComponents (WebC: Map<string, string>) {

  const methods = {
    customElementDefine: customElements.define,
    customElementsGet: customElements.get,
    querySelector: Document.prototype.querySelector,
    querySelectorAll: Document.prototype.querySelectorAll,
    getElementsByTagName: Document.prototype.getElementsByTagName,
    matches: Element.prototype.matches,
    closest: Element.prototype.closest
  };

  const uuid = (length = 10, current?: string) => {
    current = current || '';
    return length
      ? uuid(--length, 'abcdefghiklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 60)) + current)
      : current;
  };

  function replaceSelector (selector: string) {
    return WebC.has(selector) ? WebC.get(selector) : selector;
  }

  // Patch querySelector
  Document.prototype.querySelector = function (selector: string) {
    return methods.querySelector.call(this, replaceSelector(selector));
  };

  // Patch querySelectorAll
  Document.prototype.querySelectorAll = function (selector: string) {
    return methods.querySelectorAll.call(this, replaceSelector(selector));
  };

  // Patch querySelectorAll
  Document.prototype.getElementsByName = function (selector: string) {
    return methods.getElementsByTagName.call(this, replaceSelector(selector));
  };

  // Patch matches
  Element.prototype.matches = function (selector: string) {
    return methods.matches.call(this, replaceSelector(selector));
  };

  // Patch matches
  Element.prototype.closest = function (selector: string) {
    return methods.closest.call(this, replaceSelector(selector));
  };

  customElements.get = function (name: string): CustomElementConstructor {
    return methods.customElementsGet.call(customElements, replaceSelector(name));
  };

  customElements.define = function (name: string, constructor: CustomElementConstructor, options?: any) {

    if (WebC.has(name)) {

      const newName = `${name}-${uuid()}`;
      const oldName = WebC.get(name);

      methods.customElementDefine.call(customElements, newName, constructor, options);

      document.body.querySelectorAll(oldName).forEach(oldElement => {
        console.info(`Syncify: Web Component '${name}' was refined to ${newName} (refresh to reset)`);
        const newElement = document.createElement(newName);
        newElement.innerHTML = oldElement.innerHTML;
        oldElement.replaceWith(newElement);
      });

      WebC.set(name, newName);

    } else {

      console.info(`Syncify: Web component '${name}' will be monkey patched during HOT Mode.`);

      methods.customElementDefine.call(customElements, name, constructor, options);
      WebC.set(name, name);

    }
  };

};
