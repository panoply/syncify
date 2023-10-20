/* eslint-disable no-unused-vars */
import type { Syncify } from 'types';
import { mkdir, pathExists, statSync } from 'fs-extra';
import { basename, join, relative } from 'pathe';
import { glob } from 'fast-glob';
import AdmZip from 'adm-zip';
import { build } from './build';
import { timer } from 'syncify:timer';
import { THEME_DIRS } from 'syncify:const';
import { toBuffer } from 'syncify:native';
import { byteSize, getSizeStr } from 'syncify:utils';
import { hasTemplateMismatch, isEmptyOutputDir, Mismatch } from 'syncify:process/validate';
import { setPkgVersion } from 'syncify:options/files';
import { saveCache } from 'syncify:process/cache';
import * as log from 'syncify:log';
import * as error from 'syncify:errors';
import { $ } from 'syncify:state';

export async function exporting (cb?: Syncify): Promise<void> {

  let { themeVersion } = $.cache.build;

  timer.start('export');

  if ($.mode.build) {

    log.group('Build');

    await build(cb);

  } else {

    isEmptyOutputDir($.stats);
  }

  const validate = await hasTemplateMismatch($.dirs.output);

  if (validate === Mismatch.Cancel) return;

  if (validate === Mismatch.None) {

    if ($.mode.build) {
      timer.stop('build');
      // log.write(timer.stop('build'));
    }

    // log.nwl();

  }

  if ($.mode.publish) {
    log.title('Exporting');
  } else {
    log.group('Export');
  }

  log.nwl();

  if (!(await pathExists($.dirs.export))) {

    await mkdir($.dirs.export);

  }

  const zip = new AdmZip();

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
    log.zipped(getSizeStr(size), relative($.cwd, $.vc.update.zip));

    try {

      await zip.writeZipPromise($.vc.update.zip);

      themeVersion = $.vc.update.number;

    } catch (e) {

      return error.throws(e, {
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

    log.zipped(getSizeStr(size), relative($.cwd, $.vc.zip));

    try {

      await zip.writeZipPromise($.vc.zip);

    } catch (e) {

      return error.throws(e, {
        file: $.vc.zip,
        details: 'Failed to write zip file'
      });
    }
  }

  if ($.pkg.version !== themeVersion) {

    const bump = await setPkgVersion($.pkg.version, themeVersion);

    if (bump) {
      log.process('package.json', 'version bumped');
      $.cache.build.themeVersion = themeVersion;
      await saveCache('build');
    } else {
      log.warn('package.json version failed to bump', 'manual increment required');
    }

  }

  timer.stop('export');
  // log.nwl();
  // log.write(timer.stop('export'));
  // log.nwl();

  if ($.mode.publish === false) {
    log.group();
    log.nwl(NIL);
    process.exit(0);
  }
}
