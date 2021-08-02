import drop from 'lodash.drop';
import lastIndexOf from 'lodash.lastindexof';
import path from 'path';
import { readFile } from 'fs-extra';
import chokidar from 'chokidar';
import chalk from 'chalk';
import anymatch from 'anymatch';
import boxen from 'boxen';
import { request } from '../config/request';
import { readConfig } from '../config/config';
import { getTarget } from '../config/target';
import { ignore } from '../config/utils';
import * as log from '../config/logger';
import { CLIOptions, Callback } from '../index.d';

/**
 * Watcher
 */
export async function watch (options: CLIOptions, callback: typeof Callback) {

  const config = await readConfig();
  const target = await getTarget(config, options);

  if (!options.file) Object.assign(options, config);

  const directory = options.dir || 'theme';
  const dirMatch = new RegExp(`^${directory}`);
  const { settings, ignored } = ignore(options);
  const watcher = chokidar.watch(`./${directory}/`, {
    ignored: ignored.files === null ? ignored.base : ignored.files,
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 100,
    binaryInterval: 100,
    cwd: process.cwd()
  });

  watcher.on('all', async (event, file) => {

    const parts = file.split(path.sep);
    const trimmed = drop(parts, (lastIndexOf(parts, directory) + 1));
    const key = trimmed.join(path.sep);

    if (file.match(/^\..*$/) || !file.match(dirMatch)) {
      return log.print(chalk`{red Issue in match "/^\..*$/" at: ${file}}"`);
    }

    if (file.match(/[()]/)) {
      return log.print(chalk`{red Filename cannot contain parentheses at: "${file}"`);
    }

    if (settings?.ignore && settings.ignore.length > 0) {
      if (anymatch(settings.ignore, file)) {
        return log.print(chalk`{gray Ignoring} '{gray ${file}}'`);
      }
    }

    if (event === 'change' || event === 'add') {

      const data = await readFile(file);
      const attachment = data.toString('base64');

      await request(
        target
        , {
          method: 'put',
          url: `/admin/themes/${target.theme_id}/assets.json`,
          data: {
            asset: {
              key: key.split(path.sep).join('/'),
              attachment
            }
          }
        }
      ).then(() => {

        log.print(chalk`{green Uploaded} '{green ${file}}'`);

        if (typeof callback === 'function') {
          callback.apply({
            file: path.parse(file),
            content: data
          });
        }

      }).catch(log.errors);

    } else if (event === 'unlink') {

      const url = `/assets.json?asset[key]=${key.split(path.sep).join('/')}`;

      await request(
        target
        , {
          method: 'delete',
          url: `/admin/themes/${url}/${target.theme_id}`
        }
      ).then(() => {

        log.print(chalk`{green Deleted} '{green ${file}}'`);

      }).catch(log.errors);

    }

  });

  let banner = (
    chalk`  Target: {green ${target.target_name}}\n` +
    chalk`   Store: {green https://${target.domain}.myshopify.com}\n` +
    chalk`Watching: {green ${directory}/**/**}`
  );

  if (ignored.log !== null) {
    banner += chalk`\nIgnoring: {yellow ${ignored.count}} Files\n`;
    banner += chalk`\t {whiteBright -} {yellow ${ignored.log}}`;
  }

  log.print(
    chalk.whiteBright.bold('Shopify Sync\n') + boxen(banner, {
      padding: 0,
      borderColor: 'gray',
      dimBorder: true,
      borderStyle: {
        topLeft: ' ',
        topRight: ' ',
        bottomLeft: ' ',
        bottomRight: ' ',
        horizontal: '-',
        vertical: ' '
      }
    })
  );

}
