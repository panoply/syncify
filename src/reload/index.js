// src/embed.ts
function assets(dom) {
  dom.querySelectorAll("link[data-syncify-live]").forEach((node) => {
    const href = node.getAttribute("href");
    const name = href.substring(href.lastIndexOf("/"));
    node.setAttribute("href", `http://localhost:3000/${name}`);
  });
  dom.querySelectorAll("script[data-syncify-live]").forEach((node) => {
    const make = dom.createElement("script");
    const href = node.getAttribute("src");
    const src = `http://localhost:3000/${href.substring(href.lastIndexOf("/"))}`;
    make.src = src;
    for (const attr of Array.from(node.attributes)) {
      if (attr.nodeName !== "src")
        make.setAttribute(attr.nodeName, attr.nodeValue);
    }
    dom.head.removeChild(node);
    dom.head.appendChild(make);
  });
  return dom;
}
function request(key) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", key);
    xhr.setRequestHeader("X-Syncify-Reload", "true");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.onload = function() {
      resolve(xhr.responseText);
    };
    xhr.onerror = function() {
      reject(this.statusText);
    };
    xhr.send();
  });
}
(() => {
  const socket = new WebSocket("ws://localhost:8090/ws");
  socket.onmessage = function({
    data
  }) {
    if (data === "reload") {
      return window.top.location.reload();
    } else if (data === "replace") {
      return request(window.location.href).then((doc) => {
        const dom = new DOMParser().parseFromString(doc, "text/html");
        const newDom = assets(dom);
        document.documentElement.innerHTML = newDom.documentElement.innerHTML;
      });
    } else if (data === "assets") {
      return assets(document);
    }
  };
})();
