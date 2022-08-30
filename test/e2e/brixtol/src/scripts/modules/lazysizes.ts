import lazy from 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'lazysizes/plugins/unload/ls.unload';
import 'lazysizes/plugins/attrchange/ls.attrchange';

lazy.cfg.lazyClass = 'lazy';
lazy.cfg.init = false;
lazy.cfg.loadMode = 1;
lazy.cfg.customMedia = {
  xs: '(max-width: 320px)',
  sm: '(min-width: 320px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1440px)'
};

export default lazy;
