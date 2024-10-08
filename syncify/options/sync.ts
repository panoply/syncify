import type { Stores } from 'types';
import type { Commands } from 'types/internal';
import { includes } from 'rambdax';
import { DSH, blue } from '@syncify/ansi';
import { throwError, invalidCommand, invalidTarget } from 'syncify:log/throws';
import { authURL, getStoresFromEnv } from 'syncify:utils/options';
import { keys } from 'syncify:native';
import { has } from 'syncify:utils';
import { $ } from 'syncify:state';
import { Connect } from 'syncify:cli/prompts';

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
  const storeRequired = (
    $.mode.metafields ||
    $.mode.pages ||
    $.mode.redirects ||
    $.mode.themes
  );

  /**
   * Modes which require theme arguments
   */
  const themeRequired = (
    $.mode.watch ||
    $.mode.upload ||
    $.mode.import
  );

  let stores: string[];
  let items: Stores[] = [];
  let queue: boolean = false;

  if (storeRequired && $.cmd.stores.length === 0 && $.mode.themes === false) {
    invalidCommand({
      expected: 'syncify <store>',
      message: [
        'You have not provided a store to target, which is required when',
        'there are multiple stores defined in your setup. Because you are',
        'executing syncify in a mode which will transfers files to a remote',
        'source, it is unable to determine which store to target.'
      ],
      fix: [
        'Provide the store target name as the first command argument',
        'followed by theme target/s and other flags.'
      ]
    });
  }

  if ($.mode.themes && $.stores.length > 0) {

    items = getStoresFromEnv();

  } else {

    stores = $.cmd.stores.length === 0 ? $.stores.map(({ domain }) => domain) : $.cmd.stores;
    items = $.stores.filter(({ domain }) => includes(domain, stores));
    queue = items.length > 1;

  }

  for (const store of items) {

    // The myshopify store domain
    const domain = `${store.domain}.myshopify.com`.toLowerCase();

    // Get authorization url for the store
    const client = authURL(store.domain);

    // Set store endpoints
    const sidx = $.sync.stores.push({
      store: store.domain,
      password: store.password,
      domain,
      client,
      queue
    }) - 1;

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

        invalidTarget({
          type: 'theme',
          expected: keys(store.themes).join(','),
          provided: target,
          message: [
            `Unknown theme target (${blue(target)}) provided to ${blue(store.domain)} store`,
            `Your ${blue('package.json')} file contains no such theme using this name.`
          ],
          fix: [
            `Provide an ${blue('expected')} theme target or update/add an existing target.`,
            `You have ${blue(`${themes.length}`)} theme targets defined for ${blue(store.domain)}:`,
            NLR,
            `${DSH} ${themes.join(`\n${DSH} `)}`,
            NLR
          ]
        });

      }

      // Lets populate the model with theme
      $.sync.themes.push({
        target,
        sidx,
        store: domain,
        id: store.themes[target],
        url: `/themes/${store.themes[target]}/assets.json`
      });

    }

  }

  if (themeRequired && $.sync.themes.length === 0) {
    invalidCommand(
      {
        expected: '-t <theme>',
        message: [
          'You have not provided a theme to target, which is required',
          'when running syncify in this resource mode.'
        ],
        fix: [
          `Provide a theme name to target following a ${blue('-t')} or ${blue('--theme')} flag.`,
          'Theme targets should be passed as the 2nd argument, the 1st argument should be store name/s.'
        ]
      }
    );
  }

  if ($.sync.stores.length === 0) {

    throwError('Unknown, missing or invalid store/theme targets', [
      'Check your store config'
    ]);

  }

  $.env.sync = $.sync.stores.length === 1 && $.sync.themes.length === 1 ? 1 : 2;

};
