import type { Merge } from 'type-fest';
import type { BuildModeReport, BuildReport, Syncify } from 'types';

import anymatch from 'anymatch';
import glob from 'fast-glob';
import pMap from 'p-map';

import * as _ from '@syncify/ansi';
import { kill } from '@syncify/kill';
import { timer } from '@syncify/timer';

import { AssetTransform } from '~asset';
import { BUILD_GROUPS } from '~const';
import { File, Type } from '~file';
import { JsonTransform } from '~json';
import { LiquidTransform } from '~liquid';
import { saveCache, setPathCache } from '~process/cache';
import { parse } from '~process/files';
import { ScriptTransform } from '~script';
import { StyleTransform } from '~style';
import { SvgTransform } from '~svg';
import { delay, has, isEmpty, isObject, isUndefined, plur, sizeDiff, toArray } from '~utils';

import { $ } from '$';

type Groups = (
  | 'styles'
  | 'scripts'
  | 'svgs'
  | 'sections'
  | 'layouts'
  | 'blocks'
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

function getGlobs () {

  const paths = [];

  for (const p in $.paths) if ($.paths[p].input) paths.push(...$.paths[p].input.values());

  paths.push(...$.script.map(({ input }) => input));
  paths.push(...$.style.map(({ input }) => input));
  paths.push(...$.svg.flatMap(({ input }) => toArray(input)));

  return paths;
}

function getModel (globs: string[]) {

  const match = anymatch(getGlobs());
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
      type: NIL,
      time: NIL,
      size: 0,
      files: [],
      report: null
    };
  }

  for (const path of globs.filter(match)) {

    const file = parse(path);

    if (isUndefined(file)) continue;

    setPathCache(file.input, file.output);

    switch (file.type) {
      case Type.Style:
        report.styles.files.push(file);
        break;
      case Type.Script:
        report.scripts.files.push(file);
        break;
      case Type.Section:
        report.sections.files.push(file);
        break;
      case Type.Layout:
        report.layouts.files.push(file);
        break;
      case Type.Block:
        report.blocks.files.push(file);
        break;
      case Type.Snippet:
        report.snippets.files.push(file);
        break;
      case Type.Locale:
        report.locales.files.push(file);
        break;
      case Type.Config:
        report.configs.files.push(file);
        break;
      case Type.Template:
        report.templates.files.push(file);
        break;
      case Type.Page:
        report.pages.files.push(file);
        break;
      case Type.Asset:
        report.assets.files.push(file);
        break;
      case Type.Metafield:
        report.metafields.files.push(file);
        break;
      case Type.Svg:
        report.svgs.files.push(file);
        break;
    }
  }

  return report;
}

function getLogs () {

  const write = _.Create()
  .Prefix('version', `  ${$.vc.number}`, _.bold)
  .Template({ id: 'version', prefix: true })
  .Template({ id: 'processed', prefix: true })
  .Template({ id: 'bundled', prefix: true })
  .Template({ id: 'skipped', prefix: true })
  .Template({ id: 'duration', prefix: true })
  .Template({ id: 'warnings', prefix: true })
  .Template({ id: 'errors', prefix: true })
  .Newline()
  .Template('Building', { id: 'build', dash: true, color: _.gray })
  .Newline()
  .Template({ id: 'svg', prefix: true })
  .Template({ id: 'layouts', prefix: true })
  .Template({ id: 'templates', prefix: true })
  .Template({ id: 'blocks', prefix: true })
  .Template({ id: 'sections', prefix: true })
  .Template({ id: 'snippets', prefix: true })
  .Template({ id: 'locales', prefix: true })
  .Template({ id: 'configs', prefix: true })
  .Template({ id: 'assets', prefix: true })
  .Template({ id: 'styles', prefix: true })
  .Template({ id: 'scripts', prefix: true });

  return {
    write,
    update: (report: Report) => write
    .Update('processed', `  ${_.bold(`${report.stats.total}`)} files`)
    .Update('bundled', `  ${_.bold(`${report.stats.bundled}`)} files`)
    .Update('skipped', `  ${_.bold(`${report.stats.skipped}`)} files`)
    .Update('duration', `  ${_.capture.numbers(timer.now('build'), _.bold)}`)
    .Update('warnings', `  ${_.bold(`${$.warnings.size}`)}`)
    .Update('errors', `  ${_.bold(`${report.stats.errors}`)}`)
  };

}

