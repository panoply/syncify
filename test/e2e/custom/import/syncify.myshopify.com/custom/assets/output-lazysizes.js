var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/lazysizes@5.3.2/node_modules/lazysizes/lazysizes.js
var require_lazysizes = __commonJS({
  "node_modules/.pnpm/lazysizes@5.3.2/node_modules/lazysizes/lazysizes.js"(exports, module) {
    (function(window2, factory) {
      var lazySizes = factory(window2, window2.document, Date);
      window2.lazySizes = lazySizes;
      if (typeof module == "object" && module.exports) {
        module.exports = lazySizes;
      }
    })(
      typeof window != "undefined" ? window : {},
      /**
       * import("./types/global")
       * @typedef { import("./types/lazysizes-config").LazySizesConfigPartial } LazySizesConfigPartial
       */
      function l(window2, document, Date2) {
        "use strict";
        var lazysizes, lazySizesCfg;
        (function() {
          var prop;
          var lazySizesDefaults = {
            lazyClass: "lazyload",
            loadedClass: "lazyloaded",
            loadingClass: "lazyloading",
            preloadClass: "lazypreload",
            errorClass: "lazyerror",
            //strictClass: 'lazystrict',
            autosizesClass: "lazyautosizes",
            fastLoadedClass: "ls-is-cached",
            iframeLoadMode: 0,
            srcAttr: "data-src",
            srcsetAttr: "data-srcset",
            sizesAttr: "data-sizes",
            //preloadAfterLoad: false,
            minSize: 40,
            customMedia: {},
            init: true,
            expFactor: 1.5,
            hFac: 0.8,
            loadMode: 2,
            loadHidden: true,
            ricTimeout: 0,
            throttleDelay: 125
          };
          lazySizesCfg = window2.lazySizesConfig || window2.lazysizesConfig || {};
          for (prop in lazySizesDefaults) {
            if (!(prop in lazySizesCfg)) {
              lazySizesCfg[prop] = lazySizesDefaults[prop];
            }
          }
        })();
        if (!document || !document.getElementsByClassName) {
          return {
            init: function() {
            },
            /**
             * @type { LazySizesConfigPartial }
             */
            cfg: lazySizesCfg,
            /**
             * @type { true }
             */
            noSupport: true
          };
        }
        var docElem = document.documentElement;
        var supportPicture = window2.HTMLPictureElement;
        var _addEventListener = "addEventListener";
        var _getAttribute = "getAttribute";
        var addEventListener2 = window2[_addEventListener].bind(window2);
        var setTimeout2 = window2.setTimeout;
        var requestAnimationFrame = window2.requestAnimationFrame || setTimeout2;
        var requestIdleCallback = window2.requestIdleCallback;
        var regPicture = /^picture$/i;
        var loadEvents = ["load", "error", "lazyincluded", "_lazyloaded"];
        var regClassCache = {};
        var forEach = Array.prototype.forEach;
        var hasClass = function(ele, cls) {
          if (!regClassCache[cls]) {
            regClassCache[cls] = new RegExp("(\\s|^)" + cls + "(\\s|$)");
          }
          return regClassCache[cls].test(ele[_getAttribute]("class") || "") && regClassCache[cls];
        };
        var addClass = function(ele, cls) {
          if (!hasClass(ele, cls)) {
            ele.setAttribute("class", (ele[_getAttribute]("class") || "").trim() + " " + cls);
          }
        };
        var removeClass = function(ele, cls) {
          var reg;
          if (reg = hasClass(ele, cls)) {
            ele.setAttribute("class", (ele[_getAttribute]("class") || "").replace(reg, " "));
          }
        };
        var addRemoveLoadEvents = function(dom, fn, add) {
          var action = add ? _addEventListener : "removeEventListener";
          if (add) {
            addRemoveLoadEvents(dom, fn);
          }
          loadEvents.forEach(function(evt) {
            dom[action](evt, fn);
          });
        };
        var triggerEvent = function(elem, name, detail, noBubbles, noCancelable) {
          var event = document.createEvent("Event");
          if (!detail) {
            detail = {};
          }
          detail.instance = lazysizes;
          event.initEvent(name, !noBubbles, !noCancelable);
          event.detail = detail;
          elem.dispatchEvent(event);
          return event;
        };
        var updatePolyfill = function(el, full) {
          var polyfill;
          if (!supportPicture && (polyfill = window2.picturefill || lazySizesCfg.pf)) {
            if (full && full.src && !el[_getAttribute]("srcset")) {
              el.setAttribute("srcset", full.src);
            }
            polyfill({ reevaluate: true, elements: [el] });
          } else if (full && full.src) {
            el.src = full.src;
          }
        };
        var getCSS = function(elem, style) {
          return (getComputedStyle(elem, null) || {})[style];
        };
        var getWidth = function(elem, parent, width) {
          width = width || elem.offsetWidth;
          while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
            width = parent.offsetWidth;
            parent = parent.parentNode;
          }
          return width;
        };
        var rAF = function() {
          var running, waiting;
          var firstFns = [];
          var secondFns = [];
          var fns = firstFns;
          var run = function() {
            var runFns = fns;
            fns = firstFns.length ? secondFns : firstFns;
            running = true;
            waiting = false;
            while (runFns.length) {
              runFns.shift()();
            }
            running = false;
          };
          var rafBatch = function(fn, queue) {
            if (running && !queue) {
              fn.apply(this, arguments);
            } else {
              fns.push(fn);
              if (!waiting) {
                waiting = true;
                (document.hidden ? setTimeout2 : requestAnimationFrame)(run);
              }
            }
          };
          rafBatch._lsFlush = run;
          return rafBatch;
        }();
        var rAFIt = function(fn, simple) {
          return simple ? function() {
            rAF(fn);
          } : function() {
            var that = this;
            var args = arguments;
            rAF(function() {
              fn.apply(that, args);
            });
          };
        };
        var throttle = function(fn) {
          var running;
          var lastTime = 0;
          var gDelay = lazySizesCfg.throttleDelay;
          var rICTimeout = lazySizesCfg.ricTimeout;
          var run = function() {
            running = false;
            lastTime = Date2.now();
            fn();
          };
          var idleCallback = requestIdleCallback && rICTimeout > 49 ? function() {
            requestIdleCallback(run, { timeout: rICTimeout });
            if (rICTimeout !== lazySizesCfg.ricTimeout) {
              rICTimeout = lazySizesCfg.ricTimeout;
            }
          } : rAFIt(function() {
            setTimeout2(run);
          }, true);
          return function(isPriority) {
            var delay;
            if (isPriority = isPriority === true) {
              rICTimeout = 33;
            }
            if (running) {
              return;
            }
            running = true;
            delay = gDelay - (Date2.now() - lastTime);
            if (delay < 0) {
              delay = 0;
            }
            if (isPriority || delay < 9) {
              idleCallback();
            } else {
              setTimeout2(idleCallback, delay);
            }
          };
        };
        var debounce = function(func) {
          var timeout, timestamp;
          var wait = 99;
          var run = function() {
            timeout = null;
            func();
          };
          var later = function() {
            var last = Date2.now() - timestamp;
            if (last < wait) {
              setTimeout2(later, wait - last);
            } else {
              (requestIdleCallback || run)(run);
            }
          };
          return function() {
            timestamp = Date2.now();
            if (!timeout) {
              timeout = setTimeout2(later, wait);
            }
          };
        };
        var loader = function() {
          var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
          var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
          var regImg = /^img$/i;
          var regIframe = /^iframe$/i;
          var supportScroll = "onscroll" in window2 && !/(gle|ing)bot/.test(navigator.userAgent);
          var shrinkExpand = 0;
          var currentExpand = 0;
          var isLoading = 0;
          var lowRuns = -1;
          var resetPreloading = function(e) {
            isLoading--;
            if (!e || isLoading < 0 || !e.target) {
              isLoading = 0;
            }
          };
          var isVisible = function(elem) {
            if (isBodyHidden == null) {
              isBodyHidden = getCSS(document.body, "visibility") == "hidden";
            }
            return isBodyHidden || !(getCSS(elem.parentNode, "visibility") == "hidden" && getCSS(elem, "visibility") == "hidden");
          };
          var isNestedVisible = function(elem, elemExpand) {
            var outerRect;
            var parent = elem;
            var visible = isVisible(elem);
            eLtop -= elemExpand;
            eLbottom += elemExpand;
            eLleft -= elemExpand;
            eLright += elemExpand;
            while (visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem) {
              visible = (getCSS(parent, "opacity") || 1) > 0;
              if (visible && getCSS(parent, "overflow") != "visible") {
                outerRect = parent.getBoundingClientRect();
                visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
              }
            }
            return visible;
          };
          var checkElements = function() {
            var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
            var lazyloadElems = lazysizes.elements;
            if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
              i = 0;
              lowRuns++;
              for (; i < eLlen; i++) {
                if (!lazyloadElems[i] || lazyloadElems[i]._lazyRace) {
                  continue;
                }
                if (!supportScroll || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i])) {
                  unveilElement(lazyloadElems[i]);
                  continue;
                }
                if (!(elemExpandVal = lazyloadElems[i][_getAttribute]("data-expand")) || !(elemExpand = elemExpandVal * 1)) {
                  elemExpand = currentExpand;
                }
                if (!defaultExpand) {
                  defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
                  lazysizes._defEx = defaultExpand;
                  preloadExpand = defaultExpand * lazySizesCfg.expFactor;
                  hFac = lazySizesCfg.hFac;
                  isBodyHidden = null;
                  if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden) {
                    currentExpand = preloadExpand;
                    lowRuns = 0;
                  } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
                    currentExpand = defaultExpand;
                  } else {
                    currentExpand = shrinkExpand;
                  }
                }
                if (beforeExpandVal !== elemExpand) {
                  eLvW = innerWidth + elemExpand * hFac;
                  elvH = innerHeight + elemExpand;
                  elemNegativeExpand = elemExpand * -1;
                  beforeExpandVal = elemExpand;
                }
                rect = lazyloadElems[i].getBoundingClientRect();
                if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i], elemExpand))) {
                  unveilElement(lazyloadElems[i]);
                  loadedSomething = true;
                  if (isLoading > 9) {
                    break;
                  }
                } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != "auto"))) {
                  autoLoadElem = preloadElems[0] || lazyloadElems[i];
                }
              }
              if (autoLoadElem && !loadedSomething) {
                unveilElement(autoLoadElem);
              }
            }
          };
          var throttledCheckElements = throttle(checkElements);
          var switchLoadingClass = function(e) {
            var elem = e.target;
            if (elem._lazyCache) {
              delete elem._lazyCache;
              return;
            }
            resetPreloading(e);
            addClass(elem, lazySizesCfg.loadedClass);
            removeClass(elem, lazySizesCfg.loadingClass);
            addRemoveLoadEvents(elem, rafSwitchLoadingClass);
            triggerEvent(elem, "lazyloaded");
          };
          var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
          var rafSwitchLoadingClass = function(e) {
            rafedSwitchLoadingClass({ target: e.target });
          };
          var changeIframeSrc = function(elem, src) {
            var loadMode2 = elem.getAttribute("data-load-mode") || lazySizesCfg.iframeLoadMode;
            if (loadMode2 == 0) {
              elem.contentWindow.location.replace(src);
            } else if (loadMode2 == 1) {
              elem.src = src;
            }
          };
          var handleSources = function(source) {
            var customMedia;
            var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);
            if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]("data-media") || source[_getAttribute]("media")]) {
              source.setAttribute("media", customMedia);
            }
            if (sourceSrcset) {
              source.setAttribute("srcset", sourceSrcset);
            }
          };
          var lazyUnveil = rAFIt(function(elem, detail, isAuto, sizes, isImg) {
            var src, srcset, parent, isPicture, event, firesLoad;
            if (!(event = triggerEvent(elem, "lazybeforeunveil", detail)).defaultPrevented) {
              if (sizes) {
                if (isAuto) {
                  addClass(elem, lazySizesCfg.autosizesClass);
                } else {
                  elem.setAttribute("sizes", sizes);
                }
              }
              srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
              src = elem[_getAttribute](lazySizesCfg.srcAttr);
              if (isImg) {
                parent = elem.parentNode;
                isPicture = parent && regPicture.test(parent.nodeName || "");
              }
              firesLoad = detail.firesLoad || "src" in elem && (srcset || src || isPicture);
              event = { target: elem };
              addClass(elem, lazySizesCfg.loadingClass);
              if (firesLoad) {
                clearTimeout(resetPreloadingTimer);
                resetPreloadingTimer = setTimeout2(resetPreloading, 2500);
                addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
              }
              if (isPicture) {
                forEach.call(parent.getElementsByTagName("source"), handleSources);
              }
              if (srcset) {
                elem.setAttribute("srcset", srcset);
              } else if (src && !isPicture) {
                if (regIframe.test(elem.nodeName)) {
                  changeIframeSrc(elem, src);
                } else {
                  elem.src = src;
                }
              }
              if (isImg && (srcset || isPicture)) {
                updatePolyfill(elem, { src });
              }
            }
            if (elem._lazyRace) {
              delete elem._lazyRace;
            }
            removeClass(elem, lazySizesCfg.lazyClass);
            rAF(function() {
              var isLoaded = elem.complete && elem.naturalWidth > 1;
              if (!firesLoad || isLoaded) {
                if (isLoaded) {
                  addClass(elem, lazySizesCfg.fastLoadedClass);
                }
                switchLoadingClass(event);
                elem._lazyCache = true;
                setTimeout2(function() {
                  if ("_lazyCache" in elem) {
                    delete elem._lazyCache;
                  }
                }, 9);
              }
              if (elem.loading == "lazy") {
                isLoading--;
              }
            }, true);
          });
          var unveilElement = function(elem) {
            if (elem._lazyRace) {
              return;
            }
            var detail;
            var isImg = regImg.test(elem.nodeName);
            var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]("sizes"));
            var isAuto = sizes == "auto";
            if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]("src") || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
              return;
            }
            detail = triggerEvent(elem, "lazyunveilread").detail;
            if (isAuto) {
              autoSizer.updateElem(elem, true, elem.offsetWidth);
            }
            elem._lazyRace = true;
            isLoading++;
            lazyUnveil(elem, detail, isAuto, sizes, isImg);
          };
          var afterScroll = debounce(function() {
            lazySizesCfg.loadMode = 3;
            throttledCheckElements();
          });
          var altLoadmodeScrollListner = function() {
            if (lazySizesCfg.loadMode == 3) {
              lazySizesCfg.loadMode = 2;
            }
            afterScroll();
          };
          var onload = function() {
            if (isCompleted) {
              return;
            }
            if (Date2.now() - started < 999) {
              setTimeout2(onload, 999);
              return;
            }
            isCompleted = true;
            lazySizesCfg.loadMode = 3;
            throttledCheckElements();
            addEventListener2("scroll", altLoadmodeScrollListner, true);
          };
          return {
            _: function() {
              started = Date2.now();
              lazysizes.elements = document.getElementsByClassName(lazySizesCfg.lazyClass);
              preloadElems = document.getElementsByClassName(lazySizesCfg.lazyClass + " " + lazySizesCfg.preloadClass);
              addEventListener2("scroll", throttledCheckElements, true);
              addEventListener2("resize", throttledCheckElements, true);
              addEventListener2("pageshow", function(e) {
                if (e.persisted) {
                  var loadingElements = document.querySelectorAll("." + lazySizesCfg.loadingClass);
                  if (loadingElements.length && loadingElements.forEach) {
                    requestAnimationFrame(function() {
                      loadingElements.forEach(function(img) {
                        if (img.complete) {
                          unveilElement(img);
                        }
                      });
                    });
                  }
                }
              });
              if (window2.MutationObserver) {
                new MutationObserver(throttledCheckElements).observe(docElem, { childList: true, subtree: true, attributes: true });
              } else {
                docElem[_addEventListener]("DOMNodeInserted", throttledCheckElements, true);
                docElem[_addEventListener]("DOMAttrModified", throttledCheckElements, true);
                setInterval(throttledCheckElements, 999);
              }
              addEventListener2("hashchange", throttledCheckElements, true);
              ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(name) {
                document[_addEventListener](name, throttledCheckElements, true);
              });
              if (/d$|^c/.test(document.readyState)) {
                onload();
              } else {
                addEventListener2("load", onload);
                document[_addEventListener]("DOMContentLoaded", throttledCheckElements);
                setTimeout2(onload, 2e4);
              }
              if (lazysizes.elements.length) {
                checkElements();
                rAF._lsFlush();
              } else {
                throttledCheckElements();
              }
            },
            checkElems: throttledCheckElements,
            unveil: unveilElement,
            _aLSL: altLoadmodeScrollListner
          };
        }();
        var autoSizer = function() {
          var autosizesElems;
          var sizeElement = rAFIt(function(elem, parent, event, width) {
            var sources, i, len;
            elem._lazysizesWidth = width;
            width += "px";
            elem.setAttribute("sizes", width);
            if (regPicture.test(parent.nodeName || "")) {
              sources = parent.getElementsByTagName("source");
              for (i = 0, len = sources.length; i < len; i++) {
                sources[i].setAttribute("sizes", width);
              }
            }
            if (!event.detail.dataAttr) {
              updatePolyfill(elem, event.detail);
            }
          });
          var getSizeElement = function(elem, dataAttr, width) {
            var event;
            var parent = elem.parentNode;
            if (parent) {
              width = getWidth(elem, parent, width);
              event = triggerEvent(elem, "lazybeforesizes", { width, dataAttr: !!dataAttr });
              if (!event.defaultPrevented) {
                width = event.detail.width;
                if (width && width !== elem._lazysizesWidth) {
                  sizeElement(elem, parent, event, width);
                }
              }
            }
          };
          var updateElementsSizes = function() {
            var i;
            var len = autosizesElems.length;
            if (len) {
              i = 0;
              for (; i < len; i++) {
                getSizeElement(autosizesElems[i]);
              }
            }
          };
          var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
          return {
            _: function() {
              autosizesElems = document.getElementsByClassName(lazySizesCfg.autosizesClass);
              addEventListener2("resize", debouncedUpdateElementsSizes);
            },
            checkElems: debouncedUpdateElementsSizes,
            updateElem: getSizeElement
          };
        }();
        var init = function() {
          if (!init.i && document.getElementsByClassName) {
            init.i = true;
            autoSizer._();
            loader._();
          }
        };
        setTimeout2(function() {
          if (lazySizesCfg.init) {
            init();
          }
        });
        lazysizes = {
          /**
           * @type { LazySizesConfigPartial }
           */
          cfg: lazySizesCfg,
          autoSizer,
          loader,
          init,
          uP: updatePolyfill,
          aC: addClass,
          rC: removeClass,
          hC: hasClass,
          fire: triggerEvent,
          gW: getWidth,
          rAF
        };
        return lazysizes;
      }
    );
  }
});

