/* eslint-disable no-unused-vars */
import type { Syncify } from 'types';
import type { Merge } from 'type-fest';
import type { BuildReport, BuildModeReport } from 'types/internal';
import anymatch from 'anymatch';
import glob from 'fast-glob';
import pMap from 'p-map';
import { compile as assets } from 'syncify:asset';
import { compile as liquid } from 'syncify:liquid';
import { compile as json } from 'syncify:json';
import { compile as script } from 'syncify:script';
import { compile as styles } from 'syncify:style';
import { compile as svg } from 'syncify:svg';
import { File, Type } from 'syncify:file';
import { parseFile } from 'syncify:process/files';
import { toArray } from 'syncify:native';
import { sizeDiff } from 'syncify:sizes';
import { isUndefined, has, plural, isEmpty, isObject } from 'syncify:utils';
import { timer } from 'syncify:timer';
import { $ } from 'syncify:state';
import { saveCache } from 'syncify:process/cache';
import { Append, Create, Prefix } from 'syncify:cli/tree';
import * as c from '@syncify/ansi';
import * as log from 'syncify:log';
import { HSH } from '@syncify/ansi';
import { BUILD_GROUPS } from 'syncify:const';

type Groups = (
  | 'styles'
  | 'scripts'
  | 'svgs'
  | 'sections'
  | 'layouts'
  | 'metaobject'
  | 'templates'
  | 'snippets'
  | 'locales'
  | 'configs'
  | 'schema'
  | 'pages'
  | 'metafields'
  | 'assets'
)

type Report = Merge<Partial<Record<Groups, BuildReport>>, {
  stats: {
    total: number;
    errors: number;
    skipped: number;
    bundled: number;
  }
}>

function getModel (): Report {

  const report: Report = {
    stats: {
      total: 0,
      errors: 0,
      skipped: 0,
      bundled: 0
    }
  };

  for (const group of BUILD_GROUPS as Array<Groups>) {

    report[group] = {
      group,
      time: NIL,
      size: 0,
      files: [],
      report: null
    };

  }

  return report;

}

/**
 * Build Function
 *
 * Triggers a compile of the project. Build mode will filter
 * and process each file group within a project in a sequential manner.
 * Upload will not be invoked until the build has completed.
 */
