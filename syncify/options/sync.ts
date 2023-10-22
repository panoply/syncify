import type { Commands, Stores } from 'types';
import { anyTrue, includes } from 'rambdax';
import { DSH } from 'syncify:symbol';
import { blue, white } from 'syncify:colors';
import { throwError, invalidCommand, invalidTarget } from 'syncify:log/throws';
import { authURL, getStoresFromEnv } from 'syncify:utils/options';
import { keys } from 'syncify:native';
import { has } from 'syncify:utils';
import { $ } from 'syncify:state';
import { Connect, Target } from 'syncify:cli/prompts';

/**
 * Set Sync
 *
 * Resolves Shopify stores and themes from the `package.json`
 * and `.env` file locations relative to the current
 * working directory.
 */
export async function setSync (cli: Commands) {

  /**
   * Modes which require store arguments
   */
  const storeRequired = anyTrue(
    $.mode.metafields,
    $.mode.pages,
    $.mode.redirects,
    $.mode.release,
    $.mode.publish,
    $.mode.themes
  );

  /**
   * Modes which require theme arguments
   */
  const themeRequired = anyTrue(
    $.mode.watch,
    $.mode.upload,
    $.mode.import
  );

  let stores: string[];
  let items: Stores[] = [];
  let queue: boolean = false;

  if (cli._.length === 0) {
    if (storeRequired) {
      invalidCommand({
        expected: 'syncify <store>',
        message: [
          'You have not provided store to target, which is required',
          'when running in a resource mode that syncs to a remote source'
        ],
        fix: [
          'Provide the store target name as the first command argument',
          'followed by themes target/s and other flags.'
        ]
      });
    }
  }

  if ($.mode.themes && $.stores.length > 0) {

    items = getStoresFromEnv();

  } else {

    stores = cli._.length === 0 ? $.stores.map(({ domain }) => domain) : cli._[0].split(',');
    items = $.stores.filter(({ domain }) => includes(domain, stores));
    queue = items.length > 1;

  }

  for (const store of items) {

    // The myshopify store domain
    const domain = `${store.domain}.myshopify.com`.toLowerCase();

    // Get authorization url for the store
    const client = authURL(store.domain);

    // Set store endpoints
    const sidx = $.sync.stores.push({ store: store.domain, domain, client, queue }) - 1;

    // skip if mode is themes
    if ($.mode.themes) continue;

    // skip theme reference generation if within these resource based modes
    // we do not need context of themes if such modes were initialized by cli
    if ($.mode.metafields || $.mode.pages) return;

    let themes: string[] = [];

    if (has('theme', cli)) {
      themes = (cli.theme as any).split(',');
    } else if (has(store.domain, cli)) {
      themes = cli[store.domain].split(',');
    } else if (has('themes', store)) {
      themes = keys(store.themes);
    }

    if (themes.length === 0) {
      await Connect($.sync.stores[sidx]);
    }

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
              NLR,
              `${DSH} ${themes.join(`\n${DSH} `)}`,
              NLR
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
            NLR,
            `${DSH} ${white('$')} syncify ${$.stores.join(`\n${DSH} ${white('$')} syncify `)}`,
            NLR
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
    throwError('Unknown, missing or invalid store/theme targets', [
      'Check your store config'
    ]);
  }

  if ($.sync.stores.length === 1 && $.sync.themes.length === 1) {
    $.env.sync = 1;
  } else if ($.sync.stores.length > 1 || $.sync.themes.length > 1) {
    $.env.sync = 2;
  }
};
