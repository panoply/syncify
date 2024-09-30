import spx from 'spx';
// import { Accordion } from './components/accordion';
// import { Drawer } from './components/drawer';
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
})(function () {

  document.addEventListener('mouseover', function (e) {
    if (e.target instanceof HTMLElement) {
      if (
        e.target.classList.contains('token') && (
          e.target.classList.contains('maybe-class-name') ||
          e.target.classList.contains('property')
        )) {

        console.log(e.target.innerHTML);
      }
    }
  });

});
