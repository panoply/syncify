import bar from './dir/bar';
import foo from './dir/foo';
import m from 'mithril';
// f

const mount = document.createElement('div');

Object.assign(mount.style, {
  position: 'fixed',
  top: '0',
  left: '44%',
  margin: '0 auto',
  height: '18px',
  width: '180px',
  backgroundColor: '#673ab7',
  borderRadius: '5px',
  borderTopLeftRadius: '0',
  borderTopRightRadius: '0',
  display: 'flex',
  color: 'white',
  fontFamily: 'monospace',
  textAlign: 'center',
  justifyContent: 'space-around',
  alignContent: 'center',
  lineHeight: 'initial',
  fontSize: '12px',
  textTransform: 'uppercase'
});

document.body.append(mount);

m.mount(mount, { view: () => m('span', 'this is a test hello world') });

// ss
export { bar, foo };
