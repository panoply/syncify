import m from 'mithril';

export default function () {

  const node = document.querySelector('#some-vnode');

  m.mount(node, {
    view: () => [
      m(
        '.row.justify-content-center.my-5',
        m('.col-auto.bg-danger',
          m('h1', 'FOO - Virtual DOM'),

        )
      )
    ]
  });

}
