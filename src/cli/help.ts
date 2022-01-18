import { green, bold, gray, italic, dim } from 'kleur';

/**
 * Help Text
 *
 * Shown when using the CLI
 */
export const help = `
  ${gray('---------------------------------------------------------')}

  ${green(bold('Syncify'))}                                       ${dim('by Panoply')}

  ${bold('Version')}
  <!version!>

  ${bold('Usage')}
  Welcome to the Syncify CLI. The command line utility assumes that
  you have defined store targets in the ${dim('package.json')} file
  and setup credentials within a ${dim('.env')} file.

  ${bold('Commands:')}
  $ sync
    ${gray(italic('Interactive prompt'))}
  $ sync status
    ${gray(italic('Prints list of connected stores'))}
  $ sync themes    <store>
    ${gray(italic('Prints list of themes, helpful when you need ids'))}
  $ sync watch     <store>  --flags
    ${gray(italic('Starts watch mode'))}
  $ sync upload    <store>  --flags
    ${gray(italic('Uploads the theme directory'))}
  $ sync download  <store>  --flags
    ${gray(italic('Downloads a specific theme/s from store/s'))}

  ${bold('Flags:')}
    -t, --theme   <list>  ${gray(italic('A comma seprated list of themes'))}
    -s, --store   <list>  ${gray(italic('A comma separated list of stores'))}
    -o, --output  <path>  ${gray(italic('A path value (used for downloads)'))}
    -h, --help    ${gray(italic('Prints commands list and help information'))}

`;
