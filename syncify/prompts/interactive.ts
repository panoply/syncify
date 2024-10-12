import type{ ArrayPromptOptions } from 'types/internal';
import { prompt } from 'enquirer';
import { theme } from 'syncify:prompts/enquirer';
import { eq, gray, neonGreen, TLD } from '@syncify/ansi';
import { $ } from 'syncify:state';

/**
 * Stores Prompt
 */
export async function Stores <T> (type: 'select' | 'multiselect'): Promise<T> {

  const space = eq($.sync.stores, 'store');
  const choices = $.sync.stores.map((value) => ({
    name: value.domain,
    message: value.store,
    hint: `${space(value.store)} ${TLD} ${gray(`https://${value.domain}`)}`,
    value
  }));

  return prompt(<ArrayPromptOptions>{
    name: 'store',
    message: 'Select Stores',
    type,
    choices,
    theme,
    result () {
      return this.focused.value;
    },
    format (value: string) {
      return neonGreen(value);
    }
  });

}

/**
 * Theme Targets
 */
export async function Target (domain: string): Promise<{ target: string }> {

  return prompt(<ArrayPromptOptions>{
    type: 'select',
    name: 'target',
    message: 'Theme Resources',
    theme,
    choices: [
      {
        name: 'Connect',
        hint: `     Connect themes from ${domain}`,
        value: 'connect'
      },
      {
        name: 'List',
        hint: `        List all themes from ${domain}`,
        value: 'list'
      },
      {
        name: 'Publish',
        hint: `     Publish theme on ${domain}`,
        value: 'publish'
      },
      {
        name: 'Unpublish',
        hint: `   Unpublish theme on ${domain}`,
        value: 'unpublish'
      },
      {
        name: 'Delete',
        hint: `      Delete theme on ${domain}`,
        value: 'delete'
      }
    ]
  });

}

/**
 * Theme Target Actions
 */
export async function Actions <T> (domain: string): Promise<T> {

  return prompt(<ArrayPromptOptions> {
    type: 'select',
    name: 'resource',
    message: 'Choose Action',
    theme,
    choices: [
      {
        name: 'Watch',
        hint: 'watch and build theme from source',
        value: 'watch'
      },
      {
        name: 'Build',
        hint: 'Build theme from source',
        value: 'build'
      },
      {
        name: 'Export',
        hint: 'Export from output',
        value: 'export'
      },
      {
        name: 'Upload',
        hint: 'Upload an export',
        value: 'upload'
      },
      {
        name: 'Import',
        hint: 'Download a theme from store',
        value: 'import'
      }
    ]
  });

}

/**
 * Theme Targets
 */
export async function Option <T> (domain: string): Promise<T> {

  return prompt(<ArrayPromptOptions> {
    type: 'select',
    name: 'resource',
    message: 'Options',
    theme,
    choices: [
      {
        name: 'HOT Reloading',
        hint: 'Live reload in changes',
        value: 'hot'
      },
      {
        name: 'Development',
        hint: 'Run in development mode',
        value: 'dev'
      },
      {
        name: 'Production',
        hint: 'Run in production mode',
        value: 'prod'
      },
      {
        name: 'Terser',
        hint: 'Run in terser mode',
        value: 'terse'
      }
    ]
  });

}

export async function Metafields <T> (domain: string): Promise<T> {

  return prompt(<ArrayPromptOptions> {
    type: 'select',
    name: 'resource',
    message: 'Metafield Resources',
    theme,
    choices: [
      {
        name: 'Push',
        hint: `Upload metafields to ${domain}`,
        value: 'push'
      },
      {
        name: 'Pull',
        hint: `Download metafields from ${domain}`,
        value: 'pull'
      },
      {
        name: 'Merge',
        hint: 'Merge remote metafields with local records',
        value: 'merge'
      },
      {
        name: 'Delete',
        hint: `Delete metafields from ${domain}`,
        value: 'delete'
      }
    ]
  });

}

export async function Assets <T> (themeName: string, domain: string): Promise<T> {

  return prompt(<ArrayPromptOptions> {
    type: 'select',
    name: 'resource',
    message: 'Asset Resources',
    theme,
    initial: 0,
    choices: [
      {
        name: 'Delete',
        hint: `Delete asset in ${themeName} → ${domain} from remote source`,
        value: 'delete'
      },
      {
        name: 'Push',
        hint: `Upload assets to ${themeName} → ${domain} from local source`,
        value: 'push'
      },
      {
        name: 'Pull',
        hint: `Download assets from ${themeName} → ${domain} to export directory`,
        value: 'pull'
      },
      {
        name: 'Merge',
        hint: `Merge assets from ${themeName} → ${domain} to local source`,
        value: 'merge'
      }
    ]
  });

}

export async function Pages <T> (domain: string): Promise<T> {

  return prompt(<ArrayPromptOptions> {
    type: 'select',
    name: 'resource',
    message: 'Page Resource',
    theme,
    choices: [
      {
        name: 'Push',
        hint: `Upload pages to ${domain}`,
        value: 'push'
      },
      {
        name: 'Pull',
        hint: `Download pages from ${domain}`,
        value: 'pull'
      },
      {
        name: 'Merge',
        hint: 'Merge remote pages with local records',
        value: 'merge'
      },
      {
        name: 'Delete',
        hint: `Delete pages from ${domain}`,
        value: 'delete'
      },
      {
        name: 'Publish',
        hint: `Publish pages on ${domain}`,
        value: 'pushlist'
      },
      {
        name: 'Unpublish',
        hint: `Unpublish pages on ${domain}`,
        value: 'unpublish'
      }
    ]
  });

}
