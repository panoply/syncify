import m from 'mithril';
import { LiteralUnion } from 'type-fest';

(function syncify (syncify: {
  server: string;
  socket: string;
}) {

  let state: string = 'SYNCIFY CONNECTING';

  const mount = document.createElement('div');

  const event = (label?: string) => {
    if (label !== undefined) state = label;
    m.redraw();
    return state;
  };

  const component = (node: HTMLElement) => {

    Object.assign(mount.style, <CSSStyleDeclaration>{
      position: 'fixed',
      top: '0',
      left: '44%',
      margin: '0 auto',
      height: '18px',
      width: '180px',
      backgroundColor: '#111',
      borderRadius: '5px',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
      display: 'flex',
      color: '#fff',
      fontFamily: 'monospace',
      textAlign: 'center',
      justifyContent: 'space-around',
      alignContent: 'center',
      lineHeight: 'initial',
      fontSize: '12px',
      textTransform: 'uppercase'
    });

    m.mount(mount, { view: () => m('span', event()) });

    node.append(mount);

  };

  /**
   * Assert new value hash so scripts reload
   */
  const params = (url: string) => {
    const p = url.lastIndexOf('/') + 1;
    const q = url.indexOf('?', p);
    return (q > -1 ? url.substring(p, q) : url.substring(p)) + '?v=' + Date.now();
  };

  const styles = (dom: Document) => {

    dom.querySelectorAll('link[data-syncify-live]').forEach((node) => {
      const href = node.getAttribute('href');
      node.setAttribute('href', `http://localhost:${syncify.server}/${params(href)}`);
      event('HOT RELOAD ~ <link>');
    });

    return dom;

  };

  const scripts = (dom: Document) => {

    dom.querySelectorAll('script[data-syncify-live]').forEach((node) => {

      const make = dom.createElement('script');
      const href = node.getAttribute('src');
      const src = `http://localhost:${syncify.server}/${params(href)}`;

      make.src = src;

      for (const attr of Array.from(node.attributes)) {
        if (attr.nodeName.toUpperCase() !== 'SRC') make.setAttribute(attr.nodeName, attr.nodeValue);
      }

      dom.head.removeChild(node);
      dom.head.appendChild(make);

      event('HOT RELOAD ~ <script>');
    });

    return dom;

  };
  /**
   * Replace paths - Replaces all instances of
   * Shopify CDN paths that we will serve locally.
   */
  const assets = (dom: Document, node?: 'script' | 'style') => {

    if (node === 'script') return scripts(dom);
    if (node === 'style') return styles(dom);

    styles(dom);
    scripts(dom);
    event('HOT RELOAD ~ ASSETS');

    return dom;
  };

  /**
   * XHR Request - Reloads the page via XHR
   * and resolves the document as a string.
   */
  const req = (uri: string) => {

    return new Promise(function (resolve, reject) {

      const xhr = new XMLHttpRequest();

      xhr.open('GET', uri);
      xhr.setRequestHeader('X-Syncify-Reload', 'true');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();

    });

  };

  const socket = new WebSocket(`ws://localhost:${syncify.socket}/ws`);
  const parser = new DOMParser();

  // status('Syncify Live (connected)');

  socket.addEventListener('message', function ({ data }: {
      data: LiteralUnion<'reload' | 'replace' | 'script' | 'style', string>
  }) {

    if (data === 'reload') {

      event('FULL RELOAD ~ REFRESH');

      return top.location.reload();

    } else if (data === 'replace') {

      event('HOT RELOAD ~ VIEW');

      return req(location.href).then((doc: string) => {

        const dom = parser.parseFromString(doc, 'text/html');
        const newDom = assets(dom);
        document.body.replaceWith(newDom.body);

        component(document.body);

        event('SYNCIFY ~ HOT');

      });

    } else if (data === 'script') {

      event('HOT RELOAD ~ JS');

      return scripts(document);

    } else if (data === 'style') {

      event('HOT RELOAD ~ CSS');

      return styles(document);

    } else {

      event('HOT REPLACE ~ VIEW');

      return req(location.href).then((doc: string) => {

        const dom = parser.parseFromString(doc, 'text/html');
        const newDom = assets(dom).body.querySelector(`#${data}`);

        document.body.querySelector(`#${data}`).replaceWith(newDom);

        event('HOT SECTION ~ ' + data);

      });

    }

  });

  document.addEventListener('DOMContentLoaded', () => component(document.body));

}({
  server: '{{- server | default: 3000 -}}',
  socket: '{{- socket | default: 8089 -}}'
}));
