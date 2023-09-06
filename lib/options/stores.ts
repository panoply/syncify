import type { Commands, Config } from 'types';
import dotenv from 'dotenv';
import { join } from 'pathe';
import { anyTrue, has, includes } from 'rambdax';
import { DSH, blue, white } from '~log';
import { throwError, invalidCommand, invalidTarget } from '~log/validate';
import { authURL } from '~utils/options';
import { $ } from '~state';
import { keys } from '~native';
import { isArray } from '~utils';

/**
 * Resolve Stores
 *
 * Resolves Shopify stores and themes from the `package.json`
 * and `.env` file locations relative to the current
 * working directory.
 */
export function setStores (cli: Commands, config: Config) {

  /**
   * Modes which require store arguments
   */
  const storeRequired = anyTrue(
    $.mode.metafields,
    $.mode.pages,
    $.mode.redirects
  );

  /**
   * Modes which require theme arguments
   */
  const themeRequired = anyTrue(
    $.mode.watch,
    $.mode.upload,
    $.mode.download
  );

  if (cli._.length === 0) {

    if (storeRequired) {
      invalidCommand({
        message: [
          'You have not provided store to target, which is required',
          'when running in a resource mode that syncs to a remote source'
        ],
        expected: 'syncify <store>',
        fix: [
          'Provide the store target name as the first command argument',
          'followed by themes target/s and other flags.'
        ]
      });
    }

    return;

  }

  const stores = cli._[0].split(',');
  const file = dotenv.config({ path: join($.cwd, '.env') });
  const array = isArray(config.stores) ? config.stores : [ config.stores ];
  const items = array.filter(({ domain }) => includes(domain, stores));
  const queue = items.length > 1;

  for (const store of items) {

    // The myshopify store domain
    const domain = `${store.domain}.myshopify.com`.toLowerCase();

    // Get authorization url for the store
    const client = file.error
      ? authURL(store.domain, process.env, 2) // fallback to environment variables
      : authURL(store.domain, file.parsed, 1); // using .env file

    // Set store endpoints
    const sidx = $.sync.stores.push({
      store: store.domain,
      domain,
      client,
      queue
    }) - 1;

    // skip theme reference generation if within these resource based modes
    // we do not need context of themes if such modes were initialized by cli
    if ($.mode.metafields || $.mode.pages) return;

    // Lets parse the theme target names
    const themes: string[] = has('theme', cli)
      ? (cli.theme as any).split(',')
      : has(store.domain, cli)
        ? cli[store.domain].split(',')
        : keys(store.themes);

    for (const target of themes) {

      if (!has(target, store.themes)) {

        invalidTarget(
          {
            type: 'theme',
            expected: keys(store.themes).join(','),
            provided: target,
            message: [
            `Unknown theme target (${blue(target)}) provided to ${blue(store.domain)} store`,
            `Your ${blue($.file.base)} file contains no such theme using this name.`
            ],
            fix: [
            `Provide an ${blue('expected')} theme target or update/add an existing target.`,
            `You have ${blue(`${themes.length}`)} theme targets defined for ${blue(store.domain)}:`,
            '',
            `${DSH} ${themes.join(`\n${DSH} `)}`,
            ''
            ]

          }
        );

      }

      // Let populate the model with theme
      $.sync.themes.push({
        target,
        sidx,
        store: domain,
        id: store.themes[target],
        url: `/themes/${store.themes[target]}/assets.json`
      });

    }

  }

  if (storeRequired) {
    if ($.sync.stores.length === 0) {

      return invalidCommand(
        {
          expected: 'syncify <store>',
          message: [
            'You have not provided store to target, which is required',
            'when running in a resource mode that syncs to a remote source'
          ],
          fix: [
            'Provide the store target name as the first command argument followed by themes',
            'target/s and other flags. Based on your current configuration:',
            '',
          `${DSH} ${white('$')} syncify ${array.join(`\n${DSH} ${white('$')} syncify `)}`,
          ''
          ]
        }
      );

    }
  }

  if ($.sync.themes.length === 0) {
    if (themeRequired) {

      return invalidCommand(
        {
          expected: '-t <theme>',
          message: [
            'You have not provided a theme to target, which is required',
            'when running this resource mode.'
          ],
          fix: [
          `Provide a theme name to target following a ${blue('-t')} or ${blue('--theme')} flag.`,
          'Theme targets should be passed as the 2nd argument, the 1st argument should be store name/s.'
          ]
        }
      );
    }
  }

  if ($.sync.stores.length === 0) {
    throwError(
      'Unknown, missing or invalid store/theme targets',
      'Check your store config'
    );
  }

  if ($.sync.stores.length === 1 && $.sync.themes.length === 1) {
    $.env.sync = 1;
  } else if ($.sync.stores.length > 1 || $.sync.themes.length > 1) {
    $.env.sync = 2;
  }
};
