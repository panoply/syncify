import { join } from 'node:path';

import { merge } from '~utils';

import { $ } from '$';

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
export function setVersion () {

  if ($.project.themeVersion === $.pkg.version) {

    $.vc.update = parseVersionNumber($.pkg.version);
    $.vc.update.number = $.pkg.version;
    $.vc.update.dir = join($.dirs.versions, `v${$.vc.major}`);
    $.vc.update.zip = join($.vc.update.dir, `${$.vc.number}.zip`);

    const v = parseVersionNumber($.project.themeVersion);

    $.vc.number = $.project.themeVersion;
    $.vc.patch = v.patch;
    $.vc.minor = v.minor;
    $.vc.major = v.major;
    $.vc.dir = join($.dirs.versions, `v${$.vc.major}`);
    $.vc.zip = join($.vc.dir, `${$.vc.number}.zip`);

    // TODO - HANDLE CASES WHERE --bump was passed

  } else {

    const v = parseVersionNumber($.pkg.version);

    $.vc.number = $.pkg.version;
    $.vc.patch = v.patch;
    $.vc.minor = v.minor;
    $.vc.major = v.major;
    $.vc.dir = join($.dirs.versions, `v${$.vc.major}`);
    $.vc.zip = join($.vc.dir, `${$.vc.number}.zip`);

  }

  $.vc.update = merge({}, $.vc);

  // if ($.cmd. === 'patch') {

  //   $.vc.update.patch = $.vc.patch + 1;
  //   $.vc.update.bump = 'patch';

  // } else if (cli.release === 'minor') {

  //   $.vc.update.minor = $.vc.minor + 1;
  //   $.vc.update.bump = 'minor';

  // } else if (cli.release === 'major') {

  //   $.vc.update.major = $.vc.major + 1;
  //   $.vc.update.bump = 'major';
  //   $.vc.update.dir = join($.dirs.export, `v${$.vc.update.major}`);

  // }

  $.vc.update.number = `${$.vc.update.major}.${$.vc.update.minor}.${$.vc.update.patch}`;
  $.vc.update.zip = join($.vc.update.dir, `${$.vc.update.number}.zip`);

}
