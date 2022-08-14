
// import m from 'mithril';
// import mstream from 'mithril/stream';

const store: {
  css: Map<string, string>
  js: Map<string, string>
  script: Map<string, string>
  style: Map<string, string>;
} = {
  css: new Map(),
  js: new Map(),
  style: new Map(),
  script: new Map()
};

/*
const status = mstream('');

function watch (data: {
  type: 'style' | 'script' | 'js' | 'css';
  id: string;
  asset: string;
}) {

  store[data.type].set(data.id, data.asset);

} */

function assets (dom: Document) {

  dom.querySelectorAll('link[data-syncify-live]').forEach((node) => {
    const href = node.getAttribute('href');
    const name = href.substring(href.lastIndexOf('/'));
    node.setAttribute('href', `http://localhost:3000/${name}`);
  });

  dom.querySelectorAll('script[data-syncify-live]').forEach((node) => {
    const make = dom.createElement('script');
    const href = node.getAttribute('src');
    const src = `http://localhost:3000/${href.substring(href.lastIndexOf('/'))}`;

    make.src = src;

    for (const attr of Array.from(node.attributes)) {
      if (attr.nodeName !== 'src') make.setAttribute(attr.nodeName, attr.nodeValue);
    }

    dom.head.removeChild(node);
    dom.head.appendChild(make);

  });

  // status('Syncify Live (watching)');

  return dom;
}

/**
 * XHR Request - Reloads the page via XHR
 * and resolves the document as a string.
 */
function request (key: string) {

  return new Promise(function (resolve, reject) {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', key);
    xhr.setRequestHeader('X-Syncify-Reload', 'true');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onload = function () { resolve(xhr.responseText); };
    xhr.onerror = function () { reject(this.statusText); };
    xhr.send();

  });

};

(() => {

  const socket = new WebSocket('ws://localhost:8090/ws');

  // status('Syncify Live (connected)');

  socket.onmessage = function ({
    data
  }: {
      data: 'reload' | 'replace' | 'assets' | {
        type: 'style' | 'script' | 'js' | 'css';
        id: string;
        asset: string;
      }
    }) {

    if (data === 'reload') {

      //  status('Syncify Live (reload)');

      return window.top.location.reload();

    } else if (data === 'replace') {

      // status('Syncify Live (changed)');

      return request(window.location.href).then((doc: string) => {

        const dom = new DOMParser().parseFromString(doc, 'text/html');
        const newDom = assets(dom);

        document.documentElement.innerHTML = newDom.documentElement.innerHTML;

        // status('Syncify Live (watching)');

      });
    } else if (data === 'assets') {

      // status('Syncify Live (updating)');
      return assets(document);
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
