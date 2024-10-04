import spx from 'spx';
import { Accordion } from './components/accordion';
import { Drawer } from './components/drawer';
import { Dropdown } from './components/dropdown';
import { Search } from './components/search';
import { Sidebar } from './components/sidebar';
import { ScrollSpy } from './components/scrollspy';

export default spx({
  fragments: [
    'content',
    'menu'
  ],
  components: {
    Accordion,
    Drawer,
    Dropdown,
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
