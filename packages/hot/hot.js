(()=>{var ee=11;function oe(r,i){var a=i.attributes,s,t,m,y,S;if(!(i.nodeType===ee||r.nodeType===ee)){for(var x=a.length-1;x>=0;x--)s=a[x],t=s.name,m=s.namespaceURI,y=s.value,m?(t=s.localName||t,S=r.getAttributeNS(m,t),S!==y&&(s.prefix==="xmlns"&&(t=s.name),r.setAttributeNS(m,t,y))):(S=r.getAttribute(t),S!==y&&r.setAttribute(t,y));for(var w=r.attributes,A=w.length-1;A>=0;A--)s=w[A],t=s.name,m=s.namespaceURI,m?(t=s.localName||t,i.hasAttributeNS(m,t)||r.removeAttributeNS(m,t)):i.hasAttribute(t)||r.removeAttribute(t)}}var X,ae="http://www.w3.org/1999/xhtml",T=typeof document>"u"?void 0:document,le=!!T&&"content"in T.createElement("template"),ce=!!T&&T.createRange&&"createContextualFragment"in T.createRange();function ue(r){var i=T.createElement("template");return i.innerHTML=r,i.content.childNodes[0]}function de(r){X||(X=T.createRange(),X.selectNode(T.body));var i=X.createContextualFragment(r);return i.childNodes[0]}function fe(r){var i=T.createElement("body");return i.innerHTML=r,i.childNodes[0]}function me(r){return r=r.trim(),le?ue(r):ce?de(r):fe(r)}function K(r,i){var a=r.nodeName,s=i.nodeName,t,m;return a===s?!0:(t=a.charCodeAt(0),m=s.charCodeAt(0),t<=90&&m>=97?a===s.toUpperCase():m<=90&&t>=97?s===a.toUpperCase():!1)}function pe(r,i){return!i||i===ae?T.createElement(r):T.createElementNS(i,r)}function ye(r,i){for(var a=r.firstChild;a;){var s=a.nextSibling;i.appendChild(a),a=s}return i}function Z(r,i,a){r[a]!==i[a]&&(r[a]=i[a],r[a]?r.setAttribute(a,""):r.removeAttribute(a))}var te={OPTION:function(r,i){var a=r.parentNode;if(a){var s=a.nodeName.toUpperCase();s==="OPTGROUP"&&(a=a.parentNode,s=a&&a.nodeName.toUpperCase()),s==="SELECT"&&!a.hasAttribute("multiple")&&(r.hasAttribute("selected")&&!i.selected&&(r.setAttribute("selected","selected"),r.removeAttribute("selected")),a.selectedIndex=-1)}Z(r,i,"selected")},INPUT:function(r,i){Z(r,i,"checked"),Z(r,i,"disabled"),r.value!==i.value&&(r.value=i.value),i.hasAttribute("value")||r.removeAttribute("value")},TEXTAREA:function(r,i){var a=i.value;r.value!==a&&(r.value=a);var s=r.firstChild;if(s){var t=s.nodeValue;if(t==a||!a&&t==r.placeholder)return;s.nodeValue=a}},SELECT:function(r,i){if(!i.hasAttribute("multiple")){for(var a=-1,s=0,t=r.firstChild,m,y;t;)if(y=t.nodeName&&t.nodeName.toUpperCase(),y==="OPTGROUP")m=t,t=m.firstChild;else{if(y==="OPTION"){if(t.hasAttribute("selected")){a=s;break}s++}t=t.nextSibling,!t&&m&&(t=m.nextSibling,m=null)}r.selectedIndex=a}}},V=1,ne=11,re=3,ie=8;function P(){}function he(r){if(r)return r.getAttribute&&r.getAttribute("id")||r.id}function ve(r){return function(a,s,t){if(t||(t={}),typeof s=="string")if(a.nodeName==="#document"||a.nodeName==="HTML"||a.nodeName==="BODY"){var m=s;s=T.createElement("html"),s.innerHTML=m}else s=me(s);else s.nodeType===ne&&(s=s.firstElementChild);var y=t.getNodeKey||he,S=t.onBeforeNodeAdded||P,x=t.onNodeAdded||P,w=t.onBeforeElUpdated||P,A=t.onElUpdated||P,U=t.onBeforeNodeDiscarded||P,F=t.onNodeDiscarded||P,j=t.onBeforeElChildrenUpdated||P,v=t.skipFromChildren||P,E=t.addChild||function(n,o){return n.appendChild(o)},L=t.childrenOnly===!0,C=Object.create(null),I=[];function q(n){I.push(n)}function k(n,o){if(n.nodeType===V)for(var u=n.firstChild;u;){var c=void 0;o&&(c=y(u))?q(c):(F(u),u.firstChild&&k(u,o)),u=u.nextSibling}}function M(n,o,u){U(n)!==!1&&(o&&o.removeChild(n),F(n),k(n,u))}function $(n){if(n.nodeType===V||n.nodeType===ne)for(var o=n.firstChild;o;){var u=y(o);u&&(C[u]=o),$(o),o=o.nextSibling}}$(a);function B(n){x(n);for(var o=n.firstChild;o;){var u=o.nextSibling,c=y(o);if(c){var f=C[c];f&&K(o,f)?(o.parentNode.replaceChild(f,o),W(f,o)):B(o)}else B(o);o=u}}function _(n,o,u){for(;o;){var c=o.nextSibling;(u=y(o))?q(u):M(o,n,!0),o=c}}function W(n,o,u){var c=y(o);if(c&&delete C[c],!u){var f=w(n,o);if(f===!1||(f instanceof HTMLElement&&(n=f,$(n)),r(n,o),A(n),j(n,o)===!1))return}n.nodeName!=="TEXTAREA"?G(n,o):te.TEXTAREA(n,o)}function G(n,o){var u=v(n,o),c=o.firstChild,f=n.firstChild,N,b,O,D,H;e:for(;c;){for(D=c.nextSibling,N=y(c);!u&&f;){if(O=f.nextSibling,c.isSameNode&&c.isSameNode(f)){c=D,f=O;continue e}b=y(f);var z=f.nodeType,R=void 0;if(z===c.nodeType&&(z===V?(N?N!==b&&((H=C[N])?O===H?R=!1:(n.insertBefore(H,f),b?q(b):M(f,n,!0),f=H,b=y(f)):R=!1):b&&(R=!1),R=R!==!1&&K(f,c),R&&W(f,c)):(z===re||z==ie)&&(R=!0,f.nodeValue!==c.nodeValue&&(f.nodeValue=c.nodeValue))),R){c=D,f=O;continue e}b?q(b):M(f,n,!0),f=O}if(N&&(H=C[N])&&K(H,c))u||E(n,H),W(H,c);else{var J=S(c);J!==!1&&(J&&(c=J),c.actualize&&(c=c.actualize(n.ownerDocument||T)),E(n,c),B(c))}c=D,f=O}_(n,f,b);var Q=te[n.nodeName];Q&&Q(n,o)}var g=a,e=g.nodeType,l=s.nodeType;if(!L){if(e===V)l===V?K(a,s)||(F(a),g=ye(a,pe(s.nodeName,s.namespaceURI))):g=s;else if(e===re||e===ie){if(l===e)return g.nodeValue!==s.nodeValue&&(g.nodeValue=s.nodeValue),g;g=s}}if(g===s)F(a);else{if(s.isSameNode&&s.isSameNode(g))return;if(W(g,s,L),I)for(var p=0,h=I.length;p<h;p++){var d=C[I[p]];d&&M(d,d.parentNode,!1)}}return!L&&g!==a&&a.parentNode&&(g.actualize&&(g=g.actualize(a.ownerDocument||T)),a.parentNode.replaceChild(g,a)),g}}var ge=ve(oe),Y=ge;function se(r){let i={customElementDefine:customElements.define,customElementsGet:customElements.get,querySelector:Document.prototype.querySelector,querySelectorAll:Document.prototype.querySelectorAll,getElementsByTagName:Document.prototype.getElementsByTagName,matches:Element.prototype.matches,closest:Element.prototype.closest},a=(t=10,m)=>(m=m||"",t?a(--t,"abcdefghiklmnopqrstuvwxyz".charAt(Math.floor(Math.random()*60))+m):m);function s(t){return r.has(t)?r.get(t):t}Document.prototype.querySelector=function(t){return i.querySelector.call(this,s(t))},Document.prototype.querySelectorAll=function(t){return i.querySelectorAll.call(this,s(t))},Document.prototype.getElementsByName=function(t){return i.getElementsByTagName.call(this,s(t))},Element.prototype.matches=function(t){return i.matches.call(this,s(t))},Element.prototype.closest=function(t){return i.closest.call(this,s(t))},customElements.get=function(t){return i.customElementsGet.call(customElements,s(t))},customElements.define=function(t,m,y){if(r.has(t)){let S=`${t}-${a()}`,x=r.get(t);i.customElementDefine.call(customElements,S,m,y),document.body.querySelectorAll(x).forEach(w=>{console.info(`Syncify: Web Component '${t}' was refined to ${S} (refresh to reset)`);let A=document.createElement(S);A.innerHTML=w.innerHTML,w.replaceWith(A)}),r.set(t,S)}else console.info(`Syncify: Web component '${t}' will be monkey patched during HOT Mode.`),i.customElementDefine.call(customElements,t,m,y),r.set(t,t)}}(function(i){if(!document)return;window.syncify||(window.syncify=Object.create(null));let a=new DOMParser,s=new Map,t=[],m=!1,y=!1,S,x=i.label,w=i.mode,A=i.strategy,U=`http://localhost:${i.server}/`,F=`ws://localhost:${i.socket}/ws`;Object.defineProperties(window.syncify,{options:{get(){return i},set(e){for(let l in i)l in i&&(i[l]=e[l],l==="server"?U=`http://localhost:${i[l]}/`:l==="socket"?F=`ws://localhost:${i.socket}/ws`:l==="strategy"?A=i[l]:l==="label"?x=i[l]:l==="mode"&&(w=i[l]))}}});let j={onBeforeElUpdated:function(e,l){return!(e.id==="syncify-hot-label"||e.tagName==="SCRIPT"&&e.hasAttribute("src")&&e.getAttribute("src").startsWith(U)||e.tagName==="LINK"&&e.hasAttribute("href")&&e.getAttribute("href").startsWith(U)||e.isEqualNode(l))}},v=function(){let e;return{get node(){return e},event:d=>{d!==void 0&&(e.innerText=d)},mount:d=>{if(e instanceof Element&&d.contains(e))return;let n=document.createElement("div");n.id="syncify-hot-label",e=document.createElement("span"),Object.assign(n.style,{position:"fixed",left:"0",bottom:"0",right:"0",margin:"0 auto",display:x?"flex":"none",color:"#fff",zIndex:"2147483647",fontFamily:"system-ui",letterSpacing:"normal",fontWeight:"500",textAlign:"center",justifyContent:"space-around",alignItems:"center",fontSize:"10px",userSelect:"none"}),Object.assign(e.style,{padding:"5px 10px 6px 28px",backgroundColor:"#000",borderRadius:"5px 5px 0 0",backgroundPosition:"8px center",backgroundSize:"12px",backgroundRepeat:"no-repeat",backgroundImage:"url(data:image/svg+xml,%3Csvg%20fill%3D%22currentColor%22%20width%3D%2212px%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2092%2092%22%3E%3Cpath%20d%3D%22M45.6607%200h45.62v26.07h-45.62c-5.1825.0079-10.1505%202.0703-13.8151%205.7349-3.6647%203.6646-5.7269%208.6326-5.7349%2013.8152-.0768%204.8168%201.7153%209.4761%205%2013H1.76071c-1.191519-4.2298-1.7839619-8.6057-1.76001194-13%200-5.9896%201.17974194-11.9206%203.47186194-17.4543%202.29212-5.5336%205.65171-10.5616%209.88704-14.7969%204.2353-4.23528%209.2633-7.59491%2014.7969-9.88703C33.6902%201.18976%2039.6211.0100098%2045.6107.0100098L45.6607%200Zm0%2091.23H.050716V65.17H45.6607c5.1826-.0079%2010.1506-2.0702%2013.8152-5.7348s5.7269-8.6326%205.7348-13.8151c.0769-4.8169-1.7152-9.4762-5-13h29.32c1.1916%204.2297%201.784%208.6057%201.7601%2013%20.0013%205.9912-1.1779%2011.924-3.47%2017.4595-2.2922%205.5355-5.6525%2010.5651-9.8889%2014.8016-4.2365%204.2364-9.2661%207.5967-14.8016%209.8889-5.5355%202.2921-11.4683%203.4713-17.4596%203.47l-.01-.0101Z%22%20fill%3D%22%234DBB73%22%2F%3E%3C%2Fsvg%3E)"}),window.syncify&&typeof window.syncify.style!="object"&&(window.syncify.style={parent:o=>Object.assign(n.style,o),label:o=>Object.assign(e,o)}),n.appendChild(e),d.append(n)},unmount:d=>{d.removeChild(e),e=void 0}}}(),E=function(e){let l=null;return{start:()=>{let p=performance.now();e.push(p)},stop:()=>{l!==null&&(clearTimeout(l),l=null),l=setTimeout(()=>{v.event("HOT"),l=null},6e3);let p=performance.now()-e.pop();if(p<1e3)return`${p.toFixed(0)}ms`;let h=p/1e3;if(h<60)return`${h.toFixed(0)}s ${+p.toFixed(0).slice(1)}ms`;let d=(h/60).toFixed(0);return`${d}m ${h-60*Number(d)}s ${+p.toFixed(0).slice(1)}ms`}}}([]),L=function(e){return{list:()=>Object.keys(e).length>0?e:null,get:l=>l in e?document.body.querySelectorAll(e[l].join(",")):null,load:(l=document.body)=>{e={};let p=l.querySelectorAll(".shopify-section");if(!p)return null;for(let h=0,d=p.length;h<d;h++){let{id:n}=p[h],o=/[0-9]+_{2}[\w-]+$/.exec(n),u;if(o!==null)u=o[0].slice(o[0].indexOf("__")+2);else if(n.startsWith("shopify-section-"))u=n.slice(16);else{window.syncify.errors.push({title:"Unknown Section",description:`Syncify encountered an issue mapping the section id: ${n}`,group:"section"});continue}let c=`#${n}`;u in e?e[u].indexOf(c)<0&&e[u].push(c):e[u]=[c]}return console.log("Sections",e),e}}}({});function C(e){let l=e.lastIndexOf("/")+1,p=e.indexOf("?",l);return(p>-1?e.substring(l,p):e.substring(l))+"?v="+Date.now()}function I(e,l){return typeof l!="string"?!1:e.slice(e.lastIndexOf("/")+1).startsWith(l)}function q(e,l){let p=e.querySelectorAll("link[rel=stylesheet]");for(let h=0,d=p.length;h<d;h++){let n=p[h],o=n.getAttribute("href");I(o,l)&&n.setAttribute("href",U+C(o))}return e}function k(e,l){let p=e.querySelectorAll("script[src]"),h=[];for(let d=0,n=p.length;d<n;d++){let o=p[d],u=o.getAttribute("src");if(I(u,l)){let c=new Promise((f,N)=>{let b=document.createElement("script");b.setAttribute("src",U+C(u));let O=Array.from(o.attributes);for(let D of O)D.nodeName!=="src"&&b.setAttribute(D.nodeName,D.nodeValue);b.onload=()=>{f(u)},b.onerror=D=>{console.error("Syncify: Failed to HOT Reload script:",D),N(new Error("HOT Script Error"))},o.replaceWith(b)});h.push(c)}}return h}function M(e){return q(e),Promise.allSettled(k(e))}function $(e,l){return new Promise(function(p,h){let d=new XMLHttpRequest;d.responseType=l,d.open("GET",e,!0),d.setRequestHeader("x-syncify-hot","true"),d.onload=()=>p(d.response),d.onerror=()=>h(d.statusText),d.send()})}function B(){y!==!0&&(S=new WebSocket(F),W(S))}let _=()=>$(location.href,"document").then(e=>{M(e).then(()=>{A==="hydrate"?Y(document.body,e.body,j):document.body.replaceWith(e.body),L.load(document.body),v.mount(document.body)})});function W(e){let l=NaN;e.addEventListener("close",()=>{e=null,y=!1,v.event("DISCONNECTED"),setTimeout(B,5e3)}),e.addEventListener("open",()=>{y||(y=!0,v.event(w==="hot"?"HOT":"LIVE"))});let p=w==="hot"?"HOT ":"LIVE ";e.addEventListener("message",function({data:h}){if(h==="connected"){if(!y)return E.start(),v.event("Reconnecting"),_().then(()=>{v.event(`Reconnected in ${E.stop()}`),y=!0})}else if(h==="disconnect")y=!1,v.event("SYNCIFY DISCONNECTED");else{if(h==="reload")return v.event("Refresh"),top.location.reload();if(h==="replace")return E.start(),v.event(`${p} RELOAD`),isNaN(l)||clearTimeout(l),_().then(()=>{v.event(`Reloaded in ${E.stop()}`),l=NaN});{if(E.start(),w==="live")return $(location.href,"document").then(u=>{document.body.replaceWith(u.body),v.mount(document.body),v.event(`Reloaded in ${E.stop()}`),l=NaN});let[d,n,o]=h.split(",");if(d==="section"){let u=L.get(n);if(u===null){window.syncify.reload();return}let c=`${location.pathname}?sections=${n}`;return u.length>1?v.event(`${u.length} ${p}SECTIONS`):v.event(`${p}SECTION`),$(c,"json").then(f=>{i.strategy==="hydrate"?u.forEach(N=>Y(N,f[n],{childrenOnly:!0,onBeforeElUpdated:(b,O)=>!b.isEqualNode(O)})):u.forEach(N=>{let b=a.parseFromString(f[c],"text/html").body;N.replaceWith(b.firstElementChild)}),v.event(`Reloaded "${n}" in ${E.stop()}`)}).catch(f=>{t.push({title:"XHR Error fetching section",description:`Section with id: ${n} failed to return a response from Shopify`,group:"sections"}),console.error("SYNCIFY: ",f)})}else d==="script"?(v.event(`${p}JavaScript: ${n}`),Promise.allSettled(k(document,n)).then(()=>{e.send(o),v.event(`Reloaded in ${E.stop()}`)})):d==="stylesheet"&&(v.event(`${p}Stylesheet: ${n}`),q(document,n),e.send(o),v.event(`Reloaded in ${E.stop()}`))}}})}function G(){let e=document.body;return m&&(m=!1,S&&(y=!1,S.close()),v.unmount(e)),e}function g(e){if(document.readyState!=="complete")document.addEventListener("DOMContentLoaded",()=>g(e));else{let l=m?G():document.body;typeof e=="object"&&(window.syncify.options=e),L.load(l),v.mount(l),m=!0,B()}}Object.defineProperties(window.syncify,{isReady:{get(){return m}},isConnected:{get(){return y}},errors:{get(){return t}},WebC:{get(){return s}},connect:{value:g},disconnect:{value:G},sections:{value:L},assets:{value(){return M(document)}},refresh:{value(){return top.location.reload()}},reload:{value(e){$(location.href,"document").then(l=>{A==="hydrate"?M(l).then(()=>{Y(document.body,l.body,j),typeof e=="function"&&e(document)}):(document.body.replaceWith(l.body),typeof e=="function"&&e(document))})}}}),document.addEventListener("readystatechange",()=>{document.readyState==="interactive"&&se(s)})})({label:!0,server:3e3,socket:8089,strategy:"hydrate",mode:"hot"});})();