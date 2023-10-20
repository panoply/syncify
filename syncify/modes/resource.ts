import prompts from 'prompts';
import * as pages from '../requests/pages';
import * as metafields from '../requests/metafields';
import { $ } from 'syncify:state';

export async function resource () {

  if ($.mode.pages) {

    if ($.mode.pull) {
      return pages.pull(store, bundle);
    } else if ($.mode.merge) {
      return pages.merge(store, bundle);
    }

    /* await prompts([
      {
        type: 'select',
        name: 'resource',
        message: 'Page Resources',
        instructions: false,
        initial: 0,
        choices: [
          {
            title: 'Push',
            description: `Upload pages to ${store.domain}`,
            value: 'p'
          },
          {
            title: 'Pull',
            description: `Download pages from ${store.domain}`,
            value: 'p'
          },
          {
            title: 'Merge',
            description: 'Merge remote pages with local records',
            value: 'm'
          },
          {
            title: 'Delete',
            description: `Delete pages from ${store.domain}`,
            value: 'p'
          },
          {
            title: 'Query',
            description: `Browse and search pages in ${store.domain}`,
            value: 'q'
          },
          {
            title: 'Publish',
            description: `Publish pages on ${store.domain}`,
            value: 'p'
          },
          {
            title: 'Unpublish',
            description: `Unpublish pages on ${store.domain}`,
            value: 'p'
          }
        ]
      }
    ]); */

  } else if ($.mode.metafields) {

    if ($.mode.pull) {
      return metafields.pull(store, config);
    } else if ($.mode.merge) {
      return metafields.merge(store, config);
    }

    /* await prompts([
      {
        type: 'select',
        name: 'resource',
        message: 'Metafield Resources',
        instructions: false,
        initial: 0,
        choices: [
          {
            title: 'Push',
            description: `Upload metafields to ${store.domain}`,
            value: 'p'
          },
          {
            title: 'Pull',
            description: `Download metafields from ${store.domain}`,
            value: 'p'
          },
          {
            title: 'Merge',
            description: 'Merge remote metafields with local records',
            value: 'm'
          },
          {
            title: 'Delete',
            description: `Delete metafields from ${store.domain}`,
            value: 'p'
          },
          {
            title: 'Query',
            description: `Browse and search metafields in ${store.domain}`,
            value: 'q'
          }
        ]
      }
    ]); */

  }

  const action = await prompts([
    {
      type: 'select',
      name: 'resource',
      message: 'Resources',
      instructions: false,
      initial: 0,
      choices: [
        {
          title: 'Stores',
          description: 'Available Stores',
          value: 's'
        },
        {
          title: 'Themes',
          description: `Themes on ${store.domain}`,
          value: 't'
        },
        {
          title: 'Metafields',
          description: `Metafields on ${store.domain}`,
          value: 'm'
        },
        {
          title: 'Pages',
          description: `Pages on ${store.domain}`,
          value: 'p'
        }
      ]
    }
  ]);

  if (action.resource === 'p') $.mode.pages = true;
  if (action.resource === 'm') $.mode.metafields = true;

  return resource(config);

}
