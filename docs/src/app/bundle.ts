import spx from 'spx';
import { Drawer } from './components/drawer';
import { Dropdown } from './components/dropdown';
import { Search } from './components/search';
import { Sidebar } from './components/sidebar';
import { ScrollSpy } from './components/scrollspy';

spx({
  fragments: [
    'content',
    'menu'
  ],
  components: {
    Dropdown,
    Drawer,
    Search,
    ScrollSpy,
    Sidebar
  },
  logLevel: 1,
  hover: {
    threshold: 100,
    trigger: 'href'
  },
  progress: {
    bgColor: 'red'
  }
});
