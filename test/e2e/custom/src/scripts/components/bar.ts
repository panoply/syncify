import m from 'mithril';

export default function () {
  console.log('mous');
  const node = document.querySelector('#some-vnode');

  m.mount(node, {
    view: () => m('h1', 'hello world')
  });

  console.log('fo');
  return 'basssd';
}
