import anymatch from 'anymatch';
import { File, Syncify, BuildReport, BuildModeReport } from 'types';
import glob from 'fast-glob';
import { compile as assets } from '~transform/asset';
import { compile as liquid } from '~transform/liquid';
import { compile as json } from '~transform/json';
import { compile as script } from '~transform/script';
import { compile as styles } from '~transform/styles';
import { compile as svg } from '~transform/svgs';
import { isUndefined, nil, toArray } from '~utils/native';
import { parseFile, Type } from '~process/files';
import { $ } from '~state';
import { log, line, gray, tui, c } from '~log';
import { has, isEmpty, mapAsync } from 'rambdax';
import { fileSize } from '~utils/utils';
import * as timer from '~utils/timer';
import * as cache from '~process/caches';

/**
 * Build Function
 *
 * Triggers a compile of the project. Build mode will filter
 * and process each file group within a project in a sequential manner.
 * Upload will not be invoked until the build has completed.
 */
export async function build (callback?: Syncify) {

  $.cache.lastResource = 'build';

  timer.start();

  const { paths, dirs, watch, filters, mode } = $;
  const hasFilter = isEmpty(filters) === false;
  const parse = parseFile(paths, dirs.output);
  const match = anymatch(toArray((watch as Set<string>).values()));
  const files = await glob('**', {
    absolute: true,
    cwd: dirs.input
  });

  const SVG: { [uuid: string]: boolean } = {};

  const source = files.filter(match).reduce((acc, path) => {

    const file = parse(path);

    if (isUndefined(file)) return acc;

    switch (file.type) {
      case Type.Style:
        acc.styles.files.push(file); break;
      case Type.Script:
        acc.scripts.files.push(file); break;
      case Type.Section:
        acc.sections.files.push(file); break;
      case Type.Layout:
        acc.layouts.files.push(file); break;
      case Type.Snippet:
        acc.snippets.files.push(file); break;
      case Type.Locale:
        acc.locales.files.push(file); break;
      case Type.Config:
        acc.configs.files.push(file); break;
      case Type.Template:
        acc.templates.files.push(file); break;
      case Type.Page:
        acc.pages.files.push(file); break;
      case Type.Asset:
        acc.assets.files.push(file); break;
      case Type.Metafield:
        acc.metafields.files.push(file); break;
      case Type.Svg: {

        // Special handling for SVG build
        for (const { uuid, format, input } of file.data) {

          if (!has(uuid, SVG)) {
            SVG[uuid] = true;
            if (format === 'sprite') {
              acc.svgs.files.push(file);
            } else {
              for (const snippet of input) acc.svgs.files.push(parse(snippet));
            }
          }

        }

        break;
      }
    }

    return acc;

  }, <{ [group: string]: BuildReport }>{
    styles: {
      time: nil,
      files: [],
      report: null
    },
    scripts: {
      time: nil,
      files: [],
      report: null
    },
    svgs: {
      time: nil,
      files: [],
      report: null
    },
    sections: {
      time: nil,
      files: [],
      report: null
    },
    layouts: {
      time: nil,
      files: [],
      report: null
    },
    metaobject: {
      time: nil,
      files: [],
      report: null
    },
    templates: {
      time: nil,
      files: [],
      report: null
    },
    snippets: {
      time: nil,
      files: [],
      report: null
    },
    locales: {
      time: nil,
      files: [],
      report: null
    },
    configs: {
      time: nil,
      files: [],
      report: null
    },
    pages: {
      time: nil,
      files: [],
      report: null
    },
    metafields: {
      time: nil,
      files: [],
      report: null
    },
    assets: {
      time: nil,
      files: [],
      report: null
    }
  });

  const handle = (
    group: string,
    count: number,
    call: Function
  ) => async (file: File):Promise<BuildModeReport> => {

    timer.start();

    try {

      log.build(group, count, file);

      const value = await (file.ext === '.json' ? json(file, callback) : call(file, callback));

      $.cache.maps[file.output] = file.input;

      log.out(tui.tree('bottom', c.neonGreen(file.key)));

      if (value === null || isNaN(file.size)) {

        return {
          name: file.base,
          input: file.relative,
          time: timer.stop(),
          output: file.key,
          error: 'Skipped File'
        };

      }

      const done = {
        name: file.base,
        input: file.relative,
        output: file.key,
        error: null,
        time: '',
        size: fileSize(value, file.size)
      };

      return done;

    } catch (e) {

      log.out(tui.tree('bottom', c.redBright(file.key)));

      return {
        name: file.base,
        input: file.relative,
        output: file.key,
        time: timer.stop(),
        error: e.message
      };
    }

  };

  for (const id in source) {

    timer.start();

    const item = source[id].files;
    const size = item.length;

    if (id === 'styles' && mode.style) {

      if (hasFilter && (!(has(id, filters) && filters[id].includes(id)))) continue;

      source[id].report = await mapAsync<File, BuildModeReport>(handle(id, size, styles), item);
      source[id].time = timer.stop();

    } else if (id === 'scripts' && mode.script) {

      if (hasFilter && (!(has(id, filters) && filters[id].includes(id)))) continue;

      source[id].report = await mapAsync<File, BuildModeReport>(handle(id, size, script), item);
      source[id].time = timer.stop();

    } else if (id === 'layouts' || id === 'snippets' || id === 'sections' || id === 'templates') {

      if (mode.views) {

        if (hasFilter && (!(has(id, filters) && filters[id].includes(id)))) continue;

        source[id].report = await mapAsync<File, BuildModeReport>(handle(id, size, liquid), item);
        source[id].time = timer.stop();

      }

    } else if (id === 'locales' || id === 'configs' || id === 'metafields') {

      if (mode.views) {

        if (hasFilter && (!(has(id, filters) && filters[id].includes(id)))) continue;

        source[id].report = await mapAsync<File, BuildModeReport>(handle(id, size, json), item);
        source[id].time = timer.stop();

      }
    } else if (id === 'pages' && mode.views) {

      // if (hasFilter && (!(has(id, filters) && filters[id].includes(id)))) continue;

      // source[id].report = await mapAsync<File, BuildModeReport>(handle(id, size, pages), item);
      // source[id].time = timer.stop();

    } else if (id === 'assets' && mode.views) {

      if (hasFilter && (!(has(id, filters) && filters[id].includes(id)))) continue;

      source[id].report = await mapAsync<File, BuildModeReport>(handle(id, size, assets), item);
      source[id].time = timer.stop();

    } else if (id === 'svgs' && mode.svg) {

      if (hasFilter && (!(has(id, filters) && filters[id].includes(id)))) continue;

      source[id].report = await mapAsync<File, BuildModeReport>(handle(id, size, svg), item);
      source[id].time = timer.stop();

    }
  }

  $.cache.lastBuild = Date.now();

  await cache.update();

  log.nwl();
  log.update(`${line.gray}Build Completed ${gray(`~ ${timer.stop()}`)}`);
  log.nwl();

  process.exit(0);

};
