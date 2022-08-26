import { Bundle, HOT } from 'types';
import { join } from 'path';
import { Server } from 'ws';
import statics from 'serve-static';
import handler from 'finalhandler';
import http from 'node:http';

/**
 * Serve Assets
 *
 * Creates a server for assets files in hot mode
 */
export function server (bundle: Bundle<HOT>) {

  function setHeaders (res: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=0');
  }

  const assets = statics(join(bundle.dirs.output, 'assets'), { setHeaders });
  const server = http.createServer((req, res) => assets(req, res, handler(req, res) as any));

  server.listen(bundle.hot.server);

};

/**
 * Socket
 *
 * Used in `watch` mode and faciliatates the hot reloading
 * by sending change events to the document.
 */
export function socket (bundle: Bundle<HOT>) {

  const wss = new Server({
    port: bundle.hot.socket,
    path: '/ws'
  });

  wss.on('connection', v => {
    wss.on('assets', () => v.send('assets'));
    wss.on('reload', () => v.send('reload'));
    wss.on('replace', () => v.send('replace'));
  });

  return {
    assets: () => wss.emit('assets'),
    reload: () => wss.emit('reload'),
    replace: () => wss.emit('replace')
  };
};