// node_modules/.pnpm/lazysizes@5.3.2/node_modules/lazysizes/plugins/respimg/ls.respimg.js
var require_ls_respimg = __commonJS({
  "node_modules/.pnpm/lazysizes@5.3.2/node_modules/lazysizes/plugins/respimg/ls.respimg.js"(exports, module) {
    (function(window2, factory) {
      if (!window2) {
        return;
      }
      var globalInstall = function() {
        factory(window2.lazySizes);
        window2.removeEventListener("lazyunveilread", globalInstall, true);
      };
      factory = factory.bind(null, window2, window2.document);
      if (typeof module == "object" && module.exports) {
        factory(require_lazysizes());
      } else if (typeof define == "function" && define.amd) {
        define(["lazysizes"], factory);
      } else if (window2.lazySizes) {
        globalInstall();
      } else {
        window2.addEventListener("lazyunveilread", globalInstall, true);
      }
    })(typeof window != "undefined" ? window : 0, function(window2, document, lazySizes) {
      "use strict";
      var polyfill;
      var lazySizesCfg = lazySizes.cfg;
      var img = document.createElement("img");
      var supportSrcset = "sizes" in img && "srcset" in img;
      var regHDesc = /\s+\d+h/g;
      var fixEdgeHDescriptor = function() {
        var regDescriptors = /\s+(\d+)(w|h)\s+(\d+)(w|h)/;
        var forEach = Array.prototype.forEach;
        return function() {
          var img2 = document.createElement("img");
          var removeHDescriptors = function(source) {
            var ratio, match;
            var srcset = source.getAttribute(lazySizesCfg.srcsetAttr);
            if (srcset) {
              if (match = srcset.match(regDescriptors)) {
                if (match[2] == "w") {
                  ratio = match[1] / match[3];
                } else {
                  ratio = match[3] / match[1];
                }
                if (ratio) {
                  source.setAttribute("data-aspectratio", ratio);
                }
                source.setAttribute(lazySizesCfg.srcsetAttr, srcset.replace(regHDesc, ""));
              }
            }
          };
          var handler = function(e) {
            if (e.detail.instance != lazySizes) {
              return;
            }
            var picture = e.target.parentNode;
            if (picture && picture.nodeName == "PICTURE") {
              forEach.call(picture.getElementsByTagName("source"), removeHDescriptors);
            }
            removeHDescriptors(e.target);
          };
          var test = function() {
            if (!!img2.currentSrc) {
              document.removeEventListener("lazybeforeunveil", handler);
            }
          };
          document.addEventListener("lazybeforeunveil", handler);
          img2.onload = test;
          img2.onerror = test;
          img2.srcset = "data:,a 1w 1h";
          if (img2.complete) {
            test();
          }
        };
      }();
      if (!lazySizesCfg.supportsType) {
        lazySizesCfg.supportsType = function(type) {
          return !type;
        };
      }
      if (window2.HTMLPictureElement && supportSrcset) {
        if (!lazySizes.hasHDescriptorFix && document.msElementsFromPoint) {
          lazySizes.hasHDescriptorFix = true;
          fixEdgeHDescriptor();
        }
        return;
      }
      if (window2.picturefill || lazySizesCfg.pf) {
        return;
      }
      lazySizesCfg.pf = function(options) {
        var i, len;
        if (window2.picturefill) {
          return;
        }
        for (i = 0, len = options.elements.length; i < len; i++) {
          polyfill(options.elements[i]);
        }
      };
      polyfill = function() {
        var ascendingSort = function(a, b) {
          return a.w - b.w;
        };
        var regPxLength = /^\s*\d+\.*\d*px\s*$/;
        var reduceCandidate = function(srces) {
          var lowerCandidate, bonusFactor;
          var len = srces.length;
          var candidate = srces[len - 1];
          var i = 0;
          for (i; i < len; i++) {
            candidate = srces[i];
            candidate.d = candidate.w / srces.w;
            if (candidate.d >= srces.d) {
              if (!candidate.cached && (lowerCandidate = srces[i - 1]) && lowerCandidate.d > srces.d - 0.13 * Math.pow(srces.d, 2.2)) {
                bonusFactor = Math.pow(lowerCandidate.d - 0.6, 1.6);
                if (lowerCandidate.cached) {
                  lowerCandidate.d += 0.15 * bonusFactor;
                }
                if (lowerCandidate.d + (candidate.d - srces.d) * bonusFactor > srces.d) {
                  candidate = lowerCandidate;
                }
              }
              break;
            }
          }
          return candidate;
        };
        var parseWsrcset = function() {
          var candidates;
          var regWCandidates = /(([^,\s].[^\s]+)\s+(\d+)w)/g;
          var regMultiple = /\s/;
          var addCandidate = function(match, candidate, url, wDescriptor) {
            candidates.push({
              c: candidate,
              u: url,
              w: wDescriptor * 1
            });
          };
          return function(input) {
            candidates = [];
            input = input.trim();
            input.replace(regHDesc, "").replace(regWCandidates, addCandidate);
            if (!candidates.length && input && !regMultiple.test(input)) {
              candidates.push({
                c: input,
                u: input,
                w: 99
              });
            }
            return candidates;
          };
        }();
        var runMatchMedia = function() {
          if (runMatchMedia.init) {
            return;
          }
          runMatchMedia.init = true;
          addEventListener("resize", function() {
            var timer;
            var matchMediaElems = document.getElementsByClassName("lazymatchmedia");
            var run = function() {
              var i, len;
              for (i = 0, len = matchMediaElems.length; i < len; i++) {
                polyfill(matchMediaElems[i]);
              }
            };
            return function() {
              clearTimeout(timer);
              timer = setTimeout(run, 66);
            };
          }());
        };
        var createSrcset = function(elem, isImage) {
          var parsedSet;
          var srcSet = elem.getAttribute("srcset") || elem.getAttribute(lazySizesCfg.srcsetAttr);
          if (!srcSet && isImage) {
            srcSet = !elem._lazypolyfill ? elem.getAttribute(lazySizesCfg.srcAttr) || elem.getAttribute("src") : elem._lazypolyfill._set;
          }
          if (!elem._lazypolyfill || elem._lazypolyfill._set != srcSet) {
            parsedSet = parseWsrcset(srcSet || "");
            if (isImage && elem.parentNode) {
              parsedSet.isPicture = elem.parentNode.nodeName.toUpperCase() == "PICTURE";
              if (parsedSet.isPicture) {
                if (window2.matchMedia) {
                  lazySizes.aC(elem, "lazymatchmedia");
                  runMatchMedia();
                }
              }
            }
            parsedSet._set = srcSet;
            Object.defineProperty(elem, "_lazypolyfill", {
              value: parsedSet,
              writable: true
            });
          }
        };
        var getX = function(elem) {
          var dpr = window2.devicePixelRatio || 1;
          var optimum = lazySizes.getX && lazySizes.getX(elem);
          return Math.min(optimum || dpr, 2.5, dpr);
        };
        var matchesMedia = function(media) {
          if (window2.matchMedia) {
            matchesMedia = function(media2) {
              return !media2 || (matchMedia(media2) || {}).matches;
            };
          } else {
            return !media;
          }
          return matchesMedia(media);
        };
        var getCandidate = function(elem) {
          var sources, i, len, media, source, srces, src, width;
          source = elem;
          createSrcset(source, true);
          srces = source._lazypolyfill;
          if (srces.isPicture) {
            for (i = 0, sources = elem.parentNode.getElementsByTagName("source"), len = sources.length; i < len; i++) {
              if (lazySizesCfg.supportsType(sources[i].getAttribute("type"), elem) && matchesMedia(sources[i].getAttribute("media"))) {
                source = sources[i];
                createSrcset(source);
                srces = source._lazypolyfill;
                break;
              }
            }
          }
          if (srces.length > 1) {
            width = source.getAttribute("sizes") || "";
            width = regPxLength.test(width) && parseInt(width, 10) || lazySizes.gW(elem, elem.parentNode);
            srces.d = getX(elem);
            if (!srces.src || !srces.w || srces.w < width) {
              srces.w = width;
              src = reduceCandidate(srces.sort(ascendingSort));
              srces.src = src;
            } else {
              src = srces.src;
            }
          } else {
            src = srces[0];
          }
          return src;
        };
        var p = function(elem) {
          if (supportSrcset && elem.parentNode && elem.parentNode.nodeName.toUpperCase() != "PICTURE") {
            return;
          }
          var candidate = getCandidate(elem);
          if (candidate && candidate.u && elem._lazypolyfill.cur != candidate.u) {
            elem._lazypolyfill.cur = candidate.u;
            candidate.cached = true;
            elem.setAttribute(lazySizesCfg.srcAttr, candidate.u);
            elem.setAttribute("src", candidate.u);
          }
        };
        p.parse = parseWsrcset;
        return p;
      }();
      if (lazySizesCfg.loadedClass && lazySizesCfg.loadingClass) {
        (function() {
          var sels = [];
          ['img[sizes$="px"][srcset].', "picture > img:not([srcset])."].forEach(function(sel) {
            sels.push(sel + lazySizesCfg.loadedClass);
            sels.push(sel + lazySizesCfg.loadingClass);
          });
          lazySizesCfg.pf({
            elements: document.querySelectorAll(sels.join(", "))
          });
        })();
      }
    });
  }
});

