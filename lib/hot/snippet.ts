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
        load: () => { [id: string]: string[]; };
        /**
         * Returns all elements matching the provided `id` which is obtained
         * via the websocket `data` parameter. Query Selects all matches. If
         * no matches are found, returns null.
         */
        get: (id: string) => NodeListOf<HTMLElement>
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

(function syncify (syncify: {
  server: string;
  socket: string;
  label: string;
}) {

  window.syncify = window.syncify || { ready: false };

  /* -------------------------------------------- */
  /* CONSTANTS                                    */
  /* -------------------------------------------- */

  const server = `http://localhost:${syncify.server}/`;
  const socket = new WebSocket(`ws://localhost:${syncify.socket}/ws`);
  const parser = new DOMParser();
  const morphing = {
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

  function sections (map: { [id: string]: string[] }) {

    return {
      list: () => {
        return Object.keys(map).length > 0 ? map : null;
      },
      get: (id: string) => {
        if (id in map) return document.body.querySelectorAll<HTMLElement>(map[id].join(','));
        return null;
      },
      load: () => {

        map = {};

        const elements = document.body.querySelectorAll('.shopify-section');
        if (!elements) return null;

        elements.forEach(section => {

          const match = (/_{2}[\w-]+$/g).exec(section.id);
          const id = match !== null ? match[0].slice(2) : section.id;

          if (!(id in map)) {
            map[id] = [ '#' + section.id ];
          } else {
            map[id].push('#' + section.id);
          }
        });

        return map;

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
     * Virtual DOM Element
     */
    const node = document.createElement('div');

    node.id = 'syncify-hot-label-status';

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
        if (!dom.contains(node)) dom.append(node);
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
  function req (uri: string, type: 'json' | 'text') {

    return new Promise(function (resolve, reject) {

      const xhr = new XMLHttpRequest();

      xhr.responseType = type;
      xhr.open('GET', uri);
      xhr.setRequestHeader('X-Syncify-Reload', 'true');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.onload = () => resolve(xhr.response);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();

    });

  };

  // status('Syncify Live (connected)');

  socket.addEventListener('message', function ({
    data
  }: {
    data: LiteralUnion<'reload' | 'replace' | 'script' | 'style', string>
  }) {

    if (data === 'reload') {

      label.event('Refreshing');

      return top.location.reload();

    } else if (data === 'replace') {

      timer.start();
      label.event('Reloading');

      return req(location.href, 'text').then((doc: string) => {

        const dom = parser.parseFromString(doc, 'text/html');
        const newDom = assets(dom);

        console.log(newDom.body);

        morph(document.body, newDom.body, morphing);

        label.render(document.body);
        label.event(`Reloaded in ${timer.stop()}`);

      });

    } else {

      timer.start();

      const [ type, uri ] = data.split(',');

      if (type === 'section') {

        const nodes = window.syncify.sections.get(uri);
        label.event(`Reloading Section: ${uri}`);

        if (nodes === null) {
          window.syncify.reload();
          return;
        }

        return req(`${location.pathname}?sections=${uri}`, 'json').then((value: {
          [prop: string]: string
        }) => {

          if (nodes === null) return;

          nodes.forEach(node => {

            morph(node, value[uri], {
              childrenOnly: true,
              onBeforeElUpdated: function (fromEl: Element, toEl: Element) {
                if (fromEl.tagName === 'SCRIPT' || fromEl.tagName === 'STYLE') return false;
                if (fromEl.isEqualNode(toEl)) return false;
                return true;
              }
            });

          });

          label.event(`Reloaded in ${timer.stop()}`);

        });

      } else if (type === 'script') {

        label.event(`Reloading JavaScript: ${uri}`);

        scripts(document, uri);

        label.event(`Reloaded in ${timer.stop()}`);

      } else if (type === 'stylesheet') {

        label.event(`Reloading Stylesheet: ${uri}`);

        stylesheets(document, uri);

        label.event(`Reloaded in ${timer.stop()}`);

      }
    }

  });

  /* -------------------------------------------- */
  /* EXPOSED METHODS                              */
  /* -------------------------------------------- */

  window.syncify.sections = sections({});
  window.syncify.assets = () => assets(document);
  window.syncify.refresh = () => top.location.reload();
  window.syncify.reload = () => req(location.href, 'text').then((doc: string) => {

    const dom = parser.parseFromString(doc, 'text/html');

    morph(document.body, assets(dom).body, morphing);

    label.render(document.body);
    window.syncify.sections.load();

  });

  /* -------------------------------------------- */
  /* RENDER VNODE                                 */
  /* -------------------------------------------- */

  document.addEventListener('DOMContentLoaded', () => {

    label.render(document.body);
    window.syncify.sections.load();
    window.syncify.ready = true;

  });

}({
  server: '{{- server | default: 3000 -}}',
  socket: '{{- socket | default: 8089 -}}',
  label: '{{- label | default: "visible" -}}'
}));
