import m from 'mithril';

export default function () {

  const node = document.querySelector('#example-mount');

  if(node) {

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

}
