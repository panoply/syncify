import type { WSS } from 'types';
import http from 'node:http';
import statics from 'serve-static';
import handler from 'finalhandler';
import glob from 'fast-glob';
import { pathExists, readFile, writeFile } from 'fs-extra';
import { join, basename, relative } from 'pathe';
import { Server } from 'ws';
import { kill } from 'syncify:cli/exit';
import { ARR, COL, Tree, TLD } from 'syncify:symbol';
import { bold, gray, redBright, neonCyan, pink } from 'syncify:colors';
import { $ } from 'syncify:state';
import { injectSnippet, injectRender } from './inject';
import * as log from 'syncify:log';
import * as tree from 'lib/ansi/ansi';

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

  log.update(tree.Line(gray(` ${TLD} validating snippet injection`)));

  const snippet = await injectSnippet();

  if (snippet) {

    log.update(tree.Line(gray(` ${TLD} validating layouts`)));

    for (const layout in $.hot.alive) {

      const exists = await pathExists(layout);

      if (!exists) {

        log.update(tree.Line(gray(` ${TLD} layout has not yet been bundled, building now...`)));

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

        log.update(tree.Line(gray(` ${TLD} layout was bundled from source, injecting hot snippet`)));

      }

      try {
        const render = await injectRender(layout);

        if (!render) {

          log.update.clear();
          log.error('Failed to inject hot reload render tag', {
            notify: {
              title: 'HOT Reloading Failed',
              message: 'HOT Reloading is disabled'
            }
          });

        }

      } catch (e) {

        console.log(e);

      }
    }

    log.update.clear();

  } else {

    log.update.clear();
    log.error('Failed to upload snippet');

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
      Tree.red,
      Tree.red + redBright('Change the socket port address or kill the session occupying it.'),
      Tree.red + redBright('This error typically occurs when multiple Syncify instances are active.')
    );

    log.error(redBright(`${bold('ERROR')} on ${bold(`${$.hot.method === 'hot' ? 'HOT' : 'LIVE'} Reload:`)}`));
    log.out(HOTError.output.join(NWL));

    return null;

  }

  log.out(tree.Line(bold(`${$.hot.method === 'hot' ? 'HOT Reload' : 'LIVE Reload'}${COL}`)));
  log.update(tree.Line(` ${TLD} configuring HOT Reload`));

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
        Tree.red + redBright(`${bold('EADDRINUSE')} ${ARR} ${localhost}`),
        Tree.red,
        Tree.red + redBright.bold(`Server Port ${$.hot.server} address already in use`),
        Tree.red,
        Tree.red + redBright('Change the server port address or kill the session occupying it.'),
        Tree.red + redBright('This error typically occurs when multiple Syncify instances are active.')
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

  const port = `${gray('PORT')}  ${ARR} ${pink(`${$.hot.server}`)}`;
  const sock = `${gray('PORT')}  ${ARR} ${pink(`${$.hot.socket}`)}`;

  log.update(tree.Line(` ${TLD} ${neonCyan('server')}  ${ARR}  ${port}`));
  log.out(tree.Line(` ${TLD} ${neonCyan('socket')}  ${ARR}  ${sock}`));

  for (const p in $.hot.alive) {
    log.out(tree.Line(` ${TLD} ${neonCyan('layout')}  ${ARR}  ${gray(relative($.cwd, p))}`));
  }

  log.nwl();

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
        Tree.red + redBright(`${bold('EADDRINUSE')} ${ARR} ws://localhost:${$.hot.server}`),
        Tree.red,
        Tree.red + redBright.bold(`Socket Port ${$.hot.server} address already in use`)
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

    /* -------------------------------------------- */
    /* SOCKET RECEIVERS                             */
    /* -------------------------------------------- */

    socket.addEventListener('message', ({ data }) => log.hot(data));

  };

  wss.on('close', onclose);
  wss.on('error', onerror);
  wss.on('connection', onconnection);

  return {
    get http () { return wss; },
    script: (uuid, src: string) => wss.emit('script', `${src},${uuid}`),
    stylesheet: (uuid, href: string) => wss.emit('stylesheet', `${href},${uuid}`),
    section: (id: string) => wss.emit('section', id),
    svg: (id: string) => wss.emit('svg', id),
    assets: () => wss.emit('assets'),
    reload: () => wss.emit('reload'),
    replace: () => wss.emit('replace'),
    connected: () => wss.emit('connected'),
    disconnect: () => wss.emit('disconnected')
  };
};
