import anymatch from 'anymatch';
import { File, Pages, StyleTransform, Syncify } from 'types';
import { glob } from 'glob';
import { compile as assets } from '~transform/asset';
import { compile as liquid } from '~transform/liquid';
import { compile as json } from '~transform/json';
import { compile as pages } from '~transform/pages';
import { script } from '~transform/script';
import { styles } from '~transform/styles';
import { isUndefined, nil, toArray, toBuffer } from '~utils/native';
import { parseFile, Type } from '~process/files';
import { bundle } from '~config';
import { clean } from './clean';
import { log, line } from '~log';
import * as timer from '~utils/timer';
import { mapAsync, mapFastAsync, tryCatchAsync } from 'rambdax';
import { fileSize } from '~utils/utils';
import { lastPath } from '~utils/paths';

/**
 * Build Function
 *
 * Triggers a compile of the project. Build mode will filter
 * and process each file group within a project in a sequential manner.
 * Upload will not be invoked until the build has completed.
 */
export async function build (callback?: Syncify) {

  timer.start();

  if (bundle.mode.clean) await clean();

  const parse = parseFile(bundle.paths, bundle.dirs.output);
  const match = anymatch(toArray(bundle.watch.values()));
  const paths = glob.sync(bundle.dirs.input + '**', { nodir: true });
  const source = paths.filter(match).reduce((acc, path) => {

    const file = parse(path);

    if (isUndefined(file)) return acc;

    switch (file.type) {
      case Type.Style:
        acc.style.push(file); break;
      case Type.Script:
        acc.script.push(file); break;
      case Type.Section:
        acc.section.push(file); break;
      case Type.Layout:
        acc.layout.push(file); break;
      case Type.Snippet:
        acc.snippet.push(file); break;
      case Type.Locale:
        acc.locale.push(file); break;
      case Type.Config:
        acc.config.push(file); break;
      case Type.Template:
        acc.template.push(file); break;
      case Type.Page:
        acc.page.push(file); break;
      case Type.Asset:
        acc.asset.push(file); break;
      case Type.Metafield:
        acc.metafield.push(file); break;
    }

    return acc;

  }, {
    style: [],
    script: [],
    section: [],
    layout: [],
    snippet: [],
    locale: [],
    page: [],
    config: [],
    metafield: [],
    template: [],
    asset: []
  });

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
  type Items = {
    time: string;
    files: Files[]
  };

  const report: {
    styles: Items;
    scripts: Items;
    svgs: Items;
    sections: Items;
    layouts: Items;
    templates: Items;
    snippets: Items;
    locales: Items;
    configs: Items;
    pages: Items;
    metafields: Items;
    assets: Items;
  } = {
    styles: {
      time: nil,
      files: null
    },
    scripts: {
      time: nil,
      files: null
    },
    svgs: {
      time: nil,
      files: null
    },
    sections: {
      time: nil,
      files: null
    },
    layouts: {
      time: nil,
      files: null
    },
    templates: {
      time: nil,
      files: null
    },
    snippets: {
      time: nil,
      files: null
    },
    locales: {
      time: nil,
      files: null
    },
    configs: {
      time: nil,
      files: null
    },
    pages: {
      time: nil,
      files: null
    },
    metafields: {
      time: nil,
      files: null
    },
    assets: {
      time: nil,
      files: null
    }
  };

  const pr = (cb: any) => async (file: File) => {

    timer.start();

    try {

      const value = await (
        file.ext === '.json'
          ? json(file, callback)
          : cb(file, callback)
      );

      const {
        before,
        after,
        saved,
        gzip
      } = fileSize(toBuffer(value), file.size);

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

      console.log(e, file.size);
      return {
        name: file.base,
        time: timer.stop(),
        output: lastPath(file.output),
        error: e.message
      };
    }

  };

  /* -------------------------------------------- */
  /* STYLES                                       */
  /* -------------------------------------------- */

  log.update(line.gray + 'building styles');

  timer.start();
  report.styles.files = await mapFastAsync<File, Files>(pr(styles), source.style);
  report.styles.time = timer.stop();

  log.update(line.gray + 'building sections');

  timer.start();
  report.sections.files = await mapFastAsync<File, Files>(pr(liquid), source.section);
  report.sections.time = timer.stop();

  log.update(line.gray + 'building templates');

  timer.start();
  report.templates.files = await mapFastAsync<File, Files>(pr(liquid), source.template);
  report.templates.time = timer.stop();

  log.update(line.gray + 'building layouts');

  timer.start();
  report.layouts.files = await mapFastAsync<File, Files>(pr(liquid), source.layout);
  report.layouts.time = timer.stop();

  log.update(line.gray + 'building snippets');

  timer.start();
  report.snippets.files = await mapFastAsync<File, Files>(pr(liquid), source.snippet);
  report.snippets.time = timer.stop();

  log.update(line.gray + 'building locales');
  timer.start();
  report.locales.files = await mapFastAsync<File, Files>(pr(json), source.locale);
  report.locales.time = timer.stop();

  log.update(line.gray + 'building configs');
  timer.start();
  report.configs.files = await mapFastAsync<File, Files>(pr(json), source.config);
  report.configs.time = timer.stop();

  log.update(line.gray + 'building assets');
  timer.start();
  report.assets.files = await mapFastAsync<File, Files>(pr(assets), source.asset);
  report.assets.time = timer.stop();

  log.update(line.gray + 'building scripts');
  timer.start();
  report.scripts.files = await mapFastAsync<File, Files>(pr(script), source.script);
  report.scripts.time = timer.stop();

  console.log(report);
  process.exit(1);
  return;
  /* -------------------------------------------- */
  /* SECTIONS                                     */
  /* -------------------------------------------- */

  for (const file of source.section) {

    log.build(file);

    try {
      await liquid(file as File<StyleTransform>, callback);
    } catch (err) {
      console.error(err);
    }
  }

  /* -------------------------------------------- */
  /* LAYOUTS                                      */
  /* -------------------------------------------- */

  for (const file of source.layout) {

    log.build(file);

    try {
      await liquid(file as File<StyleTransform>, callback);
    } catch (err) {
      console.error(err);
    }
  }

  /* -------------------------------------------- */
  /* TEMPLATES                                    */
  /* -------------------------------------------- */

  for (const file of source.template) {

    log.build(file);

    try {
      if (file.ext === '.json') {
        await json(file, callback);
      } else {
        await liquid(file, callback);
      }
    } catch (err) {
      console.error(err);
    }
  }

  /* -------------------------------------------- */
  /* SNIPPETS                                     */
  /* -------------------------------------------- */

  for (const file of source.snippet) {

    log.build(file);

    try {
      await liquid(file as File<StyleTransform>, callback);
    } catch (err) {
      console.error(err);
    }
  }

  /* -------------------------------------------- */
  /* LOCALES                                      */
  /* -------------------------------------------- */

  for (const file of source.locale) {

    log.build(file);

    try {
      await json(file as File<StyleTransform>, callback);
    } catch (err) {
      console.error(err);
    }
  }

  /* -------------------------------------------- */
  /* CONFIG                                       */
  /* -------------------------------------------- */

  for (const file of source.config) {

    log.build(file);

    try {
      await json(file as File<StyleTransform>, callback);
    } catch (err) {
      console.error(err);
    }
  }

  /* -------------------------------------------- */
  /* PAGES                                        */
  /* -------------------------------------------- */

  for (const file of source.page) {

    log.build(file);

    try {
      await pages(file as File<Pages>, callback);
    } catch (err) {
      console.error(err);
    }
  }

  /* -------------------------------------------- */
  /* METAFIELDS                                   */
  /* -------------------------------------------- */

  for (const file of source.metafield) {

    log.build(file);

    try {
      await json(file as File<StyleTransform>, callback);
    } catch (err) {
      console.error(err);
    }
  }

  /* -------------------------------------------- */
  /* ASSETS                                       */
  /* -------------------------------------------- */

  for (const file of source.asset) {

    log.build(file);

    try {

      await assets(file as File<StyleTransform>, callback);
    } catch (err) {
      console.error(err);
    }
  }

  log.write('completed in ' + timer.stop());

  process.exit(0);
  // log.info(c.greenBright.bold('Completed in ' + timer.stop()));
  // await logger(bundle.spawn, { clear: true });

};
