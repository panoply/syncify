/* eslint-disable no-use-before-define */

import type { SearchContent, SearchHeading, SearchIndex, SearchPage } from '@e11ty/eleventy-plugin-search-index';
import spx, { SPX } from 'spx';
import { matchSorter } from 'match-sorter';
import { glue } from '../utils';

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

  /**
   * SPX Connect Lifecyle Method
   */
  public async connect () {

    this.index = await this.getJSON();

  }

  /**
   * Get search index
   */
  private async getJSON () {

    return (await fetch(this.state.source)).json();

  }

  private hide () {

    document.removeEventListener('click', this.outsideClick);

    this.dom.listNode.classList.replace('d-block', 'd-none');
    this.dom.inputNode.classList.remove('is-active', 'is-results');
    this.state.active = false;

  }

  inputOpen () {
    if (!this.state.active) {
      this.state.active = true;
      document.addEventListener('click', this.outsideClick.bind(this));
    }
  }

  outsideClick (event: Event) {

    if (this.dom.listNode !== event.target && this.dom.inputNode !== event.target) {

      this.hide();

    }

  }

  onFocus () {

    if (!this.dom.inputNode.classList.contains('is-active')) {
      this.dom.inputNode.classList.add('is-active');
    }

    setTimeout(() => {

      if (this.result.length > 0 && !this.dom.listNode.classList.contains('d-block')) {
        this.dom.listNode.classList.replace('d-none', 'd-block');
        this.dom.inputNode.classList.add('is-results');
      }

      if (this.state.query.length <= 2) {
        this.dom.inputNode.classList.remove('is-results');
      } else {
        this.dom.inputNode.classList.add('is-results');
      }

    }, 300);

    this.inputOpen();

  }

  item (content: SearchContent) {

    return {
      page: this.index.pages[content.pidx],
      heading: this.index.heading[content.hidx],
      content
    };

  }

  onInput ({ target }: SPX.InputEvent<{}, HTMLInputElement>) {

    const input = this.state.query = target.value.trim();

    if (input.length > 1) {

      this.result = matchSorter(this.index.content, input, this.match);

      if (this.result.length === 0) {

        this.dom.listNode.innerHTML = '';
        this.dom.listNode.classList.add('no-results');
        this.noResults.innerHTML = this.nothing;
        this.dom.listNode.appendChild(this.noResults);

      } else {

        const filter = this.result.sort((a, b) => a.sort - b.sort).map(content => this.item(content));

        this.showList(input, filter);

      }

    } else {

      if (input.length === 0) {
        this.dom.inputNode.classList.remove('is-results');
        this.dom.listNode.classList.replace('d-block', 'd-none');
      }

      return;

    }

    if (!this.dom.listNode.classList.contains('d-block')) {
      this.dom.listNode.classList.replace('d-none', 'd-block');
    }

    this.inputOpen();

  }

  sentence (text: string, match: RegExp) {

    const R = 4;

    const offset = text.search(match);

    if (offset === 0) return text;

    const before = text.slice(0, offset);

    // Split the words before the match
    const words = before.trim().split(/\s+/);

    // Check for a full stop within the last 4 words
    const dot = before.lastIndexOf('.', offset);

    if (words.length >= R && dot !== -1 && dot >= before.length - R * words[words.length - 1].length) {
      return text.slice(dot + 1).trim();
    } else {
      return text.slice(offset).trim();
    }

  }

  showList (query: string, result: Array<{
    page: SearchPage;
    heading: SearchHeading;
    content: SearchContent;
  }>) {

    const match = new RegExp(`(${query})`, 'gi');

    this.dom.listNode.classList.contains('no-results') && this.dom.listNode.classList.remove('no-results');
    this.dom.listNode.innerHTML = '';

    const nodes = result.map(({ content, page, heading }) => {

      const sentence = content.type === 'heading' ? content.text : this.sentence(content.text, match);
      const located = content.type === 'heading' ? page.title : this.index.content[heading.cidx[0]].text;
      const node = document.createElement('li');

      node.innerHTML = glue(
        `<a href="${heading.anchor}" class="d-flex ai-center">`,
        '<div class="w-icon">',
        '<svg class="icon">',
        `<use xlink:href="#svg-search-${content.type}"></use>`,
        '</svg>',
        '</div>',
        '<div class="px-3">',
        '<div class="result">',
        `${sentence.replace(match, '<strong>$1</strong>')}`,
        '</div>',
        '<div class="d-block upper ff-heading fw-bold fc-dark-gray fs-xs">',
        `${located}`,
        '</div>',
        '</div>',
        '<div class="w-icon">',
        '<svg class="icon icon-goto">',
        '<use xlink:href="#svg-search-goto"></use>',
        '</svg>',
        '</div>',
        '</a>'
      );

      return node;

    });

    this.dom.listNode.append(...nodes);

  }

  get nothing () {
    return glue(
      '<div class="row jc-center">',
      `<h4 class="col-12 tc mb-3">"<span class="fc-gray normal">${this.state.query}</span>"</h4>`,
      '<h6 class="col-12 fs-xs tc mb-3 fc-white">',
      'Nothing Found',
      '</h6>',
      '<div class="col-auto">',
      '<svg class="icon icon-clown mx-auto">',
      '<use xlink:href="#svg-clown"></use>',
      '</svg>',
      '</div>',
      '</div>'
    );
  }

  public index: SearchIndex;
  public result: SearchContent[];
  public match = { keys: [ { threshold: matchSorter.rankings.CONTAINS, key: 'text' } ] };
  public noResults: HTMLLIElement = document.createElement('li');

}
