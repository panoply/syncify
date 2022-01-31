import chokidar from 'chokidar';
import { IConfig, IFile, Syncify } from 'types';
import { parseFile } from 'config/file';
import { transforms, Events } from 'transform/transform';

/**
 * Watch Function
 *
 * Sync in watch mode
 */
export async function watch (config: IConfig, callback: typeof Syncify.hook) {

  const watcher = chokidar.watch(config.watch, {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 25,
    binaryInterval: 100,
    cwd: config.cwd,
    ignored: [
      '*.map'
    ]
  });

  const parse = parseFile(config.paths, config.output);
  const transform = transforms(config, callback);

  watcher.on('all', (event, path) => {

    const file: IFile = parse(path);
    const type: Events = (event === 'change' || event === 'add') ? Events.Update : Events.Delete;

    return transform(type, file);

  });

}
