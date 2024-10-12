import type { WSS } from 'types';
import { uWS } from '@syncify/uws';
import { HOT_SOCKET_TOPICS } from 'syncify:const';
import { kill } from 'syncify:cli/exit';
import { ARR, gray, neonCyan, pink, Line } from '@syncify/ansi';
import { $ } from 'syncify:state';
import * as log from 'syncify:log';
import { server } from 'syncify:hot/server';

/**
 * Web Sockets
 *
 * Setup websockets for interfacing with the Syncify client DOM injection script.
 * This function will send messages to the browser to perform HOT replacements.
 */
export async function socket (): Promise<WSS> {

  let listener: uWS.us_listen_socket;

  const app = await server();

  const ws = app.ws('/ws', {
    compression: uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 32,
    open: (ws) => {

      HOT_SOCKET_TOPICS.forEach(topic => ws.subscribe(topic));

    },
    message: (_, message, isBinary) => {

      log.hot(Buffer.from(message).toString(isBinary ? 'binary' : 'utf8'));

    }
  }).listen($.hot.socket, (token) => {

    listener = token;

    if (token) {

      log.out(Line(`${neonCyan('socket')}  ${ARR}  ${gray('PORT')}  ${ARR} ${pink(`${$.hot.socket}`)}`));
      log.nwl();

    } else {

      console.log('Failed to listen on websocket');

    }
  });

  kill(() => {

    ws.close();
    uWS.us_listen_socket_close(listener);

  });

  return {
    get http () { return ws; },
    script: (uuid: string, src: string) => ws.publish('script', `script,${src},${uuid}`),
    stylesheet: (uuid: string, href: string) => ws.publish('stylesheet', `stylesheet,${href},${uuid}`),
    section: (id: string) => ws.publish('section', `section,${id}`),
    svg: (id: string) => ws.publish('svg', `svg,${id}`),
    assets: () => ws.publish('assets', 'assets'),
    reload: () => ws.publish('reload', 'reload'),
    replace: () => ws.publish('replace', 'replace'),
    connected: () => ws.publish('connected', 'connected'),
    disconnect: () => ws.publish('disconnect', 'disconnect')
  };

}
