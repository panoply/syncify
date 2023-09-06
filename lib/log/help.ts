import { gray, bold, COL } from '~log';

/**
 * Help Text
 *
 * Shown when using the CLI
 */
export const examples = `
  ${gray('-----------------------------------------------------------------------------')}
  ${bold('Syncify CLI Examples')}                                             ${gray('by Panoply')}
  ${gray('-----------------------------------------------------------------------------')}

  ${bold('Watching' + COL)}

  ${gray('Targeting 1 store and 1 theme')}:
  $ sync your-store${gray('=')}theme-1 --watch

  ${gray('Targeting 1 store and 2 themes with hot reloading')}:
  $ sync your-store${gray('=')}theme-1,theme-2 --watch --hot

  ${gray('Targeting 2 stores and 1 theme')}:
  $ sync --your-store${gray('=')}theme-1 --another-store${gray('=')}some-theme --watch

  ${gray('Targeting 2 stores and 2 themes')}:
  $ sync --your-store${gray('=')}theme-1,theme-2 --another-store${gray('=')}some-theme,test-theme --watch

  ${gray('Targeting 1 store with 2 themes and clean mode with hot live reloads')}:
  $ sync your-store${gray('=')}theme-1,theme-2 --watch --clean --hot

  ${gray('Targeting 1 store with 2 themes in production mode')}:
  $ sync your-store${gray('=')}theme-1,theme-2 --prod --watch

`;

/**
 * Help Text
 *
 * Shown when using the CLI
 */
export const help = `
  ${gray('-----------------------------------------------------------------------------')}
  ${bold('Syncify')}  <!version!>                                               ${gray('by Panoply')}
  ${gray('-----------------------------------------------------------------------------')}

  Welcome to the Syncify CLI. The command line utility assumes that
  you have defined stores, themes and setup credentials within a ${gray('.env')} file.

  ${bold('Aliases' + COL)}

  $ sync

  ${bold('Commands' + COL)}

  $ syncify                    ${gray.italic('Interactive prompt')}
  $ syncify {store} [theme]    ${gray.italic('Prints list of connected stores')}

  ${bold('Themes' + COL)}

       --<store>    [theme]     ${gray.italic('A store reference command (run examples)')}
    -t, --theme     [theme]     ${gray.italic('A comma seprated list of themes')}

  ${bold('Paths' + COL)}

    -c, --config    <path>     ${gray.italic('Set configs path')}
    -i, --input     <path>     ${gray.italic('Set input path')}
    -o, --output    <path>     ${gray.italic('Set output path')}

  ${bold('Utility' + COL)}

    -f, --filter    <path>     ${gray.italic('Glob path, use with pull or push triggers')}

  ${bold('Environment' + COL)}

    --dev                      ${gray.italic('Build in development mode (default)')}
    --prod                     ${gray.italic('Build in production mode')}
    --hot                      ${gray.italic('Run watch with hot-reloads')}

  ${bold('Modes' + COL)}

    -w, --watch                ${gray.italic('Run watch mode')}
    -b, --build                ${gray.italic('Run build mode from input')}
    -u, --upload               ${gray.italic('Run upload mode theme to stores')}
    -d, --download             ${gray.italic('Run download mode from theme and stores')}
    -m, --metafields           ${gray.italic('Run metafields resource mode')}
    -p, --pages                ${gray.italic('Run pages resource mode')}
    -r, --redirects            ${gray.italic('Run redirects resource mode')}

  ${bold('Resource' + COL)}

    --pull                     ${gray.italic('Pull a resource from a shop or theme')}
    --push                     ${gray.italic('Push a resource to a shop or theme')}
    --silent                   ${gray.italic('Silent logs, only warnings or errors are printed')}

  ${bold('Trigger' + COL)}

    --spawn   [list]           ${gray.italic('Invoke a defined spawn child process/s')}
    --delete  [list]           ${gray.italic('Delete a remote and local file')}
    --minify  [list]           ${gray.italic('invoke minify mode, accepts resource/s')}

  ${bold('Other' + COL)}

    --strap                    ${gray.italic('Import a strap into the project')}
    --vsc                      ${gray.italic('Generate vscode specific settings')}
    --help                     ${gray.italic('Show the screen')}

  ${bold('Help' + COL)}

    -h, --help                 ${gray.italic('Print this screen')}
    -h, --help  {examples}     ${gray.italic('Print a list of command examples')}

 ${gray('-----------------------------------------------------------------------------')}

`;
