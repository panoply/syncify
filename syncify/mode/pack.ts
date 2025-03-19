import { basename, join, relative } from 'node:path';

import { glob } from 'fast-glob';
import { mkdir, pathExists, statSync } from 'fs-extra';
import { $import } from 'modules';

import { timer } from '@syncify/timer';

import { log } from '~cli/log';
import { THEME_DIRS } from '~const';
import { error } from '~errors';
import { Build } from '~mode/build';
import { setPkgVersion } from '~options/define/package';
import { saveCache } from '~process/cache';
import { hasTemplateMismatch, isEmptyOutputDir, Mismatch } from '~process/validate';
import { byteSize, stringSize, toBuffer } from '~utils';

import { $ } from '$';

export async function Pack (): Promise<void> {

  await $import('adm-zip');

  $.running = true;

  let { themeVersion } = $.project;

  timer.start('export');

  if ($.mode.build) {

    log.group('Build');

    await Build();

  } else {

    isEmptyOutputDir($.stats);
  }

  const validate = await hasTemplateMismatch($.dirs.output);

  if (validate === Mismatch.Cancel) return;

  if (validate === Mismatch.None) {
    if ($.mode.build) timer.stop('build');
  }

  log.group('Packing');

  log.nl();

  if (!(await pathExists($.cwd))) {

    await mkdir($.cwd);

  }

  const zip = new $import.AdmZip();

  for (const dir of THEME_DIRS) {

    const uri = join($.dirs.output, dir);
    const has = await pathExists(uri);

    if (has) {

      const files = await glob('*', { cwd: uri, absolute: true });

      for (const file of files) {

        const path = `${dir}/${basename(file)}`;
        const stat = statSync(file);

        if (stat.size === 0) {
          zip.addFile(path, toBuffer(WSP));
          log.warn(path, 'empty file');
        } else {
          if (validate === Mismatch.None || validate.has(file) === false) {
            zip.addLocalFile(file, dir);
          }
        }
      }
    }
  }

  const size = byteSize(zip.toBuffer());

  if ($.vc.update !== null) {

    if (!(await pathExists($.vc.update.dir))) await mkdir($.vc.update.dir);

    log.version($.vc, 'bump');
    log.zipped(stringSize(size), relative($.cwd, $.vc.update.zip));

    try {

      await zip.writeZipPromise($.vc.update.zip);

      themeVersion = $.vc.update.number;

    } catch (e) {

      return error.throw(e, {
        file: $.vc.zip,
        details: 'Failed to write zip file'
      });

    }

  } else {

    if (!(await pathExists($.vc.dir))) {
      await mkdir($.vc.dir);
      log.version($.vc, 'created');
    } else {
      log.version($.vc, 'overwrite');
    }

    log.zipped(stringSize(size), relative($.cwd, $.vc.zip));

    try {

      await zip.writeZipPromise($.vc.zip);

    } catch (e) {

      return error.throw(e, {
        file: $.vc.zip,
        details: 'Failed to write zip file'
      });
    }
  }

  if ($.pkg.version !== themeVersion) {

    const bump = await setPkgVersion($.pkg.version, themeVersion);

    if (bump) {
      log.process('package.json', 'version bumped');
      $.project.themeVersion = themeVersion;
      await saveCache('build');
    } else {
      log.warn('package.json version failed to bump', 'manual increment required');
    }

  }

  timer.stop('export');
  // log.nl();
  // log.write(timer.stop('export'));
  // log.nl();

  if ($.mode.publish === false) {
    log.group();
    log.nl(NIL);
    process.exit(0);
  }
}
