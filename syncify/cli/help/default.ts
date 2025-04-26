import * as _ from '@syncify/ansi';

import { describe, encase, highlight } from '~help/utils';

import { $ } from '$';

export function Default () {

  _.Create()
  .Header(`HELP${_.COL}`, _.bold)
  .Line(` $ sy help                       ${describe('Prints this screen')}`)
  .Line(` $ sy help {mode}                ${describe('Pick a mode and view usage guide')}`)
  .Line(` $ sy help examples              ${describe('Real world command line examples')}`)
  .Header(`USAGE${_.COL}`, _.bold)
  .Line(` $ sy {mode}                     ${describe('Command mode is required')}`)
  .Line(` $ sy {mode} --flags             ${describe('Flags can be provided to modes')}`)
  .Line(` $ sy {mode} [options]           ${describe('Some modes accept positionals')}`)
  .Line(` $ sy {mode} [options] --flags   ${describe('Mode with positional and flags')}`)
  .Header('MODES' + _.COL, _.bold)
  .Line(` $ sy init                       ${describe('Setup Syncify in existing project')}`)
  .Line(` $ sy build                      ${describe('Build theme from source')}`)
  .Line(` $ sy watch                      ${describe('Watch and rebuild changes')}`)
  .Line(` $ sy pull                       ${describe('Download from a store theme')}`)
  .Line(` $ sy push                       ${describe('Upload to a store theme')}`)
  .Line(` $ sy publish                    ${describe('Changes a theme role to and makes it main')}`, _.dim)
  .Line(` $ sy delete                     ${describe('Remove files/resources from a store or theme')}`, _.dim)
  .Line(` $ sy pack                       ${describe('Generate a .zip package of the current theme')}`, _.dim)
  .Line(` $ sy link                       ${describe('Link existing themes/s from a store')}`)
  .Line(` $ sy unlink                     ${describe('Remove a linked theme/s from project')}`, _.dim)
  .Line(` $ sy duplicate                  ${describe('Duplicates an existing theme in a store')}`)
  .Line(` $ sy keychain                   ${describe('Access the global token keychain')}`)
  .Line(` $ sy git                        ${describe('Git integration configuration and information')}`, _.dim)
  .Line(` $ sy prune                      ${describe('Clears internal project caches from disk')}`, _.dim)
  .Line(` $ sy inspect                    ${describe('Prints information about Syncify installation')}`)
  .Line(` $ sy projects                   ${describe('Lists all Syncify projects on this device')}`)
  .Line(` $ sy doctor                     ${describe('Diagnostics and fixable operations')}`, _.dim)
  .Line(` $ sy help                       ${describe('Print complete command list')}`)
  .Header(`FLAGS${_.COL}`, _.bold)
  .Line(` --input,  -i                    ${describe('Define input (source) directory')}`)
  .Line(` --output, -o                    ${describe('Define output directory')}`)
  .Line(` --config, -c                    ${describe('Define config directory')}`)
  .Line(` --hot,    -h                    ${describe('HOT Reload when running watch mode')}`)
  .Line(` --target, -T                    ${describe('Theme and store targeting')}`)
  .Line(` --filter, -F                    ${describe('File filtering and globs')}`)
  .Line(` --align                         ${describe('Subset theme file merge with remote sources')}`)
  .Line(` --new                           ${describe('Used with sy pull to create a new theme')}`)
  .Line(` --bind                          ${describe('Live bindings in watch mode')}`)
  .Line(` --dev                           ${describe('Development environment (default)')}`)
  .Line(` --prod                          ${describe('Production environment')}`)
  .Line(` --terse                         ${describe('Terse distribution (minification)')}`)
  .Line(` --clean                         ${describe('Clean output directory')}`)
  .Line(` --silent                        ${describe('Suppress logging via stdout')}`)
  .Line(` --patch                         ${describe('Apply a patch version bump')}`)
  .Line(` --minor                         ${describe('Apply a minor version bump')}`)
  .Line(` --major                         ${describe('Apply a major version bump')}`)
  .Line(` --force                         ${describe('Force overwrite or action (caution)')}`)
  .Line(` --batch                         ${describe('Control batch limit (default is 10)')}`)
  .Ruler()
  .Append('© 2025 Νικολας Σαββιδης', _.gray.bold)
  .Line(`Version${_.COL}  ${$.version}`, _.gray)
  .Line(`License${_.COL}  Apache 2.0`, _.gray)
  .Line(`Website${_.COL}  ${_.underline('https://syncify.sh')}`, _.gray)
  .Line(`Github${_.COL}   ${_.underline('https://github.com/panoply/syncify')}`, _.gray)
  .Line(`Discord${_.COL}  ${_.underline('https://discord.gg/shopify-developers-597504637167468564')}`, _.gray)
  .Newline()
  .toString(input => {

    const [ header, footer ] = encase({ banner: true });
    const heading = _.Scroll({ input: header, height: 8 });
    const content = _.Scroll({
      input: highlight(input),
      yPos: 8,
      height: $.terminal.rows - 12
    });

    heading.print();
    content.print();
    content.setKeypress($.terminal.rows, content.maxHeight);

    footer.toLog();

  });

}
