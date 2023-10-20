import type { Syncify } from 'types';
import http from 'node:http';
import statics from 'serve-static';
import handler from 'finalhandler';
import ngrok from 'ngrok';
import { delay } from 'rambdax';
import { timer } from 'syncify:timer';
import * as log from 'syncify:log';
import { exporting } from 'syncify:modes/export';
import { ARR, COL } from 'syncify:symbol';
import { bold, gray, line, magentaBright, neonCyan, neonGreen, orange, whiteBright } from 'syncify:colors';
import * as request from 'syncify:requests/themes';
import { $ } from 'syncify:state';
import prompts from 'prompts';
import { processing } from 'syncify:requests/themes';

export async function publish (cb?: Syncify) {

  await exporting(cb);

  timer.start('publish');

  log.title('Publishing');

  const versions = statics($.vc.dir);
  const server = http.createServer((req, res) => versions(req, res, handler(req, res)));

  const onerror = (e: { code: 'EADDRINUSE' }) => {
    if (e.code === 'EADDRINUSE') {
      log.error('EADDRINUSE');
      return null;
    }
  };

  const onconnect = () => {
    server.removeListener('error', onerror);
    server.removeListener('connect', onconnect);
  };

  server.on('error', onerror);
  server.on('connect', onconnect);
  server.listen($.publish.tunnelPort);

  await delay(500);

  timer.start('ngrok');

  const url = await ngrok.connect({
    addr: $.publish.tunnelPort,
    onStatusChange (status) {
      if (status === 'closed') {
        log.write('disconnect', { prefix: 'ngrok' });
      } else {
        log.write(`${bold('connected')} PORT${COL}${$.publish.tunnelPort}`, {
          prefix: 'ngrok',
          suffix: timer.stop('ngrok')
        });
      }
    }
  });

  const src = `${url}/${$.vc.number}.zip`;

  log.write(gray(src), { prefix: 'server' });

  for (const store of $.sync.stores) {

    timer.start(store.domain);

    log.write(store.domain, { prefix: 'webshop', color: neonCyan });
    log.write(`${bold('role')} ${ARR} ${$.publish.publishRole}`, { prefix: 'publish' });
    log.write(bold(`v${$.vc.number}`), { prefix: 'version', color: magentaBright });
    log.nwl();

    await delay(1000);

    log.spinner('uploading', {
      style: 'spinning',
      color: neonGreen
    });

    await delay(2000);

    log.spinner.update('dispatched');

    await delay(2000);

    log.spinner.update('extracting');

    await delay(2000);

    log.spinner.update('processing');

    // log.update.clear();

    // const { id } = await request.publish(store, {
    //   src,
    //   name: `${$.vc.number}`,
    //   role: $.publish.publishRole
    // });

    await delay(1000);

    // log.action('neonGreen', 'status', bold('synced'), store.domain, timer.now(store.domain));
    // log.nwl();

    // await processing(id, store);

    log.spinner.stop('done');
    log.write(`${bold('published')} ${ARR} ${store.domain}`, {
      prefix: 'status',
      color: neonGreen,
      suffix: timer.now(store.domain)
    });

  }

  server.close();

  await ngrok.disconnect();

  log.nwl();
  log.group();
  log.nwl();

  await prompts([
    {
      name: 'action',
      hint: ' ',
      type: 'select',
      message: 'Post-Publishing',
      choices: [
        {
          title: 'Update Config',
          value: 'config'
        },
        {
          title: 'Publish Themes',
          value: 'publish'
        },
        {
          title: 'Delete Themes',
          value: 'delete'
        }
      ]
    }
  ]);
}
