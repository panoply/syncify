import bs from 'browser-sync';
import { IBundle } from 'types';
import { join } from 'path';
import { line } from '../cli/ansi';
import https from 'node:https';
import { intercept } from '../cli/intercept';
import serveStatic from 'serve-static';
import finalhandler from 'finalhandler';
import http from 'node:http';

// Serve up public/ftp folder

// Listen

export function server (proxy: string, bundle: IBundle) {

  const serve = serveStatic(join(bundle.dirs.output, 'assets'));

  const server = http.createServer(function onRequest (req, res) {
    const done = finalhandler(req, res);
    serve(req, res, done);
  });

  server.listen(3000);

}
