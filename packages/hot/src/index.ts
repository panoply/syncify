import morph from 'morphdom';
import { LiteralUnion } from 'type-fest';

import { Options } from './options';
import { PatchWebComponents } from './patch';

export type Alias = {
  [template: string]: {
    [section: string]: string[]
  }
}

declare global {

 export const VERSION: string;

  export interface Window {
    Shopify: {
      theme: {
        /**
         * Shopify theme id
         */
        id: number;
        /**
         * Shopify theme name
         */
        name: string;
        /**
         * Shopify theme role
         */
        role: 'main' | 'unpublished'
      }
    }
    syncify: {
      /**
       * The HOT Module version number
       */
      version?: string;
      /**
       * Returns the current `template` name according to Liquid objects
       */
      get template(): string;
      /**
       * Connect Syncify
       */
      connect?: (options?: Options) => void;
       /**
       * Disconnect Syncify
       */
      disconnect?: () => void;
       /**
       * Sends a message to the server of websocket to informs upon the current template.
       * In most cases, this will be dispatched automatically, but in some cases you may
       * control the rendering cycle and need to issue this programmatically.
       */
      route?: (params?: { directory: string; template: string; }) => void;
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
        list: () => {
          /**
           * Map holds the dynamic identifiers
           */
          map: {
            [id: string]: string[];
          },
          /**
           * Alias is template defined sections
           */
          alias: {
            [template: string]: {
              [section: string]: string[];
            }
          }
        }
        /**
         * Method for loading section id maps. Helpful when executing
         * OTW (Over the wire) page replacements like SPX. When invoked,
         * it will obtains all the section ids in the document body.
         *
         * This is called at runtime in HOT method. Returns the object map
         * of matches of `null` if no sections exist.
         */
        load: (dom?: HTMLElement) => { [id: string]: string[]; };
        /**
         * Returns all elements matching the provided `id` which is obtained
         * via the websocket `data` parameter. Query Selects all matches. If
         * no matches are found, returns null.
         */
        get: (id: string[]) => NodeListOf<HTMLElement>;

      };
      /**
       * Full page refresh
       */
      refresh?: () => void;
      /**
       * HOT reloads the `<body>`
       */
      reload?: (callback?: (dom: Document) => void) => void;
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
  if (!window.syncify) {
    window.syncify = Object.create(null);
    window.syncify.version = VERSION;
  }

  const WebC = new Map();
  const errors = [];
  const flags: Options['flags'] = {
    'no-preview-bar': false,
    'no-checkout-preloads': false,
    'no-perfkit': false,
    'no-shopify-features': false,
    'no-trekkie': false,
    'no-web-pixels-manager': false
  };

  let isReady: boolean = false;
  let alias: Alias = {};
  let isConnected: boolean = false;
  let timeout: any = NaN;
  let retrying: number = 0;
  let socket: WebSocket;
  let template: string;
  let showLabel: boolean = options.label;
  let method: LiteralUnion<'hot' | 'live' | 'refresh', string> = options.method;
  let serverUrl: string = `http://localhost:${options.server}/`;
  let socketUrl: string = `ws://localhost:${options.socket}/ws`;

  Object.defineProperty(window.syncify, 'options', {
    get () { return options; },
    set (config) {
      for (const p in options) {
        if (!(p in options)) continue;
        options[p] = config[p];
        if (p === 'server') {
          serverUrl = `http://localhost:${options[p]}/`;
        } else if (p === 'socket') {
          socketUrl = `ws://localhost:${options.socket}/ws`;
        } else if (p === 'label') {
          showLabel = options[p];
        } else if (p === 'method') {
          method = options[p];
        } else if (p === 'flags') {
          Object.assign(flags, options[p]);
        }
      }
    }
  });

  const morphs = {
    onBeforeNodeDiscarded (node: Element) {

      // Prevent injections from morphing
      //
      return !(
        (
          node.id === 'syncify-hot-label' ||
          node.id === 'syncify-hot-style'
        )
      );

    },
    onBeforeElUpdated (fromEl: Element, toEl: Element) {

      // Prevent injections from morphing
      //
      return !((
        (
          fromEl.id === 'syncify-hot-label'
        ) || (
          fromEl.id === 'syncify-hot-style'
        ) || (
          fromEl.tagName === 'SCRIPT' &&
          fromEl.hasAttribute('src') &&
          fromEl.getAttribute('src').startsWith(serverUrl)
        ) || (
          fromEl.tagName === 'LINK' &&
          fromEl.hasAttribute('href') &&
          fromEl.getAttribute('href').startsWith(serverUrl)
        ) || (
          fromEl.tagName !== 'SCRIPT' &&
          fromEl.isEqualNode(toEl)
        )
      ));

    }
  };

  /* -------------------------------------------- */
  /* UTILITIES                                    */
  /* -------------------------------------------- */
  const logo = (color: string) => `url("data:image/svg+xml,%3Csvg%20fill%3D%22currentColor%22%20width%3D%2212px%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2092%2092%22%3E%3Cpath%20d%3D%22M45.6607%200h45.62v26.07h-45.62c-5.1825.0079-10.1505%202.0703-13.8151%205.7349-3.6647%203.6646-5.7269%208.6326-5.7349%2013.8152-.0768%204.8168%201.7153%209.4761%205%2013H1.76071c-1.191519-4.2298-1.7839619-8.6057-1.76001194-13%200-5.9896%201.17974194-11.9206%203.47186194-17.4543%202.29212-5.5336%205.65171-10.5616%209.88704-14.7969%204.2353-4.23528%209.2633-7.59491%2014.7969-9.88703C33.6902%201.18976%2039.6211.0100098%2045.6107.0100098L45.6607%200Zm0%2091.23H.050716V65.17H45.6607c5.1826-.0079%2010.1506-2.0702%2013.8152-5.7348s5.7269-8.6326%205.7348-13.8151c.0769-4.8169-1.7152-9.4762-5-13h29.32c1.1916%204.2297%201.784%208.6057%201.7601%2013%20.0013%205.9912-1.1779%2011.924-3.47%2017.4595-2.2922%205.5355-5.6525%2010.5651-9.8889%2014.8016-4.2365%204.2364-9.2661%207.5967-14.8016%209.8889-5.5355%202.2921-11.4683%203.4713-17.4596%203.47l-.01-.0101Z%22%20fill%3D%22%23${color}%22%2F%3E%3C%2Fsvg%3E")`;

  function v (tag: string, className: string, styles?: Partial<CSSStyleDeclaration>) {

    const element = document.createElement(tag);
    element.className = className;

    if (styles) Object.assign(element.style, styles);

    return element;

  };

  function RuntimeFlags (dom: Document) {

    requestAnimationFrame(() => {
      dom.body.querySelector<HTMLIFrameElement>('#PBarNextFrameWrapper').remove();
      dom.documentElement.style.removeProperty('padding-bottom');
    });

    const selectors: string[] = [];

    if (flags['no-trekkie']) {
      selectors.push('script[src*=syncify\\.myshopify\\.com\\/cdn\\/s\\/trekkie\\.storefront]');
    }

    if (flags['no-web-pixels-manager']) {
      selectors.push(
        'script[src*=syncify\\.myshopify\\.com\\/cdn\\/wpm\\/]',
        'script#web-pixels-manager-setup'
      );
    }

    if (flags['no-perfkit']) {
      selectors.push('script[src*=syncify\\.myshopify\\.com\\/cdn\\/shopifycloud\\/perf-kit\\/]');
    }

    if (flags['no-checkout-preloads']) {
      selectors.push('script[src*=\\/checkouts\\/internal\\/preloads\\.js]');
    }

    if (flags['no-shopify-features']) {
      selectors.push(
        'script#shopify-features',
        'script[data-source-attribution="shopify.loadfeatures"]'
      );
    }

    if (selectors.length === 0) return;

    const match = dom.head.querySelectorAll<HTMLScriptElement>(selectors.join());

    if (!match) return;

    match.forEach(script => {

      script.remove();

      if (script.src.indexOf('/cdn/wpm') > -1) {
        console.error(`HOT --no-web-pixels-manager: ${script.src} (BLOCKED)`);
      } else if (script.id === 'web-pixels-manager-setup') {
        console.error(`HOT --no-web-pixels-manager: ${script.id} (BLOCKED)`);
      } else if (script.id === 'shopify-features') {
        console.error(`HOT --no-shopify-features: ${script.id} (BLOCKED)`);
      } else if (script.src.indexOf('/perf-kit') > -1) {
        console.error(`HOT --no-perf-kit: ${script.src} (BLOCKED)`);
      } else if (script.src.indexOf('/trekkie') > -1) {
        console.error(`HOT --no-trekkie: ${script.src} (BLOCKED)`);
      } else if (script.src.indexOf('/checkouts/internal') > -1) {
        console.error(`HOT --no-checkout-preloads: ${script.src} (BLOCKED)`);
      } else if (script.hasAttribute('data-source-attribution')) {
        console.error(`HOT --no-source-attribution: ${script.getAttribute('data-source-attribution')} (BLOCKED)`);
      } else if (script.src.indexOf('/storefront/bars') > -1) {
        console.error(`HOT --no-preview-bar: ${script.src} (BLOCKED)`);
      }

    });

  }

  function addEvent (target: HTMLElement | Document, events:(string | ((e: any) => void))[][]) {
    for (const [ event, handler ] of events) {
      target.addEventListener(event as any, handler as any);
    }
  }

  function removeEvent (target: HTMLElement | Document, events: (string | ((e: any) => void))[][]) {
    for (const [ event, handler ] of events) {
      target.removeEventListener(event as any, handler as any);
    }
  }

  function dragLabel (parent: any) {
    let isDragging = false;
    let initialX: number;
    let initialY: number;

    const updateBorderRadius = () => {
      const rect = parent.getBoundingClientRect();
      const RADIUS = '6px';
      const NO_RADIUS = '0px';
      const edges = {
        top: rect.top <= 6,
        bottom: rect.bottom >= window.innerHeight - 6,
        left: rect.left <= 6,
        right: rect.right >= window.innerWidth - 6
      };

      // Calculate border radius for each corner: top-left, top-right, bottom-right, bottom-left
      let borderRadius: string;

      if (edges.top && edges.left) {
        borderRadius = `${NO_RADIUS} ${RADIUS} ${RADIUS} ${RADIUS}`;
      } else if (edges.top && edges.right) {
        borderRadius = `${RADIUS} ${NO_RADIUS} ${RADIUS} ${RADIUS}`;
      } else if (edges.bottom && edges.left) {
        borderRadius = `${RADIUS} ${RADIUS} ${RADIUS} ${NO_RADIUS}`;
      } else if (edges.bottom && edges.right) {
        borderRadius = `${RADIUS} ${RADIUS} ${NO_RADIUS} ${RADIUS}`;
      } else if (edges.top) {
        borderRadius = `${NO_RADIUS} ${NO_RADIUS} ${RADIUS} ${RADIUS}`;
      } else if (edges.bottom) {
        borderRadius = `${RADIUS} ${RADIUS} ${NO_RADIUS} ${NO_RADIUS}`;
      } else if (edges.left) {
        borderRadius = `${NO_RADIUS} ${RADIUS} ${RADIUS} ${NO_RADIUS}`;
      } else if (edges.right) {
        borderRadius = `${RADIUS} ${NO_RADIUS} ${NO_RADIUS} ${RADIUS}`;
      } else {
        borderRadius = `${RADIUS} ${RADIUS} ${RADIUS} ${RADIUS}`;
      }

      parent.querySelector('span').style.borderRadius = borderRadius;

    };

    const setPosition = (x: number, y: number) => {

      const rect = parent.getBoundingClientRect();

      parent.style.left = `${Math.min(Math.max(x, 0), window.innerWidth - rect.width)}px`;
      parent.style.top = `${Math.min(Math.max(y, 0), window.innerHeight - rect.height)}px`;

      updateBorderRadius();

    };

    const setInitialPosition = () => {

      // Ensure the element is visible first
      parent.style.visibility = 'hidden';

      // Get dimensions after element is visible
      const rect = parent.getBoundingClientRect();

      // Calculate center-bottom position
      const x = (window.innerWidth - rect.width) / 2;
      const y = window.innerHeight - rect.height;

      // Set position and make visible
      setPosition(x, y);

      parent.style.visibility = 'visible';

    };

    const dragStart = (e: any) => {
      const rect = parent.getBoundingClientRect();
      initialX = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      initialY = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      isDragging = e.target === parent || parent.contains(e.target);
    };

    const drag = (e: any) => {

      if (!isDragging) return;

      e.preventDefault();

      setPosition(
        (e.touches ? e.touches[0].clientX : e.clientX) - initialX,
        (e.touches ? e.touches[0].clientY : e.clientY) - initialY
      );
    };

    const dragEnd = () => { isDragging = false; };

    const events = [
      [ 'mousedown', dragStart ],
      [ 'mousemove', drag ],
      [ 'mouseup', dragEnd ],
      [ 'touchstart', dragStart ],
      [ 'touchmove', drag ],
      [ 'touchend', dragEnd ]
    ];

    addEvent(document, events);
    addEvent(parent, events.filter(([ e ]) => e !== 'mousemove' && e !== 'touchmove'));

    const resizeHandler = () => setInitialPosition();

    window.addEventListener('resize', resizeHandler);

    requestAnimationFrame(() => setInitialPosition());

    return () => {
      removeEvent(document, events);
      window.removeEventListener('resize', resizeHandler);
    };
  }

  function Template () {

    template = '{%-if template.directory-%}{{-template.directory-}}/{%-endif-%}{{-template.name-}}';

    return template;

  }

  const label = (function () {

    /**
     * Virtual DOM Element
     */
    let node: HTMLElement;

    /**
     * Move callback
     */
    let move: () => void;

    /**
     * Mount Label
     */
    const mount = (dom: HTMLElement) => {

      if (node instanceof Element && dom.contains(node)) return;

      const parent = v('div', 'sy__hot-label');

      node = v('span', 'sy__hot-label-inner', { backgroundImage: logo('4DBB73') });

      // #C11E62

      if (window.syncify && typeof window.syncify.style !== 'object') {

        window.syncify.style = Object.create(null);

        window.syncify.style.parent = (
          style: Partial<CSSStyleDeclaration>
        ) => Object.assign(parent.style, style);

        window.syncify.style.label = (
          style: Partial<CSSStyleDeclaration>
        ) => Object.assign(node, style);

      }

      node.innerText = method ? 'HOT' : 'LIVE';
      parent.id = 'syncify-hot-label';
      parent.style.visibility = 'hidden';
      parent.appendChild(node);

      if (showLabel) {
        move = dragLabel(parent);
        dom.append(parent);
      }
    };

    return {
      get node () { return node; },
      mount,
      /** Label Event */
      event (value?: string, fontSize?: string) {
        if (value !== undefined) {
          fontSize ? node.style.setProperty('font-size', fontSize) : node.style.removeProperty('font-size');
          node.innerText = value;
        }
      },
      /** Unmount and remove label */
      unmount () {
        move();
        node.remove();
        node = undefined;
      }
    };

  })();

  const timer = (function (mark: number[]) {

    let timeout: NodeJS.Timeout = null;

    return {
      start: () => {

        mark.push(performance.now());

      },
      stop: () => {

        if (timeout !== null) {
          clearTimeout(timeout);
          timeout = null;
        }

        timeout = setTimeout(() => {
          label.event(method === 'hot' ? 'HOT' : 'LIVE');
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

  const sections = (function (map: { [id: string]: string[] }) {

    return {
      list () {
        return {
          map: Object.keys(map).length > 0 ? map : null,
          alias
        };
      },
      get (id: string) {

        if (id in map) return document.body.querySelectorAll<HTMLElement>(map[id].join(','));

        if (template in alias && id in alias[template]) {

          const selector: string[] = [];

          for (let i = 0, s = alias[template][id].length, p = ''; i < s; i++) {
            p = alias[template][id][i];
            p in map && selector.push(...map[p]);
          }

          if (selector.length > 0) {

            return document.body.querySelectorAll<HTMLElement>(selector.join(','));

          }

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

      if (assetMatch(href, uri)) {
        node.setAttribute('href', serverUrl + params(href));
      }
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

          script.onload = () => resolve(src);
          script.onerror = (e) => {
            console.error('HOT Script failed to reload:', e);
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
  function assets (dom: Document = document) {

    stylesheets(dom);

    return Promise.allSettled(scripts(dom));

  };

  /**
   * XHR Request - Reloads the page via XHR
   * and resolves the document as a string.
   */
  function request (uri: string, type: 'json' | 'text' | 'document') {

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

  const HOTBody = () => request(location.href, 'document').then((newDom: Document) => {

    assets(newDom).then(() => {

      morph(document.body, newDom.body, morphs);

      sections.load(document.body);
      label.mount(document.body);

    });

  });

  function websocket () {

    if (isConnected === true) return;

    if (retrying > 1000) {
      socket = undefined;
      disconnect();
      console.warn('HOT Reconnection could not be established and process was killed');
      return;
    }

    socket = new WebSocket(socketUrl);

    ws(socket);

  }

  function ws (socket: WebSocket) {

    if (!isNaN(timeout)) clearTimeout(timeout);

    socket.addEventListener('close', () => {

      if (retrying === 0) {
        console.warn('HOT Reconnection will continue to be attempted until a hard-refresh');
      }

      retrying > 0 || label.event('DISCONNECTED', '10px');
      isConnected = false;
      retrying++;
      timeout = setTimeout(websocket, 2500);

    });

    socket.addEventListener('open', () => {

      if (!isConnected) {

        isConnected = true;
        label.event(method === 'hot' ? 'HOT' : 'LIVE');
        route();

      } else {

        timer.start();
        label.event('Reconnecting');

        HOTBody().then(() => {

          label.event(`Reconnected in ${timer.stop()}`);
          isConnected = true;
          route();

        });

      }
    });

    type Data = LiteralUnion<
      'alias' |
      'connected' |
      'disconnect'|
      'reload' |
      'replace' |
      'script' |
      'style' |
      'section',
      string
    >

    const PREFIX = method === 'hot' ? 'HOT ' : 'LIVE ';

    socket.addEventListener('message', function ({ data }: { data: Data }) {

      if (data === 'reload') {

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

      } else if (data.startsWith('alias|')) {

        alias = JSON.parse(data.slice(6));

      } else {

        timer.start();

        if (method === 'live') {

          return request(location.href, 'document').then((newDom: Document) => {

            document.body.replaceWith(newDom.body);
            label.mount(document.body);
            label.event(`Reloaded in ${timer.stop()}`);

            timeout = NaN;

          });

        } else {

          const [ type, id, uuid ] = data.split(',');

          if (type === 'section') {

            const nodes = sections.get(id);

            if (nodes === null) {
              reload(() => label.event(`Reloaded in ${timer.stop()}`));
              return;
            }

            nodes.length > 1
              ? label.event(`${nodes.length} ${PREFIX}Sections`)
              : label.event(`${PREFIX}Section`);

            const uri = `${location.pathname}?sections=${id}`;

            return request(uri, 'json').then((value: Record<string, string>) => {

              nodes.forEach(node => {
                morph(node, value[id], {
                  childrenOnly: true,
                  onBeforeElUpdated: (fromEl: Element, toEl: Element) => !fromEl.isEqualNode(toEl)
                });
              });

              label.event(`Reloaded in ${timer.stop()}`);

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
      }

    });

  }

  function reload (callback?: (dom: Document) => void) {

    request(location.href, 'document').then((newDom: Document) => {
      assets(newDom).then(() => {

        morph(document.body, newDom.body, morphs);

        if (typeof callback === 'function') {
          callback(document);
        }

      });
    });

  }

  function refresh () {

    return top.location.reload();

  }

  function route (data?: { url: string; template: string }) {

    socket.send('ROUTE:' + JSON.stringify(data || {
      url: location.href,
      template: Template()
    }));

  }

  function disconnect () {

    const curDom = document.body;

    if (isReady) {

      isReady = false;

      if (socket) {
        isConnected = false;
        socket.close();
      }

      label.unmount();

    }

    return curDom;

  }

  function connect (config?: Options) {

    if (document.readyState !== 'complete') {

      setTimeout(() => connect(config), 25);

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
    isReady: { get () { return isReady; } },
    isConnected: { get () { return isConnected; } },
    errors: { get () { return errors; } },
    WebC: { get () { return WebC; } },
    template: { get () { return template; } },
    connect: { value: connect },
    disconnect: { value: disconnect },
    sections: { value: sections },
    route: { value: route },
    assets: { value: assets },
    refresh: { value: refresh },
    reload: { value: reload }
  });

  document.addEventListener('readystatechange', function () {

    Template();

    if (this.readyState === 'interactive') {
      PatchWebComponents(WebC);
    } else if (this.readyState === 'complete') {
      RuntimeFlags(this);
    }
  });

  connect();

})({
  method: '{{method|default:\'hot\'}}',
  server: +'{{server|default:41001}}',
  socket: +'{{socket|default:51001}}',
  label: Boolean('{{label|default:true}}'),
  flags: {
    'no-preview-bar': Boolean('{{no-preview-bar|default:true}}'),
    'no-web-pixels-manager': Boolean('{{no-web-pixels-manager|default:false}}'),
    'no-shopify-features': Boolean('{{no-shopify-features|default:false}}'),
    'no-trekkie': Boolean('{{no-trekkie|default:false}}'),
    'no-perfkit': Boolean('{{no-perfkit|default:false}}'),
    'no-checkout-preloads': Boolean('{{no-checkout-preloads|default:false}}')
  }
});