export async function build (cb?: Syncify) {

  timer.start('build');

  if (!$.mode.export) {
    log.nwl();
    log.task('Build');
    log.nwl();
  }

  const SVG: Set<string> = new Set();
  const errors = Create({ type: 'error' });
  const message = Create().Newline();
  const report = getModel();
  const hasFilter = isEmpty($.filters) === false;
  const parse = parseFile($.paths, $.dirs.output);
  const match = anymatch(toArray($.watch.values()));
  const globs = await glob('**', { absolute: true, cwd: $.dirs.input });
  const cache = $.cache.paths;

  for (const path of globs.filter(match)) {

    const file = parse(path);

    if (isUndefined(file)) continue;

    switch (file.type) {
      case Type.Style:
        report.styles.files.push(file); break;
      case Type.Script:
        report.scripts.files.push(file); break;
      case Type.Section:
        report.sections.files.push(file); break;
      case Type.Layout:
        report.layouts.files.push(file); break;
      case Type.Snippet:
        report.snippets.files.push(file); break;
      case Type.Locale:
        report.locales.files.push(file); break;
      case Type.Config:
        report.configs.files.push(file); break;
      case Type.Template:
        report.templates.files.push(file); break;
      case Type.Page:
        report.pages.files.push(file); break;
      case Type.Asset:
        report.assets.files.push(file); break;
      case Type.Metafield:
        report.metafields.files.push(file); break;
      case Type.Svg:

        for (const { uuid, format, input } of file.data) {

          if (!SVG.has(uuid)) {

            SVG.add(uuid);

            if (format === 'sprite') {
              report.svgs.files.push(file);
            } else {
              for (const snippet of input) {
                report.svgs.files.push(parse(snippet));
              }
            }
          }
        }

        break;
    }
  }

  /**
   * Used by the `pMap` caller to build files
   */
  function handle (record: BuildReport, transform: Function) {

    timer.start(record.group);

    return async function (file: File): Promise<BuildModeReport> {

      timer.start(file.uuid);
      report.stats.total += 1;

      try {

        // update cache paths
        cache[file.output] = file.input;

        const value = file.ext === '.json'
          ? await json(file, null, cb as any)
          : await transform(file, null, cb);

        if (value === null || isNaN(file.size)) {

          report.stats.skipped += 1;

          return {
            name: file.base,
            input: file.relative,
            time: timer.stop(file.uuid),
            output: file.key,
            error: 'Skipped File'
          };

        }

        report.stats.bundled += 1;

        return {
          name: file.base,
          input: file.relative,
          output: file.key,
          error: null,
          time: timer.stop(file.uuid),
          size: sizeDiff(isObject<any>(value) && has('css', value) ? value.css : value, file.size)
        };

      } catch (e) {

        report.stats.errors += 1;

        errors.Line(e.message);

        console.log(e);

        return {
          name: file.base,
          input: file.relative,
          output: file.key,
          time: timer.stop(file.uuid),
          error: e.message
        };

      }

    };

  }

  async function bundle (group: Groups, fn: Function) {

    const filter = hasFilter && has(group, $.filters) ? $.filters[group] : null;

    if (filter && filter.includes(group) === false) return 0;

    const record = report[group];

    record.size = record.files.length;
    record.report = await pMap(record.files, handle(record, fn), { stopOnError: true });
    record.time = timer.stop(group);

    const files = record.report.length;
    const count = c.bold(files < 10 ? ` ${files}` : `${files}`);
    const space = files === 1 ? WSR : WSP;

    message.Line(Prefix(group, `${count} ${plural('file', files)}${space}${Append(record.time)}`));

  }

  await bundle('svgs', svg);
  await bundle('layouts', liquid);
  await bundle('templates', liquid);
  await bundle('sections', liquid);
  await bundle('snippets', liquid);
  await bundle('locales', json);
  await bundle('configs', json);
  await bundle('assets', assets);
  await bundle('styles', styles);
  await bundle('scripts', script);

  await saveCache();

  if ($.mode.export === false && $.mode.publish === false) {

    message
    .NL
    .Dash('Completed', c.gray)
    .NL
    .Line(Prefix('version', `${$.vc.number}`))
    .Line(Prefix('processed', `${c.bold(`${report.stats.total}`)} files`))
    .Line(Prefix('bundled', `${c.bold(`${report.stats.bundled}`)} files`))
    .Line(Prefix('skipped', `${c.bold(`${report.stats.skipped}`)} files`))
    .Line(Prefix('duration', timer.now('build')))
    .Line(Prefix('warnings', c.bold(`${$.warnings.size}`)))
    .Line(Prefix('errors', c.bold(`${report.stats.errors}`)));

    if ($.warnings.size > 0) {

      message
      .NL
      .Dash('Warnings', c.gray)
      .Newline();

      let group: string;
      let count: number = 0;

      for (const err of $.warnings.keys()) {
        for (const [ processor, warnings ] of $.warnings.get(err)) {

          if (group !== processor) {
            count = 1;
            group = processor;
          } else {
            count = count + 1;
            message.Ruler();
          }

          message
          .Warn(`${c.bold('WARNING')} ${HSH}${c.bold(`${count}`)}`, c.yellowBright)
          .Newline('yellow')
          .Warn(group, c.yellowBright);

          for (const warn of warnings) {

            message.Insert(warn);

          }
        }
      }

      log.out(
        message.NL
        .End($.log.group)
        .BR
        .toString(c.whiteBright)
      );

    } else {

      log.out(
        message.NL
        .End($.log.group)
        .BR
        .toString(c.whiteBright)
      );

    }

    process.exit(0);

  } else {

    // TODO ~ HANDLE EXPORT / PUBLISH / RELEASE

  }
};
