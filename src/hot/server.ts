import { Bundle, HOT } from 'types';
import { join, basename } from 'node:path';
import { Server } from 'ws';
import statics from 'serve-static';
import handler from 'finalhandler';
import http from 'node:http';
import { log, tui, bold, gray } from '~log';
import { bundle } from '~config';
import { injectSnippet, injectRender } from './inject';

async function injection () {

  log.update(tui.message('gray', 'validating snippet injection'));

  const snippet = await injectSnippet();

  if (snippet) {

    log.update(tui.message('gray', 'validating layouts'));

    for (const layout in bundle.hot.alive) {

      const render = await injectRender(layout);

      if (!render) {
        log.update.clear();
        log.err('Failed to inject render tag');
      }
    }

    log.update.clear();

  } else {

    log.update.clear();
    log.err('Failed to upload snippet');

  }

}

/**
 * Serve Assets
 *
 * Creates a server for assets files in hot mode
 */
export async function server (bundle: Bundle<HOT>) {

  log.out(tui.message('whiteBright', bold(`${bundle.hot.method === 'hot' ? 'HOT' : 'LIVE'} Reloading:`)));
  log.nwl();
  log.update(tui.message('gray', 'configuring HOT Reload'));

  await injection();

  function setHeaders (res: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=0');
  }

  const assets = statics(join(bundle.dirs.output, 'assets'), { setHeaders });
  const server = http.createServer((req, res) => assets(req, res, handler(req, res) as any));
  const localhost = `http://localhost:${bundle.hot.server}`;

  server.listen(bundle.hot.server);

  log.out(tui.message('pink', `server → ${bold('assets')} → ${gray.underline(localhost)}`));

};

/**
 * Socket
 *
 * Used in `watch` mode and faciliatates the hot reloading
 * by sending change events to the document.
 */
export function socket () {

  const wss = new Server({
    port: bundle.hot.socket,
    path: '/ws'
  });

  wss.on('connection', v => {
    wss.on('script', (src) => v.send(`script,${src}`));
    wss.on('stylesheet', (href) => v.send(`stylesheet,${href}`));
    wss.on('section', (id) => v.send(`section,${id}`));
    wss.on('svg', (id) => v.send(`svg,${id}`));
    wss.on('assets', () => v.send('assets'));
    wss.on('reload', () => v.send('reload'));
    wss.on('replace', () => v.send('replace'));
  });

  return {
    script: (src: string) => wss.emit('script', basename(src)),
    stylesheet: (href: string) => wss.emit('stylesheet', basename(href)),
    section: (id: string) => wss.emit('section', id),
    svg: (id: string) => wss.emit('svg', id),
    assets: () => wss.emit('assets'),
    reload: () => wss.emit('reload'),
    replace: () => wss.emit('replace')
  };
};
