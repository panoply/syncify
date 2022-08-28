import m from 'mithril';
import { LiteralUnion } from 'type-fest';

declare global {
  export interface Window {
    syncify: {
      /**
       * Check to see if Syncify is ready or not
       */
      ready: boolean;
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

    /**
     * The dynamic nodes style - Exposed to user
     */
    const nodeStyle: Partial<CSSStyleDeclaration> = {
      position: 'fixed',
      top: '0',
      left: '0',
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
      borderTop: '0',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0'
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
  function scripts (dom: Document, uri?: string) {

    dom.querySelectorAll('script[src]').forEach((node) => {

      const href = node.getAttribute('src');
      if (!assetMatch(href, uri)) return;

      const script = dom.createElement('script');
      script.setAttribute('src', server + params(href));

      for (const attr of Array.from(node.attributes)) {
        if (attr.nodeName !== 'src') script.setAttribute(attr.nodeName, attr.nodeValue);
      }

      dom.head.removeChild(node);
      dom.head.appendChild(script);

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

  socket.addEventListener('message', function ({ data }: {
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
        document.body.replaceWith(newDom.body);

        label.render(document.body);
        label.event(`Reloaded in ${timer.stop()}`);

      });

    } else {

      timer.start();

      const [ type, uri ] = data.split(',');

      if (type === 'section') {

        label.event(`Reloading Section: ${uri}`);

        return req(`${location.pathname}?sections=${uri}`, 'json').then((value: {
          [prop: string]: string
        }) => {
          const { firstElementChild } = parser.parseFromString(value[uri], 'text/html').body;
          document.body.querySelector(`#shopify-section-${data}`).replaceWith(firstElementChild);
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

  window.syncify.assets = () => assets(document);
  window.syncify.refresh = () => top.location.reload();
  window.syncify.reload = () => req(location.href, 'text').then((doc: string) => {
    const dom = parser.parseFromString(doc, 'text/html');
    document.body.replaceWith(assets(dom).body);
    label.render(document.body);
  });

  /* -------------------------------------------- */
  /* RENDER VNODE                                 */
  /* -------------------------------------------- */

  document.addEventListener('DOMContentLoaded', () => {
    label.render(document.body);
    window.syncify.ready = true;
  });

}({
  server: '{{- server | default: 3000 -}}',
  socket: '{{- socket | default: 8089 -}}',
  label: '{{- label | default: "visible" -}}'
}));
