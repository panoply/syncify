import type { Commands } from 'types';
import { has, object } from 'syncify:utils';
import { join } from 'pathe';
import { $ } from 'syncify:state';

function parseVersionNumber (version: string) {

  const match = version.match(/^(\d{1,2})\.(\d{1,2})\.(\d{1,2})$/);

  if (!match) {
    throw new Error('Unable to parse: ' + version);
  }

  return {
    patch: parseInt(match[3], 10),
    minor: parseInt(match[2], 10),
    major: parseInt(match[1], 10)
  };

}

/**
 * Parsed package.json version
 */
export function setVersion (cli: Commands) {

  if (!has('syncifyVersion', $.cache.build)) {
    $.cache.build.syncifyVersion = $.version;
  }

  if (!has('themeVersion', $.cache.build)) {
    $.cache.build.themeVersion = $.pkg.version;
  }

  if ($.cache.build.themeVersion !== $.pkg.number) {

    $.vc.update = parseVersionNumber($.pkg.version);
    $.vc.update.number = $.pkg.version;
    $.vc.update.dir = join($.dirs.export, `v${$.vc.major}`);
    $.vc.update.zip = join($.vc.update.dir, `${$.vc.number}.zip`);

    const { patch, minor, major } = parseVersionNumber($.cache.build.themeVersion);

    $.vc.number = $.cache.build.themeVersion;
    $.vc.patch = patch;
    $.vc.minor = minor;
    $.vc.major = major;
    $.vc.dir = join($.dirs.export, `v${$.vc.major}`);
    $.vc.zip = join($.vc.dir, `${$.vc.number}.zip`);

    // TODO - HANDLE CASES WHERE --bump was passed

  } else {

    const { patch, minor, major } = parseVersionNumber($.pkg.version);

    $.vc.number = $.pkg.version;
    $.vc.patch = patch;
    $.vc.minor = minor;
    $.vc.major = major;
    $.vc.dir = join($.dirs.export, `v${$.vc.major}`);
    $.vc.zip = join($.vc.dir, `${$.vc.number}.zip`);

  }

  if (cli.release !== null) {

    $.vc.update = object($.vc);

    if (cli.release === 'patch') {
      $.vc.update.patch = $.vc.patch + 1;
      $.vc.update.bump = 'patch';
    } else if (cli.release === 'minor') {
      $.vc.update.minor = $.vc.minor + 1;
      $.vc.update.bump = 'minor';
    } else if (cli.release === 'major') {
      $.vc.update.major = $.vc.major + 1;
      $.vc.update.bump = 'major';
      $.vc.update.dir = join($.dirs.export, `v${$.vc.update.major}`);
    }

    $.vc.update.number = `${$.vc.update.major}.${$.vc.update.minor}.${$.vc.update.patch}`;
    $.vc.update.zip = join($.vc.update.dir, `${$.vc.update.number}.zip`);

  }

}
