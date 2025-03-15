import { App } from './application/app';
import { Drawer } from './components/drawer';
import { Carousel } from './components/carousel';
import { Accordion } from './components/accordion';

export default App({

  targets: [
    '#navigation',
    '#main'
  ],
  screens: {
    xs: '(max-width: 576px)',
    sm: '(min-width: 577px) and (max-width: 767px)',
    md: '(min-width: 768px) and (max-width: 991px)',
    lg: '(min-width: 992px) and (max-width: 1199px)',
    xl: '(min-width: 1200px) and (max-width: 1399px)',
    xxl: '(min-width: 1400px)'
  },
  controllers: {
    Drawer,
    Accordion,
    Carousel
  }
});
