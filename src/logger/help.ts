import { gray, bold, green } from '../cli/ansi';

/**
 * Help Text
 *
 * Shown when using the CLI
 */
export const help = `
  ${gray('---------------------------------------------------------')}

  ${green(bold('Syncify'))}                                       ${gray('by Panoply')}

  ${bold('Version')}
  <!version!>

  ${bold('Usage')}
  Welcome to the Syncify CLI. The command line utility assumes that
  you have defined stores, themes and setup credentials within a ${gray('.env')} file.

  ${bold('Aliases:')}
  $ sync

  ${bold('Commands:')}
  $ syncify
    ${gray.italic('Interactive prompt')}
  $ syncify <store>
    ${gray.italic('Prints list of connected stores')}

  ${bold('Themes:')}
    -t, --theme     <list>
    ${gray.italic('A comma seprated list of themes')}
    --<store>       <list>
    ${gray.italic('A store reference command (see examples)')}

  ${bold('Paths:')}
    -c, --config    <path>   ${gray.italic('Set configs path')}
    -i, --input     <path>   ${gray.italic('Set input path')}
    -o, --output    <path>   ${gray.italic('Set output path')}

  ${bold('Resource:')}
    -f, --filter    <path>   ${gray.italic('Glob path, use with pull or push triggers')}

  ${bold('Environment:')}
    --dev     ${gray.italic('Build in development mode (default)')}
    --prod    ${gray.italic('Build in production mode')}

  ${bold('Modes:')}
    -b, --build        ${gray.italic('Build theme from input')}
    -w, --watch        ${gray.italic('Run watch mode')}
    -u, --upload       ${gray.italic('Upload theme to stores')}
    -d, --download     ${gray.italic('Download theme from stores')}
    -m, --metafields   ${gray.italic('Run metafields resource mode')}
    -p, --pages        ${gray.italic('Run pages resource mode')}
    -r, --redirects    ${gray.italic('Run redirects resource mode')}

  ${bold('Triggers:')}
    --pull        ${gray.italic('Pull a resource from a shop or theme')}
    --push        ${gray.italic('Push a resource to a shop or theme')}
    --del         ${gray.italic('Delete a remote and local file')}
    --server      ${gray.italic('Launch Browser Sync live-reload')}
    --silent      ${gray.italic('Silent logs, only warnings or errors are printed')}

  ${bold('Other:')}
    --vsc     ${gray.italic('Generate vscode specific settings')}
    --help    ${gray.italic('Show the screen')}

  ${gray('---------------------------------------------------------')}

`;
