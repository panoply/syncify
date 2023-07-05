import { join, basename } from 'node:path';
import { Server } from 'ws';
import statics from 'serve-static';
import handler from 'finalhandler';
import http from 'node:http';
import { kill } from '~cli/exit';
import { log, tui, bold, gray, line, redBright, ARR } from '~log';
import { bundle } from '~config';
import { injectSnippet, injectRender } from './inject';
import { pathExists, readFile, writeFile } from 'fs-extra';
import { isArray, nl } from '~utils/native';
import { WSS } from 'types';

export const HOTError: {
  /**
   * Whether or not HOT or LIVE Reloading is available
   */
  enable: boolean;
  /**
   * Output log to be printed.
   */
  output: string[];
} = {
  enable: true,
  output: []
};

async function injection () {

  log.update(tui.message('gray', 'validating snippet injection'));

  const snippet = await injectSnippet();

  if (snippet) {

    log.update(tui.message('gray', 'validating layouts'));

    for (const layout in bundle.hot.alive) {

      const exists = await pathExists(layout);

      if (!exists) {

        log.update(tui.message('gray', 'layout has not yet been bundled, building now...'));

        const find = isArray(bundle.config.paths.layout)
          ? bundle.config.paths.layout
          : [ bundle.config.paths.layout ];

        for (const input of find) {
          const path = join(bundle.dirs.input, input);
          const source = await readFile(path);
          await writeFile(layout, source);
        }

        log.update(tui.message('gray', 'layout was bundled from source, injecting hot snippet'));

      }

      const render = await injectRender(layout);

      if (!render) {
        log.update.clear();
        log.err('Failed to inject hot reload render tag');
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
export async function server () {

  if (!HOTError.enable) {

    HOTError.output.push(
      line.red,
      line.red + redBright('Change the socket port address or kill the session occupying it.'),
      line.red + redBright('This error typically occurs when multiple Syncify instances are active.')
    );

    log.err(redBright(`${bold('ERROR')} on ${bold(`${bundle.hot.method === 'hot' ? 'HOT' : 'LIVE'} Reload:`)}`));
    log.out(HOTError.output.join(nl));

    return null;

  }

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

  const onerror = (e: { code: 'EADDRINUSE' }) => {

    if (e.code === 'EADDRINUSE') {

      HOTError.output.push(
        line.red + redBright(`${bold('EADDRINUSE')} ${ARR} ${localhost}`),
        line.red,
        line.red + redBright.bold(`Server Port ${bundle.hot.server} address already in use`),
        line.red,
        line.red + redBright('Change the server port address or kill the session occupying it.'),
        line.red + redBright('This error typically occurs when multiple Syncify instances are active.')
      );

      log.update.clear();
      log.out(HOTError.output.join(nl));
      bundle.wss.http.close();

      return null;
    }

  };

  const onconnect = () => {

    log.update.done();

    server.removeListener('error', onerror);
    server.removeListener('connect', onconnect);

  };

  server.on('error', onerror);
  server.on('connect', onconnect);
  server.listen(bundle.hot.server);

  log.update(tui.message('pink', `server → ${bold('assets')} → ${gray.underline(localhost)}`));

};

/**
 * Socket
 *
 * Used in `watch` mode and faciliatates the hot reloading
 * by sending change events to the document.
 */
export function socket (): WSS {

  if (bundle.mode.hot === false) return;

  const wss = new Server({
    port: bundle.hot.socket,
    path: '/ws'
  });

  kill(() => wss.close());

  const onerror = (error: { code: 'EADDRINUSE'}) => {
    if (error.code === 'EADDRINUSE') {
      wss.close();
      HOTError.enable = false;
      HOTError.output.push(
        line.red + redBright(`${bold('EADDRINUSE')} ${ARR} ws://localhost:${bundle.hot.server}`),
        line.red,
        line.red + redBright.bold(`Socket Port ${bundle.hot.server} address already in use`)
      );
    }
  };

  const onclose = () => {
    wss.removeAllListeners('script');
    wss.removeAllListeners('stylesheet');
    wss.removeAllListeners('section');
    wss.removeAllListeners('svg');
    wss.removeAllListeners('assets');
    wss.removeAllListeners('reload');
    wss.removeAllListeners('replace');
  };

  const onconnection = (socket: WebSocket) => {
    wss.removeListener('error', onerror);
    wss.on('script', (src) => socket.send(`script,${src}`));
    wss.on('stylesheet', (href) => socket.send(`stylesheet,${href}`));
    wss.on('section', (id) => socket.send(`section,${id}`));
    wss.on('svg', (id) => socket.send(`svg,${id}`));
    wss.on('assets', () => socket.send('assets'));
    wss.on('reload', () => socket.send('reload'));
    wss.on('replace', () => socket.send('replace'));
  };

  wss.on('close', onclose);
  wss.on('error', onerror);
  wss.on('connection', onconnection);

  return {
    get http () { return wss; },
    script: (src: string) => wss.emit('script', basename(src)),
    stylesheet: (href: string) => wss.emit('stylesheet', basename(href)),
    section: (id: string) => wss.emit('section', id),
    svg: (id: string) => wss.emit('svg', id),
    assets: () => wss.emit('assets'),
    reload: () => wss.emit('reload'),
    replace: () => wss.emit('replace')
  };
};
