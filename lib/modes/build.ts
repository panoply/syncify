import type { File, Syncify } from 'types';
import type { BuildReport, BuildModeReport } from 'types/internal';
import anymatch from 'anymatch';
import glob from 'fast-glob';
import { has, isEmpty, mapAsync } from 'rambdax';
import { compile as assets } from 'syncify:transform/asset';
import { compile as liquid } from 'syncify:transform/liquid';
import { compile as json } from 'syncify:transform/json';
import { compile as script } from 'syncify:transform/script';
import { compile as styles } from 'syncify:transform/styles';
import { compile as svg } from 'syncify:transform/svgs';
import { parseFile, Type } from 'syncify:process/files';
import { toArray } from 'syncify:native';
import * as c from 'syncify:ansi';
import { log, tui } from 'syncify:log';
import { fileSize, isUndefined } from 'syncify:utils';
import { timer } from 'syncify:timer';
import { $ } from 'syncify:state';
import * as cache from 'syncify:process/caches';
import { BUILD_GROUPS } from 'syncify:const';

function getModel (): { [group: string]: BuildReport } {

  const report: { [group: string]: BuildReport } = {};

  let width: number = 0;

  for (const group of BUILD_GROUPS) {

    if (group.length > width) width = group.length;

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

  $.cache.lastResource = 'build';

  const { paths, dirs, watch, filters, mode } = $;

  if (!mode.export) log.group('Build');

  timer.start('build');

  const SVG: Set<string> = new Set();
  const report = getModel();
  const hasFilter = isEmpty(filters) === false;
  const parse = parseFile(paths, dirs.output);
  const match = anymatch(toArray((watch as Set<string>).values()));
  const globs = await glob('**', { absolute: true, cwd: dirs.input });

  for (const path of globs.filter(match)) {

    const file = parse(path);

    if (isUndefined(file)) continue;

    switch (file.type) {
      case Type.Style: report.styles.files.push(file); break;
      case Type.Script: report.scripts.files.push(file); break;
      case Type.Section: report.sections.files.push(file); break;
      case Type.Layout: report.layouts.files.push(file); break;
      case Type.Snippet: report.snippets.files.push(file); break;
      case Type.Locale: report.locales.files.push(file); break;
      case Type.Config: report.configs.files.push(file); break;
      case Type.Template: report.templates.files.push(file); break;
      case Type.Page: report.pages.files.push(file); break;
      case Type.Asset: report.assets.files.push(file); break;
      case Type.Metafield: report.metafields.files.push(file); break;
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

  function handle (record: BuildReport, transform: Function) {

    return async function (file: File) :Promise<BuildModeReport> {

      timer.start(file.uuid);

      try {

        $.cache.maps[file.output] = file.input;

        const value = file.ext === '.json' ? await json(file, cb) : await transform(file, cb);

        log.update(tui.message('neonCyan', file.key));

        // if (!mode.export) log.out(tui.tree('bottom', c.neonGreen(file.key)));

        return value === null || isNaN(file.size) ? {
          name: file.base,
          input: file.relative,
          time: timer.stop(file.uuid),
          output: file.key,
          error: 'Skipped File'
        } : {
          name: file.base,
          input: file.relative,
          output: file.key,
          error: null,
          time: timer.stop(file.uuid),
          size: fileSize(value, file.size)
        };

      } catch (e) {

        //  if (!mode.export) log.out(tui.tree('bottom', c.redBright(file.key)));

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

  let count: number = 0;

  for (const group in report) {

    const filter = hasFilter && has(group, filters) ? filters[group] : null;
    const record = report[group];

    record.size = record.files.length;

    if (filter && filter.includes(group) === false) continue;

    if (group === 'styles') {

      timer.start(group);
      record.report = await mapAsync<File, BuildModeReport>(handle(record, styles), record.files);
      record.time = timer.stop(group);
      log.update.clear();

      count = count + record.report.length;
      const n = c.bold(record.report.length < 10 ? ` ${record.report.length}` : `${record.report.length}`);

      log.out(tui.suffix('whiteBright', `✓ ${group}`, c.whiteBright(` ${n} files ${c.gray(`in ${record.time}`)}`)));

    } else if (group === 'scripts') {

      timer.start(group);
      record.report = await mapAsync<File, BuildModeReport>(handle(record, script), record.files);
      record.time = timer.stop(group);
      log.update.clear();

      count = count + record.report.length;
      const n = c.bold(record.report.length < 10 ? ` ${record.report.length}` : `${record.report.length}`);

      log.out(tui.suffix('whiteBright', `✓ ${group}`, c.whiteBright(` ${n} files ${c.gray(`in ${record.time}`)}`)));

    } else if (group === 'layouts' || group === 'snippets' || group === 'sections' || group === 'templates') {

      timer.start(group);
      record.report = await mapAsync<File, BuildModeReport>(handle(record, liquid), record.files);
      record.time = timer.stop(group);
      log.update.clear();

      count = count + record.report.length;
      const n = c.bold(record.report.length < 10 ? ` ${record.report.length}` : `${record.report.length}`);

      log.out(tui.suffix('whiteBright', `✓ ${group}`, c.whiteBright(` ${n} files ${c.gray(`in ${record.time}`)}`)));

    } else if (group === 'locales' || group === 'configs') {

      timer.start(group);
      record.report = await mapAsync<File, BuildModeReport>(handle(record, json), record.files);
      record.time = timer.stop(group);
      log.update.clear();

      count = count + record.report.length;
      const n = c.bold(record.report.length < 10 ? ` ${record.report.length}` : `${record.report.length}`);

      log.out(tui.suffix('whiteBright', `✓ ${group}`, c.whiteBright(` ${n} files ${c.gray(`in ${record.time}`)}`)));

    } else if (group === 'assets' && mode.views) {

      timer.start(group);
      record.report = await mapAsync<File, BuildModeReport>(handle(record, assets), record.files);
      record.time = timer.stop(group);
      log.update.clear();

      count = count + record.report.length;
      const n = c.bold(record.report.length < 10 ? ` ${record.report.length}` : `${record.report.length}`);

      log.out(tui.suffix('whiteBright', `✓ ${group}`, c.whiteBright(` ${n} files ${c.gray(`in ${record.time}`)}`)));

    } else if (group === 'svgs' && mode.svg) {

      timer.start(group);
      record.report = await mapAsync<File, BuildModeReport>(handle(record, svg), record.files);
      record.time = timer.stop(group);
      log.update.clear();

      count = count + record.report.length;
      const n = c.bold(record.report.length < 10 ? ` ${record.report.length}` : `${record.report.length}`);

      log.out(tui.suffix('whiteBright', `✓ ${group}`, c.whiteBright(` ${n} files ${c.gray(`in ${record.time}`)}`)));

    }
  }

  $.cache.lastBuild = Date.now();

  await cache.update();

  if (!mode.export) {
    log.nwl();
    log.out(`${c.line.gray}Build Completed ${c.gray(`~ ${timer.stop('build')}`)}`);
    log.nwl();
    process.exit(0);
  } else {
    timer.pause('build');
    log.nwl();
  }
};
