import anymatch from 'anymatch';
import { File, Syncify } from 'types';
import glob from 'fast-glob';
import { compile as assets } from '~transform/asset';
import { compile as liquid } from '~transform/liquid';
import { compile as json } from '~transform/json';
import { compile as pages } from '~transform/pages';
import { script } from '~transform/script';
import { compile as styles } from '~transform/styles';
import { isUndefined, nil, toArray } from '~utils/native';
import { parseFile, Type } from '~process/files';
import { bundle } from '~config';
import { log, line, gray } from '~log';
import * as timer from '~utils/timer';
import { mapAsync } from 'rambdax';
import { fileSize } from '~utils/utils';
import { lastPath } from '~utils/paths';

type Files = {
  name: string;
  time: string;
  output: string;
  error: any[]
  size?: {
    before: string;
    after: string;
    saved: string;
    gzip: string;
  }
}

/**
 * Build Function
 *
 * Triggers a compile of the project. Build mode will filter
 * and process each file group within a project in a sequential manner.
 * Upload will not be invoked until the build has completed.
 */
export async function build (callback?: Syncify) {

  timer.start();

  const parse = parseFile(bundle.paths, bundle.dirs.output);
  const match = anymatch(toArray(bundle.watch.values()));
  const paths = await glob('**', {
    onlyFiles: true,
    absolute: true,
    cwd: bundle.dirs.input
  });

  const source = paths.filter(match).reduce((acc, path) => {

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
      case Type.Svg:
        acc.svgs.files.push(file); break;
    }

    return acc;

  }, {
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

  const handle = (call: Function) => async (file: File) => {

    timer.start();

    try {

      const value = await (file.ext === '.json' ? json(file, callback) : call(file, callback));

      if (value === null || isNaN(file.size)) {
        return {
          name: file.base,
          time: timer.stop(),
          output: file.key,
          error: 'Skipped File'
        };
      }

      const { before, after, saved, gzip } = fileSize(value, file.size);

      return {
        name: file.base,
        time: timer.stop(),
        output: lastPath(file.output),
        error: null,
        size: {
          before,
          after,
          saved,
          gzip
        }
      };

    } catch (e) {

      return {
        name: file.base,
        time: timer.stop(),
        output: lastPath(file.output),
        error: e.message
      };
    }

  };

  for (const id in source) {

    log.update(`${line.gray}Building ${id}`);
    timer.start();

    if (id === 'styles') {

      source[id].report = await mapAsync<File, Files>(handle(styles), source[id].files);
      source[id].time = timer.stop();

    } else if (id === 'scripts') {

      source[id].report = await mapAsync<File, Files>(handle(script), source[id].files);
      source[id].time = timer.stop();

    } else if (id === 'layouts' || id === 'snippets' || id === 'sections' || id === 'templates') {

      source[id].report = await mapAsync<File, Files>(handle(liquid), source[id].files);
      source[id].time = timer.stop();

    } else if (id === 'locales' || id === 'configs' || id === 'metafields') {

      source[id].report = await mapAsync<File, Files>(handle(json), source[id].files);
      source[id].time = timer.stop();

    } else if (id === 'pages') {

      source[id].report = await mapAsync<File, Files>(handle(pages), source[id].files);
      source[id].time = timer.stop();

    } else if (id === 'assets') {

      source[id].report = await mapAsync<File, Files>(handle(assets), source[id].files);
      source[id].time = timer.stop();

    } else if (id === 'svgs') {

      source[id].report = await mapAsync<File, Files>(handle(pages), source[id].files);
      source[id].time = timer.stop();

    }
  }

  log.update(`${line.gray}Build Completed ${gray(`~ ${timer.stop()}`)}`);

  process.exit(0);
  // log.info(c.greenBright.bold('Completed in ' + timer.stop()));
  // await logger(bundle.spawn, { clear: true });

};
