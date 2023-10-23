/* eslint-disable no-unused-vars */
import type { Syncify } from 'types';
import type { Merge } from 'type-fest';
import type { BuildReport, BuildModeReport } from 'types/internal';
import { setInterval } from 'node:timers';
import anymatch from 'anymatch';
import glob from 'fast-glob';
import pMap from 'p-map';
import { compile as assets } from 'syncify:asset';
import { compile as schema } from 'syncify:schema';
import { compile as liquid } from 'syncify:liquid';
import { compile as json } from 'syncify:json';
import { compile as script } from 'syncify:script';
import { compile as styles } from 'syncify:style';
import { compile as svg } from 'syncify:svg';
import { File, Type } from 'syncify:file';
import { parseFile } from 'syncify:process/files';
import { toArray } from 'syncify:native';
import { fileSize, isUndefined, has, object, plural, isEmpty } from 'syncify:utils';
import { timer } from 'syncify:timer';
import { $ } from 'syncify:state';
import { saveCache } from 'syncify:process/cache';
import { Append, Create, CreateClosure, Prefix } from 'syncify:ansi';

import * as c from 'syncify:colors';
import * as log from 'syncify:log';

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

function getModel (): Merge<{ [K in Groups]: BuildReport; }, {
  stats: {
    total: number;
    errors: number;
    skipped: number;
    bundled: number;
  }
}> {

  const report: Merge<{ [K in Groups]: BuildReport; }, {
    stats: {
      total: number;
      errors: number;
      skipped: number;
      bundled: number;
    }
  }> = object({
    stats: object({
      total: 0,
      errors: 0,
      skipped: 0,
      bundled: 0
    })
  });

  for (const group of [
    'styles',
    'scripts',
    'svgs',
    'sections',
    'layouts',
    'metaobject',
    'templates',
    'snippets',
    'locales',
    'configs',
    'schema',
    'pages',
    'metafields',
    'assets'
  ] as Array<Groups>) {

    report[group] = object({
      group,
      time: NIL,
      size: 0,
      files: [],
      report: null
    });

  }

  return report;
}

/**
 * Logger
 *
 * Keeps the **duration** ticker running and prints
 * the log update to terminal.
 */
function logger (message: CreateClosure) {

  let timeout: NodeJS.Timeout = null;

  function update () {

    log.update(
      message
      .toRaw()
      .join(NIL)
    );

  }

  return {
    begin (ms: number) {
      if (timeout === null) timeout = setInterval(update, ms);
    },
    clear () {
      clearInterval(timeout);
      timeout = null;
    }
  };

};

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
    log.task('Build');
  }

  const message = Create().Newline();
  const interval = logger(message);
  const SVG: Set<string> = new Set();
  const report = getModel();
  const hasFilter = isEmpty($.filters) === false;
  const parse = parseFile($.paths, $.dirs.output);
  const match = anymatch(toArray($.watch.values()));
  const globs = await glob('**', { absolute: true, cwd: $.dirs.input });
  const cache = $.cache.paths;

  interval.begin(100);

  for (const path of globs.filter(match)) {

    const file = parse(path);

    if (isUndefined(file)) continue;

    switch (file.type) {
      //   case Type.Schema: report.schema.files.push(file); break;
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

  /**
   * Compile Handler
   *
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
          ? await json(file, cb)
          : await transform(file, cb);

        if (value === null || isNaN(file.size)) {

          report.stats.skipped += 1;

          return object(
            {
              name: file.base,
              input: file.relative,
              time: timer.stop(file.uuid),
              output: file.key,
              error: 'Skipped File'
            }
          );

        }

        report.stats.bundled += 1;

        return object(
          {
            name: file.base,
            input: file.relative,
            output: file.key,
            error: null,
            time: timer.stop(file.uuid),
            size: fileSize(value, file.size)
          }
        );

      } catch (e) {

        report.stats.errors += 1;

        return object(
          {
            name: file.base,
            input: file.relative,
            output: file.key,
            time: timer.stop(file.uuid),
            error: e.message
          }
        );
      }

    };

  }

  async function bundle (group: Groups, fn: Function) {

    const filter = hasFilter && has(group, $.filters)
      ? $.filters[group]
      : null;

    if (filter && filter.includes(group) === false) return 0;

    const record = report[group];

    record.size = record.files.length;
    record.report = await pMap(record.files, handle(record, fn), { stopOnError: false });
    record.time = timer.stop(group);

    const files = record.report.length;
    const count = c.bold(files < 10 ? ` ${files}` : `${files}`);

    message.Line(Prefix(group, `${count} ${plural('file', files)} ${Append(record.time)}`));

  }

  // await bundle('schema', schema);
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

  timer.pause('build');

  interval.clear();

  if ($.mode.export === false && $.mode.publish === false) {

    log.update(
      message
      .Remove(0)
      .NL
      .Dash('Completed', c.gray)
      .NL
      .Line(Prefix('version', `${$.vc.number}`))
      .Line(Prefix('processed', `${c.bold(`${report.stats.total}`)} files`))
      .Line(Prefix('bundled', `${c.bold(`${report.stats.bundled}`)} files`))
      .Line(Prefix('skipped', `${c.bold(`${report.stats.skipped}`)} files`))
      .Line(Prefix('duration', timer.now('build')))
      // .Line(Prefix('warnings', c.bold(`${$.warnings.size}`)))
      .Line(Prefix('errors', c.bold(`${report.stats.errors}`)))
      .NL
      .End($.log.group)
      .BR
      .toString(c.whiteBright)
    );

    process.exit(0);

  } else {

    // TODO ~ HANDLE EXPORT / PUBLISH / RELEASE

  }
};
