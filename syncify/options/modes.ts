import type { Modes } from 'types';
import type { Commands } from 'types/internal';
import { LPR, LAN, RAN, RPR, white, blue, red, bold, gray, whiteBright, cyan } from '@syncify/ansi';
import { invalidCommand } from 'syncify:log/throws';
import { assign, values, keys } from 'syncify:native';
import { hasProp, isString } from 'syncify:utils';
import { $ } from 'syncify:state';

/**
 * Set Mode
 *
 * Identifies the execution modes which Syncify should
 * invoke. Validates the CLI flags and options to determine
 * the actions to be run.
 */
export function setModes (cli: Commands) {

  const prop = hasProp($.config.log);

  if (prop('silent')) $.log.config.silent = $.config.log.silent;
  if (prop('clear')) $.log.config.clear = $.config.log.clear;
  if (prop('stats')) $.log.config.stats = $.config.log.stats;
  if (prop('warnings')) $.log.config.warnings = $.config.log.warnings;

  const resource = cli.pages || cli.metafields || cli.redirects;
  const transform = cli.style || cli.script || cli.image || cli.svg;
  const watch = resource || cli.upload || cli.import ? false : cli.watch;

  $.mode = assign<Modes, Modes>($.mode, {
    watch,
    dev: !cli.prod,
    prod: cli.prod,
    setup: cli.mode === 'setup',
    strap: cli.mode === 'strap',
    themes: cli.mode === 'themes',
    hot: cli.watch && cli.hot,
    interactive: cli.interactive,
    redirects: cli.redirects,
    metafields: cli.metafields,
    pages: cli.pages,
    pull: cli.pull,
    cache: cli.build && cli.cache,
    force: cli.force,
    script: transform ? cli.script : false,
    style: transform ? cli.style : false,
    image: transform ? cli.image : false,
    svg: transform ? cli.svg : false,
    terse: cli.terse || cli.prod,
    clean: (resource || transform || cli.upload) ? false : (cli.export && cli.build) || cli.clean,
    build: (cli.watch || cli.import) ? false : cli.build,
    upload: (transform || watch) ? false : cli.upload,
    export: cli.export,
    import: (resource || transform || cli.upload || cli.watch || cli.build) ? false : cli.import,
    publish: cli.publish,
    release: isString(cli.release)
  });

  validateCommands($.mode, cli);

  if ($.mode.release) {
    $.mode.clean = true;
    $.mode.build = true;
    $.mode.export = true;
    $.mode.publish = true;
  }

  if ($.mode.build) {

    const build = (
      !$.mode.script &&
      !$.mode.style &&
      !$.mode.svg &&
      !$.mode.pages &&
      !$.mode.metafields &&
      !$.mode.image
    );

    if (build) {
      $.mode.script = true;
      $.mode.style = true;
      $.mode.svg = true;
      $.mode.image = true;
    }
  }

};

function validateCommands (modes: Modes, cli: Commands) {

  if (cli.cache && cli.build === false) {

    invalidCommand({
      expected: '-b, --build',
      message: [
        'Cache resets can only be executed along side build operations'
      ],
      fix: [
        `Attempting to purge cache outside ${bold('build')} mode Syncify requires you to pass`,
        'the build mode flags when executing a cache reset, for example:',
        NLR,
        `${whiteBright('$')} ${white(`syncify ${$.argv} ${blue('-b --cache')}`)}`,
        NLR,
        `Run ${gray('syncify --help')} for more information, or pass an execution`,
        `operation mode as per the ${whiteBright('expected')} value.`,
        NLR

      ]
    });

  }

  if (values(modes).every(cmd => cmd === false)) {

    invalidCommand(
      {
        expected: '--<cmd>',
        message: [
          'Execution is unclear, you have not provided Syncify with a valid operation',
          'mode to execute'
        ],
        fix: [
          'Syncify requires that you provide an operation. In most cases, this',
          'error occurs when you have forgotten to pass the mode, for example:',
          NLR,
          `${whiteBright('$')} ${whiteBright(`syncify ${LAN}${cyan('mode')}${RAN}`)}`,
          NLR,
          `Run ${blue('syncify --help')} for more information`
        ]
      }
    );

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
      if (
        mode === 'build' ||
        mode === 'clean' ||
        mode === 'cache' ||
        mode === 'export') continue;

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

        return invalidCommand(
          {
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
          }
        );
      }
    }

  }

}
