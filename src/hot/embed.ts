
// eslint-disable-next-line no-unused-vars
declare interface Window {
  syncify: {
    alive: boolean;
    socket: string;
    server: string;
  }
}

/**
 * Replace paths - Replaces all instances of
 * Shopify CDN paths that we will serve locally.
 */
function syncifyAssets (dom: Document) {

  dom.querySelectorAll('link[data-syncify-live]').forEach((node) => {
    const href = node.getAttribute('href');
    const name = href.substring(href.lastIndexOf('/'));
    node.setAttribute('href', `http://localhost:${window.syncify.server}${name}`);
  });

  dom.querySelectorAll('script[data-syncify-live]').forEach((node) => {

    const make = dom.createElement('script');
    const href = node.getAttribute('src');
    const src = `http://localhost:${window.syncify.server}${href.substring(href.lastIndexOf('/'))}`;

    make.src = src;

    for (const attr of Array.from(node.attributes)) {
      if (attr.nodeName.toUpperCase() !== 'SRC') make.setAttribute(attr.nodeName, attr.nodeValue);
    }

    console.log(dom.head);
    dom.head.removeChild(node);
    dom.head.appendChild(make);

  });

  return dom;
};

/**
 * XHR Request - Reloads the page via XHR
 * and resolves the document as a string.
 */
function syncifyReq (key: string) {

  return new Promise(function (resolve, reject) {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', key);
    xhr.setRequestHeader('X-Syncify-Reload', 'true');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();

  });

};

(() => {

  const syncifySocket = new WebSocket(`ws://localhost:${window.syncify.socket}/ws`);

  // status('Syncify Live (connected)');

  syncifySocket.onmessage = function ({ data }: {
      data: 'reload' | 'replace' | 'assets' | {
        type: 'style' | 'script' | 'js' | 'css';
        id: string;
        asset: string;
      }
    }) {

    if (data === 'reload') {

      return window.top.location.reload();

    } else if (data === 'replace') {

      return syncifyReq(window.location.href).then((doc: string) => {

        const dom = new DOMParser().parseFromString(doc, 'text/html');
        const newDom = syncifyAssets(dom);

        document.documentElement.innerHTML = newDom.documentElement.innerHTML;

      });

    } else if (data === 'assets') {

      return syncifyAssets(document);

    }

  };

})();

/*
status('Syncify Live (connecting)');

const mount = document.createElement('div');

Object.assign(mount.style, <CSSStyleDeclaration>{
  position: 'fixed',
  top: '0',
  left: '44%',
  margin: '0 auto',
  height: '18px',
  width: '180px',
  backgroundColor: '#673ab7',
  borderRadius: '5px',
  borderTopLeftRadius: '0',
  borderTopRightRadius: '0',
  display: 'flex',
  color: 'white',
  fontFamily: 'monospace',
  textAlign: 'center',
  justifyContent: 'space-around',
  alignContent: 'center',
  lineHeight: 'initial',
  fontSize: '12px',
  textTransform: 'uppercase'
});

document.body.append(mount);

m.mount(mount, { view: () => m('span', status()) }); */
