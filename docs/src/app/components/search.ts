/* eslint-disable no-use-before-define */

import spx, { SPX } from 'spx';
import Fuse from 'fuse.js';

interface Results {
  title: string;
  content: string;
  heading: string;
  url: string;
}

interface Result {
  [heading: string]: {
    header: string;
    isHeader: boolean,
    url: string;
    items: string[]
  }
}

export class Search extends spx.Component<typeof Search.define> {

  static define = {
    id: 'search',
    state: {
      active: Boolean,
      query: String,
      source: String
    },
    nodes: <const>[
      'list',
      'input'
    ]
  };

  async connect () {

    const list = await fetch(this.state.source);

    this.list = await list.json();
    this.fuse = new Fuse(this.list, {
      keys: [
        'title',
        'heading',
        'content'
      ],
      threshold: 0.1,
      isCaseSensitive: false,
      includeMatches: false
    });

  }

  hide () {

    removeEventListener('click', this.outsideClick);

    this.dom.listNode.classList.replace('d-block', 'd-none');
    this.dom.inputNode.classList.remove('is-active', 'is-results');
    this.state.active = false;

  }

  outsideClick (event: Event) {

    if (this.dom.listNode !== event.target && this.dom.inputNode !== event.target) {
      this.hide();
    }

  }

  onFocus () {

    this.dom.inputNode.classList.add('is-active');

    if (this.result.length > 0 && !this.dom.listNode.classList.contains('d-block')) {
      setTimeout(() => this.dom.listNode.classList.replace('d-none', 'd-block'), 80);
      this.dom.inputNode.classList.add('is-results');
    }

    if (this.state.query.length <= 2) {
      this.dom.inputNode.classList.remove('is-results');
    } else {
      this.dom.inputNode.classList.add('is-results');
    }

  }

  onInput ({ target }: SPX.InputEvent<{}, HTMLInputElement>) {

    this.state.query = target.value;
    this.result = this.fuse.search(this.state.query, { limit: 10 });

    if (!this.state.active) {
      this.dom.listNode.classList.replace('d-none', 'd-block');
      this.state.active = true;
      addEventListener('click', this.outsideClick.bind(this));
    }

    if (this.state.query.length === 0) {

      this.dom.inputNode.classList.remove('is-results');
      this.dom.listNode.classList.replace('d-block', 'd-none');

    } else if (!this.dom.listNode.classList.contains('d-block')) {

      this.dom.listNode.classList.replace('d-none', 'd-block');

    }

    this.showList();

  }

  showList () {

    if (this.state.query.length < 1) {
      this.dom.inputNode.classList.remove('is-results');
    } else {
      this.dom.inputNode.classList.add('is-results');
    }

    const result: Result = {};
    const match = new RegExp(`(${this.state.query})`, 'gi');

    this.dom.listNode.innerHTML = '';
    this.dom.listNode.classList.remove('no-results');
    this.result.forEach(({ item }) => {

      const content = item.content === ''
        ? item.title
        : item.content;

      let offset = item.heading.search(match);

      let isHeader: boolean = true;

      if (offset === -1) {
        offset = content.search(match);
        isHeader = false;
      }

      const slice = content.slice(offset);

      if (slice.trim().length > 0) {

        const value = slice.trim().slice(0, 100);

        if (value.length > 2) {

          let header: string;

          if (item.title !== item.heading && item.heading !== '' && !/[(:]/.test(item.heading)) {
            header = item.heading;
          } else {
            header = '';
          }

          if (!(item.title in result)) {
            result[item.title] = {
              header,
              isHeader: header !== '' ? isHeader : false,
              url: item.url,
              items: []
            };
          }

          if (value.length > 50) {
            result[item.title].items.push(
              '<div class="result">',
              '<span>',
              value.replace(match, '<strong class="fc-blue">$1</strong>'),
              '...',
              '</span>',
              '</div>'
            );
          }
        }
      }
    });

    const items = Object.keys(result);

    if (items.length === 0) {
      const element = document.createElement('li');
      element.innerHTML = '<h4 class="mb-0">No Results</h4>';
      this.dom.listNode.classList.add('no-results');
      this.dom.listNode.appendChild(element);
    } else {
      items.forEach(group => {

        const record = result[group];
        const element = document.createElement('li');

        element.innerHTML = [
          `<a href="${record.url}">`,
          '<h5 class="row ai-center jc-between px-2">',
          `<span class="col-auto">${record.isHeader ? record.header : group}</span>`,
          `<span class="col-auto fc-dark-gray fs-xs">${record.isHeader ? group : record.header}</span>`,
          '</h5>',
          `${record.items.join('')}`,
          '</a>'
        ].join('');

        this.dom.listNode.appendChild(element);
      });
    }
  }

  public fuse: Fuse<Results>;
  public list: Results[] = [];
  public result: Array<{ item: Results; refIndex: number; }> = [];

}
