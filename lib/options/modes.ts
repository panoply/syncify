import type { Commands, Modes } from 'types';
import { anyTrue, allFalse, allTrue, keys } from 'rambdax';
import { white, blue, red, LPR, RPR } from 'syncify:ansi';
import { invalidCommand } from 'syncify:log/throws';
import { assign, values } from 'syncify:native';
import { $ } from 'syncify:state';

/**
 * Set Mode
 *
 * Identifies the execution modes which Syncify should
 * invoke. Validates the CLI flags and options to determine
 * the actions to be run.
 */
export function setModes (cli: Commands) {

  const resource = anyTrue(cli.pages, cli.metafields, cli.redirects);
  const transform = anyTrue(cli.style, cli.script, cli.image, cli.svg);
  const watch = anyTrue(resource, cli.upload, cli.import) ? false : cli.watch;
  const modes = assign<Modes, Modes>($.mode, {
    watch,
    hot: allTrue(cli.watch, cli.hot),
    interactive: cli.interactive,
    redirects: cli.redirects,
    metafields: cli.metafields,
    pages: cli.pages,
    pull: cli.pull,
    force: cli.force,
    views: cli.views,
    script: transform ? cli.script : false,
    style: transform ? cli.style : false,
    image: transform ? cli.image : false,
    svg: transform ? cli.svg : false,
    terse: anyTrue(cli.terse, cli.prod),
    clean: anyTrue(resource, transform, cli.upload) ? false : allTrue(cli.export, cli.build) || cli.clean,
    build: anyTrue(cli.watch, cli.import) ? false : cli.build,
    upload: anyTrue(transform, watch) ? false : cli.upload,
    export: cli.export,
    import: anyTrue(resource, transform, cli.upload, cli.watch, cli.build) ? false : cli.import
  });

  validateCommands(modes);

  if (modes.build) {

    const build = allFalse(
      modes.script,
      modes.style,
      modes.svg,
      modes.pages,
      modes.metafields,
      modes.image
    );

    if (build) {
      modes.script = true;
      modes.style = true;
      modes.svg = true;
      modes.image = true;
      modes.views = true;
    }
  }

  return modes;

};

function validateCommands (modes: Modes) {

  if (values(modes).every(cmd => cmd === false)) {

    invalidCommand({
      expected: '--<cmd>',
      message: [
        'Execution is unclear, you have not provided Syncify a operation mode to run.'
      ],
      fix: [
        'Syncify requires that you provide an operation. In most cases, this',
        'error occurs when you have forgotten to pass the mode, for example:',
        '',
        `${white('$')} ${white(`syncify ${$.argv} ${blue('--watch')}`)}`,
        `${white('$')} ${white(`syncify ${$.argv} ${blue('--build')}`)}`,
        `${white('$')} ${white(`syncify ${$.argv} ${blue('--upload')}`)}`,
        '',
        `Run ${blue('syncify --help')} for more information, or pass an execution`,
        `operation mode as per the ${blue('expected')} value and ensure to replace ${blue('--<cmd>')}`,
        'with one the examples provided or a supported mode.'
      ]
    });

  }

  if (modes.export) {

    const props = <string[]> keys(modes);

    props.push(
      'filter', // -f
      'delete', // -d
      'spawn', // -s
      'resource' // -r
    );

    for (const mode of props) {

      // Skip allowed modes from validation
      if (mode === 'build' || mode === 'clean' || mode === 'export') continue;

      // Throws is --export is used with any other mode
      if (modes[mode]) {

        const invalid = props.filter(cmd => (
          cmd !== 'build' &&
          cmd !== 'clean' &&
          cmd !== 'export'
        ));

        invalid.push(
          'f\\b', // --filter
          'u\\b', // --upload
          'w\\b', // --watch
          's\\b', // --spawn
          'd\\b', // --delete
          'r\\b' // --resource
        );

        const valid = invalid.map(cmd => {

          if (
            cmd === 'filter' ||
            cmd === 'f' ||
            cmd === 'resource' ||
            cmd === '-r'
          ) {

            return `--?${cmd}.*?(?=(--?${invalid.join('|--?')}))`;

          } else {

            return `--?${cmd}`;

          }

        }).join('|');

        const pexp = new RegExp(`(--?${invalid.join('|--?')})`, 'g');
        const eexp = new RegExp(`(${valid})`, 'g');

        return invalidCommand({
          message: [
            `Bad command ${LPR}argv${RPR} sequence passed with ${blue('export')} mode.`,
            'Theme exports are performed in isolation. You command includes',
            'execution modes that cannot be run when exporting theme/s'
          ],
          provided: $.argv.replace(pexp, red('$1')).replace(/(--export)/, blue('$1')),
          expected: $.argv.replace(eexp, NIL).replace(/(--export)/, blue('$1')),
          fix: [
           `Removed the flags marked ${red('red')} as shown in provided aboved.`
          ]
        });
      }
    }

  }

}
