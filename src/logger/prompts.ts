import { PromptObject } from 'prompts';

export const page = (domain: string): PromptObject<string>[] => ([
  {
    type: 'select',
    name: 'resource',
    message: 'Page Resources',
    instructions: false,
    initial: 0,
    choices: [
      {
        title: 'Push',
        description: `Upload pages to ${domain}`,
        value: 'p'
      },
      {
        title: 'Pull',
        description: `Download pages from ${domain}`,
        value: 'p'
      },
      {
        title: 'Merge',
        description: 'Merge remote pages with local records',
        value: 'm'
      },
      {
        title: 'Delete',
        description: `Delete pages from ${domain}`,
        value: 'p'
      },
      {
        title: 'Query',
        description: `Browse and search pages in ${domain}`,
        value: 'q'
      },
      {
        title: 'Publish',
        description: `Publish pages on ${domain}`,
        value: 'p'
      },
      {
        title: 'Unpublish',
        description: `Unpublish pages on ${domain}`,
        value: 'p'
      }
    ]
  }
]);

export const metafield = (domain: string): PromptObject<string>[] => ([
  {
    type: 'select',
    name: 'resource',
    message: 'Metafield Resources',
    instructions: false,
    initial: 0,
    choices: [
      {
        title: 'Push',
        description: `Upload metafields to ${domain}`,
        value: 'p'
      },
      {
        title: 'Pull',
        description: `Download metafields from ${domain}`,
        value: 'p'
      },
      {
        title: 'Merge',
        description: 'Merge remote metafields with local records',
        value: 'm'
      },
      {
        title: 'Delete',
        description: `Delete metafields from ${domain}`,
        value: 'p'
      },
      {
        title: 'Query',
        description: `Browse and search metafields in ${domain}`,
        value: 'q'
      }
    ]
  }
]);
