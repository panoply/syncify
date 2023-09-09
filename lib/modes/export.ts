/* eslint-disable no-unused-vars */
import type { Stats, Syncify } from 'types';
import { mkdir, pathExists, readFile, statSync } from 'fs-extra';
import { basename, join, relative } from 'pathe';
import { glob } from 'fast-glob';
import prompts from 'prompts';
import AdmZip from 'adm-zip';
import { build } from './build';
import { timer } from 'syncify:timer';
import { throwError } from 'syncify:log/throws';
import * as c from 'syncify:ansi';
import { log, tui } from 'syncify:log';
import { $ } from 'syncify:state';
import { THEME_DIRS } from 'syncify:const';
import { toBuffer } from 'syncify:native';
import { byteSize, getSizeStr } from 'syncify:utils';
import { hasTemplateMismatch, isEmptyOutputDir, Mismatch } from 'syncify:process/validate';

export async function exporting (cb?: Syncify): Promise<void> {

  const { stats, mode, dirs, vc, cwd } = $;

  timer.start('export');

  $.cache.lastResource = 'export';

  if (!mode.build) isEmptyOutputDir(stats);

  log.group('Export');

  if (mode.build) {

    log.write(c.whiteBright.bold('CLEAN'));
    log.nwl();
    log.write(c.whiteBright(`${c.CHK}${c.neonCyan(relative($.cwd, $.dirs.output))}  ${c.ARR}  cleaned`));
    log.nwl();

    log.write(c.whiteBright.bold('BUILD'));
    log.nwl();

    await build(cb);

  }

  const validate = await hasTemplateMismatch(dirs.output);

  if (validate === Mismatch.Cancel) return;

  if (validate === Mismatch.None) {
    log.out(`${c.line.gray}Build Completed ${c.gray(`~ ${timer.stop('build')}`)}`);
    log.nwl();
  }

  log.write(c.whiteBright.bold('EXPORT'));
  log.nwl();

  if (!(await pathExists(dirs.export))) {

    await mkdir(dirs.export);
  }

  const zip = new AdmZip();

  const cur: AdmZip = null;
  const bump: 'patch' | 'minor' = null;

  for (const dir of THEME_DIRS) {

    const uri = join(dirs.output, dir);
    const has = await pathExists(uri);

    if (has) {

      const files = await glob('*', { cwd: uri, absolute: true });

      for (const file of files) {

        const path = `${dir}/${basename(file)}`;
        const stat = statSync(file);

        if (stat.size === 0) {
          zip.addFile(path, toBuffer(WSP));
          // log.warn(path, 'empty file');
        } else {
          if (validate === Mismatch.None || validate.has(file) === false) {
            zip.addLocalFile(file, dir);
          }
        }
      }
    }
  }

  const size = byteSize(zip.toBuffer());

  if (vc.update !== null) {

    if (!(await pathExists(vc.update.dir))) await mkdir(vc.update.dir);

    log.out(tui.suffix('whiteBright', 'process', `${relative(cwd, vc.update.zip)} ${c.TLD} ${timer.stop('export')}`));
    log.out(tui.suffix('whiteBright', 'version', `${c.bold(vc.update.bump)} ${vc.number} ${c.ARL} ${vc.update.number}`));

    await zip.writeZipPromise(vc.update.zip);

  } else {

    if (!(await pathExists(vc.dir))) await mkdir(vc.dir);

    log.out(tui.suffix('whiteBright', 'process', `${relative(cwd, vc.zip)} ${c.TLD} ${timer.stop('export')}`));
    log.out(tui.suffix('whiteBright', 'version', `${c.bold(vc.number)}`));

    await zip.writeZipPromise(vc.zip);

  }

  log.out(tui.suffix('whiteBright', 'transform', `${c.bold('ZIP')} ${c.TLD} ${c.gray(getSizeStr(size))}`));

  log.nwl();
  log.group();
  log.nwl(NIL);

  process.exit(0);

  // if (cur !== null) {

  //   for (const file of zip.getEntries()) {

  //     const old = cur.getEntry(file.entryName);

  //     if (old !== null) {

  //       if (old.getData().equals(file.getData()) === false) {

  //         if (bump === null) {
  //           syver.version = `${v.major}.${v.minor}.${v.patch + 1}`;
  //           archive = join($.dirs.export, `${syver.version}.zip`);
  //           bump = 'patch';
  //         }

  //         log.out(tui.suffix('neonMagenta', 'change', `${file.entryName} ${c.TLD} ${c.gray('patch')}`));

  //       }

  //     } else {

  //       syver.version = `${v.major}.${v.minor + 1}.0`;
  //       archive = join($.dirs.export, `${syver.version}.zip`);
  //       bump = 'minor';

  //       log.out(tui.suffix('neonRouge', 'added', `${file.entryName} ${c.TLD} ${c.gray('minor')}`));

  //     }

  //   }
  // }

}

/* -------------------------------------------- */
/* ERROR HANDLING                               */
/* -------------------------------------------- */
