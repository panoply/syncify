import type { WSS } from 'types';
import http from 'node:http';
import statics from 'serve-static';
import handler from 'finalhandler';
import glob from 'fast-glob';
import { pathExists, readFile, writeFile } from 'fs-extra';
import { join, basename } from 'pathe';
import { Server } from 'ws';
import { kill } from '~cli/exit';
import { log, tui, bold, gray, line, redBright, ARR, neonCyan, COL } from '~log';
import { $ } from '~state';
import { injectSnippet, injectRender } from './inject';

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

    for (const layout in $.hot.alive) {

      const exists = await pathExists(layout);

      if (!exists) {

        log.update(tui.message('gray', 'layout has not yet been bundled, building now...'));

        const files = glob.sync($.config.paths.layout, {
          cwd: $.dirs.input,
          absolute: true
        });

        for (const input of files) {
          if (basename(input) === basename(layout)) {
            const source = await readFile(input);
            await writeFile(layout, source);
          }
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

    log.err(redBright(`${bold('ERROR')} on ${bold(`${$.hot.method === 'hot' ? 'HOT' : 'LIVE'} Reload:`)}`));
    log.out(HOTError.output.join(NWL));

    return null;

  }

  log.out(tui.message('whiteBright', bold(`${$.hot.method === 'hot' ? 'HOT' : 'LIVE'} Reloading:`)));
  log.nwl();
  log.update(tui.message('gray', 'configuring HOT Reload'));

  await injection();

  function setHeaders (res: any) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=0');

  }

  const assets = statics(join($.dirs.output, 'assets'), { setHeaders });
  const server = http.createServer((req, res) => assets(req, res, handler(req, res) as any));
  const localhost = `http://localhost:${$.hot.server}`;

  const onerror = (e: { code: 'EADDRINUSE' }) => {

    if (e.code === 'EADDRINUSE') {

      HOTError.output.push(
        line.red + redBright(`${bold('EADDRINUSE')} ${ARR} ${localhost}`),
        line.red,
        line.red + redBright.bold(`Server Port ${$.hot.server} address already in use`),
        line.red,
        line.red + redBright('Change the server port address or kill the session occupying it.'),
        line.red + redBright('This error typically occurs when multiple Syncify instances are active.')
      );

      log.update.clear();
      log.out(HOTError.output.join(NWL));
      $.wss.http.close();

      return null;
    }

  };

  const onconnect = () => {

    log.update.done();

    $.wss.connected();

    server.removeListener('error', onerror);
    server.removeListener('connect', onconnect);

  };

  server.on('error', onerror);
  server.on('connect', onconnect);
  server.listen($.hot.server);

  const port = neonCyan('PORT') + COL + gray(`${$.hot.server}`);

  log.update(tui.message('pink', `server ${ARR} ${bold('localhost')} ${ARR} ${port}`));

};

/**
 * Socket
 *
 * Used in `watch` mode and faciliatates the hot reloading
 * by sending change events to the document.
 */
export function socket (): WSS {

  if ($.mode.hot === false) return;

  const wss = new Server({
    port: $.hot.socket,
    path: '/ws',
    skipUTF8Validation: true
  });

  kill(() => {

    wss.emit('disconnect');
    wss.close();

  });

  const onerror = (error: { code: 'EADDRINUSE'}) => {
    if (error.code === 'EADDRINUSE') {
      wss.close();
      HOTError.enable = false;
      HOTError.output.push(
        line.red + redBright(`${bold('EADDRINUSE')} ${ARR} ws://localhost:${$.hot.server}`),
        line.red,
        line.red + redBright.bold(`Socket Port ${$.hot.server} address already in use`)
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

    /* -------------------------------------------- */
    /* WSS OPERATIONS                               */
    /* -------------------------------------------- */

    wss.prependListener('script', (src) => socket.send(`script,${src}`));
    wss.prependListener('stylesheet', (href) => socket.send(`stylesheet,${href}`));
    wss.prependListener('section', (id) => socket.send(`section,${id}`));
    wss.prependListener('svg', (id) => socket.send(`svg,${id}`));
    wss.prependListener('assets', () => socket.send('assets'));
    wss.prependListener('reload', () => socket.send('reload'));
    wss.prependListener('replace', () => socket.send('replace'));

    /* -------------------------------------------- */
    /* WSS SPECIFIC                                 */
    /* -------------------------------------------- */

    wss.prependListener('connected', () => socket.send('connected'));
    wss.prependListener('disconnect', () => socket.send('disconnect'));

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
    replace: () => wss.emit('replace'),
    connected: () => wss.emit('connected'),
    disconnect: () => wss.emit('disconnected')
  };
};
