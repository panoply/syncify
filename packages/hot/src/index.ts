import m from 'mithril';
import morph from 'morphdom';
import { LiteralUnion } from 'type-fest';

declare global {

  export interface Window {
    syncify: {
      /**
       * Check to see if Syncify is ready or not
       */
      ready: boolean;
      /**
       * Whether or not the websocket is connected
       */
      connected: boolean;
      /**
       * A set of web components registered in the DOM.
       */
      webcomponents: Map<string, string>;
      /**
       * List of errors encountered
       */
      errors?: Array<{
        /**
         * Error title
         */
        title: string;
        /**
         * Description
         */
        description: string;
        /**
         * Group
         */
        group: string;
      }>
      /**
       * Page section maps
       */
      sections?: {
        /**
         * Returns the object where section ids are properties
         * and the values are an array list of dynamic applied ids.
         * Returns `null` if no section exist.
         */
        list: () => { [id: string]: string[]; };
        /**
         * Method for loading section id maps. Helpful when executing
         * OTW (Over the wire) page replacements like SPX. When invoked,
         * it will obtains all the section ids in the document body.
         *
         * This is called at runtime in HOT mode. Returns the object map
         * of matches of `null` if no sections exist.
         */
        load: (dom?: HTMLElement) => { [id: string]: string[]; };
        /**
         * Returns all elements matching the provided `id` which is obtained
         * via the websocket `data` parameter. Query Selects all matches. If
         * no matches are found, returns null.
         */
        get: (id: string) => NodeListOf<HTMLElement>;

      };
      /**
       * Full page refresh
       */
      refresh?: () => void;
     /**
       * Full page refresh
       */
      history?: {
        /**
         * Returns a specific stack reference
         */
        get: (stack: number) => HTMLCanvasElement;
        /**
         * List all history changes (max is last `10` changes)
         */
        list: () => HTMLCanvasElement[];
        /**
         * Clear all changes
         */
        clear: () => void;
      }
      /**
       * HOT reload entire page
       */
      reload?: () => void;
      /**
       * HOT Reloads all assets
       */
      assets?: () => void;
      /**
       * Change the vnode style
       */
      style?: {
        /**
         * The dynamic parent node
         */
        parent: (style: Partial<CSSStyleDeclaration>) => void;
        /**
         * The inner node which contains the event text
         */
        label: (style: Partial<CSSStyleDeclaration>) => void;
      }
    }
  }
}

