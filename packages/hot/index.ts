import morph from 'morphdom';
import { LiteralUnion } from 'type-fest';

interface Options {
  /**
   * The Server URL
   */
  server?: number;
  /**
   * The Websocket url
   */
  socket?: number;
  /**
   * The reload strategy
   */
  strategy?: LiteralUnion<'hydrate' | 'replace', string>;
  /**
   * The reload method
   */
  method?: LiteralUnion<'hot' |'refresh', string>
}

declare global {

  export interface Window {
    syncify: {
      /**
       * Connect Syncify
       */
      connect?: (options?: Options) => void;
       /**
       * Disconnect Syncify
       */
      disconnect?: () => void;
      /**
       * Check to see if Syncify is ready or not
       */
      isReady: boolean;
      /**
       * Whether or not the websocket is connected
       */
      isConnected: boolean;
      /**
       * A set of web components registered in the DOM.
       */
      WebC?: Map<string, string>;
      /**
       * The current options used
       */
      options?: Options;
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

(function Syncify (options: Options) {

  if (!document) return;
  if (!window.syncify) window.syncify = Object.create(null);

  const parser = new DOMParser();
  const WebC = new Map();

  let isReady: boolean = false;
  let isConnected: boolean = false;
  let socket: WebSocket;
  let strategy: LiteralUnion<'hydrate' | 'replace', string> = options.strategy;
  let method: LiteralUnion<'hot' |'refresh', string> = options.method;
  let serverUrl: string = `http://localhost:${options.server}/`;
  let socketUrl: string = `ws://localhost:${options.socket}/ws`;

  Object.defineProperties(window.syncify, {
    isReady: {
      get () {
        return isReady;
      }
    },
    isConnected: {
      get () {
        return isConnected;
      }
    },
    errors: {
      value: []
    },
    WebC: {
      get () {
        return WebC;
      }
    },
    options: {
      get () {
        return options;
      },
      set (config) {
        for (const p in options) {
          if (!(p in options)) continue;
          options[p] = config[p];
          if (p === 'server') {
            serverUrl = `http://localhost:${options[p]}/`;
          } else if (p === 'socket') {
            socketUrl = `ws://localhost:${options.socket}/ws`;
          } else if (p === 'strategy') {
            strategy = options[p];
          } else if (p === 'method') {
            method = options[p];
          }
        }
      }
    }
  });

  /* -------------------------------------------- */
  /* VIRTUAL NODE                                 */
  /* -------------------------------------------- */

  // const zap = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>');

  // const setting = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>');

  // const refresh = m.trust('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-cw"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>');

  // const logo = '<svg fill="currentColor" width="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92"><path d="M45.6607 0h45.62v26.07h-45.62c-5.1825.0079-10.1505 2.0703-13.8151 5.7349-3.6647 3.6646-5.7269 8.6326-5.7349 13.8152-.0768 4.8168 1.7153 9.4761 5 13H1.76071c-1.191519-4.2298-1.7839619-8.6057-1.76001194-13 0-5.9896 1.17974194-11.9206 3.47186194-17.4543 2.29212-5.5336 5.65171-10.5616 9.88704-14.7969 4.2353-4.23528 9.2633-7.59491 14.7969-9.88703C33.6902 1.18976 39.6211.0100098 45.6107.0100098L45.6607 0Zm0 91.23H.050716V65.17H45.6607c5.1826-.0079 10.1506-2.0702 13.8152-5.7348s5.7269-8.6326 5.7348-13.8151c.0769-4.8169-1.7152-9.4762-5-13h29.32c1.1916 4.2297 1.784 8.6057 1.7601 13 .0013 5.9912-1.1779 11.924-3.47 17.4595-2.2922 5.5355-5.6525 10.5651-9.8889 14.8016-4.2365 4.2364-9.2661 7.5967-14.8016 9.8889-5.5355 2.2921-11.4683 3.4713-17.4596 3.47l-.01-.0101Z" fill="#4DBB73"/></svg>';

  /* -------------------------------------------- */
  /* CONSTANTS                                    */
  /* -------------------------------------------- */

  const morphs = {
    onBeforeElUpdated: function (fromEl: Element, toEl: Element) {
      if (fromEl.id === 'syncify-hot-label') return false;
      if (fromEl.tagName === 'SCRIPT' && fromEl.hasAttribute('src')) return false;
      if (fromEl.isEqualNode(toEl)) return false;
      return true;
    }
  };

  /* -------------------------------------------- */
  /* WEB COMPONENTS                               */
  /* -------------------------------------------- */

  function PatchWebComponents () {

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

  /* -------------------------------------------- */
  /* UTILITIES                                    */
  /* -------------------------------------------- */

  /**
   * Mithril Component - Renders the virutal label
   */
  const label = (function () {

    /**
     * Virtual DOM Element
     */
    let node: HTMLElement;

    /**
     * Mount Label
     */
    const mount = (dom: HTMLElement) => {

      if (method === 'refresh') return;
      if (node instanceof Element && dom.contains(node)) return;

      const parent = document.createElement('div');

      parent.id = 'syncify-hot-label';

      node = document.createElement('span');

      Object.assign(parent.style, <CSSStyleDeclaration>{
        position: 'fixed',
        left: '0',
        bottom: '0',
        right: '0',
        margin: '0 auto',
        display: 'flex',
        color: '#fff',
        zIndex: '2147483647',
        fontFamily: 'system-ui',
        letterSpacing: 'normal',
        fontWeight: '500',
        textAlign: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        fontSize: '10px',
        userSelect: 'none'
      });

      Object.assign(node.style, <CSSStyleDeclaration>{
        padding: '5px 10px 6px 28px',
        backgroundColor: '#000',
        borderRadius: '5px 5px 0 0',
        backgroundPosition: '8px center',
        backgroundSize: '12px',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(data:image/svg+xml,%3Csvg%20fill%3D%22currentColor%22%20width%3D%2212px%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2092%2092%22%3E%3Cpath%20d%3D%22M45.6607%200h45.62v26.07h-45.62c-5.1825.0079-10.1505%202.0703-13.8151%205.7349-3.6647%203.6646-5.7269%208.6326-5.7349%2013.8152-.0768%204.8168%201.7153%209.4761%205%2013H1.76071c-1.191519-4.2298-1.7839619-8.6057-1.76001194-13%200-5.9896%201.17974194-11.9206%203.47186194-17.4543%202.29212-5.5336%205.65171-10.5616%209.88704-14.7969%204.2353-4.23528%209.2633-7.59491%2014.7969-9.88703C33.6902%201.18976%2039.6211.0100098%2045.6107.0100098L45.6607%200Zm0%2091.23H.050716V65.17H45.6607c5.1826-.0079%2010.1506-2.0702%2013.8152-5.7348s5.7269-8.6326%205.7348-13.8151c.0769-4.8169-1.7152-9.4762-5-13h29.32c1.1916%204.2297%201.784%208.6057%201.7601%2013%20.0013%205.9912-1.1779%2011.924-3.47%2017.4595-2.2922%205.5355-5.6525%2010.5651-9.8889%2014.8016-4.2365%204.2364-9.2661%207.5967-14.8016%209.8889-5.5355%202.2921-11.4683%203.4713-17.4596%203.47l-.01-.0101Z%22%20fill%3D%22%234DBB73%22%2F%3E%3C%2Fsvg%3E)'
      });

      if (window.syncify && typeof window.syncify.style !== 'object') {
        window.syncify.style = {
          parent: (style: Partial<CSSStyleDeclaration>) => Object.assign(parent.style, style),
          label: (style: Partial<CSSStyleDeclaration>) => Object.assign(node, style)
        };
      }

      parent.appendChild(node);
      dom.append(parent);

    };

    /**
     * Unmount and remove label
     */
    const unmount = (dom: HTMLElement) => {
      if (method === 'refresh') return;
      dom.removeChild(node);
      node = undefined;
    };

    /**
     * Label Event
     */
    const event = (value?: string) => {
      if (method === 'refresh') return;
      if (value !== undefined) {
        node.innerText = value;
      }
    };

    return {
      get node () { return node; },
      event,
      mount,
      unmount
    };

  })();

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
        }, 6000);

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
   * Shopify Sections
   */
  const sections = (function (map: { [id: string]: string[] }) {

    return {
      list: () => {
        return Object.keys(map).length > 0 ? map : null;
      },
      get: (id: string) => {

        if (id in map) {
          return document.body.querySelectorAll<HTMLElement>(map[id].join(','));
        }

        return null;

      },
      load: (dom: HTMLElement = document.body) => {

        map = {};

        const elements = dom.querySelectorAll('.shopify-section');

        if (!elements) return null;

        for (let i = 0, s = elements.length; i < s; i++) {

          const { id } = elements[i];

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

            continue;
          }

          const selector = `#${id}`;

          if (!(prop in map)) {
            map[prop] = [ selector ];
          } else if (map[prop].indexOf(selector) < 0) {
            map[prop].push(selector);
          }

        };

        console.log('Sections', map);

        return map;

      }
    };

  })({});

  /* -------------------------------------------- */
  /* SECTIONS                                     */
  /* -------------------------------------------- */

  const onloads = (function () {

    let href: string = '';

    const observer = new MutationObserver(function () {
      if (location.href !== href) {
        href = location.href;
        setTimeout(() => sections.load(), 250);
      }
    });

    return observer;

  })();

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

      if (assetMatch(href, uri)) {
        node.setAttribute('href', options.server + params(href));
      }

    });

    return dom;

  };

  /**
   * Asset scripts - Selects all `<script src="*">` nodes and clones the
   * tags then replaces the current elements with the newer ones.
   */
  function scripts (dom: Document | HTMLHeadElement, uri?: string) {

    const elements = dom.querySelectorAll<HTMLScriptElement>('script[src]');
    const promises: Promise<unknown>[] = [];

    for (let i = 0, s = elements.length; i < s; i++) {

      const node = elements[i];
      const src = node.getAttribute('src');

      if (!assetMatch(src, uri)) continue;

      const promise = new Promise((resolve, reject) => {

        const script = document.createElement('script');
        script.setAttribute('src', serverUrl + params(src));
        const attrs = Array.from(node.attributes);

        for (const attr of attrs) {
          if (attr.nodeName !== 'src') {
            script.setAttribute(attr.nodeName, attr.nodeValue);
          }
        }

        script.onload = () => {
          resolve(src);
        };

        script.onerror = (e) => {
          console.error('Syncify: Failed to HOT Reload script:', e);
          reject(new Error('HOT Script Error'));
        };

        node.replaceWith(script);

      });

      promises.push(promise);

    };

    return promises;

  };
  /**
   * Replace all asset paths
   */
  function assets (dom: Document) {

    stylesheets(dom);
    scripts(dom);

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
      xhr.open('GET', uri, true);
      xhr.setRequestHeader('x-syncify-hot', 'true');
      xhr.onload = () => resolve(xhr.response);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();

    });

  };

  function websocket () {
    if (isConnected === true) return;
    socket = new WebSocket(socketUrl);
    ws(socket);
  }

  const HOTBody = () => req(location.href, 'document').then((doc: Document) => {

    const newDom = assets(doc);

    if (strategy === 'hydrate') {
      morph(document.body, newDom.body, morphs);
    } else {
      document.body.replaceWith(newDom.body);
    }

    sections.load(document.body);
    label.mount(document.body);

  });

  /**
   * Websockets Handler
   */
  function ws (socket: WebSocket) {

    let timeout: number = NaN;

    socket.addEventListener('close', () => {
      socket = null;
      isConnected = false;
      onloads.disconnect();
      label.event('DISCONNECTED');
      setTimeout(websocket, 5000);
    });

    socket.addEventListener('open', () => {
      if (!isConnected) {
        isConnected = true;
        label.event('HOT');
      }
    });

    type Data = LiteralUnion<
      'connected' |
      'disconnect'|
      'reload' |
      'replace' |
      'script' |
      'style' |
      'section',
      string
    >

    socket.addEventListener('message', function ({ data }: { data: Data }) {

      if (data === 'connected') {

        if (!isConnected) {

          timer.start();
          label.event('Reconnecting');
          onloads.observe(null);

          return HOTBody().then(() => {
            label.event(`Reconnected in ${timer.stop()}`);
            isConnected = true;
          });
        }

      } else if (data === 'disconnect') {

        isConnected = false;
        label.event('SYNCIFY DISCONNECTED');

      } else if (data === 'reload') {

        label.event('Refresh');

        return top.location.reload();

      } else if (data === 'replace') {

        timer.start();
        label.event('HOT RELOAD');

        if (!isNaN(timeout)) clearTimeout(timeout);

        return HOTBody().then(() => {
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
            ? label.event(`${nodes.length} HOT SECTIONS`)
            : label.event('HOT SECTION');

          return req(uri, 'json').then((value: Record<string, string>) => {

            if (options.strategy === 'hydrate') {

              nodes.forEach(node => morph(node, value[id], {
                childrenOnly: true,
                onBeforeElUpdated: (fromEl: Element, toEl: Element) => !fromEl.isEqualNode(toEl)
              }));

            } else {

              nodes.forEach(node => {
                const newDom = parser.parseFromString(value[uri], 'text/html').body;
                node.replaceWith(newDom.firstElementChild);
              });

            }

            label.event(`Reloaded "${id}" in ${timer.stop()}`);

          }).catch(e => {

            window.syncify.errors.push({
              title: 'XHR Error fetching section',
              description: `Section with id: ${id} failed to return a response from Shopify`,
              group: 'sections'
            });

            console.error('SYNCIFY: ', e);

          });

        } else if (type === 'script') {

          label.event(`HOT JavaScript: ${id}`);

          Promise.allSettled(scripts(document, id)).then(() => {
            socket.send(uuid);
            label.event(`Reloaded in ${timer.stop()}`);
          });

        } else if (type === 'stylesheet') {

          label.event(`HOT Stylesheet: ${id}`);

          stylesheets(document, id);

          socket.send(uuid);
          label.event(`Reloaded in ${timer.stop()}`);

        }
      }

    });

  }

  function disconnect () {

    const curDom = document.body;

    if (isReady) {

      isReady = false;

      if (socket) {
        isConnected = false;
        socket.close();
      }

      label.unmount(curDom);

    }

    return curDom;

  }
  /**
   * Connect Syncify
   */
  function connect (config?: Options) {

    if (document.readyState !== 'complete') {

      document.addEventListener('DOMContentLoaded', () => connect(config));

    } else {

      const curDom = isReady ? disconnect() : document.body;

      if (typeof config === 'object') window.syncify.options = config;

      sections.load(curDom);
      label.mount(curDom);
      isReady = true;
      websocket();

    }
  }

  /* -------------------------------------------- */
  /* EXPOSED METHODS                              */
  /* -------------------------------------------- */

  window.syncify.connect = connect;
  window.syncify.disconnect = disconnect;
  window.syncify.sections = sections;
  window.syncify.assets = () => assets(document);
  window.syncify.refresh = () => top.location.reload();
  window.syncify.reload = () => req(location.href, 'text').then((doc: string) => {

    const { body } = document;
    const dom = parser.parseFromString(doc, 'text/html');

    if (strategy === 'hydrate') {
      morph(body, assets(dom).body, morphs);
    } else {
      body.replaceWith(dom.body);
    }
  });

  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
      PatchWebComponents();
    }
  });

})({
  server: 3000,
  socket: 8089,
  strategy: 'hydrate',
  method: 'hot'
});
