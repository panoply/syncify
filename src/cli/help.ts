import ansis from 'ansis';

/**
 * Help Text
 *
 * Shown when using the CLI
 */
export const help = `
  ${ansis.gray('---------------------------------------------------------')}

  ${ansis.green(ansis.bold('Syncify'))}                                       ${ansis.dim('by Panoply')}

  ${ansis.bold('Version')}
  <!version!>

  ${ansis.bold('Usage')}
  Welcome to the Syncify CLI. The command line utility assumes that
  you have defined store targets in the ${ansis.dim('package.json')} file
  and setup credentials within a ${ansis.dim('.env')} file.

  ${ansis.bold('Commands:')}
  $ sync
    ${ansis.gray(ansis.italic('Interactive prompt'))}
  $ sync status
    ${ansis.gray(ansis.italic('Prints list of connected stores'))}
  $ sync themes    <store>
    ${ansis.gray(ansis.italic('Prints list of themes, helpful when you need ids'))}
  $ sync watch     <store>  --flags
    ${ansis.gray(ansis.italic('Starts watch mode'))}
  $ sync upload    <store>  --flags
    ${ansis.gray(ansis.italic('Uploads the theme directory'))}
  $ sync download  <store>  --flags
    ${ansis.gray(ansis.italic('Downloads a specific theme/s from store/s'))}

  ${ansis.bold('Flags:')}
    -t, --theme   <list>  ${ansis.gray(ansis.italic('A comma seprated list of themes'))}
    -s, --store   <list>  ${ansis.gray(ansis.italic('A comma separated list of stores'))}
    -o, --output  <path>  ${ansis.gray(ansis.italic('A path value (used for downloads)'))}
    -h, --help    ${ansis.gray(ansis.italic('Prints commands list and help information'))}

`;
