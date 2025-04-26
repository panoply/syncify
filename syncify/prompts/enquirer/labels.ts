import { labels } from './utilities';

/**
 * Prompt Labels
 *
 * Ensures consistent padding if prompt labels, allowing
 * different prompts to be used in an interchangable manner
 * while the terminal aesthetic is not affected.
 */
export const label = labels({
  padding: 0,
  prompts: <const>[

    // credentials.ts prompt
    'Storage Method',
    'Existing Token',
    'Which Keychain',
    'Select Token',
    'Shopify Domain',
    'API Admin Token',
    'API Token Name',

    // directories.ts prompt
    'Select Action',
    'Directory Name',
    'Path Directory',
    'Sub-Directory',

    // create.ts prompt
    'Project Path',
    'Strap Source',
    'Choose Strap',
    'Project Name',
    'Credentials',
    'Installation',
    'Overwrite',

    // targets.ts prompt
    'Theme Targets',
    'Target Storage',
    'Select Themes',
    'Define Targets'
  ]
});
