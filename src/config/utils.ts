import { ITarget, CLIOptions } from '../typings';
import chalk from 'chalk';

/**
 * Ignore
 */
export function ignore (settings: CLIOptions, ignored = {
  count: 0,
  files: null,
  log: null,
  base: /[/\\]\./
}) {

  if (settings.ignore && settings.forceIgnore) {
    ignored.count = settings.ignore.length;
    ignored.log = settings.ignore.join(chalk`\n\t {whiteBright - }`);

    // @ts-ignore
    settings.ignore.push(ignored.base);

    ignored.files = settings.ignore;
  }

  return { settings, ignored };

}

/**
 * URL Generator
 */
export function getStoreUrl (api_key: string, password: string, domain: string): string {

  return 'https://' + api_key + ':' + password + '@' + domain + '.myshopify.com';

}

/**
 * URL Generator
 */
export function getTargetUrl ({ api_key, password, domain }: ITarget): string {

  return 'https://' + api_key + ':' + password + '@' + domain + '.myshopify.com';

}
