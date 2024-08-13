import lazySizes from 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'lazysizes/plugins/unload/ls.unload';
import 'lazysizes/plugins/native-loading/ls.native-loading';

lazySizes.cfg.lazyClass = 'lazy';
lazySizes.cfg.init = false;
lazySizes.cfg.preloadAfterLoad = false;
lazySizes.cfg.loadMode = 1;
lazySizes.cfg.nativeLoading = {
  setLoadingAttribute: true,
  disableListeners: {
    focus: false,
    mouseover: false,
    click: false,
    load: false,
    transitionend: false,
    animationend: false,
    scroll: true,
    resize: true
  }
};

lazySizes.cfg.customMedia = {
  xxs: '(max-width: 343px)',
  xs: '(min-width: 344px) and (max-width: 576px)',
  sm: '(min-width: 577px) and (max-width: 767px)',
  md: '(min-width: 768px) and (max-width: 1023px)',
  lg: '(min-width: 1024px) and (max-width: 1399px)',
  xl: '(min-width: 1400px) and (max-width: 1799px)',
  xxl: '(min-width: 1800px)'
};
