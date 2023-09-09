import type { Store } from 'types';
import prompts from 'prompts';
import * as pages from 'syncify:requests/pages';
import * as cache from 'syncify:process/caches';

export async function resource (store: Store): Promise<number> {

  const remote = await pages.list(store);

  if (!remote) return;

  const choices: prompts.Choice[] = [
    {
      title: 'Themes',
      description: `Theme operations for ${store.domain}`,
      value: 'themes'
    },
    {
      title: 'Files',
      description: `Files API operations for ${store.domain}`,
      value: 'files'
    },
    {
      title: 'Pages',
      description: `Page operations for ${store.domain}`,
      value: 'pages'
    },
    {
      title: 'Metafields',
      description: `Metafield operations for ${store.domain}`,
      value: 'metafields'
    },
    {
      title: 'Cache',
      description: 'Cache operations',
      value: 'cache'
    }
  ];

  const prompt = await prompts({
    type: 'select',
    name: 'action',
    message: 'Select Resource',
    hint: ' ',
    instructions: false,
    choices
  });

  return prompt.action;
}

export async function themes (store: Store): Promise<number> {

  const remote = await pages.list(store);

  if (!remote) return;

  const choices: prompts.Choice[] = [
    {
      title: 'Assets',
      description: 'Asset file operations',
      value: 'assets'
    },
    {
      title: 'Sections',
      description: 'Section file operations',
      value: 'sections'
    },
    {
      title: 'Templates',
      description: 'Template file operations',
      value: 'templates'
    },
    {
      title: 'Snippets',
      description: 'Snippet file operations',
      value: 'metafields'
    },
    {
      title: 'Config',
      description: 'Config file operations',
      value: 'config'
    },
    {
      title: 'Locales',
      description: 'Locale file operations',
      value: 'locales'
    }
  ];

  const prompt = await prompts({
    type: 'select',
    name: 'action',
    message: 'Select Resource',
    hint: ' ',
    instructions: false,
    choices
  });

  return prompt.action;
}

export async function selectOperations (store: Store): Promise<number> {

  const remote = await pages.list(store);

  if (!remote) return;

  const choices: prompts.Choice[] = [
    {
      title: 'Pull Pages',
      description: `Pull remote source and update local ${store.domain}`,
      value: 'merge'
    },
    {
      title: 'Push Pages',
      description: `Push local source and update remote ${store.domain}`,
      value: 'list'
    },
    {
      title: 'Delete Pages',
      description: `Delete remote pages from ${store.domain}`,
      value: 'delete'
    }
  ];

  const prompt = await prompts({
    type: 'select',
    name: 'action',
    message: 'Select Operation',
    hint: ' ',
    instructions: false,
    choices
  });

  return prompt.action;
}

export async function selectPages (store: Store): Promise<number> {

  const remote = await pages.list(store);

  if (!remote) return;

  const choices: prompts.Choice[] = (remote).map(
    page => ({
      title: page.title,
      description: `https://admin.shopify.com/store/${store.store.toLowerCase()}/pages/${page.id}`,
      value: page.id
    })
  );

  const prompt = await prompts({
    type: 'autocompleteMultiselect',
    name: 'action',
    message: 'Select Pages',
    hint: ' ',
    instructions: false,
    choices
  });

  return prompt.action;
}
