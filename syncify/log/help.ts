import type { Commands } from 'types';
import { COL, ARR } from '@syncify/ansi';
import { gray, bold, lightGray, whiteBright, clear } from '@syncify/ansi';
import { log } from 'syncify:native';

export function help (cli: Commands) {

  log(clear);

  const DSH = lightGray('-'.repeat(80));

  const usage = `
    ${bold('SYNCIFY CLI  ' + ARR + whiteBright('  v' + VERSION))}

    ${whiteBright('Please provide a command argument.')}

    ${bold('USAGE' + COL)}

    $ syncify                    ${gray.italic('Show this screen')}
    $ syncify {store} [theme]    ${gray.italic('Store and theme targeting')}

    ${bold('HELP' + COL)}

    -h, --help                   ${gray.italic('Print a list of all available commands')}
    -h, --help examples          ${gray.italic('Print a list of command examples')}

  `;

  if (cli.help === null) {

    return log(usage);

  }

  /**
   * Help Text
   *
   * Shown when using the CLI
   */
  const examples = `
    ${bold('SYNCIFY CLI  ' + ARR + whiteBright('  v' + VERSION))}

    Below are some usage examples for working with the Syncify CLI.
    The ${gray('=')} character is optional and samples are using the ${gray('$ sy')} alias.

    ${bold('TARGETING' + COL)}

    ${gray('Target 1 store and 1 theme')}:
    $ sy your-store${gray('=')}theme-1

    ${gray('Target 1 store and 2 theme')}:
    $ sy your-store${gray('=')}theme-1,some-theme,test-theme

    ${gray('Target 2 stores and 1 theme')}:
    $ sy --your-store${gray('=')}theme-1 --another-store${gray('=')}some-theme

    ${gray('Target 2 stores and 4 theme')}:
    $ sy --your-store${gray('=')}theme-1,theme-2 --another-store${gray('=')}some-theme,test-theme

  ${DSH}

    ${bold('BUILDING' + COL)}

    ${gray('Build theme from source')}:
    $ sy --build

    ${gray('Build theme with terse minification')}:
    $ sy --build --terse

    ${gray('Build theme and clean')}:
    $ sy --build --clean --terse

  ${DSH}

    ${bold('WATCHING' + COL)}

    ${gray('Watch 1 store and 1 theme')}:
    $ sy your-store${gray('=')}theme-1 --watch

    ${gray('Watch 1 store and 2 themes with hot reloading')}:
    $ sy your-store${gray('=')}theme-1,theme-2 --watch --hot

    ${gray('Watch 2 stores and 1 theme')}:
    $ sy --your-store${gray('=')}theme-1 --another-store${gray('=')}some-theme --watch

    ${gray('Watch 2 stores and 2 themes')}:
    $ sy --your-store${gray('=')}theme-1,theme-2 --another-store${gray('=')}some-theme,test-theme --watch

    ${gray('Watch 1 store with 2 themes and clean mode with hot live reloads')}:
    $ sy your-store${gray('=')}theme-1,theme-2 --watch --clean --hot

    ${gray('Watch 1 store with 2 themes in production mode')}:
    $ sy your-store${gray('=')}theme-1,theme-2 --prod --watch

  `;

  /**
   * Help Text
   *
   * Shown when using the CLI
   */
  const commands = `
    ${bold('SYNCIFY CLI  ' + ARR + whiteBright('  v' + VERSION))}

    Welcome to the Syncify CLI. The command line utility assumes that you have
    defined stores, themes and setup credentials within a ${gray('.env')} file.

    ${bold('ALIASES' + COL)}

      $ sy                         ${gray.italic('Shorthand for syncify')}

    ${bold('COMMANDS' + COL)}

      $ syncify                    ${gray.italic('Show this screen')}
      $ syncify {store} [theme]    ${gray.italic('Store and theme targeting')}

    ${bold('THEMES' + COL)}

        --{store} [theme]          ${gray.italic('A store reference command (run examples)')}
      -t, --theme [theme]          ${gray.italic('A comma seprated list of themes')}

    ${bold('PATHS' + COL)}

      -c, --config    <path>       ${gray.italic('Set config directory path')}
      -i, --input     <path>       ${gray.italic('Set input directory path')}
      -o, --output    <path>       ${gray.italic('Set output directory path')}

    ${bold('MODES' + COL)}

      -w, --watch                  ${gray.italic('Run watch mode')}
      -b, --build                  ${gray.italic('Run build mode from input')}
      -u, --upload                 ${gray.italic('Run upload mode theme to stores')}
      -d, --import                 ${gray.italic('Run download mode from theme and stores')}
      -e, --export                 ${gray.italic('Run export mode and generate theme zip')}
      -p, --publish                ${gray.italic('Run publish and create a release')}
      -r, --resource               ${gray.italic('Run resource mode, resource name expected')}

    ${bold('RESOURCES' + COL)}

      -r, --resource themes        ${gray.italic('Run the themes resource')}
      -r, --resource assets        ${gray.italic('Run the theme assets resource')}
      -r, --resource pages         ${gray.italic('Run the pages resource')}
      -r, --resource metafields    ${gray.italic('Run the metafields resource')}
      -r, --resource redirects     ${gray.italic('Run the redirects resource')}
      -r, --resource files         ${gray.italic('Run the files resource')}

    ${bold('ENVIRONMENT' + COL)}

      --dev                       ${gray.italic('Build in development mode (default)')}
      --prod                      ${gray.italic('Build in production mode')}
      --hot                       ${gray.italic('Run watch with hot-reloads')}

    ${bold('OPERATIONS' + COL)}

      --clean                     ${gray.italic('Clean the output, use with modes')}
      --silent                    ${gray.italic('Silent logging, only errors will print')}
      --cache                     ${gray.italic('Purges the local .cache references')}

    ${bold('TRIGGERS' + COL)}

      --spawn  [list]             ${gray.italic('Invoke a defined spawn child process/s')}
      --delete [list]             ${gray.italic('Delete a remote and local file')}
      --terse  [list]             ${gray.italic('invoke minify mode, accepts resource/s')}

    ${bold('TRANSFORMS' + COL)}

      --script                    ${gray.italic('Run the script transform in isolation')}
      --style                     ${gray.italic('Run the style transform in isolation')}
      --svg                       ${gray.italic('Run the svg transform in isolation')}
      --image                     ${gray.italic('Run the image transform in isolation')}

    ${bold('UTILITY' + COL)}

      -f, --filter <path>         ${gray.italic('Filter operation to be used with modes')}

    ${bold('VERSIONING' + COL)}

      --bump patch                ${gray.italic('Apply a patch version bump, use in export mode')}
      --bump minor                ${gray.italic('Apply a minor version bump, use in export mode')}
      --bump major                ${gray.italic('Apply a major version bump, use in export mode')}

    ${bold('STRAPS' + COL)}

      --strap dusk                ${gray.italic('Import and generate a dusk strap')}
      --strap dawn                ${gray.italic('Import and generate a dawn strap')}
      --strap silk                ${gray.italic('Import and generate a silk strap')}

    ${bold('HELP' + COL)}

      -h, --help                  ${gray.italic('Print this screen')}
      -h, --help examples         ${gray.italic('Print a list of command examples')}

    ${DSH}

    ${gray('BY ΝΙΚΟΛΑΣ ΣΑΒΒΙΔΗΣ')}

    ${gray.underline('https://github.com/panoply')}
    ${gray.underline('https://x.com/niksavvidis')}

  `;

  log(cli.help === 'examples' ? examples : commands);

}
