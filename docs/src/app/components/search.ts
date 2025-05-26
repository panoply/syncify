import type { SearchContent, SearchHeading, SearchIndex, SearchPage } from 'e11ty';

import { matchSorter } from 'match-sorter';
import spx, { SPX } from 'spx';

export class Search extends spx.Component({
  id: 'search',
  nodes: <const>[
    'list',
    'input',
    'active'
  ],
  state: {
    active: Boolean,
    query: String,
    source: String
  }
}) {

  private keymap = {
    ArrowUp: 'previous',
    Up: 'previous',
    ArrowDown: 'next',
    Down: 'next'
  };

  public async connect () {

    this.index = await spx.http<SearchIndex>(this.state.source);

  }

  /** Keypress event via `spx@window:keydown` */
  public onKeyboard (event: KeyboardEvent) {

    if (!this.state.active || this.result.length === 0) return;

    if (event.key in this.keymap) {

      event.preventDefault();

      const item = this.listNode.querySelector('li[tabindex="0"]');
      const goto = this.keymap[event.key];
      const find = item[goto + 'ElementSibling'] as HTMLElement;
      const next = find || this.listNode.children[goto === 'next' ? 0 : this.listNode.childElementCount - 1];

      item.setAttribute('tabindex', '-1');
      next.setAttribute('tabindex', '0');
      next.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });

    }
  };

  private hide () {

    document.removeEventListener('click', this.outsideClick);

    this.listNode.classList.replace('d-block', 'd-none');
    this.inputNode.classList.remove('is-active', 'is-results');
    this.state.active = false;

  }

  inputOpen () {
    if (!this.state.active) {
      this.state.active = true;
      document.addEventListener('click', this.outsideClick.bind(this));
    }
  }

  outsideClick (event: Event) {
    if (this.listNode !== event.target && this.inputNode !== event.target) {
      this.hide();
    }
  }

  onFocus () {

    if (!this.inputNode.classList.contains('is-active')) {
      this.inputNode.classList.add('is-active');
    }

    setTimeout(() => {

      if (this.result.length > 0 && !this.listNode.classList.contains('d-block')) {
        this.listNode.classList.replace('d-none', 'd-block');
        this.inputNode.classList.add('is-results');
      }

      if (this.state.query.length <= 2) {
        this.inputNode.classList.remove('is-results');
      } else {
        this.inputNode.classList.add('is-results');
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

        this.listNode.innerHTML = '';
        this.listNode.classList.add('no-results');
        this.noResults = this.nothing;
        this.listNode.appendChild(this.noResults);

      } else {

        const filter = this.result.sort((a, b) => a.sort - b.sort).map(content => this.item(content));

        this.showList(input, filter);

      }

    } else {

      if (input.length === 0) {
        this.inputNode.classList.remove('is-results');
        this.listNode.classList.replace('d-block', 'd-none');
      }

      return;

    }

    if (!this.listNode.classList.contains('d-block')) {
      this.listNode.classList.replace('d-none', 'd-block');
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

    const match = new RegExp(`(?:(?<=\\s)[a-z]+)?(${query})`, 'gi');

    this.listNode.classList.contains('no-results') && this.listNode.classList.remove('no-results');
    this.listNode.innerHTML = '';

    const nodes = result.map(({ content, page, heading }, index) => {

      const sentence = content.type === 'heading' ? content.text : this.sentence(content.text, match);
      const located = content.type === 'heading' ? page.title : this.index.content[heading.cidx[0]].text;

      return spx.dom`
        <li tabindex="${index === 0 ? '0' : '-1'}">
          <a href="${heading.anchor}" class="d-flex ai-center">
            <div class="w-icon">
              <svg class="icon"><use xlink:href="#svg-search-${content.type}"></use></svg>
            </div>
            <div class="px-3">
              <div class="result">
                ${sentence.replace(match, '<strong>$1</strong>')}
              </div>
              <div class="d-block upper ff-heading fw-bold fc-dark-gray fs-xs">
                ${located}
              </div>
            </div>
            <div class="w-icon">
              <svg class="icon icon-goto"><use xlink:href="#svg-search-goto"></use></svg>
            </div>
          </a>
        </li>
      `;
    });

    this.listNode.append(...nodes);

  }

  get nothing (): HTMLLIElement {
    return spx.dom`
      <li>
        <div class="row jc-center">
          <h4 class="col-12 tc mb-3">
            "<span class="fc-gray normal">${this.state.query}</span>"
          </h4>
          <h6 class="col-12 fs-xs tc mb-3 fc-white">
            Nothing Found
          </h6>
          <div class="col-auto">
            <svg class="icon icon-clown mx-auto">
            <use xlink:href="#svg-clown"></use>
            </svg>
          </div>
        </div>
      </li>
    `;
  }

  public index: SearchIndex;
  public result: SearchContent[] = [];
  public noResults: HTMLLIElement;
  public match = {
    keys: [
      {
        threshold: matchSorter.rankings.CONTAINS,
        key: 'text'
      }
    ]
  };

}
