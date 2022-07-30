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
  you have defined stores, themes and setup credentials within a ${c.dim('.env')} file.

  ${c.bold('Aliases:')}
  $ sync

  ${c.bold('Commands:')}
  $ syncify
    ${c.gray(c.italic('Interactive prompt'))}
  $ syncify <store>
    ${c.gray(c.italic('Prints list of connected stores'))}

  ${c.bold('Themes:')}
    -t, --theme     <list>
    ${c.gray(c.italic('A comma seprated list of themes'))}
    --<store>       <list>
    ${c.gray(c.italic('A store reference command (see examples)'))}

  ${c.bold('Paths:')}
    -c, --config    <path>   ${c.gray(c.italic('Set configs path'))}
    -i, --input     <path>   ${c.gray(c.italic('Set input path'))}
    -o, --output    <path>   ${c.gray(c.italic('Set output path'))}

  ${c.bold('Resource:')}
    -f, --filter    <path>   ${c.gray(c.italic('Glob path, use with pull or push triggers'))}

  ${c.bold('Environment:')}
    --dev     ${c.gray(c.italic('Build in development mode (default)'))}
    --prod    ${c.gray(c.italic('Build in production mode'))}

  ${c.bold('Modes:')}
    -b, --build        ${c.gray(c.italic('Build theme from input'))}
    -w, --watch        ${c.gray(c.italic('Run watch mode'))}
    -u, --upload       ${c.gray(c.italic('Upload theme to stores'))}
    -d, --download     ${c.gray(c.italic('Download theme from stores'))}
    -m, --metafields   ${c.gray(c.italic('Run metafields resource mode'))}
    -p, --pages        ${c.gray(c.italic('Run pages resource mode'))}
    -r, --redirects    ${c.gray(c.italic('Run redirects resource mode'))}

  ${c.bold('Triggers:')}
    --pull        ${c.gray(c.italic('Pull a resource from a shop or theme'))}
    --push        ${c.gray(c.italic('Push a resource to a shop or theme'))}
    --del         ${c.gray(c.italic('Delete a remote and local file'))}
    --server      ${c.gray(c.italic('Launch Browser Sync live-reload'))}
    --silent      ${c.gray(c.italic('Silent logs, only warnings or errors are printed'))}

  ${c.bold('Other:')}
    --vsc     ${c.gray(c.italic('Generate vscode specific settings'))}
    --help    ${c.gray(c.italic('Show the screen'))}

  ${c.gray('---------------------------------------------------------')}

`;