/**
 * Build Function
 *
 * Triggers a compile of the project. Build mode will filter
 * and process each file group within a project in a sequential manner.
 * Upload will not be invoked until the build has completed.
 */
export async function Build (cb?: Syncify) {

  $.running = true;

  timer.start('build');

  const stderr = _.Create({ type: 'error' });
  const hasFilter = isEmpty($.filters) === false;
  const globs = await glob('**', { absolute: true, cwd: $.dirs.input });
  const report = getModel(globs);
  const { write, update } = getLogs();

  update(report);

  await delay(250);

  /**
   * Used by the `pMap` caller to build files
   */
  function handle (record: BuildReport, Transform: Function) {

    timer.start(record.group);

    return async (file: File): Promise<BuildModeReport> => {

      timer.start(file.uuid);
      report.stats.total += 1;

      try {

        // update cache paths
        setPathCache(file.output, file.input);

        const value = file.ext === '.json' ? await JsonTransform(file) : await Transform(file);

        if (value === null || isNaN(file.size)) {

          report.stats.skipped += 1;

          return {
            name: file.base,
            input: file.relative,
            time: timer.stop(file.uuid),
            output: file.key,
            error: 'File is empty'
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

        stderr.Line(e.message);

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
    const before = files > 100 ? WSP : WSR;
    const count = before + _.bold(files < 10 ? ` ${files}` : `${files}`);
    const space = files === 1 ? WSR : WSP;

    update(report)
    .Update(group, `${count} ${plur('file', files)}${space}${_.Append(record.time)}`)
    .toUpdate();

  }

  await bundle('svgs', SvgTransform);
  await bundle('layouts', LiquidTransform);
  await bundle('templates', LiquidTransform);
  await bundle('blocks', LiquidTransform);
  await bundle('sections', LiquidTransform);
  await bundle('snippets', LiquidTransform);
  await bundle('locales', JsonTransform);
  await bundle('configs', JsonTransform);
  await bundle('assets', AssetTransform);
  await bundle('styles', StyleTransform);
  await bundle('scripts', ScriptTransform);

  if ($.mode.publish === false) {

    write
    .Update('build', 'Build')
    .toUpdate();

    write
    .Newline()
    .Template('Caching', { id: 'cache', dash: true, color: _.gray })
    .Newline()
    .Spinner('Saving Cache', { color: _.neonCyan, style: 'spinning' });

    await saveCache();

    write
    .Stop()
    .Update('cache', 'Cached')
    .Header(`${$.dirs.cache}`, _.gray)
    .toUpdate();

    if ($.warnings.size > 0) {

      write
      .Dash('Warnings', _.gray)
      .Newline();

      let group: string;
      let count: number = 0;

      for (const err of $.warnings.keys()) {
        for (const [ processor, warnings ] of $.warnings.get(err)) {

          count = count + 1;

          if (group !== processor) {
            group = processor;
          } else {
            write.Ruler();
          }

          write
          .Warn(`${_.bold('WARNING')} ${_.HSH}${_.bold(`${count}`)}`, _.yellowBright)
          .Newline('yellow')
          .Warn(group, _.yellowBright);

          for (const warn of warnings) {

            write.Insert(warn).Break();

          }
        }
      }

      write.toUpdate();
      write.Newline();

    } else {

      write.toUpdate();

    }

    write
    .End($.log.group)
    .Break()
    .toUpdate();

    kill.exit(0);

  } else {

    // TODO ~ HANDLE EXPORT / PUBLISH / RELEASE

  }
};