// node_modules/.pnpm/lazysizes@5.3.2/node_modules/lazysizes/plugins/unload/ls.unload.js
var require_ls_unload = __commonJS({
  "node_modules/.pnpm/lazysizes@5.3.2/node_modules/lazysizes/plugins/unload/ls.unload.js"(exports, module) {
    (function(window2, factory) {
      var globalInstall = function() {
        factory(window2.lazySizes);
        window2.removeEventListener("lazyunveilread", globalInstall, true);
      };
      factory = factory.bind(null, window2, window2.document);
      if (typeof module == "object" && module.exports) {
        factory(require_lazysizes());
      } else if (typeof define == "function" && define.amd) {
        define(["lazysizes"], factory);
      } else if (window2.lazySizes) {
        globalInstall();
      } else {
        window2.addEventListener("lazyunveilread", globalInstall, true);
      }
    })(window, function(window2, document, lazySizes) {
      "use strict";
      if (!document.addEventListener) {
        return;
      }
      var config, checkElements;
      var lazySizesCfg = lazySizes.cfg;
      var unloadElements = [];
      var requestAnimationFrame = window2.requestAnimationFrame || setTimeout;
      var unloader = {
        checkElements: function() {
          var i, len, box;
          var expand = (lazySizes._defEx + 99) * 1.1;
          var vTop = expand * -1;
          var vLeft = vTop;
          var vBottom = innerHeight + expand;
          var vRight = innerWidth + expand;
          for (i = 0, len = checkElements.length; i < len; i++) {
            box = checkElements[i].getBoundingClientRect();
            if (box.top > vBottom || box.bottom < vTop || box.left > vRight || box.right < vLeft || config.unloadHidden && !box.top && !box.bottom && !box.left && !box.right) {
              unloadElements.push(checkElements[i]);
            }
          }
          requestAnimationFrame(unloader.unloadElements);
        },
        unload: function(element) {
          var sources, isResponsive, i, len;
          var picture = element.parentNode;
          lazySizes.rC(element, config.loadedClass);
          if (element.getAttribute(config.srcsetAttr)) {
            element.setAttribute("srcset", config.emptySrc);
            isResponsive = true;
          }
          if (picture && picture.nodeName.toUpperCase() == "PICTURE") {
            sources = picture.getElementsByTagName("source");
            for (i = 0, len = sources.length; i < len; i++) {
              sources[i].setAttribute("srcset", config.emptySrc);
            }
            isResponsive = true;
          }
          if (lazySizes.hC(element, config.autosizesClass)) {
            lazySizes.rC(element, config.autosizesClass);
            element.setAttribute(config.sizesAttr, "auto");
          }
          if (isResponsive || element.getAttribute(config.srcAttr)) {
            element.src = config.emptySrc;
          }
          lazySizes.aC(element, config.unloadedClass);
          lazySizes.aC(element, config.lazyClass);
          lazySizes.fire(element, "lazyafterunload");
        },
        unloadElements: function(elements) {
          elements = Array.isArray(elements) ? elements : unloadElements;
          while (elements.length) {
            unloader.unload(elements.shift());
          }
        },
        _reload: function(e) {
          if (lazySizes.hC(e.target, config.unloadedClass) && e.detail) {
            e.detail.reloaded = true;
            lazySizes.rC(e.target, config.unloadedClass);
          }
        }
      };
      function init() {
        if (!window2.lazySizes || checkElements) {
          return;
        }
        var docElem = document.documentElement;
        var throttleRun = function() {
          var running;
          var run = function() {
            unloader.checkElements();
            running = false;
          };
          return function() {
            if (!running) {
              running = true;
              setTimeout(run, 999);
            }
          };
        }();
        config = lazySizes.cfg;
        removeEventListener("lazybeforeunveil", init);
        if (!("unloadClass" in config)) {
          config.unloadClass = "lazyunload";
        }
        if (!("unloadedClass" in config)) {
          config.unloadedClass = "lazyunloaded";
        }
        if (!("unloadHidden" in config)) {
          config.unloadHidden = true;
        }
        if (!("emptySrc" in config)) {
          config.emptySrc = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        }
        if (!("autoUnload" in config)) {
          config.autoUnload = true;
        }
        if (!("unloadPixelThreshold" in config)) {
          config.unloadPixelThreshold = 6e4;
        }
        if (config.autoUnload) {
          docElem.addEventListener("load", function(e) {
            if (e.target.naturalWidth * e.target.naturalHeight > config.unloadPixelThreshold && e.target.className && e.target.className.indexOf && e.target.className.indexOf(lazySizesCfg.loadingClass) != -1 && e.target.className.indexOf(lazySizesCfg.preloadClass) == -1) {
              lazySizes.aC(e.target, lazySizesCfg.unloadClass);
            }
          }, true);
        }
        lazySizes.unloader = unloader;
        checkElements = document.getElementsByClassName([config.unloadClass, config.loadedClass].join(" "));
        setInterval(throttleRun, 9999);
        addEventListener("lazybeforeunveil", throttleRun);
        addEventListener("lazybeforeunveil", unloader._reload, true);
      }
      addEventListener("lazybeforeunveil", init);
    });
  }
});

