import m from 'mithril';

console.log('mous');
const node = document.createElement('div');

m.mount(node, {
  view: () => m('h1', 'hello worldssss')
});

document.body.appendChild(node);

export default function () {
  console.log('fo');
  return 'basssd';
}
