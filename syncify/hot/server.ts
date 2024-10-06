import uWS from 'uWebSockets.js';
import { readFileSync, existsSync, ensureFile, readFile } from 'fs-extra';
import { join, extname } from 'node:path';
import { ARR, COL, Tree, bold, gray, redBright, neonCyan, pink } from '@syncify/ansi';
import { $ } from 'syncify:state';
import * as log from 'syncify:log';
import * as tree from 'syncify:cli/tree';

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
  log.update(tree.Line('configuring HOT Reload'));

  const url = join($.dirs.output, 'assets');
  const app = uWS.App();
  const hot = await readFile($.hot.source);

  app.get('/*', (response, request) => {

    const key = request.getUrl();

    if (key === '/') {
      response.endWithoutBody();
    } else {

      const ext = extname(key);
      const uri = join(url, key);

      response.writeHeader('Access-Control-Allow-Origin', '*');
      response.writeHeader('Cache-Control', 'public, max-age=0');

      if (ext === '.js' || ext === '.mjs') {
        response.writeHeader('Content-Type', 'application/javascript');
      } else if (ext === '.css') {
        response.writeHeader('Content-Type', 'text/css');
      } else if (ext === '.json') {
        response.writeHeader('Content-Type', 'application/json');
      }

      if (existsSync(uri) && ensureFile(uri)) {
        response.end(readFileSync(uri));
      } else if (key.endsWith('hot.min.js')) {
        response.end(hot);
      } else {
        response.endWithoutBody();
      }

    }
  });

  app.listen($.hot.server, (token) => {

    if (token) {
      log.update(tree.Line(`${neonCyan('server')}  ${ARR}  ${gray('PORT')}  ${ARR} ${pink(`${$.hot.server}`)}`));
    } else {
      console.log('Failed to listen to port ' + $.hot.server);
    }

  });

  return app;

}
