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

  console.log(opts);

  window.syncify = window.syncify || {
    ready: false,
    connected: true,
    errors: []
  };

  /* -------------------------------------------- */
  /* VIRTUAL NODE                                 */
  /* -------------------------------------------- */

  /**
   * Virtual DOM Element
   */
  const node = document.createElement('div');

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
      if (fromEl.tagName === 'SCRIPT' || fromEl.tagName === 'STYLE') return false;
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
      color: '#f7f7f7',
      zIndex: '99999',
      fontFamily: 'system-ui,sans-serif',
      textAlign: 'center',
      justifyContent: 'space-around',
      alignItems: 'center',
      fontSize: '11px'
    };

    const childStyle: Partial<CSSStyleDeclaration> = {
      padding: '5px 20px',
      backgroundColor: '#232326',
      border: '0.8px solid transparent',
      borderRadius: '5px',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
      borderBottom: '0'
    };

    const child = { view: () => m('div', { style: childStyle }, state) };

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
          label.event('Waiting for changes...');
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

    dom.querySelectorAll('script').forEach((node) => {

      if (!node.hasAttribute('src')) return;

      const href = node.getAttribute('src');

      if (!assetMatch(href, uri)) return;

      const script = document.createElement('script');
      script.setAttribute('src', server + params(href));

      for (const attr of Array.from(node.attributes)) {
        if (attr.nodeName !== 'src') script.setAttribute(attr.nodeName, attr.nodeValue);
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
      xhr.setRequestHeader('X-Syncify-Request', 'true');
      xhr.onload = () => resolve(xhr.response);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();

    });

  };

  function ws (socket: WebSocket) {

    let timeout: number = NaN;

    socket.addEventListener('close', () => {
      socket = null;
      setTimeout(websocket, 5000);
    });

    // status('Syncify Live (connected)');

    socket.addEventListener('message', function ({
      data
    }: {
      data: LiteralUnion<'connected' | 'disconnect' | 'reload' | 'replace' | 'script' | 'style', string>
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

        const [ type, id ] = data.split(',');

        if (type === 'section') {

          const nodes = sections.get(id);

          if (nodes === null) {
            window.syncify.reload();
            return;
          }

          if (nodes.length > 1) {
            label.event(`Reloading ${nodes.length} Sections: ${id}`);
          } else {
            label.event(`Reloading Section: ${id}`);
          }

          const uri = `${location.pathname}?sections=${id}`;

          return req(uri, 'json').then((value: { [prop: string]: string }) => {

            if (nodes === null) return;

            if (opts.strategy === 'hydrate') {

              const options = {
                childrenOnly: true,
                onBeforeElUpdated: function (fromEl: Element, toEl: Element) {
                  if (fromEl.tagName === 'SCRIPT' || fromEl.tagName === 'STYLE') return false;
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

          label.event(`Reloaded in ${timer.stop()}`);

        } else if (type === 'stylesheet') {

          label.event(`Reloading Stylesheet: ${id}`);

          stylesheets(document, id);

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
