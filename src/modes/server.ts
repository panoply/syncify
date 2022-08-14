import { IBundle } from 'types';
import { join } from 'path';
import serveStatic from 'serve-static';
import handler from 'finalhandler';
import http from 'node:http';

/**
 * Serve Assets
 *
 * Creates a server for assets files
 */
export const server = (bundle: IBundle) => {

  function setHeaders (res, path) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=0');
  }

  const assets = serveStatic(join(bundle.dirs.output, 'assets'), {
    setHeaders
  });
  const server = http.createServer(function (req, res) {
    assets(req, res, handler(req, res) as any);
  });

  server.listen(3000);

};
