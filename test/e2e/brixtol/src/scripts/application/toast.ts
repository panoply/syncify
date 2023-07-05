import m from 'mithril';
import { assign } from 'utils/native';

export type ToastHorizontalPositions = 'left' | 'center' | 'right';
export type ToastVerticalPositions = 'top' | 'center' | 'bottom';
export type ToastSeverities = 'error' | 'info' | 'success' | 'warning';

export interface ToastOptions {
  delay?: number;
  dismiss?: string;
  dismissible?: boolean;
  hPos?: ToastHorizontalPositions;
  newestAtTop?: boolean;
  severity?: ToastSeverities;
  vPos?: ToastVerticalPositions;
}

export function toast (message: string, options?: {
  delay: number,
  dismissible: false,
  newestAtTop: true,
  severity: 'info',
  align: 'bottom',
  justify: 'middle'
}) {

  const config = assign({
    delay: 3000,
    dismissible: false,
    newestAtTop: true,
    severity: 'info',
    align: 'bottom',
    justify: 'left'
  }, options);

  // headless virtual node
  const vnode = document.createElement('div');

  // headless render
  m.render(vnode, m(
    `ul.toast.toast-${config.align}.toast-${config.justify}`
    , m(
      `li.toast-item.${config.severity}`
      , m('p.toast-text', message)
      , m(
        'button.toast-dismiss'
        , { onclick: ({ target }) => target.parentElement.remove() }
        , m('svg', m('use[xlink:href="#cross"]'))
      )
    )
    , m(
      `li.toast-item.${config.severity}`
      , m('p.toast-text', message)
      , m(
        'button.toast-dismiss'
        , { onclick: ({ target }) => target.parentElement.remove() }
        , m('svg', m('use[xlink:href="#cross"]'))
      )
    )
  ));

  if (config.delay > 0) setTimeout(() => { vnode.remove(); }, config.delay);

  // document.body.appendChild(vnode);

}
