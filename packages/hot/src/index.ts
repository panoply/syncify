import morph from 'morphdom';
import { LiteralUnion } from 'type-fest';
import { PatchWebComponents } from './patch';
import { Options } from './options';

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
       * Change the label style
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

(function syncify (options: Options) {

  if (!document) return;
  if (!window.syncify) window.syncify = Object.create(null);

  const parser = new DOMParser();
  const WebC = new Map();
  const errors = [];

  let isReady: boolean = false;
  let isConnected: boolean = false;
  let socket: WebSocket;
  let showLabel: boolean = options.label;
  let mode: LiteralUnion<'hot' | 'live' | 'refresh', string> = options.mode;
  let strategy: LiteralUnion<'hydrate' | 'replace', string> = options.strategy;
  let serverUrl: string = `http://localhost:${options.server}/`;
  let socketUrl: string = `ws://localhost:${options.socket}/ws`;

  Object.defineProperties(window.syncify, {
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
          } else if (p === 'label') {
            showLabel = options[p];
          } else if (p === 'mode') {
            mode = options[p];
          }
        }
      }
    }
  });

  /* -------------------------------------------- */
  /* CONSTANTS                                    */
  /* -------------------------------------------- */

  const morphs = {
    onBeforeElUpdated: function (fromEl: Element, toEl: Element) {

      if (fromEl.id === 'syncify-hot-label') return false;

      if (
        fromEl.tagName === 'SCRIPT' &&
        fromEl.hasAttribute('src') &&
        fromEl.getAttribute('src').startsWith(serverUrl)) return false;

      if (
        fromEl.tagName === 'LINK' &&
        fromEl.hasAttribute('href') &&
        fromEl.getAttribute('href').startsWith(serverUrl)) return false;

      if (fromEl.isEqualNode(toEl)) return false;

      return true;
    }
  };

  /* -------------------------------------------- */
  /* WEB COMPONENTS                               */
  /* -------------------------------------------- */

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
        display: showLabel ? 'flex' : 'none',
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
      dom.removeChild(node);
      node = undefined;
    };

    /**
     * Label Event
     */
    const event = (value?: string) => {
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

    const elements = dom.querySelectorAll<HTMLLinkElement>('link[rel=stylesheet]');

    for (let i = 0, s = elements.length; i < s; i++) {

      const node = elements[i];
      const href = node.getAttribute('href');
      if (assetMatch(href, uri)) node.setAttribute('href', serverUrl + params(href));

    }

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

      if (assetMatch(src, uri)) {

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

      }

    };

    return promises;

  };
  /**
   * Replace all asset paths
   */
  function assets (dom: Document) {

    stylesheets(dom);

    return Promise.allSettled(scripts(dom));

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

  const HOTBody = () => req(location.href, 'document').then((newDom: Document) => {

    assets(newDom).then(() => {

      if (strategy === 'hydrate') {
        morph(document.body, newDom.body, morphs);
      } else {
        document.body.replaceWith(newDom.body);
      }

      sections.load(document.body);
      label.mount(document.body);

    });

  });

  /**
   * Websockets Handler
   */
  function ws (socket: WebSocket) {

    let timeout: number = NaN;

    socket.addEventListener('close', () => {
      socket = null;
      isConnected = false;
      label.event('DISCONNECTED');
      setTimeout(websocket, 5000);
    });

    socket.addEventListener('open', () => {
      if (!isConnected) {
        isConnected = true;
        label.event(mode === 'hot' ? 'HOT' : 'LIVE');
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

    const PREFIX = mode === 'hot' ? 'HOT ' : 'LIVE ';

    socket.addEventListener('message', function ({ data }: { data: Data }) {

      if (data === 'connected') {

        if (!isConnected) {

          timer.start();
          label.event('Reconnecting');

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
        label.event(`${PREFIX} RELOAD`);

        if (!isNaN(timeout)) clearTimeout(timeout);

        return HOTBody().then(() => {
          label.event(`Reloaded in ${timer.stop()}`);
          timeout = NaN;
        });

      } else {

        timer.start();

        if (mode === 'live') {

          return req(location.href, 'document').then((newDom: Document) => {
            document.body.replaceWith(newDom.body);
            label.mount(document.body);
            label.event(`Reloaded in ${timer.stop()}`);
            timeout = NaN;
          });

        }

        const [ type, id, uuid ] = data.split(',');

        if (type === 'section') {

          const nodes = sections.get(id);

          if (nodes === null) {
            window.syncify.reload();
            return;
          }

          const uri = `${location.pathname}?sections=${id}`;
          nodes.length > 1
            ? label.event(`${nodes.length} ${PREFIX}SECTIONS`)
            : label.event(`${PREFIX}SECTION`);

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

            errors.push({
              title: 'XHR Error fetching section',
              description: `Section with id: ${id} failed to return a response from Shopify`,
              group: 'sections'
            });

            console.error('SYNCIFY: ', e);

          });

        } else if (type === 'script') {

          label.event(`${PREFIX}JavaScript: ${id}`);

          Promise.allSettled(scripts(document, id)).then(() => {
            socket.send(uuid);
            label.event(`Reloaded in ${timer.stop()}`);
          });

        } else if (type === 'stylesheet') {

          label.event(`${PREFIX}Stylesheet: ${id}`);

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
      get () {
        return errors;
      }
    },
    WebC: {
      get () {
        return WebC;
      }
    },
    connect: {
      value: connect
    },
    disconnect: {
      value: disconnect
    },
    sections: {
      value: sections
    },
    assets: {
      value () {
        return assets(document);
      }
    },
    refresh: {
      value () {
        return top.location.reload();
      }
    },
    reload: {
      value (callback?: (dom: Document) => void) {
        req(location.href, 'document').then((newDom: Document) => {

          if (strategy === 'hydrate') {

            assets(newDom).then(() => {
              morph(document.body, newDom.body, morphs);
              if (typeof callback === 'function') callback(document);
            });

          } else {
            document.body.replaceWith(newDom.body);
            if (typeof callback === 'function') callback(document);
          }

        });
      }
    }
  });

  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
      PatchWebComponents(WebC);
    }
  });

})({
  label: true,
  server: 3000,
  socket: 8089,
  strategy: 'hydrate',
  mode: 'hot'
});