// node_modules/.pnpm/lazysizes@5.3.2/node_modules/lazysizes/plugins/attrchange/ls.attrchange.js
var require_ls_attrchange = __commonJS({
  "node_modules/.pnpm/lazysizes@5.3.2/node_modules/lazysizes/plugins/attrchange/ls.attrchange.js"(exports, module) {
    (function(window2, factory) {
      if (!window2) {
        return;
      }
      var globalInstall = function() {
        factory(window2.lazySizes);
        window2.removeEventListener("lazyunveilread", globalInstall, true);
      };
      factory = factory.bind(null, window2, window2.document);
      if (typeof module == "object" && module.exports) {
        factory(require_lazysizes());
      } else if (typeof define == "function" && define.amd) {
        define(["lazysizes"], factory);
      } else if (window2.lazySizes) {
        globalInstall();
      } else {
        window2.addEventListener("lazyunveilread", globalInstall, true);
      }
    })(typeof window != "undefined" ? window : 0, function(window2, document, lazySizes) {
      "use strict";
      var addObserver = function() {
        var connect, disconnect, observer, connected;
        var lsCfg = lazySizes.cfg;
        var attributes = { "data-bgset": 1, "data-include": 1, "data-poster": 1, "data-bg": 1, "data-script": 1 };
        var regClassTest = "(\\s|^)(" + lsCfg.loadedClass;
        var docElem = document.documentElement;
        var setClass = function(target) {
          lazySizes.rAF(function() {
            lazySizes.rC(target, lsCfg.loadedClass);
            if (lsCfg.unloadedClass) {
              lazySizes.rC(target, lsCfg.unloadedClass);
            }
            lazySizes.aC(target, lsCfg.lazyClass);
            if (target.style.display == "none" || target.parentNode && target.parentNode.style.display == "none") {
              setTimeout(function() {
                lazySizes.loader.unveil(target);
              }, 0);
            }
          });
        };
        var onMutation = function(mutations) {
          var i, len, mutation, target;
          for (i = 0, len = mutations.length; i < len; i++) {
            mutation = mutations[i];
            target = mutation.target;
            if (!target.getAttribute(mutation.attributeName)) {
              continue;
            }
            if (target.localName == "source" && target.parentNode) {
              target = target.parentNode.querySelector("img");
            }
            if (target && regClassTest.test(target.className)) {
              setClass(target);
            }
          }
        };
        if (lsCfg.unloadedClass) {
          regClassTest += "|" + lsCfg.unloadedClass;
        }
        regClassTest += "|" + lsCfg.loadingClass + ")(\\s|$)";
        regClassTest = new RegExp(regClassTest);
        attributes[lsCfg.srcAttr] = 1;
        attributes[lsCfg.srcsetAttr] = 1;
        if (window2.MutationObserver) {
          observer = new MutationObserver(onMutation);
          connect = function() {
            if (!connected) {
              connected = true;
              observer.observe(docElem, { subtree: true, attributes: true, attributeFilter: Object.keys(attributes) });
            }
          };
          disconnect = function() {
            if (connected) {
              connected = false;
              observer.disconnect();
            }
          };
        } else {
          docElem.addEventListener("DOMAttrModified", function() {
            var runs;
            var modifications = [];
            var callMutations = function() {
              onMutation(modifications);
              modifications = [];
              runs = false;
            };
            return function(e) {
              if (connected && attributes[e.attrName] && e.newValue) {
                modifications.push({ target: e.target, attributeName: e.attrName });
                if (!runs) {
                  setTimeout(callMutations);
                  runs = true;
                }
              }
            };
          }(), true);
          connect = function() {
            connected = true;
          };
          disconnect = function() {
            connected = false;
          };
        }
        addEventListener("lazybeforeunveil", disconnect, true);
        addEventListener("lazybeforeunveil", connect);
        addEventListener("lazybeforesizes", disconnect, true);
        addEventListener("lazybeforesizes", connect);
        connect();
        removeEventListener("lazybeforeunveil", addObserver);
      };
      addEventListener("lazybeforeunveil", addObserver);
    });
  }
});

// src/scripts/modules/lazysizes.ts
var import_lazysizes = __toESM(require_lazysizes());
var import_ls = __toESM(require_ls_respimg());
var import_ls2 = __toESM(require_ls_unload());
var import_ls3 = __toESM(require_ls_attrchange());
import_lazysizes.default.cfg.lazyClass = "lazy ";
import_lazysizes.default.cfg.init = false;
import_lazysizes.default.cfg.loadMode = 1;
import_lazysizes.default.cfg.customMedia = {
  xs: "(max-width: 320px)",
  sm: "(min-width: 320px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1440px)"
};
var lazysizes_default = import_lazysizes.default;
export {
  lazysizes_default as default
};