(function syncify (opts: {
  server: string;
  socket: string;
  label: string;
  strategy: LiteralUnion<'hydrate' | 'replace', string>;
  scroll: LiteralUnion<'top' | 'preserved', string>;
  history: boolean;
  method: LiteralUnion<'hot' |'refresh', string>
}) {

  if (!document) return;

  window.syncify = window.syncify || {
    ready: false,
    connected: true,
    errors: [],
    webcomponents: new Map()
  };

  /* -------------------------------------------- */
  /* VIRTUAL NODE                                 */
  /* -------------------------------------------- */

  /**
   * Virtual DOM Element
   */
  const node = document.createElement('div');

  // const zap = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>');

  // const setting = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>');

  // const refresh = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-cw"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>');

  /**
   * Set label `id="syncify-hot-label-status"`
   */
  node.id = 'syncify-hot-label-status';

  /* -------------------------------------------- */
  /* SOCKET                                       */
  /* -------------------------------------------- */

  function websocket () {

    const socket = new WebSocket(`ws://localhost:${opts.socket}/ws`);

    ws(socket);

  }

  websocket();

  /* -------------------------------------------- */
  /* CONSTANTS                                    */
  /* -------------------------------------------- */

  const server = `http://localhost:${opts.server}/`;
  const parser = new DOMParser();
  const morphs = {
    onBeforeElUpdated: function (fromEl: Element, toEl: Element) {
      if (fromEl.id === 'syncify-hot-label-status') return false;
      if (fromEl.tagName === 'SCRIPT' && fromEl.hasAttribute('src')) return false;
      if (fromEl.isEqualNode(toEl)) return false;
      return true;
    }
  };

  /* -------------------------------------------- */
  /* SECTIONS                                     */
  /* -------------------------------------------- */

  const sections = (function (map: { [id: string]: string[] }) {

    return {
      list: () => {
        return Object.keys(map).length > 0 ? map : null;
      },
      get: (id: string) => {
        if (id in map) return document.body.querySelectorAll<HTMLElement>(map[id].join(','));
        return null;
      },
      load: (dom: HTMLElement = document.body) => {

        map = {};

        const elements = dom.querySelectorAll('.shopify-section');

        if (!elements) return null;

        elements.forEach(({ id }) => {

          /**
           * Capture dynamic section ids, for example:
           *
           * ```js
           * // Generated ID
           * 'shopify-section-template--16744901378289__image_banner'
           *
           * // Capturing ID
           * '16744901378289__image_banner'
           *
           * // Referenced ID
           * 'image_banner'
           * ```
           *
           */
          const match = (/[0-9]+_{2}[\w-]+$/).exec(id);

          /**
           * Represents the section id without prefix
           */
          let prop: string;

          if (match !== null) {

            prop = match[0].slice(match[0].indexOf('__') + 2);

          } else if (id.startsWith('shopify-section-')) {

            prop = id.slice(16); // remove the "shopify-section-" portion

          } else {

            window.syncify.errors.push({
              title: 'Unknown Section',
              description: `Syncify encountered an issue mapping the section id: ${id}`,
              group: 'section'
            });

            return null;

          }

          const selector = `#${id}`;

          if (!(prop in map)) {
            map[prop] = [ selector ];
          } else if (map[prop].indexOf(selector) < 0) {
            map[prop].push(selector);
          }

        });

        return map;

      }
    };

  })({});

  const webcomponents = function () {

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
      return window.syncify.webcomponents.has(selector) ? window.syncify.webcomponents.get(selector) : selector;
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

      if (window.syncify.webcomponents.has(name)) {

        const newName = `${name}-${uuid()}`;
        const oldName = window.syncify.webcomponents.get(name);

        methods.customElementDefine.call(customElements, newName, constructor, options);

        document.body.querySelectorAll(oldName).forEach(oldElement => {
          console.info(`Syncify: Web Component '${name}' was refined to ${newName} (refresh to reset)`);
          const newElement = document.createElement(newName);
          newElement.innerHTML = oldElement.innerHTML;
          oldElement.replaceWith(newElement);
        });

        window.syncify.webcomponents.set(name, newName);

      } else {

        console.info(`Syncify: Web component '${name}' will be monkey patched during HOT Mode.`);
        methods.customElementDefine.call(customElements, name, constructor, options);
        window.syncify.webcomponents.set(name, name);

      }
    };

  };

  /* -------------------------------------------- */
  /* HISTORY SNAPSHOTS                            */
  /* -------------------------------------------- */

  /* -------------------------------------------- */
  /* UTILITIES                                    */
  /* -------------------------------------------- */

  /**
   * Mithril Component - Renders the virutal label
   */
  const label = (function vnode () {

    /**
     * Local State Message
     */
    let state: string = 'Syncify Connected';

    /**
     * The dynamic nodes style - Exposed to user
     */
    const nodeStyle: Partial<CSSStyleDeclaration> = {
      position: 'fixed',
      left: '0',
      bottom: '0',
      right: '0',
      margin: '0 auto',
      display: 'flex',
      color: '#fff',
      zIndex: '2147483647',
      fontFamily: 'system-ui, sans-serif',
      fontWeight: '300',
      textAlign: 'center',
      textTransform: 'uppercase',
      justifyContent: 'space-around',
      alignItems: 'center',
      fontSize: '8px'
    };

    const childStyle: Partial<CSSStyleDeclaration> = {
      padding: '5px 12px',
      backgroundColor: '#232326',
      border: '0.8px solid transparent',
      borderRadius: '0',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
      borderBottom: '0'
    };

    const child = {
      view: () => m('div', {
        style: childStyle
      },
      state)
    };

    /**
     * Parent Style
     */
    Object.assign(node.style, nodeStyle);

    window.syncify.style = {
      parent: (style: Partial<CSSStyleDeclaration>) => {
        Object.assign(node.style, nodeStyle, style);
        m.redraw();
      },
      label: (style: Partial<CSSStyleDeclaration>) => {
        Object.assign(childStyle, style);
        m.redraw();
      }
    };

    /**
     * The Mithril component - Mounted to the dynamic node
     */
    m.mount(node, child);

    return {
      get node () {
        return node;
      },
      event: (label?: string) => {

        if (label !== undefined) state = label;

        m.redraw();
        return state;

      },
      render: (dom: HTMLElement) => {

        dom.append(node);

      }
    };

  }());

  /**
   * Execution Timer - Measures the ellapsed time of reloads
   */
  const timer = (function (mark: number[]) {

    let timeout: NodeJS.Timeout = null;

    return {
      start: () => {

        const time = performance.now();

        mark.push(time);

      },
      stop: () => {

        if (timeout !== null) {
          clearTimeout(timeout);
          timeout = null;
        }

        timeout = setTimeout(() => {
          label.event('HOT');
          timeout = null;
        }, 5000);

        const ms = (performance.now() - mark.pop());
        if (ms < 1000) return `${ms.toFixed(0)}ms`;

        const s = ms / 1000;
        if (s < 60) return `${s.toFixed(0)}s ${+ms.toFixed(0).slice(1)}ms`;

        const m = (s / 60).toFixed(0);
        return `${m}m ${(s - (60 * Number(m)))}s ${+ms.toFixed(0).slice(1)}ms`;
      }
    };

  })([]);

  /**
   * Assert new value hash so scripts reload
   */
  function params (url: string) {
    const p = url.lastIndexOf('/') + 1;
    const q = url.indexOf('?', p);
    return (q > -1 ? url.substring(p, q) : url.substring(p)) + '?v=' + Date.now();
  };

  /**
   * Asset src/href matcher - Swaps the remote origin with local
   */
  function assetMatch (src: string, uri: string) {

    if (typeof uri !== 'string') return false;

    return src.slice(src.lastIndexOf('/') + 1).startsWith(uri);

  };

  /**
   * Asset styles - Selects all `<link>` nodes and replaces the `href`
   * This is what allows for the HOT reload
   */
  function stylesheets (dom: Document, uri?: string) {

    dom.querySelectorAll('link[rel=stylesheet]').forEach((node) => {

      const href = node.getAttribute('href');

      if (!assetMatch(href, uri)) return;

      node.setAttribute('href', server + params(href));

    });

    return dom;

  };

  /**
   * Asset scripts - Selects all `<script src="*">` nodes and clones the
   * tags then replaces the current elements with the newer ones.
   */
  function scripts (dom: Document | HTMLHeadElement, uri?: string) {

    dom.querySelectorAll('script[src]').forEach((node) => {

      const href = node.getAttribute('src');

      if (!assetMatch(href, uri)) return;

      const script = document.createElement('script');
      script.setAttribute('src', server + params(href));

      for (const attr of Array.from(node.attributes)) {
        if (attr.nodeName !== 'src') {
          script.setAttribute(attr.nodeName, attr.nodeValue);
        }
      }

      node.replaceWith(script);

    });

    return dom;

  };
  /**
   * Replace all asset paths
   */
  function assets (dom: Document) {

    scripts(dom);
    stylesheets(dom);

    return dom;

  };

  /**
   * XHR Request - Reloads the page via XHR
   * and resolves the document as a string.
   */
  function req (uri: string, type: 'json' | 'text' | 'document') {

    return new Promise(function (resolve, reject) {

      const xhr = new XMLHttpRequest();

      xhr.responseType = type;
      xhr.open('GET', uri);
      xhr.setRequestHeader('X-Syncify-Hot-Request', 'true');
      xhr.onload = () => resolve(xhr.response);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();

    });

  };

  function ws (socket: WebSocket) {

    let timeout: number = NaN;

    socket.addEventListener('close', () => {
      socket = null;
      window.syncify.connected = false;
      label.event('Syncify Disconnected');
      setTimeout(websocket, 5000);
    });

    socket.addEventListener('open', () => {
      if (!window.syncify.connected) {
        window.syncify.connected = true;
        label.event('Syncify Connected');
      }
    });

    // status('Syncify Live (connected)');

    socket.addEventListener('message', function ({
      data
    }: {
      data: LiteralUnion<
        | 'connected'
        | 'disconnect'
        | 'reload'
        | 'replace'
        | 'script'
        | 'style'
        | 'section',
        string
      >
    }) {

      if (data === 'connected') {

        if (!window.syncify.connected) {

          timer.start();
          label.event('Reconnecting');

          return req(location.href, 'document').then((doc: Document) => {

            const newDom = assets(doc);

            if (opts.strategy === 'hydrate') {
              morph(document.body, newDom.body, morphs);
            } else {
              document.body.replaceWith(newDom.body);
            }

            sections.load(document.body);
            label.render(document.body);
            label.event(`Reconnected in ${timer.stop()}`);
            window.syncify.connected = true;

          });

        }

      } else if (data === 'disconnect') {

        window.syncify.connected = false;
        label.event('Syncify Disconnected');

      } else if (data === 'reload') {

        label.event('Refreshing');

        return top.location.reload();

      } else if (data === 'replace') {

        timer.start();
        label.event('Reloading');

        if (!isNaN(timeout)) clearTimeout(timeout);

        return req(location.href, 'document').then((doc: Document) => {

          const newDom = assets(doc);

          if (opts.strategy === 'hydrate') {
            morph(document.body, newDom.body, morphs);
          } else {
            document.body.replaceWith(newDom.body);
          }

          sections.load(document.body);
          label.render(document.body);

          label.event(`Reloaded in ${timer.stop()}`);

          timeout = NaN;
        });

      } else {

        timer.start();

        const [ type, id, uuid ] = data.split(',');

        if (type === 'section') {

          const nodes = sections.get(id);

          if (nodes === null) {
            window.syncify.reload();
            return;
          }

          const uri = `${location.pathname}?sections=${id}`;
          nodes.length > 1
            ? label.event(`Reloading ${nodes.length} Sections: ${id}`)
            : label.event(`Reloading Section: ${id}`);

          return req(uri, 'json').then((value: Record<string, string>) => {

            if (nodes === null) return;

            if (opts.strategy === 'hydrate') {

              const options = {
                childrenOnly: true,
                onBeforeElUpdated: function (fromEl: Element, toEl: Element) {
                  if (fromEl.tagName === 'SCRIPT') return true;
                  if (fromEl.isEqualNode(toEl)) return false;
                  return true;
                }
              };

              nodes.forEach(node => morph(node, value[id], options));

            } else {

              nodes.forEach(node => {
                const { firstElementChild } = parser.parseFromString(value[uri], 'text/html').body;
                node.replaceWith(firstElementChild);
              });

            }

            label.event(`Reloaded in ${timer.stop()}`);

          }).catch(e => {

            window.syncify.errors.push({
              title: 'XHR Error fetching section',
              description: `Section with id: ${id} failed to return a response from Shopify`,
              group: 'sections'
            });

            console.error('SYNCIFY: ', e);

          });

        } else if (type === 'script') {

          label.event(`Reloading JavaScript: ${id}`);

          scripts(document, id);

          socket.send(uuid);
          label.event(`Reloaded in ${timer.stop()}`);

        } else if (type === 'stylesheet') {

          label.event(`Reloading Stylesheet: ${id}`);

          stylesheets(document, id);

          socket.send(uuid);
          label.event(`Reloaded in ${timer.stop()}`);

        }
      }

    });

  }

  /* -------------------------------------------- */
  /* EXPOSED METHODS                              */
  /* -------------------------------------------- */

  window.syncify.sections = sections;
  window.syncify.assets = () => assets(document);
  window.syncify.refresh = () => top.location.reload();
  window.syncify.reload = () => req(location.href, 'text').then((doc: string) => {

    const dom = parser.parseFromString(doc, 'text/html');

    if (opts.strategy === 'hydrate') {
      morph(document.body, assets(dom).body, morphs);
    } else {
      document.body.replaceWith(dom.body);
    }

    sections.load(document.body);
    label.render(document.body);

  });

  /* -------------------------------------------- */
  /* RENDER VNODE                                 */
  /* -------------------------------------------- */

  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
      webcomponents();
      console.warn('Syncify: Web Component occurances will trigger monkey patches in HOT Mode.');
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    sections.load(document.body);
    label.render(document.body);
    window.syncify.ready = true;
  });

}({
  server: '{{- server | default: 3000 -}}',
  socket: '{{- socket | default: 8089 -}}',
  label: '{{- label | default: "visible" -}}',
  history: Boolean('{{- history | default: false -}}'),
  method: '{{- method | default: "hot" -}}',
  scroll: '{{- scroll | default: "preserved" -}}',
  strategy: '{{- strategy | default: "hydrate" -}}'
}));
