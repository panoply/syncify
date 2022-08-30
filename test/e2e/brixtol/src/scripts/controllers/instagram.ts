// @ts-nocheck
import { Controller } from '@hotwired/stimulus';
import m from 'mithril';

export class Instagram extends Controller {

  /**
   * Stimulus Targets
   *
   * @static
   */
  static targets = [
    'feed'
  ];

  /**
   * Stimulus Initialize
   */
  initialize () {

    this.token = this.data.get('token');
    this.count = this.data.get('count');
    this.class = this.data.get('class');

    this.api();

  }

  /**
   * Stimulus Connect
   */
  connect () {

  }

  /**
   * Mithril Request
   * Instagram API image feed
   *
   * @async
   */
  async api () {

    const response = await m.request({
      method: 'GET',
      url: 'https://api.instagram.com/v1/users/self/media/recent',
      params: {
        access_token: this.token,
        count: this.count
      }
    });

    return this.component(response.data);

  }

  /**
   * Mithril Component
   *
   * @param {array} data – Recent photos from Instagram feed
   */
  component (data) {

    return m.render(this.feedTarget, [
      data.map(item => [
        m('div', {
          class: this.class
        }, [
          m('a[target="_blank"]', {
            href: item.link
          }, [
            m('img.img-fluid', {
              'data-src': item.images.thumbnail.url
            })
          ])
        ])
      ])
    ]);

  }

}
