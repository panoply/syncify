import { extname, join } from 'node:path';

import { ensureFile, existsSync, readFileSync } from 'fs-extra';

import { bold, redBright, Tree } from '@syncify/ansi';
import { uWS } from '@syncify/uws';

import { log } from '~cli/log';

import { $ } from '$';

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

export function server () {

  if (!HOTError.enable) {

    HOTError.output.push(
      Tree.red,
      Tree.red + redBright('Change the socket port address or kill the session occupying it.'),
      Tree.red + redBright('This error typically occurs when multiple Syncify instances are active.')
    );

    log.error(redBright(`${bold('ERROR')} on ${bold(`${$.hot.method === 'hot' ? 'HOT' : 'LIVE'} Reload:`)}`));
    log.line(HOTError.output.join(NWL));

    return null;

  }

  const assets = join($.dirs.output, 'assets');
  const app = uWS.App();

  app.get('/*', (response, request) => {

    const key = request.getUrl();

    if (key === '/') {

      response.endWithoutBody();

    } else {

      const uri = join(assets, key);

      response.writeHeader('Access-Control-Allow-Origin', '*');
      response.writeHeader('Cache-Control', 'public, max-age=0');

      switch (extname(key)) {
        case '.js' :
        case '.mjs' :
          response.writeHeader('Content-Type', 'application/javascript');
          break;
        case 'css':
          response.writeHeader('Content-Type', 'text/css');
          break;
        case 'json':
          response.writeHeader('Content-Type', 'application/json');
          break;
      }

      if (existsSync(uri) && ensureFile(uri)) {

        response.end(readFileSync(uri));

      } else {

        response.endWithoutBody();

      }

    }
  }).listen($.hot.server, (token) => {

    if (token === false) {

      console.log('Failed to listen to port ' + $.hot.server);

    }

  });

  return app;

}
