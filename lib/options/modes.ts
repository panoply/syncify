import type { Commands, Modes } from 'types';
import { anyTrue, allFalse } from 'rambdax';
import { white, blue } from '~log';
import { invalidCommand } from '~options/validate';
import { assign, values } from '~utils/native';
import { $ } from '~state';

/**
 * Set Mode
 *
 * Identifies the execution modes which Syncify should
 * invoke. Validates the CLI flags and options to determine
 * the actions to be run.
 */
export function setModes (cli: Commands) {

  const resource = anyTrue(cli.pages, cli.metafields, cli.redirects);
  const transfrom = anyTrue(cli.style, cli.script, cli.image, cli.svg);
  const watch = anyTrue(resource, cli.upload, cli.download) ? false : cli.watch;
  const modes = <Modes> assign($.mode, {
    watch,
    hot: watch && cli.hot,
    vsc: cli.vsc,
    interactive: cli.interactive,
    export: cli.export,
    import: cli.import,
    redirects: cli.redirects,
    metafields: cli.metafields,
    pages: cli.pages,
    pull: cli.pull,
    force: cli.force,
    views: cli.views,
    script: transfrom ? cli.script : false,
    style: transfrom ? cli.style : false,
    image: transfrom ? cli.image : false,
    svg: transfrom ? cli.svg : false,
    terse: anyTrue(cli.terse, cli.prod),
    clean: anyTrue(resource, transfrom, cli.upload) ? false : cli.clean,
    build: anyTrue(cli.export, cli.watch, cli.download) ? false : cli.build,
    upload: anyTrue(transfrom, watch) ? false : cli.upload,
    download: anyTrue(resource, transfrom, cli.upload, cli.watch, cli.build) ? false : cli.download
  });

  if (allFalse(...values(modes))) {

    invalidCommand({
      message: [
        'Execution is unclear, you have not provided Syncify a operation mode to run.'
      ],
      expected: '--<cmd>',
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
