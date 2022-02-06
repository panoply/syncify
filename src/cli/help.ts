import c from 'ansis';

/**
 * Help Text
 *
 * Shown when using the CLI
 */
export const help = `
  ${c.gray('---------------------------------------------------------')}

  ${c.green(c.bold('Syncify'))}                                       ${c.dim('by Panoply')}

  ${c.bold('Version')}
  <!version!>

  ${c.bold('Usage')}
  Welcome to the Syncify CLI. The command line utility assumes that
  you have defined stores/themes in the ${c.dim('package.json')} file
  and setup credentials within a ${c.dim('.env')} file.

  ${c.bold('Aliases:')}
  $ sync

  ${c.bold('Commands:')}
  $ syncify
    ${c.gray(c.italic('Interactive prompt'))}
  $ syncify status
    ${c.gray(c.italic('Prints list of connected stores'))}
  $ syncify build
    ${c.gray(c.italic('Triggers build. Accepts the env flag --prod (default is --dev'))}
  $ syncify themes    <store>
    ${c.gray(c.italic('Prints list of themes, helpful when you need ids'))}
  $ syncify watch     <store>  --flags
    ${c.gray(c.italic('Starts watch mode'))}
  $ syncify upload    <store>  --flags
    ${c.gray(c.italic('Uploads the theme directory'))}
  $ syncify download  <store>  --flags
    ${c.gray(c.italic('Downloads a specific theme/s from store/s'))}

  ${c.bold('Flags:')}
    -t, --theme   <list>  ${c.gray(c.italic('A comma seprated list of themes'))}
    -s, --store   <list>  ${c.gray(c.italic('A comma separated list of stores'))}
    -o, --output  <path>  ${c.gray(c.italic('A path value (used for downloads)'))}
    -h, --help    ${c.gray(c.italic('Prints commands list and help information'))}

`;
