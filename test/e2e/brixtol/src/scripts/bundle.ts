import { brixtol } from './application/app';
import { Locale } from './controllers/locale';
import { Drawer } from './controllers/drawer';
import { Gdrp } from './controllers/gdrp';
import { Cart } from './controllers/cart';
import { Carousel } from './controllers/carousel';
import { Dropdown } from './controllers/dropdown';
import { Tabs } from './controllers/tabs';
import { Form } from './controllers/forms';
// import { Accordion } from './controllers/accordion';
import { Filter } from './controllers/filters';
// import { Mailer } from './controllers/mailer';
// import { Newsletter } from './controllers/newsletter';
import { Viewer } from './controllers/viewer';
import { Purchase } from './controllers/purchase';
import { Sizing } from './controllers/sizing';
import { Sticky } from './controllers/sticky';
// import { Rewaxing } from './controllers/rewaxing';
// import { Subscription } from './controllers/subscribe';

export default brixtol({
  targets: [
    '#navigation',
    '#main'
  ],
  screens: {
    xs: '(max-width: 576px)',
    sm: '(min-width: 577px) and (max-width: 767px)',
    md: '(min-width: 768px) and (max-width: 1079px)',
    lg: '(min-width: 1080px)'
  },
  controllers: {
    Cart,
    Gdrp,
    Locale,
    Form,
    Drawer,
    Tabs,
    // Accordion,
    Dropdown,
    Carousel,
    Viewer,
    Purchase,
    Filter,
    // Mailer,
    // Newsletter,
    Sizing,
    Sticky
    // Rewaxing,
    // Subscription
  }
});
