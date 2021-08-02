import chalk from 'chalk';

/**
 * Help Text
 *
 * Shown when using the CLI
 */
export const help = chalk`
  {green.bold Shopify Sync} – {bold Commands}
  {gray ---------------------------------------------------------}

  {bold Commands:}
    sync watch [options] – {gray.italic Watch theme folder}
    sync upload [options] [filter] – {gray.italic Upload theme files}
    sync download [options] [filter] – {gray.italic Download theme files}
`;
