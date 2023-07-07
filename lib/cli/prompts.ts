import { PromptObject } from 'prompts';

export const store = (): PromptObject<string>[] => ([
  {
    type: 'select',
    name: 'resource',
    message: 'Choose stores',
    instructions: false,
    initial: 0,
    choices: []
  },
  {
    type: 'select',
    name: 'resource',
    message: 'Choose Action',
    instructions: false,
    initial: 0,
    choices: [
      {
        title: 'Watch',
        description: 'watch and build theme from source',
        value: 'p'
      },
      {
        title: 'Build',
        description: 'Build theme from source',
        value: 'p'
      },
      {
        title: 'Export',
        description: 'Export from output',
        value: 'p'
      },
      {
        title: 'Upload',
        description: 'Upload an export',
        value: 'p'
      },
      {
        title: 'Download',
        description: 'Download a theme from store',
        value: 'p'
      }
    ]
  },
  {
    type: 'select',
    name: 'resource',
    message: 'Options',
    instructions: false,
    initial: 0,
    choices: [
      {
        title: 'Hot Reloading',
        description: 'Live reload in changes',
        value: 'p'
      },
      {
        title: 'Development',
        description: 'Build theme from source',
        value: 'p'
      },
      {
        title: 'Production',
        description: 'Run in development mode',
        value: 'p'
      },
      {
        title: 'Minify',
        description: 'Run in minify mode',
        value: 'p'
      }
    ]
  }
]);

export const theme = (domain: string): PromptObject<string>[] => ([
  {
    type: 'select',
    name: 'resource',
    message: 'Theme Resources',
    instructions: false,
    initial: 0,
    choices: [
      {
        title: 'List',
        description: `List all themes from ${domain}`,
        value: 'p'
      },
      {
        title: 'Publish',
        description: `Publish theme on ${domain}`,
        value: 'p'
      },
      {
        title: 'Unpublish',
        description: `Unpublish theme on ${domain}`,
        value: 'p'
      }
    ]
  }
]);

export const assets = (domain: string, theme: string): PromptObject<string>[] => ([
  {
    type: 'select',
    name: 'resource',
    message: 'Asset Resources',
    instructions: false,
    initial: 0,
    choices: [
      {
        title: 'Delete',
        description: `Delete asset in ${theme} → ${domain} from remote source`,
        value: 'p'
      },
      {
        title: 'Push',
        description: `Upload assets to ${theme} → ${domain} from local source`,
        value: 'p'
      },
      {
        title: 'Pull',
        description: `Download assets from ${theme} → ${domain} to export directory`,
        value: 'p'
      },
      {
        title: 'Merge',
        description: `Merge assets from ${theme} → ${domain} to local source`,
        value: 'p'
      }
    ]
  }
]);

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
