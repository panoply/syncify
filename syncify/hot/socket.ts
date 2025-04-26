import type { HOTBundle } from 'types';

import { Append, CHV, gray, magenta, NXT } from '@syncify/ansi';
import { kill, prexit } from '@syncify/kill';
import { timer } from '@syncify/timer';
import { uWS } from '@syncify/uws';

import { removeSnippetInjections } from './snippet';

import { log } from '~cli/log';
import { runtime } from '~cli/runtime';
import { HOT_SOCKET_TOPICS } from '~const';
import { event } from '~events';
import { server } from '~hot/server';
import { defineProperty, forEach, o } from '~utils';

import { $ } from '$';

/**
 * Web Sockets
 *
 * Setup websockets for interfacing with the Syncify client DOM injection script.
 * This function will send messages to the browser to perform HOT replacements.
 */
export const wss = function wss () {

  const app = server();

  let listener: uWS.us_listen_socket;

  const ws = app.ws('/ws', {
    compression: uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 32,
    sendPingsAutomatically: true,
    open (ws) {
      HOT_SOCKET_TOPICS.forEach(topic => ws.subscribe(topic));
    },
    message (ws, message, isBinary) {
      const string = Buffer.from(message).toString(isBinary ? 'binary' : 'utf8');
      if (string.startsWith('ROUTE:')) {
        $.hot.route = JSON.parse(string.slice(6)) as HOTBundle['route'];
      } else {
        log.hot(string);
      }
    }
  });

  $.wss = defineProperty(o(), 'http', { get () { return ws; } });
  $.wss.alias = (json: string) => ws.publish('alias', `alias|${json}`);
  $.wss.script = (uuid: string, src: string) => ws.publish('script', `script,${src},${uuid}`);
  $.wss.stylesheet = (uuid: string, href: string) => ws.publish('stylesheet', `stylesheet,${href},${uuid}`);
  $.wss.section = (id: string) => ws.publish('section', `section,${id}`);
  $.wss.svg = (id: string) => ws.publish('svg', `svg,${id}`);
  $.wss.assets = () => ws.publish('assets', 'assets');
  $.wss.reload = () => ws.publish('reload', 'reload');
  $.wss.replace = () => ws.publish('replace', 'replace');
  $.wss.disconnect = () => ws.publish('disconnect', 'disconnect');

  ws.publish('connected', 'connected');

  ws.listen($.hot.socket, (token) => {
    listener = token;
    event.emit('hot:socket');
    token === false && log.error('Websocket connection failed', { suffix: 'HOT' });
  });

  event.on('hot:socket', () => {
    $.wss.alias(JSON.stringify($.hot.alias));
  });

  event.on('hot:failed', () => {
    ws.close();
    app.close();
    uWS.us_listen_socket_close(listener);
    prexit.hooks.delete('hot:eject');
    runtime.hot({ isError: true });
  });

  if ($.hot.eject) {

    prexit('hot:eject', async function () {

      timer.start();

      log.ender($.log.group);
      log.begin(`HOT ${CHV} Ejection`, { group: true });
      log.spinner('HOT snippet ejection', { color: gray });

      await removeSnippetInjections().then(layouts => {

        log.spinner.stop();

        forEach(layout => log.line(`${magenta(layout)} ${Append('HOT Snippet Removed')}`), layouts);

        log.nl();
        log.line(gray.dim(`${NXT} Exit took ~ ${timer.stop()}`));
        log.ender($.log.group, { clear: false });

        kill(() => {

          ws.close();
          uWS.us_listen_socket_close(listener);

        });

      });

    });
  }

};
